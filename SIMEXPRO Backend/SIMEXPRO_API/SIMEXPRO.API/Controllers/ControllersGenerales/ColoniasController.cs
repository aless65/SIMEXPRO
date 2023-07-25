using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.BussinessLogic.Services.GeneralServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersGenerales
{
    public class ColoniasController : Controller
    {
        private readonly GeneralServices _generalesServices;
        private readonly IMapper _mapper;

        public ColoniasController(GeneralServices generalesService, IMapper mapper)
        {
            _generalesServices = generalesService;
            _mapper = mapper;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
