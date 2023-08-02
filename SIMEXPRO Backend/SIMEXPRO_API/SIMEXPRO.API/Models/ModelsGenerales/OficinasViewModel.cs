﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models
{
    public class OficinasViewModel
    {
        public int ofic_Id { get; set; }
        public string ofic_Nombre { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioCreacionNombre { get; set; }
        [NotMapped]
        public string UsuarioModificadorNombre { get; set; }
        public DateTime ofic_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? ofic_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? ofic_FechaEliminacion { get; set; }
        public bool? ofic_Estado { get; set; }

    }
}
