
USE SIMEXPRO
GO

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
	SELECT usua.usua_Id, 
		   usua.usua_Nombre, 
		   usua.usua_Contrasenia, 
		   usua.usua_Correo, 
		   usua.role_Id,
		   rol.role_Descripcion, 
		   usua.usua_EsAdmin,
		   usua.empl_Id,
		   (empl_Nombres + ' ' + empl_Apellidos) AS empleadoNombreCompleto, 
		   usua.usua_UsuarioCreacion, 
		   usuaCrea.usua_Nombre AS usuarioCreacionNombre,
		   usua.usua_FechaCreacion, 
	       usua.usua_UsuarioModificacion, 
		   usuaModifica.usua_Nombre AS usuarioModificacionNombre, 
		   usua.usua_FechaModificacion,
		   usuaElimina.usua_Nombre AS usuarioEliminacionNombre, 
		   usua.usua_FechaEliminacion,
		   usua.usua_Estado,
		   empl.empl_CorreoElectronicO	
	FROM Acce.tbUsuarios usua LEFT JOIN Acce.tbRoles rol
	ON usua.role_Id = rol.role_Id
	LEFT JOIN Gral.tbEmpleados empl
	ON empl.empl_Id = usua.empl_Id 
	LEFT JOIN acce.tbUsuarios usuaCrea
	ON usua.usua_UsuarioCreacion = usuaCrea.usua_Id
	LEFT JOIN acce.tbUsuarios usuaModifica
	ON usua.usua_UsuarioModificacion = usuaModifica.usua_Id LEFT JOIN acce.tbUsuarios usuaElimina
	ON usua.usua_UsuarioEliminacion = usuaElimina.usua_Id
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


--************PAISES******************--
/*Listar PAISES*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Listar
AS
BEGIN
	
SELECT	pais_Id								,
		pais_Codigo							,
		pais_Nombre							,
		pais.usua_UsuarioCreacion			,
		usua.usua_Nombre					AS UsuarioCreacionNombre,
		pais_FechaCreacion					, 
		pais.usua_UsuarioModificacion		,
		usua2.usua_Nombre					AS UsuarioModificadorNombre,
		pais_FechaModificacion				,
		pais_Estado							
FROM	Gral.tbPaises pais						 
		INNER JOIN Acce.tbUsuarios usua		ON pais.usua_UsuarioCreacion = usua.usua_Id 
		LEFT JOIN  Acce.tbUsuarios usua2	ON pais.usua_UsuarioModificacion = usua2.usua_Id
WHERE	pais_Estado = 1
END
GO
/*Insertar PAISES*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Insertar
	@pais_Codigo				CHAR(2), 
	@pais_Nombre				NVARCHAR(150), 
	@usua_UsuarioCreacion		INT,
	@pais_FechaCreacion			DATETIME

AS
BEGIN
	BEGIN TRY 
		IF EXISTS (SELECT * FROM Gral.tbPaises WHERE @pais_Nombre = pais_Nombre		
				   AND pais_Estado = 0)
		BEGIN
			UPDATE Gral.tbPaises
			SET	  pais_Estado = 1
			WHERE pais_Nombre = @pais_Nombre

			SELECT 1
		END
		ELSE
		BEGIN
			INSERT INTO Gral.tbPaises (pais_Codigo, pais_Nombre, usua_UsuarioCreacion, pais_FechaCreacion)
			VALUES (@pais_Codigo, @pais_Nombre, @usua_UsuarioCreacion, @pais_FechaCreacion)
			SELECT 1
		END

	END TRY

	BEGIN CATCH
		SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO
/*Editar Paises*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Editar
	@pais_Id						INT,
	@pais_Codigo					CHAR(2),
	@pais_Nombre					NVARCHAR(150), 
	@usua_UsuarioModificacion		INT,
	@pais_FechaModificacion	DATETIME

AS
BEGIN

	BEGIN TRY		
		UPDATE Gral.tbPaises
		SET pais_Nombre = @pais_Nombre,pais_Codigo = @pais_Codigo, 
		usua_UsuarioModificacion = @usua_UsuarioModificacion, pais_FechaModificacion = @pais_FechaModificacion
		WHERE pais_Id = @pais_Id
		SELECT 1
	END TRY
BEGIN CATCH
		SELECT 'Error Message: '+ ERROR_MESSAGE();
END CATCH
END
GO
--************CIUDADES******************--
/*Listar Paises*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Listar
AS
BEGIN
SELECT	ciud_Id								,
		ciud_Nombre							,
		ciu.pvin_Id							,
		provi.pvin_Nombre					,
		provi.pvin_Codigo					,
		pais.pais_Codigo					,
		pais.pais_Nombre					,
		ciu.usua_UsuarioCreacion			,
		usu1.usua_Nombre					AS UsuarioCreacionNombre,
		ciud_FechaCreacion					, 
		ciu.usua_UsuarioModificacion		,
		usu2.usua_Nombre					AS UsuarioModificadorNombre,
		ciud_FechaModificacion				,
		ciud_Estado
FROM	[Gral].[tbCiudades] ciu					
		INNER JOIN Acce.tbUsuarios usu1			ON ciu.usua_UsuarioCreacion = usu1.usua_Id		
		LEFT JOIN  Acce.tbUsuarios  usu2		ON ciu.usua_UsuarioModificacion = usu2.usua_Id	
		INNER JOIN Gral.tbProvincias provi		ON ciu.pvin_Id = provi.pvin_Id					
		INNER JOIN Gral.tbPaises pais			ON provi.pais_Id = pais.pais_Id
WHERE	ciud_Estado = 1
END
GO
/*Insertar Paises*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Insertar
	@ciud_Nombre				NVARCHAR(150), 
	@pvin_Id					INT, 
	@usua_UsuarioCreacion		INT,
	@ciud_FechaCreacion		    DATETIME
AS
BEGIN
	
	BEGIN TRY
			IF EXISTS (SELECT*FROM [Gral].[tbCiudades] WHERE @ciud_Nombre = ciud_Nombre AND ciud_Estado = 0)
			BEGIN
				UPDATE Gral.tbCiudades SET pvin_Id = @pvin_Id, ciud_Estado = 1 WHERE @ciud_Nombre = ciud_Nombre
				SELECT 1
			END
			ELSE
			BEGIN
				INSERT INTO Gral.tbCiudades (ciud_Nombre, pvin_Id, usua_UsuarioCreacion, ciud_FechaCreacion)
				VALUES (@ciud_Nombre, @pvin_Id, @usua_UsuarioCreacion, @ciud_FechaCreacion)
				SELECT 1
			END
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH

END
GO
/*Editar Paises*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Editar
	@ciud_Id					INT,
	@ciud_Nombre				NVARCHAR(150), 
	@pvin_Id					INT, 
	@usua_UsuarioModificacion	INT,
	@ciud_FechaModificacion		DATETIME
AS
BEGIN 
	
	BEGIN TRY
		UPDATE Gral.tbCiudades SET [ciud_Nombre] = @ciud_Nombre, pvin_Id = @pvin_Id,
		 usua_UsuarioModificacion = @usua_UsuarioModificacion, ciud_FechaModificacion = @ciud_FechaModificacion
		 WHERE ciud_Id = @ciud_Id
		 SELECT 1
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO
--************PROVINCIAS******************--
/*Listar Provincias*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbProvincias_Listar
AS
BEGIN
SELECT	pvin_Id								,
		pvin_Nombre							,
		pvin_Codigo							,
		provin.pais_Id 						,
		pais.pais_Nombre					,
		provin.usua_UsuarioCreacion			,
		usua1.usua_Nombre					AS UsuarioCreacionNombre,
		pvin_FechaCreacion	 				, 
		provin.usua_UsuarioModificacion		,
		usua2.usua_Nombre					AS UsuarioModificadorNombre,
		pvin_FechaModificacion				,
		pvin_Estado
FROM	[Gral].[tbProvincias] provin				
		INNER JOIN Gral.tbPaises pais		ON provin.pais_Id =  pais.pais_Id		
		INNER JOIN Acce.tbUsuarios usua1	ON provin.usua_UsuarioCreacion = usua1.usua_Id	
		LEFT JOIN Acce.tbUsuarios usua2		ON provin.usua_UsuarioModificacion = usua2.usua_Id 
WHERE	pvin_Estado = 1
END
GO
/*Editar Provincias*/
CREATE OR ALTER PROCEDURE GrAL.UDP_tbProvincias_Insertar
 @pvin_Nombre				NVARCHAR(150), 
 @pvin_Codigo				NVARCHAR(20), 
 @pais_Id					INT, 
 @usua_UsuarioCreacion		INT,
 @pvin_FechaCreacion		DATETIME

AS
BEGIN
	
	BEGIN TRY
		IF EXISTS (SELECT*FROM Gral.tbProvincias WHERE pvin_Nombre = @pvin_Nombre AND pvin_Estado = 0)
		BEGIN
			UPDATE Gral.tbProvincias SET pvin_Estado = 1 WHERE  @pvin_Nombre = pvin_Nombre
		SELECT 1
		END
		ELSE
		BEGIN
			INSERT INTO Gral.tbProvincias (pvin_Nombre, pvin_Codigo, pais_Id, usua_UsuarioCreacion, pvin_FechaCreacion)
			VALUES(@pvin_Nombre, @pvin_Codigo, @pais_Id, @usua_UsuarioCreacion, @pvin_FechaCreacion)
			SELECT 1
		END		
	END TRY

	BEGIN CATCH 
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO
/*Eliminar Provincias*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbProvinvias_Editar
 @pvin_Id						INT,
 @pvin_Nombre					NVARCHAR(150), 
 @pvin_Codigo					NVARCHAR(20), 
 @pais_Id						INT, 
 @usua_UsuarioModificacion		INT,
 @pvin_FechaModificacion		DATETIME

AS
BEGIN
	
	BEGIN TRY
    		UPDATE Gral.tbProvincias SET pvin_Nombre = @pvin_Nombre, pvin_Codigo = @pvin_Codigo, pais_Id = @pais_Id,
			pvin_FechaModificacion = @pvin_FechaModificacion, usua_UsuarioModificacion = @usua_UsuarioModificacion
			WHERE pvin_Id = @pvin_Id
			SELECT 1
		
	END TRY

	BEGIN CATCH
		SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO

--************ALDEAS******************--
/*Listar ALDEAS*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbAldeas_Listar
AS
BEGIN
SELECT	alde_Id								,
		alde_Nombre							,
		alde.ciud_Id						,
		ciu.ciud_Nombre						,
		alde.usua_UsuarioCreacion			,
		usu1.usua_Nombre					AS UsuarioCreacionNombre,
		alde_FechaCreacion	 				, 
		alde.usua_UsuarioModificacion		,
		usu2.usua_Nombre					AS UsuarioModificadorNombre,
		alde_FechaModificacion	 			,
		alde_Estado
FROM	[Gral].[tbAldeas] alde					
		INNER JOIN Gral.tbCiudades ciu		ON alde.ciud_Id = ciu.ciud_Id				
		INNER JOIN Acce.tbUsuarios usu1		ON alde.usua_UsuarioCreacion = usu1.usua_Id 
		LEFT JOIN Acce.tbUsuarios usu2		ON alde.usua_UsuarioCreacion = usu2.usua_Id
WHERE	alde_Estado = 1

END
GO
/*Insertar ALDEAS*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbAldeas_Insertar
 @alde_Nombre				NVARCHAR(150), 
 @ciud_Id					INT, 
 @usua_UsuarioCreacion		INT,
 @alde_FechaCreacion		DATETIME

AS
BEGIN
	
	BEGIN TRY
		IF EXISTS (SELECT *FROM [Gral].[tbAldeas] WHERE [alde_Nombre] = @alde_Nombre AND alde_Estado = 0 )
		BEGIN
			UPDATE Gral.tbAldeas SET alde_Estado = 1, ciud_Id  = @ciud_Id WHERE alde_Nombre = @alde_Nombre 
			SELECT 1
		END
		ELSE 
		BEGIN
			INSERT INTO Gral.tbAldeas (alde_Nombre, ciud_Id, usua_UsuarioCreacion, alde_FechaCreacion)
			VALUES (@alde_Nombre, @ciud_Id, @usua_UsuarioCreacion, @alde_FechaCreacion)
			SELECT 1
		END
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH

END
GO
/*Editar ALDEAS*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbAldeas_Editar
 @alde_Id						INT,
 @alde_Nombre					NVARCHAR(150), 
 @ciud_Id						INT, 
 @usua_UsuarioModificacion		INT,
 @alde_FechaModificacion		DATETIME

AS
BEGIN
		
	BEGIN TRY
		UPDATE Gral.tbAldeas SET alde_Nombre = @alde_Nombre, ciud_Id = @ciud_Id, 
		alde_FechaModificacion = @alde_FechaModificacion, usua_UsuarioModificacion = @usua_UsuarioModificacion
		WHERE alde_Id = @alde_Id
		SELECT 1
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO


--************PROVEEDORES******************--
/*Listar PROVEEDORES*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbProveedores_Listar
AS
BEGIN
SELECT	prov_Id								,
		prov_NombreCompania 				,
		prov_NombreContacto 				,
		prov_Telefono						,
		prov_CodigoPostal 					,
		prov_Ciudad							,
		ciu.ciud_Nombre						,
		provi.pvin_Nombre					,
		pais.pais_Nombre					,
		prov_DireccionExacta 				,
		prov_CorreoElectronico				,
		prov_Fax 							,
		prov.usua_UsuarioCreacion			,
		usu1.usua_Nombre					AS UsuarioCreacionNombre,
		prov_FechaCreacion	 				, 
		prov.usua_UsuarioModificacion		,
		usu2.usua_Nombre					AS UsuarioModificadorNombre,
		prov_FechaModificacion	 			,
		prov_Estado
FROM	Gral.tbProveedores prov					
		INNER JOIN [Gral].[tbCiudades] ciu	ON prov.prov_Ciudad = ciu.ciud_Id				
		INNER JOIN Acce.tbUsuarios usu1		ON prov.usua_UsuarioCreacion = usu1.usua_Id		
		LEFT JOIN  Acce.tbUsuarios usu2		ON prov.usua_UsuarioModificacion = usu2.usua_Id 
		INNER JOIN Gral.tbProvincias provi	ON ciu.pvin_Id = provi.pvin_Id					
		INNER JOIN Gral.tbPaises pais		ON provi.pais_Id = pais.pais_Id
WHERE	[prov_Estado] = 1
END
GO
/*Insertar PROVEEDORES*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbProveedores_Insertar
@prov_NombreCompania			NVARCHAR(200), 
@prov_NombreContacto			NVARCHAR(200), 
@prov_Telefono					NVARCHAR(20), 
@prov_CodigoPostal				VARCHAR(5), 
@prov_Ciudad					INT, 
@prov_DireccionExacta			NVARCHAR(350), 
@prov_CorreoElectronico			NVARCHAR(250), 
@prov_Fax						NVARCHAR(20), 
@usua_UsuarioCreacion			INT,
@prov_FechaCreacion				DATETIME
AS
BEGIN
	
	BEGIN TRY
		IF EXISTS (SELECT*FROM Gral.tbProveedores WHERE prov_NombreCompania = @prov_NombreCompania AND prov_Estado = 0)
		BEGIN
			UPDATE Gral.tbProveedores SET prov_Estado = 1
			SELECT 1
		END
		ELSE
		BEGIN
			INSERT INTO Gral.tbProveedores([prov_NombreCompania], [prov_NombreContacto], [prov_Telefono], [prov_CodigoPostal], [prov_Ciudad], [prov_DireccionExacta], [prov_CorreoElectronico], [prov_Fax], [usua_UsuarioCreacion], [prov_FechaCreacion])
			VALUES(@prov_NombreCompania, @prov_NombreContacto, @prov_Telefono, @prov_CodigoPostal, @prov_Ciudad, @prov_DireccionExacta, @prov_CorreoElectronico, @prov_Fax, @usua_UsuarioCreacion, @prov_FechaCreacion)
			SELECT 1
		END
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO
/*Editar PROVEEDORES*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbProveedores_Editar
@prov_Id						INT,
@prov_NombreCompania			NVARCHAR(200), 
@prov_NombreContacto			NVARCHAR(200), 
@prov_Telefono					NVARCHAR(20), 
@prov_CodigoPostal				VARCHAR(5), 
@prov_Ciudad					INT, 
@prov_DireccionExacta			NVARCHAR(350), 
@prov_CorreoElectronico			NVARCHAR(250), 
@prov_Fax						NVARCHAR(20), 
@usua_UsuarioModificacion		INT,
@prov_FechaModificacion			DATETIME
AS
BEGIN
	
	BEGIN TRY
		
			UPDATE Gral.tbProveedores SET prov_NombreCompania = @prov_NombreCompania, prov_Ciudad = @prov_Ciudad, prov_CodigoPostal = @prov_CodigoPostal,
			prov_CorreoElectronico = @prov_CorreoElectronico, prov_DireccionExacta = @prov_DireccionExacta, prov_NombreContacto = @prov_NombreContacto,
			prov_Fax = @prov_Fax, prov_Telefono = @prov_Telefono, prov_FechaModificacion = @prov_FechaModificacion, usua_UsuarioModificacion = @usua_UsuarioModificacion
			WHERE prov_Id = @prov_Id
			SELECT 1
		
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO
/*Eliminar PROVEEDORES*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbProveedores_Eliminar
(
	@prov_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@prov_FechaEliminacion		DATETIME
)
AS
BEGIN
	
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'prov_Id', @prov_Id, 'Gral.tbProveedores', @respuesta OUTPUT

		
		IF(@respuesta) = 1
			BEGIN
				 UPDATE Gral.tbProveedores
					SET prov_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						prov_FechaEliminacion = @prov_FechaEliminacion
				  WHERE prov_Id = @prov_Id 
					AND prov_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();	
	END CATCH
END
GO

--************FORMAS DE ENVIO******************--
/*Listar FORMAS DE ENVIO*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbFormas_Envio_Listar
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

/*Insertar FORMAS DE ENVIO*/
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
/*Editar FORMAS DE ENVIO*/
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
/*Eliminar FORMAS DE ENVIO*/
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
--************EMPLEADOS******************--
/*Listar EMPLEADOS*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbEmpleados_Listar
AS
BEGIN

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

END
GO

/*Insertar EMPLEADOS*/
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

/*Editar EMPLEADOS*/
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
/*Eliminar EMPLEADOS*/
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








-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS MÓDULO ADUANA


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
			   SET pers_RTN					= @pers_RTN, 					
				   ofic_Id					= @ofic_Id, 					
				   escv_Id					= @escv_Id, 					
				   ofpr_Id					= @ofpr_Id, 					
				   fopr_Id					= @fopr_Id, 					
				   pers_escvRepresentante	= @pers_escvRepresentante, 		
				   pers_OfprRepresentante	= @pers_OfprRepresentante, 		
				   usua_UsuarioCreacion		= @usua_UsuarioCreacion,      	
				   pers_FechaCreacion		= @pers_FechaCreacion
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
			SET pers_Id								= @pers_Id,                           	
				fopr_Id								= @fopr_Id,                           	
				colo_Id								= @colo_Id,                           	
				coin_PuntoReferencia				= @coin_PuntoReferencia,			  	
				coin_ColoniaRepresentante			= @coin_ColoniaRepresentante,		  	
				coin_NumeroLocalReprentante			= @coin_NumeroLocalReprentante,	    
				coin_PuntoReferenciaReprentante		= @coin_PuntoReferenciaReprentante,   	
				coin_TelefonoCelular				= @coin_TelefonoCelular,			    
				coin_TelefonoFijo					= @coin_TelefonoFijo,				    
				coin_CorreoElectronico				= @coin_CorreoElectronico,		    	
				coin_CorreoElectronicoAlternativo	= @coin_CorreoElectronicoAlternativo, 	
				usua_UsuarioCreacion				= @usua_UsuarioCreacion,       		
				coin_FechaCreacion					= @coin_FechaCreacion
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
			SET pers_Id						= @pers_Id,						
				pena_DireccionExacta		= @pena_DireccionExacta,		
				ciud_Id						= @ciud_Id,						
				pena_TelefonoFijo			= @pena_TelefonoFijo,			
				pena_TelefonoCelular		= @pena_TelefonoCelular,		
				pena_CorreoElectronico		= @pena_CorreoElectronico,		
				pena_CorreoAlternativo		= @pena_CorreoAlternativo,		
				pena_RTN					= @pena_RTN,					
				pena_ArchivoRTN				= @pena_ArchivoRTN,				
				pena_DNI					= @pena_DNI,					
				pena_ArchivoDNI				= @pena_ArchivoDNI,				
				pena_NumeroRecibo			= @pena_NumeroRecibo,			
				pena_ArchivoNumeroRecibo	= @pena_ArchivoNumeroRecibo,	  	
				usua_UsuarioModificacion	= @usua_UsuarioModificacion,   	
				pena_FechaModificacion		= @pena_FechaModificacion     	
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
			SET pers_Id								= @pers_Id,							  	
				peju_EstadoRepresentante			= @peju_EstadoRepresentante,				
				colo_Id								= @colo_Id,							  	
				peju_PuntoReferencia				= @peju_PuntoReferencia,					
				peju_ColoniaRepresentante			= @peju_ColoniaRepresentante,				
				peju_NumeroLocalRepresentante		= @peju_NumeroLocalRepresentante,		  	
				peju_PuntoReferenciaRepresentante	= @peju_PuntoReferenciaRepresentante,	  	
				peju_TelefonoEmpresa				= @peju_TelefonoRepresentanteLegal,					
				peju_TelefonoFijoRepresentanteLegal = @peju_TelefonoFijoRepresentanteLegal, 	
				peju_TelefonoRepresentanteLegal		= @peju_TelefonoRepresentanteLegal,	  	
				peju_CorreoElectronico				= @peju_CorreoElectronico,              	
				peju_CorreoElectronicoAlternativo	= @peju_CorreoElectronicoAlternativo,   	
				usua_UsuarioModificacion			= @usua_UsuarioModificacion,       			
				peju_FechaModificacion				= @peju_FechaModificacion
		  WHERE peju_Id = @peju_Id

		  SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO
