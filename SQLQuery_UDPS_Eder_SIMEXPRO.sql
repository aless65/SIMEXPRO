USE SIMEXPRO
GO

----------------------------------------------UDPS tbEstadoMercancias----------------------------------------------

/*******************************Listado*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbEstadoMercancias_Listado
AS
BEGIN
SELECT	merc_Id										,
		merc_Descripcion							,
		estadoMercancia.usua_UsuarioCreacion		,
		usuarioCreacion.usua_Nombre					AS usuarioCreacionNombre,
		merc_FechaCreacion							,
		estadoMercancia.usua_UsuarioModificacion	,
		usuarioModificacion.usua_Nombre				AS usuarioModificacionNombre,
		merc_FechaModificacion						,
		merc_Estado									
FROM	Adua.tbEstadoMercancias estadoMercancia
		INNER JOIN Acce.tbUsuarios usuarioCreacion		ON estadoMercancia.usua_UsuarioCreacion = usuarioCreacion.usua_Id
		LEFT JOIN Acce.tbUsuarios usuarioModificacion	ON estadoMercancia.usua_UsuarioModificacion = usuarioModificacion.usua_Id
WHERE	merc_Estado = 1
END
GO

/**************************Ejecución UDP Listado**************************/
EXEC Adua.UDP_VW_tbEstadoMercancias_Listado
GO

/*******************************Insertar*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoMercancias_Insertar
(
	@merc_Descripcion		NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@merc_FechaCreacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * 
					 FROM Adua.tbEstadoMercancias 
					WHERE merc_Descripcion = @merc_Descripcion 
					  AND merc_Estado = 0)
		BEGIN 			
			UPDATE Adua.tbEstadoMercancias
			   SET merc_Estado = 1
			 WHERE merc_Descripcion = @merc_Descripcion 
		END
		ELSE
		BEGIN
			INSERT INTO Adua.tbEstadoMercancias (merc_Descripcion, usua_UsuarioCreacion, merc_FechaCreacion)
			VALUES (@merc_Descripcion, @usua_UsuarioCreacion, @merc_FechaCreacion)
		END

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/**************************Ejecución UDP Insertar**************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Adua.UDP_tbEstadoMercancias_Insertar 'Líquido', 1, @FechaActual
GO

/*******************************Editar*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoMercancias_Editar
(
	@merc_Id					INT,
	@merc_Descripcion			NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@merc_FechaModificacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		   UPDATE Adua.tbEstadoMercancias
			  SET merc_Descripcion = @merc_Descripcion,
				  usua_UsuarioModificacion = @usua_UsuarioModificacion,
				  merc_FechaModificacion = @merc_FechaModificacion
			WHERE merc_Id = @merc_Id 
			  AND merc_Estado = 1

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Editar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Adua.UDP_tbEstadoMercancias_Editar 1, 'Gaseoso', 1, @FechaActual
GO

/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoMercancias_Eliminar
(
	@merc_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@merc_FechaEliminacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'merc_Id', @merc_Id, 'Adua.tbEstadoMercancias', @respuesta OUTPUT

		IF(@respuesta) = 1
			BEGIN
				 UPDATE Adua.tbEstadoMercancias
					SET merc_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						merc_FechaEliminacion = @merc_FechaEliminacion
				  WHERE merc_Id = @merc_Id 
					AND merc_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Eliminar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Adua.UDP_tbEstadoMercancias_Eliminar 2, 1, @FechaActual
GO

---------------------------------------------/UDPS tbEstadoMercancias----------------------------------------------

------------------------------------------------UDPS tbUnidadMedidas-----------------------------------------------

/*******************************Listado*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Listado
AS
BEGIN
SELECT	unme_Id											,
		unme_Descripcion								,
		unidadMedidas.usua_UsuarioCreacion				,
		usuarioCreacion.usua_Nombre						AS usuarioCreacionNombre,
		unme_FechaCreacion								,
		unidadMedidas.usua_UsuarioModificacion			,
		usuarioModificacion.usua_Nombre					AS usuarioModificacionNombre,
		unme_FechaModificacion							,
		unme_Estado								
FROM Gral.tbUnidadMedidas unidadMedidas
		INNER JOIN Acce.tbUsuarios usuarioCreacion		ON unidadMedidas.usua_UsuarioCreacion = usuarioCreacion.usua_Id
		LEFT JOIN Acce.tbUsuarios usuarioModificacion	ON unidadMedidas.usua_UsuarioModificacion = usuarioModificacion.usua_Id
WHERE unme_Estado = 1
END
GO

/************************Ejecución UDP Listado************************/
EXEC Gral.UDP_tbUnidadMedidas_Listado
GO

/*******************************Insertar*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Insertar
(
	@unme_Descripcion		NVARCHAR(500),
	@usua_UsuarioCreacion	INT,
	@unme_FechaCreacion		DATETIME
)
AS
BEGIN 
	BEGIN TRY
		IF EXISTS (SELECT *
					 FROM Gral.tbUnidadMedidas
					WHERE unme_Descripcion = @unme_Descripcion
					  AND unme_Estado = 0) 
		BEGIN
			UPDATE Gral.tbUnidadMedidas
			   SET unme_Estado = 1
			 WHERE unme_Descripcion = @unme_Descripcion
			   AND unme_Estado = 0
		END
		ELSE
		BEGIN
			INSERT INTO Gral.tbUnidadMedidas (unme_Descripcion, usua_UsuarioCreacion, unme_FechaCreacion)
			VALUES (@unme_Descripcion, @usua_UsuarioCreacion, @unme_FechaCreacion)
		END

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Mensaje de error: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Insertar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Gral.UDP_tbUnidadMedidas_Insertar 'Lbs', 1, @FechaActual
GO

/*******************************Editar*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Editar
(
	@unme_Id					INT,
	@unme_Descripcion			NVARCHAR(500),
	@usua_UsuarioModificacion	INT,
	@unme_FechaModificacion		DATETIME
)
AS
BEGIN 
	BEGIN TRY
		UPDATE Gral.tbUnidadMedidas
		   SET unme_Descripcion = @unme_Descripcion,
			   usua_UsuarioModificacion = @usua_UsuarioModificacion,
			   unme_FechaModificacion = @unme_FechaModificacion
		 WHERE unme_Id = @unme_Id
		   AND unme_Estado = 1
			
		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Editar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Gral.UDP_tbUnidadMedidas_Editar 1, 'kgs', 1, @FechaActual
GO


/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Eliminar
(
	@unme_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@unme_FechaEliminacion		DATETIME
)
AS
BEGIN 
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'unme_Id', @unme_Id, 'Gral.tbUnidadMedidas', @respuesta OUTPUT
		
		IF(@respuesta) = 1
			BEGIN
				UPDATE Gral.tbUnidadMedidas
				   SET unme_Estado = 0,
					   usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
					   unme_FechaEliminacion = @unme_FechaEliminacion
				 WHERE unme_Id = @unme_Id
				   AND unme_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Eliminar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Gral.UDP_tbUnidadMedidas_Eliminar 1, 1, @FechaActual
GO

-----------------------------------------------/UDPS tbUnidadMedidas------------------------------------------------

-------------------------------------------------UDPS tbCondiciones-------------------------------------------------

/*******************************Listado*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondiciones_Listado
AS
BEGIN
SELECT	codi_Id											,
		deva_Id											,
		codi_Restricciones_Utilizacion					,
		codi_Indicar_Restricciones_Utilizacion			,
		codi_Depende_Precio_Condicion					,
		codi_Indicar_Existe_Condicion					,
		codi_Condicionada_Revertir						,
		codi_Vinculacion_Comprador_Vendedor				,
		codi_Tipo_Vinculacion							,
		codi_Vinculacion_Influye_Precio					,
		codi_Pagos_Descuentos_Indirectos				,
		codi_Concepto_Monto_Declarado					,
		codi_Existen_Canones							,
		codi_Indicar_Canones							,
		condiciones.usua_UsuarioCreacion				,
		usuarioCreacion.usua_Nombre						AS usuarioCreacionNombre,
		codi_FechaCreacion								,
		condiciones.usua_UsuarioModificacion			,
		usuarioModificacion.usua_Nombre					AS usuarioModificacionNombre,
		codi_FechaModificacion							,
		codi_Estado								
FROM	Adua.tbCondiciones condiciones
		INNER JOIN Acce.tbUsuarios usuarioCreacion		ON condiciones.usua_UsuarioCreacion = usuarioCreacion.usua_Id
		LEFT JOIN Acce.tbUsuarios usuarioModificacion	ON condiciones.usua_UsuarioModificacion = usuarioModificacion.usua_Id
WHERE	codi_Estado = 1
END
GO

/************************Ejecución UDP Listado************************/
EXEC Adua.UDP_tbCondiciones_Listado
GO

