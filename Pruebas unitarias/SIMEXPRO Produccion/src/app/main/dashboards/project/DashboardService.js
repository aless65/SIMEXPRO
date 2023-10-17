/* eslint-disable camelcase */
import axios from 'axios';
import instance from 'src/app/auth/services/jwtService/jwtService';

function DashboardService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = `${process.env.REACT_APP_API_URL}api/Graficas/`;

  const axiosInstance = axios.create({
    baseURL,
    headers: customHeaders,
  });

  async function ContadorOrdenesCompraPorEstado() {
    try {
      const response = await axiosInstance.get(`ContadorOrdenesCompraPorEstado`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Id: item.orco_Id,
          orco_FechaEmision: item.orco_FechaEmision,
          orco_FechaLimite: item.orco_FechaLimite,
          orco_Avance: item.orco_Avance,
          clie_Id: item.clie_Id,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          clie_Direccion: item.clie_Direccion,
          clie_RTN: item.clie_RTN,
          clie_Nombre_Contacto: item.clie_Nombre_Contacto,
          clie_Numero_Contacto: item.clie_Numero_Contacto,
          clie_Correo_Electronico: item.clie_Correo_Electronico,
          clie_FAX: item.clie_FAX,
          orco_Conteo: item.orco_Conteo,
          orco_FechaCreacion: item.orco_FechaCreacion,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
        };
      });
      
      return data;
    } catch (error) {
      
      
    }
  }

  async function OrdenenesEntregadasPendientes_Semanal() {
    try {
      const response = await axiosInstance.get(`ContadorOrdenesCompraPorEstado_UltimaSemana`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Id: item.orco_Id,
          orco_FechaEmision: item.orco_FechaEmision,
          orco_FechaLimite: item.orco_FechaLimite,
          orco_Avance: item.orco_Avance,
          clie_Id: item.clie_Id,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          clie_Direccion: item.clie_Direccion,
          clie_RTN: item.clie_RTN,
          clie_Nombre_Contacto: item.clie_Nombre_Contacto,
          clie_Numero_Contacto: item.clie_Numero_Contacto,
          clie_Correo_Electronico: item.clie_Correo_Electronico,
          clie_FAX: item.clie_FAX,
          orco_Conteo: item.orco_Conteo,
          orco_FechaCreacion: item.orco_FechaCreacion,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
        };
      });
      
      return data;
    } catch (error) {
      
      
    }
  }

  async function OrdenenesEntregadasPendientes_Mensual() {
    try {
      const response = await axiosInstance.get(`OrdenenesEntregadasPendientes_Mensual`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Id: item.orco_Id,
          orco_FechaEmision: item.orco_FechaEmision,
          orco_FechaLimite: item.orco_FechaLimite,
          orco_Avance: item.orco_Avance,
          clie_Id: item.clie_Id,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          clie_Direccion: item.clie_Direccion,
          clie_RTN: item.clie_RTN,
          clie_Nombre_Contacto: item.clie_Nombre_Contacto,
          clie_Numero_Contacto: item.clie_Numero_Contacto,
          clie_Correo_Electronico: item.clie_Correo_Electronico,
          clie_FAX: item.clie_FAX,
          orco_Conteo: item.orco_Conteo,
          orco_FechaCreacion: item.orco_FechaCreacion,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
        };
      });
      
      return data;
    } catch (error) {
      
      
    }
  }

  async function OrdenenesEntregadasPendientes_Anual() {
    try {
      const response = await axiosInstance.get(`OrdenenesEntregadasPendientes_Anual`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Id: item.orco_Id,
          orco_FechaEmision: item.orco_FechaEmision,
          orco_FechaLimite: item.orco_FechaLimite,
          orco_Avance: item.orco_Avance,
          clie_Id: item.clie_Id,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          clie_Direccion: item.clie_Direccion,
          clie_RTN: item.clie_RTN,
          clie_Nombre_Contacto: item.clie_Nombre_Contacto,
          clie_Numero_Contacto: item.clie_Numero_Contacto,
          clie_Correo_Electronico: item.clie_Correo_Electronico,
          clie_FAX: item.clie_FAX,
          orco_Conteo: item.orco_Conteo,
          orco_FechaCreacion: item.orco_FechaCreacion,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
        };
      });
      
      return data;
    } catch (error) {
      
      
    }
  }

  async function TotalOrdenesCompraDiario() {
    try {
      const response = await axiosInstance.get(`TotalOrdenesCompraDiario`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Conteo: item.orco_Conteo,
          fecha: item.fecha,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function TotalOrdenesCompraMensual() {
    try {
      const response = await axiosInstance.get(`TotalOrdenesCompraMensual`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Conteo: item.orco_Conteo,
          fecha: item.fecha,
          orco_Avance: item.orco_Avance,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function TotalOrdenesCompraAnual() {
    try {
      const response = await axiosInstance.get(`TotalOrdenesCompraAnual`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Conteo: item.orco_Conteo,
          fecha: item.fecha,
          orco_Avance: item.orco_Avance,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function VentasSemanales() {
    try {
      const response = await axiosInstance.get(`VentasSemanales`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          totalIngresos: item.totalIngresos,
          fechaAntigua: item.fechaAntigua,
          fechaReciente: item.fechaReciente,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function VentasMensuales() {
    try {
      const response = await axiosInstance.get(`VentasMensuales`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          totalIngresos: item.totalIngresos,
          fechaAntigua: item.fechaAntigua,
          fechaReciente: item.fechaReciente,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function VentasAnuales() {
    try {
      const response = await axiosInstance.get(`VentasAnuales`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          totalIngresos: item.totalIngresos,
          fechaAntigua: item.fechaAntigua,
          fechaReciente: item.fechaReciente,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function ProductividadModulos() {
    try {
      const response = await axiosInstance.get(`ProductividadModulos`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          porcentajeProduccion: item.porcentajeProduccion,
          totalProduccionDia: item.totalProduccionDia,
          modu_Nombre: item.modu_Nombre,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function PrendasPedidas(esti_Id) {
    try {
      const response = await axiosInstance.post('PrendasPedidas', { esti_Id });
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          esti_Descripcion: `${item.esti_Descripcion} - ${
            item.code_Sexo === 'F' ? 'Femenino' : item.code_Sexo === 'M' ? 'Masculino' : 'Unisex'
          }`,
          prendasSumatoria: item.prendasSumatoria,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function ClientesProductivos() {
    try {
      const response = await axiosInstance.get(`ClientesProductivos`);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          cantidadIngresos: item.cantidadIngresos,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  return {
    ContadorOrdenesCompraPorEstado,
    TotalOrdenesCompraDiario,
    TotalOrdenesCompraMensual,
    TotalOrdenesCompraAnual,
    VentasSemanales,
    VentasMensuales,
    VentasAnuales,
    OrdenenesEntregadasPendientes_Semanal,
    OrdenenesEntregadasPendientes_Mensual,
    OrdenenesEntregadasPendientes_Anual,
    ProductividadModulos,
    PrendasPedidas,
    ClientesProductivos,
  };
}

// const monedasService = new MonedasService();
export default DashboardService;
