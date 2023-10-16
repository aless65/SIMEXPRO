using NUnit.Framework;
using System;
using System.Collections.Generic;
//using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SIMEXPRO_API
{
    public class SIMEXPRO_API
    {
        [Test]
        [Category("APITests")]
        public async Task API_TestUsuarioCorrecto()
        {
            TestIntegration.SIMEXPRO_Service.SIMEXPRO_API _API = new TestIntegration.SIMEXPRO_Service.SIMEXPRO_API();
            
            var response = await _API.GetUserData("Juan","123");

            Assert.IsNotNull(response.data.usua_Id, "Usuario Correcto");

        }

        [Test]
        [Category("APITests")]
        public async Task API_TestUsuarioIncorrecto()
        {
            TestIntegration.SIMEXPRO_Service.SIMEXPRO_API _API = new TestIntegration.SIMEXPRO_Service.SIMEXPRO_API();
            var response = await _API.GetUserData("Jua", "123");
            Assert.IsNotNull(response.data, "Usuario o Contraseña Incorrecto");

        }
    }
}
