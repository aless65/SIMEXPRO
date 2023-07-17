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
     @usua_UsuarioModificacion  INT,
	 @adua_Id					INT,
	 @usua_UsuarioEliminacion	INT,
	 @adua_FechaEliminacion		DATETIME
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
BEGIN
	BEGIN TRY

		BEGIN
		   SET @adua_FechaEliminacion = GETDATE()
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'adua_Id',  @adua_Id, 'Adua.tbAduanas', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE Adua.tbAduanas
					SET adua_Estado = 0,
					    usua_UsuarioEliminacion=@usua_UsuarioEliminacion,
                        adua_FechaEliminacion=@adua_FechaEliminacion
					WHERE adua_Id = @adua_Id
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO






 BEGIN
		      usua_UsuarioModificacion = @usua_UsuarioModificacion,
			  fopa_FechaModificacion = @fopa_FechaModificacion
		  WHERE [fopa_Id] = @fopa_id
		  SELECT 1
	   END TRY 
	   BEGIN CATCH 
	       SELECT 0
 BEGIN
END 

go



/****************Eliminar Formas de pago*******************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbFormasdePago_Eliminar 
	@fopa_id					INT
	@usua_UsuarioEliminacion	INT,
	@fopa_FechaEliminacion		DATETIME
AS
   BEGIN TRY 
         UPDATE [Adua].[tbFormasdePago]
         SET [fopa_Estado] = 0
		 WHERE [fopa_Id] = @fopa_id
   END TRY 
   BEGIN CATCH 
   SELECT 0
   END CATCH
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'fopa_id', @fopa_id, 'Adua.tbFormasdePago', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					UPDATE [Adua].[tbFormasdePago]
					SET [fopa_Estado] = 0,
					    usua_UsuarioEliminacion=@usua_UsuarioEliminacion,
						fopa_FechaEliminacion=@fopa_FechaEliminacion
					WHERE [fopa_Id] = @fopa_id
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*******************************Condiciones comerciales *******************************/ 

/*************************Vista Condiciones comerciales ************************************/
BEGIN
		      usua_UsuarioModificacion = @coco_UsuarioModificacion,
			  coco_FechaModificacion = @coco_FechaModi
		  WHERE [coco_Id] = @coco_Id
		  SELECT 1
	   END TRY 
	   BEGIN CATCH 
	       SELECT 0
		    END
 /*Eliminar Condiciones Comerciales */
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbCondicionesComerciales_Eliminar
   @coco_Id INT,
   @coco_UsuarioModificacion  INT 
	@coco_Id					INT
	@usua_UsuarioEliminacion	INT,
	@coco_FechaEliminacion		DATETIME
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
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'coco_Id', @coco_Id, 'Adua.tbFormasdePago', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					 UPDATE [Adua].[tbCondicionesComerciales]
						SET coco_Estado = 0,
						    usua_UsuarioEliminacion = @usua_UsuarioEliminacion,
							coco_FechaEliminacion = @coco_FechaEliminacion
						WHERE coco_Id = @coco_Id
		SELECT 1
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END


GO


GO
 BEGIN
END

GO


/*************Editar Tipo de intermediario ************************/
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Editar
   @tite_Id                  INT,
 BEGIN
          usua_UsuarioModificacion = @tite_UsuarioModificacion,
          tite_FechaModificacion = @tite_FechaModi
      WHERE tite_Id = @tite_Id
	  SELECT 1
   END TRY 
   BEGIN CATCH 
       SELECT 0
 END

GO
/*************************Eliminar tipo de intermediario*****************/
GO
CREATE OR ALTER PROCEDURE Adua.UDP_tbTipoIntermediario_Eliminar
   @tite_Id INT
	@tite_Id					INT
	@usua_UsuarioEliminacion	INT,
	@tite_FechaEliminacion	DATETIME
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
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'tite_Id', @tite_Id, 'Adua.tbTipoIntermediario', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					   UPDATE [Adua].[tbTipoIntermediario]
					   SET tite_Estado = 0,
					       usua_UsuarioEliminacion=@usua_UsuarioEliminacion,
						   tite_FechaEliminacion = @tite_FechaEliminacion
                       WHERE tite_Id = @tite_Id
		SELECT 1
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO

