
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbProcesos
    {
        public tbProcesos()
        {
            tbArea = new HashSet<tbArea>();
            tbAsignacionesOrden = new HashSet<tbAsignacionesOrden>();
            tbModulos = new HashSet<tbModulos>();
            tbOrdenCompraDetalles = new HashSet<tbOrdenCompraDetalles>();
        }

        public int proc_Id { get; set; }
        public string proc_Descripcion { get; set; }
        public int? usua_UsuarioCreacion { get; set; }
        public DateTime proc_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? proc_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? proc_FechaEliminacion { get; set; }
        public bool? proc_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbArea> tbArea { get; set; }
        public virtual ICollection<tbAsignacionesOrden> tbAsignacionesOrden { get; set; }
        public virtual ICollection<tbModulos> tbModulos { get; set; }
        public virtual ICollection<tbOrdenCompraDetalles> tbOrdenCompraDetalles { get; set; }
    }
}