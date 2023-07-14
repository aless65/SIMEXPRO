-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS

--************USUARIOS******************--

/*Vista usuarios*/
CREATE OR ALTER VIEW acce.VW_tbUsuarios
AS
	SELECT t1.usua_Id AS usuarioId, 
		   t1.usua_Nombre AS usuarioNombre, 
		   t1.usua_Contrasenia AS usuarioContrasenia, 
		   t1.usua_Correo AS usuarioCorreo, 
		   t1.role_Id AS rolId,
		   t2.role_Descripcion AS rolDescripcion, 
		   t1.usua_EsAdmin,
		   t1.empl_Id AS empleadoId,
		   (SELECT t3.empl_Nombres + ' ' + empl_Apellidos) AS empleadoNombreCompleto, 
		   t1.usua_UsuarioCreacion AS usuarioCreacion, 
		   t4.usua_Nombre AS usuarioCreacionNombre,
		   t1.usua_FechaCreacion AS usuarioFechaCreacion, 
	       t1.usua_UsuarioModificacion AS usuarioModificacion, 
		   t5.usua_Nombre AS usuarioModificacionNombre, 
		   t1.usua_FechaModificacion AS usuarioFechaModificacion,
		   t1.usua_Estado AS usuarioEstado,
		   t3.empl_CorreoElectronico AS empleadoCorreoElectronico	
		   FROM Acce.tbUsuarios t1 LEFT JOIN Acce.tbRoles t2
		   ON t1.role_Id = t2.role_Id
		   LEFT JOIN Gral.tbEmpleados t3
		   ON t3.empl_Id = t1.empl_Id 
		   LEFT JOIN acce.tbUsuarios t4
		   ON t1.usua_UsuarioCreacion = T4.usua_Id
		   LEFT JOIN acce.tbUsuarios t5
		   ON t1.usua_UsuarioModificacion = t5.usua_Id
GO

/*Listar Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_VW_tbUsuarios_Listar
AS
BEGIN
	SELECT *
    FROM acce.VW_tbUsuarios
	WHERE usuarioEstado = 1
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
		SET		usua_Estado = 0
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