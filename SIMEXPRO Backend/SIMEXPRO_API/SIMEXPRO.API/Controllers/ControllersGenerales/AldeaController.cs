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

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarAldeas();
            var listadoMapeado = _mapper.Map<IEnumerable<AldeasViewModel>>(listado.Data);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(AldeasViewModel aldeasViewModel)
        {
            var item = _mapper.Map<tbAldeas>(aldeasViewModel);
            var respuesta = _generalesServices.InsertarAldeas(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(AldeasViewModel aldeasViewModel)
        {
            var item = _mapper.Map<tbAldeas>(aldeasViewModel);
            var respuesta = _generalesServices.ActualizarAldeas(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(AldeasViewModel aldeasViewModel)
        {
            var item = _mapper.Map<tbAldeas>(aldeasViewModel);
            var respuesta = _generalesServices.EliminarAldeas(item);
            return Ok(respuesta);
        }
    }
}
