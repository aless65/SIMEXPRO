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
    public class TransporteRepository : IRepository<tbTransporte>
    {
        public RequestStatus Delete(tbTransporte item)
        {
            throw new NotImplementedException();
        }

        public tbTransporte Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbTransporte item)
        {
            RequestStatus result = new();

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pais_Id", item.pais_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tran_Chasis", item.tran_Chasis, DbType.String, ParameterDirection.Input);
            parametros.Add("@marca_Id", item.marca_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tran_IdRemolques", item.tran_Remolque, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.InsertarCargos, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<tbTransporte> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbTransporte item)
        {
            throw new NotImplementedException();
        }
    }
}
