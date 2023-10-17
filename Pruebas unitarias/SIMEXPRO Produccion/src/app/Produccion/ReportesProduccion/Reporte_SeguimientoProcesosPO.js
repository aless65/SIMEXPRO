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
} from '@react-pdf/renderer';
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
} from '@mui/material';
import { useEffect, useState } from 'react';
import React from "react";
import History from 'src/@history/@history';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import Load_DDLs from 'src/app/loadDDLs/Load_DDL';
import ReportesProduccionService from './ReportesProduccionService';
import OrdenCompraReportService from '../OrdenCompra/OrdenCompraReport';
import SearchIcon from "@mui/icons-material/Search";
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Se suma 1 ya que los meses comienzan en 0
const año = fechaActual.getFullYear();
const hora = fechaActual.getHours();
const minutos = fechaActual.getMinutes();
const segundos = fechaActual.getSeconds();

const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

Font.register({
  family: 'Arial',
  fonts: [
    {
      src: `https://db.onlinewebfonts.com/t/8d223b3ad8d4819e9dcf22757e4cc2c4.ttf`,
    },
    {
      src: `https://db.onlinewebfonts.com/t/3d6b457e3aa0c0b78e6fbf0355bc43a6.ttf`,
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  cellWithLine: {
    position: 'relative',
    marginBottom: 10,
  },
  line: {
    top: 20,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#000000', // Color de la línea
  },
  lineItems: {
    top: 5,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#000000', // Color de la línea
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 25,
    paddingBottom: 40,
  },
  header: {
    fontWeight: 'bold',
    fontFamily: 'Times-Roman',
    fontSize: 14,
    marginBottom: 5,
  },
  innerheader: {
    fontWeight: 'bold',
    fontFamily: 'Times-Roman',
    fontSize: 14,
    marginBottom: 5,
  },
  image: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 5,
    right: 30,
    position: 'absolute',

  },
  imageLogoLetras: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
  },
  title: {
    top: 70,
    right: 90,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
  divisor: {
    fontSize: 18,
    left: 20,
    textAlign: 'left',
    fontFamily: 'Times-Roman',
  },
  subtitle: {
    top: 69,
    left: 50,
    right: 20,
    bottom: 30,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 9,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: 'right',
    color: 'grey',
  },
  pageUser: {
    position: 'absolute',
    fontSize: 9,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: 'center',
    color: 'grey',
  },
  pageDate: {
    position: 'absolute',
    fontSize: 9,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: 'left',
    color: 'grey',
  },
  columnsContainer: {
    flexDirection: 'column',
  },
  column: {
    marginBottom: 10,
  },
  columnsContainer1: {
    padding: 30,
    top: 0,
    right: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  columnsContainer2: {
    top: 0,
    right: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  headerParteIzq: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
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
    margin: '5px',
    borderColor: '#dedede',
  },
  tableContainerMateriales: {
    borderWidth: 1,
    margin: '5px',
    borderColor: '#ebebeb',
  },
  tableContainerTransparente: {
    borderWidth: 1,
    textAlign: 'center',
    margin: '10px',
    borderColor: 'white',
  },
  tableTitle: {
    fontSize: 15,
    textAlign: 'left',
    padding: 5,
    backgroundColor: '#634a9eb0',
    fontFamily: 'Times-Roman',
  },
  tableHeader: {
    flexDirection: 'row',

    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    borderColor: '#f9f5ff',
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  tableCellMateriales: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 0,
  },
  tableCellRegistors: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
    textAlign: 'left',
  },
  tableCellRegistorsItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
    textAlign: 'left',
    left: 18,
  },
  tableCellRegistorsItemDerecha: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
    textAlign: 'left',
    left: 5,
  },
  encabezadoHeader: {
    borderWidth: 1,
    fontFamily: 'Times-Roman',
    borderColor: 'white',
    textAlign: 'left',
  },
  cellTextHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cellTextHeaderItems: {
    fontSize: 12,
    fontWeight: 'bold',
    left: 15,
    bottom: 5,
  },
  cellText: {
    fontSize: 11,
    padding: 2,
    fontFamily: 'Times-Roman',
  },
  cellTextUnderline: {
    fontSize: 11,
    textDecorationLine: 'underline',
    fontFamily: 'Times-Roman',
  },
  cellTextTabla: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  cellTextRegistros: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
  },
  headerCellText: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    textAlign: 'center',
    backgroundColor: '#ebebeb',
  },
  detallesTitle: {
    top: 35,
    left: 20,
    fontSize: 20,
    fontFamily: 'Times-Roman',
  },
  headerTextoDerecho: {
    top: 10,
    textAlign: 'right',
    fontSize: 9,
    fontFamily: 'Times-Roman',
  },
  columnsContainer3: {
    top: 0,
    right: 0,
  },
});