--------------------------------------------/UDPS Para contrato de adhesión-------------------------------------------

--**********LUGARES EMBARQUE**********--


/*Listar lugares embarque*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbLugaresEmbarque_Listar
AS
BEGIN
	SELECT lugar.emba_Id,
	       lugar.emba_Codigo, 
		   lugar.emba_Descripcion, 
		   lugar.usua_UsuarioCreacion, 
		   usuaCrea.usua_Nombre             AS usuarioCreacionNombre,
		   lugar.emba_FechaCreacion, 
		   lugar.usua_UsuarioModificacion,
		   usuaModifica.usua_Nombre         AS usuarioModificacionNombre,
		   lugar.emba_FechaModificacion, 
		   lugar.usua_UsuarioEliminacion, 
		   usuaElimi.usua_Nombre            AS usuarioEliminacionNombre,
		   lugar.emba_FechaEliminacion, 
		   lugar.emba_Estado   
      FROM Adua.tbLugaresEmbarque lugar
	       INNER JOIN Acce.tbUsuarios usuaCrea			ON lugar.usua_UsuarioCreacion     = usuaCrea.usua_Id 
		   LEFT JOIN  Acce.tbUsuarios usuaModifica		ON lugar.usua_UsuarioModificacion = usuaModifica.usua_Id 
		   LEFT JOIN  Acce.tbUsuarios usuaElimi		    ON lugar.usua_UsuarioEliminacion  = usuaElimi.usua_Id 
	 WHERE emba_Estado = 1
END
GO

/*Insertar lugares embarque*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbLugaresEmbarque_Insertar
	 @emba_Codigo             CHAR(5),
	 @emba_Descripcion        NVARCHAR(200),
	 @usua_UsuarioCreacion    INT, 
	 @emba_FechaCreacion      DATETIME
AS 
BEGIN
	
	BEGIN TRY
		INSERT INTO Adua.tbLugaresEmbarque (emba_Codigo, emba_Descripcion, usua_UsuarioCreacion, emba_FechaCreacion)
		VALUES(@emba_Codigo, @emba_Descripcion, @usua_UsuarioCreacion, @emba_FechaCreacion)
		
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

/*Editar lugares embarque*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbLugaresEmbarque_Editar
	@emba_Id                  INT,
    @emba_Codigo              CHAR(5),
    @emba_Descripcion         NVARCHAR(200),
	@usua_UsuarioModificacion INT,
	@emba_FechaModificacion   DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Adua.tbLugaresEmbarque
		SET		emba_Codigo              = @emba_Codigo,
		        emba_Descripcion         = @emba_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				emba_FechaModificacion   = @emba_FechaModificacion
		WHERE	emba_Id                  = @emba_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

/*Eliminar lugares Embarque*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbLugaresEmbarque_Eliminar
	@emba_Id					INT,
	@usua_UsuarioEliminacion    INT,
	@emba_FechaEliminacion      DATETIME
AS
BEGIN
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'emba_Id', @emba_Id, 'Adua.tbLugaresEmbarque', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Adua.tbLugaresEmbarque
				   SET	emba_Estado             = 0,
				        usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						emba_FechaEliminacion   = @emba_FechaEliminacion
				  WHERE emba_Id                 = @emba_Id 
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

/******************************** Formas de pago*****************************************/

CREATE OR ALTER PROCEDURE Adua.UDP_tbFormadePago_Listar
AS
BEGIN 
SELECT	fopa_Id							,
        fopa_Descripcion				,
		usu.usua_Nombre					AS usarioCreacion,
		fopa_FechaCreacion				,
		usu1.usua_Nombre				AS usuarioModificacion,
		fopa_FechaModificacion			,
		fopa_Estado						
FROM	Adua.tbFormasdePago form 
		INNER JOIN Acce.tbUsuarios usu	ON usu.usua_Id = form.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios usu1	ON usu1.usua_Id = form.usua_UsuarioModificacion   
WHERE	fopa_Estado = 1
END




/**************Crear Formas de pago**********************/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Insertar 
   @fopa_Descripcion        NVARCHAR(MAX), 
   @usua_UsuarioCreacion    INT, 
   @fopa_FechaCreacion      DATETIME
AS
BEGIN
     BEGIN TRY 
	 
	    IF EXISTS(SELECT * FROM Adua.tbFormasdePago WHERE fopa_Descripcion=@fopa_Descripcion 
		 AND fopa_Estado = 0)	 
		 BEGIN 
		    UPDATE Adua.tbFormasdePago
			SET fopa_Estado = 1
			WHERE fopa_Descripcion=@fopa_Descripcion
			SELECT 1
		 END
		ELSE 
		 BEGIN
		    INSERT INTO Adua.tbFormasdePago 
			( fopa_Descripcion, 
			  usua_UsuarioCreacion, 
			  fopa_FechaCreacion  
	 		)
		    VALUES(
	          @fopa_Descripcion ,
			  @usua_UsuarioCreacion,
			  @fopa_FechaCreacion  
			)
         END
		 
		END TRY 
	BEGIN CATCH
	   SELECT 0	
	END CATCH    
END


GO
/********************Editar Formas de pago************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Editar 
   @fopa_id    INT,
   @fopa_Descripcion  NVARCHAR(350),  
   @usua_UsuarioModificacion INT, 
   @fopa_FechaModificacion  DATETIME
AS
BEGIN 
      BEGIN TRY 
	  
	      UPDATE Adua.tbFormasdePago
		  SET fopa_Descripcion = @fopa_Descripcion, 
		      usua_UsuarioModificacion = @usua_UsuarioModificacion,
			  fopa_FechaModificacion = @fopa_FechaModificacion
		  WHERE fopa_Id = @fopa_id
		  SELECT 1
	   END TRY 
	   BEGIN CATCH 
	       SELECT 0
	   END CATCH
END 

go
/****************Eliminar Formas de pago*******************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Eliminar 
	@fopa_id					INT,
	@usua_UsuarioEliminacion	INT,
	@fopa_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'fopa_id', @fopa_id, 'Adua.tbFormasdePago', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE Adua.tbFormasdePago
					SET fopa_Estado = 0,
					    usua_UsuarioEliminacion=@usua_UsuarioEliminacion,
						fopa_FechaEliminacion=@fopa_FechaEliminacion
					WHERE fopa_Id = @fopa_id
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/************************UDP tbAduanas ***********************************/
/*Listar aduanas*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Listar
AS
BEGIN
SELECT	adu.adua_Id							,
		adu.adua_Nombre						,
		adu.adua_Direccion_Exacta			,
		usu.usua_Nombre						AS usarioCreacion,
		adu.adua_FechaCreacion				,
		usu2.usua_Nombre					AS usuarioModificacion,
		adu.adua_FechaModificacion			,
		adu.adua_Estado						
FROM	Adua.tbAduanas adu 
		INNER JOIN Acce.tbUsuarios usu		ON adu.usua_UsuarioCreacion = usu.usua_Id 
		LEFT JOIN Acce.tbUsuarios usu2		ON usu2.usua_UsuarioModificacion = adu.usua_UsuarioModificacion 
WHERE	adu.adua_Estado = 1
END 

/*Aduanas Crear */
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Insertar 
   @adua_Nombre                NVARCHAR(MAX),
   @adua_Direccion_Exacta      NVARCHAR(MAX), 
   @usua_UsuarioCreacion       INT,  
   @adua_FechaCreacion         DATETIME
AS 
BEGIN 
     BEGIN TRY 
		
		IF EXISTS (SELECT * FROM Adua.tbAduanas     
		  WHERE @adua_Nombre = adua_Nombre
			AND adua_Estado = 0)
			BEGIN 
			   UPDATE Adua.tbAduanas
			   SET    adua_Estado = 1,
			          adua_Direccion_Exacta =@adua_Direccion_Exacta, 
			          usua_UsuarioModificacion=@usua_UsuarioCreacion
				WHERE adua_Nombre = @adua_Nombre
			   SELECT 1	    
		   END 
		
	      ELSE IF EXISTS(SELECT * FROM Adua.tbAduanas  		  
		    WHERE @adua_Nombre = adua_Nombre)
		      BEGIN 
			   SELECT 2
		    END          	
		ELSE 
		   BEGIN 
		     INSERT INTO Adua.tbAduanas
			 (adua_Nombre, 
			  adua_Direccion_Exacta, 
			  usua_UsuarioCreacion, 
			  adua_FechaCreacion			  
			 )
			 VALUES 
			 ( 
			 @adua_Nombre,          
			 @adua_Direccion_Exacta,
			 @usua_UsuarioCreacion, 
			 @adua_FechaCreacion   
			 )			
			  SELECT 1			
			END
	     END TRY
	 BEGIN CATCH 
	    SELECT 0
	 END CATCH 
END 
go

/*Aduanas Editar*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Editar 
 @adua_Id                   INT, 
 @adua_Nombre               NVARCHAR(MAX), 
 @adua_Direccion_Exacta     NVARCHAR(MAX),   
 @usua_UsuarioModificacion  INT, 
 @adua_FechaModificacion    DATETIME
AS
BEGIN 
   BEGIN TRY   
     
	   UPDATE  Adua.tbAduanas 
	   SET adua_Nombre = @adua_Nombre, 
	       adua_Direccion_Exacta = @adua_Direccion_Exacta, 		   
		   usua_UsuarioModificacion = @usua_UsuarioModificacion, 
		   adua_FechaModificacion = @adua_FechaModificacion
	   WHERE  adua_Id = @adua_Id
	   SELECT 1
	END TRY
   BEGIN CATCH
      SELECT 0
    END CATCH
END


GO
/*Aduana Eliminar*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Eliminar 
	 @adua_Id					INT,
	 @usua_UsuarioEliminacion	INT,
	 @adua_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
		   
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'adua_Id',  @adua_Id, 'Adua.tbAduanas', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE Adua.tbAduanas
					SET adua_Estado = 0,
					    usua_UsuarioEliminacion=@usua_UsuarioEliminacion,
                        adua_FechaEliminacion=@adua_FechaEliminacion
					WHERE adua_Id = @adua_Id
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--************MODO TRANSPORTE******************--
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
--************TIPO DOCUMENTO******************--
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
--************TIPO LIQUIDACION******************--
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
--************ESTADO BOLETIN******************--
/*Listar Estado boletin*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Listar
AS
BEGIN
SELECT	esbo_Id								,
		esbo_Descripcion					, 
		crea.usua_Nombre					AS usarioCreacion,
		esbo_FechaCreacion					,
		modi.usua_Nombre					AS usuarioModificacion,
		esbo_FechaModificacion				,
		esbo_Estadoo 						
FROM	Adua.tbEstadoBoletin esbo 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = esbo.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = esbo.usua_UsuarioModificacion 
WHERE	esbo_Estadoo = 1
END 
GO
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
--************INCOTERM******************--
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
--************CONDUCTOR******************--
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
--************TRANSPORTE******************--
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
--************MARCAS******************--
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

--************TIPOS IDENTIFICACION******************--
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
--****************************************** DUCA ******************************************--

CREATE OR ALTER PROCEDURE Adua.UDP_tbDuca_Listar
AS
BEGIN
	SELECT
	

	-- Identificación de la Declaración parte I --
		duca_No_Correlativo_Referencia, 
		duca_No_Duca, 
		duca.deva_Id							AS 'Id declaracuión de valor', 
		deva.deva_Fecha_Aceptacion,

	-- 4.1 Exportador / Proveedor -- 
		decla.decl_NumeroIdentificacion,
		duca_Tipo_Iden_Exportador				AS 'Tipo Ident ID', 
		tipo.iden_Descripcion					AS 'Identificacion',
		duca_Pais_Emision_Exportador,
		paisEE.pais_Nombre                      AS 'Nombre Pais emision exportador', 
		decla.decl_Nombre_Raso,
		duca_DomicilioFiscal_Exportador, 

   -- Identificación de la Declaración parte II --
		duca.duca_AduanaRegistro,
		adua1.adua_Nombre						AS 'Aduana Registro Nombre',
		duca.duca_AduanaSalida,
		adua2.adua_Nombre						AS 'Aduana Salida Nombre',
		deva.deva_Aduana_Ingreso_Id,
		adua3.adua_Nombre						AS 'Aduana Ingreso Nombre',
		deva.deva_Aduana_Despacho_Id,
		adua4.adua_Nombre						AS 'Aduana Despacho Nombre',

	-- 5.1  Iportador / Destinatario  --
		duca_Numero_Id_Importador, 
		duca_Pais_Emision_Importador,
		paisEI.pais_Nombre                      AS 'Nombre Pais emision importador',
		duca_DomicilioFiscal_Importador, 

    -- Identificación de la Declaración parte III --

		duca.duca_Regimen_Aduanero,
		duca.duca_Modalidad,
		duca.duca_Clase,
		duca.duca_FechaVencimiento,
		
    -- Identificacion de la Declaracion parte IV
		duca_Pais_Procedencia,
		paisP.pais_Nombre                       AS 'Nombre pais procedencia', 
		duca_Pais_Exportacion,
		paisE.pais_Nombre                       AS 'Pais exportacion', 
		duca_Pais_Destino,
		paisD.pais_Nombre                       AS 'Pais destino', 
		duca_Deposito_Aduanero,
		duca_Lugar_Embarque,
		duca_Lugar_Desembarque, 
		duca_Manifiesto, 
		duca_Titulo, 

	--6.1 Declarante 
		duca_Codigo_Declarante,
		duca_Numero_Id_Declarante, 
		duca_NombreSocial_Declarante,
		duca_DomicilioFiscal_Declarante, 

	--19.1 Transportista 		
		duca_Codigo_Transportista,
		duca.motr_id, 
		duca_Transportista_Nombre,
		
	--23.1 Conductor 
	    cond.cont_Id,
		cond.cont_Licencia,
		paisc.pais_Nombre  AS 'Pais Expedicion',
		cond.cont_Nombre +' '+cond.cont_Apellido AS 'Nombre y Apellido Conductor',
		cond.pais_IdExpedicion,		
		duca_Conductor_Id, 

     -- Identificacion de la Declaracion parte V
		trns.tran_Id,
		trns.pais_Id,
	    paist.pais_Nombre  AS 'Pais de registro',
		trns.marca_Id,
		marc.marc_Descripcion AS 'Marca del Transporte',
		trns.tran_Chasis,
		trns.tran_Remolque,
		trns.tran_CantCarga,
		trns.tran_NumDispositivoSeguridad,
		trns.tran_Equipamiento,
		                          ---------Tamaño del equipamiento
		trns.tran_TipoCarga,
	    trns.tran_IdContenedor,	
	  --25.Valores Totales 
		baca.base_Gasto_TransporteM_Importada,
		baca.base_Costos_Seguro,
	    deva.inco_Id,
		icot.inco_Descripcion AS 'Icoterm Descripcion',
		baca.base_Valor_Aduana,
		deva.deva_Conversion_Dolares,
	                               -------Otros gastos
			
	 --32.Totales 
        duca.duca_PesoBrutoTotal,      
		duca.duca_PesoNetoTotal,
		
		
      --Liquidacion general 
	  
	  --Mercancias
	    


		duca.usua_UsuarioCreacion,
		usu1.usua_Nombre						AS  'Nombre usuario creador', 
		duca_FechaCreacion, 
		duca.usua_UsuarioModificacion, 
		usu2.usua_Nombre						AS 'Nombre usuario modific',
		duca_FechaModificacion, 
		duca_Estado
	FROM Adua.tbDuca duca 
		INNER JOIN Acce.tbUsuarios usu1							ON duca.usua_UsuarioCreacion = usu1.usua_Id
		LEFT  JOIN Acce.tbUsuarios usu2							ON duca.usua_UsuarioModificacion = usu2.usua_Id
		LEFT  JOIN Adua.tbConductor cond						ON duca.duca_Conductor_Id = cond.cont_Id
		INNER JOIN Adua.tbTransporte trns                       ON cond.tran_Id = trns.tran_Id 
		INNER JOIN Gral.tbPaises  paisc                         ON cond.pais_IdExpedicion = paisc.pais_Id 
		INNER JOIN Gral.tbPaises  paist                         ON paist.pais_Id = trns.pais_Id
		INNER JOIN Adua.tbMarcas  marc                          ON marc.marc_Id = trns.marca_Id
		INNER JOIN Adua.tbDeclaraciones_Valor deva				ON duca.deva_Id = deva.deva_Id
		INNER JOIN Gral.tbPaises paisD							ON duca.duca_Pais_Destino = paisD.pais_Id
		INNER JOIN Gral.tbPaises paisEE							ON duca.duca_Pais_Emision_Exportador = paisEE.pais_Id
		INNER JOIN Gral.tbPaises paisEI							ON duca.duca_Pais_Emision_Importador = paisEI.pais_Id
		INNER JOIN Gral.tbPaises paisE							ON duca.duca_Pais_Exportacion = paisE.pais_Id
		INNER JOIN Gral.tbPaises paisP							ON duca.duca_Pais_Procedencia = paisP.pais_Id
		INNER JOIN Adua.tbModoTransporte modoT					ON duca.motr_id = modoT.motr_Id
		LEFT  JOIN Adua.tbAduanas adua1							ON duca.duca_AduanaRegistro = adua1.adua_Id
		LEFT  JOIN Adua.tbAduanas adua2							ON duca.duca_AduanaSalida = adua2.adua_Id
		LEFT  JOIN Adua.tbAduanas adua3							ON deva.deva_Aduana_Ingreso_Id = adua3.adua_Id
		LEFT  JOIN Adua.tbAduanas adua4							ON deva.deva_Aduana_Despacho_Id = adua4.adua_Id
		INNER JOIN Adua.tbProveedoresDeclaracion prode			ON deva.pvde_Id = Prode.pvde_Id
		INNER JOIN Adua.tbDeclarantes decla						ON prode.decl_Id = decla.decl_Id
		INNER JOIN Adua.tbBaseCalculos baca                     ON baca.base_Id = decla.decl_Id 
		LEFT  JOIN Adua.tbTiposIdentificacion tipo				ON duca.duca_Tipo_Iden_Exportador = tipo.iden_Id
		LEFT  JOIN Adua.tbIncoterm icot                         ON icot.inco_Id = deva.inco_Id 
		Inner join Adua.tbItems item                            ON item.item_Id
END
GO


--************ARCELES******************--
/*Listar Aranceles*/
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

/*******************************Condiciones comerciales *******************************/ 

/*Listar Condiciones comerciales*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Listar
AS

SELECT	condi.coco_Id					,
        condi.coco_Descripcion			,
		usu.usua_Nombre					AS UsuarioCreacion,
		coco_FechaCreacion				,
		usu1.usua_Nombre				AS UsuarioModificacion ,
		coco_FechaModificacion			,
		condi.coco_Estado				
FROM	Adua.tbCondicionesComerciales condi 
		INNER JOIN Acce.tbUsuarios usu	ON condi.usua_UsuarioCreacion = usu.usua_Id 
		LEFT JOIN Acce.tbUsuarios usu1	ON usu1.usua_Id = condi.usua_UsuarioModificacion
WHERE	coco_Estado = 1


/*Crear Condiciones comerciales*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Insertar 
 @coco_Descripcion		NVARCHAR(350), 
 @coco_UsuCreacion		INT, 
 @coco_FechaCreacion    DATETIME
AS    
BEGIN 
    BEGIN TRY 
	  IF EXISTS(SELECT * FROM Adua.tbCondicionesComerciales 
	        WHERE coco_Descripcion = @coco_Descripcion AND coco_Estado=0)
			BEGIN 
			   UPDATE Adua.tbCondicionesComerciales
			   SET coco_Estado = 1
			   WHERE coco_Descripcion =@coco_Descripcion
			   SELECT 1
			END
			ELSE 
			  BEGIN 
			     INSERT INTO Adua.tbCondicionesComerciales
				 ( coco_Descripcion, 
				   usua_UsuarioCreacion, 
				   coco_FechaCreacion				     				 
				 )
				 VALUES(
                  @coco_Descripcion,
				  @coco_UsuCreacion,   
				  @coco_FechaCreacion 					 
				 )			  
			  SELECT 1
			 END 
	   END TRY
	BEGIN CATCH
	    SELECT 0
	END CATCH  
END 


/*Editar Condiciones comerciales*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Editar 
   @coco_Id						INT,
   @coco_Descripcion			NVARCHAR(150),
   @coco_UsuarioModificacion	INT,
   @coco_FechaModi				DATETIME
AS
BEGIN 
      BEGIN TRY
	      UPDATE Adua.tbCondicionesComerciales
		  SET coco_Descripcion = @coco_Descripcion, 
		      usua_UsuarioModificacion = @coco_UsuarioModificacion,
			  coco_FechaModificacion = @coco_FechaModi
		  WHERE coco_Id = @coco_Id
		  SELECT 1
	   END TRY 
	   BEGIN CATCH 
	       SELECT 0
	   END CATCH
END
 
 /*Eliminar Condiciones Comerciales */
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Eliminar
	@coco_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@coco_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'coco_Id', @coco_Id,'Adua.tbCondicionesComerciales',@respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					 UPDATE Adua.tbCondicionesComerciales
						SET coco_Estado = 0,
						    usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
							coco_FechaEliminacion = @coco_FechaEliminacion
						WHERE coco_Id = @coco_Id
		SELECT 1
		 END
	END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


