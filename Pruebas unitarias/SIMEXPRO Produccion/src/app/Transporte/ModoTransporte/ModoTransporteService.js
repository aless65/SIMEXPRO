import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ModoTransporteService() {
   
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/ModoTransporte/";
    
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
                    motr_Id: item.motr_Id,
                    motr_Descripcion: item.motr_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    motr_FechaCreacion: item.motr_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    motr_FechaModificacion: item.motr_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    motr_FechaEliminacion: item.motr_FechaEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,

                    motr_Estado: item.motr_Estado,
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
                    motr_Descripcion: item.motr_Descripcion,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                motr_Descripcion: data["motr_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                motr_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                motr_Id: data["id"],
                motr_Descripcion: data["motr_Descripcion"].trim().replace(/\s+/g, ' '),

                usua_UsuarioModificacion: user['uuid'],
                motr_FechaModificacion: instance.formatFechaHora(new Date()),
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
       // eliminar
       ExportData,
    };
}

//const ModoTransporteServices = new ModoTransporteService();
export default ModoTransporteService;
