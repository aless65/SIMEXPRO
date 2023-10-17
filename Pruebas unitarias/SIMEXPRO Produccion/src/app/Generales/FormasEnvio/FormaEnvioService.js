import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

function FormaEnvioService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/FormasEnvio/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get('Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    foen_Id: item.foen_Id,
                    foen_Codigo: item.foen_Codigo,
                    foen_Descripcion: item.foen_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    foen_FechaCreacion: item.foen_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    foen_FechaModificacion: item.foen_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    foen_FechaEliminacion: item.foen_FechaEliminacion,
                    foen_Estado: item.foen_Estado,
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
                    foen_Codigo: item.foen_Codigo,
                    foen_Descripcion: item.foen_Descripcion, 
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
                foen_Codigo:data['CodigoFormaEnvio'].trim().replace(/\s+/g, ' ').toUpperCase(),
                foen_Descripcion:data['FormaEnvio'].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion:  user['uuid'],
                foen_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            
        }
    }
    
    async function editar(data,Id) {
        
        try {
            let datos = {
                foen_Id:Id,
                foen_Codigo:data['CodigoFormaEnvio'].trim().replace(/\s+/g, ' ').toUpperCase(),
                foen_Descripcion:data['FormaEnvio'].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                foen_FechaModificacion:instance.formatFechaHora(new Date())  
            }
            const response = await axiosInstance.post('Editar',datos);
            return response;
        } catch (error) {
            
        }
    }
   
    async function eliminar(data) {
        try {
            let datos = {
                foen_Id: data['foen_Codigo'],
                usua_UsuarioEliminacion: user['uuid'],
                foen_FechaEliminacion: instance.formatFechaHora(new Date())
            }
            
            const response = await axiosInstance.post('Eliminar',datos);
            
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

//const formaEnvioService = new FormaEnvioService();
export default FormaEnvioService;
