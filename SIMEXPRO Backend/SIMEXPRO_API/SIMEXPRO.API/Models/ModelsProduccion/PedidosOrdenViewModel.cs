using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class PedidosOrdenViewModel
    {
        public int peor_Id { get; set; }
        public int? prov_Id { get; set; }
        public string peor_No_Duca { get; set; }
        public DateTime? peor_FechaEntrada { get; set; }
        public string peor_Obsevaciones { get; set; }
        public bool? peor_DadoCliente { get; set; }
        public bool? peor_Est { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime peor_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? peor_FechaModificacion { get; set; }
        public bool? peor_Estado { get; set; }

    }
}
