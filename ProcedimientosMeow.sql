


--**********************************************************************************************
--********** TABLA PAISES / procedimientos tomando en cuenta los uniques ***********************
CREATE OR ALTER VIEW Gral.VW_tbPaises
AS

SELECT 
 pais_Codigo Paiscodigo,
 pais_Nombre paisNombre, 
 pais.usua_UsuarioCreacion UsuarioCreadorId,
 usua.usua_Nombre UsuarioCreadorNombre,
 pais_FechaCreacion, 
 pais.usua_UsuarioModificacion UsuarioModificicadorId,
 usua2.usua_Nombre UsuarioModificadorNombre,
 pais_FechaModificacion,
 pais_Estado
 FROM Gral.tbPaises pais INNER JOIN Acce.tbUsuarios usua
 ON pais.usua_UsuarioCreacion = usua.usua_Id LEFT JOIN Acce.tbUsuarios usua2
 ON pais.usua_UsuarioModificacion = usua2.usua_Id
 GO


CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Listar
AS
BEGIN
	SELECT * FROM  Gral.VW_tbPaises
	WHERE pais_Estado = 1
END
GO

 -- PREGUNTAR SI LA FECHA SE VA A MANEJAR COMO FORMATO DATETIME SIEMPRE, TAMBIEN LO DEL CODIGO
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
			SET pais_Estado = 1
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
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Editar
@pais_Codigo					CHAR(2),
@pais_Nombre					NVARCHAR(150), 
@usua_UsuarioModificacion		INT,
@pais_FechaModificacion			DATETIME
AS
BEGIN
	BEGIN TRY		
		UPDATE Gral.tbPaises
		SET pais_Nombre = @pais_Nombre, usua_UsuarioModificacion = @usua_UsuarioModificacion
		WHERE pais_Codigo = @pais_Codigo
		SELECT 1
	END TRY
BEGIN CATCH
	SELECT 0
END CATCH

END


GO





--**********************************************************************************************
--********** TABLA CIUDADES / procedimientos tomando en cuenta los uniques *********************


CREATE OR ALTER VIEW Gral.VW_tbCiudades
AS
SELECT 
	ciud_Id IdCiudad, 
	ciud_Nombre CiudadNombre,
	ciu.pvin_Id	IdProvincia,
	provi.pvin_Nombre NombreProvincia,
	provi.pvin_Codigo CodigoProvincia,
	pais.pais_Codigo CodigoPais,
	pais.pais_Nombre Pais,
	ciu.usua_UsuarioCreacion IdUsuarioCreador,
	usu1.usua_Nombre NombreaUsuaCrea,
	ciud_FechaCreacion,
	ciu.usua_UsuarioModificacion	IdUsuarioModificador,
	usu2.usua_Nombre NombreUsuaModifica,
    ciud_FechaModificacion, 
	ciud_Estado
FROM [Gral].[tbCiudades] ciu INNER JOIN Acce.tbUsuarios usu1
ON ciu.usua_UsuarioCreacion = usu1.usua_Id LEFT JOIN Acce.tbUsuarios usu2
ON ciu.usua_UsuarioModificacion = usu2.usua_Id	INNER JOIN Gral.tbProvincias provi
ON ciu.pvin_Id = provi.pvin_Id INNER JOIN Gral.tbPaises pais
ON  provi.pais_Codigo = pais.pais_Codigo
GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Listar
AS
BEGIN
	SELECT*FROM Gral.VW_tbCiudades
	WHERE ciud_Estado = 1
END
GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Insertar
@ciud_Nombre				NVARCHAR(150), 
@pvin_Id					INT, 
@usua_UsuarioCreacion		INT, 
@ciud_FechaCreacion			DATETIME
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
		SELECT 0
	END CATCH

END
GO


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
		SELECT 0
	END CATCH
END
GO




--**********************************************************************************************
--********** TABLA Provincias / procedimientos tomando en cuenta los uniques *******************

