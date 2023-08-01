﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.BussinessLogic.Services.GeneralServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersGenerales
{
    public class Oficio_ProfesionesController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public Oficio_ProfesionesController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }
        public IActionResult Index()
        {
            var listado = _generalesServices.ListarOficio_Profesiones();
            var listadoMapeado = _mapper.Map<IEnumerable<Oficio_ProfesionesViewModel>>(listado);
            return Ok(listadoMapeado);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(Oficio_ProfesionesViewModel oficio_ProfesionesViewModel)
        {
            var item = _mapper.Map<tbOficio_Profesiones>(oficio_ProfesionesViewModel);
            var respuesta = _generalesServices.InsertarOficio_Profesiones(item);
            return Ok(respuesta);
        }


        [HttpPost("Update")]
        public IActionResult Update(Oficio_ProfesionesViewModel oficio_ProfesionesViewModel)
        {
            var item = _mapper.Map<tbOficio_Profesiones>(oficio_ProfesionesViewModel);
            var respuesta = _generalesServices.ActualizarOficio_Profesiones(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(Oficio_ProfesionesViewModel oficio_ProfesionesViewModel)
        {
            var item = _mapper.Map<tbOficio_Profesiones>(oficio_ProfesionesViewModel);
            var respuesta = _generalesServices.EliminarOficio_Profesiones(item);
            return Ok(respuesta);
        }
    }
}
