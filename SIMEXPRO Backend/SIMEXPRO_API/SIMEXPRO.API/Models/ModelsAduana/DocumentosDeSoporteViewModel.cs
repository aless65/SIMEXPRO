﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class DocumentosDeSoporteViewModel
    {
        public int doso_Id { get; set; }
        public int tido_Id { get; set; }
        public string duca_No_Duca { get; set; }
        public string doso_NumeroDocumento { get; set; }
        public DateTime? doso_FechaEmision { get; set; }
        public DateTime? doso_FechaVencimiento { get; set; }
        public int doso_PaisEmision { get; set; }
        public string doso_LineaAplica { get; set; }
        public string doso_EntidadEmitioDocumento { get; set; }
        public string doso_Monto { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime doso_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? doso_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? doso_FechaEliminacion { get; set; }
        public bool? doso_Estado { get; set; }
    }
}
