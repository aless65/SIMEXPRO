--*****Modo Transporte*****--
--CREATE OR ALTER VIEW VW_tbModoTransporte
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbModoTransporte_Listar
AS
BEGIN
SELECT	modo.motr_Id						AS modoTransId,
		modo.motr_Descripcion				AS modoTransD,
		crea.usua_Nombre					AS usarioCreacion,
		modo.motr_FechaCreacion				AS fechaCreacion,
		modi.usua_Nombre					AS usuarioModificacion,
		modo.motr_FechaModificacion			AS fechModificacion,
		modo.motr_Estado					AS modoTransEstado				
FROM	Adua.tbModoTransporte modo 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = modo.usua_UsuarioCreacion		
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = modo.usua_UsuarioModificacion 
WHERE	motr_Estado = 1
END
GO
--*****Insertar*****--

--Adua.UDP_tbModoTransporte_Insertar 'Probando',1, '01-14-2003'
--   SELECT*FROM Adua.tbModoTransporte

CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Insertar
@motr_Descripcion		NVARCHAR(75),
@usua_UsuarioCreacion	INT,
@motr_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY 
		INSERT INTO Adua.tbModoTransporte(motr_Descripcion,usua_UsuarioCreacion,motr_FechaCreacion)
		VALUES (
		@motr_Descripcion,
		@usua_UsuarioCreacion,
		@motr_FechaCreacion
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Editar
@motr_Id					INT,
@motr_Descripcion			NVARCHAR(75),
@usua_UsuarioModificacion	INT,
@motr_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY 

		UPDATE Adua.tbModoTransporte
		SET		motr_Descripcion = @motr_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				motr_FechaModificacion = @motr_FechaModificacion
		WHERE	motr_Id = @motr_Id
		
		SELECT 1
	END TRY 
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--  Adua.UDP_tbModoTransporte_Editar 1, 'pruebaaa',1,'07-18-2023'


--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Eliminar
--*****Tipos de documento*****--
--CREATE OR ALTER VIEW VW_tbTipoDocumento
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbTipoDocumento_Listar
AS
BEGIN
SELECT	tido_Id								AS tipoDocId, 
		tido_Codigo							AS tipoDocCodigo,
		tido_Descripcion					AS tipoDocDescripcion, 
		crea.usua_Nombre					AS usarioCreacion,
		tido_FechaCreacion					AS fechaCreacion,
		modi.usua_Nombre					AS usuarioModificacion,
		tido_FechaModificacion				AS fechModificacion,
		tido_Estado 						AS tipoDocEstado				
FROM	Adua.tbTipoDocumento tido 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tido.usua_UsuarioCreacion 
		INNER JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tido.usua_UsuarioModificacion 
WHERE	tido_Estado = 1
END
GO

--*****Insertar*****--
--Adua.UDP_tbTipoDocumento_Insertar 'kl45', 'probandoo',1,'07-18-2023'
--  select*from  Adua.tbTipoDocumento

CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Insertar
@tido_Codigo			CHAR(4),
@tido_Descripcion		NVARCHAR(50),
@usua_UsuarioCreacion	INT,
@tido_FechaCrea			DATETIME
AS
BEGIN
	BEGIN TRY
				INSERT INTO Adua.tbTipoDocumento (tido_Codigo,tido_Descripcion,usua_UsuarioCreacion,tido_FechaCreacion)
				VALUES (
				@tido_Codigo,
				@tido_Descripcion,
				@usua_UsuarioCreacion,
				@tido_FechaCrea
				)
				SELECT 1
	END TRY
	BEGIN CATCH
	SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--
--Adua.UDP_tbTipoDocumento_Editar 1, 'LL45', 'PRUEBA2',1, '07-18-2023'
-- SELECT * FROM Adua.tbTipoDocumento


CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Editar
@tido_Id					INT,
@tido_Codigo				CHAR(4),
@tido_Descripcion			NVARCHAR(50),
@usua_UsuarioModificacion	INT,
@tido_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbTipoDocumento
		SET @tido_Descripcion = @tido_Descripcion,
		tido_Codigo = @tido_Codigo,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		tido_FechaModificacion = @tido_FechaModificacion
		WHERE tido_Id = @tido_Id
	END TRY
BEGIN CATCH 
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH
END
GO

--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Eliminar
--*****Tipos de Liquidacion*****--
--CREATE OR ALTER VIEW VW_tbTipoLiquidacion
--*****Listado*****--

CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbTipoLiquidacion_Listar
AS
BEGIN
SELECT	tipl_Id								AS tipoLiquidacId, 
		tipl_Descripcion					AS tipoLiquidacDescripcion, 
		crea.usua_Nombre					AS usarioCreacion, 
		tipl_FechaCreacion					AS fechaCreacion,	 
		modi.usua_Nombre					AS usuarioModificacion, 
		tipl_FechaModificacion				AS fechModificacion,
		tipl_Estado 						AS tipoLiquidacEstado			
FROM	Adua.tbTipoLiquidacion tilin 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tilin.usua_UsuarioCreacion 
		INNER JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tilin.usua_UsuarioModificacion
WHERE	tipl_Estado = 1
END
GO

--*****Insertar*****--
--Adua.UDP_tbTipoLiquidacion_Insertar 'PROBANDOO', 1, '07-18-2023'

CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Insertar
@tipl_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tipl_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbTipoLiquidacion (tipl_Descripcion,usua_UsuarioModificacion, tipl_FechaModificacion)
		VALUES (
		@tipl_Descripcion,		
		@usua_UsuarioCreacion,
		@tipl_FechaCreacion	
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Editar
@tipl_Id					INT,
@tipl_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tipl_FechaModificacion 	DATETIME
AS
BEGIN
	BEGIN TRY
			UPDATE Adua.tbTipoLiquidacion
			SET tipl_Descripcion = @tipl_Descripcion,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			tipl_FechaModificacion = @tipl_FechaModificacion
			WHERE tipl_Id = @tipl_Id
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Eliminar
--*****Estado Boletin*****--
--CREATE OR ALTER VIEW VW_tbEstadoBoletin
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbEstadoBoletin_Listar
AS
BEGIN
SELECT	esbo_Id								AS estadoBoletinId, 
		esbo_Descripcion					AS estadoBoletinDescripcion, 
		crea.usua_Nombre					AS usarioCreacion,		
		esbo_FechaCreacion					AS fechaCreacion,
		modi.usua_Nombre					AS usuarioModificacion,
		esbo_FechaModificacion				AS fechModificacion,
		esbo_Estadoo 						AS estadoBoletinID			
FROM	Adua.tbEstadoBoletin esbo 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = esbo.usua_UsuarioCreacion 
		INNER JOIN Acce.tbUsuarios modi		ON modi.usua_Id = esbo.usua_UsuarioModificacion 
WHERE	esbo_Estadoo = 1
END 
GO
--*****Insertar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Insertar
@esbo_Descripcion		INT,
@usua_UsuarioCreacion	NVARCHAR(200),
@esbo_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
			INSERT INTO Adua.tbEstadoBoletin(esbo_Descripcion,usua_UsuarioCreacion,esbo_FechaCreacion)
			VALUES (
			@esbo_Descripcion,		
			@usua_UsuarioCreacion,	
			@esbo_FechaCreacion					
			)
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
--*****Editar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Editar
@esbo_Id					INT,
@esbo_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@esbo_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Adua.tbEstadoBoletin
		SET esbo_Descripcion = @esbo_Descripcion,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		esbo_FechaModificacion = @esbo_FechaModificacion
		WHERE esbo_Id = @esbo_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Prod.UDP_tbEstadoBoletin_Eliminar
--*****Procesos*****--
--CREATE OR ALTER VIEW VW_tbProcesos
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_VW_tbProcesos_Listar
AS
BEGIN
SELECT	proc_Id								AS procesoId, 
		proc_Descripcion					AS procesoDescripcion, 
		crea.usua_Nombre					AS usarioCreacion,			 
		proc_FechaCreacion					AS fechaCreacion,
		modi.usua_Nombre  					AS usuarioModificacion,
		proc_FechaModificacion				AS fechaModificacion,
		elim.usua_Nombre 					AS usuarioEliminacion,
		proc_FechaEliminacion				AS fechaEliminacion,
		proc_Estado							AS procesoEstado	
FROM	Prod.tbProcesos pro 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = pro.usua_UsuarioCreacion 
		INNER JOIN Acce.tbUsuarios modi		ON modi.usua_Id = pro.usua_UsuarioModificacion 
		INNER JOIN Acce.tbUsuarios elim		ON elim.usua_Id = pro.usua_UsuarioEliminacion 
WHERE	proc_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Insertar
@proc_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@proc_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Prod.tbProcesos WHERE proc_Descripcion = @proc_Descripcion AND proc_Estado = 0)
			BEGIN
				UPDATE Prod.tbProcesos
				SET proc_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioCreacion,
				proc_FechaModificacion = @proc_FechaCreacion
				WHERE proc_Descripcion = @proc_Descripcion
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Prod.tbProcesos(proc_Descripcion,usua_UsuarioCreacion,proc_FechaCreacion)
				VALUES (
				@proc_Descripcion,		
				@usua_UsuarioCreacion,	
				@proc_FechaCreacion
				)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Editar
@proc_ID					INT,
@proc_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@proc_FechaCreacion			DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Prod.tbProcesos WHERE proc_Descripcion = @proc_Descripcion AND proc_Estado = 0)
			BEGIN
				UPDATE Prod.tbProcesos
				SET proc_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				proc_FechaModificacion = @proc_FechaCreacion
				WHERE proc_Descripcion = @proc_Descripcion
				SELECT 1
			END
		ELSE
			BEGIN
				UPDATE Prod.tbProcesos
				SET proc_Descripcion = @proc_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				proc_FechaModificacion = @proc_FechaCreacion
				WHERE proc_ID = @proc_ID
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Eliminar
@proc_ID					INT,
@usua_UsuarioEliminacion	INT,
@proc_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbProcesos
		SET proc_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		proc_FechaEliminacion = @proc_FechaEliminacion
		WHERE proc_ID = @proc_ID
	END TRY
	BEGIN CATCH 
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****AREA*****--
--CREATE OR ALTER VIEW VW_tbArea
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_VW_tbArea_Listar
AS
BEGIN
SELECT	tipa_Id							AS areaId, 
		tipa_area						AS areaDescripcion, 
		pro.proc_Id						AS procesoId, 
		pro.proc_Descripcion			AS procesoDescripcion, 
		crea.usua_Nombre 				AS usarioCreacion,		
		tipa_FechaCreacion				AS fechaCreacion,
		modi.usua_Nombre  				AS usuarioModificacion,
		tipa_FechaModificacion			AS fechaModificacion,
		elim.usua_Nombre 				AS usuarioEliminacion,
		tipa_FechaEliminacion			AS fechaEliminacion,
		tipa_Estado 					AS areaEstado	
