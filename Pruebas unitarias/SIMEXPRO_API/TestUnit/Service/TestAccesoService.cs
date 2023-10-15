using SIMEXPRO.BussinessLogic.Services.AccesoServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestUnit.Service
{
    public class TestAccesoService : AccesoServices
    {
        public TestAccesoService() : base(
            null, // Initialize with null or fake dependencies
            null,
            null,
            null,
            null)
        {
        }
    }
}
