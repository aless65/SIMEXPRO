import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";
import { ToastErrorPersonalizado } from 'src/styles/toastsFunctions';

function PerfilService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Usuarios/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));


    async function listar() {
        try {
            const response = await axiosInstance.get("Listar?empl_EsAduana=" + user["esAduana"].toString());
            const data = response.data.data.map((item, index) => {
                return {
                    key:                        index + 1,
                    usua_Id:                    item.usua_Id,
                    usua_Nombre:                item.usua_Nombre,
                    usua_Contrasenia:           item.usua_Contrasenia,
                    empleadoNombreCompleto:     item.empleadoNombreCompleto,
                    role_Descripcion:           item.role_Descripcion ? item.role_Descripcion : "No tiene rol",
                    empl_Id:                    item.empl_Id,
                    usua_Image:                 item.usua_Image,
                    role_Id:                    item.role_Id,
                    usua_EsAdmin:               item.usua_EsAdmin,
                    usua_UsuarioCreacion:       item.usua_UsuarioCreacion,
                    usuarioCreacionNombre:      item.usuarioCreacionNombre,
                    usua_FechaCreacion:         item.usua_FechaCreacion,
                    usua_UsuarioModificacion:   item.usua_UsuarioModificacion,
                    usuarioModificacionNombre:  item.usuarioModificacionNombre,
                    usua_FechaModificacion:     item.usua_FechaModificacion,
                    usua_UsuarioEliminacion:    item.usua_UsuarioEliminacion,
                    usuarioEliminacionNombre:   item.usuarioEliminacionNombre,
                    usua_FechaEliminacion:      item.usua_FechaEliminacion,
                    usua_Estado:                item.usua_Estado,
                };
            })
            const a = data.filter((item) => item.usua_Id === user['uuid']);
            return a;
        } catch (error) {
            throw error;
            
        }
    }

    async function ValidarClave(clave) {
        try {
            let datos = {
                usua_Nombre:      user['data']['displayName'],
                usua_Contrasenia: clave
            };
            const response = await axiosInstance.post("Login", datos);
            return response;
        } catch (error) {
            
            throw error;
            
        }


    }

    async function CambiarPerfil(image) {
        try {
            let ImageCrear = '';
            let ImageUpload = await SubirImagen(image);
            ImageCrear = (ImageUpload.data.url).toString();
    
            let datos = {
                usua_Id:				    user["uuid"],
                usua_Image:					ImageCrear,
                usua_UsuarioModificacion:	user["uuid"],
                usua_FechaModificacion:	    instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("CambiarPerfil", datos);
            return response;
        } catch (error) {
            
            throw error;
            
        }


    }

    async function SubirImagen(imageUrl) {
        //Token de la API para subir imagenes
        const apikey = "7e4e4920016a49b1dfc06d5af4e9ffc3"; //meter token al env
        const base64Image = imageUrl.split(',')[1]; // obtener la cadena Base64 sin el prefijo "data:image/png;base64,"
        const url = `https://api.imgbb.com/1/upload?key=${apikey}`;
        const body = new FormData();

        body.append('image', base64Image);

        try {
            let response = await fetch(url, {
                method: 'POST',
                body: body
            });
            if (!response.ok) {
                ToastErrorPersonalizado("No se ha podido procesar el cambio de imagen");
            }
            return (await response.json());
        } catch (error) {
            
        }
    }

    async function CambiarContrasenia(passwordConfirm) {
        try {
            let datos = {
                usua_Nombre:        user['data']['displayName'],
                usua_Contrasenia:   passwordConfirm,
            }
            const res = await axiosInstance.post("CambiarContrasenia", datos)
            if (res.data) {
                return 1
            } else {
                return 0
            }
        } catch (error) {
            return error
        }

    }
    

    return{
        listar,
        ValidarClave,
        CambiarPerfil,
        SubirImagen,
        CambiarContrasenia,
    };

}

// const usuarioservice = new UsuariosService();
export default PerfilService;