/*******************************Insertar*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondiciones_Insertar
(
	@deva_Id								INT, 
	@codi_Restricciones_Utilizacion			BIT,
	@codi_Indicar_Restricciones_Utilizacion	NVARCHAR(500),
	@codi_Depende_Precio_Condicion			BIT, 
	@codi_Indicar_Existe_Condicion			NVARCHAR(200), 
	@codi_Condicionada_Revertir				BIT, 
	@codi_Vinculacion_Comprador_Vendedor	BIT, 
	@codi_Tipo_Vinculacion					NVARCHAR(500), 
	@codi_Vinculacion_Influye_Precio		BIT, 
	@codi_Pagos_Descuentos_Indirectos		BIT, 
	@codi_Concepto_Monto_Declarado			NVARCHAR(500), 
	@codi_Existen_Canones					BIT, 
	@codi_Indicar_Canones					NVARCHAR(500), 
	@usua_UsuarioCreacion					INT, 
	@codi_FechaCreacion						DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbCondiciones 
					(deva_Id, 
					codi_Restricciones_Utilizacion, 
					codi_Indicar_Restricciones_Utilizacion, 
					codi_Depende_Precio_Condicion, 
					codi_Indicar_Existe_Condicion, 
					codi_Condicionada_Revertir, 
					codi_Vinculacion_Comprador_Vendedor, 
					codi_Tipo_Vinculacion, 
					codi_Vinculacion_Influye_Precio, 
					codi_Pagos_Descuentos_Indirectos, 
					codi_Concepto_Monto_Declarado, 
					codi_Existen_Canones, 
					codi_Indicar_Canones, 
					usua_UsuarioCreacion, 
					codi_FechaCreacion)
			VALUES	(@deva_Id,
					@codi_Restricciones_Utilizacion,
					@codi_Indicar_Restricciones_Utilizacion,
					@codi_Depende_Precio_Condicion,
					@codi_Indicar_Existe_Condicion,
					@codi_Condicionada_Revertir,
					@codi_Vinculacion_Comprador_Vendedor,
					@codi_Tipo_Vinculacion,
					@codi_Vinculacion_Influye_Precio,
					@codi_Pagos_Descuentos_Indirectos,
					@codi_Concepto_Monto_Declarado,
					@codi_Existen_Canones,
					@codi_Indicar_Canones,
					@usua_UsuarioCreacion,
					@codi_FechaCreacion)

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Insertar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Adua.UDP_tbCondiciones_Insertar 1, 1, 'Pos algo ¿No?', 1, 'Pos algo ¿No?', 1, 1, 'Pos algo ¿No?', 0, 0, '150000', 1, 'Algo', 1, @FechaActual
GO

/*******************************Editar*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondiciones_Editar
(
	@codi_Id								INT,
	@deva_Id								INT, 
	@codi_Restricciones_Utilizacion			BIT,
	@codi_Indicar_Restricciones_Utilizacion	NVARCHAR(500),
	@codi_Depende_Precio_Condicion			BIT, 
	@codi_Indicar_Existe_Condicion			NVARCHAR(200), 
	@codi_Condicionada_Revertir				BIT, 
	@codi_Vinculacion_Comprador_Vendedor	BIT, 
	@codi_Tipo_Vinculacion					NVARCHAR(500), 
	@codi_Vinculacion_Influye_Precio		BIT, 
	@codi_Pagos_Descuentos_Indirectos		BIT, 
	@codi_Concepto_Monto_Declarado			NVARCHAR(500), 
	@codi_Existen_Canones					BIT, 
	@codi_Indicar_Canones					NVARCHAR(500), 
	@usua_UsuarioModificacion				INT, 
	@codi_FechaModificacion					DATETIME
)
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbCondiciones 
		   SET deva_Id = @deva_Id, 
			   codi_Restricciones_Utilizacion = @codi_Restricciones_Utilizacion, 
			   codi_Indicar_Restricciones_Utilizacion = @codi_Indicar_Restricciones_Utilizacion, 
			   codi_Depende_Precio_Condicion = @codi_Depende_Precio_Condicion, 
			   codi_Indicar_Existe_Condicion = @codi_Indicar_Existe_Condicion, 
			   codi_Condicionada_Revertir = @codi_Condicionada_Revertir, 
			   codi_Vinculacion_Comprador_Vendedor = @codi_Vinculacion_Comprador_Vendedor, 
			   codi_Tipo_Vinculacion = @codi_Tipo_Vinculacion, 
			   codi_Vinculacion_Influye_Precio = @codi_Vinculacion_Influye_Precio, 
			   codi_Pagos_Descuentos_Indirectos = @codi_Pagos_Descuentos_Indirectos, 
			   codi_Concepto_Monto_Declarado = @codi_Concepto_Monto_Declarado, 
			   codi_Existen_Canones = @codi_Existen_Canones, 
			   codi_Indicar_Canones = @codi_Indicar_Canones, 
			   usua_UsuarioCreacion = @usua_UsuarioModificacion, 
			   codi_FechaCreacion = @codi_FechaModificacion
		 WHERE codi_Id = @codi_Id
		   AND codi_Estado = 1

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Editar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Adua.UDP_tbCondiciones_Editar 1, 0, 0, 'Pos algo ¿No?', 1, 'Pos algo ¿No?', 0, 0, 'Pos algo ¿No?', 0, 0, '150000', 1, 'Algo', 1, @FechaActual
GO

------------------------------------------------/UDPS tbCondiciones-------------------------------------------------

------------------------------------------------UDPS tbFormas_Envio-------------------------------------------------

/*******************************Listado*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_Listado
AS
BEGIN
SELECT	foen_Id											,
		foen_Descripcion								,
		formasEnvio.usua_UsuarioCreacion				,
		usuarioCreacion.usua_Nombre						AS usuarioCreacionNombre,
		foen_FechaCreacion								,
		formasEnvio.usua_UsuarioModificacion			,
		usuarioModificacion.usua_Nombre					AS usuarioModificacionNombre,
		foen_FechaModificacion							,
		foen_Estado							
FROM	Gral.tbFormas_Envio formasEnvio
		INNER JOIN Acce.tbUsuarios usuarioCreacion		ON formasEnvio.usua_UsuarioCreacion = usuarioCreacion.usua_Id
		LEFT JOIN Acce.tbUsuarios usuarioModificacion	ON formasEnvio.usua_UsuarioModificacion = usuarioModificacion.usua_Id
WHERE	foen_Estado = 1
END
GO

/************************Ejecución UDP Listado************************/
EXEC Gral.UDP_tbFormas_Envio_Listado
GO

