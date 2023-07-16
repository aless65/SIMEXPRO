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

--CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoMercancias_BuscarPorId
--(
--	@merc_Id	INT
--)
--AS
--BEGIN
--	SELECT merc_Id,
--		   merc_Descripcion,
--		   usua_UsuarioCreacion,
--		   usua_UsuarioModificacion,
--		   merc_FechaModificacion
--	  FROM Adua.tbEstadoMercancias
--	 WHERE merc_Id = @merc_Id
--	   AND merc_Estado = 1
--END
--GO

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

--CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_BuscarPorId
--(
--	@foen_Id	INT
--)
--AS
--BEGIN
--	SELECT foen_Id,
--		   foen_Descripcion,
--		   usua_UsuarioCreacion,
--		   foen_FechaCreacion
--	  FROM Gral.tbFormas_Envio
--END
--GO
-----------------------------------------------/UDPS tbFormas_Envio-------------------------------------------------

-------------------------------------------------UDPS tbEmpleados---------------------------------------------------

/*Vista empleados*/
CREATE OR ALTER VIEW gral.VW_tbEmpleados
AS
SELECT empl.empl_Id AS empleadoId, 
	   empl_Nombres AS empleadoNombres, 
	   empl_Apellidos AS empleadoApellidos,
	   empl_DNI AS empleadoDNI,
	   empl.escv_Id AS estadoCivilId,
	   escv.escv_Nombre AS estadoCivilNombre,
	   CASE WHEN [empl_Sexo] = 'F' THEN 'Femenino'
			ELSE 'Masculino'
		END AS empleadoSexo,
	   empl_FechaNacimiento AS empleadoNacimiento,
	   empl_Telefono AS empleadoTelefono,
	   empl_DireccionExacta AS empleadoDireccion,
	   empl.pvin_Id AS provinciaId,
	   pvin.pvin_Nombre AS provinciaNombre,
	   pais.pais_Codigo AS paisCodigo,
	   pais.pais_Nombre AS paisNombre,
	   empl_CorreoElectronico AS empleadoCorreo,
	   empl.carg_Id AS cargoId,
	   carg.carg_Nombre AS cargoNombre,
	   empl_EsAduana AS empleadoAduana,
	   empl.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   empl_FechaCreacion AS fechaCreacion, 
	   empl.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   empl_FechaModificacion AS fechaModificacion, 
	   empl.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   empl_FechaEliminacion AS fechaEliminacion, 
	   empl_Estado AS empleadoEstado
FROM [Gral].[tbEmpleados] empl INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON empl.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON empl.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON empl.usua_UsuarioEliminacion = usuaCrea.usua_Id INNER JOIN [Gral].[tbEstadosCiviles] escv
ON empl.escv_Id = escv.escv_Id INNER JOIN [Gral].[tbProvincias] pvin
ON empl.pvin_Id = pvin.pvin_Id INNER JOIN [Gral].[tbPaises] pais
ON pvin.pais_Codigo = pais.pais_Codigo INNER JOIN [Gral].[tbCargos] carg
ON empl.carg_Id = carg.carg_Id
GO


/*Listar empleados*/
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbEmpleados_Listar
AS
BEGIN
	SELECT *
    FROM gral.VW_tbEmpleados
	WHERE empleadoEstado = 1
END
GO

/*Insertar empleados*/
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

		IF EXISTS (SELECT * FROM [Gral].[tbEmpleados]
						WHERE [empl_DNI] = @empl_DNI
						AND [empl_Estado] = 0)
		BEGIN
			UPDATE [Gral].[tbEmpleados]
			SET	   [empl_Estado] = 1,
				   empl_Nombres = @empl_Nombres, 
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
				   empl_EsAduana = @empl_EsAduana
			WHERE  [empl_DNI] = @empl_DNI

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO  [Gral].[tbEmpleados](empl_Nombres, 
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
			VALUES(@empl_Nombres,
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


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar empleados*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_Editar
	@empl_Id					INT,
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
	@usua_UsuarioModificacion	INT,
	@empl_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Gral].[tbEmpleados]
		SET		empl_Nombres = @empl_Nombres, 
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
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[empl_FechaModificacion] = @empl_FechaModificacion
		WHERE	[empl_Id] = @empl_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar empleados*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_Eliminar 
	@empl_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@empl_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'empl_Id', @empl_Id, 'gral.tbEmpleados', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	[Gral].[tbEmpleados]
					SET		[empl_Estado] = 0,
							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
							[empl_FechaEliminacion] = @empl_FechaEliminacion
					WHERE	[empl_Id] = @empl_Id
				END
		END

	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

------------------------------------------------/UDPS tbEmpleados---------------------------------------------------

---------------------------------------------UDPS tbFuncionesMaquina------------------------------------------------
/*Vista funciones maquina*/
CREATE OR ALTER VIEW prod.VW_tbFuncionesMaquina
AS
SELECT func_Id AS funcionId, 
	   func_Nombre AS funcionNombre, 
	   func.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   func_FechaCreacion AS fechaCreacion, 
	   func.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   func_FechaModificacion AS fechaModificacion,
	   func.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   func_FechaEliminacion AS fechaEliminacion, 
	   func_Estado AS funcionEstado
FROM [Prod].[tbFuncionesMaquina] func INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON func.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON func.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON func.usua_UsuarioEliminacion = usuaCrea.usua_Id 
GO


/*Listar funciones maquina*/
CREATE OR ALTER PROCEDURE prod.UDP_VW_tbFuncionesMaquina_Listar
AS
BEGIN
	SELECT *
    FROM prod.VW_tbFuncionesMaquina
	WHERE funcionEstado = 1
END
GO

/*Insertar funciones maquina*/
CREATE OR ALTER PROCEDURE gral.UDP_tbFuncionesMaquina_Insertar
	@func_Nombre			NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@func_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF EXISTS (SELECT * FROM [Prod].[tbFuncionesMaquina]
						WHERE @func_Nombre = [func_Nombre]
						AND [func_Estado] = 0)
		BEGIN
			UPDATE [Prod].[tbFuncionesMaquina]
			SET	   [func_Estado] = 1
			WHERE  [func_Nombre] = @func_Nombre

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Prod].[tbFuncionesMaquina] (func_Nombre, 
													     usua_UsuarioCreacion, 
													     func_FechaCreacion)
			VALUES(@func_Nombre,	
				   @usua_UsuarioCreacion,
				   @func_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar funciones maquina*/
CREATE OR ALTER PROCEDURE gral.UDP_tbFuncionesMaquina_Editar
	@func_Id					INT,
	@func_Nombre				NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@func_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Prod].[tbFuncionesMaquina]
		SET		[func_Nombre] = @func_Nombre,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[func_FechaModificacion] = @func_FechaModificacion
		WHERE	[func_Id] = @func_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar funciones maquina*/
