--*****Modo Transporte*****--
--*****Vista*****--

CREATE OR ALTER VIEW Adua.VW_tbModoTransporte
AS
SELECT	modo.motr_Id,
		modo.motr_Descripcion,
		crea.usua_Nombre usua_UsuarioCreacion,
		modo.motr_FechaCreacion,
		modi.usua_Nombre usua_UsuarioModificacion,
		modo.motr_FechaModificacion,
		elim.usua_Nombre usua_UsuarioEliminacion,
		motr_FechaEliminacion,
		modo.motr_Estado
FROM Adua.tbModoTransporte modo INNER JOIN Acce.tbUsuarios crea 
ON crea.usua_Id = modo.usua_UsuarioCreacion		INNER JOIN  Acce.tbUsuarios modi 
ON modi.usua_Id = modo.usua_UsuarioModificacion INNER JOIN Acce.tbUsuarios elim
ON elim.usua_Id = modo.usua_UsuarioEliminacion
GO
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Listar
AS
BEGIN
SELECT * FROM Adua.VW_tbModoTransporte
WHERE motr_Estado = 1
END
GO
--*****Insertar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Insertar
@motr_Descripcion		NVARCHAR(75),
@usua_UsuarioCreacion	INT,
@motr_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY 
		
		IF EXISTS (SELECT * FROM Adua.tbModoTransporte WHERE motr_Descripcion = @motr_Descripcion AND motr_Estado = 0)
			BEGIN
				UPDATE Adua.tbModoTransporte
				SET motr_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioCreacion,
				motr_FechaModificacion = @motr_FechaCreacion
				WHERE motr_Descripcion = @motr_Descripcion
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Adua.tbModoTransporte(motr_Descripcion,usua_UsuarioCreacion,motr_FechaCreacion)
				VALUES (
				@motr_Descripcion,
				@usua_UsuarioCreacion,
				@motr_FechaCreacion
				)
			END
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
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
		IF EXISTS (SELECT * FROM Adua.tbModoTransporte WHERE motr_Descripcion = @motr_Descripcion AND motr_Estado = 0)
			BEGIN
				UPDATE Adua.tbModoTransporte
				SET motr_Estado = 1,
					usua_UsuarioModificacion = @usua_UsuarioModificacion,
					motr_FechaModificacion = @motr_FechaModificacion
				WHERE motr_Descripcion = @motr_Descripcion
				SELECT 1
			END
		ELSE
			BEGIN
		UPDATE Adua.tbModoTransporte
		SET		motr_Descripcion = @motr_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				motr_FechaModificacion = @motr_FechaModificacion
		WHERE	motr_Id = @motr_Id
		
		SELECT 1
			END
	END TRY 
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Eliminar
@motr_Id					INT,
@usua_UsuarioEliminacion	INT,
@motr_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbModoTransporte
		SET		motr_Estado		= 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		motr_FechaEliminacion	= @motr_FechaEliminacion
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
--*****Tipos de documento*****--
--*****Vista*****--
CREATE OR ALTER VIEW Adua.VW_tbTipoDocumento
AS
SELECT	tido_Id, 
		tido_Descripcion, 
		crea.usua_Nombre usua_UsuarioCreacion, 
		tido_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		tido_FechaModificacion, 
		elim.usua_Nombre usua_UsuarioEliminacion,
		tido_FechaEliminacion,
		tido_Estado 
FROM	Adua.tbTipoDocumento tido INNER JOIN Acce.tbUsuarios crea 
ON crea.usua_Id = tido.usua_UsuarioCreacion INNER JOIN  Acce.tbUsuarios modi 
ON modi.usua_Id = tido.usua_UsuarioModificacion INNER JOIN Acce.tbUsuarios elim
ON elim.usua_Id = tido.usua_UsuarioEliminacion
GO

