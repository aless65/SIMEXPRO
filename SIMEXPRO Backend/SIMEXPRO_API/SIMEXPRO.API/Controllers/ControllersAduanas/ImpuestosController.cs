using Microsoft.AspNetCore.Mvc;
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

    public class ImpuestosController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;
        
        public ImpuestosController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }
        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _aduanaServices.ListarImpuestos();
            var listadoMapeado = _mapper.Map<IEnumerable<ImpuestosViewModel>>(listado.Data);
            return Ok(listadoMapeado);
        }
        [HttpPost("Insert")]
        public IActionResult Insert(ImpuestosViewModel impuestosViewModel)
        {
            var item = _mapper.Map<tbImpuestos>(impuestosViewModel);
            var respuesta = _aduanaServices.InsertarImpuestos(item);
            return Ok(respuesta);
        }
        [HttpPost("Update")]
        public IActionResult Update(ImpuestosViewModel impuestosViewModel)
        {
            var item = _mapper.Map<tbImpuestos>(impuestosViewModel);
            var respuesta = _aduanaServices.ActualizarImpuestos(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ImpuestosViewModel impuestosViewModel)
        {
            var item = _mapper.Map<tbImpuestos>(impuestosViewModel);
            var respuesta = _aduanaServices.EliminarImpuestos(item);
            return Ok(respuesta);
        }

    }
}
