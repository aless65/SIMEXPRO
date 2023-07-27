USE SIMEXPRO
GO

CREATE OR ALTER PROCEDURE Acce.UDP_IniciarSesion /*'juan', 'awsd'*/
	@usua_Nombre			NVARCHAR(150),
	@usua_Contrasenia		NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRY
		DECLARE @contrasenaEncriptada NVARCHAR(MAX)=(SELECT HASHBYTES('SHA2_512', @usua_Contrasenia));

		IF EXISTS (SELECT * FROM Acce.tbUsuarios WHERE usua_Nombre = @usua_Nombre AND usua_Contrasenia = @contrasenaEncriptada)
			BEGIN
				SELECT * FROM Acce.tbUsuarios WHERE usua_Nombre = @usua_Nombre AND usua_Contrasenia = @contrasenaEncriptada
			END
		ELSE
			BEGIN
				SELECT 0
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO


CREATE OR ALTER PROCEDURE Acce.UDP_CambiarContrasena /* 'juan', 'skf@ks.com', 'awsd' */
	@usua_Nombre			NVARCHAR(150),
	@usua_Correo			NVARCHAR(200),
	@usua_Contrasenia		NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Acce.tbUsuarios WHERE usua_Nombre = @usua_Nombre AND usua_Correo = @usua_Correo)
			BEGIN 
				DECLARE @NuevaContrasenaEncriptada NVARCHAR(MAX)=(SELECT HASHBYTES('SHA2_512', @usua_Contrasenia));

				UPDATE Acce.tbUsuarios
				SET usua_Contrasenia = @NuevaContrasenaEncriptada
				WHERE usua_Nombre = @usua_Nombre AND usua_Correo = @usua_Correo

				SELECT 1
			END
		ELSE
			BEGIN
				SELECT 0
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO


SELECT * FROM acce.tbUsuarios
GO