--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Listar
AS
BEGIN
SELECT * FROM Adua.VW_tbTipoDocumento
WHERE tido_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Insertar
@tido_Id				CHAR(4),
@tido_Descripcion		NVARCHAR(50),
@usua_UsuarioCreacion	INT,
@tido_FechaCrea			DATETIME
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT * FROM Adua.tbTipoDocumento WHERE tido_Descripcion = @tido_Descripcion OR tido_Id = @tido_Id AND tido_Estado = 0)
			BEGIN
				UPDATE Adua.tbTipoDocumento
				SET tido_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioCreacion,
				tido_FechaModificacion = @tido_FechaCrea
				WHERE @tido_Id = tido_Id
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Adua.tbTipoDocumento (tido_Id,tido_Descripcion,usua_UsuarioCreacion,tido_FechaCreacion)
				VALUES (
				@tido_Id,
				@tido_Descripcion,
				@usua_UsuarioCreacion,
				@tido_FechaCrea
				)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
	SELECT 0
	END CATCH
END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Editar
@tido_Id					CHAR(4),
@tido_Descripcion			NVARCHAR(50),
@usua_UsuarioModificacion	INT,
@tido_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Adua.tbTipoDocumento WHERE tido_Descripcion = @tido_Descripcion AND tido_Id = @tido_Id AND tido_Estado = 0)
			BEGIN
				UPDATE Adua.tbTipoDocumento
				SET tido_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tido_FechaModificacion = @tido_FechaModificacion
				WHERE @tido_Id = tido_Id

				SELECT 1
			END
		ELSE
			BEGIN
				UPDATE Adua.tbTipoDocumento
				SET @tido_Descripcion = @tido_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tido_FechaModificacion = @tido_FechaModificacion
				WHERE tido_Id = @tido_Id

				SELECT 1
			END
	END TRY
BEGIN CATCH 
	SELECT 0
END CATCH
END
GO

--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Eliminar
@tido_Id					CHAR(4),
@usua_UsuarioEliminacion		INT,
@tido_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbTipoDocumento
		SET tido_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		tido_FechaEliminacion = tido_FechaEliminacion
		WHERE tido_Id = @tido_Id
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
--*****Tipos de Liquidacion*****--
--*****Vista*****--
CREATE OR ALTER VIEW Adua.VW_tbTipoLiquidacion
AS
SELECT	tipl_Id, 
		tipl_Descripcion, 
		crea.usua_Nombre usua_UsuarioCreacion, 
		tipl_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		tipl_FechaModificacion, 
		elim.usua_Nombre usua_UsuarioEliminacion,
		tipl_FechaEliminacion,
		tipl_Estado 
FROM	Adua.tbTipoLiquidacion tilin INNER JOIN Acce.tbUsuarios crea 
ON crea.usua_Id = tilin.usua_UsuarioCreacion INNER JOIN  Acce.tbUsuarios modi 
ON modi.usua_Id = tilin.usua_UsuarioModificacion INNER JOIN Acce.tbUsuarios elim
ON elim.usua_Id = tilin.usua_UsuarioEliminacion
GO
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Listar
AS
BEGIN
SELECT * FROM Adua.VW_tbTipoLiquidacion
WHERE tipl_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Insertar
@tipl_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tipl_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Adua.tbTipoLiquidacion WHERE tipl_Descripcion = @tipl_Descripcion AND tipl_Estado = 0)
			BEGIN
				UPDATE Adua.tbTipoLiquidacion
				SET tipl_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioCreacion,
				tipl_FechaModificacion = @tipl_FechaCreacion
				WHERE tipl_Descripcion = @tipl_Descripcion

				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Adua.tbTipoLiquidacion (tipl_Descripcion,usua_UsuarioModificacion, tipl_FechaModificacion)
				VALUES (
				@tipl_Descripcion,		
				@usua_UsuarioCreacion,
				@tipl_FechaCreacion	
				)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
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
		IF EXISTS (SELECT * FROM Adua.tbTipoLiquidacion WHERE tipl_Descripcion = @tipl_Descripcion AND tipl_Estado = 0)
			BEGIN
				UPDATE Adua.tbTipoLiquidacion
				SET tipl_Estado = 1,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tipl_FechaModificacion = @tipl_FechaModificacion
				WHERE tipl_Descripcion = @tipl_Descripcion

				SELECT 1
			END
		ELSE
			BEGIN
				UPDATE Adua.tbTipoLiquidacion
				SET tipl_Descripcion = @tipl_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				tipl_FechaModificacion = @tipl_FechaModificacion
				WHERE tipl_Id = @tipl_Id
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Eliminar
@tipl_Id					INT,
@usua_UsuarioEliminacion	INT,
@tipl_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbTipoLiquidacion
		SET tipl_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		tipl_FechaEliminacion = @tipl_FechaEliminacion
		WHERE tipl_Id = @tipl_Id
	END TRY
		BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
