using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class GraficasViewModel
    {
        // DATOS PARA LA GRAFICA DE AVANCES ORDEN DE COMPRA
        public int orco_Id { get; set; }
        public DateTime orco_FechaEmision { get; set; }
        public DateTime orco_FechaLimite { get; set; }
        public string orco_Avance { get; set; }
        public int clie_Id { get; set; }
        public string clie_Nombre_O_Razon_Social { get; set; }
        public string clie_Direccion { get; set; }
        public string clie_RTN { get; set; }
        public string clie_Nombre_Contacto { get; set; }
        public string clie_Numero_Contacto { get; set; }
        public string clie_Correo_Electronico { get; set; }
        public string clie_FAX { get; set; }

        // DATOS PARA LA GRAFICA TOTAL ORDENES COMPRA ANUALES
        public int orco_Conteo { get; set; }
        public DateTime orco_FechaCreacion { get; set; }
    }
}
