﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAcceso
{
    public class UsuariosViewModel
    {
        public int usua_Id { get; set; }
        public string usua_Nombre { get; set; }
        public string usua_Contrasenia { get; set; }
        public string usua_Correo { get; set; }
        public int empl_Id { get; set; }
        public string usua_Image { get; set; }
        public int role_Id { get; set; }
        public bool usua_EsAdmin { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? usua_FechaEliminacion { get; set; }
        public bool? usua_Estado { get; set; }
    }
}