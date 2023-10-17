/* eslint-disable camelcase */
import axios from 'axios';
import instance from 'src/app/auth/services/jwtService/jwtService';

function DashboardService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = `${process.env.REACT_APP_API_URL}api/AduanasGraficas/`;

  const axiosInstance = axios.create({
    baseURL,
    headers: customHeaders,
  });

  async function ExportadoresPorPais_CantidadPorcentaje() {
    try {
      const response = await axiosInstance.get(`ExportadoresPorPais_CantidadPorcentaje`);
      const data = response.data.data.map((item, index) => {
        return {
          pais_Nombre: item.pais_Nombre,
          duca_Pais_Emision_Exportador: item.duca_Pais_Emision_Exportador,
          porcentaje: item.porcentaje,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function EstadosMercancias_CantidadPorcentaje() {
    try {
      const response = await axiosInstance.get(`EstadosMercancias_CantidadPorcentaje`);
      const data = response.data.data.map((item, index) => {
        return {
          merc_Descripcion: item.merc_Descripcion,
          cantidad: item.cantidad,
          porcentaje: item.porcentaje,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function AduanasIngreso_CantidadPorcentaje() {
    try {
      const response = await axiosInstance.get(`AduanasIngreso_CantidadPorcentaje`);
      const data = response.data.data.map((item, index) => {
        return {
          adua_Nombre: item.adua_Nombre,
          cantidad: item.cantidad,
          porcentaje: item.porcentaje,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function Importaciones_Contador_Anio() {
    try {
      const response = await axiosInstance.get(`Importaciones_Contador_Anio`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function Importaciones_Contador_Mes() {
    try {
      const response = await axiosInstance.get(`Importaciones_Contador_Mes`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function Importaciones_Contador_Semana() {
    try {
      const response = await axiosInstance.get(`Importaciones_Contador_Semana`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function Importaciones_Semana() {
    try {
      const response = await axiosInstance.get(`Importaciones_Semana`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
          fecha: item.fecha,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function Importaciones_Mes() {
    try {
      const response = await axiosInstance.get(`Importaciones_Mes`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
          fecha: item.fecha,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function Importaciones_Anio() {
    try {
      const response = await axiosInstance.get(`Importaciones_Anio`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
          fecha: item.fecha,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }

  async function RegimenesAduaneros_CantidadPorcentaje() {
    try {
      const response = await axiosInstance.get(`RegimenesAduaneros_CantidadPorcentaje`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
          label: item.label,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }
  async function TratadosMasUsados() {
    try {
      const response = await axiosInstance.get(`TratadosMasUsados`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
          label: item.trli_NombreTratado,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }
  async function PaisesMasExportadores() {
    try {
      const response = await axiosInstance.get(`PaisesMasExportadores`);
      const data = response.data.data.map((item, index) => {
        return {
          cantidad: item.cantidad,
          label: item.pais_Nombre,
          porcentaje: item.porcentaje,
        };
      });
      return data;
    } catch (error) {
      throw error;
      
      
    }
  }
  return {
    ExportadoresPorPais_CantidadPorcentaje,
    EstadosMercancias_CantidadPorcentaje,
    AduanasIngreso_CantidadPorcentaje,
    Importaciones_Contador_Anio,
    Importaciones_Contador_Mes,
    Importaciones_Contador_Semana,
    Importaciones_Semana,
    Importaciones_Mes,
    Importaciones_Anio,
    RegimenesAduaneros_CantidadPorcentaje,
    TratadosMasUsados,
    PaisesMasExportadores
  };
}

export default DashboardService;
