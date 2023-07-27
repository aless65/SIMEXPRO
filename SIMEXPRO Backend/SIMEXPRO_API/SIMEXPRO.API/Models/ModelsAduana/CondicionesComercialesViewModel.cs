﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class CondicionesComercialesViewModel
    {
        public int coco_Id { get; set; }
        public string coco_Codigo { get; set; }
        public string coco_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime coco_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? coco_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? coco_FechaEliminacion { get; set; }
        public bool? coco_Estado { get; set; }

    }
}
