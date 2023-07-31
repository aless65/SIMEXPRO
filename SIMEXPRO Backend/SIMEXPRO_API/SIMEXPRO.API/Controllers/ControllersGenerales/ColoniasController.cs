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
    public class ColoniasController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public ColoniasController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarColonias();
            var listadoMapeado = _mapper.Map<IEnumerable<ColoniasViewModel>>(listado.Data);
            return Ok(listadoMapeado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ColoniasViewModel coloniasViewModel)
        {
            var item = _mapper.Map<tbColonias>(coloniasViewModel);
            var respuesta = _generalesServices.InsertarColonias(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(ColoniasViewModel coloniasViewModel)
        {
            var item = _mapper.Map<tbColonias>(coloniasViewModel);
            var respuesta = _generalesServices.ActualizarColonias(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ColoniasViewModel coloniasViewModel)
        {
            var item = _mapper.Map<tbColonias>(coloniasViewModel);
            var respuesta = _generalesServices.EliminarColonias(item);
            return Ok(respuesta);
        }
    }
}
