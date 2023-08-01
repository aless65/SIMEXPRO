using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class ConceptoPagoViewModel
    {
        public int copa_Id { get; set; }
        public string copa_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime copa_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public string usuaModificacion { get; set; }
        public DateTime? copa_FechaModificacion { get; set; }
        public bool? copa_Estado { get; set; }
    }
}
