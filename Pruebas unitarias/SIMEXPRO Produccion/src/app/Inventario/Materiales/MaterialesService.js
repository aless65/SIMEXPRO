import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MaterialesService() {


   const customHeaders = {
      XApiKey: instance.extraerToken(),
   };
   const baseURL = process.env.REACT_APP_API_URL + "api/Materiales/";
   const axiosInstance = axios.create({
      baseURL: baseURL,
      headers: customHeaders,
   });
   const user = JSON.parse(localStorage.getItem('user'))


   async function listar() {

      try {
         const response = await axiosInstance.get("Listar");
         const data = response.data.data.map((item, index) => {
            return {
               key: index + 1,
               mate_Id: item.mate_Id,
               mate_Descripcion: item.mate_Descripcion,
               subc_Id: item.subc_Id,
               cate_Id: item.cate_Id,
               colr_Id: item.colr_Id,
               colr_Nombre: item.colr_Nombre,
               cate_Descripcion: item.cate_Descripcion,
               subc_Descripcion: item.subc_Descripcion,
               mate_Imagen: item.mate_Imagen,

               usua_UsuarioCreacion: item.usua_UsuarioCreacion,
               mate_FechaCreacion: item.mate_FechaCreacion,
               usuarioCreacionNombre: item.usuarioCreacionNombre,

               usua_UsuarioModificacion: item.usua_UsuarioModificacion,
               mate_FechaModificacion: item.mate_FechaModificacion,
               usuarioModificaNombre: item.usuarioModificaNombre,

               mate_Estado: item.mate_Estado,
            };
         });
         return data;
      } catch (error) {
      }
   }

   async function ExportData() {

      try {
         const response = await axiosInstance.get("Listar");
         const data = response.data.data.map((item, index) => {
            return {
               key: index + 1,
               mate_Descripcion: item.mate_Descripcion,
               subc_Descripcion: item.subc_Descripcion,
            };
         });
         return data;
      } catch (error) {
      }
   }

   async function crear(data, image) {
      const ImagenDefault = 'https://thumbs.dreamstime.com/b/carrete-del-hilo-36758026.jpg';
      let ImageCrear = '';
      if (image != ImagenDefault) {
         let ImageUpload = await SubirImagen(image);
         ImageCrear = (ImageUpload.data.url).toString();
      } else {
         ImageCrear = image;
      }

      try {
         let datos = {
            mate_Descripcion: data["mate_Descripcion"].trim(),
            subc_Id: data.subcategoria.value,
            mate_Imagen: ImageCrear,
            colr_Id: 2,
            usua_UsuarioCreacion: user['uuid'],
            mate_FechaCreacion: instance.formatFechaHora(new Date()),

         };
         
         const response = await axiosInstance.post("Insertar", datos);
         
         return response;
      } catch (error) {
      }
   }

   async function editar(data, Id, Image) {
      const response = await axiosInstance.get("Listar");
      const dataget = response.data.data.map((item, index) => {
         return {
            key: index + 1,
            mate_Id: item.mate_Id,
            mate_Descripcion: item.mate_Descripcion,
            subc_Id: item.subc_Id,
            cate_Id: item.cate_Id,
            colr_Id: 2,
            cate_Descripcion: item.cate_Descripcion,
            subc_Descripcion: item.subc_Descripcion,
            mate_Imagen: item.mate_Imagen,


            usua_UsuarioCreacion: item.usua_UsuarioCreacion,
            mate_FechaCreacion: item.mate_FechaCreacion,
            usuarioCreacionNombre: item.usuarioCreacionNombre,

            usua_UsuarioModificacion: item.usua_UsuarioModificacion,
            mate_FechaModificacion: item.mate_FechaModificacion,
            usuarioModificaNombre: item.usuarioModificaNombre,

            mate_Estado: item.mate_Estado,
         };
      });
      let MaterialesLista = dataget
      let RegistroMateriales = await MaterialesLista.find((lista) => lista.mate_Id === Id)
      let ImageEdit = '';

      if (RegistroMateriales.mate_Imagen === Image) { ImageEdit = Image; }
      else {
         let ImageUpload = await SubirImagen(Image);
         ImageEdit = (ImageUpload.data.url).toString();
      }

      try {
         let datos = {
            mate_Id: data["id"],
            mate_Descripcion: data["mate_Descripcion"].trim(),
            subc_id: data.subcategoria["value"],
            mate_Imagen: ImageEdit,
            colr_Id: data.colores["value"],
            usua_UsuarioModificacion: user['uuid'],
            mate_FechaModificacion: instance.formatFechaHora(new Date()),
         };
         const response = await axiosInstance.post("Editar", datos);

         return response;
      } catch (error) {
      }

   }

   async function eliminar(data) {

      try {
         let datos = {
            mate_Id: data["id"],

            usua_UsuarioEliminacion: user['uuid'],
            mate_FechaEliminacion: formatFechaHora(new Date()),
         };
         const response = await axiosInstance.post("Eliminar", datos);
         return response;
      } catch (error) {
      }
   }

   async function SubirImagen(imageUrl) {
      //Token de la API para subir imagenes
      const apikey = "7e4e4920016a49b1dfc06d5af4e9ffc3";

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
      crear,
      editar,
      eliminar,
      SubirImagen,
      ExportData
   };
}
export default MaterialesService;
