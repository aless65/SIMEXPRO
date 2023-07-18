-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS GENERAL

--**********ESTADOS CIVILES**********--

/*Vista estados civiles*/
CREATE OR ALTER VIEW gral.VW_tbEstadosCiviles
AS
SELECT escv_Id AS estadoCivilId, 
	   escv_Nombre AS estadoCivilNombre, 
	   escv.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   escv_FechaCreacion AS fechaCreacion, 
	   escv.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   escv_FechaModificacion AS fechaModificacion, 
	   escv_Estado AS estadoCivilEstado
FROM [Gral].[tbEstadosCiviles] escv INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON escv.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON escv.usua_UsuarioModificacion = usuaCrea.usua_Id
GO


/*Listar estados civiles*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Listar
AS
BEGIN
	SELECT [escv_Id], [escv_Nombre]
    FROM [Gral].[tbEstadosCiviles]
	WHERE [escv_Estado] = 1
END
GO

/*Insertar estados civiles*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Insertar
	@escv_Nombre			NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@escv_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF EXISTS (SELECT * FROM [Gral].[tbEstadosCiviles]
						WHERE @escv_Nombre = [escv_Nombre]
						AND [escv_Estado] = 0)
		BEGIN
			UPDATE [Gral].[tbEstadosCiviles]
			SET	   [escv_Estado] = 1
			WHERE  [escv_Nombre] = @escv_Nombre

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Gral].[tbEstadosCiviles] (escv_Nombre, 
													   usua_UsuarioCreacion, 
													   escv_FechaCreacion)
			VALUES(@escv_Nombre,	
				   @usua_UsuarioCreacion,
				   @escv_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar estados civiles*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Editar
	@escv_Id					INT,
	@escv_Nombre				NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@escv_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbEstadosCiviles]
		SET		[escv_Nombre] = @escv_Nombre,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[escv_FechaModificacion] = @escv_FechaModificacion
		WHERE	[escv_Id] = @escv_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar estados civiles*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Eliminar 
	@escv_Id					INT
AS
BEGIN
	BEGIN TRY
		
		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'escv_Id', @escv_Id, 'gral.tbEstadosCiviles', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	[Gral].[tbEstadosCiviles]
					SET		[escv_Estado] = 0
					WHERE	[escv_Id] = @escv_Id

				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--**********OFICINAS**********--

/*Vista oficinas*/
CREATE OR ALTER VIEW gral.VW_tbOficinas
AS
SELECT ofic_Id AS oficinaId, 
	   ofic_Nombre AS oficinaNombre, 
	   ofic.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   ofic_FechaCreacion AS fechaCreacion, 
	   ofic.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   ofic_FechaModificacion AS fechaModificacion, 
	   ofic.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   ofic_FechaEliminacion AS fechaEliminacion, 
	   ofic_Estado AS oficinaEstado
FROM [Gral].[tbOficinas] ofic INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON ofic.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON ofic.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON ofic.usua_UsuarioEliminacion = usuaCrea.usua_Id
GO


/*Listar oficinas*/
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbOficinas_Listar
AS
BEGIN
	SELECT *
    FROM gral.VW_tbOficinas
	WHERE oficinaEstado = 1
END
GO

/*Insertar oficinas*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficinas_Insertar 
	@ofic_Nombre			NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@ofic_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF EXISTS (SELECT * FROM [Gral].[tbOficinas]
						WHERE @ofic_Nombre = [ofic_Nombre]
						AND [ofic_Estado] = 0)
		BEGIN
			UPDATE [Gral].[tbOficinas]
			SET	   [ofic_Estado] = 1
			WHERE  [ofic_Nombre] = @ofic_Nombre

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Gral].[tbOficinas] (ofic_Nombre, 
											     usua_UsuarioCreacion, 
											     ofic_FechaCreacion)
			VALUES(@ofic_Nombre,	
				   @usua_UsuarioCreacion,
				   @ofic_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar oficinas*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficinas_Editar 
	@ofic_Id					INT,
	@ofic_Nombre				NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@ofic_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbOficinas]
		SET		[ofic_Nombre] = @ofic_Nombre,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[ofic_FechaModificacion] = @ofic_FechaModificacion
		WHERE	[ofic_Id] = @ofic_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar oficinas*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficinas_Eliminar 
	@ofic_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@ofic_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'ofic_Id', @ofic_Id, 'gral.tbOficinas', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	[Gral].[tbOficinas]
					SET		[ofic_Estado] = 0,
							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
							[ofic_FechaEliminacion] = @ofic_FechaEliminacion
					WHERE	[ofic_Id] = @ofic_Id
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--**********OFICIO/PROFESIÓN**********--

/*Vista oficio/profesión*/
CREATE OR ALTER VIEW gral.VW_tbOficio_Profesiones
AS
SELECT ofpr_Id AS oficioId, 
	   ofpr_Nombre AS oficioNombre, 
	   ofpr.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   ofpr_FechaCreacion AS fechaCreacion, 
	   ofpr.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   ofpr_FechaModificacion AS fechaModificacion, 
	   --ofpr.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   --usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   --ofpr_FechaEliminacion AS fechaEliminacion, 
	   ofpr_Estado AS oficioEstado
