
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbComercianteIndividual
    {
        public tbComercianteIndividual()
        {
            tbDocumentosContratos = new HashSet<tbDocumentosContratos>();
        }

        public int coin_Id { get; set; }
        public int pers_Id { get; set; }


        public int fopr_Id { get; set; }

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

        public virtual tbColonias coin_ColoniaRepresentanteNavigation { get; set; }
        public virtual tbColonias colo { get; set; }
        public virtual tbPersonas pers { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbDocumentosContratos> tbDocumentosContratos { get; set; }
    }
}