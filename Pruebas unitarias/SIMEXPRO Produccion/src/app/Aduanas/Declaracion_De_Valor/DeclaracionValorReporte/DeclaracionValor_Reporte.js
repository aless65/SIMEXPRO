import { Button, Card, CardMedia, Grid,CardContent,Divider,Chip, Icon, Collapse } from "@mui/material";
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
import React, { useEffect, useState } from "react";
import instance from "src/app/auth/services/jwtService/jwtService";
import Declaracion_ValorService from "../Declaracion_ValorService";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useCalendarState } from "@mui/x-date-pickers/internals";

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
      textAlign: "center",
      fontFamily: 'Times-Roman',
    },
    divisor: {
      fontSize: 18,
      left: 20,
      textAlign: "left",
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
      justifyContent: 'space-between',
    },
    columnsContainer2: {
      top: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      //flex: 1,
      marginRight: 15,
    },
    column2: {
      //flex: 1,
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
      textAlign: "left",
      padding: 8,
      color: "white",
      backgroundColor: "#634a9eb0",
      fontFamily: "Times-Roman",
    },
    tableHeader: {
      flexDirection: 'row',

      backgroundColor: 'white',
    },
    tableRow: {
      flexDirection: 'row',
      borderColor: '#f9f5ff'
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
      textAlign: 'left'
    },
    tableCellRegistorsItem: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'white',
      padding: 3,
      textAlign: 'left',
      left: 18
    },
    tableCellRegistorsItemDerecha: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'white',
      padding: 3,
      textAlign: 'left',
      left: 5
    },
    encabezadoHeader: {
      //flex: 1,
      fontWeight: 'extrabold',
      borderWidth: 1,
      borderColor: 'white',
      textAlign: 'left'
    },
    cellTextHeader: {
      fontSize: 16,
      fontFamily: 'Times-Roman',
      fontWeight: 'bold',
    },
    cellTextHeaderItems: {
      fontSize: 14,
      fontFamily: 'Times-Roman',
      fontWeight: 'bold',
      left: 15,
      bottom: 5,
    },
    cellText: {
      fontSize: 10,
      fontFamily: 'Times-Roman',
      padding: 2,

    },
    cellTextUnderline: {
      fontSize: 12,
      textDecorationLine: 'underline',
    },
    cellTextTabla: {
      fontSize: 10,
      fontFamily: 'Times-Roman'
    },
    cellTextRegistros: {
      fontSize: 12,
      fontFamily: 'Times-Roman',
    },
    headerCellText: {
      fontSize: 15,
      fontFamily: 'Times-Roman',
      textAlign: 'center',
      backgroundColor: '#ebebeb'
    },
    detallesTitle: {
      top: 35,
      left: 20,
      fontSize: 20,
      fontFamily: 'Times-Roman'
    },
    headerTextoDerecho: {
      top: 10,
      textAlign: 'right',
      fontSize: 10,
      fontFamily: 'Times-Roman'
    },
    columnsContainer3: {
      top: 0,
      right: 0,
      justifyContent: 'space-between',
    },

    // headerTextoDerecho: {
    //   top: 10,
    //   textAlign: "right",
    //   fontSize: 9,
    //   fontFamily: "Times-Roman",
    // },
  });

