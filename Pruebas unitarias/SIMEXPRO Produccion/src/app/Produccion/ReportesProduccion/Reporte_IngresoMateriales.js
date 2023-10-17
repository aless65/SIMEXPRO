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
import { Card, CardMedia, Button, Icon, Grid, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import History from 'src/@history/@history';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import * as antd from 'antd';
import ReportesProduccionService from './ReportesProduccionService';
const { RangePicker } = antd.DatePicker;

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
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  line: {
    top: 20,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#000000', // Color de la línea
  },
  line2: {
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
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
  },
  imageLogoLetras: {
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
    fontSize: 14,
    textAlign: 'left',
    padding: 8,
    color: 'white',
    backgroundColor: '#634a9eb0',
    fontFamily: 'Times-Roman',
  },
  tableHeader: {
    flexDirection: 'row',

    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    border: 'none'
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  tableCellRegistors: {
    flex: 1,
    borderWidth: 0,
    padding: 0,
  },
  tableCellRegistors: {
    flex: 1,
    borderWidth: 0,
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
    fontSize: 12,
    textDecorationLine: 'underline',
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
  lineGrafica: {
    top: 5,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
  },
  ContainerGrafica: {
    top: 0,
    right: 0,
    left: '14%',
    width: '75%',
  },
});

function Reporte_IngresoMateriales() {
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const [fechainicial, setfechainicial] = useState('');
  const [fechafinal, setfechafinal] = useState('');
  const [PDF, setPDF] = useState(false);
  const [dateRange, setDateRange] = useState({});

  const Regresar = () => {
    History.push('/Inicio/Produccion');
  };

  function convertirAFormatoOracion(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

function formatearFecha(fecha) {
  const date = new Date(fecha);
  const opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString(undefined, opcionesDeFormato);
}

  useEffect(() => { }, []);

  const getdata = async (fechainicio, fechafin) => {
    try {
      const reportesProduccionService = ReportesProduccionService();
      const data = await reportesProduccionService.IngresoMateriales(fechainicio, fechafin);
      setData(data);


    } catch (error) {
      

    }
  };

  const MyDoc = () => (
    <Document title="IngresoMateriales.pdf" creator="SIMEXPRO" author="SIMEXPRO">
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
          <Text style={styles.detallesTitle}>Materiales en Existencia en el Inventario</Text>
          <Text style={styles.headerTextoDerecho}>DATOS BASADOS EN EL RANGO DE:</Text>
          <Text style={styles.headerTextoDerecho}>
            {fechainicial} - {fechafinal}
          </Text>
        </View>
        <View style={styles.line} fixed />
        <View style={{ marginBottom: 30 }} fixed />

        <View style={{ display: 'flex' }} >

          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
          <View style={{ ...styles.columnsContainer }}>-
            <View style={{ ...styles.tableContainerTransparente, border: '1px solid #634a9e', padding: '2%', textTransform: 'uppercase', marginBottom: '-6px' }}>
              <Text style={styles.tableTitle}>INGRESO DE MATERIALES</Text>
            </View>
            <View style={styles.tableContainerTransparente}>
              {/* Encabezados de la tabla */}
              <View style={{ ...styles.tableRow, backgroundColor: '#dcc26599', border: 'none' }}>
                <View style={{ ...styles.tableCellRegistors, alignItems: 'center', position: 'sticky', top: 0, zIndex: 1, minHeight: 30 }}>
                  <Text style={styles.cellText}>Código de Órden</Text>
                </View>
                <View style={{ ...styles.tableCellRegistors, alignItems: 'center', position: 'sticky', top: 0, zIndex: 1, minHeight: 30 }}>
                  <Text style={styles.cellText}>Material</Text>
                </View>
                <View style={{ ...styles.tableCellRegistors, alignItems: 'center', position: 'sticky', top: 0, zIndex: 1, minHeight: 30 }}>
                  <Text style={styles.cellText}>Fecha Entrada</Text>
                </View>
                <View style={{ ...styles.tableCellRegistors, alignItems: 'center', position: 'sticky', top: 0, zIndex: 1, minHeight: 30 }}>
                  <Text style={styles.cellText}>Proveedor</Text>
                </View>
                <View style={{ ...styles.tableCellRegistors, alignItems: 'center', position: 'sticky', top: 0, zIndex: 1, minHeight: 30 }}>
                  <Text style={styles.cellText}>País de Procedencia</Text>
                </View>
                <View style={{ ...styles.tableCellRegistors, alignItems: 'center', position: 'sticky', top: 0, zIndex: 1, minHeight: 30 }}>
                  <Text style={styles.cellText}>Cantidad Ingresada</Text>
                </View>
                <View style={{ ...styles.tableCellRegistors, alignItems: 'center', position: 'sticky', top: 0, zIndex: 1, minHeight: 30 }}>
                  <Text style={styles.cellText}>Saldo en Inventario</Text>
                </View>
              </View>


              {data && data.length > 0 ? (
                data.map((valorTotal, valorTotalIndex) => (
                  <View
                    key={valorTotalIndex}
                    style={[
                      styles.tableRow,
                      { backgroundColor: '#eee' },
                    ]}
                  >
                    <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                      <Text style={styles.cellText}>{valorTotal.peor_Codigo !== null ? valorTotal.peor_Codigo : 'No disponible'}</Text>
                    </View>
                    <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                      <Text style={styles.cellText}>{valorTotal.mate_Descripcion !== null ? valorTotal.mate_Descripcion : 'No disponible'}</Text>
                    </View>
                    <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                      <Text style={styles.cellText}>{formatearFecha(valorTotal.peor_FechaEntrada) !== null ? formatearFecha(valorTotal.peor_FechaEntrada) : 'No disponible'}</Text>
                    </View>
                    <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                      <Text style={styles.cellText}>{valorTotal.prov_NombreCompania !== null ? valorTotal.prov_NombreCompania : 'No disponible'}</Text>
                    </View>
                    <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                      <Text style={styles.cellText}>{convertirAFormatoOracion(valorTotal.pais_Nombre) !== null ? convertirAFormatoOracion(valorTotal.pais_Nombre) : 'No disponible'}</Text>
                    </View>
                    <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                      <Text style={styles.cellText}>{valorTotal.prod_Cantidad !== null ? valorTotal.prod_Cantidad : 'No disponible'}</Text>
                    </View>
                    <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                      <Text style={styles.cellText}>
                        {valorTotal.lote_Stock !== null ? parseInt(valorTotal.lote_Stock) : 'No disponible'}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={{ ...styles.tableRow, textAlign: 'center' }}>
                  <View style={{ ...styles.tableCellRegistors, alignItems: 'center' }}>
                    <Text style={styles.cellText}>No se encontraron datos</Text>
                  </View>
                </View>
              )}

            </View>

            <View style={styles.line} />
            <View style={{ marginBottom: 30 }} />


          </View>
        </View>

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
          image="https://i.ibb.co/0qyLTKW/INGRESO-DE-MATERIALES-A-INVENTARIO.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={3}>
          <Grid item xs={6} md={6} className="mx-auto">
            <RangePicker

              size="large"
              style={{ width: '100%' }}
              placeholder={['Fecha inicio', 'Fecha fin']}
              value={dateRange}
              onChange={(value) => {
                setDateRange(value);
                if (value && value.length === 2) {
                  getdata(value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD'));
                  setfechainicial(value[0].format('YYYY-MM-DD'));
                  setfechafinal(value[1].format('YYYY-MM-DD'));
                  setPDF(true);
                } else {
                  setfechainicial('');
                  setfechafinal('');
                }
              }}
            />
          </Grid>
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
export default Reporte_IngresoMateriales;
