--Modulos
--Maquinas
--Marcas Maquinas
--Modelos Maquinas

----------------------------------------------------------------//  Modulos de Producci�n Procedimientos Inicio \\-------------------------------------------------------------------------------------------
--************************************************************************   Tabla Modulos inicio   ***********************************************************************************************

GO

--Listar Modulos
CREATE OR ALTER VIEW  Prod.VW_tbModulos
AS
SELECT	modu.modu_Id,
		modu.modu_Nombre,
		proe.proc_Id,
		proe.proc_Descripcion,
		modu.empr_Id,
		empe.empl_Nombres + ' ' + empe.empl_Apellidos as empleado_Nombre
FROM	Prod.tbModulos modu			INNER JOIN Prod.tbProcesos proe
ON		modu.proc_Id = proe.proc_Id INNER JOIN Gral.tbEmpleados empe
ON		modu.empr_Id = empe.empl_Id 
WHERE   empe.empl_EsAduana = 0 AND modu_Estado = 1

GO

--Ejecutar procedimiento de listar modulos
CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Listar
AS
BEGIN
	SELECT * 
	FROM	Prod.VW_tbModulos
END

GO

--Insertar Modulos
CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Insertar
	@modu_Nombre			NVARCHAR(200),
	@proc_Id				INT,
	@empr_Id				INT,
	@usua_UsuarioCreacion	INT,
	@modu_FechaCreacion		DATETIME
AS
BEGIN
	SET @modu_FechaCreacion = GETDATE();
	BEGIN TRY
		IF EXISTS(SELECT modu_Id FROM Prod.tbModulos WHERE modu_Nombre = @modu_Nombre AND proc_Id = @proc_Id AND empr_Id = @empr_Id AND modu_Estado = 0)
			BEGIN
				UPDATE Prod.tbModulos
				SET	   modu_Estado = 1
				WHERE  modu_Nombre = @modu_Nombre AND proc_Id = @proc_Id AND empr_Id = @empr_Id
				SELECT 1
			END
		ELSE
			BEGIN 
				INSERT INTO Prod.tbModulos ([modu_Nombre], [proc_Id], [empr_Id], [usua_UsuarioCreacion], [modu_FechaCreacion], [usua_UsuarioModificacion], [modu_FechaModificacion], [modu_Estado])
				VALUES (@modu_Nombre,@proc_Id,@empr_Id,@usua_UsuarioCreacion,@modu_FechaCreacion,NULL,NULL,1);
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END 

GO

--Editar Modulos
CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Editar
	@modu_Id					INT,
	@modu_Nombre				NVARCHAR(200),
	@proc_Id					INT,
	@empr_Id					INT,
	@usua_UsuarioModificacion	INT,
	@modu_FechaModificacion		DATETIME
AS
BEGIN
	SET @modu_FechaModificacion = GETDATE();
	BEGIN TRY
		UPDATE [Prod].[tbModulos]
		   SET [modu_Nombre] = @modu_Nombre
			  ,[proc_Id] = @proc_Id
			  ,[empr_Id] = @empr_Id
			  ,[usua_UsuarioModificacion] = @usua_UsuarioModificacion
			  ,[modu_FechaModificacion] = @modu_FechaModificacion
		 WHERE modu_Id = @modu_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Eliminar Modulos
CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Eliminar
	@modu_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@modu_FechaEliminacion		DATETIME
AS
BEGIN
	SET @modu_FechaEliminacion = GETDATE();
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'modu_Id', @modu_Id, 'Prod.tbModulos', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Prod.tbModulos
				SET		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						modu_FechaEliminacion = @modu_FechaEliminacion,
						modu_Estado = 0
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

--************************************************************************   Tabla Modulos fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Maquinas inicio   ***********************************************************************************************

--Listar Maquinas
CREATE OR ALTER VIEW Prod.VW_tbMaquinas
AS
SELECT	maqu_Id,
		maqu_NumeroSerie,
		mode.mode_Id,
		mode.mode_Descripcion
