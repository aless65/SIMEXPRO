using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models
{
    public class Oficio_ProfesionesViewModel
    {
        public int ofpr_Id { get; set; }
        public string ofpr_Nombre { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime ofpr_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? ofpr_FechaModificacion { get; set; }
        public bool? ofpr_Estado { get; set; }
        public string UsuarioCreacionNombre { get; set; }
        public string UsuarioModificadorNombre { get; set; }
    }
}
