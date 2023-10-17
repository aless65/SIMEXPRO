import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ClientesService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));


     async function listar() {
        try {
            const response = await axiosInstance.get('Clientes/Listar');
            const data = response.data.data.map((item, index) => {
                return {
                  key: index+1,
                  clie_Id: item.clie_Id,
                  clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                  clie_Direccion: item.clie_Direccion,
                  clie_RTN: item.clie_RTN,
                  clie_Nombre_Contacto: item.clie_Nombre_Contacto,
                  clie_Numero_Contacto: item.clie_Numero_Contacto,  
                  clie_Correo_Electronico: item.clie_Correo_Electronico,
                  clie_FAX: item.clie_FAX,
                  pvin_Id: item.pvin_Id,
                  pais_Id: item.pais_Id,
                  pais_Nombre: item.pais_Nombre,
                  pvin_Nombre: item.pvin_Nombre,
                  usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                  usuarioNombreCreacion: item.usuarioNombreCreacion,
                  clie_FechaCreacion: item.clie_FechaCreacion,
                  usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                  usuarioNombreModificacion: item.usuarioNombreModificacion,
                  clie_FechaModificacion: item.clie_FechaModificacion,
                  usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                  usuarioNombreEliminacion: item.usuarioNombreEliminacion,
                  clie_FechaEliminacion: item.clie_FechaEliminacion,

                };
              });
            return data;
        } catch (error) {
        }
    }
    
    async function ExportData(){
        try{
            const response = await axiosInstance.get("Clientes/Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    clie_RTN: item.clie_RTN,
                    clie_Nombre_Contacto: item.clie_Nombre_Contacto,
                    clie_Correo_Electronico: item.clie_Correo_Electronico,
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
                clie_Nombre_O_Razon_Social: data["clie_Nombre_O_Razon_Social"].trim().replace(/\s+/g, ' '),
                clie_Direccion:  data["clie_Direccion"].trim().replace(/\s+/g, ' '),       
                clie_RTN:  data["clie_RTN"],        
                clie_Nombre_Contacto:  data["clie_Nombre_Contacto"].trim().replace(/\s+/g, ' '),    
                clie_Numero_Contacto:  data["clie_Numero_Contacto"],          
                clie_Correo_Electronico: data["clie_Correo_Electronico"].trim().replace(/\s+/g, ' '),
                clie_FAX: data["clie_FAX"], 
                pvin_Id: data.provincia["value"],            
                usua_UsuarioCreacion: user['uuid'],   
                clie_FechaCreacion: instance.formatFechaHora(new Date()),  
            }
            const response = await axiosInstance.post('Clientes/Insertar',datos);
            return response;
        } catch (error) {
        }
    }
    
    async function editar(data) {
        try {
            let datos = {
                clie_Id: data["clie_Id"],
                clie_Nombre_O_Razon_Social: data["clie_Nombre_O_Razon_Social"].trim().replace(/\s+/g, ' '),
                clie_Direccion:  data["clie_Direccion"].trim().replace(/\s+/g, ' '),       
                clie_RTN:  data["clie_RTN"],        
                clie_Nombre_Contacto:  data["clie_Nombre_Contacto"].trim().replace(/\s+/g, ' '),    
                clie_Numero_Contacto:  data["clie_Numero_Contacto"],          
                clie_Correo_Electronico: data["clie_Correo_Electronico"].trim().replace(/\s+/g, ' '),
                clie_FAX: data["clie_FAX"], 
                pvin_Id: data.pvin_Id["value"],            
                usua_UsuarioModificacion: user['uuid'],   
                clie_FechaModificacion: instance.formatFechaHora(new Date()),  
            };  
            const response = await axiosInstance.post('Clientes/Editar',datos);
            return response;
        } catch (error) {
        }
    }
   
    async function eliminar(data) {
        try {
            let datos = {
                clie_Id: data["clie_Id"],
                usua_UsuarioEliminacion: user['uuid'],  
                clie_FechaEliminacion: instance.formatFechaHora(new Date()),  
            }
            const response = await axiosInstance.post('Clientes/Eliminar',datos);
            return response;
        } catch (error) {
        }
    }

    async function ProvinciasPorPais(id) {
        try {
    
          const response = await axiosInstance.get(`Provincias/ProvinciasFiltradaPorPaisYesAduana?pais_Id=${id}&pvin_EsAduana=${user['esAduana']}`); //copiar url despues del endpoint
          const data = response.data.data.map((item) => {
            return {
              value: item.pvin_Id,
              label: `${item.pvin_Nombre}`,
            };
          });
    
          return data;
        } catch (error) {
          
          
        }
      }
    
    return {
        listar,
        crear,
        editar,
        eliminar,
        ExportData,
        ProvinciasPorPais
        };
}

export default ClientesService;
