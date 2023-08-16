using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class AsignacionesOrdenDetalleViewModel
    {
        public int asor_Id { get; set; }
        public int asor_OrdenDetId { get; set; }
        public DateTime asor_FechaInicio { get; set; }
        public DateTime asor_FechaLimite { get; set; }
        public int asor_Cantidad { get; set; }
        public int proc_Id { get; set; }
        [NotMapped]
        public string proc_Descripcion { get; set; }
        public int empl_Id { get; set; }
        [NotMapped]
        public string empl_NombreCompleto { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        [NotMapped]
        public string usuarioCreacionNombre { get; set; }
        public DateTime asor_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        [NotMapped]
        public string usuarioModificacionNombre { get; set; }
        public DateTime? asor_FechaModificacion { get; set; }


    }
}
