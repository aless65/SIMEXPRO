
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbDeclarantes
    {
        public tbDeclarantes()
        {
            tbDeclarantesHistorial = new HashSet<tbDeclarantesHistorial>();
            tbImportadores = new HashSet<tbImportadores>();
            tbIntermediarios = new HashSet<tbIntermediarios>();
            tbProveedoresDeclaracion = new HashSet<tbProveedoresDeclaracion>();
        }

        public int decl_Id { get; set; }
        public string decl_NumeroIdentificacion { get; set; }
        public string decl_Nombre_Raso { get; set; }
        public string decl_Direccion_Exacta { get; set; }
        public int ciud_Id { get; set; }
        public string decl_Correo_Electronico { get; set; }
        public string decl_Telefono { get; set; }
        public string decl_Fax { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime decl_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? decl_FechaModificacion { get; set; }
        public bool? decl_Estado { get; set; }

        public virtual tbCiudades ciud { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }

        public virtual ICollection<tbDeclarantesHistorial> tbDeclarantesHistorial { get; set; }
        public virtual ICollection<tbImportadores> tbImportadores { get; set; }
        public virtual ICollection<tbIntermediarios> tbIntermediarios { get; set; }
        public virtual ICollection<tbProveedoresDeclaracion> tbProveedoresDeclaracion { get; set; }

    }
}