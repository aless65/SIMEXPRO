using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.BussinessLogic.Services.GeneralServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersGenerales
{
    public class PaisesController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public PaisesController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarPaises();
            var listadoMapeado = _mapper.Map<IEnumerable<PaisesViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(PaisesViewModel paisesViewModel)
        {
            var item = _mapper.Map<tbPaises>(paisesViewModel);
            var respuesta = _generalesServices.InsertarPaises(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(PaisesViewModel paisesViewModel)
        {
            var item = _mapper.Map<tbPaises>(paisesViewModel);
            var respuesta = _generalesServices.ActualizarPaises(item);
            return Ok(respuesta);
        }

        //[HttpPost("Delete")]
        //public IActionResult Delete(PaisesViewModel paisesViewModel)
        //{
        //    var item = _mapper.Map<tbPaises>(paisesViewModel);
        //    var respuesta = _generalesServices.EliminarPaises(item);
        //    return Ok(respuesta);
        //}
    }
}