FROM [Gral].[tbOficio_Profesiones] ofpr INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON ofpr.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON ofpr.usua_UsuarioModificacion = usuaCrea.usua_Id --LEFT JOIN [Acce].[tbUsuarios] usuaElimina
--ON ofpr.usua_UsuarioEliminacion = usuaCrea.usua_Id
GO


/*Listar oficio/profesión*/
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbOficio_Profesiones_Listar
AS
BEGIN
	SELECT *
    FROM gral.VW_tbOficio_Profesiones
	WHERE oficioEstado = 1
END
GO


/*Insertar oficio/profesión*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficio_Profesiones_Insertar 
	@ofpr_Nombre			NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@ofpr_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF EXISTS (SELECT * FROM [Gral].[tbOficio_Profesiones]
						WHERE @ofpr_Nombre = [ofpr_Nombre]
						AND [ofpr_Estado] = 0)
		BEGIN
			UPDATE [Gral].[tbOficio_Profesiones]
			SET	   [ofpr_Estado] = 1
			WHERE  [ofpr_Nombre] = @ofpr_Nombre

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Gral].[tbOficio_Profesiones] (ofpr_Nombre, 
														   usua_UsuarioCreacion, 
														   ofpr_FechaCreacion)
			VALUES(@ofpr_Nombre,	
				   @usua_UsuarioCreacion,
				   @ofpr_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar oficio/profesión*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficio_Profesiones_Editar 
	@ofpr_Id					INT,
	@ofpr_Nombre				NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@ofpr_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbOficio_Profesiones]
		SET		[ofpr_Nombre] = @ofpr_Nombre,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[ofpr_FechaModificacion] = @ofpr_FechaModificacion
		WHERE	[ofpr_Id] = @ofpr_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar oficio/profesión*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficio_Profesiones_Eliminar 
	@ofpr_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@ofpr_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		
		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'ofpr_Id', @ofpr_Id, 'gral.tbOficio_Profesiones', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	[Gral].[tbOficio_Profesiones]
					SET		[ofpr_Estado] = 0
							--[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
							--[ofpr_FechaEliminacion] = @ofpr_FechaEliminacion
					WHERE	[ofpr_Id] = @ofpr_Id
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--**********CARGOS**********--

/*Vista cargos*/
CREATE OR ALTER VIEW gral.VW_tbCargos
AS
SELECT carg_Id AS cargoId, 
	   carg_Nombre AS cargoNombre, 
	   carg.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   carg_FechaCreacion AS fechaCreacion, 
	   carg.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   carg_FechaModificacion AS fechaModificacion, 
	   carg.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   carg_FechaEliminacion AS fechaEliminacion, 
	   carg_Estado AS cargoEstado
FROM [Gral].[tbCargos] carg INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON carg.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON carg.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON carg.usua_UsuarioEliminacion = usuaCrea.usua_Id
GO


/*Listar cargos*/
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbCargos_Listar
AS
BEGIN
	SELECT *
    FROM gral.VW_tbCargos
	WHERE cargoEstado = 1
END
GO

