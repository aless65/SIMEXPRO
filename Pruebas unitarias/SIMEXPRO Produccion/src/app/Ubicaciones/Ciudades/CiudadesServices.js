import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function CiudadesService() {
        const customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        const baseURL = process.env.REACT_APP_API_URL + "api/Ciudades/";
        const axiosInstance = axios.create({
            baseURL: baseURL,
            headers: customHeaders,
        });
        const user = JSON.parse(localStorage.getItem('user'))
    

    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar?ciud_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => ({
                    key:                        index + 1,
                    ciud_Id:                    item.ciud_Id,
                    ciud_Nombre:                item.ciud_Nombre,
                    pvin_Id:                    item.pvin_Id,
                    pais_Codigo:                item.pais_Codigo,
                    pais_Nombre:                item.pais_Nombre,
                    pvin_Nombre:                item.pvin_Nombre,
                    pvin_Codigo:                item.pvin_Codigo,
                    pais_Id:                    item.pais_Id,
                    ciud_EsAduana:              item.ciud_EsAduana,
                    usua_UsuarioCreacion:       item.usua_UsuarioCreacion,
                    ciud_FechaCreacion:         item.ciud_FechaCreacion,
                    usuarioCreacionNombre:      item.usuarioCreacionNombre,
                    usuarioModificadorNombre:   item.usuarioModificadorNombre,
                    usuarioEliminacionNombre:   item.usuarioEliminacionNombre,
                    usua_UsuarioEliminacion:    item.usua_UsuarioEliminacion,
                    ciud_FechaEliminacion:      item.ciud_FechaEliminacion,
                    ciud_FechaModificacion:     item.ciud_FechaModificacion,
                    usua_UsuarioModificacion:   item.usua_UsuarioModificacion,
                    ciud_Estado:                item.ciud_Estado,
                
            }));
            return data;
        } catch (error) {

        }
    }
    
    async function ExportData(){
        try{
            const response = await axiosInstance.get(`Listar?ciud_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    ciud_Nombre:                item.ciud_Nombre,
                    pvin_Nombre:                item.pvin_Nombre,
                    pais_Nombre:                item.pais_Nombre,
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
                ciud_Nombre:            data["nombreCuidad"].trim(),
                pvin_Id:                data.provincia.value,
                ciud_EsAduana:          user['esAduana'],
                usua_UsuarioCreacion:   user['uuid'],
                ciud_FechaCreacion:     instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {

        }
    }

    async function editar(data) {
        try {
            let datos = {
                ciud_Id:					data["id"],
                ciud_Nombre:			    data["nombreCuidad"].trim(),
                pvin_Id:					data.provincia.value,
                ciud_EsAduana:              user['esAduana'],
                usua_UsuarioModificacion:	user['uuid'],
                ciud_FechaModificacion:     instance.formatFechaHora(new Date())
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

//const CiudadesServices = new CiudadesService();
export default CiudadesService;
