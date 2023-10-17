import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function NivelesComercialesServices() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/NivelesComerciales/";

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
                    nico_Id: item.nico_Id,
                    nico_Codigo: item.nico_Codigo,
                    nico_Descripcion: item.nico_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    nico_FechaCreacion: item.nico_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    nico_FechaModificacion: item.nico_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    nico_FechaEliminacion: item.nico_FechaEliminacion,

                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    UsuarioModificadorNombre: item.usuarioModificacionNombre,
                    UsuarioEliminacionNombre: item.UsuarioEliminacionNombre
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
                    nico_Codigo: item.nico_Codigo,
                    nico_Descripcion: item.nico_Descripcion,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                nico_Codigo: data["nico_Codigo"].trim().replace(/\s+/g, '').toUpperCase(),
                nico_Descripcion: data["nico_Descripcion"].trim().replace(/\s+/g, ''),
                usua_UsuarioCreacion: user['uuid'],
                nico_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                nico_Id: data["id"],
                nico_Codigo: data["nico_Codigo"].trim().replace(/\s+/g, '').toUpperCase(),
                nico_Descripcion: data["nico_Descripcion"].trim().replace(/\s+/g, ''),
                usua_UsuarioModificacion: user['uuid'],
                nico_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function eliminar(data) {
        try {
            let datos = {
                nico_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                nico_FechaEliminacion: instance.formatFechaHora(new Date()),
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


export default NivelesComercialesServices;
