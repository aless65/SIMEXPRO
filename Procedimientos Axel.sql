--Modulos
--Maquinas
--Aranceles
--Marcas Maquinas
--Modelos Maquinas
--Roles
--RolesXPantalla

----------------------------------------------------------------//  Modulos de Producci�n Procedimientos Inicio \\-------------------------------------------------------------------------------------------
--************************************************************************   Tabla Modulos inicio   ***********************************************************************************************

GO




CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Listar
AS
BEGIN
SELECT  modu_Id AS IDModulo, 
        modu_Nombre AS ModuloNombre, 
	    
		modu.proc_Id AS IdProceso,	
		pro.proc_Descripcion AS ProcesoDescripcion,
	    
		empr_Id AS IDEmpleado,
	    emp.empl_Nombres + ' ' + emp.empl_Apellidos AS empleado_Nombre,
	    
		modu.usua_UsuarioCreacion AS IDUsuarioCreacion,
	    usu.usua_Nombre AS UsuarioCreacion,
		modu_FechaCreacion, 
		modu.usua_UsuarioModificacion AS IDUsuarioModifica, 
		usu1.usua_Nombre AS UsuarioModifica,
		modu_FechaModificacion,	    
		
		
		modu_Estado 
		
		FROM Prod.tbModulos modu 
		inner join Acce.tbUsuarios usu       ON usu.usua_UsuarioCreacion = modu.usua_UsuarioCreacion		
		LEFT JOIN Acce.tbUsuarios usu1       ON usu1.usua_Id = modu.usua_UsuarioModificacion
		LEFT JOIN Acce.tbUsuarios usu2       ON usu2.usua_Id = modu.usua_UsuarioEliminacion
		INNER JOIN [Gral].[tbEmpleados] emp  ON modu.empr_Id = emp.empl_Id
		INNER JOIN [Prod].[tbProcesos] pro   ON pro.proc_Id = modu.proc_Id
		WHERE modu.modu_Estado = 1
END

GO

/*Insertar Modulos*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Insertar 
	@modu_Nombre			NVARCHAR(200),
	@proc_Id				INT,
	@empr_Id				INT,
	@usua_UsuarioCreacion	INT,
	@modu_FechaCreacion		DATETIME
AS
BEGIN
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
				INSERT INTO Prod.tbModulos ([modu_Nombre], [proc_Id], [empr_Id], [usua_UsuarioCreacion], [modu_FechaCreacion])
				VALUES (@modu_Nombre,@proc_Id,@empr_Id,@usua_UsuarioCreacion,@modu_FechaCreacion);
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END 

GO

/*Editar Modulos*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Editar  
	@modu_Id					INT,
	@modu_Nombre				NVARCHAR(200),
	@proc_Id					INT,
	@empr_Id					INT,
	@usua_UsuarioModificacion	INT,
	@modu_FechaModificacion		DATETIME
AS
BEGIN
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

/*Eliminar Modulos*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbModulos_Eliminar    
	@modu_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@modu_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'modu_Id', @modu_Id, 'Prod.tbModulos', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	[Prod].[tbModulos]
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

/*Listar Maquinas*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinas_Listar
AS
BEGIN
	
	SELECT	maqu_Id AS IdMaquinas,
		    maqu_NumeroSerie AS NumeroDeSerie,
			
			maqu.modu_Id AS IdModulo,		    
			modu.modu_Nombre AS Modulo,
		    
			usu.usua_Id AS IdUsuarioCrea,
		    usu.usua_Nombre AS UsuarioCreaNombre,
		    usu1.usua_Id AS IdUsuarioModifica,
		    usu1.usua_Nombre AS UsuarioModificaNombre
   
   FROM  	Prod.tbMaquinas maqu		
   INNER JOIN Prod.tbModulos modu      ON modu.modu_Id = maqu.modu_Id

   INNER JOIN [Acce].[tbUsuarios] usu  ON usu.usua_Id = maqu.usua_UsuarioCreacion
   LEFT JOIN Acce.tbUsuarios usu1     ON usu1.usua_UsuarioModificacion = maqu.usua_UsuarioModificacion
   LEFT JOIN Acce.tbUsuarios usu2     on usu2.usua_UsuarioModificacion = maqu.usua_UsuarioEliminacion
   WHERE	maqu.maqu_Estado = 1
END
GO

/*Insertar Maquinas*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinas_Insertar 
	@maqu_NumeroSerie		NVARCHAR(100),
	@modu_Id                INT,
    @mmaq_Id                INT, 
	@usua_UsuarioCreacion	INT,
	@maqu_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS(SELECT * FROM Prod.tbMaquinas WHERE maqu_NumeroSerie = @maqu_NumeroSerie AND modu_Id = @modu_Id AND maqu_Estado = 0)
			BEGIN 
				UPDATE Prod.tbMaquinas
				SET	   maqu_Estado = 1
				WHERE  @maqu_NumeroSerie = @maqu_NumeroSerie AND modu_Id = @modu_Id
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Prod.tbMaquinas ([maqu_NumeroSerie],[mmaq_Id],[modu_Id], [usua_UsuarioCreacion], [maqu_FechaCreacion], [usua_UsuarioModificacion], [maqu_FechaModificacion], [maqu_Estado])
				VALUES (@maqu_NumeroSerie,@mmaq_Id,@modu_Id,@usua_UsuarioCreacion,@maqu_FechaCreacion,NULL,NULL,1);
				SELECT 1
			END
	END TRY
	BEGIN CATCH
	 SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

GO

/*Editar Maquinas*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinas_Editar
	@maqu_Id				    INT,
	@maqu_NumeroSerie		    NVARCHAR(100),
	@modu_Id                    INT,
    @mmaq_Id                    INT, 
	@usua_UsuarioModificacion	INT,
	@maqu_FechaModificacion	    DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbMaquinas]
		   SET [maqu_NumeroSerie] = @maqu_NumeroSerie
			  ,modu_Id = @modu_Id
			  ,mmaq_Id = @mmaq_Id
			  ,usua_UsuarioModificacion = @usua_UsuarioModificacion
			  ,maqu_FechaModificacion = @maqu_FechaModificacion
		 WHERE maqu_Id = @maqu_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

GO

/*Eliminar Maquinas*/
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
--************************************************************************   Tabla Maquinas fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Marcas maquinas inicio   ***********************************************************************************************

