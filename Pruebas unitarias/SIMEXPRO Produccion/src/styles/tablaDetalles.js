const estilosTablaDetalles = {
    iconStyle : {
        marginRight: "5px",
        verticalAlign: "middle",
        color: "#634a9e",
      },
    
      //Constante para los estilos de los headers de la tabla de detalles
      tableHeaderStyle : {
        verticalAlign: "middle",
        padding: "15px",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#f2f2f2",
      },

      //Constante para los estilos de los filas de la tabla de detalles
      tableRowStyle : {
        "&:hover": {
          backgroundColor: "coral",
        },
      },
    
      //Constante para los estilos de los celdas de la tabla de detalles
      tableCellStyle : {
        verticalAlign: "middle",
        padding: "15px",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
      },
};
// const estilosTablaDetalles = new EstilosTablaDetalles()
export default estilosTablaDetalles