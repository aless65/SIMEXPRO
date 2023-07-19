-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS MÓDULO ADUANERO

---***********VALIDACIÓN DE ELIMINAR**************---

GO
CREATE OR ALTER PROCEDURE dbo.UDP_ValidarReferencias
	(@Id_Nombre		NVARCHAR(250),
	 @Id_Valor		NVARCHAR(50),
	 @tabla_Nombre NVARCHAR(1000),
	 @respuesta INT OUTPUT)
AS BEGIN
	DECLARE @QUERY NVARCHAR(MAX);
	SET @Id_Valor = CONCAT('=', @Id_Valor);

	/*En esta sección se consiguen las tablas que está referenciadas al campo*/

	WITH AKT AS ( SELECT ROW_NUMBER() OVER (ORDER BY f.name) RN, f.name AS ForeignKey
						,OBJECT_NAME(f.parent_object_id) AS TableName
						,COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName
						,SCHEMA_NAME(f.schema_id) SchemaName
						,OBJECT_NAME (f.referenced_object_id) AS ReferenceTableName
						,COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferenceColumnName
				  FROM   sys.foreign_keys AS f
						 INNER JOIN sys.foreign_key_columns AS fc ON f.OBJECT_ID = fc.constraint_object_id
						 INNER JOIN sys.objects oo ON oo.object_id = fc.referenced_object_id
				  WHERE  f.referenced_object_id = object_id(@tabla_Nombre))

		,bs AS (SELECT AKT.RN
					  ,'SELECT ' + ColumnName + ' FROM ' + SchemaName + '.' + TableName + ' WHERE ' + ColumnName + ' = OO.' + ReferenceColumnName  SubQuery
				FROM   AKT)
		,re AS (SELECT bs.RN, CAST(RTRIM(bs.SubQuery) AS VARCHAR(MAX)) Joined
				FROM   bs
				WHERE  bs.RN = 1
				UNION  ALL
				SELECT bs2.RN, CAST(re.Joined + ' UNION ALL ' + ISNULL(RTRIM(bs2.SubQuery), '') AS VARCHAR(MAX)) Joined
				FROM   re, bs bs2 
				WHERE  re.RN = bs2.RN - 1 )
		,fi AS (SELECT ROW_NUMBER() OVER (ORDER BY RN DESC) RNK, Joined
				FROM   re)

	/*Se crea el query para verificar si el campo se us�*/
	SELECT @QUERY  = '
			SELECT CASE WHEN XX.REFERENCED IS NULL THEN 1 ELSE 0 END Referenced
			FROM   '+ @tabla_Nombre + ' OO
			OUTER APPLY (SELECT SUM(1) REFERENCED
						FROM   (' + Joined + ') II) XX
						WHERE OO.'+ @Id_Nombre + '' + @Id_Valor 
	FROM   fi
	WHERE  RNK = 1
		
	/*Se ejecuta y consigue el c�digo de verificaci�n (0 no se puede eliminar porque est� siendo usado, 1 se puede eliminar porque no est� siendo usado*/
	DECLARE @TempTable TABLE (Referenced INT)
	INSERT INTO @TempTable
	EXEC (@QUERY)

	SELECT @respuesta = Referenced
	FROM @TempTable

END
GO

-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS ACCESO
--************USUARIOS******************--

/*Vista usuarios*/
CREATE OR ALTER VIEW acce.VW_tbUsuarios
AS
	SELECT usua.usua_Id AS usuarioId, 
		   usua.usua_Nombre AS usuarioNombre, 
		   usua.usua_Contrasenia AS usuarioContrasenia, 
		   usua.usua_Correo AS usuarioCorreo, 
		   usua.role_Id AS rolId,
		   rol.role_Descripcion AS rolDescripcion, 
		   usua.usua_EsAdmin,
		   usua.empl_Id AS empleadoId,
		   (empl_Nombres + ' ' + empl_Apellidos) AS empleadoNombreCompleto, 
		   usua.usua_UsuarioCreacion AS usuarioCreacion, 
		   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
		   usua.usua_FechaCreacion AS usuarioFechaCreacion, 
	       usua.usua_UsuarioModificacion AS usuarioModificacion, 
		   usuaModifica.usua_Nombre AS usuarioModificacionNombre, 
		   usua.usua_FechaModificacion AS usuarioFechaModificacion,
		   usuaElimina.usua_Nombre AS usuarioEliminacionNombre, 
		   usua.usua_FechaEliminacion AS usuarioFechaEliminacion,
		   usua.usua_Estado AS usuarioEstado,
		   empl.empl_CorreoElectronico AS empleadoCorreoElectronico	
		   FROM Acce.tbUsuarios usua LEFT JOIN Acce.tbRoles rol
		   ON usua.role_Id = rol.role_Id
		   LEFT JOIN Gral.tbEmpleados empl
		   ON empl.empl_Id = usua.empl_Id 
		   LEFT JOIN acce.tbUsuarios usuaCrea
		   ON usua.usua_UsuarioCreacion = usuaCrea.usua_Id
		   LEFT JOIN acce.tbUsuarios usuaModifica
		   ON usua.usua_UsuarioModificacion = usuaModifica.usua_Id LEFT JOIN acce.tbUsuarios usuaElimina
		   ON usua.usua_UsuarioEliminacion = usuaElimina.usua_Id
		   
GO

