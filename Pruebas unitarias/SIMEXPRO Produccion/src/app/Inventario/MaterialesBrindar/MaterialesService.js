import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MaterialesBrindarService() {
    
        const customHeaders = { 
            XApiKey: instance.extraerToken(),
        };
        const baseURL = process.env.REACT_APP_API_URL + "api/MaterialesBrindar/";
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
                     mabr_Id: item.mabr_Id,
                     code_Id: item.code_Id,
                     mate_Id: item.mate_Id,
                     mabr_Cantidad: item.mabr_Cantidad,
                     unme_Id: item.unme_Id,
                     mate_Descripcion: item.mate_Descripcion,
                     unme_Descripcion: item.unme_Descripcion,
                     code_CantidadPrenda: item.code_CantidadPrenda,
      
                     usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                     mabr_FechaCreacion: item.mabr_FechaCreacion,
                     usuarioCreacionNombre: item.usuarioCreacionNombre,
      
                     usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                     mabr_FechaModificacion: item.mabr_FechaModificacion,
                     usuarioModificaNombre: item.usuarioModificaNombre,
      
                     mabr_Estado: item.mabr_Estado,
                  };
               });
               return data;
            } catch (error) {
               
               
            }
         }
        
         async function listarMaterialespororden(code_Id) {
            try {
                const response = await axiosInstance.get('ListarFiltrado', {
                    params: {
                     code_Id: code_Id
                    }
                });
                
                
                const data = response.data.data.map((item, index) => {
                    return {
                        key: index + 1,
                        code_Id: item.code_Id,
                        code_CantidadPrenda: item.code_CantidadPrenda,
                        mate_Descripcion: item.mate_Descripcion,
                        mate_Id: item.mate_Id
                    };
                });
                
                return data;
            } catch (error) {
                
                
            }
        }         
         return {
            listar,
            listarMaterialespororden
         };
  
}
export default MaterialesBrindarService;