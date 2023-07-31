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
    public class MaterialesController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public MaterialesController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarMateriales();
            var listadoMapeado = _mapper.Map<IEnumerable<MaterialesViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(MaterialesViewModel materialesViewModel)
        {
            var item = _mapper.Map<tbMateriales>(materialesViewModel);
            var respuesta = _produccionServices.InsertarMateriales(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(MaterialesViewModel materialesViewModel)
        {
            var item = _mapper.Map<tbMateriales>(materialesViewModel);
            var respuesta = _produccionServices.ActualizarMateriales(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(MaterialesViewModel materialesViewModel)
        {
            var item = _mapper.Map<tbMateriales>(materialesViewModel);
            var respuesta = _produccionServices.EliminarMateriales(item);
            return Ok(respuesta);
        }
    }
}