/*Listar Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_VW_tbUsuarios_Listar
AS
BEGIN
	SELECT *
    FROM acce.VW_tbUsuarios
END
GO

--EXEC acce.UDP_tbUsuarios_Insertar 'juan', '123', 'skf@ks.com', 1, 'zfdsf', 1, 1, '2023-08-13'

/*Insertar Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Insertar
	@usua_Nombre			NVARCHAR(150),
	@usua_Contrasenia		NVARCHAR(MAX),
	@usua_Correo			NVARCHAR(200),
	@empl_Id				INT,
	@usua_Image				NVARCHAR(500),
	@role_Id				INT, 
	@usua_EsAdmin			BIT,
	@usua_UsuarioCreacion	INT,
	@usua_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY
		
		DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @usua_Contrasenia));
		DECLARE @usua_Id INT;


		IF EXISTS (SELECT * FROM acce.tbUsuarios
						WHERE @usua_Nombre = usua_Nombre
						AND usua_Estado = 0)
		BEGIN
			UPDATE acce.tbUsuarios
			SET	   usua_Estado = 1,
				   usua_Contrasenia = @password,
				   usua_Correo = @usua_Correo,
				   empl_Id = @empl_Id,
				   usua_Image = @usua_Image,
				   role_Id = @role_Id,
				   usua_EsAdmin = @usua_EsAdmin
			WHERE  usua_Nombre = @usua_Nombre

			SET @usua_Id = (SELECT usua_Id FROM acce.tbUsuarios WHERE  usua_Nombre = @usua_Nombre)
			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO acce.tbUsuarios ([usua_Nombre], 
											 [usua_Contrasenia], 
											 [usua_Correo], 
											 [empl_Id], 
											 [usua_Image], 
											 [role_Id], 
											 [usua_EsAdmin],
											 [usua_UsuarioCreacion], 
											 [usua_FechaCreacion])
			VALUES(@usua_Nombre,
					@password,
					@usua_Correo,
					@empl_Id,
					@usua_Image,
					@role_Id,
					@usua_EsAdmin,
					@usua_UsuarioCreacion,
					@usua_FechaCreacion)

			SET @usua_Id = SCOPE_IDENTITY();

			SELECT 1
		END

			INSERT INTO acce.tbUsuariosHistorial ([usua_Id],
												  [usua_Nombre], 
												  [usua_Contrasenia], 
												  [usua_Correo], 
												  [empl_Id], 
												  [usua_Image], 
												  [role_Id], 
												  [usua_EsAdmin],
												  [hist_UsuarioAccion], 
												  [hist_FechaAccion],
												  [hist_Accion])
			VALUES( @usua_Id,
					@usua_Nombre,
					@password,
					@usua_Correo,
					@empl_Id,
					@usua_Image,
					@role_Id,
					@usua_EsAdmin,
					@usua_UsuarioCreacion,
					@usua_FechaCreacion,
					'Insertar')
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Editar
	@usua_Id					INT,
	@usua_Contrasenia			NVARCHAR(MAX),
	@usua_Correo				NVARCHAR(200),
	@empl_Id					INT,
	@usua_Image					NVARCHAR(500),
	@role_Id					INT, 
	@usua_EsAdmin				INT,
	@usua_UsuarioModificacion	INT,
	@usua_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  acce.tbUsuarios
		SET		usua_Correo = @usua_Correo,
				empl_Id = @empl_Id,
				usua_Image = @usua_Image,
				role_Id = @role_Id,
				usua_EsAdmin = @usua_EsAdmin,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				usua_FechaModificacion = @usua_FechaModificacion 
		WHERE	usua_Id = @usua_Id

		INSERT INTO acce.tbUsuariosHistorial (	[usua_Id],
												[usua_Nombre], 
												[usua_Contrasenia], 
												[usua_Correo], 
												[empl_Id], 
												[usua_Image], 
												[role_Id], 
												[usua_EsAdmin],
												[hist_UsuarioAccion], 
												[hist_FechaAccion],
												[hist_Accion])
			SELECT [usua_Id],
				   [usua_Nombre], 
				   [usua_Contrasenia], 
				   @usua_Correo, 
				   @empl_Id, 
				   @usua_Image, 
				   @role_Id, 
				   @usua_EsAdmin,
				   @usua_UsuarioModificacion, 
				   @usua_FechaModificacion,
				   'Editar'
			FROM acce.tbUsuarios
			WHERE usua_Id = @usua_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/*Eliminar usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Eliminar 
	@usua_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@usua_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE	acce.tbUsuarios
		SET		usua_Estado = 0,
				usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
				usua_FechaEliminacion = @usua_FechaEliminacion
		WHERE	usua_Id = @usua_Id

		INSERT INTO acce.tbUsuariosHistorial (	[usua_Id],
												[usua_Nombre], 
												[usua_Contrasenia], 
												[usua_Correo], 
												[empl_Id], 
												[usua_Image], 
												[role_Id], 
												[usua_EsAdmin],
												[hist_UsuarioAccion], 
												[hist_FechaAccion],
												[hist_Accion])
			SELECT [usua_Id],
				   [usua_Nombre], 
				   [usua_Contrasenia], 
				   [usua_Correo], 
				   [empl_Id], 
				   [usua_Image], 
				   [role_Id], 
				   [usua_EsAdmin],
				   @usua_UsuarioEliminacion, 
				   @usua_FechaEliminacion,
				   'Eliminar'
			FROM acce.tbUsuarios
			WHERE usua_Id = @usua_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS GENERAL

--**********ESTADOS CIVILES**********--

/*Listar estados civiles*/
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Listar
AS
BEGIN
	SELECT [escv_Id], 
		   [escv_Nombre]
    FROM [Gral].[tbEstadosCiviles]
	WHERE [escv_Estado] = 1
END
GO

--**********OFICINAS**********--

/*Listar oficinas*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficinas_Listar
AS
BEGIN
	SELECT	ofic_Id							
			,ofic_Nombre					
			,ofic.usua_UsuarioCreacion		
			,usuaCrea.usua_Nombre			AS usuarioCreacionNombre
			,ofic_FechaCreacion				
			,ofic.usua_UsuarioModificacion	 
			,usuaModifica.usua_Nombre		AS usuarioModificacionNombre
			,ofic_FechaModificacion			
			,ofic.usua_UsuarioEliminacion	 
			,usuaElimina.usua_Nombre		AS usuarioEliminacionNombre
			,ofic_FechaEliminacion			 
			,ofic_Estado						
	FROM [Gral].[tbOficinas] ofic 
	INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON ofic.usua_UsuarioCreacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaModifica  ON ofic.usua_UsuarioModificacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaElimina   ON ofic.usua_UsuarioEliminacion = usuaCrea.usua_Id
	WHERE ofic_Estado = 1
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--**********OFICIO/PROFESIÓN**********--

/*Listar oficio/profesión*/
CREATE OR ALTER PROCEDURE gral.UDP_tbOficio_Profesiones_Listar
AS
BEGIN
	SELECT ofpr_Id							
			,ofpr_Nombre					
			,ofpr.usua_UsuarioCreacion		 
			,usuaCrea.usua_Nombre			AS usuarioCreacionNombre
			,ofpr_FechaCreacion				 
			,ofpr.usua_UsuarioModificacion	 
			,usuaModifica.usua_Nombre		AS usuarioModificacionNombre
			,ofpr_FechaModificacion			
			,ofpr_Estado					
	FROM [Gral].[tbOficio_Profesiones] ofpr 
	INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON ofpr.usua_UsuarioCreacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON ofpr.usua_UsuarioModificacion = usuaCrea.usua_Id 
	WHERE ofpr_Estado = 1
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

		INSERT INTO [Gral].[tbOficio_Profesiones] (ofpr_Nombre, 
														   usua_UsuarioCreacion, 
														   ofpr_FechaCreacion)
			VALUES(@ofpr_Nombre,	
				   @usua_UsuarioCreacion,
				   @ofpr_FechaCreacion)


			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--**********CARGOS**********--