/****************************UDP's Clientes*********************************/
CREATE OR ALTER VIEW Prod.Vw_tbClientes
AS
BEGIN
END

/*Eliminar Clientes*/

GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbClientes_Eliminar  
	@clie_Id					INT
	@usua_UsuarioEliminacion	INT,
	@clie_FechaEliminacion	DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
		  SET  @clie_FechaEliminacion = GETDATE()
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'clie_Id', @clie_Id, 'Prod.tbClientes', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					 UPDATE [Prod].[tbClientes]
						SET clie_Estado = 0, 
						     usua_UsuarioEliminacion =@usua_UsuarioEliminacion,
							 clie_FechaEliminacion =@clie_FechaEliminacion
						WHERE clie_Id = @clie_Id
		SELECT 1
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO




GO
/****************************************UDPs Estilos******************/
CREATE OR ALTER VIEW Prod.VW_tbEstilos
AS
SELECT 
      est.esti_Id  AS EstiloID, 
	  est.esti_Descripcion AS EstiloDescripcion , 
	  usu.usua_Nombre AS UsuarioCreacion,
	  est.esti_FechaCreacion AS FechaCreacion,
	  usu2.usua_Nombre AS UsuarioModificacion, 
	  est.esti_FechaModificacion AS FechaModificacion, 
	  est.esti_Estado AS EstilosEstado
FROM [Prod].[tbEstilos] est INNER JOIN [Acce].[tbUsuarios] usu
ON est.usua_UsuarioCreacion = usu.usua_Id INNER JOIN 
[Acce].[tbUsuarios] usu2 ON usu2.usua_UsuarioModificacion = est.usua_UsuarioModificacion 

go

/*Listar aduanas*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbEstilos_Listar
AS
BEGIN
   SELECT *
   FROM Prod.VW_tbEstilos
   WHERE EstilosEstado = 1 
END 

GO

/***Insertar estilos*/
CREATE OR ALTER PROCEDURE Prod.UDP_tbEstilos_Insertar  
   @esti_Descripcion    NVARCHAR(200), 
   @usua_UsuarioCreacion        INT, 
   @esti_FechaCreacion      DATETIME
AS    
BEGIN 
   BEGIN TRY 
    SET @esti_FechaCreacion = GETDATE()
	 IF EXISTS(SELECT * FROM [Prod].[tbEstilos] WHERE esti_Descripcion = @esti_Descripcion AND esti_Estado = 0)
      BEGIN 
         UPDATE [Prod].[tbEstilos]
         SET esti_Estado = 1
         SELECT 1
      END
      ELSE 
      BEGIN 
         INSERT INTO [Prod].[tbEstilos] (esti_Descripcion, usua_UsuarioCreacion, esti_FechaCreacion)
         VALUES (@esti_Descripcion, @usua_UsuarioCreacion, @esti_FechaCreacion)			  
         SELECT 1
      END
   END TRY
   BEGIN CATCH
      SELECT 0
   END CATCH  
END



/***Editar estilos*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbEstilos_Editar
   @esti_Id                  INT,
   @esti_Descripcion         NVARCHAR(200),
   @usua_UsuarioModificacion INT,
   @esti_FechaModificacion   DATETIME
AS
BEGIN 
   BEGIN TRY 
   SET @esti_FechaModificacion = GETDATE()
      UPDATE [Adua].[tbEstilos]
      SET esti_Descripcion = @esti_Descripcion, 
          usua_UsuarioModificacion = @usua_UsuarioModificacion,
          esti_FechaModificacion = @esti_FechaModificacion
      WHERE esti_Id = @esti_Id
	  SELECT 1
   END TRY 
   BEGIN CATCH 
       SELECT 0
   END CATCH
END

/*Eliminar estilos*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbEstilos_Eliminar  
	@esti_Id					INT
	@usua_UsuarioEliminacion	INT,
	@esti_FechaEliminacion	DATETIME
AS
BEGIN
	BEGIN TRY

		BEGIN
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'esti_Id', @esti_Id, 'Prod.tbEstilos', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					 UPDATE Prod.tbEstilos
						SET esti_Estado = 0,
						   usua_UsuarioEliminacion =@usua_UsuarioEliminacion,
						   esti_FechaEliminacion = @esti_FechaEliminacion
						WHERE esti_Id = @esti_Id
		SELECT 1
				END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

GO
/***************UDPs Modelos*********************/
CREATE OR ALTER VIEW Prod.Vw_tbModelos
AS
SELECT 
      mode.mode_Id  AS ModeloID, 
	  mode.mode_Descripcion AS ModeloDescripcion , 
	  usu.usua_Nombre AS UsuarioCreacion,
	  mode.mode_FechaCreacion AS FechaCreacion,
	  usu2.usua_Nombre AS UsuarioModificacion, 
	  mode.mode_FechaModificacion AS FechaModificacion, 
	  mode.mode_Estado AS ModeloEstado
