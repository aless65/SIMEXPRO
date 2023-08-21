SELECT * FROM Prod.tbOrdenCompra

SELECT * FROM Prod.tbClientes
GO



CREATE OR ALTER PROCEDURE Prod.UDP_AvanceOrdenCompraByID 
	@orco_Id INT
AS
BEGIN
SELECT 
		ordencompra.orco_Id, 
		ordencompra.orco_FechaEmision, 
		ordencompra.orco_FechaLimite,
		CASE ordencompra.orco_EstadoOrdenCompra
			WHEN 'P' THEN '33%'
			WHEN 'C'THEN '66%'
			WHEN 'T' THEN '100%'
		END AS orco_Avance,
		cliente.clie_Nombre_O_Razon_Social,
		cliente.clie_Direccion, 
		cliente.clie_RTN, 
		cliente.clie_Nombre_Contacto, 
		cliente.clie_Numero_Contacto, 
		cliente.clie_Correo_Electronico, 
		cliente.clie_FAX

FROM		Prod.tbOrdenCompra AS ordencompra
			INNER JOIN Prod.tbClientes AS cliente ON ordencompra.orco_IdCliente = cliente.clie_Id 
WHERE orco_Id = @orco_Id
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_TotalOrdenesCompraMensual
AS
BEGIN
SET LANGUAGE Spanish;

    SELECT
        YEAR(orco_FechaCreacion) AS Anio,
        MONTH(orco_FechaCreacion) AS Mes,
        COUNT(orco_Id) AS orco_Conteo,
        DATENAME(MONTH, orco_FechaCreacion) AS MesLabel
    FROM Prod.tbOrdenCompra
    GROUP BY YEAR(orco_FechaCreacion), MONTH(orco_FechaCreacion), DATENAME(MONTH, orco_FechaCreacion)
    ORDER BY Anio, Mes;
END
GO

CREATE OR ALTER PROCEDURE Prod.UDP_TotalOrdenesCompraDiario
AS
BEGIN
    SET LANGUAGE Spanish;

    DECLARE @FechaInicial DATE, @FechaFinal DATE;
    SET @FechaInicial = DATEADD(DAY, -7, GETDATE()); 
    SET @FechaFinal = GETDATE();
    SELECT
        CAST(orco_FechaCreacion AS DATE) AS Fecha,
        COUNT(orco_Id) AS orco_Conteo
    FROM Prod.tbOrdenCompra
    WHERE orco_FechaCreacion BETWEEN @FechaInicial AND @FechaFinal
    GROUP BY CAST(orco_FechaCreacion AS DATE)
    ORDER BY Fecha;
END
GO


-- PROCEDIMEINTO PARA MOSTRAR EL TOTAL DE ORDENES DE COMPRA RECIBIDOS POR AÑO
CREATE OR ALTER PROCEDURE Prod.UDP_TotalOrdenesCompraAnual
AS
BEGIN
    SELECT
        YEAR(orco_FechaCreacion) AS Anio,
        COUNT(orco_Id) AS orco_Conteo
    FROM Prod.tbOrdenCompra
    GROUP BY YEAR(orco_FechaCreacion)
    ORDER BY Anio;
END
GO



-- PROCEDIMIENTO PARA MOSTRAR EL CONTEO DE ORDENES DE COMPRA AGRUPADOS POR ESTADO (Pendiente, En Curso, Terminado)
CREATE OR ALTER PROCEDURE Prod.UDP_ContadorOrdenesCompra_PorEstado
AS
BEGIN
	SELECT	
			COUNT(orco_Id) AS orco_Conteo, 
			CASE orco_EstadoOrdenCompra
				WHEN 'P' THEN 'Pendiente'
				WHEN 'C'THEN 'En Curso'
				WHEN 'T' THEN 'Terminado'
			END AS orco_Avance
		
	FROM	Prod.tbOrdenCompra
	GROUP BY orco_EstadoOrdenCompra
END
GO
-- TOTAL DE LAS ORDENES DE COMPRA ENTREGEDAS Y PENDIENTES SEMANALMENTE Y MENSUALMENTE (Basarse en PROCEDURE Prod.UDP_TotalOrdenesCompraDiario)



CREATE OR ALTER PROCEDURE Prod.UDP_ContadorOrdenesCompra_PorEstado_UltimaSemana
AS
BEGIN
    DECLARE @FechaInicial DATE, @FechaFinal DATE;
    SET @FechaInicial = DATEADD(DAY, -7, GETDATE()); 
    SET @FechaFinal = GETDATE();

	SELECT	
			COUNT(orco_Id) AS orco_Conteo, 
			CASE orco_EstadoOrdenCompra
				WHEN 'P' THEN 'Pendiente'
				WHEN 'T' THEN 'Terminado'
			END AS orco_Avance
	FROM	Prod.tbOrdenCompra
	WHERE orco_FechaCreacion BETWEEN @FechaInicial AND @FechaFinal
	GROUP BY orco_EstadoOrdenCompra
