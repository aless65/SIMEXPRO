
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbPedidosOrdenDetalle
    {
        public int prod_Id { get; set; }
        public int pedi_Id { get; set; }
        public int mate_Id { get; set; }
        public int prod_Cantidad { get; set; }
        public decimal prod_Precio { get; set; }
        public decimal prod_Peso { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime prod_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? prod_FechaModificacion { get; set; }
        public bool? prod_Estado { get; set; }

        public virtual tbMateriales mate { get; set; }
        public virtual tbPedidosOrden pedi { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
    }
}