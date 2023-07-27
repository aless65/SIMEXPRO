using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class ColoresViewModel
    {
        public int colr_Id { get; set; }
        public string colr_Nombre { get; set; }
        public string colr_Codigo { get; set; }
        public int? usua_UsuarioCreacion { get; set; }
        public DateTime colr_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? colr_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? colr_FechaEliminacion { get; set; }
        public bool? colr_Estado { get; set; }


    }
}
