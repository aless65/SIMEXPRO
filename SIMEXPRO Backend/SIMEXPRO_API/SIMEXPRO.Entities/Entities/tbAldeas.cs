﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbAldeas
    {
        public tbAldeas()
        {
            tbColonias = new HashSet<tbColonias>();
        }

        public int alde_Id { get; set; }
        public string alde_Nombre { get; set; }
        public int ciud_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime alde_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? alde_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? alde_FechaEliminacion { get; set; }
        public bool? alde_Estado { get; set; }

        public virtual tbCiudades ciud { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbColonias> tbColonias { get; set; }
    }
}