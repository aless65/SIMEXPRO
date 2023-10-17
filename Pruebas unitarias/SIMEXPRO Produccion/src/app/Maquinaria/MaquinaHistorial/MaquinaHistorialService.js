import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MaquinaHistorialService() {

        const customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        const baseURL = process.env.REACT_APP_API_URL + "api/MaquinaHistorial/";
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
                    mahi_Id: item.mahi_Id,
                    maqu_Id: item.maqu_Id,
                    maquinaNumeroSerie: item.maquinaNumeroSerie,
                    mahi_FechaInicio: new Date(item.mahi_FechaInicio).toLocaleString(),
                    mahi_FechaFin: new Date(item.mahi_FechaFin).toLocaleString(),
                    mahi_Observaciones: item.mahi_Observaciones,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    mahi_FechaCreacion: item.mahi_FechaCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificaNombre: item.usuarioModificaNombre,
                    mahi_FechaModificacion: item.mahi_FechaModificacion,
                    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioEliminaNombre: item.usuarioEliminaNombre,
                    mahi_FechaEliminacion: item.mahi_FechaEliminacion,

                    mahi_Estado: item.mahi_Estado,
                };
            });
            return data;
        } catch (error) {
        }
    }
    async function ExportData() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    maquinaNumeroSerie: item.maquinaNumeroSerie,
                    mahi_FechaInicio: new Date(item.mahi_FechaInicio).toLocaleString(),
                    mahi_FechaFin: new Date(item.mahi_FechaFin).toLocaleString(),
                };
            });
            return data;
        } catch (error) {
        }
    }

    async function listarPorNumeroDeSerie(numeroSerie) {
        try {
            const response = await axiosInstance.get("Listar");
            const allData = response.data.data;            
            const filteredData = allData.filter(item => item.maquinaNumeroSerie === numeroSerie);
            const data = filteredData.map((item, index) => {
                return {
                    key: index + 1,
                    mahi_Id: item.mahi_Id,
                    maqu_Id: item.maqu_Id,
                    maquinaNumeroSerie: item.maquinaNumeroSerie,
                    mahi_FechaInicio: item.mahi_FechaInicio,
                    mahi_FechaFin: item.mahi_FechaFin,
                    mahi_Observaciones: item.mahi_Observaciones,
    
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    mahi_FechaCreacion: item.mahi_FechaCreacion,
    
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificaNombre: item.usuarioModificaNombre,
                    mahi_FechaModificacion: item.mahi_FechaModificacion,
    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioEliminaNombre: item.usuarioEliminaNombre,
                    mahi_FechaEliminacion: item.mahi_FechaEliminacion,
    
                    mahi_Estado: item.mahi_Estado,
                };
            });
            return data;
        } catch (error) {
        }
    }
    
    async function crear(data) {
        try {
            let datos = {
                maqu_Id: data.maquina["value"],
                mahi_FechaInicio: data["mahi_FechaInicio"],
                mahi_FechaFin: data["mahi_FechaFin"],
                mahi_Observaciones: data["mahi_Observaciones"].trim(),
                usua_UsuarioCreacion: user['uuid'],
                mahi_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            let datos = {
                mahi_Id: data["mahi_Id"],
                maqu_Id: data.maquina["value"],
                mahi_FechaInicio: instance.formatFechaHora(new Date(data.mahi_FechaInicio)),
                mahi_FechaFin: instance.formatFechaHora(new Date(data.mahi_FechaFin)),
                mahi_Observaciones: data["mahi_Observaciones"].trim(),
                usua_UsuarioModificacion: user['uuid'],
                mahi_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    async function eliminar (data){
        try{
            let datos = {
                mahi_Id: data["mahi_Id"],
                usua_UsuarioEliminacion: user['uuid'], 
                mahi_FechaEliminacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        }catch (error) {
        }
    }

    return {
        listar,
        crear,
        editar,
        eliminar,
        listarPorNumeroDeSerie,
        ExportData,
    }
}
export default MaquinaHistorialService;