/*Insertar cargos*/
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Insertar 
	@carg_Nombre			NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@carg_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF EXISTS (SELECT * FROM [Gral].[tbCargos]
						WHERE @carg_Nombre = [carg_Nombre]
						AND [carg_Estado] = 0)
		BEGIN
			UPDATE [Gral].[tbCargos]
			SET	   [carg_Estado] = 1
			WHERE  [carg_Nombre] = @carg_Nombre

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Gral].[tbCargos] (carg_Nombre, 
											   usua_UsuarioCreacion, 
											   carg_FechaCreacion)
			VALUES(@carg_Nombre,	
				   @usua_UsuarioCreacion,
				   @carg_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar cargos*/
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Editar 
	@carg_Id					INT,
	@carg_Nombre				NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@carg_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbCargos]
		SET		[carg_Nombre] = @carg_Nombre,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[carg_FechaModificacion] = @carg_FechaModificacion
		WHERE	[carg_Id] = @carg_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar cargos*/
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Eliminar 
	@carg_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@carg_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'carg_Id', @carg_Id, 'gral.tbCargos', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	[Gral].[tbCargos]
					SET		[carg_Estado] = 0,
							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
							[carg_FechaEliminacion] = @carg_FechaEliminacion
					WHERE	[carg_Id] = @carg_Id
				END
		END

	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--**********COLONIAS**********--

/*Vista colonias*/
CREATE OR ALTER VIEW gral.VW_tbColonias
AS
SELECT colo_Id AS coloniaId, 
	   colo_Nombre AS coloniaNombre, 
	   colo.alde_Id AS aldeaId,
	   alde.alde_Nombre AS aldeaNombre,
	   colo.ciud_Id AS ciudadId,
	   ciud.ciud_Nombre AS ciudadNombre,
	   colo.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   colo_FechaCreacion AS fechaCreacion, 
	   colo.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   colo_FechaModificacion AS fechaModificacion, 
	   colo.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   colo_FechaEliminacion AS fechaEliminacion, 
	   colo_Estado AS coloniaEstado
FROM [Gral].[tbColonias] colo LEFT JOIN [Gral].[tbAldeas] alde
ON colo.alde_Id = alde.alde_Id LEFT JOIN [Gral].[tbCiudades] ciud
ON colo.ciud_Id = ciud.ciud_Id INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON colo.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON colo.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON colo.usua_UsuarioEliminacion = usuaCrea.usua_Id
GO


/*Listar colonias*/
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbColonias_Listar
AS
BEGIN
	SELECT *
    FROM gral.VW_tbColonias
	WHERE coloniaEstado = 1
END
GO