--**********BOLETIN PAGO**********--
/*Listar boletin de pago*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbBoletinPago_Listar
AS
BEGIN
	SELECT  boletin.boen_Id, 
	        boletin.liqu_Id, 
			lig.lige_TotalGral           AS liquidacionGeneral,
			boletin.tipl_Id, 
			tipli.tipl_Descripcion       AS TipoLiquiDescripcion,
			boletin.boen_FechaEmision, 
			boletin.esbo_Id,
			estadoB.esbo_Descripcion     AS estadoBoletinDescripcion,
			boletin.boen_Observaciones, 
			boletin.boen_NDeclaracion,
			boletin.pena_RTN, 
			boletin.boen_Preimpreso, 
			boletin.boen_Declarante, 
			boletin.boen_TotalPagar, 
			boletin.boen_TotalGarantizar, 
			boletin.boen_RTN, 
			boletin.boen_TipoEncabezado, 
			boletin.coim_Id, 
			codigoIm.coim_Descripcion,
			boletin.copa_Id, 
			boletin.usua_UsuarioCreacion, 
            usuaCrea.usua_Nombre		  AS usuarioCreacionNombre,
			boletin.boen_FechaCreacion, 
			boletin.usua_UsuarioModificacion,
			usuaModifica.usua_Nombre      AS usuarioModificacionNombre,
			boletin.boen_FechaModificacion, 
			boen_Estado  
      FROM  Adua.tbBoletinPago boletin
	       LEFT JOIN Acce.tbUsuarios usuaCrea			ON boletin.usua_UsuarioCreacion     = usuaCrea.usua_Id 
		   LEFT JOIN  Acce.tbUsuarios usuaModifica		ON boletin.usua_UsuarioModificacion = usuaCrea.usua_Id 
		   LEFT JOIN Adua.tbLiquidacionGeneral lig      ON boletin.liqu_Id                  = lig.lige_Id
		   LEFT JOIN Adua.tbTipoLiquidacion tipli       ON boletin.tipl_Id                  = tipli.tipl_Id
		   LEFT JOIN Adua.tbEstadoBoletin estadoB       ON boletin.esbo_Id                  = estadoB.esbo_Id
		   LEFT JOIN Adua.tbCodigoImpuesto codigoIm     ON boletin.coim_Id                  = codigoIm.coim_Id
	 WHERE boen_Estado = 1
END
GO

/*Insertar boletin de pago*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbBoletinPago_Insertar 
	@liqu_Id                 INT, 
	@tipl_Id                 INT, 
	@boen_FechaEmision       DATE, 
	@esbo_Id                 INT, 
	@boen_Observaciones      NVARCHAR(200), 
	@boen_NDeclaracion       NVARCHAR(200), 
	@pena_RTN                VARCHAR(20), 
	@boen_Preimpreso         NVARCHAR(MAX), 
	@boen_Declarante         NVARCHAR(200), 
	@boen_TotalPagar         DECIMAL(18,2), 
	@boen_TotalGarantizar    DECIMAL(18,2), 
	@boen_RTN                NVARCHAR(100),
	@boen_TipoEncabezado     NVARCHAR(200), 
	@coim_Id                 INT, 
	@copa_Id                 INT, 
	@usua_UsuarioCreacion    INT, 
	@boen_FechaCreacion      DATETIME
AS 
BEGIN
	
	BEGIN TRY
			INSERT INTO Adua.tbBoletinPago(liqu_Id,
			                               tipl_Id, 
										   boen_FechaEmision, 
										   esbo_Id, 
										   boen_Observaciones, 
										   boen_NDeclaracion, 
										   pena_RTN, 
										   boen_Preimpreso, 
										   boen_Declarante, 
										   boen_TotalPagar, 
										   boen_TotalGarantizar, 
										   boen_RTN, 
										   boen_TipoEncabezado, 
										   coim_Id, 
										   copa_Id, 
										   usua_UsuarioCreacion, 
										   boen_FechaCreacion,
										   boen_Estado)
			VALUES(@liqu_Id, 
			       @tipl_Id, 
				   @boen_FechaEmision, 
				   @esbo_Id, 
				   @boen_Observaciones, 
				   @boen_NDeclaracion, 
				   @pena_RTN, 
				   @boen_Preimpreso, 
				   @boen_Declarante, 
				   @boen_TotalPagar, 
				   @boen_TotalGarantizar, 
				   @boen_RTN, 
				   @boen_TipoEncabezado, 
				   @coim_Id, 
				   @copa_Id, 
				   @usua_UsuarioCreacion, 
				   @boen_FechaCreacion,1)
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

--Execute Prod.UDP_tbBoletinPago_Insertar 1,7,'2023-02-01',2,'observaciones','# declaracion','rtn542451162','preimpreso','declarante',520.00,500.00,'15145454','encabezado',1,1,1,'01-02-2023'
--NO VA
/*Editar boletin de pago*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbBoletinPago_Editar
	@boen_Id                   INT,
	@liqu_Id                   INT, 
	@tipl_Id                   INT, 
	@boen_FechaEmision         DATE, 
	@esbo_Id                   INT, 
	@boen_Observaciones        NVARCHAR(200), 
	@boen_NDeclaracion         NVARCHAR(200), 
	@pena_RTN                  NVARCHAR(20), 
	@boen_Preimpreso           NVARCHAR(MAX), 
	@boen_Declarante           NVARCHAR(200), 
	@boen_TotalPagar           DECIMAL(18,2), 
	@boen_TotalGarantizar      DECIMAL(18,2), 
	@boen_RTN                  NVARCHAR(100), 
	@boen_TipoEncabezado       NVARCHAR(200), 
	@coim_Id                   INT,
	@copa_Id                   INT,  
	@usua_UsuarioModificacion  INT, 
	@boen_FechaModificacion    DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Adua.tbBoletinPago
		SET		liqu_Id                   = @liqu_Id,
		        tipl_Id                   = @tipl_Id,
				boen_FechaEmision         = @boen_FechaEmision,
				esbo_Id                   = @esbo_Id,
				boen_Observaciones        = @boen_Observaciones,
				boen_NDeclaracion         = @boen_NDeclaracion,
				pena_RTN                  = @pena_RTN,
				boen_Preimpreso           = @boen_Preimpreso,
                boen_Declarante           = @boen_Declarante,
				boen_TotalPagar           = @boen_TotalPagar,
                boen_TotalGarantizar      = @boen_TotalGarantizar,
				boen_RTN                  = @boen_RTN,
				boen_TipoEncabezado       = @boen_TipoEncabezado,
				coim_Id                   = @coim_Id,
				copa_Id                   = @copa_Id,
				usua_UsuarioModificacion  = @usua_UsuarioModificacion,
				boen_FechaModificacion    = @boen_FechaModificacion
		WHERE	boen_Id                   = @boen_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--************ARCELES******************-

/*Insertar Aranceles*/
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

/*Editar Aranceles*/
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
--************DECLARANTES******************--
/* Listar Declarantes*/
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
         INNER JOIN Gral.tbProvincias prvi ON		decl.ciud_Id = prvi.pvin_Id 
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
GO

--*****Tipos de documento*****--
--CREATE OR ALTER VIEW tbTipoDocumento
--*****Listado*****--
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

--*****Insertar*****--
--Adua.UDP_tbTipoDocumento_Insertar 'kl45', 'probandoo',1,'07-18-2023'
--  select*from  Adua.tbTipoDocumento

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

--*****Editar*****--
--Adua.UDP_tbTipoDocumento_Editar 1, 'LL45', 'PRUEBA2',1, '07-18-2023'
-- SELECT * FROM Adua.tbTipoDocumento


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

/*********************Listar Tipo intermediario***************************/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Listar
AS
BEGIN 
SELECT	tite_Id							,
		tite_Descripcion				, 
		usu.usua_Nombre					AS usarioCreacion,
		tite_FechaCreacion				,
		usu1.usua_Nombre				AS usuarioModificacion,
		tite_FechaModificacion			,
		tite_Estado						
FROM	Adua.tbTipoIntermediario tip 
		INNER JOIN Acce.tbUsuarios usu	ON tip.usua_UsuarioCreacion = usu.usua_Id 
		LEFT JOIN Acce.tbUsuarios usu1	ON usu1.usua_UsuarioModificacion = tip.usua_UsuarioModificacion
WHERE	tite_Estado = 1

 END 
 GO
 /********************Crear Tipo Intermediario******************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Insertar
   @tite_Descripcion		NVARCHAR(150), 
   @tite_UsuCreacion        INT, 
   @tite_FechaCreacion		DATETIME
AS    
BEGIN 
   BEGIN TRY 
      IF EXISTS(SELECT * FROM Adua.tbTipoIntermediario WHERE tite_Descripcion = @tite_Descripcion AND tite_Estado = 0)
      BEGIN 
         UPDATE Adua.tbTipoIntermediario
         SET tite_Estado = 1
         SELECT 1
      END
      ELSE 
      BEGIN 
         INSERT INTO Adua.tbTipoIntermediario (tite_Descripcion, usua_UsuarioCreacion, tite_FechaCreacion)
         VALUES (@tite_Descripcion, @tite_UsuCreacion, @tite_FechaCreacion)			  
         SELECT 1
      END
   END TRY
   BEGIN CATCH
      SELECT 0
   END CATCH  
END

GO
/*************Editar Tipo de intermediario ************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Editar  
   @tite_Id						INT,
   @tite_Descripcion			NVARCHAR(150),
   @tite_UsuarioModificacion    INT,
   @tite_FechaModicacion     DATETIME
AS
BEGIN 
   BEGIN TRY 
      UPDATE Adua.tbTipoIntermediario
      SET tite_Descripcion = @tite_Descripcion, 
          usua_UsuarioModificacion = @tite_UsuarioModificacion,
          tite_FechaModificacion = @tite_FechaModicacion
      WHERE tite_Id = @tite_Id
	  SELECT 1
   END TRY 
   BEGIN CATCH 
       SELECT 0
   END CATCH
END

GO
/*************************Eliminar tipo de intermediario*****************/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Eliminar
	@tite_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@tite_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'tite_Id', @tite_Id, 'Adua.tbTipoIntermediario', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					   UPDATE Adua.tbTipoIntermediario
					   SET tite_Estado = 0,
					       usua_UsuarioEliminacion=@usua_UsuarioEliminacion,
						   tite_FechaEliminacion = @tite_FechaEliminacion
                       WHERE tite_Id = @tite_Id
		SELECT 1
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--************NIVELES COMERCIALES******************--
/*Listar NIVELES COMERCIALES*/

CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Listar
AS
BEGIN
SELECT	nico_Id								,
		nico_Descripcion					,
		nco.usua_UsuarioCreacion			,
		usu1.usua_Nombre					AS UsuarioCreacionNombre,
		nico_FechaCreacion 					, 
		nco.usua_UsuarioModificacion		,
		usu2.usua_Nombre					AS UsuarioModificadorNombre,
		nico_FechaModificacion 				,
		nico_Estado
FROM	[Adua].[tbNivelesComerciales] nco			
		INNER JOIN Acce.tbUsuarios usu1		ON nco.usua_UsuarioCreacion = usu1.usua_Id		
		LEFT JOIN Acce.tbUsuarios usu2		ON nco.usua_UsuarioModificacion = usu2.usua_Id
WHERE	nico_Estado = 1
END
GO
/*Insertar NIVELES COMERCIALES*/

CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Insertar
@nico_Descripcion				NVARCHAR(150), 
@usua_UsuarioCreacion			INT,
@nico_FechaCreacion				DATETIME
AS
BEGIN
	
	BEGIN TRY
		IF EXISTS(SELECT*FROM Adua.tbNivelesComerciales WHERE nico_Descripcion = @nico_Descripcion AND nico_Estado = 0 )
		BEGIN
			UPDATE Adua.tbNivelesComerciales SET nico_Estado = 1
			SELECT 1
		END
		ELSE
		BEGIN
			INSERT INTO Adua.tbNivelesComerciales ([nico_Descripcion], [usua_UsuarioCreacion], [nico_FechaCreacion])
			VALUES (@nico_Descripcion, @usua_UsuarioCreacion, @nico_FechaCreacion)
			SELECT 1
		END
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO
/*Editar NIVELES COMERCIALES*/

CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Editar
@nico_Id						INT,
@nico_Descripcion				NVARCHAR(150), 
@usua_UsuarioModificacion		INT,
@nico_FechaModificacion			DATETIME
AS
BEGIN
	BEGIN TRY
	UPDATE Adua.tbNivelesComerciales SET nico_Descripcion = @nico_Descripcion, usua_UsuarioModificacion = @usua_UsuarioModificacion,
	nico_FechaModificacion = @nico_FechaModificacion WHERE nico_Id = @nico_Id
		SELECT 1
	END TRY

	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO
/*Eliminar NIVELES COMERCIALES*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Eliminar
(
	@nico_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@nico_FechaEliminacion	 DATETIME
)
AS
BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'nico_Id', @nico_Id, 'Adua.tbNivelesComerciales', @respuesta OUTPUT

		
		IF(@respuesta) = 1
			BEGIN
				 UPDATE Adua.tbNivelesComerciales
					SET nico_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						
						nico_FechaEliminacion = @nico_FechaEliminacion
				  WHERE nico_Id = @nico_Id 
					AND nico_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();
	END CATCH
END
GO

--************ESTADO MERCANCIAS******************--
/*Listar ESTADO MERCANCIAS*/
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbEstadoMercancias_Listar
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
/*Insertar ESTADO MERCANCIAS*/
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

/*Editar ESTADO MERCANCIAS*/
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
/*Editar ESTADO MERCANCIAS*/
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
--************UNIDAD DE MEDIDA******************--
/*Listar UNIDAD DE MEDIDA*/
CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Listar
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
/*Insertar UNIDAD DE MEDIDA*/
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
/*Editar UNIDAD DE MEDIDA*/CREATE OR ALTER PROCEDURE Gral.UDP_tbUnidadMedidas_Editar
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

/*Eliminar UNIDAD DE MEDIDA*/
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
--************CONDICIONES******************--
/*Listar CONDICIONES*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondiciones_Listar
	@deva_Id			INT
AS
BEGIN
	SELECT codi_Id, 
		   deva_Id, 
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
		   codi_FechaCreacion, 
		   usua_UsuarioModificacion, 
		   codi_FechaModificacion, 
		   codi_Estado
	FROM [Adua].[tbCondiciones]
	WHERE deva_Id = @deva_Id
END

/*Insertar condiciones*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondiciones_Insertar 
	@deva_Id									INT, 
	@codi_Restricciones_Utilizacion				BIT, 
	@codi_Indicar_Restricciones_Utilizacion		NVARCHAR(500), 
	@codi_Depende_Precio_Condicion				BIT, 
	@codi_Indicar_Existe_Condicion				NVARCHAR(500),
	@codi_Condicionada_Revertir					BIT, 
	@codi_Vinculacion_Comprador_Vendedor		BIT, 
	@codi_Tipo_Vinculacion						NVARCHAR(500), 
	@codi_Vinculacion_Influye_Precio			BIT, 
	@codi_Pagos_Descuentos_Indirectos			BIT, 
	@codi_Concepto_Monto_Declarado				NVARCHAR(500), 
	@codi_Existen_Canones						BIT, 
	@codi_Indicar_Canones						NVARCHAR(500), 
	@usua_UsuarioCreacion						INT, 
	@codi_FechaCreacion							DATE
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Adua].[tbCondiciones](deva_Id, 
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
		VALUES (@deva_Id, 
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

		INSERT INTO [Adua].[tbCondicionesHistorial](codi_Id,
													deva_Id, 
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
													hcod_UsuarioAccion,
													hcod_FechaAccion,
													hcod_Accion)
		VALUES (SCOPE_IDENTITY(),
				@deva_Id, 
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
				@codi_FechaCreacion,
				'Insertar')

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END


/*Editar condiciones*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondiciones_Editar 
	@codi_Id									INT,
	@deva_Id									INT, 
	@codi_Restricciones_Utilizacion				BIT, 
	@codi_Indicar_Restricciones_Utilizacion		NVARCHAR(500), 
	@codi_Depende_Precio_Condicion				BIT, 
	@codi_Indicar_Existe_Condicion				NVARCHAR(500),
	@codi_Condicionada_Revertir					BIT, 
	@codi_Vinculacion_Comprador_Vendedor		BIT, 
	@codi_Tipo_Vinculacion						NVARCHAR(500), 
	@codi_Vinculacion_Influye_Precio			BIT, 
	@codi_Pagos_Descuentos_Indirectos			BIT, 
	@codi_Concepto_Monto_Declarado				NVARCHAR(500), 
	@codi_Existen_Canones						BIT, 
	@codi_Indicar_Canones						NVARCHAR(500), 
	@usua_UsuarioModificacion					INT, 
	@codi_FechaModificacion						DATE
AS
BEGIN
	BEGIN TRY
		UPDATE [Adua].[tbCondiciones]
		SET		deva_Id = @deva_Id, 
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
				usua_UsuarioModificacion = @usua_UsuarioModificacion, 
				codi_FechaModificacion = @codi_FechaModificacion
		WHERE codi_Id = @codi_Id

		INSERT INTO [Adua].[tbCondicionesHistorial](codi_Id,
													deva_Id, 
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
													hcod_UsuarioAccion,
													hcod_FechaAccion,
													hcod_Accion)
		VALUES (@codi_Id,
				@deva_Id, 
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
				@usua_UsuarioModificacion, 
				@codi_FechaModificacion,
				'Editar')

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO


/*Listar Liquidacion Por Linea*/
CREATE OR ALTER PROCEDURE adua.UDP_tbLiquidacionPorLinea_Listar
AS
BEGIN	
	SELECT	lili_Id, 
			lili_Tipo, 
			lili_Alicuota, 
			lili_Total, 
			lili_ModalidadPago, 
			lili_TotalGral, 
			liquiLinea.item_Id
	FROM	[Adua].[tbLiquidacionPorLinea] liquiLinea 
	INNER JOIN [Adua].[tbItems] Items ON liquiLinea.item_Id = Items.item_Id
END
GO


/*Insertar Liquidacion Por Linea*/
CREATE OR ALTER PROCEDURE adua.UDP_tbLiquidacionPorLinea_Insertar
	@lili_Tipo			NVARCHAR(100), 
	@lili_Alicuota		DECIMAL(18,2), 
	@lili_Total			DECIMAL(18,2), 
	@lili_ModalidadPago NVARCHAR(200), 
	@lili_TotalGral		DECIMAL(18,2),  
	@item_Id			INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Adua].[tbLiquidacionPorLinea] (lili_Tipo, 
													lili_Alicuota, 
													lili_Total, 
													lili_ModalidadPago, 
													lili_TotalGral, 
													item_Id)
		VALUES (@lili_Tipo, @lili_Alicuota, @lili_Total, @lili_ModalidadPago, @lili_TotalGral, @item_Id)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END


/*Editar Liquidacion Por Linea*/
GO
CREATE OR ALTER PROCEDURE adua.UDP_tbLiquidacionPorLinea_Editar
	@lili_Id			INT,
	@lili_Tipo			NVARCHAR(100), 
	@lili_Alicuota		DECIMAL(18,2), 
	@lili_Total			DECIMAL(18,2), 
	@lili_ModalidadPago NVARCHAR(200), 
	@lili_TotalGral		DECIMAL(18,2),  
	@item_Id			INT
AS
BEGIN
	BEGIN TRY
		UPDATE 	[Adua].[tbLiquidacionPorLinea]
		SET lili_Tipo			= @lili_Tipo, 
			lili_Alicuota		= @lili_Alicuota, 
			lili_Total			= @lili_Total, 
			lili_ModalidadPago	= @lili_ModalidadPago, 
			lili_TotalGral		= @lili_TotalGral, 
			item_Id				= @item_Id
		WHERE lili_Id = @lili_Id 
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO




