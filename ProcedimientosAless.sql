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
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbEstadosCiviles_Listar
AS
BEGIN
	SELECT *
    FROM gral.VW_tbEstadosCiviles
	WHERE estadoCivilEstado = 1
END
GO

/*Insertar estados civiles*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Insertar
	@escv_Nombre			NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@usua_FechaCreacion     DATETIME
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
				   @usua_FechaCreacion)


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
	@usua_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbEstadosCiviles]
		SET		[escv_Nombre] = @escv_Nombre
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
		UPDATE	[Gral].[tbEstadosCiviles]
		SET		[escv_Estado] = 0
		WHERE	[escv_Id] = @escv_Id

		SELECT 1
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
	   ofic_Estado AS oficinaEstado
FROM [Gral].[tbOficinas] ofic INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON ofic.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON ofic.usua_UsuarioModificacion = usuaCrea.usua_Id
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
	@usua_FechaCreacion     DATETIME
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
				   @usua_FechaCreacion)


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
	@usua_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbOficinas]
		SET		[ofic_Nombre] = @ofic_Nombre
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
	@ofic_Id					INT
AS
BEGIN
	BEGIN TRY
		UPDATE	[Gral].[tbOficinas]
		SET		[ofic_Estado] = 0
		WHERE	[ofic_Id] = @ofic_Id

		SELECT 1
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
	   ofpr_Estado AS oficioEstado
FROM [Gral].[tbOficio_Profesiones] ofpr INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON ofpr.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON ofpr.usua_UsuarioModificacion = usuaCrea.usua_Id
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
	@usua_FechaCreacion     DATETIME
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
				   @usua_FechaCreacion)


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
	@usua_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbOficio_Profesiones]
		SET		[ofpr_Nombre] = @ofpr_Nombre
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
	@ofpr_Id					INT
AS
BEGIN
	BEGIN TRY
		UPDATE	[Gral].[tbOficio_Profesiones]
		SET		[ofpr_Estado] = 0
		WHERE	[ofpr_Id] = @ofpr_Id

		SELECT 1
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
	   carg_Estado AS cargoEstado
FROM [Gral].[tbCargos] carg INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON carg.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON carg.usua_UsuarioModificacion = usuaCrea.usua_Id
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
	@usua_FechaCreacion     DATETIME
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
				   @usua_FechaCreacion)


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
	@usua_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbCargos]
		SET		[carg_Nombre] = @carg_Nombre
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
	@carg_Id					INT
AS
BEGIN
	BEGIN TRY
		UPDATE	[Gral].[tbCargos]
		SET		[carg_Estado] = 0
		WHERE	[carg_Id] = @carg_Id

		SELECT 1
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
	   colo_Estado AS coloniaEstado
FROM [Gral].[tbColonias] colo LEFT JOIN [Gral].[tbAldeas] alde
ON colo.alde_Id = alde.alde_Id LEFT JOIN [Gral].[tbCiudades] ciud
ON colo.ciud_Id = ciud.ciud_Id INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON colo.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON colo.usua_UsuarioModificacion = usuaCrea.usua_Id
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
	@usua_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF @alde_Id IS NOT NULL
			BEGIN
				
			END
		IF EXISTS (SELECT * FROM [Gral].[tbcoloos]
						WHERE @colo_Nombre = [colo_Nombre]
						AND [colo_Estado] = 0)
		BEGIN
			UPDATE [Gral].[tbcoloos]
			SET	   [colo_Estado] = 1
			WHERE  [colo_Nombre] = @colo_Nombre

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Gral].[tbcoloos] (colo_Nombre, 
											   usua_UsuarioCreacion, 
											   colo_FechaCreacion)
			VALUES(@colo_Nombre,	
				   @usua_UsuarioCreacion,
				   @usua_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar colonias*/
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Editar
	@carg_Id					INT,
	@carg_Nombre				NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@usua_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbCargos]
		SET		[carg_Nombre] = @carg_Nombre
		WHERE	[carg_Id] = @carg_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar colonias*/
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Eliminar 
	@carg_Id					INT
AS
BEGIN
	BEGIN TRY
		UPDATE	[Gral].[tbCargos]
		SET		[carg_Estado] = 0
		WHERE	[carg_Id] = @carg_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO