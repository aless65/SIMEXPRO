﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbTiposIdentificacion
    {
        public tbTiposIdentificacion()
        {
            tbDuca = new HashSet<tbDuca>();
        }

        public int iden_Id { get; set; }
        public string iden_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime iden_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? iden_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? iden_FechaEliminacion { get; set; }
        public bool? iden_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbDuca> tbDuca { get; set; }
    }
}