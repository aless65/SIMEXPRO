import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function PantallasService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Pantallas/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    
    async function ListadoPantallas() {
        try {
            const response = await axiosInstance.get("Listar?pant_EsAduana=" + user["esAduana"].toString());
            const responseData = response.data || { data: [] };
            const data = responseData.data.map((item, index) => {
                return {
                    key: index,
                    pant_Id: item.pant_Id,
                    pant_Nombre: item.pant_Nombre,
                }
            });
            return data;
        } catch (error) {
            ;
        }
    }
    

    async function ListadoPantallasLeft(right) {
        try {
            let response;
    
            // Si 'right' está vacío, simplemente obtén todas las pantallas.
            if (right.length === 0) {
                response = await axiosInstance.get("Listar?pant_EsAduana=" + user["esAduana"].toString());
            } else {
                // Si 'right' tiene elementos, obtén todas las pantallas y luego filtra las seleccionadas.
                const responseAll = await axiosInstance.get("Listar?pant_EsAduana=" + user["esAduana"].toString());
                const responseDataAll = responseAll.data || { data: [] };
                
                // Obtén las pantallas seleccionadas en 'right' para evitar duplicados.
                const selectedScreens = right.map((pantalla) => pantalla.pant_Id);
                
                // Filtra las pantallas para obtener solo las no seleccionadas.
                response = {
                    data: {
                        data: responseDataAll.data.filter((item) => !selectedScreens.includes(item.pant_Id))
                    }
                };
            }
    
            const responseData = response.data || { data: [] };
            const data = responseData.data.map((item, index) => ({
                key: index,
                pant_Id: item.pant_Id,
                pant_Nombre: item.pant_Nombre,
            }));
    
            return data;
        } catch (error) {
            ;
        }
    }
    
    
    
    

    async function ListadoPantallasRight(right) {
        try {
            const response = await axiosInstance.get("Listar?pant_EsAduana=" + user["esAduana"].toString());
            const responseData = response.data || { data: [] };
            const seleccionadas = [];
            const data = responseData.data.map((item, index) => {
                right.forEach(function (pantalla) {
                    if (item.pant_Id === pantalla.pant_Id) {
                        seleccionadas[index] = {
                            key: pantalla.key,
                            pant_Id: pantalla.pant_Id,
                            pant_Nombre: pantalla.pant_Nombre
                        }
                    }
                });
                return {
                    key: index,
                    pant_Id: item.pant_Id, 
                    pant_Nombre: item.pant_Nombre,
                }
            });
            return seleccionadas;
        } catch (error) {
            ;
        }
    }
    

return{
    ListadoPantallas,
    ListadoPantallasRight,
    ListadoPantallasLeft
}

}

export default PantallasService;