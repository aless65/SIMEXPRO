using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Gral
{
    public class MonedasRepository : IRepository<tbMonedas>
    {
        public RequestStatus Delete(tbMonedas item)
        {
            throw new NotImplementedException();
        }

        public tbMonedas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMonedas item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@mone_Codigo", item.mone_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@mone_Descripcion", item.mone_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mone_FechaCreacion", item.mone_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarMonedas, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbMonedas> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbMonedas>(ScriptsDataBase.ListarMonedas, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMonedas item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@mone_Id", item.mone_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mone_Codigo", item.mone_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@mone_Descripcion", item.mone_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mone_FechaCreacion", item.mone_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarMonedas, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}
