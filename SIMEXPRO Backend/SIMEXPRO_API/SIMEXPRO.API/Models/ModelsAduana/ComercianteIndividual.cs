using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsAduana
{
    public class ComercianteIndividual
    {
        public int coin_Id { get; set; }
        public int pers_Id { get; set; }
        public bool pers_FormaRepresentacion { get; set; }
        public int colo_Id { get; set; }

        [NotMapped]
        public string colo_Nombre { get; set; }
        public string coin_PuntoReferencia { get; set; }
        public int coin_ColoniaRepresentante { get; set; }
        public string coin_NumeroLocalReprentante { get; set; }
        public string coin_PuntoReferenciaReprentante { get; set; }
        public string coin_TelefonoCelular { get; set; }
        public string coin_TelefonoFijo { get; set; }
        public string coin_CorreoElectronico { get; set; }
        public string coin_CorreoElectronicoAlternativo { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime coin_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? coin_FechaModificacion { get; set; }
        public bool? coin_Estado { get; set; }
    }
}