FROM	Prod.tbMaquinas maqu		INNER JOIN Prod.tbModelos mode
ON		maqu.mode_Id = mode.mode_Id	
WHERE	maqu.maqu_Estado = 1

GO

--Ejecutar procedimiento de listar Maquinas
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinas_Listar
AS
BEGIN
	SELECT 	* 
	FROM	Prod.VW_tbMaquinas
END

GO

--Insertar Maquinas
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinas_Insertar
	@maqu_NumeroSerie		NVARCHAR(100),
	@mode_Id				INT,
	@usua_UsuarioCreacion	INT,
	@maqu_FechaCreacion		DATETIME
AS
BEGIN
	SET @maqu_FechaCreacion = GETDATE();
	BEGIN TRY
		IF EXISTS(SELECT modu_Id FROM Prod.tbMaquinas WHERE maqu_NumeroSerie = @maqu_NumeroSerie AND mode_Id = @mode_Id AND maqu_Estado = 0)
			BEGIN 
				UPDATE Prod.tbMaquinas
				SET	   maqu_Estado = 1
				WHERE  @maqu_NumeroSerie = @maqu_NumeroSerie AND mode_Id = @mode_Id
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Prod.tbMaquinas ([maqu_NumeroSerie], [mode_Id], [usua_UsuarioCreacion], [maqu_FechaCreacion], [usua_UsuarioModificacion], [maqu_FechaModificacion], [maqu_Estado])
				VALUES (@maqu_NumeroSerie,@mode_Id,@usua_UsuarioCreacion,@maqu_FechaCreacion,NULL,NULL,1);
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Editar Maquinas
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinas_Editar
	@maqu_Id				INT,
	@maqu_NumeroSerie		NVARCHAR(100),
	@mode_Id				INT,
	@usua_UsuarioCreacion	INT,
	@maqu_FechaCreacion		DATETIME
AS
BEGIN
	SET @maqu_FechaCreacion = GETDATE()
	BEGIN TRY
		UPDATE [Prod].[tbMaquinas]
		   SET [maqu_NumeroSerie] = @maqu_NumeroSerie
			  ,[mode_Id] = @mode_Id
			  ,[usua_UsuarioCreacion] = @usua_UsuarioCreacion
			  ,[maqu_FechaCreacion] = @maqu_FechaCreacion
		 WHERE maqu_Id = @maqu_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Eliminar Maquinas
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinas_Eliminar
	@maqu_Id						INT,
	@usua_UsuarioEliminacion		INT,
	@maqu_FechaEliminacion			DATETIME
AS
BEGIN
	SET @maqu_FechaEliminacion = GETDATE()
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'maqu_Id', @maqu_Id, 'Prod.tbMaquinas', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
		IF(@respuesta) = 1
			BEGIN
				UPDATE	Prod.tbMaquinas
				SET		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						maqu_FechaEliminacion   = @maqu_FechaEliminacion,
						maqu_Estado	= 0
				WHERE	maqu_Id = @maqu_Id
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

--************************************************************************   Tabla Maquinas fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Marcas maquinas inicio   ***********************************************************************************************

--Listar Marcas Maquina
CREATE OR ALTER VIEW Prod.VW_tbMarcasMaquina
AS
SELECT  mrqu.marq_Id,
		mrqu.marq_Nombre
FROM    Prod.tbMarcasMaquinas mrqu
WHERE	mrqu.[marq_Estado] = 1

GO

--Ejecutar procedimiento de listar MarcasMaquina
CREATE OR ALTER PROCEDURE Prod.UDP_tbMarcasMaquinas_Listar
AS
BEGIN
	SELECT 	* 
	FROM	Prod.VW_tbMarcasMaquina
END

GO

