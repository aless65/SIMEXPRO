import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class ImportadoresService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Importadores/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

  
}

const ImportadoresServices = new ImportadoresService();
export default ImportadoresServices;