END
GO



INSERT INTO Prod.tbFacturasExportacion(duca_No_Duca, faex_Fecha, orco_Id, faex_Total, usua_UsuarioCreacion, faex_FechaCreacion)
VALUES	('54363244535', '08-07-2023', 1, 15000, 1, '08-07-2023'),
		('54363244535', '08-09-2023', 2, 35000, 1, '08-09-2023'),
		('54363244535', '08-10-2023', 3, 20000, 1, '08-10-2023'),
		('54363244535', '08-11-2023', 1, 30000, 1, '08-11-2023'),

		('83739333921', '08-12-2023', 2, 50000, 1, '08-12-2023'),
		('83739333921', '08-13-2023', 3, 45000, 1, '08-13-2023'),
		('83739333921', '08-14-2023', 1, 75000, 1, '08-14-2023'),
		('83739333921', '08-15-2023', 2, 55000, 1, '08-15-2023'),
													 
		('54363244535', '08-16-2023', 2, 34000, 1, '08-16-2023'),
		('54363244535', '08-17-2023', 4, 23000, 1, '08-17-2023'),
		('54363244535', '08-18-2023', 1, 66000, 1, '08-18-2023'),
		('83739333921', '08-19-2023', 4, 12000, 1, '08-19-2023'),
													 
		('83739333921', '08-20-2023', 1, 23000, 1, '08-20-2023'),
		('83739333921', '08-20-2023', 2, 34500, 1, '08-20-2023'),
		('83739333921', '08-21-2023', 2, 56000, 1, '08-21-2023'),
		('83739333921', '08-21-2023', 3, 100000, 1, '08-21-2023')
GO

INSERT INTO Prod.tbFacturasExportacion(duca_No_Duca, faex_Fecha, orco_Id, faex_Total, usua_UsuarioCreacion, faex_FechaCreacion)
VALUES	('54363244535', '08-07-2022', 1, 15000, 1, '08-07-2022'),
		('54363244535', '08-09-2022', 2, 35000, 1, '08-09-2022'),
		('54363244535', '08-10-2022', 3, 20000, 1, '08-10-2022'),
		('54363244535', '08-11-2022', 1, 30000, 1, '08-11-2022'),

		('83739333921', '08-12-2022', 2, 50000, 1, '08-12-2022'),
		('83739333921', '08-13-2022', 3, 45000, 1, '08-13-2022'),
		('83739333921', '08-14-2022', 1, 75000, 1, '08-14-2022'),
		('83739333921', '08-15-2022', 2, 55000, 1, '08-15-2022'),

		('54363244535', '08-16-2022', 2, 34000, 1, '08-16-2022'),
		('54363244535', '08-17-2022', 4, 23000, 1, '08-17-2022'),
		('54363244535', '08-18-2022', 1, 66000, 1, '08-18-2022'),
		('83739333921', '08-19-2022', 4, 12000, 1, '08-19-2022'),

		('83739333921', '08-20-2022', 1, 23000, 1, '08-20-2022'),
		('83739333921', '08-20-2022', 2, 34500, 1, '08-20-2022'),
		('83739333921', '08-21-2022', 2, 56000, 1, '08-21-2022'),
		('83739333921', '08-21-2022', 3, 100000, 1, '08-21-2022')
GO

		
INSERT INTO Prod.tbFacturasExportacion(duca_No_Duca, faex_Fecha, orco_Id, faex_Total, usua_UsuarioCreacion, faex_FechaCreacion)
VALUES	('54363244535', '08-22-2023', 1, 15000, 1, '08-22-2023'),
		('54363244535', '08-23-2023', 2, 35000, 1, '08-23-2023'),
		('54363244535', '08-24-2023', 3, 20000, 1, '08-24-2023'),
		('54363244535', '08-25-2023', 1, 30000, 1, '08-25-2023'),
								  							 
		('83739333921', '08-26-2023', 2, 50000, 1, '08-26-2023'),
		('83739333921', '08-27-2023', 3, 45000, 1, '08-27-2023'),
		('83739333921', '08-28-2023', 1, 75000, 1, '08-28-2023'),
		('83739333921', '08-29-2023', 2, 55000, 1, '08-29-2023'),
								  							 
		('54363244535', '08-30-2023', 2, 34000, 1, '08-30-2023'),
		('54363244535', '08-31-2023', 4, 23000, 1, '08-31-2023'),
		('54363244535', '09-01-2023', 1, 66000, 1, '09-01-2023'),
		('83739333921', '09-02-2023', 4, 12000, 1, '09-02-2023'),
								  							 
		('83739333921', '09-03-2023', 1, 23000, 1, '09-03-2023'),
		('83739333921', '09-04-2023', 2, 34500, 1, '09-04-2023'),
		('83739333921', '09-05-2023', 2, 56000, 1, '09-04-2023'),
		('83739333921', '09-06-2023', 3, 100000, 1, '09-06-2023')
