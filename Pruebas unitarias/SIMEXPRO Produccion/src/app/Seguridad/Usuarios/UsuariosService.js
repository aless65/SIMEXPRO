import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";
// import user from 'src/app/auth/services/jwtService/dataUser';

function Usuarioservice() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Usuarios/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const baseURL2 = process.env.REACT_APP_API_URL + "api/Empleados/";

    const axiosInstance2 = axios.create({
        baseURL: baseURL2,
        headers: customHeaders,
    });

    const baseURL3 = process.env.REACT_APP_API_URL + "api/Roles/";

    const axiosInstance3 = axios.create({
        baseURL: baseURL3,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));


    async function listar() {
        try {
            const response = await axiosInstance.get("Listar?empl_EsAduana=" + user["esAduana"].toString());
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    usua_Id: item.usua_Id,
                    usua_Nombre: item.usua_Nombre,
                    usua_Contrasenia: item.usua_Contrasenia,
                    emplNombreCompleto: item.emplNombreCompleto,
                    role_Descripcion: item.role_Descripcion ? item.role_Descripcion : "No tiene rol",
                    empl_Id: item.empl_Id,
                    usua_Image: item.usua_Image,
                    role_Id: item.role_Id,
                    usua_EsAdmin: item.usua_EsAdmin,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usua_FechaCreacion: item.usua_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usua_FechaModificacion: item.usua_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                    usua_FechaEliminacion: item.usua_FechaEliminacion,
                    usua_UsuarioActivacion: item.usua_UsuarioActivacion,
                    usuarioActivacionNombre: item.usuarioActivacionNombre,
                    usua_FechaActivacion: item.usua_FechaActivacion,
                    usua_Estado: item.usua_Estado,
                };
            });
            
            return data;
        } catch (error) {
            
        }
    }
    
  async function ExportData(){
    try{
        const response = await axiosInstance.get("Listar?empl_EsAduana=" + user["esAduana"].toString());
        const data = response.data.data.map((item, index) => {
            return{
                key: index + 1,
                usua_Nombre: item.usua_Nombre, 
                emplNombreCompleto: item.emplNombreCompleto,
                role_Descripcion: item.role_Descripcion ? item.role_Descripcion : "No tiene rol",
                usua_Estado: item.usua_Estado ? 'Activo' : 'Inactivo'
            };
        }); 
        return data;
    }
    catch (error)
    {
    }
};

    async function EmpleadosNoTieneUsuario() {
        try {
          const response = await axiosInstance2.get("/ListarNoTieneUsuario?empl_EsAduana=" + user["esAduana"].toString()); //copiar url despues del endpoint
          const data = response.data.data.map((item) => {
            return {
              value: item.empl_Id,
              label: `${item.empl_NombreCompleto}`,
            };
          });
          return data;
        } catch (error) {
        }
      }

      async function RolesPorModulo() {
        try {
          const response = await  axiosInstance3.get("/Listar?role_Aduana=" + user["esAduana"].toString());  //copiar url despues del endpoint
          const data = response.data.data.map((item) => {
            return {
              value: item.role_Id,
              label: `${item.role_Descripcion}`,
            };
          });
          return data;
        } catch (error) {
        }
      }

    async function crear(data, image, Administrador) {
        const ImagenDefault = 'https://i.ibb.co/8MKqj1C/Avatar-Usuario.png';
        let ImageCrear = '';
        if (image != ImagenDefault) {
            let ImageUpload = await SubirImagen(image);
            ImageCrear = (ImageUpload.data.url).toString();
        } else {
            ImageCrear = image;
        }

        let UsuarioRol
        if (data.UsuarioRol === null)
            UsuarioRol = 0
        else
            UsuarioRol = data.UsuarioRol["value"]

        try {
            let datos = {
                usua_Nombre: data.NombreUsuario.trim().replace(/\s+/g, ' '),
                usua_Contrasenia: data.ContraUsuario,
                empl_Id: data.Empleado["value"],
                usua_esAduana:user["esAduana"],
                role_Id: UsuarioRol,
                usua_EsAdmin: Administrador,
                usua_Image: ImageCrear,
                usua_UsuarioCreacion: user['uuid'],
                usua_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Insertar', datos);
            return response;
        } catch (error) {
            
        }
    }

    async function editar(data, Id, Image, Administrador) {
        let ListaUsuarios = await listar();
        let RegistroUsuario = await ListaUsuarios.find((lista) => lista.usua_Id === Id)
        let ImageEdit = '';
        if (RegistroUsuario.usua_Image === Image) { ImageEdit = Image; }
        else {
            let ImageUpload = await SubirImagen(Image);
            ImageEdit = (ImageUpload.data.url).toString();
        }

        let UsuarioRol
        if (data.UsuarioRolEditar === null || data.UsuarioRolEditar === undefined)
            UsuarioRol = 0
        else
            UsuarioRol = data.UsuarioRolEditar["value"]



        try {

            let datos = {
                usua_Id: Id,
                empl_Id: data.EmpleadoEditar["value"],
                role_Id: UsuarioRol,
                usua_EsAdmin: Administrador,
                usua_Image: ImageEdit,
                usua_UsuarioModificacion: user['uuid'],
                usua_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Editar', datos);
            return response;
        } catch (error) {
            
        }
    }

    async function eliminar(data) {
        if (data['usua_Id'] === user['uuid']) {
            return 3;
        } else {
            try {
                let datos = {
                    usua_Id: data['usua_Id'],
                    usua_UsuarioEliminacion: user['uuid'],
                    usua_FechaEliminacion: instance.formatFechaHora(new Date())
                }
                const response = await axiosInstance.post('Eliminar', datos);
                return response;
            } catch (error) {
                
            }
        }
    }

    async function activar(data) {
        try { 
            let datos = {
                usua_Id: data['usua_Id'],
                usua_UsuarioActivacion: user['uuid'],
                usua_FechaActivacion: instance.formatFechaHora(new Date())
            }
            const response = await axiosInstance.post('Activar', datos);
            return response;
        } catch (error) {
            
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
                throw new Error('Error al enviar la imagen');
            }
            return (await response.json());
        } catch (error) {
            
        }
    }
    return {
        listar,
        EmpleadosNoTieneUsuario,
        RolesPorModulo,
        crear,
        editar,
        eliminar,
        activar,
        SubirImagen,
        ExportData
    };
}

// const usuarioservice = new UsuariosService();
export default Usuarioservice;