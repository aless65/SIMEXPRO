import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";


class DeclarantesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Declarantes/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

  
}

const DeclarantesServices = new DeclarantesService();
export default DeclarantesServices;
