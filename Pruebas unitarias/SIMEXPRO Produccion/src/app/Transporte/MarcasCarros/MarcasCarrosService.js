import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MarcasCarrosService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/Marcas/";
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
                    marc_Id: item.marc_Id,
                    marc_Descripcion: item.marc_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    marc_FechaCreacion: item.marc_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    marc_FechaModificacion: item.marc_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    marc_FechaEliminacion: item.marc_FechaEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,

                    marc_Estado: item.marc_Estado,
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
                    marc_Descripcion: item.marc_Descripcion,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                marc_Descripcion: data["marc_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                marc_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        
        try {
            let datos = {
                marc_Id: data["id"],
                marc_Descripcion: data["marc_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                marc_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            //
            return response;
        } catch (error) {
            
            
        }
    }

    async function eliminar(data) {
        try {
            let datos = {
                marc_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                marc_FechaEliminacion: instance.formatFechaHora(new Date()),
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
export default MarcasCarrosService;