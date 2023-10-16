using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.BusinessLogic.Services.UnitTestingServices;
using SIMEXPRO.BussinessLogic;
using SIMEXPRO.BussinessLogic.Services.EventoServices;
using SIMEXPRO.DataAccess;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PruebasUnitarias
{
    public class metodo
    {

        private readonly UnitTestingServices _unitTestingServices;

        public metodo(UnitTestingServices unitTestingServices)
        {
            _unitTestingServices = unitTestingServices;
        }

        public IEnumerable<tbAduanas> List()
        {
            string con = "data source=simexproserver.database.windows.net; initial catalog=SIMEXPRO; user id=admin1; password=Administracion_123";
            using var db = new SqlConnection(con);
            var parametros = new DynamicParameters();
            return db.Query<tbAduanas>(ScriptsDataBase.ListarAduanas, null, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<tbAduanas> Aduanas()
        {
            var list = new List<tbAduanas>
            {
                new tbAduanas { adua_Id = 1, adua_Nombre = "aduana 1" },
                new tbAduanas { adua_Id = 2, adua_Nombre = "aduana 2" }
            };

            return list;
        }

        public dynamic Prueba() 
        {
           
            var lista = _unitTestingServices.ListarAduanas();

            return lista;
        }
    }
}