/*******************************Insertar*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_Insertar
(
	@foen_Descripcion		NVARCHAR(500),
	@usua_UsuarioCreacion	INT,
	@foen_FechaCreacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * 
					 FROM Gral.tbFormas_Envio
					WHERE foen_Descripcion = @foen_Descripcion
					  AND foen_Estado = 0)
		BEGIN
			UPDATE Gral.tbFormas_Envio
			   SET foen_Estado = 1
			 WHERE foen_Descripcion = @foen_Descripcion
		END
		ELSE
		BEGIN
			INSERT INTO Gral.tbFormas_Envio (foen_Descripcion, usua_UsuarioCreacion, foen_FechaCreacion)
			VALUES (@foen_Descripcion, @usua_UsuarioCreacion, @foen_FechaCreacion)
		END
		
		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Insertar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Gral.UDP_tbFormas_Envio_Insertar 'En Burro', 1, @FechaActual
GO


/*******************************Editar*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_Editar
(
	@foen_Id					INT,
	@foen_Descripcion			NVARCHAR(500),
	@usua_UsuarioModificacion	INT,
	@foen_FechaModificacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		UPDATE Gral.tbFormas_Envio
		   SET foen_Descripcion = @foen_Descripcion,
			   usua_UsuarioModificacion = @usua_UsuarioModificacion,
			   foen_FechaModificacion = @foen_FechaModificacion
		 WHERE foen_Id = @foen_Id
		   AND foen_Estado = 1

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Editar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Gral.UDP_tbFormas_Envio_Editar 1, 'En Yegua', 1, @FechaActual
GO


/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_Eliminar
(
	@foen_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@foen_FechaEliminacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'foen_Id', @foen_Id, 'Gral.tbFormas_Envio', @respuesta OUTPUT
		
		IF(@respuesta) = 1
		BEGIN
			UPDATE Gral.tbFormas_Envio
			   SET foen_Estado = 0,
				   usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
				   foen_FechaEliminacion = @foen_FechaEliminacion
			 WHERE foen_Id = @foen_Id
			   AND foen_Estado = 1
		END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Eliminar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC Gral.UDP_tbFormas_Envio_Eliminar 1, 1, @FechaActual
GO

-----------------------------------------------/UDPS tbFormas_Envio-------------------------------------------------

-------------------------------------------------UDPS tbEmpleados---------------------------------------------------

/*******************************Listado*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbEmpleados_Listar
AS
BEGIN
<<<<<<< Updated upstream
SELECT empl.empl_Id									,
		empl_Nombres								,
		empl_Apellidos								,
		empl_DNI									,
		empl.escv_Id								,
		escv.escv_Nombre							,
		CASE 
		WHEN [empl_Sexo] = 'F' THEN 'Femenino'
		ELSE 'Masculino'
		END											AS empl_Sexo,
		empl_FechaNacimiento						,
		empl_Telefono								,
		empl_DireccionExacta						,
		empl.pvin_Id								,
		pvin.pvin_Nombre							,
		pais.pais_Codigo							,
		pais.pais_Nombre							,
		empl_CorreoElectronico						,
		empl.carg_Id								,
		carg.carg_Nombre							,
		empl_EsAduana								,
		empl.usua_UsuarioCreacion					,
		usuaCrea.usua_Nombre						AS usuarioCreacionNombre,
		empl_FechaCreacion							,
		empl.usua_UsuarioModificacion				,
		usuaModifica.usua_Nombre					AS usuarioModificacionNombre,
		empl_FechaModificacion						,
		empl.usua_UsuarioEliminacion				,
		usuaElimina.usua_Nombre						AS usuarioEliminacionNombre,
		empl_FechaEliminacion						,
		empl_Estado								
FROM	[Gral].[tbEmpleados] empl 
		INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON empl.usua_UsuarioCreacion = usuaCrea.usua_Id 
		LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON empl.usua_UsuarioModificacion = usuaCrea.usua_Id 
		LEFT JOIN [Acce].[tbUsuarios] usuaElimina	ON empl.usua_UsuarioEliminacion = usuaCrea.usua_Id 
		INNER JOIN [Gral].[tbEstadosCiviles] escv	ON empl.escv_Id = escv.escv_Id 
		INNER JOIN [Gral].[tbProvincias] pvin		ON empl.pvin_Id = pvin.pvin_Id 
		INNER JOIN [Gral].[tbPaises] pais			ON pvin.pais_Id = pais.pais_Id 
		INNER JOIN [Gral].[tbCargos] carg			ON empl.carg_Id = carg.carg_Id
WHERE	empl_Estado = 1
=======
	SELECT empl.empl_Id								AS empleadoId, 
		   empl_Nombres								AS empleadoNombres, 
		   empl_Apellidos							AS empleadoApellidos,
		   empl_DNI									AS empleadoDNI,
		   empl.escv_Id								AS estadoCivilId,
		   escv.escv_Nombre							AS estadoCivilNombre,
		   CASE 
			WHEN empl_Sexo = 'F' THEN 'Femenino'
		   	ELSE 'Masculino'
		   END										AS empleadoSexo,
		   empl_FechaNacimiento						AS empleadoNacimiento,
		   empl_Telefono							AS empleadoTelefono,
		   empl_DireccionExacta						AS empleadoDireccion,
		   empl.pvin_Id								AS provinciaId,
		   pvin.pvin_Nombre							AS provinciaNombre,
		   pais.pais_Codigo							AS paisCodigo,
		   pais.pais_Nombre							AS paisNombre,
		   empl_CorreoElectronico					AS empleadoCorreo,
		   empl.carg_Id								AS cargoId,
		   carg.carg_Nombre							AS cargoNombre,
		   empl_EsAduana							AS empleadoAduana,
		   empl.usua_UsuarioCreacion				AS usuarioCreacion, 
		   usuaCrea.usua_Nombre						AS usuarioCreacionNombre,
		   empl_FechaCreacion						AS fechaCreacion, 
		   empl.usua_UsuarioModificacion			AS usuarioModificacion, 
		   usuaModifica.usua_Nombre					AS usuarioModificacionNombre,
		   empl_FechaModificacion					AS fechaModificacion, 
		   empl.usua_UsuarioEliminacion				AS usuarioEliminacion, 
		   usuaElimina.usua_Nombre					AS usuarioEliminacionNombre,
		   empl_FechaEliminacion					AS fechaEliminacion, 
		   empl_Estado								AS empleadoEstado
	  FROM Gral.tbEmpleados empl 
INNER JOIN Acce.tbUsuarios usuaCrea
		ON empl.usua_UsuarioCreacion = usuaCrea.usua_Id 
 LEFT JOIN Acce.tbUsuarios usuaModifica
		ON empl.usua_UsuarioModificacion = usuaCrea.usua_Id 
 LEFT JOIN Acce.tbUsuarios usuaElimina
		ON empl.usua_UsuarioEliminacion = usuaCrea.usua_Id 
INNER JOIN Gral.tbEstadosCiviles escv
		ON empl.escv_Id = escv.escv_Id 
INNER JOIN Gral.tbProvincias pvin
		ON empl.pvin_Id = pvin.pvin_Id 
INNER JOIN Gral.tbPaises pais
		ON pvin.pais_Id = pais.pais_Id 
INNER JOIN Gral.tbCargos carg
		ON empl.carg_Id = carg.carg_Id
	 WHERE empl_Estado = 1
>>>>>>> Stashed changes
END
GO

/************************Ejecución UDP Listado************************/
EXEC  Gral.UDP_tbEmpleados_Listar
GO