--Listar Marcas Maquina
--CREATE OR ALTER VIEW Prod.VW_tbMarcasMaquina
--AS

--GO

/*Listar procedimiento de listar MarcasMaquina*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMarcasMaquinas_Listar
AS
BEGIN
	SELECT  mrqu.marq_Id AS MarcaMaquinaID,
		    mrqu.marq_Nombre AS MarcaNombre,
			mrqu.[usua_UsuarioCreacion] AS idUsuarioCreador,
			
			
			Usu.usua_Nombre AS UsuarioCreacion,
            mrqu.[marq_FechaCreacion] AS FechaCreacion,
            mrqu.[usua_UsuarioModificacion] AS idUsuarioModificador,
			usu1.usua_Nombre AS UsuarioModificador, 
            mrqu.[marq_FechaModificacion] AS FechaModificacion,
           
		    mrqu.[marq_Estado] AS Estado
   
    FROM    Prod.tbMarcasMaquina mrqu 
	INNER JOIN Acce.tbUsuarios usu ON usu.usua_Id = mrqu.[usua_UsuarioCreacion]
	INNER JOIN Acce.tbUsuarios usu1 ON usu1.usua_Id =  mrqu.[usua_UsuarioModificacion]
    WHERE	mrqu.[marq_Estado] = 1
END
GO

/*Insertar procedimiento de listar MarcasMaquina*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMarcasMaquina_Insertar 
	@marq_Nombre			NVARCHAR(250),
	@usua_UsuarioCreacion	INT,
	@marq_FechaCreacion		DATETIME
AS
BEGIN
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

GO

/*Editar procedimiento de listar MarcasMaquina*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMarcasMaquina_Editar 
	@marq_Id					INT,
	@marq_Nombre				NVARCHAR(250),
	@usua_UsuarioModificacion	INT,
	@marq_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE	Prod.tbMarcasMaquina
		SET		marq_Nombre = @marq_Nombre,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				marq_FechaModificacion = @marq_FechaModificacion
		WHERE	marq_Id  = @marq_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

GO

/*Eliminar procedimiento de listar MarcasMaquina*/
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END
GO
--************************************************************************   Tabla Marcas maquinas fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Modelos maquinas inicio   ***********************************************************************************************

--Listar Modelos Maquina