/*Listar cargos*/
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Listar
AS
BEGIN
	SELECT carg_Id							
		   ,carg_Nombre						
	       ,carg.usua_UsuarioCreacion		
	       ,usuaCrea.usua_Nombre			AS usuarioCreacionNombre
	       ,carg_FechaCreacion				
	       ,carg.usua_UsuarioModificacion	
	       ,usuaModifica.usua_Nombre		AS usuarioModificacionNombre
	       ,carg_FechaModificacion			
	       ,carg.usua_UsuarioEliminacion	
	       ,usuaElimina.usua_Nombre			AS usuarioEliminacionNombre
	       ,carg_FechaEliminacion			
	       ,carg_Estado						
    FROM [Gral].[tbCargos] carg 
	INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON carg.usua_UsuarioCreacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON carg.usua_UsuarioModificacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaElimina	ON carg.usua_UsuarioEliminacion = usuaCrea.usua_Id
	WHERE carg_Estado = 1
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

		INSERT INTO [Gral].[tbCargos] (carg_Nombre, 
											   usua_UsuarioCreacion, 
											   carg_FechaCreacion)
			VALUES(@carg_Nombre,	
				   @usua_UsuarioCreacion,
				   @carg_FechaCreacion)


			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--**********COLONIAS**********--

/*Listar colonias*/
CREATE OR ALTER PROCEDURE gral.UDP_tbColonias_Listar
AS
BEGIN
	SELECT colo_Id								
	       ,colo_Nombre							
	       ,colo.alde_Id						
	       ,alde.alde_Nombre					
	       ,colo.ciud_Id						
	       ,ciud.ciud_Nombre					
	       ,colo.usua_UsuarioCreacion			
	       ,usuaCrea.usua_Nombre				AS usuarioCreacionNombre
	       ,colo_FechaCreacion					
	       ,colo.usua_UsuarioModificacion		
	       ,usuaModifica.usua_Nombre			AS usuarioModificacionNombre
	       ,colo_FechaModificacion				
	       ,colo_Estado							
   FROM [Gral].[tbColonias] colo 
   LEFT JOIN [Gral].[tbAldeas] alde				ON colo.alde_Id = alde.alde_Id 
   LEFT JOIN [Gral].[tbCiudades] ciud			ON colo.ciud_Id = ciud.ciud_Id 
   INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON colo.usua_UsuarioCreacion = usuaCrea.usua_Id 
   LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON colo.usua_UsuarioModificacion = usuaCrea.usua_Id 
   WHERE colo_Estado = 1
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
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
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
								[ciud_Id] = @ciud_Id,
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--**********MONEDAS**********--

/*Listar monedas*/
CREATE OR ALTER PROCEDURE gral.UDP_tbMonedas_Listar
AS
BEGIN
	SELECT mone_Id								
	       ,mone_Codigo							
	       ,mone_Descripcion					
	       ,mone.usua_UsuarioCreacion			
	       ,usuaCrea.usua_Nombre				AS usuarioCreacionNombre
	       ,mone_FechaCreacion					
	       ,mone.usua_UsuarioModificacion		
	       ,usuaModifica.usua_Nombre			AS usuarioModificacionNombre
	       ,mone_FechaModificacion				
	       ,mone.usua_UsuarioEliminacion		
	       ,usuaElimina.usua_Nombre				AS usuarioEliminacionNombre
	       ,mone_FechaEliminacion				
	       ,mone_Estado							
   FROM [Gral].[tbMonedas] mone 
   INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON mone.usua_UsuarioCreacion = usuaCrea.usua_Id 
   LEFT JOIN [Acce].[tbUsuarios] usuaModifica   ON mone.usua_UsuarioModificacion = usuaCrea.usua_Id 
   LEFT JOIN [Acce].[tbUsuarios] usuaElimina	ON mone.usua_UsuarioEliminacion = usuaCrea.usua_Id
   WHERE mone_Estado = 1
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
				INSERT INTO [Gral].[tbMonedas] ( mone_Codigo,
												 mone_Descripcion, 
											     usua_UsuarioCreacion, 
											     mone_FechaCreacion)
			VALUES(@mone_Codigo,
				   @mone_Descripcion,	
				   @usua_UsuarioCreacion,
				   @mone_FechaCreacion)


			SELECT 1
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS MÓDULO ADUANA

/*Listar Modo Transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Listar
AS
BEGIN
SELECT	modo.motr_Id						,
		modo.motr_Descripcion				,
		crea.usua_Nombre					AS usarioCreacion,
		modo.motr_FechaCreacion				,
		modi.usua_Nombre					AS usuarioModificacion,
		modo.motr_FechaModificacion			,
		modo.motr_Estado					
FROM	Adua.tbModoTransporte modo 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = modo.usua_UsuarioCreacion		
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = modo.usua_UsuarioModificacion 
WHERE	motr_Estado = 1
END
GO
/*Insertar Modo Transporte*/
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
/*Editar Modo Transporte*/
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

/*Listar Tipo documento*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Listar
AS
BEGIN
SELECT	tido_Id								, 
		tido_Codigo							,
		tido_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,
		tido_FechaCreacion					,
		modi.usua_Nombre					AS usuarioModificacion,
		tido_FechaModificacion				,
		tido_Estado 								
FROM	Adua.tbTipoDocumento tido 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tido.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tido.usua_UsuarioModificacion 
WHERE	tido_Estado = 1
END
GO
/*Insertar Tipo documento*/
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

/*Editar Tipo documento*/
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
		SET tido_Descripcion = @tido_Descripcion,
		tido_Codigo = @tido_Codigo,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		tido_FechaModificacion = @tido_FechaModificacion
		WHERE tido_Id = @tido_Id
		SELECT 1
	END TRY
