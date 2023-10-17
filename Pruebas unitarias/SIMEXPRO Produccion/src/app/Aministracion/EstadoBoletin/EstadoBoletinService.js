import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function EstadoBoletinService() {
        const customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        const baseURL = process.env.REACT_APP_API_URL + "api/EstadoBoletin/";
        const axiosInstance = axios.create({
            baseURL: baseURL,
            headers: customHeaders,
        });
        const user = JSON.parse(localStorage.getItem('user'))


    
    async function ListarEstadosBoletin(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    esbo_Id: item.esbo_Id, 
                    esbo_Descripcion: item.esbo_Descripcion, 

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion, 
                    esbo_FechaCreacion: item.esbo_FechaCreacion, 
                    usua_NombreCreacion: item.usua_NombreCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion, 
                    esbo_FechaModificacion: item.esbo_FechaModificacion, 
                    usua_NombreModificacion: item.usua_NombreModificacion,
                    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion, 
                    esbo_FechaEliminacion: item.esbo_FechaEliminacion, 

                    esbo_Estado: item.esbo_Estado
                };
            });
            return data;
        }
        catch (error)
        {
            
            
        }
    };
    
    async function ExportData(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    esbo_Descripcion: item.esbo_Descripcion, 
                };
            });
            return data;
        }
        catch (error)
        {
            
            
        }
    };

    async function CrearEstadoBoletin(data){
        try{
            let datos = {
                esbo_Descripcion: data["esbo_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'], 
                esbo_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    async function EditarEstadoBoletin(data){
        try{
            let datos = {
                esbo_Id: data["esbo_Id"],
                esbo_Descripcion: data["esbo_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'], 
                esbo_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    return{
        ListarEstadosBoletin,
        CrearEstadoBoletin,
        EditarEstadoBoletin,
        ExportData,
        

    }

  
}

// const EstadoBoletinServices = new EstadoBoletinService();
export default EstadoBoletinService;