/*Insertar colonias*/
CREATE OR ALTER PROCEDURE gral.UDP_tbColonias_Insertar 
	@colo_Nombre			NVARCHAR(150),
	@alde_Id				INT,
	@ciud_Id				INT,
	@usua_UsuarioCreacion	INT,
	@colo_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF @alde_Id IS NOT NULL
			BEGIN
				IF EXISTS (SELECT * FROM [Gral].[tbColonias]
						WHERE @colo_Nombre = [colo_Nombre]
						AND alde_Id = @alde_Id)
					BEGIN
						SELECT 0
					END
				--ELSE IF EXISTS (SELECT * FROM [Gral].[tbColonias]
				--		WHERE @colo_Nombre = [colo_Nombre]
				--		AND alde_Id = @alde_Id
				--		AND [colo_Estado] = 0)
				--	BEGIN
				--		UPDATE [Gral].[tbColonias]
				--		SET	   [colo_Estado] = 1
				--		WHERE  [colo_Nombre] = @colo_Nombre
				--		AND [alde_Id] = @alde_Id

				--		SELECT 1
				--	END
				ELSE
					BEGIN
						INSERT INTO [Gral].[tbColonias] (colo_Nombre, 
														 alde_Id,
														 ciud_Id,
														 usua_UsuarioCreacion, 
														 colo_FechaCreacion)
						VALUES(@colo_Nombre,	
							   @alde_Id,
							   @ciud_Id,
							   @usua_UsuarioCreacion,
							   @colo_FechaCreacion)

						SELECT 1
					END
			END
		
		ELSE 
			BEGIN
				IF EXISTS (SELECT * FROM [Gral].[tbColonias]
						WHERE @colo_Nombre = [colo_Nombre]
						AND ciud_Id = @ciud_Id)
					BEGIN
						SELECT 0
					END
				--ELSE IF EXISTS (SELECT * FROM [Gral].[tbColonias]
				--		WHERE @colo_Nombre = [colo_Nombre]
				--		AND ciud_Id = @ciud_Id
				--		AND [colo_Estado] = 0)
				--	BEGIN
				--		UPDATE [Gral].[tbColonias]
				--		SET	   [colo_Estado] = 1
				--		WHERE  [colo_Nombre] = @colo_Nombre
				--		AND ciud_Id = @ciud_Id

				--		SELECT 1 
			
				--	END
				ELSE
					BEGIN
						INSERT INTO [Gral].[tbColonias] (colo_Nombre, 
														 ciud_Id,
														 usua_UsuarioCreacion, 
														 colo_FechaCreacion)
						VALUES(@colo_Nombre,	
							   @ciud_Id,
							   @usua_UsuarioCreacion,
							   @colo_FechaCreacion)

						SELECT 1
					END
		END

		--MERGE [Gral].[tbColonias] AS target
		--USING (SELECT @colo_Nombre AS colo_Nombre, @alde_Id AS alde_Id, @ciud_Id AS ciud_Id) AS source
		--ON target.[colo_Nombre] = source.[colo_Nombre]
		--AND (target.[alde_Id] = source.[alde_Id] OR (target.[ciud_Id] = source.[ciud_Id] AND source.[alde_Id] IS NULL))
		--WHEN MATCHED AND target.[colo_Estado] = 1 THEN
		--	-- The record exists and is active, so return 0
		--	OUTPUT 0
		--WHEN MATCHED AND target.[colo_Estado] = 0 THEN
		--	-- The record exists but is inactive, so update and return 1
		--	UPDATE SET target.[colo_Estado] = 1
		--	OUTPUT 1;
		--WHEN NOT MATCHED THEN
		--	-- The record doesn't exist, so insert and return 1
		--	INSERT (colo_Nombre, alde_Id, ciud_Id, usua_UsuarioCreacion, colo_FechaCreacion)
		--	VALUES (source.colo_Nombre, source.alde_Id, source.ciud_Id, @usua_UsuarioCreacion, @colo_FechaCreacion)
		--	OUTPUT 1;
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar colonias*/
CREATE OR ALTER PROCEDURE gral.UDP_tbColonias_Editar 
	@colo_Id					INT,
	@colo_Nombre				NVARCHAR(150),
	@alde_Id					INT,
	@ciud_Id					INT,
	@usua_UsuarioModificacion	INT,
	@colo_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		IF @alde_Id IS NOT NULL
			BEGIN
				IF EXISTS (SELECT colo_Id FROM [Gral].[tbColonias]
						   WHERE [colo_Nombre] = @colo_Nombre
						   AND [alde_Id] = @alde_Id
						   AND colo_Id != @colo_Id)
					BEGIN
						SELECT 0
					END
				ELSE
					BEGIN
						UPDATE  [Gral].[tbColonias]
						SET		[colo_Nombre] = @colo_Nombre,
								[alde_Id] = @alde_Id,
								[ciud_Id] = NULL,
								[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
								[colo_FechaModificacion] = @colo_FechaModificacion
						WHERE	[colo_Id] = @colo_Id

						SELECT 1
					END
			END
		ELSE
			BEGIN
				IF EXISTS (SELECT colo_Id FROM [Gral].[tbColonias]
						   WHERE [colo_Nombre] = @colo_Nombre
						   AND [ciud_Id] = @ciud_Id
						   AND colo_Id != @colo_Id
						   )
					BEGIN
						SELECT 0
					END
				ELSE
					BEGIN
						UPDATE  [Gral].[tbColonias]
						SET		[colo_Nombre] = @colo_Nombre,
								[ciud_Id] = @ciud_Id,
								[alde_Id] = NULL,
								[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
								[colo_FechaModificacion] = @colo_FechaModificacion
						WHERE	[colo_Id] = @colo_Id

						SELECT 1
					END
			END
		
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar colonias*/
--CREATE OR ALTER PROCEDURE gral.UDP_tbColonias_Eliminar 2, 1, '2023-07-18 13:15:06'
--	@colo_Id					INT,
--	@usua_UsuarioEliminacion	INT,
--	@colo_FechaEliminacion		DATETIME
--AS
--BEGIN
--	BEGIN TRY

--		BEGIN
--			DECLARE @respuesta INT
--			EXEC dbo.UDP_ValidarReferencias 'colo_Id', @colo_Id, 'gral.tbColonias', @respuesta OUTPUT

--			SELECT @respuesta AS Resultado
--			IF(@respuesta) = 1
--				BEGIN
--					UPDATE	[Gral].[tbColonias]
--					SET		[colo_Estado] = 0,
--							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
--							[colo_FechaEliminacion] = @colo_FechaEliminacion
--					WHERE	[colo_Id] = @colo_Id
--				END
--		END

--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

--**********MONEDAS**********--

/*Vista monedas*/
CREATE OR ALTER VIEW gral.VW_tbMonedas
AS
SELECT mone_Id AS monedaId, 
	   mone_Codigo AS monedaCodigo,
	   mone_Descripcion AS monedaNombre, 
	   mone.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   mone_FechaCreacion AS fechaCreacion, 
	   mone.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   mone_FechaModificacion AS fechaModificacion, 
	   mone.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   mone_FechaEliminacion AS fechaEliminacion, 
	   mone_Estado AS monedaEstado
FROM [Gral].[tbMonedas] mone INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON mone.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON mone.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON mone.usua_UsuarioEliminacion = usuaCrea.usua_Id
GO


/*Listar monedas*/
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbMonedas_Listar
AS
BEGIN
	SELECT *
    FROM gral.VW_tbMonedas
	WHERE monedaEstado = 1
END
GO

/*Insertar monedas*/
CREATE OR ALTER PROCEDURE gral.UDP_tbMonedas_Insertar 
	@mone_Codigo			CHAR(3),
	@mone_Descripcion		NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@mone_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		--IF EXISTS (SELECT * FROM [Gral].[tbMonedas]
		--				WHERE ([mone_Descripcion] = @mone_Descripcion
		--				OR [mone_Codigo] = @mone_Codigo)
		--				AND [mone_Estado] = 0)
		--BEGIN
		--	UPDATE [Gral].[tbMonedas]
		--	SET	   [mone_Estado] = 1,
		--		   [mone_Descripcion] = @mone_Descripcion,
		--		   [mone_Codigo] = @mone_Codigo
		--	WHERE  [mone_Descripcion] = @mone_Descripcion
		--	OR	   [mone_Codigo] = @mone_Codigo

		--	SELECT 1
		--END
		--ELSE 
		--	BEGIN
				INSERT INTO [Gral].[tbMonedas] ( mone_Codigo,
												 mone_Descripcion, 
											     usua_UsuarioCreacion, 
											     mone_FechaCreacion)
			VALUES(@mone_Codigo,
				   @mone_Descripcion,	
				   @usua_UsuarioCreacion,
				   @mone_FechaCreacion)


			SELECT 1
		--END
	END TRY
	BEGIN CATCH
		SELECT 'Error_Message: ' + ERROR_MESSAGE () 
	END CATCH 
END
GO

/*Editar monedas*/
CREATE OR ALTER PROCEDURE gral.UDP_tbMonedas_Editar
	@mone_Id					INT,
	@mone_Codigo				CHAR(3),
	@mone_Descripcion			NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@mone_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbMonedas]
		SET		[mone_Descripcion] = @mone_Descripcion,
				[mone_Codigo] = @mone_Codigo,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[mone_FechaModificacion] = @mone_FechaModificacion
		WHERE	[mone_Id] = @mone_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--/*Eliminar monedas*/
--CREATE OR ALTER PROCEDURE gral.UDP_tbMonedas_Eliminar 
--	@mone_Id					CHAR(3),
--	@usua_UsuarioEliminacion	INT,
--	@mone_FechaEliminacion		DATETIME
--AS
--BEGIN
--	BEGIN TRY

--		BEGIN
--			DECLARE @respuesta INT
--			EXEC dbo.UDP_ValidarReferencias 'mone_Id', @mone_Id, 'gral.tbMonedas', @respuesta OUTPUT

--			SELECT @respuesta AS Resultado
--			IF(@respuesta) = 1
--				BEGIN
--					UPDATE	[Gral].[tbMonedas]
--					SET		[mone_Estado] = 0,
--							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
--							[mone_FechaEliminacion] = @mone_FechaEliminacion
--					WHERE	[mone_Id] = @mone_Id
--				END
--		END

--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

--WITH AKT AS ( SELECT f.name AS ForeignKey
--                    ,OBJECT_NAME(f.parent_object_id) AS TableName
--                    ,COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName
--					,SCHEMA_NAME(schema_id) SchemaName
--                    ,OBJECT_NAME (f.referenced_object_id) AS ReferenceTableName
--                    ,COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferenceColumnName
--              FROM   sys.foreign_keys AS f
--                     INNER JOIN sys.foreign_key_columns AS fc ON f.OBJECT_ID = fc.constraint_object_id
--              WHERE  f.referenced_object_id = object_id('gral.tbColonias'))
--SELECT 'SELECT ' + ColumnName + ' FROM ' + SchemaName + '.' + TableName + ' WHERE  RR.' + ColumnName + ' = OO.' + ReferenceColumnName + ' UNION ALL'
--FROM   AKT


--DECLARE @QUERY NVARCHAR(MAX)

--WITH AKT AS ( SELECT ROW_NUMBER() OVER (ORDER BY f.name) RN, f.name AS ForeignKey
--                    ,OBJECT_NAME(f.parent_object_id) AS TableName
--                    ,COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName
--                    ,SCHEMA_NAME(f.schema_id) SchemaName
--                    ,OBJECT_NAME (f.referenced_object_id) AS ReferenceTableName
--                    ,COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferenceColumnName
--              FROM   sys.foreign_keys AS f
--                     INNER JOIN sys.foreign_key_columns AS fc ON f.OBJECT_ID = fc.constraint_object_id
--                     INNER JOIN sys.objects oo ON oo.object_id = fc.referenced_object_id
--              WHERE  f.referenced_object_id = object_id('gral.tbColonias'))

--    ,bs AS (SELECT AKT.RN
--                  ,'SELECT ' + ColumnName + ' FROM ' + SchemaName + '.' + TableName + ' WHERE ' + ColumnName + ' = OO.' + ReferenceColumnName  SubQuery
--            FROM   AKT)
--    ,re AS (SELECT bs.RN, CAST(RTRIM(bs.SubQuery) AS VARCHAR(MAX)) Joined
--            FROM   bs
--            WHERE  bs.RN = 1
--            UNION  ALL
--            SELECT bs2.RN, CAST(re.Joined + ' UNION ALL ' + ISNULL(RTRIM(bs2.SubQuery), '') AS VARCHAR(MAX)) Joined
--            FROM   re, bs bs2 
--            WHERE  re.RN = bs2.RN - 1 )
--    ,fi AS (SELECT ROW_NUMBER() OVER (ORDER BY RN DESC) RNK, Joined
--            FROM   re)
--SELECT @QUERY  = 'SELECT OO.colo_Id, CASE WHEN XX.REFERENCED IS NULL THEN ''No'' ELSE ''Yes'' END Referenced
--FROM   gral.tbColonias OO
--       OUTER APPLY (SELECT SUM(1) REFERENCED
--                    FROM   (' + Joined + ') II) XX'
--FROM   fi
--WHERE  RNK = 1

--EXEC (@QUERY)

-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS MÓDULO ADUANA
--**********FORMAS DE PRESENTACIÓN**********--

/*Vista forma presentación*/
--CREATE OR ALTER VIEW adua.VW_tbFormaPresentacion
--AS
--SELECT pres_Id AS presentacionId, 
--	   pres_Descripcion AS presentacionNombre, 
--	   pres.usua_UsuarioCreacion AS usuarioCreacion, 
--	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
--	   pres_FechaCreacion AS fechaCreacion, 
--	   pres.usua_UsuarioModificacion AS usuarioModificacion, 
--	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
--	   pres_FechaModificacion AS fechaModificacion, 
--	   pres.usua_UsuarioEliminacion AS usuarioEliminacion, 
--	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
--	   pres_FechaEliminacion AS fechaEliminacion, 
--	   pres_Estado AS presentacionEstado
--FROM [Adua].[tbFormaPresentacion] pres INNER JOIN [Acce].[tbUsuarios] usuaCrea
--ON pres.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
--ON pres.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
--ON pres.usua_UsuarioEliminacion = usuaCrea.usua_Id
--GO


--/*Listar forma presentación*/
--CREATE OR ALTER PROCEDURE adua.UDP_VW_tbFormaPresentacion_Listar
--AS
--BEGIN
--	SELECT *
--    FROM adua.VW_tbFormaPresentacion
--	WHERE presentacionEstado = 1
--END
--GO

--/*Insertar forma presentación*/
--CREATE OR ALTER PROCEDURE adua.UDP_tbFormaPresentacion_Insertar
--	@pres_Descripcion		NVARCHAR(150),
--	@usua_UsuarioCreacion	INT,
--	@pres_FechaCreacion     DATETIME
--AS 
--BEGIN
	
--	BEGIN TRY

--		IF EXISTS (SELECT * FROM [Adua].[tbFormaPresentacion]
--						WHERE [pres_Descripcion] = @pres_Descripcion
--						AND [pres_Estado] = 0)
--		BEGIN
--			UPDATE [Adua].[tbFormaPresentacion]
--			SET	   [pres_Estado] = 1
--			WHERE  [pres_Descripcion] = @pres_Descripcion

--			SELECT 1
--		END
--		ELSE 
--			BEGIN
--				INSERT INTO [Adua].[tbFormaPresentacion] (pres_Descripcion, 
--														  usua_UsuarioCreacion, 
--														  pres_FechaCreacion)
--			VALUES(@pres_Descripcion,	
--				   @usua_UsuarioCreacion,
--				   @pres_FechaCreacion)


--			SELECT 1
--		END
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH 
--END
--GO

--/*Editar forma presentación*/
--CREATE OR ALTER PROCEDURE adua.UDP_tbFormaPresentacion_Editar
--	@pres_Id					INT,
--	@pres_Descripcion			NVARCHAR(150),
--	@usua_UsuarioModificacion	INT,
--	@pres_FechaModificacion     DATETIME
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE  [Adua].[tbFormaPresentacion]
--		SET		[pres_Descripcion] = @pres_Descripcion,
--				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
--				[pres_FechaModificacion] = @pres_FechaModificacion
--		WHERE	[pres_Id] = @pres_Id

--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

--/*Eliminar forma presentación*/
--CREATE OR ALTER PROCEDURE adua.UDP_tbFormaPresentacion_Eliminar 
--	@pres_Id					INT,
--	@usua_UsuarioEliminacion	INT,
--	@pres_FechaEliminacion		DATETIME
--AS
--BEGIN
--	BEGIN TRY

--		BEGIN
--			DECLARE @respuesta INT
--			EXEC dbo.UDP_ValidarReferencias 'pres_Id', @pres_Id, 'adua.tbFormaPresentacion', @respuesta OUTPUT

--			SELECT @respuesta AS Resultado
--			IF(@respuesta) = 1
--				BEGIN
--					UPDATE	[Adua].[tbFormaPresentacion]
--					SET		[pres_Estado] = 0,
--							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
--							[pres_FechaEliminacion] = @pres_FechaEliminacion
--					WHERE	[pres_Id] = @pres_Id
--				END
--		END

--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

--**********INCOTERM**********--

/*Vista incoterm*/
CREATE OR ALTER VIEW adua.VW_tbIncoterm
AS
SELECT inco_Id AS incotermId, 
	   inco_Codigo AS incotermCodigo,
	   inco_Descripcion AS incotermNombre, 
	   inco.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   inco_FechaCreacion AS fechaCreacion, 
	   inco.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   inco_FechaModificacion AS fechaModificacion, 
	   inco.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   inco_FechaEliminacion AS fechaEliminacion, 
	   inco_Estado AS incotermEstado
FROM [Adua].[tbIncoterm] inco INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON inco.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON inco.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON inco.usua_UsuarioEliminacion = usuaCrea.usua_Id
GO


/*Listar incoterm*/
CREATE OR ALTER PROCEDURE adua.UDP_VW_tbIncoterm_Listar
AS
BEGIN
	SELECT *
    FROM adua.VW_tbIncoterm
	WHERE incotermEstado = 1
END
GO

/*Insertar incoterm*/
CREATE OR ALTER PROCEDURE adua.UDP_tbIncoterm_Insertar 
	@inco_Codigo			CHAR(3),
	@inco_Descripcion		NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@inco_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		--IF EXISTS (SELECT * FROM [Adua].[tbIncoterm]
		--				WHERE ([inco_Descripcion] = @inco_Descripcion
		--				OR [inco_Codigo] = @inco_Codigo)
		--				AND [inco_Estado] = 0)
		--BEGIN
		--	UPDATE [Adua].[tbIncoterm]
		--	SET	   [inco_Estado] = 1,
		--		   [inco_Descripcion] = @inco_Descripcion,
		--		   [inco_Codigo] = @inco_Codigo
		--	WHERE  [inco_Descripcion] = @inco_Descripcion

		--	SELECT 1
		--END
		--ELSE 
		--	BEGIN
				INSERT INTO [Adua].[tbIncoterm] (inco_Codigo,
												 inco_Descripcion, 
											     usua_UsuarioCreacion, 
											     inco_FechaCreacion)
			VALUES(@inco_Codigo,
				   @inco_Descripcion,	
				   @usua_UsuarioCreacion,
				   @inco_FechaCreacion)


			SELECT 1
		--END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar incoterm*/
CREATE OR ALTER PROCEDURE adua.UDP_tbIncoterm_Editar
	@inco_Id					INT,
	@inco_Codigo				CHAR(3),
	@inco_Descripcion			NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@inco_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Adua].[tbIncoterm]
		SET		[inco_Descripcion] = @inco_Descripcion,
		        [inco_Codigo] = @inco_Codigo,
 				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[inco_FechaModificacion] = @inco_FechaModificacion
		WHERE	[inco_Id] = @inco_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar incoterm*/
