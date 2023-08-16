using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class OrdenCompraViewModel
    {
        public int orco_Id { get; set; }
        [NotMapped]
        public int orco_IdCliente { get; set; }
        [NotMapped]
        public string clie_Nombre_O_Razon_Social { get; set; }
        [NotMapped]
        public string clie_Direccion { get; set; }
        [NotMapped]
        public string clie_RTN { get; set; }
        [NotMapped]
        public string clie_Nombre_Contacto { get; set; }
        [NotMapped]
        public string clie_Numero_Contacto { get; set; }
        [NotMapped]
        public string clie_Correo_Electronico { get; set; }
        [NotMapped]
        public string clie_FAX { get; set; }
        public DateTime orco_FechaEmision { get; set; }
        public DateTime orco_FechaLimite { get; set; }
        public int orco_MetodoPago { get; set; }
        public bool orco_Materiales { get; set; }
        public int orco_IdEmbalaje { get; set; }
        [NotMapped]
        public string tiem_Descripcion { get; set; }

        public string orco_EstadoOrdenCompra { get; set; }
        public string orco_DireccionEntrega { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        [NotMapped]
        public string usuarioCreacionNombre { get; set; }
        public DateTime orco_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        [NotMapped]
        public string usuarioModificacionNombre { get; set; }
        public DateTime? orco_FechaModificacion { get; set; }
        public bool? orco_Estado { get; set; }

    }
}
