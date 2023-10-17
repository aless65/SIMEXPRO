import {
  Button,
  Card,
  CardMedia,
  Grid,
  Icon,
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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import History from "src/@history/@history";
import MaquinaHistorialService from "./MaquinaHistorialService";

// import Table from "./components/reports/Table";

const styles = StyleSheet.create({
  line: {
    top: 20,
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
  image: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    top: 5,
    right: 30,
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
  headerParteIzq: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
  },
  tableContainer: {
    borderWidth: 1,
    margin: "5px",
    borderColor: "#dedede",
  },
  tableContainerTransparente: {
    borderWidth: 1,
    textAlign: "center",
    margin: "10px",
    borderColor: "white",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 10
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "#f9f5ff",
    // padding: 10
  },
  tableCellMateriales: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 0,
    textAlign: 'center',
    justifyContent: 'center'
  },
  tableCellMateriales2: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 0,
    textAlign: 'justify',
  },
  tableCellRegistors: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    padding: 3,
    textAlign: "left",
  },
  cellTextHeader: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    textAlign: 'left'
  },
  cellText: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    padding: 2,
    marginLeft: 13,
    marginTop: 5
  },
  cellTextObservaciones: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    padding: 3,
    marginLeft: 3,
  },
  cellTextUnderline: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  headerCellText: {
    fontSize: 10,
    fontFamily: "Times-Roman",
    textAlign: "center",
    backgroundColor: "#ebebeb",
  },
  detallesTitle: {
    top: 35,
    left: 10,
    fontSize: 20,
    fontFamily: "Times-Roman",
  },
  columnsContainer3: {
    top: 10,
    right: 0,
    justifyContent: "space-between",
  },
});

function MaquinaHistorialReporte() {

  const maquinaHistorialService = MaquinaHistorialService();
  const location = useLocation();
  const Datos = location.state;
  const [data, setData] = useState([]);
  const [numeroSerie, setNumeroSerie] = useState([]);

  //Peticion para cargar datos de la tabla
  const MaquinaTimeLineGetData = async () => {
    try {
      setNumeroSerie(await maquinaHistorialService.listarPorNumeroDeSerie(Datos['maqu_NumeroSerie']));
    } catch (error) {
    }
  };
    
  useEffect(() => {
    MaquinaTimeLineGetData();
  }, []);

    //Constante que usa el boton regresar en el Reporte
  const Regresar = () => {
    History.push("/Maquinas/index");
  };

  // Trae los datos con los detalles
  const user = JSON.parse(localStorage.getItem('user'));

  const MyDoc = () => (
    <Document title="MaquinaHistorialReporte.pdf" creator="SIMEXPRO" author="SIMEXPRO">
      <Page size="A4" style={styles.page}>
        <View style={styles.headerParteIzq} fixed>
          <Image
            src={"https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png"}
            style={{ height: 60, width: 260 }}
          />
        </View>
        <View style={styles.image} fixed>
          <Image
            src={"https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png"}
            style={{ height: 43, width: 110 }}
          ></Image>
        </View>
        <View style={{ marginBottom: 10 }} fixed/>

        <View style={styles.columnsContainer3} fixed>
          <Text style={styles.detallesTitle}>REPORTE DE MAQUINARIA</Text>
          <Text style={{ margin: 2 , fontSize: 10, textAlign: 'right', fontFamily: 'Times-Roman'}}>
          No. de Reporte: {Datos["maqu_Id"]}
          </Text>
          <Text style={{ margin: 6 , fontSize: 10, textAlign: 'right', fontFamily: 'Times-Roman'}}>
            Fecha: {" "}
            {new Date().toLocaleString("es-US", {
              dateStyle: "long",
            })}{" "}
          </Text>
        </View>

        <View style={styles.line} fixed></View>
        <View style={{ marginBottom: 20 }} fixed/>

        {/* Contenido*/}
        <View style={styles.tableContainerTransparente}>
          {/* Encabezado */}
          <View style={styles.tableHeader}>
            <View style={styles.encabezadoHeader}>
              <Text style={styles.cellTextHeader}>Datos de la Máquina</Text>
            </View>
          </View>

          {/* Contenido */}
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• No. de Serie: <Text style={styles.cellTextUnderline}> {Datos["maqu_NumeroSerie"]}</Text></Text>
              <Text style={styles.cellText}>• Módulo de la Máquina: <Text style={styles.cellTextUnderline}> {Datos["modu_Nombre"]}</Text></Text>
              <Text style={styles.cellText}>• Modelo de la Máquina: <Text style={styles.cellTextUnderline}> {Datos["mmaq_Nombre"]}</Text></Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 5 }} />

        {/* Datos de la tabla */}
        <View style={styles.columnsContainer}>

          {/* Encabdezado de la tabla */}
          <View style={styles.columnsContainer}>
              <View style={styles.tableContainer}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.headerCellText}>Fecha Inicio</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.headerCellText}>Fecha Fin</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.headerCellText}>Fuera de Servicio</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.headerCellText}>Observaciones</Text>
                    </View>
                  </View>

                  {/* contenido de la tabla */}
                  {numeroSerie ? numeroSerie.map((item, Index) => (
                  <View key={Index} style={styles.tableRow}>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellText}>{new Date(item.mahi_FechaInicio).toLocaleString()}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellText}>{new Date(item.mahi_FechaFin).toLocaleString()}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellText}>
                        {Math.floor(
                          Math.abs(
                            new Date(item.mahi_FechaInicio).getTime() - 
                            new Date(item.mahi_FechaFin).getTime()
                          ) / (1000 * 60 * 60 * 24)
                        )} días y {Math.floor(
                          (Math.abs(
                            new Date(item.mahi_FechaInicio).getTime() - 
                            new Date(item.mahi_FechaFin).getTime()
                          ) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                        )} horas
                      </Text>
                    </View>
                    <View style={styles.tableCellMateriales2}>
                      <Text style={styles.cellTextObservaciones}>{item.mahi_Observaciones}</Text>
                    </View>
                  </View>
                )): null}
          </View>
        </View>
        </View>

        <Text style={styles.pageDate} render={({ }) => (
          `Fecha de Impresión: ${ new Date().toLocaleString(  "es-US", { dateStyle: "short" } )}`
        )} fixed />
        <Text style={styles.pageUser} render={({ }) => (
          `Usuario :${user.data.displayName}`
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
          image="https://i.ibb.co/WcYVdCq/REPORTE-DE-M-QUINA.png"
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
export default MaquinaHistorialReporte;