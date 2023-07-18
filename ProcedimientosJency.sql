

--************CONDUCTOR******************--

/*Vista conductor*/
CREATE OR ALTER VIEW Adua.VW_tbConductor
AS
	SELECT cont_Id                     AS conductorId,
	       cont_Nombre                 AS conductorNombre, 
		   cont_Apellido               AS conductorApellido, 
		   cont_Licencia               AS conductorLicencia, 
		   pais_IdExpedicion           AS conductorIdExpedicion, 
		   t5.pais_Nombre              AS conductorPais,
		   t1.tran_Id                  AS transporteId, 
		   t4.marca_Id                 AS transporteMarca,
		   t1.usua_UsuarioCreacion     AS conductorUsuarioCreacion, 
		   t2.usua_Nombre              AS usuarioCreacionNombre,
		   cont_FechaCreacion          AS usuarioFechaCreacion, 
		   t1.usua_UsuarioModificacion AS usuarioModificacion, 
		   t3.usua_Nombre              AS usuarioModificacionNombre,
		   cont_FechaModificacion      AS usuarioFechaModificacion, 
		   cont_Estado                 AS conductorEstado
		   FROM Adua.tbConductor t1 
		   LEFT JOIN acce.tbUsuarios t2
		   ON t1.usua_UsuarioCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.usua_UsuarioModificacion = t3.usua_Id
		   LEFT JOIN Adua.tbTransporte t4 
		   ON t1.tran_Id = t4.tran_Id
		   LEFT JOIN Gral.tbPaises t5
		   ON t1.pais_IdExpedicion = t5.pais_Codigo
GO

/*Listar Conductor*/
CREATE OR ALTER PROCEDURE adua.UDP_VW_tbConductor_Listar
AS
BEGIN
	SELECT *
    FROM Adua.VW_tbConductor
	WHERE conductorEstado = 1
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
		IF NOT EXISTS (SELECT * FROM Adua.tbConductor 
						WHERE cont_Licencia  = @cont_Licencia)
			BEGIN
			INSERT INTO Adua.tbConductor(cont_Nombre, 
			                             cont_Apellido, 
										 cont_Licencia, 
										 pais_IdExpedicion, 
										 tran_Id, 
										 usua_UsuarioCreacion, 
										 cont_FechaCreacion)
			VALUES(@cont_Nombre, @cont_Apellido, @cont_Licencia, @pais_IdExpedicion, @tran_Id, @usua_UsuarioCreacion, @cont_FechaCreacion);
					
			SELECT 1 as proceso

			END
		ELSE IF EXISTS (SELECT * FROM Adua.tbConductor  
						WHERE cont_Licencia  = @cont_Licencia
						AND cont_Estado = 0)
			BEGIN
				UPDATE Adua.tbConductor
				SET cont_Estado        = 1,
				cont_Nombre            = @cont_Nombre, 
			    cont_Apellido          = @cont_Apellido, 
				pais_IdExpedicion      = @pais_IdExpedicion, 
				tran_Id                = @tran_Id, 
				usua_UsuarioCreacion   = @usua_UsuarioCreacion, 
				cont_FechaCreacion     = @cont_FechaCreacion
				WHERE cont_Licencia    = @cont_Licencia
				SELECT  1 as proceso
			END
		ELSE
			SELECT  -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
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
		SELECT 0
	END CATCH
END
GO

--/*Eliminar  Conductor*/
--CREATE OR ALTER PROCEDURE Adua.UDP_tbConductor_Eliminar 
--	@cont_Id					INT
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE	Adua.tbConductor 
--		SET		cont_Estado = 0
--		WHERE	cont_Id = @cont_Id

--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

--************TRANSPORTE******************--

