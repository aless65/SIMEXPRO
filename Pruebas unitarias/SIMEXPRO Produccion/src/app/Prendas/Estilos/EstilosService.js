import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function EstilosService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Estilos";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));


    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    esti_Id: item.esti_Id,
                    esti_Descripcion: item.esti_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    esti_FechaCreacion: item.esti_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    esti_FechaModificacion: item.esti_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    esti_FechaEliminacion: item.esti_FechaEliminacion,
                    esti_Estado: item.esti_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion
                };
            });
            return data;
        } catch (error) {
        }
    }
    async function ExportData() {
        try {
            const response = await axiosInstance.get(`Listar`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    esti_Descripcion: item.esti_Descripcion,
                };
            });
            return data;
        } catch (error) {
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                esti_Descripcion: data.esti_Descripcion.trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                esti_FechaCreacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            let datos = {
                esti_Id: data.esti_Id,
                esti_Descripcion: data.esti_Descripcion.trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                esti_FechaModificacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    async function eliminar(data) {
        try {
            let datos = {
                esti_Id: data.esti_Id,
                usua_UsuarioEliminacion: user['uuid'],
                esti_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
        }
    }
    return{
        listar,
        crear,
        editar,
        eliminar,
        ExportData,
    }
}

export default EstilosService;
