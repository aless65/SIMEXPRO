using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Prod
{
    public class EstilosRepository : IRepository<tbEstilos>
    {
        public RequestStatus Delete(tbAldeas item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Delete(tbEstilos item)
        {
            throw new NotImplementedException();
        }

        public tbEstilos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEstilos item)
        {
            throw new NotImplementedException();
        }

      

        public IEnumerable<tbEstilos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbEstilos item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@esti_Id", item.esti_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@esti_Descripcion", item.esti_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@esti_FechaModificacion", item.esti_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarEstilos, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

      

        tbEstilos IRepository<tbEstilos>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<tbEstilos> IRepository<tbEstilos>.List()
        {
            throw new NotImplementedException();
        }
    }
}
