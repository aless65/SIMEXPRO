/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  Card,
  CardMedia,
  Button,
  FormControl,
  Icon,
  Grid,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import {  useState } from "react";
import History from "src/@history/@history";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Se suma 1 ya que los meses comienzan en 0
const año = fechaActual.getFullYear();
const hora = fechaActual.getHours();
const minutos = fechaActual.getMinutes();
const segundos = fechaActual.getSeconds();

const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

Font.register({
  family: "Arial",
  fonts: [
    {
      src: `https://db.onlinewebfonts.com/t/8d223b3ad8d4819e9dcf22757e4cc2c4.ttf`,
    },
    {
      src: `https://db.onlinewebfonts.com/t/3d6b457e3aa0c0b78e6fbf0355bc43a6.ttf`,
      fontWeight: "bold",
    },
  ],
});

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
    paddingBottom: 40,
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
    // justifyContent: 'space-between',
  },
  columnsContainer2: {
    top: 0,
    right: 0,
    flexDirection: "row",
    // justifyContent: 'space-between',
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
    borderWidth: 1,
    fontFamily: "Times-Roman",
    borderColor: "white",
    textAlign: "left",
  },
  cellTextHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cellTextHeaderItems: {
    fontSize: 12,
    fontWeight: "bold",
    left: 15,
    bottom: 5,
  },
  cellText: {
    fontSize: 11,
    padding: 2,
    fontFamily: "Times-Roman",
  },
  cellTextUnderline: {
    fontSize: 11,
    textDecorationLine: "underline",
    fontFamily: "Times-Roman",
  },
  cellTextTabla: {
    fontSize: 10,
    fontFamily: "Times-Roman",
  },
  cellTextRegistros: {
    fontSize: 11,
    fontFamily: "Times-Roman",
  },
  headerCellText: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    textAlign: "center",
    backgroundColor: "#ebebeb",
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
    fontSize: 9,
    fontFamily: "Times-Roman",
  },
  columnsContainer3: {
    top: 0,
    right: 0,
  },
  image2: {
    borderRadius: 5,
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden",
    objectFit: "cover",
  },
});