CREATE OR ALTER PROCEDURE gral.UDP_tbFuncionesMaquina_Eliminar 
	@func_Id					INT
AS
BEGIN
	BEGIN TRY
		
		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'func_Id', @func_Id, 'prod.tbFuncionesMaquina', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	[Prod].[tbFuncionesMaquina]
					SET		[func_Estado] = 0
					WHERE	[func_Id] = @func_Id

				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


--------------------------------------------/UDPS tbFuncionesMaquina------------------------------------------------


-------------------------------------------------UDPS tbCategoria---------------------------------------------------

/*Vista categoria*/
CREATE OR ALTER VIEW prod.VW_tbCategoria
AS
SELECT cate_Id AS categoriaId, 
	   cate_Descripcion AS categoriaDescripcion, 
	   cate.usua_UsuarioCreacion AS usuarioCreacion, 
	   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
	   cate_FechaCreacion AS fechaCreacion, 
	   cate.usua_UsuarioModificacion AS usuarioModificacion, 
	   usuaModifica.usua_Nombre AS usuarioModificacionNombre,
	   cate_FechaModificacion AS fechaModificacion,
	   cate.usua_UsuarioEliminacion AS usuarioEliminacion, 
	   usuaElimina.usua_Nombre AS usuarioEliminacionNombre,
	   cate_FechaEliminacion AS fechaEliminacion, 
	   cate_Estado AS categoriaEstado
FROM [Prod].[tbCategoria] cate INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON cate.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON cate.usua_UsuarioModificacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaElimina
ON cate.usua_UsuarioEliminacion = usuaCrea.usua_Id 
GO


/*Listar categoria*/
CREATE OR ALTER PROCEDURE prod.UDP_VW_tbCategoria_Listar
AS
BEGIN
	SELECT *
    FROM prod.VW_tbCategoria
	WHERE categoriaEstado = 1
END
GO

/*Insertar categoria*/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Insertar
	@cate_Descripcion		NVARCHAR(150),
	@usua_UsuarioCreacion	INT,
	@cate_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF EXISTS (SELECT * FROM [Prod].[tbCategoria]
						WHERE [cate_Descripcion] = @cate_Descripcion
						AND [cate_Estado] = 0)
		BEGIN
			UPDATE [Prod].[tbCategoria]
			SET	   [cate_Estado] = 1
			WHERE  [cate_Descripcion] = @cate_Descripcion

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Prod].[tbCategoria] (cate_Descripcion, 
											      usua_UsuarioCreacion, 
											      cate_FechaCreacion)
			VALUES(@cate_Descripcion,	
				   @usua_UsuarioCreacion,
				   @cate_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar categoria*/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Editar
	@cate_Id					INT,
	@cate_Descripcion			NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@cate_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Prod].[tbCategoria]
		SET		[cate_Descripcion] = @cate_Descripcion,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[cate_FechaModificacion] = @cate_FechaModificacion
		WHERE	[cate_Id] = @cate_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Eliminar categoria*/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Eliminar 
	@cate_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@cate_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'cate_Id', @cate_Id, 'prod.tbCategoria', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	[Prod].[tbCategoria]
					SET		[cate_Estado] = 0,
							[usua_UsuarioEliminacion] = @usua_UsuarioEliminacion,
							[cate_FechaEliminacion] = @cate_FechaEliminacion
					WHERE	[cate_Id] = @cate_Id
				END
		END

	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


------------------------------------------------/UDPS tbCategoria---------------------------------------------------
