using AutoMapper;
using SIMEXPRO.API.Controllers.ControllersAcceso;
using SIMEXPRO.BussinessLogic.Services.AccesoServices;
using System;
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
        public void GetUsuarios_DevuelveCorrectamente()
        {
            // Arrange 
            //var dataStore = A.Fake<ISimexproDataStore>();
            var controller = new UsuariosController(_accesoServices, _mapper);
            // Act
            var actionResult = controller.Index(false);

            // Assert
        }
    }
}
