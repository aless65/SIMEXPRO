import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function AreasService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Areas/";

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
                tipa_Id: item.tipa_Id,
                tipa_area: item.tipa_area,
                proc_Id: item.proc_Id,
                proc_Descripcion: item.proc_Descripcion,
                usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                tipa_FechaCreacion: item.tipa_FechaCreacion,
                usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                tipa_FechaModificacion: item.tipa_FechaModificacion,
                usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                tipa_FechaEliminacion: item.tipa_FechaEliminacion,
                tipa_Estado: item.tipa_Estado,
                usarioCreacion: item.usarioCreacion,
                usuarioModificacion: item.usuarioModificacion,
                usuarioEliminacion: item.usuarioEliminacion
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
                tipa_area: item.tipa_area,
                proc_Descripcion: item.proc_Descripcion,
            }));
            return data;
        } catch (error) {
            
        }
    }

    async function crear(data) {
        try {
            const datos = {
                tipa_area: data["area"].trim().replace(/\s+/g, ' '),
                proc_Id: data.proceso["value"],
                usua_UsuarioCreacion: user['uuid'],
                tipa_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
        }
    }

    async function editar(data) {
        try {
            const datos = {
                tipa_Id: data["id"],
                tipa_area: data["area"].trim().replace(/\s+/g, ' '),
                proc_Id: data.proceso["value"],
                usua_UsuarioModificacion: user['uuid'],
                tipa_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
        }
    }

    async function eliminar(data) {
        try {
            const datos = {
                tipa_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                tipa_FechaEliminacion: instance.formatFechaHora(new Date()),
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
    };
}

export default AreasService;