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

    SELECT
        CAST(orco_FechaCreacion AS DATE) AS Fecha,
        COUNT(orco_Id) AS orco_Conteo
    FROM Prod.tbOrdenCompra
    GROUP BY CAST(orco_FechaCreacion AS DATE)
    ORDER BY Fecha;
END
GO


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


SELECT * FROM Prod.tbRevisionDeCalidad

SELECT * FROM Prod.tbAsignacionesOrden
SELECT * FROM Prod.tbAsignacionesOrdenDetalle
SELECT * FROM Prod.tbOrde_Ensa_Acab_Etiq
SELECT * FROM Prod.tbModulos
SELECT * FROM Prod.tbProcesos
