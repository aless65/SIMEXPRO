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
    public class OrdenCompraController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public OrdenCompraController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }


        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarOrdenCompra();
            var listadoMapeado = _mapper.Map<IEnumerable<OrdenCompraViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insertar")]
        public IActionResult Insert(OrdenCompraViewModel ordenCompraViewModel)
        {
            var item = _mapper.Map<tbOrdenCompra>(ordenCompraViewModel);
            var respuesta = _produccionServices.InsertarOrdenCompra(item);
            return Ok(respuesta);
        }

        [HttpPost("Editar")]
        public IActionResult Update(OrdenCompraViewModel ordenCompraViewModel)
        {
            var item = _mapper.Map<tbOrdenCompra>(ordenCompraViewModel);
            var respuesta = _produccionServices.ActualizarOrdenCompra(item);
            return Ok(respuesta);
        }
    }
}
