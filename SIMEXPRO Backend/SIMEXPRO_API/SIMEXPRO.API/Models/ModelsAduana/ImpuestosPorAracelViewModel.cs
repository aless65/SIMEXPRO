using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class ImpuestosPorAracelViewModel
    {
        public int imar_Id { get; set; }
        public int impu_Id { get; set; }
        public int aran_Id { get; set; }

        [NotMapped]
        public string DescripcionImpuesto { get; set; }

        [NotMapped]
        public string DescripcionArancel { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime imar_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? imar_FechaModificacion { get; set; }

        [NotMapped]
        public string UsuarioCreacionNombre { get; set; }

        [NotMapped]
        public string UsuarioModificacionNombre { get; set; }

        public bool? imar_Estado { get; set; }
    }
}
