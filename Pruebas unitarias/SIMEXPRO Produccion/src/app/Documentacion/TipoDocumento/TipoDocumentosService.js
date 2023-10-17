import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function TipoDocumentoService () {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/TipoDocumento/";
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
                    tido_Id: item.tido_Id,
                    tido_Codigo: item.tido_Codigo,
                    tido_Descripcion: item.tido_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tido_FechaCreacion: item.tido_FechaCreacion,
                    usarioCreacion: item.usarioCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tido_FechaModificacion: item.tido_FechaModificacion,
                    usuarioModificacion: item.usuarioModificacion,

                    tido_Estado: item.tido_Estado,
                };            
            });
            return data;
        }
        catch (error){
            
            
        }
    };

    async function ExportData () {
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    tido_Codigo: item.tido_Codigo,
                    tido_Descripcion: item.tido_Descripcion,
                };            
            });
            return data;
        }
        catch (error){
            
            
        }
    };

    async function crear (data) {
        try{
            let datos = {
                    tido_Codigo: data["tido_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                    tido_Descripcion: data["tido_Descripcion"].trim().replace(/\s+/g, ' '),
                    usua_UsuarioCreacion: user['uuid'],
                    tido_FechaCreacion: instance.formatFechaHora(new Date()),                
            }
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }
        catch (error) {
            
                       
        }
    };

    async function editar (data) {
        try{
            let datos = {
                tido_Id: data["tido_Id"],                
                tido_Codigo: data["tido_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                tido_Descripcion: data["tido_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                tido_FechaModificacion: instance.formatFechaHora(new Date()), 
            }
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }
        catch (error) {
            
                
        }
    };

    return{
        listar,
        crear,
        editar,
        ExportData,
    }
};

export default TipoDocumentoService;