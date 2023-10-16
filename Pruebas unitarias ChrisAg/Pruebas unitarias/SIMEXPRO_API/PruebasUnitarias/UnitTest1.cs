using AutoMapper;
using Moq;
using SIMEXPRO.API.Models.ModelsAduana;
using SIMEXPRO.BusinessLogic.Services.UnitTestingServices;
using SIMEXPRO.BussinessLogic;
using SIMEXPRO.BussinessLogic.Services.EventoServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;


namespace PruebasUnitarias
{
    public class UnitTest1
    {
        //[Fact]
        //public void Test1()
        //{
        //    metodo metodo = new metodo();
        //    var result = metodo.List();
        //    Console.WriteLine(result);
        //    Assert.NotNull(result);
        //    Assert.True(result.Count() > 2, "No tiene mas de 2 registros pipipipip");
        //}

        //[Fact]
        //public void Test2()
        //{
        //    metodo metodo = new metodo();
        //    var listado = metodo.Aduanas();
        //    Assert.NotNull(listado);
        //}

        [Fact]
        public void PruebaMetodo()
        {
            var simulado = new Mock<AduanaServices>();
            simulado.Setup(item => item.ListarAduanas()).Returns(new ServiceResult().Ok(new List<tbAduanas>()));

            var result = simulado.Object.ListarAduanas();

            Assert.NotNull(result);
        }

    }
}
