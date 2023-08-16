
--- AQUI ESTAN LOS INSERTS DE LAS TABLAS DE PRODUCCION ---


-----------------------------------------------------------------
-- *************************** PRODUCCION *************************--


/*-------------------------------------*/
--***** INSERT TABLA CLIENTES --******--
GO
INSERT INTO [Prod].[tbClientes](clie_Nombre_O_Razon_Social, clie_Direccion, clie_RTN, clie_Nombre_Contacto, clie_Numero_Contacto, clie_Correo_Electronico, clie_FAX, usua_UsuarioCreacion, clie_FechaCreacion)
VALUES('Miguel','Direccionando','054564','Josue','465465','sdkjssdasd','45454',1,'05-10-2021');


/*--------------------------------------------*/
--***** INSERT TABLA MARCAS MAQUINAS --******--
GO
INSERT INTO Prod.tbMarcasMaquina (marq_Nombre, usua_UsuarioCreacion, marq_FechaCreacion)
VALUES	('Tajima',1,GETDATE()),
		('Stoll',1,GETDATE()),
		('Karl Mayer',1,GETDATE()),
		('Rieter',1,GETDATE()),
		('Thies',1,GETDATE());

/*--------------------------------------------*/
--***** INSERT TABLA FUNCIONES MAQUINA --******--
GO
INSERT INTO Prod.tbFuncionesMaquina(func_Nombre, usua_UsuarioCreacion, func_FechaCreacion)
VALUES	('Bordado',1,GETDATE()),
		('Tejido de punto',1,GETDATE()),
		('Urdimbre y tricotado',1,GETDATE()),
		('Hilatura',1,GETDATE()),
		('Tejido de hilo',1,GETDATE()),
		('Pegado de Cuello', 1, '2023-08-16')
		,('Pegado de Manga', 1, '2023-08-16')
		,('Cierre de Costado', 1, '2023-08-16')
		,('Ruedo', 1, '2023-08-16')
		,('Pegado de Cinta', 1, '2023-08-16')
		,('Tiro Delantero', 1, '2023-08-16')
		,('Tiro Trasero', 1, '2023-08-16')
		,('Pegado de El�stico', 1, '2023-08-16')
		,('Costura de Entrepierna', 1, '2023-08-16')
		,('Pegado de Bolsa', 1, '2023-08-16')
		,('Pegado de Gorro', 1, '2023-08-16')
		,('Sobrecostura', 1, '2023-08-16')
		,('Remate', 1, '2023-08-16')
		,('Pegado de Banda de Cintura', 1, '2023-08-16')
		,('Pegado de Banda de Pierna', 1, '2023-08-16')
		,('Cierre de Pu�o', 1, '2023-08-16')
		,('Unir Hombro', 1, '2023-08-16')
		,('Fijar Cuellos', 1, '2023-08-16')





/*------------------------------------*/
--***** INSERT TABLA TALLAS --******--
GO
INSERT INTO [Prod].[tbTallas] (tall_Codigo, tall_Nombre, usua_UsuarioCreacion, tall_FechaCreacion, tall_Estado)
VALUES	('L','Large',1,GETDATE(),1),
		('M','Medium',1,GETDATE(),1),
		('S','Small',1,GETDATE(),1),
		('XL','Extra Large',1,GETDATE(),1);

/*-------------------------------------------*/
--***** INSERT TABLA MODELOS MAQUINA --******--
GO
INSERT INTO Prod.tbModelosMaquina (mmaq_Nombre, marq_Id, func_Id, mmaq_Imagen, usua_UsuarioCreacion, mmaq_FechaCreacion)
VALUES	('SAI',1,1,'https://www.tajimadst.com/wp-content/uploads/2019/07/SAI_1.jpg',1,GETDATE()),
		('ADF 530-16 KI',2,2,'https://www.indiantextilemagazine.in/wp-content/uploads/2023/05/Fig5.jpg',1,GETDATE()),
		('HKS 2-SE',3,3,'https://www.karlmayer.com/ecomaXL/files/hks_2_se_gesamt_16789_final02.jpg?w=200&crop=200,200',1,GETDATE()),
		('VARIOline',	4,4,'https://www.rieter.com/fileadmin/_processed_/9/0/csm_varioline-mill-layout-2022-ECOized-2400Kg-rieter-96246_4c9505e247.jpg',1,GETDATE()),
		('iCono',5,5,'https://www.thiestextilmaschinen.de/wp-content/uploads/2020/10/4.1.2.1-iCone-Familie-1-scaled.jpg',1,GETDATE())