/*Vista transporte*/
CREATE OR ALTER VIEW Adua.VW_tbTransporte
AS
	SELECT t1.[tran_Id]                       AS transporteId, 
	       t1.[pais_Id]                       AS paisId, 
		   t5.pais_Nombre                     AS paisNombre,
		   t1.[tran_Chasis]                   AS transporteChasis, 
		   t1.[marca_Id]                      AS marcaId, 
		   t6.marc_Descripcion                AS marcaDescripcion,
		   t1.[tran_Remolque]                 AS transporteIdRemolque, 
		   t1.[tran_CantCarga]                AS transporteCantCarga, 
		   t1.[tran_NumDispositivoSeguridad]  AS transporteNumDispositivoSeguridad, 
		   t1.[tran_Equipamiento]             AS transporteEquipamiento, 
		   t1.[tran_TipoCarga]                AS transporteTipoCarga, 
		   t1.[tran_IdContenedor]             AS transporteIdContenedor, 
		   t1.[usua_UsuarioCreacio]           AS transporteUsuarioCreacio,
		   t2.usua_Nombre                     AS usuarioCreacionNombre,
		   t1.[tran_FechaCreacion]            AS transporteFechaCreacion, 
		   t1.[usua_UsuarioModificacion]      AS transporteUsuarioModificacion,  
		   t3.usua_Nombre                     AS usuarioModificacionNombre,
		   t1.[tran_FechaModificacion]        AS transporteFechaModificacion, 
		   t1.[tran_Estado]                   AS transporteEstado
		   FROM [Adua].[tbTransporte] t1 
		   LEFT JOIN acce.tbUsuarios t2
		   ON t1.[usua_UsuarioCreacio] = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.usua_UsuarioModificacion = t3.usua_Id
		   LEFT JOIN Adua.tbTransporte t4 
		   ON t1.tran_Id = t4.tran_Id
		   LEFT JOIN Gral.tbPaises t5
		   ON t1.pais_Id = t5.pais_Codigo
		   LEFT JOIN [Adua].[tbMarcas] t6
		   ON t1.marca_Id = t6.marc_Id
GO


/*Listar transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbTransporte_Listar
AS
BEGIN
	SELECT *
    FROM Adua.VW_tbTransporte
	WHERE transporteEstado = 1
END
GO

/*Insertar transporte*/

CREATE OR ALTER PROCEDURE Adua.UDP_tbTransporte_Insert
	 @pais_Id                      CHAR(2),
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
		IF NOT EXISTS (SELECT * FROM Adua.tbTransporte
						WHERE tran_Chasis  = @tran_Chasis)
			BEGIN
			INSERT INTO Adua.tbTransporte([pais_Id],
			                              [tran_Chasis], 
										  [marca_Id], 
										  [tran_Remolque], 
										  [tran_CantCarga], 
										  [tran_NumDispositivoSeguridad], 
										  [tran_Equipamiento], 
										  [tran_TipoCarga],
										  [tran_IdContenedor], 
										  [usua_UsuarioCreacio], 
										  [tran_FechaCreacion])
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
					
			SELECT 1 as proceso

			END
		ELSE IF EXISTS (SELECT * FROM Adua.tbTransporte 
						WHERE tran_Chasis  = @tran_Chasis
						AND [tran_Estado] = 0)
			BEGIN
				UPDATE Adua.tbTransporte
				SET tran_Estado                  = 1,
				    pais_Id                      =  @pais_Id,
				    marca_Id                     = @marca_Id, 
				    tran_Remolque                = @tran_IdRemolque, 
				    tran_CantCarga               = @tran_CantCarga, 
				    tran_NumDispositivoSeguridad = @tran_NumDispositivoSeguridad, 
				    tran_Equipamiento            = @tran_Equipamiento, 
				    tran_TipoCarga               = @tran_TipoCarga,
				    tran_IdContenedor            = @tran_IdContenedor, 
				    usua_UsuarioCreacio          = @usua_UsuarioCreacio, 
				    tran_FechaCreacion           = @tran_FechaCreacion
				WHERE tran_Chasis                = @tran_Chasis
				SELECT  1 as proceso
			END
		ELSE
			SELECT  -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*Editar transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTransporte_Editar
	@tran_Id                       INT,
	@pais_Id                       CHAR(2),
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
		SELECT 0
	END CATCH
END
GO

--/* Eliminar Transporte*/

--CREATE OR ALTER PROCEDURE Adua.UPD_tbTransporte_Eliminar
--	@tran_Id	INT
--AS
--BEGIN
--	BEGIN TRY
--			BEGIN
--				UPDATE Adua.tbTransporte
--				SET tran_Estado = 0
--				WHERE tran_Id = @tran_Id

--				SELECT 1 AS proceso
--			END
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO


--************MARCAS******************--

