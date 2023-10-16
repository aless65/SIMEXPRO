using SIMEXPRO.DataAccess;
using SIMEXPRO.DataAccess.Repositories.Prod;
using SIMEXPRO.Entities.Entities;
using System;
using Xunit;

namespace OrdenDeCompraInsertar
{
    public class OrdenCompraControllerTest
    {
        OrdenCompraRepository _OrdenCompraRepository = new();

        
        public void Test1()
        {
            tbOrdenCompra datos = new()
            {
            orco_IdCliente=1,
            orco_FechaEmision= new DateTime(2023, 10, 16, 01, 15, 00),
            orco_FechaLimite= new DateTime(2023, 10, 16, 01, 15, 00),
            orco_MetodoPago=1,
            orco_Materiales=false,
            orco_IdEmbalaje=1,
            orco_EstadoOrdenCompra="C",
            orco_DireccionEntrega="sdksk", 
            usua_UsuarioCreacion=1,  
            orco_FechaCreacion= new DateTime(2023, 10, 16, 01, 15, 00),    
            orco_Codigo ="2212VA23NICEWASWD", 
            };
        }
    }

}
