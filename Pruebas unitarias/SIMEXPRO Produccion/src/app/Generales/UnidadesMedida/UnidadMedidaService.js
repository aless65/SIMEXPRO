import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";


function UnidadesMedidaService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/UnidadMedidas/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar?unme_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    unme_Id: item.unme_Id,
                    unme_Descripcion: item.unme_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    unme_FechaCreacion: item.unme_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    unme_FechaModificacion: item.unme_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    unme_FechaEliminacion: item.unme_FechaEliminacion,
                    unme_Estado: item.unme_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre
                };
            });
            return data;
        } catch (error) {
        }
    }


    async function ExportData() {
        try {
            const response = await axiosInstance.get(`Listar?unme_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    unme_Descripcion: item.unme_Descripcion,
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
                unme_Descripcion: data['nombre'].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                unme_EsAduana: user["esAduana"],
                unme_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Insertar', datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data, Id) {
        try {
            let datos = {
                unme_Id: Id,
                unme_Descripcion: data['nombre'].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                unme_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Editar', datos);
            return response;
        } catch (error) {
        }
    }

    async function eliminar(idEliminar) {
        try {
            let datos = {
                unme_Id: idEliminar,
                usua_UsuarioEliminacion: user['uuid'],
                unme_FechaEliminacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Eliminar', datos);
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

export default UnidadesMedidaService;