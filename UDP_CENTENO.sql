/************************UDP tbAduanas ***********************************/
/*Vista Aduanas*/
CREATE OR ALTER VIEW Adua.VW_tbAduanas
AS
SELECT 
      adu.adua_Id  AS AduanaID, 
	  adu.adua_Nombre AS NombreAduana , 
	  adu.adua_Direccion_Exacta  AS DireccionExacta,
	  usu.usua_Nombre AS UsuarioCreacion,
	  adu.adua_FechaCreacion AS FechaCreacion,
	  usu2.usua_Nombre AS UsuarioModificacion, 
	  adu.adua_FechaModificacion AS FechaModificacion, 
	  adu.adua_Estado AS AduanaEstado
FROM [Adua].[tbAduanas] adu INNER JOIN [Acce].[tbUsuarios] usu
ON adu.usua_UsuarioCreacion = usu.usua_Id INNER JOIN 
[Acce].[tbUsuarios] usu2 ON usu2.usua_UsuarioModificacion = adu.usua_UsuarioModificacion 

go

/*Listar aduanas*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Listar
AS
BEGIN
   SELECT *
   FROM Adua.VW_tbAduanas
   WHERE AduanaEstado = 1 
END 

/*Aduanas Crear */
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Insertar 
   @adua_Nombre                NVARCHAR(MAX),
   @adua_Direccion_Exacta      NVARCHAR(MAX), 
   @usua_UsuarioCreacion       INT,  
   @adua_FechaCreacion         DATETIME
AS 
BEGIN 
     BEGIN TRY 
		SET @adua_FechaCreacion = GETDATE();
		IF EXISTS (SELECT * FROM [Adua].[tbAduanas]     
		  WHERE @adua_Nombre = adua_Nombre
			AND adua_Estado = 0)
			BEGIN 
			   UPDATE Adua.tbAduanas
			   SET    adua_Estado = 1,
			          adua_Direccion_Exacta =@adua_Direccion_Exacta, 
			          usua_UsuarioModificacion=@usua_UsuarioCreacion
				WHERE adua_Nombre = @adua_Nombre
			   SELECT 1	    
		   END 
		
	      ELSE IF EXISTS(SELECT * FROM [Adua].[tbAduanas]  		  
		    WHERE @adua_Nombre = adua_Nombre)
		      BEGIN 
			   SELECT 2
		    END          	
		ELSE 
		   BEGIN 
		     INSERT INTO Adua.tbAduanas
			 (adua_Nombre, 
			  adua_Direccion_Exacta, 
			  usua_UsuarioCreacion, 
			  adua_FechaCreacion			  
			 )
			 VALUES 
			 ( 
			 @adua_Nombre,          
			 @adua_Direccion_Exacta,
			 @usua_UsuarioCreacion, 
			 @adua_FechaCreacion   
			 )			
			  SELECT 1			
			END
	     END TRY
	 BEGIN CATCH 
	    SELECT 0
	 END CATCH 
END 
go

/*Aduanas Editar*/
CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Editar
 @adua_Id                   INT, 
 @adua_Nombre               NVARCHAR(MAX), 
 @adua_Direccion_Exacta     NVARCHAR(MAX),   
 @usua_UsuarioModificacion  INT, 
 @adua_FechaModificacion    DATETIME
AS
BEGIN 
   BEGIN TRY   
     SET @adua_FechaModificacion = GETDATE()
	   UPDATE  [Adua].[tbAduanas] 
	   SET adua_Nombre = @adua_Nombre, 
	       adua_Direccion_Exacta = @adua_Direccion_Exacta, 		   
		   usua_UsuarioModificacion = @usua_UsuarioModificacion, 
		   adua_FechaModificacion = @adua_FechaModificacion
	   WHERE  adua_Id = @adua_Id
	   SELECT 1
	END TRY
   BEGIN CATCH
      SELECT 0
    END CATCH
END


GO
/*Aduana Eliminar*/

CREATE OR ALTER PROCEDURE Adua.UDP_tbAduanas_Eliminar
   @adua_Id                   INT, 
   @usua_UsuarioModificacion  INT