/*******************************Insertar*************************************/
CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_Insertar
	@empl_Nombres			NVARCHAR(150),
	@empl_Apellidos			NVARCHAR(150),
	@empl_DNI				NVARCHAR(20), 
	@escv_Id				INT, 
	@empl_Sexo				CHAR, 
	@empl_FechaNacimiento	DATE, 
	@empl_Telefono			NVARCHAR(20), 
	@empl_DireccionExacta	NVARCHAR(500), 
	@pvin_Id				INT, 
	@empl_CorreoElectronico	NVARCHAR(150), 
	@carg_Id				INT, 
	@empl_EsAduana			BIT, 
	@usua_UsuarioCreacion	INT,
	@empl_FechaCreacion     DATETIME
AS 
BEGIN
	BEGIN TRY
		--IF EXISTS (SELECT * FROM Gral.tbEmpleados
		--				WHERE empl_DNI = @empl_DNI AND empl_Telefono = @empl_Telefono
		--				AND empl_Estado = 0)
		--BEGIN
		--	UPDATE Gral.tbEmpleados
		--	SET	   empl_Estado = 1,
		--		   empl_Nombres = @empl_Nombres, 
		--		   empl_Apellidos = @empl_Apellidos, 
		--		   empl_DNI = @empl_DNI, 
		--		   escv_Id = @escv_Id, 
		--		   empl_Sexo = @empl_Sexo, 
		--		   empl_FechaNacimiento = @empl_FechaNacimiento, 
		--		   empl_Telefono = @empl_Telefono, 
		--		   empl_DireccionExacta = @empl_DireccionExacta, 
		--		   pvin_Id = @pvin_Id, 
		--		   empl_CorreoElectronico = @empl_CorreoElectronico, 
		--		   carg_Id = @carg_Id, 
		--		   empl_EsAduana = @empl_EsAduana
		--	WHERE  empl_DNI = @empl_DNI

		--	SELECT 1
		--END
		--ELSE 
		--	BEGIN
		--		INSERT INTO  Gral.tbEmpleados(empl_Nombres, 
		--										  empl_Apellidos, 
		--										  empl_DNI, 
		--										  escv_Id, 
		--										  empl_Sexo, 
		--										  empl_FechaNacimiento, 
		--										  empl_Telefono, 
		--										  empl_DireccionExacta, 
		--										  pvin_Id, 
		--										  empl_CorreoElectronico, 
		--										  carg_Id, 
		--										  empl_EsAduana, 
		--										  usua_UsuarioCreacion, 
		--										  empl_FechaCreacion)
		--	VALUES(@empl_Nombres,
		--		   @empl_Apellidos,
		--		   @empl_DNI, 
		--		   @escv_Id,
		--		   @empl_Sexo,				
		--		   @empl_FechaNacimiento,	
		--		   @empl_Telefono, 
		--		   @empl_DireccionExacta, 
		--		   @pvin_Id,
		--		   @empl_CorreoElectronico, 
		--		   @carg_Id,
		--		   @empl_EsAduana,		
		--		   @usua_UsuarioCreacion,	
		--		   @empl_FechaCreacion)


		--	SELECT 1
		--END
			INSERT INTO Gral.tbEmpleados
						(empl_Nombres, 
						 empl_Apellidos, 
						 empl_DNI, 
						 escv_Id, 
						 empl_Sexo, 
						 empl_FechaNacimiento, 
						 empl_Telefono, 
						 empl_DireccionExacta, 
						 pvin_Id, 
						 empl_CorreoElectronico, 
						 carg_Id, 
						 empl_EsAduana, 
						 usua_UsuarioCreacion, 
						 empl_FechaCreacion)
				  VALUES (@empl_Nombres,
				  	      @empl_Apellidos,
				  	      @empl_DNI, 
				  	      @escv_Id,
				  	      @empl_Sexo,				
				  	      @empl_FechaNacimiento,	
				  	      @empl_Telefono, 
				  	      @empl_DireccionExacta, 
				  	      @pvin_Id,
				  	      @empl_CorreoElectronico, 
				  	      @carg_Id,
				  	      @empl_EsAduana,		
				  	      @usua_UsuarioCreacion,	
				  	      @empl_FechaCreacion)
		
		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH 
