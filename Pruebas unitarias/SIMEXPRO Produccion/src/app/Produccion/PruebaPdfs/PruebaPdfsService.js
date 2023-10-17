import axios from "axios";
import * as filestack from 'filestack-js';
import instance from "src/app/auth/services/jwtService/jwtService";

function PruebaPdfsService () {
    const client = filestack.init('Abp6Y2MZNTla3VKwreDiez');
 
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Procesos/";

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
                    proc_Id: item.proc_Id,
                    proc_Descripcion: item.proc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    proc_FechaCreacion: item.proc_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    proc_FechaModificacion: item.proc_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    proc_FechaEliminacion: item.proc_FechaEliminacion,
                    proc_Estado: item.proc_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            let datos = {
                proc_Descripcion: data["descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                proc_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                proc_Id: data["id"],
                proc_Descripcion: data["descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                proc_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function eliminar(data) {
        try {
            let datos = {
                proc_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                proc_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function cargarArchivos(file) {
        try {

            // const formData = new FormData();
            // formData.append('file', file, file.name);
            // axios.post(`https://store1.gofile.io/uploadFile`, formData)
            // .then((response) => {
            //     ;
            // })
        } catch (error) {
            
            
        }
    }

    return{
        listar,
        crear,
        editar,
        eliminar,
        cargarArchivos
    }
}

export default PruebaPdfsService;