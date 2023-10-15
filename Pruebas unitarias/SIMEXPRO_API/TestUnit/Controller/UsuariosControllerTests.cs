using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SIMEXPRO.API.Controllers.ControllersAcceso;
using SIMEXPRO.BussinessLogic;
using SIMEXPRO.BussinessLogic.Services.AccesoServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using TestUnit.Service;

namespace TestUnit
{
    public class UsuariosControllerTests
    {
        private readonly UsuariosController _usuariosController;
        private readonly Mock<TestAccesoService> _accesoServices;
        private readonly IMapper _mapper;

        public UsuariosControllerTests()
        {
            // Dependencies
            _accesoServices = new Mock<TestAccesoService>();
            _mapper = A.Fake<IMapper>();

            //SUT
            _usuariosController = new UsuariosController(_accesoServices.Object, _mapper);

        }

        //[Fact]
        //public void GetUsuarios_DevuelveCorrectamenteSuccess()
        //{
        //    var result = _usuariosController.Index(true);

        //    result.Should().BeOfType<OkObjectResult>();
        //}

        //[Fact]
        //public void PostUsuarios_DevuelveCorrectamenteSuccess()
        //{
        //    var result = _usuariosController.Insertar(null);

        //    result.Should().BeOfType<OkObjectResult>();
        //}
    }

}
