using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NSubstitute;
using NUnit.Framework;
using SIMEXPRO.API.Controllers.ControllersProduccion;
using SIMEXPRO.BussinessLogic;
using SIMEXPRO.BussinessLogic.Services.ProduccionServices;
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
        private OrdenCompraServicesTest ordenCompraServices;
        private OrdenCompraRequest      ordenCompraRequest;

        [SetUp]
        public void SetUp()
        {
            ordenCompraServices = Substitute.For<OrdenCompraServicesTest>();
            ordenCompraRequest = new OrdenCompraRequest()
            {
                Name = "Cristian",
                Age = 30
                // acá van las vainas q se rellenan en el swagger
            };
        }

        [TestCase(HttpStatusCode.OK)]
        [TestCase(HttpStatusCode.InternalServerError)]
        public async Task Insertar_Orden_Compra(HttpStatusCode code)
        {
            //Arrange
            GenericResponse response = new GenericResponse()
            {
                HttpCode = code
            };

            //Act
            ordenCompraServices.Insertar(OrdenCompraRequest).ReturnsForAnyArgs(response);
            OrdenCompraController controller = new OrdenCompraController(ordenCompraServices);
            ObjectResult responseController = (ObjectResult)await controller.Insertar(OrdenCompraRequest);

            //Assert
            Assert.AreEqual((int)code, responseController.StatusCode.Value);
        }
    }

}
