USE SIMEXPRO
GO

SELECT * FROM Gral.tbColonias

SELECT * FROM Gral.tbAldeas
SELECT * FROM Gral.tbCiudades


INSERT INTO Gral.tbColonias (colo_Nombre, alde_Id, ciud_Id, usua_UsuarioCreacion, colo_FechaCreacion)
VALUES ('prueba', 1, 1, 1, GETDATE())

SELECT * FROM Adua.tbConceptoPago
SELECT * FROM Adua.tbEstadoMercancias
SELECT * FROM Adua.tbFormasdePago
SELECT * FROM Gral.tbFormas_Envio

SELECT * FROM Prod.tbMateriales

INSERT INTO Prod.tbMateriales(mate_Descripcion, subc_Id, mate_Precio, usua_UsuarioCreacion, mate_FechaCreacion)
VALUES ('ASD', 1, 1, 1, GETDATE())


select * from adua.tbLugaresEmbarque

SELECT * FROM Adua.tbMarcas