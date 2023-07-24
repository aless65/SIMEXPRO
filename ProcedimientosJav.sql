
-- ************************************* KARLA ESTUVO AQUÍ e ******************************************************

--*****Modo Transporte*****--
--CREATE OR ALTER VIEW tbModoTransporte
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Listar
AS
BEGIN
SELECT	modo.motr_Id						,
		modo.motr_Descripcion				,
		crea.usua_Nombre					AS usarioCreacion,
		modo.motr_FechaCreacion				,
		modi.usua_Nombre					AS usuarioModificacion,
		modo.motr_FechaModificacion			,
		modo.motr_Estado					
FROM	Adua.tbModoTransporte modo 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = modo.usua_UsuarioCreacion		
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = modo.usua_UsuarioModificacion 
WHERE	motr_Estado = 1
END
GO
--*****Insertar*****--

--Adua.UDP_tbModoTransporte_Insertar 'Probando',1, '01-14-2003'
--   SELECT*FROM Adua.tbModoTransporte

CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Insertar
@motr_Descripcion		NVARCHAR(75),
@usua_UsuarioCreacion	INT,
@motr_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY 
		INSERT INTO Adua.tbModoTransporte(motr_Descripcion,usua_UsuarioCreacion,motr_FechaCreacion)
		VALUES (
		@motr_Descripcion,
		@usua_UsuarioCreacion,
		@motr_FechaCreacion
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Editar
@motr_Id					INT,
@motr_Descripcion			NVARCHAR(75),
@usua_UsuarioModificacion	INT,
@motr_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY 

		UPDATE Adua.tbModoTransporte
		SET		motr_Descripcion = @motr_Descripcion,
				usua_UsuarioModificacion = @usua_UsuarioModificacion,
				motr_FechaModificacion = @motr_FechaModificacion
		WHERE	motr_Id = @motr_Id
		
		SELECT 1
	END TRY 
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--  Adua.UDP_tbModoTransporte_Editar 1, 'pruebaaa',1,'07-18-2023'


--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Adua.UDP_tbModoTransporte_Eliminar
--*****Tipos de documento*****--
--CREATE OR ALTER VIEW tbTipoDocumento
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Listar
AS
BEGIN
SELECT	tido_Id								, 
		tido_Codigo							,
		tido_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,
		tido_FechaCreacion					,
		modi.usua_Nombre					AS usuarioModificacion,
		tido_FechaModificacion				,
		tido_Estado 								
FROM	Adua.tbTipoDocumento tido 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tido.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tido.usua_UsuarioModificacion 
WHERE	tido_Estado = 1
END
GO

--*****Insertar*****--
--Adua.UDP_tbTipoDocumento_Insertar 'kl45', 'probandoo',1,'07-18-2023'
--  select*from  Adua.tbTipoDocumento

CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Insertar
@tido_Codigo			CHAR(4),
@tido_Descripcion		NVARCHAR(50),
@usua_UsuarioCreacion	INT,
@tido_FechaCrea			DATETIME
AS
BEGIN
	BEGIN TRY
				INSERT INTO Adua.tbTipoDocumento (tido_Codigo,tido_Descripcion,usua_UsuarioCreacion,tido_FechaCreacion)
				VALUES (
				@tido_Codigo,
				@tido_Descripcion,
				@usua_UsuarioCreacion,
				@tido_FechaCrea
				)
				SELECT 1
	END TRY
	BEGIN CATCH
	SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--
--Adua.UDP_tbTipoDocumento_Editar 1, 'LL45', 'PRUEBA2',1, '07-18-2023'
-- SELECT * FROM Adua.tbTipoDocumento


CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Editar
@tido_Id					INT,
@tido_Codigo				CHAR(4),
@tido_Descripcion			NVARCHAR(50),
@usua_UsuarioModificacion	INT,
@tido_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Adua.tbTipoDocumento
		SET tido_Descripcion = @tido_Descripcion,
		tido_Codigo = @tido_Codigo,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		tido_FechaModificacion = @tido_FechaModificacion
		WHERE tido_Id = @tido_Id
		SELECT 1
	END TRY
BEGIN CATCH 
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH
END
GO

--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoDocumento_Eliminar
--*****Tipos de Liquidacion*****--
--CREATE OR ALTER VIEW tbTipoLiquidacion
--*****Listado*****--

CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Listar
AS
BEGIN
SELECT	tipl_Id								,
		tipl_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,
		tipl_FechaCreacion					,
		modi.usua_Nombre					AS usuarioModificacion,
		tipl_FechaModificacion				,
		tipl_Estado 							
FROM	Adua.tbTipoLiquidacion tilin 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tilin.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tilin.usua_UsuarioModificacion
WHERE	tipl_Estado = 1
END
GO

--*****Insertar*****--
--Adua.UDP_tbTipoLiquidacion_Insertar 'PROBANDOO', 1, '07-18-2023'

CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Insertar
@tipl_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tipl_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Adua.tbTipoLiquidacion (tipl_Descripcion,usua_UsuarioCreacion, tipl_FechaCreacion)
		VALUES (
		@tipl_Descripcion,		
		@usua_UsuarioCreacion,
		@tipl_FechaCreacion	
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--

CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Editar
@tipl_Id					INT,
@tipl_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tipl_FechaModificacion 	DATETIME
AS
BEGIN
	BEGIN TRY
			UPDATE Adua.tbTipoLiquidacion
			SET tipl_Descripcion = @tipl_Descripcion,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			tipl_FechaModificacion = @tipl_FechaModificacion
			WHERE tipl_Id = @tipl_Id
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
--Adua.UDP_tbTipoLiquidacion_Editar 3,'CAMBIOS',1, '07-18-2023'


--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoLiquidacion_Eliminar
--*****Estado Boletin*****--
--CREATE OR ALTER VIEW tbEstadoBoletin
--*****Listado*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Listar
AS
BEGIN
SELECT	esbo_Id								,
		esbo_Descripcion					, 
		crea.usua_Nombre					AS usarioCreacion,
		esbo_FechaCreacion					,
		modi.usua_Nombre					AS usuarioModificacion,
		esbo_FechaModificacion				,
		esbo_Estadoo 						
FROM	Adua.tbEstadoBoletin esbo 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = esbo.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = esbo.usua_UsuarioModificacion 
WHERE	esbo_Estadoo = 1
END 
GO
--*****Insertar*****--

CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Insertar
@esbo_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@esbo_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
			INSERT INTO Adua.tbEstadoBoletin(esbo_Descripcion,usua_UsuarioCreacion,esbo_FechaCreacion)
			VALUES (
			@esbo_Descripcion,		
			@usua_UsuarioCreacion,	
			@esbo_FechaCreacion					
			)
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
-- Adua.UDP_tbEstadoBoletin_Insertar 'PRUEBA', 1, '07-18-2023'


--*****Editar*****--
CREATE OR ALTER PROCEDURE Adua.UDP_tbEstadoBoletin_Editar
@esbo_Id					INT,
@esbo_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@esbo_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE  Adua.tbEstadoBoletin
		SET esbo_Descripcion = @esbo_Descripcion,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		esbo_FechaModificacion = @esbo_FechaModificacion
		WHERE esbo_Id = @esbo_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
 --Adua.UDP_tbEstadoBoletin_Editar 1,'prueba',1,'07-18-2023'
--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Prod.UDP_tbEstadoBoletin_Eliminar
--*****Procesos*****--
--CREATE OR ALTER VIEW tbProcesos
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Listar
AS
BEGIN
SELECT	proc_Id								,
		proc_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,			 
		proc_FechaCreacion					,
		modi.usua_Nombre  					AS usuarioModificacion,
		proc_FechaModificacion				,
		elim.usua_Nombre 					AS usuarioEliminacion,
		proc_FechaEliminacion				,
		proc_Estado							
FROM	Prod.tbProcesos pro					
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = pro.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = pro.usua_UsuarioModificacion 
		LEFT JOIN Acce.tbUsuarios elim		ON elim.usua_Id = pro.usua_UsuarioEliminacion 
WHERE	proc_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Insertar
@proc_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@proc_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
			INSERT INTO Prod.tbProcesos(proc_Descripcion,usua_UsuarioCreacion,proc_FechaCreacion)
			VALUES (
			@proc_Descripcion,		
			@usua_UsuarioCreacion,	
			@proc_FechaCreacion
			)
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
--   Prod.UDP_tbProcesos_Insertar 'probando', 1, '07-18-2023'

--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Editar
@proc_ID					INT,
@proc_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@proc_FechaCreacion			DATETIME
AS
BEGIN
	BEGIN TRY
			UPDATE Prod.tbProcesos
			SET proc_Descripcion = @proc_Descripcion,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			proc_FechaModificacion = @proc_FechaCreacion
			WHERE proc_ID = @proc_ID
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

-- Prod.UDP_tbProcesos_Insertar 'probando', 1, '07-18-2023'

--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbProcesos_Eliminar
@proc_ID					INT,
@usua_UsuarioEliminacion	INT,
@proc_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbProcesos
		SET proc_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		proc_FechaEliminacion = @proc_FechaEliminacion
		WHERE proc_ID = @proc_ID
	END TRY
	BEGIN CATCH 
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO
-- Prod.UDP_tbProcesos_Eliminar 1,1,'07-18-2023'
-- SELECT*FROM Prod.tbProcesos

--*****AREA*****--
--CREATE OR ALTER VIEW tbArea


--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Listar
AS
BEGIN
SELECT	tipa_Id							,
		tipa_area						,
		pro.proc_Id						,
		pro.proc_Descripcion			,
		crea.usua_Nombre 				AS usarioCreacion,			 
		tipa_FechaCreacion				,
		modi.usua_Nombre  				AS usuarioModificacion,
		tipa_FechaModificacion			,
		elim.usua_Nombre 				AS usuarioEliminacion,
		tipa_FechaEliminacion			,
		tipa_Estado 					
FROM	Prod.tbArea area 
		INNER JOIN Prod.tbProcesos pro	ON area.proc_Id = pro.proc_Id  
		INNER JOIN Acce.tbUsuarios crea ON crea.usua_Id = area.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi	ON modi.usua_Id = area.usua_UsuarioModificacion 
		LEFT JOIN Acce.tbUsuarios elim	ON elim.usua_Id = area.usua_UsuarioEliminacion 
WHERE	tipa_Estado = 1
END
GO

--*****Insertar*****--	
--Prod.UDP_tbArea_Insertar 

CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Insertar
@tipa_area				NVARCHAR(200),
@proc_Id				INT,
@usua_UsuarioCreacion	INT,
@tipa_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbArea(tipa_area,proc_Id,usua_UsuarioCreacion,tipa_FechaCreacion)
		VALUES (
		@tipa_area,				
		@proc_Id,				
		@usua_UsuarioCreacion,	
		@tipa_FechaCreacion				
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Editar
@tipa_Id					INT,
@tipa_area					NVARCHAR(200),
@proc_Id					INT,
@usua_UsuarioModificacion	INT,
@tipa_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
			UPDATE Prod.tbArea
			SET tipa_area = @tipa_area,
			proc_Id = @proc_Id,
			usua_UsuarioModificacion = @usua_UsuarioModificacion,
			tipa_FechaModificacion = @tipa_FechaModificacion
			WHERE tipa_Id = @tipa_Id	
			SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbArea_Eliminar
@tipa_Id					INT,
@usua_UsuarioEliminacion	INT,
@tipa_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbArea
		SET tipa_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		tipa_FechaEliminacion = @tipa_FechaEliminacion
		WHERE tipa_Id = @tipa_Id
		
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

--*****Talla*****--
--CREATE OR ALTER VIEW tbTallas
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Listar
AS
BEGIN
SELECT	tall_Id								,
		tall_Codigo							,
		tall_Nombre							,			 
		crea.usua_Nombre					AS usarioCreacion,
		tall_FechaCreacion					,
		modi.usua_Nombre 					AS usuarioModificacion,
		tall_FechaModificacion 				,
		tall_Estado							
FROM	Prod.tbTallas tall 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tall.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tall.usua_UsuarioModificacion 
WHERE	tall_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Insertar
@tall_Codigo			CHAR(5),
@tall_Nombre			NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tall_FechaCreacion		DATETIME
AS
BEGIN
BEGIN TRY 
		INSERT INTO Prod.tbTallas(tall_Codigo,tall_Nombre,usua_UsuarioCreacion,tall_FechaCreacion)
		VALUES (
		@tall_Codigo,
		@tall_Nombre,
		@usua_UsuarioCreacion,
		@tall_FechaCreacion
		)
			SELECT 1
END TRY
BEGIN CATCH
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH

END
GO

--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Editar
@tall_Id					INT,
@tall_Codigo				CHAR(5),
@tall_Nombre				NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tall_FechaModificacion		DATETIME
AS
BEGIN
BEGIN TRY  
		UPDATE  Prod.tbTallas 
		SET tall_Nombre				= @tall_Nombre,
		tall_Codigo					= @tall_Codigo,
		usua_UsuarioModificacion	= @usua_UsuarioModificacion,
		tall_FechaModificacion		= @tall_FechaModificacion
		WHERE tall_Id				= @tall_Id
			SELECT 1
END TRY
BEGIN CATCH
	SELECT 'Error Message: ' + ERROR_MESSAGE()
END CATCH

END
GO
--*****Eliminar*****--
--CREATE OR ALTER PROCEDURE Prod.UDP_tbTallas_Eliminar

--*****Tipo Embalaje*****-
--CREATE OR ALTER VIEW tbTipoEmbalaje
--*****Listado*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Listar
AS
BEGIN
SELECT	tiem_Id								,
		tiem_Descripcion					,
		crea.usua_Nombre					AS usarioCreacion,			 
		tiem_FechaCreacion					,
		modi.usua_Nombre 					AS usuarioModificacion,
		tiem_FechaModificacion				,
		elim.usua_Nombre 					AS usuarioEliminacion,
		tiem_FechaEliminacion				,
		tiem_Estado 						
FROM	Prod.tbTipoEmbalaje tiem 
		INNER JOIN Acce.tbUsuarios crea		ON crea.usua_Id = tiem.usua_UsuarioCreacion 
		LEFT JOIN Acce.tbUsuarios modi		ON modi.usua_Id = tiem.usua_UsuarioModificacion 
		LEFT JOIN Acce.tbUsuarios elim		ON elim.usua_Id = tiem.usua_UsuarioEliminacion
WHERE	tiem_Estado = 1
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Insertar
@tiem_Descripcion		NVARCHAR(200),
@usua_UsuarioCreacion	INT,
@tiem_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbTipoEmbalaje (tiem_Descripcion, usua_UsuarioCreacion, tiem_FechaCreacion)
		VALUES (
		@tiem_Descripcion,
		@usua_UsuarioCreacion,
		@tiem_FechaCreacion
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Editar
@tiem_Id					INT,
@tiem_Descripcion			NVARCHAR(200),
@usua_UsuarioModificacion	INT,
@tiem_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbTipoEmbalaje
		SET tiem_Descripcion = @tiem_Descripcion,
		usua_UsuarioModificacion = @usua_UsuarioModificacion,
		tiem_FechaModificacion = @tiem_FechaModificacion
		WHERE tiem_Id = @tiem_Id
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Eliminar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbTipoEmbalaje_Eliminar
@tiem_Id					INT,
@usua_UsuarioEliminacion	INT,
@tiem_FechaEliminacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbTipoEmbalaje
		SET tiem_Estado = 0,
		usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
		tiem_FechaEliminacion = @tiem_FechaEliminacion
		WHERE tiem_Id = @tiem_Id
		SELECT 1
	END TRY 
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO

--*****ORDEN ENSABLAJE ACBADO ETIQUEDATO*****-
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbOrde_Ensa_Acab_Etiq_Listar
AS
BEGIN
SELECT	ensa_Id, 
		ensa_Cantidad, 
		emp.empl_Id, 
		CONCAT(emp.empl_Nombres ,' ',emp.empl_Apellidos) AS empl_NombreCompleto,
		ocd.code_Id, 
		ocd.code_Sexo,
		est.esti_Id,
		est.esti_Descripcion,
		ensa_FechaInicio, 
		ensa_FechaLimite, 
		pp.ppro_Id, 
		crea.usua_Nombre							AS usua_UsurioCreacion, 
		ensa_FechaCreacion,							
		modi.usua_Nombre							AS usua_UsuarioModificacion, 
		ensa_FechaModificacion, 
		ensa_Estado
FROM	Prod.tbOrde_Ensa_Acab_Etiq ensa
		INNER JOIN Gral.tbEmpleados emp				ON emp.empl_Id  = ensa.empl_Id
		INNER JOIN Prod.tbOrdenCompraDetalles ocd	ON ocd.code_Id  = ensa.code_Id
		INNER JOIN Prod.tbEstilos est				ON est.esti_Id	= ocd.esti_Id
		INNER JOIN Prod.tbPedidosProduccion pp		ON pp.ppro_Id   = ensa.ppro_Id
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = ensa.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = ensa.usua_UsuarioModificacion 

END
GO
--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbOrde_Ensa_Acab_Etiq_Insertar
@ensa_Cantidad			INT,
@empl_Id				INT,
@code_Id				INT,
@ensa_FechaInicio		DATE,	
@ensa_FechaLimite		DATE,
@ppro_Id				INT,
@usua_UsuarioCreacion	INT,
@ensa_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbOrde_Ensa_Acab_Etiq (ensa_Cantidad,			empl_Id, 
												code_Id,				ensa_FechaInicio, 
												ensa_FechaLimite,		ppro_Id, 
												usua_UsuarioCreacion,	ensa_FechaCreacion)
		VALUES (
		@ensa_Cantidad,			
		@empl_Id, 
		@code_Id,				
		@ensa_FechaInicio, 
		@ensa_FechaLimite,		
		@ppro_Id, 
		@usua_UsuarioCreacion,	
		@ensa_FechaCreacion
		)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Editar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbOrde_Ensa_Acab_Etiq_Editar
@ensa_Id					INT,
@ensa_Cantidad				INT,
@empl_Id					INT,
@code_Id					INT,
@ensa_FechaInicio			DATE,	
@ensa_FechaLimite			DATE,
@ppro_Id					INT,
@usua_UsuarioModificacion	INT,
@ensa_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbOrde_Ensa_Acab_Etiq
		SET		ensa_Cantidad			= @ensa_Cantidad,			
				empl_Id					= @empl_Id, 
				code_Id					= @code_Id,				
				ensa_FechaInicio		= @ensa_FechaInicio, 
				ensa_FechaLimite		= @ensa_FechaLimite,		
				ppro_Id					= @ppro_Id, 
				usua_UsuarioCreacion	= @usua_UsuarioModificacion,	
				ensa_FechaCreacion		= @ensa_FechaModificacion
		WHERE	ensa_Id					= @ensa_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO



--*****Pedidos Orden*****-
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Listas
AS
BEGIN
SELECT	peor_Id, 
		prov.prov_Id, 
		prov.prov_NombreCompania,
		prov.prov_NombreContacto,
		prov.prov_Ciudad,
		peor_No_Duca, 
		peor_FechaEntrada, 
		peor_Obsevaciones, 
		peor_DadoCliente, 
		peor_Est, 
		crea.usua_Nombre							AS usua_UsuarioCreacion, 
		peor_FechaCreacion, 
		modi.usua_Nombre							AS usua_UsuarioModificacion , 
		peor_FechaModificacion, 
		peor_Estado 
FROM	Prod.tbPedidosOrden po
		INNER JOIN Gral.tbProveedores prov			ON po.prov_Id = prov.prov_Id
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = po.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = po.usua_UsuarioModificacion 	
END
GO


--*****Insertar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Insertar
@prov_Id				INT, 
@peor_No_Duca			NVARCHAR(100), 
@peor_FechaEntrada		DATETIME, 
@peor_Obsevaciones		NVARCHAR(100), 
@peor_DadoCliente		BIT, 
@peor_Est				BIT, 
@usua_UsuarioCreacion	INT, 
@peor_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbPedidosOrden (prov_Id, peor_No_Duca, peor_FechaEntrada, peor_Obsevaciones, peor_DadoCliente, peor_Est, usua_UsuarioCreacion, peor_FechaCreacion)
		VALUES	(@prov_Id,				
				 @peor_No_Duca,			
				 @peor_FechaEntrada,		
				 @peor_Obsevaciones,		
				 @peor_DadoCliente,		
				 @peor_Est,				
				 @usua_UsuarioCreacion,	
				 @peor_FechaCreacion	
				 )	
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO

--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbPedidosOrden_Editar
@peor_Id					INT, 
@prov_Id					INT, 
@peor_No_Duca				NVARCHAR(100), 
@peor_FechaEntrada			DATETIME, 
@peor_Obsevaciones			NVARCHAR(100), 
@peor_DadoCliente			BIT, 
@peor_Est					BIT, 
@usua_UsuarioModificacion	INT, 
@peor_FechaModificacion		DATETIME
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbPedidosOrden 
		SET prov_Id 				= @prov_Id, 
		peor_No_Duca				= @peor_No_Duca, 
		peor_FechaEntrada			= @peor_FechaEntrada,	 
		peor_Obsevaciones			= @peor_Obsevaciones, 
		peor_DadoCliente			= @peor_DadoCliente,
		peor_Est					= @peor_Est, 
		usua_UsuarioModificacion	= @usua_UsuarioModificacion,
		peor_FechaModificacion		= @peor_FechaModificacion	
		WHERE peor_Id				= @peor_Id
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO


--*****ReporteModuloDia*****-
--*****Listado*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Listar
AS
BEGIN
SELECT	remo_Id, 
		modu.modu_Id, 
		modu.modu_Nombre,
		remo_Fecha, 
		remo_TotalDia, 
		remo_TotalDanado, 
		crea.usua_Nombre usua_UsuarioCreacion, 
		remo_FechaCreacion, 
		modi.usua_Nombre usua_UsuarioModificacion, 
		remo_FechaModificacion, 
		remo_Estado 
FROM	Prod.tbReporteModuloDia rmd 
		INNER JOIN Prod.tbModulos modu				ON rmd.modu_Id = modu.modu_Id 
		INNER JOIN Acce.tbUsuarios crea				ON crea.usua_Id = rmd.usua_UsuarioCreacion 
		LEFT JOIN  Acce.tbUsuarios modi				ON modi.usua_Id = rmd.usua_UsuarioModificacion 	
END
GO

--*****Insertar*****--
CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Insertar
@modu_Id				INT, 
@remo_Fecha				DATE, 
@remo_TotalDia			INT, 
@remo_TotalDanado		INT, 
@usua_UsuarioCreacion	INT, 
@remo_FechaCreacion		DATETIME
AS
BEGIN
	BEGIN TRY
		INSERT INTO Prod.tbReporteModuloDia (modu_Id, remo_Fecha, remo_TotalDia, remo_TotalDanado, usua_UsuarioCreacion, remo_FechaCreacion)
		VALUES (
		@modu_Id,				
		@remo_Fecha,				
		@remo_TotalDia,		
		@remo_TotalDanado,		
		@usua_UsuarioCreacion,	
		@remo_FechaCreacion
		)
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
GO
--*****Editar*****--

CREATE OR ALTER PROCEDURE Prod.UDP_tbReporteModuloDia_Editar
@remo_Id					INT, 
@modu_Id					INT, 
@remo_Fecha					DATE, 
@remo_TotalDia				INT, 
@remo_TotalDanado			INT, 
@usua_UsuarioModificacion	INT, 
@remo_FechaModificacion	 	DATETIME 
AS
BEGIN
	BEGIN TRY
		UPDATE Prod.tbReporteModuloDia
		SET modu_Id					= @modu_Id, 
		remo_Fecha					= @remo_Fecha, 
		remo_TotalDia				= @remo_TotalDia, 
		remo_TotalDanado			= @remo_TotalDanado, 
		usua_UsuarioModificacion	= @usua_UsuarioModificacion, 
		remo_FechaModificacion		= @remo_FechaModificacion	 
		where remo_Id				= @remo_Id				
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE() 
	END CATCH
END