--*****Estado Boletin*****--
--*****Vista*****--
CREATE OR ALTER VIEW Adua.VW_tbEstadoBoletin
AS
SELECT	esbo_Id, 
		esbo_Descripcion, 
		crea.usua_Nombre usua_UsuarioCreacion, 
		esbo_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		esbo_FechaModificacion, 

		esbo_Estadoo 
FROM Adua.tbEstadoBoletin esbo INNER JOIN Acce.tbUsuarios crea 
ON crea.usua_Id = esbo.usua_UsuarioCreacion INNER JOIN  Acce.tbUsuarios modi 
ON modi.usua_Id = esbo.usua_UsuarioModificacion INNER JOIN Acce.tbUsuarios elim
ON elim.usua_Id = esbo.usua_UsuarioEliminacion 
GO
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Listar
AS
BEGIN
SELECT * FROM Adua.VW_tbEstadoBoletin
WHERE esbo_Estadoo = 1
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
		IF EXISTS (SELECT * FROM Adua.tbEstadoBoletin WHERE esbo_Descripcion = @esbo_Descripcion AND esbo_Estadoo = 0)
			BEGIN
				UPDATE Adua.tbEstadoBoletin 
				SET usua_UsuarioModificacion = @usua_UsuarioCreacion,
				esbo_FechaModificacion = @esbo_FechaCreacion
				WHERE esbo_Descripcion = @esbo_Descripcion
				SELECT 1
			END
		ELSE
			BEGIN 
				INSERT INTO Adua.tbEstadoBoletin(esbo_Descripcion,usua_UsuarioCreacion,esbo_FechaCreacion)
				VALUES (
				@esbo_Descripcion,		
				@usua_UsuarioCreacion,	
				@esbo_FechaCreacion					
				)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
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
		IF EXISTS(SELECT * FROM Adua.tbEstadoBoletin WHERE esbo_Descripcion = @esbo_Descripcion AND esbo_Id = @esbo_Id AND esbo_Estadoo = 0)
		BEGIN
			UPDATE Adua.tbEstadoBoletin
			SET esbo_Estadoo = 1,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			esbo_FechaModificacion = @esbo_FechaModificacion
			WHERE esbo_Descripcion = @esbo_Descripcion
			SELECT 1
		END
		ELSE
			BEGIN
			UPDATE  Adua.tbEstadoBoletin
			SET esbo_Descripcion = @esbo_Descripcion,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			esbo_FechaModificacion = @esbo_FechaModificacion
			WHERE esbo_Id = @esbo_Id
			SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Eliminar
@esbo_Id					INT,
@usua_UsuarioModificacion	INT,
@esbo_FechaModificacion		DATETIME
AS
BEGIN
BEGIN TRY
	UPDATE Adua.tbEstadoBoletin
	SET esbo_Estadoo = 0,
	usua_UsuarioModificacion = @usua_UsuarioModificacion,
	esbo_FechaModificacion = @esbo_FechaModificacion
END TRY
	BEGIN CATCH
		SELECT 0	
	END CATCH 
END
GO

--*****Talla*****--
--*****Vista*****--

CREATE OR ALTER VIEW Prod.VW_tbTallas
AS
SELECT	tall_Id, 
		tall_Nombre, 
		crea.usua_Nombre usua_UsuarioCreacion , 
		tall_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		tall_FechaModificacion, 
		elim.usua_Nombre usua_UsuarioEliminacion, 
		tall_FechaEliminacion, 
		tall_Estado 
FROM Prod.tbTallas tall INNER JOIN Acce.tbUsuarios crea 
ON crea.usua_Id = tall.usua_UsuarioCreacion INNER JOIN  Acce.tbUsuarios modi 
ON modi.usua_Id = tall.usua_UsuarioModificacion INNER JOIN Acce.tbUsuarios elim
ON elim.usua_Id = tall.usua_UsuarioEliminacion 
GO