FROM	Prod.tbArea area 
		INNER JOIN Prod.tbProcesos pro	ON area.proc_Id = pro.proc_Id  
		INNER JOIN Acce.tbUsuarios crea ON crea.usua_Id = area.usua_UsuarioCreacion 
		INNER JOIN Acce.tbUsuarios modi ON modi.usua_Id = area.usua_UsuarioModificacion 
		INNER JOIN Acce.tbUsuarios elim ON elim.usua_Id = area.usua_UsuarioEliminacion 
WHERE	tipa_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Insertar
@tipa_area				NVARCHAR(200),
@proc_Id				INT,
@usua_UsuarioCreacion	INT,
@tipa_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Prod.tbArea WHERE tipa_area = @tipa_area AND proc_Id = @proc_Id)
			BEGIN 
				UPDATE Prod.tbArea
				SET tipa_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioCreacion,
				tipa_FechaModificacion = @tipa_FechaCreacion
				WHERE tipa_area = @tipa_area
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Prod.tbArea(tipa_area,proc_Id,usua_UsuarioCreacion,tipa_FechaCreacion)
				VALUES (
				@tipa_area,				
				@proc_Id,				
				@usua_UsuarioCreacion,	
				@tipa_FechaCreacion				
				)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Editar
@tipa_Id					INT,
@tipa_area					NVARCHAR(200),
@proc_Id					INT,
@usua_UsuarioModificacion	INT,
@tipa_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Prod.tbArea WHERE tipa_area = @tipa_area AND proc_Id = @proc_Id)
			BEGIN 
				UPDATE Prod.tbArea
				SET tipa_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tipa_FechaModificacion = @tipa_FechaModificacion
				WHERE tipa_area = @tipa_area
				SELECT 1
			END
		ELSE
			BEGIN
				UPDATE Prod.tbArea
				SET tipa_area = @tipa_area,
				proc_Id = @proc_Id,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tipa_FechaModificacion = @tipa_FechaModificacion
				WHERE tipa_Id = @tipa_Id	
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Eliminar
@tipa_Id					INT,
@usua_UsuarioEliminacion	INT,
@tipa_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbArea
		SET tipa_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		tipa_FechaEliminacion = @tipa_FechaEliminacion
		WHERE tipa_Id = @tipa_Id
		
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Talla*****--
--CREATE OR ALTER VIEW VW_tbTallas
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_VW_tbTallas_Listar
AS
BEGIN
SELECT	tall_Id								AS tallaId, 
		tall_Codigo							AS tallaCodigo,
		tall_Nombre							AS tallaNombre, 
		crea.usua_Nombre					AS usarioCreacion,		
		tall_FechaCreacion					AS fechaCreacion,
		modi.usua_Nombre 					AS usuarioModificacion,
		tall_FechaModificacion 				AS fechaModificacion,
		tall_Estado							AS tallaEstado
