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
import { Card, CardMedia, Button, Icon, Grid, Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import History from "src/@history/@history";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import * as antd from "antd";
import ReportesAduanasService from "./ReportesAduanaService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
const { RangePicker } = antd.DatePicker;

const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
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
    left: "14%",
    width: "75%",
  },
});

function Reporte_DevasPendientes() {
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const [fechainicial, setfechainicial] = useState("");
  const [fechafinal, setfechafinal] = useState("");
  const [PDF, setPDF] = useState([]);
  const [dateRange, setDateRange] = useState({});

  const Regresar = () => {
    History.push("/Inicio/Produccion");
  };

  useEffect(() => {}, []);

  const getdata = async (fechainicio, fechafin) => {
    try {
      setPDF("cargando");
      const reportesAduanasService = ReportesAduanasService();
      const data = await reportesAduanasService.DevasPendientes(
        fechainicio,
        fechafin
      );
      if (data?.length != 0) {
        setPDF(true);
        setData(data);
      } else {
        setPDF(false);
        toast.warning(
          `No se han encontrado datos en el rango de ${fechainicio} - ${fechafin}`,
          {
            theme: "dark",
            style: {
              marginTop: "50px",
            },
            autoClose: 1500,
            closeOnClick: true,
            pauseOnFocusLoss: true,
          }
        );
      }
      data.length === 0 ? setPDF("cargado") : setPDF(data);
    } catch (error) {}
  };

  const MyDoc = () => (
    <Document
      title="Despachos_Periodo.pdf"
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
          <Text style={styles.detallesTitle}>Reporte Despachos Pendientes</Text>
          <Text style={styles.headerTextoDerecho}>
            DATOS BASADOS EN EL RANGO DE:
          </Text>
          <Text style={styles.headerTextoDerecho}>
            {fechainicial} - {fechafinal}
          </Text>
        </View>
        <View style={styles.line} fixed />
        <View style={{ marginBottom: 30 }} fixed />
        <View style={{ display: "flex" }}>
          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
          <View style={{ ...styles.columnsContainer }}>
            -
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
                      Declaración de Valor - {datos.deva_Id}
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
                        <Text style={styles.cellTextHeader}>Datos DEVA</Text>
                      </View>
                    </View>
                    {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
                    <View style={{ ...styles.tableRow }}>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          • Aduana de Ingreso:{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          • Aduana de Despacho:{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>• Código Incoterm: </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow }}>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? data[Index].adua_IngresoCodigo + " "
                            : " "}
                          {data.length > 0
                            ? data[Index].adua_IngresoNombre
                            : " "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? data[Index].adua_DespachoCodigo + " "
                            : " "}
                          {data.length > 0
                            ? data[Index].adua_DespachoNombre
                            : " "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? data[Index].inco_Codigo + " "
                            : " "}
                          {data.length > 0
                            ? data[Index].inco_Descripcion + " "
                            : " "}
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginTop: "8px" }}>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          • País de Exportación:{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>• País de Entrega: </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          • Fecha de Exportación:{" "}
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow }}>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? data[Index].pais_ExportacionNombre
                            : " "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? data[Index].pais_EntregaNombre
                            : " "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0 && data[Index].deva_FechaExportacion
                            ? data[Index].deva_FechaExportacion.slice(
                                0,
                                data[Index].deva_FechaExportacion.indexOf("T")
                              )
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
                          Datos Importador
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginTop: "8px" }}>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>• RTN Importador: </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          • Correo Electronico:{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>• Teléfono: </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow }}>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0 ? data[Index].impo_RTN : " "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0
                            ? data[Index].impo_Correo_Electronico
                            : " "}
                        </Text>
                      </View>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>
                          {data.length > 0 ? data[Index].impo_Telefono : " "}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ))}
          </View>
        </View>

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
          image="https://i.ibb.co/NKgH9cW/DESPACHOS-PENDIENTES.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={3}>
          <Grid item xs={6} md={6} className="mx-auto">
            <RangePicker
              size="large"
              style={{ width: "100%" }}
              placeholder={["Fecha inicio", "Fecha fin"]}
              value={dateRange}
              onChange={(value) => {
                setDateRange(value);
                if (value && value.length === 2) {
                  getdata(
                    value[0].format("YYYY-MM-DD"),
                    value[1].format("YYYY-MM-DD")
                  );
                  setfechainicial(value[0].format("YYYY-MM-DD"));
                  setfechafinal(value[1].format("YYYY-MM-DD"));
                } else {
                  setfechainicial("");
                  setfechafinal("");
                }
              }}
            />
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
                (PDF.length > 0 && PDF !== "cargando" && PDF !== "cargado")
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
export default Reporte_DevasPendientes;
