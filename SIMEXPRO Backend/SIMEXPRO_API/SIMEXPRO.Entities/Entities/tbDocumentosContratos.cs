﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbDocumentosContratos
    {
        public int doco_Id { get; set; }
        public int? coin_Id { get; set; }
        public int? peju_Id { get; set; }
        public string doco_Numero_O_Referencia { get; set; }
        public string doco_TipoDocumento { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime doco_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? doco_FechaModificacion { get; set; }
        public bool? doco_Estado { get; set; }

        public virtual tbComercianteIndividual coin { get; set; }
        public virtual tbPersonaJuridica peju { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
    }
}