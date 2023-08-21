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
    public class GraficasController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public GraficasController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpPost("AvanceOrdenCompra")]
        public IActionResult AvanceOrdenCompra(GraficasViewModel item)
        {
            var data = _mapper.Map<tbGraficas>(item);
            var listado = _produccionServices.Avance_Orden_Compra(data);
            return Ok(listado);
        }

        [HttpGet("TotalOrdenesCompraAnual")]
        public IActionResult TotalOrdenesCompraAnual()
        {
            var listado = _produccionServices.TotalOrdenesCompraAnual();
            listado.Data = _mapper.Map<IEnumerable<GraficasViewModel>>(listado.Data);
            return Ok(listado);
        }

        [HttpGet("ContadorOrdenesCompraPorEstado")]
        public IActionResult ContadorOrdenesCompraPorEstado()
        {
            var listado = _produccionServices.ContadorOrdenesCompraPorEstado();
            listado.Data = _mapper.Map<IEnumerable<GraficasViewModel>>(listado.Data);
            return Ok(listado);
        }
    }
}
