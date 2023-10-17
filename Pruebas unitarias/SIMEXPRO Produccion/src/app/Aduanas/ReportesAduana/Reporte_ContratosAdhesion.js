/* eslint-disable no-empty-pattern */
/* eslint-disable array-callback-return */
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
  Select,
  MenuItem,
  IconButton,
  Collapse,
} from '@mui/material';
import { useEffect, useState } from 'react';
import History from 'src/@history/@history';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import * as antd from 'antd';
import ReportesAduanasService from './ReportesAduanaService';
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    border: 'none',
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

function Reporte_ContratosAdhesion() {
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const [fechainicial, setfechainicial] = useState('');
  const [fechafinal, setfechafinal] = useState('');
  const [PDF, setPDF] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const [selectedId, setSelectedId] = useState("NADA");

  const Regresar = () => {
    History.push('/Inicio/Produccion');
  };

  useEffect(() => { }, []);

  const getdata = async () => {
    try {
      if (fechainicial === '' || fechafinal === '' || selectedId === "NADA") {
        toast.warning('El rango de Fechas y Contrato de Adhesión requeridos', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
        return;
      }
      
      const reportesAduanasService = ReportesAduanasService();
      const data = await reportesAduanasService.Contratos_Adhesion(fechainicial, fechafinal, selectedId);
      console.log(data  )
      if (data?.length != 0 || data != undefined){
        setPDF(true);
        setData(data);
      }
      else{
        setPDF(false);
        toast.warning(`No se han encontrado datos en el rango de ${fechainicio} - ${fechafin}` , {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true,
          pauseOnFocusLoss:true,
        });
      }
      
    } catch (error) {
      
    }
  };

  const MyDoc = () => (
    <Document title="Reporte_ContratosAdhesion.pdf" creator="SIMEXPRO" author="SIMEXPRO">
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
          <Text style={styles.detallesTitle}>Reporte Contratos de Adhesión</Text>
          <Text style={styles.headerTextoDerecho}>DATOS BASADOS EN EL RANGO DE:</Text>
          <Text style={styles.headerTextoDerecho}>
            {fechainicial} - {fechafinal}
          </Text>
        </View>
        <View style={styles.line} fixed />
        <View style={{ marginBottom: 30 }} fixed />

        <View style={{ display: 'flex' }}>

          {selectedId === 'PN' && data && data.length > 0 && (
            <View style={{ ...styles.columnsContainer }}>
              {data &&
                data.map((datos, Index) => (
                  <>
                    <View
                      style={{
                        ...styles.tableContainerTransparente,
                        border: '1px solid #634a9e',
                        padding: '2%',
                        textTransform: 'uppercase',
                        marginBottom: '-6px',
                      }}
                    >
                      <Text style={styles.tableTitle}>
                        Contrato de Adhesión Persona Natural {datos.pena_Id}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableContainerTransparente,
                        border: '1px solid #d6d6d6',
                        padding: '2%',
                        textTransform: 'uppercase',
                      }}
                    >
                      <View style={styles.tableHeader}>
                        <View style={styles.encabezadoHeader}>
                          <Text style={styles.cellTextHeader}>INFORMACIÓN</Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Persona:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            RTN:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pers_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pena_RTN : ' '}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.line2,
                          backgroundColor: '#d6d6d6',
                          marginTop: '10px',
                          marginBottom: '8px',
                        }}
                      />

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Ciudad:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Dirección Exacta:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].ciud_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pena_DireccionExacta : ' '}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.line2,
                          backgroundColor: '#d6d6d6',
                          marginTop: '10px',
                          marginBottom: '8px',
                        }}
                      />

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Teléfono Celular:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Teléfono Fijo:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Correo Eléctronico:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Correo Eléctronico Alternativo:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pena_TelefonoCelular : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pena_TelefonoFijo : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pena_CorreoElectronico : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pena_CorreoAlternativo : ' '}
                          </Text>
                        </View>
                      </View>
                      <View style={{ marginBottom: 10 }} />

                      <View
                        style={{
                          ...styles.tableRow,
                          backgroundColor: '#dcc26599',
                          border: 'none',
                        }}
                      >
                        <View style={styles.tableCellRegistors}>
                          <Text style={styles.cellText}>Archivo RTN</Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={styles.cellText}>Archivo DNI</Text>
                        </View>
                      </View>

                      {data && data.length > 0 ? (
                        data.map((datos, Index) => (
                          <View
                            key={Index}
                            style={[styles.tableRow, { backgroundColor: Index % 2 === 0 ? '#fff' : '#eee' }]}
                          >
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>
                                {data.length > 0 ? data[Index].pena_ArchivoRTN : ' '}
                              </Text>
                            </View>
                            <View style={styles.tableCellRegistors}>
                              <Text style={styles.cellText}>
                                {data.length > 0 ? data[Index].pena_ArchivoDNI : ' '}
                              </Text>
                            </View>
                          </View>
                        ))
                      ) : (
                        <View style={{ ...styles.tableRow, backgroundColor: '#eee' }}>
                          <View style={styles.tableCellRegistors}>
                            <Text style={styles.cellText}>No se encontraron datos</Text>
                          </View>
                        </View>
                      )}
                    </View>


                    <View style={styles.line} />
                    <View style={{ marginBottom: 30 }} />
                  </>
                ))}
            </View>
          )}

          {selectedId === 'PJ' && data && data.length > 0 && (
            <View style={{ ...styles.columnsContainer }}>
              {data &&
                data.map((datos, Index) => (
                  <>
                    <View
                      style={{
                        ...styles.tableContainerTransparente,
                        border: '1px solid #634a9e',
                        padding: '2%',
                        textTransform: 'uppercase',
                        marginBottom: '-6px',
                      }}
                    >
                      <Text style={styles.tableTitle}>
                        Contrato de Adhesión Persona Juridica {datos.peju_Id}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableContainerTransparente,
                        border: '1px solid #d6d6d6',
                        padding: '2%',
                        textTransform: 'uppercase',
                      }}
                    >
                      <View style={styles.tableHeader}>
                        <View style={styles.encabezadoHeader}>
                          <Text style={styles.cellTextHeader}>INFORMACIÓN PERSONA JURIDICA</Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Persona:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            No° Local:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Punto de Referencia:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Teléfono de la Empresa:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pers_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_NumeroLocalApart : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_PuntoReferencia : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_TelefonoEmpresa : ' '}
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Ciudad:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Colonia:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Aldea:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].ciud_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].colo_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].alde_Nombre : ' '}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.line2,
                          backgroundColor: '#d6d6d6',
                          marginTop: '10px',
                          marginBottom: '8px',
                        }}
                      />

                      <View style={styles.tableHeader}>
                        <View style={styles.encabezadoHeader}>
                          <Text style={styles.cellTextHeader}>INFORMACIÓN REPRESENTANTE LEGAL</Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Ciudad:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Colonia:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Aldea:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_CiudadRepresentanteNombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_ColoniaRepresentanteNombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_AldeaRepresentanteNombre : ' '}
                          </Text>
                        </View>
                      </View>


                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Teléfono Celular:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Teléfono Fijo:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            No° Local:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Punto de Referencia:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_TelefonoFijoRepresentanteLegal : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_TelefonoRepresentanteLegal : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_NumeroLocalRepresentante : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].peju_PuntoReferenciaRepresentante : ' '}
                          </Text>
                        </View>
                      </View>

                    </View>

                    <View style={{ marginBottom: 10, marginTop: -20 }} />
                  </>
                ))}
            </View>
          )}

          {selectedId === 'CI' && data && data.length > 0 && (
            <View style={{ ...styles.columnsContainer }}>
              -
              {data &&
                data.map((datos, Index) => (
                  <>
                    <View
                      style={{
                        ...styles.tableContainerTransparente,
                        border: '1px solid #634a9e',
                        padding: '2%',
                        textTransform: 'uppercase',
                        marginBottom: '-6px',
                      }}
                    >
                      <Text style={styles.tableTitle}>
                        Contrato de Adhesión Comerciante Individual {datos.coin_Id}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableContainerTransparente,
                        border: '1px solid #d6d6d6',
                        padding: '2%',
                        textTransform: 'uppercase',
                      }}
                    >
                      <View style={styles.tableHeader}>
                        <View style={styles.encabezadoHeader}>
                          <Text style={styles.cellTextHeader}>INFORMACIÓN</Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Persona:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Persona de Representación:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].pers_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? (datos.pers_FormaRepresentacion === false ? 'NO' : (datos.pers_FormaRepresentacion === true ? 'SI' : '')) : ''}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.line2,
                          backgroundColor: '#d6d6d6',
                          marginTop: '10px',
                          marginBottom: '8px',
                        }}
                      />

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Ciudad:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Colonia:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Aldea:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].ciud_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].colo_Nombre : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].alde_Nombre : ' '}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.line2,
                          backgroundColor: '#d6d6d6',
                          marginTop: '10px',
                          marginBottom: '8px',
                        }}
                      />

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Teléfono Celular:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Teléfono Fijo:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Correo Eléctronico:
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            Correo Eléctronico Alternativo:
                          </Text>
                        </View>
                      </View>

                      <View style={{ ...styles.tableRow }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].coin_TelefonoCelular : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].coin_TelefonoFijo : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].coin_CorreoElectronico : ' '}
                          </Text>
                        </View>
                        <View style={styles.tableCellRegistors}>
                          <Text style={{ ...styles.cellText, fontSize: '10px' }}>
                            {data.length > 0 ? data[Index].coin_CorreoElectronicoAlternativo : ' '}
                          </Text>
                        </View>
                      </View>


                    </View>


                    <View style={styles.line} />
                    <View style={{ marginBottom: 30 }} />
                  </>
                ))}
            </View>
          )}

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
          image="https://i.ibb.co/tCgskdh/IMPORTACIONES-POR-PERIODO.png"
          alt="Encabezado de la carta"
        />
        <Grid container spacing={1}>
          <Grid item xs={4} md={4} className="mx-auto">
            <RangePicker
              size="large"
              style={{
                width: '100%',
                marginLeft: "80px",
              }}
              placeholder={['Fecha inicio', 'Fecha fin']}
              value={dateRange}
              onChange={(value) => {
                setDateRange(value);
                if (value && value.length === 2) {
                  setfechainicial(value[0].format('YYYY-MM-DD'));
                  setfechafinal(value[1].format('YYYY-MM-DD'));
                } else {
                  setfechainicial('');
                  setfechafinal('');
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={4} className="mx-auto">
            <FormControl fullWidth>
              <Select
                size="small"
                value={selectedId}
                onChange={(event) => {
                  setSelectedId(event.target.value);
                  setPDF(false);
                }}
                style={{
                  marginLeft: "40px",
                }}
              >
                <MenuItem key={"NADA"} value={"NADA"} selected>
                  Selecciona un Contrato de Adhesión
                </MenuItem>
                <MenuItem key={"PN"} value={"PN"}>
                  Persona Natural
                </MenuItem>
                <MenuItem key={"PJ"} value={"PJ"}>
                  Persona Juridica
                </MenuItem>
                <MenuItem key={"CI"} value={"CI"}>
                  Comerciante Individual
                </MenuItem>
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={2} md={2} className="mx-auto">
            <IconButton
              style={{
                paddingLeft: "15px",
                paddingRight: "15px",
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
              sx={{ "&:hover": { backgroundColor: "#6e52ae" } }}
              edge="start"
              onClick={(event) => {
                getdata();
              }}
            >
              <SearchIcon />
            </IconButton>
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
        <ToastContainer />

      </Card>
    </>
  );
}
export default Reporte_ContratosAdhesion;