/*-------------------------------------*/
--***** INSERT TABLA PROCESOS --******--
GO
INSERT INTO [Prod].[tbProcesos]([proc_Descripcion],[usua_UsuarioCreacion],[proc_FechaCreacion] )
VALUES	('Corte de tela',			1, '10-16-2004'),
		('Confecci�n de prenda',	1, '10-16-2004'),
		('Estampado',				1, '10-16-2004'),
		('Bordado',					1, '10-16-2004'),
		('Planchado',				1, '10-16-2004'),
		('Empaque',					1, '10-16-2004'),
		('Revisi�n de calidad',		1, '10-16-2004'),
		('Etiquetado',				1, '10-16-2004'),
		('Env�o a distribuci�n',	1, '10-16-2004'),
		('Almacenamiento',			1, '10-16-2004');


/*------------------------------------*/
--***** INSERT TABLA MODULOS --******--
GO
INSERT INTO [Prod].[tbModulos](modu_Nombre, proc_Id, empr_Id, usua_UsuarioCreacion, modu_FechaCreacion)
VALUES	('A1',1,1,1,'05-10-2021'),
		('A2',1,1,1,'05-10-2021'),
		('A3',1,1,1,'05-10-2021');

/*----------------------------------*/
--***** INSERT TABLA AREAS --******--
GO
INSERT INTO Prod.tbArea(tipa_area,proc_Id,usua_UsuarioCreacion,tipa_FechaCreacion)
VALUES	('Area de Corte',1,1,GETDATE()),
		('Area de Ensamblado',1,1,GETDATE()),
		('Area de Acabado',1,1,GETDATE()),
		('Area de Control de Calidad',1,1,GETDATE()),
		('Area de Inventario',1,1,GETDATE());



/*----------------------------------*/
--***** INSERT TABLA TALLAS --******--
GO
INSERT INTO Prod.tbTallas (tall_Codigo,tall_Nombre,usua_UsuarioCreacion,tall_FechaCreacion)
VALUES	('XXS'	,'Extra Extra Small',1,GETDATE()),
		('XS'	,'Extra Small',1,GETDATE()),
		('S'	,'Small',1,GETDATE()),
		('M'	,'Medium',1,GETDATE()),
		('L'	,'Large',1,GETDATE()),
		('XL'	,'Extra Large',1,GETDATE()),
		('XXL'	,'Extra Extra Large',1,GETDATE());



/*--------------------------------------------*/
--***** INSERT TABLA TIPO DE ENBALAJE --******--
GO
INSERT INTO Prod.tbTipoEmbalaje(tiem_Descripcion,usua_UsuarioCreacion,tiem_FechaCreacion)
VALUES	('Cajas',1,GETDATE()),
		('Bultos',1,GETDATE()),
		('Tonel',1,GETDATE()),
		('Barril',1,GETDATE()),
		('Bolsas',1,GETDATE()),
		('Caja de Acero',1,GETDATE()),
		('Caja de Madera',1,GETDATE()),
		('Caja de Plastico',1,GETDATE());


/*--------------------------------------*/
--***** INSERT TABLA CATEGORIAS --******--
GO
INSERT INTO Prod.tbCategoria (cate_Descripcion, usua_UsuarioCreacion, cate_FechaCreacion)
VALUES	('Telas',1,GETDATE()),
		('Tejidos especiales',1,GETDATE()),
		('Hilos y fibras',1,GETDATE()),
		('Acabados textiles',1,GETDATE()),
		('Confecci�n de prendas',1,GETDATE());


