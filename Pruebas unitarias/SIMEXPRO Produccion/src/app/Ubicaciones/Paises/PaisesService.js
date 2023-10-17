/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";


function  PaisesService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
};

const baseURL = process.env.REACT_APP_API_URL + "api/Paises/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
});

const user = JSON.parse(localStorage.getItem('user'));


 

  async function listar() {
    try {
      const response = await axiosInstance.get("Listar?pais_EsAduana=" + user["esAduana"].toString());

      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          pais_Id: item.pais_Id,
          pais_Codigo: item.pais_Codigo,
          pais_Nombre: item.pais_Nombre,
          pais_prefijo: item.pais_prefijo == null ? 'No tiene prefijo' : item.pais_prefijo,
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          pais_FechaCreacion: item.pais_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          pais_FechaModificacion: item.pais_FechaModificacion,
          usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
          pais_FechaEliminacion: item.pais_FechaEliminacion,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
          usuarioModificadorNombre: item.usuarioModificadorNombre,
          pais_Estado: item.pais_Estado
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
                pais_Codigo: item.pais_Codigo,
                pais_Nombre: item.pais_Nombre,
                pais_prefijo: item.pais_prefijo == null ? 'No tiene prefijo' : item.pais_prefijo,
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
        pais_Codigo: data["pais_Codigo"].trim().toUpperCase(),
        pais_Nombre: data["pais_Nombre"].trim().toUpperCase(),
        pais_prefijo: data.pais_prefijo,
        usua_UsuarioCreacion: user['uuid'],
        pais_FechaCreacion:  instance.formatFechaHora(new Date()),
      };
      const response = await axiosInstance.post("Insertar", datos);
      return response;
    } catch (error) {

    }
  }


  async function editar(data) {
    try {
      let datos = {
        pais_Id: data["pais_Id"],
        pais_Codigo: data["pais_Codigo"].trim(),
        pais_Nombre: data["pais_Nombre"].trim().toUpperCase(),
        pais_prefijo: data.pais_prefijo,
        usua_UsuarioModificacion: user['uuid'],
        pais_FechaModificacion: instance.formatFechaHora(new Date()),
      };
      const response = await axiosInstance.post("Editar", datos);
   
      return response;
    } catch (error) {
    }
  }


  async function listarUsuarios() {
    try {
      const response = await axiosInstance.get('Usuarios/Listar');
      return response.data;
    } catch (error) {

    }
  }


  async function eliminar(data) {
    try {
      const datos = {
        pais_Id: data.pais_Id,
      }
      const response = await axiosInstance.post('Eliminar', datos);
      return response;
    } catch (error) {
    }
  }

  return {
    listar,
    crear,
    editar,
    listarUsuarios,
    eliminar
    ,ExportData
};
}

export default PaisesService;
