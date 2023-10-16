using Dapper;
using SIMEXPRO.DataAccess;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestIntegration.SIMEXPRO_API_test
{
    public class Repository
    {
        public IEnumerable<tbAduanas> List()
        {
            string conexion = "data source=simexproserver.database.windows.net; initial catalog=SIMEXPRO; user id=admin1; password=Administracion_123";
            using var db = new SqlConnection(conexion);
            var parametros = new DynamicParameters();
            return db.Query<tbAduanas>(ScriptsDataBase.ListarAduanas, null, commandType: CommandType.StoredProcedure);
        }
    }
}
