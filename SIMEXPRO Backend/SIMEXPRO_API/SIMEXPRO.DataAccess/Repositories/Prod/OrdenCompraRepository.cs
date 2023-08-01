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
    public class OrdenCompraRepository : IRepository<tbOrdenCompra>
    {
        public RequestStatus Delete(tbOrdenCompra item)
        {
            throw new NotImplementedException();
        }

        public tbOrdenCompra Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbOrdenCompra item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@orco_IdCliente", item.orco_IdCliente, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_FechaEmision", item.orco_FechaEmision, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@orco_FechaLimite", item.orco_FechaLimite, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@orco_MetodoPago", item.orco_MetodoPago, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_Materiales", item.orco_Materiales, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@orco_IdEmbalaje", item.orco_IdEmbalaje, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_EstadoOrdenCompra", item.usua_UsuarioCreacion, DbType.String, ParameterDirection.Input);
            parametros.Add("@orco_DireccionEntrega", item.orco_DireccionEntrega, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_FechaCreacion", item.orco_FechaCreacion, DbType.DateTime, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarOrdenCompra, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbOrdenCompra> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var result = db.Query<tbOrdenCompra>(ScriptsDataBase.ListarOrde_Ensa_Acab_Etiq, null, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Update(tbOrdenCompra item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@code_Id", item.orco_IdCliente, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_IdCliente", item.orco_IdCliente, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_FechaEmision", item.orco_FechaEmision, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@orco_FechaLimite", item.orco_FechaLimite, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@orco_MetodoPago", item.orco_MetodoPago, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_Materiales", item.orco_Materiales, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@orco_IdEmbalaje", item.orco_IdEmbalaje, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_EstadoOrdenCompra", item.usua_UsuarioCreacion, DbType.String, ParameterDirection.Input);
            parametros.Add("@orco_DireccionEntrega", item.orco_DireccionEntrega, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@orco_FechaModificacion", item.orco_FechaModificacion, DbType.DateTime, ParameterDirection.Input);

            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarOrdenCompra, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}