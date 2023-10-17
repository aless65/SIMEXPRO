
/* eslint-disable no-useless-catch */
import axios from 'axios';
import instance from 'src/app/auth/services/jwtService/jwtService';
import { parse, formatISO } from 'date-fns';

// import user from 'src/app/auth/services/jwtService/dataUser';

function OrdenDeProcesosService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = `${process.env.REACT_APP_API_URL}api/OrdeEnsaAcabEtiq/`;

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });

  const user = JSON.parse(localStorage.getItem('user'));

  async function listar() {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get('Listar');
      const data = response.data.data.map((item, index) => {
        
        return {
          key: index + 1,
          ensa_Id: item.ensa_Id,
          orco_Codigo: item.orco_Codigo,
          ensa_Cantidad: item.ensa_Cantidad,
          empl_Id: item.empl_Id,
          empl_NombreCompleto: item.empl_NombreCompleto,
          code_Id: item.code_Id,
          code_Sexo: item.code_Sexo,
          esti_Id: item.esti_Id,
          esti_Descripcion: item.esti_Descripcion,
          ensa_FechaInicio: item.ensa_FechaInicio,
          ensa_FechaLimite: item.ensa_FechaLimite,
          ppro_Id: item.ppro_Id,
          proc_Id: item.proc_Id,
          proc_Descripcion: item.proc_Descripcion,
          modu_Id: item.modu_Id,
          modu_Nombre: item.modu_Nombre,
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          usurioCreacionNombre: item.usurioCreacionNombre,
          ensa_FechaCreacion: item.ensa_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          usuarioModificacionNombre: item.usuarioModificacionNombre,
          ensa_FechaModificacion: item.ensa_FechaModificacion,
          ensa_Estado: item.ensa_Estado,
        };
      });
  
      return data;
    } catch (error) {
      
    }
  }

  async function ExportData() {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get('Listar');
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          ensa_Cantidad: item.ensa_Cantidad,
          empl_NombreCompleto: item.empl_NombreCompleto,
          code_Sexo: item.code_Sexo,
          esti_Descripcion: item.esti_Descripcion,
          ensa_FechaInicio: item.ensa_FechaInicio.toString().slice(0, 10),
          ensa_FechaLimite: item.ensa_FechaLimite.toString().slice(0, 10),
        };
      }); 
      return data;
    } catch (error) {
      
    }
  }



  async function crear(data) {
    try {

      // const objeto = data.ensa_Fechalimite
      // if (objeto !== undefined) {
      //   var year = objeto.getFullYear(); // Línea 106
      // } else {
      // }

      const datos = {
        ensa_Cantidad: data.ensa_Cantidad,
        empl_Id: data.empl_Id.value,
        code_Id: data.id,
        ensa_FechaInicio: instance.formatFechaHora(data.ensa_FechaInicio),
        ensa_FechaLimite: instance.formatFechaHora(data.ensa_Fechalimite),
        ppro_Id: parseInt(data.ppro_Id),
        proc_Id: data.proc_Id.value,
        modu_Id: data.modu_Id.value,
        usua_UsuarioCreacion: user.uuid,
        ensa_FechaCreacion: instance.formatFechaHora(new Date()),
      };

      const response = await axiosInstance.post('Insertar', datos);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function editar(data) {
    try {
      
      const datos = {
        ensa_Id: data.ensa_Id,
        ensa_Cantidad: parseInt(data.ensa_Cantidad),
        empl_Id: data.empl_Id.value,
        code_Id: data.code_Id,
        ensa_FechaInicio: data.ensa_FechaInicio,
        ensa_FechaLimite: data.ensa_FechaLimite,
        ppro_Id: parseInt(data.ppro_Id),
        proc_Id: data.proc_Id.value,
        modu_Id: data.modu_Id.value,
        usua_UsuarioModificacion: user.uuid,
        ensa_FechaModificacion: instance.formatFechaHora(new Date()),
      };
         const response = await axiosInstance.post('Editar', datos);
      return response;
    } catch (error) {
      
    }
  }

  return {
    listar,
    crear,
    editar,
    ExportData,
  };
}

// const OrdenDeProcesosService = new OrdenDeProcesosService();
export default OrdenDeProcesosService;