/*------------------------------------------*/
--***** INSERT TABLA SUB CATEGORIA --******--
GO
INSERT INTO Prod.tbSubcategoria (cate_Id, subc_Descripcion, usua_UsuarioCreacion, subc_FechaCreacion)
VALUES	(1,'Algodon',1,GETDATE()),
		(1,'lino',1,GETDATE()),
		(1,'Seda',1,GETDATE()),
		(1,'Poli�ster',1,GETDATE()),
		(1,'Nailon',1,GETDATE()),
		(1,'Spandex',1,GETDATE()),
		(1,'Acr�lico',1,GETDATE()),

		(2,'Terciopelo de seda',1,GETDATE()),
		(2,'Terciopelo de algod�n',1,GETDATE()),
		(2,'Terciopelo el�stico',1,GETDATE()),
		(2,'Encaje floral',1,GETDATE()),
		(2,'Encaje chantilly',1,GETDATE()),
		(2,'Encaje el�stico',1,GETDATE()),
		(2,'Tela vaquera',1,GETDATE()),

		(3,'Hilos de algod�n',1,GETDATE()),
		(3,'Hilos de poli�ster',1,GETDATE()),
		(3,'Hilos de seda',1,GETDATE()),
		(3,'Algod�n org�nico',1,GETDATE()),
		(3,'Lana merino',1,GETDATE()),
		(3,'Fibra de coco',1,GETDATE()),
		(3,'Fibra de acr�lico',1,GETDATE()),

		(4,'Te�ido de tela a mano',1,GETDATE()),
		(4,'Te�ido a m�quina',1,GETDATE()),
		(4,'Te�ido reactivo',1,GETDATE()),
		(4,'Estampado digital',1,GETDATE()),
		(4,'Serigraf�a',1,GETDATE()),
		(4,'Estampados con relieve',1,GETDATE()),
		(4,'Tejidos repelentes al agua',1,GETDATE()),

		(5,'Camisas',1,GETDATE()),
		(5,'pantalones',1,GETDATE()),
		(5,'chaquetas',1,GETDATE()),
		(5,'Vestidos',1,GETDATE()),
		(5,'faldas',1,GETDATE()),
		(5,'blusas',1,GETDATE()),
		(5,'Conjuntos para beb�s',1,GETDATE());


/*-----------------------------------*/
--***** INSERT TABLA ESTILOS --******--
GO
INSERT INTO [Prod].[tbEstilos] (esti_Descripcion, usua_UsuarioCreacion, esti_FechaCreacion, esti_Estado)
VALUES	('Polo',1,GETDATE(),1),
		('Escotada',1,GETDATE(),1),
		('Manga Larga',1,GETDATE(),1),
		('Cuello V',1,GETDATE(),1),
		('Cuello de Tortuga',1,GETDATE(),1);



/*-----------------------------------*/
--***** INSERT TABLA COLORES --******--
GO
INSERT INTO [Prod].[tbColores] (colr_Nombre, usua_UsuarioCreacion, colr_FechaCreacion, colr_Estado)
VALUES	('P�rpura',1,GETDATE(),1),
		('Amarillo',1,GETDATE(),1),
		('Rojo',1,GETDATE(),1),
		('Verde',1,GETDATE(),1),
		('Rosado',1,GETDATE(),1),
		('Anaranjado',1,GETDATE(),1),
		('Cafe',1,GETDATE(),1),
		('Magenta',1,GETDATE(),1),
		('Negro',1,GETDATE(),1),
		('Azul Marino',1,GETDATE(),1),
		('Celeste',1,GETDATE(),1),
		('Blanco',1,GETDATE(),1);


/*---------------------------------------*/
--***** INSERT TABLA MATERIALES --******--
GO
INSERT INTO Prod.tbMateriales (mate_Descripcion, subc_Id, mate_Precio, usua_UsuarioCreacion, mate_FechaCreacion)
VALUES	('Botones', 2, 23.99, 1, GETDATE()),
		('Tela', 2, 23.99, 1, GETDATE()),
		('Listones', 2, 23.99, 1, GETDATE());


/*-----------------------------------*/
--***** INSERT TABLA LOTES --******--
GO
INSERT INTO [Prod].[tbLotes] (mate_Id, unme_Id, lote_Stock, lote_CantIngresada, lote_Observaciones, tipa_Id, usua_UsuarioCreacion, lote_FechaCreacion, lote_Estado)
VALUES	(3,1,10,10,'-----',1,1,GETDATE(),1),
		(3,1,10,10,'-----',1,1,GETDATE(),1),
		(3,1,10,10,'-----',1,1,GETDATE(),1),
		(3,1,10,10,'-----',1,1,GETDATE(),1);


/*-----------------------------------*/
--***** INSERT TABLA MAQUINAS --******--
GO
INSERT INTO Prod.tbMaquinas (maqu_NumeroSerie, mmaq_Id, modu_Id, usua_UsuarioCreacion, maqu_FechaCreacion)
VALUES	('00001',1,1,1,GETDATE()),
		('00002',2,1,1,GETDATE()),
		('00003',3,1,1,GETDATE()),
		('00004',4,1,1,GETDATE()),
		('00005',5,1,1,GETDATE());

