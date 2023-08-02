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
    public class ReporteModuloDiaDetalleController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public ReporteModuloDiaDetalleController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarReporteModuloDiaDetalle();
            var listadoMapeado = _mapper.Map<IEnumerable<ReporteModuloDiaDetalleViewModel>>(listado);
            return Ok(listadoMapeado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ReporteModuloDiaDetalleViewModel ReporteModuloDiaDetalleViewModel)
        {
            var item = _mapper.Map<tbReporteModuloDiaDetalle>(ReporteModuloDiaDetalleViewModel);
            var respuesta = _produccionServices.InsertarReporteModuloDiaDetalle(item);
            return Ok(respuesta);
        }

        [HttpPost("Editar")]
        public IActionResult Editar(ReporteModuloDiaDetalleViewModel ReporteModuloDiaDetalleViewModel)
        {
            var item = _mapper.Map<tbReporteModuloDiaDetalle>(ReporteModuloDiaDetalleViewModel);
            var respuesta = _produccionServices.ActualizarReporteModuloDiaDetalle(item);
            return Ok(respuesta);
        }
    }
}
