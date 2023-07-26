GO
USE SIMEXPRO

GO
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

CREATE OR ALTER PROC prod.UDP_tbMaterialesBrindar_Eliminar
@mabr_Id					INT
AS
BEGIN
	BEGIN TRY

		UPDATE [Prod].[tbMaterialesBrindar]
		SET		mabr_Estado					= 0
		WHERE	mabr_Id						= @mabr_Id

	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