GO

SELECT  faex_Id, 
		duca_No_Duca, 
		faex_Fecha, 
		orco_Id, 
		faex_Total, 
		usua_UsuarioCreacion, 
		faex_FechaCreacion, 
		usua_UsuarioModificacion, 
		faex_FechaModificacion
FROM	Prod.tbFacturasExportacion
WHERE	faex_Fecha >= DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0)
		AND faex_Fecha <= DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 5)
ORDER BY faex_Fecha ASC
GO


-- PROCEDIMIENTO QUE MUESTRA TODAS LAS VENTAS DE LA SEMANA (DIVIDIDO EN DIAS)
CREATE OR ALTER PROCEDURE Prod.UDP_VentasSemanales
AS
BEGIN
	SELECT	
			CONVERT(DATE, MIN(faex_Fecha))	 AS FechaAntigua,
			CONVERT(DATE, MAX(faex_Fecha))	AS FechaReciente,
			DATEPART(MONTH, faex_Fecha) AS NumeroMes,
			DATEPART(WEEK, faex_Fecha)	AS NumeroSemana,
			DATEPART(DAY, faex_Fecha)	AS NumeroDia, 
			SUM(faex_Total)				AS TotalIngresos	
	FROM	Prod.tbFacturasExportacion
	WHERE	
			DATEPART(YEAR, faex_Fecha) =  DATEPART(YEAR, GETDATE())
			AND DATEPART(MONTH, faex_Fecha) =  DATEPART(MONTH, GETDATE()) 
			AND	DATEPART(WEEK, faex_Fecha) =  DATEPART(WEEK, GETDATE()) 
	GROUP BY
			DATEPART(YEAR, faex_Fecha),
			DATEPART(MONTH, faex_Fecha),
			DATEPART(WEEK, faex_Fecha),
			DATEPART(DAY, faex_Fecha) 
	ORDER BY FechaAntigua ASC
END
GO


-- PROCEDIMIENTO QUE MUESTRA  TODAS LAS VENTAS DEL MES (DIVIDIDO EN SEMANAS)
CREATE OR ALTER PROCEDURE Prod.UDP_VentasMensuales
AS
BEGIN
	SELECT	
			CONVERT(DATE, MIN(faex_Fecha))	 AS FechaAntigua,
			CONVERT(DATE, MAX(faex_Fecha))	AS FechaReciente,
			DATEPART(MONTH, faex_Fecha) AS NumeroMes,
			DATEPART(WEEK, faex_Fecha)	AS NumeroSemana,
			SUM(faex_Total)				AS TotalIngresos	
	FROM	Prod.tbFacturasExportacion
	WHERE	
			DATEPART(YEAR, faex_Fecha) =  DATEPART(YEAR, GETDATE())
			AND DATEPART(MONTH, faex_Fecha) = DATEPART(MONTH, GETDATE()) 
	GROUP BY
			DATEPART(YEAR, faex_Fecha),
			DATEPART(MONTH, faex_Fecha),
			DATEPART(WEEK, faex_Fecha)
	ORDER BY FechaAntigua ASC
END
GO


-- PROCEDIMIENTO QUE MUESTRA TODAS LAS VENTAS DEL AÑO (DIVIDIDO EN MESES)
CREATE OR ALTER PROCEDURE Prod.UDP_VentasAnuales
AS
BEGIN
	SELECT	
			CONVERT(DATE, MIN(faex_Fecha))	 AS FechaAntigua,
			CONVERT(DATE, MAX(faex_Fecha))	AS FechaReciente,
			DATEPART(MONTH, faex_Fecha)		AS NumeroMes,
			SUM(faex_Total)					AS TotalIngresos	
	FROM Prod.tbFacturasExportacion
	WHERE 
			DATEPART(YEAR, faex_Fecha) =  DATEPART(YEAR, GETDATE())
	GROUP BY
			DATEPART(YEAR, faex_Fecha),
			DATEPART(MONTH, faex_Fecha)
	ORDER BY FechaAntigua ASC
END
GO