BEGIN CATCH 
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH
END
GO
/*Listar tipo liquidacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Listar
AS
BEGIN
SELECT	tipl_Id								,
		tipl_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,
		tipl_FechaCreacion					,
		modi.usua_Nombre					AS usuarioModificacion,
		tipl_FechaModificacion				,
		tipl_Estado 							
FROM	Adua.tbTipoLiquidacion tilin 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tilin.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tilin.usua_UsuarioModificacion
WHERE	tipl_Estado = 1
END
GO
/*Insertar tipo liquidacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Insertar
@tipl_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tipl_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbTipoLiquidacion (tipl_Descripcion,usua_UsuarioCreacion, tipl_FechaCreacion)
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
/*Editar tipo liquidacion*/
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
/*Listar Estado boletin*/
/*Insertar Estado boletin*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Insertar
@esbo_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
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
/*Editar Estado boletin*/
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
/*Listar incoterm*/
CREATE OR ALTER PROCEDURE adua.UDP_tbIncoterm_Listar
AS
BEGIN
	SELECT inco_Id								
		   ,inco_Codigo							
		   ,inco_Descripcion					
		   ,inco.usua_UsuarioCreacion			
		   ,usuaCrea.usua_Nombre				AS usuarioCreacionNombre
		   ,inco_FechaCreacion					
		   ,inco.usua_UsuarioModificacion		
		   ,usuaModifica.usua_Nombre			AS usuarioModificacionNombre
		   ,inco_FechaModificacion				
		   ,inco_Estado							
	FROM [Adua].[tbIncoterm] inco 
	INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON inco.usua_UsuarioCreacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON inco.usua_UsuarioModificacion = usuaCrea.usua_Id 
	WHERE inco_Estado = 1
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
				INSERT INTO [Adua].[tbIncoterm] (inco_Codigo,
												 inco_Descripcion, 
											     usua_UsuarioCreacion, 
											     inco_FechaCreacion)
			VALUES(@inco_Codigo,
				   @inco_Descripcion,	
				   @usua_UsuarioCreacion,
				   @inco_FechaCreacion)


			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
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
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Listar Conductor*/
CREATE OR ALTER PROCEDURE adua.UDP_tbConductor_Listar
AS
BEGIN
	SELECT cont_Id,
	       cont_Nombre, 
		   cont_Apellido, 
		   cont_Licencia, 
		   pais_IdExpedicion, 
		   pais.pais_Nombre                  AS PaisNombre,
		   conduc.tran_Id, 
		   trans.marca_Id,
		   conduc.usua_UsuarioCreacion, 
		   usuCrea.usua_Nombre               AS usuarioCreacionNombre,
		   cont_FechaCreacion, 
		   conduc.usua_UsuarioModificacion, 
		   usuModi.usua_Nombre               AS usuarioModificacionNombre,
		   cont_FechaModificacion, 
		   conduc.usua_UsuarioEliminacion,
		   usuElim.usua_Nombre				 AS usuarioEliminacionNombre,
		   conduc.cont_FechaEliminacion,
		   cont_Estado
	FROM   Adua.tbConductor conduc 
		   LEFT JOIN acce.tbUsuarios usuCrea ON conduc.usua_UsuarioCreacion = usuCrea.usua_Id
		   LEFT JOIN acce.tbUsuarios usuModi ON conduc.usua_UsuarioModificacion = usuModi.usua_Id
		   LEFT JOIN Acce.tbUsuarios usuElim ON conduc.usua_UsuarioEliminacion = usuElim.usua_Id
		   LEFT JOIN Adua.tbTransporte trans ON conduc.tran_Id = trans.tran_Id
		   LEFT JOIN Gral.tbPaises		pais ON conduc.pais_IdExpedicion = pais.pais_Id
	WHERE  cont_Estado = 1
END
GO