END
GO

/************************Ejecución UDP Insertar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC gral.UDP_tbEmpleados_Insertar 'Eder Jesús', 'Sánchez Martínez', '0501200206702', 1, 'M', '04-22-2002', '9617-8153', 'A la par de un lado', 1, 'ederjsanchez22@gmail.com', 1, 1, 1, @FechaActual
GO

/*******************************Editar*************************************/
CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_Editar
	@empl_Id					INT,
	@empl_Nombres				NVARCHAR(150),
	@empl_Apellidos				NVARCHAR(150),
	@empl_DNI					NVARCHAR(20), 
	@escv_Id					INT, 
	@empl_Sexo					CHAR, 
	@empl_FechaNacimiento		DATE, 
	@empl_Telefono				NVARCHAR(20), 
	@empl_DireccionExacta		NVARCHAR(500), 
	@pvin_Id					INT, 
	@empl_CorreoElectronico		NVARCHAR(150), 
	@carg_Id					INT, 
	@empl_EsAduana				BIT, 
	@usua_UsuarioModificacion	INT,
	@empl_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		 UPDATE Gral.tbEmpleados
		    SET empl_Nombres = @empl_Nombres, 
				empl_Apellidos = @empl_Apellidos, 
				empl_DNI = @empl_DNI, 
				escv_Id = @escv_Id, 
				empl_Sexo = @empl_Sexo, 
				empl_FechaNacimiento = @empl_FechaNacimiento, 
				empl_Telefono = @empl_Telefono, 
				empl_DireccionExacta = @empl_DireccionExacta, 
				pvin_Id = @pvin_Id, 
				empl_CorreoElectronico = @empl_CorreoElectronico, 
				carg_Id = @carg_Id, 
				empl_EsAduana = @empl_EsAduana,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				empl_FechaModificacion = @empl_FechaModificacion
		  WHERE empl_Id = @empl_Id

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Editar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC gral.UDP_tbEmpleados_Editar 1, 'Phineas', 'Fletcher', '0604200509874', 1, 'M', '08-13-2005', '8154-9487', 'A la par del otro lado', 1, 'phineasFletcher@gmail.com', 1, 1, 1, @FechaActual
GO

/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_Eliminar 
	@empl_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@empl_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'empl_Id', @empl_Id, 'gral.tbEmpleados', @respuesta OUTPUT

		IF(@respuesta) = 1
		BEGIN
			UPDATE Gral.tbEmpleados
			   SET empl_Estado = 0,
				   usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
				   empl_FechaEliminacion = @empl_FechaEliminacion
			 WHERE empl_Id = @empl_Id
		END
		
		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Eliminar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC gral.UDP_tbEmpleados_Eliminar 1, 1, @FechaActual
GO
------------------------------------------------/UDPS tbEmpleados---------------------------------------------------

---------------------------------------------UDPS tbFuncionesMaquina------------------------------------------------

/*******************************Listado*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbFuncionesMaquina_Listar
AS
BEGIN
<<<<<<< Updated upstream
SELECT func_Id										,
		func_Nombre									,
		func.usua_UsuarioCreacion					,
		usuaCrea.usua_Nombre						AS usuarioCreacionNombre,
		func_FechaCreacion							,
		func.usua_UsuarioModificacion				,
		usuaModifica.usua_Nombre					AS usuarioModificacionNombre,
		func_FechaModificacion						,
		func.usua_UsuarioEliminacion				,
		usuaElimina.usua_Nombre						AS usuarioEliminacionNombre,
		func_FechaEliminacion						,
		func_Estado									
FROM	[Prod].[tbFuncionesMaquina] func 
		INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON func.usua_UsuarioCreacion = usuaCrea.usua_Id 
		LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON func.usua_UsuarioModificacion = usuaCrea.usua_Id 
		LEFT JOIN [Acce].[tbUsuarios] usuaElimina	ON func.usua_UsuarioEliminacion = usuaCrea.usua_Id 
WHERE	func_Estado = 1
=======
	SELECT func_Id							AS funcionId, 
		   func_Nombre						AS funcionNombre, 
		   func.usua_UsuarioCreacion		AS usuarioCreacion, 
		   usuaCrea.usua_Nombre				AS usuarioCreacionNombre,
		   func_FechaCreacion				AS fechaCreacion, 
		   func.usua_UsuarioModificacion	AS usuarioModificacion, 
		   usuaModifica.usua_Nombre			AS usuarioModificacionNombre,
		   func_FechaModificacion			AS fechaModificacion,
		   func.usua_UsuarioEliminacion		AS usuarioEliminacion, 
		   usuaElimina.usua_Nombre			AS usuarioEliminacionNombre,
		   func_FechaEliminacion			AS fechaEliminacion, 
		   func_Estado						AS funcionEstado
	  FROM Prod.tbFuncionesMaquina func 
INNER JOIN Acce.tbUsuarios usuaCrea
		ON func.usua_UsuarioCreacion = usuaCrea.usua_Id 
 LEFT JOIN Acce.tbUsuarios usuaModifica
		ON func.usua_UsuarioModificacion = usuaCrea.usua_Id 
 LEFT JOIN Acce.tbUsuarios usuaElimina
		ON func.usua_UsuarioEliminacion = usuaCrea.usua_Id 
	 WHERE func_Estado = 1
>>>>>>> Stashed changes
END
GO

/************************Ejecución UDP Listado************************/
EXEC prod.UDP_tbFuncionesMaquina_Listar
GO

