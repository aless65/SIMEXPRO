using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class ConductorViewModel
    {
        public int cont_Id { get; set; }
        public string cont_Nombre { get; set; }
        public string cont_Apellido { get; set; }
        public string cont_Licencia { get; set; }
        public int? pais_IdExpedicion { get; set; }
        public int tran_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime cont_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? cont_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? cont_FechaEliminacion { get; set; }
        public bool? cont_Estado { get; set; }
    }
}
