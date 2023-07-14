--Modulos
--Maquinas
--Marcas Maquinas
--Modelos Maquinas

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
	@usua_UsuarioModificacion	INT,
	@modu_FechaModificacion		DATETIME
AS
BEGIN
	SET @modu_FechaModificacion = GETDATE();
	BEGIN TRY
		UPDATE	Prod.tbModulos
		SET		usua_UsuarioModificacion = @usua_UsuarioModificacion,
				modu_FechaModificacion = @modu_FechaModificacion,
				modu_Estado = 0
		WHERE	modu_Id = @modu_Id
		SELECT 1
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
	@usua_UsuarioModificacion		INT,
	@maqu_FechaModificacion			DATETIME
AS
BEGIN
	SET @maqu_FechaModificacion = GETDATE()
	BEGIN TRY
		UPDATE	Prod.tbMaquinas
		SET		usua_UsuarioModificacion = @usua_UsuarioModificacion,
				maqu_FechaModificacion   = @maqu_FechaModificacion,
				maqu_Estado	= 0
		WHERE	maqu_Id = @maqu_Id
		SELECT 1
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
	@usua_UsuarioModificacion	INT,
	@marq_FechaModificacion		DATETIME
AS
BEGIN
	SET @marq_FechaModificacion = GETDATE();
	BEGIN TRY
		UPDATE	Prod.tbMarcasMaquina
		SET		marq_Estado = 0,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				marq_FechaModificacion = @marq_FechaModificacion
		WHERE	marq_Id = @marq_Id
		SELECT 1
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
	@usua_UsuarioModificacion	INT,
	@mmaq_FechaModificacion		DATETIME
AS
BEGIN
	SET @marq_FechaModificacion = GETDATE();
	BEGIN TRY
		UPDATE	Prod.tbModelosMaquina
		SET		mmaq_Estado = 0,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				mmaq_FechaModificacion = @mmaq_FechaModificacion
		WHERE	mmaq_Id = @mmaq_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0	
	END CATCH
END

GO
--************************************************************************   Tabla Modelos maquinas fin   ***********************************************************************************************

