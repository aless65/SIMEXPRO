import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ImpuestosProdService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/ImpuestoProd/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders, 
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => ({
                key: index + 1,
                impr_Id: item.impr_Id,
                impr_Descripcion: item.impr_Descripcion,
                impr_Valor: item.impr_Valor,
                usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                impr_FechaModificacion: item.impr_FechaModificacion,
                usuarioNombre: item.usuarioNombre
            }));
            return data;
        } catch (error) {
        }
    }

    async function ExportData() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => ({
                key: index + 1,
                impr_Descripcion: item.impr_Descripcion,
                impr_Valor : item.impr_Valor,

            }));
            return data;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            const datos = {
                impr_Id: data["id"],
                impr_Valor: data["valor"],
                usua_UsuarioModificacion: user['uuid'],
                impr_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

   

    return {
        listar,
        editar,
        ExportData
    };
}

//const ModulosServices = new ModulosService();
export default ImpuestosProdService;
