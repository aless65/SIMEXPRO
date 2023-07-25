using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersGenerales
{
    public class PaisesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
