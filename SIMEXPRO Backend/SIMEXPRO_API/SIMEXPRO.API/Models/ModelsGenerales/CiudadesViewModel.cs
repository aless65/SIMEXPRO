﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models
{
    public class CiudadesViewModel
    {
        public int ciud_Id { get; set; }
        public string ciud_Nombre { get; set; }

        [NotMapped]
        public int pvin_Id { get; set; }


        [NotMapped]
        public string pvin_Nombre { get; set; }


        [NotMapped]
        public string pvin_Codigo { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime ciud_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? ciud_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? ciud_FechaEliminacion { get; set; }
        public bool? ciud_Estado { get; set; }
    }
}