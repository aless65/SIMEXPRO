﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbOrdenCompra
    {
        public tbOrdenCompra()
        {
            tbFacturasExportacion = new HashSet<tbFacturasExportacion>();
            tbOrdenCompraDetalles = new HashSet<tbOrdenCompraDetalles>();
        }

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

        public virtual tbClientes orco_IdClienteNavigation { get; set; }
        public virtual tbTipoEmbalaje orco_IdEmbalajeNavigation { get; set; }
        public virtual tbFormasdePago orco_MetodoPagoNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbOrdenCompraDetalles> tbOrdenCompraDetalles { get; set; }
        public virtual ICollection<tbFacturasExportacion> tbFacturasExportacion { get; set; }

    }
}