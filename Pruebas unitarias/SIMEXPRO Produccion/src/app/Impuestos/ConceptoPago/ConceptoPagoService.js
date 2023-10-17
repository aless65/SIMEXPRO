import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ConceptoPagoService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/ConceptoPago/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => ({
                key: index + 1,
                copa_Id: item.copa_Id,
                copa_Descripcion: item.copa_Descripcion,
                usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                copa_FechaCreacion: item.copa_FechaCreacion,
                usuaCreacion: item.usuaCreacion,
                usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                usuaModificacion: item.usuaModificacion,
                copa_FechaModificacion: item.copa_FechaModificacion,
                copa_Estado: item.copa_Estado
            }));
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
                copa_Descripcion: item.copa_Descripcion,
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
            const datos = {
                copa_Descripcion: data.copa_Descripcion.trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                copa_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            //;
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            const datos = {
                copa_Id: data["id"],
                copa_Descripcion: data.copa_Descripcion.trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                copa_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

   
    return {
        listar,
        crear,
        editar
        ,ExportData
    };
}

export default ConceptoPagoService;
