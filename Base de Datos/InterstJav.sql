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
VALUES	
(1,NULL,1,1,GETDATE()),
(1,NULL,2,1,GETDATE()),
(2,NULL,3,1,GETDATE()),
(2,NULL,4,1,GETDATE()),
(1,NULL,5,1,GETDATE()),
(3,NULL,6,1,GETDATE()),
(6,NULL,7,1,GETDATE()),
(4,NULL,8,1,GETDATE()),
(5,NULL,9,1,GETDATE()),
(5,NULL,10,1,GETDATE())


INSERT INTO Prod.tbCategoria (cate_Descripcion, usua_UsuarioCreacion, cate_FechaCreacion)
VALUES ('Telas',1,GETDATE()),
('Tejidos especiales',1,GETDATE()),
('Hilos y fibras',1,GETDATE()),
('Acabados textiles',1,GETDATE()),
('Confección de prendas',1,GETDATE())

INSERT INTO Prod.tbSubcategoria (cate_Id, subc_Descripcion, usua_UsuarioCreacion, subc_FechaCreacion)
VALUES	(1,'Algodon',1,GETDATE()),
		(1,'lino',1,GETDATE()),
		(1,'Seda',1,GETDATE()),
		(1,'Poliéster',1,GETDATE()),
		(1,'Nailon',1,GETDATE()),
		(1,'Spandex',1,GETDATE()),
		(1,'Acrílico',1,GETDATE()),
		
		(2,'Terciopelo de seda',1,GETDATE()),
		(2,'Terciopelo de algodón',1,GETDATE()),
		(2,'Terciopelo elástico',1,GETDATE()),
		(2,'Encaje floral',1,GETDATE()),
		(2,'Encaje chantilly',1,GETDATE()),
		(2,'Encaje elástico',1,GETDATE()),
		(2,'Tela vaquera',1,GETDATE()),
		
		(3,'Hilos de algodón',1,GETDATE()),
		(3,'Hilos de poliéster',1,GETDATE()),
		(3,'Hilos de seda',1,GETDATE()),
		(3,'Algodón orgánico',1,GETDATE()),
		(3,'Lana merino',1,GETDATE()),
		(3,'Fibra de coco',1,GETDATE()),
		(3,'Fibra de acrílico',1,GETDATE()),
		
		(4,'Teñido de tela a mano',1,GETDATE()),
		(4,'Teñido a máquina',1,GETDATE()),
		(4,'Teñido reactivo',1,GETDATE()),
		(4,'Estampado digital',1,GETDATE()),
		(4,'Serigrafía',1,GETDATE()),
		(4,'Estampados con relieve',1,GETDATE()),
		(4,'Tejidos repelentes al agua',1,GETDATE()),
		
		(5,'Camisas',1,GETDATE()),
		(5,'pantalones',1,GETDATE()),
		(5,'chaquetas',1,GETDATE()),
		(5,'Vestidos',1,GETDATE()),
		(5,'faldas',1,GETDATE()),
		(5,'blusas',1,GETDATE()),
		(5,'Conjuntos para bebés',1,GETDATE())

INSERT INTO Prod.tbMarcasMaquina (marq_Nombre, usua_UsuarioCreacion, marq_FechaCreacion)
VALUES	('Tajima',1,GETDATE()),
		('Stoll',1,GETDATE()),
		('Karl Mayer',1,GETDATE()),
		('Rieter',1,GETDATE()),
		('Thies',1,GETDATE())

INSERT INTO Prod.tbFuncionesMaquina(func_Nombre, usua_UsuarioCreacion, func_FechaCreacion)
VALUES	('Bordado',1,GETDATE()),
		('Tejido de punto',1,GETDATE()),
		('Urdimbre y tricotado',1,GETDATE()),
		('Hilatura',1,GETDATE()),
		('Teñido de hilo',1,GETDATE())

INSERT INTO Prod.tbModelosMaquina (mmaq_Nombre, marq_Id, func_Id, mmaq_Imagen, usua_UsuarioCreacion, mmaq_FechaCreacion)
VALUES	('SAI',1,1,'https://www.tajimadst.com/wp-content/uploads/2019/07/SAI_1.jpg',1,GETDATE()),
		('ADF 530-16 KI',2,2,'https://www.indiantextilemagazine.in/wp-content/uploads/2023/05/Fig5.jpg',1,GETDATE()),
		('HKS 2-SE',3,3,'https://www.karlmayer.com/ecomaXL/files/hks_2_se_gesamt_16789_final02.jpg?w=200&crop=200,200',1,GETDATE()),
		('VARIOline',	4,4,'https://www.rieter.com/fileadmin/_processed_/9/0/csm_varioline-mill-layout-2022-ECOized-2400Kg-rieter-96246_4c9505e247.jpg',1,GETDATE()),
		('iCono',5,5,'https://www.thiestextilmaschinen.de/wp-content/uploads/2020/10/4.1.2.1-iCone-Familie-1-scaled.jpg',1,GETDATE())

INSERT INTO Prod.tbMaquinas (maqu_NumeroSerie, mmaq_Id, modu_Id, usua_UsuarioCreacion, maqu_FechaCreacion)
VALUES	('00001',1,1,1,GETDATE()),
		('00002',2,2,1,GETDATE()),
		('00003',3,3,1,GETDATE()),
		('00004',4,4,1,GETDATE()),
		('00005',5,5,1,GETDATE())

INSERT INTO Adua.tbEstadoMercancias (merc_Descripcion, usua_UsuarioCreacion, merc_FechaCreacion)
VALUES ('FRACCIONADO', 1, GETDATE());

INSERT INTO Gral.tbFormas_Envio (foen_Codigo,foen_Descripcion, usua_UsuarioCreacion, foen_FechaCreacion)
VALUES ('FR', 'FRACCIONADO', 1, GETDATE()),
('OT', 'OTRO', 1, GETDATE()),
('PR', 'PARCIAL', 1, GETDATE()),
('TT', 'TOTAL', 1, GETDATE())