GO
/* LISTAR DOCUMENTOS DE SOPORTE */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosDeSoporte_Listar
AS 
BEGIN

	SELECT  DocumentoSoporte.[doso_Id]
		   ,tipoDocumento.[tido_Id]
		   ,tipoDocumento.tido_Codigo
		   ,tipoDocumento.tido_Descripcion
		   ,DocumentoSoporte.[doso_NumeroDocumento]
		   ,DocumentoSoporte.[doso_FechaEmision]
		   ,DocumentoSoporte.[doso_FechaVencimiento]
		   ,DocumentoSoporte.[doso_PaisEmision]
		   ,DocumentoSoporte.[doso_LineaAplica]
		   ,DocumentoSoporte.[doso_EntidadEmitioDocumento]
		   ,DocumentoSoporte.[doso_Monto]
		   ,DocumentoSoporte.[usua_UsuarioCreacion]
		   ,UsuarioCreacion.usua_Nombre
		   ,DocumentoSoporte.[doso_FechaCreacion]
		   ,DocumentoSoporte.[usua_UsuarioModificacion]
		   ,UsuarioModificaion.usua_Nombre
		   ,DocumentoSoporte.[doso_FechaModificacion]
		   ,DocumentoSoporte.[usua_UsuarioEliminacion]
		   ,UsuarioEliminacion.usua_Nombre
		   ,DocumentoSoporte.[doso_FechaEliminacion]
		   ,DocumentoSoporte.[doso_Estado]
	  FROM [Adua].[tbDocumentosDeSoporte] DocumentoSoporte	
			INNER JOIN Adua.tbTipoDocumento tipoDocumento		 ON	DocumentoSoporte.tido_Id					= tipoDocumento.tido_Id 
			INNER JOIN Acce.tbUsuarios	  UsuarioCreacion	     ON	DocumentoSoporte.usua_UsuarioCreacion		= UsuarioCreacion.usua_Id
			INNER JOIN Acce.tbUsuarios	  UsuarioModificaion     ON	DocumentoSoporte.usua_UsuarioModificacion	= UsuarioModificaion.usua_Id
			INNER JOIN Acce.tbUsuarios	  UsuarioEliminacion     ON	DocumentoSoporte.usua_UsuarioEliminacion	= UsuarioEliminacion.usua_Id





END

GO

/* INSERTAR DOCUMENTOS DE SOPORTE */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosDeSoporte_Insertar 
	@tido_Id					        INT,
	@doso_NumeroDocumento		        NVARCHAR(15),
	@doso_FechaEmision			        DATE,
	@doso_FechaVencimiento		        DATE,
	@doso_PaisEmision			        INT,
	@doso_LineaAplica			        CHAR(4),
	@doso_EntidadEmitioDocumento        NVARCHAR(75),
	@doso_Monto				           	NVARCHAR(50),
	@usua_UsuarioCreacion				int,
	@doso_FechaCreacion					datetime

AS
BEGIN 

BEGIN TRY

	INSERT INTO [Adua].[tbDocumentosDeSoporte]
			   ([tido_Id]
			   ,[doso_NumeroDocumento]
			   ,[doso_FechaEmision]
			   ,[doso_FechaVencimiento]
			   ,[doso_PaisEmision]
			   ,[doso_LineaAplica]
			   ,[doso_EntidadEmitioDocumento]
			   ,[doso_Monto]

			   ,[usua_UsuarioCreacion]
			   ,[doso_FechaCreacion])
		 VALUES
			   (@tido_Id
			   ,@doso_NumeroDocumento
			   ,@doso_FechaEmision
			   ,@doso_FechaVencimiento
			   ,@doso_PaisEmision
			   ,@doso_LineaAplica
			   ,@doso_EntidadEmitioDocumento
			   ,@doso_Monto

			   ,@usua_UsuarioCreacion
			   ,@doso_FechaCreacion)

			   SELECT 1
			   END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 

END

-------------------------------------------------------

GO 

/* LISTAR DOCUMENTOS PDF */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosPDF_Listar
AS
BEGIN 
 

 SELECT	 documentoPdf.[dpdf_Id]
		,declaracionDeValor.[deva_Id]
		,declaracionDeValor.deva_numero_contrato
		,declaracionDeValor.deva_Declaracion_Mercancia
 		,declaracionDeValor.deva_Lugar_Embarque
 		,declaracionDeValor.deva_Lugar_Entrega
  		,documentoPdf.[dpdf_CA]
		,documentoPdf.[dpdf_DVA]
		,documentoPdf.[dpdf_DUCA]
		,documentoPdf.[dpdf_Boletin]
		,documentoPdf.[usua_UsuarioCreacion]
		,UsuarioCreacion.usua_Nombre
		,documentoPdf.[dpdf_FechaCreacion]
		,documentoPdf.[usua_UsuarioModificacion]
		,UsuarioModificaion.usua_Nombre
		,documentoPdf.[dpdf_FechaModificacion]
		,documentoPdf.[usua_UsuarioEliminacion]
		,UsuarioEliminacion.usua_Nombre
		,documentoPdf.[dpdf_FechaEliminacion]
		,documentoPdf.[dpdf_Estado]
  FROM	[Adua].[tbDocumentosPDF]		documentoPdf
  INNER JOIN Adua.tbDeclaraciones_Valor declaracionDeValor		ON	documentoPdf.deva_Id					= declaracionDeValor.deva_Id
  INNER JOIN Acce.tbUsuarios			UsuarioCreacion			ON	documentoPdf.usua_UsuarioCreacion		= UsuarioCreacion.usua_Id
  INNER JOIN Acce.tbUsuarios			UsuarioModificaion		ON	documentoPdf.usua_UsuarioModificacion	= UsuarioModificaion.usua_Id
  INNER JOIN Acce.tbUsuarios			UsuarioEliminacion		ON	documentoPdf.usua_UsuarioEliminacion	= UsuarioEliminacion.usua_Id

END
GO

/* INSERTAR DOCUMENTOS PDF */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosPDF_Insertar
	@deva_Id				int,
	@dpdf_CA				nvarchar(200),
	@dpdf_DVA				nvarchar(200),
	@dpdf_DUCA				nvarchar(200),
	@dpdf_Boletin			nvarchar(200),
	@usua_UsuarioCreacion   int,
	@dpdf_FechaCreacion     datetime
     
AS
BEGIN 
 
	BEGIN TRY
		BEGIN TRAN
			INSERT INTO [Adua].[tbDocumentosPDF]
					   ([deva_Id]
					   ,[dpdf_CA]
					   ,[dpdf_DVA]
					   ,[dpdf_DUCA]
					   ,[dpdf_Boletin]
					   ,[usua_UsuarioCreacion]
					   ,[dpdf_FechaCreacion])
				 VALUES
					   (@deva_Id				
					   ,@dpdf_CA				
					   ,@dpdf_DVA				
					   ,@dpdf_DUCA				
					   ,@dpdf_Boletin			
					   ,@usua_UsuarioCreacion   
					   ,@dpdf_FechaCreacion)

				   SELECT 1

				   
	  SET @dpdf_Id = SCOPE_IDENTITY();

	  INSERT INTO Adua.tbDocumentosPDFHistorial	(dpdf_Id
												,deva_Id
												,dpdf_CA
												,dpdf_DVA
												,dpdf_DUCA
												,dpdf_Boletin
												,hpdf_UsuarioAccion
												,hpdf_FechaAccion
												,hpdf_Accion)
		VALUES	 (@dpdf_Id,
				  @deva_Id,
				  @dpdf_CA,
				  @dpdf_DVA,
				  @dpdf_DUCA,
				  @dpdf_Boletin,
				  @usua_UsuarioCreacion,
				  @dpdf_FechaCreacion,
				  'Insertar')

		COMMIT
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 

END

GO


/* EDITAR DOCUMENTOS PDF */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosPDF_Editar
@dpdf_Id					int,
@deva_Id					int,
@dpdf_CA					nvarchar(200),
@dpdf_DVA					nvarchar(200),
@dpdf_DUCA					nvarchar(200),
@dpdf_Boletin				nvarchar(200),
@usua_UsuarioModificacion   int,
@dpdf_FechaModificacion     datetime

AS
BEGIN 

 
	BEGIN TRY
		BEGIN TRAN
			UPDATE	[Adua].[tbDocumentosPDF]
				SET	[deva_Id] = @deva_Id
					,[dpdf_CA] = @dpdf_CA
					,[dpdf_DVA] = @dpdf_DVA
					,[dpdf_DUCA] = @dpdf_DUCA
					,[dpdf_Boletin] = @dpdf_Boletin
					,[usua_UsuarioModificacion] = @usua_UsuarioModificacion
					,[dpdf_FechaModificacion] = @dpdf_FechaModificacion
			  WHERE	dpdf_Id = @dpdf_Id
 
 					   SELECT 1

					   


		  INSERT INTO Adua.tbDocumentosPDFHistorial	(dpdf_Id
													,deva_Id
													,dpdf_CA
													,dpdf_DVA
													,dpdf_DUCA
													,dpdf_Boletin
													,hpdf_UsuarioAccion
													,hpdf_FechaAccion
													,hpdf_Accion)
			VALUES (  @dpdf_Id,
					  @deva_Id,
					  @dpdf_CA,
					  @dpdf_DVA,
					  @dpdf_DUCA,
					  @dpdf_Boletin,
					  @usua_UsuarioModificacion,
					  @dpdf_FechaModificacion,
					  'Editar')
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 


END

GO 


/* ELIMINAR DOCUMENTOS PDF */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosPDF_Eliminar
	@dpdf_Id					int,
	@usua_UsuarioEliminacion    int,
	@dpdf_FechaEliminacion		datetime
AS
BEGIN 

	BEGIN TRY
 		BEGIN TRAN
		UPDATE	 [Adua].[tbDocumentosPDF]
		   SET	 [usua_UsuarioEliminacion] =	@usua_UsuarioEliminacion
				,[dpdf_FechaEliminacion] =		@dpdf_FechaEliminacion
				,[dpdf_Estado] = 0
		 WHERE	 dpdf_Id = @dpdf_Id
 



				   SELECT 1

			
  INSERT INTO Adua.tbDocumentosPDFHistorial	(dpdf_Id
											,deva_Id
											,dpdf_CA
											,dpdf_DVA
											,dpdf_DUCA
											,dpdf_Boletin
											,hpdf_UsuarioAccion
											,hpdf_FechaAccion
											,hpdf_Accion)
	SELECT    dpdf_Id,
			  deva_Id,
			  dpdf_CA,
			  dpdf_DVA,
			  dpdf_DUCA,
			  dpdf_Boletin,
			  @usua_UsuarioEliminacion,
			  @dpdf_FechaEliminacion,
			  'Eliminar'
			  FROM Adua.tbDocumentosPDF 
			  WHERE dpdf_Id = @dpdf_Id

		 COMMIT
		END TRY
		BEGIN CATCH
			ROLLBACK
			SELECT 'Error Message: ' + ERROR_MESSAGE()
		END CATCH 

END


GO

/* LISTAR DOCUMENTOS CONTRATOS */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosContratos_Listar
AS
BEGIN
 

	SELECT	 documentoContrato.[doco_Id]
			,comercianteIndividual.[coin_Id]
			,comercianteIndividual.pers_Id
			,Personas.pers_RTN
			,comercianteIndividual.coin_CorreoElectronico
 			,comercianteIndividual.coin_TelefonoFijo
			,comercianteIndividual.coin_PuntoReferencia
			,personaJuridica.[peju_Id]
			,documentoContrato.[doco_Numero_O_Referencia]
			,documentoContrato.[doco_TipoDocumento]
			,documentoContrato.[usua_UsuarioCreacion]
			,UsuarioCreacion.usua_Nombre
			,documentoContrato.[doco_FechaCreacion]
			,documentoContrato.[usua_UsuarioModificacion]
			,UsuarioModificaion.usua_Nombre
			,documentoContrato.[doco_FechaModificacion]
			,documentoContrato.[doco_Estado]
	  FROM	[Adua].[tbDocumentosContratos]				documentoContrato
			INNER JOIN	adua.tbComercianteIndividual	comercianteIndividual	ON	documentoContrato.coin_Id					= comercianteIndividual.coin_Id
			INNER JOIN	adua.tbPersonaJuridica			personaJuridica			ON	documentoContrato.peju_Id					= personaJuridica.peju_Id
			INNER JOIN	adua.tbPersonas					Personas				ON	comercianteIndividual.pers_Id				= Personas.pers_Id
			INNER JOIN	Acce.tbUsuarios					UsuarioCreacion			ON	documentoContrato.usua_UsuarioCreacion		= UsuarioCreacion.usua_Id
			INNER JOIN	Acce.tbUsuarios					UsuarioModificaion		ON	documentoContrato.usua_UsuarioModificacion	= UsuarioModificaion.usua_Id
 
 



END

GO


/* INSERTAR DOCUMENTOS CONTRATOS */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosContratos_Insertar
@coin_Id					int,
@peju_Id					int,
@doco_Numero_O_Referencia	nvarchar(50),
@doco_TipoDocumento			nvarchar(6),
@usua_UsuarioCreacion		int,
@doco_FechaCreacion			datetime
   
AS
BEGIN
	BEGIN TRY
 

		INSERT INTO [Adua].[tbDocumentosContratos]
				   ([coin_Id]
				   ,[peju_Id]
				   ,[doco_Numero_O_Referencia]
				   ,[doco_TipoDocumento]
				   ,[usua_UsuarioCreacion]
				   ,[doco_FechaCreacion] )
			 VALUES
				   (@coin_Id					
				   ,@peju_Id					
				   ,@doco_Numero_O_Referencia	 
				   ,@doco_TipoDocumento			 
				   ,@usua_UsuarioCreacion		
				   ,@doco_FechaCreacion	)
 
 				   SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END


GO


/* EDITAR DOCUMENTOS CONTRATOS */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosContratos_Editar
@doco_Id					int,
@coin_Id					int,
@peju_Id					int,
@doco_Numero_O_Referencia	nvarchar(50),
@doco_TipoDocumento			nvarchar(6),
@usua_UsuarioModificacion	int,
@doco_FechaModificacion		datetime
AS
BEGIN
 
 	BEGIN TRY

		UPDATE	 [Adua].[tbDocumentosContratos]
		   SET	 [coin_Id] = @coin_Id
				,[peju_Id] = @peju_Id
				,[doco_Numero_O_Referencia] =	@doco_Numero_O_Referencia
				,[doco_TipoDocumento] =			@doco_TipoDocumento
 				,[usua_UsuarioModificacion] =	@usua_UsuarioModificacion
				,[doco_FechaModificacion] =		@doco_FechaModificacion
 		 WHERE	doco_Id = @doco_Id
 
  				   SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 


END


GO


/* ELIMINAR DOCUMENTOS CONTRATOS */
CREATE OR ALTER PROCEDURE Adua.UDP_tbDocumentosContratos_Eliminar
@doco_Id					int
AS
BEGIN
  	BEGIN TRY


		UPDATE [Adua].[tbDocumentosContratos]
		   SET [doco_Estado] = 0
		   WHERE	doco_Id = @doco_Id
 
  				   SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 

END
GO


--------------------------------------------------------------- TABLA LIQUIDACION GENERAL ---------------------------------------------------------------
/* LISTAR LIQUIDACION GENERAL */
CREATE OR ALTER PROCEDURE Adua.UDP_tbLiquidacionGeneral_Listar
AS
BEGIN
	SELECT	lige.lige_Id, 
			lige.lige_TipoTributo, 
			lige.lige_TotalPorTributo, 
			lige.lige_ModalidadPago, 
			lige.lige_TotalGral, 
			lige.duca_Id
	FROM	Adua.tbLiquidacionGeneral	AS	lige
	INNER JOIN Adua.tbDuca AS duca ON lige.duca_Id = duca.duca_No_Duca
END
GO


/* INSERTAR LIQUIDACION GENERAL */
CREATE OR ALTER PROCEDURE Adua.UDP_tbLiquidacionGeneral_Insertar
	@lige_TipoTributo		NVARCHAR(50), 
	@lige_TotalPorTributo	NVARCHAR(25),
	@lige_ModalidadPago		NVARCHAR(55), 
	@lige_TotalGral			NVARCHAR(50), 
	@duca_Id				NVARCHAR(100)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbLiquidacionGeneral(lige_TipoTributo, 
											lige_TotalPorTributo, 
											lige_ModalidadPago, 
											lige_TotalGral, 
											duca_Id)
		VALUES (@lige_TipoTributo, 
				@lige_TotalPorTributo, 
				@lige_ModalidadPago, 
				@lige_TotalGral, 
				@duca_Id)
		
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO


/* EDITAR LIQUIDACION GENERAL */
CREATE OR ALTER PROCEDURE Adua.UDP_tbLiquidacionGeneral_Editar
	@lige_Id				INT,
	@lige_TipoTributo		NVARCHAR(50), 
	@lige_TotalPorTributo	NVARCHAR(25),
	@lige_ModalidadPago		NVARCHAR(55), 
	@lige_TotalGral			NVARCHAR(50), 
	@duca_Id				NVARCHAR(100),
	@hlig_UsuarioAccion		INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION
			INSERT INTO Adua.tbLiquidacionGeneralHistorial (lige_Id, 
															lige_TipoTributo, 
															lige_TotalPorTributo, 
															lige_ModalidadPago, 
															lige_TotalGral, 
															duca_Id, 
															hlig_UsuarioAccion, 
															hlig_FechaAccion, 
															hlig_Accion)
			SELECT	lige_Id, 
					lige_TipoTributo, 
					lige_TotalPorTributo, 
					lige_ModalidadPago, 
					lige_TotalGral, 
					duca_Id,
					@hlig_UsuarioAccion,
					GETDATE(),
					'Editar'
			FROM	Adua.tbLiquidacionGeneral 
			WHERE	lige_Id = @lige_Id


			UPDATE	Adua.tbLiquidacionGeneral 
			SET		lige_TipoTributo		=	@lige_TipoTributo,
					lige_TotalPorTributo	=	@lige_TotalPorTributo ,
					lige_ModalidadPago		=	@lige_ModalidadPago, 
					lige_TotalGral			=	@lige_TotalGral, 
					duca_Id					=	@duca_Id
			WHERE	lige_Id					=	@lige_Id

			SELECT 1
		COMMIT
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO


--------------------------------------------------------------- TABLA LIQUIDACION GENERAL HISTORIAL ---------------------------------------------------------------

/* LISTAR  LIQUIDACION GENERAL HISTORIAL */
CREATE OR ALTER PROCEDURE Adua.UDP_tbLiquidacionGeneralHistorial_Listar
AS
BEGIN
	SELECT	hlig_Id, 
			lige_Id, 
			lige_TipoTributo, 
			lige_TotalPorTributo, 
			lige_ModalidadPago, 
			lige_TotalGral, 
			duca_Id, 
			hlig_UsuarioAccion, 
			hlig_FechaAccion, 
			hlig_Accion
	FROM	Adua.tbLiquidacionGeneralHistorial
END
GO











-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS MÓDULO PRODUCCION

-----------------------------------------------/UDPS Para orden de compra---------------------------------------------

