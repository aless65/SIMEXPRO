using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models.ModelsProduccion;
using SIMEXPRO.BussinessLogic.Services.ProduccionServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersProduccion
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public ClientesController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarClientes();
            var listadoMapeado = _mapper.Map<IEnumerable<ClientesViewModel>>(listado);
            return Ok(listadoMapeado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ClientesViewModel clientesViewModel)
        {
            var item = _mapper.Map<tbClientes>(clientesViewModel);
            var respuesta = _produccionServices.InsertarClientes(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(ClientesViewModel clientesViewModel)
        {
            var item = _mapper.Map<tbClientes>(clientesViewModel);
            var respuesta = _produccionServices.ActualizarClientes(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ClientesViewModel clientesViewModel)
        {
            var item = _mapper.Map<tbClientes>(clientesViewModel);
            var respuesta = _produccionServices.EliminarClientes(item);
            return Ok(respuesta);
        }
    }
}
