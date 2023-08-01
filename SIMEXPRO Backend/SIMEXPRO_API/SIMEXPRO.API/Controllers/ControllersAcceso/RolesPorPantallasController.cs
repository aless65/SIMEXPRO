﻿using AutoMapper;
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

    public class RolesPorPantallasController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public RolesPorPantallasController(AccesoServices accesoService, IMapper mapper)
        {
            _accesoServices = accesoService;
            _mapper = mapper;
        }

        [HttpPost("Listado")]
        public IActionResult Index(int role_Id)
        {
            tbRolesXPantallas rolesPantalla = new tbRolesXPantallas();
            rolesPantalla.role_Id = role_Id;
            var listado = _accesoServices.Pantallas_Por_Rol(rolesPantalla);
            var mapped = _mapper.Map<IEnumerable<RolesPorPantallasViewModel>>(listado);
            return Ok(mapped);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(RolesPorPantallasViewModel rolesPantalla)
        {
            var mapped = _mapper.Map<tbRolesXPantallas>(rolesPantalla);
            var datos = _accesoServices.InsertarRolxPantalla(mapped);
            return Ok(datos);
        }

        [HttpPost("Editar")]
        public IActionResult Editar(RolesPorPantallasViewModel rolesPantalla)
        {
            var mapped = _mapper.Map<tbRolesXPantallas>(rolesPantalla);
            var datos = _accesoServices.ActualizarRolxPantalla(mapped);
            return Ok(datos);
        }

        [HttpPost("Eliminar")]
        public IActionResult Eliminar(RolesPorPantallasViewModel rolesPantalla)
        {
            var mapped = _mapper.Map<tbRolesXPantallas>(rolesPantalla);
            var datos = _accesoServices.DeleteRolxPantalla(mapped);
            return Ok(datos);
        }
    }
}