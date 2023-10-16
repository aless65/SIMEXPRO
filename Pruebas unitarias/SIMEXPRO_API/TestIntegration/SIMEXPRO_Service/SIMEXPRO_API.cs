using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace TestIntegration.SIMEXPRO_Service
{

    public class ApiResponse
    {
        public int type { get; set; }
        public int code { get; set; }
        public bool success { get; set; }
        public string message { get; set; }
        public Usuario data { get; set; }
        public string reasonPhrase { get; set; }
    }

    public class Usuario
    {
        public int usua_Id { get; set; }
        public string usua_Nombre { get; set; }
        public string empl_CorreoElectronico { get; set; }
        public bool empl_EsAduana { get; set; }
        public string usua_Image { get; set; }
        public string usua_EsAdmin { get; set; }

    }

    public class SIMEXPRO_API
    {
        private HttpClient restClient = new HttpClient();
        private string URI = "https://practicaacademia.somee.com/api/Usuarios/Login";

        public async Task<ApiResponse> GetUserData(string usuario, string contrasenia)
        {
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept", "text/html,application/xhtml,application/xml");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept-Encoding", "gzip, deflate");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept-Charset", "ISO-8859-1");
            restClient.DefaultRequestHeaders.TryAddWithoutValidation("XApiKey", "4b567cb1c6b24b51ab55248f8e66e5cc");

            // JSON para enviar en el cuerpo de la solicitud
            var jsonData = $@"{{
              ""usua_Nombre"": ""{usuario}"",
              ""usua_Contrasenia"": ""{contrasenia}""
            }}";

            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            var response = await restClient.PostAsync(URI, content);

            if (response.StatusCode.ToString() == "OK")
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<ApiResponse>(responseContent);

                Console.WriteLine("Nombre de usuario: " + data.data.usua_Nombre);
                Console.WriteLine("Correo electrónico: " + data.data.empl_CorreoElectronico);
                Console.WriteLine("Es Aduana?: " + data.data.empl_EsAduana);
                Console.WriteLine("Foto de Perfil: " + data.data.usua_Image);
                Console.WriteLine("Es Admin?: " + data.data.usua_EsAdmin);

                var reasonPhrase = response.ReasonPhrase;

                return new ApiResponse { reasonPhrase = reasonPhrase, data = data.data };
            }
            else
            {
                var reasonPhrase = response.StatusCode;
                return new ApiResponse { reasonPhrase = reasonPhrase.ToString(), data = null };
                ;
            }
        }
    }

}   
