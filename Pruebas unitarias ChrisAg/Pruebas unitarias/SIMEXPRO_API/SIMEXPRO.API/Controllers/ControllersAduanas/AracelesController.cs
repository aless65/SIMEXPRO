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
    public class ArancelesController : ControllerBase
    {

        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public ArancelesController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }

        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _aduanaServices.ListarAranceles();
            listado.Data = _mapper.Map<IEnumerable<ArancelesViewModel>>(listado.Data);
            return Ok(listado);
        }

        [HttpGet("ListarFiltrado")]
        public IActionResult ListarFiltrado(string codigo)
        {
            var listado = _aduanaServices.ListarArancelesFiltrado(codigo);
            listado.Data = _mapper.Map<IEnumerable<ArancelesViewModel>>(listado.Data);
            return Ok(listado);
        }
        
        [HttpGet("ListarCapitulo")]
        public IActionResult ListarCapitulo(string codigo)
        {
            var listado = _aduanaServices.ListarArancelesCapitulo(codigo);
            listado.Data = _mapper.Map<IEnumerable<ArancelesViewModel>>(listado.Data);
            return Ok(listado);
        }

        [HttpGet("ListarById")]
        public IActionResult ListarArancelById(int aran_Id)
        {
            var listado = _aduanaServices.ListarArancelById(aran_Id);
            listado.Data = _mapper.Map<IEnumerable<ArancelesViewModel>>(listado.Data);
            return Ok(listado);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(ArancelesViewModel aranceles)
        {
            var mapped = _mapper.Map<tbAranceles>(aranceles);
            var datos = _aduanaServices.InsertarAranceles(mapped);
            return Ok(datos);
        }

        [HttpPost("Editar")]
        public IActionResult Editar(ArancelesViewModel aranceles)
        {
            var mapped = _mapper.Map<tbAranceles>(aranceles);
            var datos = _aduanaServices.ActualizarAranceles(mapped);
            return Ok(datos);
        }

        [HttpGet("Categorias")]
        public IActionResult Categorias(string aran_Codigo)
        {
            var datos = _aduanaServices.BuscarCategoriaArancel(aran_Codigo);
            return Ok(datos);
        }

        //[HttpPost("Eliminar")]
        //public IActionResult Eliminar(ArancelesViewModel aranceles)
        //{
        //    var mapped = _mapper.Map<tbAranceles>(aranceles);
        //    var datos = _aduanaServices.EliminarAranceles(mapped);
        //    return Ok(datos);
        //}

    }
}
