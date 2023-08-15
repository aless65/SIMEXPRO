﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAcceso
{
    public class PantallasViewModel
    {
        public int pant_Id { get; set; }
        public string pant_Nombre { get; set; }
        public string pant_URL { get; set; }
        public string pant_Icono { get; set; }
        public string pant_Esquema { get; set; }
        public bool? pant_EsAduana { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime pant_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? pant_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? pant_FechaEliminacion { get; set; }
        public bool? pant_Estado { get; set; }
    }
}
