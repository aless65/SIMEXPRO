import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function TipoDeEmbalajeService () {
    
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/TipoEmbalaje/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });
    
    const user = JSON.parse(localStorage.getItem('user'));

    async function listar(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    tiem_Id: item.tiem_Id, 
                    tiem_Descripcion: item.tiem_Descripcion, 
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion, 
                    usarioCreacion: item.usarioCreacion,
                    tiem_FechaCreacion: item.tiem_FechaCreacion, 

                    usuarioModificacion: item.usuarioModificacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion, 
                    tiem_FechaModificacion: item.tiem_FechaModificacion, 
                    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion, 
                    tiem_FechaEliminacion: item.tiem_FechaEliminacion, 

                    tiem_Estado: item.tiem_Estado
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
                    tiem_Descripcion: item.tiem_Descripcion, 
                };
            }); 
            return data;
        }
        catch (error)
        {
            
            
        }
    };

    async function crear(data){
        try{
            let datos = {
                tiem_Descripcion: data["tiem_Descripcion"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioCreacion: user['uuid'], 
                tiem_FechaCreacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    async function editar(data){
        try{
            let datos = {
                tiem_Id: data["tiem_Id"],
                tiem_Descripcion: data["tiem_Descripcion"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioModificacion: user['uuid'], 
                tiem_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    async function eliminar (data){
        try{
            let datos = {
                tiem_Id: data["tiem_Id"],
                usua_UsuarioEliminacion: user['uuid'], 
                tiem_FechaEliminacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        }catch (error) {
            
            
        }
    }

    return{
        listar,
        crear,
        editar,
        eliminar,
        ExportData
    }
}

export default TipoDeEmbalajeService;
