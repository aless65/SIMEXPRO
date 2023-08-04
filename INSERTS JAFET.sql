
GO
--TIPO DE EMBALAJE--
INSERT INTO [Prod].[tbTipoEmbalaje]
(tiem_Descripcion, usua_UsuarioCreacion, tiem_FechaCreacion, tiem_Estado)
VALUES
('Embalaje de Prueba', 1, GETDATE(), 1)

GO
--ESTILOS--
INSERT INTO [Prod].[tbEstilos]
(esti_Descripcion, usua_UsuarioCreacion, esti_FechaCreacion, esti_Estado)
VALUES
('Camiseta de Prueba',1,GETDATE(),1)

GO

--COLORES--
INSERT INTO [Prod].[tbColores]
(colr_Nombre, colr_Codigo, usua_UsuarioCreacion, colr_FechaCreacion, colr_Estado)
VALUES
('Purpura','#912386',1,GETDATE(),1)

GO

--TALLAS--
INSERT INTO [Prod].[tbTallas]
(tall_Codigo, tall_Nombre, usua_UsuarioCreacion, tall_FechaCreacion, tall_Estado)
VALUES
('L','Large',1,GETDATE(),1)

GO
--CATEGORÍAS--

INSERT INTO [Prod].[tbCategoria]
(cate_Descripcion, usua_UsuarioCreacion, cate_FechaCreacion, cate_Estado)
VALUES
('Categoria de Prueba',1,GETDATE(),1),
('Categoria de Prueba 2',1,GETDATE(),1)


GO

--SUBCATEGORÍAS--
INSERT INTO [Prod].[tbSubcategoria]
(cate_Id, subc_Descripcion, usua_UsuarioCreacion, subc_FechaCreacion, subc_Estado)
VALUES
(1,'Subcategoría Prueba', 1, GETDATE(), 1),
(1,'Subcategoría Prueba2', 1, GETDATE(), 1)

--AREAS--
INSERT INTO [Prod].[tbArea]
(tipa_area, proc_Id, usua_UsuarioCreacion, tipa_FechaCreacion, tipa_Estado)
VALUES
('Bordado',1,1,GETDATE(),1),
('Serigrafía',1,1,GETDATE(),1),
('Confección',1,1,GETDATE(),1)

GO
--MATERIALES--
INSERT INTO Prod.tbMateriales 
(mate_Descripcion, subc_Id, mate_Precio, usua_UsuarioCreacion, mate_FechaCreacion)
VALUES
('Botones', 2, 23.99, 1, GETDATE()),
('Tela', 2, 23.99, 1, GETDATE()),
('Listones', 2, 23.99, 1, GETDATE())

GO
--PROVEEDORES--
INSERT INTO [Gral].[tbProveedores]
(prov_NombreCompania, prov_NombreContacto, prov_Telefono, prov_CodigoPostal, prov_Ciudad, prov_DireccionExacta, prov_CorreoElectronico, usua_UsuarioCreacion, prov_FechaCreacion, prov_Estado)
VALUES
('ECOMODA','BEATRIZ PINZON ZOLANO','98159299','21004',1,'--------','is@hotmail.com',1,GETDATE(),1)

--LOTES--
INSERT INTO [Prod].[tbLotes]
(mate_Id, unme_Id, lote_Stock, lote_CantIngresada, lote_Observaciones, tipa_Id, usua_UsuarioCreacion, lote_FechaCreacion, lote_Estado)
VALUES
(3,1,10,10,'-----',1,1,GETDATE(),1),
(3,1,10,10,'-----',1,1,GETDATE(),1),
(3,1,10,10,'-----',1,1,GETDATE(),1),
(3,1,10,10,'-----',1,1,GETDATE(),1)


