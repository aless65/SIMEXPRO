using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SIMEXPRO.API.Controllers.ControllersAduanas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestUnit.Service;
using Xunit;

namespace TestUnit.Controller
{
    public class TratadosControllerTest
    {
        private readonly TratadosLibreComercioController _tratadosLibreComercioController;
        private readonly Mock<TestAduanaService> _aduanaService;
        private readonly IMapper _mapper;

        public TratadosControllerTest()
        {
            // Dependencies
            _aduanaService = new Mock<TestAduanaService>();
            _mapper = A.Fake<IMapper>();

            //SUT
            _tratadosLibreComercioController = new TratadosLibreComercioController(_aduanaService.Object, _mapper);

        }

        [Fact]
        public void GetTratados_DevuelveCorrectamenteSuccess()
        {
            var result = _tratadosLibreComercioController.Listar();

            result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void PostTratadosInsertar_DevuelveCorrectamenteSuccess()
        {
            var result = _tratadosLibreComercioController.Insertar(null);

            result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void PostTratadosEditar_DevuelveCorrectamenteSuccess()
        {
            var result = _tratadosLibreComercioController.Update(null);

            result.Should().BeOfType<OkObjectResult>();
        }

    }
}
