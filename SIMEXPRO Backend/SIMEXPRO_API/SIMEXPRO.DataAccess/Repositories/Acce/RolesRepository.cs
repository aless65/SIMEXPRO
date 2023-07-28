using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Acce
{
    public class RolesRepository : IRepository<tbRoles>
    {
        public RequestStatus Delete(tbRoles item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
             parametros.Add("@usua_UsuarioEliminacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_FechaEliminacion", item.role_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EliminarRoles, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public tbRoles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRoles item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@role_Descripcion", item.role_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_FechaCreacion", item.role_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarCiudades, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbRoles> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbRoles>(ScriptsDataBase.ListarRoles, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbRoles item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_Descripcion", item.role_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacio", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@roleFechaModificacioN", item.role_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarRoles, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}
