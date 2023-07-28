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
    public class UsuariosRepository : IRepository<tbUsuarios>
    {
        public tbUsuarios Login(string usua_Nombre, string usua_Contrasenia)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@usua_Nombre", usua_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_Contrasenia", usua_Contrasenia, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<tbUsuarios>(ScriptsDataBase.IniciarSesion, parametros, commandType: CommandType.StoredProcedure);
            return resultado;
        }

        public RequestStatus Delete(tbUsuarios item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@usua_Id", item.usua_Nombre, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioEliminacion", item.usua_UsuarioEliminacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_FechaEliminacion ", item.usua_FechaEliminacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarRoles, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public tbUsuarios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
             parametros.Add("@usua_Nombre", item.usua_Nombre, DbType.String, ParameterDirection.Input);
             parametros.Add("@usua_Contrasenia", item.usua_Contrasenia, DbType.String, ParameterDirection.Input);
             parametros.Add("@usua_Correo", item.usua_Correo, DbType.String, ParameterDirection.Input);
             parametros.Add("@empl_Id", item.empl_Id, DbType.Int32, ParameterDirection.Input);
             parametros.Add("@usua_Image", item.usua_Image, DbType.String, ParameterDirection.Input);
             parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
             parametros.Add("@usua_EsAdmin", item.usua_Image, DbType.Int32, ParameterDirection.Input);
             parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
             parametros.Add("@usua_FechaCreacion ", item.usua_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarRoles, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbUsuarios> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbUsuarios>(ScriptsDataBase.ListarUsuarios, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbUsuarios item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@usua_Id", item.usua_Nombre, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_Nombre", item.usua_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_Contrasenia", item.usua_Contrasenia, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_Correo", item.usua_Correo, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Id", item.empl_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_Image", item.usua_Image, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_EsAdmin", item.usua_Image, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacio", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_FechaModificacion ", item.usua_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarRoles, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

    }
}
