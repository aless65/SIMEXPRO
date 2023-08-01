﻿using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Gral
{
    public class ProvinciasRepository : IRepository<tbProvincias>
    {
        public RequestStatus Delete(tbProvincias item)
        {
            throw new NotImplementedException();
        }

        public tbProvincias Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbProvincias item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@pvin_Nombre",          item.pvin_Nombre,           DbType.String,      ParameterDirection.Input);
            parametros.Add("@pvin_Codigo",          item.pvin_Codigo,           DbType.String,      ParameterDirection.Input);
            parametros.Add("@pais_Id",              item.pais_Id,               DbType.Int32,       ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion,  DbType.Int32,       ParameterDirection.Input);
            parametros.Add("@pvin_FechaCreacion",   item.pvin_FechaCreacion,    DbType.DateTime,    ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.InsertarProvincias, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }

        public IEnumerable<tbProvincias> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<tbProvincias>(ScriptsDataBase.ListarProvincias, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbProvincias item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            RequestStatus result = new RequestStatus();
            var parametros = new DynamicParameters();
            parametros.Add("@pvin_Id",                  item.pvin_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pvin_Nombre",              item.pvin_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@pvin_Codigo",              item.pvin_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@pais_Id",                  item.pais_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pvin_FechaModificacion",   item.pvin_FechaModificacion, DbType.DateTime, ParameterDirection.Input);
            var answer = db.QueryFirst<int>(ScriptsDataBase.EditarProvincias, parametros, commandType: CommandType.StoredProcedure);
            result.CodeStatus = answer;
            return result;
        }
    }
}