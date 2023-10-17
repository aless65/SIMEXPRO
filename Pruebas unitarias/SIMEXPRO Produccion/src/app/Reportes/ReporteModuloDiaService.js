import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import moment from "moment";
function ReporteModuloDiaServices() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };
  const baseURL = process.env.REACT_APP_API_URL + "api/ReporteModuloDia/";
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });

  const baseURLDetalle =
    process.env.REACT_APP_API_URL + "api/ReporteModuloDiaDetalle/";

  const axiosInstanceDetalle = axios.create({
    baseURL: baseURLDetalle,
    headers: customHeaders,
  });

  const baseURLDetalleOrden =
    process.env.REACT_APP_API_URL + "api/OrdeEnsaAcabEtiq/";

  const axiosInstanceProceso = axios.create({
    baseURL: baseURLDetalleOrden,
    headers: customHeaders,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  async function listarProceso(id) {

    try {
      const response = await axiosInstanceProceso.get("Listar");
      var DatosFiltrados = [];

      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i]["proc_Id"] == id) {
          DatosFiltrados.push(response.data.data[i]);
        }
      }

      const data = DatosFiltrados.map((item, index) => {
        return {
          proc_Id: item.proc_Id,
          ensa_Id: item.ensa_Id,
          value: item.code_Id,
          label: `${item.empl_NombreCompleto} - Codigo ${item.orco_Codigo} - Estilo ${item.esti_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
    }
  }
  async function listar() {
    try {
      const response = await axiosInstance.get("Listar");
      // Desestructura el arreglo de subarreglos en una sola lista de elementos

      const flatData = response.data.data.flat();

      const data = flatData.map((item, index) => {
        // Realiza la transformación de detalles (si es necesario)
        let detalles = null;
        if (item.detalles) {
          const detallesJson = JSON.parse(item.detalles);
          detalles = detallesJson.map((datos, index2) => {
            return {
              key: index2 + 1,
              proc_Id: datos["proc_Id"],
              orco_Codigo: datos["orco_Codigo"],
              proc_Descripcion: datos["proc_Descripcion"],
              orco_Id: datos["orco_Id"],
              esti_Descripcion: datos["esti_Descripcion"],
              rdet_TotalDia: datos["rdet_TotalDia"],
              rdet_TotalDanado: datos["rdet_TotalDanado"],
              
              CantidadBuenEstado:
                parseInt(datos["rdet_TotalDia"]) - datos["rdet_TotalDanado"],
              colr_Nombre: datos["colr_Nombre"],
              Sexo: datos["Sexo"],
              clie_Nombre_Contacto: datos["clie_Nombre_Contacto"],
            };
          });
        }
        return {
          key: index + 1,
          remo_Id: item.remo_Id,
          modu_Id: item.modu_Id,
          ensa_Id: item.ensa_Id,
          orco_Codigo: item.orco_Codigo,
          proc_Id: parseInt(item.usua_UsuarioModifica),
          
          modu_Nombre: item.modu_Nombre,
          empleado: item.empleado,
          remo_Fecha: item.remo_Fecha,
          remo_TotalDia: item.remo_TotalDia,
          remo_TotalDanado: item.remo_TotalDanado,
          CantidadBuenEstado:
            parseInt(item.remo_TotalDia) - parseInt(item.remo_TotalDanado),
          detalles: detalles, // Agrega los detalles transformados
          usua_UsuarioCrea: item.usua_UsuarioCrea,
          remo_FechaCreacion: item.remo_FechaCreacion,
          usua_UsuarioModifica: item.usua_UsuarioModificacion,
          remo_FechaModificacion: item.remo_FechaModificacion,
          remo_Finalizado: item.remo_Finalizado,
        };
      });

      return data;
    } catch (error) {
    }
  }

  async function listarRangos(fechaInicio, fechaFin) {
    try {
      // const response = await axiosInstance.get(`ListarPorFecha?FechaInicio=3&FechaFin=${fechaFin}`);
      const response = await axiosInstance.get(
        `ListarPorFecha?FechaInicio=${
          fechaInicio ? fechaInicio.toDateString() : ""
        }&FechaFin=${fechaFin ? fechaFin.toDateString() : ""}`
      );
      // const response = await axiosInstance.get(`ListarPorFecha?FechaInicio=${new Date(fechaInicio)}&FechaFin=${new Date(fechaFin)}`);
      // const response = await axiosInstance.get(`ListarPorFecha?FechaInicio=2023-08-21T00%3A00%3A00&FechaFin=2023-08-23T00%3A00%3A00`);

      // Desestructura el arreglo de subarreglos en una sola lista de elementos
      const flatData = response.data.data.flat();

      const data = flatData.map((item, index) => {
        // Realiza la transformación de detalles (si es necesario)
        let detalles = null;
        if (item.detalles) {
          const detallesJson = JSON.parse(item.detalles);
          detalles = detallesJson.map((datos, index2) => {
            return {
              key: index2 + 1,
              proc_Id: datos["proc_Id"],
              orco_Codigo: datos["orco_Codigo"],
              proc_Descripcion: datos["proc_Descripcion"],
              orco_Id: datos["orco_Id"],
              esti_Descripcion: datos["esti_Descripcion"],
              rdet_TotalDia: datos["rdet_TotalDia"],
              rdet_TotalDanado: datos["rdet_TotalDanado"],
              
              CantidadBuenEstado:
                parseInt(datos["rdet_TotalDia"]) - datos["rdet_TotalDanado"],
              colr_Nombre: datos["colr_Nombre"],
              Sexo: datos["Sexo"],
              clie_Nombre_Contacto: datos["clie_Nombre_Contacto"],
            };
          });
        }


        return {
          key: index + 1,
          remo_Id: item.remo_Id,
          modu_Id: item.modu_Id,
          empleado: item.empleado,
          modu_Nombre: item.modu_Nombre,
          remo_Fecha: item.remo_Fecha,
          remo_TotalDia: item.remo_TotalDia,
          remo_TotalDanado: item.remo_TotalDanado,
          CantidadBuenEstado:
            parseInt(item.remo_TotalDia) - parseInt(item.remo_TotalDanado) < 0
              ? 0
              : parseInt(item.remo_TotalDia) - parseInt(item.remo_TotalDanado),
          detalles: detalles, // Agrega los detalles transformados
          usua_UsuarioCrea: item.usua_UsuarioCrea,
          remo_FechaCreacion: item.remo_FechaCreacion,
          usua_UsuarioModifica: item.usua_UsuarioModifica,
          remo_FechaModificacion: item.remo_FechaModificacion,
          remo_Finalizado: item.remo_Finalizado,
        };
      });

      return data;
    } catch (error) {
    }
  }

  async function crear(data) {
    try {
      let datos = {
        modu_Id: data["modu_Id"],
        modu_Id: data["modulo"].value,
        remo_Fecha: data["remo_Fecha"],
        remo_TotalDia: 0,
        remo_TotalDanado: 0,
        // remo_TotalDia: data["remo_TotalDia"],
        // remo_TotalDanado: data["remo_TotalDanado"],

        usua_UsuarioCreacion: user["uuid"],
        remo_FechaCreacion: instance.formatFechaHora(new Date()),
      };

      const response = await axiosInstance.post("Insertar", datos);

      return response;
    } catch (error) {
    }
  }

  async function editar(data) {
    try {
      const fecha = new Date(data["remo_Fecha"]);
      const fechaFormateada = fecha.toISOString();
      let datos = {
        remo_Id: data["remo_Id"],
        modu_Id: data["modulo"].value,
        remo_Fecha: fechaFormateada,
        remo_TotalDia: 1,
        remo_TotalDanado: 1,
        // remo_TotalDia: data["remo_TotalDia"],
        // remo_TotalDanado: data["remo_TotalDanado"],

        usua_UsuarioModificacion: user["uuid"],
        remo_FechaModificacion: instance.formatFechaHora(new Date()),
      };
      const response = await axiosInstance.post("Editar", datos);
      return response;
    } catch (error) {
    }
  }

  async function Finalizar(data) {
    try {
      let datos = {
        remo_Id: data[0].remo_Id,
      };
      const response = await axiosInstance.post("Finalizar", datos);
      return response;
    } catch (error) {
    }
  }

  // Reporte Modulo Detalle

  async function listarDetalles(id) {
    try {
      const response = await axiosInstanceDetalle.get("Listar/" + id);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          rdet_Id: parseInt(item.rdet_Id),
          remo_Id: parseInt(item.remo_Id),
          orco_Codigo: item.orco_Codigo,
          
          code_CantidadPrenda: parseInt(item.code_CantidadPrenda),
          rdet_TotalDia: parseInt(item.rdet_TotalDia),
          rdet_TotalDanado: parseInt(item.rdet_TotalDanado),
          CantidadBuenEstado:
            parseInt(item.rdet_TotalDia) - parseInt(item.rdet_TotalDanado) < 0
              ? 0
              : parseInt(item.rdet_TotalDia) - parseInt(item.rdet_TotalDanado),
          code_Id: parseInt(item.code_Id),
          ensa_Id: parseInt(item.ensa_Id),
          proc_Id: parseInt(item.proc_Id),
          sexo: item.sexo,
          colr_Nombre: item.colr_Nombre,
          clie_Nombre_Contacto: item.clie_Nombre_Contacto,
          clie_RTN: item.clie_RTN,
          orco_Id: parseInt(item.orco_Id),
          esti_Descripcion: item.esti_Descripcion,

          usua_UsuarioCrea: item.usua_UsuarioCrea,
        };
      });
      return data;
    } catch (error) {
    }
  }

  async function crearDetalle(data) {

    try {
      let datos = {
        remo_Id: parseInt(data["remo_Id"]),
        code_Id: parseInt(data["OrdenCompraDetalle"].value),
        ensa_Id: parseInt(data["OrdenCompraDetalle"].ensa_Id),
        rdet_TotalDia: parseInt(data["rdet_TotalDiaDetalle"]),
        rdet_TotalDanado: parseInt(data["rdet_TotalDanadoDetalle"]),

        usua_UsuarioCreacion: user["uuid"],
        //rdet_FechaCreacion : instance.formatFechaHora(new Date()),
      };
      const response = await axiosInstanceDetalle.post("Insertar", datos);

      return response;
    } catch (error) {
    }
  }

  async function EditarDetalle(data) {
    try {
      let datos = {
        rdet_Id: data["rdet_Id"],
        remo_Id: data["remo_Id"],
        code_Id: parseInt(data["OrdenCompraDetalle"].value),
        ensa_Id: parseInt(data["OrdenCompraDetalle"].ensa_Id),
        rdet_TotalDia: data["rdet_TotalDiaDetalle"],
        rdet_TotalDanado: data["rdet_TotalDanadoDetalle"],

        usua_UsuarioModificacion: user["uuid"],
        //rdet_FechaCreacion : instance.formatFechaHora(new Date()),
      };


      const response = await axiosInstanceDetalle.post("Editar", datos);

      return response;
    } catch (error) {
    }
  }

  async function EliminarDetalle(data) {
    try {
      let datos = {
        rdet_Id: data["rdet_Id"],

        //rdet_FechaCreacion : instance.formatFechaHora(new Date()),
      };
      const response = await axiosInstanceDetalle.post("Eliminar", datos);

      return response;
    } catch (error) {
    }
  }

  return {
    listar,
    crear,
    editar,
    crearDetalle,
    listarProceso,
    listarDetalles,
    EditarDetalle,
    EliminarDetalle,
    Finalizar,
    listarRangos,
  };
}

// const ReporteModuloDiaServices = new ReporteModuloDiaService();
export default ReporteModuloDiaServices;
