﻿
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SIMEXPRO.Entities.Entities
{
    public partial class tbProcesoPorOrdenCompraDetalle
    {
        public tbProcesoPorOrdenCompraDetalle()
        {
            tbOrdenCompraDetalles = new HashSet<tbOrdenCompraDetalles>();
            tbProcesos = new HashSet<tbProcesos>();
        }

        public int poco_Id { get; set; }
        public int code_Id { get; set; }
        public int proc_Id { get; set; }

        [NotMapped]
        public string proc_Descripcion { get; set; }

        [NotMapped]
        public string proc_CodigoHTML { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime poco_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? poco_FechaModificacion { get; set; }
        public bool? code_Estado { get; set; }

        public virtual tbProcesos proc { get; set; }
        public virtual tbOrdenCompraDetalles code { get; set; }
        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }

        public virtual ICollection<tbOrdenCompraDetalles> tbOrdenCompraDetalles { get; set; }
        public virtual ICollection<tbProcesos> tbProcesos { get; set; }



    }
}