/*-------------------------------------------*/
--***** INSERT TABLA ORDEN DE COMPRA --******--
GO
INSERT INTO Prod.tbOrdenCompra (orco_IdCliente, orco_FechaEmision,	orco_FechaLimite, orco_MetodoPago, orco_Materiales,	orco_IdEmbalaje, orco_EstadoOrdenCompra, orco_DireccionEntrega,	usua_UsuarioCreacion, orco_FechaCreacion)
VALUES	( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
		( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
		( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
		( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023');


/*---------------------------------------------------*/
--***** INSERT TABLA ORDEN DE COMPRA DETALLE --******--
GO
INSERT INTO Prod.tbOrdenCompraDetalles
(orco_Id, code_CantidadPrenda, esti_Id, tall_Id, code_Sexo, colr_Id, code_Documento, proc_IdComienza, proc_IdActual, code_Unidad, code_Valor,	code_Impuesto,code_Descuento,	code_EspecificacionEmbalaje, usua_UsuarioCreacion, code_FechaCreacion)
VALUES		(4,2,1,1,'F',1,'aca deberia ir un documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023'),
			(4,2,1,1,'F',1,'aca deberia ir un documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023'),
			(4,2,1,1,'F',1,'aca deberia ir un documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023');



/*----------------------------------------------*/
--***** INSERT TABLA ASIGNACIONES ORDEN --******--

INSERT INTO [Prod].[tbAsignacionesOrden]
           ([asor_OrdenDetId]
           ,[asor_FechaInicio]
           ,[asor_FechaLimite]
           ,[asor_Cantidad]
           ,[proc_Id]
           ,[empl_Id]
           ,[usua_UsuarioCreacion]
           ,[asor_FechaCreacion] )
     VALUES
    (2, '2023-07-31 08:00:00', '2023-08-05 17:00:00', 100,	1, 1, 1, '10-16-2004'),
    (2, '2023-08-01 09:00:00', '2023-08-06 18:00:00', 150,	2, 1, 1, '10-16-2004'),
    (2, '2023-08-02 10:00:00', '2023-08-07 19:00:00', 200,	3, 1, 1, '10-16-2004'),
    (2, '2023-08-03 11:00:00', '2023-08-08 20:00:00', 120,	1, 1, 1, '10-16-2004'),
    (2, '2023-08-04 12:00:00', '2023-08-09 21:00:00', 80,	2, 1, 1, '10-16-2004'),
    (2, '2023-08-05 13:00:00', '2023-08-10 22:00:00', 60,	3, 1, 1, '10-16-2004'),
    (2, '2023-08-06 14:00:00', '2023-08-11 23:00:00', 90,	1, 1, 1, '10-16-2004'),
    (2, '2023-08-07 15:00:00', '2023-08-12 00:00:00', 110,	2, 1, 1, '10-16-2004'),
    (2, '2023-08-08 16:00:00', '2023-08-13 01:00:00', 70,	3, 1, 1, '10-16-2004'),
    (2, '2023-08-09 17:00:00', '2023-08-14 02:00:00', 50,	1, 1, 1, '10-16-2004');


/*--------------------------------------------------------*/
--***** INSERT TABLA ASIGNACIONES ORDEN DETALLES --******--
GO
INSERT INTO [Prod].[tbAsignacionesOrdenDetalle](lote_Id, adet_Cantidad, asor_Id, usua_UsuarioCreacion, adet_FechaCreacion)
VALUES	(1,		50,	2,	 1, '10-16-2004'),
		(1,		30,	2,	 1, '10-16-2004'),
		(1,		20,	2,	 1, '10-16-2004'),
		(1,		40,	3,	 1, '10-16-2004'),
		(1,		60,	3,	 1, '10-16-2004'),
		(1,		25,	3,	 1, '10-16-2004'),
		(1,		35,	3,	 1, '10-16-2004'),
		(1,		45,	4,	 1, '10-16-2004'),
		(1,		55,	4,	 1, '10-16-2004'),
		(1,		70,	4,	 1,	'10-16-2004');




/*-----------------------------------------------*/
--***** INSERT TABLA PEDIDOS PRODUCCION --******--
GO
INSERT INTO Prod.tbPedidosProduccion (empl_Id, ppro_Fecha, ppro_Estados, ppro_Observaciones, usua_UsuarioCreacion, ppro_FechaCreacion)
VALUES	(1, GETDATE(), 'En Proceso',	'--------', 1, GETDATE()),
		(1, GETDATE(), 'En Proceso',	'--------', 1, GETDATE()),
		(1, GETDATE(), 'Pendiente',		'--------', 1, GETDATE());


/*------------------------------------------------------*/
--***** INSERT TABLA PEDIDOS PRODUCCION DETALLE --******--
GO
INSERT INTO Prod.tbPedidosProduccionDetalles (ppro_Id, lote_Id, ppde_Cantidad, usua_UsuarioCreacion, ppde_FechaCreacion)
VALUES (1, 4, 10, 1, GETDATE());


/*------------------------------------------------------------------*/
--***** INSERT TABLA ORDEN ENSAMBLADOS ACABOADOS ETIQUETADO --******--
GO
INSERT INTO [Prod].[tbOrde_Ensa_Acab_Etiq] (ensa_Cantidad, empl_Id, code_Id, ensa_FechaInicio, ensa_FechaLimite, ppro_Id, proc_Id, usua_UsuarioCreacion, ensa_FechaCreacion, ensa_Estado)
VALUES	(20,1, 3, '01/08/2023', '01/08/2023', 1,1, 1, '07/31/2023', 1),
		(100,1,2,'08/09/2023', '08/29/2023',1,2,1, GETDATE(), 1  );



/*---------------------------------------*/
--**** INSERT TABLA REVISION CALIDAD ****--
GO
INSERT INTO Prod.tbRevisionDeCalidad (ensa_Id, reca_Descripcion, reca_Cantidad, reca_Scrap, reca_FechaRevision, reca_Imagen, usua_UsuarioCreacion, reca_FechaCreacion)
VALUES (1,'Le falta un boton en la parte de arriba por el cuello', 1,1,'07/31/2023','imagen_de_una_camisa.jpg', 1,GETDATE()),
       (1,'Tiene un agujero en la manga derecha de la camisa', 1,1,'07/31/2023','imagen_de_una_camisa1.jpg', 1,GETDATE());



/*------------------------------------------*/
--**** INSERT TABLA REPORTE MODULO DIA ****--
GO
INSERT INTO Prod.tbReporteModuloDia (modu_Id, remo_Fecha, remo_TotalDia, remo_TotalDanado, usua_UsuarioCreacion, remo_FechaCreacion)
VALUES (1,'09/08/2023', 100,0,1,GETDATE()),
       (2,'10/08/2023', 100,0,1,GETDATE()),
	   (3,'10/08/2023', 100,0,1,GETDATE());


/*-------------------------------------------------*/
--**** INSERT TABLA REPORTE MODULO DIA DETALLE ****--
GO
INSERT INTO Prod.tbReporteModuloDiaDetalle (remo_Id, rdet_TotalDia, rdet_TotalDanado, code_Id, usua_UsuarioCreacion, rdet_FechaCreacion)
VALUES (1,50,0,1,1,GETDATE()),
       (1,50,0,1,1,GETDATE()),
	   (2,100,0,2,1,GETDATE()),
	   (3,100,0,3,1,GETDATE());


/*-------------------------------------------*/
--******** INSERT TABLA PEDIDOS ORDEN *******--
GO
INSERT INTO [Prod].[tbPedidosOrden] (prov_Id, peor_No_Duca, peor_FechaEntrada, peor_Obsevaciones, peor_DadoCliente, peor_Est, usua_UsuarioCreacion, peor_FechaCreacion)
VALUES    (1, '83739333921', GETDATE(), '----', 1, 1, 1 , GETDATE());

/*------------------------------------------------------*/
--****** INSERT TABLA PEDIDOS ORDEN DETALLES *******--
GO
INSERT INTO [Prod].[tbPedidosOrdenDetalle] (pedi_Id, mate_Id, prod_Cantidad,prod_Precio,prod_Peso, usua_UsuarioCreacion, prod_FechaCreacion)
VALUES		(1, 2, 20, 500.00, 20.5, 1, GETDATE()),
			(1, 1, 50, 500.00, 20.5, 1, GETDATE()),
			(1, 3, 30, 500.00, 20.5, 1, GETDATE());

