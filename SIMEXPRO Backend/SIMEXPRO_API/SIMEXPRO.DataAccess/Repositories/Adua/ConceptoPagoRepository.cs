using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Adua
{
    public class ConceptoPagoRepository : IRepository<tbConceptoPago>
    {
        public RequestStatus Delete(tbConceptoPago item)
        {
            throw new NotImplementedException();
        }

        public tbConceptoPago Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbConceptoPago item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbConceptoPago> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            //var resultado = db.QueryFirst<IEnumerable<tbConceptoPago>>(ScriptsDataBase )
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbConceptoPago item)
        {
            throw new NotImplementedException();
        }
    }
}
