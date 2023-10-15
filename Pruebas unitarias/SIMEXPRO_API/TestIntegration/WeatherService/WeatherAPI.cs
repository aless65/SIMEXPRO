using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestService.Weather
{
    public class WeatherAPI
    {
        private HttpClient restClient = new HttpClient();
        private string URI = "https://practicaacademia.somee.com/api/Duca/Listar";

        public async Task<string> Get_ReasonPhrase()
        {

            //Construir la URI
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept", "text/html,application/xhtml,application/xml");
            //restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept", ",application / json, text / plain, */*");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accep/Encoding", "gzip, deflate");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("User/Agent", "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept-Charset", "ISO-8859-1");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("XApiKey", "4b567cb1c6b24b51ab55248f8e66e5cc");

            //Haciendo el llamado al endpint 
            var response = await restClient.GetAsync(URI);
            //var response = await restClient.PostAsync(URI);

            //Leer el ReasonPhrase del response 
            var reasonPhrase = response.ReasonPhrase.ToString();
            
            
            return reasonPhrase;

        }
    }
}
