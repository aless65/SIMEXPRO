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
    public class LotesController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public LotesController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarLotes();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(LotesViewModel lotesViewModel)
        {
            var item = _mapper.Map<tbLotes>(lotesViewModel);
            var respuesta = _produccionServices.InsertarLotes(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(LotesViewModel lotesViewModel)
        {
            var item = _mapper.Map<tbLotes>(lotesViewModel);
            var respuesta = _produccionServices.ActualizarLotes(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(LotesViewModel lotesViewModel)
        {
            var item = _mapper.Map<tbLotes>(lotesViewModel);
            var respuesta = _produccionServices.EliminarLotes(item);
            return Ok(respuesta);
        }

    }
}
