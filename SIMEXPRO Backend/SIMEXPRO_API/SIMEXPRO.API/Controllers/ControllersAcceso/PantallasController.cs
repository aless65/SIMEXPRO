using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.BussinessLogic.Services.AccesoServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersAcceso
{
    public class PantallasController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public PantallasController(AccesoServices accesoService, IMapper mapper)
        {
            _accesoServices = accesoService;
            _mapper = mapper;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