FROM [Prod].[tbModelos] mode INNER JOIN [Acce].[tbUsuarios] usu
ON mode.usua_UsuarioCreacion = usu.usua_Id INNER JOIN 
[Acce].[tbUsuarios] usu2 ON usu2.usua_UsuarioModificacion = mode.usua_UsuarioModificacion 
go

CREATE OR ALTER PROCEDURE Prod.UDP_tbModelos_Listar
AS
BEGIN
   SELECT *
   FROM Prod.Vw_tbModelos
END 


/*Insertar Modelos*/
-- Crear el procedimiento almacenado Prod.UDP_tbModelos_Insertar
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelos_Insertar  
   @mode_Descripcion         INT,
   @esti_Id                  INT,
   @usua_UsuarioCreacion     INT,
   @mode_FechaCreacion       DATETIME
AS    
BEGIN 
   BEGIN TRY 
    SET  @mode_FechaCreacion = GETDATE();
	  IF EXISTS(SELECT * FROM [Prod].[tbModelos] WHERE mode_Descripcion = @mode_Descripcion AND mode_Estado = 0)
      BEGIN 
         UPDATE [Prod].[tbModelos]
         SET mode_Estado = 1
         SELECT 1
      END
      ELSE 
      BEGIN 
         INSERT INTO [Prod].[tbModelos] (mode_Descripcion, esti_Id, usua_UsuarioCreacion, mode_FechaCreacion)
         VALUES (@mode_Descripcion, @esti_Id, @usua_UsuarioCreacion, @mode_FechaCreacion)			  
         SELECT 1
      END
   END TRY
   BEGIN CATCH
      SELECT 0
   END CATCH  
END


/*Editar Modelos*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelos_Editar
   @mode_Id                  INT,
   @mode_Descripcion         INT,
   @esti_Id                  INT,
   @usua_UsuarioModificacion INT,
   @mode_FechaModificacion   DATETIME
AS
BEGIN 
   BEGIN TRY 
   SET  @mode_FechaModificacion = GETDATE();
	 UPDATE [Adua].[tbModelos]
      SET mode_Descripcion = @mode_Descripcion, 
          esti_Id = @esti_Id,
          usua_UsuarioModificacion = @usua_UsuarioModificacion,
          mode_FechaModificacion = @mode_FechaModificacion
      WHERE mode_Id = @mode_Id
	  SELECT 1
   END TRY 
   BEGIN CATCH 
       SELECT 0
   END CATCH
END


/*Eliminar tbModelos*/
GO
CREATE OR ALTER PROCEDURE Prod.UDP_tbModelos_Eliminar  
	@mode_Id					INT,
	@usua_UsuarioEliminacion	INT,
	@mode_FechaEliminacion	DATETIME
AS
BEGIN
	BEGIN TRY
		BEGIN
		    @mode_FechaEliminacion = getdate()
			DECLARE @respuesta INT
			EXEC dbo.UDP_ValidarReferencias 'mode_Id', @mode_Id, 'Prod.tbModelos', @respuesta OUTPUT

			SELECT @respuesta AS Resultado
			IF(@respuesta) = 1
				BEGIN
					 UPDATE [Prod].[tbModelos]
						SET mode_Estado = 0,
						    usua_UsuarioEliminacion=@usua_UsuarioEliminacion,
							mode_FechaEliminacion =@mode_FechaEliminacion
						WHERE mode_Id = @mode_Id
		    SELECT 1
		  END
		END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END












 