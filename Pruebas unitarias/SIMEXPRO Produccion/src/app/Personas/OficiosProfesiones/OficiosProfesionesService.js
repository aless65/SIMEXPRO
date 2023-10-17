import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

function OficiosProfesionesService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Oficio_Profesiones/";

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
                    ofpr_Id: item.ofpr_Id,
                    ofpr_Nombre: item.ofpr_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    ofpr_FechaCreacion: item.ofpr_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    ofpr_FechaModificacion: item.ofpr_FechaModificacion,
                    ofpr_Estado: item.ofpr_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
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
                    ofpr_Nombre: item.ofpr_Nombre,
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
                ofpr_Nombre:  data["oficios"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                ofpr_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
        }
    }
    
    async function editar(data,Id) {
        try {
            let datos = {
                ofpr_Id:Id,
                ofpr_Nombre: data["oficios"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                ofpr_FechaModificacion: instance.formatFechaHora(new Date()),
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

export default OficiosProfesionesService;
