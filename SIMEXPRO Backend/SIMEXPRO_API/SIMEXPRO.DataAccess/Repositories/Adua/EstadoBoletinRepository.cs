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
    public class EstadoBoletinRepository : IRepository<tbEstadoBoletin>
    {
        public RequestStatus Delete(tbEstadoBoletin item)
        {
            throw new NotImplementedException();
        }

        public tbEstadoBoletin Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEstadoBoletin item)
        {

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parameters = new DynamicParameters();

            parameters.Add("@duca_No_Correlativo_Referencia", item.esbo_Descripcion, DbType.String, ParameterDirection.Input);
            parameters.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@esbo_FechaCreacion", item.esbo_FechaCreacion, DbType.DateTime, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.InsertarEstadoBoletin, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado insert"
            };

            return request;
        }

        public IEnumerable<tbEstadoBoletin> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            return db.Query<tbEstadoBoletin>(ScriptsDataBase.ListarEstadoBoletin, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEstadoBoletin item)
        {
            throw new NotImplementedException();
        }
    }
}
