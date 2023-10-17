import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ImpuestoSelectivoConsumoCondicionesVehiculo () {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/ImpuestosSelectivoConsumoCondicionesVehiculo/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });
    const user = JSON.parse(localStorage.getItem('user'));


    async function listar(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    selh_Id: item.selh_Id,
                    selh_EsNuevo: item.selh_EsNuevo,
                    vehiculoNuevo: item.selh_EsNuevo == true ? 'Si' : 'No',
                    selh_RangoInicio : item.selh_RangoInicio,
                    selh_RangoFin: item.selh_RangoFin,
                    selh_ImpuestoCobrar:  item.selh_ImpuestoCobrar,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    selh_FechaCreacion:  item.selh_FechaCreacion,
                    usua_UsuarioModificacion:  item.usua_UsuarioModificacion,
                    selh_FechaModificacion: item.selh_FechaModificacion,
                    usua_UsuarioCreacionNombre: item.usua_UsuarioCreacionNombre,
                    usua_UsuarioModificacionNombre:  item.usua_UsuarioModificacionNombre
                };
            });
            return data;
        }
        catch (error)
        {
            
        }
    };
    
    async function ExportData(){
        try{
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    selh_EsNuevo: item.selh_EsNuevo == true ? 'Si' : 'No',
                    selh_RangoInicio : item.selh_RangoInicio,
                    selh_RangoFin: item.selh_RangoFin,
                    selh_ImpuestoCobrar:  item.selh_ImpuestoCobrar,
                };
            });
            return data;
        }
        catch (error)
        {
            
        }
    };

    async function crear(data, checked){
        try{
            let datos = {
                selh_EsNuevo: checked, 
                selh_RangoInicio: data["selh_RangoInicio"].toString().trim().replace(/\s+/g, ' '), 
                selh_RangoFin: data["selh_RangoFin"].toString().trim().replace(/\s+/g, ' '), 
                selh_ImpuestoCobrar: data["selh_ImpuestoCobrar"].toString().trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'], 
                selh_FechaCreacion: instance.formatFechaHora(new Date()), 
            };
            console.log(datos);
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            
        }
    };

    async function editar(data, checked){
        try{
            let datos = {
                selh_Id: data["selh_Id"],
                selh_EsNuevo: checked, 
                selh_RangoInicio: data["selh_RangoInicio"].toString().trim().replace(/\s+/g, ' '), 
                selh_RangoFin: data["selh_RangoFin"].toString().trim().replace(/\s+/g, ' '), 
                selh_ImpuestoCobrar: data["selh_ImpuestoCobrar"].toString().trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'], 
                selh_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            console.log(datos);
            const response = await axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
        }
    };

    async function eliminar (data){
        try{
            let datos = {
                selh_Id: data["selh_Id"],
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        }catch (error) {
            
        }
    }

    return{
        listar,
        crear,
        editar,
        eliminar,
        ExportData,
    }
}

export default ImpuestoSelectivoConsumoCondicionesVehiculo;
