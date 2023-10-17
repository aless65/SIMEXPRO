import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MonedasService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL +  "api/Moneda/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar?mone_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    mone_Id: item.mone_Id,
                    mone_Codigo: item.mone_Codigo,
                    mone_Descripcion: item.mone_Descripcion,
                    pvin_Codigo: item.pvin_Codigo,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    mone_FechaCreacion: item.mone_FechaCreacion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    mone_FechaModificacion: item.mone_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    mone_FechaEliminacion: item.mone_FechaEliminacion,
                    mone_Estado: item.mone_Estado,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                };
            });
            return data;
        } catch (error) {

        }
    }
    
    async function ExportData(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    mone_Codigo: item.mone_Codigo,
                    mone_Descripcion: item.mone_Descripcion,
                };
            }); 
            return data;
        }
        catch (error)
        {

        }
    };

     

    async function crear(data) {
        try {
            let datos = {
                mone_Id: 0,
                mone_Codigo: data.mone_Codigo.trim().replace(/\s+/g, ' ').toUpperCase(),
                mone_Descripcion: data.mone_Descripcion.trim().replace(/\s+/g, ' ').toUpperCase(),
                mone_EsAduana: user['esAduana'],
                usua_UsuarioCreacion: user['uuid'],
                mone_FechaCreacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {

        }
    }

    async function editar(data) {
        try {
            let datos = {
                mone_Id: data.mone_Id,
                mone_Codigo: data.mone_Codigo.trim().replace(/\s+/g, ' ').toUpperCase(),
                mone_Descripcion: data.mone_Descripcion.trim().replace(/\s+/g, ' ').toUpperCase(),
                mone_EsAduana:  user['esAduana'],
                usua_UsuarioModificacion: user['uuid'],
                mone_FechaModificacion:  instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    return {
        listar,
        crear,
        editar,
        ExportData
    };
}

export default MonedasService;
