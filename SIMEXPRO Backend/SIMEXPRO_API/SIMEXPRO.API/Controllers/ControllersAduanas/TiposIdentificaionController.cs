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
    public class TiposIdentificaionController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public TiposIdentificaionController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _aduanaServices.ListarTiposIdentificacion();
            var listadoMapeado = _mapper.Map<IEnumerable<TiposIdentificacionViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(TiposIdentificacionViewModel tiposIdentificacionViewModel)
        {
            var item = _mapper.Map<tbTiposIdentificacion>(tiposIdentificacionViewModel);
            var respuesta = _aduanaServices.InsertarTiposIdentificacion(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(TiposIdentificacionViewModel tiposIdentificacionViewModel)
        {
            var item = _mapper.Map<tbTiposIdentificacion>(tiposIdentificacionViewModel);
            var respuesta = _aduanaServices.ActualizarTiposIdentificacion(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(TiposIdentificacionViewModel tiposIdentificacionViewModel)
        {
            var item = _mapper.Map<tbTiposIdentificacion>(tiposIdentificacionViewModel);
            var respuesta = _aduanaServices.EliminarTiposIdentificacion(item);
            return Ok(respuesta);
        }
    }
}
