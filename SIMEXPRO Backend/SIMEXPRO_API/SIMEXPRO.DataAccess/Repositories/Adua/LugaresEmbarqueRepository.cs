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
    public class LugaresEmbarqueRepository : IRepository<tbLugaresEmbarque>
    {
        public RequestStatus Delete(tbLugaresEmbarque item)
        {
            throw new NotImplementedException();
        }

        public tbLugaresEmbarque Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbLugaresEmbarque item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbLugaresEmbarque> List(string codigo)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@emba_Codigo", codigo, DbType.String, ParameterDirection.Input);
            return db.Query<tbLugaresEmbarque>(ScriptsDataBase.ListarLugaresEmbarque, parametros, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<tbLugaresEmbarque> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbLugaresEmbarque item)
        {
            throw new NotImplementedException();
        }
    }
}