--CREATE OR ALTER PROCEDURE adua.UDP_tbIncoterm_Eliminar 
--	@inco_Id					CHAR(3),
--	@usua_UsuarioEliminacion	INT,
--	@inco_FechaEliminacion		DATETIME
--AS
--BEGIN
--	BEGIN TRY

--		BEGIN
--			DECLARE @respuesta INT
--			EXEC dbo.UDP_ValidarReferencias 'inco_Id', @inco_Id, 'adua.tbIncoterm', @respuesta OUTPUT

--			SELECT @respuesta AS Resultado
--			IF(@respuesta) = 1
--				BEGIN
--					UPDATE	[Adua].[tbIncoterm]
--					SET		[inco_Estado] = 0,
--							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
--							[inco_FechaEliminacion] = @inco_FechaEliminacion
--					WHERE	[inco_Id] = @inco_Id
--				END
--		END

--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS MÓDULO PRODUCCIÓN
GO
CREATE OR ALTER VIEW prod.VW_tbDeclaraciones_Valor
AS
SELECT [deva_Id] AS declaracionId, 
	   [deva_Aduana_Ingreso_Id] AS aduanaIngreso, 
	   [deva_Aduana_Despacho_Id] AS aduanaDespacho, 
	   [deva_Declaracion_Mercancia] AS declaracionMercancia, 
	   [deva_Fecha_Aceptacion] AS declaracionFechaAceptacion, 
	   [impo_Id] AS importadorId, 
	   [prov_Id] AS proveedorId, 
	   [inte_Id] AS intermediarioId, 
	   [deva_Lugar_Entrega] AS declaracionLugarEntrega, 
	   [inco_Id] AS incotermId, 
	   [deva_numero_contrato] AS declaracionNumContrato, 
	   [deva_Fecha_Contrato] AS declaracionFechaContrato, 
	   [foen_Id] AS formaEnvioId, 
	   [deva_Forma_Envio_Otra] AS formaEnvioOtra, 
	   [deva_Pago_Efectuado] AS declaracionPagoEfectuado, 
	   [fopa_Id] AS formaPagoId, 
	   [deva_Forma_Pago_Otra] AS formaPagoOtra, 
	   [deva_Lugar_Embarque] AS declaracionLugarEmbarque, 
	   [pais_Embarque_Id] AS paisEmbarqueId, 
	   [pais_Exportacion_Id] paisExportacionId, 
	   [deva_Fecha_Exportacion] declaracionFechaExportacion, 
	   [mone_Id] AS monedaId, 
	   [mone_Otra] AS monedaOtra, 
	   [deva_Conversion_Dolares] AS conversionDolares, 
	   [deva_Condiciones] AS declaracionCondiciones, 
	   [usua_UsuarioCreacion] AS usuaCreacionId, 
	   [deva_FechaCreacion] AS fechaCreacion, 
	   [usua_UsuarioModificacion] AS usuarioModificacionId, 
	   [deva_FechaModificacion] AS fechaModificacion, 
	   [usua_UsuarioEliminacion] AS usuarioEliminacionId, 
	   [deva_FechaEliminacion] AS fechaEliminacion, 
	   [deva_Estado] AS declaracionEstado
FROM [Adua].[tbDeclaraciones_Valor]

