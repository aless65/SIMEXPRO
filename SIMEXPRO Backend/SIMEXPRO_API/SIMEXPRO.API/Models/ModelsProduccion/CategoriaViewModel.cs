using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class CategoriaViewModel
    {
        public int cate_Id { get; set; }
        public string cate_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime cate_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? cate_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? cate_FechaEliminacion { get; set; }
        public bool? cate_Estado { get; set; }

    }
}
