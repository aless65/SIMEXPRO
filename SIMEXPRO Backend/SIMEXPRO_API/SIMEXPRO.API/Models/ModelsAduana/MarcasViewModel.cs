using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class MarcasViewModel
    {
        public int marc_Id { get; set; }
        public string marc_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime marc_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? marc_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? marc_FechaEliminacion { get; set; }
        public bool? marc_Estado { get; set; }
    }
}
