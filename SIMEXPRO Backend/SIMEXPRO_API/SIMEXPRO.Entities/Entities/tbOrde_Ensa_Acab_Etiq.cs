
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbOrde_Ensa_Acab_Etiq
    {
        public tbOrde_Ensa_Acab_Etiq()
        {
            tbRevisionDeCalidad = new HashSet<tbRevisionDeCalidad>();
        }

        public int ensa_Id { get; set; }
        public int ensa_Cantidad { get; set; }
        public int empl_Id { get; set; }
        public int code_Id { get; set; }
        public DateTime ensa_FechaInicio { get; set; }
        public DateTime ensa_FechaLimite { get; set; }
        public int ppro_Id { get; set; }
        public int proc_Id { get; set; }
        public int modu_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime ensa_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? ensa_FechaModificacion { get; set; }
        public bool? ensa_Estado { get; set; }

        public virtual tbModulos modu { get; set; }
        public virtual tbOrdenCompraDetalles code { get; set; }
        public virtual tbEmpleados empl { get; set; }
        public virtual tbProcesos proc { get; set; }
        public virtual tbPedidosProduccion ppro { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbRevisionDeCalidad> tbRevisionDeCalidad { get; set; }
    }
}