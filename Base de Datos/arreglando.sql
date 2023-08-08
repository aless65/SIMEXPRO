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

SELECT * FROM Gral.tbEmpleados

INSERT INTO Gral.tbEmpleados(empl_Nombres, empl_Apellidos, empl_DNI, escv_Id, empl_Sexo, empl_FechaNacimiento, empl_Telefono, empl_DireccionExacta, pvin_Id, empl_CorreoElectronico, carg_Id, empl_EsAduana, usua_UsuarioCreacion, empl_FechaCreacion)
VALUES  ('JUANCA', 'MANEY', '00000000000', 1, 'M', GETDATE(), '00000000', 'SU CASA', 1, '0000@0000.com', 1, 1, 1, GETDATE())

SELECT * FROM Gral.tbUnidadMedidas


SELECT * FROM Acce.tbPantallas

INSERT INTO Acce.tbPantallas(pant_Nombre, pant_URL, pant_Icono, usua_UsuarioCreacion, pant_FechaCreacion)
VALUES
		('Generales.monedas', 'Monedas/Index', '', 1, GETDATE()),
		('Personas.oficinas', 'Oficinas/Index', '', 1, GETDATE()),
		('Personas.oficios_profesiones', 'OficiosProfesiones/Index', '', 1, GETDATE()),
		('Ubicaciones.paises', 'Paises/Index', '', 1, GETDATE()),
		('Ubicaciones.provincias', 'Provincias/Index', '', 1, GETDATE()),
		('Ubicaciones.ciudades', 'Ciudades/Index', '', 1, GETDATE()),
		('Ubicaciones.aldeas', 'Aldea/Index', '', 1, GETDATE()),
		('Ubicaciones.colonias', 'Colonias/Index', '', 1, GETDATE()),
		('Personas.cargos', 'Cargos/Index', '', 1, GETDATE())
GO


SELECT * FROM  Adua.tbLugaresEmbarque
SELECT  * FROM Adua.tbBaseCalculos
SELECT * FROM Adua.tbBoletinPago

SELECT * FROM Adua.tbCodigoImpuesto

SELECT * FROM Adua.tbComercianteIndividual
SELECT * FROM Adua.tbPersonas
SELECT * FROM Gral.tbColonias

SELECT * FROM Adua.tbConceptoPago

