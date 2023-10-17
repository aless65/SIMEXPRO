import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ProvinciasService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Provincias/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));


    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar?pvin_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    pvin_Id: item.pvin_Id,
                    pvin_Nombre: item.pvin_Nombre,
                    pvin_Codigo: item.pvin_Codigo,
                    pais_Id: item.pais_Id,
                    pais_Nombre: item.pais_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    pvin_FechaCreacion: item.pvin_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    pvin_FechaModificacion: item.pvin_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    pvin_FechaEliminacion: item.pvin_FechaEliminacion,
                    pvin_Estado: item.pvin_Estado,
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
                    pvin_Codigo: item.pvin_Codigo,
                pvin_Nombre: item.pvin_Nombre,
                pais_Nombre: item.pais_Nombre,
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
                pvin_Nombre: data["prov_Nombre"].trim().replace(/\s+/g, ' '),
                pvin_Codigo: data["prov_Codigo"].trim().replace(/\s+/g, ' '),
                pais_Id: data.pais["value"],
                pvin_EsAduana: user["esAduana"],
                usua_UsuarioCreacion: user['uuid'],
                pvin_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {

        }
    }

    async function editar(data) {
        try {
            let datos = {
                pvin_Id: data["id"],
                pvin_Nombre: data["prov_Nombre"].trim().replace(/\s+/g, ' '),
                pvin_Codigo: data["prov_Codigo"].trim(),
                pais_Id: data.pais["value"],
                pvin_EsAduana: user["esAduana"],
                usua_UsuarioModificacion: user['uuid'],
                pvin_FechaModificacion: instance.formatFechaHora(new Date()),
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

export default ProvinciasService;
