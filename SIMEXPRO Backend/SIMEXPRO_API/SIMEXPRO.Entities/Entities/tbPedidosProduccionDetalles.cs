﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbPedidosProduccionDetalles
    {
        public int ppde_Id { get; set; }
        public int ppro_Id { get; set; }
        public int lote_Id { get; set; }
        public int ppde_Cantidad { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime ppde_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? ppde_FechaModificacion { get; set; }
        public bool? ppde_Estado { get; set; }

        public virtual tbLotes lote { get; set; }
        public virtual tbPedidosProduccion ppro { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
    }
}