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
            RequestStatus result = new();
            var parametros = new DynamicParameters();
            parametros.Add("@lote_Id", item.lote_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioEliminacion", item.usua_UsuarioEliminacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_FechaEliminacion", item.lote_FechaEliminacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.EliminarLotes, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public tbLotes Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbLotes item)
        {
            using var db = new SqlConnection("data source=simexproserver.database.windows.net; initial catalog=SIMEXPRO; user id=admin1; password=Administracion_123");
            RequestStatus result = new();
            var parametros = new DynamicParameters();
            parametros.Add("@mate_Id", item.mate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_CodigoLote", item.lote_CodigoLote, DbType.String, ParameterDirection.Input);
            parametros.Add("@lote_Stock", item.lote_Stock, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@colr_Id", item.colr_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@unme_Id", item.unme_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prod_Id", item.prod_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tipa_Id", item.tipa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_Observaciones", item.lote_Observaciones, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_FechaCreacion", item.lote_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.InsertarLotes, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return new RequestStatus()
            {
                CodeStatus = answer == "1" ? 1 : 0
            };
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
            RequestStatus result = new();
            var parametros = new DynamicParameters();
            parametros.Add("@lote_Id", item.lote_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_CodigoLote", item.lote_CodigoLote, DbType.String, ParameterDirection.Input);
            parametros.Add("@lote_Stock", item.lote_Stock, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@colr_Id", item.colr_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@mate_Id", item.mate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@unme_Id", item.unme_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prod_Id", item.prod_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tipa_Id", item.tipa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_Observcaciones", item.lote_Observaciones, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@lote_FechaModificacion", item.lote_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.EditarLotes, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
        public IEnumerable<tbLotes> LotesMateriales(string lote_CodigoLote)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new();
            var parametros = new DynamicParameters();
            parametros.Add("@lote_CodigoLote", lote_CodigoLote, DbType.String, ParameterDirection.Input);
            return  db.Query<tbLotes>(ScriptsDataBase.LotesMateriales, parametros, commandType: CommandType.StoredProcedure);
        }
    }
}
