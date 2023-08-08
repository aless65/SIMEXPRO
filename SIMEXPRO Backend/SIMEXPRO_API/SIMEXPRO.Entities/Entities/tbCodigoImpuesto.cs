
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbCodigoImpuesto
    {
        public tbCodigoImpuesto()
        {
            tbBoletinPago = new HashSet<tbBoletinPago>();
        }

        public int coim_Id { get; set; }
        public string coim_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime coim_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? coim_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? coim_FechaEliminacion { get; set; }
        public bool? coim_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbBoletinPago> tbBoletinPago { get; set; }
    }
}