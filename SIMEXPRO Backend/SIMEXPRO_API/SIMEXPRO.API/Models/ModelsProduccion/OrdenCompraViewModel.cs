using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class OrdenCompraViewModel
    {
        public int orco_Id { get; set; }
        public int orco_IdCliente { get; set; }
        public DateTime orco_FechaEmision { get; set; }
        public DateTime orco_FechaLimite { get; set; }
        public int orco_MetodoPago { get; set; }
        public bool orco_Materiales { get; set; }
        public int orco_IdEmbalaje { get; set; }
        public string orco_EstadoOrdenCompra { get; set; }
        public string orco_DireccionEntrega { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime orco_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? orco_FechaModificacion { get; set; }
        public bool? orco_Estado { get; set; }

    }
}
