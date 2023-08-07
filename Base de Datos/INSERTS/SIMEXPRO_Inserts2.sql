
/*---------------------------------*/
--***** INSERT TABLA ROLES --******--

INSERT INTO [Acce].[tbRoles]
    ([role_Descripcion]
    ,[usua_UsuarioCreacion]
    ,[role_FechaCreacion]
    ,[usua_UsuarioModificacion]
    ,[role_FechaModificacion]
    ,[usua_UsuarioEliminacion]
    ,[role_FechaEliminacion]
    ,[role_Estado])
VALUES
    ('Gerente de Operaciones', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Ejecutivo de Ventas', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Analista de Logística', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Agente de Aduanas', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Asistente Administrativo', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Coordinador de Transporte', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Operador de Almacén', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Inspector Aduanero', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Analista de Documentación', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Asesor Comercial', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Operario de Máquina de Tejido', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Técnico de Mantenimiento de Telares', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Supervisor de Producción', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Control de Calidad', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Operario de Acabado', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Jefe de Línea de Producción', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Ingeniero Textil', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Auxiliar de Almacén de Materias Primas', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Diseñador Textil', 1, GETDATE(), NULL, NULL, NULL, NULL, 1),
    ('Operario de Corte de Telas', 1, GETDATE(), NULL, NULL, NULL, NULL, 1);


/*---------------------------------*/
--***** INSERT TABLA USUARIOS --******--

EXEC acce.UDP_tbUsuarios_Insertar 'Juan Perez',			'contrasenia123',	'juan.perez@example.com',		1, 'imagen_juan.jpg',	1,	0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Maria Rodriguez',	'maria2023',		'maria.rodriguez@example.com',	1, 'imagen_maria.jpg',	2,	0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Pedro Gomez',		'12345678',			'pedro.gomez@example.com',		1, 'imagen_pedro.jpg',	3,	0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Ana Torres',			'ana2023',			'ana.torres@example.com',		1, 'imagen_ana.jpg',	4,	0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Carlos Ramirez',		'carlos789',		'carlos.ramirez@example.com',	1, 'imagen_carlos.jpg', 5,	0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Luisa Chavez',		'luisa123',			'luisa.chavez@example.com',		1, 'imagen_luisa.jpg',	10, 0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Sofia Fernandez',	'sofia2023',		'sofia.fernandez@example.com',	1, 'imagen_sofia.jpg',	11, 0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Diego Morales',		'morales321',		'diego.morales@example.com',	1, 'imagen_diego.jpg',	12, 0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Laura Ramirez',		'laura456',			'laura.ramirez@example.com',	1, 'imagen_laura.jpg',	13, 0, 1,@fecha;
EXEC acce.UDP_tbUsuarios_Insertar 'Ricardo Herrera',	'ricardo2023',		'ricardo.herrera@example.com',	1, 'imagen_ricardo.jpg',14, 0, 1,@fecha;



/*---------------------------------*/
--***** INSERT TABLA TIPO DE LIQUIDACION --******--
INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Importación Regular', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Exportación Definitiva', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Importación Temporal', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Importación para Reexportación en el Mismo Estado', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Exportación Temporal', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Admisión Temporal para Perfeccionamiento Activo', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Tránsito Aduanero', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Tránsito Aduanero Internacional', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Depósito Aduanero', 1, GETDATE());

INSERT INTO [Adua].[tbTipoLiquidacion] ([tipl_Descripcion], [usua_UsuarioCreacion], [tipl_FechaCreacion])
VALUES ('Admisión Temporal para Reexportación en el Mismo Estado', 1, GETDATE());

/*---------------------------------*/
--***** INSERT TABLA TIPOS DE IDENTIFICACION --******--

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Cédula de Ciudadanía', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Cédula de Extranjería', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Pasaporte', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Tarjeta de Identidad', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Registro Civil', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('NIT (Número de Identificación Tributaria)', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('RUT (Registro Único Tributario)', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('PAS (Permiso de Apartado Postal)', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('PEP (Persona Expuesta Políticamente)', 1, GETDATE());

INSERT INTO [Adua].[tbTiposIdentificacion] ([iden_Descripcion], [usua_UsuarioCreacion], [iden_FechaCreacion])
VALUES ('Carné Diplomático', 1, GETDATE());


