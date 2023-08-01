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
    public class MaterialesBrindarController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public MaterialesBrindarController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _produccionServices.ListarMaterialesBrindados();
            return Ok(listado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(MaterialesBrindarViewModel materialesBrindarViewModel)
        {
            var item = _mapper.Map<tbMaterialesBrindar>(materialesBrindarViewModel);
            var respuesta = _produccionServices.InsertarMaterialesBrindados(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(MaterialesBrindarViewModel materialesBrindarViewModel)
        {
            var item = _mapper.Map<tbMaterialesBrindar>(materialesBrindarViewModel);
            var respuesta = _produccionServices.ActualizarMaterialesBrindados(item);
            return Ok(respuesta);
        }

        

    }
}
