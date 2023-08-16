using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class ModelosMaquinaViewModel
    {
        public int mmaq_Id { get; set; }
        public string mmaq_Nombre { get; set; }
        public int marq_Id { get; set; }
        [NotMapped]
        public string marq_Nombre { get; set; }
        public int func_Id { get; set; }
        [NotMapped]
        public string func_Nombre { get; set; }
        public string mmaq_Imagen { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioCreacionNombre { get; set; }
        public DateTime mmaq_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        [NotMapped]
        public string UsuarioModificacionNombre { get; set; }
        public DateTime? mmaq_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        [NotMapped]
        public string usuarioEliminacionNombre { get; set; }
        public DateTime? mmaq_FechaEliminacion { get; set; }
        public bool? mmaq_Estado { get; set; }

        public string MarcaMaquina { get; set; }
        public string FuncionMaquina { get; set; }

    }
}
