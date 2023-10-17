import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function EstadoMercanciasService (){

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/EstadoMercancias/";

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
                    merc_Id: item.merc_Id,
                    merc_Codigo: item.merc_Codigo,
                    merc_Descripcion: item.merc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    merc_FechaCreacion: item.merc_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    merc_FechaModificacion: item.merc_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    merc_FechaEliminacion: item.merc_FechaEliminacion,
                    merc_Estado: item.merc_Estado,
                    usua_NombreCreacion: item.usua_NombreCreacion,
                    usua_NombreModificacion: item.usua_NombreModificacion,                   
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
                    merc_Codigo: item.merc_Codigo, 
                    merc_Descripcion: item.merc_Descripcion,
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
                merc_Codigo:data['CodigoEstado'].trim().toUpperCase().replace(/\s+/g, ' '),
                merc_Descripcion:data['Estado'].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                merc_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            
        }
    }


    async function editar(data,Id) {
        try {
            let datos = {
                merc_Id:Id,
                merc_Codigo:data['CodigoEstado'].trim().toUpperCase().replace(/\s+/g, ' '),
                merc_Descripcion:data['Estado'].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion:user['uuid'],
                merc_FechaModificacion:instance.formatFechaHora(new Date())  
            }
            const response = await axiosInstance.post('Editar',datos);
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

//const EstadoMercanciasServices = new EstadoMercanciasService();
export default EstadoMercanciasService;
