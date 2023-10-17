import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ArancelesService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };
  const baseURL = `${process.env.REACT_APP_API_URL}api/Aranceles/`;

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });
  
  const user = JSON.parse(localStorage.getItem('user'));

  async function listar(codigo) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get(`ListarCapitulo?codigo=${codigo}`);
      const data = response.data.data.map((data, index) => {
        return {
          key: index + 1,
          aran_Id: data.aran_Id,
          aran_Codigo: data.aran_Codigo,
          aran_Descripcion: data.aran_Descripcion,
          aran_DAI: data.aran_DAI,
          aran_ISV: data.aran_ISV,
          impu_Descripcion: data.impu_Descripcion,
          impu_Cantidad: data.impu_Cantidad,
          aran_SEL: data.aran_SEL,
          aran_ProdCons: data.aran_ProdCons,
          aran_AplicaVehiculos: data.aran_AplicaVehiculos,
          usua_UsuarioCreacion: data.usua_UsuarioCreacion,
          usuarioCreacion: data.usuarioCreacion,
          aran_FechaCreacion: data.aran_FechaCreacion,
          usua_UsuarioModificacion: data.usua_UsuarioModificacion,
          usuarioModificacion: data.usuarioModificacion,
          aran_FechaModificacion: data.aran_FechaModificacion,
          aram_Estado: data.aram_Estado
        };
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

     async function listarDdl() {
        // eslint-disable-next-line no-useless-catch
        try {
          const response = await axiosInstance.get('Listar');
          const data = response.data.data.map((data, index) => {
            return {
              value: data.aran_Id,
              label: `${data.aran_Codigo} - ${data.aran_Descripcion}`,
            };
          });
          return data;
        } catch (error) {
          throw error;
        }
      }

      async function ListarArancelesBycode (code) {
        try {
          let codigo = code.trim();
          const response = await axiosInstance.get('ListarFiltrado?codigo='+codigo);
          const data = response.data.data.filter((item, index) => {
            if(item.aran_Codigo.length >= 7 && !item.aran_Descripcion.includes("SUPRIMIDA")){
                return {
                  key: index + 1,
                  aran_Id: item.aran_Id,
                  aran_Codigo: item.aran_Codigo,
                  aran_Descripcion: item.aran_Descripcion,  
                  aran_ArancelVehicular: item.aran_ArancelVehicular,
                  aran_ProdCons: item.aran_ProdCons            
              }; 
            }    
          });
          const data1 = data.map((item, index) => {
            return{
              key: index + 1,
              aran_Id: item.aran_Id,
              aran_Codigo: item.aran_Codigo,
              aran_Descripcion: item.aran_Descripcion,  
              aran_ArancelVehicular: item.aran_ArancelVehicular ? 'Si' : 'No',
              aran_ProdCons: item.aran_ProdCons             
            }; 
        });
        return data1;
      } catch (error) {
          throw error;
      }
    }


    async function ListarArancelesBycodeAll (code) {
      try {
        let codigo = code.trim();
        const response = await axiosInstance.get('ListarFiltrado?codigo='+codigo);
        const data = response.data.data.filter((item, index) => {
          if(item.aran_Codigo.length >= 7 && !item.aran_Descripcion.includes("SUPRIMIDA")){
              return {
                key: index + 1,
                aran_Id: item.aran_Id,
                aran_Codigo: item.aran_Codigo,
                aran_Descripcion: item.aran_Descripcion,
                aran_ArancelVehicular: item.aran_ArancelVehicular,
                aran_ProdCons: item.aran_ProdCons
            }; 
          }
        });
        const data1 = data.map((item, index) => {
            return{
              key: index + 1,
              aran_Id: item.aran_Id,
              aran_Codigo: item.aran_Codigo,
              aran_Descripcion: item.aran_Descripcion,
              aran_ArancelVehicular: item.aran_ArancelVehicular ? 'Si' : 'No',
              aran_ProdCons: item.aran_ProdCons
            }; 
        });
        console.log(data1);
        return data1;
    } catch (error) {
        throw error;
    }
  }

  async function ExportData() {
    try {
      const response = await axiosInstance.get("Listar");
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          aran_Codigo: item.aran_Codigo,
          aran_Descripcion: item.aran_Descripcion,
        };
      });
      return data;
    }
    catch (error) {
      console.log(error.message);
      throw error;
    }
  };
        
    async function ListarArancelesById (code) {
      try {
        const response = await axiosInstance.get('ListarById?aran_Id='+code);
        const data = response.data.data.map((item, index) => {
            return {
              value: item.aran_Id,
              label: `${item.aran_Codigo} - ${item.aran_Descripcion}`           
            };
        });
        console.log(data[0]["label"])
        const valor = data[0]["label"].split('-');
        const ArancelCompleto = await ListarArancelesBycodeAll(valor[0].trim());      
        return {data,ArancelCompleto};

    } catch (error) {
      throw error;
    }
  }


  async function ListarArancelesBycodeAllEditar (code) {
    try {
      let codigo = code.trim();
      const response = await axiosInstance.get('ListarFiltrado?codigo='+codigo);
      const data = response.data.data.filter((item, index) => {
        if(item.aran_Codigo.length >= 7 && !item.aran_Descripcion.includes("SUPRIMIDA")){
            return {
              key: index + 1,
              aran_Id: item.aran_Id,
              aran_Codigo: item.aran_Codigo,
              aran_Descripcion: item.aran_Descripcion,
              aran_ArancelVehicular: item.aran_ArancelVehicular,
              aran_ProdCons: item.aran_ProdCons
          }; 
        }
      });
      const data1 = data.map((item, index) => {
          return{
            key: index + 1,
            aran_Id: item.aran_Id,
            aran_Codigo: item.aran_Codigo,
            aran_Descripcion: item.aran_Descripcion,
            aran_ArancelVehicular: item.aran_ArancelVehicular ? 'Si' : 'No',
            aran_ProdCons: item.aran_ProdCons
          }; 
      });
      console.log(data1);
      return data1;
  } catch (error) {
      throw error;
  }
}



  async function crear(data) {
    try {
      const datos = {
        aran_Codigo: data.aran_Codigo.trim(),
        aran_Descripcion: data.aran_Descripcion.trim(),
        aran_DAI: data.aran_DAI? data.aran_DAI: 0,
        aran_ISV: data.aran_ISV? data.aran_ISV?.value : 0,
        aran_SEL: data.aran_SEL? data.aran_SEL: 0,
        aran_ProdCons: data.aran_PRODCONS ? data.aran_PRODCONS: 0,
        aran_AplicaVehiculos: data.aran_Vahiculo,
        usua_UsuarioCreacion: user.uuid,
        aran_FechaCreacion: instance.formatFechaHora(new Date())
      };
      const response = await axiosInstance.post('Insertar', datos);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function crearCategoria(data) {
    try {
      const datos = {
        aran_Codigo: data.aran_CodigoCategoria.trim(),
        aran_Descripcion: data.aran_DescripcionCategoria.trim(),
        aran_DAI:  0,
        aran_ISV:  0,
        aran_SEL:  0,
        aran_ProdCons:  0,
        aran_AplicaVehiculos: false,
        usua_UsuarioCreacion: user.uuid,
        aran_FechaCreacion: instance.formatFechaHora(new Date())
      };
      const response = await axiosInstance.post('Insertar', datos);
      return response;
    } catch (error) {
      throw error;
    }
  }
    
  async function editar(data) {
    try {
      const datos = {
        aran_Id: data.aran_Id,
        aran_Codigo: data.aran_Codigo.trim(),
        aran_Descripcion: data.aran_Descripcion.trim(),
        aran_DAI: data.aran_DAI? data.aran_DAI: 0,
        aran_ISV: data.aran_ISV? data.aran_ISV?.value : 0,
        aran_SEL: data.aran_SEL? data.aran_SEL: 0,
        aran_ProdCons: data.aran_PRODCONS ? data.aran_PRODCONS: 0,
        aran_AplicaVehiculos: data.aran_Vahiculo,
        usua_UsuarioModificacion: user.uuid,
        aran_FechaModificacion: instance.formatFechaHora(new Date()),
      };
      const response = await axiosInstance.post('Editar', datos);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function buscar(data) {
    try {
      const response = await axiosInstance.get('Categorias?aran_Codigo=' + data);

      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    listar,
    listarDdl,
    ListarArancelesBycode,
    ListarArancelesBycodeAll,
    ListarArancelesBycodeAllEditar,
    ListarArancelesById,
    crear,
    editar,
    buscar,
    crearCategoria
    , ExportData
  };
}

export default ArancelesService;
