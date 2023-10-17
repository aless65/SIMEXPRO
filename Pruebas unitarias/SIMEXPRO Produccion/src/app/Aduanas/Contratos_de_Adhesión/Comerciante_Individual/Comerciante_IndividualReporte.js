import {
  Button,
  Card,
  CardMedia,
  Grid,
  Icon,
} from "@mui/material";
import {
  Document,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState  } from "react";
import History from "src/@history/@history";
import { useLocation } from "react-router-dom";
import Comerciante_IndividualService from "./Comerciante_IndividualService";
import { fontWeight, height } from "@mui/system";
import { date } from "yup";
import { Typography } from "antd";

// import Table from "./components/reports/Table";


const styles = StyleSheet.create({
  ini: {
    top: 49,
    left: -5,
    right: 25,
    textAlign: 'justify',
    fontSize: 13.9,
    fontFamily: 'Times-Roman',
  },
  prueba: {
    fontWeight: "bold",
    color: "#000000",
    textDecoration:'underline',
    fontSize: 13.9,
  },
  inicio: {
    top: 42,
    left: 15,
    right: 15,
    textAlign: 'justify',
    fontSize: 13.9,
    fontFamily: 'Times-Roman',
  },
  inicio2: {
    top: 50,
    left: 15,
    right: 15,
    textAlign: "justify",
    fontSize: 13.9,
    fontFamily: 'Times-Roman',
  },
  clapsula: {
    fontWeight: "bold",       
    fontFamily: 'Times-Roman', 
    color: "#000000",
    top: 50,
    left: 15,
    right: 15,
    textAlign: "justify",
    fontSize: 15,               
  },
  
  
  inicio3: {
    top: 60,
    left: 15,
    right: 15,
    textAlign: 'justify',
    fontSize: 13.9,
    fontFamily: 'Times-Roman',
  },
  inicio4: {
    top: 70,
    left: 15,
    right: 15,
    textAlign: 'justify',
    fontSize: 13.9,
    fontFamily: 'Times-Roman',
  },
  inicio42: {
    top: 100,
    left: 15,
    right: 15,
    textAlign: 'justify',
    fontSize: 13.9,
    fontFamily: 'Times-Roman',
  },
  inicio5: {
    top: 70,
    textAlign: "center",
    fontSize: 13,
    fontFamily: 'Times-Roman',
  },
  inicio52: {
    top: 142,
    textAlign: "center",
    fontSize: 13,
    fontFamily: 'Times-Roman',
  },
  inicio6: {
    top: 70,
    textAlign: "center",
    fontSize: 13,
    fontFamily: 'Times-Roman',
  },
  inicio62: {
    top: 142,
    textAlign: "center",
    fontSize: 13,
    fontFamily: 'Times-Roman',
  },
  detallesTitle: {
    top: 20,
    left: 10,
    fontSize: 15,
    color: "#000000",
    textDecorationColor: "black",
    fontWeight: "bold",
    fontFamily: "Times-Roman",
  },
  detallesTitle2: {
    top: 42,
    left: -2,
    fontSize: 14,
    textDecorationColor: "black",
    fontWeight: "bold",
    fontFamily: "Times-Roman",
  },
  detallesTitle3: {
    top: 50,
    left: -2,
    fontSize: 14,
    textDecorationColor: "black",
    fontWeight: "bold",
    fontFamily: "Times-Roman",
  },
  detallesTitle32: {
    top: 50,
    left: 5,
    fontSize: 14,
    textDecorationColor: "black",
    fontWeight: "bold",
    fontFamily: "Times-Roman",
  },
  detallesTitle4: {
    top: 60,
    left: -2,
    fontSize: 14,
    textDecorationColor: "black",
    fontWeight: "bold",
    fontFamily: "Times-Roman",
  },
  detallesTitle5: {
    top: 70,
    left: -25,
    fontSize: 14,
    textDecorationColor: "black",
    fontWeight: "bold",
    fontFamily: "Times-Roman",
  },
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
    alignItems: 'center',
    justifyContent: 'center',
    // position: "absolute",
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
    fontSize: 12,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: "left",
    color: "black",
    fontFamily: "Times-Roman",
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
    fontSize: 12,
    bottom: 20, // Adjust this value as needed
    left: 30,
    right: 30,
    textAlign: "right",
    color: "black",
    fontFamily: "Times-Roman",
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
    justifyContent: "space-between",
  },
  columnsContainer2: {
    top: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
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
    // borderWidth: 2,
    // margin: "5px",
    borderColor: "black",
  },
  tableContainerMateriales: {
    borderWidth: 1,
    // margin: "5px",
    borderColor: "black",
  },
  tableContainerTransparente: {
    // borderWidth: 1,
    textAlign: "center",
    // margin: "10px",
    borderColor: "black",
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    padding: 5,
    backgroundColor: "#dedede",
    fontFamily: "Times-Roman",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white",
    // marginTop: 10
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "#f9f5ff",
    // padding: 10
  },
  tableCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    // padding: 10,
  },
  tableCellMateriales: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 0,
    textAlign: 'center',
    justifyContent: 'center'
  },
  tableCellMateriales2: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 0,
    textAlign: 'justify',
  },
  tableCellRegistors: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    // padding: 3,
    textAlign: "left",
  },
  tableCellRegistorsItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    // padding: 3,
    textAlign: "left",
    left: 18,
  },
  tableCellRegistorsItemDerecha: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    // padding: 3,
    textAlign: "left",
    left: 5,
  },
  encabezadoHeader: {
    flex: 1,
    fontWeight: "extrabold",
    borderWidth: 1,
    borderColor: "white",
    textAlign: "left",
  },
  cellTextHeader: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    textAlign: 'left'
  },
  cellTextHeader2: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    textAlign: 'center'
  },
  cellTextHeader3: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    textAlign: 'right'
  },
  cellTextHeaderItems: {
    fontSize: 14,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    left: 15,
    // bottom: 5,
  },
  cellText: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    padding: 2,
    marginLeft: 13,
    // marginTop: 5
  },
  cellTextdias: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    padding: 2,
    marginLeft: 13,
    // marginTop: 5,
    justifyContent: 'center'
  },
  cellTextObservaciones: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    // padding: 3,
    marginLeft: 3,
  },
  cellText2: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    // padding: 2,
    marginLeft: 64,
  },
  cellText3: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    // padding: 2,
    marginLeft: 55,
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
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  headerCellText: {
    fontSize: 10,
    fontFamily: "Times-Roman",
    textAlign: "center",
    backgroundColor: "#ebebeb",
  },
  headerTextoDerecho: {
    // top: 10,
    textAlign: "right",
    fontSize: 14,
    fontFamily: "Times-Roman",
  },
  columnsContainer3: {
    top: 10,
    right: 20,
    justifyContent: "space-between",
  },
  columnsContainer32: {
    top: 60,
    right: 0,
    justifyContent: "space-between",
  },
  columnsContainer321: {
    top: 70,
    right: 0,
    justifyContent: "space-between",
  },
});

