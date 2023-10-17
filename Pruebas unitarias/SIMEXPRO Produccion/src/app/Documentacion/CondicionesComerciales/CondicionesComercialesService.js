import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function CondicionesComercialesService() {
    
        const customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        const baseURL = process.env.REACT_APP_API_URL + "api/CondicionesComerciales/";
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
                    coco_Id: item.coco_Id,
                    coco_Codigo: item.coco_Codigo,
                    coco_Descripcion: item.coco_Descripcion,
                    usuarioNombreCreacion: item.usuarioNombreCreacion,
                    coco_FechaCreacion: item.coco_FechaCreacion,
                    usuarioNombreModificacion: item.usuarioNombreModificacion,
                    coco_FechaModificacion: item.coco_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioNombreEliminacion: item.usuarioNombreEliminacion,
                    coco_FechaEliminacion: item.coco_FechaEliminacion,
                    coco_Estado: item.coco_Estado
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                coco_Codigo: data["coco_Codigo"].trim().toUpperCase(),
                coco_Descripcion: data["coco_Descripcion"].trim(),
                usua_UsuarioCreacion: user['uuid'],
                coco_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                coco_Id: data['coco_Id'],
                coco_Codigo: data["coco_Codigo"].trim().toUpperCase(),
                coco_Descripcion: data["coco_Descripcion"].trim(),
                usua_UsuarioCreacion: user['uuid'],
                coco_FechaCreacion: instance.formatFechaHora(new Date()),
                usua_UsuarioModificacion: user['uuid'],
                coco_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function eliminar (data){
        try{
            let datos = {
                coco_Id: data["coco_Id"],
                usua_UsuarioEliminacion: user['uuid'], 
                coco_FechaEliminacion: instance.formatFechaHora(new Date()), 
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        }catch (error) {
            
            
        }
    }

    async function ExportData(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    coco_Codigo: item.coco_Codigo,
                    coco_Descripcion: item.coco_Descripcion,
                };
            });
            return data;
        }
        catch (error)
        {
            
            
        }
    };

    return {
        listar,
        crear,
        ExportData,
        editar,
        eliminar
    }
}
export default CondicionesComercialesService;