AS
BEGIN 
   BEGIN TRY      
    UPDATE [Adua].[tbAduanas]
	    SET [usua_UsuarioModificacion]= @usua_UsuarioModificacion,
	    [adua_Estado] = 0
	   WHERE [adua_Id] = @adua_Id
	  SELECT 1	
    END TRY
    BEGIN CATCH
	  SELECT 0
  	END CATCH 
END



/******************************** Formas de pago*****************************************/

/**********Vistas formas de pago*******************/ 
go
CREATE OR ALTER VIEW Adua.VW_tbFormasdePago
AS
  SELECT fopa_Id   AS FormadePago, 
         fopa_Descripcion AS FormaPago,
		 usu.usua_Nombre AS UsuarioCreador,
		 fopa_FechaCreacion AS FechaCreacion,
		 usu1.usua_Nombre AS UsuarioModificacion,
		 fopa_FechaModificacion AS FechaModificacion,
		 fopa_Estado AS Estado 
  FROM [Adua].[tbFormasdePago] form INNER JOIN [Acce].[tbUsuarios] usu
  ON usu.usua_Id = form.usua_UsuarioCreacion INNER JOIN [Acce].[tbUsuarios] usu1
  ON usu1.usua_Id = form.usua_UsuarioModificacion   

GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormadePago_Listar
AS
BEGIN 
   SELECT *
   FROM Adua.VW_tbFormasdePago

END




/**************Crear Formas de pago**********************/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Insertar
   @fopa_Descripcion        NVARCHAR(MAX), 
   @usua_UsuarioCreacion    INT, 
   @fopa_FechaCreacion      DATETIME
AS
BEGIN
     BEGIN TRY 
	 SET @fopa_FechaCreacion = GETDATE()
	    IF EXISTS(SELECT * FROM [Adua].[tbFormasdePago] WHERE fopa_Descripcion=@fopa_Descripcion 
		 AND fopa_Estado = 0)	 
		 BEGIN 
		    UPDATE [Adua].[tbFormasdePago]
			SET [fopa_Estado] = 1
			WHERE fopa_Descripcion=@fopa_Descripcion
			SELECT 1
		 END
		ELSE 
		 BEGIN
		    INSERT INTO [Adua].[tbFormasdePago] 
			( [fopa_Descripcion], 
			  [usua_UsuarioCreacion], 
			  [fopa_FechaCreacion]  
	 		)
		    VALUES(
	          @fopa_Descripcion ,
			  @usua_UsuarioCreacion,
			  @fopa_FechaCreacion  
			)
         END
		 
		END TRY 
	BEGIN CATCH
	   SELECT 0	
	END CATCH    
END


GO
/********************Editar Formas de pago************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Editar
   @fopa_id    INT,
   @fopa_Descripcion  NVARCHAR(350),  
   @usua_UsuarioModificacion INT, 
   @fopa_FechaModificacion  DATETIME
AS
BEGIN 
      BEGIN TRY 
	  SET @fopa_FechaModificacion = GETDATE()
	      UPDATE [Adua].[tbFormasdePago]
		  SET fopa_Descripcion = @fopa_Descripcion, 
		      usua_UsuarioModificacion = @usua_UsuarioModificacion,
			  fopa_FechaModificacion = @fopa_FechaModificacion
		  WHERE [fopa_Id] = @fopa_id
	   END TRY 
	   BEGIN CATCH 
	       SELECT 0
	   END CATCH
END 

go



/****************Eliminar Formas de pago*******************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Eliminar
 @fopa_id    INT
AS
   BEGIN TRY 
         UPDATE [Adua].[tbFormasdePago]
         SET [fopa_Estado] = 0
		 WHERE [fopa_Id] = @fopa_id
   END TRY 
   BEGIN CATCH 
   SELECT 0
   END CATCH
GO
/*******************************Condiciones comerciales *******************************/ 