--ORDEN DE COMPRA--
INSERT INTO Prod.tbOrdenCompra
(orco_IdCliente, orco_FechaEmision,	orco_FechaLimite, orco_MetodoPago, orco_Materiales,	orco_IdEmbalaje, orco_EstadoOrdenCompra, orco_DireccionEntrega,	usua_UsuarioCreacion, orco_FechaCreacion)
VALUES	( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
		( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
		( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
		( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023')

GO
--ORDEN DE COMPRA DETALLES--

INSERT INTO Prod.tbOrdenCompraDetalles
(orco_Id, code_CantidadPrenda, esti_Id, tall_Id, code_Sexo, colr_Id, code_Documento, code_Medidas, proc_IdComienza, proc_IdActual, code_Unidad, code_Valor,	code_Impuesto,code_Descuento,	code_EspecificacionEmbalaje, usua_UsuarioCreacion, code_FechaCreacion)
VALUES		(4,2,1,1,'F',1,'aca deberia ir un documento','aca deberia ir otro documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023')
		,	(4,2,1,1,'F',1,'aca deberia ir un documento','aca deberia ir otro documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023')
		,	(4,2,1,1,'F',1,'aca deberia ir un documento','aca deberia ir otro documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023')


GO
--Pedidos Producción--

INSERT INTO Prod.tbPedidosProduccion
(empl_Id, ppro_Fecha, ppro_Estados, ppro_Observaciones, usua_UsuarioCreacion, ppro_FechaCreacion)
VALUES
(1, GETDATE(), 'En Proceso', '--------', 1, GETDATE()),
(1, GETDATE(), 'En Proceso', '--------', 1, GETDATE()),
(1, GETDATE(), 'Pendiente', '--------', 1, GETDATE())

GO
--Pedidos Producción Detalles--

INSERT INTO Prod.tbPedidosProduccionDetalles
(ppro_Id, lote_Id, ppde_Cantidad, usua_UsuarioCreacion, ppde_FechaCreacion)
VALUES 
(1, 4, 10, 1, GETDATE())


GO
--ORDEN Esa_Acab_Etiq--
INSERT INTO [Prod].[tbOrde_Ensa_Acab_Etiq]
(ensa_Cantidad, empl_Id, code_Id, ensa_FechaInicio, ensa_FechaLimite, ppro_Id, usua_UsuarioCreacion, ensa_FechaCreacion, ensa_Estado)
VALUES 
(20,1, 5, '01/08/2023', '01/08/2023', 1, 1, '07/31/2023', 1)

GO

--Pedidos Orden--
/*
INSERT INTO Prod.tbPedidosOrden 
(prov_Id, peor_No_Duca, peor_FechaEntrada, peor_Obsevaciones, peor_DadoCliente, peor_Est, usua_UsuarioCreacion, peor_FechaCreacion)
VALUES
(1, '86645545258J',GETDATE(),'----',1,1,1,GETDATE())

GO
*/

--Pedidos Orden--


DELETE FROM [Adua].[tbMarcas];
DBCC CHECKIDENT('[Adua].[tbMarcas]', RESEED, 0);

INSERT INTO [Adua].[tbMarcas]
(marc_Descripcion, usua_UsuarioCreacion, marc_FechaCreacion, marc_Estado)
VALUES
('Toyota', 1, '4/30/2022', 1),
('BMW', 1, '4/30/2022', 1),
('Volkswagen', 1, '1/8/2022', 1),
('Hyundai', 1, '3/21/2022', 1),
('Chevrolet', 1, '8/30/2022', 1),
('Honda', 1, '2/10/2022', 1),
('Nissan', 1, '2/7/2022', 1);

GO

INSERT INTO [Adua].[tbTransporte]
(pais_Id, tran_Chasis, marca_Id, tran_Remolque, tran_CantCarga, tran_NumDispositivoSeguridad, tran_Equipamiento, tran_TipoCarga, tran_IdContenedor, usua_UsuarioCreacio, tran_FechaCreacion, tran_Estado)
VALUES
(236, 'Chasis independiente',1,'----',1,2,'----','----','----',1,GETDATE(),1),
(100, 'Chasis autoportante',1,'----',1,2,'----','----','----',1,GETDATE(),1),
(37, 'Chasis monocasco',1,'----',1,2,'----','----','----',1,GETDATE(),1);

GO

INSERT INTO [Adua].[tbConductor]
(cont_Nombre, cont_Apellido, cont_Licencia, pais_IdExpedicion, tran_Id, usua_UsuarioCreacion, cont_FechaCreacion, cont_Estado)
VALUES
('Juan David','Lopez','6420651011315844845',100,1,1,GETDATE(),1),
('Pedro','Toledo','6420651011315844846',100,1,1,GETDATE(),1),
('Sebastian','Santana','6420651011315844847',100,1,1,GETDATE(),1);

GO

INSERT INTO [Adua].[tbTiposIdentificacion]
(iden_Descripcion, usua_UsuarioCreacion, iden_FechaCreacion, iden_Estado)
VALUES
('Tarjeta de Identidad',1,GETDATE(),1),
('Pasaporte',1,GETDATE(),1),
('Visa',1,GETDATE(),1);

GO

INSERT INTO [Adua].[tbIntermediarios]
(tite_Id, inte_Tipo_Otro, decl_Id, usua_UsuarioCreacion, inte_FechaCreacion, inte_Estado)
VALUES
(1,'----',1,1,GETDATE(),1),
(2,'----',1,1,GETDATE(),1),
(3,'----',1,1,GETDATE(),1),
(4,'----',1,1,GETDATE(),1),
(5,'----',1,1,GETDATE(),1);

GO

INSERT INTO [Adua].[tbImportadores]
(nico_Id, decl_Id, impo_NivelComercial_Otro, impo_RTN, impo_NumRegistro, usua_UsuarioCreacion, impo_FechaCreacion, impo_Estado)
VALUES
(1,5,'----','05012006017558','15048630',1,GETDATE(),1),
(2,5,'----','13012005017558','15048630',1,GETDATE(),1),
(3,5,'----','08032003017845','15048630',1,GETDATE(),1),
(4,5,'----','07012006017021','15048630',1,GETDATE(),1);