CREATE OR ALTER PROCEDURE Prod.UDP_tbOrdenCompra_Insertar
(
	@orco_IdCliente				INT,
	@orco_FechaEmision			DATETIME,
	@orco_FechaLimite			DATETIME,
	@orco_MetodoPago 			INT,
	@orco_Materiales			BIT,
	@orco_IdEmbalaje 			INT,
	@orco_EstadoOrdenCompra		CHAR(1),
	@orco_DireccionEntrega		NVARCHAR(250),
	@usua_UsuarioCreacion       INT,
	@orco_FechaCreacion         DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbOrdenCompra
					(orco_IdCliente,				
					orco_FechaEmision,			
					orco_FechaLimite,			
					orco_MetodoPago, 			
					orco_Materiales,			
					orco_IdEmbalaje, 			
					orco_EstadoOrdenCompra,		
					orco_DireccionEntrega,		
					usua_UsuarioCreacion,       
					orco_FechaCreacion)
			VALUES (@orco_IdCliente,				
					@orco_FechaEmision,			
					@orco_FechaLimite,			
					@orco_MetodoPago, 			
					@orco_Materiales,			
					@orco_IdEmbalaje, 			
					@orco_EstadoOrdenCompra,		
					@orco_DireccionEntrega,		
					@usua_UsuarioCreacion,       
					@orco_FechaCreacion)
			
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbOrdenCompra_Editar
(
	@orco_Id					INT,
	@orco_IdCliente				INT,
	@orco_FechaEmision			DATETIME,
	@orco_FechaLimite			DATETIME,
	@orco_MetodoPago 			INT,
	@orco_Materiales			BIT,
	@orco_IdEmbalaje 			INT,
	@orco_EstadoOrdenCompra		CHAR(1),
	@orco_DireccionEntrega		NVARCHAR(250),
	@usua_UsuarioCreacion       INT,
	@orco_FechaCreacion         DATETIME
)
AS
BEGIN
	BEGIN TRY
		 UPDATE Prod.tbOrdenCompra
			SET	orco_IdCliente			= @orco_IdCliente,				
				orco_FechaEmision		= @orco_FechaEmision,			
				orco_FechaLimite		= @orco_FechaLimite,			
				orco_MetodoPago			= @orco_MetodoPago, 			
				orco_Materiales			= @orco_Materiales,			
				orco_IdEmbalaje			= @orco_IdEmbalaje, 			
				orco_EstadoOrdenCompra	= @orco_EstadoOrdenCompra,		
				orco_DireccionEntrega	= @orco_DireccionEntrega,		
				usua_UsuarioCreacion	= @usua_UsuarioCreacion,       
				orco_FechaCreacion		= @orco_FechaCreacion
		  WHERE orco_Id = @orco_Id

		  SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

-----------------------------------------------/UDPS Para orden de compra---------------------------------------------

--------------------------------------------UDPS Para orden de compra detalle-----------------------------------------

CREATE OR ALTER PROCEDURE Prod.UDP_tbOrdenCompraDetalles_Insertar
(
	@orco_Id						INT,
	@code_CantidadPrenda			INT,
	@esti_Id						INT,
	@tall_Id						INT,
	@code_Sexo						CHAR(1),
	@colr_Id						INT,
	@code_Documento					NVARCHAR(250),
	@code_Medidas					NVARCHAR(250),
	@proc_IdComienza				INT,
	@proc_IdActual					INT,
	@code_Unidad					DECIMAL(18,2),
	@code_Valor						DECIMAL(18,2),
	@code_Impuesto					DECIMAL(18,2),
	@code_Descuento					DECIMAL(18,2),
	@code_EspecificacionEmbalaje	NVARCHAR(200),
	@usua_UsuarioCreacion       	INT,
	@code_FechaCreacion         	DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbOrdenCompraDetalles
					(orco_Id,						
					code_CantidadPrenda,			
					esti_Id,						
					tall_Id,						
					code_Sexo,						
					colr_Id,						
					code_Documento,					
					code_Medidas,					
					proc_IdComienza,				
					proc_IdActual,					
					code_Unidad,					
					code_Valor,						
					code_Impuesto,					
					code_Descuento,					
					code_EspecificacionEmbalaje,	
					usua_UsuarioCreacion,       	
					code_FechaCreacion)
			 VALUES (@orco_Id,						
					@code_CantidadPrenda,			
					@esti_Id,						
					@tall_Id,						
					@code_Sexo,						
					@colr_Id,						
					@code_Documento,					
					@code_Medidas,					
					@proc_IdComienza,				
					@proc_IdActual,					
					@code_Unidad,					
					@code_Valor,						
					@code_Impuesto,					
					@code_Descuento,					
					@code_EspecificacionEmbalaje,	
					@usua_UsuarioCreacion,       	
					@code_FechaCreacion)
		
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbOrdenCompraDetalles_Editar
(
	@code_Id						INT,
	@orco_Id						INT,
	@code_CantidadPrenda			INT,
	@esti_Id						INT,
	@tall_Id						INT,
	@code_Sexo						CHAR(1),
	@colr_Id						INT,
	@code_Documento					NVARCHAR(250),
	@code_Medidas					NVARCHAR(250),
	@proc_IdComienza				INT,
	@proc_IdActual					INT,
	@code_Unidad					DECIMAL(18,2),
	@code_Valor						DECIMAL(18,2),
	@code_Impuesto					DECIMAL(18,2),
	@code_Descuento					DECIMAL(18,2),
	@code_EspecificacionEmbalaje	NVARCHAR(200),
	@usua_UsuarioCreacion       	INT,
	@code_FechaCreacion         	DATETIME
)
AS
BEGIN
	BEGIN TRY
		 UPDATE Prod.tbOrdenCompraDetalles
			SET orco_Id						= @orco_Id,						
				code_CantidadPrenda			= @code_CantidadPrenda,			
				esti_Id						= @esti_Id,						
				tall_Id						= @tall_Id,						
				code_Sexo					= @code_Sexo,						
				colr_Id						= @colr_Id,						
				code_Documento				= @code_Documento,					
				code_Medidas				= @code_Medidas,					
				proc_IdComienza				= @proc_IdComienza,				
				proc_IdActual				= @proc_IdActual,					
				code_Unidad					= @code_Unidad,					
				code_Valor					= @code_Valor,						
				code_Impuesto				= @code_Impuesto,					
				code_Descuento				= @code_Descuento,					
				code_EspecificacionEmbalaje	= @code_EspecificacionEmbalaje,	
				usua_UsuarioCreacion       	= @usua_UsuarioCreacion,       	
				code_FechaCreacion         	= @code_FechaCreacion    
		  WHERE code_Id = @code_Id

		  SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO
-------------------------------------------/UDPS Para orden de compra detalle-----------------------------------------

----------------------------------------------UDPS Para Asignaciones Orden--------------------------------------------

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrden_Listado
AS
BEGIN
	 SELECT asor_Id,						
			asor_OrdenDetId,				
			asor_FechaInicio,			
			asor_FechaLimite,						
			asor_Cantidad,				
			proc_Id,						
			asignacionesOrden.empl_Id,						
			asignacionesOrden.usua_UsuarioCreacion,
			usuarioCreacion.usua_Nombre					AS usuarioCreacionNombre,
			asor_FechaCreacion,			
			asignacionesOrden.usua_UsuarioModificacion,
			usuarioModificacion.usua_Nombre				AS usuarioModificacionNombre,
			asor_FechaModificacion
	   FROM Prod.tbAsignacionesOrden			AS asignacionesOrden 
 INNER JOIN Acce.tbUsuarios usuarioCreacion		ON asignacionesOrden.usua_UsuarioCreacion = usuarioCreacion.usua_Id
  LEFT JOIN Acce.tbUsuarios usuarioModificacion	ON asignacionesOrden.usua_UsuarioModificacion = usuarioModificacion.usua_Id
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrden_Insertar
(
	@asor_OrdenDetId			INT,
	@asor_FechaInicio			DATETIME,
	@asor_FechaLimite			DATETIME,
	@asor_Cantidad				INT,
	@proc_Id					INT,
	@empl_Id					INT,
	@usua_UsuarioCreacion		INT,
	@asor_FechaCreacion			DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbAsignacionesOrden
					(asor_OrdenDetId,			
					asor_FechaInicio,			
					asor_FechaLimite,			
					asor_Cantidad,				
					proc_Id,					
					empl_Id,					
					usua_UsuarioCreacion,		
					asor_FechaCreacion)
			 VALUES (@asor_OrdenDetId,			
					@asor_FechaInicio,			
					@asor_FechaLimite,			
					@asor_Cantidad,				
					@proc_Id,					
					@empl_Id,					
					@usua_UsuarioCreacion,		
					@asor_FechaCreacion)
		
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrden_Editar
(
	@asor_Id					INT,
	@asor_OrdenDetId			INT,
	@asor_FechaInicio			DATETIME,
	@asor_FechaLimite			DATETIME,
	@asor_Cantidad				INT,
	@proc_Id					INT,
	@empl_Id					INT,
	@usua_UsuarioCreacion		INT,
	@asor_FechaCreacion			DATETIME
)
AS
BEGIN
	BEGIN TRY
		 UPDATE Prod.tbAsignacionesOrden
			SET	asor_OrdenDetId			= @asor_OrdenDetId,
				asor_FechaInicio		= @asor_FechaInicio,	
				asor_FechaLimite		= @asor_FechaLimite,	
				asor_Cantidad			= @asor_Cantidad,	
				proc_Id					= @proc_Id,
				empl_Id					= @empl_Id,
				usua_UsuarioCreacion	= @usua_UsuarioCreacion,	
				asor_FechaCreacion		= @asor_FechaCreacion
		  WHERE asor_Id	= @asor_Id
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrden_Eliminar
(
	@asor_Id	INT
)
AS
BEGIN
	BEGIN TRY
		DELETE Prod.tbAsignacionesOrden
		WHERE asor_Id = @asor_Id

		SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

---------------------------------------------/UDPS Para Asignaciones Orden--------------------------------------------

-------------------------------------------UDPS Para Asignaciones Orden detalle---------------------------------------

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrdenDetalle_Listado
AS
BEGIN
	SELECT adet_Id,						
		   lote_Id,						
		   adet_Cantidad,				
		   AsignacionesOrdenDetalle.usua_UsuarioCreacion,
		   usuarioCreacion.usua_Nombre							AS usuarioCreacionNombre,
		   adet_FechaCreacion,			
		   AsignacionesOrdenDetalle.usua_UsuarioModificacion,
		   usuarioModificacion.usua_Nombre						AS usuarioModificacionNombre,
		   adet_FechaModificacion
	  FROM Prod.tbAsignacionesOrdenDetalle		AS AsignacionesOrdenDetalle
INNER JOIN Acce.tbUsuarios usuarioCreacion		ON AsignacionesOrdenDetalle.usua_UsuarioCreacion = usuarioCreacion.usua_Id
 LEFT JOIN Acce.tbUsuarios usuarioModificacion	ON AsignacionesOrdenDetalle.usua_UsuarioModificacion = usuarioModificacion.usua_Id
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrdenDetalle_Insertar
(
	@lote_Id					INT, 
	@adet_Cantidad				INT, 
	@usua_UsuarioCreacion		INT,
	@adet_FechaCreacion			DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbAsignacionesOrdenDetalle
					(lote_Id,					
					adet_Cantidad,				
					usua_UsuarioCreacion,		
					adet_FechaCreacion)
			VALUES (@lote_Id,					
					@adet_Cantidad,				
					@usua_UsuarioCreacion,		
					@adet_FechaCreacion)
	
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrdenDetalle_Editar
(
	@adet_Id					INT,
	@lote_Id					INT, 
	@adet_Cantidad				INT, 
	@usua_UsuarioCreacion		INT,
	@adet_FechaCreacion			DATETIME
)	
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbAsignacionesOrdenDetalle
		   SET lote_Id				= @lote_Id,					 
			   adet_Cantidad		= @adet_Cantidad,					
			   usua_UsuarioCreacion	= @usua_UsuarioCreacion,		
			   adet_FechaCreacion	= @adet_FechaCreacion
		 WHERE adet_Id = @adet_Id

		 SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_tbAsignacionesOrdenDetalle_Eliminar
(
	@adet_Id	INT
)
AS
BEGIN
	BEGIN TRY
		DELETE Prod.tbAsignacionesOrdenDetalle
		 WHERE adet_Id = @adet_Id

		 SELECT 1 AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

-------------------------------------------UDPS Para Asignaciones Orden detalle---------------------------------------

--*****Pedidos Orden*****-
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Listas
AS
BEGIN
SELECT	peor_Id, 
		prov.prov_Id, 
		prov.prov_NombreCompania,
		prov.prov_NombreContacto,
		prov.prov_Ciudad,
		peor_No_Duca, 
		peor_FechaEntrada, 
		peor_Obsevaciones, 
		peor_DadoCliente, 
		peor_Est, 
		crea.usua_Nombre							AS usua_UsuarioCreacion, 
		peor_FechaCreacion, 
		modi.usua_Nombre							AS usua_UsuarioModificacion , 
		peor_FechaModificacion, 
		peor_Estado 
FROM	Prod.tbPedidosOrden po
		INNER JOIN Gral.tbProveedores prov			ON po.prov_Id = prov.prov_Id
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = po.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = po.usua_UsuarioModificacion 	
END
GO


--*****Insertar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Insertar
@prov_Id				INT, 
@peor_No_Duca			NVARCHAR(100), 
@peor_FechaEntrada		DATETIME, 
@peor_Obsevaciones		NVARCHAR(100), 
@peor_DadoCliente		BIT, 
@peor_Est				BIT, 
@usua_UsuarioCreacion	INT, 
@peor_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbPedidosOrden (prov_Id, peor_No_Duca, peor_FechaEntrada, peor_Obsevaciones, peor_DadoCliente, peor_Est, usua_UsuarioCreacion, peor_FechaCreacion)
		VALUES	(@prov_Id,				
				 @peor_No_Duca,			
				 @peor_FechaEntrada,		
				 @peor_Obsevaciones,		
				 @peor_DadoCliente,		
				 @peor_Est,				
				 @usua_UsuarioCreacion,	
				 @peor_FechaCreacion	
				 )	
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO

--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Editar
@peor_Id					INT, 
@prov_Id					INT, 
@peor_No_Duca				NVARCHAR(100), 
@peor_FechaEntrada			DATETIME, 
@peor_Obsevaciones			NVARCHAR(100), 
@peor_DadoCliente			BIT, 
@peor_Est					BIT, 
@usua_UsuarioModificacion	INT, 
@peor_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbPedidosOrden 
		SET prov_Id 				= @prov_Id, 
		peor_No_Duca				= @peor_No_Duca, 
		peor_FechaEntrada			= @peor_FechaEntrada,	 
		peor_Obsevaciones			= @peor_Obsevaciones, 
		peor_DadoCliente			= @peor_DadoCliente,
		peor_Est					= @peor_Est, 
		usua_UsuarioModificacion	= @usua_UsuarioModificacion,
		peor_FechaModificacion		= @peor_FechaModificacion	
		WHERE peor_Id				= @peor_Id
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO


/****************************************UDPs Estilos******************/
/*Listar estilos*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbEstilos_Listar
AS
BEGIN
SELECT	est.esti_Id						,
		est.esti_Descripcion			,
		usu.usua_Nombre					AS usarioCreacion,
		est.esti_FechaCreacion			,
		usu2.usua_Nombre				AS usuarioModificacion,
		est.esti_FechaModificacion		,
		est.esti_Estado					
FROM	Prod.tbEstilos est 
		INNER JOIN Acce.tbUsuarios usu	ON est.usua_UsuarioCreacion = usu.usua_Id 
		LEFT JOIN Acce.tbUsuarios usu2 ON usu2.usua_UsuarioModificacion = est.usua_UsuarioModificacion 
WHERE	esti_Estado = 1
END 

GO

/***Insertar estilos*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbEstilos_Insertar 
   @esti_Descripcion    NVARCHAR(200), 
   @usua_UsuarioCreacion        INT, 
   @esti_FechaCreacion      DATETIME
AS    
BEGIN 
   BEGIN TRY 
	 IF EXISTS(SELECT * FROM Prod.tbEstilos WHERE esti_Descripcion = @esti_Descripcion AND esti_Estado = 0)
      BEGIN 
         UPDATE Prod.tbEstilos
         SET esti_Estado = 1
         SELECT 1
      END
      ELSE 
      BEGIN 
         INSERT INTO Prod.tbEstilos (esti_Descripcion, usua_UsuarioCreacion, esti_FechaCreacion)
         VALUES (@esti_Descripcion, @usua_UsuarioCreacion, @esti_FechaCreacion)			  
         SELECT 1
      END
   END TRY
   BEGIN CATCH
      SELECT 0
   END CATCH  
END

/***Editar estilos*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstilos_Editar 
   @esti_Id                  INT,
   @esti_Descripcion         NVARCHAR(200),
   @usua_UsuarioModificacion INT,
   @esti_FechaModificacion   DATETIME
AS
BEGIN 
   BEGIN TRY 
      UPDATE Prod.tbEstilos
      SET esti_Descripcion = @esti_Descripcion, 
          usua_UsuarioModificacion = @usua_UsuarioModificacion,
          esti_FechaModificacion = @esti_FechaModificacion
      WHERE esti_Id = @esti_Id
	  SELECT 1
   END TRY 
   BEGIN CATCH 
       SELECT 0
   END CATCH
END

/*Eliminar estilos*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbEstilos_Eliminar
	@esti_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@esti_FechaEliminacion	DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'esti_Id', @esti_Id, 'Prod.tbEstilos', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					 UPDATE Prod.tbEstilos
						SET esti_Estado = 0,
						   usua_UsuarioEliminacion =@usua_UsuarioEliminacion,
						   esti_FechaEliminacion = @esti_FechaEliminacion
						WHERE esti_Id = @esti_Id
		SELECT 1
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

/****************************UDP's Clientes*********************************/
/*Listar Clientes*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbClientes_Listar
AS
BEGIN 
SELECT	clie.clie_Id					,
		clie.clie_Numero_Contacto		,
		clie.clie_Nombre_Contacto		,
		clie.clie_Correo_Electronico	,
		clie.clie_Direccion				,
		clie.clie_FAX					,
		clie.clie_RTN					,
		usu.usua_Nombre					AS usarioCreacion,
		clie.clie_FechaCreacion			,
		usu1.usua_Nombre				AS usuarioModificacion,
		clie.clie_FechaModificacion		,
		clie.clie_Estado				
FROM	Prod.tbClientes clie 
		INNER JOIN Acce.tbUsuarios usu	ON usu.usua_Id = clie.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios usu1	ON usu1.usua_Id = clie.usua_UsuarioModificacion
WHERE	clie_Estado = 1
END

GO
/*Crear Clientes*/
CREATE OR ALTER PROCEDURE prod.UDP_tbClientes_Insertar 
   @clie_Nombre_O_Razon_Social    NVARCHAR(200), 
   @clie_Direccion                NVARCHAR(250), 
   @clie_RTN                      CHAR(13), 
   @clie_Nombre_Contacto          NVARCHAR(200), 
   @clie_Numero_Contacto          CHAR(50), 
   @clie_Correo_Electronico       NVARCHAR(200), 
   @clie_FAX                      NVARCHAR(50), 
   @usua_UsuarioCreacion          INT, 
   @clie_FechaCreacion            DATETIME

AS
BEGIN 
  BEGIN TRY
  IF EXISTS(SELECT * FROM Prod.tbClientes cli WHERE cli.clie_Nombre_O_Razon_Social = @clie_Nombre_O_Razon_Social)    
	BEGIN  
	    UPDATE Prod.tbClientes
		SET 
		    clie_Nombre_O_Razon_Social=@clie_Nombre_O_Razon_Social, 
			clie_Direccion=@clie_Direccion, 
			clie_RTN=@clie_RTN, 
			clie_Nombre_Contacto=@clie_Nombre_Contacto,
			clie_Numero_Contacto=@clie_Numero_Contacto,
			clie_Correo_Electronico=@clie_Correo_Electronico, 
			clie_FAX=@clie_FAX,  
			usua_UsuarioModificacion=@usua_UsuarioCreacion, 
			clie_FechaModificacion=@clie_FechaCreacion
			WHERE clie_Nombre_O_Razon_Social= @clie_Nombre_O_Razon_Social
		SELECT 1
  END 	  
  ELSE 
	   BEGIN  
	      INSERT INTO Prod.tbClientes
		  ( 
	      clie_Nombre_O_Razon_Social,
		  clie_Direccion   ,  
		  clie_RTN          , 
		  clie_Nombre_Contacto ,
		  clie_Numero_Contacto,
		  clie_Correo_Electronico,
		  clie_FAX ,
		  usua_UsuarioCreacion,
		  clie_FechaCreacion            	  		  
		  )
		  VALUES (		         
		  @clie_Nombre_O_Razon_Social ,   
		  @clie_Direccion ,  
		  @clie_RTN ,  
		  @clie_Nombre_Contacto ,  
		  @clie_Numero_Contacto  ,  
		  @clie_Correo_Electronico,  
		  @clie_FAX,  
		  @usua_UsuarioCreacion,  
		  @clie_FechaCreacion           
		  )	 
	   SELECT 1
    END		
END TRY	    
   BEGIN CATCH 	 
	 SELECT 0
   END CATCH
END

GO
/*Editar Clientes*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbClientes_Editar 
  @clie_Id    INT, 
  @clie_Nombre_O_Razon_Social NVARCHAR(200), 
  @clie_Direccion     NVARCHAR(200), 
  @clie_RTN CHAR(13), 
  @clie_Nombre_Contacto   NVARCHAR(200),
  @clie_Numero_Contacto CHAR(50), 
  @clie_Correo_Electronico  NVARCHAR(200) , 
  @clie_FAX  NVARCHAR(50) ,  
  @usua_UsuarioModificacion INT, 
  @clie_FechaModificacion DATETIME
AS
BEGIN   
    BEGIN TRY 
	    UPDATE Prod.tbClientes
		SET clie_Nombre_O_Razon_Social =@clie_Nombre_O_Razon_Social, 
		    clie_Direccion=@clie_Direccion, 
			clie_RTN = @clie_RTN, 
			clie_Nombre_Contacto=@clie_Nombre_Contacto, 
			clie_Numero_Contacto=@clie_Numero_Contacto, 
			clie_Correo_Electronico=@clie_Correo_Electronico, 
			clie_FAX=@clie_FAX, 
			usua_UsuarioModificacion=@usua_UsuarioModificacion, 
			clie_FechaModificacion=@clie_FechaModificacion 
		WHERE clie_Id = @clie_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
	     SELECT 0
	END CATCH
END

/*Eliminar Clientes*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbClientes_Eliminar 
	@clie_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@clie_FechaEliminacion	DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'clie_Id', @clie_Id, 'Prod.tbClientes', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					 UPDATE Prod.tbClientes
						SET clie_Estado = 0, 
						     usua_UsuarioEliminacion =@usua_UsuarioEliminacion,
							 clie_FechaEliminacion =@clie_FechaEliminacion
						WHERE clie_Id = @clie_Id
		SELECT 1
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--*****ReporteModuloDia*****-
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Listar
AS
BEGIN
SELECT	remo_Id, 
		modu.modu_Id, 
		modu.modu_Nombre,
		remo_Fecha, 
		remo_TotalDia, 
		remo_TotalDanado, 
		crea.usua_Nombre usua_UsuarioCreacion, 
		remo_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		remo_FechaModificacion, 
		remo_Estado 
FROM	Prod.tbReporteModuloDia rmd 
		INNER JOIN Prod.tbModulos modu				ON rmd.modu_Id = modu.modu_Id 
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = rmd.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = rmd.usua_UsuarioModificacion 	
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Insertar
@modu_Id				INT, 
@remo_Fecha				DATE, 
@remo_TotalDia			INT, 
@remo_TotalDanado		INT, 
@usua_UsuarioCreacion	INT, 
@remo_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbReporteModuloDia (modu_Id, remo_Fecha, remo_TotalDia, remo_TotalDanado, usua_UsuarioCreacion, remo_FechaCreacion)
		VALUES (
		@modu_Id,				
		@remo_Fecha,				
		@remo_TotalDia,		
		@remo_TotalDanado,		
		@usua_UsuarioCreacion,	
		@remo_FechaCreacion
		)
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Editar
@remo_Id					INT, 
@modu_Id					INT, 
@remo_Fecha					DATE, 
@remo_TotalDia				INT, 
@remo_TotalDanado			INT, 
@usua_UsuarioModificacion	INT, 
@remo_FechaModificacion	 	DATETIME 
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbReporteModuloDia
		SET modu_Id					= @modu_Id, 
		remo_Fecha					= @remo_Fecha, 
		remo_TotalDia				= @remo_TotalDia, 
		remo_TotalDanado			= @remo_TotalDanado, 
		usua_UsuarioModificacion	= @usua_UsuarioModificacion, 
		remo_FechaModificacion		= @remo_FechaModificacion	 
		where remo_Id				= @remo_Id				
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO


--**********REVISION DE CALIDAD**********--
/*Listar revisión de calidad*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbRevisionDeCalidad_Listar
AS
BEGIN
	SELECT revi.reca_Id,
	       revi.ensa_Id, 
		   revi.reca_Descripcion, 
		   revi.reca_Cantidad, 
		   revi.reca_Scrap, 
		   revi.reca_FechaRevision, 
		   revi.reca_Imagen, 
		   revi.usua_UsuarioCreacion, 
		   usuaCrea.usua_Nombre                       AS usuarioCreacionNombre,
		   revi.reca_FechaCreacion, 
		   revi.usua_UsuarioModificacion,
		   usuaModifica.usua_Nombre                   AS usuarioModificacionNombre,
		   revi.reca_FechaModificacion, 
		   revi.reca_Estado
      FROM Prod.tbRevisionDeCalidad revi
	       LEFT JOIN  Acce.tbUsuarios usuaCrea		  ON revi.usua_UsuarioCreacion     = usuaCrea.usua_Id 
		   LEFT JOIN  Acce.tbUsuarios usuaModifica	  ON revi.usua_UsuarioModificacion = usuaModifica.usua_Id
		   INNER JOIN Prod.tbOrde_Ensa_Acab_Etiq ensa ON revi.ensa_Id                  = ensa.ensa_Id
	 WHERE reca_Estado = 1
END
GO


/*Insertar revision de calidad*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbRevisionDeCalidad_Insertar
	@ensa_Id                  INT,
	@reca_Descripcion         NVARCHAR(200),
	@reca_Cantidad            INT,
	@reca_Scrap               BIT, 
	@reca_FechaRevision       DATETIME, 
	@reca_Imagen              NVARCHAR(MAX), 
	@usua_UsuarioCreacion     INT, 
	@reca_FechaCreacion       DATETIME	 
AS 
BEGIN
	
	BEGIN TRY
		INSERT INTO Prod.tbRevisionDeCalidad(ensa_Id,
		                                     reca_Descripcion, 
											 reca_Cantidad, 
											 reca_Scrap, 
											 reca_FechaRevision, 
											 reca_Imagen, 
											 usua_UsuarioCreacion, 
											 reca_FechaCreacion)
		      VALUES(@ensa_Id,
			         @reca_Descripcion, 
					 @reca_Cantidad, 
					 @reca_Scrap, 
					 @reca_FechaRevision, 
					 @reca_Imagen, 
					 @usua_UsuarioCreacion, 
					 @reca_FechaCreacion)
		
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

/*Editar revision de calidad*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbRevisionDeCalidad_Editar
	@reca_Id                  INT, 
	@ensa_Id                  INT, 
	@reca_Descripcion         NVARCHAR(200), 
	@reca_Cantidad            INT, 
	@reca_Scrap               BIT, 
	@reca_FechaRevision       DATETIME,
	@reca_Imagen              NVARCHAR(MAX),
	@usua_UsuarioModificacion INT, 
	@reca_FechaModificacion   DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Prod.tbRevisionDeCalidad
		SET		ensa_Id                  = @ensa_Id                 ,
		        reca_Descripcion         = @reca_Descripcion        ,
				reca_Cantidad            = @reca_Cantidad           ,
				reca_Scrap               = @reca_Scrap              ,
				reca_FechaRevision       = @reca_FechaRevision      ,
				reca_Imagen              = @reca_Imagen             ,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				reca_FechaModificacion   = @reca_FechaModificacion
		WHERE	reca_Id                  = @reca_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--************PROCESO******************--
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
--************AREA******************--
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

--************TALLA******************--
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
--************TIPO EMBALAJE******************--
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

--************ORDEN ENSABLAJE ACBADO ETIQUEDATO******************--
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

--************SUBCATEGORIA******************--
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
--************MATERIALES******************--
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

--************INSPECCION ESTADO******************--
/*Listar INSPECCION ESTADO*/
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
--************MODULOS******************--
/*Listar Modulos*/
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
GO
--************MAQUINAS******************--
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

--************MARCAS MAQUINAS******************--
/*Listar MarcasMaquina*/
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

/*Insertar MarcasMaquina*/
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

/*Editar  MarcasMaquina*/
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

/*Eliminar  MarcasMaquina*/
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

--************MODELOS MAQUINA******************--
/*Listar ModelosMaquina*/
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

/*Insertar ModelosMaquina*/
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

/*Editar ModelosMaquina*/
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

/*Eliminar ModelosMaquina*/
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

--************FUNCIONES MAQUINA******************--
/*Listar FUNCIONES MAQUINA*/
CREATE OR ALTER PROCEDURE prod.UDP_tbFuncionesMaquina_Listar
AS
BEGIN

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

END
GO

/*Insertar FUNCIONES MAQUINA*/
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
/*Editar FUNCIONES MAQUINA*/
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
/*Eliminar FUNCIONES MAQUINA*/
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

--************CATEGORIA******************--
/*Listar CATEGORIA*/
CREATE OR ALTER PROCEDURE prod.UDP_tbCategoria_Listar
AS
BEGIN

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

END
GO
/*Insertar CATEGORIA*/
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

/*Editar CATEGORIA*/
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
/*Eliminar CATEGORIA*/
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

--*****Pedidos Orden*****-
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Listas
AS
BEGIN
SELECT	peor_Id, 
		prov.prov_Id, 
		prov.prov_NombreCompania,
		prov.prov_NombreContacto,
		prov.prov_Ciudad,
		peor_No_Duca, 
		peor_FechaEntrada, 
		peor_Obsevaciones, 
		peor_DadoCliente, 
		peor_Est, 
		crea.usua_Nombre							AS usua_UsuarioCreacion, 
		peor_FechaCreacion, 
		modi.usua_Nombre							AS usua_UsuarioModificacion , 
		peor_FechaModificacion, 
		peor_Estado 
FROM	Prod.tbPedidosOrden po
		INNER JOIN Gral.tbProveedores prov			ON po.prov_Id = prov.prov_Id
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = po.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = po.usua_UsuarioModificacion 	
END
GO


--*****Insertar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Insertar
@prov_Id				INT, 
@peor_No_Duca			NVARCHAR(100), 
@peor_FechaEntrada		DATETIME, 
@peor_Obsevaciones		NVARCHAR(100), 
@peor_DadoCliente		BIT, 
@peor_Est				BIT, 
@usua_UsuarioCreacion	INT, 
@peor_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbPedidosOrden (prov_Id, peor_No_Duca, peor_FechaEntrada, peor_Obsevaciones, peor_DadoCliente, peor_Est, usua_UsuarioCreacion, peor_FechaCreacion)
		VALUES	(@prov_Id,				
				 @peor_No_Duca,			
				 @peor_FechaEntrada,		
				 @peor_Obsevaciones,		
				 @peor_DadoCliente,		
				 @peor_Est,				
				 @usua_UsuarioCreacion,	
				 @peor_FechaCreacion	
				 )	
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO

--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Editar
@peor_Id					INT, 
@prov_Id					INT, 
@peor_No_Duca				NVARCHAR(100), 
@peor_FechaEntrada			DATETIME, 
@peor_Obsevaciones			NVARCHAR(100), 
@peor_DadoCliente			BIT, 
@peor_Est					BIT, 
@usua_UsuarioModificacion	INT, 
@peor_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbPedidosOrden 
		SET prov_Id 				= @prov_Id, 
		peor_No_Duca				= @peor_No_Duca, 
		peor_FechaEntrada			= @peor_FechaEntrada,	 
		peor_Obsevaciones			= @peor_Obsevaciones, 
		peor_DadoCliente			= @peor_DadoCliente,
		peor_Est					= @peor_Est, 
		usua_UsuarioModificacion	= @usua_UsuarioModificacion,
		peor_FechaModificacion		= @peor_FechaModificacion	
		WHERE peor_Id				= @peor_Id
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO


--*****ReporteModuloDia*****-
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Listar
AS
BEGIN
SELECT	remo_Id, 
		modu.modu_Id, 
		modu.modu_Nombre,
		remo_Fecha, 
		remo_TotalDia, 
		remo_TotalDanado, 
		crea.usua_Nombre usua_UsuarioCreacion, 
		remo_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		remo_FechaModificacion, 
		remo_Estado 
FROM	Prod.tbReporteModuloDia rmd 
		INNER JOIN Prod.tbModulos modu				ON rmd.modu_Id = modu.modu_Id 
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = rmd.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = rmd.usua_UsuarioModificacion 	
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Insertar
@modu_Id				INT, 
@remo_Fecha				DATE, 
@remo_TotalDia			INT, 
@remo_TotalDanado		INT, 
@usua_UsuarioCreacion	INT, 
@remo_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbReporteModuloDia (modu_Id, remo_Fecha, remo_TotalDia, remo_TotalDanado, usua_UsuarioCreacion, remo_FechaCreacion)
		VALUES (
		@modu_Id,				
		@remo_Fecha,				
		@remo_TotalDia,		
		@remo_TotalDanado,		
		@usua_UsuarioCreacion,	
		@remo_FechaCreacion
		)
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Editar
@remo_Id					INT, 
@modu_Id					INT, 
@remo_Fecha					DATE, 
@remo_TotalDia				INT, 
@remo_TotalDanado			INT, 
@usua_UsuarioModificacion	INT, 
@remo_FechaModificacion	 	DATETIME 
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbReporteModuloDia
		SET modu_Id					= @modu_Id, 
		remo_Fecha					= @remo_Fecha, 
		remo_TotalDia				= @remo_TotalDia, 
		remo_TotalDanado			= @remo_TotalDanado, 
		usua_UsuarioModificacion	= @usua_UsuarioModificacion, 
		remo_FechaModificacion		= @remo_FechaModificacion	 
		where remo_Id				= @remo_Id				
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO



/*Listar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Listar
AS
BEGIN
	SELECT	mahi_Id, 
			maquiHisto.maqu_Id, 
			maquina.maqu_NumeroSerie		AS MaquinaNumeroSerie,
			mahi_FechaInicio, 
			mahi_FechaFin, 
			mahi_Observaciones, 
			maquiHisto.usua_UsuarioCreacion, 
			usuarioCrea.usua_Nombre			AS  usuarioCreacionNombre, 
			mahi_FechaCreacion, 
			maquiHisto.usua_UsuarioModificacion, 
			usuarioModifica.usua_Nombre		AS usuarioModificaNombre,
			mahi_FechaModificacion, 
			maquiHisto.usua_UsuarioEliminacion, 
			usuarioElimina.usua_Nombre		AS usuarioEliminaNombre,
			mahi_FechaEliminacion, 
			mahi_Estado
	FROM	[Prod].[tbMaquinaHistorial] maquiHisto 
	INNER JOIN [Prod].[tbMaquinas]	maquina				ON maquiHisto.maqu_Id = maquina.maqu_Id
	LEFT JOIN  [Acce].[tbUsuarios]	usuarioCrea			ON maquiHisto.usua_UsuarioCreacion = usuarioCrea.usua_Id 
	LEFT JOIN  [Acce].[tbUsuarios]	usuarioModifica		ON maquiHisto.usua_UsuarioModificacion = usuarioModifica.usua_Id	
	LEFT JOIN  [Acce].[tbUsuarios]	usuarioElimina		ON maquiHisto.usua_UsuarioEliminacion = usuarioElimina.usua_Id
END

/*Insertar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Insertar
	@maqu_Id				INT, 
	@mahi_FechaInicio		DATETIME, 
	@mahi_FechaFin			DATETIME, 
	@mahi_Observaciones		NVARCHAR(350), 
	@usua_UsuarioCreacion	INT, 
	@mahi_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Prod].[tbMaquinaHistorial](maqu_Id, 
												mahi_FechaInicio, 
												mahi_FechaFin, 
												mahi_Observaciones, 
												usua_UsuarioCreacion, 
												mahi_FechaCreacion)
		VALUES(@maqu_Id,@mahi_FechaInicio,@mahi_FechaFin,@mahi_Observaciones,@usua_UsuarioCreacion,@mahi_FechaCreacion)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

/*Editar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Editar
	@mahi_Id					INT,
	@maqu_Id					INT, 
	@mahi_FechaInicio			DATETIME, 
	@mahi_FechaFin				DATETIME, 
	@mahi_Observaciones			NVARCHAR(350), 
	@usua_UsuarioModificacion	INT, 
	@mahi_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbMaquinaHistorial]
		SET maqu_Id						= @maqu_Id, 
			mahi_FechaInicio			= @mahi_FechaInicio, 
			mahi_FechaFin				= @mahi_FechaFin, 
			mahi_Observaciones			= @mahi_Observaciones, 
			usua_UsuarioModificacion	= @usua_UsuarioModificacion, 
			mahi_FechaModificacion		= @mahi_FechaModificacion
		WHERE mahi_Id = @mahi_Id

		SELECT 1

	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

/*Editar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Eliminar
	@mahi_Id					INT,
	@usua_UsuarioEliminacion	INT, 
	@mahi_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbMaquinaHistorial]
		SET usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
			mahi_FechaEliminacion = @mahi_FechaEliminacion,
			mahi_Estado = 0
		WHERE mahi_Id = @mahi_Id

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO



/* LISTAR MATERIALES BRINDAR */
CREATE OR ALTER PROC prod.UDP_tbMaterialesBrindar_Listar
AS
BEGIN
	SELECT	mabr_Id, 
			code_Id, 
			mate_Id, 
			mabr_Cantidad, 
			usua_UsuarioCreacion, 
			mabr_FechaCreacion,
			usua_UsuarioModificacion,
			mabr_FechaModificacion, 
			mabr_Estado
			FROM [Prod].[tbMaterialesBrindar]
END

GO


/* INSERTAR MATERIALES BRINDAR */
CREATE OR ALTER PROC prod.UDP_tbMaterialesBrindar_Insertar 
@code_Id					INT, 
@mate_Id					INT, 
@mabr_Cantidad				INT, 
@usua_UsuarioCreacion		INT, 
@mabr_FechaCreacion			DATETIME
AS 
BEGIN
	BEGIN TRY

		INSERT INTO [Prod].[tbMaterialesBrindar]
		(code_Id, 
		 mate_Id, 
		 mabr_Cantidad, 
		 usua_UsuarioCreacion, 
		 mabr_FechaCreacion
		 )
		VALUES
		(@code_Id,				
		 @mate_Id,				
		 @mabr_Cantidad,	
		 @usua_UsuarioCreacion,
		 @mabr_FechaCreacion		
		)
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

GO


/* EDITAR MATERIALES BRINDAR */
CREATE OR ALTER PROC prod.UDP_tbMaterialesBrindar_Editar
@mabr_Id					INT,
@code_Id					INT, 
@mate_Id					INT, 
@mabr_Cantidad				INT, 
@usua_UsuarioModificacion	INT, 
@mabr_FechaModificacion		DATETIME
AS 
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbMaterialesBrindar]
		SET		code_Id						= @code_Id,				
				mate_Id						= @mate_Id,				 
				mabr_Cantidad				= @mabr_Cantidad,	
				usua_UsuarioCreacion		= @usua_UsuarioModificacion,
				mabr_FechaCreacion			= @mabr_FechaModificacion	
		WHERE	mabr_Id						= @mabr_Id
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

GO

--------------------------------------------------------------- TABLA REPORTE MODULO DIA DETALLE ---------------------------------------------------------------
/* LISTAR REPORTE MODULO DIA DETALLE */
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDiaDetalle_Listar	
AS
BEGIN
	SELECT	rdet_Id, 
			remo_Id, 
			rdet_TotalDia, 
			rdet_TotalDanado, 
			code_Id, 
			usua_UsuarioCreacion, 
			rdet_FechaCreacion, 
			usua_UsuarioModificacion, 
			rdet_FechaModificacion, 
			rdet_Estado 
	FROM	Prod.tbReporteModuloDiaDetalle
END
GO


/* INSERTAR REPORTE MODULO DETALLE  */
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDiaDetalle_Insertar				
	@remo_Id 					INT,
	@rdet_TotalDia				INT,
	@rdet_TotalDanado			INT,
	@code_Id					INT,
	@usua_UsuarioCreacion		INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbReporteModuloDiaDetalle(	remo_Id, 
													rdet_TotalDia, 
													rdet_TotalDanado, 
													code_Id, 
													usua_UsuarioCreacion, 
													rdet_FechaCreacion)
		VALUES(	@remo_Id,
				@rdet_TotalDia,
				@rdet_TotalDanado,
				@code_Id,
				@usua_UsuarioCreacion,
				GETDATE())

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO


/* EDITAR REPORTE MODULO DIA DETALLE */
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDiaDetalle_Editar
	@rdet_Id						INT,
	@remo_Id 						INT,
	@rdet_TotalDia					INT,
	@rdet_TotalDanado				INT,
	@code_Id						INT,
	@usua_UsuarioModificacion		INT
AS
BEGIN
	BEGIN TRY
		UPDATE	Prod.tbReporteModuloDiaDetalle 
		SET		remo_Id						=	@remo_Id, 
				rdet_TotalDia				=	@rdet_TotalDia, 
				rdet_TotalDanado			=	@rdet_TotalDanado, 
				code_Id						=	@code_Id,
				usua_UsuarioModificacion	=	@usua_UsuarioModificacion,
				rdet_FechaModificacion		=	GETDATE()
		WHERE	rdet_Id						=	@rdet_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO


/* ELIMINAR REPORTE MODULO DIA DETALLE */
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDiaDetalle_Eliminar
	@rdet_Id	INT
AS
BEGIN
	BEGIN TRY 
		UPDATE Prod.tbReporteModuloDiaDetalle
		SET rdet_Estado = 0
		WHERE rdet_Id = @rdet_Id

		SELECT 1
	END TRY
	BEGIN CATCH 
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH 
END
GO

-------------------------------------UDPS codigo impuesto----------------------------------
--INSERT
CREATE OR ALTER PROCEDURE Adua.UDP_tbCodigoImpuesto_Listar
AS
BEGIN
	SELECT codi.coim_Id                 AS IdImpuesto,							
		   codi.coim_Descripcion        AS CodigoImpuestoDescripcion,						
	       codi.usua_UsuarioCreacion,		
	       usuaCrea.usua_Nombre			AS usuarioCreacionNombre,
	       coim_FechaCreacion,				
	       codi.usua_UsuarioModificacion,	
	       usuaModifica.usua_Nombre		AS usuarioModificacionNombre,
	       [coim_FechaModificacion],			
	       codi.usua_UsuarioEliminacion	,
	       usuaElimina.usua_Nombre			AS usuarioEliminacionNombre,
	       coim_FechaEliminacion,			
	       coim_Estado				
    FROM  [Adua].[tbCodigoImpuesto] codi 
	INNER JOIN [Acce].[tbUsuarios] usuaCrea		ON codi.usua_UsuarioCreacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaModifica	ON codi.usua_UsuarioModificacion = usuaCrea.usua_Id 
	LEFT JOIN [Acce].[tbUsuarios] usuaElimina	ON codi.usua_UsuarioEliminacion = usuaCrea.usua_Id
	WHERE coim_Estado = 1
END
GO

--INSERT
CREATE OR ALTER PROCEDURE Adua.UDP_tbCodigoImpuesto_Insertar 
	@coim_Descripcion		NVARCHAR(200),
	@usua_UsuarioCreacion	INT,
	@coim_FechaCreacion     DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS(SELECT [coim_Id] FROM [Adua].[tbCodigoImpuesto] WHERE [coim_Descripcion] = @coim_Descripcion  AND [coim_Estado] = 0)
			BEGIN
				UPDATE [Adua].[tbCodigoImpuesto]
				SET	   [coim_Estado] = 1
				WHERE  [coim_Descripcion] = @coim_Descripcion 
				SELECT 1
			END
		ELSE
			BEGIN 
				INSERT INTO [Adua].[tbCodigoImpuesto] ([coim_Descripcion], 
											   usua_UsuarioCreacion, 
											   [coim_FechaCreacion])
			VALUES(@coim_Descripcion,	
				   @usua_UsuarioCreacion,
				   @coim_FechaCreacion)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
				SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END 
GO

--EDITAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbCodigoImpuesto_Editar 
	@coim_Id					INT,
	@coim_Descripcion			NVARCHAR(200),
	@usua_UsuarioModificacion	INT,
	@coim_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Adua].[tbCodigoImpuesto]
		SET		[coim_Descripcion] = @coim_Descripcion,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[coim_FechaModificacion] = @coim_FechaModificacion
		WHERE	[coim_Id] = @coim_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--ELIMINAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbCodigoImpuesto_Eliminar 
	@coim_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@coim_FechaEliminacion	DATETIME
AS
BEGIN
	SET @coim_FechaEliminacion = GETDATE();
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'coim_Id', @coim_Id, 'Adua.tbCodigoImpuesto', @respuesta OUTPUT

		SELECT @respuesta AS Resultado
		IF(@respuesta = 1)
			BEGIN
				UPDATE	[Adua].[tbCodigoImpuesto]
				SET		[coim_Estado] = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						[coim_FechaEliminacion] = @coim_FechaEliminacion
				WHERE	[coim_Id] = @coim_Id
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()		
	END CATCH
END
GO
-----------------UDPS tbImpuestos----------------------
--LISTAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbImpuestos_Listar
AS
BEGIN
	SELECT	impu.[impu_Id]          AS IdImpuesto,
		    impu.[aran_Codigo]      AS ArancelCodigo,
		    impu.[impu_Descripcion] AS DescripcionImpuesto,
			impu.[impu_Impuesto]    AS Impuesto,
		   		
			usu.usua_Id             AS IDUsuarioCreacion,
			usu.usua_Nombre         AS UsuarioCreacion ,
			impu_FechaCreacion      AS FechaCreacion,

			usu1.usua_Id            AS IDUsuarioModificacion,
			usu1.usua_Nombre        AS UsuarioModificacion,
			impu_FechaModificacion  AS FechaModificacion
 
  FROM	    [Adua].[tbImpuestos] impu
			INNER JOIN Acce.tbUsuarios usu ON usu.usua_Id = impu.usua_UsuarioCreacion 
			LEFT JOIN Acce.tbUsuarios usu1 ON usu1.usua_UsuarioModificacion = impu.usua_UsuarioModificacion
			WHERE impu.impu_Estado = 1
END
GO
 
--INSERTAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbImpuestos_Insertar 
	@aran_Codigo		    NVARCHAR(100),
	@impu_Descripcion       NVARCHAR(150),
	@impu_Impuesto          DECIMAL(18,2),
	@usua_UsuarioCreacion	INT,
	@impu_FechaCreacion     DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS(SELECT [impu_Id] FROM [Adua].[tbImpuestos] WHERE [aran_Codigo] = @aran_Codigo AND [impu_Descripcion] = @impu_Descripcion AND impu_Impuesto = @impu_Impuesto AND [impu_Estado] = 0)
			BEGIN
				UPDATE [Adua].[tbImpuestos]
				SET	   [impu_Estado] = 1
				WHERE  [aran_Codigo] = @aran_Codigo AND [impu_Descripcion] = @impu_Descripcion AND impu_Impuesto = @impu_Impuesto
				SELECT 1
			END
		ELSE
			BEGIN 
				INSERT INTO [Adua].[tbImpuestos] ([aran_Codigo], 
				                                  [impu_Descripcion],
												  impu_Impuesto,
											      usua_UsuarioCreacion, 
											      [impu_FechaCreacion])
			VALUES(@aran_Codigo,	
			       @impu_Descripcion,
				   @impu_Impuesto,
				   @usua_UsuarioCreacion,
				   @impu_FechaCreacion)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
				SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END 
GO

--EDITAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbImpuestos_Editar 
    @impu_Id                    INT,
	@aran_Codigo		        NVARCHAR(100),
	@impu_Descripcion           NVARCHAR(150),
	@impu_Impuesto              DECIMAL(18,2),
	@usua_UsuarioModificacion	INT,
	@impu_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Adua].[tbImpuestos]
		SET		[aran_Codigo] = @aran_Codigo,
		        impu_Descripcion = @impu_Descripcion,
				[impu_Impuesto] = @impu_Impuesto,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[impu_FechaModificacion] = @impu_FechaModificacion
		WHERE	impu_Id = @impu_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--------------------------UDPS Impuesto por Arancel-----------------------
--LISTAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbImpuestosPorArancel_Listar
AS
BEGIN
	SELECT	imar.[imar_Id]          AS IdImpuestoPorArancel,
		    impu.[impu_Id]          AS ArancelCodigo,
		    aran.[aran_Id]          AS DescripcionImpuesto,
		   		
			usu.usua_Id             AS IDUsuarioCreacion,
			usu.usua_Nombre         AS UsuarioCreacion ,
			impu_FechaCreacion      AS FechaCreacion,

			usu1.usua_Id            AS IDUsuarioModificacion,
			usu1.usua_Nombre        AS UsuarioModificacion,
			impu_FechaModificacion  AS FechaModificacion
 
  FROM	    [Adua].[tbImpuestosPorArancel] imar
            INNER JOIN [Adua].[tbImpuestos] impu ON imar.impu_Id = impu.impu_Id
			INNER JOIN Acce.tbUsuarios usu ON usu.usua_Id = impu.usua_UsuarioCreacion 
			LEFT JOIN Acce.tbUsuarios usu1 ON usu1.usua_UsuarioModificacion = impu.usua_UsuarioModificacion
			INNER JOIN [Adua].[tbAranceles] aran ON imar.aran_Id = aran.aran_Id 
			WHERE imar.[imar_Estado] = 1
END
GO

--INSERTAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbImpuestosPorArancel_Insertar 
	@impu_Id     		    INT,
	@aran_Id                INT,
	@usua_UsuarioCreacion	INT,
	@imar_FechaCreacion     DATETIME
AS
BEGIN
	BEGIN TRY
		IF EXISTS(SELECT [imar_Id] FROM [Adua].[tbImpuestosPorArancel] WHERE [impu_Id] = @impu_Id AND aran_Id = @aran_Id AND [imar_Estado] = 0)
			BEGIN
				UPDATE [Adua].[tbImpuestosPorArancel]
				SET	   [imar_Estado] = 1
				WHERE  [impu_Id] = @impu_Id AND aran_Id = @aran_Id
				SELECT 1
			END
		ELSE
			BEGIN 
				INSERT INTO [Adua].[tbImpuestosPorArancel] ([impu_Id], 
				                                            aran_Id,
											                usua_UsuarioCreacion, 
											                [imar_FechaCreacion])
			VALUES(@impu_Id,	
			       @aran_Id,			
				   @usua_UsuarioCreacion,
				   @imar_FechaCreacion)
				SELECT 1
			END
	END TRY
	BEGIN CATCH
				SELECT 'Error Message: ' + ERROR_MESSAGE()	
	END CATCH
END 
GO

--EDITAR
CREATE OR ALTER PROCEDURE Adua.UDP_tbImpuestosPorArancel_Editar 
    @imar_Id                    INT,
	@impu_Id     		        INT,
	@aran_Id                    INT,
	@usua_UsuarioModificacion	INT,
	@imar_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Adua].[tbImpuestosPorArancel]
		SET		[impu_Id] = @impu_Id,
		        [aran_Id] = @aran_Id,
				[usua_UsuarioModificacion] = @usua_UsuarioModificacion,
				[imar_FechaModificacion] = @imar_FechaModificacion
		WHERE	imar_Id = @imar_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