--Insertar Marcas Maquina
CREATE OR ALTER PROCEDURE Prod.UDP_tbMarcasMaquina_Insertar
	@marq_Nombre			NVARCHAR(250),
	@usua_UsuarioCreacion	INT,
	@marq_FechaCreacion		DATETIME
AS
BEGIN
	SET @marq_FechaCreacion = GETDATE();
	BEGIN TRY
		IF EXISTS(SELECT marq_Id FROM Prod.tbMarcasMaquina WHERE marq_Nombre = @marq_Nombre AND marq_Estado = 0)
			BEGIN
				UPDATE	Prod.tbMarcasMaquina
				SET		marq_Estado = 1
				WHERE   marq_Nombre = @marq_Nombre
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Prod.tbMarcasMaquina ([marq_Nombre], [usua_UsuarioCreacion], [marq_FechaCreacion], [usua_UsuarioModificacion], [marq_FechaModificacion], [marq_Estado])
				VALUES(@marq_Nombre,@usua_UsuarioCreacion,@marq_FechaCreacion,NULL,NULL,1)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Editar Marcas Maquina
CREATE OR ALTER PROCEDURE Prod.UDP_tbMarcasMaquina_Editar
	@marq_Id					INT,
	@marq_Nombre				NVARCHAR(250),
	@usua_UsuarioModificacion	INT,
	@marq_FechaModificacion		DATETIME
AS
BEGIN
	SET @marq_FechaModificacion = GETDATE();
	BEGIN TRY
		UPDATE	Prod.tbMarcasMaquina
		SET		marq_Nombre = @marq_Nombre,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				marq_FechaModificacion = @marq_FechaModificacion
		WHERE	marq_Id  = @marq_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Eliminar Marcas Maquina
CREATE OR ALTER PROCEDURE Prod.UDP_tbMarcasMaquina_Eliminar
	@marq_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@marq_FechaEliminacion		DATETIME
AS
BEGIN
	SET @marq_FechaEliminacion = GETDATE();
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'marq_Id', @marq_Id, 'Prod.tbMarcasMaquina', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE	Prod.tbMarcasMaquina
					SET		marq_Estado = 0,
							usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
							marq_FechaEliminacion = @marq_FechaEliminacion
					WHERE	marq_Id = @marq_Id
				END
	END TRY
	BEGIN CATCH
		SELECT 0	
	END CATCH
END

--************************************************************************   Tabla Marcas maquinas fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Modelos maquinas inicio   ***********************************************************************************************

--Listar Modelos Maquinas
CREATE OR ALTER VIEW Prod.VW_tbModelosMaquina
AS
SELECT	moma.mmaq_Id,
		moma.mmaq_Nombre,
		mrqu.marq_Id,
		mrqu.marq_Nombre,
		fuma.func_Id,
		fuma.func_Nombre,
		moma.momq_Imagen
FROM	Prod.tbModelosMaquina moma  INNER JOIN Prod.tbFuncionesMaquina fuma 
ON		moma.func_Id = fuma.func_Id INNER JOIN Prod.tbMarcasMaquina	   mrqu
ON		moma.marq_Id = mrqu.marq_Id

GO

--Ejecutar procedimiento de listar ModelosMaquina
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelosMaquina_Listar
AS
BEGIN
	SELECT 	* 
	FROM	Prod.VW_tbModelosMaquina
END

GO

--Insertar Modelos Maquinas
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelosMaquina_Insertar
	@mmaq_Nombre				NVARCHAR(250),
	@marq_Id					INT,
	@func_Id					INT,
	@momq_Imagen				NVARCHAR(MAX),
	@usua_UsuarioCreacion		INT,
	@mmaq_FechaCreacion			DATETIME
