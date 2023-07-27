using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class PedidosProduccionViewModel
    {
        public int ppro_Id { get; set; }
        public int empl_Id { get; set; }
        public DateTime ppro_Fecha { get; set; }
        public string ppro_Estados { get; set; }
        public string ppro_Observaciones { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime ppro_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? ppro_FechaModificacion { get; set; }
        public bool? ppro_Estado { get; set; }

    }
}
