--Insert Modo de Transporte
select getdate()
INSERT INTO Adua.tbModoTransporte(motr_Descripcion,usua_UsuarioCreacion,motr_FechaCreacion)
VALUES	('Marítimo',1,GETDATE()),
		('Aéreo',1,GETDATE()),
		('Terrestre',1,GETDATE()),
		('Fluvial',1,GETDATE())
GO
--Insert Tipo de document
INSERT INTO Adua.tbTipoDocumento(tido_Codigo, tido_Descripcion,usua_UsuarioCreacion,tido_FechaCreacion)
VALUES	('DF','DUCA-F',1,GETDATE()),
		('DT','DUCA-T',1,GETDATE())
GO

--Inserts Procesos
INSERT INTO Prod.tbProcesos(proc_Descripcion,usua_UsuarioCreacion,proc_FechaCreacion)
VALUES	('Planificacion ',1,GETDATE()),
		('Corte',1,GETDATE()),
		('Ensamblado',1,GETDATE()),
		('Acabado',1,GETDATE()),
		('Calidad',1,GETDATE())
GO

--Insert Area
INSERT INTO Prod.tbArea(tipa_area,proc_Id,usua_UsuarioCreacion,tipa_FechaCreacion)
VALUES	('Area de Corte',1,1,GETDATE()),
		('Area de Ensamblado',1,1,GETDATE()),
		('Area de Acabado',1,1,GETDATE()),
		('Area de Control de Calidad',1,1,GETDATE()),
		('Area de Inventario',1,1,GETDATE())

GO
--Insert Talla
INSERT INTO Prod.tbTallas (tall_Codigo,tall_Nombre,usua_UsuarioCreacion,tall_FechaCreacion)
VALUES	
		('XXS'	,'Extra Extra Small',1,GETDATE()),
		('XS'	,'Extra Small',1,GETDATE()),
		('S'	,'Small',1,GETDATE()),
		('M'	,'Medium',1,GETDATE()),
		('L'	,'Large',1,GETDATE()),
		('XL'	,'Extra Large',1,GETDATE()),
		('XXL'	,'Extra Extra Large',1,GETDATE())
GO
--Inset Tipo Embalaje
INSERT INTO Prod.tbTipoEmbalaje(tiem_Descripcion,usua_UsuarioCreacion,tiem_FechaCreacion)
VALUES	('Cajas',1,GETDATE()),
		('Bultos',1,GETDATE()),
		('Tonel',1,GETDATE()),
		('Barril',1,GETDATE()),
		('Bolsas',1,GETDATE()),
		('Caja de Acero',1,GETDATE()),
		('Caja de Madera',1,GETDATE()),
		('Caja de Plastico',1,GETDATE())

GO 
--Insert Declarantes
INSERT INTO Adua.tbDeclarantes (decl_Nombre_Raso, decl_Direccion_Exacta, ciud_Id, decl_Correo_Electronico, decl_Telefono, decl_Fax, usua_UsuarioCreacion, decl_FechaCreacion)
VALUES	('ABC Ingeniería y Construcción S.A.'		,'Calle de la Ingeniería 123, San Pedro Sula, Cortes'	,1,'info@abc-ingenieria.com'					,'1234-5678',null,1,GETDATE()),
		('MegaCorp Tecnologías Inc.'				,'Avenida Tecnológica 456, San Pedro Sula, Cortes'		,1,'contacto@megacorp-tech.com'					,'9876-5432',null,1,GETDATE()),
		('Flores y Cía. Floristería S.L.'			,'Plaza de las Flores 789, San Pedro Sula, Cortes'		,1,'ventas@floresycia-floristeria.com'			,'2468-1357',null,1,GETDATE()),
		('Viajes Aventura Explora Ltda.'			,'Camino de la Aventura 321, San Pedro Sula, Cortes'	,1,'reservas@viajesaventuraexplora.com'			,'8642-7913',null,1,GETDATE()),
		('Delicias Repostería Fina S.A. de C.V.'	,'Calle de los Sabores 654, San Pedro Sula, Cortes'		,1,'pedidos@deliciasreposteriafina.com'			,'5793-2816',null,1,GETDATE()),
		('Moda Urbana Boutique S.A.S.'				,'Calle de la Moda 987, San Pedro Sula, Cortes'			,1,'consultas@modaurbanaboutique.com'			,'3857-9146',null,1,GETDATE()),
		('GreenEco Energías Renovables S.A.'		,'Avenida Sostenible 789, San Pedro Sula, Cortes'		,1,'soporte@greeneco-energiasrenovables.com'	,'6481-7392',null,1,GETDATE()),
		('SaludTotal Clínica Médica Ltda.'			,'Calle de la Salud 543, San Pedro Sula, Cortes'		,1,'citas@saludtotalclinica.com'				,'3194-6257',null,1,GETDATE()),
		('InterGlobal Consultores Asociados S.C.'	,'Plaza Internacional 345, San Pedro Sula, Cortes'		,1,'contacto@interglobalconsultores.com'		,'3396-2352',null,1,GETDATE()),
		('FastDelivery Logística Express S.R.L. '	,'Avenida Rápida 567, San Pedro Sula, Cortes'			,1,'info@fastdelivery-logisticaexpress.com'		,'6464-8164',null,1,GETDATE())

--Insert Proveedor declaracion
INSERT INTO Adua.tbProveedoresDeclaracion (coco_Id, pvde_Condicion_Otra, decl_Id, usua_UsuarioCreacion, pvde_FechaCreacion)
VALUES	(1,NULL,1,1,GETDATE()),



