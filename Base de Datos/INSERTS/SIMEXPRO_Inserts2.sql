
/*---------------------------------*/
--***** INSERT TABLA ROLES --******--

INSERT INTO [Acce].[tbRoles]
    ([role_Descripcion]
    ,[usua_UsuarioCreacion]
    ,[role_FechaCreacion]
    ,[usua_UsuarioModificacion]
    ,[role_FechaModificacion]
    ,[usua_UsuarioEliminacion]
    ,[role_FechaEliminacion]
    ,[role_Estado])
VALUES
    ('Gerente de Operaciones',					1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Ejecutivo de Ventas',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Analista de Logística',					1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Agente de Aduanas',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Asistente Administrativo',				1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Coordinador de Transporte',				1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Operador de Almacén',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Inspector Aduanero',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Analista de Documentación',				1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Asesor Comercial',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Operario de Máquina de Tejido',			1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Técnico de Mantenimiento de Telares',		1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Supervisor de Producción',				1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Control de Calidad',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Operario de Acabado',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Jefe de Línea de Producción',				1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Ingeniero Textil',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Auxiliar de Almacén de Materias Primas',	1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Diseñador Textil',						1, '10-16-2004', NULL, NULL, NULL, NULL, 1),
    ('Operario de Corte de Telas',				1, '10-16-2004', NULL, NULL, NULL, NULL, 1);


/*---------------------------------*/
--***** INSERT TABLA USUARIOS --******--
INSERT INTO Acce.tbUsuarios (usua_Nombre, usua_Contrasenia, empl_Id, usua_Image, role_Id, usua_EsAdmin, usua_UsuarioCreacion, usua_FechaCreacion)
VALUES	('Juan Perez',		'contrasenia123',	1, 'imagen_juan.jpg',	1,	0, 1,'10-16-2004'),
		('Maria Rodriguez',	'maria2023',		1, 'imagen_maria.jpg',	2,	0, 1,'10-16-2004'),
		('Pedro Gomez',		'12345678',			1, 'imagen_pedro.jpg',	3,	0, 1,'10-16-2004'),
		('Ana Torres',		'ana2023',			1, 'imagen_ana.jpg',	4,	0, 1,'10-16-2004'),
		('Carlos Ramirez',	'carlos789',		1, 'imagen_carlos.jpg', 5,	0, 1,'10-16-2004'),
		('Luisa Chavez',	'luisa123',			1, 'imagen_luisa.jpg',	10, 0, 1,'10-16-2004'),
		('Sofia Fernandez',	'sofia2023',		1, 'imagen_sofia.jpg',	11, 0, 1,'10-16-2004'),
		('Diego Morales',	'morales321',		1, 'imagen_diego.jpg',	12, 0, 1,'10-16-2004'),
		('Laura Ramirez',	'laura456',			1, 'imagen_laura.jpg',	13, 0, 1,'10-16-2004'),
		('Ricardo Herrera',	'ricardo2023',		1, 'imagen_ricardo.jpg',14, 0, 1,'10-16-2004')



/*---------------------------------*/
--***** INSERT TABLA TIPO DE LIQUIDACION --******--

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Importación Regular', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Exportación Definitiva', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Importación Temporal', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Importación para Reexportación en el Mismo Estado', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Exportación Temporal', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Admisión Temporal para Perfeccionamiento Activo', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Tránsito Aduanero', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Tránsito Aduanero Internacional', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Depósito Aduanero', 1, '10-16-2004');

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Admisión Temporal para Reexportación en el Mismo Estado', 1, '10-16-2004');

/*---------------------------------*/
--***** INSERT TABLA TIPOS DE IDENTIFICACION --******--

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Cédula de Ciudadanía', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Cédula de Extranjería', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Pasaporte', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Tarjeta de Identidad', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Registro Civil', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('NIT (Número de Identificación Tributaria)', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('RUT (Registro Único Tributario)', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('PAS (Permiso de Apartado Postal)', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('PEP (Persona Expuesta Políticamente)', 1, '10-16-2004');

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Carné Diplomático', 1, '10-16-2004');



/*---------------------------------*/
--***** INSERT TABLA MARCAS --******--

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


/*---------------------------------*/
--***** INSERT TABLA TRANPORTES --******--

INSERT INTO [Adua].[tbTransporte]
			([pais_Id], 
			[tran_Chasis], 
			[marca_Id], 
			[tran_Remolque], 
			[tran_CantCarga], 
			[tran_NumDispositivoSeguridad], 
			[tran_Equipamiento], 
			[tran_TipoCarga], 
			[tran_IdContenedor], 
			[usua_UsuarioCreacio], 
			[tran_FechaCreacion])	
