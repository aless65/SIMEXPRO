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
    public class ModulosRepository : IRepository<tbModulos>
    {
        public RequestStatus Delete(tbModulos item)
        {
            throw new NotImplementedException();
        }

        public tbModulos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbModulos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbModulos> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var result = db.Query<tbModulos>(ScriptsDataBase.ListarReporteModuloDia, null, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }

        public RequestStatus Update(tbModulos item)
        {
            throw new NotImplementedException();
        }
    }
}
