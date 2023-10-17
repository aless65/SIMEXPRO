import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function DocumentoDeSancionesService () {
    
    const user = JSON.parse(localStorage.getItem('user'))

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/DocumentosSanciones/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    async function getDocumentosSanciones(){
        const response = await axiosInstance.get("Listar");

        return response.data.data;
    }

    async function guardarUrlArchivo(modelo, urlArchivo){
        let datos = {
            "dosa_Id": 0,
            "dosa_NombreDocumento": modelo.nombreArchivo,
            "dosa_UrlDocumento": urlArchivo,
            "usua_UsuarioCreacion": user["uuid"],
            "dosa_FechaCreacion": new Date()
        }

        const response =  await axiosInstance.post("Insertar", datos);

        return response;
    }

    return{
        getDocumentosSanciones,
        guardarUrlArchivo
    }
}

export default DocumentoDeSancionesService;
