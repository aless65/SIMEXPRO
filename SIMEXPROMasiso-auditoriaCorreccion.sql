/*
		DROP DATABASE SIMEXPRO

		GO
		DROP SCHEMA Adua
		GO
		DROP SCHEMA Prodf
		GO
		DROP SCHEMA Acce
		GO
		DROP SCHEMA Gral
		GO
	*/

	CREATE DATABASE SIMEXPRO
	GO
	USE SIMEXPRO
	GO
	CREATE SCHEMA Adua
	GO
	CREATE SCHEMA Prod
	GO
	CREATE SCHEMA Acce
	GO
	CREATE SCHEMA Gral
	GO


--**********************************************************--
--*************** SCHEMA Acceso ***************************--
--**********************************************************--
CREATE TABLE Acce.tbUsuarios(
	usua_Id 					INT IDENTITY(1,1),
	usua_Nombre					NVARCHAR(100) NOT NULL,
	usua_Contrasenia			NVARCHAR(MAX) NOT NULL,
	usua_Correo					NVARCHAR(200) NOT NULL,
	empl_Id						INT NOT NULL,
	usua_Image					NVARCHAR(500) NULL,
	role_Id						INT	NOT NULL,
	
	usua_UsuarioCreacion 		INT	NOT NULL,
	usua_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	usua_FechaModificacion		DATETIME DEFAULT NULL,
	usua_Estado					BIT	DEFAULT 1,
	CONSTRAINT PK_Acce_tbUsuarios_usua_Id PRIMARY KEY (usua_Id)
);
GO

INSERT INTO Acce.tbUsuarios
VALUES ('prueba', '123', 'ddd', 1, '',1,1,NULL, NULL, NULL,1)
GO

