﻿using AutoMapper;
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
    public class PedidosOrdenController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public PedidosOrdenController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult Index(tbOrdenCompraDetalles item)
        {
            var listado = _produccionServices.ListarOrdenCompraDetalles(item);
            var listadoMapeado = _mapper.Map<IEnumerable<PedidosOrdenViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(PedidosOrdenViewModel pedidosOrdenViewModel)
        {
            var item = _mapper.Map<tbPedidosOrden>(pedidosOrdenViewModel);
            var respuesta = _produccionServices.InsertarPedidosOrden(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(PedidosOrdenViewModel pedidosOrdenViewModel)
        {
            var item = _mapper.Map<tbPedidosOrden>(pedidosOrdenViewModel);
            var respuesta = _produccionServices.ActualizarPedidosOrden(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(PedidosOrdenViewModel pedidosOrdenViewModel)
        {
            var item = _mapper.Map<tbPedidosOrden>(pedidosOrdenViewModel);
            var respuesta = _produccionServices.EliminarPedidosOrden(item);
            return Ok(respuesta);
        }
    }
}