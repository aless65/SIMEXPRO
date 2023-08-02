--DUCA--
INSERT INTO [Adua].[tbDuca]
()
VALUES
()

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





        INSERT INTO [Adua].[tbAranceles]
        (aran_Codigo, aran_Descripcion, usua_UsuarioCreacion, aran_FechaCreacion)
        VALUES
        ('03.01',                       'PECES O PESCADOS, VIVOS',         1,         GETDATE()),
        ('0301.1',                      'Peces ornamentales:',         1,         GETDATE()),
        ('0301.11.00.00',               'De agua dulce',         1,         GETDATE()),
        ('0301.19.00.00',               'Los demás',         1,         GETDATE()),
        ('0301.9',                      'Los demás peces o pescados, vivos:',         1,         GETDATE()),
        ('0301.91',                     'Truchas (Salmo trutta, Oncorhynchus mykiss, Oncorhynchus clarki, Oncorhynchus aguabonita, Oncorhynchus gilae, Oncorhynchus apache y Oncorhynchus chrysogaster):',         1,         GETDATE()),
        ('0301.91.10.00',               'Larvas para repoblación',         1,         GETDATE()),
        ('0301.91.90.00',               'Otras',         1,         GETDATE()),
        ('0301.92',                     'Anguilas (Anguilla spp.):',         1,         GETDATE()),
        ('0301.92.10.00',               'Larvas para repoblación',         1,         GETDATE()),
        ('0301.92.90.00',               'Otras',         1,         GETDATE()),
        ('0301.93',                     'Carpas (Cyprinus spp., Carassius spp., Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus, Catla catla, Labeo spp., Osteochilus hasselti, Leptobarbus hoeveni, Megalobrama spp.):',         1,         GETDATE()),
        ('0301.93.10.00',               'Larvas para repoblación de las especies Cyprinus carpio, Carassius carassius, Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus',         1,         GETDATE()),
        ('0301.93.10.00.01',            'Larva de carpa (Art. 8, Acuerdo N° 440-2016)',         1,         GETDATE()),
        ('0301.93.20.00',               'Larvas para repoblación de las demás especies',         1,         GETDATE()),
        ('0301.93.90.00',               'Otras',         1,         GETDATE()),
        ('0301.94.00.00',               'Atunes comunes o de aleta azul, del Atlántico y del Pacífico (Thunnus thynnus, Thunnus orientalis)',         1,         GETDATE()),
        ('0301.95.00.00',               'Atunes del sur (Thunnus maccoyii)',         1,         GETDATE()),
        ('0301.99',                     'Los demás:',         1,         GETDATE()),
        ('0301.99.10.00',               'Larvas para repoblación',         1,         GETDATE()),
        ('0301.99.10.00.01',            'Alevines de Tilapia (Oreochromis sp) (Art. 8, Acuerdo N° 440-2016)',         1,         GETDATE()),
        ('0301.99.10.00.02',            'Alevines de róbalo (Art. 8, Acuerdo N° 440-2016)',         1,         GETDATE()),
        ('0301.99.10.00.03',            'Alevines de corvina (Art. 8, Acuerdo N° 440-2016)',         1,         GETDATE()),
        ('0301.99.10.00.04',            'Alevines de bagre (Art. 8, Acuerdo N° 440-2016)',         1,         GETDATE()),
        ('0301.99.10.00.05',            'Alevines de pargo (Art. 8, Acuerdo N° 440-2016)',         1,         GETDATE()),
        ('0301.99.9',                   'Los demás:',         1,         GETDATE()),
        ('0301.99.91.00',               'Atunes (del género Thunnus, excepto el Thunnus thynnus, Thunnus orientalis y Thunnus maccoyii), listados o bonitos de vientre rayado (Euthynnus (Katsuwonus) pelamis), sardinas (Sardina pilchardus, Sardinops spp.) y caballas (macarelas) (Scomber scombrus, Scomber australasicus, Scomber japonicus)',         1,         GETDATE()),
        ('0301.99.99.00',               'Los demás',         1,         GETDATE()),
        ('03.02',                       'PESCADO FRESCO O REFRIGERADO, EXCEPTO LOS FILETES Y DEMAS CARNE DE PESCADO DE LA PARTIDA 03.04',         1,         GETDATE()),
        ('0302.1',                      'Salmónidos, excepto los despojos comestibles de pescado de las subpartidas 0302.91 a 0302.99:',         1,         GETDATE()),
        ('0302.11.00.00',               'Truchas (Salmo trutta, Oncorhynchus mykiss, Oncorhynchus clarki, Oncorhynchus aguabonita, Oncorhynchus gilae, Oncorhynchus apache y Oncorhynchus chrysogaster)',         1,         GETDATE()),
        ('0302.13.00.00',               'Salmones del Pacífico (Oncorhynchus nerka, Oncorhynchus gorbuscha, Oncorhynchus keta, Oncorhynchus tschawytscha, Oncorhynchus kisutch, Oncorhynchus masou y Oncorhynchus rhodurus)',         1,         GETDATE()),
        ('0302.14.00.00',               'Salmones del Atlántico (Salmo salar) y salmones del Danubio (Hucho hucho)',         1,         GETDATE()),
        ('0302.19.00.00',               'Los demás',         1,         GETDATE()),
        ('0302.2',                      'Pescados planos (Pleuronectidae, Bothidae, Cynoglossidae, Soleidae, Scophthalmidae y Citharidae), excepto los despojos comestibles de pescado de las subpartidas 0302.91 a 0302.99:',         1,         GETDATE()),
        ('0302.21.00.00',               'Fletanes (“halibut”) (Reinhardtius hippoglossoides, Hippoglossus hippoglossus, Hippoglossus stenolepis)',         1,         GETDATE()),
        ('0302.22.00.00',               'Sollas (Pleuronectes platessa)',         1,         GETDATE()),
        ('0302.23.00.00',               'Lenguados (Solea spp.)',         1,         GETDATE()),
        ('0302.24.00.00',               'Rodaballos (“turbots”) (Psetta maxima)',         1,         GETDATE()),
        ('0302.29.00.00',               'Los demás',         1,         GETDATE()),
        ('0302.3',                      'Atunes (del género Thunnus), listados o bonitos de vientre rayado (Euthynnus (Katsuwonus) pelamis), excepto los despojos comestibles de pescado de las subpartidas 0302.91 a 0302.99:',         1,         GETDATE()),
        ('0302.31.00.00',               'Albacoras o atunes blancos (thunnus alalunga)',         1,         GETDATE()),
        ('0302.32.00.00',               'Atunes de aleta amarilla (rabiles) (Thunnus albacares)',         1,         GETDATE()),
        ('0302.33.00.00',               'Listados o bonitos de vientre rayado',         1,         GETDATE()),
        ('0302.34.00.00',               'Atunes ojo grande (Patudos) (Thunnus obesus)',         1,         GETDATE()),
        ('0302.35.00.00',               'Atunes comunes o de aleta azul, del Atlántico y del Pacífico (Thunnus thynnus, Thunnus orientalis)',         1,         GETDATE()),
        ('0302.36.00.00',               'Atunes del sur (Thunnus maccoyii)',         1,         GETDATE()),
        ('0302.39.00.00',               'Los demás',         1,         GETDATE()),
        ('0302.4',                      'Arenques (Clupea harengus, Clupea pallasii), anchoas		(Engraulis spp.), sardinas (Sardina pilchardus,				Sardinops	spp.),	sardinelas (Sardinella				spp.),		espadines		(Sprattus sprattus),			caballas (macarelas) (Scomber scombrus, Scomber australasicus, Scomber japonicus), caballas de la India (Rastrelliger spp.), carites (Scomberomorus spp.), jureles (Trachurus spp.), pámpanos (Caranx spp.), cobias				(Rachycentron				canadum), palometones			plateados		(Pampus		spp.), papardas del Pacífico (Cololabis saira), macarelas    (Decapterus	spp.),	capelanes (Mallotus villosus), peces espada (Xiphias gladius), bacoretas orientales (Euthynnus affinis),	bonitos		(Sarda spp.), agujas, marlines,				peces			vela			o			picudos (Istiophoridae), excepto	los	despojos comestibles de pescado de las subpartidas 0302.91 a 0302.99:',         1,         GETDATE()),
        ('0302.41.00.00',               'Arenques (Clupea harengus, Clupea pallasii)',         1,         GETDATE()),
        ('0302.42.00.00',               'Anchoas (Engraulis spp.)',         1,         GETDATE()),
        ('0302.43.00.00',               'Sardinas (Sardina pilchardus, Sardinops spp.), sardinelas (Sardinella spp.) y espadines (Sprattus sprattus)',         1,         GETDATE()),
        ('0302.44.00.00',               'Caballas (macarelas) (Scomber scombrus, Scomber australasicus, Scomber japonicus)',         1,         GETDATE()),
        ('0302.45.00.00',               'Jureles (Trachurus spp.)',         1,         GETDATE()),
        ('0302.46.00.00',               'Cobias (Rachycentron canadum)',         1,         GETDATE()),
        ('0302.47.00.00',               'Peces espada (Xiphias gladius)',         1,         GETDATE()),
        ('0302.49.00.00',               'Los demás',         1,         GETDATE()),
        ('0302.5',                      'Pescados de las familias Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merlucciidae, Moridae y Muraenolepididae, excepto los despojos comestibles de pescado de las subpartidas 0302.91 a 0302.99:',         1,         GETDATE()),
        ('0302.51.00.00',               'Bacalaos (Gadus morhua, Gadus ogac, Gadus macrocephalus)',         1,         GETDATE()),
        ('0302.52.00.00',               'Eglefinos (Melanogrammus aeglefinus)',         1,         GETDATE()),
        ('0302.53.00.00',               'Carboneros (Pollachius virens)',         1,         GETDATE()),
        ('0302.54.00.00',               'Merluzas (Merluccius spp., Urophycis spp.)',         1,         GETDATE()),
        ('0302.55.00.00',               'Abadejos de Alaska (Theragra chalcogramma)',         1,         GETDATE()),
        ('0302.56.00.00',               'Bacaladillas (Micromesistius poutassou, Micromesistius australis)',         1,         GETDATE()),
        ('0302.59.00.00',               'Los demás',         1,         GETDATE()),
        ('0302.7',                      'Tilapias (Oreochromis spp.), bagres o peces gato (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.), carpas (Cyprinus spp., Carassius spp., Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus, Catla catla, Labeo spp., Osteochilus hasselti, Leptobarbus hoeveni, Megalobrama spp.), anguilas (Anguilla spp.), percas del Nilo (Lates niloticus) y peces cabeza de serpiente (Channa spp.), excepto los despojos comestibles de pescado de las subpartidas 0302.91 a 0302.99:',         1,         GETDATE()),
        ('0302.71.00.00',               'Tilapias (Oreochromis spp.)',         1,         GETDATE()),
        ('0302.72.00.00',               'Bagres o peces gato (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.)',         1,         GETDATE()),
        ('',                     '',         1,         GETDATE()),
 

	 
