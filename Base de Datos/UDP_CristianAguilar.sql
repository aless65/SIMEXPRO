


/*Listar Liquidacion Por Linea*/
CREATE OR ALTER PROCEDURE adua.UDP_tbLiquidacionPorLinea_Listar
AS
BEGIN	
	SELECT	lili_Id, 
			lili_Tipo, 
			lili_Alicuota, 
			lili_Total, 
			lili_ModalidadPago, 
			lili_TotalGral, 
			liquiLinea.item_Id
	FROM	[Adua].[tbLiquidacionPorLinea] liquiLinea 
	INNER JOIN [Adua].[tbItems] Items ON liquiLinea.item_Id = Items.item_Id
END
GO

/*Insertar Liquidacion Por Linea*/
CREATE OR ALTER PROCEDURE adua.UDP_tbLiquidacionPorLinea_Insertar
	@lili_Tipo			NVARCHAR(100), 
	@lili_Alicuota		DECIMAL(18,2), 
	@lili_Total			DECIMAL(18,2), 
	@lili_ModalidadPago NVARCHAR(200), 
	@lili_TotalGral		DECIMAL(18,2),  
	@item_Id			INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Adua].[tbLiquidacionPorLinea] (lili_Tipo, 
													lili_Alicuota, 
													lili_Total, 
													lili_ModalidadPago, 
													lili_TotalGral, 
													item_Id)
		VALUES (@lili_Tipo, @lili_Alicuota, @lili_Total, @lili_ModalidadPago, @lili_TotalGral, @item_Id)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END


/*Editar Liquidacion Por Linea*/
GO
CREATE OR ALTER PROCEDURE adua.UDP_tbLiquidacionPorLinea_Editar
	@lili_Id			INT,
	@lili_Tipo			NVARCHAR(100), 
	@lili_Alicuota		DECIMAL(18,2), 
	@lili_Total			DECIMAL(18,2), 
	@lili_ModalidadPago NVARCHAR(200), 
	@lili_TotalGral		DECIMAL(18,2),  
	@item_Id			INT
AS
BEGIN
	BEGIN TRY
		UPDATE 	[Adua].[tbLiquidacionPorLinea]
		SET lili_Tipo			= @lili_Tipo, 
			lili_Alicuota		= @lili_Alicuota, 
			lili_Total			= @lili_Total, 
			lili_ModalidadPago	= @lili_ModalidadPago, 
			lili_TotalGral		= @lili_TotalGral, 
			item_Id				= @item_Id
		WHERE lili_Id = @lili_Id 
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END


/*****************************************************************************/

/*Listar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Listar
AS
BEGIN
	SELECT	mahi_Id, 
			maquiHisto.maqu_Id, 
			maquina.maqu_NumeroSerie		AS MaquinaNumeroSerie,
			mahi_FechaInicio, 
			mahi_FechaFin, 
			mahi_Observaciones, 
			maquiHisto.usua_UsuarioCreacion, 
			usuarioCrea.usua_Nombre			AS  usuarioCreacionNombre, 
			mahi_FechaCreacion, 
			maquiHisto.usua_UsuarioModificacion, 
			usuarioModifica.usua_Nombre		AS usuarioModificaNombre,
			mahi_FechaModificacion, 
			maquiHisto.usua_UsuarioEliminacion, 
			usuarioElimina.usua_Nombre		AS usuarioEliminaNombre,
			mahi_FechaEliminacion, 
			mahi_Estado
	FROM	[Prod].[tbMaquinaHistorial] maquiHisto 
	INNER JOIN [Prod].[tbMaquinas]	maquina				ON maquiHisto.maqu_Id = maquina.maqu_Id
	LEFT JOIN  [Acce].[tbUsuarios]	usuarioCrea			ON maquiHisto.usua_UsuarioCreacion = usuarioCrea.usua_Id 
	LEFT JOIN  [Acce].[tbUsuarios]	usuarioModifica		ON maquiHisto.usua_UsuarioModificacion = usuarioModifica.usua_Id	
	LEFT JOIN  [Acce].[tbUsuarios]	usuarioElimina		ON maquiHisto.usua_UsuarioEliminacion = usuarioElimina.usua_Id
END

/*Insertar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Insertar
	@maqu_Id				INT, 
	@mahi_FechaInicio		DATETIME, 
	@mahi_FechaFin			DATETIME, 
	@mahi_Observaciones		NVARCHAR(350), 
	@usua_UsuarioCreacion	INT, 
	@mahi_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO [Prod].[tbMaquinaHistorial](maqu_Id, 
												mahi_FechaInicio, 
												mahi_FechaFin, 
												mahi_Observaciones, 
												usua_UsuarioCreacion, 
												mahi_FechaCreacion)
		VALUES(@maqu_Id,@mahi_FechaInicio,@mahi_FechaFin,@mahi_Observaciones,@usua_UsuarioCreacion,@mahi_FechaCreacion)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

/*Editar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Editar
	@mahi_Id					INT,
	@maqu_Id					INT, 
	@mahi_FechaInicio			DATETIME, 
	@mahi_FechaFin				DATETIME, 
	@mahi_Observaciones			NVARCHAR(350), 
	@usua_UsuarioModificacion	INT, 
	@mahi_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbMaquinaHistorial]
		SET maqu_Id						= @maqu_Id, 
			mahi_FechaInicio			= @mahi_FechaInicio, 
			mahi_FechaFin				= @mahi_FechaFin, 
			mahi_Observaciones			= @mahi_Observaciones, 
			usua_UsuarioModificacion	= @usua_UsuarioModificacion, 
			mahi_FechaModificacion		= @mahi_FechaModificacion
		WHERE mahi_Id = @mahi_Id

		SELECT 1

	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

/*Editar Maquinaria Historial*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbMaquinaHistorial_Eliminar
	@mahi_Id					INT,
	@usua_UsuarioEliminacion	INT, 
	@mahi_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE [Prod].[tbMaquinaHistorial]
		SET usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
			mahi_FechaEliminacion = @mahi_FechaEliminacion,
			mahi_Estado = 0
		WHERE mahi_Id = @mahi_Id

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO