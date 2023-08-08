
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbEmpleados
    {
        public tbEmpleados()
        {
            tbAsignacionesOrden = new HashSet<tbAsignacionesOrden>();
            tbModulos = new HashSet<tbModulos>();
            tbOrde_Ensa_Acab_Etiq = new HashSet<tbOrde_Ensa_Acab_Etiq>();
            tbPedidosProduccion = new HashSet<tbPedidosProduccion>();
        }

        public int empl_Id { get; set; }
        public string empl_Nombres { get; set; }
        public string empl_Apellidos { get; set; }
        public string empl_DNI { get; set; }
        public int escv_Id { get; set; }
        public string empl_Sexo { get; set; }
        public DateTime empl_FechaNacimiento { get; set; }
        public string empl_Telefono { get; set; }
        public string empl_DireccionExacta { get; set; }
        public int pvin_Id { get; set; }
        public string empl_CorreoElectronico { get; set; }
        public int carg_Id { get; set; }
        public bool empl_EsAduana { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime empl_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? empl_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? empl_FechaEliminacion { get; set; }
        public bool? empl_Estado { get; set; }

        public virtual tbCargos carg { get; set; }
        public virtual tbEstadosCiviles escv { get; set; }
        public virtual tbProvincias pvin { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbAsignacionesOrden> tbAsignacionesOrden { get; set; }
        public virtual ICollection<tbModulos> tbModulos { get; set; }
        public virtual ICollection<tbOrde_Ensa_Acab_Etiq> tbOrde_Ensa_Acab_Etiq { get; set; }
        public virtual ICollection<tbPedidosProduccion> tbPedidosProduccion { get; set; }
    }
}