﻿using Dapper;
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
    public class ArancelesRepository : IRepository<tbAranceles>
    {
        public RequestStatus Delete(tbAranceles item)
        {
            throw new NotImplementedException();
        }

        public tbAranceles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbAranceles item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@aran_Codigo", item.aran_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@aran_Descripcion", item.aran_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@aran_DAI", item.aran_DAI, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@aran_ISV", item.aran_ISV, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@aran_SEL", item.aran_SEL, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@aran_ProdCons", item.aran_ProdCons, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@aran_AplicaVehiculos", item.aran_AplicaVehiculos, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@aran_FechaCreacion", item.aran_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.InsertarAranceles, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<tbAranceles> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbAranceles>(ScriptsDataBase.ListarAranceles, null, commandType: CommandType.StoredProcedure);
        }


        public IEnumerable<tbAranceles> ListFiltrado(string codigo)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@aran_Codigo", codigo, DbType.String, ParameterDirection.Input);
            return db.Query<tbAranceles>(ScriptsDataBase.ListarArancelesFiltrado, parametros, commandType: CommandType.StoredProcedure);
        }
        
        public IEnumerable<tbAranceles> ListCapitulo(string codigo)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@aran_Codigo", codigo, DbType.String, ParameterDirection.Input);
            return db.Query<tbAranceles>(ScriptsDataBase.ListarArancelesCapitulo, parametros, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<tbAranceles> ListarArancelById(int aran_Id)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@aran_Id", aran_Id, DbType.Int32, ParameterDirection.Input);
            return db.Query<tbAranceles>(ScriptsDataBase.ListarArancelById, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbAranceles item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@aran_Id", item.aran_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@aran_Codigo", item.aran_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@aran_DAI", item.aran_DAI, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@aran_ISV", item.aran_ISV, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@aran_SEL", item.aran_SEL, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@aran_ProdCons", item.aran_ProdCons, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@aran_AplicaVehiculos", item.aran_AplicaVehiculos, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@aran_Descripcion", item.aran_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@aran_FechaModificacion", item.aran_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<string>(ScriptsDataBase.EditarAranceles, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<tbAranceles> Categoria(string id)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@aran_Codigo", id, DbType.String, ParameterDirection.Input);
            return db.Query<tbAranceles>(ScriptsDataBase.CategoriaAranceles, parametros, commandType: CommandType.StoredProcedure);
        }


    }
}
