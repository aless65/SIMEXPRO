import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ModulosService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Modulos/";

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
                modu_Id: item.modu_Id,
                modu_Nombre: item.modu_Nombre,
                proc_Id: item.proc_Id,
                proc_Descripcion: item.proc_Descripcion,
                empr_Id: item.empr_Id,
                empl_NombreCompleto : item.empl_NombreCompleto,
                usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                usuarioCreacion: item.usuarioCreacion,
                modu_FechaCreacion: item.modu_FechaCreacion,
                usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                usuarioModifica: item.usuarioModifica,
                modu_FechaModificacion: item.modu_FechaModificacion,
                usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                usuarioEliminacion: item.usuarioEliminacion,
                modu_FechaEliminacion: item.modu_FechaEliminacion,
                modu_Estado: item.modu_Estado,
               
                
              
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
                modu_Nombre: item.modu_Nombre,
                proc_Descripcion: item.proc_Descripcion,
                empl_NombreCompleto : item.empl_NombreCompleto,
            }));
            return data;
        } catch (error) {
        }
    }

    async function crear(data) {
        try {
            const datos = {
                modu_Nombre: data["modulo"].trim(),
                proc_Id: data.proceso["value"],
                empr_Id: data.empleado["value"],
                usua_UsuarioCreacion: user['uuid'],
                modu_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            const datos = {
                modu_Id: data["id"],
                modu_Nombre: data["modulo"].trim(),
                proc_Id: data.proceso["value"],
                empr_Id: data.empleado["value"],
                usua_UsuarioModificacion: user['uuid'],
                modu_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    async function eliminar(data) {
        try {
            const datos = {
                modu_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                modu_FechaEliminacion: instance.formatFechaHora(new Date()),
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
        ExportData,
    };
}

//const ModulosServices = new ModulosService();
export default ModulosService;
