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
    public class TransporteController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public TransporteController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _aduanaServices.ListarTransporte();
            var listadoMapeado = _mapper.Map<IEnumerable<TransportesViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(TransportesViewModel transportesViewModel)
        {
            var item = _mapper.Map<tbTransporte>(transportesViewModel);
            var respuesta = _aduanaServices.InsertarTransporte(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(TransportesViewModel transportesViewModel)
        {
            var item = _mapper.Map<tbTransporte>(transportesViewModel);
            var respuesta = _aduanaServices.ActualizarTransporte(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(TransportesViewModel transportesViewModel)
        {
            var item = _mapper.Map<tbTransporte>(transportesViewModel);
            var respuesta = _aduanaServices.EliminarTransporte(item);
            return Ok(respuesta);
        }
    }
}
