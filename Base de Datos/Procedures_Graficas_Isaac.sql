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


CREATE OR ALTER PROCEDURE Prod.UDP_TotalOrdenesCompraAnual
AS
BEGIN
SELECT
		COUNT(orco_Id) AS orco_Conteo, 
		orco_FechaCreacion
FROM	Prod.tbOrdenCompra
GROUP BY orco_FechaCreacion
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