FROM	Prod.tbTallas tall 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tall.usua_UsuarioCreacion 
		INNER JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tall.usua_UsuarioModificacion 
WHERE	tall_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Insertar
@tall_Codigo			CHAR(5),
@tall_Nombre			NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tall_FechaCreacion		DATETIME
AS
BEGIN
BEGIN TRY 
		INSERT INTO Prod.tbTallas(tall_Codigo,tall_Nombre,usua_UsuarioCreacion,tall_FechaCreacion)
		VALUES (
		@tall_Codigo,
		@tall_Nombre,
		@usua_UsuarioCreacion,
		@tall_FechaCreacion
		)
			SELECT 1
END TRY
BEGIN CATCH
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH

END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Editar
@tall_Id					INT,
@tall_Codigo				CHAR(5),
@tall_Nombre				NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tall_FechaModificacion		DATETIME
AS
BEGIN
BEGIN TRY  
		UPDATE  Prod.tbTallas 
		SET tall_Nombre = @tall_Nombre,
		tall_Codigo = @tall_Codigo,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		tall_FechaModificacion = @tall_FechaModificacion
		WHERE tall_Id = @tall_Id
			SELECT 1
END TRY
BEGIN CATCH
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH

END
GO
--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Eliminar

--*****Tipo Embalaje*****-
--CREATE OR ALTER VIEW VW_tbTipoEmbalaje
--*****Listado*****--

