using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models;
using SIMEXPRO.BussinessLogic.Services.GeneralServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersGenerales
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargosController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public CargosController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }

        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarCargos();
            var listadoMapeado = _mapper.Map<IEnumerable<CargosViewModel>>(listado.Data);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(CargosViewModel cargosViewModel)
        {
            var item = _mapper.Map<tbCargos>(cargosViewModel);
            var respuesta = _generalesServices.InsertarCargos(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(CargosViewModel cargosViewModel)
        {
            var item = _mapper.Map<tbCargos>(cargosViewModel);
            var respuesta = _generalesServices.ActualizarCargos(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(CargosViewModel cargosViewModel)
        {
            var item = _mapper.Map<tbCargos>(cargosViewModel);
            var respuesta = _generalesServices.EliminarCargos(item);
            return Ok(respuesta);
        }

    }
}
