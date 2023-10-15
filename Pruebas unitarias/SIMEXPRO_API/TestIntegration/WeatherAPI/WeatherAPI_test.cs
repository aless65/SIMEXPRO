using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTestService.Weather;


namespace UnitTest.WeatherAPI
{
    public class WeatherAPI_test
    {
        [Test]
        [Category("APITests")]
        public async Task API_Test() 
        {
            UnitTestService.Weather.WeatherAPI weatherAPI = new UnitTestService.Weather.WeatherAPI();
            var reasonPhrase = await weatherAPI.Get_ReasonPhrase();
            Assert.AreEqual("OK", reasonPhrase);
        
        }
    }
}
