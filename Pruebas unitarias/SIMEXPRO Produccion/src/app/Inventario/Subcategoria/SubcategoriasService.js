import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
// import user from "src/app/auth/services/jwtService/dataUser";

function SubcategoriasService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Subcategoria/";

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
                    subc_Id: item.subc_Id,
                    cate_Id: item.cate_Id,
                    cate_Descripcion: item.cate_Descripcion,
                    subc_Descripcion: item.subc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    subc_FechaCreacion: item.subc_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    subc_FechaModificacion: item.subc_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    subc_FechaEliminacion: item.subc_FechaEliminacion,
                    subc_Estado: item.subc_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificaNombre: item.usuarioModificaNombre,
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
                    subc_Descripcion: item.subc_Descripcion,
                    cate_Descripcion: item.cate_Descripcion,
                   };
            });
            return data;
        } catch (error) {
        }
    }

    async function crear(data) {
        try {
            let datos = {
                cate_Id: data.categoria["value"],
                subc_Descripcion: data["subCategoria"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                subc_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data) {
        try {
            let datos = {
                subc_Id: data["id"],
                cate_Id: data.categoria["value"],
                subc_Descripcion: data["subCategoria"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                subc_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    async function eliminar(data) {
        try {
            let datos = {
                subc_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                subc_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Eliminar", datos);
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

// const subcategoriasServices = new SubcategoriasService();
export default SubcategoriasService;
