using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class CodigoImpuestoViewModel
    {
        public int coim_Id { get; set; }
        public string coim_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime coim_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? coim_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? coim_FechaEliminacion { get; set; }
        public bool? coim_Estado { get; set; }

    }
}
