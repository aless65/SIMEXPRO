using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class AsignacionesOrdenViewModel
    {
        public int asor_Id { get; set; }
        public int asor_OrdenDetId { get; set; }
        public DateTime asor_FechaInicio { get; set; }
        public DateTime asor_FechaLimite { get; set; }
        public int asor_Cantidad { get; set; }
        public int proc_Id { get; set; }
        public int empl_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime asor_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? asor_FechaModificacion { get; set; }


    }
}
