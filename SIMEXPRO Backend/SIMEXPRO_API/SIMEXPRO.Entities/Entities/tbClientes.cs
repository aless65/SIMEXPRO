
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbClientes
    {
        public tbClientes()
        {
            tbOrdenCompra = new HashSet<tbOrdenCompra>();
        }

        public int clie_Id { get; set; }
        public string clie_Nombre_O_Razon_Social { get; set; }
        public string clie_Direccion { get; set; }
        public string clie_RTN { get; set; }
        public string clie_Nombre_Contacto { get; set; }
        public string clie_Numero_Contacto { get; set; }
        public string clie_Correo_Electronico { get; set; }
        public string clie_FAX { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        [NotMapped]
        public String usuarioNombreCreacion { get; set; }
        public DateTime clie_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }

        [NotMapped]
        public String usuarioNombreModificacion { get; set; }
        public DateTime? clie_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }

        [NotMapped]
        public String usuarioNombreEliminacion { get; set; }
        public DateTime? clie_FechaEliminacion { get; set; }
        public bool? clie_Estado { get; set; }


        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbOrdenCompra> tbOrdenCompra { get; set; }
    }
}