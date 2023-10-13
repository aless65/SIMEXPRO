﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class PedidosOrdenViewModel
    {
        public int peor_Id { get; set; }
        public int? prov_Id { get; set; }
        public string peor_No_Duca { get; set; }
        public int ciud_Id { get; set; }
        public string peor_DireccionExacta { get; set; }
        public DateTime? peor_FechaEntrada { get; set; }
        public string peor_Obsevaciones { get; set; }
        //public bool? peor_DadoCliente { get; set; }
        //public bool? peor_Est { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime peor_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? peor_FechaModificacion { get; set; }
        public bool? peor_Estado { get; set; }

        public string prov_NombreCompania { get; set; }
        public string prov_NombreContacto { get; set; }
        public int prov_Ciudad { get; set; }
        public string ciud_Nombre { get; set; }
        public string UsuarioCreacionNombre { get; set; }
        public string UsuarioModificacionNombre { get; set; }
        public string DadoCliente { get; set; }
        public string Detalles { get; set; }
    }
}