----------------------------UDPS Pedidos Orden Detalle-----------------------------
--LISTAR
CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrdenDetalle_Listar
AS
BEGIN
  SELECT    prod.prod_Id            AS IdPedidosOrdenDetalle,
		    prod.pedi_Id            AS IdPedidosDetalles,
		    prod.mate_Id            AS IdMaterial,
		    prod.prod_Cantidad      AS Cantidad,
			prod.prod_Precio        AS Precio,
			prod.prod_Peso          AS Peso,
		   		
			usu.usua_Id             AS IDUsuarioCreacion,
			usu.usua_Nombre         AS UsuarioCreacion ,
			prod_FechaCreacion      AS FechaCreacion,

			usu1.usua_Id            AS IDUsuarioModificacion,
			usu1.usua_Nombre        AS UsuarioModificacion,
			prod_FechaModificacion  AS FechaModificacion
 
  FROM	    [Prod].[tbPedidosOrdenDetalle] prod
            INNER JOIN [Prod].[tbPedidosOrden] pedi ON prod.pedi_Id = pedi.peor_Id
			INNER JOIN Acce.tbUsuarios usu          ON usu.usua_Id = prod.usua_UsuarioCreacion 
			LEFT JOIN Acce.tbUsuarios usu1          ON usu1.usua_UsuarioModificacion = prod.usua_UsuarioModificacion
			INNER JOIN [Prod].[tbMateriales] mate   ON prod.mate_Id = mate.mate_Id
			WHERE prod.[prod_Estado] = 1
