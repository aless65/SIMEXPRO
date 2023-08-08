
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbFuncionesMaquina
    {
        public tbFuncionesMaquina()
        {
            tbModelosMaquina = new HashSet<tbModelosMaquina>();
        }

        public int func_Id { get; set; }
        public string func_Nombre { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime func_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? func_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? func_FechaEliminacion { get; set; }
        public bool? func_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbModelosMaquina> tbModelosMaquina { get; set; }
    }
}