/*************************Vista Condiciones comerciales ************************************/
CREATE OR ALTER VIEW Adua.VW_tbCondicionesComerciales 
AS
  SELECT condi.coco_Id   AS CondicionesComercialesID, 
         condi.coco_Descripcion AS Descripcion, 
		 usu.usua_Nombre AS UsuarioCreacion,
		 usu1.usua_Nombre AS UsuarioModificacion ,
		 condi.coco_Estado AS Estado
  FROM [Adua].[tbCondicionesComerciales] condi INNER JOIN 
  [Acce].[tbUsuarios] usu 
  ON condi.usua_UsuarioCreacion = usu.usua_Id INNER JOIN [Acce].[tbUsuarios] usu1
  ON usu1.usua_Id = condi.usua_UsuarioModificacion

/*Listar Condiciones comerciales*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Listar
AS
   SELECT * 
   FROM Adua.VW_tbCondicionesComerciales 
   WHERE Estado = 0

/*Crear Condiciones comerciales*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Insertar  
 @coco_Descripcion    NVARCHAR(350), 
 @coco_UsuCreacion        INT, 
 @coco_FechaCreacion     DATETIME
AS    
BEGIN 
    BEGIN TRY 
	  SET @coco_FechaCreacion= GETDATE()
	  IF EXISTS(SELECT * FROM [Adua].[tbCondicionesComerciales] con 
	        WHERE con.coco_Descripcion = @coco_Descripcion AND con.[coco_Estado] =0)
			BEGIN 
			   UPDATE [Adua].[tbCondicionesComerciales]
			   SET [coco_Estado] = 1
			   SELECT 1
			END
			ELSE 
			  BEGIN 
			     INSERT INTO [Adua].[tbCondicionesComerciales]
				 ( coco_Descripcion, 
				   usua_UsuarioCreacion, 
				   coco_FechaCreacion				     				 
				 )
				 VALUES(
                  @coco_Descripcion,
				  @coco_UsuCreacion,   
				  @coco_FechaCreacion 					 
				 )			  
			  SELECT 1
			 END 
	   END TRY
	BEGIN CATCH
	    SELECT 0
	END CATCH  
END 


/*Editar Condiciones comerciales*/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Editar
   @coco_Id                  INT,
   @coco_Descripcion         NVARCHAR(150),
   @coco_UsuarioModificacion         INT,
   @coco_FechaModi           DATETIME
AS
BEGIN 
      BEGIN TRY
	SET  @coco_FechaModi = GETDATE()
	      UPDATE [Adua].[tbCondicionesComerciales]
		  SET coco_Descripcion = @coco_Descripcion, 
		      usua_UsuarioModificacion = @coco_UsuarioModificacion,
			  coco_FechaModificacion = @coco_FechaModi
		  WHERE [coco_Id] = @coco_Id
	   END TRY 
	   BEGIN CATCH 
	       SELECT 0
	   END CATCH
END
 
 /*Eliminar Condiciones Comerciales */
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Eliminar
   @coco_Id INT,
   @coco_UsuarioModificacion  INT 
AS
BEGIN 
   BEGIN TRY 
      UPDATE [Adua].[tbCondicionesComerciales]
      SET coco_Estado = 0,
	      usua_UsuarioModificacion = @coco_UsuarioModificacion
	  WHERE coco_Id = @coco_Id
	     
   END TRY 
   BEGIN CATCH 
      SELECT 0
   END CATCH
END




GO
/************************UDP Tipos de Intermediarios*************************/
CREATE OR ALTER VIEW Adua.VW_tbTipoIntermediario
AS
 SELECT 
 tite_Descripcion  AS Descripcion, 
 usu.usua_Nombre AS UsuarioCreador, 
 tite_FechaCreacion AS FechaCreacion,
 usu1.usua_Nombre AS UsuarioModificacion,
 tite_FechaModificacion AS FechaModificacion,
 tite_Estado AS Estados
 FROM [Adua].[tbTipoIntermediario] tip INNER JOIN [Acce].[tbUsuarios] usu
 ON tip.usua_UsuarioCreacion = usu.usua_Id INNER JOIN [Acce].[tbUsuarios] usu1
 ON usu1.usua_UsuarioModificacion = tip.usua_UsuarioModificacion

