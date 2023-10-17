import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MarcasMaquinaService () {
    
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/MarcasMaquinas/";
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
                    marq_Id: item.marq_Id,
                    marq_Nombre: item.marq_Nombre,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    marq_FechaCreacion: item.marq_FechaCreacion,
                    usuarioCreacion: item.usuarioCreacion,
                    
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    marq_FechaModificacion: item.marq_FechaModificacion,
                    usuarioModificador: item.usuarioModificador,
                    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    marq_FechaEliminacion: item.marq_FechaEliminacion,
                    usuarioEliminacion: item.usuarioEliminacion,

                    marq_Estado: item.marq_Estado
                };
            });
            return data;
        }
        catch (error) {
        }
    };

    async function crear(data) {
        try {
            let datos = {
                marq_Nombre: data["marq_Nombre"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                marq_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }
        catch (error) {
        }
    };
    
    async function ExportData(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    marq_Nombre: item.marq_Nombre, 
                };
            }); 
            return data;
        }
        catch (error)
        {
        }
    };

    async function editar(data) {
        try {
            let datos = {
                marq_Id: data["marq_Id"],
                marq_Nombre: data["marq_Nombre"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                marq_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response
        }
        catch (error) {
        }
    };

    async function eliminar(data) {
        try {
            let datos = {
                marq_Id: data["marq_Id"],
                usua_UsuarioEliminacion: user['uuid'],
                marq_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        }
        catch(error){
        }
    }

    return{
        listar,
        crear,
        editar,
        eliminar
        ,ExportData
    }
}

export default MarcasMaquinaService;
