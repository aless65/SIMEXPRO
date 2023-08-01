﻿using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Gral
{
    public class OficinasRepository : IRepository<tbOficinas>
    {
        public RequestStatus Delete(tbOficinas item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@ofic_Id", item.ofic_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioEliminacion", item.usua_UsuarioEliminacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@ofic_FechaEliminacion", item.ofic_FechaEliminacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EliminarOficinas, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public tbOficinas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbOficinas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbOficinas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbOficinas item)
        {

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@ofic_Id", item.ofic_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@ofic_Nombre", item.ofic_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@ofic_FechaModificacion", item.ofic_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarOficinas, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}
