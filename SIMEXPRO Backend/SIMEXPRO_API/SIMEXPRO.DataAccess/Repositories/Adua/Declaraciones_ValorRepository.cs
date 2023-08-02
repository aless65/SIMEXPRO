using Dapper;
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
    public class Declaraciones_ValorRepository : IRepository<tbDeclaraciones_Valor>
    {
        public RequestStatus Delete(tbDeclaraciones_Valor item)
        {
            throw new NotImplementedException();
        }

        public tbDeclaraciones_Valor Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDeclaraciones_Valor item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus InsertTab1(tbDeclaraciones_Valor item, tbDeclarantes itemDecl, tbImportadores itemImp)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parametros = new DynamicParameters();

            var resultado = new RequestStatus();

            parametros.Add("@deva_AduanaIngresoId", item.deva_AduanaIngresoId, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deva_AduanaDespachoId", item.deva_AduanaDespachoId, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deva_FechaAceptacion", item.deva_FechaAceptacion, DbType.Date, ParameterDirection.Input);
            parametros.Add("@decl_Nombre_Raso", itemDecl.decl_Nombre_Raso, DbType.String, ParameterDirection.Input);
            parametros.Add("@impo_RTN", itemImp.impo_RTN, DbType.String, ParameterDirection.Input);
            parametros.Add("@impo_NumRegistro", itemImp.impo_NumRegistro, DbType.String, ParameterDirection.Input);
            parametros.Add("@decl_Direccion_Exacta", itemDecl.decl_Direccion_Exacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@ciud_Id", itemDecl.ciud_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@decl_Correo_Electronico", itemDecl.decl_Correo_Electronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@decl_Telefono", itemDecl.decl_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@decl_Fax", itemDecl.decl_Fax, DbType.String, ParameterDirection.Input);
            parametros.Add("@nico_Id", itemImp.nico_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@impo_NivelComercial_Otro", itemImp.impo_NivelComercial_Otro, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deva_FechaCreacion", item.deva_FechaCreacion, DbType.DateTime, ParameterDirection.Input);

            var respuesta = db.QueryFirst<string>(ScriptsDataBase.InsertarDeclaracionesValorTAP1, parametros, commandType: CommandType.StoredProcedure);

            resultado.MessageStatus = respuesta;

            return resultado;
        }

        public IEnumerable<tbDeclaraciones_Valor> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbDeclaraciones_Valor item)
        {
            throw new NotImplementedException();
        }
    }
}
