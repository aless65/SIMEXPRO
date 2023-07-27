using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class NivelesComercialesViewModel
    {
        public int nico_Id { get; set; }
        public string nico_Codigo { get; set; }
        public string nico_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime nico_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? nico_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? nico_FechaEliminacion { get; set; }
        public bool? nico_Estado { get; set; }
    }
}
