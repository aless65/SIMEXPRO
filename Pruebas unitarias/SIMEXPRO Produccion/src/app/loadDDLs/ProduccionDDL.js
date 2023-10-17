import axios from 'axios';

// Headers //
const customHeaders = {
    'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
};

const apiService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: customHeaders,
});

// Peticiones //
const archiveDDL = {

    empleadosDDL: async () => {
        try {
            const response = await apiService.get('api/Empleados/Listar');
            return response.data.data;
        } catch (error) {
            
        }
    },

    estadoscivilesDDL: async () => {
        try {
            const response = await apiService.get('/api/EstadosCiviles/Listar');
            return response.data;
        } catch (error) {
            
        }
    },

    cargosDDL: async () => {
        try {
            const response = await apiService.get('/api/Cargos/Listar');
            return response.data;
        } catch (error) {
            
        }
    },

    paisesDDL: async () => {
        try {
            const response = await apiService.get('/api/Paises/Listar');
            return response.data;
        } catch (error) {
            
        }
    },

    provinciasDDL:async () => {
        try {
            const response = await apiService.get('/api/Provincias/Listar');
            return response.data.data;
        } catch (error) {
            
        }
    },

    ciudadesDDL: async () => {
        try {
            const response = await apiService.get('/api/Ciudades/Listar');
            return response.data.data;
        } catch (error) {
            
        }
    },


   
};

export default archiveDDL;