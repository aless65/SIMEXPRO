using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class LotesViewModel
    {
        public int lote_Id { get; set; }
        public int mate_Id { get; set; }
        public int unme_Id { get; set; }
        public int lote_Stock { get; set; }
        public int lote_CantIngresada { get; set; }
        public string lote_Observaciones { get; set; }
        public int tipa_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime lote_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? lote_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? lote_FechaEliminacion { get; set; }
        public bool? lote_Estado { get; set; }

    }
}
