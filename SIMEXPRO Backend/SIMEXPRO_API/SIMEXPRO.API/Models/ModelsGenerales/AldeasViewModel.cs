using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models
{
    public class AldeasViewModel
    {
        public int alde_Id { get; set; }
        public string alde_Nombre { get; set; }
        public int ciud_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime alde_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? alde_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? alde_FechaEliminacion { get; set; }
        public bool? alde_Estado { get; set; }
    }
}
