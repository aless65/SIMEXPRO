import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function EcotasaService () {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/Ecotasa/";
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
                    ecot_Id: item.ecot_Id,
                    ecot_RangoIncial : item.ecot_RangoIncial,
                    ecot_RangoFinal: item.ecot_RangoFinal,
                    ecot_CantidadPagar:  item.ecot_CantidadPagar,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    ecot_FechaCreacion:  item.ecot_FechaCreacion,
                    usua_UsuarioModificacion:  item.usua_UsuarioModificacion,
                    ecot_FechaModificacion: item.ecot_FechaModificacion,
                    usua_UsuarioCreacionNombre: item.usua_UsuarioCreacionNombre,
                    usua_UsuarioModificacionNombre:  item.usua_UsuarioModificacionNombre
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
                    ecot_RangoIncial : item.ecot_RangoIncial,
                    ecot_RangoFinal: item.ecot_RangoFinal,
                    ecot_CantidadPagar:  item.ecot_CantidadPagar,
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
                ecot_RangoIncial: data["ecot_RangoIncial"].toString().trim().replace(/\s+/g, ' '), 
                ecot_RangoFinal: data["ecot_RangoFinal"].toString().trim().replace(/\s+/g, ' '), 
                ecot_CantidadPagar: data["ecot_CantidadPagar"].toString().trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'], 
                ecot_FechaCreacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
        }
    };

    async function editar(data){
        try{
            let datos = {
                ecot_Id: data["ecot_Id"],
                ecot_RangoIncial: data["ecot_RangoIncial"].toString().trim().replace(/\s+/g, ' '), 
                ecot_RangoFinal: data["ecot_RangoFinal"].toString().trim().replace(/\s+/g, ' '), 
                ecot_CantidadPagar: data["ecot_CantidadPagar"].toString().trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'], 
                ecot_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            console.log(datos)
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
        }
    };

    async function eliminar (data){
        try{
            let datos = {
                ecot_Id: data["ecot_Id"],
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
        ExportData,
    }
}

export default EcotasaService;
