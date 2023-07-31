﻿using Dapper;
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
    public class LotesRepository : IRepository<tbLotes>
    {
        public RequestStatus Delete(tbLotes item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@lote_Id", item.lote_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioEliminacion", item.usua_UsuarioEliminacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_FechaEliminacion", item.lote_FechaEliminacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EliminarLotes, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public tbLotes Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbLotes item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@mate_Id", item.mate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@unme_Id", item.unme_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_Stock", item.lote_Stock, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_CantIngresada", item.lote_CantIngresada, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tipa_Id", item.tipa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_Observaciones", item.lote_Observaciones, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_FechaCreacion", item.lote_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarLotes, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbLotes> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbLotes>(ScriptsDataBase.ListarLotes, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbLotes item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@lote_Id", item.lote_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mate_Id", item.mate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@unme_Id", item.unme_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_Stock", item.lote_Stock, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_CantIngresada", item.lote_CantIngresada, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tipa_Id", item.tipa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_Observcaciones", item.lote_Observaciones, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_FechaModificacion", item.lote_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarLotes, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}
