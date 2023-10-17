import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

function AduanasService() {

   const customHeaders = {
      XApiKey: instance.extraerToken(),
   };
   const baseURL = process.env.REACT_APP_API_URL + "api/Aduanas/";
   const axiosInstance = axios.create({
      baseURL: baseURL,
      headers: customHeaders,
   });
   const user = JSON.parse(localStorage.getItem('user'));

   async function listar() {

      try {
         const response = await axiosInstance.get("Listar");
         const data = response.data.data.map((item, index) => {
            return {
               key: index + 1,
               adua_Id: item.adua_Id,
               adua_Codigo: item.adua_Codigo,
               adua_Nombre: item.adua_Nombre,
               adua_Direccion_Exacta: item.adua_Direccion_Exacta,
               ciud_Id : item.ciud_Id, 
               ciud_Nombre: item.ciud_Nombre, 
               pvin_Id : item.pvin_Id,
               pvin_Nombre : item.pvin_Nombre,  

               adua_FechaCreacion: item.adua_FechaCreacion,
               usarioCreacion: item.usarioCreacion,
               
               adua_FechaModificacion: item.adua_FechaModificacion,
               usuarioModificacion: item.usuarioModificacion,

               adua_FechaEliminacion: item.adua_FechaEliminacion,
               usuarioEliminacion: item.usuarioEliminacion,

               adua_Estado: item.adua_Estado,
            };
         });

         
         return data;
      } catch (error) {
         
         
      }
   }
   
   async function ExportData(){
      try{
          const response = await axiosInstance.get("Listar");
          const data = response.data.data.map((item, index) => {
              return{
                  key: index + 1,
                  adua_Codigo: item.adua_Codigo,
                  adua_Nombre: item.adua_Nombre,
                  adua_Direccion_Exacta: item.adua_Direccion_Exacta,
              };
          }); 
      
          return data;
      }
      catch (error)
      {
          
          
      }
  };


   async function crear(data) {
      try {
         let datos = {
            adua_Codigo: data["adua_Codigo"].trim(),
            adua_Nombre: data["adua_Nombre"].trim(),
            ciud_Id: data.Ciudad.value,
            adua_Direccion_Exacta: data["adua_Direccion_Exacta"].trim(),

            usua_UsuarioCreacion: user['uuid'],
            adua_FechaCreacion: instance.formatFechaHora(new Date()),
         };
         const response = await axiosInstance.post("Insertar", datos);
         return response;
      } catch (error) {
         
         
      }
   }

   async function editar(data) {
      try {
         let datos = {
            adua_Id: data["id"],
            adua_Codigo: data["adua_Codigo"].trim(),
            adua_Nombre: data["adua_Nombre"].trim(),
            ciud_Id: data.Ciudad.value,
            adua_Direccion_Exacta: data["adua_Direccion_Exacta"].trim(),

            usua_UsuarioModificacion: user['uuid'],
            adua_FechaModificacion: instance.formatFechaHora(new Date()),
         };
         const response = await axiosInstance.post("Editar", datos);
         return response;
      } catch (error) {
         
         
      }
   }

   async function eliminar(data) {

      try {
         let datos = {
            adua_Id: data["id"],

            usua_UsuarioEliminacion: user['uuid'],
            adua_FechaEliminacion: instance.formatFechaHora(new Date()),
         };
         const response = await axiosInstance.post("Eliminar", datos);
         return response;
      } catch (error) {
         
         
      }
   }

   return {
      listar,
      crear,
      editar,
      eliminar,
      ExportData
  };
}
export default AduanasService;