/*Vista marcas*/
CREATE OR ALTER VIEW Adua.VW_tbMarcas
AS
	SELECT t1.marc_Id                  AS marcaId, 
	       t1.marc_Descripcion         AS marcaDescripcion, 
		   t1.usua_UsuarioCreacion     AS marcaUsuarioCreacion, 
		   t2.usua_Nombre              AS usuarioCreacionNombre,
		   t1.marc_FechaCreacion       AS marcaFechaCreacion, 
		   t1.usua_UsuarioModificacion AS marcaModificacion, 
		   t3.usua_Nombre              AS usuarioModificacionNombre,
		   t1.marc_FechaModificacion   AS marcaFechaModificacion, 
		   t1.marc_Estado              AS marcaEstado
		   FROM Adua.tbMarcas t1 
		   LEFT JOIN acce.tbUsuarios t2
		   ON t1.[usua_UsuarioCreacion] = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.usua_UsuarioModificacion = t3.usua_Id
		   
GO

/*Listar marcas*/
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbMarcas_Listar
AS
BEGIN
	SELECT *
    FROM Adua.VW_tbMarcas
	WHERE marcaEstado = 1
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

		IF EXISTS (SELECT * FROM [Adua].[tbMarcas]
						WHERE marc_Descripcion = @marc_Descripcion
						AND marc_Estado = 0)
		BEGIN
			UPDATE [Adua].[tbMarcas]
			SET	   marc_Estado = 1
			WHERE  marc_Descripcion = @marc_Descripcion

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Adua].[tbMarcas] (marc_Descripcion, usua_UsuarioCreacion, marc_FechaCreacion)
			VALUES(@marc_Descripcion, @usua_UsuarioCreacion, @marc_FechaCreacion)

			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
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
		UPDATE  [Adua].[tbMarcas]
		SET		marc_Descripcion = @marc_Descripcion
		WHERE	marc_Id = @marc_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


--/*Eliminar Marcas*/
--CREATE OR ALTER PROCEDURE Adua.UDP_tbMarcas_Eliminar 
--	@marc_Id				INT
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE	Adua.tbMarcas
--		SET		marc_Estado = 0
--		WHERE	marc_Id = @marc_Id

--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

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
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


--************TIPOS IDENTIFICACION******************--

/*Vista Tipos Identificacion*/
CREATE OR ALTER VIEW Adua.VW_tbTiposIdentificacion
AS
	SELECT t1.iden_Id                  AS IdentifiID,
	       t1.iden_Descripcion         AS IdentifiDescripcion, 
		   t1.usua_UsuarioCreacion     AS IdentifiUsuarioCreacion, 
		   t2.usua_Nombre              AS usuarioCreacionNombre,
		   t1.iden_FechaCreacion       AS IdentifiFechaCreacion, 
		   t1.iden_FechaModificacion   AS IdentifiUsuarioModificacion, 
		   t3.usua_Nombre              AS usuarioModificacionNombre,
		   t1.iden_FechaModificacion   AS IdentifiFechaModificacion,  
		   t1.iden_Estado              AS IdentifiEsatdo
		   FROM [Adua].[tbTiposIdentificacion] t1 
		   LEFT JOIN acce.tbUsuarios t2
		   ON t1.usua_UsuarioCreacion	 = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.usua_UsuarioModificacion = t3.usua_Id
		   
GO

/*Listar Tipos Identificacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbTiposIdentificacion_Listar
AS
BEGIN
	SELECT *
    FROM Adua.VW_tbTiposIdentificacion
	WHERE IdentifiEsatdo = 1
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

		IF EXISTS (SELECT * FROM [Adua].[tbTiposIdentificacion]
						WHERE iden_Descripcion = @iden_Descripcion
						AND   iden_Estado = 0)
		BEGIN
			UPDATE [Adua].[tbTiposIdentificacion]
			SET	   iden_Estado = 1
			WHERE  iden_Descripcion = @iden_Descripcion

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO [Adua].[tbTiposIdentificacion]([iden_Descripcion], usua_UsuarioCreacion, iden_FechaCreacion)
			    VALUES(@iden_Descripcion, @iden_UsuCrea, @iden_FechaCrea)

			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
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
		UPDATE  [Adua].[tbTiposIdentificacion]
		SET		iden_Descripcion = @iden_Descripcion
		WHERE	iden_Id = @iden_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


--/*Eliminar Tipos Identificacion*/
--CREATE OR ALTER PROCEDURE Adua.UDP_tbTiposIdentificacion_Eliminar 
--	@iden_Id					INT
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE	Adua.tbTiposIdentificacion
--		SET		iden_Estado = 0
--		WHERE	iden_Id = @iden_Id

