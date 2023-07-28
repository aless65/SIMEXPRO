﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models.ModelsAduana;
using SIMEXPRO.BussinessLogic.Services.EventoServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersAduanas
{
    [Route("api/[controller]")]
    [ApiController]
    public class AduanasController : ControllerBase
    {

        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public AduanasController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _aduanaServices.ListarAduanas();
            var mapped = _mapper.Map<IEnumerable<AduanasViewModel>>(listado);
            return Ok(mapped);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(AduanasViewModel aduanas)
        {
            var mapped = _mapper.Map<tbAduanas>(aduanas);
            var datos = _aduanaServices.InsertarAduanas(mapped);
            return Ok(datos);
        }

        [HttpPost("Editar")]
        public IActionResult Editar(AduanasViewModel aduanas)
        {
            var mapped = _mapper.Map<tbAduanas>(aduanas);
            var datos = _aduanaServices.ActualizarAduanas(mapped);
            return Ok(datos);
        }

        [HttpPost("Eliminar")]
        public IActionResult Eliminar(AduanasViewModel aduanas)
        {
            var mapped = _mapper.Map<tbAduanas>(aduanas);
            var datos = _aduanaServices.EliminarAduanas(mapped);
            return Ok(datos);
        }

    }
}