function DevaReporte() {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user')); 
    const DeclaracionValorService = Declaracion_ValorService();
    const [view, setView] = useState(false);
    const [DatosEncabezado, setDatosEncabezado] = useState([]);
    const [FacturaData, setFacturaData] = useState([])
    const [ItemsData, setItemsData] = useState([])
    const [mostrarReporte, setmostrarReporte] = useState(false);
    const [dataDeva, setdataDeva] = useState(location.state);
    const [fechaActual, setFechaActual] = useState(
        instance.formatFechaHora(new Date())
    );

    if (location.state === null) {
      History.back();
    }

    useEffect(() => {
        getData()
      }, []);
    
      async function getData() {
        cargarDataReporte(dataDeva.deva_Id);
        setTimeout(() => {
          setView(true)
        }, "6000");
      }
    

    const Regresar = () => {
        History.push("/Declaracion_Valor/index");
      };


    const cargarDataReporte = async(deva_Id) => {
        try {
          ReporteListadoEncabezado(deva_Id)
          ReporteListadoDetalles(deva_Id)
        } catch (error) {
          
        }
      }
    
      
      const ReporteListadoDetalles = async (ID) => {
        try {
          const {data, ItemsData}  = await DeclaracionValorService.ListarFacturasPorDevaIdReporte(ID);
          setFacturaData(data);
          setItemsData(ItemsData);
        } catch (error) {
          
        }
      };
    
      const ReporteListadoEncabezado = async (ID) => {
        try {
          const dataEnca  = await DeclaracionValorService.listarReporte(ID);
          setDatosEncabezado(dataEnca);
        } catch (error) {
          
        }
      };
    
      const datosCombinados = [];
    
      for (let i = 0; i < FacturaData.length; i++) {
        const Factura = FacturaData[i];
        const Items = ItemsData[i] || [];
    
        datosCombinados.push({
          Factura,
          Items,
        });
      }



    const MyDoc = () => (
        <Document
          title="Reporte.pdf"
          creator="SIMEXPRO"
          author="SIMEXPRO"
          >
            <Page size="A4" style={styles.page}>
              <View style={styles.headerParteIzq}>
                {/* Header Image */}
                <Image src={'https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png'}
                style={{ height: 40, width: 210 }}
                />
              </View>
              <View style={styles.image}>
                <Image src={'https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png'}
                style={{ height: 38, width: 100 }}>
                </Image>
              </View>
              <View style={styles.columnsContainer3}>
                <Text style={styles.detallesTitle}>Reporte de la Declaracion de valor</Text>
                <Text style={styles.headerTextoDerecho}>Fecha: {DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_FechaCreacion = (new Date().toLocaleString(  "es-US", { dateStyle: "long" } )) : "Fecha emisión no disponible"} </Text>
                <Text style={styles.headerTextoDerecho}>No. de Declaracion de Valor: # {DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_Id : "No. de declaracion de valor no disponible"}</Text>
              </View>
              {/* <View style={{ marginBottom: 5 }} />
              <View style={styles.line}></View>
              <View style={{ marginBottom: 20 }} /> */}
              <View style={styles.line} fixed />
              <View style={{ marginBottom: 30 }} fixed />
              <View style={{ display: "flex" }}></View>

              <View style={styles.tableContainerTransparente}>
              {/* <Text style={[styles.tableTitle,{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 35 }]}>Información General de la declaracion de valor</Text> */}
              
              <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginTop: "20px",
                      marginBottom: "5px"
                    }}
                  >
                <Text style={styles.tableTitle}>
                  Información General de la declaracion de valor 
                </Text>
              </View>

              <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #d6d6d6",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginBottom: "10px"
                    }}
                  >
                <View style={styles.tableHeader}>
                  <View style={styles.encabezadoHeader}>
                    <Text style={styles.cellTextHeader}></Text>
                  </View>  
                  <View style={styles.encabezadoHeader}>
                    <Text style={styles.cellTextHeader}></Text>
                  </View>       
                </View>
      
                {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
                {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Aduana Ingreso: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].adua_IngresoNombre : " Aduana ingreso no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Aduana Salida: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].adua_DespachoNombre : "Aduana salida no disponible"}</Text></Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Declaracion Mercancía: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_DeclaracionMercancia : "Declaracion Mercancia no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Fecha Aceptación: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_FechaAceptacion  = (new Date().toLocaleString(  "es-US", { dateStyle: "long" } )) : "Fecha aceptación no disponible"}</Text></Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Lugar entrega: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_LugarEntrega : "Lugar entrega no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Numero de contrato: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_NumeroContrato : "Numero contrato no disponible"}</Text></Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Fecha contrato: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_FechaContrato = (new Date().toLocaleString(  "es-US", { dateStyle: "long" } )) : "Fecha contrato no disponible"}</Text></Text>
      
                  </View>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Moneda: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].monedaNombre : "Moneda no disponible"}</Text></Text>
                  </View>    
                  
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Conversión dolar: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_ConversionDolares : "Conversión no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Forma de envío: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].foen_Descripcion : "Forma envío no disponible"}</Text></Text>
                  </View>
                </View>
      
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Otra forma envío: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_FormaEnvioOtra : "Otra forma de envío no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• País exportación: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].pais_ExportacionNombre : "País exportación no disponible"}</Text></Text>
                  </View>
                </View>
      
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Fecha exportación: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].deva_FechaExportacion = (new Date().toLocaleString(  "es-US", { dateStyle: "long" } )) : "Fecha exportación no disponible"}</Text></Text>
                  </View>
                </View>
      
                {/* Puedes continuar de la misma manera para el resto de los datos, creando una nueva 'tableRow' por cada par de datos que desees mostrar en la tabla. */}
              </View>
              </View>
      
              <View style={styles.tableContainerTransparente}>
              {/* <Text style={[styles.tableTitle,{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 35 }]}>Información del importador</Text> */}
              
              <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginBottom: "10px"
                    }}
                  >
                <Text style={styles.tableTitle}>
                  Información del importador
                </Text>
              </View>

              <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #d6d6d6",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginBottom: "-10px"
                    }}
                  >
                <View style={styles.tableHeader}>
                  <View style={styles.encabezadoHeader}>
                    <Text style={styles.cellTextHeader}></Text>
                  </View>  
                  <View style={styles.encabezadoHeader}>
                    <Text style={styles.cellTextHeader}></Text>
                  </View>       
                </View>
      
                {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
                {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Nombre o Razón social: 
                    <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_Nombre_Raso : "Nombre o razon social no disponible"}</Text>
                    </Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Numero de registro: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_RTN : "Numero de registro no disponible"}</Text></Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Dirección exacta: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_Direccion_Exacta : "Direccion no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Correo electronico: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_Correo_Electronico : "Correo electronico no disponible"}</Text></Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Ciudad: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_CiudadNombre : "Ciudad no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• País: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_PaisNombre : "País no disponible"}</Text></Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Nivel comercial: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].nico_Descripcion : "Nivel comercial no disponible"}</Text></Text>
      
                  </View>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Otro nivel comercial: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_NivelComercial_Otro : "Otro nivel comercial no disponible"}</Text></Text>
                  </View>    
                  
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Teléfono: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_Telefono : "Teléfono no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Fax: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].impo_Fax : "Fax no disponible"}</Text></Text>
                  </View>
                </View>
              </View>
                {/* Puedes continuar de la misma manera para el resto de los datos, creando una nueva 'tableRow' por cada par de datos que desees mostrar en la tabla. */}
              </View>

              <View style={styles.tableContainerTransparente}>
              {/* <Text style={[styles.tableTitle,{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 35 }]}>Información del Proveedor</Text> */}
              
              <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginBottom: "30px",
                      marginTop: "20px",
                    }}
                  >
                    <Text style={styles.tableTitle}>
                      Información del Proveedor
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
                    <Text style={styles.cellTextHeader}></Text>
                  </View>  
                  <View style={styles.encabezadoHeader}>
                    <Text style={styles.cellTextHeader}></Text>
                  </View>       
                </View>
      
                {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
                {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Nombre o Razón social: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_Nombre_Raso : "Nombre o razon social no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Numero Identificación: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_NumeroIdentificacion : "Numero identificacion no disponible"}</Text></Text>
      
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Dirección exacta: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_Direccion_Exacta : "Direccion exacta no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Correo Electrónico: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_Correo_Electronico : "Correo electrónico no disponible"}</Text></Text>
      
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Ciudad: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_CiudadNombre : "Ciudad no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• País: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_PaisNombre : "País no disponible"}</Text></Text>
      
                  </View>
                </View>
                <View style={styles.tableRow}>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Condición comercial: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].coco_Descripcion : "condición comercial no disponible"}</Text></Text>
      
                  </View>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Otra Condición comercial: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].pvde_Condicion_Otra : "Otro condición comercial no disponible"}</Text></Text>
                  </View>    
                  
                </View>
                <View style={styles.tableRow}>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Telefono: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_Telefono : "Telefono no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>•Fax: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].prov_Fax : "Fax no disponible"}</Text></Text>
                  </View>
                </View>
              </View>
                {/* Puedes continuar de la misma manera para el resto de los datos, creando una nueva 'tableRow' por cada par de datos que desees mostrar en la tabla. */}
              </View>
              <View style={{ marginBottom: 15 }} />
              
              <View style={styles.tableContainerTransparente}>
              {/* <Text style={[styles.tableTitle,{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 35 }]}>Información del intermediario</Text> */}
              <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      marginTop: "-10px",
                    }}
                  >
                    <Text style={styles.tableTitle}>
                      Información del intermediario
                    </Text>
                  </View>
              
                  <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #d6d6d6",
                      padding: "2%",
                      textTransform: "uppercase",
                      // marginTop: "-15px"
                    }}
                  >
                <View style={styles.tableHeader}>
                  <View style={styles.encabezadoHeader}>
                    <Text style={styles.cellTextHeader}></Text>
                  </View>       
                </View>
      
                {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
                {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Nombre o Razón social: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_Nombre_Raso : "Nombre o razon social no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Numero Identificación: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_NumeroIdentificacion : "Numero identificacion no disponible"}</Text></Text>
      
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Dirección exacta: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_Direccion_Exacta : "Direccion exacta no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Correo Electrónico: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_Correo_Electronico : "Correo electrónico no disponible"}</Text></Text>
      
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Ciudad: <Text style={styles.cellTextUnderline}> {DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_CiudadNombre : "Ciudad no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• País: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_PaisNombre : "País no disponible"}</Text></Text>
      
                  </View>
                </View>
                <View style={styles.tableRow}>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Tipo Intermediario: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].tipoIntermediario : "Tipo intermediario no disponible"}</Text></Text>
      
                  </View>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Otro Tipo Intermediario: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_Tipo_Otro : "Otro Tipo intermediario no disponible"}</Text></Text>
                  </View>    
                  
                </View>
                <View style={styles.tableRow}>
                <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>• Telefono: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_Telefono : "Telefono no disponible"}</Text></Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>•Fax: <Text style={styles.cellTextUnderline}>{DatosEncabezado.length > 0 ? DatosEncabezado[0].inte_Fax : "Fax no disponible"}</Text></Text>
                  </View>
                </View>
                </View>
                {/* Puedes continuar de la misma manera para el resto de los datos, creando una nueva 'tableRow' por cada par de datos que desees mostrar en la tabla. */}
              </View>
      
              {/*<Text style={styles.divisor}>Items</Text>
              <View style={styles.lineItems}></View>*/}
              <View style={{ marginBottom: 5 }} />
      
              {datosCombinados.map((datos, index) => (
                <React.Fragment key={index}>
      
                  <View style={styles.encabezadoHeader}>
                    {/* <Text style={[styles.tableTitle,{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 35 }]}>Factura de la declaracion de valor {index + 1}</Text> */}
                    <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      // marginBottom: "-6px",
                    }}
                  >
                    <Text style={styles.tableTitle}>
                      Factura de la declaracion de valor {index + 1}
                    </Text>
                  </View>
      
                    {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
                    <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #d6d6d6",
                      padding: "2%",
                      textTransform: "uppercase",
                    }}
                  >
                    <View style={styles.tableRow}>
                      <View style={styles.tableCellRegistorsItem}>
                        <Text style={styles.cellText}>• Coodigo de la factura: {datos.Factura.fact_Numero || "Código no disponible"}</Text>
                      </View>
                      <View style={styles.tableCellRegistorsItem}>
                        <Text style={styles.cellText}>• Fecha: {datos.Factura.fact_Fecha = (new Date().toLocaleString(  "es-US", { dateStyle: "long" } )) || "Fecha no disponible"}</Text>
                      </View>           
                    </View>
                    </View>
                    
                  </View>
      
                  <View style={{ marginBottom: 150 }} />
      
                  <View style={styles.columnsContainer}>
                  <View style={styles.encabezadoHeader}>
                  {/* <View style={styles.tableContainer}>
                      <Text style={styles.tableTitle}>Items de la factura - #{index + 1}</Text>
                  </View> */}

                  <View
                    style={{
                      ...styles.tableContainerTransparente,
                      border: "1px solid #634a9e",
                      padding: "2%",
                      textTransform: "uppercase",
                      // marginBottom: "-6px",
                    }}
                  >
                    <Text style={styles.tableTitle}>
                    Items de la factura - #{index + 1}
                    </Text>
                  </View>


                      {/* Encabezados de la tabla */}
                      <View style={styles.tableRow}>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>No. Item</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Cantidad</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Unidad de medida</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Ident. Comercial</Text>
                        </View>              
                      </View>
                      {/* Datos de los materiales */}
                      {datos.Items.map((Item, itemIndex) => (
                        <View key={itemIndex} style={styles.tableRow}>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_Id}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_Cantidad}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.unme_Id}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_IdentificacionComercialMercancias}</Text>
                          </View>                
                        </View>
                      ))}
                      </View>
      
                  </View>
                  <View style={{ marginBottom: 20 }} />
                  <View style={styles.columnsContainer}>
                    <View style={styles.tableContainer}>
                      {/* Encabezados de la tabla */}
                      <View style={styles.tableRow}>             
                      <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>No Item</Text>
                        </View>   
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>C. Mercancía</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Marca</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Modelo</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Est. Mercancía</Text>
                        </View>
                      </View>
                      {/* Datos de los materiales */}
                      {datos.Items.map((Item, itemIndex) => (
                        <View key={itemIndex} style={styles.tableRow}>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_Id}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_CaracteristicasMercancias}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_Marca}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_Modelo}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.merc_Id}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={{ marginBottom: 20 }} />
                  <View style={styles.columnsContainer}>
                    <View style={styles.tableContainer}>
                      {/* Encabezados de la tabla */}
                      <View style={styles.tableRow}>
                      <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>No Item</Text>
                        </View>  
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>País Origen</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Cl Arancelaria</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Valor Unitario</Text>
                        </View>
                        <View style={styles.tableCellMateriales}>
                          <Text style={styles.headerCellText}>Total Factura</Text>
                        </View>
                      </View>               
      
                      {datos.Items.map((Item, itemIndex) => (
                        <View key={itemIndex} style={styles.tableRow}>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_Id}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.pais_IdOrigenMercancia}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.aran_Codigo}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_ValorUnitario}</Text>
                          </View>
                          <View style={styles.tableCellMateriales}>
                            <Text style={styles.cellText}>{Item.item_TotalFacturaUnitario}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
      
                  </View>
      
                  <View style={{ marginBottom: 20 }} />
                </React.Fragment>
              ))}
      
      
              <Text style={styles.pageDate} render={({ }) => (
                `Fecha de Impresión: ${DatosEncabezado.length > 0 ? instance.formatFechaHora(new Date()) : "Fecha no disponible"}`
              )} fixed />
              <Text style={styles.pageUser} render={({ }) => (
                `Usuario: ${user.data['displayName']}`
              )} fixed />
              <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `Página: ${pageNumber} / ${totalPages}`
              )} fixed />
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
              image="https://i.ibb.co/Trhd4rH/DECLARACI-N-DE-VALOR.png"
              alt="Encabezado de la carta"
            />
            <Collapse in={!view}>
          <Grid
            container
            width={"100%"}
            spacing={2}
            marginY={"10px"}
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
              Generando Declaración de valor...
            </Grid>
          </Grid>
        </Collapse>
                  {/* Collapse para mostrar el Reporte Inicio*/}
        <Collapse in={view}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                <Chip
                  label={"Reporte de la declaración de valor"}
                />
              </Divider>
            </Grid>
            <Grid item xs={6}>
              <PDFDownloadLink document={<MyDoc />} fileName="Reporte.pdf">
                <Button
                  startIcon={<Icon>download</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => { }}
                >
                  Descargar Reporte
                </Button>
              </PDFDownloadLink>
            </Grid>
            <Grid item xs={12}>
              <div>
                <PDFViewer style={{ width: "100%", height: "100vh" }} >
                  <MyDoc />
                </PDFViewer>
              </div>
            </Grid>
            <br></br>
            <Grid
              item
              xs={2}
            ></Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "right",
              }}
            >
              <div className="card-footer">               
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar el Reporte Fin*/}
    
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

export default DevaReporte;


 