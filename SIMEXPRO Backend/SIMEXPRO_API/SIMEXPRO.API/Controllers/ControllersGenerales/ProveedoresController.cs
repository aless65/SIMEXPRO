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
    public class ProveedoresController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public ProveedoresController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarProveedores();
            var listadoMapeado = _mapper.Map<IEnumerable<ProveedoresViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(ProveedoresViewModel proveedoresViewModel)
        {
            var item = _mapper.Map<tbProveedores>(proveedoresViewModel);
            var respuesta = _generalesServices.InsertarProveedores(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]
        public IActionResult Update(ProveedoresViewModel proveedoresViewModel)
        {
            var item = _mapper.Map<tbProveedores>(proveedoresViewModel);
            var respuesta = _generalesServices.ActualizarProveedores(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(ProveedoresViewModel proveedoresViewModel)
        {
            var item = _mapper.Map<tbProveedores>(proveedoresViewModel);
            var respuesta = _generalesServices.EliminarProveedores(item);
            return Ok(respuesta);
        }
    }
}
