﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class PODetallePorPedidoOrdenDetalleViewModel
    {
        public int popo_Id { get; set; }
        public int prod_Id { get; set; }
        public int code_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime popo_FechaCreacion { get; set; }

        public string tall_Nombre { get; set; }
        public int code_CantidadPrenda { get; set; }
        public string code_Sexo { get; set; }
        public string colr_Nombre { get; set; }
        public string esti_Descripcion { get; set; }
        public string usua_UsuarioCreacionNombre { get; set; }
    }
}
