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
    public class ItemsController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public ItemsController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }

        [HttpGet("Listar")]
        public IActionResult Index(int fact_Id)
        {
            //var item = _mapper.Map<tbItems>(concepto);
            var respuesta = _aduanaServices.ListarItems(fact_Id);

            return Ok(respuesta);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(ItemsViewModel concepto)
        {
            var item = _mapper.Map<tbItems>(concepto);

            var respuesta = _aduanaServices.InsertarItems(item);

            return Ok(respuesta);
        }

        [HttpPost("Editar")]
        public IActionResult Update(ItemsViewModel concepto)
        {
            var item = _mapper.Map<tbItems>(concepto);

            var respuesta = _aduanaServices.ActualizarItems(item);

            return Ok(respuesta);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(ItemsViewModel concepto)
        {
            var item = _mapper.Map<tbItems>(concepto);

            var respuesta = _aduanaServices.EliminarItems(item);

            return Ok(respuesta);
        }
    }
}
