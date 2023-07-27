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
            throw new NotImplementedException();
        }

        public tbUsuarios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbUsuarios> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

    }
}
