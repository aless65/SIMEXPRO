import axios from "axios";
import { element } from "prop-types";
import instance from "src/app/auth/services/jwtService/jwtService";

function Declaracion_ValorService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURLOrigin = process.env.REACT_APP_API_URL + "api/";

    const axiosInstanceOrigin = axios.create({
        baseURL: baseURLOrigin,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstanceOrigin.get('Declaracion_Valor/Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    //Campos de Declaración de valor
                    deva_Id: item.deva_Id,
                    deva_AduanaIngresoId: item.deva_AduanaIngresoId,
                    adua_IngresoNombre:item.adua_IngresoNombre,
                    deva_AduanaDespachoId: item.deva_AduanaDespachoId,   
                    adua_DespachoNombre:item.adua_DespachoNombre,         
                    deva_DeclaracionMercancia: item.deva_DeclaracionMercancia,
                    deva_DeclaracionMercancia: item.deva_DeclaracionMercancia,
                    deva_Finalizacion: item.deva_Finalizacion,
                    deva_PagoEfectuado:item.deva_PagoEfectuado,
                    deva_FechaAceptacion: item.deva_FechaAceptacion,
                    deva_LugarEntrega: item.deva_LugarEntrega,
                    deva_NumeroContrato: item.deva_NumeroContrato,
                    deva_FechaContrato: item.deva_FechaContrato,

                    regi_Id: item.regi_Id,
                    regi_Codigo:item.regi_Codigo,
                    regi_Descripcion:item.regi_Descripcion ,

                    //Campos de monedas o dinero
                    mone_Id: item.mone_Id,
                    mone_Otra: item.mone_Otra,
                    deva_ConversionDolares: item.deva_ConversionDolares,

                    //Campos de embarque
                    emba_Id: item.emba_Id,
                    emba_Codigo: item.emba_Codigo,
                    lugarEmbarque: item.lugarEmbarque,

                     //campos de nivel comercial
                     nico_Id: item.nico_Id,
                     nico_Descripcion: item.nico_Descripcion,
                     impo_NivelComercial_Otro: item.impo_NivelComercial_Otro,
                     
                     //Campos del importador
                     impo_Id: item.impo_Id,
                     impo_NumRegistro: item.impo_NumRegistro,
                     impo_RTN: item.impo_RTN,
                     impo_Nombre_Raso: item.impo_Nombre_Raso ? item.impo_Nombre_Raso : 'No tiene importador aún',
                     impo_Direccion_Exacta: item.impo_Direccion_Exacta,
                     impo_Correo_Electronico: item.impo_Correo_Electronico,
                     impo_Telefono: item.impo_Telefono,
                     impo_Fax: item.impo_Fax,
                     impo_ciudId: item.impo_ciudId,
                     impo_paisId: item.impo_paisId,

                    

                     //Campos del condición comercial
                     coco_Id: item.coco_Id,
                     coco_Descripcion: item.coco_Descripcion,
                     pvde_Condicion_Otra:item.pvde_Condicion_Otra,
                    
                    //campos de proveedores
                    pvde_Id: item.pvde_Id,
                    prov_NumeroIdentificacion:item.prov_NumeroIdentificacion,
                    prov_Nombre_Raso: item.prov_Nombre_Raso ? item.prov_Nombre_Raso : 'No tiene proveedor aún',                    prov_Direccion_Exacta: item.prov_Direccion_Exacta,
                    prov_Correo_Electronico: item.prov_Correo_Electronico,
                    prov_Telefono: item.prov_Telefono,
                    prov_Fax: item.prov_Fax,
                    prov_ciudId: item.prov_ciudId,
                    prov_paisId: item.prov_paisId,

                  //campos Tipo intermediario
                    tite_Id: item.tite_Id,
                    tipoIntermediario: item.tipoIntermediario,
                    inte_Tipo_Otro: item.inte_Tipo_Otro,

                    //campos intermediario
                    inte_Id: item.inte_Id,
                    inte_Nombre_Raso:item.inte_Nombre_Raso ? item.inte_Nombre_Raso : 'No tiene intermediario',
                    inte_Direccion_Exacta: item.inte_Direccion_Exacta,
                    inte_Correo_Electronico: item.inte_Correo_Electronico,
                    inte_NumeroIdentificacion:item.inte_NumeroIdentificacion,
                    inte_Telefono: item.inte_Telefono,
                    inte_Fax:item.inte_Fax,
                    inte_ciudId:item.inte_ciudId,
                    inte_paisId: item.inte_paisId,

                    //Campos de país
                    pais_EntregaId: item.pais_EntregaId,
                    pais_EntregaNombre: item.pais_EntregaNombre,
                    

                    //Campos de incoterms
                    inco_Id: item.inco_Id,
                    inco_Descripcion: item.inco_Descripcion,
                    inco_Version: item.inco_Version,
                    
                    //Campos de formas de pago
                    fopa_Id: item.fopa_Id,
                    fopa_Descripcion: item.fopa_Descripcion,
                    deva_FormaPagoOtra: item.deva_FormaPagoOtra,
                    
                    //Campos de formas de envío
                    foen_Id: item.foen_Id,
                    foen_Descripcion: item.foen_Descripcion,
                    deva_FormaEnvioOtra: item.deva_FormaEnvioOtra,

                    

                    //Campos de país de exportación
                    pais_ExportacionId: item.pais_ExportacionId,
                    pais_ExportacionNombre: item.pais_ExportacionNombre,
                    deva_FechaExportacion: item.deva_FechaExportacion,

                    //Campos de condiciones 
                    codi_Id : item.codi_Id,               
                    codi_Restricciones_Utilizacion  : item.codi_Restricciones_Utilizacion, 
                    codi_Indicar_Restricciones_Utilizacion : item.codi_Indicar_Restricciones_Utilizacion,
                    codi_Depende_Precio_Condicion : item.codi_Depende_Precio_Condicion, 
                    codi_Indicar_Existe_Condicion  : item.codi_Indicar_Existe_Condicion, 
                    codi_Condicionada_Revertir  : item.codi_Condicionada_Revertir, 
                    codi_Vinculacion_Comprador_Vendedor  : item.codi_Vinculacion_Comprador_Vendedor, 
                    codi_Tipo_Vinculacion : item.codi_Tipo_Vinculacion, 
                    codi_Vinculacion_Influye_Precio  : item.codi_Vinculacion_Influye_Precio, 
                    codi_Pagos_Descuentos_Indirectos  : item.codi_Pagos_Descuentos_Indirectos, 
                    codi_Concepto_Monto_Declarado : item.codi_Concepto_Monto_Declarado, 
                    codi_Existen_Canones  : item.codi_Existen_Canones, 
                    codi_Indicar_Canones  : item.codi_Indicar_Canones, 

                    //Campos de Base de calculo
                    base_Id   : item.base_Id,  
                    base_PrecioFactura  : item.base_PrecioFactura, 
                    base_PagosIndirectos  : item.base_PagosIndirectos, 
                    base_PrecioReal  : item.base_PrecioReal, 
                    base_MontCondicion  : item.base_MontCondicion, 
                    base_MontoReversion  : item.base_MontoReversion, 
                    base_ComisionCorrelaje  : item.base_ComisionCorrelaje, 
                    base_Gasto_Envase_Embalaje  : item.base_Gasto_Envase_Embalaje, 
                    base_ValoresMateriales_Incorporado : item.base_ValoresMateriales_Incorporado,
                    base_Valor_Materiales_Utilizados  : item.base_Valor_Materiales_Utilizados, 
                    base_Valor_Materiales_Consumidos  : item.base_Valor_Materiales_Consumidos, 
                    base_Valor_Ingenieria_Importado  : item.base_Valor_Ingenieria_Importado, 
                    base_Valor_Canones  : item.base_Valor_Canones, 
                    base_Gasto_TransporteM_Importada  : item.base_Gasto_TransporteM_Importada, 
                    base_Gastos_Carga_Importada  : item.base_Gastos_Carga_Importada, 
                    base_Costos_Seguro  : item.base_Costos_Seguro, 
                    base_Total_Ajustes_Precio_Pagado  : item.base_Total_Ajustes_Precio_Pagado, 
                    base_Gastos_Asistencia_Tecnica  : item.base_Gastos_Asistencia_Tecnica, 
                    base_Gastos_Transporte_Posterior  : item.base_Gastos_Transporte_Posterior, 
                    base_Derechos_Impuestos  : item.base_Derechos_Impuestos, 
                    base_Monto_Intereses  : item.base_Monto_Intereses, 
                    base_Deducciones_Legales  : item.base_Deducciones_Legales, 
                    base_Total_Deducciones_Precio  : item.base_Total_Deducciones_Precio, 
                    base_Valor_Aduana : item.base_Valor_Aduana,
                    
                    
                    //Campos de auditorio
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usua_CreacionNombre: item.usua_CreacionNombre,
                    deva_FechaCreacion: item.deva_FechaCreacion,
                    usua_ModificacionNombre: item.usua_ModificacionNombre,
                    deva_FechaModificacion: item.deva_FechaModificacion,
                    deva_Estado: item.deva_Estado,


                };
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function listarReporte(id) {
      try {
        const response = await axiosInstanceOrigin.get('Declaracion_Valor/Listar');
        const filteredData = response.data.data.filter(item => item.deva_Id === id);
        const data = filteredData.map((item, index) => {
            return {
                key: index + 1,
                //Campos de Declaración de valor
                deva_Id: item.deva_Id,
                deva_AduanaIngresoId: item.deva_AduanaIngresoId,
                adua_IngresoNombre:item.adua_IngresoNombre,
                deva_AduanaDespachoId: item.deva_AduanaDespachoId,   
                adua_DespachoNombre:item.adua_DespachoNombre,         
                deva_DeclaracionMercancia: item.deva_DeclaracionMercancia,
                deva_Finalizacion: item.deva_Finalizacion,
                deva_PagoEfectuado:item.deva_PagoEfectuado,
                deva_FechaAceptacion: item.deva_FechaAceptacion,
                deva_LugarEntrega: item.deva_LugarEntrega,
                deva_NumeroContrato: item.deva_NumeroContrato,
                deva_FechaContrato: item.deva_FechaContrato,

                regi_Id: item.regi_Id,
                regi_Codigo:item.regi_Codigo,
                regi_Descripcion:item.regi_Descripcion ,

                //Campos de monedas o dinero
                mone_Id: item.mone_Id,
                mone_Otra: item.mone_Otra,
                monedaNombre: item.monedaNombre,
                deva_ConversionDolares: item.deva_ConversionDolares,

                //Campos de embarque
                emba_Id: item.emba_Id,
                lugarEmbarque: item.lugarEmbarque,

                 //campos de nivel comercial
                 nico_Id: item.nico_Id,
                 nico_Descripcion: item.nico_Descripcion,
                 impo_NivelComercial_Otro: item.impo_NivelComercial_Otro,
                 
                 //Campos del importador
                 impo_Id: item.impo_Id,
                 impo_NumRegistro: item.impo_NumRegistro,
                 impo_RTN: item.impo_RTN,
                 impo_Nombre_Raso: item.impo_Nombre_Raso,
                 impo_Direccion_Exacta: item.impo_Direccion_Exacta,
                 impo_Correo_Electronico: item.impo_Correo_Electronico,
                 impo_Telefono: item.impo_Telefono,
                 impo_Fax: item.impo_Fax,
                 impo_ciudId: item.impo_ciudId,
                 impo_CiudadNombre:item.impo_CiudadNombre,
                 impo_PaisNombre:item.impo_PaisNombre,

                

                 //Campos del condición comercial
                 coco_Id: item.coco_Id,
                 coco_Descripcion: item.coco_Descripcion,
                 pvde_Condicion_Otra:item.pvde_Condicion_Otra,
                
                //campos de proveedores
                pvde_Id: item.pvde_Id,
                prov_NumeroIdentificacion:item.prov_NumeroIdentificacion,
                prov_Nombre_Raso: item.prov_Nombre_Raso,
                prov_Direccion_Exacta: item.prov_Direccion_Exacta,
                prov_Correo_Electronico: item.prov_Correo_Electronico,
                prov_Telefono: item.prov_Telefono,
                prov_Fax: item.prov_Fax,
                prov_ciudId: item.prov_ciudId,
                prov_paisId: item.prov_paisId,
                prov_CiudadNombre:item.prov_CiudadNombre,
                prov_PaisNombre:item.prov_PaisNombre,

              //campos Tipo intermediario
                tite_Id: item.tite_Id,
                tipoIntermediario: item.tipoIntermediario,
                inte_Tipo_Otro: item.inte_Tipo_Otro,

                //campos intermediario
                inte_Id: item.inte_Id,
                inte_Nombre_Raso:item.inte_Nombre_Raso,
                inte_Direccion_Exacta: item.inte_Direccion_Exacta,
                inte_Correo_Electronico: item.inte_Correo_Electronico,
                inte_NumeroIdentificacion:item.inte_NumeroIdentificacion,
                inte_Telefono: item.inte_Telefono,
                inte_Fax:item.inte_Fax,
                inte_ciudId:item.inte_ciudId,
                inte_paisId: item.inte_paisId,
                inte_CiudadNombre:item.inte_CiudadNombre,
                inte_PaisNombre:item.inte_PaisNombre,

                //Campos de país
                pais_EntregaId: item.pais_EntregaId,
                pais_EntregaNombre: item.pais_EntregaNombre,
                

                //Campos de incoterms
                inco_Id: item.inco_Id,
                inco_Descripcion: item.inco_Descripcion,
                inco_Version: item.inco_Version,
                
                //Campos de formas de pago
                fopa_Id: item.fopa_Id,
                fopa_Descripcion: item.fopa_Descripcion,
                deva_FormaPagoOtra: item.deva_FormaPagoOtra,
                
                //Campos de formas de envío
                foen_Id: item.foen_Id,
                foen_Descripcion: item.foen_Descripcion,
                deva_FormaEnvioOtra: item.deva_FormaEnvioOtra,

                

                //Campos de país de exportación
                pais_ExportacionId: item.pais_ExportacionId,
                pais_ExportacionNombre: item.pais_ExportacionNombre,
                deva_FechaExportacion: item.deva_FechaExportacion,

                //Campos de condiciones 
                codi_Id : item.codi_Id,               
                codi_Restricciones_Utilizacion  : item.codi_Restricciones_Utilizacion, 
                codi_Indicar_Restricciones_Utilizacion : item.codi_Indicar_Restricciones_Utilizacion,
                codi_Depende_Precio_Condicion : item.codi_Depende_Precio_Condicion, 
                codi_Indicar_Existe_Condicion  : item.codi_Indicar_Existe_Condicion, 
                codi_Condicionada_Revertir  : item.codi_Condicionada_Revertir, 
                codi_Vinculacion_Comprador_Vendedor  : item.codi_Vinculacion_Comprador_Vendedor, 
                codi_Tipo_Vinculacion : item.codi_Tipo_Vinculacion, 
                codi_Vinculacion_Influye_Precio  : item.codi_Vinculacion_Influye_Precio, 
                codi_Pagos_Descuentos_Indirectos  : item.codi_Pagos_Descuentos_Indirectos, 
                codi_Concepto_Monto_Declarado : item.codi_Concepto_Monto_Declarado, 
                codi_Existen_Canones  : item.codi_Existen_Canones, 
                codi_Indicar_Canones  : item.codi_Indicar_Canones, 

                //Campos de Base de calculo
                base_Id   : item.base_Id,  
                base_PrecioFactura  : item.base_PrecioFactura, 
                base_PagosIndirectos  : item.base_PagosIndirectos, 
                base_PrecioReal  : item.base_PrecioReal, 
                base_MontCondicion  : item.base_MontCondicion, 
                base_MontoReversion  : item.base_MontoReversion, 
                base_ComisionCorrelaje  : item.base_ComisionCorrelaje, 
                base_Gasto_Envase_Embalaje  : item.base_Gasto_Envase_Embalaje, 
                base_ValoresMateriales_Incorporado : item.base_ValoresMateriales_Incorporado,
                base_Valor_Materiales_Utilizados  : item.base_Valor_Materiales_Utilizados, 
                base_Valor_Materiales_Consumidos  : item.base_Valor_Materiales_Consumidos, 
                base_Valor_Ingenieria_Importado  : item.base_Valor_Ingenieria_Importado, 
                base_Valor_Canones  : item.base_Valor_Canones, 
                base_Gasto_TransporteM_Importada  : item.base_Gasto_TransporteM_Importada, 
                base_Gastos_Carga_Importada  : item.base_Gastos_Carga_Importada, 
                base_Costos_Seguro  : item.base_Costos_Seguro, 
                base_Total_Ajustes_Precio_Pagado  : item.base_Total_Ajustes_Precio_Pagado, 
                base_Gastos_Asistencia_Tecnica  : item.base_Gastos_Asistencia_Tecnica, 
                base_Gastos_Transporte_Posterior  : item.base_Gastos_Transporte_Posterior, 
                base_Derechos_Impuestos  : item.base_Derechos_Impuestos, 
                base_Monto_Intereses  : item.base_Monto_Intereses, 
                base_Deducciones_Legales  : item.base_Deducciones_Legales, 
                base_Total_Deducciones_Precio  : item.base_Total_Deducciones_Precio, 
                base_Valor_Aduana : item.base_Valor_Aduana,
                
                
                //Campos de auditorio
                usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                usua_CreacionNombre: item.usua_CreacionNombre,
                deva_FechaCreacion: item.deva_FechaCreacion,
                usua_ModificacionNombre: item.usua_ModificacionNombre,
                deva_FechaModificacion: item.deva_FechaModificacion,
                deva_Estado: item.deva_Estado,


            };
        });
          return data;
    } catch (error) {
        throw error;
    }
  }

      async function ExportData(){
        try{
          const response = await axiosInstanceOrigin.get('Declaracion_Valor/Listar');
          const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    deva_Id: item.deva_Id,
                    adua_IngresoNombre: item.adua_IngresoNombre,
                    adua_DespachoNombre: item.adua_DespachoNombre,
                    impo_Nombre_Raso: item.impo_Nombre_Raso || 'No tiene importador',
                    prov_Nombre_Raso: item.prov_Nombre_Raso || 'No tiene proveedor',
                    inte_Nombre_Raso: item.inte_Nombre_Raso || 'No tiene intermediario',
                };
            }); 
            return data;
        }
        catch (error)
        {
        throw error;
      }
    };

    async function ListarLugarEmbarque (code) {
        try {
          let codigo = code.trim().toUpperCase()
          const response = await axiosInstanceOrigin.get('LugaresEmbarque/Listar?codigo='+codigo);
          const data = response.data.data.map((item, index) => {
              return {
                  key: index + 1,
                  emba_Id: item.emba_Id,
                  emba_Codigo: item.emba_Codigo,
                  emba_Descripcion: item.emba_Descripcion,                
              };
          });
          return data;
      } catch (error) {
          throw error;
      }
    }

    async function InsertarTab1DEVA (data) {
        try{
            let datos = 
                {
                    "declaraciones_ValorViewModel": {
                      "deva_Id": 0,
                      "deva_AduanaIngresoId": data.AduanaIngreso['value'],
                      "adua_IngresoNombre": "string",
                      "deva_AduanaDespachoId": data.AduanaSalida['value'],
                      "adua_DespachoNombre": "string",
                      "deva_DeclaracionMercancia": data.DeclaracionMercancia['label'],
                      "deva_FechaAceptacion": data.FechaAceptacion,
                      "regi_Id":  data.RegimenAduanero['value'],
                      "regi_Codigo":"string",
                      "regi_Descripcion": "string",
                      "impo_Id": 0,
                      "impo_NumRegistro": "string",
                      "nico_Id": 0,
                      "nico_Descripcion": "string",
                      "impo_NivelComercial_Otro": "string",
                      "impo_Nombre_Raso": "string",
                      "impo_Direccion_Exacta": "string",
                      "impo_Correo_Electronico": "string",
                      "impo_Telefono": "string",
                      "impo_Fax": "string",
                      "impo_ciudId": 0,
                      "pvde_Id": 0,
                      "prov_Nombre_Raso": "string",
                      "prov_Direccion_Exacta": "string",
                      "prov_Correo_Electronico": "string",
                      "prov_Telefono": "string",
                      "prov_Fax": "string",
                      "prov_ciudId": 0,
                      "coco_Id": 0,
                      "coco_Descripcion": "string",
                      "pvde_Condicion_Otra": "string",
                      "inte_Id": 0,
                      "tite_Id": 0,
                      "inte_Nombre_Raso": "string",
                      "inte_Direccion_Exacta": "string",
                      "inte_Correo_Electronico": "string",
                      "inte_Telefono": "string",
                      "inte_Fax": "string",
                      "inte_ciudId": 0,
                      "deva_LugarEntrega": "string",
                      "pais_EntregaId": 0,
                      "inco_Id": 0,
                      "inco_Descripcion": "string",
                      "inco_Version": "string",
                      "deva_NumeroContrato": "string",
                      "deva_FechaContrato": "2023-08-29T17:10:45.112Z",
                      "foen_Id": 0,
                      "foen_Descripcion": "string",
                      "deva_FormaEnvioOtra": "string",
                      "deva_PagoEfectuado": true,
                      "fopa_Id": 0,
                      "deva_FormaPagoOtra": "string",
                      "emba_Id": 0,
                      "pais_ExportacionId": 0,
                      "deva_FechaExportacion": "2023-08-29T17:10:45.112Z",
                      "mone_Id": 0,
                      "mone_Otra": "string",
                      "deva_ConversionDolares": 0,
                      "deva_Condiciones": "string",
                      "usua_UsuarioCreacion": user['uuid'],
                      "usua_CreacionNombre": "string",
                      "deva_FechaCreacion":instance.formatFechaHora(new Date()),
                      "usua_UsuarioModificacion": 0,
                      "usua_ModificacionNombre": "string",
                      "deva_FechaModificacion": "2023-08-29T17:10:45.112Z",
                      "deva_Estado": true,
                      "usua_UsuarioEliminacion": 0,
                      "deva_FechaEliminacion": "2023-08-29T17:10:45.112Z"
                    },
                    "declarantesImpo_ViewModel": {
                      "decl_Id": 0,
                      "decl_NumeroIdentificacion": "string",
                      "decl_Nombre_Raso": data.NombreImportador,
                      "decl_Direccion_Exacta": data.DireccionImportador,
                      "ciud_Id": data.EstadoImportador['value'],
                      "decl_Correo_Electronico":  data.CorreoElectronicoImportador,
                      "decl_Telefono": data.TelefonoImportador,
                      "decl_Fax":data.FaxImportador,
                      "usua_UsuarioCreacion": 0,
                      "decl_FechaCreacion": "2023-08-29T17:10:45.112Z",
                      "usua_UsuarioModificacion": 0,
                      "decl_FechaModificacion": "2023-08-29T17:10:45.112Z",
                      "usua_UsuarioEliminacion": 0,
                      "decl_FechaEliminacion": "2023-08-29T17:10:45.112Z",
                      "decl_Estado": true,
                      "nico_Id": 0,
                      "impo_NivelComercial_Otro": "string",
                      "impo_RTN": "string",
                      "impo_NumRegistro": "string",
                      "tite_Id": 0,
                      "inte_Tipo_Otro": "string",
                      "coco_Id": 0,
                      "pvde_Condicion_Otra": "string"
                    },
                    "declarantesProv_ViewModel": {
                      "decl_Id": 0,
                      "decl_NumeroIdentificacion": "string",
                      "decl_Nombre_Raso": "string",
                      "decl_Direccion_Exacta": "string",
                      "ciud_Id": 0,
                      "decl_Correo_Electronico": "string",
                      "decl_Telefono": "string",
                      "decl_Fax": "string",
                      "usua_UsuarioCreacion": 0,
                      "decl_FechaCreacion": "2023-08-29T17:10:45.112Z",
                      "usua_UsuarioModificacion": 0,
                      "decl_FechaModificacion": "2023-08-29T17:10:45.112Z",
                      "usua_UsuarioEliminacion": 0,
                      "decl_FechaEliminacion": "2023-08-29T17:10:45.112Z",
                      "decl_Estado": true,
                      "nico_Id": 0,
                      "impo_NivelComercial_Otro": "string",
                      "impo_RTN": "string",
                      "impo_NumRegistro": "string",
                      "tite_Id": 0,
                      "inte_Tipo_Otro": "string",
                      "coco_Id": 0,
                      "pvde_Condicion_Otra": "string"
                    },
                    "declarantesInte_ViewModel": {
                      "decl_Id": 0,
                      "decl_NumeroIdentificacion": "string",
                      "decl_Nombre_Raso": "string",
                      "decl_Direccion_Exacta": "string",
                      "ciud_Id": 0,
                      "decl_Correo_Electronico": "string",
                      "decl_Telefono": "string",
                      "decl_Fax": "string",
                      "usua_UsuarioCreacion": 0,
                      "decl_FechaCreacion": "2023-08-29T17:10:45.112Z",
                      "usua_UsuarioModificacion": 0,
                      "decl_FechaModificacion": "2023-08-29T17:10:45.112Z",
                      "usua_UsuarioEliminacion": 0,
                      "decl_FechaEliminacion": "2023-08-29T17:10:45.112Z",
                      "decl_Estado": true,
                      "nico_Id": 0,
                      "impo_NivelComercial_Otro": "string",
                      "impo_RTN": "string",
                      "impo_NumRegistro": "string",
                      "tite_Id": 0,
                      "inte_Tipo_Otro": "string",
                      "coco_Id": 0,
                      "pvde_Condicion_Otra": "string"
                    },
                    "importadoresViewModel": {
                      "impo_Id": 0,
                      "nico_Id": data.NivelComercialImportador['value'],
                      "decl_Id": 0,
                      "impo_NivelComercial_Otro": data.OtroNivelComercialImportador,
                      "impo_RTN":  data.RTNImportador,
                      "impo_NumRegistro": data.NumeroRegistroImportador,
                      "usua_UsuarioCreacion": 0,
                      "impo_FechaCreacion": "2023-08-29T17:10:45.113Z",
                      "usua_UsuarioModificacion": 0,
                      "impo_FechaModificacion": "2023-08-29T17:10:45.113Z",
                      "usua_UsuarioEliminacion": 0,
                      "impo_FechaEliminacion": "2023-08-29T17:10:45.113Z",
                      "impo_Estado": true
                    },
                    "proveedoresDeclaracionViewModel": {
                      "pvde_Id": 0,
                      "coco_Id": 0,
                      "pvde_Condicion_Otra": "string",
                      "decl_Id": 0,
                      "usua_UsuarioCreacion": 0,
                      "pvde_FechaCreacion": "2023-08-29T17:10:45.113Z",
                      "usua_UsuarioModificacion": 0,
                      "pvde_FechaModificacion": "2023-08-29T17:10:45.113Z",
                      "usua_UsuarioEliminacion": 0,
                      "pvde_FechaEliminacion": "2023-08-29T17:10:45.113Z",
                      "pvde_Estado": true
                    },
                    "intermediarioViewModel": {
                      "inte_Id": 0,
                      "tite_Id": 0,
                      "inte_Tipo_Otro": "string",
                      "decl_Id": 0,
                      "usua_UsuarioCreacion": 0,
                      "inte_FechaCreacion": "2023-08-29T17:10:45.113Z",
                      "usua_UsuarioModificacion": 0,
                      "inte_FechaModificacion": "2023-08-29T17:10:45.113Z",
                      "usua_UsuarioEliminacion": 0,
                      "inte_FechaEliminacion": "2023-08-29T17:10:45.113Z",
                      "inte_Estado": true
                    }
                  }
            const response = await axiosInstanceOrigin.post('Declaracion_Valor/InsertarTab1',datos);
            return response;
        }catch{
            throw error;
        }
    }

    async function EditarTab1DEVA (deva_Id,data) {
      try{ 
          let datos = 
              {
                  "declaraciones_ValorViewModel": {
                    "deva_Id": deva_Id,
                    "deva_AduanaIngresoId": data.AduanaIngreso['value'],
                    "adua_IngresoNombre": "string",
                    "deva_AduanaDespachoId": data.AduanaSalida['value'],
                    "adua_DespachoNombre": "string",
                    "deva_DeclaracionMercancia": data.DeclaracionMercancia,
                    "deva_FechaAceptacion": data.FechaAceptacion,
                    "regi_Id":  data.RegimenAduanero['value'],
                    "regi_Codigo":"string",
                    "regi_Descripcion": "string",
                    "impo_Id": 0,
                    "impo_NumRegistro": "string",
                    "nico_Id": 0,
                    "nico_Descripcion": "string",
                    "impo_NivelComercial_Otro": "string",
                    "impo_Nombre_Raso": "string",
                    "impo_Direccion_Exacta": "string",
                    "impo_Correo_Electronico": "string",
                    "impo_Telefono": "string",
                    "impo_Fax": "string",
                    "impo_ciudId": 0,
                    "pvde_Id": 0,
                    "prov_Nombre_Raso": "string",
                    "prov_Direccion_Exacta": "string",
                    "prov_Correo_Electronico": "string",
                    "prov_Telefono": "string",
                    "prov_Fax": "string",
                    "prov_ciudId": 0,
                    "coco_Id": 0,
                    "coco_Descripcion": "string",
                    "pvde_Condicion_Otra": "string",
                    "inte_Id": 0,
                    "tite_Id": 0,
                    "inte_Nombre_Raso": "string",
                    "inte_Direccion_Exacta": "string",
                    "inte_Correo_Electronico": "string",
                    "inte_Telefono": "string",
                    "inte_Fax": "string",
                    "inte_ciudId": 0,
                    "deva_LugarEntrega": "string",
                    "pais_EntregaId": 0,
                    "inco_Id": 0,
                    "inco_Descripcion": "string",
                    "inco_Version": "string",
                    "deva_NumeroContrato": "string",
                    "deva_FechaContrato": "2023-08-29T17:10:45.112Z",
                    "foen_Id": 0,
                    "foen_Descripcion": "string",
                    "deva_FormaEnvioOtra": "string",
                    "deva_PagoEfectuado": true,
                    "fopa_Id": 0,
                    "deva_FormaPagoOtra": "string",
                    "emba_Id": 0,
                    "pais_ExportacionId": 0,
                    "deva_FechaExportacion": "2023-08-29T17:10:45.112Z",
                    "mone_Id": 0,
                    "mone_Otra": "string",
                    "deva_ConversionDolares": 0,
                    "deva_Condiciones": "string",
                    "usua_UsuarioCreacion": 0,
                    "usua_CreacionNombre": "string",
                    "deva_FechaCreacion": "2023-08-29T17:10:45.112Z",
                    "usua_UsuarioModificacion": user['uuid'],
                    "usua_ModificacionNombre": "string",
                    "deva_FechaModificacion": instance.formatFechaHora(new Date()),
                    "deva_Estado": true,
                    "usua_UsuarioEliminacion": 0,
                    "deva_FechaEliminacion": "2023-08-29T17:10:45.112Z"
                  },
                  "declarantesImpo_ViewModel": {
                    "decl_Id": 0,
                    "decl_NumeroIdentificacion": "string",
                    "decl_Nombre_Raso": data.NombreImportador,
                    "decl_Direccion_Exacta": data.DireccionImportador,
                    "ciud_Id": data.EstadoImportador['value'],
                    "decl_Correo_Electronico":  data.CorreoElectronicoImportador,
                    "decl_Telefono": data.TelefonoImportador,
                    "decl_Fax":data.FaxImportador,
                    "usua_UsuarioCreacion": 0,
                    "decl_FechaCreacion": "2023-08-29T17:10:45.112Z",
                    "usua_UsuarioModificacion": 0,
                    "decl_FechaModificacion": "2023-08-29T17:10:45.112Z",
                    "usua_UsuarioEliminacion": 0,
                    "decl_FechaEliminacion": "2023-08-29T17:10:45.112Z",
                    "decl_Estado": true,
                    "nico_Id": 0,
                    "impo_NivelComercial_Otro": "string",
                    "impo_RTN": "string",
                    "impo_NumRegistro": "string",
                    "tite_Id": 0,
                    "inte_Tipo_Otro": "string",
                    "coco_Id": 0,
                    "pvde_Condicion_Otra": "string"
                  },
                  "declarantesProv_ViewModel": {
                    "decl_Id": 0,
                    "decl_NumeroIdentificacion": "string",
                    "decl_Nombre_Raso": "string",
                    "decl_Direccion_Exacta": "string",
                    "ciud_Id": 0,
                    "decl_Correo_Electronico": "string",
                    "decl_Telefono": "string",
                    "decl_Fax": "string",
                    "usua_UsuarioCreacion": 0,
                    "decl_FechaCreacion": "2023-08-29T17:10:45.112Z",
                    "usua_UsuarioModificacion": 0,
                    "decl_FechaModificacion": "2023-08-29T17:10:45.112Z",
                    "usua_UsuarioEliminacion": 0,
                    "decl_FechaEliminacion": "2023-08-29T17:10:45.112Z",
                    "decl_Estado": true,
                    "nico_Id": 0,
                    "impo_NivelComercial_Otro": "string",
                    "impo_RTN": "string",
                    "impo_NumRegistro": "string",
                    "tite_Id": 0,
                    "inte_Tipo_Otro": "string",
                    "coco_Id": 0,
                    "pvde_Condicion_Otra": "string"
                  },
                  "declarantesInte_ViewModel": {
                    "decl_Id": 0,
                    "decl_NumeroIdentificacion": "string",
                    "decl_Nombre_Raso": "string",
                    "decl_Direccion_Exacta": "string",
                    "ciud_Id": 0,
                    "decl_Correo_Electronico": "string",
                    "decl_Telefono": "string",
                    "decl_Fax": "string",
                    "usua_UsuarioCreacion": 0,
                    "decl_FechaCreacion": "2023-08-29T17:10:45.112Z",
                    "usua_UsuarioModificacion": 0,
                    "decl_FechaModificacion": "2023-08-29T17:10:45.112Z",
                    "usua_UsuarioEliminacion": 0,
                    "decl_FechaEliminacion": "2023-08-29T17:10:45.112Z",
                    "decl_Estado": true,
                    "nico_Id": 0,
                    "impo_NivelComercial_Otro": "string",
                    "impo_RTN": "string",
                    "impo_NumRegistro": "string",
                    "tite_Id": 0,
                    "inte_Tipo_Otro": "string",
                    "coco_Id": 0,
                    "pvde_Condicion_Otra": "string"
                  },
                  "importadoresViewModel": {
                    "impo_Id": 0,
                    "nico_Id": data.NivelComercialImportador['value'],
                    "decl_Id": 0,
                    "impo_NivelComercial_Otro": data.OtroNivelComercialImportador,
                    "impo_RTN":  data.RTNImportador,
                    "impo_NumRegistro": data.NumeroRegistroImportador,
                    "usua_UsuarioCreacion": 0,
                    "impo_FechaCreacion": "2023-08-29T17:10:45.113Z",
                    "usua_UsuarioModificacion": 0,
                    "impo_FechaModificacion": "2023-08-29T17:10:45.113Z",
                    "usua_UsuarioEliminacion": 0,
                    "impo_FechaEliminacion": "2023-08-29T17:10:45.113Z",
                    "impo_Estado": true
                  },
                  "proveedoresDeclaracionViewModel": {
                    "pvde_Id": 0,
                    "coco_Id": 0,
                    "pvde_Condicion_Otra": "string",
                    "decl_Id": 0,
                    "usua_UsuarioCreacion": 0,
                    "pvde_FechaCreacion": "2023-08-29T17:10:45.113Z",
                    "usua_UsuarioModificacion": 0,
                    "pvde_FechaModificacion": "2023-08-29T17:10:45.113Z",
                    "usua_UsuarioEliminacion": 0,
                    "pvde_FechaEliminacion": "2023-08-29T17:10:45.113Z",
                    "pvde_Estado": true
                  },
                  "intermediarioViewModel": {
                    "inte_Id": 0,
                    "tite_Id": 0,
                    "inte_Tipo_Otro": "string",
                    "decl_Id": 0,
                    "usua_UsuarioCreacion": 0,
                    "inte_FechaCreacion": "2023-08-29T17:10:45.113Z",
                    "usua_UsuarioModificacion": 0,
                    "inte_FechaModificacion": "2023-08-29T17:10:45.113Z",
                    "usua_UsuarioEliminacion": 0,
                    "inte_FechaEliminacion": "2023-08-29T17:10:45.113Z",
                    "inte_Estado": true
                  }
                }
          const response = await axiosInstanceOrigin.post('Declaracion_Valor/EditarTab1',datos);
          return response;
      }catch{
          throw error;
      }
  }




    async function InsertarTab2DEVA (data, devaId, checkedIntermediario) {
        try{
            let datos = {
                "declaraciones_ValorViewModel": {
                  "deva_Id": devaId,
                  "deva_AduanaIngresoId": 0,
                  "adua_IngresoNombre": "string",
                  "deva_AduanaDespachoId": 0,
                  "adua_DespachoNombre": "string",
                  "deva_DeclaracionMercancia": "string",
                  "deva_FechaAceptacion": "2023-08-29T19:25:55.425Z",
                  "impo_Id": 0,
                  "impo_NumRegistro": "string",
                  "nico_Id": 0,
                  "nico_Descripcion": "string",
                  "impo_NivelComercial_Otro": "string",
                  "impo_Nombre_Raso": "string",
                  "impo_Direccion_Exacta": "string",
                  "impo_Correo_Electronico": "string",
                  "impo_Telefono": "string",
                  "impo_Fax": "string",
                  "impo_ciudId": 0,
                  "pvde_Id": 0,
                  "prov_Nombre_Raso": "string",
                  "prov_Direccion_Exacta": "string",
                  "prov_Correo_Electronico": "string",
                  "prov_Telefono": "string",
                  "prov_Fax": "string",
                  "prov_ciudId": 0,
                  "coco_Id": 0,
                  "coco_Descripcion": "string",
                  "pvde_Condicion_Otra": "string",
                  "inte_Id": 0,
                  "tite_Id": 0,
                  "inte_Nombre_Raso": "string",
                  "inte_Direccion_Exacta": "string",
                  "inte_Correo_Electronico": "string",
                  "inte_Telefono": "string",
                  "inte_Fax": "string",
                  "inte_ciudId": 0,
                  "deva_LugarEntrega": "string",
                  "pais_EntregaId": 0,
                  "inco_Id": 0,
                  "inco_Descripcion": "string",
                  "inco_Version": "string",
                  "deva_NumeroContrato": "string",
                  "deva_FechaContrato": "2023-08-29T19:25:55.425Z",
                  "foen_Id": 0,
                  "foen_Descripcion": "string",
                  "deva_FormaEnvioOtra": "string",
                  "deva_PagoEfectuado": true,
                  "fopa_Id": 0,
                  "deva_FormaPagoOtra": "string",
                  "emba_Id": 0,
                  "pais_ExportacionId": 0,
                  "deva_FechaExportacion": "2023-08-29T19:25:55.425Z",
                  "mone_Id": 0,
                  "mone_Otra": "string",
                  "deva_ConversionDolares": 0,
                  "deva_Condiciones": "string",
                  "usua_UsuarioCreacion": user['uuid'],
                  "usua_CreacionNombre": "string",
                  "deva_FechaCreacion": instance.formatFechaHora(new Date()),
                  "usua_UsuarioModificacion": null,
                  "usua_ModificacionNombre": "string",
                  "deva_FechaModificacion": "2023-08-29T19:25:55.425Z",
                  "deva_Estado": true,
                  "usua_UsuarioEliminacion": 0,
                  "deva_FechaEliminacion": "2023-08-29T19:25:55.425Z"
                },
                "declarantesImpo_ViewModel": {
                  "decl_Id": 0,
                  "decl_NumeroIdentificacion": "string",
                  "decl_Nombre_Raso": "string",
                  "decl_Direccion_Exacta": "string",
                  "ciud_Id": 0,
                  "decl_Correo_Electronico": "string",
                  "decl_Telefono": "string",
                  "decl_Fax": "string",
                  "usua_UsuarioCreacion": 0,
                  "decl_FechaCreacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioModificacion": 0,
                  "decl_FechaModificacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioEliminacion": 0,
                  "decl_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                  "decl_Estado": true,
                  "nico_Id": 0,
                  "impo_NivelComercial_Otro": "string",
                  "impo_RTN": "string",
                  "impo_NumRegistro": "string",
                  "tite_Id": 0,
                  "inte_Tipo_Otro": "string",
                  "coco_Id": 0,
                  "pvde_Condicion_Otra": "string"
                },
                "declarantesProv_ViewModel": {
                  "decl_Id": 0,
                  "decl_NumeroIdentificacion":data.IdentificacionProveedor,
                  "decl_Nombre_Raso":data.NombreProveedor,
                  "decl_Direccion_Exacta":data.DireccionProveedor,
                  "ciud_Id": data.EstadoProveedor['value'],
                  "decl_Correo_Electronico":data.CorreoProveedor,
                  "decl_Telefono": data.TelefonoProveedor,
                  "decl_Fax": data.FaxProveedor,
                  "usua_UsuarioCreacion": 0,
                  "decl_FechaCreacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioModificacion": 0,
                  "decl_FechaModificacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioEliminacion": 0,
                  "decl_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                  "decl_Estado": true,
                  "nico_Id": 0,
                  "impo_NivelComercial_Otro": "string",
                  "impo_RTN": "string",
                  "impo_NumRegistro": "string",
                  "tite_Id": 0,
                  "inte_Tipo_Otro": "string",
                  "coco_Id": 0,
                  "pvde_Condicion_Otra": "string"
                },
                "declarantesInte_ViewModel": {
                  "decl_Id": 0,
                  "decl_NumeroIdentificacion":checkedIntermediario ? data.IdentificacionIntermedario : "",
                  "decl_Nombre_Raso":checkedIntermediario ? data.NombreIntermediario : null,
                  "decl_Direccion_Exacta": checkedIntermediario ? data.DireccionIntermediario : "",
                  "ciud_Id":checkedIntermediario ? data.EstadoIntermediario['value'] : 0,
                  "decl_Correo_Electronico": checkedIntermediario ? data.CorreoIntermediario : "",
                  "decl_Telefono": checkedIntermediario ? data.TelefonoIntermediario : "",
                  "decl_Fax": checkedIntermediario ? data.FaxIntermediario : "",
                  "usua_UsuarioCreacion": 0,
                  "decl_FechaCreacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioModificacion": 0,
                  "decl_FechaModificacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioEliminacion": 0,
                  "decl_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                  "decl_Estado": true,
                  "nico_Id": 0,
                  "impo_NivelComercial_Otro": "string",
                  "impo_RTN": "string",
                  "impo_NumRegistro": "string",
                  "tite_Id": 0,
                  "inte_Tipo_Otro": "string",
                  "coco_Id": 0,
                  "pvde_Condicion_Otra": "string"
                },
                "importadoresViewModel": {
                  "impo_Id": 0,
                  "nico_Id": 0,
                  "decl_Id": 0,
                  "impo_NivelComercial_Otro": "string",
                  "impo_RTN": "string",
                  "impo_NumRegistro": "string",
                  "usua_UsuarioCreacion": 0,
                  "impo_FechaCreacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioModificacion": 0,
                  "impo_FechaModificacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioEliminacion": 0,
                  "impo_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                  "impo_Estado": true
                },
                "proveedoresDeclaracionViewModel": {
                  "pvde_Id": 0,
                  "coco_Id": data.CondicionComercialProveedor['value'],
                  "pvde_Condicion_Otra": data.OtraCondicionComercialProveedor,
                  "decl_Id": 0,
                  "usua_UsuarioCreacion": 0,
                  "pvde_FechaCreacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioModificacion": 0,
                  "pvde_FechaModificacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioEliminacion": 0,
                  "pvde_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                  "pvde_Estado": true
                },
                "intermediarioViewModel": {
                  "inte_Id": 0,
                  "tite_Id": checkedIntermediario ? data.TipoIntermediario['value'] : 0,
                  "inte_Tipo_Otro": checkedIntermediario ? data.OtroTipoIntermediario : "",
                  "decl_Id": 0,
                  "usua_UsuarioCreacion": 0,
                  "inte_FechaCreacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioModificacion": 0,
                  "inte_FechaModificacion": "2023-08-29T19:25:55.425Z",
                  "usua_UsuarioEliminacion": 0,
                  "inte_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                  "inte_Estado": true
                }
              }
            const response = await axiosInstanceOrigin.post('Declaracion_Valor/InsertarTab2',datos);
            return response;
        }catch{
            throw error;
        }
    }

    async function EditarTab2DEVA (data, devaId,checkedIntermediario) {
      try{
          let datos = {
              "declaraciones_ValorViewModel": {
                "deva_Id": devaId,
                "deva_AduanaIngresoId": 0,
                "adua_IngresoNombre": "string",
                "deva_AduanaDespachoId": 0,
                "adua_DespachoNombre": "string",
                "deva_DeclaracionMercancia": "string",
                "deva_FechaAceptacion": "2023-08-29T19:25:55.425Z",
                "impo_Id": 0,
                "impo_NumRegistro": "string",
                "nico_Id": 0,
                "nico_Descripcion": "string",
                "impo_NivelComercial_Otro": "string",
                "impo_Nombre_Raso": "string",
                "impo_Direccion_Exacta": "string",
                "impo_Correo_Electronico": "string",
                "impo_Telefono": "string",
                "impo_Fax": "string",
                "impo_ciudId": 0,
                "pvde_Id": 0,
                "prov_Nombre_Raso": "string",
                "prov_Direccion_Exacta": "string",
                "prov_Correo_Electronico": "string",
                "prov_Telefono": "string",
                "prov_Fax": "string",
                "prov_ciudId": 0,
                "coco_Id": 0,
                "coco_Descripcion": "string",
                "pvde_Condicion_Otra": "string",
                "inte_Id": 0,
                "tite_Id": 0,
                "inte_Nombre_Raso": "string",
                "inte_Direccion_Exacta": "string",
                "inte_Correo_Electronico": "string",
                "inte_Telefono": "string",
                "inte_Fax": "string",
                "inte_ciudId": 0,
                "deva_LugarEntrega": "string",
                "pais_EntregaId": 0,
                "inco_Id": 0,
                "inco_Descripcion": "string",
                "inco_Version": "string",
                "deva_NumeroContrato": "string",
                "deva_FechaContrato": "2023-08-29T19:25:55.425Z",
                "foen_Id": 0,
                "foen_Descripcion": "string",
                "deva_FormaEnvioOtra": "string",
                "deva_PagoEfectuado": true,
                "fopa_Id": 0,
                "deva_FormaPagoOtra": "string",
                "emba_Id": 0,
                "pais_ExportacionId": 0,
                "deva_FechaExportacion": "2023-08-29T19:25:55.425Z",
                "mone_Id": 0,
                "mone_Otra": "string",
                "deva_ConversionDolares": 0,
                "deva_Condiciones": "string",
                "usua_UsuarioCreacion": user['uuid'],
                "usua_CreacionNombre": "string",
                "deva_FechaCreacion": instance.formatFechaHora(new Date()) ,
                "usua_UsuarioModificacion": user['uuid'],
                "usua_ModificacionNombre": "string",
                "deva_FechaModificacion": "2023-08-29T19:25:55.425Z",
                "deva_Estado": true,
                "usua_UsuarioEliminacion": 0,
                "deva_FechaEliminacion": "2023-08-29T19:25:55.425Z"
              },
              "declarantesImpo_ViewModel": {
                "decl_Id": 0,
                "decl_NumeroIdentificacion": "string",
                "decl_Nombre_Raso": "string",
                "decl_Direccion_Exacta": "string",
                "ciud_Id": 0,
                "decl_Correo_Electronico": "string",
                "decl_Telefono": "string",
                "decl_Fax": "string",
                "usua_UsuarioCreacion": 0,
                "decl_FechaCreacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioModificacion": 0,
                "decl_FechaModificacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioEliminacion": 0,
                "decl_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                "decl_Estado": true,
                "nico_Id": 0,
                "impo_NivelComercial_Otro": "string",
                "impo_RTN": "string",
                "impo_NumRegistro": "string",
                "tite_Id": 0,
                "inte_Tipo_Otro": "string",
                "coco_Id": 0,
                "pvde_Condicion_Otra": "string"
              },
              "declarantesProv_ViewModel": {
                "decl_Id": 0,
                "decl_NumeroIdentificacion":data.IdentificacionProveedor,
                "decl_Nombre_Raso":data.NombreProveedor,
                "decl_Direccion_Exacta":data.DireccionProveedor,
                "ciud_Id": data.EstadoProveedor['value'],
                "decl_Correo_Electronico":data.CorreoProveedor,
                "decl_Telefono": data.TelefonoProveedor,
                "decl_Fax": data.FaxProveedor,
                "usua_UsuarioCreacion": 0,
                "decl_FechaCreacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioModificacion": 0,
                "decl_FechaModificacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioEliminacion": 0,
                "decl_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                "decl_Estado": true,
                "nico_Id": 0,
                "impo_NivelComercial_Otro": "string",
                "impo_RTN": "string",
                "impo_NumRegistro": "string",
                "tite_Id": 0,
                "inte_Tipo_Otro": "string",
                "coco_Id": 0,
                "pvde_Condicion_Otra": "string"
              },
              "declarantesInte_ViewModel": {
                "decl_Id": 0,
                "decl_NumeroIdentificacion":checkedIntermediario ? data.IdentificacionIntermedario : "",
                "decl_Nombre_Raso": checkedIntermediario ? data.NombreIntermediario : null,
                "decl_Direccion_Exacta":checkedIntermediario ? data.DireccionIntermediario: "",
                "ciud_Id": checkedIntermediario ? data.EstadoIntermediario['value'] : 0,
                "decl_Correo_Electronico": checkedIntermediario ? data.CorreoIntermediario : "",
                "decl_Telefono": checkedIntermediario ? data.TelefonoIntermediario : "",
                "decl_Fax": checkedIntermediario ? data.FaxIntermediario : "",
                "usua_UsuarioCreacion": 0,
                "decl_FechaCreacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioModificacion": 0,
                "decl_FechaModificacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioEliminacion": 0,
                "decl_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                "decl_Estado": true,
                "nico_Id": 0,
                "impo_NivelComercial_Otro": "string",
                "impo_RTN": "string",
                "impo_NumRegistro": "string",
                "tite_Id": 0,
                "inte_Tipo_Otro": "string",
                "coco_Id": 0,
                "pvde_Condicion_Otra": "string"
              },
              "importadoresViewModel": {
                "impo_Id": 0,
                "nico_Id": 0,
                "decl_Id": 0,
                "impo_NivelComercial_Otro": "string",
                "impo_RTN": "string",
                "impo_NumRegistro": "string",
                "usua_UsuarioCreacion": 0,
                "impo_FechaCreacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioModificacion": 0,
                "impo_FechaModificacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioEliminacion": 0,
                "impo_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                "impo_Estado": true
              },
              "proveedoresDeclaracionViewModel": {
                "pvde_Id": 0,
                "coco_Id": data.CondicionComercialProveedor['value'],
                "pvde_Condicion_Otra": data.OtraCondicionComercialProveedor,
                "decl_Id": 0,
                "usua_UsuarioCreacion": 0,
                "pvde_FechaCreacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioModificacion": 0,
                "pvde_FechaModificacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioEliminacion": 0,
                "pvde_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                "pvde_Estado": true
              },
              "intermediarioViewModel": {
                "inte_Id": 0,
                "tite_Id": checkedIntermediario ? data.TipoIntermediario['value'] : 0,
                "inte_Tipo_Otro": checkedIntermediario ?  data.OtroTipoIntermediario : "",
                "decl_Id": 0,
                "usua_UsuarioCreacion": 0,
                "inte_FechaCreacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioModificacion": 0,
                "inte_FechaModificacion": "2023-08-29T19:25:55.425Z",
                "usua_UsuarioEliminacion": 0,
                "inte_FechaEliminacion": "2023-08-29T19:25:55.425Z",
                "inte_Estado": true
              }
            }
          const response = await axiosInstanceOrigin.post('Declaracion_Valor/InsertarTab2',datos);
          return response;
      }catch{
          throw error;
      }
  }

    async function EditarTab3DEVA (data, devaId, checked) {
        try{
            let datos = {
                "deva_Id": devaId,
                "deva_AduanaIngresoId": 0,
                "adua_IngresoNombre": "string",
                "deva_AduanaDespachoId": 0,
                "adua_DespachoNombre": "string",
                "deva_DeclaracionMercancia": "string",
                "deva_FechaAceptacion": "2023-08-29T20:18:55.553Z",
                "impo_Id": 0,
                "impo_NumRegistro": "string",
                "nico_Id": 0,
                "nico_Descripcion": "string",
                "impo_NivelComercial_Otro": "string",
                "impo_Nombre_Raso": "string",
                "impo_Direccion_Exacta": "string",
                "impo_Correo_Electronico": "string",
                "impo_Telefono": "string",
                "impo_Fax": "string",
                "impo_ciudId": 0,
                "pvde_Id": 0,
                "prov_Nombre_Raso": "string",
                "prov_Direccion_Exacta": "string",
                "prov_Correo_Electronico": "string",
                "prov_Telefono": "string",
                "prov_Fax": "string",
                "prov_ciudId": 0,
                "coco_Id": 0,
                "coco_Descripcion": "string",
                "pvde_Condicion_Otra": "string",
                "inte_Id": 0,
                "tite_Id": 0,
                "inte_Nombre_Raso": "string",
                "inte_Direccion_Exacta": "string",
                "inte_Correo_Electronico": "string",
                "inte_Telefono": "string",
                "inte_Fax": "string",
                "inte_ciudId": 0,
                "deva_LugarEntrega": data.LugarEntrega,
                "pais_EntregaId": data.PaisEntrega['value'],
                "inco_Id": data.Incoterm['value'],
                "inco_Descripcion": "string",
                "inco_Version": data.Version,
                "deva_NumeroContrato": data.NumeroContrato,
                "deva_FechaContrato": data.FechaContrato,
                "foen_Id": data.FormaEnvio['value'],
                "foen_Descripcion": "string",
                "deva_FormaEnvioOtra": data.OtraFormaEnvio,
                "deva_PagoEfectuado": checked,
                "fopa_Id": data.FormaPago['value'],
                "deva_FormaPagoOtra": data.OtraFormaPago,
                "emba_Id": data.LugarEmbarque['value'],
                "pais_ExportacionId": data.PaisExportacion['value'],
                "deva_FechaExportacion":data.FechaExportacion,
                "mone_Id": data.MonedaTransaccion['value'],
                "mone_Otra": data.OtraMoneda,
                "deva_ConversionDolares": data.CambioMoneda,
                "deva_Condiciones": "string",
                "usua_UsuarioCreacion": user['uuid'],
                "usua_CreacionNombre": instance.formatFechaHora(new Date()),
                "deva_FechaCreacion": "2023-08-29T20:18:55.553Z",
                "usua_UsuarioModificacion": user['uuid'],
                "usua_ModificacionNombre": "string",
                "deva_FechaModificacion": "2023-08-29T20:18:55.553Z",
                "deva_Estado": true,
                "usua_UsuarioEliminacion": 0,
                "deva_FechaEliminacion": "2023-08-29T20:18:55.553Z"
              }   
            const response = await axiosInstanceOrigin.post('Declaracion_Valor/InsertarTab3',datos);
            return response;
        }catch{
            throw error;
        }
    }


    async function InsertarTab3DEVA (data, devaId, checked) {
      try{
          let datos = {
              "deva_Id": devaId,
              "deva_AduanaIngresoId": 0,
              "adua_IngresoNombre": "string",
              "deva_AduanaDespachoId": 0,
              "adua_DespachoNombre": "string",
              "deva_DeclaracionMercancia": "string",
              "deva_FechaAceptacion": "2023-08-29T20:18:55.553Z",
              "impo_Id": 0,
              "impo_NumRegistro": "string",
              "nico_Id": 0,
              "nico_Descripcion": "string",
              "impo_NivelComercial_Otro": "string",
              "impo_Nombre_Raso": "string",
              "impo_Direccion_Exacta": "string",
              "impo_Correo_Electronico": "string",
              "impo_Telefono": "string",
              "impo_Fax": "string",
              "impo_ciudId": 0,
              "pvde_Id": 0,
              "prov_Nombre_Raso": "string",
              "prov_Direccion_Exacta": "string",
              "prov_Correo_Electronico": "string",
              "prov_Telefono": "string",
              "prov_Fax": "string",
              "prov_ciudId": 0,
              "coco_Id": 0,
              "coco_Descripcion": "string",
              "pvde_Condicion_Otra": "string",
              "inte_Id": 0,
              "tite_Id": 0,
              "inte_Nombre_Raso": "string",
              "inte_Direccion_Exacta": "string",
              "inte_Correo_Electronico": "string",
              "inte_Telefono": "string",
              "inte_Fax": "string",
              "inte_ciudId": 0,
              "deva_LugarEntrega": data.LugarEntrega,
              "pais_EntregaId": data.PaisEntrega['value'],
              "inco_Id": data.Incoterm['value'],
              "inco_Descripcion": "string",
              "inco_Version": data.Version,
              "deva_NumeroContrato": data.NumeroContrato,
              "deva_FechaContrato": data.FechaContrato,
              "foen_Id": data.FormaEnvio['value'],
              "foen_Descripcion": "string",
              "deva_FormaEnvioOtra": data.OtraFormaEnvio,
              "deva_PagoEfectuado": checked,
              "fopa_Id": data.FormaPago['value'],
              "deva_FormaPagoOtra": data.OtraFormaPago,
              "emba_Id": data.LugarEmbarque['value'],
              "pais_ExportacionId": data.PaisExportacion['value'],
              "deva_FechaExportacion":data.FechaExportacion,
              "mone_Id": data.MonedaTransaccion['value'],
              "mone_Otra": data.OtraMoneda,
              "deva_ConversionDolares": data.CambioMoneda,
              "deva_Condiciones": "string",
              "usua_UsuarioCreacion": user['uuid'],
              "usua_CreacionNombre": instance.formatFechaHora(new Date()),
              "deva_FechaCreacion": "2023-08-29T20:18:55.553Z",
              "usua_UsuarioModificacion": null,
              "usua_ModificacionNombre": "string",
              "deva_FechaModificacion": "2023-08-29T20:18:55.553Z",
              "deva_Estado": true,
              "usua_UsuarioEliminacion": 0,
              "deva_FechaEliminacion": "2023-08-29T20:18:55.553Z"
            }   
          const response = await axiosInstanceOrigin.post('Declaracion_Valor/InsertarTab3',datos);
          return response;
      }catch{
          throw error;
      }
  }

  async function CancelarDeva (deva_Id, fact_Id, codi_Id, base_Id) {

      try {
        const response = await axiosInstanceOrigin.post('Declaracion_Valor/CancelarDeclaracionValor?deva_Id='+deva_Id+'&fact_Id='+fact_Id+'&codi_Id='+codi_Id+'&base_Id='+base_Id);
        return response;
    } catch (error) {
        throw error;
    }
  }

    async function ListarFacturasPorDevaId (deva_Id) {
      try {
        const response = await axiosInstanceOrigin.get('Facturas/Listar?deva_Id='+deva_Id);
        const data = response.data.data.map((item, index) => {
            return {
                key: index + 1,
                fact_Id: item.fact_Id,
                fact_Numero: item.fact_Numero,
                fact_Fecha: item.fact_Fecha,                
            };
        });
        
        return data;
    } catch (error) {
        throw error;
    }
  }

    async function CancelarIntermediario (deva_Id) {
      try {
        const response = await axiosInstanceOrigin.get('Declaracion_Valor/CancelarIntermediario?deva_Id='+deva_Id);  
        console.log(response);       
        return response;
    } catch (error) {
        throw error;
    }
  }

  async function ListarFacturasPorDevaIdReporte (deva_Id) {
      try {
        const response = await axiosInstanceOrigin.get('Facturas/Listar?deva_Id='+deva_Id);
        const data = response.data.data.map((item, index) => {
            return {
                key: index + 1,
                fact_Id: item.fact_Id,
                fact_Numero: item.fact_Numero,
                fact_Fecha: item.fact_Fecha,                
            };
        });
        const Items = []
        data.forEach (element => {      
          Items.push(ListarItemsPorFacturaId(element.fact_Id))
        })   
        const ItemsData = await Promise.all(Items);
        return {data,ItemsData};
    } catch (error) {
        throw error;
    }
  }

  async function VerficarFacturaPorFact_Numero (fact_Numero) {
    try {
      const response = await axiosInstanceOrigin.get('Facturas/VerificarFactura?fact_Numero='+fact_Numero);
      return response;
    } catch (error) {
        throw error;
    }
  }

  async function EditarFacturas (fact_Id,deva_Id,data) {
    try {
      let datos= {    
          fact_Id: fact_Id,
          deva_Id: deva_Id,
          fact_Numero: data.NumeroFactura,
          fact_Fecha:data.Fecha,
          usua_UsuarioModificacion: user['uuid'],
          fact_FechaModificacion: instance.formatFechaHora(new Date()),
      }
      const response = await axiosInstanceOrigin.post('Facturas/Editar',datos);
      return response;
    } catch (error) {
        throw error;
    }
  }

  async function EliminarFacturas (fact_ID) {
    try {
      let datos= {
        fact_Id:fact_ID,
      }
      const response = await axiosInstanceOrigin.post('Facturas/Eliminar',datos);
      return response;
    } catch (error) {
        throw error;
    }
  }

  async function InsertarFacturasPorDevaId (deva_Id,data) {
    try {
      let datos = {
        deva_Id:deva_Id,
        fact_Numero:data.NumeroFactura,
        fact_Fecha: instance.formatFechaHora(data.Fecha),
        usua_UsuarioCreacion: user['uuid'],
        fact_FechaCreacion: instance.formatFechaHora(new Date()),
      }
      const response = await axiosInstanceOrigin.post('Facturas/Insertar',datos);
      return response;
    } catch (error) {
        throw error;
    }
  }

    async function ListarItemsPorFacturaId (fact_Id) {
      try {
        const response = await axiosInstanceOrigin.get('Items/Listar?fact_Id='+fact_Id);
        const data = response.data.data.map((item, index) => {
            return {
                key: index + 1,
                item_Id: item.item_Id,
                fact_Id: item.fact_Id,   
                item_Cantidad: item.item_Cantidad,
                unme_Id: item.unme_Id,
                item_IdentificacionComercialMercancias: item.item_IdentificacionComercialMercancias,   
                item_CaracteristicasMercancias: item.item_CaracteristicasMercancias,
                item_Marca: item.item_Marca,
                item_Modelo: item.item_Modelo,   
                merc_Id: item.merc_Id,
                pais_IdOrigenMercancia: item.pais_IdOrigenMercancia,
                item_ClasificacionArancelaria: item.item_ClasificacionArancelaria,
                aran_Id: item.aran_Id,
                aran_Descripcion: item.aran_Descripcion,
                aran_Codigo: item.aran_Codigo,    
                item_ValorUnitario: item.item_ValorUnitario,
                item_TotalFacturaUnitario: parseInt(item.item_ValorUnitario) * parseInt(item.item_Cantidad),
                item_EsNuevo: item.item_EsNuevo,
                item_EsHibrido: item.item_EsHibrido,
                item_LitrosTotales: item.item_LitrosTotales,
                item_CigarrosTotales: item.item_CigarrosTotales
            };
        });
       
        return data;
      } catch (error) {
          throw error;
      }
    }

    async function EliminarItems (item_Id) {
      try {
        let datos= {
          item_Id:item_Id,
          usua_UsuarioEliminacion:user['uuid'],
          item_FechaEliminacion: instance.formatFechaHora(new Date())
        }
        const response = await axiosInstanceOrigin.post('Items/Eliminar',datos);
        console.log(response);
        return response;
      } catch (error) {
          throw error;
      }
    }

    async function ListarItems (fact_Id) {
      try {
        const response = await axiosInstanceOrigin.get('Items/Listar?fact_Id='+fact_Id);
        const data = response.data.data.map((item, index) => {
            return {
                key: index + 1,
                item_Id: item.item_Id,
                fact_Id: item.fact_Id,   
                item_Cantidad: item.item_Cantidad,
                unme_Id: item.unme_Id,
                item_IdentificacionComercialMercancias: item.item_IdentificacionComercialMercancias,   
                item_CaracteristicasMercancias: item.item_CaracteristicasMercancias,
                item_Marca: item.item_Marca,
                item_Modelo: item.item_Modelo,   
                merc_Id: item.merc_Id,
                pais_IdOrigenMercancia: item.pais_IdOrigenMercancia,
                item_ClasificacionArancelaria: item.item_ClasificacionArancelaria,  
                aran_Id: item.aran_Id,
                aran_Descripcion: item.aran_Descripcion,
                aran_Codigo: item.aran_Codigo, 
                item_ValorUnitario: item.item_ValorUnitario,
                item_TotalFacturaUnitario: parseInt(item.item_ValorUnitario) * parseInt(item.item_Cantidad)
            };
        });
        return data;
      } catch (error) {
          throw error;
      }
    }

    async function InsertarItemsPorFactsId (fact_Id, data,checkAutoEsNuevo,checkAutoHibrido,checkedCigarros,checkedAlcohol) {
      try {
        let datos = {
          fact_Id: fact_Id,   
          item_Cantidad: data.Cantidad,
          unme_Id: data.UnidadMedida['value'],
          item_IdentificacionComercialMercancias: data.IdentificacionComercial,   
          item_CaracteristicasMercancias: data.CaracteristicasMercadedira,
          item_Marca: data.Marca,
          item_Modelo: data.ModeloEstilo,   
          merc_Id: data.EstadoMercaderia['value'],
          pais_IdOrigenMercancia: data.OrigenMecaderia['value'],
          aran_Id:data.ClasificacionArancelaria['value'],
          item_ValorUnitario: data.ValorUnitario,
          item_ValorTransaccion: parseFloat(data.Cantidad) * parseFloat(data.ValorUnitario),
          usua_UsuarioCreacion:user['uuid'],
          item_FechaCreacion: new Date(),
          item_EsNuevo: checkAutoEsNuevo ? true: false,
          item_EsHibrido: checkAutoHibrido ? true : false,
          item_LitrosTotales:checkedAlcohol ? parseFloat(data.LitrosTotales) : 0,
          item_CigarrosTotales:checkedCigarros ? parseFloat(data.CigarrosTotales) : 0
        }
        const response = await axiosInstanceOrigin.post('Items/Insertar',datos);
        console.log(response)
        return response;
      } catch (error) {
          throw error;
      }
    }


    async function EditarItems (item_Id,fact_Id, data,checkAutoEsNuevo,checkAutoHibrido,checkedCigarros,checkedAlcohol) {
      console.log("Lllega")
      try {
        let datos = {
          item_Id:item_Id,  
          fact_Id: fact_Id,   
          item_Cantidad: data.Cantidad,
          unme_Id: data.UnidadMedida['value'],
          item_IdentificacionComercialMercancias: data.IdentificacionComercial,   
          item_CaracteristicasMercancias: data.CaracteristicasMercadedira,
          item_Marca: data.Marca,
          item_Modelo: data.ModeloEstilo,   
          merc_Id: data.EstadoMercaderia['value'],
          pais_IdOrigenMercancia: data.OrigenMecaderia['value'],
          item_ClasificacionArancelaria:'-',
          aran_Id:data.ClasificacionArancelaria['value'],
          item_ValorUnitario: data.ValorUnitario,
          item_ValorTransaccion: parseFloat(data.Cantidad) * parseFloat(data.ValorUnitario),
          usua_UsuarioModificacion:user['uuid'],
          item_FechaModificacion: new Date(),
          item_EsNuevo: checkAutoEsNuevo ? true: false,
          item_EsHibrido: checkAutoHibrido ? true : false,
          item_LitrosTotales:checkedAlcohol ? parseFloat(data.LitrosTotales) : 0,
          item_CigarrosTotales:checkedCigarros ? parseFloat(data.CigarrosTotales) : 0
        }
        const response = await axiosInstanceOrigin.post('Items/Editar',datos);
        return response;
      } catch (error) {
      }
    }

    async function InsertarCondicionesPorDevaId (deva_Id, data) {
      try {
        let datos = {
          deva_Id: deva_Id,   
          codi_Restricciones_Utilizacion: data.campo24 == "True" ? true : false  ,
          codi_Indicar_Restricciones_Utilizacion: data.campo24_1 ,

          codi_Depende_Precio_Condicion:  data.campo25 == "True" ? true : false  ,
          codi_Indicar_Existe_Condicion: data.campo25_1,

          codi_Condicionada_Revertir: data.campo26 == "True" ? true : false  ,
         
          codi_Vinculacion_Comprador_Vendedor: data.campo27 == "True" ? true : false ,   
          codi_Tipo_Vinculacion: data.campo27_1,
          codi_Vinculacion_Influye_Precio:   data.campo27_2 == "True" ? true : false ,
          
          codi_Pagos_Descuentos_Indirectos: data.campo28 == "True" ? true : false ,  
          codi_Concepto_Monto_Declarado: data.campo28_1,   

          codi_Existen_Canones:  data.campo29 == "True" ? true : false , 
          codi_Indicar_Canones:data.campo29_1,

          usua_UsuarioCreacion: user['uuid'],   
          codi_FechaCreacion: new Date(),
        }
        const response = await axiosInstanceOrigin.post('Condiciones/Insertar',datos);
        return response;
      } catch (error) {
        throw error;
    }
    }

    async function EditarCondicionesPorDevaId (deva_Id,codi_Id, data) {
      try {
        let datos = {
          codi_Id: codi_Id,
          deva_Id: deva_Id,   
          codi_Restricciones_Utilizacion: data.campo24 == "True" ? true : false  ,
          codi_Indicar_Restricciones_Utilizacion: data.campo24_1 ,

          codi_Depende_Precio_Condicion:  data.campo25 == "True" ? true : false  ,
          codi_Indicar_Existe_Condicion: data.campo25_1,

          codi_Condicionada_Revertir: data.campo26 == "True" ? true : false  ,
         
          codi_Vinculacion_Comprador_Vendedor: data.campo27 == "True" ? true : false ,   
          codi_Tipo_Vinculacion: data.campo27_1,
          codi_Vinculacion_Influye_Precio:   data.campo27_2 == "True" ? true : false ,
          
          codi_Pagos_Descuentos_Indirectos: data.campo28 == "True" ? true : false ,  
          codi_Concepto_Monto_Declarado: data.campo28_1,   

          codi_Existen_Canones:  data.campo29 == "True" ? true : false , 
          codi_Indicar_Canones:data.campo29_1,

          usua_UsuarioModificacion: user['uuid'],
          codi_FechaModificacion: instance.formatFechaHora(new Date()),
        }
        const response = await axiosInstanceOrigin.post('Condiciones/Editar',datos);
        return response;
      } catch (error) {
          throw error;
      }
    }

    async function InsertarBaseCalculoPorDevaId (deva_Id, data) {
      try {
        let datos = { 
            base_Id: 0,
            deva_Id: deva_Id,
            base_PrecioFactura: parseFloat(data.campo39),
            base_PagosIndirectos:  parseFloat(data.campo40),
            base_PrecioReal:  parseFloat(data.campo41),
            base_MontCondicion:  parseFloat(data.campo42_1),
            base_MontoReversion:  parseFloat(data.campo42_2),
            base_ComisionCorrelaje:  parseFloat(data.campo42_3),
            base_Gasto_Envase_Embalaje:  parseFloat(data.campo42_4),
            base_ValoresMateriales_Incorporado:  parseFloat(data.campo42_5),
            base_Valor_Materiales_Utilizados:  parseFloat(data.campo42_6),
            base_Valor_Materiales_Consumidos:  parseFloat(data.campo42_7),
            base_Valor_Ingenieria_Importado:  parseFloat(data.campo42_8),
            base_Valor_Canones:  parseFloat(data.campo42_9),
            base_Gasto_TransporteM_Importada:  parseFloat(data.campo42_10),
            base_Gastos_Carga_Importada:  parseFloat(data.campo42_11),
            base_Costos_Seguro:  parseFloat(data.campo42_12),
            base_Total_Ajustes_Precio_Pagado:  parseFloat(data.campo43),
            base_Gastos_Asistencia_Tecnica:  parseFloat(data.campo44_1),
            base_Gastos_Transporte_Posterior:  parseFloat(data.campo44_2),
            base_Derechos_Impuestos:  parseFloat(data.campo44_3),
            base_Monto_Intereses:  parseFloat(data.campo44_4),
            base_Deducciones_Legales:  parseFloat(data.campo44_5),
            base_Total_Deducciones_Precio:  parseFloat(data.campo45),
            base_Valor_Aduana:  parseFloat(data.campo46),
            usua_UsuarioCreacion: user['uuid'],
            base_FechaCreacion: new Date(),
        }
        const response = await axiosInstanceOrigin.post('BaseCalculo/Insertar',datos);
        return response;
      } catch (error) {
          throw error;
      }
    }

    async function EditarBaseCalculoPorDevaId (base_Id,deva_Id, data) {
      try {
        let datos = { 
            base_Id: base_Id,
            deva_Id: deva_Id,
            base_PrecioFactura: parseFloat(data.campo39),
            base_PagosIndirectos:  parseFloat(data.campo40),
            base_PrecioReal:  parseFloat(data.campo41),
            base_MontCondicion:  parseFloat(data.campo42_1),
            base_MontoReversion:  parseFloat(data.campo42_2),
            base_ComisionCorrelaje:  parseFloat(data.campo42_3),
            base_Gasto_Envase_Embalaje:  parseFloat(data.campo42_4),
            base_ValoresMateriales_Incorporado:  parseFloat(data.campo42_5),
            base_Valor_Materiales_Utilizados:  parseFloat(data.campo42_6),
            base_Valor_Materiales_Consumidos:  parseFloat(data.campo42_7),
            base_Valor_Ingenieria_Importado:  parseFloat(data.campo42_8),
            base_Valor_Canones:  parseFloat(data.campo42_9),
            base_Gasto_TransporteM_Importada:  parseFloat(data.campo42_10),
            base_Gastos_Carga_Importada:  parseFloat(data.campo42_11),
            base_Costos_Seguro:  parseFloat(data.campo42_12),
            base_Total_Ajustes_Precio_Pagado:  parseFloat(data.campo43),
            base_Gastos_Asistencia_Tecnica:  parseFloat(data.campo44_1),
            base_Gastos_Transporte_Posterior:  parseFloat(data.campo44_2),
            base_Derechos_Impuestos:  parseFloat(data.campo44_3),
            base_Monto_Intereses:  parseFloat(data.campo44_4),
            base_Deducciones_Legales:  parseFloat(data.campo44_5),
            base_Total_Deducciones_Precio:  parseFloat(data.campo45),
            base_Valor_Aduana:  parseFloat(data.campo46),
            usua_UsuarioModificacion: user['uuid'],
            base_FechaModificacion: instance.formatFechaHora(new Date()),
        }
        const response = await axiosInstanceOrigin.post('BaseCalculo/Editar',datos);
        return response;
      } catch (error) {
          throw error;
      }
    }

    async function FinalizarDeva (deva_Id) {
      try {
        const response = await axiosInstanceOrigin.post('Declaracion_Valor/FinalizarDeclaracionValor?deva_Id='+deva_Id);
        return response;
      } catch (error) {
          throw error;
      }
    }
  

    return {
        listar,
        ListarLugarEmbarque,
        InsertarTab1DEVA,
        InsertarTab2DEVA,
        InsertarTab3DEVA,
        CancelarDeva,
        CancelarIntermediario,
        EditarTab1DEVA,
        EditarTab2DEVA,
        EditarTab3DEVA,
        ListarFacturasPorDevaId,
        ListarFacturasPorDevaIdReporte,
        InsertarFacturasPorDevaId,
        VerficarFacturaPorFact_Numero,
        EditarFacturas,
        EliminarFacturas,
        ListarItemsPorFacturaId,
        EliminarItems,
        ListarItems,
        InsertarItemsPorFactsId,
        EditarItems,
        InsertarCondicionesPorDevaId,
        EditarCondicionesPorDevaId,
        InsertarBaseCalculoPorDevaId,
        EditarBaseCalculoPorDevaId,
        FinalizarDeva,
        listarReporte,
        ExportData
    };
}

//const Declaracion_ValorServices = new Declaracion_ValorService();
export default Declaracion_ValorService;
