const estilosTablaDetalless = {
    iconStyle : {
        marginRight: "5px",
        verticalAlign: "middle",
        color: "#FFFFFF",
      },
    
      //Constante para los estilos de los headers de la tabla de detalles
      tableHeaderStyle : {
        color: "#FFFFFF",
        verticalAlign: "middle",
        padding: "15px",
        textAlign: "center",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#634a9e",
        
      },

      //Constante para los estilos de los filas de la tabla de detalles
      tableRowStyle : {
        "&:hover": {
          backgroundColor: "coral",
          borderRadius: "5px",
        },
      },
    
      //Constante para los estilos de los celdas de la tabla de detalles
      tableCellStyle : {
        verticalAlign: "middle",
        padding: "15px",
        textAlign: "center",
        borderBottom: "1px solid #ddd",
      },
};
// const estilosTablaDetalles = new EstilosTablaDetalles()
export default estilosTablaDetalless