import {
  Button,
  Card,
  CardMedia,
  Grid,
  Icon
} from "@mui/material";
import {
  Document,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import History from "src/@history/@history";
import ReporteModuloDiaServices from "./ReporteModuloDiaService";


// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     //   backgroundColor: '#E4E4E4'
//   },
//   section: {
//     display: "flex",
//     flexDirection: "row",
//     borderBottom: "1px solid black",
//   },
//   body: {
//     margin: 15,
//   },
//   image: {
//     alignItems: "flex-end",
//     justifyContent: "flex-end",
//     position: "absolute",
//     top: 0,
//     right: 30,
//   },
//   title: {
//     fontSize: 20,
//     margin: 10,
//     padding: 10,
//     textAlign: "left",
//   },
//   fecha: {
//     fontSize: 16,
//     margin: 10,
//     padding: 10,
//     marginLeft: "15%",
//     display: "flex",
//     textAlign: "right",
//     alignContent: "flex-end",
//     justifyContent:"flex-end"
//   },
//   pageNumber: {
//     position: "absolute",
//     fontSize: 12,
//     bottom: 30,
//     left: 30,
//     right: 30,
//     textAlign: "right",
//     color: "grey",
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: {
//     margin: "auto",
//     flexDirection: "row",
//   },
//   tableCol: {
//     width: "14.28571428571429%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableHea: {
//     width: "14.28571428571429%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     backgroundColor: "#af7df0",
//   },
//   tableCell: {
//     margin: "auto",
//     marginTop: 5,
//     fontSize: 10,
//   },
//   hea: {
//     fontSize: 24,
//     textAlign: 'center',
//     fontWeight: "bold"
//     // borderBottom: '1px solid black'
//   },

// });

const styles = StyleSheet.create({
  cellWithLine: {
    position: "relative",
    marginBottom: 10,
  },
  line: {
    top: 20,
    bottom: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: "#000000", // Color de la línea
  },
  lineItems: {
    top: 5,
    bottom: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: "#000000", // Color de la línea
  },
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 25,
  },
  header: {
    fontWeight: "bold",
    fontFamily: "Times-Roman",
    fontSize: 14,
    marginBottom: 5,
  },
  innerheader: {
    fontWeight: "bold",
    fontFamily: "Times-Roman",
    fontSize: 14,
    marginBottom: 5,
  },
  image: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    top: 5,
    right: 30,
  },
  imageLogoLetras: {
    alignItems: "center",
    justifyContent: "center",
    top: 0,
  },
  title: {
    top: 70,
    right: 90,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  divisor: {
    fontSize: 18,
    left: 20,
    textAlign: "left",
    fontFamily: "Times-Roman",
  },
  subtitle: {
    top: 69,
    left: 50,
    right: 20,
    bottom: 30,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: "right",
    color: "grey",
  },
  pageUser: {
    position: "absolute",
    fontSize: 9,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: "center",
    color: "grey",
  },
  pageDate: {
    position: "absolute",
    fontSize: 9,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: "left",
    color: "grey",
  },
  columnsContainer: {
    flexDirection: "column",
  },
  column: {
    marginBottom: 10,
  },
  columnsContainer1: {
    padding: 30,
    top: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnsContainer2: {
    top: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  headerParteIzq: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
  },
  column1: {
    flex: 1,
    marginRight: 15,
  },
  column2: {
    flex: 1,
    marginLeft: 15,
  },
  tableContainer: {
    borderWidth: 1,
    margin: "5px",
    borderColor: "#dedede",
  },
  tableContainerMateriales: {
    borderWidth: 1,
    margin: "5px",
    borderColor: "#ebebeb",
  },
  tableContainerTransparente: {
    borderWidth: 1,
    textAlign: "center",
    margin: "10px",
    borderColor: "white",
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    padding: 5,
    backgroundColor: "#dedede",
    fontFamily: "Times-Roman",
  },
  tableHeader: {
    flexDirection: "row",

    backgroundColor: "white",
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "#f9f5ff",
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  tableCellMateriales: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 0,
    
  },
  tableCellModulo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 0,
    backgroundColor: "#ebebeb",
    textAlign:"justify"
    
  },
  tableCellRegistors: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    padding: 3,
    textAlign: "left",
  },
  tableCellRegistorsItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    padding: 3,
    textAlign: "left",
    left: 18,
  },
  tableCellRegistorsItemDerecha: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    padding: 3,
    textAlign: "left",
    left: 5,
  },
  encabezadoHeader: {
    flex: 1,
    fontWeight: "extrabold",
    borderWidth: 1,
    borderColor: "white",
    textAlign: "left",
  },
  cellTextHeader: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
  },
  cellTextHeaderItems: {
    fontSize: 14,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    left: 15,
    bottom: 5,
  },
  cellText: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    padding: 2,
  },
  cellTextData: {
    fontSize: 10,
    fontFamily: "Times-Roman",
    textAlign: "center",
    padding: 1,
    fontWeight: "bold",

  },
  cellTextUnderline: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  cellTextTabla: {
    fontSize: 10,
    fontFamily: "Times-Roman",
  },
  cellTextRegistros: {
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  headerCellText: {
    fontSize: 10,
    fontFamily: "Times-Roman",
    textAlign: "center",
    fontWeight: "700"
    //backgroundColor: "#ebebeb",
  },
  detallesTitle: {
    top: 35,
    left: 20,
    fontSize: 20,
    fontFamily: "Times-Roman",
  },
  headerTextoDerecho: {
    top: 10,
    textAlign: "right",
    fontSize: 14,
    fontFamily: "Times-Roman",
  },
  columnsContainer3: {
    top: 0,
    right: 0,
    justifyContent: "space-between",
  },
});

