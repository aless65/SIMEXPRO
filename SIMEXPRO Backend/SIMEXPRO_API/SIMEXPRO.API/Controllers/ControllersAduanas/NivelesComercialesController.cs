﻿using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.BussinessLogic.Services.EventoServices;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SIMEXPRO.API.Models.ModelsAduana;
using SIMEXPRO.Entities.Entities;

namespace SIMEXPRO.API.Controllers.ControllersAduanas
{
    [Route("api/[controller]")]
    [ApiController]
    public class NivelesComercialesController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public NivelesComercialesController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }
        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var respuesta = _aduanaServices.ListarNivelesComerciales();

            if (respuesta.Code == 200)
            {
                return Ok(respuesta);
            }
            else
            {
                return BadRequest(respuesta);
            }
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(NivelesComercialesViewModel concepto)
        {
            var item = _mapper.Map<tbNivelesComerciales>(concepto);

            var respuesta = _aduanaServices.InsertarNivelesComerciales(item);

            if (respuesta.Code == 200)
            {
                return Ok(respuesta);
            }
            else
            {
                return BadRequest(respuesta);
            }
        }

        [HttpPost("Editar")]
        public IActionResult Update(NivelesComercialesViewModel concepto)
        {
            var item = _mapper.Map<tbNivelesComerciales>(concepto);

            var respuesta = _aduanaServices.ActualizarNivelesComerciales(item);

            if (respuesta.Code == 200)
            {
                return Ok(respuesta);
            }
            else
            {
                return BadRequest(respuesta);
            }
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(NivelesComercialesViewModel concepto)
        {
            var item = _mapper.Map<tbNivelesComerciales>(concepto);

            var respuesta = _aduanaServices.EliminarNivelesComerciales(item);

            if (respuesta.Code == 200)
            {
                return Ok(respuesta);
            }
            else
            {
                return BadRequest(respuesta);
            }
        }
    }
}
