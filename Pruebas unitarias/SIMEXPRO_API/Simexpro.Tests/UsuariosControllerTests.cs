using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Controllers.ControllersAcceso;
using Moq;
using SIMEXPRO.BussinessLogic;
using SIMEXPRO.BussinessLogic.Services.AccesoServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using SIMEXPRO.DataAccess.Repositories.Acce;
//using Simexpro.

namespace Simexpro.Tests
{
    public class UsuariosControllerTests
    {
        private readonly UsuariosController _usuariosController;
        private readonly Mock<TestAccesoServices> _accesoServices;
        //private readonly Mock<AccesoServices> _accesoServices;
        private readonly IMapper _mapper;

        public UsuariosControllerTests()
        {
            // Dependencies
            _accesoServices = new Mock<TestAccesoServices>();
            _mapper = A.Fake<IMapper>();

            //SUT
            _usuariosController = new UsuariosController(_accesoServices.Object, _mapper);

        }

       [Fact]
        public void GetUsuarios_DevuelveCorrectamenteSuccess()
        {
            // Arrange - ¿Qué necesito traer?
            //var usuariosServiceResult = A.Fake<ServiceResult>();
            ////A.CallTo(() => _accesoServices.ListarUsuarios(It.IsAny<bool?>())).Returns(usuariosServiceResult);
            //_accesoServices.Setup(x => x.ListarUsuarios(It.IsAny<bool?>())).Returns(usuariosServiceResult);

            // Act
            var result = _usuariosController.Index(true);

            // Assert - Acciones para chequear objetos
            result.Should().BeOfType<OkObjectResult>();
            //Assert.IsType<ServiceResult>(result);
        }

        [Fact]
        public void PostUsuarios_DevuelveCorrectamenteSuccess()
        {
            // Arrange - ¿Qué necesito traer?
            //var usuariosServiceResult = A.Fake<ServiceResult>();
            ////A.CallTo(() => _accesoServices.ListarUsuarios(It.IsAny<bool?>())).Returns(usuariosServiceResult);
            //_accesoServices.Setup(x => x.ListarUsuarios(It.IsAny<bool?>())).Returns(usuariosServiceResult);

            // Act
            var result = _usuariosController.Insertar(null);

            // Assert - Acciones para chequear objetos
            result.Should().BeOfType<OkObjectResult>();
            //Assert.IsType<ServiceResult>(result);
        }
    }

    public class TestAccesoServices : AccesoServices
    {
        public TestAccesoServices() : base(
            null, // Initialize with null or fake dependencies
            null,
            null,
            null,
            null)
        {
        }

        public ServiceResult ListarUsuarios(bool? empl_EsAduana)
        {
            // Implement a simplified behavior for testing
            var result = new ServiceResult();
            // Fill in with expected results or logic you want to test
            return result;
        }

        public ServiceResult InsertarUsuario(tbUsuarios item)
        {

            // Implement a simplified behavior for testing
            var result = new ServiceResult();
            // Fill in with expected results or logic you want to test
            return result;
        }

    }

}
