﻿
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbCategoria
    {
        public tbCategoria()
        {
            tbSubcategoria = new HashSet<tbSubcategoria>();
        }

        public int cate_Id { get; set; }
        public string cate_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime cate_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? cate_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? cate_FechaEliminacion { get; set; }
        public bool? cate_Estado { get; set; }
        [NotMapped]
        public string usuarioCreacionNombre { get; set; }

        [NotMapped]
        public string usuarioModificacionNombre { get; set; }

        [NotMapped]
        public string usuarioEliminacionNombre { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbSubcategoria> tbSubcategoria { get; set; }
    }
}