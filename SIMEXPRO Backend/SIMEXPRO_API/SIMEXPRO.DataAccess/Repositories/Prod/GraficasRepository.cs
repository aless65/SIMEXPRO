using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Prod
{
    public class GraficasRepository
    {
        public IEnumerable<tbGraficas> Avance_Orden_Compra (tbGraficas item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@orco_Id", item.orco_Id, DbType.Int32, ParameterDirection.Input);
            var answer = db.Query<tbGraficas>(ScriptsDataBase.GR_AvanceOrdenCompraPorID, parametros, commandType: CommandType.StoredProcedure);
            return answer;
        }

        public IEnumerable<tbGraficas> ContadorOrdenesCompraPorEstado()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            var answer = db.Query<tbGraficas>(ScriptsDataBase.GR_ContadorOrdenesCompraPorEstado, null, commandType: CommandType.StoredProcedure);
            return answer;
        }

        public IEnumerable<tbGraficas> TotalOrdenesCompraAnual()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            var answer = db.Query<tbGraficas>(ScriptsDataBase.GR_TotalOrdenesCompraAnual, null, commandType: CommandType.StoredProcedure);
            return answer;
        }
        public IEnumerable<tbGraficas> TotalOrdenesCompraMensual()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            var answer = db.Query<tbGraficas>(ScriptsDataBase.GR_TotalOrdenesCompraMensual, null, commandType: CommandType.StoredProcedure);
            return answer;
        }
        public IEnumerable<tbGraficas> TotalOrdenesCompraDiario()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            var answer = db.Query<tbGraficas>(ScriptsDataBase.GR_TotalOrdenesCompraDiario, null, commandType: CommandType.StoredProcedure);
            return answer;
        }
    }
}
