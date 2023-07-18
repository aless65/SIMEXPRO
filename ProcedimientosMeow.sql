


--**********************************************************************************************
--********** TABLA PAISES / procedimientos tomando en cuenta los uniques ***********************

--agregue lo de la vista en el listar

CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Listar
AS
BEGIN
	
SELECT 
	 pais_Id						AS IdPais,
	 pais_Codigo					AS Paiscodigo,
	 pais_Nombre					AS  paisNombre, 
	 pais.usua_UsuarioCreacion		AS UsuarioCreadorId,
	 usua.usua_Nombre				AS UsuarioCreadorNombre,
	 pais_FechaCreacion, 
	 pais.usua_UsuarioModificacion  AS UsuarioModificicadorId,
	 usua2.usua_Nombre				AS UsuarioModificadorNombre,
	 pais_FechaModificacion,
	 pais_Estado
FROM Gral.tbPaises pais						 
	INNER JOIN Acce.tbUsuarios usua		ON pais.usua_UsuarioCreacion = usua.usua_Id 
	LEFT JOIN  Acce.tbUsuarios usua2	ON pais.usua_UsuarioModificacion = usua2.usua_Id
	WHERE pais_Estado = 1
END
GO

--Se le hizo cambio, quite el parametro de fecha creación
CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Insertar
	@pais_Codigo				CHAR(2), 
	@pais_Nombre				NVARCHAR(150), 
	@usua_UsuarioCreacion		INT
AS
BEGIN
DECLARE @pais_FechaCreacion			DATETIME;
	SET @pais_FechaCreacion = GETDATE();
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
--Gral.UDP_tbPaises_Insertar 'HN','Honduras',1
--select*from Acce.tbUsuarios

--Se le hizo cambio, quite el parametro de fecha modificacion y agregue el id del pais en los parametros.
CREATE OR ALTER PROCEDURE Gral.UDP_tbPaises_Editar
	@pais_Id						INT,
	@pais_Codigo					CHAR(2),
	@pais_Nombre					NVARCHAR(150), 
	@usua_UsuarioModificacion		INT

AS
BEGIN
	DECLARE @pais_FechaModificacion	DATETIME;
	SET @pais_FechaModificacion = GETDATE();
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

 --Gral.UDP_tbPaises_Editar 1,'HH','Honduritas',1





--**********************************************************************************************
--********** TABLA CIUDADES / procedimientos tomando en cuenta los uniques *********************


--agregue lo de la vista en el listar
CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Listar
AS
BEGIN
	SELECT 
	ciud_Id								AS IdCiudad, 
	ciud_Nombre							AS CiudadNombre,
	ciu.pvin_Id							AS IdProvincia,
	provi.pvin_Nombre					AS NombreProvincia,
	provi.pvin_Codigo					AS CodigoProvincia,
	pais.pais_Codigo					AS CodigoPais,
	pais.pais_Nombre					AS Pais,
	ciu.usua_UsuarioCreacion			AS IdUsuarioCreador,
	usu1.usua_Nombre					AS NombreaUsuaCrea,
	ciud_FechaCreacion,
	ciu.usua_UsuarioModificacion		AS	IdUsuarioModificador,
	usu2.usua_Nombre					AS NombreUsuaModifica,
    ciud_FechaModificacion, 
	ciud_Estado
FROM [Gral].[tbCiudades] ciu					
	INNER JOIN Acce.tbUsuarios usu1			ON ciu.usua_UsuarioCreacion = usu1.usua_Id		
	LEFT JOIN  Acce.tbUsuarios  usu2		ON ciu.usua_UsuarioModificacion = usu2.usua_Id	
	INNER JOIN Gral.tbProvincias provi		ON ciu.pvin_Id = provi.pvin_Id					
	INNER JOIN Gral.tbPaises pais			ON provi.pais_Id = pais.pais_Id
	WHERE ciud_Estado = 1
END
GO

--cambié el select 0 del catch por el mensaje de error, TAMBIÉN QUITÉ EL PARÁMETRO DE FECHA CREACIÓN
CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Insertar
	@ciud_Nombre				NVARCHAR(150), 
	@pvin_Id					INT, 
	@usua_UsuarioCreacion		INT
