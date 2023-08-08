﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbMarcas
    {
        public tbMarcas()
        {
            tbTransporte = new HashSet<tbTransporte>();
        }

        public int marc_Id { get; set; }
        public string marc_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime marc_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? marc_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? marc_FechaEliminacion { get; set; }
        public bool? marc_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbTransporte> tbTransporte { get; set; }
    }
}