import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

function AldeasService () {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    // Peticiones //
    async function listar() {
        try {
            const response = await axiosInstance.get("Aldea/Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    alde_Id: item.alde_Id,
                    alde_Nombre: item.alde_Nombre,
                    ciud_Nombre: item.ciud_Nombre,
                    ciud_Id: item.ciud_Id,
                    pvin_Nombre: item.pvin_Nombre,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    alde_FechaCreacion: item.alde_FechaCreacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    alde_FechaModificacion: item.alde_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    alde_FechaEliminacion: item.alde_FechaEliminacion,
                    alde_Estado: item.alde_Estado
                };
            });
            return data;
        } catch (error) {
            
        }
    }


    async function ExportData(){
        try{
            const response = await axiosInstance.get("Aldea/Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    alde_Nombre: item.alde_Nombre,
                    ciud_Nombre: item.ciud_Nombre, 
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
                alde_Nombre: data["alda_Nombre"].trim().replace(/\s+/g, ' '),
                ciud_Id: data.ciudad["value"],
                usua_UsuarioCreacion: user['uuid'],
                alde_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Aldea/Insertar", datos);
            return response;
        } catch (error) {
            
        }
    }

    async function editar(data) {
        try {
            let datos = {
                alde_Id: data["id"],
                alde_Nombre: data["alda_Nombre"].trim().replace(/\s+/g, ' '),
                ciud_Id: data.ciudad["value"],
                usua_UsuarioModificacion: user['uuid'],
                alde_FechaModificacion: instance.formatFechaHora(new Date()),
            };
        
            const response = await axiosInstance.post("Aldea/Editar", datos);
            return response;
            } catch (error) {
            
            }
        }

    async function ciudadDDL() {
        try {

            const response = await axiosInstance.get("Ciudades/Listar");
            const ciudadesByProvincia = {};
            response.data.data.forEach(ciudad => {
                const provinciaNombre = ciudad.pvin_Nombre;
                if (!ciudadesByProvincia[provinciaNombre]) {
                    ciudadesByProvincia[provinciaNombre] = [];
                }
                ciudadesByProvincia[provinciaNombre].push({
                    value: ciudad.ciud_Id,
                    label: ciudad.ciud_Nombre,
                    provincia: ciudad.pvin_Nombre
                });
            });

            const groupedOptions = Object.entries(ciudadesByProvincia).map(([provincia, ciudades]) => ({
                label: provincia,
                options: ciudades
            }));
            return groupedOptions;
        } catch (error) {
            
        }
    }

    return {
        listar,
        crear,
        editar,
        ciudadDDL,
        ExportData
    };
}
export default AldeasService;