VALUES	(1, 'CH1234', 1, 'REM5678', 5000, 1234, 'GPS Tracker',				'Carga General',			'CNT9876', 1, '10-16-2004'),
	    (2, 'CH5678', 2, 'REM9012', 7000, 5678, 'Rastreo Satelital',		'Carga Peligrosa',			'CNT5432', 1, '10-16-2004'),
		(3, 'CH9012', 3, 'REM3456', 6000, 9012, 'Bloques de Refrigeración', 'Carga Perecedera',			'CNT7654', 1, '10-16-2004'),
	    (4, 'CH3456', 1, 'REM7890', 8000, 3456, 'Contenedor Refrigerado',	'Carga A granel',			'CNT1234', 1, '10-16-2004'),
	    (5, 'CH6789', 2, 'REM2345', 9000, 6789, 'Contenedor Cisterna',		'Carga Líquida',			'CNT5678', 1, '10-16-2004'),
	    (1, 'CH9010', 3, 'REM6543', 7500, 9010, 'Plataforma',				'Carga Sobredimensionada',	'CNT4567', 1, '10-16-2004'),
	    (2, 'CH6543', 1, 'REM8901', 5500, 6543, 'Racks de Carga',			'Carga Paletizada',			'CNT8765', 1, '10-16-2004'),
	    (3, 'CH2345', 2, 'REM6789', 6500, 2345, 'Toldos Protector',			'Carga Liviana',			'CNT3456', 1, '10-16-2004'),
	    (4, 'CH8901', 3, 'REM0123', 4500, 8901, 'Contenedor Cerrado',		'Carga de Vehículos',		'CNT2345', 1, '10-16-2004'),
	    (5, 'CH0123', 1, 'REM4567', 7000, 0123, 'Furgón',					'Carga Seca',				'CNT6789', 1, '10-16-2004');



/*---------------------------------*/
--***** INSERT TABLA PROCESOS --******--

    INSERT INTO [Prod].[tbProcesos]([proc_Descripcion],[usua_UsuarioCreacion],[proc_FechaCreacion] )
    VALUES	('Corte de tela',			1, '10-16-2004'),
			('Confección de prenda',	1, '10-16-2004'),
			('Estampado',				1, '10-16-2004'),
			('Bordado',					1, '10-16-2004'),
			('Planchado',				1, '10-16-2004'),
			('Empaque',					1, '10-16-2004'),
			('Revisión de calidad',		1, '10-16-2004'),
			('Etiquetado',				1, '10-16-2004'),
			('Envío a distribución',	1, '10-16-2004'),
			('Almacenamiento',			1, '10-16-2004');


/*---------------------------------*/
--***** INSERT TABLA LOTES --******--
INSERT INTO [Prod].[tbLotes] (mate_Id, unme_Id, lote_Stock, lote_CantIngresada, lote_Observaciones, tipa_Id, usua_UsuarioCreacion, lote_FechaCreacion)
VALUES	(3,1,10,10,'-----',1,1,'10-16-2004'),
		(3,1,10,10,'-----',1,1,'10-16-2004'),
		(3,1,10,10,'-----',1,1,'10-16-2004'),
		(3,1,10,10,'-----',1,1,'10-16-2004')


/*---------------------------------*/
--***** INSERT TABLA ORDEN DE COMPRA --******--

	INSERT INTO Prod.tbOrdenCompra
		(orco_IdCliente, 
		orco_FechaEmision,	
		orco_FechaLimite, 
		orco_MetodoPago, 
		orco_Materiales,	
		orco_IdEmbalaje, 
		orco_EstadoOrdenCompra, 
		orco_DireccionEntrega,	
		usua_UsuarioCreacion, 
		orco_FechaCreacion)
	VALUES	( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
			( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
			( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023'),
			( 1,'01/08/2023','01/08/2023',1,1,1,'p','MI CASA',1,'01/08/2023');

GO


/*---------------------------------*/
--***** INSERT TABLA ORDEN DE COMPRA DETALLE --******--

	INSERT INTO Prod.tbOrdenCompraDetalles
				(orco_Id, 
				code_CantidadPrenda, 
				esti_Id, 
				tall_Id, 
				code_Sexo, 
				colr_Id, 
				code_Documento, 
				code_Medidas, 
				proc_IdComienza, 
				proc_IdActual, 
				code_Unidad, 
				code_Valor,	
				code_Impuesto,
				code_Descuento,	
				code_EspecificacionEmbalaje, 
				usua_UsuarioCreacion, 
				code_FechaCreacion)
	VALUES		(4,2,1,1,'F',1,'aca deberia ir un documento','aca deberia ir otro documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023'),
				(4,2,1,1,'F',1,'aca deberia ir un documento','aca deberia ir otro documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023'),
				(4,2,1,1,'F',1,'aca deberia ir un documento','aca deberia ir otro documento',1,1,20,10,8,9,'no se la verdad',1,'01/08/2023');



/*---------------------------------*/
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


/*---------------------------------*/
--***** INSERT TABLA ASIGNACIONES ORDEN DETALLES --******--
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




--------------------------------------

GO
--TIPO DE EMBALAJE--
INSERT INTO [Prod].[tbTipoEmbalaje]
(tiem_Descripcion, usua_UsuarioCreacion, tiem_FechaCreacion, tiem_Estado)
VALUES
('Embalaje de Prueba', 1, GETDATE(), 1)

GO


--COLORES--
INSERT INTO [Prod].[tbColores]
(colr_Nombre, usua_UsuarioCreacion, colr_FechaCreacion, colr_Estado)
VALUES
('Purpura',1,GETDATE(),1)

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



INSERT INTO [Adua].[tbConductor]
(cont_Nombre, cont_Apellido, cont_Licencia, pais_IdExpedicion, tran_Id, usua_UsuarioCreacion, cont_FechaCreacion, cont_Estado)
VALUES
('Juan David','Lopez','6420651011315844845',100,1,1,GETDATE(),1),
('Pedro','Toledo','6420651011315844846',100,1,1,GETDATE(),1),
('Sebastian','Santana','6420651011315844847',100,1,1,GETDATE(),1);

GO

/*
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

*/