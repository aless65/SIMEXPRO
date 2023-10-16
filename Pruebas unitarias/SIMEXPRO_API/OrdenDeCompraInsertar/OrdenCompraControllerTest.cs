using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NSubstitute;
using SIMEXPRO.API.Controllers.ControllersProduccion;
using SIMEXPRO.BussinessLogic;
using SIMEXPRO.BussinessLogic.Services.ProduccionServices;
using SIMEXPRO.DataAccess;
using SIMEXPRO.DataAccess.Repositories.Prod;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace OrdenDeCompraInsertar
{
    public class OrdenCompraControllerTest
    {
        OrdenCompraRepository _OrdenCompraRepository = new();

        [Fact]
        public void Test1()
        {
            tbOrdenCompra datos = new()
            {
            orco_IdCliente=1,
            orco_FechaEmision= new DateTime(2023, 10, 16, 01, 15, 00),
            orco_FechaLimite= new DateTime(2023, 10, 16, 01, 15, 00),
            orco_MetodoPago=1,
            orco_Materiales=true,
            orco_IdEmbalaje=1,
            orco_EstadoOrdenCompra="C",
            orco_DireccionEntrega="sdksk", 
            usua_UsuarioCreacion=1,  
            orco_FechaCreacion= new DateTime(2023, 10, 16, 01, 15, 00),    
            orco_Codigo ="2212", 
            };

            RequestStatus result=  _OrdenCompraRepository.Insert(datos);

            Assert.Equal(23, result.CodeStatus);//El numero que recibe depende del autoincrementable que baya en la BD.el loquito de alex puso esa vaina asi 
            //y no se porque 
        }
    }

}