/*Insertar Conductor*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbConductor_Insert 
	@cont_Nombre           NVARCHAR(200), 
	@cont_Apellido         NVARCHAR(200), 
	@cont_Licencia         NVARCHAR(50), 
	@pais_IdExpedicion     INT, 
	@tran_Id               INT, 
	@usua_UsuarioCreacion  INT, 
	@cont_FechaCreacion    DATETIME	
AS 
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbConductor(cont_Nombre,cont_Apellido, cont_Licencia, 
		  pais_IdExpedicion, tran_Id, usua_UsuarioCreacion, cont_FechaCreacion)
		VALUES(
		  @cont_Nombre, 
		  @cont_Apellido, 
		  @cont_Licencia, 
		  @pais_IdExpedicion, 
		  @tran_Id, 
		  @usua_UsuarioCreacion, 
		  @cont_FechaCreacion
		);
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

/*Editar conductor*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbConductor_Editar  
	@cont_Id                   INT,
	@cont_Nombre               NVARCHAR(200), 
	@cont_Apellido             NVARCHAR(200), 
	@cont_Licencia             NVARCHAR(50), 
	@pais_IdExpedicion         INT, 
	@tran_Id                   INT, 
	@usua_UsuarioModificacion  INT, 
	@cont_FechaModificacion    DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbConductor
		SET cont_Licencia             = @cont_Licencia,
			cont_Nombre               = @cont_Nombre, 
			cont_Apellido             = @cont_Apellido, 
			pais_IdExpedicion         = @pais_IdExpedicion, 
			tran_Id                   = @tran_Id, 
			usua_UsuarioModificacion  = @usua_UsuarioModificacion, 
			cont_FechaModificacion    = @cont_FechaModificacion
		WHERE cont_Id                 = @cont_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--/*Eliminar  Conductor*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbConductor_Eliminar 
	@cont_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@cont_FechaEliminacion	    DATETIME
AS
BEGIN
	BEGIN TRY

		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'cont_Id', @cont_Id, 'Adua.tbConductor', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
		IF(@respuesta) = 1
			BEGIN
					UPDATE Adua.tbConductor
				SET		cont_Estado = 0, 
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						cont_FechaEliminacion   = @cont_FechaEliminacion
				WHERE cont_Id = @cont_Id
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Listar transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTransporte_Listar
AS
BEGIN
	SELECT trans.tran_Id, 
	       trans.pais_Id, 
		   pais.pais_Nombre                     AS paisNombre,
		   trans.tran_Chasis, 
		   trans.marca_Id, 
		   marc.marc_Descripcion                AS marcaDescripcion,
		   trans.tran_Remolque, 
		   trans.tran_CantCarga, 
		   trans.tran_NumDispositivoSeguridad, 
		   trans.tran_Equipamiento, 
		   trans.tran_TipoCarga, 
		   trans.tran_IdContenedor, 
		   trans.usua_UsuarioCreacio,
		   usuCrea.usua_Nombre                  AS usuarioCreacionNombre,
		   trans.tran_FechaCreacion, 
		   trans.usua_UsuarioModificacion,  
		   usuModi.usua_Nombre                  AS usuarioModificacionNombre,
		   trans.tran_FechaModificacion,
		   trans.usua_UsuarioEliminacion,
		   usuElim.usua_Nombre					AS usuarioEliminacionNombre,
		   trans.trant_FechaEliminacion,
		   trans.tran_Estado
	 FROM  Adua.tbTransporte trans  
		   LEFT JOIN acce.tbUsuarios usuCrea	ON trans.usua_UsuarioCreacio = usuCrea.usua_Id
		   LEFT JOIN acce.tbUsuarios usuModi	ON trans.usua_UsuarioModificacion = usuModi.usua_Id
		   LEFT JOIN Acce.tbUsuarios usuElim	ON trans.usua_UsuarioEliminacion = usuElim.usua_Id		   
		   LEFT JOIN Gral.tbPaises pais			ON trans.pais_Id = pais.pais_Id
		   LEFT JOIN Adua.tbMarcas marc			ON trans.marca_Id = marc.marc_Id
END
GO

/*Insertar transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTransporte_Insert 
	 @pais_Id                      INT,
	 @tran_Chasis                  NVARCHAR(100) ,
	 @marca_Id                     INT, 
	 @tran_IdRemolque              NVARCHAR(50),
	 @tran_CantCarga               INT, 
	 @tran_NumDispositivoSeguridad INT,
	 @tran_Equipamiento            NVARCHAR(200), 
	 @tran_TipoCarga               NVARCHAR(200),
	 @tran_IdContenedor            NVARCHAR(100), 
	 @usua_UsuarioCreacio          INT, 
	 @tran_FechaCreacion           DATETIME
AS 
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbTransporte(pais_Id,
										tran_Chasis, 
										marca_Id, 
										tran_Remolque, 
										tran_CantCarga, 
										tran_NumDispositivoSeguridad, 
										tran_Equipamiento, 
										tran_TipoCarga,
										tran_IdContenedor, 
										usua_UsuarioCreacio, 
										tran_FechaCreacion)
		VALUES(@pais_Id,
				@tran_Chasis, 
				@marca_Id, 
				@tran_IdRemolque, 
				@tran_CantCarga, 
				@tran_NumDispositivoSeguridad, 
				@tran_Equipamiento, 
				@tran_TipoCarga,
				@tran_IdContenedor, 
				@usua_UsuarioCreacio, 
				@tran_FechaCreacion);	
		SELECT 1		
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

/*Editar transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTransporte_Editar 
	@tran_Id                       INT,
	@pais_Id                       INT,
	@tran_Chasis                   NVARCHAR(100), 
	@marca_Id                      INT, 
	@tran_IdRemolque               NVARCHAR(50), 
	@tran_CantCarga                INT , 
	@tran_NumDispositivoSeguridad  INT, 
	@tran_Equipamiento             NVARCHAR(200) , 
	@tran_TipoCarga                NVARCHAR(200) , 
	@tran_IdContenedor             NVARCHAR(200),  
	@usua_UsuarioModificacion      INT, 
	@tran_FechaModificacion        DATETIME 
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbTransporte
		SET  pais_Id                      = @pais_Id, 
			 marca_Id                     = @marca_Id, 
			 tran_Chasis                  = @tran_Chasis,
			 tran_Remolque                = @tran_IdRemolque, 
			 tran_CantCarga               = @tran_CantCarga, 
			 tran_NumDispositivoSeguridad = @tran_NumDispositivoSeguridad,
			 tran_Equipamiento            = @tran_Equipamiento, 
			 tran_TipoCarga               = @tran_TipoCarga, 
			 tran_IdContenedor            = @tran_IdContenedor, 
			 usua_UsuarioModificacion     = @usua_UsuarioModificacion, 
			 tran_FechaModificacion       = @tran_FechaModificacion
		WHERE tran_Id                      = @tran_Id

		SELECT 1
		
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Listar marcas*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbMarcas_Listar
AS
BEGIN
	SELECT marca.marc_Id, 
	       marca.marc_Descripcion, 
		   marca.usua_UsuarioCreacion, 
		   usuCrea.usua_Nombre					AS usuarioCreacionNombre,
		   marca.marc_FechaCreacion, 
		   marca.usua_UsuarioModificacion, 
		   usuModi.usua_Nombre					AS usuarioModificacionNombre,
		   marca.marc_FechaModificacion, 
		   marca.marc_Estado
	 FROM  Adua.tbMarcas marca 
		   LEFT JOIN acce.tbUsuarios usuCrea	ON marca.usua_UsuarioCreacion = usuCrea.usua_Id
		   LEFT JOIN acce.tbUsuarios usuModi	ON marca.usua_UsuarioModificacion = usuModi.usua_Id
	WHERE  marc_Estado = 1
END
GO

/*Insertar Marcas*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbMarcas_Insertar 
	@marc_Descripcion		NVARCHAR(20),
	@usua_UsuarioCreacion	INT,
	@marc_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY
		INSERT INTO Adua.tbMarcas (marc_Descripcion, usua_UsuarioCreacion, marc_FechaCreacion)
		VALUES(@marc_Descripcion, @usua_UsuarioCreacion, @marc_FechaCreacion)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

/*Editar Marcas*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbMarcas_Editar 
	@marc_Id					INT,
	@marc_Descripcion			NVARCHAR(20),
	@usua_UsuarioModificacion	INT,
	@marc_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Adua.tbMarcas
		SET		marc_Descripcion = @marc_Descripcion
		WHERE	marc_Id = @marc_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Eliminar Marcas*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbMarcas_Eliminar
	@marc_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@marc_FechaEliminacion		DATETIME
AS
BEGIN
	SET @marc_FechaEliminacion = GETDATE();
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'marc_Id', @marc_Id, 'Adua.tbMarcas', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Adua.tbMarcas
				SET		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						marc_FechaEliminacion = @marc_FechaEliminacion,
						marc_Estado = 0
				WHERE marc_Id = @marc_Id
				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Listar Tipos Identificacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTiposIdentificacion_Listar
AS
BEGIN
	SELECT identi.iden_Id,
	       identi.iden_Descripcion, 
		   identi.usua_UsuarioCreacion, 
		   usuCrea.usua_Nombre					AS usuarioCreacionNombre,
		   identi.iden_FechaCreacion, 
		   identi.iden_FechaModificacion, 
		   usuModi.usua_Nombre					AS usuarioModificacionNombre,
		   identi.iden_FechaModificacion, 
		   identi.usua_UsuarioEliminacion,
		   usuElim.usua_Nombre					AS usuarioEliminacionNombre,
           iden_FechaEliminacion,
		   identi.iden_Estado
	  FROM Adua.tbTiposIdentificacion identi 
		   LEFT JOIN acce.tbUsuarios usuCrea	ON identi.usua_UsuarioCreacion	 = usuCrea.usua_Id
		   LEFT JOIN acce.tbUsuarios usuModi	ON identi.usua_UsuarioModificacion = usuModi.usua_Id
		   LEFT JOIN acce.tbUsuarios usuElim	ON identi.usua_UsuarioEliminacion = usuElim.usua_Id
     WHERE iden_Estado = 1
END
GO

/*Insertar Tipos Identificacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTiposIdentificacion_Insertar 
	@iden_Descripcion		NVARCHAR(75),
	@iden_UsuCrea	        INT,
	@iden_FechaCrea         DATETIME
AS 
BEGIN
	
	BEGIN TRY
		INSERT INTO Adua.tbTiposIdentificacion(iden_Descripcion, usua_UsuarioCreacion, iden_FechaCreacion)
		VALUES(@iden_Descripcion, @iden_UsuCrea, @iden_FechaCrea)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO


/*Editar Tipos Identificacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTiposIdentificacion_Editar 
	@iden_Id				INT,
	@iden_Descripcion	    NVARCHAR(150),
	@iden_UsuModifica       INT,
	@iden_FechaModi         DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Adua.tbTiposIdentificacion
		SET		iden_Descripcion = @iden_Descripcion
		WHERE	iden_Id = @iden_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Eliminar Tipos Identificacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTiposIdentificacion_Eliminar 
	@iden_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@iden_FechaEliminacion		DATETIME
AS
BEGIN
	SET @iden_FechaEliminacion = GETDATE();
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'iden_Id', @iden_Id, 'Adua.tbTiposIdentificacion', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Adua.tbTiposIdentificacion
				SET		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						iden_FechaEliminacion = @iden_FechaEliminacion,
						iden_Estado = 0
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
--
-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS MÓDULO PRODUCCION
--
/*Listar Proceso*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Listar
AS
BEGIN
SELECT	proc_Id								,
		proc_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,			 
		proc_FechaCreacion					,
		modi.usua_Nombre  					AS usuarioModificacion,
		proc_FechaModificacion				,
		elim.usua_Nombre 					AS usuarioEliminacion,
		proc_FechaEliminacion				,
		proc_Estado							
FROM	Prod.tbProcesos pro					
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = pro.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = pro.usua_UsuarioModificacion 
		LEFT JOIN Acce.tbUsuarios elim		ON elim.usua_Id = pro.usua_UsuarioEliminacion 
WHERE	proc_Estado = 1
END
GO
/*Insertar Proceso*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Insertar
@proc_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@proc_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
			INSERT INTO Prod.tbProcesos(proc_Descripcion,usua_UsuarioCreacion,proc_FechaCreacion)
			VALUES (
			@proc_Descripcion,		
			@usua_UsuarioCreacion,	
			@proc_FechaCreacion
			)
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Editar Proceso*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Editar
@proc_ID					INT,
@proc_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@proc_FechaCreacion			DATETIME
AS
BEGIN
	BEGIN TRY
			UPDATE Prod.tbProcesos
			SET proc_Descripcion = @proc_Descripcion,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			proc_FechaModificacion = @proc_FechaCreacion
			WHERE proc_ID = @proc_ID
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Eliminar Proceso*/
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
/*Listar Area*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Listar
AS
BEGIN
SELECT	tipa_Id							,
		tipa_area						,
		pro.proc_Id						,
		pro.proc_Descripcion			,
		crea.usua_Nombre 				AS usarioCreacion,			 
		tipa_FechaCreacion				,
		modi.usua_Nombre  				AS usuarioModificacion,
		tipa_FechaModificacion			,
		elim.usua_Nombre 				AS usuarioEliminacion,
		tipa_FechaEliminacion			,
		tipa_Estado 					
FROM	Prod.tbArea area 
		INNER JOIN Prod.tbProcesos pro	ON area.proc_Id = pro.proc_Id  
		INNER JOIN Acce.tbUsuarios crea ON crea.usua_Id = area.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi	ON modi.usua_Id = area.usua_UsuarioModificacion 
		LEFT JOIN Acce.tbUsuarios elim	ON elim.usua_Id = area.usua_UsuarioEliminacion 
WHERE	tipa_Estado = 1
END
GO
/*Insertar Area*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Insertar
@tipa_area				NVARCHAR(200),
@proc_Id				INT,
@usua_UsuarioCreacion	INT,
@tipa_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbArea(tipa_area,proc_Id,usua_UsuarioCreacion,tipa_FechaCreacion)
		VALUES (
		@tipa_area,				
		@proc_Id,				
		@usua_UsuarioCreacion,	
		@tipa_FechaCreacion				
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Editar Area*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Editar
@tipa_Id					INT,
@tipa_area					NVARCHAR(200),
@proc_Id					INT,
@usua_UsuarioModificacion	INT,
@tipa_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
			UPDATE Prod.tbArea
			SET tipa_area = @tipa_area,
			proc_Id = @proc_Id,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			tipa_FechaModificacion = @tipa_FechaModificacion
			WHERE tipa_Id = @tipa_Id	
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Eliminar Area*/
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

