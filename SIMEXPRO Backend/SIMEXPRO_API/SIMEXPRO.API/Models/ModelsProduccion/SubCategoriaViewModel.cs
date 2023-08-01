using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class SubCategoriaViewModel
    {
        public int subc_Id { get; set; }
        public int? cate_Id { get; set; }
        public string subc_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime subc_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? subc_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? subc_FechaEliminacion { get; set; }
        public bool? subc_Estado { get; set; }

    }
}