/*---------------------------------*/
--***** INSERT TABLA TRANPORTES --******--

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (1, 'CH1234', 1, 'REM5678', 5000, 1234, 'GPS Tracker', 'Carga General', 'CNT9876', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (2, 'CH5678', 2, 'REM9012', 7000, 5678, 'Rastreo Satelital', 'Carga Peligrosa', 'CNT5432', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (3, 'CH9012', 3, 'REM3456', 6000, 9012, 'Bloques de Refrigeración', 'Carga Perecedera', 'CNT7654', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (4, 'CH3456', 1, 'REM7890', 8000, 3456, 'Contenedor Refrigerado', 'Carga A granel', 'CNT1234', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (5, 'CH6789', 2, 'REM2345', 9000, 6789, 'Contenedor Cisterna', 'Carga Líquida', 'CNT5678', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (1, 'CH9010', 3, 'REM6543', 7500, 9010, 'Plataforma', 'Carga Sobredimensionada', 'CNT4567', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (2, 'CH6543', 1, 'REM8901', 5500, 6543, 'Racks de Carga', 'Carga Paletizada', 'CNT8765', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (3, 'CH2345', 2, 'REM6789', 6500, 2345, 'Toldos Protector', 'Carga Liviana', 'CNT3456', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (4, 'CH8901', 3, 'REM0123', 4500, 8901, 'Contenedor Cerrado', 'Carga de Vehículos', 'CNT2345', 1, GETDATE());

INSERT INTO [Adua].[tbTransporte]
    ([pais_Id], [tran_Chasis], [marca_Id], [tran_Remolque], [tran_CantCarga], [tran_NumDispositivoSeguridad], [tran_Equipamiento], [tran_TipoCarga], [tran_IdContenedor], [usua_UsuarioCreacio], [tran_FechaCreacion])
VALUES
    (5, 'CH0123', 1, 'REM4567', 7000, 0123, 'Furgón', 'Carga Seca', 'CNT6789', 1, GETDATE());



/*---------------------------------*/
--***** INSERT TABLA PROCESOS --******--

        INSERT INTO [Prod].[tbProcesos]
           ([proc_Descripcion]
           ,[usua_UsuarioCreacion]
           ,[proc_FechaCreacion] )
     VALUES
    ('Corte de tela', 1, GETDATE()),
    ('Confección de prenda', 1, GETDATE()),
    ('Estampado', 1, GETDATE()),
    ('Bordado', 1, GETDATE()),
    ('Planchado', 1, GETDATE()),
    ('Empaque', 1, GETDATE()),
    ('Revisión de calidad', 1, GETDATE()),
    ('Etiquetado', 1, GETDATE()),
    ('Envío a distribución', 1, GETDATE()),
    ('Almacenamiento', 1, GETDATE());


/*---------------------------------*/
--***** INSERT TABLA ASIGNACIONES ORDEN --******--

INSERT INTO [Prod].[tbAsignacionesOrden]
           ([asor_OrdenDetId]
           ,[asor_FechaInicio]
           ,[asor_FechaLimite]
           ,[asor_Cantidad]
           ,[proc_Id]
           ,[empl_Id]
           ,[usua_UsuarioCreacion]
           ,[asor_FechaCreacion] )
     VALUES
    (1, '2023-07-31 08:00:00', '2023-08-05 17:00:00', 100, 1, 1, 1, GETDATE()),
    (2, '2023-08-01 09:00:00', '2023-08-06 18:00:00', 150, 2, 1, 1, GETDATE()),
    (3, '2023-08-02 10:00:00', '2023-08-07 19:00:00', 200, 3, 1, 1, GETDATE()),
    (4, '2023-08-03 11:00:00', '2023-08-08 20:00:00', 120, 1, 1, 1, GETDATE()),
    (5, '2023-08-04 12:00:00', '2023-08-09 21:00:00', 80, 2, 1, 1, GETDATE()),
    (6, '2023-08-05 13:00:00', '2023-08-10 22:00:00', 60, 3, 1, 1, GETDATE()),
    (7, '2023-08-06 14:00:00', '2023-08-11 23:00:00', 90, 1, 1, 1, GETDATE()),
    (8, '2023-08-07 15:00:00', '2023-08-12 00:00:00', 110, 2, 1, 1, GETDATE()),
    (9, '2023-08-08 16:00:00', '2023-08-13 01:00:00', 70, 3, 1, 1, GETDATE()),
    (10, '2023-08-09 17:00:00', '2023-08-14 02:00:00', 50, 1, 1, 1, GETDATE());


/*---------------------------------*/
--***** INSERT TABLA ASIGNACIONES ORDEN DETALLES --******--

INSERT INTO [Prod].[tbAsignacionesOrdenDetalle]
           ([lote_Id]
           ,[adet_Cantidad]
           ,[usua_UsuarioCreacion]
           ,[adet_FechaCreacion] )
     VALUES
           (1, 50, 1, GETDATE()),
                        (2, 30, 1, GETDATE()),
                        (3, 20, 1, GETDATE()),
                        (4, 40, 1, GETDATE()),
                        (5, 60, 1, GETDATE()),
                        (6, 25, 1, GETDATE()),
                        (7, 35, 1, GETDATE()),
                        (8, 45, 1, GETDATE()),
                        (9, 55, 1, GETDATE()),
                        (10, 70, 1, GETDATE());