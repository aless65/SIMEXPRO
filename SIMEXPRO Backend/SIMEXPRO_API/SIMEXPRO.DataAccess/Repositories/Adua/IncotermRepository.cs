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
    public class IncotermRepository : IRepository<tbIncoterm>
    {
        public RequestStatus Delete(tbIncoterm item)
        {
            throw new NotImplementedException();
        }

        public tbIncoterm Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbIncoterm item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@inco_Codigo", item.inco_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@inco_Descripcion", item.inco_Descripcion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@inco_FechaCreacion ", item.inco_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarIncoterm, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbIncoterm> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            return db.Query<tbIncoterm>(ScriptsDataBase.ListarIncoterm, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbIncoterm item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@inco_Id", item.inco_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@inco_Codigo", item.inco_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@inco_Descripcion", item.inco_Descripcion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@inco_FechaCreacion ", item.inco_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarIncoterm, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}