END 
GO

--INSERTAR
CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrdenDetalle_Insertar
(
     @pedi_Id                    INT,
	 @mate_Id                    INT,
	 @prod_Cantidad              INT,
	 @prod_Precio                DECIMAL(18,2),
	 @prod_Peso                  DECIMAL(18,2),
	 @usua_UsuarioCreacion       INT,
	 @prod_FechaCreacion         DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Prod].[tbPedidosOrdenDetalle]
					(
					  [pedi_Id],
                      [mate_Id],
                      [prod_Cantidad],
                      [prod_Precio],
                      [prod_Peso],
                      [usua_UsuarioCreacion],
                      [prod_FechaCreacion]
					)
			 VALUES (
			           @pedi_Id,
					   @mate_Id,
					   @prod_Cantidad,
					   @prod_Precio,
					   @prod_Peso,
					   @usua_UsuarioCreacion,
					   @prod_FechaCreacion
			        )
		
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

--EDITAR
CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrdenDetalle_Editar
(
     @prod_Id                    INT,
     @pedi_Id                    INT,
	 @mate_Id                    INT,
	 @prod_Cantidad              INT,
	 @prod_Precio                DECIMAL(18,2),
	 @prod_Peso                  DECIMAL(18,2),
	 @usua_UsuarioModificacion   INT,
	 @prod_FechaModificacion     DATETIME
)
AS
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbPedidosOrdenDetalle]
		   SET [pedi_Id] = @pedi_Id,
		       [mate_Id] = @mate_Id,
               [prod_Cantidad] = @prod_Cantidad,
               [prod_Precio] = @prod_Precio,
               [prod_Peso] = @prod_Peso,
               [usua_UsuarioModificacion] = @usua_UsuarioModificacion,
               [prod_FechaModificacion] = @prod_FechaModificacion
		 WHERE [prod_Id] = @prod_Id
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

--********************************************LOTES***********************************************--
CREATE OR ALTER PROCEDURE Prod.UDP_tbLotes_Listar
AS BEGIN

SELECT lote_Id, 
	   materiales.mate_Descripcion,
	   lotes.mate_Id, 
	   UnidadesMedida.unme_Id,
	   lote_Observaciones,
	   lote_Stock,
	   lote_CantIngresada,
	   areas.tipa_area,
	   areas.tipa_id,
	   UsuCreacion.usua_Nombre AS UsuarioCreacion,
	   lotes.usua_UsuarioCreacion,
	   lotes.lote_FechaCreacion, 
	   UsuModificacion.usua_Nombre AS UsuarioModificacion,
	   lotes.usua_UsuarioModificacion,
	   lotes.lote_FechaModificacion, 
	   UsuEliminacion.usua_Nombre AS UsuarioEliminacion,
	   lotes.usua_UsuarioEliminacion, 
	   lotes.lote_FechaEliminacion, 
	   lotes.lote_Estado
  FROM Prod.tbLotes lotes
	   INNER JOIN Prod.tbMateriales AS materiales
	   ON lotes.mate_Id = materiales.mate_Id
	   INNER JOIN Prod.tbArea AS areas
	   ON lotes.tipa_id = areas.tipa_id
	   INNER JOIN Acce.tbUsuarios AS UsuCreacion
	   ON lotes.usua_UsuarioCreacion = UsuCreacion.usua_Id
	   INNER JOIN Acce.tbUsuarios AS UsuModificacion
	   ON lotes.usua_UsuarioModificacion = UsuModificacion.usua_Id
	   INNER JOIN Acce.tbUsuarios AS UsuEliminacion
	   ON lotes.usua_UsuarioEliminacion = UsuEliminacion.usua_Id
	   INNER JOIN Gral.tbUnidadMedidas AS UnidadesMedida
	   ON lotes.unme_Id = UnidadesMedida.unme_Id
  WHERE lotes.lote_Estado = 1

END
GO


CREATE OR ALTER PROC Prod.UDP_tbLotes_Insertar
@mate_Id				INT,
@unme_Id				INT,
@lote_Stock				INT,
@lote_CantIngresada		INT,
@tipa_Id				INT,
@lote_Observaciones		NVARCHAR(MAX),
@usua_UsuarioCreacion	INT,
@lote_FechaCreacion		DATETIME
AS BEGIN

BEGIN TRY
	INSERT INTO Prod.tbLotes(mate_Id, 
							 unme_Id,
						     lote_Stock, 
							 lote_CantIngresada, 
							 tipa_Id, 
							 lote_Observaciones,
							 usua_UsuarioCreacion,
							 lote_FechaCreacion)

	VALUES					(@mate_Id,		
							 @unme_Id,
							 @lote_Stock,			
							 @lote_CantIngresada,	
							 @tipa_Id,
							 @lote_Observaciones,
							 @usua_UsuarioCreacion,
							 @lote_FechaCreacion)
END TRY

BEGIN CATCH

		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH
END	
GO


CREATE OR ALTER PROC Prod.UDP_tbLotes_Editar
@lote_Id				  INT,
@mate_Id				  INT,
@unme_Id				  INT,
@lote_Stock				  INT,
@lote_CantIngresada		  INT,
@tipa_Id				  INT,
@lote_Observcaciones	  NVARCHAR(MAX),
@usua_UsuarioModificacion INT,
@lote_FechaModificacion	  DATETIME
AS BEGIN

	UPDATE Prod.tbLotes SET  mate_Id = @mate_Id, 
						     unme_Id = @unme_Id,
						     lote_Stock = @lote_Stock, 
							 lote_CantIngresada = @lote_CantIngresada, 
							 tipa_Id = @tipa_Id, 
							 lote_Observaciones = @lote_Observcaciones,
							 usua_UsuarioModificacion = @usua_UsuarioModificacion,
							 lote_FechaModificacion = lote_FechaModificacion
						WHERE lote_Id = @lote_Id
END	

GO


CREATE OR ALTER PROC Prod.UDP_tbLotes_Eliminar
@lote_Id					INT,
@usua_UsuarioEliminacion    INT,
@lote_FechaEliminacion      DATETIME

AS BEGIN

	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'lote_Id', @lote_Id, 'Prod.tbAsignacionesOrdenDetalle', @respuesta OUTPUT

		
		IF(@respuesta) = 1
			BEGIN
				 UPDATE Prod.tbLotes
					SET lote_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						lote_FechaEliminacion = @lote_FechaEliminacion
				  WHERE lote_Id = @lote_Id 
					AND lote_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();	
	END CATCH

END
GO

--**************************************************************************************************--


--*********************************************COLORES**********************************************--

CREATE OR ALTER PROC Prod.UDP_tbColores_Listar
AS BEGIN

SELECT colr_Id,
	   colr_Nombre,
	   colr_Codigo,
	   colores.usua_UsuarioCreacion AS UsuCreacion, 
	   Creacion.usua_Nombre,
	   colores.colr_FechaCreacion,
	   colores.usua_UsuarioModificacion AS usuModificacion,
	   Modificacion.usua_Nombre,
	   colores.colr_FechaModificacion, 
	   colores.usua_UsuarioEliminacion AS usuEliminacion,
	   Eliminacion.usua_Nombre,
	   colores.colr_FechaEliminacion,
	   colores.colr_Estado 
FROM   Prod.tbColores colores
INNER JOIN Acce.tbUsuarios Creacion
ON Creacion.usua_Id = colores.usua_UsuarioCreacion
INNER JOIN Acce.tbUsuarios Modificacion
ON Modificacion.usua_Id = colores.usua_UsuarioModificacion
INNER JOIN Acce.tbUsuarios Eliminacion
ON Eliminacion.usua_Id = colores.usua_UsuarioEliminacion

END
GO


CREATE OR ALTER PROC Prod.UDP_tbColores_Insertar
@colr_Nombre NVARCHAR(100),
@colr_Codigo NVARCHAR(100),
@usua_UsuarioCreacion INT,
@colr_FechaCreacion DATETIME
AS BEGIN

BEGIN TRY
INSERT INTO Prod.tbColores(colr_Nombre, 
					       colr_Codigo,
						   usua_UsuarioCreacion, 
						   colr_FechaCreacion)
VALUES (@colr_Nombre, 
		@colr_Codigo,
		@usua_UsuarioCreacion, 
		@colr_FechaCreacion)

END TRY

BEGIN CATCH

		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH
END
GO


CREATE OR ALTER PROC Prod.UDP_tbColores_Editar
@colr_Id INT,
@colr_Nombre NVARCHAR(100),
@colr_Codigo NVARCHAR(100),
@usua_UsuarioModificacion INT,
@colr_FechaModificacion DATETIME
AS BEGIN

BEGIN TRY

UPDATE Prod.tbColores SET colr_Nombre = @colr_Nombre,
						  colr_Codigo = @colr_Codigo,
						  usua_UsuarioModificacion = @usua_UsuarioModificacion,
						  colr_FechaModificacion = @colr_FechaModificacion
					  WHERE colr_Id = @colr_Id

END TRY

BEGIN CATCH

		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH

END
GO


CREATE OR ALTER PROC Prod.UDP_tbColores_Eliminar
@colr_Id INT,
@usua_UsuarioEliminacion INT,
@colr_FechaEliminacion DATETIME
AS BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'colr_Id', @colr_Id, 'Prod.tbOrdenCompraDetalles', @respuesta OUTPUT

		
		IF(@respuesta) = 1
			BEGIN
				 UPDATE Prod.tbColores
					SET colr_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						colr_FechaEliminacion = @colr_FechaEliminacion
				  WHERE colr_Id = @colr_Id
					AND colr_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();	
	END CATCH

END
GO

--**************************************************************************************************--











--***************************************PEDIDOS PRODUCCION*****************************************--

CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccion_Listar
AS BEGIN

SELECT ppro_Id,
	   pediproduccion.empl_Id,
	   CONCAT(empl_Nombres, ' ', empl_Apellidos) AS empl_NombreCompleto,
	   ppro_Fecha,
	   ppro_Estados, 
	   ppro_Observaciones, 
	   Creacion.usua_Nombre AS usuCreacion,
	   pediproduccion.usua_UsuarioCreacion,
	   ppro_FechaCreacion,
	   Modificacion.usua_Nombre AS usuModificacion,
	   pediproduccion.usua_UsuarioModificacion, 
	   ppro_FechaModificacion,
	   ppro_Estado
FROM Prod.tbPedidosProduccion pediproduccion
INNER JOIN Gral.tbEmpleados emples
ON pediproduccion.empl_Id = emples.empl_Id
INNER JOIN Acce.tbUsuarios Creacion
ON pediproduccion.usua_UsuarioCreacion = Creacion.usua_Id
INNER JOIN Acce.tbUsuarios Modificacion
ON pediproduccion.usua_UsuarioModificacion = Modificacion.usua_Id

END
GO


CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccion_Insertar
@empl_Id INT,
@ppro_Fecha DATETIME,
@ppro_Estados NVARCHAR(150),
@ppr_Observaciones NVARCHAR(MAX),
@usua_UsuarioCreacion INT,
@ppro_FechaCreacion DATETIME,
@lote_Id INT,
@ppde_Cantidad INT
AS BEGIN
BEGIN TRY

INSERT INTO Prod.tbPedidosProduccion(empl_Id, 
								     ppro_Fecha,
									 ppro_Estados,
									 ppro_Observaciones, 
									 usua_UsuarioCreacion,
									 ppro_FechaCreacion)
VALUES(@empl_Id, @ppro_Fecha, @ppro_Estados, @ppr_Observaciones, @usua_UsuarioCreacion, @ppro_FechaCreacion)

DECLARE @ppro_Id INT = SCOPE_IDENTITY();

INSERT INTO Prod.tbPedidosProduccionDetalles(ppro_Id, 
											 lote_Id,
											 ppde_Cantidad, 
											 usua_UsuarioCreacion,
											 ppde_FechaCreacion)
VALUES (@ppro_Id, @lote_Id, @ppde_Cantidad, @usua_UsuarioCreacion, @ppro_FechaCreacion)

END TRY
BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH

END
GO


CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccion_Editar
@ppro_Id INT,
@empl_Id INT,
@ppro_Fecha DATETIME,
@ppro_Estados NVARCHAR(150),
@ppro_Observaciones NVARCHAR(MAX),
@usua_UsuarioModificacion INT,
@ppro_FechaModificacion DATETIME
AS BEGIN

BEGIN TRY

UPDATE Prod.tbPedidosProduccion SET empl_Id = @empl_Id,
									ppro_Fecha = @ppro_Fecha,
									ppro_Estados = @ppro_Estados,
									ppro_Observaciones = @ppro_Observaciones,
									usua_UsuarioModificacion = @usua_UsuarioModificacion,
									ppro_FechaModificacion = @ppro_FechaModificacion
								WHERE ppro_Id = @ppro_Id

END TRY

BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH

END
GO



CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccionDetalle_Listar
@ppro_Id INT
AS BEGIN

SELECT ppde_Id,
	   ppro_Id,
	   lote_Id,
	   ppde_Cantidad, 
	   usua_UsuarioCreacion,
	   ppde_FechaCreacion,
	   usua_UsuarioModificacion,
	   ppde_FechaModificacion, 
	   ppde_Estado 
FROM Prod.tbPedidosProduccionDetalles
WHERE ppro_Id = @ppro_Id

END

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
CREATE OR ALTER PROCEDURE Acce.UDP_tbRolesXPantallas_Listar
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

