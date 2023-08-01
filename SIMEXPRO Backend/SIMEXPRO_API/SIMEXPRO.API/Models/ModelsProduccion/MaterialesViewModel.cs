﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class MaterialesViewModel
    {
        public int mate_Id { get; set; }
        public string mate_Descripcion { get; set; }
        public int? subc_Id { get; set; }
        public decimal? mate_Precio { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime mate_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? mate_FechaModificacion { get; set; }
        public bool? mate_Estado { get; set; }
    }
}