USE SIMEXPRO
GO


/*----------------------------------------------------*/
--* INSERT TABLA CODIGO IMPUESTO --**--
GO
INSERT INTO Adua.tbCodigoImpuesto(coim_Descripcion, usua_UsuarioCreacion, coim_FechaCreacion)
VALUES	('Código 1', 1, GETDATE()),
		('Código 2', 1, GETDATE()),
		('Código 3', 1, GETDATE()),
		('Código 4', 1, GETDATE()),
		('Código 5', 1, GETDATE())



/*----------------------------------------------------*/
--* INSERT TABLA COMERCIANTE INDIVIDUAL --**--
GO
INSERT INTO Adua.tbComercianteIndividual(pers_Id, pers_FormaRepresentacion, colo_Id, coin_PuntoReferencia, coin_ColoniaRepresentante, coin_NumeroLocalReprentante, coin_PuntoReferenciaReprentante, coin_TelefonoCelular, coin_TelefonoFijo, coin_CorreoElectronico, coin_CorreoElectronicoAlternativo, usua_UsuarioCreacion, coin_FechaCreacion)
VALUES	
		( 1, 1, 1, 'Frente a bodega Los Hermanos', 1, 'A001', 'A la par de Maxi-Despensa', '90897006', '22323345', 'MrC@gmail.com', '', 1, GETDATE()),
		( 2, 1, 3, 'Frente a Gasolinera Texaco', 2, 'B003', 'Frente a Pulperia Toñito', '98098897', '21233453', 'ArMs@gmail.com', '', 1, GETDATE()),
		( 3, 1, 4, 'Detrás del complejo deortivo', 7, 'S003', 'Detrás del complejo deportivo', '88075546', '21356687', 'DCDArjona@gmail.com', '', 1, GETDATE()),
		( 4, 1, 2, 'Una cuadra despues de Café Gloria', 10, 'A020', 'Esquina opuesta a Taller Mendoza', '91914545', '21213434', 'CdTm@gmail.com', '', 1, GETDATE()),
		( 5, 1, 9, 'Una cuadra antes del Banco de Occidente', 6, 'B007', 'Local #30, 2da Planta, Mall Galerias del Valle', '97975754', '20345579', 'FgDV@gmail.com', '', 1, GETDATE())


/*----------------------------------------------------*/
--* INSERT TABLA CONCEPTO PAGO--**--
GO
INSERT INTO Adua.tbConceptoPago(copa_Descripcion, usua_UsuarioCreacion, copa_FechaCreacion)
VALUES
		('Concepto Pago 1', 1, GETDATE()),
		('Concepto Pago 2', 1, GETDATE()),
		('Concepto Pago 3', 1, GETDATE())



/*----------------------------------------------------*/
--* INSERT TABLA DOCUMENTOS CONTRATO --**--
GO
INSERT INTO Adua.tbDocumentosContratos(coin_Id, peju_Id, doco_Numero_O_Referencia, doco_TipoDocumento, usua_UsuarioCreacion, doco_FechaCreacion)
VALUES
		(1, NULL, '4554854', 'DF', 1, GETDATE()),
		(NULL, 1, '455471', 'DT', 1, GETDATE()),
		(2, NULL, '655859', 'DT', 1, GETDATE()),
		(3, NULL, '344343', 'DF', 1, GETDATE()),
		(4, NULL, '558587', 'DF', 1, GETDATE())


/*----------------------------------------------------*/
--* INSERT TABLA ESTADO BOLETIN--**--
GO
INSERT INTO Adua.tbEstadoBoletin(esbo_Descripcion, usua_UsuarioCreacion, esbo_FechaCreacion)
VALUES
		()