/*******************************Insertar*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbFuncionesMaquina_Insertar
	@func_Nombre			NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@func_FechaCreacion     DATETIME
AS 
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * 
					 FROM Prod.tbFuncionesMaquina
					WHERE @func_Nombre = func_Nombre
					  AND func_Estado = 0)
		BEGIN
			UPDATE Prod.tbFuncionesMaquina
			   SET func_Estado = 1
			 WHERE func_Nombre = @func_Nombre
		END
		ELSE 
		BEGIN
			INSERT INTO Prod.tbFuncionesMaquina (func_Nombre, usua_UsuarioCreacion, func_FechaCreacion)
			VALUES(@func_Nombre, @usua_UsuarioCreacion, @func_FechaCreacion)
		END

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH 
END
GO

/************************Ejecución UDP Insertar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC prod.UDP_tbFuncionesMaquina_Insertar 'La super cortadora 2.0', 1, @FechaActual
GO

/*******************************Editar*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbFuncionesMaquina_Editar
	@func_Id					INT,
	@func_Nombre				NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@func_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
	   UPDATE Prod.tbFuncionesMaquina
		  SET func_Nombre = @func_Nombre,
			  usua_UsuarioModificacion = @usua_UsuarioModificacion,
			  func_FechaModificacion = @func_FechaModificacion
		WHERE func_Id = @func_Id

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Editar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC prod.UDP_tbFuncionesMaquina_Editar 1, 'La mega hiper ultra cortadora 2.0', 1, @FechaActual
GO

/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbFuncionesMaquina_Eliminar 
	@func_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@func_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'func_Id', @func_Id, 'prod.tbFuncionesMaquina', @respuesta OUTPUT

		IF(@respuesta) = 1
		BEGIN
			UPDATE Prod.tbFuncionesMaquina
			   SET func_Estado = 0
			 WHERE func_Id = @func_Id
		END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Eliminar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC prod.UDP_tbFuncionesMaquina_Eliminar 1, 1, @FechaActual
GO

--------------------------------------------/UDPS tbFuncionesMaquina------------------------------------------------

-------------------------------------------------UDPS tbCategoria---------------------------------------------------

/*******************************Listado*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Listar
AS
BEGIN
<<<<<<< Updated upstream
SELECT	cate_Id										,
		cate_Descripcion							,
		cate.usua_UsuarioCreacion					,
		usuaCrea.usua_Nombre						AS usuarioCreacionNombre,
		cate_FechaCreacion							,
		cate.usua_UsuarioModificacion				,
		usuaModifica.usua_Nombre					AS usuarioModificacionNombre,
		cate_FechaModificacion						,
		cate.usua_UsuarioEliminacion				,
		usuaElimina.usua_Nombre						AS usuarioEliminacionNombre,
		cate_FechaEliminacion						,
		cate_Estado						
FROM	[Prod].[tbCategoria] cate 
		INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON cate.usua_UsuarioCreacion = usuaCrea.usua_Id 
		LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON cate.usua_UsuarioModificacion = usuaCrea.usua_Id 
		LEFT JOIN [Acce].[tbUsuarios] usuaElimina	ON cate.usua_UsuarioEliminacion = usuaCrea.usua_Id 
WHERE cate_Estado = 1
=======
	SELECT cate_Id							AS categoriaId, 
		   cate_Descripcion					AS categoriaDescripcion, 
		   cate.usua_UsuarioCreacion		AS usuarioCreacion, 
		   usuaCrea.usua_Nombre				AS usuarioCreacionNombre,
		   cate_FechaCreacion				AS fechaCreacion, 
		   cate.usua_UsuarioModificacion	AS usuarioModificacion, 
		   usuaModifica.usua_Nombre			AS usuarioModificacionNombre,
		   cate_FechaModificacion			AS fechaModificacion,
		   cate.usua_UsuarioEliminacion		AS usuarioEliminacion, 
		   usuaElimina.usua_Nombre			AS usuarioEliminacionNombre,
		   cate_FechaEliminacion			AS fechaEliminacion, 
		   cate_Estado						AS categoriaEstado
	  FROM Prod.tbCategoria cate 
INNER JOIN Acce.tbUsuarios usuaCrea
		ON cate.usua_UsuarioCreacion = usuaCrea.usua_Id 
 LEFT JOIN Acce.tbUsuarios usuaModifica
		ON cate.usua_UsuarioModificacion = usuaCrea.usua_Id 
 LEFT JOIN Acce.tbUsuarios usuaElimina
		ON cate.usua_UsuarioEliminacion = usuaCrea.usua_Id 
	 WHERE cate_Estado = 1
>>>>>>> Stashed changes
END
GO

/************************Ejecución UDP Listado************************/
EXEC prod.UDP_tbCategoria_Listar
GO

/*******************************Insertar*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Insertar
	@cate_Descripcion		NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@cate_FechaCreacion     DATETIME
AS 
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * 
					 FROM Prod.tbCategoria
					WHERE cate_Descripcion = @cate_Descripcion
					  AND cate_Estado = 0)
		BEGIN
			UPDATE Prod.tbCategoria
			SET	   cate_Estado = 1
			WHERE  cate_Descripcion = @cate_Descripcion
		END
		ELSE 
		BEGIN
			INSERT INTO Prod.tbCategoria (cate_Descripcion, usua_UsuarioCreacion, cate_FechaCreacion)
			VALUES(@cate_Descripcion, @usua_UsuarioCreacion, @cate_FechaCreacion)
		END

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH 
END
GO

/************************Ejecución UDP Insertar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC prod.UDP_tbCategoria_Insertar 'Tela', 1, @FechaActual
GO

/*******************************Editar*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Editar
	@cate_Id					INT,
	@cate_Descripcion			NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@cate_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbCategoria
		   SET cate_Descripcion = @cate_Descripcion,
			   usua_UsuarioModificacion = @usua_UsuarioModificacion,
			   cate_FechaModificacion = @cate_FechaModificacion
		 WHERE cate_Id = @cate_Id

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Editar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC prod.UDP_tbCategoria_Editar 1, 'Hilo', 1, @FechaActual
GO

/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Eliminar 
	@cate_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@cate_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'cate_Id', @cate_Id, 'prod.tbCategoria', @respuesta OUTPUT

		IF(@respuesta) = 1
		BEGIN
			UPDATE Prod.tbCategoria
			   SET cate_Estado = 0,
				   usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
				   cate_FechaEliminacion = @cate_FechaEliminacion
			 WHERE cate_Id = @cate_Id
		END

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

/************************Ejecución UDP Eliminar************************/
DECLARE @FechaActual DATETIME
SET @FechaActual = GETDATE();

EXEC prod.UDP_tbCategoria_Eliminar 1, 1, @FechaActual
GO
------------------------------------------------/UDPS tbCategoria---------------------------------------------------

--------------------------------------------UDPS Para contrato de adhesión-------------------------------------------

