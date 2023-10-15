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
        private readonly AccesoServices _accesoServices;
        //private readonly Mock<AccesoServices> _accesoServices;
        private readonly IMapper _mapper;

        public UsuariosControllerTests()
        {
            // Dependencies
            //PantallasRepository pantallasRepository = A.Fake<PantallasRepository>();
            //RolesRepository rolesRepository = A.Fake<RolesRepository>();
            //RolesPorPantallaRepository rolesPorPantallaRepository = A.Fake<RolesPorPantallaRepository>();
            //UsuariosRepository usuariosRepository = A.Fake<UsuariosRepository>();
            //UsuariosHistorialRepository usuariosHistorialRepository = A.Fake<UsuariosHistorialRepository>();

            //_accesoServices = new Mock<AccesoServices>(
            //    pantallasRepository,
            //    rolesRepository,
            //    rolesPorPantallaRepository,
            //    usuariosRepository,
            //    usuariosHistorialRepository
            //);
            //_accesoServices = accesoServices;
            _accesoServices = A.Fake<AccesoServices>();
            _mapper = A.Fake<IMapper>();

            //SUT
            _usuariosController = new UsuariosController(_accesoServices, _mapper);

        }

       [Fact]
        public void GetUsuarios_DevuelveCorrectamenteSuccess()
        {
            // Arrange - ¿Qué necesito traer?
            var usuariosServiceResult = A.Fake<ServiceResult>();
            A.CallTo(() => _accesoServices.ListarUsuarios(It.IsAny<bool?>())).Returns(usuariosServiceResult);
            //_accesoServices.Setup(x => x.ListarUsuarios(It.IsAny<bool?>())).Returns(usuariosServiceResult);

            // Act
            var result = _usuariosController.Index(true);

            // Assert - Acciones para chequear objetos
            result.Should().BeOfType<IActionResult>();
            //Assert.IsType<ServiceResult>(result);
        }
    }
}
