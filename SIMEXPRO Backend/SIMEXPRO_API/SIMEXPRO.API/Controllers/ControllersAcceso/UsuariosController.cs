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

        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _accesoServices.ListarUsuarios();
            var mapped = _mapper.Map<IEnumerable<tbUsuarios>>(listado);
            return Ok(listado);
        }

        [HttpGet("Login")]
        public IActionResult InicioSesion(string usua_Nombre, string usua_Contrasenia)
        {

            var respuesta = _accesoServices.IniciarSesion(usua_Nombre, usua_Contrasenia);

            if (respuesta.Code == 200)
            {
                respuesta.Data = _mapper.Map<UsuariosViewModel>(respuesta.Data);

                return Ok(respuesta);

            }
            else
            {
                return StatusCode(203, respuesta);
            }
        }



        [HttpPost("Insertar")]
        public IActionResult Insertar(UsuariosViewModel usuarios)
        {
            var mapped = _mapper.Map<tbUsuarios>(usuarios);
            var datos = _accesoServices.InsertarUsuario(mapped);
            return Ok(datos);
        }

        [HttpPost("Editar")]
        public IActionResult Editar(UsuariosViewModel usuarios)
        {
            var mapped = _mapper.Map<tbUsuarios>(usuarios);
            var datos = _accesoServices.ActualizarUsuario(mapped);
            return Ok(datos);
        }

        [HttpPost("Eliminar")]
        public IActionResult Eliminar(UsuariosViewModel usuarios)
        {
            var mapped = _mapper.Map<tbUsuarios>(usuarios);
            var datos = _accesoServices.DeleteUsuario(mapped);
            return Ok(datos);
        }
    }
}
