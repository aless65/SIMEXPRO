using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models.ModelsAcceso;
using SIMEXPRO.BussinessLogic.Services.AccesoServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersAcceso
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public UsuariosController(AccesoServices accesoService, IMapper mapper)
        {
            _accesoServices = accesoService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("Login")]
        public IActionResult InicioSesion(string usua_Nombre, string usua_Contrasenia)
        {

            var respuesta = _accesoServices.IniciarSesion(usua_Nombre, usua_Contrasenia);

            if(respuesta.Code == 200)
            {
                respuesta.Data = _mapper.Map<UsuariosViewModel>(respuesta.Data);

                return Ok(respuesta);

            }
            else
            {
                //HttpContext.Items["StatusCode"] = 502;
                return Unauthorized(respuesta);
            }
        }
    }
}