AS
BEGIN
	SET @mmaq_FechaCreacion = GETDATE();
	BEGIN TRY
		IF EXISTS(SELECT mmaq_Id FROM Prod.tbModelosMaquina WHERE mmaq_Nombre = @mmaq_Nombre AND marq_Id = @marq_Id AND func_Id = @func_Id AND momq_Imagen = @momq_Imagen AND mmaq_Estado = 0)
			BEGIN
				UPDATE Prod.tbModelosMaquina
				SET mmaq_Estado = 1
				WHERE mmaq_Nombre = @mmaq_Nombre AND marq_Id = @marq_Id AND func_Id = @func_Id AND momq_Imagen = @momq_Imagen

				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Prod.tbModelosMaquina ([mmaq_Nombre], [marq_Id], [func_Id], [momq_Imagen], [usua_UsuarioCreacion], [mmaq_FechaCreacion], [usua_UsuarioModificacion], [mmaq_FechaModificacion], [mmaq_Estado])
				VALUES	(@mmaq_Nombre,@marq_Id,@func_Id,@momq_Imagen,@usua_UsuarioCreacion,@mmaq_FechaCreacion,NULL,NULL,1)

				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Editar Modelos Maquinas
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelosMaquina_Editar
	@mmaq_Id					INT,
	@mmaq_Nombre				NVARCHAR(250),
	@marq_Id					INT,
	@func_Id					INT,
	@momq_Imagen				NVARCHAR(MAX),
	@usua_UsuarioModificacion	INT,
	@mmaq_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbModelosMaquina
		   SET [mmaq_Nombre] = @mmaq_Nombre
			  ,[marq_Id] = @marq_Id
			  ,[func_Id] = @func_Id
			  ,[momq_Imagen] = @momq_Imagen
			  ,[usua_UsuarioModificacion] = @usua_UsuarioModificacion
			  ,[mmaq_FechaModificacion] = @mmaq_FechaModificacion
			  ,[mmaq_Estado] = 1
		 WHERE mmaq_Id = @mmaq_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Eliminar Modelos Maquinas
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelosMaquina_Eliminar
	@mmaq_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@mmaq_FechaEliminacion	DATETIME
AS
BEGIN
	SET @mmaq_FechaEliminacion = GETDATE();
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'mmaq_Id', @mmaq_Id, 'Prod.tbModelosMaquina', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
		IF(@respuesta = 1)
			BEGIN
				UPDATE	Prod.tbModelosMaquina
				SET		mmaq_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						mmaq_FechaEliminacion = @mmaq_FechaEliminacion
				WHERE	mmaq_Id = @mmaq_Id
			END
	END TRY
	BEGIN CATCH
		SELECT 0	
	END CATCH
END

GO
--************************************************************************   Tabla Modelos maquinas fin   ***********************************************************************************************
----------------------------------------------------------------------//  Modulos de Producci�n Procedimientos final \\-------------------------------------------------------------------------------------------
GO
---------------------------------------------------------------------//  Modulos de Aduanas Procedimientos Inicio \\-------------------------------------------------------------------------------------------
--************************************************************************   Tabla Aranceles inicio   ***********************************************************************************************

--Listar Aranceles
CREATE OR ALTER VIEW Adua.VW_tbArenceles
AS
SELECT	aran_Id,
		aran_Codigo,
		aran_Descripcion
FROM	Adua.tbAranceles
WHERE	aram_Estado = 1

GO

--Ejecutar procedimiento de listar Aranceles
CREATE OR ALTER PROCEDURE Adua.UDP_tbAranceles_Listar
AS
BEGIN
	SELECT 	* 
	FROM	Prod.VW_tbArenceles
END

GO

--Insertar Aranceles
CREATE OR ALTER PROCEDURE Adua.UDP_tbAranceles_Insertar 
	@aran_Codigo				NVARCHAR(100),
	@aran_Descripcion			NVARCHAR(150),
	@usua_UsuarioCreacion		INT,
	@aran_FechaCreacion			DATETIME
