using Dapper;

using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Gral
{
    public class EstadosCivilesRepository 
    {
        SIMEXPRO con = new SIMEXPRO();
       /* public IEnumerable<VW_tbEstadosCiviles> ListarEstadosCiviles()
        {
            return con.VW_tbEstadosCiviles.AsList();
        }

        public RequestStatus InsertarEstadoCivil(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(Events_Company.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@esci_Id", item.esci_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@esci_Descripcion", item.esci_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@esci_UsuarioCreador", item.esci_UsuarioCreador, DbType.String, ParameterDirection.Input);
            parametros.Add("@status", DbType.Int32, direction: ParameterDirection.Output);
            db.Query<RequestStatus>(ScriptsDataBase.InsertarEstadoCivil, parametros, commandType: CommandType.StoredProcedure).FirstOrDefault();
            var result = new RequestStatus { CodeStatus = parametros.Get<int>("@status") };
            return result;
        }

        public RequestStatus ActualizarEstadoCivil(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(Events_Company.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@esci_Id", item.esci_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@esci_Descripcion", item.esci_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@esci_UsuarioModificador", item.esci_UsuarioModificador, DbType.String, ParameterDirection.Input);
            parametros.Add("@status", DbType.Int32, direction: ParameterDirection.Output);
            db.Query<RequestStatus>(ScriptsDataBase.ActualizarEstadoCivil, parametros, commandType: CommandType.StoredProcedure).FirstOrDefault();
            var result = new RequestStatus { CodeStatus = parametros.Get<int>("@status") };
            return result;
        }


        public IEnumerable<tbEstadosCiviles> ListarDetallesEstadosCiviles(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(Events_Company.ConnectionString);

            var parametros = new DynamicParameters();
            
            parametros.Add("@esci_Id", item.esci_Id, DbType.String, ParameterDirection.Input);

            return db.Query<tbEstadosCiviles>(ScriptsDataBase.ListarDetallesEstadosCiviles, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Delete(tbEstadosCiviles item)
        {
            throw new NotImplementedException();
        }

        public tbEstadosCiviles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbEstadosCiviles> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            throw new NotImplementedException();
        }*/
    }
}
