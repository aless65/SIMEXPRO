using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Adua
{
    public class FacturasRepository : IRepository<tbFacturas>
    {
        public RequestStatus Delete(tbFacturas item)
        {
            throw new NotImplementedException();
        }

        public tbFacturas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbFacturas item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@deva_Id", item.deva_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@fact_Fecha", item.fact_Fecha, DbType.Date, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fact_FechaCreacion", item.fact_FechaCreacion, DbType.DateTime, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarFacturas, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }




        public IEnumerable<tbFacturas> List(tbFacturas item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@deva_Id", item.deva_Id, DbType.String, ParameterDirection.Input);
            return db.Query<tbFacturas>(ScriptsDataBase.ListarFacturas, parametros, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<tbFacturas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbFacturas item)
        {
            throw new NotImplementedException();
        }
    }
}
