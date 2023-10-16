using SIMEXPRO.API.Controllers.ControllersAduanas;
using SIMEXPRO.DataAccess;
using SIMEXPRO.DataAccess.Repositories.Adua;
using SIMEXPRO.Entities.Entities;
using System;
using Xunit;

namespace UnitTest_ItemDeva
{
    public class ItemsDevaController
    {
        ItemsRepository _itemsRepository = new ItemsRepository();

        private readonly ItemsController _itemsController;

        public ItemsDevaController(ItemsController itemsController)
        {
            _itemsController = itemsController;
        }

        [Fact]
        public void TestMasiso()
        {
            tbItems item = new tbItems()
            {
                fact_Id = 24,
                item_Cantidad = 1500,
                unme_Id = 1,
                item_IdentificacionComercialMercancias = "Tecnologia",
                item_CaracteristicasMercancias = "Fragil",
                item_Marca = "Estrukture",
                item_Modelo = "Max RYT",
                merc_Id = 2,
                pais_IdOrigenMercancia = 3,
                aran_Id = 22401,
                item_ValorUnitario = 2500,
                item_ValorTransaccion = 15000,
                usua_UsuarioCreacion = 1,
                item_FechaCreacion = new DateTime(2023, 10, 16, 01, 15, 00),
                item_EsNuevo = false,
                item_EsHibrido = false,
                item_LitrosTotales = 0,
                item_CigarrosTotales = 0,
            };

            IActionResult result = _ducaController.EditarPart1(datos);
        }



        [Fact]
        public void Test1()
        {
            tbItems item = new tbItems()
            {
                fact_Id = 24,
                item_Cantidad = 1500,
                unme_Id = 1,
                item_IdentificacionComercialMercancias = "Tecnologia",
                item_CaracteristicasMercancias = "Fragil",
                item_Marca = "Estrukture",
                item_Modelo = "Max RYT",
                merc_Id = 2,
                pais_IdOrigenMercancia = 3,
                aran_Id = 22401,
                item_ValorUnitario = 2500,
                item_ValorTransaccion = 15000,
                usua_UsuarioCreacion = 1,
                item_FechaCreacion = new DateTime(2023, 10, 16, 01, 15, 00),
                item_EsNuevo = false,
                item_EsHibrido = false,
                item_LitrosTotales = 0,
                item_CigarrosTotales = 0,
            };

            RequestStatus result = _itemsRepository.Insert(item);

            Assert.Equal("1", result.MessageStatus);
        }
    }
}