--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

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
		SELECT 0
	END CATCH
END
GO


--************MODO TRANSPORTE******************--

/*Vista Modo Transporte*/
CREATE OR ALTER VIEW Adua.VW_tbModoTransporte
AS
	SELECT t1.motr_Id                  AS modoTranId,
	       t1.motr_Descripcion         AS modoTranDescripcion, 
		   t1.usua_UsuarioCreacion     AS modoTranUsuCrea ,  
		   t2.usua_Nombre              AS usuarioCreacionNombre,
		   t1.motr_FechaCreacion       AS modoTranFechaCrea, 
		   t1.usua_UsuarioModificacion AS modoTranUsuModifica, 
		   t3.usua_Nombre              AS usuarioModificacionNombre,
		   t1.usua_UsuarioModificacion AS modoTranFechaModi , 
		   t1.motr_Estado              AS modoTranEstado 
		   FROM [Adua].[tbModoTransporte] t1 
		   LEFT JOIN acce.tbUsuarios t2
		   ON t1.usua_UsuarioCreacion	 = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.usua_UsuarioModificacion = t3.usua_Id
		   
GO

/*Listar Modo Transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_VW_tbModoTransporte_Listar
AS
BEGIN
	SELECT *
    FROM Adua.VW_tbModoTransporte
	WHERE modoTranEstado = 1
END
GO

/*Insertar Modo Transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Insertar
	@motr_Descripcion			NVARCHAR(150),
	@motr_UsuCrea	            INT,
	@motr_FechaCrea             DATETIME
AS 
BEGIN
	
	BEGIN TRY

		IF EXISTS (SELECT * FROM [Adua].[tbModoTransporte]
						WHERE motr_Descripcion = @motr_Descripcion
						AND [motr_Estado] = 0)
		BEGIN
			UPDATE Adua.tbModoTransporte
			SET	   motr_Estado = 1
			WHERE  motr_Descripcion = @motr_Descripcion

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO Adua.tbModoTransporte (motr_Descripcion, usua_UsuarioCreacion, motr_FechaCreacion)
			    VALUES(@motr_Descripcion, @motr_UsuCrea, @motr_FechaCrea)

			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END
GO

/*Editar Modo Transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Editar
	@motr_Id					INT,
	@motr_Descripcion			NVARCHAR(75),
	@usua_UsuarioModificacion	INT,
	@usua_FechaModificacion     DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  [Adua].[tbModoTransporte]
		SET		motr_Descripcion = @motr_Descripcion,
		        usua_UsuarioModificacion = @usua_UsuarioModificacion,
				motr_FechaModificacion   = @usua_FechaModificacion
		WHERE	motr_Id = @motr_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


--/*Eliminar Modo Transporte*/
--CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Eliminar 
--	@motr_Id					INT
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE	Adua.tbModoTransporte
--		SET		motr_Estado = 0
--		WHERE	motr_Id = @motr_Id

--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

/*Eliminar Modo Transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Eliminar
	@motr_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@motr_FechaEliminacion		DATETIME
AS
BEGIN
	SET @motr_FechaEliminacion = GETDATE();
	BEGIN TRY
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'motr_Id', @motr_Id, 'Adua.tbModoTransporte', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
			BEGIN
				UPDATE	Adua.tbModoTransporte
				SET		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						motr_FechaEliminacion = @motr_FechaEliminacion,
						motr_Estado = 0
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO




--**********SUBCATEGORIAS**********--

/*Vista subcategoria*/
CREATE OR ALTER VIEW Prod.VW_tbSubcategoria
AS
SELECT subc.subc_Id                    AS subcategoriaId,
       subc.cate_Id                    AS categoriaId, 
	   cate.cate_Descripcion           AS categoriaDescripcion,
	   subc.subc_Descripcion		   AS subcategoriaDescripcion, 
	   subc.usua_UsuarioCreacion       As subcategoriaUsuarioCreacion,
	   usuaCrea.usua_Nombre            AS usuarioCreacionNombre,
	   subc.subc_FechaCreacion         AS subcategoriaFechaCrea, 
	   subc.usua_UsuarioModificacion   AS subcategoriaUsuarioModificacion, 
	   usuaModifica.usua_Nombre        AS usuarioModificaNombre,
	   subc.subc_FechaModificacion     AS subcategoriaFechaModifica, 
	   subc.subc_Estado                AS subcategoriaEstado
