using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Prod
{
    public class PedidosProduccionDetallesRepository : IRepository<tbPedidosProduccionDetalles>
    {
        public RequestStatus Delete(tbPedidosProduccionDetalles item)
        {
            throw new NotImplementedException();
        }

        public tbPedidosProduccionDetalles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPedidosProduccionDetalles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPedidosProduccionDetalles> List(int ppro_Id)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@ppro_Id", ppro_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.Query<tbPedidosProduccionDetalles>(ScriptsDataBase.ListarPedidosProduccionDetalles, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<tbPedidosProduccionDetalles> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var result = db.Query<tbPedidosProduccionDetalles>(ScriptsDataBase.ListarPedidosOrden, null, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Update(tbPedidosProduccionDetalles item)
        {
            throw new NotImplementedException();
        }
    }
}
