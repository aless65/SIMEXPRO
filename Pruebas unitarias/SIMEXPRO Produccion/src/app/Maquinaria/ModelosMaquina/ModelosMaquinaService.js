import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";



function ModelosMaquinaService() {
        const customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        const baseURL = process.env.REACT_APP_API_URL + "api/ModelosMaquinas/";
        const axiosInstance = axios.create({
            baseURL: baseURL,
            headers: customHeaders,
        });
        const user = JSON.parse(localStorage.getItem('user'))



    async function ListarModelosMaquina() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    mmaq_Id: item.mmaq_Id,
                    mmaq_Nombre: item.mmaq_Nombre,
                    marq_Nombre: item.marq_Nombre,
                    marq_Id: item.marq_Id,
                    func_Nombre: item.func_Nombre,
                    func_Id: item.func_Id,
                    mmaq_Imagen: item.mmaq_Imagen,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    mmaq_FechaCreacion: item.mmaq_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    mmaq_FechaModificacion: item.mmaq_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    mmaq_FechaEliminacion: item.mmaq_FechaEliminacion,

                    mmaq_Estado: item.esbo_Estado
                };
            });
            return data;
        }
        catch (error) {
        }
    };



    
    async function ExportData(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    mmaq_Nombre: item.mmaq_Nombre, 
                    marq_Nombre: item.marq_Nombre,
                    func_Nombre: item.func_Nombre,
                };
            }); 
            return data;
        }
        catch (error)
        {
        }
    };


    async function CrearModeloMaquina(data, image) {
        const ImagenDefault = 'https://i.ibb.co/rwp91Z1/maq.webp';
        let ImageCrear = '';
        if (image != ImagenDefault) {
            let ImageUpload = await SubirImagen(image);
            ImageCrear = (ImageUpload.data.url).toString();
        } else {
            ImageCrear = image;
        }

        try {
            let datos = {
                mmaq_Nombre: data.mmaq_Nombre.trim().replace(/\s+/g, ' '),
                marq_Id: data.marq_Id["value"],
                func_Id: data.func_Id["value"],
                mmaq_Imagen: ImageCrear,
                usua_UsuarioCreacion: user['uuid'],
                mmaq_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Insertar', datos);
            return response;
        } catch (error) {
        }
    };


    async function EditarModeloMaquina(data,Id,Image) {

        let ModelosLista = await ListarModelosMaquina();
        let RegistroModelo = await ModelosLista.find((lista) => lista.mmaq_Id === Id)
        let ImageEdit = '';
        if(RegistroModelo.mmaq_Imagen === Image) { ImageEdit = Image;}
        else{let ImageUpload = await SubirImagen(Image);
            ImageEdit = (ImageUpload.data.url).toString();}

       
                
        try {
            let datos = {
                mmaq_Id: Id,
                mmaq_Nombre: data.mmaq_NombreEditar.trim().replace(/\s+/g, ' '),
                marq_Id: data.marq_IdEditar["value"],
                func_Id: data.func_IdEditar["value"],
                mmaq_Imagen: ImageEdit,
                usua_UsuarioModificacion: user['uuid'],
                mmaq_FechaModificacion:  instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    };

    async function EliminarModeloMaquina(data) {
        try {
            let datos = {
                mmaq_Id: data["mmaq_Id"],
                usua_UsuarioEliminacion:  user['uuid'],
                mmaq_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
        }
    }

    async function SubirImagen(imageUrl) {
        //Token de la API para subir imagenes
        const apikey = "f99603ab2a441653f8d67a4f4181eec8";

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

    return{
        ListarModelosMaquina,
        CrearModeloMaquina,
        EditarModeloMaquina,
        EliminarModeloMaquina,
        SubirImagen,
        ExportData
    }


}

export default ModelosMaquinaService;
