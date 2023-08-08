﻿
using System;
using System.Collections.Generic;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbLugaresEmbarque
    {
        public tbLugaresEmbarque()
        {
            tbDeclaraciones_Valor = new HashSet<tbDeclaraciones_Valor>();
        }

        public int emba_Id { get; set; }
        public string emba_Codigo { get; set; }
        public string emba_Descripcion { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime emba_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? emba_FechaModificacion { get; set; }
        public int? usua_UsuarioEliminacion { get; set; }
        public DateTime? emba_FechaEliminacion { get; set; }
        public bool? emba_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioEliminacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbDeclaraciones_Valor> tbDeclaraciones_Valor { get; set; }
    }
}