/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import axios from 'axios';
import instance from 'src/app/auth/services/jwtService/jwtService';

function ReportesProduccionService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = `${process.env.REACT_APP_API_URL}api/Reportes/`;
  const axiosInstance = axios.create({
    baseURL,
    headers: customHeaders,
  });

  async function TiemposMaquinas(data) {
    try {
      const datos = {
        maqu_Id: data,
      };
      const response = await axiosInstance.post('TiemposMaquinas', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          maqu_Id: item.maqu_Id,
          maqu_NumeroSerie: item.maqu_NumeroSerie,
          marq_Nombre: item.marq_Nombre,
          diasActiva: item.diasActiva,
          diasInactiva: item.diasInactiva,
          diasTotalesInactiva: item.diasTotalesInactiva,
          mahi_Observaciones: item.mahi_Observaciones,
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function ProduccionPorModulo(fecha_inicio, fecha_fin) {
    try {
      const datos = {
        fecha_inicio,
        fecha_fin,
      };

      const response = await axiosInstance.post('ProduccionPorModulo', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          modu_Nombre: item.modu_Nombre,
          totalProduccion: item.totalProduccion,
          promedioCantidad: item.promedioCantidad,
          promedioDanio: item.promedioDanio,
          promedioProduccion: item.promedioProduccion,
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function PedidosCliente(data) {
    try {
      const datos = {
        clie_Id: data,
      };

      const response = await axiosInstance.post('PedidosCliente', datos);
      const dataresponse = response.data.data.map((item, index) => {
        const detalles = JSON.parse(item.detalles);
        return {
          key: index + 1,
          modu_Nombre: item.modu_Nombre,
          pedidosTerminados: item.pedidosTerminados,
          pedidosPendientes: item.pedidosPendientes,
          pedidosCurso: item.pedidosCurso,
          procentajeCompletado: item.procentajeCompletado,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          clie_RTN: item.clie_RTN,
          clie_Nombre_Contacto: item.clie_Nombre_Contacto,
          clie_Numero_Contacto: item.clie_Numero_Contacto,
          clie_Correo_Electronico: item.clie_Correo_Electronico,
          detalles: detalles,



        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function PlanificacionPO(data) {
    try {
      const datos = {
        orco_Id: data,
      };

      const response = await axiosInstance.post('PlanificacionPO', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Id: item.orco_Id,
          asor_OrdenDetId: item.asor_OrdenDetId,
          esti_Descripcion: item.esti_Descripcion,
          colr_Nombre: item.colr_Nombre,
          tall_Nombre: item.tall_Nombre,
          asor_FechaInicio: item.asor_FechaInicio,
          asor_FechaLimite: item.asor_FechaLimite,
          asor_Cantidad: item.asor_Cantidad,
          proc_Descripcion: item.proc_Descripcion,
          empl_NombreCompleto: item.empl_NombreCompleto,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function MaterialesPorPo(orco_Id) {
    try {
      const datos = {
        orco_Id: orco_Id,
      };

      const response = await axiosInstance.post('MaterialesPorPO', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          orco_Id: item.orco_Id,
          orco_Codigo: item.orco_Codigo,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          clie_Direccion: item.clie_Direccion,
          clie_RTN: item.clie_RTN,
          clie_Nombre_Contacto: item.clie_Nombre_Contacto,
          clie_Correo_Electronico: item.clie_Correo_Electronico,
          clie_FAX: item.clie_FAX,
          orco_FechaEmision: item.orco_FechaEmision,
          orco_FechaLimite: item.orco_FechaLimite,
          fopa_Descripcion: item.fopa_Descripcion,
          tiem_Descripcion: item.tiem_Descripcion,
          orco_MetodoPago: item.orco_MetodoPago,
          orco_DireccionEntrega: item.orco_DireccionEntrega,
          lote_Id: item.lote_Id,
          lote_CodigoLote: item.lote_CodigoLote,
          lote_Observaciones: item.lote_Observaciones,
          mate_Descripcion: item.mate_Descripcion,
          subc_Descripcion: item.subc_Descripcion,
          cate_Descripcion: item.cate_Descripcion,
          ppde_Cantidad: item.ppde_Cantidad,
          unme_Descripcion: item.unme_Descripcion,
          tipa_area: item.tipa_area,
          colr_Nombre: item.colr_Nombre,
          colr_Codigo: item.colr_Codigo,
          colr_CodigoHtml: item.colr_CodigoHtml,
          prov_NombreCompania: item.prov_NombreCompania,
          prov_CorreoElectronico: item.prov_CorreoElectronico,
          prov_Telefono: item.prov_Telefono,
          pvin_Codigo: item.pvin_Codigo,
          pvin_Nombre: item.pvin_Nombre,
          pais_Nombre: item.pais_Nombre,
          peor_FechaEntrada: item.peor_FechaEntrada,
          esti_Descripcion: item.esti_Descripcion,
          code_Sexo: item.code_Sexo,
          tall_Codigo: item.tall_Codigo,
          tall_Nombre: item.tall_Nombre,

        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }


  async function CostosMaterialesNoBrindados(mate_FechaInicio, mate_FechaLimite) {
    try {
      const datos = {
        mate_FechaInicio,
        mate_FechaLimite,
      };

      const response = await axiosInstance.post('CostosMaterialesNoBrindados', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          mate_Descripcion: item.mate_Descripcion,
          totalCantidad: item.totalCantidad,
          porcentajeProductos: item.porcentajeProductos,
          precioPromedioMaterial: item.precioPromedioMaterial,
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function Consumo_Materiales(fecha_inicio, fecha_fin) {
    try {
      const datos = {
        fecha_inicio,
        fecha_fin,
      };

      const response = await axiosInstance.post('Consumo_Materiales', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          mate_Descripcion: item.mate_Descripcion,
          totalMaterial: item.totalMaterial,
          promedioMaterial: item.promedioMaterial,
          porcentajeMaterial: item.porcentajeMaterial,
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function ProduccionPorAreas(area, FechaInicio, FechaLimite) {
    try {
      const datos = {
        tipa_Id: area["value"],
        fechaInicio: FechaInicio,
        fechaFin: FechaLimite,
      };
      console.log(datos)
      const response = await axiosInstance.post('ProduccionAreas', datos);
      const dataresponse = response.data.data.map((item, index) => {
        const detalles = JSON.parse(item.detalles);
        return {
          key: index + 1,
          tipa_Id: item.tipa_Id,
          tipa_area: item.tipa_area,
          proc_Id: item.proc_Id,
          proc_Descripcion: item.proc_Descripcion,
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          usarioCreacion: item.usarioCreacion,
          tipa_FechaCreacion: item.tipa_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          usuarioModificacion: item.usuarioModificacion,
          tipa_FechaModificacion: item.tipa_FechaModificacion,
          usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
          usuarioEliminacion: item.usuarioEliminacion,
          tipa_FechaEliminacion: item.tipa_FechaEliminacion,
          tipa_Estado: item.tipa_Estado,
          fechaInicio: item.fechaInicio,
          fechaFin: item.fechaFin,
          porcentajeDanado: item.porcentajeDanado,
          porcentajeBueno: item.porcentajeBueno,
          totalPeriodo: item.totalPeriodo,
          totalDanado: item.totalDanado,
          totalExitoso: item.totalExitoso,
          promedioDia: item.promedioDia,
          promedioDanado: item.promedioDanado,
          promedioExitoso: item.promedioExitoso,
          detalles: detalles
        }
      });
      console.log(dataresponse)
      return dataresponse;

    } catch (error) {
      console.error(error);
    }
  }

  async function IngresoMateriales(fechaInicio, fechaFin) {
    try {
      const datos = {
        fechaInicio,
        fechaFin,
      };

      const response = await axiosInstance.post('MaterialesIngreso', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          peor_Id: item.peor_Id,
          peor_Codigo: item.peor_Codigo,
          prov_NombreCompania: item.prov_NombreCompania,
          prov_NombreContacto: item.prov_NombreContacto,
          duca_Id: item.duca_Id,
          ciud_Nombre: item.ciud_Nombre,
          pais_Nombre: item.pais_Nombre,
          peor_FechaEntrada: item.peor_FechaEntrada,
          lote_Stock: item.lote_Stock,
          mate_Descripcion: item.mate_Descripcion,
          prod_Cantidad: item.prod_Cantidad,
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }


  async function SeguimientodeProcesosPO(Codigo) {
    console.log(Codigo)
    try {
      const datos = {
        orco_Codigo: Codigo
      };
      console.log(datos)

      const response = await axiosInstance.post('SeguimientodeProcesosporPO', datos);
      const dataresponse = response.data.data.map((item, index) => {
        const procesos = JSON.parse(item.seguimientoProcesos);
        return {
          key: index + 1,

          orco_Id: item.orco_Id,
          orco_Codigo: item.orco_Codigo,
          clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
          orco_EstadoFinalizado: item.orco_EstadoFinalizado,
          orco_EstadoOrdenCompra: item.orco_EstadoOrdenCompra,

          code_Id: item.code_Id,
          proc_Actual: item.proc_Actual,
          proc_Comienza: item.proc_Comienza,
          code_CantidadPrenda: item.code_CantidadPrenda,
          esti_Descripcion: item.esti_Descripcion,
          tall_Nombre: item.tall_Nombre,
          code_Sexo: item.code_Sexo,
          colr_Nombre: item.colr_Nombre,

          ordenProduccion: item.ordenProduccion,

          faex_Id: item.faex_Id,
          fechaExportacion: item.fechaExportacion,
          cantidadExportada: item.cantidadExportada,
          fede_Cajas: item.fede_Cajas,
          fede_TotalDetalle: item.fede_TotalDetalle,
          seguimientoProcesos: procesos
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function MaquinasUso(data) {
    try {
      const datos = {
        modu_Id: data,
      };
      const response = await axiosInstance.post('Maquina_Uso', datos);
      const dataresponse = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          maqu_NumeroSerie: item.maqu_NumeroSerie,
          enUso: item.enUso,
          deshabilitada: item.deshabilitada,
          habilitada: item.habilitada,
          marq_Nombre: item.marq_Nombre,
          modu_Nombre: item.modu_Nombre,
        };
      });
      console.log(dataresponse)
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }


  async function Inventario(data) {
    try {
      const datos = {
        mate_id: data,
      };
      const response = await axiosInstance.post('Inventario', datos);
      const dataresponse = response.data.data.map((item, index) => {
        const detalles = JSON.parse(item.detalles);
        return {
          key: index + 1,
          mate_Descripcion: item.mate_Descripcion,
          mate_Imagen: item.mate_Imagen,
          subc_Descripcion: item.subc_Descripcion,
          cate_Descripcion: item.cate_Descripcion,
          colr_Nombre: item.colr_Nombre,
          stockTotal: item.stockTotal,
          detalles: detalles,
        };
      });
      return dataresponse;
    } catch (error) {
      console.error(error);
    }
  }

    return {
      TiemposMaquinas,
      ProduccionPorModulo,
      PedidosCliente,
      PlanificacionPO,
      CostosMaterialesNoBrindados,
      Consumo_Materiales,
      MaquinasUso,
      Inventario,
      ProduccionPorAreas,
      MaterialesPorPo,
      IngresoMateriales,
      SeguimientodeProcesosPO
    };
  }


export default ReportesProduccionService;