/*Ejecutar procedimiento de listar ModelosMaquina*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelosMaquina_Listar
AS
BEGIN
	SELECT	moma.mmaq_Id AS IdModelosMaquina,
		    moma.mmaq_Nombre AS ModeloMaquina,
		    moma.mmaq_Imagen  AS ImagenModeloMaquina,

			mrqu.marq_Id  AS  IDMarcaMaquina,
		    mrqu.marq_Nombre AS MarcaMaquina,
		    
			fuma.func_Id  AS IDFuncionMaquina,
		    fuma.func_Nombre AS FuncionMaquina,
		   		
			usu.usua_Id    AS IDUsuarioCreacion,
			usu.usua_Nombre AS UsuarioCreacion ,
			moma.mmaq_FechaCreacion AS FechaCreacion,

			usu1.usua_Id   AS IDUsuarioModificacion,
			usu1.usua_Nombre AS UsuarioModificacion,
			moma.mmaq_FechaModificacion AS FechaModificacion
 
  FROM	    Prod.tbModelosMaquina moma  
            INNER JOIN Prod.tbFuncionesMaquina fuma ON	moma.func_Id = fuma.func_Id 
			INNER JOIN Acce.tbUsuarios usu ON usu.usua_Id = moma.usua_UsuarioCreacion 
			LEFT JOIN Acce.tbUsuarios usu1 ON usu1.usua_UsuarioModificacion = moma.usua_UsuarioModificacion
			INNER JOIN Prod.tbMarcasMaquina	mrqu ON mrqu.marq_Id = moma.marq_Id 
			WHERE moma.mmaq_Estado = 1
END
GO

/*Insertar procedimiento de listar ModelosMaquina*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelosMaquina_Insertar 
	@mmaq_Nombre				NVARCHAR(250),
	@marq_Id					INT,
	@func_Id					INT,
	@momq_Imagen				NVARCHAR(MAX),
	@usua_UsuarioCreacion		INT,
	@mmaq_FechaCreacion			DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS(SELECT mmaq_Id FROM Prod.tbModelosMaquina WHERE mmaq_Nombre = @mmaq_Nombre AND marq_Id = @marq_Id AND func_Id = @func_Id AND mmaq_Imagen = @momq_Imagen AND mmaq_Estado = 0)
			BEGIN
				UPDATE Prod.tbModelosMaquina
				SET mmaq_Estado = 1
				WHERE mmaq_Nombre = @mmaq_Nombre AND marq_Id = @marq_Id AND func_Id = @func_Id AND mmaq_Imagen = @momq_Imagen

				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Prod.tbModelosMaquina ([mmaq_Nombre], [marq_Id], [func_Id], mmaq_Imagen, [usua_UsuarioCreacion], [mmaq_FechaCreacion], [usua_UsuarioModificacion], [mmaq_FechaModificacion], [mmaq_Estado])
				VALUES	(@mmaq_Nombre,@marq_Id,@func_Id,@momq_Imagen,@usua_UsuarioCreacion,@mmaq_FechaCreacion,NULL,NULL,1)

				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END

GO

/*Editar procedimiento de listar ModelosMaquina*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelosMaquina_Editar 
	@mmaq_Id					INT,
	@mmaq_Nombre				NVARCHAR(250),
	@marq_Id					INT,
	@func_Id					INT,
	@mmaq_Imagen				NVARCHAR(MAX),
	@usua_UsuarioModificacion	INT,
	@mmaq_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbModelosMaquina
		   SET [mmaq_Nombre] = @mmaq_Nombre
			  ,[marq_Id] = @marq_Id
			  ,[func_Id] = @func_Id
			  ,mmaq_Imagen = @mmaq_Imagen
			  ,[usua_UsuarioModificacion] = @usua_UsuarioModificacion
			  ,[mmaq_FechaModificacion] = @mmaq_FechaModificacion
			  ,[mmaq_Estado] = 1
		 WHERE mmaq_Id = @mmaq_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END

GO

/*Eliminar procedimiento de listar ModelosMaquina*/
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()		
	END CATCH
END

GO
--************************************************************************   Tabla Modelos maquinas fin   ***********************************************************************************************
----------------------------------------------------------------------//  Modulos de Producci�n Procedimientos final \\-------------------------------------------------------------------------------------------
GO
---------------------------------------------------------------------//  Modulos de Aduanas Procedimientos Inicio \\-------------------------------------------------------------------------------------------
--************************************************************************   Tabla Aranceles inicio   ***********************************************************************************************

