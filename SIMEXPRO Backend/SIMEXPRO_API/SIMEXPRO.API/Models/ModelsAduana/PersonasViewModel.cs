using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class PersonasViewModel
    {
        public int pers_Id { get; set; }
        public string pers_RTN { get; set; }
        public int ofic_Id { get; set; }
        public int escv_Id { get; set; }
        public int ofpr_Id { get; set; }
        public bool pers_FormaRepresentacion { get; set; }
        public int pers_escvRepresentante { get; set; }
        public int pers_OfprRepresentante { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime pers_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? pers_FechaModificacion { get; set; }
        public bool? pers_Estado { get; set; }
    }
}
