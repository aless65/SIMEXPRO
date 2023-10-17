import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function IncotermService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Incoterm/";

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
                    inco_Id: item.inco_Id,
                    inco_Codigo: item.inco_Codigo,
                    inco_Descripcion: item.inco_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    inco_FechaCreacion: item.inco_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    inco_FechaModificacion: item.inco_FechaModificacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    inco_FechaEliminacion: item.inco_FechaEliminacion,

                    inco_Estado: item.inco_Estado,
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
                    inco_Codigo: item.inco_Codigo,
                    inco_Descripcion: item.inco_Descripcion,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                inco_Codigo: data["inco_Codigo"].trim().replace(/\s+/g, ' '),
                inco_Descripcion: data["inco_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                inco_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                inco_Id: data["id"],
                inco_Codigo: data["inco_Codigo"].trim().replace(/\s+/g, ' '),
                inco_Descripcion: data["inco_Descripcion"].trim().replace(/\s+/g, ' '),


                usua_UsuarioModificacion: user['uuid'],
                inco_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
           // 
            return response;
        } catch (error) {
            
            
        }
    }

    return {
        listar,
        crear,
        editar,
        // eliminar
        ExportData,
    };
}

//const IncotermServices = new IncotermService();
export default IncotermService;
