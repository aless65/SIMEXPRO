import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MaquinasService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/Maquinas/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'))

    async function listar() {
        try {
            const response = await axiosInstance.get('Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    maqu_Id: item.maqu_Id,
                    maqu_NumeroSerie: item.maqu_NumeroSerie,
                    mmaq_Id: item.mmaq_Id,
                    mmaq_Nombre: item.mmaq_Nombre,
                    modu_Nombre: item.modu_Nombre,
                    modu_Id: item.modu_Id,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    maqu_FechaCreacion: item.maqu_FechaCreacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    maqu_FechaModificacion: item.maqu_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    maqu_FechaEliminacion: item.maqu_FechaEliminacion,
                    maqu_Estado: item.maqu_Estado
                };
            });
            return data;
        } catch (error) {
            
        }
    }

    async function ExportData() {
        try {
            const response = await axiosInstance.get('Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    maqu_NumeroSerie: item.maqu_NumeroSerie,
                    mmaq_Nombre: item.mmaq_Nombre,
                    modu_Nombre: item.modu_Nombre,
                };
            });
            return data;
        } catch (error) {
        }
    }

    async function crear(data) {
        try {
            let datos = {
                maqu_NumeroSerie: data["maqu_NumeroSerie"].trim().toUpperCase(),
                modu_Id: data["modu_Id"]["value"],
                mmaq_Id: data["mmaq_Id"]["value"],
                usua_UsuarioCreacion: user['uuid'],
                maqu_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }


    async function editar(data) {
        try {
            let datos = {
                maqu_Id: data["maqu_Id"],
                maqu_NumeroSerie: data["maqu_NumeroSerie"].trim().toUpperCase(),
                modu_Id: data["modu_Id"]["value"],
                mmaq_Id: data["mmaq_Id"]["value"],
                usua_UsuarioModificacion: user['uuid'],
                maqu_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);

            return response;
        } catch (error) {
        }
    }


    async function listarUsuarios() {
        try {
            const response = await axiosInstance.get('Usuarios/Listar');
            return response.data;
        } catch (error) {
        }
    }


    async function eliminar(data) {
        try {
            const datos = {
                maqu_Id: data.maqu_Id,
                usua_UsuarioEliminacion: user['uuid'],
                maqu_FechaEliminacion: instance.formatFechaHora(new Date()),
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
        ExportData,
    }

}

// const MaquinasServices = new MaquinasService();
export default MaquinasService;
