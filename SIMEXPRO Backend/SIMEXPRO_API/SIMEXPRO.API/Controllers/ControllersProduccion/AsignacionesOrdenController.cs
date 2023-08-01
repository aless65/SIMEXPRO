using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models.ModelsProduccion;
using SIMEXPRO.BussinessLogic.Services.ProduccionServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersProduccion
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignacionesOrdenController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public AsignacionesOrdenController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarAsignacionOrden();
            var listadoMapeado = _mapper.Map<IEnumerable<AsignacionesOrdenViewModel>>(listado.Data);
            return Ok(listadoMapeado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(AsignacionesOrdenViewModel asignacionesOrden)
        {
            var item = _mapper.Map<tbAsignacionesOrden>(asignacionesOrden);
            var respuesta = _produccionServices.InsertarAsignacionOrden(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(AsignacionesOrdenViewModel asignacionesOrden)
        {
            var item = _mapper.Map<tbAsignacionesOrden>(asignacionesOrden);
            var respuesta = _produccionServices.ActualizarAsignacionOrden(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(AsignacionesOrdenViewModel asignacionesOrden)
        {
            var item = _mapper.Map<tbAsignacionesOrden>(asignacionesOrden);
            var respuesta = _produccionServices.EliminarAsignacionOrden(item);
            return Ok(respuesta);
        }
    }
}
