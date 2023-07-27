

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

--********************************************LOTES***********************************************--
CREATE OR ALTER PROCEDURE Prod.UDP_tbLotes_Listar
AS BEGIN

SELECT lote_Id, 
	   materiales.mate_Descripcion,
	   lotes.mate_Id, 
	   UnidadesMedida.unme_Id,
	   lote_Observaciones,
	   lote_Stock,
	   lote_CantIngresada,
	   areas.tipa_area,
	   areas.tipa_id,
	   UsuCreacion.usua_Nombre AS UsuarioCreacion,
	   lotes.usua_UsuarioCreacion,
	   lotes.lote_FechaCreacion, 
	   UsuModificacion.usua_Nombre AS UsuarioModificacion,
	   lotes.usua_UsuarioModificacion,
	   lotes.lote_FechaModificacion, 
	   UsuEliminacion.usua_Nombre AS UsuarioEliminacion,
	   lotes.usua_UsuarioEliminacion, 
	   lotes.lote_FechaEliminacion, 
	   lotes.lote_Estado
  FROM Prod.tbLotes lotes
	   INNER JOIN Prod.tbMateriales AS materiales
	   ON lotes.mate_Id = materiales.mate_Id
	   INNER JOIN Prod.tbArea AS areas
	   ON lotes.tipa_id = areas.tipa_id
	   INNER JOIN Acce.tbUsuarios AS UsuCreacion
	   ON lotes.usua_UsuarioCreacion = UsuCreacion.usua_Id
	   INNER JOIN Acce.tbUsuarios AS UsuModificacion
	   ON lotes.usua_UsuarioModificacion = UsuModificacion.usua_Id
	   INNER JOIN Acce.tbUsuarios AS UsuEliminacion
	   ON lotes.usua_UsuarioEliminacion = UsuEliminacion.usua_Id
	   INNER JOIN Gral.tbUnidadMedidas AS UnidadesMedida
	   ON lotes.unme_Id = UnidadesMedida.unme_Id
  WHERE lotes.lote_Estado = 1

END
GO


CREATE OR ALTER PROC Prod.UDP_tbLotes_Insertar
@mate_Id				INT,
@unme_Id				INT,
@lote_Stock				INT,
@lote_CantIngresada		INT,
@tipa_Id				INT,
@lote_Observaciones		NVARCHAR(MAX),
@usua_UsuarioCreacion	INT,
@lote_FechaCreacion		DATETIME
AS BEGIN

BEGIN TRY
	INSERT INTO Prod.tbLotes(mate_Id, 
							 unme_Id,
						     lote_Stock, 
							 lote_CantIngresada, 
							 tipa_Id, 
							 lote_Observaciones,
							 usua_UsuarioCreacion,
							 lote_FechaCreacion)

	VALUES					(@mate_Id,		
							 @unme_Id,
							 @lote_Stock,			
							 @lote_CantIngresada,	
							 @tipa_Id,
							 @lote_Observaciones,
							 @usua_UsuarioCreacion,
							 @lote_FechaCreacion)
END TRY

BEGIN CATCH

		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH
END	
GO


CREATE OR ALTER PROC Prod.UDP_tbLotes_Editar
@lote_Id				  INT,
@mate_Id				  INT,
@unme_Id				  INT,
@lote_Stock				  INT,
@lote_CantIngresada		  INT,
@tipa_Id				  INT,
@lote_Observcaciones	  NVARCHAR(MAX),
@usua_UsuarioModificacion INT,
@lote_FechaModificacion	  DATETIME
AS BEGIN

	UPDATE Prod.tbLotes SET  mate_Id = @mate_Id, 
						     unme_Id = @unme_Id,
						     lote_Stock = @lote_Stock, 
							 lote_CantIngresada = @lote_CantIngresada, 
							 tipa_Id = @tipa_Id, 
							 lote_Observaciones = @lote_Observcaciones,
							 usua_UsuarioModificacion = @usua_UsuarioModificacion,
							 lote_FechaModificacion = lote_FechaModificacion
						WHERE lote_Id = @lote_Id