AS
BEGIN
	DECLARE @ciud_FechaCreacion   DATETIME;
	SET		@ciud_FechaCreacion = GETDATE();
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
-- Gral.UDP_tbCiudades_Insertar 'San Pedro Sula',1,1
--select*from [Gral].[tbCiudades]



--cambié el select 0 del catch por el mensaje de error y quite la fecha de modificación de los parametros
CREATE OR ALTER PROCEDURE Gral.UDP_tbCiudades_Editar
	@ciud_Id					INT,
	@ciud_Nombre				NVARCHAR(150), 
	@pvin_Id					INT, 
	@usua_UsuarioModificacion	INT
AS
BEGIN 
	DECLARE @ciud_FechaModificacion	DATETIME;
	SET @ciud_FechaModificacion = GETDATE();
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
--Gral.UDP_tbCiudades_Editar 2,'Jan Pedro',1,1



--**********************************************************************************************
--********** TABLA Provincias / procedimientos tomando en cuenta los uniques *******************

--AGREGUÉ LO QUE TENÍA EN LA VISTA EN EL UDP

CREATE OR ALTER PROCEDURE Gral.UDP_tbProvincias_Listar
AS
BEGIN
	SELECT
	pvin_Id							AS ProvinciaId, 
	pvin_Nombre						AS ProvinciaNombre,
	pvin_Codigo						AS ProvinciaCodigo, 
	provin.pais_Id, 
	pais.pais_Nombre				AS PaisNombre,
	provin.usua_UsuarioCreacion		AS IdUsuarioCreador,
	usua1.usua_Nombre				AS NombreUsuaraioCreador, 
	pvin_FechaCreacion, 
	provin.usua_UsuarioModificacion AS IdUsuarioModificador, 
	usua2.usua_Nombre				AS NombreUsuarioModificador,
	pvin_FechaModificacion, 
	pvin_Estado
FROM [Gral].[tbProvincias] provin				
	INNER JOIN Gral.tbPaises pais		ON provin.pais_Id =  pais.pais_Id		
	INNER JOIN Acce.tbUsuarios usua1	ON provin.usua_UsuarioCreacion = usua1.usua_Id	
	LEFT JOIN Acce.tbUsuarios usua2		ON provin.usua_UsuarioModificacion = usua2.usua_Id 
	WHERE pvin_Estado = 1
END
GO


--MODIFIQUÉ EL PARÁMETRO DE Pais_Codigo a Pais_Id, QUITÉ TAMBIÉN EL PARÁMETRO  DE FECHA CREACIÓN 
CREATE OR ALTER PROCEDURE GrAL.UDP_tbProvincias_Insertar
 @pvin_Nombre				NVARCHAR(150), 
 @pvin_Codigo				NVARCHAR(20), 
 @pais_Id					INT, 
 @usua_UsuarioCreacion		INT 

AS
BEGIN
	DECLARE  @pvin_FechaCreacion   DATETIME;
	SET		 @pvin_FechaCreacion = GETDATE();
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

--GrAL.UDP_tbProvincias_Insertar 'Proobando','0502455',1,1
--select*from  [Gral].[tbProvincias]



--MODIFIQUÉ EL PARÁMETRO DE Pais_Codigo a Pais_Id, QUITÉ TAMBIÉN EL PARÁMETRO  DE FECHA MODIFICACIÓN 
CREATE OR ALTER PROCEDURE Gral.UDP_tbProvinvias_Editar
 @pvin_Id						INT,
 @pvin_Nombre					NVARCHAR(150), 
 @pvin_Codigo					NVARCHAR(20), 
 @pais_Id						INT, 
 @usua_UsuarioModificacion		INT

AS
BEGIN
	DECLARE  @pvin_FechaModificacion   DATETIME;
	SET		 @pvin_FechaModificacion = GETDATE();
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

--Gral.UDP_tbProvinvias_Editar 1,'Probando 2','001',1,1



--**********************************************************************************************
--********** TABLA ALDEAS / procedimientos tomando en cuenta los uniques ***********************

