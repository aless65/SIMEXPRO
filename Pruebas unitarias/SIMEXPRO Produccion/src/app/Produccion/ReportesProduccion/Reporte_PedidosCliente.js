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
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import axios from "axios";
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
});

function PedidosCliente() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [ddl, setDdl] = useState([]);
  const user = useSelector(selectUser);
  const [PDF, setPDF] = useState([]);
  const [grafica, setGrafica] = useState(null);

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
      const data = await reportesProduccionService.PedidosCliente(param);
      setData(data);

      let CantidadF = 0;
      let CantidadM = 0;
      let CantidadU = 0;

      data.forEach((datos) => {
        datos.detalles.forEach((detalle) => {
          if (detalle.code_Sexo === "F") {
            CantidadF += detalle.code_CantidadPrenda;
          }
          if (detalle.code_Sexo === "M") {
            CantidadM += detalle.code_CantidadPrenda;
          }
          if (detalle.code_Sexo === "U") {
            CantidadU += detalle.code_CantidadPrenda;
          }
          console.log(detalle)
        });
      });

      const labels = ["Femenino", "Masculino", "Unisex"];
      const datasets = [CantidadF, CantidadM, CantidadU];

      const chartconfig = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Cantidad por tipo de Medida",
              data: datasets,
              backgroundColor: [
                "#FF69B480", // Rosa con 50% de transparencia
                "#0000FF80", // Azul con 50% de transparencia
                "#80008080", // Morado con 50% de transparencia
              ],
              borderColor: [
                "#FF69B4", // Rosa
                "#0000FF", // Azul
                "#800080", // Morado
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            align: "end",
            display: true,
            position: "top",
            text: "Total de Prendas por Tipo de Medida",
          },
          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              color: "#fff",
              backgroundColor: [
                "#FF69B480", // Rosa con 50% de transparencia
                "#0000FF80", // Azul con 50% de transparencia
                "#80008080", // Morado con 50% de transparencia
              ],
              borderColor: [
                "#FF69B4", // Rosa
                "#0000FF", // Azul
                "#800080", // Morado
              ],
              borderWidth: 1,
              borderRadius: 5,
              formatter: (value) => {
                return value + "k";
              },
            },
          },
        },
      };

      const chartconfigJSON = JSON.stringify(chartconfig);
      const chartconfigEncoded = encodeURIComponent(chartconfigJSON);
      const quickChartUrl = `https://quickchart.io/chart?c=${chartconfigEncoded}`;

      const { request } = await axios.get(quickChartUrl);
      setGrafica(request.responseURL);
      data.length === 0 ? setPDF("cargado") : setPDF(data);
    } catch (error) { }
  };

  const ddlget = async () => {
    try {
      const load_DDLs = Load_DDLs();
      const data = await load_DDLs.Clientes();
      setDdl(data);
    } catch (error) { }
  };

  const MyDoc = () => (
    <Document
      title="ReportePedidosCliente.pdf"
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
          <Text style={styles.detallesTitle}>Ordenes de Compra Cliente</Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
        </View>
        <View style={styles.line} fixed />

        <View style={{ marginBottom: 30 }} fixed />

        <View style={{ display: "flex" }}>
          <View style={styles.tableContainerTransparente}>
            <View style={styles.tableHeader}>
              <View style={styles.encabezadoHeader}>
                <Text style={styles.cellTextHeader}>Datos del Cliente</Text>
              </View>
            </View>
            {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Nombre o Razón social:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {" "}
                    {data.length > 0 ? data[0].clie_Nombre_O_Razon_Social : " "}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Pedidos Pendientes:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].pedidosPendientes : " "}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Cliente RTN:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].clie_RTN : " "}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Pedidos en Curso:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].pedidosCurso : " "}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Correo Electronico:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].clie_Correo_Electronico : " "}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Pedidos Terminados:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].pedidosTerminados : " "}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Nombre de contacto:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].clie_Nombre_Contacto : " "}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Número de teléfono Contacto:{" "}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].clie_Numero_Contacto : " "}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
          <View style={{ ...styles.columnsContainer }}>
            {data &&
              data.map((datos, Index) => (
                <View key={Index} style={styles.tableContainer}>
                  {/* Encabezados de la tabla */}
                  <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginBottom: "-6px",
                    }}
                  >
                    <Text style={{ ...styles.tableTitle, fontWeight: "bold" }}>
                      Orden de Compra #{datos.modu_Nombre}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.tableContainerTransparente,
                      textTransform: "uppercase",
                    }}
                  >
                    {/* Encabezados de la tabla */}
                    <View
                      style={{
                        ...styles.tableRow,
                        backgroundColor: "#dcc26599",
                        border: "none",
                      }}
                    >
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Estilo</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Talla</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Medida</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Color</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Cantidad de Pedido</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Cantidad Completada</Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          Porcentaje Completado
                        </Text>
                      </View>
                    </View>

                    {datos && datos.detalles ? (
                      datos.detalles.map((detalle, detalleIndex) => (
                        <View
                          key={detalleIndex}
                          style={[
                            styles.tableRow,
                            {
                              backgroundColor:
                                detalleIndex % 2 === 0 ? "#fff" : "#eee",
                            },
                          ]}
                        >
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle?.esti_Descripcion}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle?.tall_Nombre}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle?.code_Sexo}
                            </Text>
                          </View>
                          <View style={{ ...styles.tableCellRegistors, alignItems: "center", justifyContent: "center", }}>
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 20,
                                height: 20,
                                backgroundColor: detalle?.proc_Descripcion,
                                borderRadius: 10,
                              }}
                            >
                            </View>
                            <Text style={styles.cellText}>
                              {detalle?.colr_Nombre}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle?.code_CantidadPrenda}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle?.CantidadCompletada}
                            </Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>
                              {detalle?.PorcentajeCompleado}%
                            </Text>
                          </View>
                          {/* Agrega aquí otros campos que necesites */}
                        </View>
                      ))
                    ) : (
                      <View style={{ ...styles.tableRow, textAlign: "center" }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={styles.cellText}>
                            Orden de compra sin detalles
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              ))}
          </View>
        </View>

        <View style={{ marginBottom: 5 }} />

        <View style={styles.lineGrafica} />
        <View style={styles.ContainerGrafica}>
          <Image source={grafica} style={{ width: "100%" }} />
        </View>

        <Text
          style={styles.pageDate}
          render={({ }) => `Fecha de Impresión: ${fechaFormateada}`}
          fixed
        />
        <Text
          style={{ ...styles.pageUser, textTransform: "capitalize" }}
          render={({ }) => `Usuario: ${user.data.displayName}`}
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
          image="https://i.ibb.co/801HH6Q/PEDIDOS-POR-CLIENTES-1.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={3}>
          <Grid item xs={6} md={6} className="mx-auto">
            <FormControl fullWidth>
              <FormLabel className="mt-5">Cliente</FormLabel>
              <Select
                size="small"
                value={selectedId}
                onChange={(event) => {
                  getdata(event.target.value);
                  setPDF(true);
                }}
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
export default PedidosCliente;