--Listar Aranceles
/*Listar procedimiento de listar Aranceles*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbAranceles_Listar
AS
BEGIN
	SELECT	aran_Id                AS Idaranceles,
		aran_Codigo                AS CodigoAranceles,
		aran_Descripcion           AS ArancelesDescripcion,
		
		ara.usua_UsuarioCreacion  AS idUsuarioCreacion,
		usu.usua_Nombre           AS UsuarioCreacion,		
		ara.aran_FechaCreacion    AS FechaCreacion ,
		
		
		ara.usua_UsuarioModificacion  AS idUsuarioModificacion,
		usu1.usua_Nombre              AS UsuarioModificacion,
		ara.aran_FechaModificacion    AS FechaModificacion	
		
 
   FROM	Adua.tbAranceles ara
   INNER JOIN Acce.tbUsuarios usu ON ara.usua_UsuarioCreacion = usu.usua_UsuarioCreacion
   LEFT JOIN Acce.tbUsuarios usu1 ON usu1.usua_UsuarioModificacion = ara.usua_UsuarioModificacion 
   WHERE	aram_Estado = 1

END

GO

/*Insertar procedimiento de listar Aranceles*/
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END

GO

/*Editar procedimiento de listar Aranceles*/
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END

GO

/*Eliminar procedimiento de listar Aranceles*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbAranceles_Eliminar 
	@aran_Id					INT,
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
GO
--************************************************************************   Tabla Aranceles FIN   ***********************************************************************************************
GO
--************************************************************************   Tabla Declaratntes inicio   ***********************************************************************************************

--Listar Declarantes
/* listar Declarantes*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbDeclarantes_Listar
AS
BEGIN
	SELECT	decl.decl_Id AS idDeclarante, 
		decl.decl_Nombre_Raso  AS NombreDeclarante, 
		decl.decl_Direccion_Exacta AS DireccionExacta, 
		decl.ciud_Id  AS idProvincia,
		
		prvi.pvin_Codigo AS CodigoProvincia,
		prvi.pvin_Nombre  AS NombreProvincia,
		
		pais.pais_Codigo AS CodigoPais,
		pais.pais_Nombre AS NombrePais,
		
		decl.decl_Correo_Electronico AS CorreoElectronico, 
		decl.decl_Telefono AS Telefono,  
		decl.decl_Fax  AS Fax,
		
		usu.usua_Id  AS IdUsuarioCreacion,
		usu.usua_UsuarioCreacion AS UsuarioCreacion,
		decl.decl_FechaCreacion AS FechaCreacion,
		usu1.usua_Id AS IdUsuarioModifica,
		usu1.usua_Nombre AS usuarioModifica,
		decl.decl_FechaModificacion AS FechaModificacion,

		decl.decl_Estado
		 
FROM    Adua.tbDeclarantes decl 
         INNER JOIN Gral.tbProvincias prvi ON		decl.ciud_Id = prvi.ciud_Id 
         INNER JOIN Gral.tbPaises  pais    ON		prvi.pvin_Codigo = pais.pais_Codigo
		 INNER JOIN Acce.tbUsuarios usu    ON       usu.usua_UsuarioCreacion = decl.usua_UsuarioCreacion 
		 LEFT JOIN Acce.tbUsuarios usu1   ON       usu1.usua_UsuarioModificacion = decl.usua_UsuarioModificacion
END

GO

/* Insertar Declarantes*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbDeclarantes_Insertar 
	@decl_Nombre_Raso			NVARCHAR(250), 
	@decl_Direccion_Exacta		NVARCHAR(250), 
	@ciud_Id					INT, 
	@decl_Correo_Electronico	NVARCHAR(150), 
	@decl_Telefono				NVARCHAR(50), 
	@decl_Fax					NVARCHAR(50), 
	@usua_UsuarioCreacion		INT,
	@decl_FechaCreacion			DATETIME
AS
BEGIN
	SET @decl_FechaCreacion = GETDATE();
	BEGIN TRY
		IF EXISTS(SELECT decl_Id FROM Adua.tbDeclarantes WHERE decl_Nombre_Raso = @decl_Nombre_Raso AND decl_Direccion_Exacta = @decl_Direccion_Exacta AND ciud_Id = @ciud_Id AND decl_Correo_Electronico = @decl_Correo_Electronico AND decl_Telefono = @decl_Telefono AND decl_Fax = @decl_Fax  AND decl_Estado = 0)
			BEGIN
				UPDATE	Adua.tbDeclarantes
				SET		decl_Estado = 1
				WHERE decl_Nombre_Raso = @decl_Nombre_Raso AND decl_Direccion_Exacta = @decl_Direccion_Exacta AND ciud_Id = @ciud_Id AND decl_Correo_Electronico = @decl_Correo_Electronico AND decl_Telefono = @decl_Telefono AND decl_Fax = @decl_Fax 
				
				SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Adua.tbDeclarantes ([decl_Nombre_Raso], [decl_Direccion_Exacta], [ciud_Id], [decl_Correo_Electronico], [decl_Telefono], [decl_Fax], [usua_UsuarioCreacion], [decl_FechaCreacion], [usua_UsuarioModificacion], [decl_FechaModificacion], [decl_Estado])
				VALUES (@decl_Nombre_Raso,@decl_Direccion_Exacta,@ciud_Id,@decl_Correo_Electronico,@decl_Telefono,@decl_Fax,@usua_UsuarioCreacion,@decl_FechaCreacion,NULL,NULL,1);
				
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

/* Editar Declarantes*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbDeclarantes_Editar 
	@decl_Id					INT,
	@decl_Nombre_Raso			NVARCHAR(250), 
	@decl_Direccion_Exacta		NVARCHAR(250), 
	@ciud_Id					INT, 
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
			  ,[ciud_Id] = @ciud_Id
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

/* Eliminar Declarantes*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbDeclarantes_Eliminar 
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
---------------------------------------------------------------------//  Modulos de Aduanas Procedimientos final \\-------------------------------------------------------------------------------------------
GO
--------------------------------------------------------------------------//  Modulo de acceso  \\-------------------------------------------------------------------------------------------
--************************************************************************   Tabla Roles inicio   ***********************************************************************************************

/* listar Roles*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRoles_Listar
AS
BEGIN
	SELECT	role_Id,
			role_Descripcion,
			usua_UsuarioCreacion,
			role_FechaCreacion,
			Usua_UsuarioModificacion,
			role_FechaModificacion
	FROM	Acce.tbRoles
	WHERE	role_Estado = 1
END

GO

/* Insertar Roles*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRoles_Insertar
	@role_Descripcion			NVARCHAR(500),
	@usua_UsuarioCreacion		INT,
	@role_FechaCreacion			DATETIME
AS
BEGIN
	SET @role_FechaCreacion = GETDATE()
	BEGIN TRY
		IF EXISTS (SELECT role_Id FROM Acce.tbRoles WHERE role_Descripcion = @role_Descripcion AND role_Estado = 0)
			BEGIN
				UPDATE Acce.tbRoles
				   SET role_Descripcion = @role_Descripcion
					  ,role_Estado = 1
				 WHERE role_Descripcion = @role_Descripcion

				 SELECT 1
			END
		ELSE
			BEGIN
				INSERT INTO Acce.tbRoles([role_Descripcion], [usua_UsuarioCreacion], [role_FechaCreacion], [usua_UsuarioModificacion], [role_FechaModificacion], [usua_UsuarioEliminacion], [role_FechaEliminacion], [role_Estado])
				VALUES (@role_Descripcion,@usua_UsuarioCreacion,@role_FechaCreacion,NULL,NULL,NULL,NULL,1);

				 SELECT 1
			END
	END TRY
	BEGIN CATCH
		 SELECT 0
	END CATCH
END

GO

/* Editar Roles*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRoles_Editar
	@role_Id					INT,
	@role_Descripcion			NVARCHAR(500),
	@usua_UsuarioModificacio	INT,
	@roleFechaModificacioN		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE [Acce].[tbRoles]
		   SET [role_Descripcion] = @role_Descripcion			 
			  ,[usua_UsuarioModificacion] = @usua_UsuarioModificacio
			  ,[role_FechaModificacion] = @roleFechaModificacioN		  
		 WHERE role_Id = @role_Id

		 SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 1
	END CATCH
END

GO

/* Eliminar Roles*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRoles_Eliminar
	@role_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@role_FechaEliminacion		DATETIME
AS
BEGIN
	SET @role_FechaEliminacion = GETDATE();
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'role_Id', @role_Id, 'Acce.tbRoles', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
		IF(@respuesta = 1)
		BEGIN
			UPDATE	Acce.tbRoles
			SET		role_Estado = 0,
					usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
					role_FechaEliminacion = @role_FechaEliminacion
			WHERE role_Id = @role_Id
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

--************************************************************************   Tabla Roles Fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Pantallas inicio   ***********************************************************************************************

/* Listar pantallas*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbPantallas_Listar
AS
BEGIN
	SELECT	pant_Id,
			pant_Nombre,
			pant_URL,
			pant_Icono
	FROM	Acce.tbPantallas
END

--************************************************************************   Tabla Pantallas Fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Roles por pantallas inicio   ***********************************************************************************************

/* Listar Pantallas por id de rol*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRolesXPantallas
	@role_Id		INT
AS
BEGIN
	SELECT		T2.pant_Id,
				T2.pant_Nombre,
				T2.pant_URL,
				T2.pant_Icono
	FROM		Acce.tbRolesXPantallas T1 
	INNER JOIN	Acce.tbPantallas T2
	ON			T1.pant_Id = T2.pant_Id
	WHERE		T1.role_Id = @role_Id
END

GO

/* Insertar RolesXPantallas*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRolesXPantallas_Insertar
	@pant_Id				INT,
	@role_Id				INT,
	@usua_UsuarioCreacion	INT,
	@ropa_FechaCreacion		DATETIME
AS
BEGIN
	SET @ropa_FechaCreacion = GETDATE();
	BEGIN TRY
		INSERT INTO Acce.tbRolesXPantallas ([pant_Id], [role_Id], [usua_UsuarioCreacion], [ropa_FechaCreacion], [usua_UsuarioModificacion], [ropa_FechaModificacion], [usua_UsuarioEliminacion], [ropa_FechaEliminacion], [ropa_Estado])
		VALUES(@pant_Id,@role_Id,@usua_UsuarioCreacion, @ropa_FechaCreacion,NULL,NULL,NULL,NULL,1);
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO


/* Insertar RolesXPantallas*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRolesXPantallas_Editar
	@pant_Id					INT,
	@role_Id					INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO Acce.tbRolesXPantallas ([pant_Id], [role_Id], [usua_UsuarioCreacion], [ropa_FechaCreacion], [usua_UsuarioModificacion], [ropa_FechaModificacion], [usua_UsuarioEliminacion], [ropa_FechaEliminacion], [ropa_Estado])
		VALUES(@pant_Id,@role_Id,NULL, NULL,NULL,NULL,NULL,NULL,1);
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO


/* Eliminar RolesXPantallas*/
CREATE OR ALTER PROCEDURE Acce.UDP_tbRolesXPantallas_Eliminar
	@role_Id					INT
