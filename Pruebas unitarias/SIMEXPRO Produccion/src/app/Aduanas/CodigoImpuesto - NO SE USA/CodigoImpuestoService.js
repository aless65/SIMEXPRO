import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class CodigoImpuestoService {
    constructor(){
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/CodigoImpuesto/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'));
    };

    async listar () {
        try{
            const response = await this.axiosInstance.get("Listar");
            ;
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    coim_Id: item.coim_Id,   		
                    coim_Descripcion: item.coim_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    coim_FechaCreacion: item.coim_FechaCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    coim_FechaModificacion: item.coim_FechaModificacion,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                    coim_FechaEliminacion: item.coim_FechaEliminacion,

                    coim_Estado: item.coim_Estado,
                };
            });
            return data;
        }
        catch (error) {
            
            
        }
    };
    async ExportData () {
        try{
            const response = await this.axiosInstance.get("Listar");
            ;
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,	
                    coim_Descripcion: item.coim_Descripcion,
              
                };
            });
            return data;
        }
        catch (error) {
            
            
        }
    };


    async crear (data) {
        try{
            let datos = {
                coim_Descripcion: data["coim_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: this.user['uuid'],
                coim_FechaCreacion: new Date(),
            }
            const response = await this.axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
            
        }
    };

    async editar (data) {
        try{
            let datos = {
                coim_Id: data["coim_Id"],
                coim_Descripcion: data["coim_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: this.user['uuid'],
                coim_FechaModificacion: new Date(),
            }
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        }
        catch (error) {
            
            
        }
    };

    async eliminar (data) {
        try{
            let datos = {
                coim_Id: data["coim_Id"],
                usua_UsuarioEliminacion: this.user['uuid'],
                coim_FechaEliminacion: new Date(),       
            }
            const response = this.axiosInstance.post("Eliminar", datos);
            return response;
        }
        catch (error) {
            
            
        }
    };
};

const codigoImpuestoService = new CodigoImpuestoService();
export default codigoImpuestoService;