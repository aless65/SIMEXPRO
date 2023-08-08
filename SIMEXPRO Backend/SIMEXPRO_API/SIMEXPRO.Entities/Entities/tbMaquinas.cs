
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbMaquinas
    {
        public tbMaquinas()
        {
            tbMaquinaHistorial = new HashSet<tbMaquinaHistorial>();
        }

        public int maqu_Id { get; set; }
        public string maqu_NumeroSerie { get; set; }
        public int mmaq_Id { get; set; }
        public int modu_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime maqu_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? maqu_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? maqu_FechaEliminacion { get; set; }
        public bool? maqu_Estado { get; set; }

        public virtual tbModelosMaquina mmaq { get; set; }
        public virtual tbModulos modu { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbMaquinaHistorial> tbMaquinaHistorial { get; set; }
    }
}