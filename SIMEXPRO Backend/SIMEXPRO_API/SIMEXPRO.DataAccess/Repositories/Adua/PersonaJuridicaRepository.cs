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
    public class PersonaJuridicaRepository : IRepository<tbPersonaJuridica>
    {
        public RequestStatus Delete(tbPersonaJuridica item)
        {
            throw new NotImplementedException();
        }

        public tbPersonaJuridica Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPersonaJuridica item)
        {
            RequestStatus result = new();

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@pers_Id", item.pers_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_EstadoRepresentante", item.peju_EstadoRepresentante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@colo_Id", item.colo_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_PuntoReferencia", item.peju_PuntoReferencia, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_ColoniaRepresentante", item.peju_ColoniaRepresentante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_NumeroLocalRepresentante", item.peju_NumeroLocalRepresentante, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_PuntoReferenciaRepresentante", item.peju_PuntoReferenciaRepresentante, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_TelefonoEmpresa", item.peju_TelefonoEmpresa, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_TelefonoFijoRepresentanteLegal", item.peju_TelefonoFijoRepresentanteLegal, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_TelefonoRepresentanteLegal", item.peju_TelefonoRepresentanteLegal, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_CorreoElectronico", item.peju_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_CorreoElectronicoAlternativo", item.peju_CorreoElectronicoAlternativo, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_FechaCreacion", item.peju_FechaCreacion, DbType.DateTime, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.InsertarPersonaJuridica, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
        public IEnumerable<tbPersonaJuridica> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            return db.Query<tbPersonaJuridica>(ScriptsDataBase.ListarPersonaJuridica, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPersonaJuridica item)
        {
            RequestStatus result = new();

            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@peju_Id", item.peju_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@pers_Id", item.pers_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_EstadoRepresentante", item.peju_EstadoRepresentante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@colo_Id", item.colo_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_PuntoReferencia", item.peju_PuntoReferencia, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_ColoniaRepresentante", item.peju_ColoniaRepresentante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_NumeroLocalRepresentante", item.peju_NumeroLocalRepresentante, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_PuntoReferenciaRepresentante", item.peju_PuntoReferenciaRepresentante, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_TelefonoEmpresa", item.peju_TelefonoEmpresa, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_TelefonoFijoRepresentanteLegal", item.peju_TelefonoFijoRepresentanteLegal, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_TelefonoRepresentanteLegal", item.peju_TelefonoRepresentanteLegal, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_CorreoElectronico", item.peju_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@peju_CorreoElectronicoAlternativo", item.peju_CorreoElectronicoAlternativo, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@peju_FechaModificacion", item.peju_FechaModificacion, DbType.DateTime, ParameterDirection.Input);


            var answer = db.QueryFirst<string>(ScriptsDataBase.EditarPersonaJuridica, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
    }
}
