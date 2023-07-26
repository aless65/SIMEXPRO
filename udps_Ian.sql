USE SIMEXPRO
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

---------------------UDPS Materiales Brindar-----------------------
--LISTAR
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaterialesBrindar_Listar
AS
BEGIN
  SELECT    mabr.[mabr_Id]          AS IdMaterialesBrindar,
		    mabr.code_Id            AS IdOrdenCompraDetalles,
		    mabr.mate_Id            AS IdMaterial,
		    mabr.mabr_Cantidad      AS Cantidad,
		   		
			usu.usua_Id             AS IDUsuarioCreacion,
			usu.usua_Nombre         AS UsuarioCreacion ,
			mabr_FechaCreacion      AS FechaCreacion,

			usu1.usua_Id            AS IDUsuarioModificacion,
			usu1.usua_Nombre        AS UsuarioModificacion,
			mabr_FechaModificacion  AS FechaModificacion
 
  FROM	    [Prod].[tbMaterialesBrindar] mabr
            INNER JOIN [Prod].[tbOrdenCompraDetalles] code ON mabr.code_Id = code.code_Id
			INNER JOIN Acce.tbUsuarios usu          ON usu.usua_Id = mabr.usua_UsuarioCreacion 
			LEFT JOIN Acce.tbUsuarios usu1          ON usu1.usua_UsuarioModificacion = mabr.usua_UsuarioModificacion
			INNER JOIN [Prod].[tbMateriales] mate   ON mabr.mate_Id = mate.mate_Id
			WHERE mabr.mabr_Estado = 1
END 
GO

--INSERTAR
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaterialesBrindar_Insertar
(
     @code_Id                    INT,
	 @mate_Id                    INT,
	 @mabr_Cantidad              INT,
	 @usua_UsuarioCreacion       INT,
	 @mabr_FechaCreacion         DATETIME
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Prod].[tbMaterialesBrindar]
					(
					  [code_Id],
                      [mate_Id],
                      [mabr_Cantidad],
                      [usua_UsuarioCreacion],
                      [mabr_FechaCreacion]
					)
			 VALUES (
			           @code_Id,
					   @mate_Id,
					   @mabr_Cantidad,
					   @usua_UsuarioCreacion,
					   @mabr_FechaCreacion
			        )
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

--EDITAR
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaterialesBrindar_Editar
(
     @mabr_Id                    INT,
     @code_Id                    INT,
	 @mate_Id                    INT,
	 @mabr_Cantidad              INT,
	 @usua_UsuarioModificacion   INT,
	 @mabr_FechaModificacion     DATETIME
)
AS
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbMaterialesBrindar]
		   SET [code_Id] = @code_Id,
		       [mate_Id] = @mate_Id,
               [mabr_Cantidad] = @mabr_Cantidad,
               [usua_UsuarioModificacion] = @usua_UsuarioModificacion,
               [mabr_FechaModificacion] = @mabr_FechaModificacion
		 WHERE [mabr_Estado] = @mabr_Id
		SELECT SCOPE_IDENTITY() AS Resultado
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() AS Resultado
	END CATCH
END
GO

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
		   [duca_DomicilioFiscal_Importador] = @domicilio_Fiscal_im
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
		SET    [tido_Id] = @tido_Id,
		       [doso_NumeroDocumento] = @doso_NumeroDocumento,
			   [doso_FechaEmision] = @doso_FechaEmision,
			   [doso_FechaVencimiento] = @doso_FechaVencimiento,
			   [doso_PaisEmision] = @doso_PaisEmision,
			   [doso_LineaAplica] = @doso_LineaAplica,
			   [doso_EntidadEmitioDocumento] = @doso_EntiadEmitioDocumento,
			   [doso_Monto] = @doso_Monto,
			   [usua_UsuarioModificacion] = @usua_UsuarioModificacion,
			   [doso_FechaModificacion] = @doso_FechaModificacion
        WHERE  
        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END


