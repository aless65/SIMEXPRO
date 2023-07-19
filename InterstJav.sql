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
