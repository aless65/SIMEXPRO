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
    public class ReporteModuloDiaController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public ReporteModuloDiaController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarReporteModuloDia();
            var listadoMapeado = _mapper.Map<IEnumerable<ReporteModuloDiaViewModel>>(listado);
            return Ok(listadoMapeado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ReporteModuloDiaViewModel ReporteModuloDiaViewModel)
        {
            var item = _mapper.Map<tbReporteModuloDia>(ReporteModuloDiaViewModel);
            var respuesta = _produccionServices.InsertarReporteModuloDia(item);
            return Ok(respuesta);
        }


    }
}
