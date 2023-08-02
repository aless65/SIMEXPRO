using Dapper;
using Microsoft.Data.SqlClient;
using SIMEXPRO.DataAccess.Context;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess.Repositories.Adua
{
    public class DucaRepository : IRepository<tbDuca>
    {
        public RequestStatus Delete(tbDuca item)
        {
            throw new NotImplementedException();
        }

        public tbDuca Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDuca item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parameters = new DynamicParameters();

            parameters.Add("@duca_No_Correlativo_Referencia", item.duca_No_Correlativo_Referencia, DbType.String, ParameterDirection.Input);
            //parameters.Add("@FechaAceptacion", item.duca_FechaCreacion, DbType.DateTime, ParameterDirection.Input);
            parameters.Add("@duca_AduanaRegistro", item.duca_AduanaRegistro, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@duca_AduanaSalida", item.duca_AduanaSalida, DbType.Int32, ParameterDirection.Input);
            //parameters.Add("@duca_AduanaIngreso", item, DbType.Int32, ParameterDirection.Input);
            //parameters.Add("@duca_AduanaDestino", item, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@duca_Regimen_Aduanero", item.duca_Regimen_Aduanero, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Modalidad", item.duca_Modalidad, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Clase", item.duca_Clase, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_FechaVencimiento", item.duca_FechaVencimiento, DbType.DateTime, ParameterDirection.Input);
            parameters.Add("@duca_Pais_Procedencia", item.duca_Pais_Procedencia, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@duca_Pais_Exportacion", item.duca_Pais_Exportacion, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@duca_Pais_Destino", item.duca_Pais_Destino, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@duca_Deposito_Aduanero", item.duca_Deposito_Aduanero, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Lugar_Embarque", item.duca_Lugar_Embarque, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Lugar_Desembarque", item.duca_Lugar_Desembarque, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Manifiesto", item.duca_Manifiesto, DbType.String, ParameterDirection.Input);
            //parameters.Add("@NoIdentificacion_ex", item, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@iden_Id_ex", item.duca_Tipo_Iden_Exportador, DbType.String, ParameterDirection.Input);
            parameters.Add("@pais_ex", item.duca_Pais_Exportacion, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@domicilio_Fiscal_ex", item.duca_DomicilioFiscal_Exportador, DbType.String, ParameterDirection.Input);
            parameters.Add("@NoIdentificacion_im", item.duca_Numero_Id_Importador, DbType.String, ParameterDirection.Input);
            //parameters.Add("@iden_Id_im", item.duca_Numero_Id_Importador, DbType.String, ParameterDirection.Input);
            parameters.Add("@pais_im", item.duca_Pais_Emision_Importador, DbType.Int32, ParameterDirection.Input);
            //parameters.Add("@Nombre_RazonSocial", item.duca_NombreSocial_Declarante, DbType.String, ParameterDirection.Input);
            parameters.Add("@domicilio_Fiscal_im", item.duca_DomicilioFiscal_Importador, DbType.String, ParameterDirection.Input);
            parameters.Add("@usua_UsuarioCreacio", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@duca_FechaCreacion", item.duca_FechaCreacion, DbType.Int32, ParameterDirection.Input);


            var resultado = db.QueryFirst<String>(ScriptsDataBase.InsertarDucaTAP1, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = 1,
                MessageStatus = "Id Duca: " + resultado
            };

            return request;
        }

        public RequestStatus InsertTap2(tbDuca item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parameters = new DynamicParameters();

            parameters.Add("@Duca_Id", item.duca_No_Duca, DbType.String, ParameterDirection.Input);

            parameters.Add("@duca_Codigo_Declarante", item.duca_Codigo_Declarante, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Numero_Id_Declarante", item.duca_Numero_Id_Declarante, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_NombreSocial_Declarante", item.duca_NombreSocial_Declarante, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_DomicilioFiscal_Declarante", item.duca_DomicilioFiscal_Declarante, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Codigo_Transportista", item.duca_Codigo_Transportista, DbType.String, ParameterDirection.Input);
            parameters.Add("@duca_Transportista_Nombre", item.duca_Transportista_Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("@motr_Id", item.motr_id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@cont_Licencia", item.cont_Licencia, DbType.String, ParameterDirection.Input);
            parameters.Add("@pais_IdExpedicion", item.pais_IdExpedicion, DbType.String, ParameterDirection.Input);
            parameters.Add("@cont_Nombre", item.cont_Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("@cont_Apellido", item.cont_Apellido, DbType.String, ParameterDirection.Input);
            parameters.Add("@pais_Id", item.pais_Id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.InsertarDucaTAP2, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Duca"
            };

            return request;
        }

        public RequestStatus InsertTap3(tbDuca item)
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);

            var parameters = new DynamicParameters();


            var resultado = db.QueryFirst<int>(ScriptsDataBase.InsertarDucaTAP3, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Duca"
            };

            return request;
        }

        public IEnumerable<tbDuca> List()
        {
            using var db = new SqlConnection(SIMEXPRO.ConnectionString);
            return db.Query<tbDuca>(ScriptsDataBase.ListarDuca, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDuca item)
        {
            throw new NotImplementedException();
        }
    }
}
