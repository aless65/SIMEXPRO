import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function TipoLiquidacionService () {
    
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/TipoLiquidacion/";
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
                    tipl_Id: item.tipl_Id, 
                    tipl_Descripcion: item.tipl_Descripcion, 
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion, 
                    tipl_FechaCreacion: item.tipl_FechaCreacion, 
                    usarioCreacion: item.usarioCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion, 
                    tipl_FechaModificacion: item.tipl_FechaModificacion, 
                    usuarioModificacion: item.usuarioModificacion,            

                    tipl_Estado: item.tipl_Estado
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
                    tipl_Descripcion: item.tipl_Descripcion,
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
                tipl_Descripcion: data["tipl_Descripcion"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioCreacion: user['uuid'], 
                tipl_FechaCreacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    async function editar(data){
        try{
            let datos = {
                tipl_Id: data["tipl_Id"],
                tipl_Descripcion: data["tipl_Descripcion"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioModificacion: user['uuid'], 
                tipl_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    return{
        listar,
        crear,
        editar,
        ExportData
    }
}

export default TipoLiquidacionService;