--PUSE TODO LO QUE TENÍA EN LA VISTA, O SEA TODO EL SELECT 
CREATE OR ALTER PROCEDURE Gral.UDP_tbAldeas_Listar
AS
BEGIN
	SELECT
	alde_Id							AS AldeaId, 
	alde_Nombre						AS AldeaNombre, 
	alde.ciud_Id					AS IdCiudad, 
	ciu.ciud_Nombre					AS NombreCiudad,
	alde.usua_UsuarioCreacion		AS IdUsuarioCreador,
	usu1.usua_Nombre				AS NombreUsarioCreador, 
	alde_FechaCreacion, 
	alde.usua_UsuarioModificacion	AS IdUsuarioModificador,
	usu2.usua_Nombre				AS NombreUsuarioModifica, 
	alde_FechaModificacion, 
	alde_Estado
FROM [Gral].[tbAldeas] alde					
	INNER JOIN Gral.tbCiudades ciu		ON alde.ciud_Id = ciu.ciud_Id				
	INNER JOIN Acce.tbUsuarios usu1		ON alde.usua_UsuarioCreacion = usu1.usua_Id 
	LEFT JOIN Acce.tbUsuarios usu2		ON alde.usua_UsuarioCreacion = usu2.usua_Id
WHERE alde_Estado = 1

END
GO

--quite el parámetro de fecha_creeacion 
CREATE OR ALTER PROCEDURE Gral.UDP_tbAldeas_Insertar
 @alde_Nombre				NVARCHAR(150), 
 @ciud_Id					INT, 
 @usua_UsuarioCreacion		INT

AS
BEGIN
	DECLARE  @alde_FechaCreacion DATETIME;
	SET @alde_FechaCreacion = GETDATE();
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
--Gral.UDP_tbAldeas_Insertar 'Monterrey',2,1
-- Gral.UDP_tbAldeas_Listar



--quité el parámetro de fecha_modificación
CREATE OR ALTER PROCEDURE Gral.UDP_tbAldeas_Editar
 @alde_Id						INT,
 @alde_Nombre					NVARCHAR(150), 
 @ciud_Id						INT, 
 @usua_UsuarioModificacion		INT

AS
BEGIN
		DECLARE  @alde_FechaModificacion   DATETIME;
		SET		 @alde_FechaModificacion = GETDATE();
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
--Gral.UDP_tbAldeas_Editar 1,'Santa Mónica',2,1



----**********************************************************************************************
----********** TABLA MÁQUINAS MÓDULOS / procedimientos tomando en cuenta los uniques *************

--CREATE OR ALTER VIEW Prod.VW_tbMaquinasModulos
--AS
--SELECT  
--moma_Id MaquinaModuloId, 
--madu.modu_Id IdModulo,
--modu.modu_Nombre NombreModulo, 
--madu.maqu_Id IdMaquina, 
--maqui.maqu_NumeroSerie NumeroSerieMaquina,
--madu.usua_UsuarioCreacion IdUsuarioCreador,
--usua1.usua_Nombre NombreUsuaCreador,
--moma_FechaCreacion, 
--madu.usua_UsuarioModificacion IdUsuarioModificador, 
--usua2.usua_Nombre NombreUsuaModifica,
--moma_FechaModificacion, 
--madu.maqu_Estado
--FROM [Prod].[tbMaquinasModulos] madu		 INNER JOIN Prod.tbModulos modu
--ON madu.modu_Id = modu.modu_Id				 INNER JOIN Prod.tbMaquinas maqui
--ON madu.maqu_Id = maqui.maqu_Id				 INNER JOIN Acce.tbUsuarios usua1
--ON madu.usua_UsuarioCreacion = usua1.usua_Id LEFT JOIN Acce.tbUsuarios usua2
--ON madu.usua_UsuarioModificacion = usua2.usua_Id 
--GO

--CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinasModulos_Listar
--AS
--BEGIN
--	SELECT*FROM Prod.VW_tbMaquinasModulos
--	WHERE maqu_Estado = 1
--END
--GO