/*********************Listar Tipo intermediario***************************/
 GO
 CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Listar
 AS
 BEGIN 
     SELECT *
	 FROM Adua.VW_tbTipoIntermediario

 END 
 GO
 /********************Crear Tipo Intermediario******************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Insertar  
   @tite_Descripcion    NVARCHAR(150), 
   @tite_UsuCreacion        INT, 
   @tite_FechaCreacion     DATETIME
AS    
BEGIN 
   BEGIN TRY 
   SET @tite_FechaCreacion= GETDATE();
      IF EXISTS(SELECT * FROM [Adua].[tbTipoIntermediario] WHERE tite_Descripcion = @tite_Descripcion AND tite_Estado = 0)
      BEGIN 
         UPDATE [Adua].[tbTipoIntermediario]
         SET tite_Estado = 1
         SELECT 1
      END
      ELSE 
      BEGIN 
         INSERT INTO [Adua].[tbTipoIntermediario] (tite_Descripcion, usua_UsuarioCreacion, tite_FechaCreacion)
         VALUES (@tite_Descripcion, @tite_UsuCreacion, @tite_FechaCreacion)			  
         SELECT 1
      END
   END TRY
   BEGIN CATCH
      SELECT 0
   END CATCH  
END

GO


/*************Editar Tipo de intermediario ************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Editar
   @tite_Id                  INT,
   @tite_Descripcion         NVARCHAR(150),
   @tite_UsuarioModificacion         INT,
   @tite_FechaModi           DATETIME
AS
BEGIN 
   BEGIN TRY 
     SET @tite_FechaModi = GETDATE();
      UPDATE [Adua].[tbTipoIntermediario]
      SET tite_Descripcion = @tite_Descripcion, 
          usua_UsuarioModificacion = @tite_UsuarioModificacion,
          tite_FechaModificacion = @tite_FechaModi
      WHERE tite_Id = @tite_Id
   END TRY 
   BEGIN CATCH 
       SELECT 0
   END CATCH
END

GO
/*************************Eliminar tipo de intermediario*****************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Eliminar
   @tite_Id INT
AS
BEGIN 
   BEGIN TRY 
      UPDATE [Adua].[tbTipoIntermediario]
      SET tite_Estado = 0
      WHERE tite_Id = @tite_Id
   END TRY 
   BEGIN CATCH 
      SELECT 0
   END CATCH
END

GO
/****************************UDP's Clientes*********************************/
CREATE OR ALTER VIEW Prod.Vw_tbClientes
AS
SELECT clie.clie_Id   AS ClienteID,
       clie.clie_Numero_Contacto AS NumeroContacto,
	   clie.clie_Nombre_Contacto AS NombreContacto,
	   clie.clie_Correo_Electronico AS CorreoElectronico,
	   clie.clie_Direccion AS Direccion,
	   clie.clie_FAX AS FAX,
	   clie.clie_RTN AS RTN,
	   usu.usua_Nombre AS UsuarioCreacion,
	   clie.clie_FechaCreacion AS FechaCreacion,
	   usu1.usua_Nombre AS UsuarioModificacion,
	   clie.clie_FechaModificacion FechaModificacion,
	   clie.clie_Estado AS Estado
FROM  [Prod].[tbClientes] clie INNER JOIN [Acce].[tbUsuarios] usu
ON usu.usua_Id = clie.usua_UsuarioCreacion INNER JOIN [Acce].[tbUsuarios] usu1
ON usu1.usua_Id = clie.usua_UsuarioModificacion

GO

/*Listar Clientes*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbClientes_Listar
AS
BEGIN 
    SELECT *
	FROM Prod.Vw_tbClientes
END

GO
/*Crear Clientes*/
CREATE OR ALTER PROCEDURE prod.UDP_tbClientes_Insertar 
   @clie_Nombre_O_Razon_Social    NVARCHAR(200), 
   @clie_Direccion                NVARCHAR(250), 
   @clie_RTN                      CHAR(13), 
   @clie_Nombre_Contacto          NVARCHAR(200), 
   @clie_Numero_Contacto          CHAR(50), 
   @clie_Correo_Electronico       NVARCHAR(200), 
   @clie_FAX                      NVARCHAR(50), 
   @usua_UsuarioCreacion          INT, 
   @clie_FechaCreacion            DATETIME

