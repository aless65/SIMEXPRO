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






/**************Crear Formas de pago**********************/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Insertar
   @fopa_Descripcion        NVARCHAR(MAX), 
   @usua_UsuarioCreacion    INT, 
   @fopa_FechaCreacion      DATETIME
AS
BEGIN
     BEGIN TRY 
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


/*******************************  *******************************/ 


 