import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function EstadosCivilesService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/EstadosCiviles/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });
    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar?escv_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    escv_Id: item.escv_Id,
                    escv_Nombre: item.escv_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    escv_FechaCreacion: item.escv_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    escv_FechaModificacion: item.escv_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    escv_FechaEliminacion: item.escv_FechaEliminacion,
                    escv_Estado: item.escv_Estado,
                };
            });
            return data;
        }
        catch (error) {
            
        }
    };

    async function ExportData(){
        try{
            const response = await axiosInstance.get(`Listar?escv_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    escv_Nombre: item.escv_Nombre,
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
            let datos = {
                escv_Nombre: data["escv_Nombre"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                escv_FechaCreacion: instance.formatFechaHora(new Date()),
                escv_EsAduana: user['esAduana']
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
        }
    };

    async function editar(data) {
        try {
            let datos = {
                escv_Id: data["id"],
                escv_Nombre: data["escv_Nombre"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                escv_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
        }
    };

    async function eliminar(data) {
        try {
            let datos = {
                escv_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                escv_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Eliminar", datos);

            return response;
        } catch (error) {
            
        }
    }

    return {
        listar,
        crear,
        editar,
        eliminar,
        ExportData
    }
}

export default EstadosCivilesService;


