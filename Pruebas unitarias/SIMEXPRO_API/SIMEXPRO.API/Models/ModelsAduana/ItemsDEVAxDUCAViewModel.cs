﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class ItemsDEVAxDUCAViewModel
    {
        public int dedu_Id { get; set; }
        public int duca_Id { get; set; }
        public int? deva_Id { get; set; }
        public int? usua_UsuarioCreacion { get; set; }
        public DateTime? dedu_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? dedu_FechaModificacion { get; set; }
    }
}
