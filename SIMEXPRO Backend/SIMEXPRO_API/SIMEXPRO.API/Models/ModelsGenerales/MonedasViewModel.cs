﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models
{
    public class MonedasViewModel
    {
        public int mone_Id { get; set; }
        public string mone_Codigo { get; set; }
        public string mone_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime mone_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? mone_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? mone_FechaEliminacion { get; set; }
        public bool? mone_Estado { get; set; }

        public string usuarioModificacionNombre { get; set; }
        public string usuarioCreacionNombre { get; set; }
    }
}
