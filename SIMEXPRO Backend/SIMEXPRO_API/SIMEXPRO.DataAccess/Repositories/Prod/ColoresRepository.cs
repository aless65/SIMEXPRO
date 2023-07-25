using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Gral
{
    public class ColoresRepository : IRepository<tbColores>
    {
      

        public RequestStatus Delete(tbColores item)
        {
            throw new NotImplementedException();
        }

        public tbColores Find(int? id)
        {
            throw new NotImplementedException();
        }

    

        public RequestStatus Insert(tbColores item)
        {
            throw new NotImplementedException();
        }

     


        public RequestStatus Update(tbColores item)
        {
            throw new NotImplementedException();
        }

        tbColores IRepository<tbColores>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<tbColores> IRepository<tbColores>.List()
        {
            throw new NotImplementedException();
        }
    }
}