AS
BEGIN 
  BEGIN TRY
  IF EXISTS(SELECT * FROM [Prod].[tbClientes] cli WHERE cli.clie_Nombre_O_Razon_Social = @clie_Nombre_O_Razon_Social)    
	BEGIN  
		SET @clie_FechaCreacion = GETDATE();
	    UPDATE [Prod].[tbClientes]
		SET 
		    clie_Nombre_O_Razon_Social=@clie_Nombre_O_Razon_Social, 
			clie_Direccion=@clie_Direccion, 
			clie_RTN=@clie_RTN, 
			clie_Nombre_Contacto=@clie_Nombre_Contacto,
			clie_Numero_Contacto=@clie_Numero_Contacto,
			clie_Correo_Electronico=@clie_Correo_Electronico, 
			clie_FAX=@clie_FAX,  
			usua_UsuarioModificacion=@usua_UsuarioCreacion, 
			clie_FechaModificacion=@clie_FechaCreacion
			WHERE clie_Nombre_O_Razon_Social= @clie_Nombre_O_Razon_Social
		SELECT 1
  END 	  
  ELSE 
	   BEGIN  
	      INSERT INTO [Prod].[tbClientes]
		  ( 
	      clie_Nombre_O_Razon_Social,
		  clie_Direccion   ,  
		  clie_RTN          , 
		  clie_Nombre_Contacto ,
		  clie_Numero_Contacto,
		  clie_Correo_Electronico,
		  clie_FAX ,
		  usua_UsuarioCreacion,
		  clie_FechaCreacion            	  		  
		  )
		  VALUES (		         
		  @clie_Nombre_O_Razon_Social ,   
		  @clie_Direccion ,  
		  @clie_RTN ,  
		  @clie_Nombre_Contacto ,  
		  @clie_Numero_Contacto  ,  
		  @clie_Correo_Electronico,  
		  @clie_FAX,  
		  @usua_UsuarioCreacion,  
		  @clie_FechaCreacion           
		  )	 
	   SELECT 1
    END		
END TRY	    
   BEGIN CATCH 	 
	 SELECT 0
   END CATCH
END

GO
/*Editar Clientes*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbClientes_Editar 
  @clie_Id    INT, 
  @clie_Nombre_O_Razon_Social NVARCHAR(200), 
  @clie_Direccion     NVARCHAR(200), 
  @clie_RTN CHAR(13), 
  @clie_Nombre_Contacto   NVARCHAR(200),
  @clie_Numero_Contacto CHAR(50), 
  @clie_Correo_Electronico  NVARCHAR(200) , 
  @clie_FAX  NVARCHAR(50) ,  
  @usua_UsuarioModificacion INT, 
  @clie_FechaModificacion DATETIME
AS
BEGIN 
    SET @usua_UsuarioModificacion = GETDATE();     
    BEGIN TRY 
	    UPDATE [Prod].[tbClientes]
		SET clie_Nombre_O_Razon_Social =@clie_Nombre_O_Razon_Social, 
		    clie_Direccion=@clie_Direccion, 
			clie_RTN = @clie_RTN, 
			clie_Nombre_Contacto=@clie_Nombre_Contacto, 
			clie_Numero_Contacto=@clie_Numero_Contacto, 
			clie_Correo_Electronico=@clie_Correo_Electronico, 
			clie_FAX=@clie_FAX, 
			usua_UsuarioModificacion=@usua_UsuarioModificacion, 
			clie_FechaModificacion=@clie_FechaModificacion 
		WHERE clie_Id = @clie_Id
		 SELECT 1
	END TRY
	BEGIN CATCH
	     SELECT 0
	END CATCH
END

/*Eliminar Clientes*/

CREATE OR ALTER PROCEDURE Prod.UDP_tbClientes_Eliminar  











 