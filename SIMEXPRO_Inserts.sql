--**********ESTADOS CIVILES**********--

INSERT INTO [Gral].[tbEstadosCiviles]([escv_Nombre], 
									  [usua_UsuarioCreacion],
									  [escv_FechaCreacion])
VALUES ('Soltero(a)', 1, GETDATE()),
	   ('Divorciado(a)', 1, GETDATE()),
	   ('Casado(a)', 1, GETDATE()),
	   ('Viudo(a)', 1, GETDATE()),
	   ('Unión libre', 1, GETDATE())