// bueno xd
function ReporteModuloDiaReporte() {

  const reportModuloDia = ReporteModuloDiaServices();
  const location = useLocation();
  const DatosPrincipales = location.state;
  const [dataDetalle, setdataDetalle] = useState([]);
  const cantidadTotal =
    DatosPrincipales["remo_TotalDia"] - DatosPrincipales["remo_TotalDanado"];
  const Regresar = () => {
    History.push("/ReporteModulo/index");
  };

  // Trae los datos con los detalles
  
  const user = JSON.parse(localStorage.getItem('user'));
 
  const MyDoc = () => (
    <Document title="ReporteModuloDia.pdf" creator="SIMEXPRO" author="SIMEXPRO">
      <Page size="A4" style={styles.page}>
        <View style={styles.headerParteIzq} fixed>
          <Image
            src={"https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png"}
            style={{ height: 40, width: 210 }}
          />
        </View>
        <View style={styles.image} fixed>
          <Image
            src={"https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png"}
            style={{ height: 38, width: 100 }}
          ></Image>
        </View>

        <View style={styles.columnsContainer3} fixed>
          <Text style={styles.detallesTitle}>Reporte de Modulo </Text>
          <Text style={styles.headerTextoDerecho}>
            Fecha: {" "}
            {new Date(DatosPrincipales["remo_Fecha"]).toLocaleString("es-US", {
              dateStyle: "short",
            })}{" "}
          </Text>
          <Text style={styles.headerTextoDerecho}>
            No. de Reporte: #{DatosPrincipales["remo_Id"]}
          </Text>
        </View>

        <View style={styles.line} fixed></View>
        <View style={{ marginBottom: 20 }} fixed/>

        {/* Contenido*/}
        <View style={styles.tableContainerTransparente}>
          {/* Encabezado */}
          <View style={styles.tableHeader}>
            <View style={styles.encabezadoHeader}>
              <Text style={styles.cellTextHeader}>Modulo</Text>
            </View>
            <View style={styles.encabezadoHeader}>
              <Text style={styles.cellTextHeader}>Datos del Modulo</Text>
            </View>
          </View>

          {/* Contenido */}
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>
                • Nombre del modulo: {DatosPrincipales["modu_Nombre"].length > 0 ? DatosPrincipales["modu_Nombre"] : "Nombre del modulo no disponible"}
                <Text style={styles.cellTextUnderline}> </Text>
              </Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>
                • Cantidad Terminada: {DatosPrincipales["remo_TotalDia"]}
                <Text style={styles.cellTextUnderline}> </Text>
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>
                • Fecha:{" "}
                {new Date(DatosPrincipales["remo_Fecha"].toString().length > 0 ? DatosPrincipales["remo_Fecha"] : "Fecha no disponible").toLocaleString(
                  "es-US",
                  { dateStyle: "short" }
                )}
                <Text style={styles.cellTextUnderline}> </Text>
              </Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>
                • Cantidad dañada: {DatosPrincipales["remo_TotalDanado"]}
                <Text style={styles.cellTextUnderline}> </Text>
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>
              • Empleado acargo: {DatosPrincipales["empleado"]}
                <Text style={styles.cellTextUnderline}> </Text>
              </Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>
                • Cantidad Total: {cantidadTotal}
                <Text style={styles.cellTextUnderline}> </Text>
              </Text>
            </View>
          </View>
          {/* continua de la misma manera para agregar datos */}
        </View>

        <View style={{ marginBottom: 5 }} />

        {/* Datos de la tabla */}
        <View style={styles.columnsContainer}>

          {/* Encabdezado de la tabla */}
          <View style={styles.columnsContainer}>
              <View style={styles.tableContainer}>
                  <View style={styles.tableRow}>

                    <View style={styles.tableCellModulo}>
                      <Text style={styles.headerCellText}>Codigo de Orden Compra</Text>
                    </View>
                    <View style={styles.tableCellModulo}>
                      <Text style={styles.headerCellText}>Prenda</Text>
                    </View>
                    <View style={styles.tableCellModulo}>
                      <Text style={styles.headerCellText}>Tipo de Prenda</Text>
                    </View>
                    <View style={styles.tableCellModulo}>
                      <Text style={styles.headerCellText}>Color</Text>
                    </View>
                    <View style={styles.tableCellModulo}>
                      <Text style={styles.headerCellText}>             Cantidad    Terminada</Text>
                    </View>
                    <View style={styles.tableCellModulo}>
                      <Text style={styles.headerCellText}>Cantidad Dañada</Text>  
                    </View>
                    <View style={styles.tableCellModulo}>
                      <Text style={styles.headerCellText}>Cantidad Total</Text>
                    </View>

                  </View>
                  
                   

                  {/* contenido de la tabla */}
                  {DatosPrincipales.detalles.map((material, materialIndex) => (
                  <View key={materialIndex} style={styles.tableRow}>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellTextData}>{material.orco_Codigo}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellTextData}>{material.esti_Descripcion}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellTextData}>{material.Sexo}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellTextData}>{material.colr_Nombre}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellTextData}>{material.rdet_TotalDia}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellTextData}>{material.rdet_TotalDanado}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellTextData}>{material.rdet_TotalDia - material.rdet_TotalDanado}</Text>
                    </View>
                  </View>
                ))}

          </View>
        </View>
        </View>

        <Text style={styles.pageDate} render={({ }) => (
          `Fecha de Impresión: ${ new Date().toLocaleString(  "es-US", { dateStyle: "short" } )}`
        )} fixed />
        <Text style={styles.pageUser} render={({ }) => (
          `Usuario:${user.data.displayName}`
        )} fixed />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
  return (
    <>
      <Card sx={{ minWidth: 275, margin: "40px" }}>
        <CardMedia
          component="img"
          height="200"
          className="mb-24"
          image="https://i.ibb.co/DfZ8SL7/REPORTEs-M-DULO.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PDFDownloadLink document={<MyDoc />} fileName="Reporte.pdf">
              {" "}
            </PDFDownloadLink>
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
              <MyDoc />
            </PDFViewer>
          </Grid>
        </Grid>
 
        <Button
          variant="contained"
          style={{ position: "fixed", top: "76%", right: "5%" }}
          onClick={Regresar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Regresar
        </Button>
      </Card>
    </>
  );
}
export default ReporteModuloDiaReporte;

 