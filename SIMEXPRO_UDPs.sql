-----------------PROCEDIMIENTOS ALMACENADOS Y VISTAS

--************USUARIOS******************--

/*Vista usuarios*/
CREATE OR ALTER VIEW Acce.VW_tbUsuarios
AS
	SELECT t1.usua_Id, 
		   t1.usua_Nombre, 
		   t1.usua_Contrasenia, 
		   t1.usua_Correo, 
		   t1.role_Id,
		   t2.role_Descripcion, 
		   t1.empl_Id,
		   (SELECT t3.empl_Nombres + ' ' + empl_Apellidos) AS empl_NombreCompleto, 
		   t1.usua_UsuarioCreacion, 
		   t4.usua_Nombre AS usua_UsuarioCreacion_Nombre,
		   t1.usua_FechaCreacion, 
	       t1.usua_UsuarioModificacion,
		   t5.usua_Nombre AS usua_UsuarioModificacion_Nombre, 
		   t1.usua_FechaModificacion,
		   t1.usua_Estado,
		   t3.empl_CorreoElectronico	
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
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_List
AS
BEGIN
	SELECT * FROM acce.VW_tbUsuarios
	WHERE usua_Estado = 1
END
GO

/*Insertar Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_Insert
	@usua_Nombre			NVARCHAR(150),
	@usua_Contrasenia		NVARCHAR(MAX),
	@usua_Correo			NVARCHAR(200),
	@empl_Id				INT,
	@usua_Image				NVARCHAR(500),
	@role_Id				INT, 
	@usua_UsuarioCreacion	INT
AS 
BEGIN
	
	BEGIN TRY
		
		DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @usua_Contrasenia));

		IF NOT EXISTS (SELECT * FROM acce.tbUsuarios
						WHERE @usua_Nombre = usua_Nombre)
		BEGIN
			INSERT INTO acce.tbUsuarios
			VALUES(@usua_Nombre,
				   @password,
				   @usua_Correo,
				   @empl_Id,
				   @usua_Image,
				   @role_Id,
				   @usua_UsuarioCreacion,
				   GETDATE(),
				   NULL,
				   NULL,
				   1)

			SELECT 1
		END
		ELSE IF EXISTS (SELECT * FROM acce.tbUsuarios
						WHERE @usua_Nombre = usua_Nombre
						AND usua_Estado = 1)

			SELECT 2
		ELSE
			BEGIN
				UPDATE acce.tbUsuarios
				SET	   usua_Estado = 1,
					   usua_Contrasenia = @password,
					   usua_Correo = @usua_Correo,
					   empl_Id = @empl_Id,
					   usua_Image = @usua_Image,
					   role_Id = @role_Id
				WHERE  usua_Nombre = @usua_Nombre

				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Find Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_VW_tbUsuarios_Find 
	@usua_Id	INT
AS
BEGIN
	SELECT * 
	FROM acce.VW_tbUsuarios
	WHERE usua_Estado = 1
	AND usua_Id = @usua_Id
END
GO


/*Editar usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_UPDATE
	@usua_Id					INT,
	@usua_Contrasenia			NVARCHAR(MAX),
	@usua_Correo				NVARCHAR(200),
	@empl_Id					INT,
	@usua_Image					NVARCHAR(500),
	@role_Id					INT, 
	@usua_UsuarioModificacion	INT
AS
BEGIN
	BEGIN TRY
		UPDATE  acce.tbUsuarios
		SET		usua_Correo = @usua_Correo,
				empl_Id = @empl_Id,
				usua_Image = @usua_Image,
				role_Id = @role_Id,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				usua_FechaModificacion = GETDATE()
		WHERE	usua_Id = @usua_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/*Eliminar usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_DELETE
	@usua_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE	acce.tbUsuarios
		SET		usua_Estado = 0
		WHERE	usua_Id = @usua_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO