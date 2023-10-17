import { FileTextFilled } from '@ant-design/icons';
import { MoreVert } from '@material-ui/icons';
import { Document, Image, PDFDownloadLink, PDFViewer, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { Table } from "antd";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import History from 'src/@history/@history';
import 'src/styles/custom-pagination.css';
import LoadingIcon from "src/styles/iconoCargaTabla";
import { ToastInfo, ToastWarningPersonalizado } from 'src/styles/toastsFunctions';
import OrdenPedidoService from './OdenPedidoService';

const iconStyle = {
  marginRight: "5px",
  verticalAlign: "middle",
  color: "#634a9e",
};

const tableRowStyle = {
  "&:hover": {
    backgroundColor: "coral",
  },
};

const tableCellStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableHeaderStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#f2f2f2",
};

function OrdenPedido_Index() {
  const OrdenPedidoServices = OrdenPedidoService();
  const [ExportData, setExportData] = useState([]);
  const [DataTabla, setDataTabla] = useState([])
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [filas, setFilas] = React.useState(10);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const Navigate = useNavigate();
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();
  const [mostrarReporte, setmostrarReporte] = useState(false);
  const [DatosReportes, setDatosReportes] = useState([])

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (codigo) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [codigo]: null,
    }));
  };

  //Constante para el editar de los registros y que de un solo me lleve los datos que necesito
  const handleEdit = (datos) => {
    History.push("OrdenPedido/Editar", datos);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    MostrarCollapseDetalles();
    handleClose(datos.peor_Id);
  };


  //constante para Validar si el Pedido Produccion esta Fnalizado
  const ValidarPedidoFinalizadoEditar = (Datos) => {
    handleClose(Datos.peor_Id)

    if (Datos.peor_finalizacion === true) {
      ToastWarningPersonalizado('Advertencia. Este pedido ha sido finalizado. Lamentablemente, no es posible realizar modificaciones en el mismo.')
    } else {
      History.push('/OrdenPedido/editar', Datos)
    }

  }


  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);

  }

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };



  //Constante para cargar datos a las tablas      
  useEffect(() => {
    ListadoPedidosOrden()
  }, []);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Constante del listado de la tabla
  const ListadoPedidosOrden = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);

      const data = await OrdenPedidoServices.ListadoPedidosOrden();
      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      setExportData(await OrdenPedidoServices.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };



  const expandableConfig = {
    columnTitle: "Desplegar detalle",
    expandedRowKeys: [expandedRowKey],
    expandedRowRender: (record) => (
      <Table
        columns={columnsExpandable}
        dataSource={record.detalles}
        pagination={false}
      />
    ),
    rowExpandable: (record) => record.name !== "Not Expandable",
    onExpand: async (expanded, record) => {
      if (expanded) {
        await ListadoPedidosOrden(record.detalles);
        setExpandedRowKey(record.key);
      } else {
        setExpandedRowKey(null);
      }
    },
  };

  const DatosReportesListado = async (ID) => {
    try {
      const DatosEncabezado = await OrdenPedidoServices.ListadoPedidosOrdenReporte(ID)
      setDatosReportes(DatosEncabezado)


    } catch (error) {

    }
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseReporte = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarReporte(!mostrarReporte);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseReporte = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarReporte(!mostrarReporte);
  };

  const handleReporte = async (params) => {
    if (!params || params.detalles === null) {
      ToastInfo("La órden de pedido no ha solicitado ningún material");
      return; // Sale de la función si no hay detalles válidos
    }

    DatosReportesListado(params.peor_Id);
    setTimeout(() => {
      MostrarCollapseReporte();
    }, 1000);

    handleClose(params.peor_Id);
  };


  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.role_Id - b.role_Id, //sorting para Numeros
    },
    {
      title: "Código del pedido",
      dataIndex: "peor_Codigo",
      key: "peor_Codigo",
      sorter: (a, b) => a.peor_Codigo - b.peor_Codigo, //sorting para Numeros
    },
    {
      title: "Nombre de compañía",
      dataIndex: "prov_NombreCompania",
      key: "prov_NombreCompania",
      sorter: (a, b) => a.prov_NombreCompania.localeCompare(b.prov_NombreCompania), //sorting para Letras
    },
    {
      title: "Nombre del contacto",
      dataIndex: "prov_NombreContacto",
      key: "prov_NombreContacto",
      sorter: (a, b) => a.prov_NombreContacto.localeCompare(b.prov_NombreContacto), //sorting para Letras
    },
    {
      title: "Ciudad",
      dataIndex: "ciud_Nombre",
      key: "ciud_Nombre",
      sorter: (a, b) => a.ciud_Nombre.localeCompare(b.ciud_Nombre), //sorting para Letras
    },
    {
      title: "Fecha de entrada",
      dataIndex: "peor_FechaEntrada",
      key: "peor_FechaEntrada",
      render: (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        return formattedDate;
      },
      sorter: (a, b) => {
        const formattedDateA = new Date(a.peor_FechaEntrada).toISOString().split("T")[0];
        const formattedDateB = new Date(b.peor_FechaEntrada).toISOString().split("T")[0];
        return formattedDateA.localeCompare(formattedDateB);
      },
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.peor_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.peor_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.peor_Id)}
              variant="contained"
              style={{
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              peor_Id={`menu-${params.peor_Id}`}
              anchorEl={anchorEl[params.peor_Id]}
              keepMounted
              open={Boolean(anchorEl[params.peor_Id])}
              onClose={() => handleClose(params.peor_Id)}
            >
              <MenuItem onClick={() => { ValidarPedidoFinalizadoEditar(params) }} >
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleReporte(params)}>
                <Icon> print_connect</Icon>ㅤReporte
              </MenuItem>

            </Menu>
          </Stack>
        </div>
      ),
    },
  ];


  const csvHeader = [
    {
      label: 'No.',
    },
    {
      label: 'Código del pedido',
    },
    {
      label: 'Nombre de la compañia'
    },
    {
      label: 'Nombre del contacto'
    },
    {
      label: 'Ciudad'
    },
    {
      label: 'Fecha de entrada'
    },
    {
      label: 'Ítems'
    }
  ];

  const csvOptions = {
    filename: 'Orden_De_Pedido',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: csvHeader.map((c) => c.label) /* headerLabels */,
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    try {
      csvExporter.generateCsv(ExportData);
    } catch (error) {

    }
  };


  //Constantes para los campos de la Tabla Maestra
  const columnsExpandable = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.pant_Id - b.pant_Id, //sorting para Numeros
    },

    {
      title: 'Material',
      dataIndex: 'mate_Descripcion',
      key: 'mate_Descripcion',
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), //sorting para Letras
    },
    {
      title: 'Cantidad',
      dataIndex: 'prod_Cantidad',
      key: 'prod_Cantidad',
      sorter: (a, b) => a.prod_Cantidad.localeCompare(b.prod_Cantidad), //sorting para Letras
    },
    {
      title: 'Precio',
      dataIndex: 'prod_Precio',
      key: 'prod_Precio',
      sorter: (a, b) => a.prod_Precio.localeCompare(b.prod_Precio), //sorting para Letras
    },

  ];

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["peor_Id", "peor_Codigo", "prov_NombreCompania", "prov_NombreContacto", "prov_Ciudad", "peor_FechaEntrada", "peor_Obsevaciones", "DadoCliente"];

  //Constantes que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
    if (searchText === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === "number"
            ? searchText.toString()
            : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  }).reverse()

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  function formatearOracion(cadena) {
    // Convertir todas las letras a minúsculas
    cadena = cadena.toLowerCase();

    // Dividir la cadena en palabras
    const palabras = cadena.split(' ');

    // Capitalizar la primera letra de cada palabra
    const palabrasCapitalizadas = palabras.map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });

    // Unir las palabras capitalizadas en una cadena
    return palabrasCapitalizadas.join(' ');
  }



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
      fontWeight: 'bold',
      textAlign: 'left',
      padding: 5,
      backgroundColor: '#dedede',
      fontFamily: 'Times-Roman'
    },
    tableHeader: {
      flexDirection: 'row',
      textAlign: 'center',
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
      flex: 1,
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
      fontSize: 13,
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
      fontSize: 14,
      fontFamily: 'Times-Roman'
    },
    columnsContainer3: {
      top: 0,
      right: 0,
      justifyContent: 'space-between',
    },
  });

  const InfoHeader = ({ label, data }) => (
    <Text style={styles.header}>
      {label}: {data || `${label} no disponible`}
    </Text>
  );

  const MyDoc = () => (
    <Document title="Reporte.pdf" creator="SIMEXPRO" author="SIMEXPRO">
      <Page size="A4" style={styles.page}>
        <View style={styles.headerParteIzq}>
          {/* Header Image */}
          <Image src={'https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png'} style={{ height: 40, width: 210 }} />
        </View>
        <View style={styles.image}>
          <Image src={'https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png'} style={{ height: 38, width: 100 }}></Image>
        </View>
        <View style={styles.columnsContainer3}>
          <Text style={styles.detallesTitle}>Reporte de la Orden de Pedido</Text>
          <Text style={styles.headerTextoDerecho}>Fecha: {DatosReportes.length > 0 ? DatosReportes[0].peor_FechaEntrada : "No disponible"} </Text>
          <Text style={styles.headerTextoDerecho}>Código de Orden: {DatosReportes.length > 0 ? DatosReportes[0].peor_Codigo : "No disponible"}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={{ marginBottom: 50 }} />

        <View style={styles.tableContainerTransparente}>
          <View style={styles.tableHeader}>
            <View style={[styles.encabezadoHeader, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 35 }]}>
              <Text style={styles.cellTextHeader}>DATOS DEL PROVEEDOR</Text>
            </View>
            <View style={[styles.encabezadoHeader, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 35 }]}>
              <Text style={styles.cellTextHeader}>DATOS DE LA ÓRDEN</Text>
            </View>
          </View>

          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
          {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Compañía: <Text style={styles.cellTextUnderline}> {DatosReportes.length > 0 ? formatearOracion(DatosReportes[0].prov_NombreCompania) : "No disponible"}</Text></Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• No. de Duca: <Text style={styles.cellTextUnderline}>{DatosReportes.length > 0 ? DatosReportes[0].duca_No_Duca : "No disponible"}</Text></Text>
            </View>
          </View>


          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Contacto: <Text style={styles.cellTextUnderline}> {DatosReportes.length > 0 ? formatearOracion(DatosReportes[0].prov_NombreContacto) : "No disponible"}</Text></Text>

            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• País de Origen: <Text style={styles.cellTextUnderline}>{DatosReportes.length > 0 ? formatearOracion(DatosReportes[0].pais_Nombre) : "No disponible"}</Text></Text>
            </View>
          </View>


          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Teléfono: <Text style={styles.cellTextUnderline}>{DatosReportes.length > 0 ? DatosReportes[0].prov_Telefono : "No disponible"}</Text></Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Observaciones: <Text style={styles.cellTextUnderline}>{DatosReportes.length > 0 ? DatosReportes[0].peor_Obsevaciones : "No disponible"}</Text></Text>
            </View>
          </View>


          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Ciudad: <Text style={styles.cellTextUnderline}>{DatosReportes.length > 0 ? DatosReportes[0].ciud_Nombre : "No disponible"}</Text></Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Encargado: <Text style={styles.cellTextUnderline}>{DatosReportes.length > 0 ? DatosReportes[0].empl_Creador : "No disponible"}</Text></Text>
            </View>
          </View>
          <View style={{ marginBottom: 50 }} />


          <View style={styles.tableHeader}>
            <View style={[styles.encabezadoHeader, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8d8ff', height: 25 }]}>
              <Text style={styles.cellTextHeader}>DETALLES DE LA ÓRDEN</Text>
            </View>
          </View>

          <View style={{ marginBottom: 10 }} />

          {DatosReportes.map((datos, index) => (

            <React.Fragment key={index}>

              <View style={styles.tableContainer}>
                {/* Encabezados de la tabla */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCellMateriales}>
                    <Text style={styles.headerCellText}>Material</Text>
                  </View>
                  <View style={styles.tableCellMateriales}>
                    <Text style={styles.headerCellText}>Cantidad</Text>
                  </View>
                  <View style={styles.tableCellMateriales}>
                    <Text style={styles.headerCellText}>Precio</Text>
                  </View>
                  <View style={styles.tableCellMateriales}>
                    <Text style={styles.headerCellText}>Valor</Text>
                  </View>
                </View>

                {/* Datos de los materiales */}
                {datos.detalles.map((material, materialIndex) => (
                  <View key={materialIndex} style={styles.tableRow}>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellText}>{material.mate_Descripcion}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      <Text style={styles.cellText}>{material.prod_Cantidad}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      {/* Agrega ".00" a los precios */}
                      <Text style={styles.cellText}>{parseFloat(material.prod_Precio).toFixed(2)}</Text>
                    </View>
                    <View style={styles.tableCellMateriales}>
                      {/* Agrega ".00" al valor si no tiene decimales */}
                      <Text style={styles.cellText}>{(parseFloat(material.total).toFixed(2) % 1 === 0) ? `${parseFloat(material.total).toFixed(0)}.00` : parseFloat(material.total).toFixed(2)}</Text>
                    </View>
                  </View>
                ))}

                <View style={styles.tableRow}>
                  <View style={[styles.tableCellMateriales, { flex: 3 }]}>
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>Subtotal:</Text>
                  </View>
                  <View style={[styles.tableCellMateriales, { flex: 1 }]}>
                    {/* Calcula el subtotal: suma de los totales de los materiales */}
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>
                      {datos.detalles.reduce((total, material) => total + (parseFloat(material.total) || 0), 0).toFixed(2)}
                    </Text>
                  </View>
                </View>
                {/* Casilla de Impuestos */}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCellMateriales, { flex: 3 }]}>
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>Impuestos (15%):</Text>
                  </View>
                  <View style={[styles.tableCellMateriales, { flex: 1 }]}>
                    {/* Calcula el impuesto: subtotal * 0.15 (15%) */}
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>
                      {(datos.detalles.reduce((total, material) => total + (parseFloat(material.total) || 0), 0) * (DatosReportes[0].peor_Impuestos / 100)).toFixed(2)}
                    </Text>
                  </View>
                </View>
                {/* Casilla de Total */}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCellMateriales, { flex: 3 }]}>
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>Total:</Text>
                  </View>
                  <View style={[styles.tableCellMateriales, { flex: 1 }]}>
                    {/* Calcula el total: subtotal + impuestos */}
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>
                      {((datos.detalles.reduce((total, material) => total + (parseFloat(material.total) || 0), 0) * (DatosReportes[0].peor_Impuestos / 100)) + datos.detalles.reduce((total, material) => total + (parseFloat(material.total) || 0), 0)).toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* Fila de impuestos (15%) */}
              </View>
              <View style={{ marginBottom: 5 }} />
            </React.Fragment>
          ))}

        </View>




        <Text style={styles.pageDate} render={({ }) => (
          `Fecha de Impresión: ${DatosReportes.length > 0 ? DatosReportes[0].peor_FechaCreacion : "Fecha no disponible"}`
        )} fixed />
        <Text style={styles.pageUser} render={({ }) => (
          `Usuario: ${DatosReportes.length > 0 ? DatosReportes[0].usuarioCreacionNombre : "Usuario Actual no disponible"}`
        )} fixed />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Página: ${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );




  const handleCloseExportar = () => {
    setAnchorEl(prevState => ({
      ...prevState,
      ['menu-exportar']: null,
    }));
  };

  const handleClickExportar = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };


  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/Mn7c4XY/ORDEN-DE-PEDIDO.png"
        alt="Encabezado de la carta"
      />
      {/*Collapse del index*/}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo Inicio*/}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
        
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={(e) => {
                Navigate("/OrdenPedido/Crear");
              }}>
              Nuevo
            </Button>

            {/* Menu opener for CSV */}
            <Button
              startIcon={<Icon>upload</Icon>}
              onClick={(e) => handleClickExportar(e, 'menu-exportar')}
              sx={{
                backgroundColor: "#dcc25a",
                color: "white",
                "&:hover": { backgroundColor: "#dcc25a" },
              }}
              style={{ borderRadius: "10px" }}
            >
              <Typography>Exportar</Typography>
              <MoreVert />
            </Button>

            {/* Menu de Exportacion */}
            <div key={'menu-exportar'}>
              {/* Menu de Exportacion */}
              <Menu
                id={'menu-exportar'}
                anchorEl={anchorEl['menu-exportar']}
                open={Boolean(anchorEl['menu-exportar'])}
                onClose={() => handleCloseExportar()}
                keepMounted
              >
                {/* Exportar a CSV */}
                <MenuItem
                  onClick={() => {
                    handleExportData();
                    handleCloseExportar();
                  }}
                  style={{ fontSize: "15px", marginTop: "5px", marginBottom: "5px" }}
                >
                  <FileTextFilled style={{ fontSize: "20px" }} />&nbsp;&nbsp;Archivo CSV
                </MenuItem>

                {/* Exportar a PDF */}
                <PDFGenerator data={DataTabla} handleCloseExportar={handleCloseExportar} />

                {/* Exportar a Excel */}
                <ExportToExcel data={ExportData} handleCloseExportar={handleCloseExportar} />
              </Menu>
            </div>
          </Stack>
          </Grid>

              {/* Filtros de la tabla (Filas/Buscar) */}
            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'end', md:'end'}}} >
                <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                // label="Filas"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            {/* Select para las filas de la tabla fin*/}

            </Grid>
                <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'start', md:'center'}}} >
             
            <TextField
              style={{ borderRadius: "10px" }}
              placeholder="Buscar"
              value={searchText}
              onChange={handleSearchChange}
              size="small"
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
            {/* Barra de Busqueda en la Tabla fin */}
            </Grid>
          </Grid>


        </CardContent>
      </Collapse>

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            scroll={{ x: true }}
            columns={columns}
            expandable={expandableConfig}
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas
              , className: 'custom-pagination'
            }}

          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-star",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles de la Orden de Pedido" />
              </Divider>
            </Grid>


            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }} >
                  <InputLabel htmlFor="peor_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id de la Orden:
                    </Typography>
                    <Typography>{DatosDetalles['peor_Id']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="peor_No_Duca">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Número de DUCA:
                    </Typography>
                    <Typography>{DatosDetalles['duca_Id']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_NombreCompania">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre de la Compañía:
                    </Typography>
                    <Typography>{DatosDetalles['prov_NombreCompania']}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }} >
                  <InputLabel htmlFor="prov_NombreContacto">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre del Contacto:
                    </Typography>
                    <Typography>{DatosDetalles['prov_NombreContacto']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="ciud_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Ciudad:
                    </Typography>
                    <Typography>{DatosDetalles['ciud_Nombre']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="peor_FechaEntrada">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Fecha de Entrada:
                    </Typography>
                    <Typography>{DatosDetalles['peor_FechaEntrada']}</Typography>
                  </InputLabel>
                </Box>

              </Box>
            </Grid>


            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }} >
                  <InputLabel htmlFor="peor_Obsevaciones">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Observaciones:
                    </Typography>
                    <Typography>{DatosDetalles['peor_Obsevaciones']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="peor_DireccionExacta">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Dirección Exacta:
                    </Typography>
                    <Typography>{DatosDetalles['peor_DireccionExacta']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="dadoCliente">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ¿Los materiales fueron dados por el cliente?:
                    </Typography>
                    <Typography>{DatosDetalles['dadoCliente']}</Typography>
                  </InputLabel>
                </Box>

              </Box>
            </Grid>

            <Grid container justifyContent="center" style={{ marginBottom: '25px', marginLeft: '30px', marginBottom: '40px' }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="pantallas">
                      <Divider style={{ marginTop: '0px', marginBottom: '10px', borderColor: '#aa8caf' }}>
                        <Chip color='default' variant='outlined' label="Materiales de la Órden" />
                      </Divider>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'left' }}>
                        {DatosDetalles['detalles'] ? (
                          DatosDetalles['detalles'].map((pedido, index) => (
                            <Card style={{ margin: '10px' }}>
                              <CardContent>
                                <div key={index} style={{ margin: '0 30px' }}>
                                  ✔ ID Pedido: {pedido.prod_Id}  <br></br>
                                  ✔ Material: {pedido.mate_Descripcion} <br></br>
                                  ✔ Cantidad: {pedido.prod_Cantidad} <br></br>
                                  ✔ Precio: {pedido.prod_Precio} <br></br>
                                  ✔ Peso: {pedido.prod_Peso}KG.
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Grid
                            item
                            xs={12}
                            style={{
                              marginBottom: '30px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="subtitle1" align="center">
                              No se han pedido materiales hasta el momento.
                            </Typography>
                          </Grid>
                        )}
                      </div>
                    </InputLabel>
                  </Box>
                </Box>
              </Grid>
            </Grid>


            <Grid item xs={12}>
              <table
                id="detallesTabla"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>
                      <Icon style={iconStyle}>edit</Icon>Accion
                    </th>
                    <th style={tableHeaderStyle}>
                      <Icon style={iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={tableHeaderStyle}>
                      <Icon style={iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['peor_FechaCreacion']
                        ? new Date(DatosDetalles['peor_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosDetalles['usuarioModificacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['peor_FechaModificacion']
                        ? new Date(DatosDetalles['peor_FechaModificacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <div className="card-footer">
                <Button variant="contained"
                  style={{ position: 'fixed', top: '76%', right: '5%' }}
                  onClick={CerrarCollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}>
                  Regresar</Button>
                <br />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>


      {/* Collapse para mostrar el Reporte Inicio*/}
      <Collapse in={mostrarReporte}>
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
                  label={"Reporte de la Orden de compra"}
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
                <Button
                  variant="contained"
                  style={{ position: 'fixed', top: '83%', right: '5%' }}
                  onClick={CerrarCollapseReporte}
                  startIcon={<Icon>arrow_back</Icon>}
                >Regresar</Button>
                <br></br>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar el Reporte Fin*/}



    </Card>
  );
}

export default OrdenPedido_Index;
