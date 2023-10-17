import { ConsoleSqlOutlined } from "@ant-design/icons";
import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function CategoriasServices() {
        const customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        const baseURL = process.env.REACT_APP_API_URL + "api/Categoria/";
        const axiosInstance = axios.create({
            baseURL: baseURL,
            headers: customHeaders,
        });
        const user = JSON.parse(localStorage.getItem('user'))
    

    async function listar() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key:                        index + 1,
                    cate_Id:                    item.cate_Id,
                    cate_Descripcion:           item.cate_Descripcion,
                    usua_UsuarioCreacion:       item.usua_UsuarioCreacion,
                    cate_FechaCreacion:         item.cate_FechaCreacion,
                    usua_UsuarioModificacion:   item.usua_UsuarioModificacion,
                    cate_FechaModificacion:     item.cate_FechaModificacion,
                    usua_UsuarioEliminacion:    item.usua_UsuarioEliminacion,
                    cate_FechaEliminacion:      item.cate_FechaEliminacion,
                    cate_Estado:                item.cate_Estado,
                    usuarioCreacionNombre:      item.usuarioCreacionNombre,
                    usuarioModificacionNombre:  item.usuarioModificacionNombre,
                    usuarioEliminacionNombre:   item.usuarioEliminacionNombre
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
                    key:                        index + 1,
                    cate_Descripcion:           item.cate_Descripcion,
                };
            });
            return data;
        } catch (error) {
        }
    }

    async function crear(data) {
        try {
            let datos = {
                cate_Descripcion:       data.categoria.trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion:   user['uuid'],
                cate_FechaCreacion:     instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            let datos = {
                cate_Id:                    data["id"],
                cate_Descripcion:           data.categoria.trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion:   user['uuid'],
                cate_FechaModificacion:     instance.formatFechaHora(new Date())
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
        ExportData
    }


}

//const CategoriasServices = new CategoriasService();
export default CategoriasServices;
