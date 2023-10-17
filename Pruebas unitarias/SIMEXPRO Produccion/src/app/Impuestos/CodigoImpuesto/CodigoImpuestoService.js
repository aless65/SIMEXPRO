import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function CodigoImpuestoService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/CodigoImpuesto/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar () {
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    coim_Id: item.coim_Id,   		
                    coim_Descripcion: item.coim_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    coim_FechaCreacion: item.coim_FechaCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    coim_FechaModificacion: item.coim_FechaModificacion,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                    coim_FechaEliminacion: item.coim_FechaEliminacion,

                    coim_Estado: item.coim_Estado,
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
                    coim_Descripcion: item.coim_Descripcion,
                };
            }); 
            return data;
        }
        catch (error)
        {
            
            
        }
    };

    async function crear (data) {
        try{
            let datos = {
                coim_Descripcion: data["coim_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                coim_FechaCreacion: instance.formatFechaHora(new Date()), 
            }
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    async function editar (data) {
        try{
            let datos = {
                coim_Id: data["coim_Id"],
                coim_Descripcion: data["coim_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                coim_FechaModificacion: instance.formatFechaHora(new Date()), 
            }
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }
        catch (error) {
            
            
        }
    };

    async function eliminar (data) {
        try{
            let datos = {
                coim_Id: data["coim_Id"],
                usua_UsuarioEliminacion: user['uuid'],
                coim_FechaEliminacion: instance.formatFechaHora(new Date()),      
            }
            const response = axiosInstance.post("Eliminar", datos);
            return response;
        }
        catch (error) {
            
            
        }
    };

    return {        
        listar,
        crear,
        editar,
        eliminar
        ,ExportData
    }
};

export default CodigoImpuestoService;