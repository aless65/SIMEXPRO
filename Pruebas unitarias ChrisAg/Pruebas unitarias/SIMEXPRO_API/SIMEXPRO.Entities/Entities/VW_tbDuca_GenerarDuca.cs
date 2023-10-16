﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class VW_tbDuca_GenerarDuca
    {
        public int? duca_Id { get; set; }
        public string? duca_No_Correlativo_Referencia { get; set; }
        public string? duca_No_Duca { get; set; }
        public DateTime? deva_FechaAceptacion { get; set; }
        public string? duca_AduanaRegistro { get; set; }
        public string? adua_SalidaNombre { get; set; }
        public string? adua_IngresoNombre { get; set; }
        public string? duca_AduanaDestino { get; set; }
        public string? prov_NumeroIdentificacion { get; set; }
        //public string? duca_TipoIdentificacionExportador { get; set; }
        //public string? duca_PaisExportador { get; set; }
        public string? prov_Nombre_Raso { get; set; }
        //public string? duca_DomicilioFiscal_Exportador { get; set; }
        public string? impo_NumRegistro { get; set; }
        public string? impo_Nombre_Raso { get; set; }
        //public string? duca_PaisImportador { get; set; }
        //public string? duca_DomicilioFiscal_Importador { get; set; }
        public string? duca_Codigo_Declarante { get; set; }
        public string? duca_Numero_Id_Declarante { get; set; }
        public string? duca_NombreSocial_Declarante { get; set; }
        public string? duca_DomicilioFiscal_Declarante { get; set; }
        public string? duca_RegimenAduanero { get; set; }
        public string? duca_Modalidad { get; set; }
        public string? duca_Clase { get; set; }
        public DateTime? duca_FechaVencimiento { get; set; }
        public string? duca_PaisProcedencia { get; set; }
        //public string? duca_PaisExportacion { get; set; }
        public string? duca_PaisDestino { get; set; }
        public string? duca_Deposito_Aduanero { get; set; }
        public string? duca_Lugar_Desembarque { get; set; }
        public string? duca_Lugar_Embarque { get; set; }
        public string? duca_Manifiesto { get; set; }
        public string? duca_Titulo { get; set; }
        public string? duca_Codigo_Transportista { get; set; }
        public string? duca_Transportista_Nombre { get; set; }
        public string? duca_ModoTransporte { get; set; }
        public string? cont_NoIdentificacion { get; set; }
        public string? cont_Licencia { get; set; }
        public string? pais_Expedicion { get; set; }
        public string? conductorNombres { get; set; }
        public string? tran_IdUnidadTransporte { get; set; }
        public string? pais_Transporte { get; set; }
        public string? marc_Descripcion { get; set; }
        public string? tran_Chasis { get; set; }
        public string? tran_Remolque { get; set; }
        public int? tran_CantCarga { get; set; }
        public int? tran_NumDispositivoSeguridad { get; set; }
        public string? tran_Equipamiento { get; set; }
        public string? tran_TamanioEquipamiento { get; set; }
        public string? tran_TipoCarga { get; set; }
        public string? tran_IdContenedor { get; set; }
        public string? inco_Codigo { get; set; }
        public decimal? deva_ConversionDolares { get; set; }
        public string? ValoresTotales { get; set; }
        public string? LiquidacionGeneral { get; set; }
        public string? Mercancias { get; set; }
        public string? Documentos { get; set; }
        //public string? duca_CanalAsignado { get; set; }
    }
}