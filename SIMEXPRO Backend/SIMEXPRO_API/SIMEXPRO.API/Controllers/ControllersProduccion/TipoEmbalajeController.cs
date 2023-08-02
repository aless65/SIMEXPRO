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
    public class TipoEmbalajeController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public TipoEmbalajeController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarTipoEmbalaje();
            var listadoMapeado = _mapper.Map<IEnumerable<TipoEmbalajeViewModel>>(listado);
            return Ok(listadoMapeado);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(TipoEmbalajeViewModel TipoEmbalajeViewModel)
        {
            var item = _mapper.Map<tbTipoEmbalaje>(TipoEmbalajeViewModel);
            var respuesta = _produccionServices.InsertarTipoEmbalaje(item);
            return Ok(respuesta);
        }

        [HttpPost("Editar")]
        public IActionResult Editar(TipoEmbalajeViewModel TipoEmbalajeViewModel)
        {
            var item = _mapper.Map<tbTipoEmbalaje>(TipoEmbalajeViewModel);
            var respuesta = _produccionServices.ActualizarTipoEmbalaje(item);
            return Ok(respuesta);
        }

        [HttpPost("Eliminar")]
        public IActionResult Eliminar(TipoEmbalajeViewModel TipoEmbalajeViewModel)
        {
            var item = _mapper.Map<tbTipoEmbalaje>(TipoEmbalajeViewModel);
            var respuesta = _produccionServices.EliminarTipoEmbalaje(item);
            return Ok(respuesta);
        }
    }
}