CREATE OR ALTER PROCEDURE Adua.UDP_tbPersonas_Insertar
(
	@pers_RTN					VARCHAR(20),
	@ofic_Id					INT,
	@escv_Id					INT,
	@ofpr_Id					INT,
	@fopr_Id					BIT,
	@pers_escvRepresentante		INT,
	@pers_OfprRepresentante		INT,
	@usua_UsuarioCreacion		INT,
	@pers_FechaCreacion			DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbPersonas 
					(pers_RTN, 
					ofic_Id, 
					escv_Id, 
					ofpr_Id, 
					fopr_Id, 
					pers_escvRepresentante, 
					pers_OfprRepresentante, 
					usua_UsuarioCreacion, 
					pers_FechaCreacion)
			 VALUES (@pers_RTN,
					@ofic_Id,
					@escv_Id,
					@ofpr_Id,
					@fopr_Id,
					@pers_escvRepresentante,
					@pers_OfprRepresentante,
					@usua_UsuarioCreacion,
					@pers_FechaCreacion)

		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbPersonas_Editar
(
	@pers_Id 					INT,
	@pers_RTN					VARCHAR(20),
	@ofic_Id					INT,
	@escv_Id					INT,
	@ofpr_Id					INT,
	@fopr_Id					BIT,
	@pers_escvRepresentante		INT,
	@pers_OfprRepresentante		INT,
	@usua_UsuarioCreacion		INT,
	@pers_FechaCreacion			DATETIME
)
AS
BEGIN
	BEGIN TRY
			UPDATE Adua.tbPersonas 
			   SET pers_RTN = @pers_RTN, 					
				   ofic_Id = @ofic_Id, 					
				   escv_Id = @escv_Id, 					
				   ofpr_Id = @ofpr_Id, 					
				   fopr_Id = @fopr_Id, 					
				   pers_escvRepresentante = @pers_escvRepresentante, 		
				   pers_OfprRepresentante = @pers_OfprRepresentante, 		
				   usua_UsuarioCreacion = @usua_UsuarioCreacion,      	
				   pers_FechaCreacion = @pers_FechaCreacion
			 WHERE pers_Id = @pers_Id

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbComercianteIndividual_Insertar
(
  	@pers_Id                           	INT,
  	@fopr_Id                           	BIT,
  	@colo_Id                           	INT,
  	@coin_PuntoReferencia			  	NVARCHAR(200),
  	@coin_ColoniaRepresentante		  	INT,
  	@coin_NumeroLocalReprentante	    NVARCHAR(200),
  	@coin_PuntoReferenciaReprentante   	NVARCHAR(200),
  	@coin_TelefonoCelular			    NVARCHAR(20),
  	@coin_TelefonoFijo				    NVARCHAR(20),
  	@coin_CorreoElectronico		    	NVARCHAR(30),
  	@coin_CorreoElectronicoAlternativo 	NVARCHAR(30),
  	@usua_UsuarioCreacion       		INT,
  	@coin_FechaCreacion         		DATETIME 
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbComercianteIndividual 
					(pers_Id,                           	
					fopr_Id,                           	
					colo_Id,                           	
					coin_PuntoReferencia,			  	
					coin_ColoniaRepresentante,		  	
					coin_NumeroLocalReprentante,	    
					coin_PuntoReferenciaReprentante,   	
					coin_TelefonoCelular,			    
					coin_TelefonoFijo,				    
					coin_CorreoElectronico,		    	
					coin_CorreoElectronicoAlternativo, 	
					usua_UsuarioCreacion,       		
					coin_FechaCreacion)
			 VALUES (@pers_Id,                           	
					 @fopr_Id,                           	
					 @colo_Id,                           	
					 @coin_PuntoReferencia,			  	
					 @coin_ColoniaRepresentante,		  	
					 @coin_NumeroLocalReprentante,	    
					 @coin_PuntoReferenciaReprentante,   	
					 @coin_TelefonoCelular,			    
					 @coin_TelefonoFijo,				    
					 @coin_CorreoElectronico,		    	
					 @coin_CorreoElectronicoAlternativo, 	
					 @usua_UsuarioCreacion,       		
					 @coin_FechaCreacion)

		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbComercianteIndividual_Editar
(
	@coin_Id							INT,
  	@pers_Id                           	INT,
  	@fopr_Id                           	BIT,
  	@colo_Id                           	INT,
  	@coin_PuntoReferencia			  	NVARCHAR(200),
  	@coin_ColoniaRepresentante		  	INT,
  	@coin_NumeroLocalReprentante	    NVARCHAR(200),
  	@coin_PuntoReferenciaReprentante   	NVARCHAR(200),
  	@coin_TelefonoCelular			    NVARCHAR(20),
  	@coin_TelefonoFijo				    NVARCHAR(20),
  	@coin_CorreoElectronico		    	NVARCHAR(30),
  	@coin_CorreoElectronicoAlternativo 	NVARCHAR(30),
  	@usua_UsuarioModificacion   		INT,
  	@coin_FechaModificacion     		DATETIME 
)
AS
BEGIN
	BEGIN TRY
		 UPDATE Adua.tbComercianteIndividual 
			SET pers_Id = @pers_Id,                           	
				fopr_Id = @fopr_Id,                           	
				colo_Id = @colo_Id,                           	
				coin_PuntoReferencia = @coin_PuntoReferencia,			  	
				coin_ColoniaRepresentante = @coin_ColoniaRepresentante,		  	
				coin_NumeroLocalReprentante = @coin_NumeroLocalReprentante,	    
				coin_PuntoReferenciaReprentante = @coin_PuntoReferenciaReprentante,   	
				coin_TelefonoCelular = @coin_TelefonoCelular,			    
				coin_TelefonoFijo = @coin_TelefonoFijo,				    
				coin_CorreoElectronico = @coin_CorreoElectronico,		    	
				coin_CorreoElectronicoAlternativo = @coin_CorreoElectronicoAlternativo, 	
				usua_UsuarioCreacion = @usua_UsuarioCreacion,       		
				coin_FechaCreacion = @coin_FechaCreacion
		  WHERE coin_Id = @coin_Id

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbPersonaNatural_Insertar
(
	@pers_Id					INT,
	@pena_DireccionExacta		NVARCHAR(200),
	@ciud_Id					INT,
	@pena_TelefonoFijo			NVARCHAR(20),
	@pena_TelefonoCelular		NVARCHAR(20),
	@pena_CorreoElectronico		NVARCHAR(50),
	@pena_CorreoAlternativo		NVARCHAR(50),
	@pena_RTN					NVARCHAR(40),
	@pena_ArchivoRTN			NVARCHAR(MAX),
	@pena_DNI					NVARCHAR(40),
	@pena_ArchivoDNI			NVARCHAR(MAX),
	@pena_NumeroRecibo			VARCHAR(100),
	@pena_ArchivoNumeroRecibo	NVARCHAR(MAX),
	@usua_UsuarioCreacion       INT,
	@pena_FechaCreacion         DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbPersonaNatural
					(pers_Id,						
					pena_DireccionExacta,		
					ciud_Id,						
					pena_TelefonoFijo,			
					pena_TelefonoCelular,		
					pena_CorreoElectronico,		
					pena_CorreoAlternativo,		
					pena_RTN,					
					pena_ArchivoRTN,				
					pena_DNI,					
					pena_ArchivoDNI,				
					pena_NumeroRecibo,			
					pena_ArchivoNumeroRecibo,	
					usua_UsuarioCreacion,       	
					pena_FechaCreacion)
			VALUES (@pers_Id,					
					@pena_DireccionExacta,		
					@ciud_Id,					
					@pena_TelefonoFijo,			
					@pena_TelefonoCelular,		
					@pena_CorreoElectronico,		
					@pena_CorreoAlternativo,		
					@pena_RTN,					
					@pena_ArchivoRTN,			
					@pena_DNI,					
					@pena_ArchivoDNI,			
					@pena_NumeroRecibo,			
					@pena_ArchivoNumeroRecibo,	
					@usua_UsuarioCreacion,      
					@pena_FechaCreacion)

		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbPersonaNatural_Editar
(
	@pena_Id					INT,
	@pers_Id					INT,
	@pena_DireccionExacta		NVARCHAR(200),
	@ciud_Id					INT,
	@pena_TelefonoFijo			NVARCHAR(20),
	@pena_TelefonoCelular		NVARCHAR(20),
	@pena_CorreoElectronico		NVARCHAR(50),
	@pena_CorreoAlternativo		NVARCHAR(50),
	@pena_RTN					NVARCHAR(40),
	@pena_ArchivoRTN			NVARCHAR(MAX),
	@pena_DNI					NVARCHAR(40),
	@pena_ArchivoDNI			NVARCHAR(MAX),
	@pena_NumeroRecibo			VARCHAR(100),
	@pena_ArchivoNumeroRecibo	NVARCHAR(MAX),
	@usua_UsuarioModificacion   INT,
	@pena_FechaModificacion     DATETIME
)
AS
BEGIN
	BEGIN TRY
		 UPDATE Adua.tbPersonaNatural
			SET pers_Id = @pers_Id,						
				pena_DireccionExacta = @pena_DireccionExacta,		
				ciud_Id = @ciud_Id,						
				pena_TelefonoFijo = @pena_TelefonoFijo,			
				pena_TelefonoCelular = @pena_TelefonoCelular,		
				pena_CorreoElectronico = @pena_CorreoElectronico,		
				pena_CorreoAlternativo = @pena_CorreoAlternativo,		
				pena_RTN = @pena_RTN,					
				pena_ArchivoRTN = @pena_ArchivoRTN,				
				pena_DNI = @pena_DNI,					
				pena_ArchivoDNI = @pena_ArchivoDNI,				
				pena_NumeroRecibo = @pena_NumeroRecibo,			
				pena_ArchivoNumeroRecibo = @pena_ArchivoNumeroRecibo,	  	
				usua_UsuarioModificacion = @usua_UsuarioModificacion,   	
				pena_FechaModificacion = @pena_FechaModificacion     	
		  WHERE pena_Id = @pena_Id

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbPersonaJuridica_Insertar
(
	@pers_Id							  	INT,
	@peju_EstadoRepresentante				INT,
	@colo_Id							  	INT,
	@peju_PuntoReferencia					NVARCHAR(200),
	@peju_ColoniaRepresentante				INT,
	@peju_NumeroLocalReprentante		  	NVARCHAR(200),
	@peju_PuntoReferenciaReprentante	  	NVARCHAR(200),
	@peju_TelefonoEmpresa					NVARCHAR(200),
	@peju_TelefonoFijoRepresentanteLegal 	NVARCHAR(200),
	@peju_TelefonoRepresentanteLegal	  	NVARCHAR(200),
	@peju_CorreoElectronico              	NVARCHAR(200),
	@peju_CorreoElectronicoAlternativo   	NVARCHAR(200),
	@usua_UsuarioCreacion       			INT,
	@peju_FechaCreacion         			DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbPersonaJuridica 
					(pers_Id,							  	
					peju_EstadoRepresentante,				
					colo_Id,							  	
					peju_PuntoReferencia,					
					peju_ColoniaRepresentante,				
					peju_NumeroLocalReprentante,		  	
					peju_PuntoReferenciaReprentante,	  	
					peju_TelefonoEmpresa,					
					peju_TelefonoFijoRepresentanteLegal, 	
					peju_TelefonoRepresentanteLegal,	  	
					peju_CorreoElectronico,              	
					peju_CorreoElectronicoAlternativo,   	
					usua_UsuarioCreacion,       			
					peju_FechaCreacion)
			VALUES (@pers_Id,							  	
					@peju_EstadoRepresentante,				
					@colo_Id,							  	
					@peju_PuntoReferencia,					
					@peju_ColoniaRepresentante,				
					@peju_NumeroLocalReprentante,		  	
					@peju_PuntoReferenciaReprentante,	  	
					@peju_TelefonoEmpresa,					
					@peju_TelefonoFijoRepresentanteLegal, 	
					@peju_TelefonoRepresentanteLegal,	  	
					@peju_CorreoElectronico,                 	
					@peju_CorreoElectronicoAlternativo,   	
					@usua_UsuarioCreacion,       			
					@peju_FechaCreacion)

		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbPersonaJuridica_Editar
(
	@peju_Id								INT,
	@pers_Id							  	INT,
	@peju_EstadoRepresentante				INT,
	@colo_Id							  	INT,
	@peju_PuntoReferencia					NVARCHAR(200),
	@peju_ColoniaRepresentante				INT,
	@peju_NumeroLocalRepresentante		  	NVARCHAR(200),
	@peju_PuntoReferenciaReprentante	  	NVARCHAR(200),
	@peju_TelefonoEmpresa					NVARCHAR(200),
	@peju_TelefonoFijoRepresentanteLegal 	NVARCHAR(200),
	@peju_TelefonoRepresentanteLegal	  	NVARCHAR(200),
	@peju_CorreoElectronico              	NVARCHAR(200),
	@peju_CorreoElectronicoAlternativo   	NVARCHAR(200),
	@usua_UsuarioModificacion       		INT,
	@peju_FechaModificacion         		DATETIME
)
AS
BEGIN
	BEGIN TRY
		 UPDATE Adua.tbPersonaJuridica
			SET pers_Id = @pers_Id,							  	
				peju_EstadoRepresentante = @peju_EstadoRepresentante,				
				colo_Id = @colo_Id,							  	
				peju_PuntoReferencia = @peju_PuntoReferencia,					
				peju_ColoniaRepresentante = @peju_ColoniaRepresentante,				
				peju_NumeroLocalRepresentante = @peju_NumeroLocalRepresentante,		  	
				peju_PuntoReferenciaRepresentante = @peju_PuntoReferenciaRepresentante,	  	
				peju_TelefonoEmpresa = @peju_TelefonoRepresentanteLegal,					
				peju_TelefonoFijoRepresentanteLegal = @peju_TelefonoFijoRepresentanteLegal, 	
				peju_TelefonoRepresentanteLegal = @peju_TelefonoRepresentanteLegal,	  	
				peju_CorreoElectronico = @peju_CorreoElectronico,              	
				peju_CorreoElectronicoAlternativo = @peju_CorreoElectronicoAlternativo,   	
				usua_UsuarioModificacion = @usua_UsuarioModificacion,       			
				peju_FechaModificacion =  @peju_FechaModificacion
		  WHERE peju_Id = @peju_Id

		  SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO
--------------------------------------------/UDPS Para contrato de adhesión-------------------------------------------