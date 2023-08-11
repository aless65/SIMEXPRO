﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbNivelesComerciales
    {
        public tbNivelesComerciales()
        {
            tbImportadores = new HashSet<tbImportadores>();
        }

        public int nico_Id { get; set; }
        public string nico_Codigo { get; set; }
        public string nico_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public string usuarioCreacionNombre { get; set; }
        public DateTime nico_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public string usuarioModificacionNombre { get; set; }
        public DateTime? nico_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public string usuarioEliminacionNombre { get; set; }
        public DateTime? nico_FechaEliminacion { get; set; }
        public bool? nico_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbImportadores> tbImportadores { get; set; }
    }
}