/*Listar Talla*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Listar
AS
BEGIN
SELECT	tall_Id								,
		tall_Codigo							,
		tall_Nombre							,			 
		crea.usua_Nombre					AS usarioCreacion,
		tall_FechaCreacion					,
		modi.usua_Nombre 					AS usuarioModificacion,
		tall_FechaModificacion 				,
		tall_Estado							
FROM	Prod.tbTallas tall 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tall.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tall.usua_UsuarioModificacion 
WHERE	tall_Estado = 1
END
GO
/*Insertar Talla*/
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
/*Editar Talla*/
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
		SET tall_Nombre				= @tall_Nombre,
		tall_Codigo					= @tall_Codigo,
		usua_UsuarioModificacion	= @usua_UsuarioModificacion,
		tall_FechaModificacion		= @tall_FechaModificacion
		WHERE tall_Id				= @tall_Id
			SELECT 1
END TRY
BEGIN CATCH
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH

END
GO
/*Listar Tipo Embalaje*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Listar
AS
BEGIN
SELECT	tiem_Id								,
		tiem_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,			 
		tiem_FechaCreacion					,
		modi.usua_Nombre 					AS usuarioModificacion,
		tiem_FechaModificacion				,
		elim.usua_Nombre 					AS usuarioEliminacion,
		tiem_FechaEliminacion				,
		tiem_Estado 						
FROM	Prod.tbTipoEmbalaje tiem 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tiem.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tiem.usua_UsuarioModificacion 
		LEFT JOIN Acce.tbUsuarios elim		ON elim.usua_Id = tiem.usua_UsuarioEliminacion
WHERE	tiem_Estado = 1
END
GO
/*Insertar Tipo Embalaje*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Insertar
@tiem_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tiem_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbTipoEmbalaje (tiem_Descripcion, usua_UsuarioCreacion, tiem_FechaCreacion)
		VALUES (
		@tiem_Descripcion,
		@usua_UsuarioCreacion,
		@tiem_FechaCreacion
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
/*Editar Tipo Embalaje*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Editar
@tiem_Id					INT,
@tiem_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tiem_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbTipoEmbalaje
		SET tiem_Descripcion = @tiem_Descripcion,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		tiem_FechaModificacion = @tiem_FechaModificacion
		WHERE tiem_Id = @tiem_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
/*Eliminar Tipo Embalaje*/
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

