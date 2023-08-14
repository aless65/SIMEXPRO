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
    public class ReporteModuloDiaDetalleRepository : IRepository<tbReporteModuloDiaDetalle>
    {
       

        public RequestStatus Delete(tbReporteModuloDiaDetalle item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@rdet_Id", item.rdet_Id, DbType.Int32, ParameterDirection.Input);
              
            var answer = db.QueryFirst<int>(ScriptsDataBase.EliminarReporteModuloDiaDetalle, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public tbReporteModuloDiaDetalle Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbReporteModuloDiaDetalle item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@remo_Id", item.remo_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@rdet_TotalDia", item.rdet_TotalDia, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@rdet_TotalDanado", item.rdet_TotalDanado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@code_Id", item.code_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarReporteModuloDiaDetalle, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbReporteModuloDiaDetalle> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbReporteModuloDiaDetalle>(ScriptsDataBase.ListarReporteModuloDiaDetalle, null, commandType: CommandType.StoredProcedure);
        }


        public RequestStatus Update(tbReporteModuloDiaDetalle item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@rdet_Id", item.rdet_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@remo_Id", item.remo_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@rdet_TotalDia", item.rdet_TotalDia, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@rdet_TotalDanado", item.rdet_TotalDanado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@code_Id", item.code_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarReporteModuloDiaDetalle, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}
