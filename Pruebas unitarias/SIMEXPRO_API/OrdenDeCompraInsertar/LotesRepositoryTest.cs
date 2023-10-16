using SIMEXPRO.DataAccess;
using SIMEXPRO.DataAccess.Repositories.Prod;
using SIMEXPRO.Entities.Entities;
using System;
using Xunit;

namespace OrdenDeCompraInsertar
{
    public class LotesRepositoryTest
    {
        LotesRepository _LotesRepository = new();

        [Fact]
        public void Test2()
        {
            tbLotes datos = new()
            {
            lote_CodigoLote = "LOTE34ABCD",
            mate_Id=57,
            colr_Id=3,
            unme_Id=1,
            prod_Id=2,
            lote_Stock=234,
            lote_Observaciones="BLA BLA BLA BLA BLA",
            tipa_Id=2,
            usua_UsuarioCreacion=1,
            lote_FechaCreacion = new DateTime(2023, 10, 16, 01, 15, 00),
            };

            RequestStatus result = _LotesRepository.Insert(datos);

            Assert.Equal(1, result.CodeStatus);
        }

    }
}
