import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ColoresService() {
    
        const customHeaders = {
            XApiKey: instance.extraerToken(),
        };

        const baseURL = process.env.REACT_APP_API_URL + "api/Colores/";
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
                    colr_Id: item.colr_Id,
                    colr_Nombre: item.colr_Nombre,
                    colr_Codigo: item.colr_Codigo,
                    colr_CodigoHtml: item.colr_CodigoHtml,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioNombreCreacion: item.usuarioNombreCreacion,
                    colr_FechaCreacion: item.colr_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioNombreModificacion: item.usuarioNombreModificacion,
                    colr_FechaModificacion: item.colr_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    colr_FechaEliminacion: item.colr_FechaEliminacion,
                    colr_Estado: item.colr_Estado,
            
            }));
            return data;
        } catch (error) {
        }
    }
    
    async function ExportData() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => ({
                    key: index + 1,
                    colr_Nombre: item.colr_Nombre,
                    colr_Codigo: item.colr_Codigo,
                               
            }));
            return data;
        } catch (error) {
        }
    }

    async function crear(data) {
        try {
            let datos = {
                colr_Nombre: data["colr_Nombre"].trim().replace(/\s+/g, ' '),
                colr_Codigo: data["colr_Codigo"].trim().toUpperCase(),
                colr_CodigoHtml: data["colr_CodigoHtml"], 
                usua_UsuarioCreacion: user['uuid'],
                colr_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            let datos = {
                colr_Id: data["colr_Id"],
                colr_Nombre: data["colr_Nombre"].trim().replace(/\s+/g, ' '),
                colr_Codigo: data["colr_Codigo"].trim().toUpperCase(),
                colr_CodigoHtml: data["colr_CodigoHtml"], 
                usua_UsuarioModificacion: user['uuid'],
                colr_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    return{
        listar,
        crear,
        editar,
        ExportData,
    }
}
export default ColoresService;