CREATE OR ALTER PROCEDURE Prod.UDP_VW_tbTipoEmbalaje_Listar
AS
BEGIN
SELECT	tiem_Id								AS tipoEmbalajeId, 
		tiem_Descripcion					AS tipoEmbalajeDescipcion,	
		crea.usua_Nombre					AS usarioCreacion,		
		tiem_FechaCreacion					AS fechaCreacion,
		modi.usua_Nombre 					AS usuarioModificacion,
		tiem_FechaModificacion				AS fechaModificacion,
		elim.usua_Nombre 					AS usuarioEliminacion,
		tiem_FechaEliminacion				AS fechaEliminacion,
		tiem_Estado 						AS tipoEmbalajeEstado	
FROM	Prod.tbTipoEmbalaje tiem 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tiem.usua_UsuarioCreacion 
		INNER JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tiem.usua_UsuarioModificacion 
		INNER JOIN Acce.tbUsuarios elim		ON elim.usua_Id = tiem.usua_UsuarioEliminacion
WHERE	tiem_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Insertar
@tiem_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tiem_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Prod.tbTipoEmbalaje WHERE tiem_Descripcion = @tiem_Descripcion)
		BEGIN 
			UPDATE Prod.tbTipoEmbalaje
			SET tiem_Estado = 1,
			usua_UsuarioModificacion = @usua_UsuarioCreacion,
			tiem_FechaModificacion = @tiem_FechaCreacion
			WHERE tiem_Descripcion = @tiem_Descripcion
			SELECT 1
		END
		ELSE
		BEGIN 
			INSERT INTO Prod.tbTipoEmbalaje (tiem_Descripcion, usua_UsuarioCreacion, tiem_FechaCreacion)
			VALUES (
			@tiem_Descripcion,
			@usua_UsuarioCreacion,
			@tiem_FechaCreacion
			)
			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Editar
@tiem_Id					INT,
@tiem_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tiem_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Prod.tbTipoEmbalaje WHERE tiem_Descripcion = @tiem_Descripcion)
			BEGIN 
				UPDATE Prod.tbTipoEmbalaje
				SET tiem_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tiem_FechaModificacion = @tiem_FechaModificacion
				WHERE tiem_Id = @tiem_Id
				SELECT 1
			END
		ELSE
			BEGIN 
				UPDATE Prod.tbTipoEmbalaje
				SET tiem_Descripcion = @tiem_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tiem_FechaModificacion = @tiem_FechaModificacion
				WHERE tiem_Id = @tiem_Id
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Eliminar
@tiem_Id					INT,
@usua_UsuarioEliminacion	INT,
@tiem_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbTipoEmbalaje
		SET tiem_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		tiem_FechaEliminacion = @tiem_FechaEliminacion
		WHERE tiem_Id = @tiem_Id
		SELECT 1
	END TRY 
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO