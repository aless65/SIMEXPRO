﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class PedidosOrdenDetalleViewModel
    {
        public int prod_Id { get; set; }
        public int pedi_Id { get; set; }
        public int mate_Id { get; set; }
        public int prod_Cantidad { get; set; }
        public decimal prod_Precio { get; set; }
        public decimal prod_Peso { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime prod_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? prod_FechaModificacion { get; set; }
        public bool? prod_Estado { get; set; }


    }
}
