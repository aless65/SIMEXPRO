import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";


function ImpuestosService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = `${process.env.REACT_APP_API_URL}api/Impuestos/`;

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });

  const user = JSON.parse(localStorage.getItem('user'));

  async function listar() {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get('Listar');
      const data = response.data.data.map((data, index) => {
        return {
          key: index + 1,
          impu_Id: data.impu_Id,
          impu_Descripcion: data.impu_Descripcion,
          impu_Cantidad: data.impu_Cantidad,
          usua_UsuarioCreacion: data.usua_UsuarioCreacion,
          usuarioCreacion: data.usuarioCreacion,
          impu_FechaCreacion: data.impu_FechaCreacion,
          usua_UsuarioModificacion: data.usua_UsuarioModificacion,
          usuarioModificacion: data.usuarioModificacion,
          impu_FechaModificacion: data.impu_FechaModificacion,
          impu_Estado: data.impu_Estado
        };
      });
      return data;
    } catch (error) {
      
    }
  }

  async function ExportData(){
    try{
      const response = await axiosInstance.get('Listar');
      const data = response.data.data.map((data, index) => {
        return {
          key: index + 1,
          impu_Descripcion: data.impu_Descripcion,
          impu_Cantidad: data.impu_Cantidad,
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
      const datos = {
        impu_Descripcion: data.impu_Descripcion.trim().replace(/\s+/g, ' '),
        impu_Cantidad: data.impu_Cantidad,
        usua_UsuarioCreacion: user.uuid,
        impu_FechaCreacion: instance.formatFechaHora(new Date())
      };

      
      const response = await axiosInstance.post('Insertar', datos);
      return response;
    } catch (error) {
      
    }
  }

  async function editar(data) {
    try {
      const datos = {
        impu_Id: data.impu_Id,
        impu_Descripcion: data.impu_Descripcion.trim().replace(/\s+/g, ' '),
        impu_Cantidad: data.impu_Cantidad,
        usua_UsuarioModificacion: user.uuid,
        impu_FechaModificacion: instance.formatFechaHora(new Date()),
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
    ExportData
  };
}

export default ImpuestosService;

