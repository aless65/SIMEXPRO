import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";


function FuncionesMaquinaService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/FuncionesMaquina/";


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
                    func_Id: item.func_Id,
                    func_Nombre: item.func_Nombre,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    func_FechaCreacion: item.func_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    func_FechaModificacion: item.func_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    func_FechaEliminacion: item.func_FechaEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,

                    func_Estado: item.func_Estado,
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
                    func_Nombre: item.func_Nombre,
                };
            });
            return data;
        } catch (error) {
        }
    }

    async function crear(data) {
        try {
            let datos = {
                func_Nombre: data["func_Nombre"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                func_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            let datos = {
                func_Id: data["id"],
                func_Nombre: data["func_Nombre"].trim().replace(/\s+/g, ' '),

                usua_UsuarioModificacion: user['uuid'],
                func_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    async function eliminar(data) {

        try {
            let datos = {
                func_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                func_FechaEliminacion: instance.formatFechaHora(new Date()),
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

//const FuncionesMaquinaServices = new FuncionesMaquinaService();
export default FuncionesMaquinaService;
