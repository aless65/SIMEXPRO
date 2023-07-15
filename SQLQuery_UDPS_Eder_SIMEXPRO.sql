USE SIMEXPRO
GO

----------------------------------------------UDPS tbEstadoMercancias----------------------------------------------

CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoMercancias_Insertar
(
	@merc_Descripcion		NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@merc_FechaCreacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbEstadoMercancias (merc_Descripcion, usua_UsuarioCreacion, merc_FechaCreacion)
		VALUES (@merc_Descripcion, @usua_UsuarioCreacion, @merc_FechaCreacion)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0	
	END CATCH
END
GO

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

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0	
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoMercancias_Eliminar
(
	@merc_Id					INT,
	@usua_UsuarioModificacion	INT,
	@merc_FechaModificacion		DATETIME
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
						usua_UsuarioModificacion = @usua_UsuarioModificacion,
						merc_FechaModificacion = @merc_FechaModificacion
				  WHERE merc_Id = @merc_Id 
					AND merc_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 0	
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoMercancias_BuscarPorId
(
	@merc_Id	INT
)
AS
BEGIN
	SELECT merc_Id,
		   merc_Descripcion,
		   usua_UsuarioCreacion,
		   usua_UsuarioModificacion,
		   merc_FechaModificacion
	  FROM Adua.tbEstadoMercancias
	 WHERE merc_Id = @merc_Id
	   AND merc_Estado = 1
END
GO

---------------------------------------------/UDPS tbEstadoMercancias----------------------------------------------

------------------------------------------------UDPS tbUnidadMedidas-----------------------------------------------

CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Insertar
(
	@unme_Descripcion		NVARCHAR(500),
	@usua_UsuarioCreacion	INT,
	@unme_FechaCreacion		DATETIME
)
AS
BEGIN 
	BEGIN TRY
		INSERT INTO Gral.tbUnidadMedidas (unme_Descripcion, usua_UsuarioCreacion, unme_FechaCreacion)
		VALUES (@unme_Descripcion, @usua_UsuarioCreacion, @unme_FechaCreacion)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

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
			
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Eliminar
(
	@unme_Id					INT,
	@usua_UsuarioModificacion	INT,
	@unme_FechaModificacion		DATETIME
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
					   usua_UsuarioModificacion = @usua_UsuarioModificacion,
					   unme_FechaModificacion = @unme_FechaModificacion
				 WHERE unme_Id = @unme_Id
				   AND unme_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_BuscarPorId
(
	@unme_Id INT
)
AS
BEGIN 
	SELECT unme_Id,
		   unme_Descripcion,
		   usua_UsuarioCreacion,
		   unme_FechaCreacion,
		   usua_UsuarioModificacion,
		   unme_FechaModificacion,
		   unme_Estado
	 WHERE unme_Id = @unme_Id
	   AND unme_Estado = 1
END
GO

-----------------------------------------------/UDPS tbUnidadMedidas------------------------------------------------

-------------------------------------------------UDPS tbCondiciones-------------------------------------------------

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

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

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

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

------------------------------------------------/UDPS tbCondiciones-------------------------------------------------

------------------------------------------------UDPS tbFormas_Envio-------------------------------------------------

CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_Listado
AS
BEGIN
	SELECT foen_Id, 
		   foen_Descripcion, 
		   usua_UsuarioCreacion, 
		   foen_FechaCreacion, 
		   usua_UsuarioModificacion, 
		   foen_FechaModificacion
	  FROM Gral.tbFormas_Envio
	 WHERE foen_Estado = 1
END
GO


CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_Insertar
(
	@foen_Descripcion		NVARCHAR(500),
	@usua_UsuarioCreacion	INT,
	@foen_FechaCreacion		DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Gral.tbFormas_Envio (foen_Descripcion, usua_UsuarioCreacion, foen_FechaCreacion)
		VALUES (@foen_Descripcion, @usua_UsuarioCreacion, @foen_FechaCreacion)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

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

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


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
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_BuscarPorId
(
	@foen_Id	INT
)
AS
BEGIN
	SELECT foen_Id,
		   foen_Descripcion,
		   usua_UsuarioCreacion,
		   foen_FechaCreacion
	  FROM Gral.tbFormas_Envio
END
GO
-----------------------------------------------/UDPS tbFormas_Envio-------------------------------------------------

-------------------------------------------------UDPS tbEmpleados---------------------------------------------------



------------------------------------------------/UDPS tbEmpleados---------------------------------------------------

---------------------------------------------UDPS tbFuncionesMaquina------------------------------------------------



--------------------------------------------/UDPS tbFuncionesMaquina------------------------------------------------

---------------------------------------------UDPS tbFuncionesMaquina------------------------------------------------



-------------------------------------------------UDPS tbCategoria---------------------------------------------------



------------------------------------------------/UDPS tbCategoria---------------------------------------------------