function Comerciante_IndividualReporte() {

  const comerciante_IndividualService = Comerciante_IndividualService();
  const location = useLocation();
  const Datos = location.state;

  

  

 
    
  useEffect(() => {
  }, []);

    //Constante que usa el boton regresar en el Reporte
  const Regresar = () => {
    History.push("/ComercianteIndividual/index");
  };

  const MyDoc = () => (
    <Document title="ContratoDeAdhesiónComercianteIndividual" creator="SIMEXPRO" author="SIMEXPRO">
      <Page size="A4" style={styles.page}>
        <View style={styles.image}>
          <Image
            src={"https://i.ibb.co/MRcyTqv/Banner-interno-contradhesion.png"}
            style={{ height: 100, width: 630 }}
          ></Image>
        </View>

        <View style={styles.columnsContainer3}>
          <Text style={styles.detallesTitle}>CONTRATO DE ADHESIÓN DE OBLIGADO TRIBUTARIO NO. <Text style={styles.prueba}> {Datos["coin_Id"]}  </Text></Text>
        </View>


        {/* Contenido*/}
        <View style={styles.tableContainerTransparente}>
          {/* Encabezado */}
          <View >
            <View>
              <View>
              <Text style={styles.ini}>Yo <Text style={styles.prueba}>   {Datos["pers_Nombre"]}  </Text>, con RTN No. <Text style={styles.prueba}>   {Datos["pers_RTN"]}  </Text>, 
              con domicilio fiscal de comerciante individual (departamento
                y  Ciudad) <Text style={styles.prueba}>  {Datos["pvin_Nombre"]} - {Datos["ciud_Nombre"]}  </Text>, (colonia, numero de referencia, aldea en caso de haber) <Text style={styles.prueba}>    {Datos["colo_Nombre"]} - {Datos["coin_PuntoReferencia"]}   </Text>,
                con número  de celular / teléfono <Text style={styles.prueba}>  {Datos["coin_TelefonoCelular"]}   </Text> , actuando en mi condición de Comerciante Individual, lo cual acredito con copia adjunta de Declaración Comerciante 
                Individual, y estando en el pleno ejercicio de mis derechos civiles, libre y espontáneamente manifiesto mi Adhesión a las siguientes condiciones de uso de la Plataforma Electrónica de
                Comercio de Honduras ante la Administración Aduanera, consistiendo en: </Text>
              </View>
      
              <View style={styles.columnsContainer3}>
                <Text style={styles.inicio}>Declaro que los datos proporcionados en el presente contrato son verídicos, y designo el correo electrónico: <Text style={styles.prueba}>  {Datos["coin_CorreoElectronico"]}   </Text>
                como  medio preferente  para efectos de la recepción o envío de solicitudes, escritos, autos, notificaciones , requerimientos y cualquier  otro proveído, comunicaciones, resoluciones  y
                cualquier otra actuación ante la Administración Aduanera o emitido por esta, por lo cual, me someto a todos los efectos legales que estos produzcan, de conformidad con lo establecido en
                el Código Tributario (Decreto No. 170-2016), en sus artículos 88, numeral 4), 89 numeral 2) y 91 numerales 3) y 4) y lo dispuesto en el Código Aduanero Uniforme Centroamericano
                (CAUCA), en su artículo 31, 33, 35, 36, 39 y 40 y demás disposiciones legales aplicables.</Text>
              </View>

              <View style={styles.columnsContainer3}>
             
            <Text style={styles.inicio2}><Text style={styles.clapsula}> CLAÚSULA SEGUNDA:</Text> Reconozco que las comunicaciones/ notificaciones y demás datos transmitidos
                  electrónicamente mediante internet utilizando la clave de acceso asignada y correo electrónico notificado, tendrá el mismo valor y eficacia probatoria como si
                  la información se presentará por escrito y con firma autógrafa de conformidad a lo dispuesto por en el Decreto 170-2016 Código Tributario y Código Aduanero y 
                  su Reglamento (CAUCA) y su Reglamento (RECAUCA).</Text>
              </View>

              <View style={styles.columnsContainer3}>
                <Text style={styles.inicio3}>  <Text style={styles.clapsula}>CLAÚSULA TERCERA: </Text> Declaro que los documentos que adjunto al presente contrato y los que anexe a cualquier petición,
                comunicación o actuación mediante el Sistema, son legítimos y corre bajo mi responsabilidad cualquier vicio que afecte la validez de los mismos.</Text>
              </View>

              <View style={styles.columnsContainer3}>
                <Text style={styles.inicio4}> <Text style={styles.clapsula}>CLAÚSULA CUARTA: </Text>Reconozco mi obligación de comunicar y actualizar ante la Administración Aduanera cualquier cambio en relación con mis datos personales incluyendo
                correo electrónico, así como el domicilio en caso de ser modificados, sometiéndome a la suscripción de un nuevo contrato de adhesión. Acepto que en tanto no comunique o notifique
                los cambios referidos en la presente cláusula, mis datos vigentes para todos los efectos legales que deriven de las actuaciones ante el servicio aduanero son los consignados en el presente
                contrato de adhesión.</Text>
              </View>

            </View>
          </View>
        </View>
        <View style={{ marginBottom: 5 }} />
        {/* <Text style={styles.pageDate} render={({ }) => (
          `Fecha de Impresión: ${ new Date().toLocaleString(  "es-US", { dateStyle: "short" } )}`
        )} fixed /> */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.image}>
          <Image
            src={"https://i.ibb.co/MRcyTqv/Banner-interno-contradhesion.png"}
            style={{ height: 100, width: 630 }}
          ></Image>
        </View>

        {/* Contenido*/}
        <View style={styles.tableContainerTransparente}>
          {/* Encabezado */}
          <View >
            <View>      
              <View style={styles.columnsContainer3}>
                <Text style={styles.inicio}> <Text style={styles.clapsula}>CLAÚSULA QUINTA: </Text>Para todas las gestiones realizadas mediante el sistema de gestión y transmisión de información sobre peticiones a la Administración Aduanera, se observará todo
                lo dispuesto en la Constitución de la República, Código Aduanero Uniforme Centroamericano (CAUCA) y su Reglamento (RECAUCA), Código Tributario vigente, Ley del Procedimiento
                Administrativo y demás leyes aplicables.</Text>
              </View>

              <View style={styles.columnsContainer3}>
                <Text style={styles.inicio2}>   <Text style={styles.clapsula}>CLAÚSULA SEXTA: </Text>El presente Contrato de Adhesión tendrá vigencia por un año a partir de la fecha en que suscribo el mismo y acepto que el mismo se renueve por el mismo plazo de 
                manera automática si previamente a su vencimiento no manifiesto mi voluntad expresa ante la Administración Aduanera de no renovar el mismo.</Text>
                <Text style={styles.inicio2}> </Text>
                <Text style={styles.inicio2}>Sin más que agregar, le hago saber mi satisfacción y acuerdo ante este contrato.</Text>
              </View>

              <View style={styles.columnsContainer32}>
                <Text style={styles.inicio5}>___________________________________</Text>
                <Text style={styles.inicio6}>Firma y Huella del Obligado Tributario</Text>
              </View>

              <View style={styles.columnsContainer321}>
                <Text style={styles.inicio42}>Aceptado  por  la  Administración  Aduanera  en  la  ciudad  de <Text style={styles.prueba}>  {Datos["ofic_Nombre"]}  </Text>,</Text>
                <Text style={styles.inicio42}>el <Text style={styles.prueba}>    { new Date().toLocaleString(  "es-US", { dateStyle: "long" } )}    </Text>.</Text>
              </View>

              <View style={styles.columnsContainer32}>
                <Text style={styles.inicio52}>___________________________________</Text>
                <Text style={styles.inicio62}>Firma de Director(a) / Subdirector(a) / Coordinador(a) Regional</Text>
                <Text style={styles.inicio62}>Administración Aduanera de Honduras</Text>
              </View>

            </View>
          </View>
        </View>
        <View style={{ marginBottom: 5 }} />
        {/* <Text style={styles.pageDate} render={({ }) => (
          `${ new Date().toLocaleString(  "es-US", { dateStyle: "short" } )}`
        )} fixed /> */}
        <Text style={styles.pageDate}>
        <Text> {Datos["coin_Id"]}  </Text>
        </Text>
        {/* <Text style={styles.pageUser} render={({ }) => (
          `Usuario :`
        )} fixed /> */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
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
          image="https://i.ibb.co/FBTmyr7/CONTRATO-DE-ADHESI-N-COMERCIANTE-INDIVIDUAL.png"
          alt="Encabezado de la carta"
        />
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
export default Comerciante_IndividualReporte;