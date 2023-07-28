using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models;
using SIMEXPRO.API.Models.ModelsAduana;
using SIMEXPRO.BussinessLogic.Services.EventoServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersAduanas
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoLiquidacionController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public TipoLiquidacionController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var listado = _aduanaServices.ListarTipoLiquidacion();
            var listadoMapeado = _mapper.Map<IEnumerable<TipoLiquidacionViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(TipoLiquidacionViewModel tipoLiquidacionViewModel)
        {
            var item = _mapper.Map<tbTipoLiquidacion>(tipoLiquidacionViewModel);
            var respuesta = _aduanaServices.InsertarTipoLiquidacion(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(TipoLiquidacionViewModel tipoLiquidacionViewModel)
        {
            var item = _mapper.Map<tbTipoLiquidacion>(tipoLiquidacionViewModel);
            var respuesta = _aduanaServices.ActualizarTipoLiquidacion(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(TipoLiquidacionViewModel tipoLiquidacionViewModel)
        {
            var item = _mapper.Map<tbTipoLiquidacion>(tipoLiquidacionViewModel);
            var respuesta = _aduanaServices.EliminarTipoLiquidacion(item);
            return Ok(respuesta);
        }
    }
}
