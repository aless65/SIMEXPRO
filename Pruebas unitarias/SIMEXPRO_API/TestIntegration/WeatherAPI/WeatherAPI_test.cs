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
        public async Task GetTratados() 
        {
            UnitTestService.Weather.WeatherAPI weatherAPI = new UnitTestService.Weather.WeatherAPI();
            var reasonPhrase = await weatherAPI.Get_Tratados();
            Assert.AreEqual("OK", reasonPhrase);
        
        }

        [Test]
        [Category("APITests")]
        public async Task InsertTratado()
        {
            UnitTestService.Weather.WeatherAPI weatherAPI = new UnitTestService.Weather.WeatherAPI();
            var reasonPhrase = await weatherAPI.Post_TratadosInsertar();
            Assert.AreEqual("OK", reasonPhrase);

        }

        [Test]
        [Category("APITests")]
        public async Task UpdateTratado()
        {
            UnitTestService.Weather.WeatherAPI weatherAPI = new UnitTestService.Weather.WeatherAPI();
            var reasonPhrase = await weatherAPI.Post_TratadosEditar();
            Assert.AreEqual("OK", reasonPhrase);

        }

    }
}