----- PENDIENTE LO DE QUE SI YA EXISTE (VALIDACIÓN)
--CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinasModulos_Insertar
-- @modu_Id					INT, 
-- @maqu_Id					INT, 
-- @usua_UsuarioCreacion		INT,
-- @moma_FechaCreacion		DATETIME
--AS
--BEGIN
--	SET @moma_FechaCreacion = GETDATE();
--	BEGIN TRY
--		IF EXISTS (SELECT*FROM [Prod].[tbMaquinasModulos] WHERE modu_Id = @modu_Id AND maqu_Id = @maqu_Id AND maqu_Estado = 0 )
--			BEGIN 
--				UPDATE [Prod].[tbMaquinasModulos] SET maqu_Estado = 1
--				SELECT 1
--			END 
--		ELSE
--			BEGIN
--				INSERT INTO [Prod].[tbMaquinasModulos] (modu_Id, maqu_Id, usua_UsuarioCreacion, moma_FechaCreacion)
--				VALUES (@modu_Id, @maqu_Id, @usua_UsuarioCreacion, @moma_FechaCreacion)
--				SELECT 1
--			END
--	END TRY

--	BEGIN CATCH
--		SELECT 0
--	END CATCH 

--END
--GO

-----PENDIENTE
--CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinasModulos_Editar
-- @moma_Id					INT,
-- @modu_Id					INT, 
-- @usua_UsuarioModificacion	INT,
-- @moma_FechaModificacion	DATETIME
--AS
--BEGIN 
--	SET @moma_FechaModificacion = GETDATE();
--	BEGIN TRY
--		UPDATE Prod.tbMaquinasModulos SET modu_Id = @modu_Id, usua_UsuarioModificacion = @usua_UsuarioModificacion, 
--		moma_FechaModificacion = @moma_FechaModificacion
--		WHERE moma_Id = @moma_Id
--		SELECT 1
--	END TRY

--BEGIN CATCH
--	SELECT 0
--END CATCH
--END
--GO


--**********************************************************************************************
--********** TABLA PROVEEDOTRES / procedimientos tomando en cuenta los uniques *****************

--PUSE TODO LO QUE TENÍA EN LA VISTA
CREATE OR ALTER PROCEDURE Gral.UDP_tbProveedores_Listar
	AS
	BEGIN
	SELECT 
	prov_Id							AS IdProveedor, 
	prov_NombreCompania, 
	prov_NombreContacto, 
	prov_Telefono					AS NumeroTelefonico, 
	prov_CodigoPostal, 
	prov_Ciudad						AS IdCiudadProveedor, 
	ciu.ciud_Nombre					AS NombreCiudad,
	provi.pvin_Nombre				AS NombreProvincia,
	pais.pais_Nombre				AS NombrePais,
	prov_DireccionExacta, 
	prov_CorreoElectronico, 
	prov_Fax, 
	prov.usua_UsuarioCreacion		AS IdUusuarioCreador, 
	usu1.usua_Nombre				AS NombreUsuarioCreador,
	prov_FechaCreacion, 
	prov.usua_UsuarioModificacion	AS IdUsuarioModificador, 
	usu2.usua_Nombre				AS NombreUusuarioCreador,
	prov_FechaModificacion, 
	prov_Estado
FROM Gral.tbProveedores prov					
	INNER JOIN [Gral].[tbCiudades] ciu ON prov.prov_Ciudad = ciu.ciud_Id				
	INNER JOIN Acce.tbUsuarios usu1    ON prov.usua_UsuarioCreacion = usu1.usua_Id		
	LEFT JOIN  Acce.tbUsuarios usu2	   ON prov.usua_UsuarioModificacion = usu2.usua_Id 
	INNER JOIN Gral.tbProvincias provi ON ciu.pvin_Id = provi.pvin_Id					
	INNER JOIN Gral.tbPaises pais      ON provi.pais_Id = pais.pais_Id
	WHERE [prov_Estado] = 1
END
GO


