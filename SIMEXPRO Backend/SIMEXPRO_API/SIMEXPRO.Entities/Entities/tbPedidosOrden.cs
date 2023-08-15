﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbPedidosOrden
    {
        public tbPedidosOrden()
        {
            tbPedidosOrdenDetalle = new HashSet<tbPedidosOrdenDetalle>();
        }

        public int peor_Id { get; set; }
        public int? prov_Id { get; set; }
        public string peor_No_Duca { get; set; }
        public int ciud_Id { get; set; }
        public string peor_DireccionExacta { get; set; }
        public DateTime? peor_FechaEntrada { get; set; }
        public string peor_Obsevaciones { get; set; }
        public bool? peor_DadoCliente { get; set; }
        public bool? peor_Est { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime peor_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? peor_FechaModificacion { get; set; }
        public bool? peor_Estado { get; set; }

        public virtual tbCiudades ciud { get; set; }
        public virtual tbDuca peor_No_DucaNavigation { get; set; }
        public virtual tbProveedores prov { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbPedidosOrdenDetalle> tbPedidosOrdenDetalle { get; set; }
    }
}