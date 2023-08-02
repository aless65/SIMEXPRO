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
    public class ModelosMaquinasController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public ModelosMaquinasController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }
        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarModelosMaquina();
            return Ok(listado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(ModelosMaquinaViewModel modelosMaquinaViewModel)
        {
            var item = _mapper.Map<tbModelosMaquina>(modelosMaquinaViewModel);
            var respuesta = _produccionServices.InsertarModelosMaquina(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(ModelosMaquinaViewModel modelosMaquinaViewModel)
        {
            var item = _mapper.Map<tbModelosMaquina>(modelosMaquinaViewModel);
            var respuesta = _produccionServices.ActualizarModelosMaquina(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ModelosMaquinaViewModel modelosMaquinaViewModel)
        {
            var item = _mapper.Map<tbModelosMaquina>(modelosMaquinaViewModel);
            var respuesta = _produccionServices.EliminarModelosMaquina(item);
            return Ok(respuesta);
        }

    }
}
