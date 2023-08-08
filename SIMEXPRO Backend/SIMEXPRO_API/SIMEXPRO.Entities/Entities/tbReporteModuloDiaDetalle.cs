
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbReporteModuloDiaDetalle
    {
        public int rdet_Id { get; set; }
        public int remo_Id { get; set; }
        public int rdet_TotalDia { get; set; }
        public int rdet_TotalDanado { get; set; }
        public int code_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime rdet_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? rdet_FechaModificacion { get; set; }
        public bool? rdet_Estado { get; set; }

        public virtual tbOrdenCompraDetalles code { get; set; }
        public virtual tbReporteModuloDia remo { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
    }
}