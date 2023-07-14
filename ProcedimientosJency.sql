

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
CREATE OR ALTER PROCEDURE gral.UDP_VW_tbConductor_Listar
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
	IF NOT EXISTS (SELECT * FROM Adua.tbConductor	 
						WHERE cont_Licencia = @cont_Licencia)
		BEGIN			
			UPDATE Adua.tbConductor
			SET cont_Nombre               = @cont_Nombre, 
			    cont_Apellido             = @cont_Apellido, 
				pais_IdExpedicion         = @pais_IdExpedicion, 
				tran_Id                   = @tran_Id, 
				usua_UsuarioModificacion  = @usua_UsuarioModificacion, 
				cont_FechaModificacion    = @cont_FechaModificacion
			WHERE 	cont_Licencia = @cont_Licencia

			SELECT 'El conductor ha sido editado exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM Adua.tbConductor
						WHERE cont_Licencia = @cont_Licencia
							  AND cont_Estado = 1
							  AND cont_Id != @cont_Id)

			SELECT 'El conductor ya existe'
		ELSE
			UPDATE Adua.tbConductor
			SET cont_Estado = 1,
				cont_Nombre               = @cont_Nombre, 
			    cont_Apellido             = @cont_Apellido, 
				pais_IdExpedicion         = @pais_IdExpedicion, 
				tran_Id                   = @tran_Id, 
				usua_UsuarioModificacion  = @usua_UsuarioModificacion, 
				cont_FechaModificacion    = @cont_FechaModificacion
			WHERE cont_Licencia = @cont_Licencia

			SELECT 'El conductor ha sido editado exitosamente'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

/*Eliminar  Conductor*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbConductor_Eliminar 
	@cont_Id					INT
AS
BEGIN
	BEGIN TRY
		UPDATE	Adua.tbConductor 
		SET		cont_Estado = 0
		WHERE	cont_Id = @cont_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

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
		   t1.[tran_IdRemolque]               AS transporteIdRemolque, 
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
										  [tran_IdRemolque], 
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
				    tran_IdRemolque              = @tran_IdRemolque, 
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
	IF NOT EXISTS (SELECT * FROM Adua.tbTransporte	 
						WHERE tran_Chasis = @tran_Chasis)
		BEGIN			
			UPDATE Adua.tbTransporte
			SET  pais_Id                      = @pais_Id, 
				 marca_Id                     = @marca_Id, 
				 tran_IdRemolque              = @tran_IdRemolque, 
				 tran_CantCarga               = @tran_CantCarga, 
				 tran_NumDispositivoSeguridad = @tran_NumDispositivoSeguridad,
				 tran_Equipamiento            = @tran_Equipamiento, 
				 tran_TipoCarga               = @tran_TipoCarga, 
				 tran_IdContenedor            = @tran_IdContenedor, 
				 usua_UsuarioModificacion     = @usua_UsuarioModificacion, 
				 tran_FechaModificacion       = @tran_FechaModificacion
			WHERE tran_Chasis                 = @tran_Chasis

			SELECT 'El transporte ha sido editado exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM Adua.tbTransporte
						WHERE tran_Chasis  = @tran_Chasis
							  AND tran_Estado = 1
							  AND tran_Id != @tran_Id)

			SELECT 'El transporte ya existe'
		ELSE
			UPDATE Adua.tbTransporte
			SET tran_Estado = 1,
				pais_Id                      = @pais_Id, 
				 marca_Id                     = @marca_Id, 
				 tran_IdRemolque              = @tran_IdRemolque, 
				 tran_CantCarga               = @tran_CantCarga, 
				 tran_NumDispositivoSeguridad = @tran_NumDispositivoSeguridad,
				 tran_Equipamiento            = @tran_Equipamiento, 
				 tran_TipoCarga               = @tran_TipoCarga, 
				 tran_IdContenedor            = @tran_IdContenedor, 
				 usua_UsuarioModificacion     = @usua_UsuarioModificacion, 
				 tran_FechaModificacion       = @tran_FechaModificacion
			WHERE tran_Chasis  = @tran_Chasis

			SELECT 'El transporte ha sido editado exitosamente'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

/* Eliminar Transporte*/

CREATE OR ALTER PROCEDURE Adua.UPD_tbTransporte_Eliminar
	@tran_Id	INT
AS
BEGIN
	BEGIN TRY
			BEGIN
				UPDATE Adua.tbTransporte
				SET tran_Estado = 0
				WHERE tran_Id = @tran_Id

				SELECT 1 AS proceso
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


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


/*Eliminar Marcas*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbMarcas_Eliminar 
	@marc_Id				INT
AS
BEGIN
	BEGIN TRY
		UPDATE	Adua.tbMarcas
		SET		marc_Estado = 0
		WHERE	marc_Id = @marc_Id

		SELECT 1
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
		   t1.iden_UsuCrea             AS IdentifiUsuarioCreacion, 
		   t2.usua_Nombre              AS usuarioCreacionNombre,
		   t1.iden_FechaCrea           AS IdentifiFechaCreacion, 
		   t1.iden_UsuModifica         AS IdentifiUsuarioModificacion, 
		   t3.usua_Nombre              AS usuarioModificacionNombre,
		   t1.iden_FechaModi           AS IdentifiFechaModificacion,  
		   t1.iden_Estado              AS IdentifiEsatdo
		   FROM [Adua].[tbTiposIdentificacion] t1 
		   LEFT JOIN acce.tbUsuarios t2
		   ON t1.iden_UsuCrea	 = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.iden_UsuModifica = t3.usua_Id
		   
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
				INSERT INTO [Adua].[tbTiposIdentificacion]([iden_Descripcion], iden_UsuCrea, iden_FechaCrea)
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


/*Eliminar Tipos Identificacion*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTiposIdentificacion_Eliminar 
	@iden_Id					INT
AS
BEGIN
	BEGIN TRY
		UPDATE	Adua.tbTiposIdentificacion
		SET		iden_Estado = 0
		WHERE	iden_Id = @iden_Id

		SELECT 1
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
		   t1.motr_UsuCrea             AS modoTranUsuCrea ,  
		   t2.usua_Nombre              AS usuarioCreacionNombre,
		   t1.motr_FechaCrea           AS modoTranFechaCrea, 
		   t1.motr_UsuModifica         AS modoTranUsuModifica, 
		   t3.usua_Nombre              AS usuarioModificacionNombre,
		   t1.motr_FechaModi           AS modoTranFechaModi , 
		   t1.motr_Estado              AS modoTranEstado 
		   FROM [Adua].[tbModoTransporte] t1 
		   LEFT JOIN acce.tbUsuarios t2
		   ON t1.motr_UsuCrea	 = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.motr_UsuModifica = t3.usua_Id
		   
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
				INSERT INTO Adua.tbModoTransporte (motr_Descripcion, motr_UsuCrea, motr_FechaCrea)
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
		        motr_UsuModifica = @usua_UsuarioModificacion,
				motr_FechaModi   = @usua_FechaModificacion
		WHERE	motr_Id = @motr_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/*Eliminar Modo Transporte*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Eliminar 
	@motr_Id					INT
AS
BEGIN
	BEGIN TRY
		UPDATE	Adua.tbModoTransporte
		SET		motr_Estado = 0
		WHERE	motr_Id = @motr_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
