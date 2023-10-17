import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function OficinasService () {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/Oficinas/";
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
                    ofic_Id: item.ofic_Id, 
                    ofic_Nombre: item.ofic_Nombre, 
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion, 
                    ofic_FechaCreacion: item.ofic_FechaCreacion, 
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion, 
                    ofic_FechaModificacion: item.ofic_FechaModificacion, 
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion, 
                    ofic_FechaEliminacion: item.ofic_FechaEliminacion, 

                    ofic_Estado: item.ofic_Estado
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
                    ofic_Nombre: item.ofic_Nombre, 
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
                ofic_Nombre: data["ofic_Nombre"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioCreacion: user['uuid'], 
                ofic_FechaCreacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
        }
    };

    async function editar(data){
        try{
            let datos = {
                ofic_Id: data["ofic_Id"],
                ofic_Nombre: data["ofic_Nombre"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioModificacion: user['uuid'], 
                ofic_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            
        }
    };

    async function eliminar (data){
        try{
            let datos = {
                ofic_Id: data["ofic_Id"],
                usua_UsuarioEliminacion: user['uuid'], 
                ofic_FechaEliminacion: instance.formatFechaHora(new Date()), 
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

export default OficinasService;
