using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models;
using SIMEXPRO.BussinessLogic.Services;
using SIMEXPRO.BussinessLogic.Services.GeneralServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]

    public class EstadosCivilesController : ControllerBase
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public EstadosCivilesController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }


        [HttpGet("ListarEstadosCiviles")]
        public IActionResult ListarEstadosCiviles()
        {
            var list = _generalesServices.ListarEstadosCiviles();

            return Ok(list);
        }

        //[HttpPost("InsertarEstadoCivil")]
        //public IActionResult InsertarEstadoCivil(EstadosCivilesViewModel item)
        //{
        //    var item2 = _mapper.Map<tbEstadosCiviles>(item);
        //    var response = _generalesServices.InsertarEstadoCivil(item2);
        //    return Ok(response);
        //}

        //[HttpPost("ActualizarEstadoCivil")]
        //public IActionResult ActualizarEstadoCivil(EstadosCivilesViewModel item)
        //{
        //    var item2 = _mapper.Map<tbEstadosCiviles>(item);
        //    var response = _generalesServices.ActualizarEstadoCivil(item2);
        //    return Ok(response);
        //}

        //[HttpPost("ListarDetallesEstadosCiviles")]
        //public IActionResult ListarDetallesEstadosCiviles(EstadosCivilesViewModel item)
        //{
        //    var item2 = _mapper.Map<tbEstadosCiviles>(item);
        //    var response = _generalesServices.ListarDetallesEstadosCiviles(item2);
        //    return Ok(response);
        //}
    }
}