function RevisionCalidadReporte() {
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const [selectedId, setSelectedId] = useState(0);
  const [ddl, setDdl] = useState([]);
  const user = useSelector(selectUser);
  const Regresar = () => {
    History.push("/RevisionCalidad/index");
  };


  if (location.state === null) {
    History.back();
  }

  // useEffect(() => {
  //   ddlget();
  // }, [selectedId]);

  // const getdata = async (param) => {
  //   setSelectedId(param);
  //   try {
  //     const reportesProduccionService = ReportesProduccionService();
  //     const data = await reportesProduccionService.PedidosCliente(param);
  //     setData(data);
  //     
  //   } catch (error) {
  //     
  //   }
  // };

  // const ddlget = async () => {
  //   try {
  //     const load_DDLs = Load_DDLs();
  //     const data = await load_DDLs.Clientes();
  //     setDdl(data);
  //   } catch (error) {
  //     
  //   }
  // };

  const MyDoc = () => (
    <Document
      title="ReporteRevisionCalidad.pdf"
      creator="SIMEXPRO"
      author="SIMEXPRO"
    >
      <Page size="A4" style={{ ...styles.page }}>
        <View style={styles.headerParteIzq} fixed>
          {/* Header Image */}
          <Image
            src="https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png"
            style={{ height: 40, width: 210 }}
          />
        </View>
        <View style={styles.image} fixed>
          <Image
            src="https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png"
            style={{ height: 38, width: 100 }}
          />
        </View>
        <View style={styles.columnsContainer3} fixed>
          <Text style={styles.detallesTitle}>Revión de calidad</Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
        </View>
        <View style={styles.line} fixed/>

        <View style={{ marginBottom: 25 }} fixed/>

        <View style={{ display: "flex" }}>
          <View style={styles.tableContainerTransparente}>
            <View style={styles.tableHeader}>
              <View style={styles.encabezadoHeader}>
                <Text style={styles.cellTextHeader}>Orden de proceso</Text>
              </View>
            </View>
            {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Estilo:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {" "}
                    {data ? data.esti_Descripcion : " "}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Cantidad pedida:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data ? data.ensa_Cantidad : " "}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Proceso:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data ? data.proc_Descripcion : " "}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Módulo:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data ? data.modu_Nombre : " "}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Fecha de inicio:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data
                      ? new Date(data.ensa_FechaInicio).toLocaleString()
                      : " "}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Fecha limite:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data
                      ? new Date(data.ensa_FechaLimite).toLocaleString()
                      : " "}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Supervisor:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data ? data.empl_NombreCompleto : " "}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
          <View style={{ ...styles.columnsContainer }}>
            <View key={1} style={styles.tableContainer}>
              {/* Encabezados de la tabla */}
              <View style={styles.encabezadoHeader}>
                <Text style={styles.tableTitle}>Revisiónes</Text>
              </View>
              <View style={styles.tableRow}>
                <View style={{ ...styles.tableCellMateriales, flex: 1 }}>
                  <Text style={styles.headerCellText}>Imagen</Text>
                </View>
                <View style={{ ...styles.tableCellMateriales, flex: 2 }}>
                  <Text style={styles.headerCellText}>Informacion</Text>
                </View>
              </View>
              {/* Datos correspondientes a esta posición de data */}
              {data.detalles.length > 0 ? (
                data.detalles.map((detalle, detalleIndex) => (
                  <View style={{ ...styles.tableRow, borderBottomWidth: 2 }}>
                    <View
                      style={{
                        ...styles.tableCellRegistors,
                      }}
                    >
                      <Image
                        style={styles.image2}
                        src={detalle.reca_Imagen}
                      ></Image>
                    </View>
                    <View style={{ ...styles.tableCellRegistors, flex: 2 }}>
                      <View style={{ ...styles.tableRow }}>
                        <Text style={styles.cellText}>
                          • Fila:{" "}
                          <Text style={styles.cellTextUnderline}>
                            {data
                              ? detalle.key
                              : "---"}
                          </Text>
                        </Text>
                      </View>
                      <View style={{ ...styles.tableRow }}>
                        <Text style={styles.cellText}>
                          • Descripcion:{" "}
                          <Text style={styles.cellTextUnderline}>
                          {data
                              ? detalle.reca_Descripcion
                              : "---"}
                          </Text>
                        </Text>
                      </View>
                      <View style={{ ...styles.tableRow }}>
                        <Text style={styles.cellText}>
                          • Cantidad:{" "}
                          <Text style={styles.cellTextUnderline}>
                          {data
                              ? detalle.reca_Cantidad
                              : "---"}
                          </Text>
                        </Text>
                      </View>
                      <View style={{ ...styles.tableRow }}>
                        <Text style={styles.cellText}>
                          • Fecha Revision:{" "}
                          <Text style={styles.cellTextUnderline}>
                            {data
                              ? new Date(detalle.reca_FechaRevision).toLocaleString("es-US", {dateStyle: "short"})
                              : " "}
                          </Text>
                        </Text>
                      </View>
                      <View style={{ ...styles.tableRow }}>
                        <Text style={styles.cellText}>
                          • Es scrap:{" "}
                          <Text style={styles.cellTextUnderline}>
                            {data
                                ? detalle.reca_Scrap? "Si" : "No"
                                : "---"}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  //   <View key={detalleIndex} style={styles.tableRow}>
                  //     <View style={styles.tableCellMateriales}>
                  //       <Text style={styles.cellText}>{detalle.key}</Text>
                  //     </View>
                  // <View style={{...styles.tableCellMateriales, flex:4}}>
                  //       <Text style={styles.cellText}>{detalle.reca_Descripcion}</Text>
                  //     </View>
                  //     <View style={styles.tableCellMateriales}>
                  //       <Text style={styles.cellText}>{detalle.reca_Cantidad}</Text>
                  //     </View>
                  // <View style={{...styles.tableCellMateriales, flex:2}}>
                  //       <Text style={styles.cellText}>{new Date(detalle.reca_FechaRevision).toLocaleString()}</Text>
                  //     </View>
                  //     <View style={styles.tableCellMateriales}>
                  //       {/* <Text style={styles.cellText}>{detalle.reca_Scrap}</Text> */}
                  //       <Image src={detalle.reca_Imagen}></Image>
                  //     </View>
                  //     {/* Agrega aquí otros campos que necesites */}
                  //   </View>
                ))
              ) : (
                <View style={{ ...styles.tableRow, textAlign: "center" }}>
                  <View style={styles.tableCellMateriales}>
                    <Text style={styles.cellText}>
                      Orden sin Revisiónes
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 5 }} />

        <Text
          style={styles.pageDate}
          render={({}) => `Fecha de Impresión: ${fechaFormateada}`}
          fixed
        />
        <Text
          style={{ ...styles.pageUser, textTransform: "capitalize" }}
          render={({}) => `Usuario: ${user.data.displayName}`}
          fixed
        />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Página: ${pageNumber} de ${totalPages}`
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
          image="https://i.ibb.co/pwQbH4s/REVISI-N-DE-CALIDAD.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={3}>
          {/* <Grid item xs={6} md={6} className="mx-auto">
            <FormControl fullWidth>
              <FormLabel className="mt-5">Cliente</FormLabel>
              <Select
                size="small"
                value={selectedId}
                onChange={(event) => getdata(event.target.value)}
              >
                <MenuItem key={0} value={0}>
                  Seleccione un Cliente
                </MenuItem>
                {ddl.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
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
export default RevisionCalidadReporte;
