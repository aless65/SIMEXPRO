using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class BoletinPagoViewModel
    {
        public int boen_Id { get; set; }
        public int liqu_Id { get; set; }
        public string duca_No_Duca { get; set; }
        public int tipl_Id { get; set; }
        public DateTime boen_FechaEmision { get; set; }
        public int esbo_Id { get; set; }
        public string boen_Observaciones { get; set; }
        public string boen_NDeclaracion { get; set; }
        //public string pena_RTN { get; set; }
        public string boen_Preimpreso { get; set; }
        public string boen_Declarante { get; set; }
        public decimal? boen_TotalPagar { get; set; }
        public decimal? boen_TotalGarantizar { get; set; }
        //public string boen_RTN { get; set; }
        public string boen_TipoEncabezado { get; set; }
        public int coim_Id { get; set; }
        public int copa_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime boen_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? boen_FechaModificacion { get; set; }
        public bool boen_Estado { get; set; }

    }
}