--*****Listado*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Listar
AS
BEGIN
SELECT * FROM Prod.VW_tbTallas
WHERE tall_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Insertar
@tall_Id				CHAR(5),
@tall_Nombre			NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tall_FechaCreacion		DATETIME
AS
BEGIN
BEGIN TRY 
	IF EXISTS (SELECT * FROM Prod.tbTallas WHERE tall_Id = @tall_Id OR tall_Nombre = @tall_Nombre AND tall_Estado = 0 )
	BEGIN	
		UPDATE Prod.tbTallas 
		SET tall_Estado = 1,
		usua_UsuarioModificacion = @usua_UsuarioCreacion,
		tall_FechaModificacion = @tall_FechaCreacion
		WHERE tall_Id = @tall_Id OR tall_Nombre = @tall_Nombre
			SELECT 1
	END
	ELSE
	BEGIN 
		INSERT INTO Prod.tbTallas(tall_Id,tall_Nombre,usua_UsuarioCreacion,tall_FechaCreacion)
		VALUES (
		@tall_Id,
		@tall_Nombre,
		@usua_UsuarioCreacion,
		@tall_FechaCreacion
		)
			SELECT 1
	END
END TRY
BEGIN CATCH
	SELECT 0
END CATCH

END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Insertar
@tall_Id				CHAR(5),
@tall_Nombre				NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tall_FechaModificacion		DATETIME
AS
BEGIN
BEGIN TRY 
	IF EXISTS (SELECT * FROM Prod.tbTallas WHERE tall_Id = @tall_Id OR tall_Nombre = @tall_Nombre AND tall_Estado = 0 )
	BEGIN	
		UPDATE Prod.tbTallas 
		SET tall_Estado = 1,
		usua_UsuarioModificacion  = @usua_UsuarioModificacion,
		tall_FechaModificacion = @tall_FechaModificacion
		WHERE tall_Id = @tall_Id OR tall_Nombre = @tall_Nombre
			SELECT 1
	END
	ELSE
	BEGIN 
		UPDATE  Prod.tbTallas 
		SET tall_Id = @tall_Id,
		tall_Nombre = @tall_Nombre,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		tall_FechaModificacion = @tall_FechaModificacion
			SELECT 1
	END
END TRY
BEGIN CATCH
	SELECT 0
END CATCH

END
GO


--*****Eliminar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Eliminar
@tall_Id					CHAR(5),
@usua_UsuarioEliminacion	INT,
@tall_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY 
		UPDATE Prod.tbTallas 
		SET tall_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		tall_FechaEliminacion = @tall_FechaEliminacion
		WHERE tall_Id = @tall_Id
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0 
	END CATCH
END
GO

--*****Talla*****--
--*****Vista*****--
CREATE OR ALTER VIEW Prod.VW_tbTipoEmbalaje
AS
SELECT	tiem_Id, 
		tiem_Descripcion, 
		crea.usua_Nombre usua_UsuarioCreacion , 
		tiem_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		tiem_FechaModificacion, 
		elim.usua_Nombre usua_UsuarioEliminacion, 
		tiem_FechaEliminacion, 
		tiem_Estado 
FROM Prod.tbTipoEmbalaje tiem INNER JOIN Acce.tbUsuarios crea 
ON crea.usua_Id = tiem.usua_UsuarioCreacion INNER JOIN  Acce.tbUsuarios modi 
ON modi.usua_Id = tiem.usua_UsuarioModificacion INNER JOIN Acce.tbUsuarios elim
ON elim.usua_Id = tiem.usua_UsuarioEliminacion 
GO
--*****Listado*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Listar
AS
BEGIN
SELECT * FROM Prod.VW_tbTipoEmbalaje
WHERE tiem_Estado = 1
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
		SELECT 0 
	END CATCH
END
GO
--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Editar
@tiem_Id				INT,
@tiem_Descripcion		NVARCHAR(200),
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
		SELECT 0 
	END CATCH
END
GO
--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Eliminar
@tiem_Id				INT,
@usua_UsuarioEliminacion INT,
@tiem_FechaEliminacion	DATETIME
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
		SELECT 0 
	END CATCH
END
GO