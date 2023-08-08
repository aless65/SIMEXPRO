﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbCondicionesHistorial
    {
        public int hcod_Id { get; set; }
        public int? codi_Id { get; set; }
        public int? deva_Id { get; set; }
        public bool? codi_Restricciones_Utilizacion { get; set; }
        public string codi_Indicar_Restricciones_Utilizacion { get; set; }
        public bool? codi_Depende_Precio_Condicion { get; set; }
        public string codi_Indicar_Existe_Condicion { get; set; }
        public bool? codi_Condicionada_Revertir { get; set; }
        public bool? codi_Vinculacion_Comprador_Vendedor { get; set; }
        public string codi_Tipo_Vinculacion { get; set; }
        public bool? codi_Vinculacion_Influye_Precio { get; set; }
        public bool? codi_Pagos_Descuentos_Indirectos { get; set; }
        public string codi_Concepto_Monto_Declarado { get; set; }
        public bool? codi_Existen_Canones { get; set; }
        public string codi_Indicar_Canones { get; set; }
        public int? usua_UsuarioCreacion { get; set; }
        public DateTime? codi_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? codi_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? codi_FechaEliminacion { get; set; }
        public bool? codi_Estado { get; set; }
        public int? hcod_UsuarioAccion { get; set; }
        public DateTime? hcod_FechaAccion { get; set; }
        public string hcod_Accion { get; set; }
    }
}