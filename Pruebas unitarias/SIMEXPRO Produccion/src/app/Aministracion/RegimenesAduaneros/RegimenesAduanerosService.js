import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
// import user from "src/app/auth/services/jwtService/dataUser";

function RegimenesAduanerosServices() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/RegimenAduanero/";

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
                    regi_Id: item.regi_Id,
                    regi_Codigo: item.regi_Codigo,
                    regi_Descripcion: item.regi_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    regi_FechaCreacion: item.regi_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    regi_FechaModificacion: item.regi_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    regi_FechaEliminacion: item.regi_FechaEliminacion,

                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    UsuarioModificadorNombre: item.usuarioModificacionNombre,
                    UsuarioEliminacionNombre: item.usuarioEliminacionNombre
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
                    regi_Codigo: item.regi_Codigo,
                    regi_Descripcion: item.regi_Descripcion,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                regi_Codigo: data["regi_Codigo"].trim(),
                regi_Descripcion: data["regi_Descripcion"].trim(),
                usua_UsuarioCreacion: user['uuid'],
                regi_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                regi_Id: data["id"],
                regi_Codigo: data["regi_Codigo"].trim(),
                regi_Descripcion: data["regi_Descripcion"].trim(),
                usua_UsuarioModificacion: user['uuid'],
                regi_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function eliminar(data) {
        try {
            let datos = {
                regi_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                regi_FechaEliminacion: instance.formatFechaHora(new Date()),
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


export default RegimenesAduanerosServices;
