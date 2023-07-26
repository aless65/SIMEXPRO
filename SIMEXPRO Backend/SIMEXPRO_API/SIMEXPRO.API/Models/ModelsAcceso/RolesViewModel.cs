﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAcceso
{
    public class RolesViewModel
    {
        public int role_Id { get; set; }
        public string role_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? role_FechaEliminacion { get; set; }
        public bool? role_Estado { get; set; }
    }
}
