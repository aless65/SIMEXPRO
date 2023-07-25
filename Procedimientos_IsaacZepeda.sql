USE SIMEXPRO
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