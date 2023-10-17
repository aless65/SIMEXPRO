/* eslint-disable no-empty */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-empty-pattern */
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
  Collapse,
} from "@mui/material";
import { useEffect, useState } from "react";
import History from "src/@history/@history";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import ReportesProduccionService from "./ReportesProduccionService";
import { CircularProgress } from "@mui/material";

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
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  line: {
    top: 20,
    bottom: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: "#000000", // Color de la línea
  },
  line2: {
    top: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: 1,
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
    fontSize: 14,
    textAlign: "left",
    padding: 8,
    color: "white",
    backgroundColor: "#634a9eb0",
    fontFamily: "Times-Roman",
  },
  tableHeader: {
    flexDirection: "row",

    backgroundColor: "white",
  },
  tableRow: {
    flexDirection: "row",
    border: "none",
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  tableCellRegistors: {
    flex: 1,
    borderWidth: 0,
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
    fontSize: 12,
    textDecorationLine: "underline",
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
  lineGrafica: {
    top: 5,
    bottom: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: "#000000",
  },
  ContainerGrafica: {
    top: 0,
    right: 0,
    width: "100%",
  },
});

function MaquinasUso() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [ddl, setDdl] = useState([]);
  const user = useSelector(selectUser);
  const [PDF, setPDF] = useState([]);

  const Regresar = () => {
    History.push("/Inicio/Produccion");
  };

  useEffect(() => {
    ddlget();
  }, [selectedId]);

  const getdata = async (param) => {
    setSelectedId(param);
    try {
      setPDF("cargando");
      const reportesProduccionService = ReportesProduccionService();
      const data = await reportesProduccionService.Inventario(param);
      setData(data);
      data.length === 0 ? setPDF("cargado") : setPDF(data);
    } catch (error) {}
  };

  const ddlget = async () => {
    try {
      const load_DDLs = Load_DDLs();
      const data = await load_DDLs.Materiales();
      setDdl(data);
    } catch (error) {}
  };

  const MyDoc = () => (
    <Document
      title="ReporteTiemposMaquina.pdf"
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
          <Text style={styles.detallesTitle}>Reporte Inventario</Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
        </View>
        <View style={styles.line} fixed />
        <View style={{ marginBottom: 30 }} fixed />

        <View style={{ display: "flex" }}>
          <View style={{ ...styles.columnsContainer }}> 
            {data &&
              data.map((datos, Index) => (
                <>
                  <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginBottom: "-6px",
                    }}
                  >
                    <Text style={styles.tableTitle}>
                      {selectedId === 0
                        ? "Inventario de Todos los Materiales"
                        : data[0] &&
                          `Inventario de ${data[0].mate_Descripcion}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #d6d6d6",
                      padding: "2%",
                      textTransform: "uppercase",
                    }}
                  >
                    <View style={styles.tableHeader}>
                      <View style={styles.encabezadoHeader}>
                        <Text style={styles.cellTextHeader}>
                          Datos del Material
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow }}>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>‎</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>• Subcategoria: </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>• Categoria: </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow }}>
                      <View style={styles.tableCellRegistors}>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={
                              data[Index].mate_Imagen ||
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png"
                            }
                            style={{ height: 100, width: 100 }}
                          />
                        </View>
                      </View>

                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? `${data[Index].subc_Descripcion} `
                            : " "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? `${data[Index].cate_Descripcion} `
                            : " "}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        ...styles.line2,
                        backgroundColor: "#d6d6d6",
                        marginTop: "10px",
                        marginBottom: "8px",
                      }}
                    />
                    <View style={styles.tableHeader}>
                      <View style={styles.encabezadoHeader}>
                        <Text style={styles.cellTextHeader}>
                          Lotes del Material {data[Index].mate_Descripcion}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        ...styles.tableRow,
                        backgroundColor: "#dcc26599",
                        border: "none",
                      }}
                    >
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Código Lote</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>En Stock</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Área</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Unidad Medida</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Color</Text>
                      </View>
                    </View>
                    {data && data.length > 0 ? (
                      datos.detalles.map((detalle, detalleIndex) => (
                        <View
                          key={detalleIndex}
                          style={[
                            styles.tableRow,
                            {
                              backgroundColor:
                                detalleIndex % 2 === 0 ? "#fff" : "#eee",
                            }, // Aplicar el color de fondo según la condición
                          ]}
                        >
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle.lote_CodigoLote}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle.lote_Stock}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle.tipa_area}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle.unme_Descripcion}
                            </Text>
                          </View>
                          <View style={{ ...styles.tableCellRegistors }}>
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 20,
                                height: 20,
                                backgroundColor: detalle.colr_CodigoHtml,
                                borderRadius: 10,
                              }}
                            ></View>
                          </View>
                        </View>
                      ))
                    ) : (
                      <View style={{ ...styles.tableRow, textAlign: "center" }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={styles.cellText}>
                            No se encontraron datos
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </>
              ))}
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
            `Página: ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );

  const DocumentoPDF = () => {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowLoading(false);
      }, 750);

      return () => {
        clearTimeout(timeout);
      };
    }, []);

    const PDDDF = (
      <>
        <PDFDownloadLink document={<MyDoc />} fileName="Reporte.pdf">
          {" "}
        </PDFDownloadLink>
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <MyDoc />
        </PDFViewer>
      </>
    );

    if (showLoading) {
      return (
        // <Collapse in={showLoading}>
        <>
          <Grid
            container
            width={"100%"}
            spacing={2}
            marginBottom={"20px"}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <CircularProgress style={{ color: "#634a9e" }} />
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              Generando documento...
            </Grid>
          </Grid>
        </>
        // </Collapse>
      );
    } else {
      return PDDDF;
    }
  };

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
          <Grid item xs={6} md={6} className="mx-auto">
            <FormControl fullWidth>
              <FormLabel className="mt-5">Material</FormLabel>
              <Select
                size="small"
                value={selectedId}
                onChange={(event) => {
                  getdata(event.target.value);
                  setPDF(true);
                }}
              >
                <MenuItem key={-1} value={-1} selected>
                  Selecciona un Material
                </MenuItem>
                <MenuItem key={0} value={0}>
                  Ver Todos
                </MenuItem>
                {ddl.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Collapse timeout={0} in={PDF === `cargando` ? true : false}>
              <Grid
                container
                width={"100%"}
                spacing={2}
                marginBottom={"20px"}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <CircularProgress style={{ color: "#634a9e" }} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  Generando documento...
                </Grid>
              </Grid>
            </Collapse>

            <Collapse
              timeout={0}
              in={
                (PDF.length > 0 && PDF !== "cargando" && PDF !== "cargado") ||
                PDF === "cargado"
                  ? true
                  : false
              }
            >
              <DocumentoPDF />
            </Collapse>
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
export default MaquinasUso;
