import { Button, Card, CardMedia, Grid, Icon, Collapse } from "@mui/material";
import {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import History from "src/@history/@history";
import { useState, useEffect } from "react";
import DucaService from "./ducaService";
import instance from "src/app/auth/services/jwtService/jwtService";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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
  page: {
    flexDirection: "column",
    paddingBottom: 35,
    paddingTop: 35,
    //   backgroundColor: '#E4E4E4'
  },
  section: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  body: {
    margin: "0 15 0 15",
    position: "relative",
    // border: "1px solid red",
    // height: "100%",
    // width: "100%"
  },
  terminos: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
  },
  title: {
    fontSize: 20,
    margin: 10,
    padding: 10,
    textAlign: "left",
  },
  fecha: {
    fontSize: 16,
    margin: 10,
    padding: 10,
    marginLeft: "15%",
    display: "flex",
    textAlign: "right",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "right",
    color: "grey",
  },
  tableCol1: {
    height: 40,
    width: "83%",
    borderStyle: "solid",
    position: "absolute",
    top: 0,
    letf: 0,
    borderWidth: 2,
    // borderLeftWidth: 0,
    borderRightWidth: 0,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  CuadroQR: {
    backgroundColor: "white",
    width: "17%",
    borderStyle: "solid",
    borderWidth: 2,
    position: "absolute",
    top: 0,
    right: 0,
    // marginLeft: "84.959%",
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  ColumnaDUCA: {
    height: 25,
    width: "131%",
    transform: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 395.5,
    //right: 300.5,
    left: -356.5,
    borderWidth: 2,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  ColumnaExportadord: {
    height: 25,
    width: "15%",
    transform: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 69,
    left: -4.9,
    // right: 299,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  ColumnaImportador: {
    height: 25,
    width: "15%",
    transform: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 153.5,
    left: -4.9,
    // right: 299,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  ColumnaDeclarante: {
    height: 25,
    width: "15%",
    transform: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 238,
    left: -4,
    // right: 299,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  ColumnaConductor: {
    height: 25,
    width: "18%",
    transform: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 368.5,
    left: -13.5,
    // right: 299,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  ColumnaTransportista: {
    height: 25,
    width: "7%",
    transform: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 299,
    left: 17.5,
    // right: 299,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  ColumnaValoresTotales: {
    height: 25,
    width: "17%",
    transform: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 466,
    left: -10.7,
    // right: 299,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  ColumnaPIzquierda: {
    // height: 84,
    width: "35%",
    // trans  form: "rotate(270deg)",
    // borderStyle: "solid",
    position: "absolute",
    top: 39.5,
    left: 48.5,
    // right: 299,
    // borderWidth: 2,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol6: {
    // height: 84,
    width: "56.55%",
    // trans  form: "rotate(270deg)",
    borderStyle: "solid",
    position: "absolute",
    top: 39.5,
    left: 245,
    // right: 299,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  tableHea: {
    width: "14.28571428571429%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#af7df0",
  },
  ColumnaVTIzquierda: {
    // height: 84,
    width: "35%",
    // trans  form: "rotate(270deg)",
    // borderStyle: "solid",
    position: "absolute",
    top: 5555.5,
    left: 48.5,
    // right: 299,
    // borderWidth: 2,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 2,
    // borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  tableRow: {
    // margin: "auto",
    flexDirection: "row",
  },
  tableRowBorBT: {
    // margin: "auto",
    flexDirection: "row",
    borderWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableRowExportador: {
    flexDirection: "row",
  },
  tableRowEncabezado: {
    flexDirection: "row",
  },
  tableRowEncabezadoBorBT: {
    flexDirection: "row",
    borderWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColEncabezado: {
    height: 32,
    width: "84%",
    borderStyle: "solid",
    borderWidth: 2,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableColDuca: {
    width: "4%",
    borderStyle: "solid",
    borderWidth: 2,
    // borderLefttWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableColGeneral: {
    width: "96%",
    borderStyle: "solid",
    borderWidth: 2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    // border: "1px solid green",
  },
  tableColGI: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  tableColGD: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableColMI: {
    width: "55%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  tableColMD: {
    width: "45%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableCellEncabezado: {
    margin: "auto",
    fontSize: 10,
  },
  tableCellDuca: {
    margin: "auto",
    fontSize: 10,
    transform: "rotate(270deg)",
  },
  tableCellVertical: {
    width: "200%",
    margin: "auto",
    textAlign: "center",
    marginLeft: -10,
    fontSize: 5.5,
    transform: "rotate(270deg)",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  tableCol1_0: {
    // height: 40,
    width: "10%",
    borderStyle: "solid",
    borderWidth: 2,
    // borderRightWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1_ValorT: {
    // height: 40,
    width: "4%",
    borderStyle: "solid",
    borderWidth: 2,
    // borderRightWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  tableCol_1: {
    // height: 40,
    width: "90%",
    borderStyle: "solid",
    borderWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_1: {
    // height: 40,
    width: "50%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_100: {
    // height: 40,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_55: {
    // height: 40,
    width: "55%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_45: {
    // height: 40,
    width: "45%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_2: {
    // height: 40,
    width: "73%",
    borderStyle: "solid",
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_23: {
    // height: 40,
    width: "23%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_20: {
    // height: 40,
    width: "20%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_15: {
    // height: 40,
    width: "15%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_33: {
    // height: 40,
    width: "33%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_22: {
    // height: 40,
    width: "22%",
    borderStyle: "solid",
    borderWidth: 2,
    // borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_35: {
    // height: 40,
    width: "35%",
    borderStyle: "solid",
    borderWidth: 0,
    // borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_34: {
    // height: 40,
    width: "34%",
    borderStyle: "solid",
    borderWidth: 0,
    // borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_33: {
    // height: 40,
    width: "33%",
    borderStyle: "solid",
    borderWidth: 0,
    // borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_44: {
    // height: 40,
    width: "44%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_40: {
    // height: 40,
    width: "40%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_43: {
    // height: 40,
    width: "43%",
    borderStyle: "solid",
    borderWidth: 2,
    // borderRightWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_25: {
    // height: 40,
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_75: {
    // height: 40,
    width: "75%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_65: {
    // height: 40,
    width: "65%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_70: {
    // height: 40,
    width: "70%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_96: {
    // height: 40,
    width: "96%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomWidth: 0,
  },
  tableCol1_50: {
    // height: 40,
    width: "50%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_46: {
    // height: 40,
    width: "46.5%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_11_1: {
    // height: 40,
    width: "11.11111111111111%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_22_2: {
    // height: 40,
    width: "22.22222222222222%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCol1_46T: {
    // height: 40,
    marginTop: 18.5,
    width: "46.5%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    // borderLefttWidth: 0,
    borderBottomWidth: 0,
  },
  tableCell: {
    width: "100%",
    marginLeft: "3",
    marginTop: 3,
    fontSize: 6,
    fontFamily: "Arial",
  },
  tableCellReverso: {
    width: "100%",
    marginLeft: "3",
    marginTop: 3,
    fontSize: 8.5,
    fontFamily: "Arial",
  },
  tableCellBold: {
    width: "100%",
    marginLeft: "3",
    marginTop: 3,
    fontSize: 6,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  tableCellCenter: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    marginTop: 3,
    fontSize: 6,
    fontFamily: "Arial",
  },
  tableCellCenterBold: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    marginTop: 3,
    fontSize: 6,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  tableCellVTCenter: {
    width: "100%",
    textAlign: "center",
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 6,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  tableCellLiquidacionCenter: {
    width: "100%",
    textAlign: "center",
    margin: "auto",
    fontSize: 6,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
});

function DucaReporte() {
  const location = useLocation();

  if (location.state === null) {
    History.back();
  }

  const ducaService = DucaService();
  const [view, setView] = useState([]);
  const [data, setData] = useState([]);
  const [valoresTotales, setValoresTotales] = useState([]);
  const [liquidacionGeneral, setLiquidacionGeneral] = useState([]);
  const [mercancias, setMercancias] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [fechaActual, setFechaActual] = useState(
    instance.formatFechaHora(new Date())
  );

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
     setView("cargando");
      const x = await ducaService.GenerarDuca(location.state);
      setData(x.data.data);

      setValoresTotales(
        JSON.parse(
          x.data.data[0]?.valoresTotales
            ? x.data.data[0].valoresTotales
            : "[{}]"
        )
      );
      setLiquidacionGeneral(
        JSON.parse(
          x.data.data[0]?.liquidacionGeneral
            ? x.data.data[0].liquidacionGeneral
            : "[{}]"
        )
      );
      setMercancias(
        JSON.parse(
          x.data.data[0]?.mercancias ? x.data.data[0].mercancias : "[{}]"
        )
      );
      setDocumentos(
        JSON.parse(
          x.data.data[0]?.documentos ? x.data.data[0].documentos : "[{}]"
        )
      );
      // setMercancias(JSON.parse(x.data.data[0].mercancias));
      // setDocumentos(JSON.parse(x.data.data[0].documentos));
      console.log(x)
      x.length === 0 ? setView("cargado") : setView(x.data.data);
      // setTimeout(setView(true),500)
  }


  const Regresar = () => {
    History.push("/Duca/index");
  };

  const MyDoc = () => (
    <Document
      title={`Duca-${data?.length > 0 ? data[0].duca_No_Duca : "----"}.pdf`}
      creator="SIMEXPRO"
      author="SIMEXPRO"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View style={{ ...styles.table, border: 0 }}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1_50}>
                <Text
                  style={{
                    fontSize: "7px",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  Fecha y Hora de Impresión:{" "}
                  {new Date(fechaActual).toLocaleString()}
                </Text>
              </View>
              <View style={styles.tableCol1_50}>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: "7px",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  ANEXO I DE LA RESOLUCIÓN No. 409-2018 (COMIECO-LXXXV)
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRowEncabezado}>
              <View style={styles.tableColEncabezado}>
                <Text
                  style={{
                    ...styles.tableCellEncabezado,
                    marginBottom: 0,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  DECLARACIÓN ÚNICA CENTROAMERICANA (DUCA)
                </Text>
                <Text
                  style={{
                    ...styles.tableCellEncabezado,
                    marginTop: 0,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  --IMPRESA--
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColDuca}>
                <Text
                  style={{
                    ...styles.tableCellDuca,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  DUCA-D
                </Text>
              </View>
              <View style={styles.tableColGeneral}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColGI}>
                    <View style={styles.tableRowExportador}>
                      <View style={styles.tableCol1_0}>
                        <Text style={styles.tableCellVertical}>
                          Exportador / Proveedor
                        </Text>
                      </View>
                      <View style={styles.tableCol_1}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCell}>
                              4.1. No. Identificación
                            </Text>
                          </View>
                          <View style={styles.tableCol1_35}>
                            <Text style={styles.tableCell}>
                              4.2. Tipo Identificación
                            </Text>
                          </View>
                          <View style={styles.tableCol1_15}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_TipoIdentificacionExportador
                                  ? data[0].duca_TipoIdentificacionExportador
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].prov_NumeroIdentificacion
                                  ? data[0].prov_NumeroIdentificacion
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_35}>
                            <Text style={styles.tableCell}>
                              4.3. País Emisión
                            </Text>
                          </View>
                          <View style={styles.tableCol1_15}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_PaisExportador
                                  ? data[0].duca_PaisExportador
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCell}>
                              4.4. Nombre o Razón Social
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].prov_Nombre_Raso
                                  ? data[0].prov_Nombre_Raso
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCell}>
                              4.5. Domicilio Fiscal
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_DomicilioFiscal_Exportador
                                  ? data[0].duca_DomicilioFiscal_Exportador
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.tableRowExportador}>
                      <View style={styles.tableCol1_0}>
                        <Text
                          style={{ ...styles.tableCellVertical, width: "210%" }}
                        >
                          Importador / Destinatario
                        </Text>
                      </View>
                      <View style={styles.tableCol_1}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCell}>
                              5.1. No. Identificación
                            </Text>
                          </View>
                          <View style={styles.tableCol1_35}>
                            <Text style={styles.tableCell}>
                              5.2. Tipo Identificación
                            </Text>
                          </View>
                          <View style={styles.tableCol1_15}>
                            <Text style={styles.tableCellBold}>---</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].impo_NumRegistro
                                  ? data[0].impo_NumRegistro
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_35}>
                            <Text style={styles.tableCell}>
                              5.3. País Emisión
                            </Text>
                          </View>
                          <View style={styles.tableCol1_15}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_PaisImportador
                                  ? data[0].duca_PaisImportador
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCell}>
                              5.4. Nombre o Razón Social
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].impo_Nombre_Raso
                                  ? data[0].impo_Nombre_Raso
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCell}>
                              5.5. Domicilio Fiscal
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_DomicilioFiscal_Importador
                                  ? data[0].duca_DomicilioFiscal_Importador
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.tableRowExportador}>
                      <View style={styles.tableCol1_0}>
                        <Text
                          style={{ ...styles.tableCellVertical, fontSize: 5.5 }}
                        >
                          DECLARANTE
                        </Text>
                      </View>
                      <View style={styles.tableCol_1}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCell}>6.1. Código</Text>
                          </View>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_Codigo_Declarante
                                  ? data[0].duca_Codigo_Declarante
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCell}>
                              6.2. No. Identificación
                            </Text>
                          </View>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_Numero_Id_Declarante
                                  ? data[0].duca_Numero_Id_Declarante
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCell}>
                              6.3. Nombre o Razón Socia
                            </Text>
                          </View>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_NombreSocial_Declarante
                                  ? data[0].duca_NombreSocial_Declarante
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCell}>
                              6.4. Domicilio Fiscal
                            </Text>
                          </View>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_DomicilioFiscal_Declarante
                                  ? data[0].duca_DomicilioFiscal_Declarante
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.tableRowExportador}>
                      <View style={styles.tableCol1_0}>
                        <Text
                          style={{
                            ...styles.tableCellVertical,
                            fontSize: 5.5,
                            width: "150%",
                            marginLeft: -5,
                          }}
                        >
                          TRANSPORTISTA
                        </Text>
                      </View>
                      <View style={styles.tableCol_1}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_23}>
                            <Text style={styles.tableCell}>19.1. Código</Text>
                          </View>
                          <View style={styles.tableCol1_23}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_Codigo_Transportista
                                  ? data[0].duca_Codigo_Transportista
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_44}>
                            <Text style={styles.tableCell}>
                              20. Modo de Transporte
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCell}>19.2. Nombre</Text>
                          </View>
                          <View style={styles.tableCol1_1}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_ModoTransporte
                                  ? data[0].duca_ModoTransporte
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].duca_Transportista_Nombre
                                  ? data[0].duca_Transportista_Nombre
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.tableRowExportador}>
                      <View style={styles.tableCol1_0}>
                        <Text
                          style={{
                            ...styles.tableCellVertical,
                            // height: 90
                            // fontSize: 5.5,
                            // width: "150%",
                            // marginLeft: -5,
                          }}
                        >
                          Conductor
                        </Text>
                      </View>
                      <View style={styles.tableCol_1}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCell}>
                              23.1. No. Identificación
                            </Text>
                          </View>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCell}>
                              23.2. No. Licencia de Conducir
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].cont_NoIdentificacion
                                  ? data[0].cont_NoIdentificacion
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].cont_Licencia
                                  ? data[0].cont_Licencia
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCell}>
                              23.3. País Expedición
                            </Text>
                          </View>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].pais_Expedicion
                                  ? data[0].pais_Expedicion
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCell}>
                              23.4. Nombres y Apellidos
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View
                            style={{ ...styles.tableCol1_100, height: 39.45 }}
                          >
                            <Text style={styles.tableCellBold}>
                              {data?.length > 0
                                ? data[0].conductorNombres
                                  ? data[0].conductorNombres
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableColGD}>
                    <View style={styles.tableRowEncabezado}>
                      <View style={styles.tableCol1_2}>
                        <Text style={styles.tableCellCenter}>
                          Identificación de la Declaración
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowEncabezado}>
                      <View style={styles.tableCol1_23}>
                        <Text style={styles.tableCell}>
                          1. No. Correlativo o
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          Referencia
                        </Text>
                      </View>
                      <View style={styles.tableCol1_23}>
                        <Text style={styles.tableCell}>2. No. de DUCA</Text>
                      </View>
                      <View style={styles.tableCol1_23}>
                        <Text style={styles.tableCell}>
                          3. Fecha de Aceptación
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowEncabezado}>
                      <View style={styles.tableCol1_23}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_No_Correlativo_Referencia
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_23}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0 ? data[0].duca_No_Duca : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_23}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? new Date(
                                data[0].deva_FechaAceptacion
                              ).toLocaleString()
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowEncabezado}>
                      <View style={styles.tableCol1_46T}>
                        <Text style={styles.tableCell}>
                          7. Aduana Registro / Inicio Tránsito
                        </Text>
                      </View>
                      <View style={styles.tableCol1_46T}>
                        <Text style={styles.tableCell}>
                          8. Aduana de Salida
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowEncabezado}>
                      <View style={styles.tableCol1_46}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_AduanaRegistro
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_46}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].adua_SalidaNombre
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowEncabezado}>
                      <View style={styles.tableCol1_46}>
                        <Text style={styles.tableCell}>
                          9. Aduana de Ingreso
                        </Text>
                      </View>
                      <View style={styles.tableCol1_46}>
                        <Text style={styles.tableCell}>10. Aduana Destino</Text>
                      </View>
                    </View>
                    <View style={styles.tableRowEncabezadoBorBT}>
                      <View style={styles.tableCol1_46}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].adua_IngresoNombre
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_46}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_AduanaDestino
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>
                          11. Régimen Aduanero
                        </Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>12. Modalidad</Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>13. Clase</Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>
                          14. Fecha Vencimiento
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowBorBT}>
                      <View style={styles.tableCol1_75}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_RegimenAduanero
                              ? data[0].duca_RegimenAduanero
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View
                        style={{ ...styles.tableCol1_25, marginBottom: 4.9 }}
                      >
                        <Text style={styles.tableCellCenterBold}>
                          {data?.length > 0
                            ? new Date(
                                data[0].duca_FechaVencimiento
                              ).toLocaleString()
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>
                          15. País Procedencia
                        </Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>
                          16. País Exportación
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_PaisProcedencia
                              ? data[0].duca_PaisProcedencia
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_PaisExportacion
                              ? data[0].duca_PaisExportacion
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>17. País Destino</Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>
                          18. Depósito Aduanero / Zona Franca
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_PaisDestino
                              ? data[0].duca_PaisDestino
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_Deposito_Aduanero
                              ? data[0].duca_Deposito_Aduanero
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>
                          21. Lugar de Embarque
                        </Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>
                          22. Lugar de Desembarque
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_Lugar_Embarque
                              ? data[0].duca_Lugar_Embarque
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].duca_Lugar_Desembarque
                              ? data[0].duca_Lugar_Desembarque
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowBorBT}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          ** Manifiesto:
                          {data?.length > 0
                            ? data[0].duca_Manifiesto
                              ? data[0].duca_Manifiesto
                              : "----"
                            : "----"}{" "}
                          **
                        </Text>
                      </View>
                      <View
                        style={{ ...styles.tableCol1_50, marginBottom: 3.5 }}
                      >
                        <Text style={styles.tableCellBold}>
                          ** Título:
                          {data?.length > 0
                            ? data[0].duca_Titulo
                              ? data[0].duca_Titulo
                              : "----"
                            : "----"}{" "}
                          **
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>
                          24.1. Id Unidad Transporte
                        </Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>
                          24.2. País de Registro
                        </Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>24.3. Marca</Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCell}>24.4. Chasis/Vin</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_IdUnidadTransporte
                              ? data[0].v
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].pais_Transporte
                              ? data[0].pais_Transporte
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].marc_Descripcion
                              ? data[0].marc_Descripcion
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_25}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_Chasis
                              ? data[0].tran_Chasis
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>
                          24.5. Identificación del Remolque o Semirremolque{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCell}>
                          24.6. Cantidad de Unidades Carga (remolque y
                          semirremolque)
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_Remolque
                              ? data[0].tran_Remolque
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_50}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_CantCarga
                              ? data[0].tran_CantCarga
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_20}>
                        <Text style={{ ...styles.tableCell, fontSize: 5.6 }}>
                          24.7. Número de Dispositivo Seguridad (precintos o
                          marchamos)
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={{ ...styles.tableCell, fontSize: 5.6 }}>
                          24.8. Equipamiento
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={{ ...styles.tableCell, fontSize: 5.6 }}>
                          24.9. Tamaño del Equipamiento
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={{ ...styles.tableCell, fontSize: 5.6 }}>
                          24.10. Tipo de Carga
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={{ ...styles.tableCell, fontSize: 5.6 }}>
                          24.11. Número/Números de Identificación de del
                          Contenedor/es
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRowBorBT}>
                      <View style={styles.tableCol1_20}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_NumDispositivoSeguridad
                              ? data[0].tran_NumDispositivoSeguridad
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_Equipamiento
                              ? data[0].tran_Equipamiento
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_TamanioEquipamiento
                              ? data[0].tran_TamanioEquipamiento
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_TipoCarga
                              ? data[0].tran_TipoCarga
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                      <View style={styles.tableCol1_20}>
                        <Text style={styles.tableCellBold}>
                          {data?.length > 0
                            ? data[0].tran_IdContenedor
                              ? data[0].tran_IdContenedor
                              : "----"
                            : "----"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.tableRowExportador}>
                  <View style={styles.tableCol1_ValorT}>
                    <Text
                      style={{
                        ...styles.tableCellVertical,
                        width: "250%",
                        marginLeft: -15,
                      }}
                    >
                      Valores Totales
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol1_96,
                    }}
                  >
                    <View style={styles.tableRowBorBT}>
                      <View style={styles.tableCol1_43}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCell}>
                              25. Valor de Transacción
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCell}>
                              26. Gastos de Transporte
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCell}>
                              27. Gastos de
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Seguro
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCell}>
                              28. Otros Gastos
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCellVTCenter}>
                              {valoresTotales?.length > 0
                                ? valoresTotales[0].item_ValorTransaccion
                                  ? valoresTotales[0].item_ValorTransaccion
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCellVTCenter}>
                              {valoresTotales?.length > 0
                                ? valoresTotales[0].item_GastosDeTransporte
                                  ? valoresTotales[0].item_GastosDeTransporte
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCellVTCenter}>
                              {valoresTotales?.length > 0
                                ? valoresTotales[0].item_Seguro
                                  ? valoresTotales[0].item_Seguro
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCellVTCenter}>
                              {valoresTotales?.length > 0
                                ? valoresTotales[0].item_OtrosGastos
                                  ? valoresTotales[0].item_OtrosGastos
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCell}>
                              29. Valor en
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Aduana Total
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCell}>30. Incoterm</Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCell}>
                              31. Tasa de Cambio
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}></View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCellCenterBold}>
                              {valoresTotales?.length > 0
                                ? valoresTotales[0].item_ValorAduana
                                  ? valoresTotales[0].item_ValorAduana
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCellCenterBold}>
                              {data?.length > 0
                                ? data[0].inco_Codigo
                                  ? data[0].inco_Codigo
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}>
                            <Text style={styles.tableCellCenterBold}>
                              {data?.length > 0
                                ? data[0].deva_ConversionDolares
                                  ? data[0].deva_ConversionDolares
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_25}></View>
                        </View>
                      </View>
                      <View style={styles.tableCol1_22}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCell}>
                              32. Peso Bruto
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Total
                            </Text>
                          </View>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCell}>
                              33. Peso Neto
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Total
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCellVTCenter}>
                              {valoresTotales?.length > 0
                                ? valoresTotales[0].item_PesoBruto
                                  ? valoresTotales[0].item_PesoBruto
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_50}>
                            <Text style={styles.tableCellVTCenter}>
                              {valoresTotales?.length > 0
                                ? valoresTotales[0].item_PesoNeto
                                  ? valoresTotales[0].item_PesoNeto
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          ...styles.tableCol1_35,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_100}>
                            <Text style={styles.tableCellCenter}>
                              Liquidación General
                            </Text>
                          </View>
                        </View>

                        <View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_33}>
                              <Text
                                style={{ ...styles.tableCell, fontSize: 5.6 }}
                              >
                                34.1. Tipo de Tributo
                              </Text>
                            </View>
                            <View style={styles.tableCol1_33}>
                              <Text
                                style={{ ...styles.tableCell, fontSize: 5.6 }}
                              >
                                34.2. Total por Tributo
                              </Text>
                            </View>
                            <View style={styles.tableCol1_33}>
                              <Text
                                style={{ ...styles.tableCell, fontSize: 5.6 }}
                              >
                                34.3. Modalidad Pago
                              </Text>
                            </View>
                          </View>

                          {liquidacionGeneral?.map((liqui) => {
                            return (
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_33}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                    }}
                                  >
                                    {liqui.lige_TipoTributo}
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_33}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                      textAlign: "right",
                                    }}
                                  >
                                    {liqui.lige_TotalPorTributo}
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_33}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                    }}
                                  >
                                    {liqui.lige_ModalidadPago}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_50}>
                            <Text style={{ ...styles.tableCell }}>
                              34.4. Total General
                            </Text>
                          </View>
                          <View style={styles.tableCol1_50}>
                            <Text
                              style={{
                                ...styles.tableCellLiquidacionCenter,
                              }}
                            >
                              {liquidacionGeneral?.length > 0
                                ? liquidacionGeneral[0].lige_TotalGral
                                  ? liquidacionGeneral[0].lige_TotalGral
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.tableRowExportador}>
                  <View style={styles.tableCol1_ValorT}>
                    <Text
                      style={{
                        ...styles.tableCellVertical,
                        width: "250%",
                        marginLeft: -15,
                      }}
                    >
                      Mercancías
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol1_96,
                    }}
                  >
                    <View style={styles.tableRowBorBT}>
                      <View style={{ ...styles.tableColMI }}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              35. Cantidad
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Bultos
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              36. Clase de Bultos
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>37. Peso Neto</Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>38. Peso Bruto</Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              39. Cuota
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Contingente
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_Cantidad_Bultos
                                  ? mercancias[0].item_Cantidad_Bultos
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_ClaseBulto
                                  ? mercancias[0].item_ClaseBulto
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_PesoNeto
                                  ? mercancias[0].item_PesoNeto
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_PesoBruto
                                  ? mercancias[0].item_PesoBruto
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_CuotaContingente
                                  ? mercancias[0].item_CuotaContingente
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              40. Número Línea
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              41. País Origen
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              42. Unidad Medida
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>43. Cantidad</Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>44. Acuerdo</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].Row
                                  ? mercancias[0].Row
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].pais_Origen
                                  ? mercancias[0].pais_Origen
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].unme_Descripcion
                                  ? mercancias[0].unme_Descripcion
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_Cantidad
                                  ? mercancias[0].item_Cantidad
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_Acuerdo
                                  ? mercancias[0].item_Acuerdo
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              45. Clasificación
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Arancelaria
                            </Text>
                          </View>
                          <View style={styles.tableCol1_40}>
                            <Text style={styles.tableCell}>
                              46. Descripción de las Mercancías
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              47.1. Criterio para
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Certificar Origen
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              47.2. Reglas
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Accesorias
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].aran_Codigo
                                  ? mercancias[0].aran_Codigo
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_40}>
                            <Text style={styles.tableCellBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_CaracteristicasMercancias
                                  ? mercancias[0].item_CaracteristicasMercancias
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_CriterioCertificarOrigen
                                  ? mercancias[0].item_CriterioCertificarOrigen
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_ReglasAccesorias
                                  ? mercancias[0].item_ReglasAccesorias
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              48. Valor de Transacción
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              49. Gastos de Transporte
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>50. Seguro</Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              51. Otros Gastos
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCell}>
                              52. Valor en
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Aduana
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_ValorTransaccion
                                  ? mercancias[0].item_ValorTransaccion
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_GastosDeTransporte
                                  ? mercancias[0].item_GastosDeTransporte
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_Seguro
                                  ? mercancias[0].item_Seguro
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_OtrosGastos
                                  ? mercancias[0].item_OtrosGastos
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                          <View style={styles.tableCol1_20}>
                            <Text style={styles.tableCellCenterBold}>
                              {mercancias?.length > 0
                                ? mercancias[0].item_ValorAduana
                                  ? mercancias[0].item_ValorAduana
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          ...styles.tableColMD,
                          height: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ ...styles.tableRow }}>
                          <View style={{ ...styles.tableCol1_100 }}>
                            <Text style={{ ...styles.tableCellCenter }}>
                              Liquidación por Línea
                            </Text>
                          </View>
                        </View>
                        <View>
                          <View style={{ ...styles.tableRow, marginBottom: 5 }}>
                            <View style={styles.tableCol1_25}>
                              <Text
                                style={{
                                  ...styles.tableCellCenter,
                                  fontSize: 5.6,
                                }}
                              >
                                53.1. Tipo
                              </Text>
                            </View>
                            <View style={styles.tableCol1_25}>
                              <Text
                                style={{
                                  ...styles.tableCellCenter,
                                  fontSize: 5.6,
                                }}
                              >
                                53.2. Alícuota
                              </Text>
                            </View>
                            <View style={styles.tableCol1_25}>
                              <Text
                                style={{
                                  ...styles.tableCellCenter,
                                  fontSize: 5.6,
                                }}
                              >
                                53.3. Total
                              </Text>
                            </View>
                            <View style={styles.tableCol1_25}>
                              <Text
                                style={{
                                  ...styles.tableCellCenter,
                                  fontSize: 5.6,
                                }}
                              >
                                53.4. MP
                              </Text>
                            </View>
                          </View>

                          {mercancias?.length > 0 ? (
                            mercancias[0].liquidacion ? (
                              mercancias[0].liquidacion?.map((item) => {
                                return (
                                  <View style={styles.tableRow}>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                        }}
                                      >
                                        {item.lili_Tipo}
                                      </Text>
                                    </View>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                          textAlign: "right",
                                        }}
                                      >
                                        {item.lili_Alicuota}
                                      </Text>
                                    </View>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                          textAlign: "right",
                                        }}
                                      >
                                        {item.lili_Total}
                                      </Text>
                                    </View>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                        }}
                                      >
                                        {item.lili_ModalidadPago}
                                      </Text>
                                    </View>
                                  </View>
                                );
                              })
                            ) : (
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                      textAlign: "right",
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                      textAlign: "right",
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                            )
                          ) : (
                            <View style={styles.tableRow}>
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellLiquidacionCenter,
                                  }}
                                >
                                  ----
                                </Text>
                              </View>
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellLiquidacionCenter,
                                    textAlign: "right",
                                  }}
                                >
                                  ----
                                </Text>
                              </View>
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellLiquidacionCenter,
                                    textAlign: "right",
                                  }}
                                >
                                  ----
                                </Text>
                              </View>
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellLiquidacionCenter,
                                  }}
                                >
                                  ----
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                        <View style={{ ...styles.tableRow }}>
                          <View style={styles.tableCol1_50}>
                            <Text style={{ ...styles.tableCell }}>
                              34.4. Total General
                            </Text>
                          </View>
                          <View style={styles.tableCol1_50}>
                            <Text
                              style={{
                                ...styles.tableCellLiquidacionCenter,
                              }}
                            >
                              {mercancias?.length > 0
                                ? mercancias[0].liquidacion
                                  ? mercancias[0].liquidacion[0].lili_TotalGral
                                  : "----"
                                : "----"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.tableRowBorBT}>
                      <Text
                        style={{
                          ...styles.tableCellLiquidacionCenter,
                        }}
                      >
                        Datos Complementarios: ---; Observaciones:{" "}
                        {mercancias?.length > 0
                          ? mercancias[0].item_CaracteristicasMercancias
                            ? mercancias[0].item_CaracteristicasMercancias
                            : "----"
                          : "----"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tableRowExportador}>
                  <View style={styles.tableCol1_ValorT}>
                    <Text
                      style={{
                        ...styles.tableCellVertical,
                        width: "250%",
                        marginLeft: -15,
                      }}
                    >
                      Documento de soporte
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol1_96,
                    }}
                  >
                    <View style={{ ...styles.tableRowBorBT, minHeight: 70 }}>
                      <View style={styles.tableCol1_100}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol1_11_1}>
                            <Text
                              style={{
                                ...styles.tableCell,
                              }}
                            >
                              54.1. Código del
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Tipo Documento
                            </Text>
                          </View>
                          <View style={styles.tableCol1_22_2}>
                            <Text
                              style={{
                                ...styles.tableCell,
                              }}
                            >
                              54.2. Número de Documento
                            </Text>
                          </View>
                          <View style={styles.tableCol1_11_1}>
                            <Text
                              style={{
                                ...styles.tableCell,
                              }}
                            >
                              54.3. F. Emisión Documento
                            </Text>
                          </View>
                          <View style={styles.tableCol1_11_1}>
                            <Text
                              style={{
                                ...styles.tableCell,
                              }}
                            >
                              54.4. Fecha de Vencimiento
                            </Text>
                          </View>
                          <View style={styles.tableCol1_11_1}>
                            <Text
                              style={{
                                ...styles.tableCell,
                              }}
                            >
                              54.5. País de
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Emisión
                            </Text>
                          </View>
                          <View style={styles.tableCol1_11_1}>
                            <Text
                              style={{
                                ...styles.tableCell,
                              }}
                            >
                              54.6. Línea (al que aplica el documento)
                            </Text>
                          </View>
                          <View style={styles.tableCol1_11_1}>
                            <Text
                              style={{
                                ...styles.tableCell,
                                fontSize: 5.3,
                              }}
                            >
                              54.7. Autoridad o
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              Entidad que Emitió Doc.
                            </Text>
                          </View>
                          <View style={styles.tableCol1_11_1}>
                            <Text
                              style={{
                                ...styles.tableCellCenter,
                              }}
                            >
                              54.8. Monto
                            </Text>
                          </View>
                        </View>

                        {documentos?.map((docu) => {
                          return (
                            <View style={styles.tableRow}>
                              <View style={styles.tableCol1_11_1}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.tido_Codigo ? docu.tido_Codigo : "---"}
                                </Text>
                              </View>
                              <View style={styles.tableCol1_22_2}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.doso_NumeroDocumento
                                    ? docu.doso_NumeroDocumento
                                    : "---"}
                                </Text>
                              </View>
                              <View style={styles.tableCol1_11_1}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.doso_FechaEmision
                                    ? new Date(
                                        docu.doso_FechaEmision
                                      ).toLocaleString()
                                    : "---"}
                                </Text>
                              </View>
                              <View style={styles.tableCol1_11_1}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.doso_FechaVencimiento
                                    ? new Date(
                                        docu.doso_FechaVencimiento
                                      ).toLocaleString()
                                    : "---"}
                                </Text>
                              </View>
                              <View style={styles.tableCol1_11_1}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.PaisEmision ? docu.PaisEmision : "---"}
                                </Text>
                              </View>
                              <View style={styles.tableCol1_11_1}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.doso_LineaAplica
                                    ? docu.doso_LineaAplica
                                    : "---"}
                                </Text>
                              </View>
                              <View style={styles.tableCol1_11_1}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.doso_EntidadEmitioDocumento
                                    ? docu.doso_EntidadEmitioDocumento
                                    : "---"}
                                </Text>
                              </View>
                              <View style={styles.tableCol1_11_1}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenterBold,
                                  }}
                                >
                                  {docu.doso_Monto ? docu.doso_Monto : "---"}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.tableRowExportador}>
                  <View style={{ ...styles.tableCol1_ValorT, borderBottom: 0 }}>
                    <Text
                      style={{
                        ...styles.tableCellVertical,
                        width: "350%",
                        marginLeft: -25,
                      }}
                    >
                      Observaciones y Firmas
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol1_96,
                    }}
                  >
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol1_100}>
                        <View style={styles.tableRowBorBT}>
                          <View
                            style={{
                              ...styles.tableCol1_34,
                              borderRightWidth: 2,
                              borderStyle: "solid",
                            }}
                          >
                            <View style={styles.tableRowBorBT}>
                              <View
                                style={{
                                  ...styles.tableCol1_100,
                                  minHeight: 50,
                                  height: 50,
                                }}
                              >
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol1_100}>
                                    <Text
                                      style={{
                                        ...styles.tableCell,
                                      }}
                                    >
                                      55. Observaciones
                                    </Text>
                                  </View>
                                </View>
                                <View style={{ ...styles.tableRow }}>
                                  <View style={styles.tableCol1_100}>
                                    <Text
                                      style={{
                                        ...styles.tableCellBold,
                                      }}
                                    >
                                      ** Canal Asignado:{" "}
                                      {data?.length > 0
                                        ? data[0].duca_CanalAsignado
                                          ? data[0].duca_CanalAsignado
                                          : "----"
                                        : "----"}{" "}
                                      **
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View style={styles.tableRow}>
                              <View style={styles.tableCol1_100}>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol1_35}>
                                    <Text
                                      style={{
                                        ...styles.tableCell,
                                      }}
                                    >
                                      56. Válida Hasta
                                    </Text>
                                  </View>
                                  <View style={styles.tableCol1_70}>
                                    <Text
                                      style={{
                                        ...styles.tableCellBold,
                                      }}
                                    >
                                      ---
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              ...styles.tableCol1_33,
                              borderRightWidth: 2,
                              borderStyle: "solid",
                            }}
                          >
                            <View style={styles.tableRowBorBT}>
                              <View style={styles.tableCol1_100}>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol1_100}>
                                    <Text
                                      style={{
                                        ...styles.tableCellCenter,
                                      }}
                                    >
                                      Uso de Aduanas
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View style={{ ...styles.tableRow }}>
                              <View
                                style={{
                                  ...styles.tableCol1_100,
                                  minHeight: 50,
                                  height: 50,
                                  display: "flex",
                                  alignContent: "space-between",
                                  justifyContent: "space-between",
                                }}
                              >
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol1_100}>
                                    <Text
                                      style={{
                                        ...styles.tableCell,
                                      }}
                                    >
                                      57. Firma, fecha y sello del funcionario
                                      autorizado por la
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      Dirección General de Aduanas o de la
                                      Aduana de Salida
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol1_100}>
                                    <Text
                                      style={{
                                        ...styles.tableCellCenterBold,
                                      }}
                                    >
                                      Sistema de Aduanas
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol1_100}>
                                    <Text
                                      style={{
                                        ...styles.tableCellCenter,
                                      }}
                                    >
                                      Firma
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              ...styles.tableCol1_33,
                            }}
                          >
                            <View style={styles.tableRowBorBT}>
                              <View style={styles.tableCol1_100}>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableCol1_100}>
                                    <Text
                                      style={{
                                        ...styles.tableCellCenter,
                                      }}
                                    >
                                      Uso de Ventanilla Única
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View style={styles.tableRow}>
                              <View
                                style={{
                                  ...styles.tableCol1_55,
                                  minHeight: 50,
                                  height: 50,
                                  borderRightWidth: 2,
                                  borderStyle: "solid",
                                  display: "flex",
                                  alignContent: "space-between",
                                  justifyContent: "space-between",
                                }}
                              >
                                <View style={styles.tableRow}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    8. Firma o Autorización de
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    Ventanilla Única
                                  </Text>
                                </View>
                                <View style={styles.tableRow}>
                                  <Text
                                    style={{
                                      ...styles.tableCellCenter,
                                    }}
                                  >
                                    Firma
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  ...styles.tableCol1_45,
                                }}
                              >
                                <View style={styles.tableRowBorBT}>
                                  <View style={styles.tableCol1_100}>
                                    <View style={styles.tableRow}>
                                      <View style={styles.tableCol1_100}>
                                        <Text
                                          style={{
                                            ...styles.tableCell,
                                          }}
                                        >
                                          59. Código de Exportador
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                      <View
                                        style={{
                                          ...styles.tableCol1_100,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            ...styles.tableCellCenterBold,
                                          }}
                                        >
                                          ----
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.tableRow}>
                                  <View style={{ ...styles.tableCol1_100 }}>
                                    <View style={styles.tableRow}>
                                      <View
                                        style={{
                                          ...styles.tableCol1_100,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            ...styles.tableCell,
                                          }}
                                        >
                                          ----
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View
                            style={{
                              ...styles.tableCol1_34,
                              minHeight: 65,
                              height: 65,
                              display: "flex",
                              justifyContent: "space-between",
                              borderRightWidth: 2,
                              borderStyle: "solid",
                            }}
                          >
                            <View style={styles.tableRow}>
                              <View style={styles.tableCol1_100}>
                                <Text
                                  style={{
                                    ...styles.tableCell,
                                  }}
                                >
                                  60. Firma del Declarante
                                </Text>
                              </View>
                            </View>
                            <View style={styles.tableRow}>
                              <View
                                style={{
                                  ...styles.tableCol1_100,
                                  marginRight: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.tableCell,
                                    textAlign: "right",
                                  }}
                                >
                                  Firma del Declarante
                                </Text>
                              </View>
                            </View>
                            <View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_35}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Representado por
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_65}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_35}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Lugar y Fecha
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_65}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              ...styles.tableCol1_33,
                              minHeight: 65,
                              height: 65,
                              display: "flex",
                              justifyContent: "space-between",
                              borderRightWidth: 2,
                              borderStyle: "solid",
                            }}
                          >
                            <View style={styles.tableRow}>
                              <View
                                style={{
                                  ...styles.tableCol1_100,
                                  marginRight: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.tableCell,
                                    textAlign: "justify",
                                  }}
                                >
                                  61. El suscrito declara bajo fe de juramento
                                  que las mercancías arriba detalladas son
                                  originarias de
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  ___________________.
                                </Text>
                              </View>
                            </View>
                            <View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Nombre
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_75}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Empresa
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_75}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Cargo
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_50}>
                                  <Text
                                    style={{
                                      ...styles.tableCellCenter,
                                    }}
                                  >
                                    Firma
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              ...styles.tableCol1_33,
                              minHeight: 65,
                              height: 65,
                            }}
                          >
                            <View style={{ ...styles.tableRow }}>
                              <View
                                style={{
                                  ...styles.tableCol1_100,
                                  marginRight: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.tableCell,
                                    textAlign: "justify",
                                  }}
                                >
                                  62. El suscrito certifica bajo fe de juramento
                                  que las mercancías arriba detalladas son
                                  originarias de __________________ y que los
                                  valores, gastos de transporte, seguro y demás
                                  datos consignados en este formulario son
                                  verdaderos
                                </Text>
                              </View>
                            </View>
                            <View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Nombre
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_75}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Empresa
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_75}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCell,
                                    }}
                                  >
                                    Cargo
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellBold,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_50}>
                                  <Text
                                    style={{
                                      ...styles.tableCellCenter,
                                    }}
                                  >
                                    Firma
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.CuadroQR}>
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data?.length > 0 ? window.location.href.toString().replace('/Duca/Reporte','')+"/Duca/DetalleAbierto/" + data[0].duca_Id : "Phynomo"}&margin=4`}
                style={{ width: "100%" }}
              ></Image>
            </View>
          </View>
        </View>
      </Page>
      {mercancias?.length > 1 ? (
        <Page size="A4" style={styles.page}>
          <View style={styles.body}>
            <View style={{ ...styles.table, border: 0 }}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol1_50}>
                  <Text
                    style={{
                      fontSize: "7px",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                    }}
                  >
                    Fecha y Hora de Impresión:{" "}
                    {new Date(fechaActual).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.tableCol1_50}>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: "7px",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                    }}
                  >
                    ANEXO I DE LA RESOLUCIÓN No. 409-2018 (COMIECO-LXXXV)
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ border: "0px solid black", borderBottom: 1 }}>
              {mercancias?.map((merca) => {
                return (
                  <View style={styles.tableRowExportador}>
                    <View
                      style={{
                        ...styles.tableCol1_ValorT,
                        borderBottomWidth: 0,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 2,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.tableCellVertical,
                          width: "250%",
                          marginLeft: -15,
                        }}
                      >
                        Mercancías
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCol1_96,
                        borderRightWidth: 2,
                      }}
                    >
                      <View
                        style={{ ...styles.tableRowBorBT, borderTopWidth: 1 }}
                      >
                        <View style={{ ...styles.tableColMI }}>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                35. Cantidad
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Bultos
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                36. Clase de Bultos
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                37. Peso Neto
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                38. Peso Bruto
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                39. Cuota
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Contingente
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_Cantidad_Bultos
                                  ? merca.item_Cantidad_Bultos
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_ClaseBulto
                                  ? merca.item_ClaseBulto
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_PesoNeto
                                  ? merca.item_PesoNeto
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_PesoBruto
                                  ? merca.item_PesoBruto
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_CuotaContingente
                                  ? merca.item_CuotaContingente
                                  : "----"}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                40. Número Línea
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                41. País Origen
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                42. Unidad Medida
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>43. Cantidad</Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>44. Acuerdo</Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.Row ? merca.Row : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.pais_Origen ? merca.pais_Origen : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.unme_Descripcion
                                  ? merca.unme_Descripcion
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_Cantidad
                                  ? merca.item_Cantidad
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_Acuerdo
                                  ? merca.item_Acuerdo
                                  : "----"}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                45. Clasificación
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Arancelaria
                              </Text>
                            </View>
                            <View style={styles.tableCol1_40}>
                              <Text style={styles.tableCell}>
                                46. Descripción de las Mercancías
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                47.1. Criterio para
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Certificar Origen
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                47.2. Reglas
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Accesorias
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.aran_Codigo ? merca.aran_Codigo : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_40}>
                              <Text style={styles.tableCellBold}>
                                {merca.item_CaracteristicasMercancias
                                  ? merca.item_CaracteristicasMercancias
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_CriterioCertificarOrigen
                                  ? merca.item_CriterioCertificarOrigen
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_ReglasAccesorias
                                  ? merca.item_ReglasAccesorias
                                  : "----"}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                48. Valor de Transacción
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                49. Gastos de Transporte
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>50. Seguro</Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                51. Otros Gastos
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCell}>
                                52. Valor en
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Aduana
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_ValorTransaccion
                                  ? merca.item_ValorTransaccion
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_GastosDeTransporte
                                  ? merca.item_GastosDeTransporte
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_Seguro ? merca.item_Seguro : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_OtrosGastos
                                  ? merca.item_OtrosGastos
                                  : "----"}
                              </Text>
                            </View>
                            <View style={styles.tableCol1_20}>
                              <Text style={styles.tableCellCenterBold}>
                                {merca.item_ValorAduana
                                  ? merca.item_ValorAduana
                                  : "----"}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            ...styles.tableColMD,
                            height: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ ...styles.tableRow }}>
                            <View style={{ ...styles.tableCol1_100 }}>
                              <Text style={{ ...styles.tableCellCenter }}>
                                Liquidación por Línea
                              </Text>
                            </View>
                          </View>
                          <View>
                            <View
                              style={{ ...styles.tableRow, marginBottom: 5 }}
                            >
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenter,
                                    fontSize: 5.6,
                                  }}
                                >
                                  53.1. Tipo
                                </Text>
                              </View>
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenter,
                                    fontSize: 5.6,
                                  }}
                                >
                                  53.2. Alícuota
                                </Text>
                              </View>
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenter,
                                    fontSize: 5.6,
                                  }}
                                >
                                  53.3. Total
                                </Text>
                              </View>
                              <View style={styles.tableCol1_25}>
                                <Text
                                  style={{
                                    ...styles.tableCellCenter,
                                    fontSize: 5.6,
                                  }}
                                >
                                  53.4. MP
                                </Text>
                              </View>
                            </View>

                            {merca.liquidacion ? (
                              merca.liquidacion?.map((item) => {
                                return (
                                  <View style={styles.tableRow}>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                        }}
                                      >
                                        {item.lili_Tipo}
                                      </Text>
                                    </View>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                          textAlign: "right",
                                        }}
                                      >
                                        {item.lili_Alicuota}
                                      </Text>
                                    </View>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                          textAlign: "right",
                                        }}
                                      >
                                        {item.lili_Total}
                                      </Text>
                                    </View>
                                    <View style={styles.tableCol1_25}>
                                      <Text
                                        style={{
                                          ...styles.tableCellLiquidacionCenter,
                                        }}
                                      >
                                        {item.lili_ModalidadPago}
                                      </Text>
                                    </View>
                                  </View>
                                );
                              })
                            ) : (
                              <View style={styles.tableRow}>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                      textAlign: "right",
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                      textAlign: "right",
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                                <View style={styles.tableCol1_25}>
                                  <Text
                                    style={{
                                      ...styles.tableCellLiquidacionCenter,
                                    }}
                                  >
                                    ----
                                  </Text>
                                </View>
                              </View>
                            )}
                          </View>
                          <View style={{ ...styles.tableRow }}>
                            <View style={styles.tableCol1_50}>
                              <Text style={{ ...styles.tableCell }}>
                                34.4. Total General
                              </Text>
                            </View>
                            <View style={styles.tableCol1_50}>
                              <Text
                                style={{
                                  ...styles.tableCellLiquidacionCenter,
                                }}
                              >
                                {merca.liquidacion
                                  ? merca.liquidacion[0].lili_TotalGral
                                  : "----"}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{ ...styles.tableRow, borderBottomWidth: 1 }}
                      >
                        <Text
                          style={{
                            ...styles.tableCellLiquidacionCenter,
                          }}
                        >
                          Datos Complementarios: ---; Observaciones:{" "}
                          {merca.item_CaracteristicasMercancias
                            ? merca.item_CaracteristicasMercancias
                            : "----"}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </Page>
      ) : null}

      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View style={{ ...styles.table, border: 0 }}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1_50}>
                <Text
                  style={{
                    fontSize: "7px",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  Fecha y Hora de Impresión:{" "}
                  {new Date(fechaActual).toLocaleString()}
                </Text>
              </View>
              <View style={styles.tableCol1_50}>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: "7px",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  ANEXO I DE LA RESOLUCIÓN No. 409-2018 (COMIECO-LXXXV)
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRowEncabezado}>
              <View style={{ ...styles.tableColEncabezado, width: "100%" }}>
                <Text
                  style={{
                    ...styles.tableCellEncabezado,
                    marginBottom: 0,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  DECLARACIÓN ÚNICA CENTROAMERICANA (DUCA)
                </Text>
                <Text
                  style={{
                    ...styles.tableCellEncabezado,
                    marginTop: 0,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                  }}
                >
                  --REVERSO--
                </Text>
              </View>
            </View>
          </View>

          <View style={{ ...styles.table, marginTop: 25 }}>
            <View
              style={{
                ...styles.tableRow,
                border: 2,
                borderStyle: "solid",
                borderBottomWidth: 0,
                borderRightWidth: 0,
              }}
            >
              <View style={{ ...styles.tableCol1_100 }}>
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableCol1_50, borderRightWidth: 2 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                            fontWeight: "bold",
                          }}
                        >
                          ADUANA DE PARTIDA
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          1. Aduana de Partida
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          2. Código
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          3. País
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          4. Dispositivo de Seguridad
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          5. Ruta a Seguir
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          6. Fecha y Hora
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          7. Plazo en Horas
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 35 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          8. Nombre, firma y sello del funcionario de aduana
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...styles.tableRow,
                        marginBottom: 35,
                        borderTopWidth: 2,
                      }}
                    >
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          9. Observaciones
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableCol1_50 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                            fontWeight: "bold",
                          }}
                        >
                          ADUANA DE PASO
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          10. Aduana de Paso
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          11. Código
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          12. Numero de dispositivo de seguridad nuevo
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          13. Fecha y Hora
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 35 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          14. Nombre, firma y sello del funcionario de aduana
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...styles.tableRow,
                        marginBottom: 35,
                        borderTopWidth: 2,
                      }}
                    >
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          9. Observaciones
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ ...styles.tableRow, borderTopWidth: 2 }}>
                  <View style={{ ...styles.tableCol1_50, borderRightWidth: 2 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                            fontWeight: "bold",
                          }}
                        >
                          ADUANA DE PASO
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          1. Aduana de Partida
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          2. Código
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          3. País
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          4. Dispositivo de Seguridad
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          5. Ruta a Seguir
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          6. Fecha y Hora
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          7. Plazo en Horas
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 35 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          8. Nombre, firma y sello del funcionario de aduana
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...styles.tableRow,
                        marginBottom: 35,
                        borderTopWidth: 2,
                      }}
                    >
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          9. Observaciones
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableCol1_50 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                            fontWeight: "bold",
                          }}
                        >
                          ADUANA DE PASO
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          10. Aduana de Paso
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          11. Código
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          12. Numero de dispositivo de seguridad nuevo
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          13. Fecha y Hora
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 35 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          14. Nombre, firma y sello del funcionario de aduana
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...styles.tableRow,
                        marginBottom: 35,
                        borderTopWidth: 2,
                      }}
                    >
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          9. Observaciones
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ ...styles.tableRow, borderTopWidth: 2 }}>
                  <View style={{ ...styles.tableCol1_50, borderRightWidth: 2 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                            fontWeight: "bold",
                          }}
                        >
                          ADUANA DE PASO
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          1. Aduana de Partida
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          2. Código
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          3. País
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          4. Dispositivo de Seguridad
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          5. Ruta a Seguir
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          6. Fecha y Hora
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          7. Plazo en Horas
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 35 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          8. Nombre, firma y sello del funcionario de aduana
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...styles.tableRow,
                        marginBottom: 35,
                        borderTopWidth: 2,
                      }}
                    >
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          9. Observaciones
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableCol1_50 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                            fontWeight: "bold",
                          }}
                        >
                          ADUANA DE DESTINO
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_50 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          10. Aduana de Paso
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCol1_25 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          11. Código
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          12. Numero de dispositivo de seguridad nuevo
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 15 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          13. Fecha y Hora
                        </Text>
                      </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginBottom: 35 }}>
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          14. Nombre, firma y sello del funcionario de aduana
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...styles.tableRow,
                        marginBottom: 35,
                        borderTopWidth: 2,
                      }}
                    >
                      <View style={{ ...styles.tableCol1_100 }}>
                        <Text
                          style={{
                            ...styles.tableCellReverso,
                          }}
                        >
                          9. Observaciones
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
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
          image="https://i.ibb.co/Wpq35kR/DUCA-DECLARACI-N-NICA-CENTROAMERICANA.png"
          alt="Encabezado de la carta"
        />
       <Collapse timeout={0} in={view === `cargando` ? true : false}>
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
                (view.length > 0 && view !== "cargando" && view !== "cargado") ||
                view === "cargado"
                  ? true
                  : false
              }
            >
              <DocumentoPDF />
            </Collapse>

        {/* <Collapse in={view}>
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
        </Collapse> */}

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
export default DucaReporte;
