﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbArea
    {
        public tbArea()
        {
            tbLotes = new HashSet<tbLotes>();
        }

        public int tipa_Id { get; set; }
        public string tipa_area { get; set; }
        public int proc_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime tipa_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? tipa_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? tipa_FechaEliminacion { get; set; }
        public bool? tipa_Estado { get; set; }

        [NotMapped]
        public string usarioCreacion { get; set; }

        [NotMapped]
        public string usuarioModificacion { get; set; }

        [NotMapped]
        public string usuarioEliminacion { get; set; }

        public virtual tbProcesos proc { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbLotes> tbLotes { get; set; }
    }
}