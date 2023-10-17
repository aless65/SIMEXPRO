import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function TipoDocumentoService() {
    
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/TipoDocumento/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

  
    async function listar () {
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    tido_Id: item.tido_Id,
                    tido_Codigo: item.tido_Codigo,
                    tido_Descripcion: item.tido_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tido_FechaCreacion: item.tido_FechaCreacion,
                    usarioCreacion: item.usarioCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tido_FechaModificacion: item.tido_FechaModificacion,
                    usuarioModificacion: item.usuarioModificacion,

                    tido_Estado: item.tido_Estado,
                };            
            });
            return data;
        }
        catch (error){
            
            
        }
    };

    async function tipoDocumentosDdl(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item) => {
                return {
                  value: item.tido_Id,
                  label: `${item.tido_Codigo} - ${item.tido_Descripcion}`,
                };
            });
            return data;
        } catch (error){
            console.error(error);
        }
    }

    async function crear (data) {
        try{
            let datos = {
                tido_Codigo: data["tido_Codigo"].trim().trim().replace(/\s+/g, ' ').toUpperCase(),
                tido_Descripcion: data["tido_Descripcion"].trim().trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: this.user['uuid'],
                tido_FechaCreacion: new Date(),                
            }
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }
        catch (error) {
            
                       
        }
    };

    async function editar (data) {
        try{
            let datos = {
                tido_Id: data["tido_Id"],                
                tido_Codigo: data["tido_Codigo"].trim().trim().replace(/\s+/g, ' ').toUpperCase(),
                tido_Descripcion: data["tido_Descripcion"].trim().trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: this.user['uuid'],
                tido_FechaModificacion: new Date(),
            }
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }
        catch (error) {
            
                
        }
    };

    return {
        listar,
        crear,
        editar,
        tipoDocumentosDdl
    }
};

export default TipoDocumentoService;