using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class ReporteModuloDiaViewModel
    {
        public int remo_Id { get; set; }
        public int modu_Id { get; set; }
        public DateTime remo_Fecha { get; set; }
        public int remo_TotalDia { get; set; }
        public int remo_TotalDanado { get; set; }
       
        [NotMapped]
        public string usua_NombreUsuarioCreacion { get; set; }

        [NotMapped]
        public string usua_NombreUsuarioModificacion { get; set; }

        public int usua_UsuarioCreacion { get; set; }
        public DateTime remo_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? remo_FechaModificacion { get; set; }
        public bool? remo_Estado { get; set; }

    }
}
