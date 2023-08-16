using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class PedidosProduccionDetalleViewModel
    {
        public int ppde_Id { get; set; }
        public int ppro_Id { get; set; }
        public int lote_Id { get; set; }
        public int ppde_Cantidad { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        [NotMapped]
        public string usuarioCreacionNombre { get; set; }
        public DateTime ppde_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        [NotMapped]
        public string usuarioModificacionNombre { get; set; }
        public DateTime? ppde_FechaModificacion { get; set; }
        public bool? ppde_Estado { get; set; }

    }
}
