using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class OrdeEnsaAcabEtiqViewModel
    {
        public int ensa_Id { get; set; }
        public int ensa_Cantidad { get; set; }
        public int empl_Id { get; set; }
        public int code_Id { get; set; }
        public DateTime ensa_FechaInicio { get; set; }
        public DateTime ensa_FechaLimite { get; set; }
        public int ppro_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime ensa_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? ensa_FechaModificacion { get; set; }
        public bool? ensa_Estado { get; set; }
        [NotMapped]
        public string empl_NombreCompleto { get; set; }
        [NotMapped]
        public string usua_UsurioCreacion { get; set; }
        [NotMapped]
        public string usua_UsurioModificacion { get; set; }
        [NotMapped]
        public string code_Sexo { get; set; }
        [NotMapped]
        public string esti_Id { get; set; }
        [NotMapped]
        public string esti_Descripcion { get; set; }


    }
}
