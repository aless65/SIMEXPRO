using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class TipoEmbalajeViewModel
    {
        public int tiem_Id { get; set; }
        public string tiem_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }

        [NotMapped]
        public string usarioCreacion { get; set; }

        public DateTime tiem_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        
        [NotMapped]
        public string usuarioModificacion { get; set; }
       
        public DateTime? tiem_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }

        [NotMapped]
        public string usuarioEliminacion { get; set; }

        public DateTime? tiem_FechaEliminacion { get; set; }
        public bool? tiem_Estado { get; set; }
    }
}
