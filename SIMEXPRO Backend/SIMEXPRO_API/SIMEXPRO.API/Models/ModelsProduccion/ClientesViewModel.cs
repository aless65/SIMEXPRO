﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class ClientesViewModel
    {
        public int clie_Id { get; set; }
        public string clie_Nombre_O_Razon_Social { get; set; }
        public string clie_Direccion { get; set; }
        public string clie_RTN { get; set; }
        public string clie_Nombre_Contacto { get; set; }
        public string clie_Numero_Contacto { get; set; }
        public string clie_Correo_Electronico { get; set; }
        public string clie_FAX { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime clie_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? clie_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? clie_FechaEliminacion { get; set; }
        public bool? clie_Estado { get; set; }

        [NotMapped]
        public String usuarioNombreCreacion { get; set; }

        [NotMapped]
        public String usuarioNombreModificacion { get; set; }

        [NotMapped]
        public String usuarioNombreEliminacion { get; set; }


    }
}