AS
BEGIN
	SET @aran_FechaCreacion = GETDATE();
	BEGIN TRY
		IF EXISTS(SELECT aran_Id FROM Adua.tbAranceles WHERE aran_Codigo = @aran_Codigo AND aran_Descripcion = @aran_Descripcion AND aram_Estado = 0)
			BEGIN
				UPDATE Adua.tbAranceles
				SET aram_Estado = 1
				WHERE aran_Codigo = @aran_Codigo AND aran_Descripcion = @aran_Descripcion

				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Adua.tbAranceles ([aran_Codigo], [aran_Descripcion], [usua_UsuarioCreacion], [aran_FechaCreacion], [usua_UsuarioModificacion], [aran_FechaModificacion], [aram_Estado])
				VALUES	(@aran_Codigo,@aran_Descripcion,@usua_UsuarioCreacion,@aran_FechaCreacion,NULL,NULL,1)

				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO



--Editar Aranceles
CREATE OR ALTER PROCEDURE Adua.UDP_tbAranceles_Editar 
	@aran_Id					INT,
	@aran_Codigo				NVARCHAR(100),
	@aran_Descripcion			NVARCHAR(150),
	@usua_UsuarioModificacion	INT,
	@aran_FechaModificacion		DATETIME
AS
BEGIN
	SET @aran_FechaModificacion = GETDATE();
	BEGIN TRY
		UPDATE [Adua].[tbAranceles]
		   SET [aran_Codigo] = @aran_Codigo
			  ,[aran_Descripcion] = @aran_Descripcion
			  ,[usua_UsuarioModificacion] = @usua_UsuarioModificacion
			  ,[aran_FechaModificacion] = @aran_FechaModificacion
		 WHERE aran_Id = @aran_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

go
--Eliminar Aranceles
CREATE OR ALTER PROCEDURE Adua.UDP_tbAranceles_Eliminar 
	@aran_Id					INT
	@usua_UsuarioEliminacion	INT,
	@aran_FechaEliminacion		DATETIME
AS
BEGIN
	SET @aran_FechaEliminacion = GETDATE();
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'aran_Id', @aran_Id, 'Adua.tbAranceles', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
		IF(@respuesta = 1)
		BEGIN
			UPDATE	Adua.tbAranceles
			SET		aram_Estado = 0
					usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
					aran_FechaEliminacion = @aran_FechaEliminacion
			WHERE	aran_Id = @aran_Id
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

--************************************************************************   Tabla Aranceles FIN   ***********************************************************************************************
GO
--************************************************************************   Tabla Declaratntes inicio   ***********************************************************************************************

--Listar Declarantes
CREATE OR ALTER VIEW Adua.VW_tbDeclarantes
AS
SELECT	decl.decl_Id, 
		decl.decl_Nombre_Raso, 
		decl.decl_Direccion_Exacta, 
		decl.pvin_Id,
		prvi.pvin_Codigo,
		prvi.pvin_Nombre,
		pais.pais_Codigo,
		pais.pais_Nombre,
		decl.decl_Correo_Electronico, 
		decl.decl_Telefono, 
		decl.decl_Fax 
FROM    Adua.tbDeclarantes decl INNER JOIN Gral.tbProvincias prvi
ON		decl.pvin_Id = prvi.pvin_Id INNER JOIN Gral.tbPaises  pais
ON		prvi.pais_Codigo = pais.pais_Codigo

GO

--Ejecutar procedimiento de listar Declarantes
CREATE OR ALTER PROCEDURE Adua.UDP_tbDeclarantes_Listar
AS
BEGIN
	SELECT 	* 
	FROM	Adua.VW_tbDeclarantes
END

GO


--Insertar Declarantes
CREATE OR ALTER PROCEDURE Adua.UDP_tbDeclarantes_Insertar
	@decl_Nombre_Raso			NVARCHAR(250), 
	@decl_Direccion_Exacta		NVARCHAR(250), 
	@pvin_Id					INT, 
	@decl_Correo_Electronico	NVARCHAR(150), 
	@decl_Telefono				NVARCHAR(50), 
	@decl_Fax					NVARCHAR(50), 
	@usua_UsuarioCreacion		INT,
	@decl_FechaCreacion			DATETIME
