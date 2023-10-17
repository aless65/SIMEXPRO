import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function CargosService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Cargos/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get("Listar?carg_EsAduana=" + user["esAduana"].toString());
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    carg_Id: item.carg_Id,
                    carg_Nombre: item.carg_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    carg_FechaCreacion: item.carg_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificadorNombre: item.usuarioModificacionNombre,
                    carg_FechaModificacion: item.carg_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    carg_FechaEliminacion: item.carg_FechaEliminacion,
                    carg_Estado: item.carg_Estado,
                    carg_EsAduana: item.carg_Aduana
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
                    carg_Nombre: item.carg_Nombre, 
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
                carg_Nombre: data["carg_Nombre"].trim().replace(/\s+/g, ' '),
                carg_Aduana: user["esAduana"],
                usua_UsuarioCreacion: user['uuid'],
                carg_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {

        }
    }

    async  function editar(data) {
        try {
            let datos = {
                carg_Id: data["id"],
                carg_Nombre: data["carg_Nombre"].trim().replace(/\s+/g, ' '),
                carg_Aduana: user["esAduana"],
                usua_UsuarioModificacion: user['uuid'],
                carg_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {

        }
    }

    return{
        listar, 
        crear,
        editar,
        ExportData
    }
}

export default CargosService;