CREATE TABLE Acce.tbRoles
(
	role_Id						INT,
	role_Descripcion			NVARCHAR(500),

	usua_UsuarioCreacion 		INT	NOT NULL,
	role_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	role_FechaModificacion		DATETIME DEFAULT NULL,
	role_Estado					BIT	DEFAULT 1,

	CONSTRAINT PK_Acce_tbRoles_role_Id PRIMARY KEY (role_Id),

	CONSTRAINT FK_Acce_tbUsuarios_usua_UsuarioCreacion_Acce_tbRoles_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Acce_tbUsuarios_usua_UsuarioModificacion_Acce_tbRoles_usua_Id FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Acce.tbPantallas(
	pant_Id						INT IDENTITY(1,1),
	pant_Nombre					NVARCHAR(100),
	pant_URL					NVARCHAR(100),
	pant_Icono					NVARCHAR(50),

	usua_UsuarioCreacion 		INT	NOT NULL,
	pant_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	pant_FechaModificacion		DATETIME DEFAULT NULL,
	pant_Estado					BIT	DEFAULT 1,

	CONSTRAINT PK_Acce_tbPantallas_pant_Id	PRIMARY KEY (pant_Id),

	CONSTRAINT FK_Acce_tbPantallas_pant_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Acce_tbPantallas_pant_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Acce.tbRolesXPantallas(
	ropa_Id						INT	IDENTITY(1,1),
	pant_Id						INT,
	role_Id						INT,
	
	usua_UsuarioCreacion 		INT	NOT NULL,
	ropa_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	ropa_FechaModificacion		DATETIME DEFAULT NULL,
	ropa_Estado					BIT	DEFAULT 1,

	CONSTRAINT PK_Acce_tbRolesXPantallas_ropa_Id PRIMARY KEY (ropa_Id),
	CONSTRAINT FK_Acce_tbRolesXPantallas_pant_Id_Acce_tbPantallas_pant_Id FOREIGN KEY(pant_Id) REFERENCES Acce.tbPantallas (pant_Id),
	CONSTRAINT FK_Acce_tbRolesXPantallas_role_Id_Acce_tbRoles_role_Id FOREIGN KEY(role_Id) REFERENCES Acce.tbRoles (role_Id),

	CONSTRAINT FK_Acce_tbRolesXPantallas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Acce_tbRolesXPantallas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

--**********************************************************--
--**************** SCHEMA GENERAL **************************--
--**********************************************************--
CREATE TABLE Adua.tbIncoterm(
	inco_Id						INT IDENTITY(1,1),
	inco_Descripcion			NVARCHAR(150) NOT NULL,
	
	usua_UsuarioCreacion 		INT	NOT NULL,
	inco_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	inco_FechaModificacion		DATETIME DEFAULT NULL,
	inco_Estado					BIT	DEFAULT 1,
 
	CONSTRAINT PK_Adua_tbIncoterm_inco_Id PRIMARY KEY (inco_Id),

	CONSTRAINT FK_Adua_tbIncoterm_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Adua_tbIncoterm_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbPaises(
	pais_Codigo 				CHAR(2)	NOT NULL,
	pais_Nombre 				NVARCHAR(150) NOT NULL,
	
	usua_UsuarioCreacion 		INT	NOT NULL,
	pais_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	pais_FechaModificacion		DATETIME DEFAULT NULL,
	pais_Estado					BIT	DEFAULT 1,
	
	CONSTRAINT PK_Gral_tbPaises_pais_Codigo PRIMARY KEY (pais_Codigo),

	CONSTRAINT FK_Gral_tbPaises_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbPaises_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbFormas_Envio(
	foen_Id INT					IDENTITY(1,1),
	foen_Descripcion			NVARCHAR(500),

	usua_UsuarioCreacion 		INT	NOT NULL,
	foen_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	foen_FechaModificacion		DATETIME DEFAULT NULL,
	foen_Estado					BIT NOT NULL DEFAULT 1,

	CONSTRAINT PK_Gral_tbFormas_Envio_foen_Id PRIMARY KEY (foen_Id),

	CONSTRAINT FK_Gral_tbFormas_Envio_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbFormas_Envio_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbMonedas 
(
	mone_Id						INT,
	mone_Descripcion			NVARCHAR(500),

	usua_UsuarioCreacion 		INT	NOT NULL,
	mone_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	mone_FechaModificacion		DATETIME DEFAULT NULL,
	mone_Estado					BIT NOT NULL DEFAULT 1,

	CONSTRAINT PK_Gral_tbMonedas_mone_Id PRIMARY KEY (mone_Id),

	CONSTRAINT FK_Gral_tbMonedas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbMonedas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbProvincias(
	pvin_Id						INT IDENTITY(1,1),
	pvin_Nombre 				NVARCHAR(150) NOT NULL,
	pvin_Codigo 				NVARCHAR(20) NOT NULL,
	pais_Codigo					CHAR(2)	NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	pvin_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	pvin_FechaModificacion		DATETIME DEFAULT NULL,
	pvin_Estado					BIT	DEFAULT 1,
	
	CONSTRAINT PK_Gral_tbProvincias_pvin_Id PRIMARY KEY (pvin_Id),
	CONSTRAINT FK_Gral_tbPaises_Gral_tbProvincias_pais_Codigo FOREIGN KEY (pais_Codigo) REFERENCES Gral.tbPaises(pais_Codigo),

	CONSTRAINT FK_Gral_tbProvincias_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbProvincias_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbCiudades(
	ciud_Id						INT IDENTITY(1,1),
	ciud_Nombre 				NVARCHAR(150) NOT NULL,
	pvin_Id 					INT	NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	ciud_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	ciud_FechaModificacion		DATETIME DEFAULT NULL,
	ciud_Estado					BIT	DEFAULT 1,
	
	CONSTRAINT PK_Gral_tbCiudades_ciud_Id PRIMARY KEY (ciud_Id),
	CONSTRAINT FK_Gral_tbProvincias_Gral_tbCiudades_pvin_Id FOREIGN KEY (pvin_Id) REFERENCES Gral.tbProvincias(pvin_Id),

	CONSTRAINT FK_Gral_tbCiudades_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbCiudades_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbAldeas(
	alde_Id						INT IDENTITY(1,1),
	alde_Nombre 				NVARCHAR(150) NOT NULL,
	ciud_Id 					INT	NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	alde_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	alde_FechaModificacion		DATETIME DEFAULT NULL,
	alde_Estado					BIT	DEFAULT 1,

	CONSTRAINT PK_Gral_tbAldeas_alde_Id PRIMARY KEY (alde_Id),
	CONSTRAINT FK_Gral_tbCiudades_Gral_tbAldeas_ciud_Id FOREIGN KEY (ciud_Id) REFERENCES Gral.tbCiudades(ciud_Id),

	CONSTRAINT FK_Gral_tbAldeas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbAldeas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbColonias(
	colo_Id						INT IDENTITY(1,1),
	colo_Nombre 				NVARCHAR(150) NOT NULL,
	alde_Id 					INT	NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	colo_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	colo_FechaModificacion		DATETIME DEFAULT NULL,
	colo_Estado					BIT	DEFAULT 1,

	CONSTRAINT PK_Gral_tbColonias_colo_Id PRIMARY KEY (colo_Id),
	CONSTRAINT FK_Gral_tbAldeas_Gral_tbColonias_alde_Id FOREIGN KEY (alde_Id) REFERENCES Gral.tbAldeas(alde_Id),

	CONSTRAINT FK_Gral_tbColonias_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbColonias_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbEstadosCiviles(
	escv_Id						INT IDENTITY(1,1),
	escv_Nombre 				NVARCHAR(150) NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	escv_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	escv_FechaModificacion		DATETIME DEFAULT NULL,
	escv_Estado					BIT	DEFAULT 1,
	
	CONSTRAINT PK_Gral_tbEstadosCiviles_escv_Id PRIMARY KEY (escv_Id),

	CONSTRAINT FK_Gral_tbEstadosCiviles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbEstadosCiviles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbOficinas(
	ofic_Id						INT IDENTITY(1,1),
	ofic_Nombre 				NVARCHAR(150) NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	ofic_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	ofic_FechaModificacion		DATETIME DEFAULT NULL,
	ofic_Estado					BIT	DEFAULT 1,
	
	CONSTRAINT PK_Gral_tbOficinas_ofic_Id PRIMARY KEY (ofic_Id),

	CONSTRAINT FK_Gral_tbOficinas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbOficinas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbOficinasProfesiones(
	ofpr_Id						INT IDENTITY(1,1),
	ofpr_Nombre 				NVARCHAR(150) NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	ofpr_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	ofpr_FechaModificacion		DATETIME DEFAULT NULL,
	ofpr_Estado					BIT	DEFAULT 1,
	
	CONSTRAINT PK_Gral_tbOficinasProfesiones_ofpr_Id PRIMARY KEY (ofpr_Id),

	CONSTRAINT FK_Gral_tbOficinasProfesiones_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbOficinasProfesiones_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Gral.tbCargos(
	carg_Id						INT IDENTITY(1,1),
	carg_Nombre 				NVARCHAR(150) NOT NULL,

	usua_UsuarioCreacion 		INT	NOT NULL,
	carg_FechaCreacion 			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT	DEFAULT NULL,
	carg_FechaModificacion		DATETIME DEFAULT NULL,
	carg_Estado					BIT	DEFAULT 1,

	CONSTRAINT PK_Gral_tbCargos_carg_Id PRIMARY KEY (carg_Id),

	CONSTRAINT FK_Gral_tbCargos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Gral_tbCargos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO


--Seccion 2 Chris
GO
CREATE TABLE Gral.tbUnidadMedidas
(
unme_Id							INT IDENTITY(1,1),
unme_Descripcion				NVARCHAR(500) NOT NULL,
usua_UsuarioCreacion			INT NOT NULL,
unme_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
usua_UsuarioModificacion		INT,
unme_FechaModificacion		DATETIME,
unme_Estado						BIT

CONSTRAINT PK_Gral_tbUnidadMedida_unme_Id PRIMARY KEY (unme_Id),
CONSTRAINT FK_Acce_tbUsuarios_Gral_tbUnidadesMedidas_unme_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
CONSTRAINT FK_Acce_tbUsuarios_Gral_tbUnidadesMedidas_unme_UsuarioModificacion  FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
)

GO

CREATE TABLE Gral.tbEmpleados(
		empl_Id							INT 			IDENTITY(1,1),
		empl_Nombres 					NVARCHAR(150)	NOT NULL,
		empl_Apellidos					NVARCHAR(150) 	NOT NULL,
		empl_DNI	 					NVARCHAR(20) 	NOT NULL,
		escv_Id							INT				NOT NULL,
		empl_Sexo						CHAR(1)			NOT NULL,
		empl_FechaNacimiento			DATE 			NOT NULL,
		empl_Telefono					NVARCHAR(20)	NOT NULL,
		empl_DireccionExacta			NVARCHAR(500)   NOT NULL,
		pvin_Id							INT				NOT NULL,
		empl_CorreoElectronico			NVARCHAR(150)   NOT NULL,
		carg_Id							INT				NOT NULL,
		empl_EsAduana					BIT				NOT NULL,
		
		usua_UsuarioCreacion			INT 			NOT NULL,
		empl_FechaCreacion 				DATETIME		NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion		INT,
		empl_FechaModificacion  		DATETIME, 
		empl_Estado						BIT 			NOT NULL DEFAULT 1,

		CONSTRAINT PK_Adua_tbEmpleados_emad_Id PRIMARY KEY (empl_Id),
		CONSTRAINT FK_Gral_tbEstadosCiviles_Adua_tbEmpleados_escv_Id FOREIGN KEY (escv_Id) REFERENCES Gral.tbEstadosCiviles(escv_Id),
		CONSTRAINT FK_Gral_tbProvincias_Adua_tbEmpleados_pvin_Id FOREIGN KEY (pvin_Id) REFERENCES Gral.tbProvincias(pvin_Id),
		CONSTRAINT FK_Gral_tbCargos_Adua_tbasEmpleados_carg_Id FOREIGN KEY (carg_Id) REFERENCES Gral.tbCargos(carg_Id),
		CONSTRAINT FK_Acce_tbUsuarios_Gral_tbEmpleados_empl_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
		CONSTRAINT FK_Acce_tbUsuarios_Gral_tbEmpleados_empl_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
)
GO
--**********************************************************--
--**************** SCHEMA Aduana ***************************--
--**********************************************************--
CREATE TABLE Adua.tbFacturas
(
fact_Id						INT IDENTITY(1,1),
fect_Fecha					DATETIME NOT NULL,
usua_UsuarioCreacion		INT NOT NULL,
fact_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
usua_UsuarioModificacion			INT,
fact_FechaModificacion			DATETIME,
fact_Estado					BIT NOT NULL DEFAULT 1

CONSTRAINT PK_Adua_tbFactura_fact_Id PRIMARY KEY (fact_Id),
CONSTRAINT FK_Adua_tbFacturas_tbUsuarios_fact_UsucCrea								FOREIGN KEY (usua_UsuarioCreacion)      REFERENCES Acce.tbUsuarios (usua_Id),
CONSTRAINT FK_Adua_tbFacturas_tbUsuarios_fact_usua_UsuarioModificacion				FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Adua.tbAduanas
(
adua_Id							INT IDENTITY(1,1),
adua_Nombre						NVARCHAR(500) NOT NULL,
adua_Direccion_Exacta			NVARCHAR(800) NOT NULL,
usua_UsuarioCreacion			INT NOT NULL,
adua_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
usua_UsuarioModificacion		INT,
adua_FechaModificacion		DATETIME,
adua_Estado						BIT NOT NULL DEFAULT 1

CONSTRAINT PK_Adua_tbAduanas_adua_Id PRIMARY KEY (adua_Id),
CONSTRAINT FK_Adua_tbAduanas_tbUsuarios_adua_UsucCrea								FOREIGN KEY (usua_UsuarioCreacion)			REFERENCES Acce.tbUsuarios (usua_Id),
CONSTRAINT FK_Adua_tbAduanas_tbUsuarios_adua_usua_UsuarioModificacion				FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios (usua_Id)
);


/*Factura Detalles*/
GO

CREATE TABLE Adua.tbNivelesComerciales(
		nico_Id								INT IDENTITY(1,1),
		nico_Descripcion					NVARCHAR(150) NOT NULL,
		usua_UsuarioCreacion				INT NOT NULL,
		nico_FechaCreacion					DATETIME NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion			INT,
		nico_FechaModificacion         DATETIME,
		nico_Estado							BIT NOT NULL DEFAULT 1

   CONSTRAINT PK_Adua_tbNivelesComerciales_nico_Id PRIMARY KEY (nico_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbNivelesComerciales_nico_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbNivelesComerciales_nico_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
   );
   GO

CREATE TABLE Adua.tbCondicionesComerciales(
   coco_Id							INT IDENTITY(1,1),
   coco_Descripcion					NVARCHAR(150) NOT NULL,
   usua_UsuarioCreacion             INT NOT NULL,
   coco_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
   usua_UsuarioModificacion     INT,
   coco_FechaModificacion      DATETIME,
   coco_Estado						BIT NOT NULL DEFAULT 1

   CONSTRAINT PK_Adua_tbCondicionesComerciales_coco_Id PRIMARY KEY (coco_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbCondicionesComerciales_coco_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbCondicionesComerciales_coco_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
   );
   GO

CREATE TABLE Adua.tbFormasdePago(
		fopa_Id								INT IDENTITY(1,1),
		fopa_Descripcion					NVARCHAR(150) NOT NULL,
		usua_UsuarioCreacion				INT NOT NULL,
		fopa_FechaCreacion					DATETIME NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion			INT,
		fopa_FechaModificacion         DATETIME,
		fopa_Estado							BIT NOT NULL DEFAULT 1
   CONSTRAINT PK_Adua_tbFormasdePago_inco_Id PRIMARY KEY (fopa_Id)
   CONSTRAINT FK_Acce_tbFormasdePago_Adua_tbIncoterm_Valor_fopa_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_Acce_tbFormasdePago_Adua_tbIncoterm_Valor_fopa_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
   );
   GO

   CREATE TABLE Adua.tbDeclarantes(
   decl_Id                  INT IDENTITY(1,1),
   decl_Nombre_Raso         NVARCHAR(250) NOT NULL,
   decl_Direccion_Exacta    NVARCHAR(250) NOT NULL,
   pvin_Id                  INT NOT NULL,
   decl_Correo_Electronico  NVARCHAR(150) NOT NULL,
   decl_Telefono            NVARCHAR(50) NOT NULL,
   decl_Fax                 NVARCHAR(50)NOT NULL, 
   usua_UsuarioCreacion             INT NOT NULL,
   decl_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
   usua_UsuarioModificacion			INT,
   decl_FechaModificacion      DATETIME,
   decl_Estado						BIT NOT NULL DEFAULT 1

   CONSTRAINT PK_Adua_tbDeclarantes_decl_Id PRIMARY KEY (decl_Id),
   CONSTRAINT FK_Adua_tbDeclarantes_esta_Id_Adua_tbEstados_esta_Id FOREIGN KEY (pvin_Id) REFERENCES Gral.tbProvincias(pvin_Id),
   CONSTRAINT FK_Acce_tbDeclarantes_Adua_tbIncoterm_Valor_fopa_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_Acce_tbDeclarantes_Adua_tbIncoterm_Valor_fopa_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
   );
   GO

CREATE TABLE Adua.tbImportadores(
	impo_Id                  INT IDENTITY(1,1),
	nico_Id                  INT NOT NULL,
	impo_RTN                 INT NOT NULL,
	impo_NumRegistro         INT NOT NULL,
	usua_UsuarioCreacion     INT NOT NULL,
	impo_FechaCreacion					DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion			INT,
	impo_FechaModificacion				DATETIME,
	impo_Estado							BIT NOT NULL DEFAULT 1

   CONSTRAINT PK_Adua_tbImportadores_impo_Id PRIMARY KEY (impo_Id),
   CONSTRAINT FK_Adua_tbImportadores_nico_Id_Adua_tbNivelesComerciales_nico_Id FOREIGN KEY (nico_Id) REFERENCES Adua.tbNivelesComerciales(nico_Id),
   CONSTRAINT FK_Acce_tbImportadores_Adua_tbIncoterm_Valor_impo_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_Acce_tbImportadores_Adua_tbIncoterm_Valor_impo_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
   );
   GO
CREATE TABLE Adua.tbTipoIntermediario(
		tite_Id								INT IDENTITY(1,1),
		tite_Descripcion					NVARCHAR(150) NOT NULL,
		usua_UsuarioCreacion				INT NOT NULL,
		tite_FechaCreacion					DATETIME NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion			INT,
		tite_FechaModificacion				DATETIME,
		tite_Estado							BIT NOT NULL DEFAULT 1
   CONSTRAINT PK_Adua_tbNivelesComerciales PRIMARY KEY (tite_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbTipoIntermediario_inte_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbTipoIntermediario_inte_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
   );
   GO

    CREATE TABLE Adua.tbIntermediarios(
		inte_Id							INT IDENTITY(1,1),
		tite_Id							INT NOT NULL,
		decl_Id							INT NOT NULL,
		usua_UsuarioCreacion            INT NOT NULL,
		inte_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion   INT,
		inte_FechaModificacion     DATETIME,
		inte_Estado						BIT NOT NULL DEFAULT 1

   CONSTRAINT PK_Adua_tbIntermediarios_inte_Id PRIMARY KEY (inte_Id),
   CONSTRAINT FK_Adua_tbIntermediarios_tite_Id_Adua_tbTipoIntermediario_tite_Id FOREIGN KEY (tite_Id) REFERENCES Adua.tbTipoIntermediario(tite_Id),
   CONSTRAINT FK_Adua_tbIntermediarios_decl_Id_Adua_tbDeclarantes_decl_Id FOREIGN KEY (decl_Id) REFERENCES Adua.tbDeclarantes(decl_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbIntermediarios_inte_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_Acce_tbUsuarios_Adua_tbIntermediarios_inte_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id)
   );
   GO

CREATE TABLE Gral.tbProveedores(
			prov_Id   				INT IDENTITY(1,1),
			prov_NombreCompania		NVARCHAR(200)		NOT NULL,
			prov_NombreContacto		NVARCHAR(200)		NOT NULL,
			prov_Telefono			NVARCHAR(20)		NOT NULL,
			prov_CodigoPostal		VARCHAR(5)			NOT NULL,
			prov_Ciudad				INT					NOT NULL,
			prov_DireccionExacta	NVARCHAR(350),
			prov_CorreoElectronico	NVARCHAR(250)		NOT NULL,
			prov_Fax				NVARCHAR(20),
			usua_UsuarioCreacion			INT					NOT NULL,
			prov_FechaCreacion			 DATETIME NOT NULL DEFAULT GETDATE(),
			usua_UsuarioModificacion 		INT 			,
			prov_FechaModificacion 			DATETIME		, 
			prov_Estado 			BIT	NOT NULL DEFAULT 1, 

		CONSTRAINT PK_Prod_tbProveedores_prov_Id PRIMARY KEY (prov_Id),
		CONSTRAINT FK_Prod_tbProveedores_prov_Ciudad 							FOREIGN KEY (prov_Ciudad) 		REFERENCES Gral.tbCiudades(ciud_Id),
		CONSTRAINT FK_Prod_tbProveedores_tbUsuarios_prov_UsuarioCreacion				FOREIGN KEY (usua_UsuarioCreacion)     	REFERENCES Acce.tbUsuarios (usua_Id),
		CONSTRAINT FK_Prod_tbProveedores_tbUsuarios_prov_usua_UsuarioModificacionfica			FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Adua.tbDeclaraciones_Valor
(
deva_Id INT IDENTITY(1,1),
deva_Aduana_Ingreso_Id INT NOT NULL, 
deva_Aduana_Despacho_Id INT NOT NULL,
deva_Declaracion_Mercancia NVARCHAR(500) NOT NULL,
deva_Fecha_Aceptacion DATETIME NOT NULL,
impo_Id INT NOT NULL,
prov_Id INT NOT NULL,
inte_Id INT NOT NULL,
deva_Lugar_Entrega NVARCHAR(800) NOT NULL,
inco_Id INT NOT NULL,
deva_numero_contrato NVARCHAR(200) NOT NULL,
deva_Fecha_Contrato DATETIME NOT NULL,
foen_Id INT NOT NULL,
deva_Forma_Envio_Otra NVARCHAR(500) NOT NULL,
deva_Pago_Efectuado BIT NOT NULL,
fopa_Id INT NOT NULL,
deva_Forma_Pago_Otra NVARCHAR(200) NOT NULL,
deva_Lugar_Embarque NVARCHAR(500) NOT NULL,
pais_Embarque_Id CHAR(2) NOT NULL,
pais_Exportacion_Id CHAR(2) NOT NULL,
deva_Fecha_Exportacion DATETIME NOT NULL,
mone_Id INT NOT NULL,
mone_Otra NVARCHAR(200) NOT NULL,
deva_Conversion_Dolares  DECIMAL(18,2) NOT NULL,
deva_Condiciones NVARCHAR(MAX) NOT NULL,
usua_UsuarioCreacion INT NOT NULL,
deva_FechaCreacion  DATETIME NOT NULL DEFAULT GETDATE(),
usua_UsuarioModificacion INT,
deva_FechaModificacion  DATETIME,
deva_Estado BIT	NOT NULL DEFAULT 1

CONSTRAINT Adua_tbDeclaraciones_Valor_deva_Id PRIMARY KEY (deva_Id),
CONSTRAINT Adua_tbAduanas_Adua_tbDeclaraciones_Valor_deva_Aduana_Ingreso_Id FOREIGN KEY (deva_Aduana_Ingreso_Id) REFERENCES Adua.tbAduanas (adua_Id),
CONSTRAINT Adua_tbAduanas_Adua_tbDeclaraciones_Valor_deva_Aduana_Despacho_Id FOREIGN KEY (deva_Aduana_Despacho_Id) REFERENCES Adua.tbAduanas (adua_Id),
CONSTRAINT Adua_tbImportadores_Adua_tbDeclaraciones_Valor_impo_Id FOREIGN KEY (impo_Id) REFERENCES Adua.tbImportadores (impo_Id),
CONSTRAINT Adua_tbProveedores_Adua_tbDeclaraciones_Valor_prov_Id FOREIGN KEY (prov_Id) REFERENCES Gral.tbProveedores (prov_Id),
CONSTRAINT Adua_tbIntermediarios_Adua_tbDeclaraciones_Valor_inte_Id FOREIGN KEY (inte_Id) REFERENCES Adua.tbIntermediarios (inte_Id),
CONSTRAINT Adua_tbIncoterm_Adua_tbDeclaraciones_Valor_inco_Id FOREIGN KEY (inco_Id) REFERENCES Adua.tbIncoterm (inco_Id),
CONSTRAINT Gral_tbFormas_Envio_Adua_tbDeclaraciones_Valor_foen_Id FOREIGN KEY (foen_Id) REFERENCES Gral.tbFormas_Envio (foen_Id),
CONSTRAINT Adua_tbFormasdePago_Adua_tbDeclaraciones_Valor_fopa_Id FOREIGN KEY (fopa_Id) REFERENCES Adua.tbFormasdePago (fopa_Id),
CONSTRAINT Gral_tbPaises_Adua_tbDeclaraciones_Valor_pais_Embarque_Id FOREIGN KEY (pais_Embarque_Id) REFERENCES Gral.tbPaises (pais_Codigo),
CONSTRAINT Gral_tbPaises_tbDeclaraciones_Valor_pais_Exportacion_Id FOREIGN KEY (pais_Exportacion_Id) REFERENCES Gral.tbPaises (pais_Codigo),
CONSTRAINT Gral_tbMonedas_tbDeclaraciones_Valor_mone_Id FOREIGN KEY (mone_Id) REFERENCES Gral.tbMonedas (mone_Id),
CONSTRAINT FK_Acce_tbUsuarios_Adua_tbDeclaraciones_Valor_deva_UsuarioCreacion FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
CONSTRAINT FK_Acce_tbUsuarios_Adua_tbDeclaraciones_Valor_deva_usua_UsuarioModificacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id),

)

/*Factura Declaracion de valor*/
GO
CREATE TABLE Adua.tbFacturas_Declaracion_Valor 
(
fava_Id INT IDENTITY(1,1),
deva_Id INT NOT NULL,
fact_Id INT NOT NULL,
usua_UsuarioCreacion INT NOT NULL,
fava_FechaCreacion  DATETIME NOT NULL DEFAULT GETDATE(),
usua_UsuarioModificacion INT,
fava_FechaModificacion DATETIME,
feva_Estado BIT	NOT NULL DEFAULT 1

CONSTRAINT PK_Adua_tbFacturas_Declaracion_Valor_feva_Id PRIMARY KEY (fava_Id),
CONSTRAINT FK_Adua_tbFacturas_Adua_tbFacturas_Declaracion_Valor_fact_Id FOREIGN KEY (fact_Id) REFERENCES Adua.tbFacturas (fact_Id),
CONSTRAINT FK_Adua_tbDeclaraciones_Valor_Adua_tbFacturas_Declaracion_Valor_deva_Id FOREIGN KEY (deva_Id) REFERENCES Adua.tbDeclaraciones_Valor (deva_Id),
CONSTRAINT FK_Prod_tbFacturas_Declaracion_Valor_tbUsuarios_fava_UsuarioCreacion				FOREIGN KEY (usua_UsuarioCreacion)      REFERENCES Acce.tbUsuarios (usua_Id),
CONSTRAINT FK_Prod_tbFacturas_Declaracion_Valor_tbUsuarios_fava_usua_UsuarioModificacionfica			FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios (usua_Id)

) 

GO
CREATE TABLE Adua.tbCondiciones
(
codi_Id INT IDENTITY(1,1),
deva_Id INT NOT NULL,
codi_Restricciones_Utilizacion BIT NOT NULL,
codi_Indicar_Restricciones_Utilizacion NVARCHAR(500) NOT NULL,
codi_Depende_Precio_Condicion BIT NOT NULL,
codi_Indicar_Existe_Condicion NVARCHAR(200) NOT NULL,
codi_Condicionada_Revertir BIT NOT NULL,
codi_Vinculacion_Comprador_Vendedor BIT NOT NULL,
codi_Tipo_Vinculacion NVARCHAR(500) NOT NULL,
codi_Vinculacion_Influye_Precio BIT NOT NULL,
codi_Pagos_Descuentos_Indirectos BIT NOT NULL,
codi_Concepto_Monto_Declarado NVARCHAR(500) NOT NULL,
codi_Existen_Canones BIT NOT NULL,
codi_Indicar_Canones NVARCHAR(500) NOT NULL,
usua_UsuarioCreacion INT NOT NULL,
codi_FechaCreacion  DATETIME NOT NULL DEFAULT GETDATE(),
usua_UsuarioModificacion INT,
codi_FechaModificacion DATETIME,
codi_Estado BIT	NOT NULL DEFAULT 1

CONSTRAINT PK_Adua_tbCondiciones_codi_Id PRIMARY KEY (codi_Id),
CONSTRAINT FK_Adua_tbDeclaraciones_Valor_Adua_tbCondiciones_deva_Id 	FOREIGN KEY (deva_Id) REFERENCES Adua.tbDeclaraciones_Valor (deva_Id),
CONSTRAINT FK_Prod_tbCondiciones_tbUsuarios_base_UsuarioCreacion				FOREIGN KEY (usua_UsuarioCreacion)      REFERENCES Acce.tbUsuarios (usua_Id),
CONSTRAINT FK_Prod_tbCondiciones_tbUsuarios_base_usua_UsuarioModificacion				FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios (usua_Id),

)
GO
CREATE TABLE Adua.tbBaseCalculos
(
base_Id INT IDENTITY(1,1),
deva_Id INT NOT NULL,
base_PrecioFactura DECIMAL(18,2) NOT NULL,
base_PagosIndirectos DECIMAL(18,2) NOT NULL,
base_PrecioReal DECIMAL(18,2) NOT NULL,
base_MontCondicion DECIMAL(18,2) NOT NULL,
base_MontoReversion DECIMAL(18,2) NOT NULL,
base_Gasto_Envase_Embalaje DECIMAL(18,2) NOT NULL,
base_ValoresMateriales_Incorporado DECIMAL(18,2) NOT NULL,
base_Valor_Materiales_Utilizados DECIMAL(18,2) NOT NULL,
base_Valor_Materiales_Consumidos DECIMAL(18,2) NOT NULL,
base_Valor_Ingenieria_Importado DECIMAL(18,2) NOT NULL,
base_Valor_Canones DECIMAL(18,2) NOT NULL,
base_Gasto_TransporteM_Importada DECIMAL(18,2) NOT NULL,
base_Gastos_Carga_Importada DECIMAL(18,2) NOT NULL,
base_Costos_Seguro DECIMAL(18,2) NOT NULL,
base_Total_Ajustes_Precio_Pagado DECIMAL(18,2) NOT NULL,
base_Gastos_Asistencia_Tecnica DECIMAL(18,2) NOT NULL,
base_Derechos_Impuestos DECIMAL(18,2) NOT NULL,
base_Monto_Intereses DECIMAL(18,2) NOT NULL,
base_Deducciones_Legales DECIMAL(18,2) NOT NULL,
base_Total_Deducciones_Precio DECIMAL(18,2) NOT NULL,
base_Valor_Aduana DECIMAL(18,2) NOT NULL,
usua_UsuarioCreacion INT NOT NULL,
base_FechaCreacion  DATETIME NOT NULL DEFAULT GETDATE(),
usua_UsuarioModificacion INT,
base_FechaModificacion  DATETIME,
base_Estado BIT	NOT NULL DEFAULT 1

CONSTRAINT PK_Adua_tbBaseCalculos_base_Id PRIMARY KEY(base_Id),
CONSTRAINT FK_Adua_tbDeclaraciones_Valor_Adua_tbBaseCalculos_deva_Id    FOREIGN KEY (deva_Id) 			REFERENCES Adua.tbDeclaraciones_Valor (deva_Id),
CONSTRAINT FK_Prod_tbBaseCalculos_tbUsuarios_base_UsuarioCreacion				FOREIGN KEY (usua_UsuarioCreacion)      REFERENCES Acce.tbUsuarios (usua_Id),
CONSTRAINT FK_Prod_tbBaseCalculos_tbUsuarios_base_usua_UsuarioModificacion				FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios (usua_Id),
)

GO

--Seccion #3
--

CREATE TABLE Prod.tbEstilos(
	esti_Id						INT  IDENTITY(1,1),
	esti_Descripcion			NVARCHAR(200) NOT NULL,
	usua_UsuarioCreacion 		INT NOT NULL,
	esti_FechaCreacion			DATETIME DEFAULT GETDATE(), 
	usua_UsuarioModificacion	INT ,
	esti_FechaModificacion		DATETIME ,
	esti_Estado					BIT DEFAULT 1 

	CONSTRAINT PK_Prod_tbEstilos_esti_Id												PRIMARY KEY (esti_Id)
	CONSTRAINT FK_Prod_tbEstilos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id 			FOREIGN KEY (usua_UsuarioCreacion )     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbEstilos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),


);

CREATE TABLE Prod.tbModelos(
	mode_Id						INT  IDENTITY(1,1),
	mode_Descripcion			INT ,
	esti_Id						INT ,
	usua_UsuarioCreacion 		INT ,
	mode_FechaCreacion			DATETIME DEFAULT GETDATE(), 
	usua_UsuarioModificacion	INT ,
	mode_FechaModificacion		DATETIME, 
	mode_Estado					BIT DEFAULT 1

	CONSTRAINT PK_Prod_tbModelos_mode_Id												PRIMARY KEY (mode_Id),
	CONSTRAINT FK_Prod_tbModelos_esti_Id_Prod_tbEstilos_esti_Id							FOREIGN KEY (esti_Id)					REFERENCES Prod.tbEstilos (esti_Id),
	CONSTRAINT FK_Prod_tbModelos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion )     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbModelos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),


);
GO

CREATE TABLE Prod.tbColores(
	colo_Id						INT  IDENTITY(1,1),
	colo_Nombre					NVARCHAR(200) NOT NULL,
	colo_Codigo					NVARCHAR(50) NOT NULL,
	usua_UsuarioCreacion		INT,
	colo_FechaCreacion			DATETIME DEFAULT GETDATE(), 
	usua_UsuarioModificacion	INT,
	colo_FechaModificacion		DATETIME,
	colo_Estado					BIT DEFAULT 1 

	CONSTRAINT PK_Prod_tbColores_colo_Id													PRIMARY KEY (colo_Id)
	CONSTRAINT FK_Prod_tbColores_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbColores_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Prod.tbProcesos(
	proc_Id						INT  IDENTITY(1,1), 
	proc_Descripcion			NVARCHAR(200) NOT NULL,
	usua_UsuarioCreacion 		INT,
	proc_FechaCreacion			DATETIME DEFAULT GETDATE(),  
	usua_UsuarioModificacion	INT, 
	proc_FechaModificacion		DATETIME, 
	proc_Estado					BIT DEFAULT 1  

	CONSTRAINT PK_Prod_tbProcesos_proc_Id													PRIMARY KEY (proc_Id)
	CONSTRAINT FK_Prod_tbProcesos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbProcesos_Acce_tbUsuarios_proce_UsuModifica							FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Prod.tbArea(
	tipa_Id						INT IDENTITY(1,1),
	tipa_area					NVARCHAR(200)		NOT NULL,
	proc_Id						INT 				NOT NULL,
	usua_UsuarioCreacion		INT					NOT NULL,
	tipa_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT 			,
	tipa_FechaModificacion		DATETIME		, 
	tipa_Estado 				BIT					NOT NULL DEFAULT 1, 

	CONSTRAINT PK_Prod_tbTipoArea_tipa_Id 													PRIMARY KEY (tipa_Id),
	CONSTRAINT FK_Prod_tbTipoArea_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id 				FOREIGN KEY (usua_UsuarioCreacion) 		REFERENCES Acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_Prod_tbTipoArea_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id 			FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_Prod_tbProcesos_proc_Id_Prod_tbArea_proc_Id			 					FOREIGN KEY (proc_Id) 					REFERENCES Prod.tbProcesos(proc_Id),
)
GO

CREATE TABLE Prod.tbTipoEmbalaje(
	tiem_Id  					INT IDENTITY(1,1),
	tiem_Descripcion 			NVARCHAR(200)		NOT NULL,
	usua_UsuarioCreacion		INT					NOT NULL,
	tiem_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT 			,
	tiem_FechaModificacion		DATETIME		, 
	tiem_Estado 				BIT					NOT NULL DEFAULT 1, 

	CONSTRAINT PK_Prod_tbTipoEmbalaje_tiem_Id												PRIMARY KEY (tiem_Id),
	CONSTRAINT FK_Prod_tbTipoEmbalaje_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbTipoEmbajale_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO
CREATE TABLE Prod.tbFuncionesMaquina(
	func_Id   					INT IDENTITY(1,1),
	func_Nombre  				NVARCHAR(200)		NOT NULL,
	usua_UsuarioCreacion		INT					NOT NULL,
	func_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT 			,
	func_FechaModificacion		DATETIME		, 
	func_Estado 				BIT					NOT NULL DEFAULT 1, 

	CONSTRAINT PK_Prod_tbFuncionesMaquina_func_Id												PRIMARY KEY (func_Id),
	CONSTRAINT FK_Prod_tbFuncionesMaquina_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbFuncionesMaquina_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Prod.tbCategoria(
	cate_Id   					INT IDENTITY(1,1),
	cate_Descripcion  			NVARCHAR(200)		NOT NULL,
	usua_UsuarioCreacion		INT					NOT NULL,
	cate_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT 			,
	cate_FechaModificacion		DATETIME		, 
	cate_Estado 				BIT					NOT NULL DEFAULT 1, 

	CONSTRAINT PK_Prod_tbCategoria_cate_Id														PRIMARY KEY (cate_Id),
	CONSTRAINT FK_Prod_tbCategoria_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id					FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbCategoria_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Prod.tbSubcategoria(
	subc_Id   					INT IDENTITY(1,1),
	cate_Id  					INT,
	subc_Descripcion			NVARCHAR(200),
	usua_UsuarioCreacion		INT					NOT NULL,
	subc_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT 			,
	subc_FechaModificacion		DATETIME		, 
	subc_Estado 				BIT					NOT NULL DEFAULT 1, 

	CONSTRAINT PK_Prod_tbSubcategoria_subc_Id													PRIMARY KEY (subc_Id),
	CONSTRAINT FK_Prod_tbSubcategoria_cate_Id_Prod_tbCategoria_cate_Id							FOREIGN KEY (cate_Id) 					REFERENCES Prod.tbCategoria(cate_Id),
	CONSTRAINT FK_Prod_tbSubCategoria_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbSubCategoria_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),
);

GO

CREATE TABLE Adua.tbEstadoMercancias(
	merc_Id						INT IDENTITY(1,1),
	merc_Descrpcion				NVARCHAR(150) NOT NULL,
	usua_UsuarioCreacion        INT NOT NULL,
	merc_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion    INT,
	merc_FechaModificacion      DATETIME,
	merc_Estado					BIT NOT NULL DEFAULT 1

	CONSTRAINT PK_Adua_tbUnidadesDeMedida_unme_Id											PRIMARY KEY (merc_Id),
	CONSTRAINT FK_Adua_tbEstadoMercancias_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_Adua_tbEstadoMercancias_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios(usua_Id)
);

CREATE TABLE Adua.tbItems(
	item_Id                                   INT IDENTITY(1,1),
	item_Cantidad                             INT NOT NULL,
	unme_Id                                   INT NOT NULL,
	item_IdentificacionComercialMercancias    NVARCHAR NOT NULL,
	item_CaracteristicasMercancias            NVARCHAR NOT NULL,
	item_Marca                                NVARCHAR NOT NULL,
	item_Modelo                               NVARCHAR NOT NULL,
	merc_Id                                   INT NOT NULL,
	pais_IdOrigenMercancia                    CHAR(2),
	item_ClasificacionArancelaria             CHAR(10),
	item_ValorUnitario                        DECIMAL(18,2),
	usua_UsuarioCreacion                      INT NOT NULL, 
	item_FechaCreacion                        DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion                  INT,
	item_FechaModificacion                    DATETIME,
	item_Estado                               BIT NOT NULL DEFAULT 1

	CONSTRAINT PK_Adua_tbItems_item_Id												PRIMARY KEY (item_Id),
	CONSTRAINT FK_Adua_tbItems_unme_Id_Adua_tbUnidadesdeMedida_unme_Id				FOREIGN KEY (unme_Id)					REFERENCES gral.tbUnidadMedidas(unme_Id),
	CONSTRAINT FK_Adua_tbItems_merc_Id_Adua_tbMercancias_merc_Id					FOREIGN KEY (merc_Id)					REFERENCES Adua.tbEstadoMercancias(merc_Id),
	CONSTRAINT FK_Adua_tbItems_pais_IdOrigenMercancia_Adua_tbPais_tbPais_pais_Id	FOREIGN KEY (pais_IdOrigenMercancia)	REFERENCES Gral.tbPaises(pais_codigo),
    CONSTRAINT FK_Adua_tbItems_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_Adua_tbItems_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios(usua_Id)
);

GO

CREATE TABLE Adua.tbFactura_Detalles
(
	facd_Id						INT IDENTITY(1,1),
	fact_Id						INT NOT NULL,
	item_Id						INT NOT NULL,
	usua_UsuarioCreacion		INT NOT NULL,
	facd_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT,
	facd_FechaModificacion		DATETIME,
	facd_Estado					BIT NOT NULL DEFAULT 1
	
	CONSTRAINT PK_Adua_tbFacturaDetalles_facd_Id										PRIMARY KEY (facd_Id),
	CONSTRAINT PK_Adua_tbFactura_fact_Id_Adua_tbFactura_Detalles_fact_Id				FOREIGN KEY (fact_Id)					REFERENCES Adua.tbFacturas (fact_Id),
	CONSTRAINT FK_Adua_tbFacturaDetalles_item_Id_Adua_tbFactura_Detalles_item_Id					FOREIGN KEY (item_Id)					REFERENCES Adua.tbItems (item_Id),
	CONSTRAINT FK_Adua_tbFacturaDetalles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioCreacion)      REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Adua_tbFacturaDetalles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id)

);
CREATE TABLE Prod.tbMateriales(
	mate_Id   					INT IDENTITY(1,1),
	mate_Descripcion			NVARCHAR(200),
	subc_Id  					INT,
	mate_Precio					DECIMAL (18,2),
	usua_UsuarioCreacion		INT					NOT NULL,
	mate_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT 			,
	mate_FechaModificacion		DATETIME		, 
	mate_Estado 				BIT					NOT NULL DEFAULT 1, 

	CONSTRAINT PK_Prod_tbMateriales_mate_Id PRIMARY KEY (mate_Id),
	CONSTRAINT FK_Prod_tbMateriales_subc_Id_Prod_tbSubcategoria_subc_Id								FOREIGN KEY (subc_Id) 					REFERENCES Prod.tbSubcategoria(subc_Id),
	CONSTRAINT FK_Prod_tbMateriales_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id					FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbMateriales_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Adua.tbAranceles(
	aran_Id						INT IDENTITY(1,1),
	aran_Codigo					NVARCHAR(100) NOT NULL,
	aran_Descripcion			NVARCHAR(150) NOT NULL,
	usua_UsuarioCreacion		INT NOT NULL,
	aran_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT,
	aran_FechaModificacion		DATETIME,
	aram_Estado					BIT NOT NULL DEFAULT 1

	CONSTRAINT PK_Adua_tbAranceles_aran_Id													PRIMARY KEY (aran_Id),
	CONSTRAINT FK_Adua_tbAranceles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Adua_tbAranceles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Adua.tbImpuestos(
	impu_Id						INT IDENTITY(1,1),
	aran_Codigo					NVARCHAR(100) NOT NULL,
	impu_Descripcion			NVARCHAR(150) NOT NULL,
	impu_Impuesto				DECIMAL(18,2) NOT NULL,
	usua_UsuarioCreacion		INT NOT NULL, 
	impu_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion    INT,
	impu_FechaModificacion      DATETIME,
	impu_Estado					BIT NOT NULL DEFAULT 1
	
	CONSTRAINT PK_Adua_tbImpuestos_impu_Id													PRIMARY KEY (impu_Id),
	CONSTRAINT FK_Adua_tbImpuestos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Adua_tbImpuestos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Adua.tbImpuestosPorArancel( 
    imar_Id						INT IDENTITY(1,1),
	impu_Id						INT NOT NULL,
	aran_Id						INT NOT NULL,
	usua_UsuarioCreacion		INT NOT NULL, 
	imar_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion    INT,
	imar_FechaModificacion		DATETIME,
	imar_Estado					BIT NOT NULL DEFAULT 1,
	
	CONSTRAINT PK_Adua_tbImpuestosPorArancel_imar_Id											PRIMARY KEY (imar_Id),
	CONSTRAINT FK_Adua_tbImpuestoPorArancel_imar_Id_Adua_tbImpuesto_impu_Id						FOREIGN KEY (impu_Id)					REFERENCES Adua.tbImpuestos(impu_Id),
	CONSTRAINT FK_Adua_tbImpuestoPorArancel_aran_Id_Adua_tbAranceles_aran_Id					FOREIGN KEY (aran_Id)					REFERENCES Adua.tbAranceles(aran_Id),
    CONSTRAINT FK_Adua_tbImpuestosPorArancel_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_Adua_tbImpuestosPorArancel_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios(usua_Id)
);

--SeccioN #4 Alex
GO
CREATE TABLE Adua.tbTipoLiquidacion (
    tipl_Id             INT IDENTITY(1,1) ,
    tipl_Descripcion    NVARCHAR(200)  NOT NULL,
    
	usua_UsuarioCreacion       INT            NOT NULL,
    tipl_FechaCreacion         DATETIME       DEFAULT GETDATE(),
    usua_UsuarioModificacion   INT			  NOT NULL,
    tipl_FechaModificacion     DATETIME	      NULL,
    tipl_Estado                BIT			  DEFAULT 1,

   CONSTRAINT PK_Adua_tbTipoLiquidacion_tipl_Id PRIMARY KEY (tipl_Id),
   CONSTRAINT FK_Adua_tbTipoLiquidacion_tipl_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
   CONSTRAINT FK_Adua_tbTipoLiquidacion_tipl_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),

);

GO
CREATE TABLE Adua.tbEstadoBoletin (
    esbo_Id           INT IDENTITY(1,1),
    esbo_Descripcion  NVARCHAR(200) NOT NULL,
    
    usua_UsuarioCreacion       INT            NOT NULL,
    esbo_FechaCreacion         DATETIME       DEFAULT GETDATE(),
    usua_UsuarioModificacion   INT			  NOT NULL,
    esbo_FechaModificacion     DATETIME	      NULL,
    esbo_Estadoo               BIT			  DEFAULT 1,

 CONSTRAINT PK_Adua_tbEstadoBoletin_esbo_Id PRIMARY KEY (esbo_Id),
 CONSTRAINT FK_Adua_tbEstadoBoletin_esbo_UsuarioCreacion_Acce_tbUsuarios_usua_Id		  FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
 CONSTRAINT FK_Adua_tbEstadoBoletin_esbo_UsuarioModificacion_Acce_tbUsuarios_usua_Id	  FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),

);

GO
CREATE TABLE Adua.tbConceptoPago (
    copa_Id           INT IDENTITY(1,1),
    copa_Descripcion  NVARCHAR(200) NOT NULL,
   
	usua_UsuarioCreacion       INT            NOT NULL,
    copa_FechaCreacion         DATETIME       DEFAULT GETDATE(),
    usua_UsuarioModificacion   INT			  NOT NULL,
    copa_FechaModificacion     DATETIME	      NULL,
    copa_Estado                BIT			  DEFAULT 1,

CONSTRAINT PK_Adua_tbConceptoPago_copa_Id PRIMARY KEY (copa_Id),
CONSTRAINT FK_Adua_tbConceptoPago_copa_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
CONSTRAINT FK_Adua_tbConceptoPago_copa_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),

);
GO

CREATE TABLE Prod.tbClientes(
	clie_Id						INT IDENTITY(1,1),
	clie_Nombre_O_Razon_Social	NVARCHAR(200)NOT NULL,
	clie_Direccion				NVARCHAR(250)NOT NULL,
	clie_RTN					CHAR(13)NOT NULL,
	clie_Nombre_Contacto		NVARCHAR(200)NOT NULL,
	clie_Numero_Contacto		CHAR(50)NOT NULL,
	clie_Correo_Electronico		NVARCHAR(200)NOT NULL,
	clie_FAX					NVARCHAR(50)NOT NULL,
	
	usua_UsuarioCreacion       INT            NOT NULL,
	clie_FechaCreacion         DATETIME       DEFAULT GETDATE(),
	usua_UsuarioModificacion   INT			  NOT NULL,
	clie_FechaModificacion     DATETIME	      NULL,
    clie_Estado                BIT			  DEFAULT 1,
	
	CONSTRAINT PK_Prod_tbClientes_clie_Id PRIMARY KEY(clie_Id),
	CONSTRAINT FK_Prod_tbClientes_clie_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbClientes_clie_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO


CREATE TABLE Adua.tbCodigoImpuesto (
    coim_Id          INT IDENTITY(1,1),
    coim_Descripcion NVARCHAR(200)  NOT NULL,
    
	usua_UsuarioCreacion       INT            NOT NULL,
    coim_FechaCreacion         DATETIME       DEFAULT GETDATE(),
    usua_UsuarioModificacion   INT			  NOT NULL,
    coim_FechaModificacion     DATETIME	      NULL,
    coim_Estado                BIT			  DEFAULT 1,

	CONSTRAINT PK_Adua_tbCodigoImpuesto_coim_Id 						PRIMARY KEY (coim_Id),
	CONSTRAINT FK_Adua_tbCodigoImpuesto_coim_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
    CONSTRAINT FK_Adua_tbCodigoImpuesto_coim_UsuarioModificacion_Acce_tbUsuarios_usua_Id  	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),

);
GO

CREATE TABLE Adua.tbFormaPresentacion (
    pres_Id INT IDENTITY(1,1)  ,
    pres_Descripcion NVARCHAR(200) NOT NULL,
	
	usua_UsuarioCreacion       INT            NOT NULL,
    pres_FechaCreacion         DATETIME       DEFAULT GETDATE(),
    usua_UsuarioModificacion   INT			  NOT NULL,
    pres_FechaModificacion     DATETIME	      NULL,
    Pres_Estado                BIT			  DEFAULT 1,
	
	CONSTRAINT PK_Adua_tbFormaPresentacion_pres_Id PRIMARY KEY (pres_Id),
	CONSTRAINT FK_Adua_tbFormaPresentacion_pres_UsuarioCreacion_Acce_tbUsuarios_usua_Id	    FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Adua_tbFormaPresentacion_pres_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
go

CREATE TABLE Gral.tbOficio_Profesiones(
		ofpr_Id			INT 			IDENTITY(1,1),
		ofpr_Nombre 	NVARCHAR(150) 	NOT NULL,
		
		usua_UsuarioCreacion       INT            NOT NULL,
		ofpr_FechaCreacion         DATETIME       DEFAULT GETDATE(),
		usua_UsuarioModificacion   INT			  NOT NULL,
		ofpr_FechaModificacion     DATETIME	      NULL,
		ofpr_Estado                BIT			  DEFAULT 1,
	
	CONSTRAINT PK_Gral_tbOficinasProfesiones_ofpr_Id1 PRIMARY KEY (ofpr_Id),
	CONSTRAINT FK_Gral_tbOficio_Profesiones_ofpr_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_Gral_tbOficio_Profesiones_ofpr_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios(usua_Id),
)
GO


CREATE TABLE Adua.tbPersonas (
  pers_Id INT IDENTITY(1,1) ,
  pers_RTN VARCHAR(20) NOT NULL,
  ofic_Id INT NOT NULL,
  escv_Id INT NOT NULL,
  ofpr_Id INT NOT NULL,
  fopr_Id INT NOT NULL,
  pers_escvRepresentante INT NOT NULL,
  pers_OfprRepresentante INT NOT NULL,
 
  usua_UsuarioCreacion       INT            NOT NULL,
  pers_FechaCreacion         DATETIME       DEFAULT GETDATE(),
  usua_UsuarioModificacion   INT			NOT NULL,
  pers_FechaModificacion     DATETIME	    NULL,
  pers_Estado                BIT			DEFAULT 1,

  CONSTRAINT PK_Adua_tbPersonas_pers_Id PRIMARY KEY (pers_Id),
  CONSTRAINT FK_Adua_Personas_ofic_Id_Gral_Oficina_ofic_Id                                FOREIGN KEY (ofic_Id) REFERENCES Gral.tbOficinas(ofic_Id),
  CONSTRAINT FK_Adua_Personas_escv_Id_Gral_EstadoCivil_escv_Id                            FOREIGN KEY (escv_Id) REFERENCES Gral.tbEstadosCiviles(escv_Id),
  CONSTRAINT FK_Adua_Personas_ofpr_Id_Gral_OficioProfesion_ofpr_Id                        FOREIGN KEY (ofpr_Id) REFERENCES Gral.tbOficio_Profesiones(ofpr_Id),
  CONSTRAINT FK_Adua_Personas_fopr_Id_Adua_FormaPresentacion_pres_Id                      FOREIGN KEY (fopr_Id) REFERENCES Adua.tbFormaPresentacion(pres_Id),
  CONSTRAINT FK_Adua_Personas_pers_escvRepresentante_EstadoCivilRepresentante_escv_Id     FOREIGN KEY (pers_escvRepresentante) REFERENCES Gral.tbEstadosCiviles(escv_Id),
  CONSTRAINT FK_Adua_Personas_pers_OfprRepresentante_OficioProfesionRepresentante_escv_Id FOREIGN KEY (pers_OfprRepresentante) REFERENCES Gral.tbOficio_Profesiones(ofpr_Id),
  
  CONSTRAINT FK_Adua_Personas_pers_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
  CONSTRAINT FK_Adua_Personas_pers_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);

GO



CREATE TABLE Adua.tbComercianteIndividual (
  coin_Id                           INT IDENTITY(1,1),
  pers_Id                           INT NOT NULL,
  fopr_Id                           INT NOT NULL,
  colo_Id                           INT NOT NULL,
  coin_PuntoReferencia			    NVARCHAR(200) NOT NULL,
  coin_ColoniaRepresentante		    INT NOT NULL,
  coin_NumeroLocalReprentante	    NVARCHAR(200) NOT NULL,
  coin_PuntoReferenciaReprentante   NVARCHAR(200) NOT NULL,
  coin_TelefonoCelular			    NVARCHAR(20) NOT NULL,
  coin_TelefonoFijo				    NVARCHAR(20) NOT NULL,
  coin_CorreoElectronico		    NVARCHAR(30) NOT NULL,
  coin_CorreoElectronicoAlternativo NVARCHAR(30),
  coin_ComercainteRTN			    VARCHAR(30) NOT NULL,
  coin_ArchivoRTNComerciante		NVARCHAR(MAX) NOT NULL,
  coin_ComercainteDNI				VARCHAR(30) NOT NULL,
  coin_ArchivoDNIComerciante		NVARCHAR(MAX) NOT NULL,
  coin_RepresentanteRTN				VARCHAR(30) NOT NULL,
  coin_ArchivoRTNRepresentante	    NVARCHAR(MAX) NOT NULL,
  coin_RepresentanteDNI				VARCHAR(30) NOT NULL,
  coin_ArchivoDNIRepresentante		NVARCHAR(MAX) NOT NULL,
  coin_Declaracion					NVARCHAR(50) NOT NULL,
  coin_ArchivoDeclaracion			NVARCHAR(MAX) NOT NULL,
 
  usua_UsuarioCreacion       INT            NOT NULL,
  coin_FechaCreacion         DATETIME       DEFAULT GETDATE(),
  usua_UsuarioModificacion   INT			  NOT NULL,
  coin_FechaModificacion     DATETIME	      NULL,
  coin_Estado                BIT			  DEFAULT 1,
  
  CONSTRAINT PK_Adua_tbComercianteIndividual_coin_Id PRIMARY KEY (coin_Id),
  CONSTRAINT FK_ComercianteIndividual_pers_Id_Adua_Personas_pers_Id                                FOREIGN KEY (pers_Id) REFERENCES Adua.tbPersonas(pers_Id),
  CONSTRAINT FK_ComercianteIndividual_fopr_Id_Adua_FormaPresentacion_pres_Id                       FOREIGN KEY (fopr_Id) REFERENCES Adua.tbFormaPresentacion(pres_Id),
  CONSTRAINT FK_ComercianteIndividual_colo_Id_Gral_Colonia_colo_Id                                 FOREIGN KEY (colo_Id) REFERENCES Gral.tbColonias(colo_Id),
  CONSTRAINT FK_ComercianteIndividual_coin_ColoniaRepresentante_Gral_ColoniaRepresentante_colo_Id  FOREIGN KEY (coin_ColoniaRepresentante) REFERENCES Gral.tbColonias(colo_Id),
  
  CONSTRAINT FK_Adua_ComercianteIndividual_coin_UsuarioCreacion_Acce_tbUsuarios_usua_Id		   	  FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
  CONSTRAINT FK_Adua_ComercianteIndividual_coin_UsuarioModificacion_Acce_tbUsuarios_usua_Id		  FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);

GO

CREATE TABLE Adua.tbPersonaNatural (
  pena_Id						INT IDENTITY(1,1),
  pers_Id						INT NOT NULL,
  pena_DireccionExacta			NVARCHAR(200) NOT NULL,
  ciud_Id						INT NOT NULL,
  pena_TelefonoFijo				NVARCHAR(20),
  pena_TelefonoCelular			NVARCHAR(20),
  pena_CorreoElectronico		NVARCHAR(50) NOT NULL,
  pena_CorreoAlternativo		NVARCHAR(50),
  pena_RTN						VARCHAR(20) NOT NULL,
  pena_ArchivoRTN				NVARCHAR(MAX) NOT NULL,
  pena_DNI						VARCHAR(20) NOT NULL,
  pena_ArchivoDNI				NVARCHAR(MAX) NOT NULL,
  pena_NumeroRecibo				VARCHAR(100) NOT NULL,
  pena_ArchivoNumeroRecibo		NVARCHAR(MAX) NOT NULL,
  
  usua_UsuarioCreacion       INT            NOT NULL,
  pena_FechaCreacion         DATETIME       DEFAULT GETDATE(),
  usua_UsuarioModificacion   INT			NOT NULL,
  pena_FechaModificacion     DATETIME	    NULL,
  pena_Estado                BIT			DEFAULT 1,

  CONSTRAINT PK_Adua_tbPersonaNatural_pena_Id PRIMARY KEY (pena_Id),
  
  CONSTRAINT FK_Adua_PersonaNatural_pers_Id_Adua_Persona_pers_Id FOREIGN KEY (pers_Id) REFERENCES Adua.tbPersonas(pers_Id),
  CONSTRAINT FK_Adua_PersonaNatural_ciud_Id_Gral_Ciudades FOREIGN KEY (ciud_Id) REFERENCES Gral.tbCiudades(ciud_Id),
 
  CONSTRAINT FK_Adua_PersonaNatural_pena_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
  CONSTRAINT FK_Adua_PersonaNatural_pena_UsuarioModificacion_Acce_tbUsuarios_usua_Id	    FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Adua.tbPersonaJuridica (
  peju_Id							  INT IDENTITY(1,1) ,
  pers_Id							  INT NOT NULL,
  peju_EstadoRepresentante			  INT NOT NULL,
  colo_Id							  INT NOT NULL,
  peju_PuntoReferencia				  NVARCHAR(200) NOT NULL,
  peju_ColoniaRepresentante			  INT NOT NULL,
  peju_NumeroLocalReprentante		  NVARCHAR(200) NOT NULL,
  peju_PuntoReferenciaReprentante	  NVARCHAR(200) NOT NULL,
  peju_TelefonoEmpresa				  NVARCHAR(200) NOT NULL,
  peju_TelefonoFijoRepresentanteLegal NVARCHAR(200) NOT NULL,
  peju_TelefonoRepresentanteLegal	  NVARCHAR(200) NOT NULL,
  peju_CorreoElectronico              NVARCHAR(200) NOT NULL,
  peju_CorreoElectronicoAlternativo   NVARCHAR(200) NOT NULL,
  peju_Rtn_sociedad_mercantil		  NVARCHAR(200) NOT NULL,
  peju_Rtn_representante_legal        NVARCHAR(200) NOT NULL,
  peju_Documento_identidad_representante NVARCHAR(200) NOT NULL,
  peju_escritura_constitucional_modificaciones NVARCHAR(200) NOT NULL,
  
  usua_UsuarioCreacion       INT            NOT NULL,
  peju_FechaCreacion         DATETIME       DEFAULT GETDATE(),
  usua_UsuarioModificacion   INT			NOT NULL,
  peju_FechaModificacion     DATETIME	    NULL,
  peju_Estado                BIT			DEFAULT 1,

  CONSTRAINT PK_Adua_tbPersonaJuridica_peju_Id PRIMARY KEY (peju_Id),
  CONSTRAINT FK_Adua_PersonaJuridica_pers_Id_Adua_Personas_pers_Id                               FOREIGN KEY (pers_Id) REFERENCES Adua.tbPersonas(pers_Id),
  CONSTRAINT FK_Adua_PersonaJuridica_peju_EstadoRepresentante_Gral_tbProvincias_pvin_Id          FOREIGN KEY (peju_EstadoRepresentante) REFERENCES Gral.tbProvincias(pvin_Id),
  CONSTRAINT FK_Adua_PersonaJuridica_colo_Id_Gral_Colonia_colo_Id                                FOREIGN KEY (colo_Id) REFERENCES Gral.tbColonias(colo_Id),
  CONSTRAINT FK_Adua_PersonaJuridica_peju_ColoniaRepresentante_Gral_ColoniaRepresentante_colo_Id FOREIGN KEY (peju_ColoniaRepresentante) REFERENCES Gral.tbColonias(colo_Id),
  
  CONSTRAINT FK_Adua_PersonaJuridica_peju_UsuarioCreacion_Acce_tbUsuarios_usua_Id			  	 FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
  CONSTRAINT FK_Adua_PersonaJuridica_peju_UsuarioModificacion_Acce_tbUsuarios_usua_Id		     FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);

GO
-----------------------------------------------------------


--**********************************************************--
--*******************  PRODUCCION **************************--
--**********************************************************--

------------------Orden de Servicio---------------------------

CREATE TABLE Prod.tbOrdenCompra(
	orco_Id						INT IDENTITY(1,1),
	orco_IdCliente				INT NOT NULL,
	orco_FechaEmision			DATETIME NOT NULL,
	orco_FechaLimite			DATETIME NOT NULL,
	orco_MetodoPago 			INT NOT NULL,
	orco_Materiales				BIT NOT NULL,
	orco_IdEmbalaje 			INT NOT NULL,
	orco_EstadoOrdenCompra		CHAR(1) NOT NULL,
	orco_DireccionEntrega		NVARCHAR(250)NOT NULL,
	
	usua_UsuarioCreacion       INT            NOT NULL,
	orco_FechaCreacion         DATETIME       DEFAULT GETDATE(),
	usua_UsuarioModificacion   INT			 NOT NULL,
	orco_FechaModificacion     DATETIME	     NULL,
	orco_Estado                BIT			 DEFAULT 1,

	CONSTRAINT PK_Prod_tbOrdenCompra_orco_Id PRIMARY KEY(orco_Id),
	CONSTRAINT FK_Prod_tbOrdenCompra_orco_IdCliente_Prod_tbClientes_clie_Id              FOREIGN KEY(orco_IdCliente)  REFERENCES	Prod.tbClientes(clie_Id),
	CONSTRAINT FK_Prod_tbOrdenCompra_orco_MetodoPago_Gral_tbFormasPago_mepa_Id           FOREIGN KEY(orco_MetodoPago) REFERENCES	Adua.tbFormasdePago(fopa_Id),
	CONSTRAINT FK_Prod_tbOrdenCompra_orco_IdEmbalaje_Prod_tbTipoEmbalaje_emba_Id         FOREIGN KEY(orco_IdEmbalaje) REFERENCES	Prod.tbTipoEmbalaje(tiem_Id),
	
	CONSTRAINT FK_Prod_tbOrdenCompra_orco_UsuarioCreacion_Acce_tbUsuarios_usua_Id					FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbOrdenCompra_orco_UsuarioModificacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

CREATE TABLE Prod.tbTallas(
	tall_Id 			CHAR(5),
	tall_Nombre			NVARCHAR(200)		NOT NULL,
	
	usua_UsuarioCreacion       INT            NOT NULL,
	tall_FechaCreacion         DATETIME       DEFAULT GETDATE(),
	usua_UsuarioModificacion   INT			  NOT NULL,
	tall_FechaModificacion     DATETIME	      NULL,
	tall_Estado                BIT			  DEFAULT 1,

	CONSTRAINT PK_Prod_tbTalla_tall_Id PRIMARY KEY (tall_Id),
	CONSTRAINT FK_Prod_tbOrdenCompra_tall_UsuarioCreacion_Acce_tbUsuarios_usua_Id					FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbOrdenCompra_tall_UsuarioModificacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
)
GO

CREATE TABLE Prod.tbOrdenCompraDetalles(
	code_Id						INT IDENTITY(1,1),
	orco_Id						INT NOT NULL,
	code_CantidadPrenda			INT NOT NULL,
	mode_Id						INT NOT NULL,
	tall_Id						CHAR(5) NOT NULL,
	code_Sexo					CHAR(1) NOT NULL,
	colo_Id						INT NOT NULL,
	code_Documento				NVARCHAR(250)NOT NULL,
	code_Medidas				NVARCHAR(250)NOT NULL,
	proc_Id						INT NOT NULL,
	code_Unidad					DECIMAL(18,2) NOT NULL,
	code_Valor					DECIMAL(18,2)NOT NULL,
	code_Impuesto				DECIMAL(18,2)NOT NULL,
	code_Descuento				DECIMAL(18,2)NOT NULL,
	code_EspecificacionEmbalaje	NVARCHAR(200)NOT NULL,
	
	usua_UsuarioCreacion       INT            NOT NULL,
	code_FechaCreacion         DATETIME       DEFAULT GETDATE(),
	usua_UsuarioModificacion   INT			  NOT NULL,
	code_FechaModificacion     DATETIME	      NULL,
	code_Estado                BIT			  DEFAULT 1,
	
	CONSTRAINT PK_Prod_tbOrdenCompraDetalles_code_Id PRIMARY KEY(code_Id),
	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_orco_Id_Prod_tbOrdenCompra_orco_Id  FOREIGN KEY(orco_Id) REFERENCES Prod.tbOrdenCompra(orco_Id),
	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_mode_Id_Prod_tbModelo_mode_Id       FOREIGN KEY(mode_Id) REFERENCES Prod.tbModelos(mode_Id),
	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_colo_Id_Prod_tbColores_colo_Id	     FOREIGN KEY (colo_Id) REFERENCES Prod.tbColores(colo_Id),
	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_tall_Id_Prod_tbTalla_mode_Id        FOREIGN KEY(tall_Id) REFERENCES Prod.tbTallas(tall_Id),
	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_proc_Id_Prod_tbProcesos_proc_Id     FOREIGN KEY(proc_Id) REFERENCES Prod.tbProcesos(proc_Id),
	CONSTRAINT CK_Prod_tbOrdenCompraDetalles_code_Sexo							 CHECK (code_Sexo IN ('F','M')),

	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_code_UsuarioCreacion_Acce_tbUsuarios_usua_Id					FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_code_UsuarioModificacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO


CREATE TABLE Prod.tbMaterialesBrindar(
	mabr_Id					INT IDENTITY(1,1),
	code_Id					INT NOT NULL,
	mate_Id					INT NOT NULL,
	mabr_Cantidad			INT NOT NULL,
	
	usua_UsuarioCreacion       INT            NOT NULL,
	mabr_FechaCreacion         DATETIME       DEFAULT GETDATE(),
	usua_UsuarioModificacion   INT			  NOT NULL,
	mabr_FechaModificacion     DATETIME	      NULL,
	mabr_Estado                BIT			  DEFAULT 1,

	CONSTRAINT PK_Prod_tbMaterialesBrindar_mabr_Id PRIMARY KEY(mabr_Id),
	CONSTRAINT FK_Prod_tbtbMaterialesBrindar_code_Id_Prod_tbOrdenCompraDetalles_code_Id 			FOREIGN KEY(code_Id) REFERENCES  Prod.tbOrdenCompraDetalles(code_Id),
	CONSTRAINT FK_Prod_tbOrdenCompraDetalles_mate_Id_Prod_tbMateriales_mate_Id 						FOREIGN KEY(mate_Id) REFERENCES  Prod.tbMateriales(mate_Id),
	
	CONSTRAINT FK_Prod_tbMaterialesBrindar_mabr_UsuarioCreacion_Acce_tbUsuarios_usua_Id         	FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbMaterialesBrindar_mabr_UsuarioModificacion_Acce_tbUsuarios_code_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),

)
GO


CREATE TABLE Prod.tbModulos(
	modu_Id					INT IDENTITY(1,1),
	modu_Nombre				NVARCHAR(150) NOT NULL,
	proc_Id					INT NOT NULL,
	empr_Id 				INT NOT NULL,
	
	usua_UsuarioCreacion       INT            NOT NULL,
	modu_FechaCreacion         DATETIME       DEFAULT GETDATE(),
	usua_UsuarioModificacion   INT			  NOT NULL,
	modu_FechaModificacion     DATETIME	      NULL,
	modu_Estado                BIT			  DEFAULT 1,

	CONSTRAINT PK_Prod_tbModulos_modu_Id 									 PRIMARY KEY (modu_Id),
	CONSTRAINT FK_Prod_tbModulos_proc_Id_Prod_tbProcesos_proc_Id 			 FOREIGN KEY (proc_Id) REFERENCES Prod.tbProcesos(proc_Id),
	CONSTRAINT FK_Prod_tbModulos_empr_Id_Gral_tbEmpleados_empe_IdSupervisor  FOREIGN KEY (empr_Id) REFERENCES Gral.tbEmpleados(empl_Id),
	
	CONSTRAINT FK_Prod_tbModulos_modu_UsuarioCreacion_Acce_tbUsuarios_usua_Id				FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbModulos_modu_UsuarioModificacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO	


--Secciom #5
CREATE TABLE Prod.tbMaquinas(
	 maqu_Id					INT IDENTITY(1,1),
	 maqu_NumeroSerie			NVARCHAR(100),
	 mode_Id					INT NOT NULL,

	 usua_UsuarioCreacion		INT NOT NULL,
	 maqu_FechaCreacion			DATETIME	DEFAULT GETDATE(),
	 usua_UsuarioModificacion	INT,
	 maqu_FechaModificacion		DATETIME,
	 maqu_Estado				BIT			DEFAULT 1
	
	CONSTRAINT PK_Prod_tbMaquinas_maqu_Id										PRIMARY KEY (maqu_Id),
	CONSTRAINT FK_Prod_tbMaquinas_Prod_tbModelos_mode_Id						FOREIGN KEY (mode_Id) REFERENCES Prod.tbModelos(mode_Id),
	CONSTRAINT FK_Prod_tbMaquinas_usua_UsuarioCreacion_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbMaquinas_usua_UsuarioModificacion_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

------------------Planificación y programación----------------

CREATE TABLE Prod.tbMarcasMaquina(
	 marq_Id						INT IDENTITY(1,1),
	 marq_Nombre					NVARCHAR(250)NOT NULL,

	 usua_UsuarioCreacion			INT NOT NULL,
	 marq_FechaCreacion				DATETIME	DEFAULT GETDATE(),
	 usua_UsuarioModificacion		INT,
	 marq_FechaModificacion			DATETIME,
	 marq_Estado					BIT			DEFAULT 1
	
	CONSTRAINT PK_Prod_tbMarcasMaquina_marq_Id 										PRIMARY KEY (marq_Id),
	CONSTRAINT FK_Prod_tbMarcasMaquina_usua_UsuarioCreacion_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)     	REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbMarcasMaquina_usua_UsuarioModificacion_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id),

)
GO

CREATE TABLE Prod.tbMaquinasModulos(
	 moma_Id						INT IDENTITY(1,1),
	 modu_Id						INT NOT NULL,
	 maqu_Id						INT NOT NULL,

	 usua_UsuarioCreacion		INT NOT NULL,
	 moma_FechaCreacion			DATETIME	DEFAULT GETDATE(),
	 usua_UsuarioModificacion	INT,
	 moma_FechaModificacion		DATETIME,
	 maqu_Estado				BIT			DEFAULT 1

	CONSTRAINT PK_Prod_tbMaquinasModulos_moma_Id 									PRIMARY KEY(moma_Id),
	CONSTRAINT FK_Prod_tbMaquinasModulos_Prod_tbModulos_modu_Id 					FOREIGN KEY(modu_Id) 					REFERENCES Prod.tbModulos(modu_Id),
	CONSTRAINT FK_Prod_tbMaquinasModulos_Prod_tbMaquinas_maqu_Id 					FOREIGN KEY(maqu_Id) 					REFERENCES Prod.tbMaquinas(maqu_Id),
	CONSTRAINT FK_Prod_tbMaquinasModulos_tbUsuarios_moma_UsuaCrea					FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbMaquinasModulos_tbUsuarios_moma_UsuModificacion			FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id),

)
GO


CREATE TABLE Prod.tbMaquinaHistorial(
	mahi_Id						INT IDENTITY(1,1),
	maqu_Id						INT NOT NULL,
	mahi_FechaInicio			DATETIME NOT NULL,
	mahi_FechaFin				DATETIME NOT NULL,
	mahi_Observaciones			NVARCHAR(250)NOT NULL,

	usua_UsuarioCreacion		INT NOT NULL,
	mahi_FechaCreacion			DATETIME NOT NULL,
	usua_UsuarioModificacion	INT,
	mahi_FechaModificacion		DATETIME,
	mahi_Estado					BIT DEFAULT 1,

	CONSTRAINT PK_Prod_tbMaquinaHistorial_mahi_Id								PRIMARY KEY(mahi_Id),
	CONSTRAINT FK_Prod_tbMaquinaHistorial_Prod_tbMaquinas_maqu_Id				FOREIGN KEY(maqu_Id) REFERENCES Prod.tbMaquinas(maqu_Id),
	CONSTRAINT FK_Prod_tbMaquinaHistorial_tbUsuarios_mahi_UsuaCrea				FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbMaquinaHistorial_tbUsuarios_mahi_UsuModificacion		FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id)
)
GO

CREATE TABLE Prod.tbModelosMaquina(
	mmaq_Id						INT IDENTITY(1,1),
	mmaq_Nombre					NVARCHAR(250)NOT NULL,
	marq_Id						INT NOT NULL,
	func_Id						INT NOT NULL,
	momq_Imagen					NVARCHAR(MAX)NOT NULL,

	usua_UsuarioCreacion		INT NOT NULL,
	mmaq_FechaCreacion			DATETIME NOT NULL,
	usua_UsuarioModificacion	INT,
	mmaq_FechaModificacion		DATETIME,
	mmaq_Estado					BIT DEFAULT 1,
	
	CONSTRAINT PK_Prod_tbModelosMaquina_mmaq_Id 								PRIMARY KEY(mmaq_Id),
	CONSTRAINT FK_Prod_tbModelosMaquina_Prod_tbMarcasMaquina_marq_Id 			FOREIGN KEY(mmaq_Id) 				REFERENCES Prod.tbMarcasMaquina(marq_Id),
	CONSTRAINT FK_Prod_tbModelosMaquina_Prod_tbFunciones_func_Id 				FOREIGN KEY(func_Id) 				REFERENCES Prod.tbFuncionesMaquina(func_Id),
	CONSTRAINT FK_Prod_tbModelosMaquina_tbUsuarios_usua_UsuaCreaciaon			FOREIGN KEY (usua_UsuarioCreacion)     	REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbModelosMaquina_tbUsuarios_usua_UsuaModificacion		FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id),

);
GO

CREATE TABLE Prod.tbAsignacionesOrden(
	asor_Id				INT IDENTITY(1,1),
	asor_OrdenDetId		INT			NOT NULL,
	asor_FechaInicio	DATETIME	NOT NULL,
	asor_FechaLimite	DATETIME	NOT NULL,
	asor_EstadoDet		NVARCHAR	NOT NULL,

	usua_UsuarioCreacion		INT			NOT NULL,
	asor_FechaCreacion			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT ,
	asor_FechaModificacion		DATETIME ,
	asor_Estado					BIT DEFAULT 1

	CONSTRAINT PK_Prod_tbAsignacionesOrden_asor_Id								PRIMARY KEY (asor_Id)
	CONSTRAINT FK_Prod_tbAsignacionesOrden_tbUsuarios_asor_UsuCrea				FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbAsignacionesOrden_tbUsuarios_asor_UsuModifica			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),

);
GO
CREATE TABLE Prod.tbLotes(
			lote_Id   			INT IDENTITY(1,1),
			mate_Id				INT,
			lote_Stock  		INT,
			lote_CantIngresada	INT,
			tipa_Id				INT,
			lote_Est			BIT,

			usua_UsuarioCreacion			INT					NOT NULL,
			lote_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
			usua_UsuarioModificacion 	INT 			,
			lote_FechaModificacion		DATETIME		, 
			lote_Estado 				BIT					NOT NULL DEFAULT 1, 

		CONSTRAINT PK_Prod_tbLotes_lote_Id PRIMARY KEY (lote_Id),
		CONSTRAINT FK_Prod_tbLotes_mate_Id_Prod_tbMateriales_mate_Id	FOREIGN KEY (mate_Id) 					REFERENCES Prod.tbMateriales(mate_Id),
		CONSTRAINT FK_Prod_tbLotes_tipa_Id_Prod_tbTipoArea_tipa_Id		FOREIGN KEY (tipa_Id) 					REFERENCES Prod.tbArea(tipa_Id),
		CONSTRAINT FK_Prod_tbLotes_tbUsuarios_lote_UsuCrea				FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
		CONSTRAINT FK_Prod_tbLotes_tbUsuarios_lote_UsuModifica			FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),
);


GO
CREATE TABLE Prod.tbAsignacionesModuloDetalle(
	amod_Id					INT  IDENTITY(1,1), 
	modu_Id					INT NOT NULL, 
	asor_Id					INT NOT NULL, 
	amod_OrdenCantModulo	INT NOT NULL, 
	lote_Id					INT NOT NULL, 
	asor_Cantidad			INT NOT NULL, 
	amod_EstadoA			NVARCHAR(15),	
	
	usua_UsuarioCreacion		INT, 
	amod_FechaCreacion			DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion	INT, 
	amod_FechaModificacion		DATETIME,
	amod_Estado					BIT DEFAULT 1 

	CONSTRAINT PK_Prod_tbAsignacionesModuloDetalle_amod_Id								PRIMARY KEY (amod_Id)
	CONSTRAINT FK_Prod_tbAsignacionesModuloDetalle_tbModulos_modu_Id					FOREIGN KEY (modu_Id)				   REFERENCES Prod.tbModulos (modu_Id),
	CONSTRAINT FK_Prod_tbAsignacionesModuloDetalle_tbAsignacionesOrden_asor_Id			FOREIGN KEY (asor_Id)				   REFERENCES Prod.tbAsignacionesOrden (asor_Id),
	CONSTRAINT FK_Prod_tbAsignacionesModuloDetalle_tbLotes_lote_Id						FOREIGN KEY (lote_Id)				   REFERENCES Prod.tbLotes (lote_Id),
	CONSTRAINT FK_Prod_tbAsignacionesModuloDetalle_tbUsuarios_amod_UsuCrea				FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbAsignacionesModuloDetalle_tbUsuarios_amod_UsuModifica			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),


);

CREATE TABLE Prod.tbReporteModuloDia(
	remo_Id				INT  IDENTITY(1,1),
	modu_Id				INT  NOT NULL, 
	remo_Fecha			DATE NOT NULL,
	remo_TotalDia		INT  NOT NULL, 
	remo_TotalDanado	INT  NOT NULL,
	
	usua_UsuarioCreacion		INT  NOT NULL, 
	remo_FechaCreacion			DATETIME DEFAULT GETDATE(), 
	usua_UsuarioModificacion	INT, 
	remo_FechaModificacion		DATETIME, 
	remo_Estado					BIT DEFAULT 1 

	CONSTRAINT PK_Prod_tbReporteModuloDia_remo_Id								PRIMARY KEY (remo_Id)
	CONSTRAINT FK_Prod_tbReporteModuloDia_tbModulos_modu_Id						FOREIGN KEY (modu_Id)				   REFERENCES Prod.tbModulos (modu_Id),
	CONSTRAINT FK_Prod_tbReporteModuloDia_tbUsuarios_remo_UsuCrea				FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbReporteModuloDia_tbUsuarios_remo_UsuModifica			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);

CREATE TABLE Prod.tbReporteModuloDiaDetalle(
	rdet_Id 			INT  IDENTITY(1,1),
	remo_Id 			INT NOT NULL,
	rdet_TotalDia		INT NOT NULL,
	rdet_TotalDanado	INT NOT NULL,

	usua_UsuarioCreacion	INT NOT NULL,
	rdet_FechaCreacion		DATETIME DEFAULT GETDATE(),  
	usua_UsuarioModificacion	INT,
	rdet_FechaModificacion		DATETIME, 
	rdet_Estado			BIT DEFAULT 1  

	CONSTRAINT PK_Prod_tbReporteModuloDiaDetalle_rdet_Id							PRIMARY KEY (rdet_Id)
	CONSTRAINT FK_Prod_tbReporteModuloDiaDetalle_tbReporteModuloDia_remo_Id				FOREIGN KEY (remo_Id)		   REFERENCES Prod.tbReporteModuloDia (remo_Id),
	CONSTRAINT FK_Prod_tbReporteModuloDiaDetalle_tbUsuarios_rdet_UsuCrea			    FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbReporteModuloDiaDetalle_tbUsuarios_rdet_UsuModifica			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

--------------------- Multimuncional -----------------------


-----------------Adquisicion de material--------------------


---- DUCA ----
CREATE TABLE Adua.tbTransporte(
	tran_Id							INT IDENTITY(1,1),
	pais_Id							CHAR(2),
	tran_Chasis						NVARCHAR(100) NOT NULL,
	marca_Id						INT NOT NULL,
	tran_IdRemolque					NVARCHAR(50) NULL,
	tran_CantCarga					INT NOT NULL,
	tran_NumDispositivoSeguridad	INT NULL,
	tran_Equipamiento				NVARCHAR(200) NULL,
	tran_TipoCarga					NVARCHAR(200) NOT NULL,
	tran_IdContenedor				NVARCHAR(100) NOT NULL,

	usua_UsuarioCreacio				INT	NOT NULL,
	tran_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion		INT,
	tran_FechaModificacion			DATETIME, 
	tran_Estado 					BIT	NOT NULL DEFAULT 1

	CONSTRAINT PK_Adua_tbTransporte_tran_Id PRIMARY KEY(tran_Id),
	CONSTRAINT FK_Prod_tbTransporte_tbUsuarios_tran_UsuCrea			FOREIGN KEY (usua_UsuarioCreacio)		REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Prod_tbTransporte_tbUsuarios_tran_UsuModifica		FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Gral_tbPaises_pais_Id_Adua_tbTransporte_pais_Id 	FOREIGN KEY (pais_Id)					REFERENCES Gral.tbPaises(pais_Codigo)
	
);

CREATE TABLE Adua.tbConductor(
	cont_Id				INT IDENTITY(1,1),
	cont_Nombre			NVARCHAR(200) NOT NULL,
	cont_Apellido		NVARCHAR(200) NOT NULL,
	cont_Licencia		NVARCHAR(50) NOT NULL,
	pais_IdExpedicion	INT,
	tran_Id				INT NOT NULL,


	usua_UsuarioCreacion		INT	NOT NULL,
	cont_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT,
	cont_FechaModificacion		DATETIME, 
	cont_Estado 				BIT	NOT NULL DEFAULT 1

	CONSTRAINT PK_Adua_tbConductor_cont_Id PRIMARY KEY(cont_Id),
	CONSTRAINT FK_Prod_tbConductor_tbUsuarios_cont_UsuCrea			FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Prod_tbConductor_tbUsuarios_cont_UsuModifica		FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios 	(usua_Id),
	--CONSTRAINT FK_Gral_tbPaises_pais_Id_Adua_tbConductor_pais_IdExpedicion FOREIGN KEY (pais_IdExpedicion) REFERENCES Gral.tbPaises(pais_Id),
	CONSTRAINT FK_Adua_tbTransporte_tran_Id_Adua_tbConductor_tran_Id FOREIGN KEY (tran_Id) REFERENCES Adua.tbTransporte(tran_Id)
);
GO


CREATE TABLE Prod.tbPedidosProduccion(
   		ppro_Id              INT IDENTITY(1,1),
   		empr_Id              INT NOT NULL,
   		ppro_Fecha           DATETIME NOT NULL,
   		ppro_Estados          NVARCHAR(150) NOT NULL,
   		ppro_Observaciones   NVARCHAR(MAX) NOT NULL,

   		usua_UsuarioCreacion			INT NOT NULL,
   		ppro_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
   		usua_UsuarioModificacion		INT,
   		ppro_FechaModificacion			DATETIME,
   		ppro_Estado						BIT NOT NULL DEFAULT 1

   	CONSTRAINT PK_prod_tbPedidosProduccion PRIMARY KEY (ppro_Id),
   	CONSTRAINT FK_prod_tbPedidosProduccion_Prod_tbEmpleadosProduccion_empr_Id 	FOREIGN KEY (empr_Id)					REFERENCES Gral.tbEmpleados(empl_Id),
	CONSTRAINT FK_Prod_tbPedidosProduccion_tbUsuarios_ppro_UsuCrea				FOREIGN KEY (usua_UsuarioCreacion)     	REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbPedidosProduccion_tbUsuarios_ppro_UsuModifica			FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id),   
);
GO


--CREATE TABLE Prod.tbOrdenCorte_Ensamblado_Acabado_Etiquetado(
CREATE TABLE Prod.tbOrde_Ensa_Acab_Etiq(
	ensa_Id				INT  IDENTITY(1,1),
	ensa_Cantidad		INT NOT NULL,
	empr_Id				INT NOT NULL,
	amod_Id				INT NOT NULL,
	code_Id				INT NOT NULL,
	ensa_FechaInicio	DATE NOT NULL,
	ensa_FechaLimite	DATE NOT NULL, 
	ppro_Id				INT NOT NULL,

	usua_UsurioCreacion			INT NOT NULL,
	ensa_FechaCreacion			DATETIME DEFAULT GETDATE(), 
	usua_UsuarioModificacion	INT,
	ensa_FechaModificacion		DATETIME, 
	ensa_Estado					BIT DEFAULT 1  

	CONSTRAINT PK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_orde_Id								PRIMARY KEY (ensa_Id)
	CONSTRAINT FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_tbEmpleados_empr_Id					FOREIGN KEY (empr_Id)					REFERENCES Gral.tbEmpleados					(empl_Id),
	CONSTRAINT FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_tbAsignacionesModuloDetalle_amod_Id	FOREIGN KEY (amod_Id)					REFERENCES Prod.tbAsignacionesModuloDetalle (amod_Id),
	CONSTRAINT FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_tbOrdenCompraDetalle_code_Id			FOREIGN KEY (code_Id)					REFERENCES Prod.tbOrdenCompraDetalles		(code_Id),
	CONSTRAINT FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_tbPedidoProduccion_ppro_Id			FOREIGN KEY (ppro_Id)					REFERENCES Prod.tbPedidosProduccion			(ppro_Id),
	CONSTRAINT FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_tbUsuario_orde_UsuarioCreacion		FOREIGN KEY (usua_UsurioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_tbUsuario_orde_UsuarioModificacion	FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),


);
GO

CREATE TABLE Prod.tbPedidosProduccionDetalles(
		ppde_Id               INT IDENTITY(1,1),
		ppro_Id               INT NOT NULL,
		lote_Id               INT NOT NULL,
		ppde_Cantidad         INT NOT NULL,

		usua_UsuarioCreacion			INT NOT NULL,
		ppde_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion		INT,
		ppde_FechaModificacion			DATETIME,
		ppde_Estado						BIT NOT NULL DEFAULT 1
	CONSTRAINT PK_Prod_tbPedidosProduccionDetalle PRIMARY KEY (ppde_Id),
	CONSTRAINT FK_Prod_tbPedidosProduccionDetalle_ppro_Id_Prod_tbPedidosProduccion FOREIGN KEY (ppro_Id) REFERENCES Prod.tbPedidosProduccion(ppro_Id),
	CONSTRAINT FK_Prod_tbPedidosProduccionDetalle_lote_Id_Prod_tbLotes FOREIGN KEY (lote_Id) REFERENCES Prod.tbLotes(lote_Id),
	CONSTRAINT FK_Prod_tbPedidosProduccion_tbUsuarios_ppde_UsuCrea				FOREIGN KEY (usua_UsuarioCreacion)     	REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbPedidosProduccion_tbUsuarios_ppde_UsuModifica			FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id), 
);
GO



CREATE TABLE Adua.tbDuca(
	duca_No_Duca					NVARCHAR(100),
	duca_No_Correlativo_Referencia	NVARCHAR(MAX) NOT NULL,
	deva_Id							INT NOT NULL,
	duca_AduanaRegistro				INT NOT NULL,
	duca_AduanaSalida				INT NOT NULL,
	duca_DomicilioFiscal_Exportador NVARCHAR(MAX) NOT NULL,
	duca_Tipo_Iden_Exportador		NVARCHAR(100) NOT NULL,
	duca_Pais_Emision_Exportador	CHAR(2) NOT NULL,
	duca_Numero_Id_Importador		NVARCHAR(100) NOT NULL,
	duca_Pais_Emision_Importador	CHAR(2) NOT NULL,
	duca_DomicilioFiscal_Importador NVARCHAR(MAX) NOT NULL,
	duca_Regimen_Aduanero			NVARCHAR(MAX) NOT NULL,
	duca_Modalidad					NVARCHAR(MAX) NOT NULL,
	duca_Clase						NVARCHAR(MAX) NOT NULL,
	duca_Codigo_Declarante			NVARCHAR(200) NOT NULL,
	duca_Numero_Id_Declarante		NVARCHAR(200) NOT NULL,
	duca_NombreSocial_Declarante	NVARCHAR(MAX) NOT NULL,
	duca_DomicilioFiscal_Declarante NVARCHAR(MAX) NOT NULL,
	duca_Pais_Procedencia			CHAR(2) NOT NULL,
	duca_Pais_Exportacion			CHAR(2) NOT NULL,
	duca_Pais_Destino				CHAR(2) NOT NULL,
	duca_Deposito_Aduanero			NVARCHAR(MAX) NOT NULL,
	duca_Lugar_Embarque				NVARCHAR(MAX) NOT NULL,
	duca_Lugar_Desembarque			NVARCHAR(MAX) NOT NULL,
	duca_Manifiesto					NVARCHAR(MAX) NOT NULL,
	duca_Titulo						NVARCHAR(MAX) NOT NULL,
	duca_Codigo_Transportista		NVARCHAR(200) NULL,
	duca_Tipo_Transportista			NVARCHAR(200) NULL,
	duca_Transportista_Nombre		NVARCHAR(MAX) NULL,
	duca_Conductor_Id				INT NULL,
	duca_Codigo_Tipo_Documento		CHAR(3) NOT NULL,


	usua_UsuarioCreacion			INT	NOT NULL,
	duca_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion		INT,
	duca_FechaModificacion			DATETIME, 
	duca_Estado 					BIT	NOT NULL DEFAULT 1
	
	CONSTRAINT PK_Adua_tbDuca_duca_No_Duca PRIMARY KEY(duca_No_Duca),
	CONSTRAINT FK_Adua_tbConductor_cont_Id_Adua_tbDuca_duca_Id                 	FOREIGN KEY(duca_Conductor_Id) 		REFERENCES Adua.tbConductor(cont_Id),
	CONSTRAINT FK_Adua_tbDuca_duca_Pais_Procedencia_tbPaises_pais_codigo		FOREIGN KEY(duca_Pais_Procedencia) 	REFERENCES Gral.tbPaises (pais_Codigo),
	CONSTRAINT FK_Adua_tbDuca_duca_Pais_Exportacion_tbPaises_pais_codigo		FOREIGN KEY(duca_Pais_Exportacion) 	REFERENCES Gral.tbPaises (pais_Codigo),
	CONSTRAINT FK_Adua_tbDuca_duca_Pais_Destino_tbPaises_pais_codigo			FOREIGN KEY(duca_Pais_Destino) 		REFERENCES Gral.tbPaises (pais_Codigo),
	CONSTRAINT FK_Adua_tbDuca_duca_Pais_Emision_Exportador_tbPaises_pais_codigo	FOREIGN KEY(duca_Pais_Emision_Exportador) 		REFERENCES Gral.tbPaises (pais_Codigo),
	CONSTRAINT FK_Adua_tbDuca_duca_Pais_Emision_Importador_tbPaises_pais_codigo	FOREIGN KEY(duca_Pais_Emision_Importador) 		REFERENCES Gral.tbPaises (pais_Codigo),
	CONSTRAINT FK_Adua_tbDeclaraciones_Valor_deva_Id_Adua_tbDeclaraciondeValor 	FOREIGN KEY (deva_Id) 				REFERENCES Adua.tbDeclaraciones_Valor(deva_Id),
	CONSTRAINT FK_Adua_tbDuca_tbUsuarios_duca_UsuCrea			               	FOREIGN KEY (usua_UsuarioCreacion)     		REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Prod_tbDuca_tbUsuarios_duca_UsuModifica		               	FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios 	(usua_Id)
);


GO



CREATE TABLE Prod.tbPedidosOrden(
			peor_Id   					INT IDENTITY(1,1),
			prov_Id						INT,
			peor_No_Duca				NVARCHAR(100)		NOT NULL,
			peor_FechaEntrada			DATETIME,
			peor_Obsevaciones			NVARCHAR(400),
			peor_DadoCliente			BIT,
			peor_Est					BIT,
			usua_UsuarioCreacion		INT					NOT NULL,
			peor_FechaCreacion			DATETIME			NOT NULL DEFAULT GETDATE(),
			usua_UsuarioModificacion 	INT,
			peor_FechaModificacion		DATETIME, 
			peor_Estado 				BIT					NOT NULL DEFAULT 1 

		CONSTRAINT PK_Prod_tbPedidosOrden_peor_Id PRIMARY KEY (peor_Id),
		CONSTRAINT FK_Prod_tbPedidosOrden_prov_Id_Prod_tbProveedores_prov_Id 			FOREIGN KEY (prov_Id)			REFERENCES Gral.tbProveedores(prov_Id),
		CONSTRAINT FK_Prod_tbPedidosOrden_tbUsuarios_peor_UsuarioCreacion				FOREIGN KEY (usua_UsuarioCreacion)     	REFERENCES Acce.tbUsuarios (usua_Id),
		CONSTRAINT FK_Prod_tbPedidosOrden_tbUsuarios_peor_UsuarioModificacion			FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id),
		CONSTRAINT FK_Prod_tbPedidosOrden_tbDuca_peor_No_Duca							FOREIGN KEY(peor_No_Duca)		REFERENCES Adua.tbDuca(duca_No_Duca)
);
GO


CREATE TABLE Prod.tbPedidosOrdenDetalle(
  		prod_Id							INT IDENTITY(1,1),
  		pedi_Id							INT NOT NULL,
  		mate_Id							INT NOT NULL,
  		prod_Cantidad					INT NOT NULL,
  		prod_Precio						DECIMAL(18,2) NOT NULL,
  		prod_Peso						DECIMAL(18,2) NOT NULL,
		usua_UsuarioCreacion			INT NOT NULL,
		prod_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion		INT,
		prod_FechaModificacion			DATETIME,
		prod_Estado						BIT NOT NULL DEFAULT 1
	CONSTRAINT PK_Prod_tbPedidosOrdenDetalle_prod_Id PRIMARY KEY (prod_Id),
	CONSTRAINT FK_Prod_tbPedidosOrdenDetalle_pedi_Id_Pro_tbPedidos		FOREIGN KEY (pedi_Id)	REFERENCES Prod.tbPedidosOrden(peor_Id),
	CONSTRAINT FK_Prod_tbPedidosOrdenDetalle_mate_Id_Pro_tbMateriales	FOREIGN KEY (mate_Id)	REFERENCES Prod.tbMateriales(mate_Id),
	CONSTRAINT FK_Prod_tbPedidosOrdenDetalle_tbUsuarios_prod_UsuarioCreacion					FOREIGN KEY (usua_UsuarioCreacion)     	REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Prod_tbPedidosOrdenDetalle_tbUsuarios_prod_UsuarioModificacion				FOREIGN KEY (usua_UsuarioModificacion) 	REFERENCES Acce.tbUsuarios (usua_Id),
);


-----------------Inspeccion-------------------

CREATE TABLE Prod.tbRevisionDeCalidad(
  reca_Id						INT IDENTITY(1,1),
  reca_Orden					INT NOT NULL,
  ensa_Id						INT NOT NULL,
  reca_Descripcion				NVARCHAR(200) NOT NULL,
  reca_Segunda					INT NOT NULL,
  reca_Scrap					INT NOT NULL,
  usua_UsuarioCreacion			INT NOT NULL,
  reca_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
  usua_UsuarioModificacion		INT NOT NULL,
  reca_FechaModificacion		DATETIME NOT NULL,
  reca_Estado					BIT NOT NULL DEFAULT 1

  CONSTRAINT PK_Prod_tbRevisiondeCalidad_reca_Id 										PRIMARY KEY (reca_Id),
  CONSTRAINT FK_Prod_tbRevisionDeCalidad_reca_Orden 									FOREIGN KEY (ensa_Id) 		   REFERENCES Prod.tbOrde_Ensa_Acab_Etiq(ensa_Id),
  CONSTRAINT FK_Prod_tbRevisionDeCalidad_tbUsuarios_reca_UsuarioCreacion				FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios 	(usua_Id),
  CONSTRAINT FK_Prod_tbRevisionDeCalidad_tbUsuarios_reca_UsuarioModificacion			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios 	(usua_Id),
 
);
GO

CREATE TABLE Prod.tbInspeccionesEstado( 
		ines_Id						INT IDENTITY(1,1),
		reca_Id						INT NOT NULL,
		usua_UsuarioCreacion		INT NOT NULL,
		ines_FechaCreacion			DATETIME NOT NULL DEFAULT GETDATE(),
		usua_UsuarioModificacion	INT, 
		ines_FechaModificacion		DATETIME,
		ines_Estado					BIT NOT NULL DEFAULT 1
	CONSTRAINT PK_Prod_tbInspeccionesEstado_ines_Id PRIMARY KEY (ines_Id),
	CONSTRAINT FK_Prod_tbRevisionDeCalidad_reca_Id_Prod_tbRevisionDeCalidad_reca_Id		FOREIGN KEY (reca_Id) REFERENCES Prod.tbRevisionDeCalidad(reca_Id),
	CONSTRAINT FK_Prod_tbInspeccionesEstado_tbUsuarios_ines_UsuarioCreacion				FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Prod_tbInspeccionesEstado_tbUsuarios_ines_UsuarioModificacion			FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios 	(usua_Id),
);




CREATE TABLE Adua.tbMarcas(
	marc_Id							INT IDENTITY(1,1),
	marc_Descripcion				NVARCHAR(20) NOT NULL,
	usua_UsuarioCreacion			INT	NOT NULL,
	marc_FechaCreacion				DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 		INT,
	marc_FechaModificacion			DATETIME, 
	marc_Estado 					BIT	NOT NULL DEFAULT 1
	CONSTRAINT PK_Adua_tbMarcas_marc_Id PRIMARY KEY(marc_Id),
	CONSTRAINT FK_Prod_tbMarcas_tbUsuarios_marc_UsuarioCreacion		FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Prod_tbMarcas_tbUsuarios_marc_UsuarioModificacion	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios 	(usua_Id),
);
GO

CREATE TABLE Adua.tbTiposIdentificacion(
	iden_Id						INT IDENTITY(1,1),
	iden_Descripcion			NVARCHAR(75) NOT NULL,
	usua_UsuarioCreacion		INT	NOT NULL,
	iden_FechaCreacion				DATETIME DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT,
	iden_FechaModificacion				DATETIME, 
	iden_Estado 				BIT	NOT NULL DEFAULT 1
	CONSTRAINT PK_Adua_tbTiposIdentificacion_iden_Id PRIMARY KEY(iden_Id),
	CONSTRAINT FK_Prod_tbTiposIdentificacion_tbUsuarios_iden_UsuarioCreacion		FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Prod_tbTiposIdentificacion_tbUsuarios_iden_UsuarioModificacion	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios 	(usua_Id)
);
GO

--Seccion pt2

CREATE TABLE Adua.tbModoTransporte(
	motr_Id				     INT IDENTITY(1,1),
	motr_Descripcion	     NVARCHAR(75) NOT NULL,
	usua_UsuarioCreacion 	 INT NOT NULL,
	motr_FechaCreacion		 DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion INT,
	motr_FechaModificacion	 DATETIME, 
	motr_Estado 		     BIT NOT NULL DEFAULT 1
	CONSTRAINT PK_Adua_tbModoTransporte_tran_Id PRIMARY KEY(motr_Id),
	CONSTRAINT FK_Prod_tbModoTransporte_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Prod_tbModoTransporte_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios 	(usua_Id)
);
GO


CREATE TABLE Adua.tbLiquidacionGeneral(
	lige_Id					 INT IDENTITY(1,1),
	lige_TipoTributo		 NVARCHAR(50) NOT NULL,
	lige_TotalPorTributo	 NVARCHAR(25) NOT NULL,
	lige_ModalidadPago		 NVARCHAR(55) NOT NULL,
	lige_TotalGral			 NVARCHAR(50) NULL,
	duca_Id				     NVARCHAR(100) NOT NULL,
	usua_UsuarioCreacion 	 INT NOT NULL,
	lige_FechaCreacion		 DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion INT,
	lige_FechaModicacion	 DATETIME, 
	lige_Estado 			 BIT NOT NULL DEFAULT 1
	CONSTRAINT PK_Adua_tbLiquidacionGeneral_lige_Id PRIMARY KEY(lige_Id),
	CONSTRAINT FK_Adua_tbDuca_duca_Id_Adua_tbLiquidacionGeneral_duca_Id 	                    FOREIGN KEY	(duca_Id) 				        REFERENCES Adua.tbDuca(duca_No_Duca),
	CONSTRAINT FK_Adua_tbLiquidacionGeneral_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id	    FOREIGN KEY (usua_UsuarioCreacion)     		REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Adua_tbLiquidacionGeneral_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id	FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios 	(usua_Id)
);

GO

CREATE TABLE Adua.tbTipoDocumento(
	tido_Id				        CHAR(4),
	tido_Descripcion	        NVARCHAR(50),
	usua_UsuarioCreacion		INT	NOT NULL,
	tido_FechaCrea		        DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 	INT,
	tido_FechaModificacion		DATETIME, 
	tido_Estado 		        BIT	NOT NULL DEFAULT 1
	CONSTRAINT PK_Adua_tbTipoDocumento_tido_Id PRIMARY KEY(tido_Id),
	CONSTRAINT FK_Adua_tbTipoDocumento_Acce_tbUsuarios_usua_UsuarioCreacion_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     		REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Adua_tbTipoDocumento_Acce_tbUsuarios_usua_UsuarioModificacion_usua_Id		FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios 	(usua_Id)
);
GO

CREATE TABLE Gral.tbDocumentosPDF(
    dpdf_ID                    INT IDENTITY (1,1) ,
    dpdf_CA                    NVARCHAR(200) NOT NULL,
    dpdf_DVA                   NVARCHAR(200) NOT NULL,
    dpdf_DUCA                  NVARCHAR(200) NOT NULL,
    dpdf_Boletin               NVARCHAR(200) NOT NULL,
	usua_UsuarioCreacion       INT           NOT NULL,
    dpdf_FechaCrea             DATETIME      NULL,
    usua_UsuarioModificacion   INT           NOT NULL,
    dpdf_FechaModificacion	   DATETIME      NULL,
    dpdf_Estado                BIT           NOT NULL,
	CONSTRAINT PK_Gral_tbDocumentosPDF_dpdf_ID PRIMARY KEY (dpdf_ID),
	CONSTRAINT FK_Acce_tbUsuarios_usua_Id_Gral_tbDocumentosPDF_usua_UsuarioCreacion   FOREIGN KEY (usua_UsuarioCreacion) REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Acce_tbUsuarios_usua_Id_Gral_tbDocumentosPDF_usua_UsuarioModicacion FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
); 

CREATE TABLE Adua.tbBoletinPago(
    boen_Id                        INT IDENTITY(1,1),
    liqu_Id                        INT NOT NULL,
    tipl_Id                        INT NOT NULL,
    boen_FechaEmision              DATE NOT NULL,
    esbo_Id                        INT NOT NULL,
    boen_Observaciones	           NVARCHAR(200) NOT NULL,
    boen_NDeclaracion	           NVARCHAR(200) NOT NULL,
    pena_RTN                       VARCHAR(20) NOT NULL,
    boen_Preimpreso                NVARCHAR(MAX) NOT NULL,
    boen_Declarante                NVARCHAR(200) NOT NULL,
    boen_TotalPagar                DECIMAL(18,2) NULL,
    boen_TotalGarantizar           DECIMAL(18,2) NULL,
    boen_RTN                       NVARCHAR(100) NOT NULL,
    boen_TipoEncabezado            NVARCHAR(200) NOT NULL,
    coim_Id                        INT NOT NULL,
    copa_Id                        INT NOT NULL,
    usua_UsuarioCreacion           INT NOT NULL,
    boen_FechaCrea                 DATETIME NULL,
    usua_UsuarioModificacion       INT NOT NULL,
    boen_FechaModificacion         DATETIME NULL,
    boen_Estado                    BIT NOT NULL,
    CONSTRAINT PK_Adua_tbBoletinPago_boen_Id 									      PRIMARY KEY (boen_Id),
    CONSTRAINT FK_Adua_tbBoletinPago_lige_Id_Adua_tbLiquidacionGeneral_lige_Id 		  FOREIGN KEY (liqu_Id)                  REFERENCES Adua.tbLiquidacionGeneral(lige_Id),
    CONSTRAINT FK_Adua_tbBoletinPago_tipl_Id_Adua_tbTipoLiquidacion_tipl_Id 		  FOREIGN KEY (tipl_Id)                  REFERENCES Adua.tbTipoLiquidacion(tipl_Id),
    CONSTRAINT FK_Adua_tbBoletinPago_esbo_Id_Adua_tbEstadoBoletin_esbo_Id 			  FOREIGN KEY (esbo_Id)                  REFERENCES Adua.tbEstadoBoletin(esbo_Id),
    CONSTRAINT FK_Adua_tbBoletinPago_coim_Id_Adua_tbCodigoImpuesto_coim_Id 			  FOREIGN KEY (coim_Id)                  REFERENCES Adua.tbCodigoImpuesto(coim_Id),
	CONSTRAINT FK_Adua_tbBoletinPago_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id     FOREIGN KEY (usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
    CONSTRAINT FK_Adua_tbBoletinPago_Acce_tbUsuarios_usua_UsuModificacion_usua_Id     FOREIGN KEY (usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)

);
GO

CREATE TABLE Adua.tbDocumentosDeSoporte(
	doso_Id						        INT IDENTITY(1,1),
	tido_Codigo					        CHAR(4),
	doso_NumeroDocumento		        NVARCHAR(15) NOT NULL,
	doso_FechaEmision			        DATE,
	doso_FechaVencimiento		        DATE,
	doso_PaisEmision			        NVARCHAR(30),
	doso_LineaAplica			        CHAR(4) NOT NULL,
	doso_EntidadEmitioDocumento         NVARCHAR(75),
	doso_Monto				           	NVARCHAR(50),
	usua_UsuarioCreacion				INT	NOT NULL,
	doso_FechaCrea			          	DATETIME NOT NULL DEFAULT GETDATE(),
	usua_UsuarioModificacion 		    INT,
	doso_FechaModificacion		        DATETIME, 
	doso_Estado 				        BIT	NOT NULL DEFAULT 1
	CONSTRAINT PK_Adua_tbDocumentosDeSoporte_doso_Id PRIMARY KEY(doso_Id),
	CONSTRAINT FK_Adua_tbTipoDocumento_tido_Id_Adua_tbDocumentosDeSoporte_tido_Codigo 	            FOREIGN KEY(tido_Codigo) 			        REFERENCES Adua.tbTipoDocumento(tido_Id),
	CONSTRAINT FK_Adua_tbDocumentosDeSoporte_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id			FOREIGN KEY (usua_UsuarioCreacion)     		REFERENCES Acce.tbUsuarios 	(usua_Id),
	CONSTRAINT FK_Adua_tbDocumentosDeSoporte_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioModificacion) 		REFERENCES Acce.tbUsuarios 	(usua_Id)
);
GO