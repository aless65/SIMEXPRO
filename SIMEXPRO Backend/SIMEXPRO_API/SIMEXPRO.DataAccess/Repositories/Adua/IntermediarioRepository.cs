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
    public class IntermediarioRepository : IRepository<tbIntermediarios>
    {
        public RequestStatus Delete(tbIntermediarios item)
        {
            throw new NotImplementedException();
        }

        public tbIntermediarios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbIntermediarios item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbIntermediarios> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbIntermediarios item)
        {
            throw new NotImplementedException();
        }
    }
}
