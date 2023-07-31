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
    public class ProvinciasController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public ProvinciasController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarProvincias();
            var listadoMapeado = _mapper.Map<IEnumerable<ProvinciasViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(ProvinciasViewModel provinciasViewModel)
        {
            var item = _mapper.Map<tbProvincias>(provinciasViewModel);
            var respuesta = _generalesServices.InsertarProvincias(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(ProvinciasViewModel provinciasViewModel)
        {
            var item = _mapper.Map<tbProvincias>(provinciasViewModel);
            var respuesta = _generalesServices.ActualizarProvincias(item);
            return Ok(respuesta);
        }


    }
}