AS
BEGIN
	BEGIN TRY
		DELETE FROM Acce.tbRolesXPantallas WHERE role_Id = @role_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

--************************************************************************   Tabla Roles por pantallas Fin   ***********************************************************************************************
GO
--************************************************************************   Tabla Duca inicio   ***********************************************************************************************

/* Listar Duca*/ii
CREATE OR ALTER PROCEDURE Adua.UDP_tbDuca_Listar
AS
BEGIN
	SELECT	[duca_No_Duca], 
			[duca_No_Correlativo_Referencia],
			[deva_Id], 
			[duca_AduanaRegistro], 
			[duca_AduanaSalida], 
			[duca_DomicilioFiscal_Exportador], 
			[duca_Tipo_Iden_Exportador], 
			[duca_Pais_Emision_Exportador], 
			[duca_Numero_Id_Importador], 
			[duca_Pais_Emision_Importador],
			[duca_DomicilioFiscal_Importador], 
			[duca_Regimen_Aduanero],
			[duca_Modalidad],
			[duca_Clase],
			[duca_Codigo_Declarante],
			[duca_Numero_Id_Declarante], 
			[duca_NombreSocial_Declarante],
			[duca_DomicilioFiscal_Declarante], 
			[duca_Pais_Procedencia],
			[duca_Pais_Exportacion],
		    [duca_Pais_Destino], 
			[duca_Deposito_Aduanero],
			[duca_Lugar_Embarque],
			[duca_Lugar_Desembarque],
			[duca_Manifiesto], 
			[duca_Titulo], 
			[duca_Codigo_Transportista], 
			[duca_PesoBrutoTotal],
			[duca_PesoNetoTotal], 
			[motr_id], 
			[duca_Transportista_Nombre], 
			[duca_Conductor_Id],
			[duca_Codigo_Tipo_Documento],
			[duca_FechaVencimiento]
	FROM	Adua.tbDuca

END