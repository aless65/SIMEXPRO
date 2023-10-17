import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function FormasPagoService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/FormasDePago/";

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
                    fopa_Id: item.fopa_Id,
                    fopa_Descripcion: item.fopa_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    fopa_FechaCreacion: item.fopa_FechaCreacion,
                    usua_NombreCreacion: item.usua_NombreCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    fopa_FechaModificacion: item.fopa_FechaModificacion,
                    usua_NombreModificacion: item.usua_NombreModificacion,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    fopa_FechaEliminacion: item.fopa_FechaEliminacion,

                    fopa_Estado: item.fopa_Estado,
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
                    fopa_Descripcion: item.fopa_Descripcion,
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
                fopa_Descripcion: data["fopa_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                fopa_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                fopa_Id: data["id"],
                fopa_Descripcion: data["fopa_Descripcion"].trim().replace(/\s+/g, ' '),

                usua_UsuarioModificacion: user['uuid'],
                fopa_FechaModificacion: instance.formatFechaHora(new Date()),
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

//const FormasPagoServices = new FormasPagoService();
export default FormasPagoService;
