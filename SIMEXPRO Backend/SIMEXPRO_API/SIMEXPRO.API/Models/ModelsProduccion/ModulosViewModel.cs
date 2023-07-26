using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class ModulosViewModel
    {
        public int modu_Id { get; set; }
        public string modu_Nombre { get; set; }
        public int proc_Id { get; set; }
        public int empr_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime modu_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? modu_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? modu_FechaEliminacion { get; set; }
        public bool? modu_Estado { get; set; }



    }
}