AS
BEGIN
	SET @decl_FechaCreacion = GETDATE();
	BEGIN TRY
		IF EXISTS(SELECT decl_Id FROM Adua.tbDeclarantes WHERE decl_Nombre_Raso = @decl_Nombre_Raso AND decl_Direccion_Exacta = @decl_Direccion_Exacta AND pvin_Id = @pvin_Id AND decl_Correo_Electronico = @decl_Correo_Electronico AND decl_Telefono = @decl_Telefono AND decl_Fax = @decl_Fax  AND decl_Estado = 0)
			BEGIN
				UPDATE	Adua.tbDeclarantes
				SET		decl_Estado = 1
				WHERE decl_Nombre_Raso = @decl_Nombre_Raso AND decl_Direccion_Exacta = @decl_Direccion_Exacta AND pvin_Id = @pvin_Id AND decl_Correo_Electronico = @decl_Correo_Electronico AND decl_Telefono = @decl_Telefono AND decl_Fax = @decl_Fax 
				
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Adua.tbDeclarantes ([decl_Nombre_Raso], [decl_Direccion_Exacta], [pvin_Id], [decl_Correo_Electronico], [decl_Telefono], [decl_Fax], [usua_UsuarioCreacion], [decl_FechaCreacion], [usua_UsuarioModificacion], [decl_FechaModificacion], [decl_Estado])
				VALUES (@decl_Nombre_Raso,@decl_Direccion_Exacta,@pvin_Id,@decl_Correo_Electronico,@decl_Telefono,@decl_Fax,@usua_UsuarioCreacion,@decl_FechaCreacion,NULL,NULL,1);
				
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Editar Declarantes
CREATE OR ALTER PROCEDURE Adua.UDP_tbDeclarantes_Editar
	@decl_Id					INT,
	@decl_Nombre_Raso			NVARCHAR(250), 
	@decl_Direccion_Exacta		NVARCHAR(250), 
	@pvin_Id					INT, 
	@decl_Correo_Electronico	NVARCHAR(150), 
	@decl_Telefono				NVARCHAR(50), 
	@decl_Fax					NVARCHAR(50), 
	@usua_UsuarioModificacion	INT,
	@decl_FechaModificacion		DATETIME
AS
BEGIN
	SET @decl_FechaModificacion = GETDATE();
	BEGIN TRY
		UPDATE [Adua].[tbDeclarantes]
		   SET [decl_Nombre_Raso] = @decl_Nombre_Raso
			  ,[decl_Direccion_Exacta] = @decl_Direccion_Exacta
			  ,[pvin_Id] = @pvin_Id
			  ,[decl_Correo_Electronico] = @decl_Correo_Electronico
			  ,[decl_Telefono] = @decl_Telefono
			  ,[decl_Fax] = @decl_Fax
			  ,[usua_UsuarioModificacion] = @usua_UsuarioModificacion
			  ,[decl_FechaModificacion] = @decl_FechaModificacion
		 WHERE decl_Id = @decl_Id

		 SELECT 1
	END  TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

--Eliminar Declarantes
CREATE OR ALTER PROCEDURE Adua.UDP_tbAranceles_Eliminar
	@decl_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@decl_FechaEliminacion		DATETIME
AS
BEGIN
	SET @decl_FechaEliminacion = GETDATE()
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'decl_Id', @decl_Id, 'Adua.tbDeclarantes', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
		IF(@respuesta = 1)
		BEGIN
			UPDATE	Adua.tbDeclarantes
			SET		decl_Estado = 0,
					usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
					decl_FechaEliminacion = @decl_FechaEliminacion
			WHERE decl_Id = @decl_Id
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

--************************************************************************   Tabla Declaratntes FIN   ***********************************************************************************************
GO

---------------------------------------------------------------------//  Modulos de Aduanas Procedimientos final \\-------------------------------------------------------------------------------------------