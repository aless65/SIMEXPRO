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
    public class OficinasController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public OficinasController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }
        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarOficinas();
            var listadoMapeado = _mapper.Map<IEnumerable<OficinasViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(OficinasViewModel oficinasViewModel)
        {
            var item = _mapper.Map<tbOficinas>(oficinasViewModel);
            var respuesta = _generalesServices.InsertarOficinas(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(OficinasViewModel oficinasViewModel)
        {
            var item = _mapper.Map<tbOficinas>(oficinasViewModel);
            var respuesta = _generalesServices.ActualizarOficinas(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(OficinasViewModel oficinasViewModel)
        {
            var item = _mapper.Map<tbOficinas>(oficinasViewModel);
            var respuesta = _generalesServices.EliminarOficinas(item);
            return Ok(respuesta);
        }
    }
}
