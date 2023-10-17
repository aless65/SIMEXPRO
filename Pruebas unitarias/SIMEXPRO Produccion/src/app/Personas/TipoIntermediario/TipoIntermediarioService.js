import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function TiposIntermediarioService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/TipoIntermediario/";

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
                    tite_Id: item.tite_Id,
                    tite_Codigo: item.tite_Codigo,
                    tite_Descripcion: item.tite_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tite_FechaCreacion: item.tite_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tite_FechaModificacion: item.tite_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    tite_FechaEliminacion: item.tite_FechaEliminacion,
                    tite_Estado: item.tite_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion,
                };
            });
            return data;
        } catch (error) {
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                tite_Codigo: data["tite_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                tite_Descripcion: data["tite_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                tite_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
        }
    };

    async function ExportData(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1, 
                    tite_Codigo: item.tite_Codigo,
                    tite_Descripcion: item.tite_Descripcion,
                };
            });
            return data;
        }
        catch (error)
        {
            
            
        }
    };
    async function editar(data, Id) {
        try {
            let datos = {
                tite_Id: Id,
                tite_Codigo: data["tite_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                tite_Descripcion: data["tite_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                tite_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
        }
    };

    async function eliminar(idEliminar) {
        try {
            let datos = {
                tite_Id: idEliminar,
                usua_UsuarioEliminacion: user['uuid'],
                tite_FechaEliminacion: instance.formatFechaHora(new Date()),
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

export default TiposIntermediarioService;
