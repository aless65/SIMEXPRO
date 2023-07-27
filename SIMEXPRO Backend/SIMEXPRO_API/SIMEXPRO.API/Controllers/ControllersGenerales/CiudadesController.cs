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
    public class CiudadesController : ControllerBase
    {

        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public CiudadesController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarCiudades();
            var listadoMapeado = _mapper.Map<IEnumerable<CiudadesViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(CiudadesViewModel CiudadesViewModel)
        {
            var item = _mapper.Map<tbCiudades>(CiudadesViewModel);
            var respuesta = _generalesServices.InsertarCiudades(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(CiudadesViewModel CiudadesViewModel)
        {
            var item = _mapper.Map<tbCiudades>(CiudadesViewModel);
            var respuesta = _generalesServices.ActualizarCiudades(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(CiudadesViewModel ciudadesViewModel)
        {
            var item = _mapper.Map<tbCiudades>(ciudadesViewModel);
            var respuesta = _generalesServices.EliminarCiudades(item);
            return Ok(respuesta);
        }
    }
}
