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
    public class AldeaController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public AldeaController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }

        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarAldeas();
            listado.Data = _mapper.Map<IEnumerable<AldeasViewModel>>(listado.Data);
            return Ok(listado);
        }


        [HttpPost("Insertar")]
        public IActionResult Insert(AldeasViewModel aldeasViewModel)
        {
            var item = _mapper.Map<tbAldeas>(aldeasViewModel);
            var respuesta = _generalesServices.InsertarAldeas(item);
            return Ok(respuesta);
        }


        [HttpPost("Editar")]
        public IActionResult Update(AldeasViewModel aldeasViewModel)
        {
            var item = _mapper.Map<tbAldeas>(aldeasViewModel);
            var respuesta = _generalesServices.ActualizarAldeas(item);
            return Ok(respuesta);
        }

        [HttpPost("FiltrarPorCiudades")]
        public IActionResult AldeasPorCiudades(AldeasViewModel aldeasViewModel)
        {
            var item = _mapper.Map<tbAldeas>(aldeasViewModel);
            var respuesta = _generalesServices.AldeasPorCiudades(item);
            return Ok(respuesta);
        }

    }
}
