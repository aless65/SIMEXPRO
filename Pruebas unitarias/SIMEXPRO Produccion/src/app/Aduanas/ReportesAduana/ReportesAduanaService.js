import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function ReportesAduanaService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Reportes/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    async function DevasPendientes(fecha_inicio, fecha_fin) {
        try {
            const encodedFechaInicio = encodeURIComponent(fecha_inicio);
            const encodedFechaFin = encodeURIComponent(fecha_fin);

            const response = await axiosInstance.get(`DevasPendientes?fechaInicio=${encodedFechaInicio}&fechaFin=${encodedFechaFin}`); const dataresponse = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    deva_Id: item.deva_Id,
                    adua_IngresoNombre: item.adua_IngresoNombre,
                    adua_IngresoCodigo: item.adua_IngresoCodigo,
                    adua_DespachoCodigo: item.adua_DespachoCodigo,
                    inco_Codigo: item.inco_Codigo,
                    adua_DespachoNombre: item.adua_DespachoNombre,
                    pais_ExportacionNombre: item.pais_ExportacionNombre,
                    deva_FechaExportacion: item.deva_FechaExportacion,
                    impo_RTN: item.impo_RTN,
                    impo_Correo_Electronico: item.impo_Correo_Electronico,
                    impo_Telefono: item.impo_Telefono,
                    pais_EntregaNombre: item.pais_EntregaNombre,
                    inco_Descripcion: item.inco_Descripcion,
            }});
            return dataresponse;
        } catch (error) {
            console.error(error);
        }
    }

    async function Importaciones(fecha_inicio, fecha_fin) {
        try {
            const encodedFechaInicio = encodeURIComponent(fecha_inicio);
            const encodedFechaFin = encodeURIComponent(fecha_fin);

            const response = await axiosInstance.get(`Importaciones?fechaInicio=${encodedFechaInicio}&fechaFin=${encodedFechaFin}`); const dataresponse = response.data.data.map((item, index) => {
            const detalles = JSON.parse(item.detalles);
            const valoresTotales = JSON.parse(item.valoresTotales);
                return {
                    key: index + 1,
                    duca_No_Duca: item.duca_No_Duca,
                    duca_No_Correlativo_Referencia: item.duca_No_Correlativo_Referencia,
                    duca_Codigo_Declarante: item.duca_Codigo_Declarante,
                    duca_FechaVencimiento: item.duca_FechaVencimiento,

                    duca_NombreSocial_Declarante: item.duca_NombreSocial_Declarante,
                    duca_DomicilioFiscal_Declarante: item.duca_DomicilioFiscal_Declarante,
              
                    detalles: detalles,
                    valoresTotales: valoresTotales,
                };
            });
            return dataresponse;
        } catch (error) {
            console.error(error);
        }
    }


    async function Contratos_Adhesion(fecha_inicio, fecha_fin, Contrato) {
        try {
          const encodedFechaInicio = encodeURIComponent(fecha_inicio);
          const encodedFechaFin = encodeURIComponent(fecha_fin);
    
          const response = await axiosInstance.get(`Contratos_Adhesion?fechaInicio=${encodedFechaInicio}&fechaFin=${encodedFechaFin}&Contrato=${Contrato}`);
          const dataresponse = response.data.data.map((item, index) => {
    
            switch (Contrato) {
              case "PN":
                return {
                  key: index + 1,
                  pena_Id: item.pena_Id,
                  pers_Nombre: item.pers_Nombre,
                  pena_DireccionExacta: item.pena_DireccionExacta,
                  ciud_Nombre: item.ciud_Nombre,
                  pena_TelefonoFijo: item.pena_TelefonoFijo,
                  pena_TelefonoCelular: item.pena_TelefonoCelular,
                  pena_CorreoElectronico: item.pena_CorreoElectronico,
                  pena_CorreoAlternativo: item.pena_CorreoAlternativo,
                  pena_RTN: item.pena_RTN,
                  pena_ArchivoRTN: item.pena_ArchivoRTN,
                  pena_DNI: item.pena_DNI,
                  pena_ArchivoDNI: item.pena_ArchivoDNI,
                  pena_NumeroRecibo: item.pena_NumeroRecibo,
                  pena_ArchivoNumeroRecibo: item.pena_NombreArchDNI,
                  pena_NombreArchRTN: item.pena_NombreArchRTN,
                  pena_NombreArchRecibo: item.pena_NombreArchRecibo,
                };
    
              case "PJ":
                return {
                  key: index + 1,
                  peju_Id: item.peju_Id,
                  pers_Nombre: item.pers_Nombre,
                  ciud_Nombre: item.ciud_Nombre,
                  colo_Nombre: item.colo_Nombre,
                  alde_Nombre: item.alde_Nombre,
                  peju_PuntoReferencia: item.peju_PuntoReferencia,
                  peju_NumeroLocalRepresentante: item.peju_NumeroLocalRepresentante,
                  peju_PuntoReferenciaRepresentante: item.peju_PuntoReferenciaRepresentante,
                  peju_TelefonoEmpresa: item.peju_TelefonoEmpresa,
                  peju_TelefonoFijoRepresentanteLegal: item.peju_TelefonoFijoRepresentanteLegal,
                  peju_TelefonoRepresentanteLegal: item.peju_TelefonoRepresentanteLegal,
                  peju_CorreoElectronico: item.peju_CorreoElectronico,
                  peju_CorreoElectronicoAlternativo: item.peju_CorreoElectronicoAlternativo,
                  peju_CiudadRepresentanteNombre: item.peju_CiudadRepresentanteNombre,
                  peju_ColoniaRepresentanteNombre: item.peju_ColoniaRepresentanteNombre,
                  peju_AldeaRepresentanteNombre: item.peju_AldeaRepresentanteNombre,
                  peju_NumeroLocalApart: item.peju_NumeroLocalApart,
                };
    
              case "CI":
                return {
                  key: index + 1,
                  coin_Id: item.coin_Id,
                  pers_Nombre: item.pers_Nombre,
                  ciud_Nombre: item.ciud_Nombre,
                  colo_Nombre: item.colo_Nombre,
                  alde_Nombre: item.alde_Nombre,
                  pers_FormaRepresentacion: item.pers_FormaRepresentacion,
                  coin_TelefonoCelular: item.coin_TelefonoCelular,
                  coin_TelefonoFijo: item.coin_TelefonoFijo,
                  coin_CorreoElectronico: item.coin_CorreoElectronico,
                  coin_CorreoElectronicoAlternativo: item.coin_CorreoElectronicoAlternativo,
    
                };
    
              default:
                return {};
            }
          });
          return dataresponse;
        } catch (error) {
          console.error(error);
        }
      }

      async function ProduccionPorPaiss (pais, FechaInicio, FechaLimite) {
        try {
          const datos = {
            pais_Id: pais["value"],
            // pais_Id: 231,
            fechaInicio: FechaInicio,
            fechaFin: FechaLimite,
          };
          const response = await axiosInstance.post('ExportacionPorPais', datos);
          
          const dataresponse = response.data.data.map((item, index) => {
    
    
            let detalles = null;
    
            const detallesJson = JSON.parse(item.detalles);
            detalles = detallesJson.map((datos, index2)=>{
              return {
                key: index2 + 1,
    
              duca_No_Correlativo_Referencia:datos.duca_No_Correlativo_Referencia,
              duca_No_Duca:datos.duca_No_Duca,
              duca_PaisProcedencia:datos.duca_PaisProcedencia,
              duca_PaisDestino:datos.duca_PaisDestino,
              duca_NombreSocial_Declarante:datos.duca_NombreSocial_Declarante
              };
            })
    
            return {
              key: index + 1,
              // pais_Id:item.pais_Id,
              pais_Codigo: item.pais_Codigo,
              pais_Nombre: item.pais_Nombre,
              pais_prefijo: item.pais_prefijo,
              fechaInicio: item.fechaInicio.toString().slice(0, 10),
              fechaFin: item.fechaFin.toString().slice(0, 10),
              detalles: detalles,
             }
          });          
          return dataresponse;
    
        } catch (error) {    
        }
      }

    return {
        DevasPendientes,
        Importaciones,
        Contratos_Adhesion,
        ProduccionPorPaiss,
    }

}

export default ReportesAduanaService;