FROM Prod.tbSubcategoria subc INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON subc.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON subc.usua_UsuarioModificacion = usuaCrea.usua_Id INNER JOIN Prod.tbCategoria cate
ON subc.cate_Id = cate.cate_Id
GO

/*Listar subcategoria*/
CREATE OR ALTER PROCEDURE Prod.UDP_VW_tbSubcategoria_Listar
AS
BEGIN
	SELECT *
    FROM Prod.VW_tbSubcategoria
	WHERE subcategoriaEstado = 1
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

		IF EXISTS (SELECT * FROM Prod.tbSubcategoria
						WHERE subc_Descripcion = @subc_Descripcion
						AND subc_Estado = 0)
		BEGIN
			UPDATE Prod.tbSubcategoria
			SET	   subc_Estado          = 1,
			       cate_Id              = @cate_Id,
				   usua_UsuarioCreacion = @usua_UsuarioCreacion,
				   subc_FechaCreacion   = @usua_FechaCreacion
			WHERE  subc_Descripcion     = @subc_Descripcion

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO Prod.tbSubcategoria (cate_Id, subc_Descripcion, usua_UsuarioCreacion, subc_FechaCreacion)
			VALUES(@cate_Id, @subc_Descripcion, @usua_UsuarioCreacion, @usua_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
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
		SELECT 0
	END CATCH
END
GO

--/*Eliminar subcategoria*/

--CREATE OR ALTER PROCEDURE Prod.UDP_tbSubcategoria_Eliminar
--@subc_Id					INT
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE Prod.tbSubcategoria
--		SET	   [subc_Estado] = 0
--		WHERE  subc_Id = @subc_Id
--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO


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
		SELECT 0
	END CATCH
END
GO

--**********MATERIALES**********--

/*Vista materiales*/
CREATE OR ALTER VIEW Prod.VW_tbMateriales
AS
SELECT mate.mate_Id                    AS materialId,
       mate.mate_Descripcion           AS materialDescripcion, 
	   mate.subc_Id                    AS subcategoriaId,
	   subc.subc_Descripcion           AS subcategoriaDescripcion,
	   mate.mate_Precio                AS materialPrecio, 
	   mate.usua_UsuarioCreacion       AS usuarioCreacionId, 
	   usuaCrea.usua_Nombre            AS usuarioCreacionNombre,
	   mate.mate_FechaCreacion         AS materialFechaCreacion, 
	   mate.usua_UsuarioModificacion   AS usuarioModificacionId, 
	   usuaModifica.usua_Nombre        AS usuarioModificaNombre,
	   mate.mate_FechaModificacion     AS materialFechaModificacion, 
	   mate.mate_Estado                AS materialEstado
FROM Prod.tbMateriales mate INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON mate.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON mate.usua_UsuarioModificacion = usuaCrea.usua_Id INNER JOIN Prod.tbSubcategoria subc
ON mate.subc_Id = subc.subc_Id
GO


/*Listar materiales*/
CREATE OR ALTER PROCEDURE Prod.UDP_VW_tbMateriales_Listar
AS
BEGIN
	SELECT *
    FROM Prod.VW_tbMateriales
	WHERE materialEstado = 1
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

		IF EXISTS (SELECT * FROM Prod.tbMateriales
						WHERE mate_Descripcion = @mate_Descripcion
						AND mate_Estado = 0)
		BEGIN
			UPDATE Prod.tbMateriales
			SET	   mate_Estado          = 1,
			       subc_Id              = @subc_Id,
				   mate_Precio          = @mate_Precio
			WHERE  mate_Descripcion     = @mate_Descripcion

			SELECT 1
		END
		ELSE 
			BEGIN
				INSERT INTO Prod.tbMateriales (mate_Descripcion, subc_Id, mate_Precio, usua_UsuarioCreacion, mate_FechaCreacion)
			VALUES(@mate_Descripcion, @subc_Id, @mate_Precio, @usua_UsuarioCreacion, @mate_FechaCreacion)


			SELECT 1
		END
	END TRY
	BEGIN CATCH
		SELECT 0
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
		SELECT 0
	END CATCH
END
GO

--/*Eliminar materiales*/

--CREATE OR ALTER PROCEDURE Prod.UDP_tbMateriales_Eliminar
--@mate_Id					INT
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE Prod.tbMateriales
--		SET	   mate_Estado = 0
--		WHERE  mate_Id = @mate_Id
--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

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
		SELECT 0
	END CATCH
END
GO

--**********INSPECCIONES ESTADO**********--

/*Vista inspeccion estado*/
CREATE OR ALTER VIEW Prod.VW_tbInspeccionesEstado
AS
SELECT insp.ines_Id                  AS inspeccionId,
       insp.reca_Id                  AS  revisionId, 
	   revi.reca_Descripcion         AS revisionDescripcion,
	   insp.usua_UsuarioCreacion     AS usuarioCreacionId , 
	   usuaCrea.usua_Nombre          AS usuarioCreacionNombre,
	   insp.ines_FechaCreacion       AS inspeccionFechaCreacion, 
	   insp.usua_UsuarioModificacion AS usuarioModificacionId, 
	   usuaModifica.usua_Nombre      AS usuarioModificaNombre,
	   insp.ines_FechaModificacion   AS usuarioFechaModificacion, 
	   insp.ines_Estado              AS inspeccionEstado	   
FROM [Prod].[tbInspeccionesEstado] insp INNER JOIN [Acce].[tbUsuarios] usuaCrea
ON insp.usua_UsuarioCreacion = usuaCrea.usua_Id LEFT JOIN [Acce].[tbUsuarios] usuaModifica
ON insp.usua_UsuarioModificacion = usuaCrea.usua_Id INNER JOIN Prod.tbRevisionDeCalidad revi
ON insp.reca_Id = revi.reca_Id
GO


/*Listar inspecciones estado*/
CREATE OR ALTER PROCEDURE Prod.UDP_VW_tbInspeccionesEstado_Listar
AS
BEGIN
	SELECT *
    FROM Prod.VW_tbInspeccionesEstado
	WHERE inspeccionEstado = 1
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
		SELECT 0
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
		SELECT 0
	END CATCH
END
GO

--/*Eliminar inspecciones estado*/

--CREATE OR ALTER PROCEDURE Prod.UDP_tbInspeccionesEstado_Eliminar
--@ines_Id					INT
--AS
--BEGIN
--	BEGIN TRY
--		UPDATE Prod.tbInspeccionesEstado
--		SET	   ines_Estado = 0
--		WHERE  ines_Id     = @ines_Id
--		SELECT 1
--	END TRY
--	BEGIN CATCH
--		SELECT 0
--	END CATCH
--END
--GO

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
		SELECT 0
	END CATCH
END
GO


--Insert Tipo Liquidacion
INSERT INTO Adua.tbTipoLiquidacion(tipl_Descripcion, usua_UsuarioCreacion, tipl_FechaCreacion)
VALUES	('Liquidación de derechos de importación',1,GETDATE()),
		('Liquidación de tributos internos',1,GETDATE()),
		('Liquidación de multas y recargos',1,GETDATE()),
		('Liquidación de gastos administrativos',1,GETDATE()),
		('Liquidación de gastos administrativos',1,GETDATE()),
		('Liquidación de tasas de servicio',1,GETDATE()),
		('Liquidación de impuestos especiales',1,GETDATE()),
        ('Liquidación de tasas de registro',1,GETDATE()),
		('Liquidación de pagos anticipados',1,GETDATE())
GO

--Insert Estado Boletín
INSERT INTO Adua.tbEstadoBoletin(esbo_Descripcion, usua_UsuarioCreacion, esbo_FechaCreacion)
VALUES	('Estado de Tránsito Aduanero',1,GETDATE()),
        ('Estado de Despacho Aduanero',1,GETDATE()),
		('Estado de Liquidación Aduanera',1,GETDATE()),
		('Estado de Autorización Aduanera',1,GETDATE())
		
GO