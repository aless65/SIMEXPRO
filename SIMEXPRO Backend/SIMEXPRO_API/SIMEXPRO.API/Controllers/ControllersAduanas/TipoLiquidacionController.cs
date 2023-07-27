﻿using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.BussinessLogic.Services.EventoServices;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersAduanas
{
    public class TipoLiquidacionController : Controller
    {
        private readonly AduanaServices _aduanaServices;
        private readonly IMapper _mapper;

        public TipoLiquidacionController(AduanaServices AduanaServices, IMapper mapper)
        {
            _aduanaServices = AduanaServices;
            _mapper = mapper;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
