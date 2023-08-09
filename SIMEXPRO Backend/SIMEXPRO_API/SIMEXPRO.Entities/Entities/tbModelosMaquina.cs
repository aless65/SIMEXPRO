
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbModelosMaquina
    {
        public tbModelosMaquina()
        {
            tbMaquinas = new HashSet<tbMaquinas>();
        }

        public int mmaq_Id { get; set; }
        public string mmaq_Nombre { get; set; }
        public int marq_Id { get; set; }
        public int func_Id { get; set; }
        public string mmaq_Imagen { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime mmaq_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? mmaq_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? mmaq_FechaEliminacion { get; set; }
        public bool? mmaq_Estado { get; set; }

        public virtual tbFuncionesMaquina func { get; set; }
        public virtual tbMarcasMaquina marq { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbMaquinas> tbMaquinas { get; set; }
    }
}