/*Listar ORDEN ENSABLAJE ACBADO ETIQUEDATO*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbOrde_Ensa_Acab_Etiq_Listar
AS
BEGIN
SELECT	ensa_Id, 
		ensa_Cantidad, 
		emp.empl_Id, 
		CONCAT(emp.empl_Nombres ,' ',emp.empl_Apellidos) AS empl_NombreCompleto,
		ocd.code_Id, 
		ocd.code_Sexo,
		est.esti_Id,
		est.esti_Descripcion,
		ensa_FechaInicio, 
		ensa_FechaLimite, 
		pp.ppro_Id, 
		crea.usua_Nombre							AS usua_UsurioCreacion, 
		ensa_FechaCreacion,							
		modi.usua_Nombre							AS usua_UsuarioModificacion, 
		ensa_FechaModificacion, 
		ensa_Estado
FROM	Prod.tbOrde_Ensa_Acab_Etiq ensa
		INNER JOIN Gral.tbEmpleados emp				ON emp.empl_Id  = ensa.empl_Id
		INNER JOIN Prod.tbOrdenCompraDetalles ocd	ON ocd.code_Id  = ensa.code_Id
		INNER JOIN Prod.tbEstilos est				ON est.esti_Id	= ocd.esti_Id
		INNER JOIN Prod.tbPedidosProduccion pp		ON pp.ppro_Id   = ensa.ppro_Id
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = ensa.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = ensa.usua_UsuarioModificacion 

END
GO
/*Insertar ORDEN ENSABLAJE ACBADO ETIQUEDATO*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbOrde_Ensa_Acab_Etiq_Insertar
@ensa_Cantidad			INT,
@empl_Id				INT,
@code_Id				INT,
@ensa_FechaInicio		DATE,	
@ensa_FechaLimite		DATE,
@ppro_Id				INT,
@usua_UsuarioCreacion	INT,
@ensa_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbOrde_Ensa_Acab_Etiq (ensa_Cantidad,			empl_Id, 
												code_Id,				ensa_FechaInicio, 
												ensa_FechaLimite,		ppro_Id, 
												usua_UsuarioCreacion,	ensa_FechaCreacion)
		VALUES (
		@ensa_Cantidad,			
		@empl_Id, 
		@code_Id,				
		@ensa_FechaInicio, 
		@ensa_FechaLimite,		
		@ppro_Id, 
		@usua_UsuarioCreacion,	
		@ensa_FechaCreacion
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
/*Editar ORDEN ENSABLAJE ACBADO ETIQUEDATO*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbOrde_Ensa_Acab_Etiq_Editar
@ensa_Id					INT,
@ensa_Cantidad				INT,
@empl_Id					INT,
@code_Id					INT,
@ensa_FechaInicio			DATE,	
@ensa_FechaLimite			DATE,
@ppro_Id					INT,
@usua_UsuarioModificacion	INT,
@ensa_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbOrde_Ensa_Acab_Etiq
		SET		ensa_Cantidad			= @ensa_Cantidad,			
				empl_Id					= @empl_Id, 
				code_Id					= @code_Id,				
				ensa_FechaInicio		= @ensa_FechaInicio, 
				ensa_FechaLimite		= @ensa_FechaLimite,		
				ppro_Id					= @ppro_Id, 
				usua_UsuarioCreacion	= @usua_UsuarioModificacion,	
				ensa_FechaCreacion		= @ensa_FechaModificacion
		WHERE	ensa_Id					= @ensa_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO

/*Listar subcategoria*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbSubcategoria_Listar
AS
BEGIN
	SELECT subc.subc_Id,
           subc.cate_Id, 
	       cate.cate_Descripcion					AS categoriaDescripcion,
	       subc.subc_Descripcion, 
	       subc.usua_UsuarioCreacion,
	       usuaCrea.usua_Nombre						AS usuarioCreacionNombre,
	       subc.subc_FechaCreacion, 
	       subc.usua_UsuarioModificacion, 
	       usuaModifica.usua_Nombre					AS usuarioModificaNombre,
	       subc.subc_FechaModificacion, 
           subc.usua_UsuarioEliminacion,
		   usuaElim.usua_Nombre                     AS usuarioEliminaNombre,                   
           subc_FechaEliminacion,
	       subc.subc_Estado
      FROM Prod.tbSubcategoria subc 
	       INNER JOIN Acce.tbUsuarios usuaCrea      ON subc.usua_UsuarioCreacion = usuaCrea.usua_Id 
		   LEFT JOIN Acce.tbUsuarios usuaModifica   ON subc.usua_UsuarioModificacion = usuaModifica.usua_Id 
		   LEFT JOIN Acce.tbUsuarios usuaElim       ON subc.usua_UsuarioEliminacion = usuaElim.usua_Id 
		   INNER JOIN Prod.tbCategoria cate         ON subc.cate_Id = cate.cate_Id
	 WHERE subc_Estado = 1
END
GO

/*Insertar subcategoria*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbSubcategoria_Insertar
	@cate_Id			    INT,
	@subc_Descripcion       NVARCHAR(200),
	@usua_UsuarioCreacion	INT,
	@usua_FechaCreacion     DATETIME
AS 
BEGIN
	
	BEGIN TRY
		INSERT INTO Prod.tbSubcategoria (cate_Id, subc_Descripcion, usua_UsuarioCreacion, subc_FechaCreacion)
		VALUES(@cate_Id, @subc_Descripcion, @usua_UsuarioCreacion, @usua_FechaCreacion)
		
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

/*Editar subcategoria*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbSubcategoria_Editar
	@subc_Id                   INT,
	@cate_Id                   INT, 
	@subc_Descripcion          NVARCHAR(200), 
	@usua_UsuarioModificacion  INT, 
	@subc_FechaModificacion    DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Prod.tbSubcategoria
		SET		cate_Id                  = @cate_Id,
		        subc_Descripcion         = @subc_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				subc_FechaModificacion   = @subc_FechaModificacion
		WHERE	subc_Id = @subc_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Eliminar subcategoria*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbSubcategoria_Eliminar
	@subc_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@subc_FechaEliminacion		DATETIME
AS
BEGIN
	SET @subc_FechaEliminacion = GETDATE();
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'subc_Id', @subc_Id, 'Prod.tbSubcategoria', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Prod.tbSubcategoria
				SET		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						subc_FechaEliminacion = @subc_FechaEliminacion,
						subc_Estado = 0
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Listar materiales*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMateriales_Listar
AS
BEGIN
	SELECT mate.mate_Id,
           mate.mate_Descripcion, 
	       mate.subc_Id,
	       subc.subc_Descripcion						AS subcategoriaDescripcion,
	       mate.mate_Precio, 
	       mate.usua_UsuarioCreacion, 
	       usuaCrea.usua_Nombre							AS usuarioCreacionNombre,
	       mate.mate_FechaCreacion, 
	       mate.usua_UsuarioModificacion, 
	       usuaModifica.usua_Nombre						AS usuarioModificaNombre,
	       mate.mate_Estado
      FROM Prod.tbMateriales mate 
	       INNER JOIN Acce.tbUsuarios usuaCrea			ON mate.usua_UsuarioCreacion = usuaCrea.usua_Id 
	       LEFT JOIN Acce.tbUsuarios usuaModifica		ON mate.usua_UsuarioModificacion = usuaCrea.usua_Id 
	       INNER JOIN Prod.tbSubcategoria subc			ON mate.subc_Id = subc.subc_Id
	 WHERE mate_Estado = 1
END
GO

/*Insertar materiales*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMateriales_Insertar
	 @mate_Descripcion         NVARCHAR(200),
	 @subc_Id                  INT,
	 @mate_Precio              DECIMAL(18,2), 
	 @usua_UsuarioCreacion     INT, 
	 @mate_FechaCreacion       DATETIME
AS 
BEGIN
	
	BEGIN TRY
		INSERT INTO Prod.tbMateriales (mate_Descripcion, subc_Id, mate_Precio, usua_UsuarioCreacion, mate_FechaCreacion)
		VALUES(@mate_Descripcion, @subc_Id, @mate_Precio, @usua_UsuarioCreacion, @mate_FechaCreacion)
		
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

/*Editar material*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMateriales_Editar
	@mate_Id                   INT,
	@mate_Descripcion          NVARCHAR(200), 
	@subc_Id                   INT, 
	@mate_Precio               DECIMAL(18,2), 
	@usua_UsuarioModificacion  INT, 
	@mate_FechaModificacion    DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Prod.tbMateriales
		SET		mate_Descripcion         = @mate_Descripcion,
		        subc_Id                  = @subc_Id,
				mate_Precio              = @mate_Precio,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				mate_FechaModificacion   = @mate_FechaModificacion
		WHERE	mate_Id = @mate_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Eliminar materiales*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbMateriales_Eliminar
	@mate_Id					INT	
AS
BEGIN
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'mate_Id', @mate_Id, 'Prod.tbMateriales', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Prod.tbMateriales
				   SET	mate_Estado = 0
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

/*Listar inspecciones estado*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbInspeccionesEstado_Listar
AS
BEGIN
	SELECT insp.ines_Id,
           insp.reca_Id, 
	       revi.reca_Descripcion						AS revisionDescripcion,
	       insp.usua_UsuarioCreacion, 
	       usuaCrea.usua_Nombre							AS usuarioCreacionNombre,
	       insp.ines_FechaCreacion, 
	       insp.usua_UsuarioModificacion, 
	       usuaModifica.usua_Nombre						AS usuarioModificaNombre,
	       insp.ines_FechaModificacion,
		   insp.usua_UsuarioEliminacion,
           ines_FechaEliminacion,
		   usuaElimi.usua_Nombre                        AS usuarioEliminaNombre,
	       insp.ines_Estado   
      FROM Prod.tbInspeccionesEstado insp 
	       INNER JOIN Acce.tbUsuarios usuaCrea			ON insp.usua_UsuarioCreacion     = usuaCrea.usua_Id 
		   LEFT JOIN  Acce.tbUsuarios usuaModifica		ON insp.usua_UsuarioModificacion = usuaModifica.usua_Id 
		   LEFT JOIN  Acce.tbUsuarios usuaElimi		    ON insp.usua_UsuarioEliminacion  = usuaElimi.usua_Id 
		   INNER JOIN Prod.tbRevisionDeCalidad revi		ON insp.reca_Id = revi.reca_Id
	 WHERE ines_Estado = 1
END
GO

/*Insertar inspecciones estado*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbInspeccionesEstado_Insertar
	 @reca_Id                INT, 
	 @usua_UsuarioCreacion   INT, 
	 @ines_FechaCreacion     DATETIME 
AS 
BEGIN
	
	BEGIN TRY
			INSERT INTO Prod.tbInspeccionesEstado(reca_Id, usua_UsuarioCreacion, ines_FechaCreacion)
			VALUES(@reca_Id, @usua_UsuarioCreacion, @ines_FechaCreacion)
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

/*Editar inspecciones estado*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbInspeccionesEstado_Editar
	@ines_Id                   INT,
	@reca_Id                   INT, 
	@usua_UsuarioModificacion  INT, 
	@ines_FechaModificacion    DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Prod.tbInspeccionesEstado
		SET		reca_Id                  = @reca_Id,
		        usua_UsuarioModificacion = @usua_UsuarioModificacion,
				ines_FechaModificacion   = @ines_FechaModificacion
		WHERE	ines_Id = @ines_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
/*Eliminar inspecciones estado*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbInspeccionesEstado_Eliminar
	@ines_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@ines_FechaEliminacion		DATETIME
AS
BEGIN
	SET @ines_FechaEliminacion = GETDATE();
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'ines_Id', @ines_Id, 'Prod.tbInspeccionesEstado', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Prod.tbInspeccionesEstado
				SET		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						ines_FechaEliminacion = @ines_FechaEliminacion,
						ines_Estado = 0
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
