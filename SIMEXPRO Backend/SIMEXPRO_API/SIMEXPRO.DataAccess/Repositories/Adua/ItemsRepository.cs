using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Adua
{
    public class ItemsRepository : IRepository<tbItems>
    {
        public RequestStatus Delete(tbItems item)
        {
            throw new NotImplementedException();
        }

        public tbItems Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbItems item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbItems> List(tbItems item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@fact_Id", item.fact_Id, DbType.Int32, ParameterDirection.Input);

            return db.Query<tbItems>(ScriptsDataBase.ListarItems, parametros, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<tbItems> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbItems item)
        {
            throw new NotImplementedException();
        }
    }
}
