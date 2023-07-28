using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models;
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
    public class PersonaNaturalController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public PersonaNaturalController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _aduanaServices.ListarPersonaNatural();
            var listadoMapeado = _mapper.Map<IEnumerable<PersonaNaturalViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(PersonaNaturalViewModel personaNaturalViewModel)
        {
            var item = _mapper.Map<tbPersonaNatural>(personaNaturalViewModel);
            var respuesta = _aduanaServices.InsertarPersonaNatural(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(PersonaNaturalViewModel personaNaturalViewModel)
        {
            var item = _mapper.Map<tbPersonaNatural>(personaNaturalViewModel);
            var respuesta = _aduanaServices.ActualizarPersonaNatural(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(PersonaNaturalViewModel personaNaturalViewModel)
        {
            var item = _mapper.Map<tbPersonaNatural>(personaNaturalViewModel);
            var respuesta = _aduanaServices.EliminarPersonaNatural(item);
            return Ok(respuesta);
        }
    }
}
