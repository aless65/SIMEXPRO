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
import { Card, CardMedia, TextField, Button, Icon, Grid, FormControl, FormLabel, InputAdornment, Select, MenuItem, Collapse, Autocomplete } from '@mui/material';
import CardContent from "@mui/material/CardContent";
import { useForm, Controller } from "react-hook-form";
import History from 'src/@history/@history';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import * as antd from 'antd';
import ReportesProduccionService from './ReportesProduccionService';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";

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
    fontSize: 15,
    textAlign: 'left',
    padding: 5,
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
    borderWidth: 0,
    padding: 3,
    textAlign: 'left',
    fontSize: 4,

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
});

function Reporte_ProduccionPorAreaYfechas() {
  const load_DDLs = Load_DDLs()
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const [areasddl, setareaddl] = useState([]);
  const [PDF, setPDF] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const [grafica, setGrafica] = useState('');





  const Regresar = () => {
    History.push('/Inicio/Produccion');
  };

  const Areas = {
    Area: null,
    FechaComenzar: null,
    FechaLimite: null,
  };

  const schemaArea = yup.object().shape({
    Area: yup.object(),
    FechaComenzar: yup.date(),
    FechaLimite: yup.date()
  });

  //Declaracion del formulario Orden Compra Detalle
  const { reset: resetAreas, control: control, watch: watchAreas, setValue: setValueAreas } = useForm({
    defaultValues: Areas, //Campos del formulario
    mode: "all",
    resolver: yupResolver(schemaArea), //Esquema del formulario
  });

  //Datos del formulario Orden Compra Detalle
  const datosAreas = watchAreas();

  const areaGet = async () => {
    try {
      const data = await load_DDLs.Areas()
      setareaddl(data)
    } catch (error) {

    }
  }

  useEffect(() => {

    areaGet();
  }, []);

  useEffect(() => {

    

    if (datosAreas.FechaComenzar != null && datosAreas.FechaLimite != null &&  datosAreas.Area != null) {

    getdata();

  } else   setPDF(false)


  }, [datosAreas.FechaComenzar, datosAreas.FechaLimite, datosAreas.Area]);


  const getdata = async () => {
    
      try {
        const reportesProduccionService = ReportesProduccionService();
        const data2 = await reportesProduccionService.ProduccionPorAreas(datosAreas.Area, datosAreas.FechaComenzar, datosAreas.FechaLimite);

        setData(data2);
   
      
        if (data2.length != 0) {  

          const labels = ["Dañado - " + "Cantidad: " + data2[0].totalDanado + " Porcentaje: ", "Exitoso - " + "Cantidad: " + data2[0].totalExitoso + " Porcentaje:"];
          const datasets = [data2[0].porcentajeDanado, data2[0].porcentajeBueno];

          const chartconfig = {
            type: 'outlabeledPie',
            data: {
              labels,
              datasets: [
                {
                  label: 'Porcentaje de la Producción',
                  data: datasets,
                  backgroundColor: ['#dcc265', '#9351f7'],
                  borderColor: ['#588CBC', '#FED9B7'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              title: {
                align: 'end',
                display: true,
                position: 'top',
                text: 'Porcentaje de la Producción',
              },
              plugins: {
                legend: false,
                outlabels: {
                  text: '%l %p',
                  color: 'black',
                  stretch: 35,
                  font: {
                    resizable: true,
                    minSize: 12,
                    maxSize: 18,
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
         
          setPDF(true)
       
        }
      


      } catch (error) {

        throw error
      }
    
  };


  const MyDoc = () => (
    <Document title="ReporteProducciónPorArea.pdf" creator="SIMEXPRO" author="SIMEXPRO">
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
          <Text style={styles.detallesTitle}>Reporte Producción Por Area</Text>
          <Text style={styles.headerTextoDerecho}>Fechas Comienzo -  Fecha Final </Text>
          <Text style={styles.headerTextoDerecho}>{datosAreas.FechaComenzar != null  ? datosAreas.FechaComenzar : "No Asiganado"  + " - " + datosAreas.FechaLimite != null ? datosAreas.FechaLimite : "No Asiganado" } </Text>
        </View>
        <View style={styles.line} fixed/>

        <View style={{ marginBottom: 25 }} fixed/>

        <View style={{ display: 'flex' }}>

          <View style={styles.tableRow}>

            <View style={styles.tableCellRegistorsItem}>
              <Text style={styles.cellText}>• Area seleccionada: {data.length > 0 ? data[0].tipa_area : ' ' || "No encontrado"}</Text>
            </View>

            <View style={styles.tableCellRegistorsItem}>
              <Text style={styles.cellText}>• Total de prendas en el Periodo: {data.length > 0 ? data[0].totalPeriodo : ' ' || "No encontrado"}</Text>
            </View>

          </View>

          <View style={styles.tableRow}>

            <View style={styles.tableCellRegistorsItem}>
              <Text style={styles.cellText}>• Promedio  de producción al dia: {data.length > 0 ? data[0].promedioDia : ' ' || "No encontrado"}</Text>
            </View>

            <View style={styles.tableCellRegistorsItem}>
              <Text style={styles.cellText}>• Total de prendas exitosas: {data.length > 0 ? data[0].totalExitoso : ' ' || "No encontrado"}</Text>
            </View>
            
          </View>

          <View style={styles.tableRow}>

            <View style={styles.tableCellRegistorsItem}>
              <Text style={styles.cellText}>• Promedio de producción exitosos: {data.length > 0 ? data[0].promedioExitoso : ' ' || "No encontrado"}</Text>
            </View>

            <View style={styles.tableCellRegistorsItem}>
              <Text style={styles.cellText}>• Total de items dañados: {data.length > 0 ? data[0].totalDanado : ' ' || "No encontrado"}</Text>
            </View>

          </View>

     

          <View style={{ ...styles.columnsContainer }}>
            {data &&
              data.map((datos, Index) => (
                <View key={Index} style={styles.tableContainer}>
                 
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
                      Detalle #{Index + 1}
                    </Text>
                  </View>


                  <View style={{ ...styles.tableContainerTransparente, textTransform: 'uppercase' }}>

                    {/* Encabezado */}
                    <View style={{ ...styles.tableRow, backgroundColor: '#dcc26599', border: 'none' }} fixed>
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Código P.O</Text>
                      </View>

                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Total     Hecho</Text>
                      </View>
                      
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Total Dañado</Text>
                      </View>

                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Estilo</Text>
                      </View>
                   
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Genero</Text>
                      </View>
                      
                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Valor prenda</Text>
                      </View>

                      <View style={styles.tableCellRegistors}>
                        <Text style={styles.cellText}>Comenzó </Text>
                      </View>
                  
                    </View>

                  
                    {datos && datos.detalles ? (
                      datos.detalles.map((detalle, detalleIndex) => (
                        <View key={detalleIndex} style={styles.tableRow}>
                          <View style={styles.tableCellRegistors}>
                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.orco_Codigo}</Text>
                          </View>

                          <View style={styles.tableCellRegistors}>
                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.rdet_TotalDia}</Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.rdet_TotalDanado}</Text>
                          </View>

                          <View style={styles.tableCellRegistors}>
                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.esti_Descripcion}</Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.code_Sexo == "M" ? "Masculino" : detalle.code_Sexo == "F" ? "Femenino" : "Unisex"}</Text>
                          </View>
                          <View style={styles.tableCellRegistors}>
                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.code_Valor}</Text>
                          </View>

                          <View style={styles.tableCellRegistors}>
                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.remo_Fecha}</Text>
                          </View>
                        
                        </View>
                      ))
                    ) : (
                      <View style={{ ...styles.tableRow, textAlign: 'center' }}>
                        <View style={styles.tableCellRegistors}>
                          <Text style={styles.cellText}>Orden de compra sin detalles</Text>
                        </View>
                      </View>
                    )}
                  </View>



                </View>
              ))}

            <View style={styles.ContainerGrafica}>
              <Image src={grafica} style={{ width: '100%' }} />
            </View>


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
          image="https://i.ibb.co/94H2TDv/PRODUCCI-N-POR-REAS.png"
          alt="Encabezado de la carta"
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>

            <Grid item xs={6} style={{ maxHeight: '100px', display: 'flex', flexDirection: 'column' }}>
              <FormControl fullWidth style={{ height: '100%' }}>

                <FormLabel
                  className="font-medium text-12"
                  component="legend"
                >
                  Fechas:
                </FormLabel>
                <RangePicker
                  size="large"
                  style={{ width: '100%', height: '53px', borderRadius: "3px" }} // Ajusta la altura según tus necesidades
                  placeholder={['Fecha inicio', 'Fecha fin']}
                  value={dateRange}
                  onChange={(value) => {
                    setDateRange(value);
                    if (value && value.length === 2) {
                      setValueAreas("FechaComenzar", value[0].format('YYYY-MM-DD'));
                      setValueAreas("FechaLimite", value[1].format('YYYY-MM-DD'));
                    } else {
                    
                      setValueAreas("FechaComenzar", null);
                      setValueAreas("FechaLimite", null);
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ maxHeight: '100px', display: 'flex', flexDirection: 'column' }}>
              <FormControl fullWidth style={{ height: '100%' }}>
                <FormLabel
                  className="font-medium text-12"
                  component="legend"
                >
                  Areas:
                </FormLabel>
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="Areas"
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                      size="large"
                      style={{ width: '100%', height: '40px', borderRadius: "3px" }} // Ajusta la altura según tus necesidades
                      options={areasddl}
                      value={datosAreas.Area ?? null}
                      disableClearable={true}
                      onChange={(event, value) => {
                        setValueAreas("Area", value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params}
                          placeholder="Selecione un Área"
                        />
                      )}
                    />
                  )}
                  name="Area"
                  control={control}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
              </FormControl>
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
        </CardContent>

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
export default Reporte_ProduccionPorAreaYfechas;