CREATE OR ALTER VIEW Gral.VW_tbProvincias
AS
SELECT
pvin_Id ProvinciaId, 
pvin_Nombre ProvinciaNombre,
pvin_Codigo ProvinciaCodigo, 
provin.pais_Codigo, 
pais.pais_Nombre PaisNombre,
provin.usua_UsuarioCreacion IdUsuarioCreador,
usua1.usua_Nombre NombreUsuaraioCreador, 
pvin_FechaCreacion, 
provin.usua_UsuarioModificacion IdUsuarioModificador, 
usua2.usua_Nombre NombreUsuarioModificador,
pvin_FechaModificacion, 
pvin_Estado
FROM [Gral].[tbProvincias] provin INNER JOIN Gral.tbPaises pais
ON provin.pais_Codigo =  pais.pais_Codigo INNER JOIN Acce.tbUsuarios usua1
ON provin.usua_UsuarioCreacion = usua1.usua_Id LEFT JOIN Acce.tbUsuarios usua2
ON provin.usua_UsuarioModificacion = usua2.usua_Id 

GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbProvincias_Listar
AS
BEGIN
	SELECT*FROM  Gral.VW_tbProvincias 
	WHERE pvin_Estado = 1
END
GO

CREATE OR ALTER PROCEDURE GrAL.UDP_tbProvincias_Insertar
 @pvin_Nombre				NVARCHAR(150), 
 @pvin_Codigo				NVARCHAR(20), 
 @pais_Codigo				CHAR(2), 
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
			INSERT INTO Gral.tbProvincias (pvin_Nombre, pvin_Codigo, pais_Codigo, usua_UsuarioCreacion, pvin_FechaCreacion)
			VALUES(@pvin_Nombre, @pvin_Codigo, @pais_Codigo, @usua_UsuarioCreacion, @pvin_FechaCreacion)
			SELECT 1
		END		
	END TRY

	BEGIN CATCH 
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbProvinvias_Editar
 @pvin_Id						INT,
 @pvin_Nombre					NVARCHAR(150), 
 @pvin_Codigo					NVARCHAR(20), 
 @pais_Codigo					CHAR(2), 
 @usua_UsuarioModificacion		INT, 
 @pvin_FechaModificacion 		DATETIME 
AS
BEGIN
	BEGIN TRY
    		UPDATE Gral.tbProvincias SET pvin_Nombre = @pvin_Nombre, pvin_Codigo = @pvin_Codigo, 
			pvin_FechaModificacion = @pvin_FechaModificacion, usua_UsuarioModificacion = @usua_UsuarioModificacion
			WHERE pvin_Id = @pvin_Id
			SELECT 1
		
	END TRY

	BEGIN CATCH
	SELECT 0
	END CATCH
END
GO


--**********************************************************************************************
--********** TABLA ALDEAS / procedimientos tomando en cuenta los uniques ***********************
CREATE OR ALTER VIEW Gral.VW_tbAldeas
AS
SELECT
alde_Id AldeaId, 
alde_Nombre AldeaNombre, 
alde.ciud_Id IdCiudad, 
ciu.ciud_Nombre NombreCiudad,
alde.usua_UsuarioCreacion IdUsuarioCreador,
usu1.usua_Nombre NombreUsarioCreador, 
alde_FechaCreacion, 
alde.usua_UsuarioModificacion IdUsuarioModificador,
usu2.usua_Nombre NombreUsuarioModifica, 
alde_FechaModificacion, 
alde_Estado
FROM [Gral].[tbAldeas] alde INNER JOIN Gral.tbCiudades ciu
ON alde.ciud_Id = ciu.ciud_Id INNER JOIN Acce.tbUsuarios usu1
ON alde.usua_UsuarioCreacion = usu1.usua_Id LEFT JOIN Acce.tbUsuarios usu2
ON alde.usua_UsuarioCreacion = usu2.usua_Id

GO

CREATE OR ALTER PROCEDURE Gral.UDP_tbAldeas_Listar
AS
BEGIN
	SELECT*FROM Gral.VW_tbAldeas WHERE alde_Estado = 1
END
GO

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
		SELECT 0
	END CATCH

END
GO

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
		SELECT 0
	END CATCH
END
GO


--**********************************************************************************************
--********** TABLA MÁQUINAS MÓDULOS / procedimientos tomando en cuenta los uniques ***********************

CREATE OR ALTER VIEW Prod.VW_tbMaquinasModulos
AS

SELECT 
FROM 
