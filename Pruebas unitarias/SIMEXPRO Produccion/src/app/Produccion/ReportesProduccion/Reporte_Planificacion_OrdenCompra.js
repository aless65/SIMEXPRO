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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  TextField,
  IconButton,
  InputAdornment,
  CardContent,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import History from "src/@history/@history";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import ReportesProduccionService from "./ReportesProduccionService";
import OrdenCompraReportService from "../OrdenCompra/OrdenCompraReport";
import SearchIcon from "@mui/icons-material/Search";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
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
    position: "absolute",
  },
  imageLogoLetras: {
    position: "absolute",
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

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    cursor: "pointer",
  },
  cardImage: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  cardDescription: {
    flex: 1,
  },
  scrollContainer: {
    maxHeight: "213px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px",
  },

  card: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "10px",
  },
  cardMedia: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  cardContent: {
    flex: 1,
    marginBottom: "2px",
  },

  searchField: {
    borderRadius: "10px",
    width: "100%",
    marginBottom: "5px",
    maxWidth: "1000px",
  },
}));

function Reporte_Planificacion_OrdenCompra() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(
    "Ninguna Orden de Compra Seleccionada"
  );
  const [ddl, setDdl] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [PDF, setPDF] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const ordenCompraGodService = OrdenCompraReportService();
  const classes = useStyles();
  const [filteredDdl, setFilteredDdl] = useState([]);

  const user = useSelector(selectUser);
  const Regresar = () => {
    History.push("/Inicio/Produccion");
  };

  useEffect(() => {
    ddlget();
  }, [selectedId]);

  useEffect(() => {
    setFilteredDdl(ddl);
  }, [ddl]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const getdata = async () => {
    try {
      setPDF("cargando");
      const reportesProduccionService = ReportesProduccionService();
      const data = await reportesProduccionService.PlanificacionPO(selectedId);
      setData(data);
      data.length === 0 ? setPDF("cargado") : setPDF(data);
    } catch (error) {}
  };

  const ddlget = async () => {
    try {
      const data = await ordenCompraGodService.listarEncabezado();
      // Ordena los datos por orco_Id de menor a mayor
      data.sort((a, b) => a.orco_Id - b.orco_Id);
      setDdl(data);
    } catch (error) {}
  };

  const handleSearchChangeDDL = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filtrar la copia de ddl en función del valor de búsqueda
    const filteredDdl = ddl.filter((item) =>
      item.orco_Id.toString().includes(searchTerm)
    );

    // Actualizar la lista filtrada
    setFilteredDdl(filteredDdl);
  };

  const handlePOClick = (PO) => {
    setSelectedId(PO.orco_Id);
  };

  const MyDoc = () => (
    <Document
      title="ProgramacióndeProducción.pdf"
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
          <Text style={styles.detallesTitle}>Programación de Producción</Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
          <Text style={styles.headerTextoDerecho}>‎ </Text>
        </View>
        <View style={styles.line} fixed/>

        <View style={{ marginBottom: 25 }} fixed/>

        <View style={{ display: "flex" }}>
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
              Orden de Compra #{data.length > 0 ? data[0].orco_Id : " "} -{" "}
              {data.length > 0 ? data[0].clie_Nombre_O_Razon_Social : " "}
            </Text>
          </View>
          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}

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
                <Text style={styles.cellText}>Color</Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>Talla</Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>Fecha Emisión</Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>Fecha Limite</Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>Cantidad</Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>Proceso</Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>Encargado</Text>
              </View>
            </View>

            {data && data.length > 0 ? (
              data.map((datos, Index) => (
                <View
                  key={Index}
                  style={[
                    styles.tableRow,
                    { backgroundColor: Index % 2 === 0 ? "#fff" : "#eee" },
                  ]}
                >
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>
                      {datos.esti_Descripcion}
                    </Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>{datos.colr_Nombre}</Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>{datos.tall_Nombre}</Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>
                      {datos.asor_FechaInicio.split("T")[0]}
                    </Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>
                      {datos.asor_FechaLimite.split("T")[0]}
                    </Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>{datos.asor_Cantidad}</Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>
                      {datos.proc_Descripcion}
                    </Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>
                      {datos.empl_NombreCompleto}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={{ ...styles.tableRow, backgroundColor: "#eee" }}>
                <View style={styles.tableCellRegistors}>
                  <Text style={styles.cellText}>No se encontraron datos</Text>
                </View>
              </View>
            )}
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
          image="https://i.ibb.co/J2RRtPP/PROGRAMACI-N-DE-PRODUCCI-N-1.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={3}>
          <Grid item xs={6} md={6} className="mx-auto">
            <FormControl style={{ width: "80%" }}>
              <FormLabel className="mt-5">Orden de Compra</FormLabel>
              <TextField value={selectedId} disabled={true}></TextField>
            </FormControl>
            <IconButton
              style={{
                marginTop: "24px",
                padding: "15px",
                marginLeft: "5px",
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
              sx={{ "&:hover": { backgroundColor: "#6e52ae" } }}
              edge="start"
              onClick={handleDialogOpen}
            >
              <SearchIcon />
            </IconButton>
          </Grid>

          <Dialog
            open={dialogOpen}
            fullWidth={true}
            maxWidth="md"
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Ordenes de Compra</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Escoja un orden de Compra para ver su Planificación
              </DialogContentText>

              <div>
                <TextField
                  style={{ borderRadius: "10px" }}
                  placeholder="Buscar Orden de Compra"
                  onChange={handleSearchChangeDDL}
                  size="small"
                  className={classes.searchField}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className={classes.scrollContainer}>
                  {filteredDdl.map((PO) => (
                    <Card
                      key={PO.orco_Id}
                      className={`${classes.card} ${
                        selectedId === PO.orco_Id ? classes.selectedCard : ""
                      }`}
                      onClick={() => handlePOClick(PO)}
                    >
                      <CardContent className={classes.cardContent}>
                        <h4>PO: #{PO.orco_Id}</h4>
                        <p>
                          Cliente O Razón Social:{" "}
                          {PO.clie_Nombre_O_Razon_Social}
                        </p>
                        <p>Nombre de Contacto: {PO.clie_Nombre_Contacto}</p>
                        <p>
                          Fecha de Emisión: {PO.orco_FechaEmision.split("T")[0]}{" "}
                          | Fecha Límite: {PO.orco_FechaLimite.split("T")[0]}
                        </p>
                        <p>Dirección de Entrega: {PO.orco_DireccionEntrega}</p>
                      </CardContent>
                      <Checkbox
                        checked={selectedId === PO.orco_Id}
                        onChange={() => handlePOClick(PO)}
                      />
                    </Card>
                  ))}
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                <Button
                  startIcon={<Icon>search</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  disabled={
                    selectedId === "Ninguna Orden de Compra Seleccionada"
                  }
                  onClick={() => {
                    getdata();
                    handleDialogClose();
                  }}
                >
                  Buscar
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>

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
export default Reporte_Planificacion_OrdenCompra;