END	

GO


CREATE OR ALTER PROC Prod.UDP_tbLotes_Eliminar
@lote_Id					INT,
@usua_UsuarioEliminacion    INT,
@lote_FechaEliminacion      DATETIME

AS BEGIN

	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'lote_Id', @lote_Id, 'Prod.tbAsignacionesOrdenDetalle', @respuesta OUTPUT

		
		IF(@respuesta) = 1
			BEGIN
				 UPDATE Prod.tbLotes
					SET lote_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						lote_FechaEliminacion = @lote_FechaEliminacion
				  WHERE lote_Id = @lote_Id 
					AND lote_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();	
	END CATCH

END
GO

--**************************************************************************************************--


--*********************************************COLORES**********************************************--

CREATE OR ALTER PROC Prod.UDP_tbColores_Listar
AS BEGIN

SELECT colr_Id,
	   colr_Nombre,
	   colr_Codigo,
	   colores.usua_UsuarioCreacion AS UsuCreacion, 
	   Creacion.usua_Nombre,
	   colores.colr_FechaCreacion,
	   colores.usua_UsuarioModificacion AS usuModificacion,
	   Modificacion.usua_Nombre,
	   colores.colr_FechaModificacion, 
	   colores.usua_UsuarioEliminacion AS usuEliminacion,
	   Eliminacion.usua_Nombre,
	   colores.colr_FechaEliminacion,
	   colores.colr_Estado 
FROM   Prod.tbColores colores
INNER JOIN Acce.tbUsuarios Creacion
ON Creacion.usua_Id = colores.usua_UsuarioCreacion
INNER JOIN Acce.tbUsuarios Modificacion
ON Modificacion.usua_Id = colores.usua_UsuarioModificacion
INNER JOIN Acce.tbUsuarios Eliminacion
ON Eliminacion.usua_Id = colores.usua_UsuarioEliminacion

END
GO


CREATE OR ALTER PROC Prod.UDP_tbColores_Insertar
@colr_Nombre NVARCHAR(100),
@colr_Codigo NVARCHAR(100),
@usua_UsuarioCreacion INT,
@colr_FechaCreacion DATETIME
AS BEGIN

BEGIN TRY
INSERT INTO Prod.tbColores(colr_Nombre, 
					       colr_Codigo,
						   usua_UsuarioCreacion, 
						   colr_FechaCreacion)
VALUES (@colr_Nombre, 
		@colr_Codigo,
		@usua_UsuarioCreacion, 
		@colr_FechaCreacion)

END TRY

BEGIN CATCH

		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH
END
GO


CREATE OR ALTER PROC Prod.UDP_tbColores_Editar
@colr_Id INT,
@colr_Nombre NVARCHAR(100),
@colr_Codigo NVARCHAR(100),
@usua_UsuarioModificacion INT,
@colr_FechaModificacion DATETIME
AS BEGIN

BEGIN TRY

UPDATE Prod.tbColores SET colr_Nombre = @colr_Nombre,
						  colr_Codigo = @colr_Codigo,
						  usua_UsuarioModificacion = @usua_UsuarioModificacion,
						  colr_FechaModificacion = @colr_FechaModificacion
					  WHERE colr_Id = @colr_Id

END TRY

BEGIN CATCH

		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH

END
GO


CREATE OR ALTER PROC Prod.UDP_tbColores_Eliminar
@colr_Id INT,
@usua_UsuarioEliminacion INT,
@colr_FechaEliminacion DATETIME
AS BEGIN
	BEGIN TRY
		DECLARE @respuesta INT
		EXEC dbo.UDP_ValidarReferencias 'colr_Id', @colr_Id, 'Prod.tbOrdenCompraDetalles', @respuesta OUTPUT

		
		IF(@respuesta) = 1
			BEGIN
				 UPDATE Prod.tbColores
					SET colr_Estado = 0,
						usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
						colr_FechaEliminacion = @colr_FechaEliminacion
				  WHERE colr_Id = @colr_Id
					AND colr_Estado = 1
			END

		SELECT @respuesta AS Resultado
	END TRY
	BEGIN CATCH
			SELECT 'Error Message: '+ ERROR_MESSAGE();	
	END CATCH

