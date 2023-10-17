import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function TallasServices () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Tallas/";

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
                    tall_Id: item.tall_Id,
                    tall_Codigo: item.tall_Codigo,
                    tall_Nombre: item.tall_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tall_FechaCreacion: item.tall_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tall_FechaModificacion: item.tall_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    tall_FechaEliminacion: item.tall_FechaEliminacion,
                    tall_Estado: item.tall_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion
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
                    tall_Codigo: item.tall_Codigo,
                    tall_Nombre: item.tall_Nombre,
                };
            });
            return data;
        } catch (error) {
        }
    }

    async function crear(data) {
        try {
            let datos = {
                tall_Codigo: data.tall_Codigo.trim().toUpperCase().replace(/\s+/g, ' '),
                tall_Nombre: data.tall_Nombre.trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                tall_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            let datos = {
                tall_Id: data.tall_Id,
                tall_Codigo: data.tall_Codigo.trim().toUpperCase().replace(/\s+/g, ' '),
                tall_Nombre: data.tall_Nombre.trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                tall_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }
    return{
        listar, 
        crear,
        editar,
        ExportData,
    }
}

// const TallasServices = new TallasService();
export default TallasServices;
