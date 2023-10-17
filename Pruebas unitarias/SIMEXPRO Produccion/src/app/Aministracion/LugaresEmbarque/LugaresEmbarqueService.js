import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function LugaresEmbarqueService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/LugaresEmbarque/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    emba_Id: item.emba_Id,
                    emba_Codigo: item.emba_Codigo,
                    emba_Descripcion: item.emba_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    emba_FechaCreacion: item.emba_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    emba_FechaModificacion: item.emba_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    emba_FechaEliminacion: item.emba_FechaEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,

                    emba_Estado: item.emba_Estado,
                };
            });
            return data;
        }
        catch (error) {
            
            
        }
    };


    async function ExportData() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    emba_Codigo: item.emba_Codigo,
                    emba_Descripcion: item.emba_Descripcion,
                };
            });
            return data;
        }
        catch (error) {
            
            
        }
    };

    async function crear(data) {
        try {
            let datos = {
                emba_Codigo: data["emba_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                emba_Descripcion: data["emba_Descripcion"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioCreacion: user['uuid'],
                emba_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }
        catch (error) {
            
            
        }
    };

    async function editar(data) {
        try {
            let datos = {
                emba_Id: data["emba_Id"],
                emba_Codigo: data["emba_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                emba_Descripcion: data["emba_Descripcion"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion: user['uuid'],
                emba_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }
        catch (error) {
            
            
        }
    };

    async function eliminar(data) {
        try {
            let datos = {
                emba_Id: data["emba_Id"],
                usua_UsuarioEliminacion: user['uuid'],
                emba_FechaEliminacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        }
        catch (error) {
            
            
        }
    }

    return {
        listar,
        crear,
        editar,
        eliminar,
        ExportData,
    }
};

export default LugaresEmbarqueService;
