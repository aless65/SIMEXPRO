import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function DucaService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Duca/";
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const baseURL_doso = process.env.REACT_APP_API_URL + "api/DocumentosDeSoporte/";
    const axiosInstance_doso = axios.create({
        baseURL: baseURL_doso,
        headers: customHeaders,
    });

    const baseURL_devaxduca = process.env.REACT_APP_API_URL + "api/ItemsDEVAxDUCA/";
    const axiosInstance_devaxduca = axios.create({
        baseURL: baseURL_devaxduca,
        headers: customHeaders,
    });

    const baseURL_fact = process.env.REACT_APP_API_URL + "api/Facturas/";
    const axiosInstance_fact = axios.create({
        baseURL: baseURL_fact,
        headers: customHeaders,
    });

    const baseURL_item = process.env.REACT_APP_API_URL + "api/Items/";
    const axiosInstance_item = axios.create({
        baseURL: baseURL_item,
        headers: customHeaders,
    });

    const baseURL_PaisesEnTratados = process.env.REACT_APP_API_URL + "api/PaisesEstanTratadosConHonduras/";
    const axiosInstance_PaisesEnTratados = axios.create({
        baseURL: baseURL_PaisesEnTratados,
        headers: customHeaders,
    });

    const baseURL_Tratados = process.env.REACT_APP_API_URL + "api/TratadosLibreComercio/";
    const axiosInstance_Tratados = axios.create({
        baseURL: baseURL_Tratados,
        headers: customHeaders,
    });


    const user = JSON.parse(localStorage.getItem('user'))


    async function ExportData() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    duca_No_Duca: item.duca_No_Duca,
                    duca_No_Correlativo_Referencia: item.duca_No_Correlativo_Referencia,
                    nombre_pais_procedencia: item.nombre_pais_procedencia,
                    nombre_Aduana_Registro: item.nombre_Aduana_Registro
                };
            });
            return data;
        }
        catch (error) {
            
            
        }
    };

    async function GenerarDuca(id){
        try{
            const response = await axiosInstance.get("GenerarDuca?duca_Id=" + id);

            return response
        }catch(err){
            return null
        }
    }


    async function ListadoDuca() {
        try {
            const response = await axiosInstance.get("Listar");

            const data = response.data.data.map((item, index) => {
                return {
                    id: index + 1,
                    duca_Id: item.duca_Id,
                    duca_No_Duca: item.duca_No_Duca ? item.duca_No_Duca : "",
                    duca_No_Correlativo_Referencia: item.duca_No_Correlativo_Referencia ? item.duca_No_Correlativo_Referencia : "",
                    duca_AduanaRegistro: item.duca_AduanaRegistro,
                    duca_AduanaDestino: item.duca_AduanaDestino,
                    duca_DomicilioFiscal_Exportador: item.duca_DomicilioFiscal_Exportador,
                    duca_Tipo_Iden_Exportador: item.duca_Tipo_Iden_Exportador,
                    duca_Pais_Emision_Exportador: item.duca_Pais_Emision_Exportador,
                    duca_Numero_Id_Importador: item.duca_Numero_Id_Importador,
                    duca_Pais_Emision_Importador: item.duca_Pais_Emision_Importador,
                    duca_DomicilioFiscal_Importador: item.duca_DomicilioFiscal_Importador,
                    duca_Regimen_Aduanero: item.duca_Regimen_Aduanero,
                    tran_IdUnidadTransporte: item.tran_IdUnidadTransporte,
                    tran_TamanioEquipamiento: item.tran_TamanioEquipamiento,
                    duca_Modalidad: item.duca_Modalidad,
                    duca_Clase: item.duca_Clase,
                    duca_Codigo_Declarante: item.duca_Codigo_Declarante,
                    duca_Numero_Id_Declarante: item.duca_Numero_Id_Declarante,
                    duca_NombreSocial_Declarante: item.duca_NombreSocial_Declarante,
                    duca_DomicilioFiscal_Declarante: item.duca_DomicilioFiscal_Declarante,
                    duca_Pais_Procedencia: item.duca_Pais_Procedencia,
                    duca_Pais_Exportacion: item.duca_Pais_Exportacion,
                    duca_Pais_Destino: item.duca_Pais_Destino,
                    duca_Deposito_Aduanero: item.duca_Deposito_Aduanero,
                    duca_Lugar_Desembarque: item.duca_Lugar_Desembarque,
                    emba_Codigo: item.emba_Codigo,
                    duca_Manifiesto: item.duca_Manifiesto,
                    duca_Titulo: item.duca_Titulo,
                    duca_Codigo_Transportista: item.duca_Codigo_Transportista,
                    duca_PesoBrutoTotal: item.duca_PesoBrutoTotal,
                    duca_PesoNetoTotal: item.duca_PesoNetoTotal,
                    motr_Id: item.motr_Id,
                    duca_Transportista_Nombre: item.duca_Transportista_Nombre,
                    duca_Conductor_Id: item.duca_Conductor_Id,
                    duca_Codigo_Tipo_Documento: item.duca_Codigo_Tipo_Documento,
                    duca_FechaVencimiento: item.duca_FechaVencimiento.toString().substring(0, 10),
                    duca_CanalAsignado: item.duca_CanalAsignado,
                    trli_Id: item.trli_Id,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    duca_FechaCreacion: item.duca_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    duca_FechaModificacion: item.duca_FechaModificacion,
                    duca_Estado: item.duca_Estado,
                    duca_Finalizado: item.duca_Finalizado,
                    deva_FechaAceptacion: item.deva_FechaAceptacion,
                    decl_NumeroIdentificacion: item.decl_NumeroIdentificacion,
                    tipo_identidad_exportador_descripcion: item.tipo_identidad_exportador_descripcion,
                    nombre_pais_exportador: item.nombre_pais_exportador,
                    decl_Nombre_Raso: item.decl_Nombre_Raso,
                    nombre_Aduana_Registro: item.nombre_Aduana_Registro ? item.nombre_Aduana_Registro : "",
                    nombre_Aduana_Salida: item.nombre_Aduana_Salida,
                    deva_AduanaIngresoId: item.deva_AduanaIngresoId,
                    nombre_Aduana_Ingreso: item.nombre_Aduana_Ingreso,
                    deva_AduanaDespachoId: item.deva_AduanaDespachoId,
                    nombre_Aduana_Despacho: item.nombre_Aduana_Despacho,
                    nombre_pais_importador: item.nombre_pais_importador,
                    nombre_pais_procedencia: item.nombre_pais_procedencia ? item.nombre_pais_procedencia : "",
                    nombre_pais_exportacion: item.nombre_pais_exportacion,
                    nombre_pais_destino: item.nombre_pais_destino,
                    cont_Id: item.cont_Id,
                    cont_Licencia: item.cont_Licencia,
                    nombre_pais_conductor: item.nombre_pais_conductor,
                    cont_NoIdentificacion: item.cont_NoIdentificacion,
                    cont_Nombre: item.cont_Nombre,
                    cont_Apellido: item.cont_Apellido,
                    pais_IdExpedicion: item.pais_IdExpedicion,
                    tran_Id: item.tran_Id,
                    id_pais_transporte: item.id_pais_transporte,
                    nombre_pais_transporte: item.nombre_pais_transporte,
                    marca_Id: item.marca_Id,
                    transporte_marca_Id: item.transporte_marca_Id,
                    transporte_marc_Descripcion: item.transporte_marc_Descripcion,
                    tran_Chasis: item.tran_Chasis,
                    tran_Remolque: item.tran_Remolque,
                    tran_CantCarga: item.tran_CantCarga,
                    tran_NumDispositivoSeguridad: item.tran_NumDispositivoSeguridad,
                    tran_Equipamiento: item.tran_Equipamiento,
                    tran_TipoCarga: item.tran_TipoCarga,
                    tran_IdContenedor: item.tran_IdContenedor,
                    base_Gasto_TransporteM_Importada: item.base_Gasto_TransporteM_Importada,
                    base_Costos_Seguro: item.base_Costos_Seguro,
                    baseCalculos_inco_Id: item.baseCalculos_inco_Id,
                    baseCalculos_inco_Descripcion: item.baseCalculos_inco_Descripcion,
                    base_Valor_Aduana: item.base_Valor_Aduana,
                    deva_ConversionDolares: item.deva_ConversionDolares,
                    usua_NombreCreacion: item.usua_NombreCreacion,
                    usua_NombreModificacion: item.usua_NombreModificacion
                };
            });
            return data;
        }
        catch (error) {
            console.error(error);
        }
    };

    async function InsertarTab1(modelo) {
        try {
            let datos = {
                duca_Id: parseInt(localStorage.getItem("duca_Id")),
                duca_No_Duca: modelo.NoDuca,
                duca_No_Correlativo_Referencia: modelo.NoCorrelativoReferencia,
                duca_AduanaRegistro: modelo.AduanaRegistro.value,
                duca_AduanaDestino: modelo.AduanaDestino.value,
                duca_Regimen_Aduanero: modelo.RegimenAduanero.value,
                duca_Modalidad: modelo.Modalidad,
                duca_Clase: modelo.Clase,
                duca_FechaVencimiento: modelo.FechaVencimiento,
                duca_Pais_Procedencia: modelo.PaisProcedencia.value,
                duca_Pais_Destino: modelo.PaisDestino.value,
                duca_Deposito_Aduanero: modelo.DepositoAduanero,
                duca_Lugar_Desembarque: modelo?.LugarDesembarque?.value,
                duca_Manifiesto: modelo.Manifiesto,
                duca_Titulo: modelo.Titulo,
                trli_Id: modelo.trli_Id.value,
                usua_UsuarioCreacion: user["uuid"],
                duca_FechaCreacion: new Date(),
            }
            const response = await axiosInstance.post('InsertPart1', datos);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function EditarTab1(modelo) {
        try {
            let datos = {
                duca_Id: parseInt(localStorage.getItem("duca_Id")),
                duca_No_Duca: modelo.NoDuca,
                duca_No_Correlativo_Referencia: modelo.NoCorrelativoReferencia,
                duca_AduanaRegistro: modelo.AduanaRegistro.value,
                duca_AduanaDestino: modelo.AduanaDestino.value,
                duca_Regimen_Aduanero: modelo.RegimenAduanero.value,
                duca_Modalidad: modelo.Modalidad,
                duca_Clase: modelo.Clase,
                duca_FechaVencimiento: modelo.FechaVencimiento,
                duca_Pais_Procedencia: modelo.PaisProcedencia.value,
                duca_Pais_Destino: modelo.PaisDestino.value,
                duca_Deposito_Aduanero: modelo.DepositoAduanero,
                duca_Lugar_Desembarque: modelo?.LugarDesembarque?.value,
                duca_Manifiesto: modelo.Manifiesto,
                duca_Titulo: modelo.Titulo,
                trli_Id: modelo.trli_Id.value,
                usua_UsuarioModificacion: user["uuid"],
                duca_FechaModificacion: new Date(),
            }
            const response = await axiosInstance.post('EditarPart1', datos);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function InsertarTab2(modelo) {
        try {
            let datos = {
                duca_Id: parseInt(localStorage.getItem("duca_Id")),
                duca_Codigo_Declarante: modelo.Codigo_Declarante,
                duca_Numero_Id_Declarante: modelo.NoIdentificacion_Declarante,
                duca_NombreSocial_Declarante: modelo.NombreRazonSocial_Declarante,
                duca_DomicilioFiscal_Declarante: modelo.DomicilioFiscal_Declarante,
                duca_Codigo_Transportista: modelo.Codigo,
                duca_Transportista_Nombre: modelo.Nombre,
                motr_Id: modelo.ModoTransporte.value,
                cont_NoIdentificacion: modelo.NoIdentificador,
                cont_Licencia: modelo.NoLicenciaConducir,
                pais_IdExpedicion: modelo?.PaisExpedicion?.value == null ? 0 : modelo?.PaisExpedicion?.value,
                cont_Nombre: modelo.Nombres,
                cont_Apellido: modelo.Apellidos,
                id_pais_transporte: modelo?.PaisRegistro?.value == null ? 0 : modelo?.PaisRegistro?.value,
                transporte_marca_Id: modelo?.Marca?.value == null ? 0 : modelo?.Marca?.value,
                tran_IdUnidadTransporte: modelo.IdUnidadTransporte,
                tran_Chasis: modelo.ChasisVin,
                tran_Remolque: modelo.IdentificacionRemolque,
                tran_CantCarga: modelo.CantidadUnidadesCarga == "" ? 0 : modelo.CantidadUnidadesCarga,
                tran_NumDispositivoSeguridad: modelo.NumeroDispositivo == "" ? 0 : parseInt(modelo.NumeroDispositivo),
                tran_Equipamiento: modelo.Equipamiento,
                tran_TamanioEquipamiento: modelo.TamanioEquipamiento,
                tran_TipoCarga: modelo.TipoCarga,
                tran_IdContenedor: modelo.NIdentificacionContenedor,
                usua_UsuarioCreacion: user["uuid"],
                duca_FechaCreacion: new Date(),
            }

            const response = await axiosInstance.post('InsertPart2', datos);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function EditarTab2(modelo) {
        try {
            let datos = {
                duca_Id: parseInt(localStorage.getItem("duca_Id")),
                duca_Codigo_Declarante: modelo.Codigo_Declarante,
                duca_Numero_Id_Declarante: modelo.NoIdentificacion_Declarante,
                duca_NombreSocial_Declarante: modelo.NombreRazonSocial_Declarante,
                duca_DomicilioFiscal_Declarante: modelo.DomicilioFiscal_Declarante,
                duca_Codigo_Transportista: modelo.Codigo,
                duca_Transportista_Nombre: modelo.Nombre,
                motr_Id: modelo.ModoTransporte.value,
                duca_Conductor_Id: modelo.duca_Conductor_Id,
                cont_NoIdentificacion: modelo.NoIdentificador,
                cont_Licencia: modelo.NoLicenciaConducir,
                pais_IdExpedicion: modelo?.PaisExpedicion?.value == null ? 0 : modelo?.PaisExpedicion?.value,
                cont_Nombre: modelo.Nombres,
                cont_Apellido: modelo.Apellidos,
                id_pais_transporte: modelo?.PaisRegistro?.value == null ? 0 : modelo?.PaisRegistro?.value,
                transporte_marca_Id: modelo?.Marca?.value == null ? 0 : modelo?.Marca?.value,
                tran_IdUnidadTransporte: modelo.IdUnidadTransporte,
                tran_Chasis: modelo.ChasisVin,
                tran_Remolque: modelo.IdentificacionRemolque,
                tran_CantCarga: modelo.CantidadUnidadesCarga == "" ? 0 : modelo.CantidadUnidadesCarga,
                tran_NumDispositivoSeguridad: modelo.NumeroDispositivo == "" ? 0 : parseInt(modelo.NumeroDispositivo),
                tran_Equipamiento: modelo.Equipamiento,
                tran_TamanioEquipamiento: modelo.TamanioEquipamiento,
                tran_TipoCarga: modelo.TipoCarga,
                tran_IdContenedor: modelo.NIdentificacionContenedor,
                usua_UsuarioModificacion: user["uuid"],
                duca_FechaModificacion: new Date(),
            }

            const response = await axiosInstance.post('EditarPart2', datos);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function InsertarDocumentoSoporte(modelo) {
        try {
            let datos = {
                tido_Id: modelo.CodigoTipoDocumento.value,
                duca_Id: parseInt(localStorage.getItem("duca_Id")),
                doso_NumeroDocumento: modelo.NumeroDocumento,
                doso_FechaEmision: modelo.EmisionDocumento,
                doso_FechaVencimiento: modelo.FechaVencimiento,
                doso_PaisEmision: modelo.PaisEmision?.value,
                doso_LineaAplica: modelo.Linea,
                doso_EntidadEmitioDocumento: modelo.AutoridadEntidad,
                doso_Monto: modelo.Monto,
                usua_UsuarioCreacion: user["uuid"],
                doso_FechaCreacion: new Date(),
            }

            const response = await axiosInstance.post('InsertPart3', datos);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function EliminarDocumentoSoporte(doso_Id) {
        try {
            const response = await axiosInstance_doso.post(`Eliminar?doso_Id=${doso_Id}`)

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function ListarDocumentosSoporteByNoDuca() {
        try {
            const response = await axiosInstance_doso.get('Listar');

            const data = response.data.data.map((item, index) => {
                return {
                    id: index + 1,
                    doso_Id: item.doso_Id,
                    tido_Id: item.tido_Id,
                    tido_Codigo: item.tido_Codigo,
                    tido_Descripcion: item.tido_Descripcion,
                    duca_Id: item.duca_Id,
                    doso_NumeroDocumento: item.doso_NumeroDocumento,
                    doso_FechaEmision: item.doso_FechaEmision,
                    doso_FechaVencimiento: item.doso_FechaVencimiento,
                    doso_PaisEmision: item.doso_PaisEmision,
                    doso_LineaAplica: item.doso_LineaAplica,
                    doso_EntidadEmitioDocumento: item.doso_EntidadEmitioDocumento,
                    doso_Monto: item.doso_Monto
                }
            })
            return data.filter((item) => item.duca_Id === parseInt(parseInt(localStorage.getItem("duca_Id"))));
        } catch (error) {
            console.error(error);
        }
    }

    async function InsertarItem(modelo) {
        try {
            let datos = {
                item_Id: modelo.Item_Id,
                item_Cantidad_Bultos: modelo.CantidadBultos,
                item_ClaseBulto: modelo.ClaseBulto,
                item_Acuerdo: modelo.Acuerdo,
                item_PesoNeto: modelo.PesoNeto,
                item_PesoBruto: modelo.PesoBruto,
                item_GastosDeTransporte: modelo.GastosTransporte,
                item_Seguro: modelo.Seguro,
                item_OtrosGastos: modelo.OtrosGastos,
                item_CuotaContingente: modelo.CuotaContingente,
                item_ReglasAccesorias: modelo.ReglasAccesorias,
                item_CriterioCertificarOrigen: modelo.CriterioParaOrigen,
                usua_UsuarioModificacion: user["uuid"],
                item_FechaModificacion: new Date(),
            }

            const response = await axiosInstance_item.post("EditarItemDuca", datos);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function EditarDocumentoSoporte(modelo) {
        try {
            let datos = {
                doso_Id: modelo.doso_Id,
                tido_Id: modelo.CodigoTipoDocumento.value,
                doso_NumeroDocumento: modelo.NumeroDocumento,
                doso_FechaEmision: modelo.EmisionDocumento,
                doso_FechaVencimiento: modelo.FechaVencimiento,
                doso_PaisEmision: modelo.PaisEmision?.value,
                doso_LineaAplica: modelo.Linea,
                doso_EntidadEmitioDocumento: modelo.AutoridadEntidad,
                doso_Monto: modelo.Monto,
                usua_UsuarioModificacion: user["uuid"],
                doso_FechaModificacion: new Date(),
            }

            const response = await axiosInstance.post('EditarPart3', datos);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function ListarDevasxNoDuca() {
        try {
            const response = await axiosInstance_devaxduca.get(`ListadoDevasPorducaId?duca_Id=${parseInt(localStorage.getItem("duca_Id"))}`);

            let devas = [];

            response.data.data.forEach(element => {
                devas.push(element.deva_Id);
            });

            return devas;
        } catch (error) {
            console.error(error);
        }
    }

    async function ListarFacturasPorDevaId(deva_Id) {
        try {
            const response = await axiosInstance_fact.get(`Listar?deva_Id=${deva_Id}`);

            let facturas = [];

            response.data.data.forEach(element => {
                facturas.push(element.fact_Id);
            });

            return facturas;
        } catch (error) {
            console.error(error);
        }
    }

    async function ListarItemsPorfact_Id(fact_Id) {
        try {
            const response = await axiosInstance_item.get(`Listar?fact_Id=${fact_Id}`);

            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function ListarDevasPorDuca() {
        try {
            const response = await axiosInstance.get('ListaDevaNoDuca');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    deva_Id: item.deva_Id,
                    pais_ExportacionId: item.pais_ExportacionId,
                    pais_Codigo: item.pais_Codigo,
                    pais_Nombre: `${item.pais_Codigo} - ${item.pais_Nombre}`,
                    inco_Id: item.inco_Id,
                    inco_Codigo: item.inco_Codigo,
                    regi_Id: item.regi_Id,
                    regi_Codigo: item.regi_Codigo,
                    regi_Descripcion: item.regi_Descripcion,
                    deva_FechaAceptacion: item.deva_FechaAceptacion,
                    deva_ConversionDolares: item.deva_ConversionDolares
                };
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function ListarDevasPorNoDuca(){
        try {
            const response = await axiosInstance_devaxduca.get(`ListarDevaPorDucaNo?duca_Id=${parseInt(localStorage.getItem("duca_Id"))}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    deva_Id: item.deva_Id,
                    pais_ExportacionId: item.pais_ExportacionId,
                    pais_Codigo: item.pais_Codigo,
                    pais_Nombre: item.pais_ExportacionNombre,
                    inco_Id: item.inco_Id,
                    inco_Codigo: item.inco_Codigo,
                    regi_Id: item.regi_Id,
                    regi_Codigo: item.regi_Codigo,
                    regi_Descripcion: item.regi_Descripcion,
                    deva_FechaAceptacion: item.deva_FechaAceptacion,
                    deva_ConversionDolares: item.deva_ConversionDolares
                };
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function PreInsertar() {
        try {
            const response = await axiosInstance.post('PreInsertar');
            return response;
        }
        catch (error) {
            
        }
    }

    async function InsertarDevaPorDuca(deva_Id) {
        try {
            let datos = {
                "duca_Id": parseInt(localStorage.getItem("duca_Id")),
                "deva_Id": deva_Id,
                "usua_UsuarioCreacion": user["uuid"],
                "dedu_FechaCreacion": new Date(),
            }

            const response = await axiosInstance_devaxduca.post("Insertar", datos);

            return response;
        } catch (error) {
            ;
        }
    }

    async function LiberarDevasPorDucaId(){
        try {
            const response = await axiosInstance_devaxduca.post(`LiberarDevasPorDucaId?duca_Id=${parseInt(localStorage.getItem("duca_Id"))}`)
            return response;
        } catch (error) {
            ;
        }
    }

    async function finalizarDuca() {
        try {
            const response = await axiosInstance.post(`FinalizarDuca?duca_Id=${parseInt(localStorage.getItem("duca_Id"))}`);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function cancelarEliminarDuca() {
        try {
            const response = await axiosInstance.post(`CancelarEliminar?duca_Id=${parseInt(localStorage.getItem("duca_Id"))}`);

            return response;
        } catch (error) {
            console.error(error);
        }
    }
   
    async function generarQR(url){
        try {
            const encodedParams = new URLSearchParams();
            encodedParams.set('content', 'http://www.neutrinoapi.com');
            encodedParams.set('width', '128');
            encodedParams.set('height', '128');
            encodedParams.set('fg-color', '#000000');
            encodedParams.set('bg-color', '#ffffff');
            
            const options = {
              method: 'POST',
              url: 'https://neutrinoapi-qr-code.p.rapidapi.com/qr-code',
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '9ce74d0c9amsh2a24826b7d6146cp1b2d83jsn2629a0e252f7',
                'X-RapidAPI-Host': 'neutrinoapi-qr-code.p.rapidapi.com'
              },
              data: encodedParams,
            };
            
            try {
                const response = await axios.request(options);
                return response
            } catch (error) {
                console.error(error);
            }

            
        } catch (error) {
            console.error(error);
        }
    }
    
    async function TratadoByPaisId(pais_Id){
        try {
            const response = await axiosInstance_PaisesEnTratados.get(`TratadoByPaisId?pais_Id=${parseInt(pais_Id)}`);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function ListTratadosById(trli_Id){
        try {
            const response = await axiosInstance_Tratados.get(`ListTratadosById?trli_Id=${parseInt(trli_Id)}`);

            return response;
        } catch (error) {
            console.error(error);
        }
    }
    
    async function CalcularValorAduanaItem(item_Id, trli_Id, deva_ConversionDolares){
        try {
            const response = await axiosInstance_item.post(`CalcularValorAduana?item_Id=${item_Id}&trli_Id=${trli_Id}&duca_Id=${parseInt(localStorage.getItem("duca_Id"))}&deva_ConversionDolares=${parseFloat(deva_ConversionDolares)}`);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        ListadoDuca,
        InsertarTab1,
        EditarTab1,
        InsertarTab2,
        EditarTab2,
        InsertarDocumentoSoporte,
        ListarDocumentosSoporteByNoDuca,
        InsertarItem,
        ListarDevasxNoDuca,
        ListarFacturasPorDevaId,
        ListarItemsPorfact_Id,
        ListarDevasPorDuca,
        ListarDevasPorNoDuca,
        PreInsertar,
        InsertarDevaPorDuca,
        LiberarDevasPorDucaId,
        EditarDocumentoSoporte,
        EliminarDocumentoSoporte,
        finalizarDuca,
        cancelarEliminarDuca,
        ExportData,
        GenerarDuca,
        generarQR,
        ListTratadosById,
        TratadoByPaisId,
        CalcularValorAduanaItem
    }
}
export default DucaService;