--QUITÉ  EL PARÁMETRO DE FECHA CREACIÓN 
CREATE OR ALTER PROCEDURE Gral.UDP_tbProveedores_Insertar
@prov_NombreCompania			NVARCHAR(200), 
@prov_NombreContacto			NVARCHAR(200), 
@prov_Telefono					NVARCHAR(20), 
@prov_CodigoPostal				VARCHAR(5), 
@prov_Ciudad					INT, 
@prov_DireccionExacta			NVARCHAR(350), 
@prov_CorreoElectronico			NVARCHAR(250), 
@prov_Fax						NVARCHAR(20), 
@usua_UsuarioCreacion			INT
AS
BEGIN
	DECLARE @prov_FechaCreacion	  DATETIME;
	SET		@prov_FechaCreacion = GETDATE();
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
--Gral.UDP_tbProveedores_Insertar 'Meow Compani','Karla Sanchez','96137663','0221',2,'Donde sea','putismeow@gmail.com','njbhvgh',1
--  Gral.UDP_tbProveedores_Listar



-- QUITÉ EN CAMPO DE FECHA MODIFICACIÓN 
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
@usua_UsuarioModificacion		INT
AS
BEGIN
	DECLARE @prov_FechaModificacion	DATETIME;
	SET @prov_FechaModificacion = GETDATE();
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
--Gral.UDP_tbProveedores_Editar 1, 'Meow Ceci Compani','Karla Alejandro', '95458303', '0220',2,'ay no, donde sea',
--'putismeow@gmail.com','kha?',1


/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE Gral.UDP_tbProveedores_Eliminar
(
	@prov_Id					INT,
	@usua_UsuarioEliminacion	INT
)
AS
BEGIN
	DECLARE @prov_FechaEliminacion	DATETIME;
	SET @prov_FechaEliminacion = GETDATE();
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
--Gral.UDP_tbProveedores_Eliminar 1,1
--select*from Gral.tbProveedores 

--**********************************************************************************************
--********** TABLA NIVELES COMERCIALES / procedimientos tomando en cuenta los uniques **********

--PUSE TODO LO QUE TENÍA EN LA VISTA (DEL SELECT)
CREATE OR ALTER VIEW Adua.VW_tbNivelesComerciales
AS
SELECT 
	nico_Id							AS NivelComercialId, 
	nico_Descripcion				AS NivelComercialDescripcion, 
	nco.usua_UsuarioCreacion		AS IdUsuarioCreador, 
	usu1.usua_Nombre				AS NombreUsuarioCreador,
	nico_FechaCreacion, 
	nco.usua_UsuarioModificacion	AS IdUsuarioModificador, 
	usu2.usua_Nombre				AS NombreUsuarioModificador,
	nico_FechaModificacion, 
	nico_Estado
FROM [Adua].[tbNivelesComerciales] nco			
	INNER JOIN Acce.tbUsuarios usu1			ON nco.usua_UsuarioCreacion = usu1.usua_Id		
	LEFT JOIN Acce.tbUsuarios usu2			ON nco.usua_UsuarioModificacion = usu2.usua_Id
GO


CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Listar
AS
BEGIN
	SELECT*FROM Adua.VW_tbNivelesComerciales
	WHERE nico_Estado = 1
END
GO


-- QUITÉ LA FECHA CREACIÓN DE LOS PARÁMETROS
CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Insertar
@nico_Descripcion				NVARCHAR(150), 
@usua_UsuarioCreacion			INT
AS
BEGIN
	DECLARE @nico_FechaCreacion	  DATETIME;
	SET		@nico_FechaCreacion = GETDATE();
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

-- QUITÉ LA FECHA MODIFICACIÓN DE LOS PARÁMETROS
CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Editar
@nico_Id						INT,
@nico_Descripcion				NVARCHAR(150), 
@usua_UsuarioModificacion		INT
AS
BEGIN
	DECLARE @nico_FechaModificacion	DATETIME;
	SET @nico_FechaModificacion =	GETDATE();
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


/*******************************Eliminar*************************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbNivelesComerciales_Eliminar
(
	@nico_Id					INT,
	@usua_UsuarioEliminacion	INT
)
AS
BEGIN
	DECLARE @nico_FechaEliminacion	 DATETIME;
	SET		@nico_FechaEliminacion = GETDATE();
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
