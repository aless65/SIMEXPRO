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
    public class PedidosProduccionDetallesController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public PedidosProduccionDetallesController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }


        //[HttpGet("Listado")]
        //public IActionResult Index(PedidosProduccionDetalleViewModel pedidosProduccionDetalleViewModel)
        //{
        //    var listado = _produccionServices.ListarPedidosProduccioDetalles(pedidosProduccionDetalleViewModel.ppro_Id);
        //    var listadoMapeado = _mapper.Map<IEnumerable<PedidosProduccionDetalleViewModel>>(listado);
        //    return Ok(listadoMapeado);
        //}


        [HttpPost("Insert")]
        public IActionResult Insert(PedidosProduccionDetalleViewModel pedidosProduccionDetalleViewModel)
        {
            var item = _mapper.Map<tbPedidosProduccionDetalles>(pedidosProduccionDetalleViewModel);
            var respuesta = _produccionServices.InsertarPedidosProduccioDetalles(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(PedidosProduccionDetalleViewModel pedidosProduccionDetalleViewModel)
        {
            var item = _mapper.Map<tbPedidosProduccionDetalles>(pedidosProduccionDetalleViewModel);
            var respuesta = _produccionServices.ActualizarPedidosProduccioDetalles(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(PedidosProduccionDetalleViewModel pedidosProduccionDetalleViewModel)
        {
            var item = _mapper.Map<tbPedidosProduccionDetalles>(pedidosProduccionDetalleViewModel);
            var respuesta = _produccionServices.EliminarPedidosProduccioDetalles(item);
            return Ok(respuesta);
        }
    }
}