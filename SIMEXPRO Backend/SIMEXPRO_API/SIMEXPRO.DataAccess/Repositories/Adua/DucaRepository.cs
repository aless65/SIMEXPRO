using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.DataAccess.Context;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Adua
{
    public class DucaRepository : IRepository<tbDuca>
    {
        public RequestStatus Delete(tbDuca item)
        {
            throw new NotImplementedException();
        }

        public tbDuca Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDuca item)
        {

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parameters = new DynamicParameters();


            var resultado = db.QueryFirst<int>(ScriptsDataBase.InsertarDucaTAP1, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Duca"
            };

            return request;
        }

        public RequestStatus InsertTap2(tbDuca item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parameters = new DynamicParameters();
        

            var resultado = db.QueryFirst<int>(ScriptsDataBase.InsertarDucaTAP2, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Duca"
            };

            return request;
        }

        public RequestStatus InsertTap3(tbDuca item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parameters = new DynamicParameters();


            var resultado = db.QueryFirst<int>(ScriptsDataBase.InsertarDucaTAP3, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Duca"
            };

            return request;
        }

        public IEnumerable<tbDuca> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            return db.Query<tbDuca>(ScriptsDataBase.ListarDuca, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDuca item)
        {
            throw new NotImplementedException();
        }
    }
}
