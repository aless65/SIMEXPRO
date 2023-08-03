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
    public class OrdenCompraDetallesController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public OrdenCompraDetallesController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }


        [HttpGet("Listar")]
        public IActionResult Index(tbOrdenCompraDetalles item)
        {
            var listado = _produccionServices.ListarOrdenCompraDetalles(item);
            var listadoMapeado = _mapper.Map<IEnumerable<OrdenCompraDetalleViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insertar")]
        public IActionResult Insert(OrdenCompraDetalleViewModel ordenCompraDetalleViewModel)
        {
            var item = _mapper.Map<tbOrdenCompraDetalles>(ordenCompraDetalleViewModel);
            var respuesta = _produccionServices.InsertarOrdenCompraDetalles(item);
            return Ok(respuesta);
        }

        [HttpPost("Editar")]
        public IActionResult Update(OrdeEnsaAcabEtiqViewModel ordenCompraDetalleViewModel)
        {
            var item = _mapper.Map<tbOrdenCompraDetalles>(ordenCompraDetalleViewModel);
            var respuesta = _produccionServices.ActualizarOrdenCompraDetalles(item);
            return Ok(respuesta);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(OrdenCompraDetalleViewModel ordenCompraDetalleViewModel)
        {
            var item = _mapper.Map<tbOrdenCompraDetalles>(ordenCompraDetalleViewModel);
            var respuesta = _produccionServices.EliminarOrdenCompraDetalles(item);
            return Ok(respuesta);
        }
    }
}