/* Listar Duca*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbDuca_Listar
AS
BEGIN
	SELECT	duca.[duca_No_Duca], 
			duca.[duca_No_Correlativo_Referencia],
			duca.[deva_Id], 
			duca.[duca_AduanaRegistro],
			adua.[adua_Nombre] as "AduanaRegistro",
			duca.[duca_AduanaSalida],
			adua.[adua_Nombre] as "AduanaSalida",
			duca.[duca_DomicilioFiscal_Exportador], 
			duca.[duca_Tipo_Iden_Exportador],
			tipo.[iden_Descripcion] as "TipoIdentificacion",
			duca.[duca_Pais_Emision_Exportador],
			pais_ex.[pais_Nombre] as "PaisExportador",
			duca.[duca_Numero_Id_Importador], 
			duca.[duca_Pais_Emision_Importador],
			pais_im.[pais_Nombre] as "PaisImportador",
			duca.[duca_DomicilioFiscal_Importador], 
			duca.[duca_Regimen_Aduanero],
			duca.[duca_Modalidad],
			duca.[duca_Clase],
			duca.[duca_Codigo_Declarante],
			duca.[duca_Numero_Id_Declarante], 
			duca.[duca_NombreSocial_Declarante],
			duca.[duca_DomicilioFiscal_Declarante], 
			duca.[duca_Pais_Procedencia],
			pais_pro.[pais_Nombre] as "PaisProcedencia",
			duca.[duca_Pais_Exportacion],
			pais_exp.[pais_Nombre] as "PaisExportacion",
		    duca.[duca_Pais_Destino],[cont_Licencia],
			pais_des.[pais_Nombre] as "PaisDestino",
			duca.[duca_Deposito_Aduanero],
			duca.[duca_Lugar_Embarque],
			duca.[duca_Lugar_Desembarque],
			duca.[duca_Manifiesto], 
			duca.[duca_Titulo], 
			duca.[duca_Codigo_Transportista], 
			duca.[duca_PesoBrutoTotal],
			duca.[duca_PesoNetoTotal], 
			duca.[motr_id], 
			moto.[motr_Descripcion] as "ModoTransporte",
			duca.[duca_Transportista_Nombre], 
			duca.[duca_Conductor_Id],
			cond.[cont_Nombre] + ' ' +  [cont_Apellido] as "NombreConductor",
			cond.[cont_Licencia] as "LicenciaConductor",
			duca.[duca_Codigo_Tipo_Documento],
			duca.[duca_FechaVencimiento],
			usuC.[usua_Nombre] as "UsuarioCreacion",
			duca.[duca_FechaCreacion] as "DucaFechaCreacion",
			usuM.[usua_Nombre] as "UsuarioModificacion",
			duca.[duca_FechaModificacion] as DucaFechaModificacion
	FROM	Adua.tbDuca												INNER JOIN Adua.tbAduanas adua
	ON		duca.duca_AduanaRegistro			= adua.adua_Id		INNER JOIN Adua.tbAduanas aduas
	ON		duca.duca_AduanaSalida				= adua.adua_Id		INNER JOIN Adua.tbDeclaraciones_Valor deva
	ON		duca.deva_Id						= deva.deva_Id		INNER JOIN Adua.tbTiposIdentificacion tipo
	ON		duca.duca_Tipo_Iden_Exportador		= tipo.iden_Id		INNER JOIN Gral.tbPaises pais_ex
	ON		duca.duca_Pais_Emision_Exportador	= pais_ex.pais_Id	INNER JOIN Gral.tbPaises pais_im
	ON		duca.duca_Pais_Emision_Importador	= pais_im.pais_Id	INNER JOIN Gral.tbPaises pais_pro
	ON		duca.duca_Pais_Procedencia			= pais_pro.pais_Id	INNER JOIN Gral.tbPaises pais_exp
	ON		duca.duca_Pais_Exportacion			= pais_exp.pais_Id	INNER JOIN Gral.tbPaises pais_des
	ON		duca.duca_Pais_Destino				= pais_des.pais_Id	INNER JOIN Adua.tbModoTransporte moto
	ON		duca.motr_id						= moto.motr_id		INNER JOIN Adua.tbConductor cond
	ON		duca.duca_Conductor_Id				= cond.cont_Id		INNER JOIN Acce.tbUsuarios usuC
	ON		duca.usua_UsuarioCreacion			= usuC.usua_Id		INNER JOIN Acce.tbUsuarios usuM
	ON		duca.usua_UsuarioModificacion		= usuM.usua_Id
END

GO

/* Insertar Duca tab1*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbDuca_InsertarTab1
	@duca_No_Duca						NVARCHAR(100),
	@deva_Id							INT,
	@duca_No_Correlativo_Referencia		NVARCHAR(MAX),
	@duca_AduanaRegistro				INT,
	@duca_AduanaSalida					INT,
	@duca_Regimen_Aduanero				NVARCHAR(MAX),
	@duca_Modalidad						NVARCHAR(MAX),
	@duca_Clase							NVARCHAR(MAX),
	@duca_FechaVencimiento				DATETIME,
	@duca_Pais_Procedencia				INT,
	@duca_Pais_Exportacion				INT,
	@duca_Pais_Destino					INT,
	@duca_Deposito_Aduanero				NVARCHAR(MAX),
	@duca_Lugar_Embarque				NVARCHAR(MAX),
	@duca_Lugar_Desembarque				NVARCHAR(MAX),
	@duca_Manifiesto					NVARCHAR(MAX),
	@iden_Id_ex							INT,
	@pais_ex							INT,
	@domicilio_Fiscal_ex				NVARCHAR(MAX),	
	@NoIdentificacion_im				NVARCHAR(15),
	@pais_im							INT,
	@domicilio_Fiscal_im				NVARCHAR(MAX),
	@usua_UsuarioCreacio				INT,
	@duca_FechaCreacion					DATETIME
AS
BEGIN
	BEGIN TRY
		DECLARE @Duca_Id AS NVARCHAR(100)

		INSERT INTO [Adua].[tbDuca] ([duca_No_Duca], [duca_No_Correlativo_Referencia], [deva_Id], [duca_AduanaRegistro], [duca_AduanaSalida], [duca_Regimen_Aduanero], [duca_Modalidad],[duca_Clase], [duca_FechaVencimiento],[duca_Pais_Procedencia],[duca_Pais_Exportacion],[duca_Pais_Destino] ,[duca_Deposito_Aduanero] ,[duca_Lugar_Embarque], [duca_Lugar_Desembarque],[duca_Manifiesto],[duca_DomicilioFiscal_Exportador], [duca_Tipo_Iden_Exportador], [duca_Pais_Emision_Exportador], [duca_Numero_Id_Importador], [duca_Pais_Emision_Importador], [duca_DomicilioFiscal_Importador])
		VALUES (@duca_No_Duca, @duca_No_Correlativo_Referencia, @deva_Id, @duca_AduanaRegistro,@duca_AduanaSalida, @duca_Regimen_Aduanero, @duca_Modalidad,@duca_Clase,@duca_FechaVencimiento,@duca_Pais_Procedencia,@duca_Pais_Exportacion,@duca_Pais_Destino,@duca_Deposito_Aduanero,@duca_Lugar_Embarque,@duca_Lugar_Desembarque,@duca_Manifiesto,@domicilio_Fiscal_ex,@iden_Id_ex,@pais_ex,@NoIdentificacion_im,@pais_im,@domicilio_Fiscal_im)
		
		--SET @Duca_Id = (SELECT [duca_No_Duca] FROM Adua.tbDuca WHERE [duca_No_Correlativo_Referencia] = @duca_No_Correlativo_Referencia);
		SET @Duca_Id = @duca_No_Duca

		SELECT @Duca_Id
	END TRY
	BEGIN CATCH
		SELECT 'Error: ' + ERROR_MESSAGE();
	END CATCH
END
GO

/* Insertar Duca tab2*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbDuca_InsertarTab2
	@Duca_Id							NVARCHAR(100),
	@duca_Codigo_Declarante				NVARCHAR(200),
	@duca_Numero_Id_Declarante			NVARCHAR(200),
	@duca_NombreSocial_Declarante		NVARCHAR(MAX),
	@duca_DomicilioFiscal_Declarante	NVARCHAR(MAX),
	@duca_Codigo_Transportista			NVARCHAR(200),
	@duca_Transportista_Nombre			NVARCHAR(MAX),
	@motr_Id							INT,
	@cont_Licencia						NVARCHAR(200),
	@pais_IdExpedicion					INT,
	@cont_Nombre						NVARCHAR(200),
	@cont_Apellido						NVARCHAR(200),
	@pais_Id							INT,
	@marca_Id							INT,
	@tran_Chasis						NVARCHAR(100),
	@tran_Remolque						NVARCHAR(50),
	@tran_CantCarga						INT,
	@tran_NumDispositivoSeguridad		INT,
	@tran_Equipamiento					NVARCHAR(200),
	@tran_TipoCarga						NVARCHAR(200),
	@tran_IdContenedor					NVARCHAR(100),
	@usua_UsuarioCreacio				INT,
	@tran_FechaCreacion					DATETIME
AS	
BEGIN
	BEGIN TRANSACTION 
	SET @tran_FechaCreacion = GETDATE();
	BEGIN TRY
		INSERT INTO [Adua].[tbTransporte] ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion], [usua_UsuarioModificacion], [tran_FechaModificacion], [usua_UsuarioEliminacion], [trant_FechaEliminacion], [tran_Estado])
		VALUES(@pais_Id,@tran_Chasis,@marca_Id,@tran_Remolque,@tran_CantCarga,@tran_NumDispositivoSeguridad,@tran_Equipamiento,@tran_TipoCarga,@tran_IdContenedor,@usua_UsuarioCreacio,@tran_FechaCreacion,NULL,NULL,NULL,NULL,1);

		DECLARE @Transporte_Id INT = (SELECT TOP 1 tran_Id FROM [Adua].[tbTransporte] ORDER BY DES);
		
		INSERT INTO [Adua].[tbConductor] ([cont_Nombre], [cont_Apellido], [cont_Licencia], [pais_IdExpedicion], [tran_Id], [usua_UsuarioCreacion], [cont_FechaCreacion], [usua_UsuarioModificacion], [cont_FechaModificacion], [usua_UsuarioEliminacion], [cont_FechaEliminacion], [cont_Estado])
		VALUES(@cont_Nombre,@cont_Apellido,@cont_Licencia,@pais_IdExpedicion,@Transporte_Id,@usua_UsuarioCreacio,@tran_FechaCreacion,NULL,NULL,NULL,NULL,1);

		DECLARE @ducaConductor INT = (SELECT TOP 1 cont_Id FROM [Adua].[tbConductor] ORDER BY DES);

		UPDATE [Adua].[tbDuca]
		   SET [duca_Codigo_Declarante] = @duca_Codigo_Declarante
			  ,[duca_Numero_Id_Declarante] = @duca_Numero_Id_Declarante
			  ,[duca_NombreSocial_Declarante] = @duca_NombreSocial_Declarante
			  ,[duca_DomicilioFiscal_Declarante] = @duca_DomicilioFiscal_Declarante
			  ,[duca_Codigo_Transportista] = @duca_Codigo_Transportista 
			  ,[motr_id] = @motr_Id
			  ,[duca_Transportista_Nombre] = @duca_Transportista_Nombre
			  ,[duca_Conductor_Id] = @ducaConductor      
		 WHERE [duca_No_Duca] = @Duca_Id

		 SELECT 1
		COMMIT TRAN 
	END TRY
	BEGIN CATCH
		SELECT 0
		ROLLBACK TRAN
	END CATCH
END

GO

/* Insertar Duca tab3*/
CREATE OR ALTER PROCEDURE  Adua.UDP_tbDuca_InsertarTab3
	@tido_Id					INT,
	@doso_NumeroDocumento		INT,
	@doso_FechaEmision			DATETIME,
	@doso_FechaVencimiento		DATETIME,
	@doso_PaisEmision			INT,
	@doso_LineaAplica			CHAR(4),
	@doso_EntiadEmitioDocumento	NVARCHAR(75),
	@doso_Monto					NVARCHAR(50),
	@usua_UsuarioCreacio		INT,
	@doso_FechaCreacion			DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Adua].[tbDocumentosDeSoporte] ([tido_Id], [doso_NumeroDocumento], [doso_FechaEmision], [doso_FechaVencimiento], [doso_PaisEmision], [doso_LineaAplica], [doso_EntidadEmitioDocumento], [doso_Monto], [usua_UsuarioCreacion], [doso_FechaCreacion], [usua_UsuarioModificacion], [doso_FechaModificacion], [usua_UsuarioEliminacion], [doso_FechaEliminacion], [doso_Estado])
		VALUES(@tido_Id,@doso_NumeroDocumento,@doso_FechaEmision,@doso_FechaVencimiento,@doso_PaisEmision,@doso_LineaAplica,@doso_EntiadEmitioDocumento,@doso_Monto,@usua_UsuarioCreacio,@doso_FechaCreacion,NULL,NULL,NULL,NULL,1);
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
---------------------EDIT DUCA------------------------
CREATE OR ALTER PROCEDURE Adua.UDP_tbDuca_EditarTab1
    @duca_No_Correlativo_Referencia		NVARCHAR(MAX),
	@FechaAceptacion					DATETIME,
	@duca_AduanaRegistro				INT,
	@duca_AduanaSalida					INT,
	@duca_AduanaIngreso					INT,
	@duca_AduanaDestino					INT,
	@duca_Regimen_Aduanero				NVARCHAR(MAX),
	@duca_Modalidad						NVARCHAR(MAX),
	@duca_Clase							NVARCHAR(MAX),
	@duca_FechaVencimiento				DATETIME,
	@duca_Pais_Procedencia				INT,
	@duca_Pais_Exportacion				INT,
	@duca_Pais_Destino					INT,
	@duca_Deposito_Aduanero				NVARCHAR(MAX),
	@duca_Lugar_Embarque				NVARCHAR(MAX),
	@duca_Lugar_Desembarque				NVARCHAR(MAX),
	@duca_Manifiesto					NVARCHAR(MAX),
	@NoIdentificacion_ex				NVARCHAR(15),
	@iden_Id_ex							INT,
	@pais_ex							INT,
	@domicilio_Fiscal_ex				NVARCHAR(MAX),	
	@NoIdentificacion_im				NVARCHAR(15),
	@iden_Id_im							INT,
	@pais_im							INT,
	@Nombre_RazonSocial					NVARCHAR(MAX),
	@domicilio_Fiscal_im				NVARCHAR(MAX),
	@usuario_UsuarioModificacion        INT,
	@duca_FechaModificacion             DATETIME,
	@Duca_Id							NVARCHAR(100) OUTPUT 
AS
BEGIN
    UPDATE [Adua].[tbDuca]
	SET    [duca_No_Correlativo_Referencia] = @duca_No_Correlativo_Referencia,
	       [duca_AduanaRegistro] = @duca_AduanaRegistro, 
		   [duca_AduanaSalida] = @duca_AduanaSalida,
		   [duca_Modalidad] = @duca_Modalidad,
		   [duca_Clase] = @duca_Clase,
		   [duca_FechaVencimiento] = @duca_FechaVencimiento,
		   [duca_Pais_Procedencia] = @duca_Pais_Procedencia ,
		   [duca_Pais_Exportacion] = @duca_Pais_Exportacion,
		   [duca_Pais_Destino] = @duca_Pais_Destino,
		   [duca_Deposito_Aduanero] = @duca_Deposito_Aduanero,
		   [duca_Lugar_Embarque] = @duca_Lugar_Embarque, 
		   [duca_Lugar_Desembarque] = @duca_Lugar_Desembarque,
		   [duca_Manifiesto] = @duca_Manifiesto,
		   [duca_DomicilioFiscal_Exportador] = @domicilio_Fiscal_ex, 
		   [duca_Tipo_Iden_Exportador] = @iden_Id_ex, 
		   [duca_Pais_Emision_Exportador] = @pais_ex,
		   [duca_Numero_Id_Importador] = @NoIdentificacion_im, 
		   [duca_Pais_Emision_Importador] = @pais_im, 
		   [duca_DomicilioFiscal_Importador] = @domicilio_Fiscal_im,
		   usuario_UsuarioModificacion = @usuario_UsuarioModificacion,
		   duca_FechaModificacion = @duca_FechaModificacion
	WHERE  [duca_No_Duca] = @Duca_Id    
END
GO

CREATE OR ALTER PROCEDURE Adua.UDP_tbDuca_EditarTab2
    @Duca_Id							NVARCHAR(100),
	@duca_Codigo_Declarante				NVARCHAR(200),
	@duca_Numero_Id_Declarante			NVARCHAR(200),
	@duca_NombreSocial_Declarante		NVARCHAR(MAX),
	@duca_DomicilioFiscal_Declarante	NVARCHAR(MAX),
	@duca_Codigo_Transportista			NVARCHAR(200),
	@duca_Transportista_Nombre			NVARCHAR(MAX),
	@motr_Id							INT,
	@cont_Licencia						NVARCHAR(200),
	@pais_IdExpedicion					INT,
	@cont_Nombre						NVARCHAR(200),
	@cont_Apellido						NVARCHAR(200),
	@pais_Id							INT,
	@marca_Id							INT,
	@tran_Chasis						NVARCHAR(100),
	@tran_Remolque						NVARCHAR(50),
	@tran_CantCarga						INT,
	@tran_NumDispositivoSeguridad		INT,
	@tran_Equipamiento					NVARCHAR(200),
	@tran_TipoCarga						NVARCHAR(200),
	@tran_IdContenedor					NVARCHAR(100),
	@usua_UsuarioModificacion			INT,
	@tran_FechaModificacion				DATETIME,
	@cont_FechaModificacion             DATETIME
AS
BEGIN
   BEGIN TRANSACTION 
	SET @tran_FechaModificacion = GETDATE();
	BEGIN TRY
	    DECLARE @Transporte_Id INT = (SELECT TOP 1 tran_Id FROM [Adua].[tbTransporte] ORDER BY DES);

		UPDATE [Adua].[tbTransporte] 
		SET    [pais_Id] = @pais_Id, 
		       [tran_Chasis] = @tran_Chasis, 
		       [marca_Id] = @marca_Id, 
			   [tran_Remolque] = @tran_Remolque, 
			   [tran_CantCarga] = @tran_CantCarga,
			   [tran_NumDispositivoSeguridad] = @tran_NumDispositivoSeguridad,
			   [tran_Equipamiento] = @tran_Equipamiento, 
			   [tran_TipoCarga] = @tran_TipoCarga, 
			   [tran_IdContenedor] = @tran_IdContenedor, 
			   [usua_UsuarioModificacion] = @usua_UsuarioModificacion, 
			   [tran_FechaModificacion] = @tran_FechaModificacion
		WHERE  tran_Id = @Transporte_Id
		
		DECLARE @ducaConductor INT = (SELECT TOP 1 cont_Id FROM [Adua].[tbConductor] ORDER BY DES);
		UPDATE [Adua].[tbConductor]
		SET    [cont_Nombre] = @cont_Nombre,
		       [cont_Apellido] = @cont_Apellido,
			   [cont_Licencia] = @cont_Licencia,
			   [pais_IdExpedicion] = @pais_IdExpedicion,
			   [tran_Id] = @Transporte_Id,
			   [usua_UsuarioModificacion] = @usua_UsuarioModificacion,
			   [cont_FechaModificacion] = @cont_FechaModificacion
        WHERE @ducaConductor = [cont_Id]

		UPDATE [Adua].[tbDuca]
		   SET [duca_Codigo_Declarante] = @duca_Codigo_Declarante
			  ,[duca_Numero_Id_Declarante] = @duca_Numero_Id_Declarante
			  ,[duca_NombreSocial_Declarante] = @duca_NombreSocial_Declarante
			  ,[duca_DomicilioFiscal_Declarante] = @duca_DomicilioFiscal_Declarante
			  ,[duca_Codigo_Transportista] = @duca_Codigo_Transportista 
			  ,[motr_id] = @motr_Id
			  ,[duca_Transportista_Nombre] = @duca_Transportista_Nombre
			  ,[duca_Conductor_Id] = @ducaConductor      
		 WHERE [duca_No_Duca] = @Duca_Id

		 SELECT 1
		COMMIT TRAN 
	END TRY
	BEGIN CATCH
		SELECT 0
		ROLLBACK TRAN
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE  Adua.UDP_tbDuca_EditarTab3
    @tido_Id                    INT,
    @doso_NumeroDocumento       INT,
    @doso_FechaEmision          DATETIME,
    @doso_FechaVencimiento      DATETIME,
    @doso_PaisEmision           INT,
    @doso_LineaAplica           CHAR(4),
    @doso_EntiadEmitioDocumento NVARCHAR(75),
    @doso_Monto                 NVARCHAR(50),
    @usua_UsuarioModificacion   INT,
    @doso_FechaModificacion     DATETIME
AS
BEGIN
    BEGIN TRY
	   
	    UPDATE [Adua].[tbDocumentosDeSoporte] 
		SET   
		       [doso_NumeroDocumento] = @doso_NumeroDocumento,
			   [doso_FechaEmision] = @doso_FechaEmision,
			   [doso_FechaVencimiento] = @doso_FechaVencimiento,
			   [doso_PaisEmision] = @doso_PaisEmision,
			   [doso_LineaAplica] = @doso_LineaAplica,
			   [doso_EntidadEmitioDocumento] = @doso_EntiadEmitioDocumento,
			   [doso_Monto] = @doso_Monto,
			   [usua_UsuarioModificacion] = @usua_UsuarioModificacion,
			   [doso_FechaModificacion] = @doso_FechaModificacion
        WHERE   [tido_Id] = @tido_Id
        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