END
GO

--**************************************************************************************************--











--***************************************PEDIDOS PRODUCCION*****************************************--

CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccion_Listar
AS BEGIN

SELECT ppro_Id,
	   pediproduccion.empl_Id,
	   CONCAT(empl_Nombres, ' ', empl_Apellidos) AS empl_NombreCompleto,
	   ppro_Fecha,
	   ppro_Estados, 
	   ppro_Observaciones, 
	   Creacion.usua_Nombre AS usuCreacion,
	   pediproduccion.usua_UsuarioCreacion,
	   ppro_FechaCreacion,
	   Modificacion.usua_Nombre AS usuModificacion,
	   pediproduccion.usua_UsuarioModificacion, 
	   ppro_FechaModificacion,
	   ppro_Estado
FROM Prod.tbPedidosProduccion pediproduccion
INNER JOIN Gral.tbEmpleados emples
ON pediproduccion.empl_Id = emples.empl_Id
INNER JOIN Acce.tbUsuarios Creacion
ON pediproduccion.usua_UsuarioCreacion = Creacion.usua_Id
INNER JOIN Acce.tbUsuarios Modificacion
ON pediproduccion.usua_UsuarioModificacion = Modificacion.usua_Id

END
GO


CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccion_Insertar
@empl_Id INT,
@ppro_Fecha DATETIME,
@ppro_Estados NVARCHAR(150),
@ppr_Observaciones NVARCHAR(MAX),
@usua_UsuarioCreacion INT,
@ppro_FechaCreacion DATETIME,
@lote_Id INT,
@ppde_Cantidad INT
AS BEGIN
BEGIN TRY

INSERT INTO Prod.tbPedidosProduccion(empl_Id, 
								     ppro_Fecha,
									 ppro_Estados,
									 ppro_Observaciones, 
									 usua_UsuarioCreacion,
									 ppro_FechaCreacion)
VALUES(@empl_Id, @ppro_Fecha, @ppro_Estados, @ppr_Observaciones, @usua_UsuarioCreacion, @ppro_FechaCreacion)

DECLARE @ppro_Id INT = SCOPE_IDENTITY();

INSERT INTO Prod.tbPedidosProduccionDetalles(ppro_Id, 
											 lote_Id,
											 ppde_Cantidad, 
											 usua_UsuarioCreacion,
											 ppde_FechaCreacion)
VALUES (@ppro_Id, @lote_Id, @ppde_Cantidad, @usua_UsuarioCreacion, @ppro_FechaCreacion)

END TRY
BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH

END
GO


CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccion_Editar
@ppro_Id INT,
@empl_Id INT,
@ppro_Fecha DATETIME,
@ppro_Estados NVARCHAR(150),
@ppro_Observaciones NVARCHAR(MAX),
@usua_UsuarioModificacion INT,
@ppro_FechaModificacion DATETIME
AS BEGIN

BEGIN TRY

UPDATE Prod.tbPedidosProduccion SET empl_Id = @empl_Id,
									ppro_Fecha = @ppro_Fecha,
									ppro_Estados = @ppro_Estados,
									ppro_Observaciones = @ppro_Observaciones,
									usua_UsuarioModificacion = @usua_UsuarioModificacion,
									ppro_FechaModificacion = @ppro_FechaModificacion
								WHERE ppro_Id = @ppro_Id

END TRY

BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()

END CATCH

END
GO



CREATE OR ALTER PROC Prod.UDP_tbPedidosProduccionDetalle_Listar
@ppro_Id INT
AS BEGIN

SELECT ppde_Id,
	   ppro_Id,
	   lote_Id,
	   ppde_Cantidad, 
	   usua_UsuarioCreacion,
	   ppde_FechaCreacion,
	   usua_UsuarioModificacion,
	   ppde_FechaModificacion, 
	   ppde_Estado 
FROM Prod.tbPedidosProduccionDetalles
WHERE ppro_Id = @ppro_Id

END


