using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Weather
{
    internal class WeatherAPI
    {
        private HttpClient restClient = new HttpClient();
        private string URI = "https://api.weather.gov/alerts?area=MN&severity=severe";

        public async Task<string> get_ReasonPhrase()
        { 
        
            //Build the URI
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept", "text/html,application/xhtml,apllication/xml");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept-Encoding", "gzip, deflate");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent","Mozilla/5.0 (Windows NT 6.2; WOW64; )");

        }
    }
}
