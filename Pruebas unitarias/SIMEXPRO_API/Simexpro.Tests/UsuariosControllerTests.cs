using AutoMapper;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Controllers.ControllersAcceso;
using SIMEXPRO.API.Models.ModelsAcceso;
using SIMEXPRO.BussinessLogic.Services.AccesoServices;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
//using Simexpro.

namespace Simexpro.Tests
{
    public class UsuariosControllerTests
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public UsuariosControllerTests(AccesoServices accesoServices, IMapper mapper)
        {
            _accesoServices = accesoServices;
            _mapper = mapper;
        }

       [Fact]
        public void GetUsuarios_DevuelveCorrectamenteAsync()
        {
            // Arrange 
            //var dataStore = A.Fake<ISimexproDataStore>();
            var usuarios = A.Fake<IEnumerable<UsuariosViewModel>>();
            A.CallTo(() => _accesoServices.ListarUsuarios(true)).Returns(usuarios);

            var controller = new UsuariosController(_accesoServices, _mapper);
            // Act
            var actionResult = controller.Index(false);

            //var result = actionResult.Result as OK
            // Assert
            actionResult.Should().BeOfType<Task<IActionResult>>();
        }
    }
}
