import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

function ProveedoresService() {

   const customHeaders = {
      XApiKey: instance.extraerToken(),
   };

   const baseURL = process.env.REACT_APP_API_URL + "api/Proveedores/";


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
               prov_Id: item.prov_Id,
               prov_NombreCompania: item.prov_NombreCompania,
               prov_NombreContacto: item.prov_NombreContacto,
               prov_Telefono: item.prov_Telefono,
               prov_CodigoPostal: item.prov_CodigoPostal,
               prov_Ciudad: item.prov_Ciudad,
               ciud_Nombre: item.ciud_Nombre,
               pvin_Id: item.pvin_Id,
               pvin_Nombre: item.pvin_Nombre,
               pais_Id: item.pais_Id,
               pais_Codigo: item.pais_Codigo,
               pais_Nombre: item.pais_Nombre,
               prov_DireccionExacta: item.prov_DireccionExacta,
               prov_CorreoElectronico: item.prov_CorreoElectronico,
               prov_Fax: item.prov_Fax,

               usua_UsuarioCreacion: item.usua_UsuarioCreacion,
               prov_FechaCreacion: item.prov_FechaCreacion,
               usuarioCreacionNombre: item.usuarioCreacionNombre,

               usua_UsuarioModificacion: item.usua_UsuarioModificacion,
               prov_FechaModificacion: item.prov_FechaModificacion,
               usuarioModificadorNombre: item.usuarioModificadorNombre,

               usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
               prov_FechaEliminacion: item.prov_FechaEliminacion,
               usuarioEliminacionNombre: item.usuarioEliminacionNombre,

               prov_Estado: item.prov_Estado,
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
                  prov_NombreCompania: item.prov_NombreCompania,
                  prov_NombreContacto: item.prov_NombreContacto,
                  prov_Telefono: item.prov_Telefono,
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
            prov_NombreCompania: data["prov_NombreCompania"].trim(),
            prov_NombreContacto: data["prov_NombreContacto"].trim(),
            prov_Telefono: data["prov_Telefono"].trim(),
            prov_CodigoPostal: data["prov_CodigoPostal"].trim(),
            prov_Ciudad: data.Ciudad["value"],
            prov_DireccionExacta: data["prov_DireccionExacta"].trim(),
            prov_CorreoElectronico: data["prov_CorreoElectronico"].trim(),
            prov_Fax: data["prov_Fax"].trim(),

            usua_UsuarioCreacion: user['uuid'],
            prov_FechaCreacion: instance.formatFechaHora(new Date()),
         };

         const response = await axiosInstance.post("Insertar", datos);
         return response;
      } catch (error) {

      }
   }



   async function editar(data) {
      try {
         let datos = {
            prov_Id: data["id"],
            prov_NombreCompania: data["prov_NombreCompania"].trim(),
            prov_NombreContacto: data["prov_NombreContacto"].trim(),
            prov_Telefono: data["prov_Telefono"].trim(),
            prov_CodigoPostal: data["prov_CodigoPostal"].trim(),
            prov_Ciudad: data.Ciudad["value"],
            prov_DireccionExacta: data["prov_DireccionExacta"].trim(),
            prov_CorreoElectronico: data["prov_CorreoElectronico"].trim(),
            prov_Fax: data["prov_Fax"].trim(),

            usua_UsuarioModificacion: user['uuid'],
            prov_FechaModificacion: instance.formatFechaHora(new Date()),
         };
         const response = await axiosInstance.post("Editar", datos);
         return response;
      } catch (error) {

      }
   }

   async function eliminar(data) {

      try {
         let datos = {
            prov_Id: data["id"],

            usua_UsuarioEliminacion: user['uuid'],
            prov_FechaEliminacion: instance.formatFechaHora(new Date()),
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

//const proveedoresService = new ProveedoresService();
export default ProveedoresService;
