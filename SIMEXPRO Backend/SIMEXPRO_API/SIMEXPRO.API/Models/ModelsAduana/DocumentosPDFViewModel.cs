using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class DocumentosPDFViewModel
    {
        public int dpdf_Id { get; set; }
        public int deva_Id { get; set; }
        public string dpdf_CA { get; set; }
        public string dpdf_DVA { get; set; }
        public string dpdf_DUCA { get; set; }
        public string dpdf_Boletin { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime dpdf_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? dpdf_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? dpdf_FechaEliminacion { get; set; }
        public bool? dpdf_Estado { get; set; }
    }
}
