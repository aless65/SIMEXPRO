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
    public class AldeasRepository : IRepository<tbAldeas>
    {
        public RequestStatus Delete(tbAldeas item)
        {
            throw new NotImplementedException();
        }

        public tbAldeas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbAldeas item)
        {
            RequestStatus result = new();

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@alde_Nombre", item.alde_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@ciud_Id", item.ciud_Id , DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@alde_FechaCreacion", item.alde_FechaCreacion, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarAldeas, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbAldeas> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbAldeas>(ScriptsDataBase.ListarAldeas, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbAldeas item)
        {
            RequestStatus result = new();

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@alde_Id", item.alde_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@alde_Nombre", item.alde_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@ciud_Id", item.ciud_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@alde_FechaCreacion", item.alde_FechaCreacion, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarAldeas, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}