const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  cardImage: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  cardDescription: {
    flex: 1,
  },
  scrollContainer: {
    maxHeight: '213px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
  },

  card: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  cardMedia: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  cardContent: {
    flex: 1,
    marginBottom: '2px'
  },

  searchField: {
    borderRadius: '10px',
    width: '100%',
    marginBottom: '5px',
    maxWidth: '1000px',
  },
}));

function Reporte_SeguimientoProcesosPO() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState('Ninguna Orden de Compra Seleccionada');
  const [ddl, setDdl] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [PDF, setPDF] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const ordenCompraGodService = OrdenCompraReportService();
  const classes = useStyles();
  const [filteredDdl, setFilteredDdl] = useState([]);

  const user = useSelector(selectUser);
  const Regresar = () => {
    History.push('/Inicio/Produccion');
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
      const reportesProduccionService = ReportesProduccionService();
      const data = await reportesProduccionService.SeguimientodeProcesosPO(selectedId);
      setData(data);

    } catch (error) {
      console.log(error.message);
    }
  };

  const ddlget = async () => {
    try {
      const data = await ordenCompraGodService.listarEncabezado();
      // Ordena los datos por orco_Id de menor a mayor
      data.sort((a, b) => a.orco_Codigo - b.orco_Codigo);
      setDdl(data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleSearchChangeDDL = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filtrar la copia de ddl en función del valor de búsqueda
    const filteredDdl = ddl.filter((item) =>
      item.orco_Codigo.toString().includes(searchTerm)
    );

    // Actualizar la lista filtrada
    setFilteredDdl(filteredDdl);
  };



  const handlePOClick = (PO) => {
    setSelectedId(PO.orco_Codigo);
  };

  const MyDoc = () => (
    <Document title="SeguimientoPorProcesosPO.pdf" creator="SIMEXPRO" author="SIMEXPRO">
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
          <Text style={styles.detallesTitle}>Reporte Seguimiento de Procesos </Text>
          <Text style={styles.headerTextoDerecho}>Codigo de la orden de compra</Text>
          <Text style={styles.headerTextoDerecho}> {data.length > 0 ? data[0].orco_Codigo : ' '} </Text>
        </View>
        <View style={styles.line} fixed/>

        <View style={{ marginBottom: 30 }} fixed/>

        <View style={{ display: 'flex' }}>
          <View style={styles.tableContainerTransparente}>
            <View style={styles.tableHeader}>
              <View style={styles.encabezadoHeader}>

              </View>
            </View>
            {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}

            <View
              style={{
                ...styles.tableContainerTransparente,
                border: '1px solid #634a9e',
                padding: '2%',
                textTransform: 'uppercase',
                marginBottom: '-6px',
              }}
            >
              <Text style={{ ...styles.tableTitle, fontWeight: 'bold' }}>
                Datos de la orden de compra
              </Text>
            </View>
            <View style={styles.tableRow}>

              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Id Orden:{' '}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].orco_Id : ' '}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Estado de la Orden:{' '}
                  <Text style={styles.cellTextUnderline}>
                    {' '}
                    {data.length > 0 ? data[0].orco_EstadoOrdenCompra === 'C' ? 'En Curso' : data[0].orco_EstadoOrdenCompra === 'T' ? 'Finalizado' : data[0].orco_EstadoOrdenCompra === 'P' ? 'Pendiente' : " " : " "}
                  </Text>
                </Text>
              </View>

            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • ¿Orden Finalizada?:{' '}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].orco_EstadoFinalizado == false ? "No" : "Si" : ' '}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCellRegistors}>
                <Text style={styles.cellText}>
                  • Nombre del Cliente:{' '}
                  <Text style={styles.cellTextUnderline}>
                    {data.length > 0 ? data[0].clie_Nombre_O_Razon_Social : ' '}
                  </Text>
                </Text>
              </View>
            </View>



          </View>
          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
          <View style={{ ...styles.columnsContainer }}>
            {data.map((datos, index) => (
              <React.Fragment key={index}>

                <View style={styles.encabezadoHeader}>


                  <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: '1px solid #634a9e',
                      padding: '2%',
                      textTransform: 'uppercase',
                      marginBottom: '-6px',
                    }}
                  >
                    <Text style={{ ...styles.tableTitle, fontWeight: 'bold' }}>
                      Detalle del Item #{index + 1}
                    </Text>
                  </View>

                  {/* Aquí es donde comenzamos a llenar la tabla con los datos */}

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Código del Item: {datos.code_Id || "Código no disponible"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Proceso de comienzo: {datos.proc_Comienza || "Proceso de comienzo no disponible"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Talla: {datos.tall_Nombre || "Talla no disponible"}</Text>
                    </View>

                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Genero prenda: {datos.code_Sexo == "M" ? "Masculino" : datos.code_Sexo == "F" ? "Femenino" : "Unisex" || "Sexo no disponible"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Proceso actual: {datos.proc_Actual || "Proceso de comienzo no disponible"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Color: {datos.colr_Nombre || "Color no disponible"}</Text>
                    </View>

                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Estilos: {datos.esti_Descripcion || "Estilo no disponible"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Cantidad de prendas: {datos.code_CantidadPrenda || "Proceso de comienzo no disponible"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Orden Manufactura: {datos.OrdenProduccion || "No asignado"}</Text>
                    </View>

                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Factura ID: {datos.faex_Id || "No facturada"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Fecha Facturación: {datos.FechaExportacion || "No facturada"} </Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Cantidad Exportada: {datos.CantidadExportada || "No facturada"}</Text>
                    </View>


                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Cajas: {datos.fede_Cajas || "No facturada"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}>• Total gastado: {datos.fede_TotalDetalle || "No facturada"}</Text>
                    </View>
                    <View style={styles.tableCellRegistorsItem}>
                      <Text style={styles.cellText}></Text>
                    </View>

                  </View>
                </View>



                <View style={styles.columnsContainer}>
                  {datos.seguimientoProcesos.map((proceso, procesoIndex) => (
                    <View key={procesoIndex} style={styles.tableContainer}>

                      <View
                        style={{
                          ...styles.tableContainerTransparente,
                          border: '1px solid #634a9e',
                          padding: '2%',
                          textTransform: 'uppercase',
                          marginBottom: '-2px',
                        }}
                      >
                        <Text style={{ ...styles.tableTitle, fontWeight: 'bold' }}>
                          Proceso: {proceso.proc_Descripcion} - Modulo: {proceso.modu_Nombre || "No asignado"}
                        </Text>

                      </View>
                      <br></br>
                      {/* Verifica si el primer campo es "Nada" */}
                      {proceso.Empleado === "Nada" ? (
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCellRegistors, { flex: 4, justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={styles.cellText}>Proceso aún no ha comenzado</Text>
                          </View>
                        </View>
                      ) : (
                        /* Si no es "Nada", muestra los datos de la tabla */
                        <>
                          <View
                            style={{
                              ...styles.tableRow,
                              backgroundColor: '#dcc26599',
                              border: 'none',
                            }}
                          >
                            {/* Encabezados de la tabla */}
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>Empleado</Text>
                            </View>
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>Fecha Inicio</Text>
                            </View>
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>Fecha Fin</Text>
                            </View>
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>Cantidad a Producir</Text>
                            </View>
                          </View>

                          {/* Datos de los materiales */}
                          <View
                            key={procesoIndex}
                            style={[styles.tableRow, { backgroundColor: procesoIndex % 2 === 0 ? '#fff' : '#eee' }]}
                          >
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>{proceso.Empleado}</Text>
                            </View>
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>{proceso.asor_FechaInicio}</Text>
                            </View>
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>{proceso.asor_FechaLimite}</Text>
                            </View>
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>{proceso.asor_Cantidad}</Text>
                            </View>
                          </View>
                        </>
                      )}
                    </View>
                  ))}
                </View>


                <View style={{ marginBottom: 5 }} />
              </React.Fragment>
            ))


            }
          </View>
        </View>

        <View style={{ marginBottom: 5 }} />

        <Text
          style={styles.pageDate}
          render={({ }) => `Fecha de Impresión: ${fechaFormateada}`}
          fixed
        />
        <Text
          style={{ ...styles.pageUser, textTransform: 'capitalize' }}
          render={({ }) => `Usuario: ${user.data.displayName}`}
          fixed
        />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Página: ${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );

  return (
    <>
      <Card sx={{ minWidth: 275, margin: '40px' }}>
        <CardMedia
          component="img"
          height="200"
          className="mb-24"
          image="https://i.ibb.co/BVGg0qh/SEGUIMIENTO-DE-PROCESOS-POR-RDEN-DE-COMPRA.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={3}>
          <Grid item xs={6} md={6} className="mx-auto">
            <FormControl style={{ width: '80%' }}>
              <FormLabel className="mt-5">Orden de Compra</FormLabel>
              <TextField
                value={selectedId}
                disabled={true}
              >
              </TextField>
            </FormControl>
            <IconButton
              style={{ marginTop: '24px', padding: '15px', marginLeft: '5px', borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              sx={{ '&:hover': { backgroundColor: '#6e52ae' } }}
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
            <DialogTitle id="alert-dialog-title">
              Ordenes de Compra (P.O)
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Escoja un orden de Compra para ver su Seguimiento
              </DialogContentText>

              <div>
                <TextField
                  style={{ borderRadius: '10px' }}
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
                  {filteredDdl.map(PO => (
                    <Card
                      key={PO.orco_Id}
                      className={`${classes.card} ${selectedId === PO.orco_Id ? classes.selectedCard : ''}`}
                      onClick={() => handlePOClick(PO)}
                    >
                      <CardContent className={classes.cardContent}>
                        <h4>PO: #{PO.orco_Id}</h4>
                        <h4>Codigo Unico: #{PO.orco_Codigo}</h4>
                        <p>Cliente O Razón Social: {PO.clie_Nombre_O_Razon_Social}</p>
                        <p>Nombre de Contacto: {PO.clie_Nombre_Contacto}</p>
                        <p>Fecha de Emisión: {PO.orco_FechaEmision.split('T')[0]} | Fecha Límite: {PO.orco_FechaLimite.split('T')[0]}</p>
                        <p>Dirección de Entrega: {PO.orco_DireccionEntrega}</p>
                      </CardContent>
                      <Checkbox
                        checked={selectedId === PO.orco_Codigo}
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
                  disabled={selectedId === 'Ninguna Orden de Compra Seleccionada'}
                  onClick={() => {
                    getdata();
                    handleDialogClose();
                    setPDF(true);
                  }}

                >
                  Buscar
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>

          <Grid item xs={12}>
            <Collapse in={PDF}>
              <PDFDownloadLink document={<MyDoc />} fileName="Reporte.pdf">
                {' '}
              </PDFDownloadLink>
              <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <MyDoc />
              </PDFViewer>
            </Collapse>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          style={{ position: 'fixed', top: '76%', right: '5%' }}
          onClick={Regresar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Regresar
        </Button>
      </Card>
    </>
  );
}
export default Reporte_SeguimientoProcesosPO;
