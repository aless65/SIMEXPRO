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
    public class MaquinasController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public MaquinasController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarMaquinas();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(MaquinasViewModel maquinasViewModel)
        {
            var item = _mapper.Map<tbMaquinas>(maquinasViewModel);
            var respuesta = _produccionServices.InsertarMaquinas(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(MaquinasViewModel maquinasViewModel)
        {
            var item = _mapper.Map<tbMaquinas>(maquinasViewModel);
            var respuesta = _produccionServices.ActualizarMaquinas(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(MaquinasViewModel maquinasViewModel)
        {
            var item = _mapper.Map<tbMaquinas>(maquinasViewModel);
            var respuesta = _produccionServices.EliminarMaquinas(item);
            return Ok(respuesta);
        }

    }
}
