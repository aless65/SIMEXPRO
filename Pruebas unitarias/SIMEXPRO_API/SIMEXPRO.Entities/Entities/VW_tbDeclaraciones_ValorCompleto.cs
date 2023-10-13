﻿
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class VW_tbDeclaraciones_ValorCompleto
    {
        public int? deva_Id { get; set; }
        public int? deva_AduanaIngresoId { get; set; }
        public string? adua_IngresoNombre { get; set; }
        public string? adua_IngresoCodigo { get; set; }
        public string? adua_DespachoCodigo { get; set; }
        [NotMapped]
        public int regi_Id { get; set; }
        [NotMapped]
        public string regi_Codigo { get; set; }
        [NotMapped]
        public string regi_Descripcion { get; set; }
        public string? inco_Codigo { get; set; }
        [NotMapped]
        public string? duca_No_DUCA { get; set; }
        public int? deva_AduanaDespachoId { get; set; }
        public string? adua_DespachoNombre { get; set; }
        public string? deva_DeclaracionMercancia { get; set; }
        public DateTime? deva_FechaAceptacion { get; set; }
        public bool? deva_Finalizacion { get; set; }
        public bool? deva_PagoEfectuado { get; set; }
        public int? pais_ExportacionId { get; set; }
        public string? pais_ExportacionNombre { get; set; }
        public DateTime? deva_FechaExportacion { get; set; }
        public int? mone_Id { get; set; }
        public string? mone_Otra { get; set; }
        public string? monedaNombre { get; set; }
        public decimal? deva_ConversionDolares { get; set; }


        public int? emba_Id { get; set; }
        public string? LugarEmbarque { get; set; }


        public int? nico_Id { get; set; }
        public string? nico_Descripcion { get; set; }


        public string? emba_Codigo { get; set; }


        public int? impo_Id { get; set; }
        public string? impo_NumRegistro { get; set; }
        public string? impo_RTN { get; set; }
        public string? impo_NivelComercial_Otro { get; set; }


        public string? impo_Nombre_Raso { get; set; }
        public string? impo_Direccion_Exacta { get; set; }
        public string? impo_CiudadNombre { get; set; }
        public string? impo_PaisNombre { get; set; }
        public string? impo_Correo_Electronico { get; set; }
        public string? impo_Telefono { get; set; }
        public string? impo_Fax { get; set; }
        public int? impo_ciudId { get; set; }
        public int? impo_paisId { get; set; }


        public int? coco_Id { get; set; }
        public string? coco_Descripcion { get; set; }
        public string? pvde_Condicion_Otra { get; set; }


        public int? pvde_Id { get; set; }
        public string? prov_NumeroIdentificacion { get; set; }
        public string? prov_Nombre_Raso { get; set; }
        public string? prov_Direccion_Exacta { get; set; }
        public string? prov_CiudadNombre { get; set; }
        public string? prov_PaisNombre { get; set; }
        public string? prov_Correo_Electronico { get; set; }
        public string? prov_Telefono { get; set; }
        public string? prov_Fax { get; set; }
        public int? prov_ciudId { get; set; }
        public int? prov_paisId { get; set; }


        public int? tite_Id { get; set; }
        public string? TipoIntermediario { get; set; }



        public int? inte_Id { get; set; }
        public int? inte_ciudId { get; set; }
        public int? inte_paisId { get; set; }
        public string? inte_Tipo_Otro { get; set; }



        public string? inte_NumeroIdentificacion { get; set; }
        public string? inte_Nombre_Raso { get; set; }
        public string? inte_Direccion_Exacta { get; set; }
        public string? inte_Correo_Electronico { get; set; }
        public string? inte_CiudadNombre { get; set; }
        public string? inte_PaisNombre { get; set; }
        public string? inte_Telefono { get; set; }
        public string? inte_Fax { get; set; }

        public string? deva_LugarEntrega { get; set; }
        public int? pais_EntregaId { get; set; }
        public string? pais_EntregaNombre { get; set; }
        public int? inco_Id { get; set; }
        public string? inco_Descripcion { get; set; }
        public string? inco_Version { get; set; }
        public string? deva_NumeroContrato { get; set; }
        public DateTime? deva_FechaContrato { get; set; }


        public int? foen_Id { get; set; }
        public string? foen_Descripcion { get; set; }
        public string? deva_FormaEnvioOtra { get; set; }


        public int? fopa_Id { get; set; }
        public string? fopa_Descripcion { get; set; }
        public string? deva_FormaPagoOtra { get; set; }



        public int? codi_Id { get; set; }
        public bool? codi_Restricciones_Utilizacion { get; set; }
        public string? codi_Indicar_Restricciones_Utilizacion { get; set; }
        public bool? codi_Depende_Precio_Condicion { get; set; }
        public string? codi_Indicar_Existe_Condicion { get; set; }
        public bool? codi_Condicionada_Revertir { get; set; }
        public bool? codi_Vinculacion_Comprador_Vendedor { get; set; }
        public string? codi_Tipo_Vinculacion { get; set; }
        public bool? codi_Vinculacion_Influye_Precio { get; set; }
        public bool? codi_Pagos_Descuentos_Indirectos { get; set; }
        public string? codi_Concepto_Monto_Declarado { get; set; }
        public bool? codi_Existen_Canones { get; set; }
        public string? codi_Indicar_Canones { get; set; }



        public int? base_Id { get; set; }
        public decimal? base_PrecioFactura { get; set; }
        public decimal? base_PagosIndirectos { get; set; }
        public decimal? base_PrecioReal { get; set; }
        public decimal? base_MontCondicion { get; set; }
        public decimal? base_MontoReversion { get; set; }
        public decimal? base_ComisionCorrelaje { get; set; }
        public decimal? base_Gasto_Envase_Embalaje { get; set; }
        public decimal? base_ValoresMateriales_Incorporado { get; set; }
        public decimal? base_Valor_Materiales_Utilizados { get; set; }
        public decimal? base_Valor_Materiales_Consumidos { get; set; }
        public decimal? base_Valor_Ingenieria_Importado { get; set; }
        public decimal? base_Valor_Canones { get; set; }
        public decimal? base_Gasto_TransporteM_Importada { get; set; }
        public decimal? base_Gastos_Carga_Importada { get; set; }
        public decimal? base_Costos_Seguro { get; set; }
        public decimal? base_Total_Ajustes_Precio_Pagado { get; set; }
        public decimal? base_Gastos_Asistencia_Tecnica { get; set; }
        public decimal? base_Gastos_Transporte_Posterior { get; set; }
        public decimal? base_Derechos_Impuestos { get; set; }
        public decimal? base_Monto_Intereses { get; set; }
        public decimal? base_Deducciones_Legales { get; set; }
        public decimal? base_Total_Deducciones_Precio { get; set; }
        public decimal? base_Valor_Aduana { get; set; }



        public int? usua_UsuarioCreacion { get; set; }
        public string? usua_CreacionNombre { get; set; }
        public DateTime? deva_FechaCreacion { get; set; }
        public int? usua_ModificacionNombre { get; set; }
        public DateTime? deva_FechaModificacion { get; set; }
        public bool? deva_Estado { get; set; }
    }
}