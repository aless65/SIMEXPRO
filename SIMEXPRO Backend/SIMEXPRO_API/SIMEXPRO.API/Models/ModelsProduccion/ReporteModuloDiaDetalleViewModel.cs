using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class ReporteModuloDiaDetalleViewModel
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

         public string usua_NombreUsuarioCreacion { get; set; }

         public string usua_NombreUsuarioModificacion { get; set; }


    }
}
