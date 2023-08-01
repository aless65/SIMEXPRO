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
    public class EmpleadosController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public EmpleadosController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }
        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarEmpleados();
            listado.Data = _mapper.Map<IEnumerable<EmpleadosViewModel>>(listado.Data);
            return Ok(listado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(EmpleadosViewModel empleadosViewModel)
        {
            var item = _mapper.Map<tbEmpleados>(empleadosViewModel);
            var respuesta = _generalesServices.InsertarEmpleados(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(EmpleadosViewModel empleadosViewModel)
        {
            var item = _mapper.Map<tbEmpleados>(empleadosViewModel);
            var respuesta = _generalesServices.ActualizarEmpleados(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(EmpleadosViewModel empleadosViewModel)
        {
            var item = _mapper.Map<tbEmpleados>(empleadosViewModel);
            var respuesta = _generalesServices.EliminarEmpleados(item);
            return Ok(respuesta);
        }
    }
}
