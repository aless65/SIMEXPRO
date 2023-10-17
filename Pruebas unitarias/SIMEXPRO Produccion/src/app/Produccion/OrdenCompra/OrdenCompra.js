import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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
import { Table, Tag, QRCode } from "antd";
import { format } from 'date-fns';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import History from "src/@history/@history";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import OrdenCompraReportService from "./OrdenCompraReport";

import {
  ToastError,
  ToastSuccess,
  ToastWarningPersonalizado,
  ToastInfo
} from "src/styles/toastsFunctions";

import { FileTextFilled } from '@ant-design/icons';
import { CheckCircleOutlined, MoreVert } from '@material-ui/icons';
import { Document, Font, Image, PDFDownloadLink, PDFViewer, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    textAlign: "center",
    color: "black",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});





function OrdenCompraIndex() {
  const [ExportData, setExportData] = useState([]);
  const [PDFData, setPDFData] = useState([]);
  const [QRModal, setQRModal] = useState(false);
  const [POCode, setPOCode] = useState('');
  //Constante navigate para las redirecciones a otras pantallas
  const navigate = useNavigate();
  const ordenCompraGodService = OrdenCompraReportService();

  //Variables a usar en la tabla maestra
  const [DataTabla, setDataTabla] = useState([])
  const [DatosDetalles, setDatosDetalles] = useState([]);
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  //Variables a usar para reporte
  const [DatosCompraEncabezado, setDatosCompraEncabezado] = useState([])
  const [DatosCompraDetalles, setDatosCompraDetalles] = useState([])
  const [DatosDocumentosDetalles, setDatosDocumentosDetalles] = useState([])
  const [DatosProcesosDetalles, setDatosProcesosDetalles] = useState([])
  const [DatosMateBrinDetalles, setDatosMateBrinDetalles] = useState([])
  const camposToFilter = ["key", "orco_Codigo", "clie_Nombre_O_Razon_Social", "orco_FechaEmision", "orco_FechaLimite", "orco_EstadoOrdenCompra"];


  //Variable que almacena el ID a eliminar
  const [EliminacionID, setEliminacionID] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //variable para el dialog(modal) de eliminar
  const [Finalizacion, setFinalizacion] = useState(false);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  const [mostrarReporte, setmostrarReporte] = useState(false);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);


  const csvHeader = [
    {
      label: 'No.',
    },
    {
      label: 'Código de la P.O.',
    },
    {
      label: 'Cliente'
    },
    {
      label: 'Fecha emitido'
    },
    {
      label: 'Fecha límite'
    },
    {
      label: 'Items'
    },


  ];

  const csvOptions = {
    filename: 'Ordenes_Compra',
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


  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (params) => {
    handleClose(params.orco_Id);
    if (params.orco_EstadoFinalizado == "True") {
      ToastWarningPersonalizado('Advertencia. La Orden ha sido finalizado. Lamentablemente, no es posible eliminarla.')
    } else if (params.orco_EstadoOrdenCompra.toString() != "P") {
      ToastWarningPersonalizado('Advertencia. La Orden ya esta siendo utilizada no es posible eliminarla.')
    } else {
      History.push("/OrdenCompra/Editar", params);

    }
  };

  const handleEliminar = (params) => {
    handleClose(params.orco_Id);

    if (params.orco_EstadoFinalizado == "True") {
      ToastWarningPersonalizado('Advertencia. La Orden ha sido finalizado. Lamentablemente, no es posible eliminarla.')
    } else if (params.orco_EstadoOrdenCompra.toString() != "P") {
      ToastWarningPersonalizado('Advertencia. La Orden ya esta siendo utilizada no es posible eliminarla.')
    } else {
      DialogEliminar();
      setEliminacionID(params.orco_Id)

    }
  };

  const EliminacionPermanente = async () => {


    try {
      const response = await ordenCompraGodService.EliminarOrdenCompra(EliminacionID);

      if (response.data.data.messageStatus == "1") {

        ToastSuccess("El registro se ha Editado exitosamente");
        DialogEliminar();
        ListadoOrdenesCompraEncabezado()
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };






  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id) => {
    MostrarCollapseDetalles();

    CargarDatosReporte(id)


    handleClose(id);
  };






  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  //Constante para la accción de añadir un nuevo material
  const handleAddMaterial = (id) => {
    handleClose(id);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {

    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,

    }));
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setTimeout(() => {
      setmostrarIndex(!mostrarIndex);
      setmostrarDetalles(!mostrarDetalles);

    }, "1000")


  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante abrir el collapse de los Reporte de la pantalla
  const handleReporte = async (id) => {
    handleClose(id);

    const Detalles = []
    Detalles.push(ordenCompraGodService.ListarDetallesTabla(id))

    if ((await Promise.all(Detalles))[0].length != 0) {
      CargarDatosReporte(id)
      setTimeout(() => {
        MostrarCollapseReporte();
      }, "1000")
    }
    else
      ToastInfo("La órden de compra no contiene ningun item");
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseReporte = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarReporte(!mostrarReporte);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseReporte = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarReporte(!mostrarReporte);
  };

  //Constante para cargar datos a las tablas      
  useEffect(() => {
    ListadoOrdenesCompraEncabezado()
  }, []);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Constante del listado de la tabla
  const ListadoOrdenesCompraEncabezado = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);

      const data = await ordenCompraGodService.listarEncabezado();

      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      setExportData(await ordenCompraGodService.ExportData());
      setPDFData(await ordenCompraGodService.PDFData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  const ReporteListadoEncabezado = async (ID) => {
    try {
      const DatosEncabezado = await ordenCompraGodService.listarEncabezadoFiltrado(ID)
      setDatosCompraEncabezado(DatosEncabezado)


    } catch (error) {

    }
  };

  const ReporteListadoDetalles = async (ID) => {
    try {

      const { dataDetalle, materialData, DocumentosData, ProcesosData } = await ordenCompraGodService.listarDetallesReporte(ID);
      setDatosCompraDetalles(dataDetalle);
      setDatosMateBrinDetalles(materialData);
      setDatosDocumentosDetalles(DocumentosData);
      setDatosProcesosDetalles(ProcesosData);
    } catch (error) {

    }
  };

  const datosCombinados = [];

  for (let i = 0; i < DatosCompraDetalles.length; i++) {
    const detalle = DatosCompraDetalles[i];
    const materiales = DatosMateBrinDetalles[i] || [];
    const documentos = DatosDocumentosDetalles[i] || [];
    const procesos = DatosProcesosDetalles[i] || [];

    datosCombinados.push({
      detalle,
      materiales,
      documentos,
      procesos,
    });
  }

  const CargarDatosReporte = async (ID) => {
    try {
      ReporteListadoEncabezado(ID)
      ReporteListadoDetalles(ID)
    } catch (error) {

    }
  };

  const ListadoOrdenesCompraDetalles = async (orco_Id) => {

    try {
      setDatosDetalles(await ordenCompraGodService.ListarDetallesTabla(orco_Id))

    } catch (error) {

    }
  };

  //Se utiliza para hacer el llamado de los detalles de la tabla maestra
  //valida si hay registros abiertos
  const expandableConfig = {
    columnTitle: "Desplegar detalle",
    expandedRowKeys: [expandedRowKey],
    expandedRowRender: (record) => (
      <Table
        columns={columnsExpandable}
        dataSource={DatosDetalles}
        locale={{
          triggerDesc: "Ordenar descendente",
          triggerAsc: "Ordenar ascendente",
          cancelSort: "Cancelar",

        }}
        size="small"
        pagination={{
          pageSize: filas,
          showSizeChanger: false,
          className: 'custom-pagination'
        }}
      />
    ),
    rowExpandable: (record) => record.name !== "Not Expandable",
    onExpand: async (expanded, record) => {
      if (expanded) {
        await ListadoOrdenesCompraDetalles(record.orco_Id);
        setExpandedRowKey(record.key);
      } else {
        setExpandedRowKey(null);
      }
    },
  };



  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  const DialogEliminar = () => {

    setEliminar(!Eliminar);
  };

  const DialogQR = (code) => {
    setQRModal(!QRModal);
    setPOCode(code);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Código',
      dataIndex: 'orco_Codigo',
      key: 'orco_Codigo',
      sorter: (a, b) => {
        const codigoA = a.orco_Codigo || '';
        const codigoB = b.orco_Codigo || '';
        return codigoA.localeCompare(codigoB);
      },
    },

    {
      title: 'Cliente',
      dataIndex: 'clie_Nombre_O_Razon_Social',
      key: 'clie_Nombre_O_Razon_Social',
      sorter: (a, b) => a.clie_Nombre_O_Razon_Social.localeCompare(b.clie_Nombre_O_Razon_Social),
    },
    {
      title: "Fecha Comienzo",
      dataIndex: "orco_FechaEmision",
      key: "orco_FechaEmision",
      sorter: (a, b) => a.orco_FechaEmision.localeCompare(b.orco_FechaEmision),
      render: (text) => {
        const fechaFormateada = format(new Date(text), 'dd/MM/yyyy HH:mm a');
        return fechaFormateada;
      }
    },
    {
      title: "Fecha Límite",
      dataIndex: "orco_FechaLimite",
      key: "orco_FechaLimite",
      sorter: (a, b) => a.orco_FechaLimite.localeCompare(b.orco_FechaLimite),
      render: (text) => {
        const fechaFormateada = format(new Date(text), 'dd/MM/yyyy HH:mm a');
        return fechaFormateada;
      }
    },
    {
      title: "Estado de la Orden",
      dataIndex: "orco_EstadoOrdenCompra",
      key: "orco_EstadoOrdenCompra",
      render: (text, record) => { return (record.orco_EstadoOrdenCompra.toString() == "P" ? <Tag color="red" > <b>Pendiente</b> </Tag> : record.orco_EstadoOrdenCompra.toString() == "C" ? <Tag color="orange"><b>En Curso</b></Tag> : <Tag color="green"><b>Terminado</b></Tag>) },
      sorter: (a, b) => a.orco_EstadoOrdenCompra.localeCompare(b.orco_EstadoOrdenCompra),
    },

    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.orco_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.orco_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.orco_Id)}
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
              orco_Id={`menu-${params.orco_Id}`}
              anchorEl={anchorEl[params.orco_Id]}
              keepMounted
              open={Boolean(anchorEl[params.orco_Id])}
              onClose={() => handleClose(params.orco_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.orco_Id)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleEliminar(params)}>
                <Icon>delete</Icon> ㅤEliminar
              </MenuItem>
              <MenuItem onClick={() => handleReporte(params.orco_Id)}>
                <Icon> print_connect</Icon>ㅤReporte
              </MenuItem>
              <MenuItem onClick={() => DialogQR(params.orco_Codigo)}>
                <Icon>qr_code</Icon>ㅤGenerar QR
              </MenuItem>

            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constantes para los campos de la Tabla Maestra


  const columnsExpandable = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.code_Id - b.code_Id, //sorting para Numeros
    },
    {
      title: 'Codigo Item',
      dataIndex: 'code_Id',
      key: 'code_Id',
      sorter: (a, b) => {
        if (typeof a.code_Id === 'string' && typeof b.code_Id === 'string') {
          return a.code_Id.localeCompare(b.code_Id);
        } else {

          return a.code_Id - b.code_Id;
        }
      },
    },

    {
      title: 'Cantidad Prendas',
      dataIndex: 'code_CantidadPrenda',
      key: 'code_CantidadPrenda',
      sorter: (a, b) => {
        if (typeof a.code_CantidadPrenda === 'string' && typeof b.code_CantidadPrenda === 'string') {
          return a.code_CantidadPrenda.localeCompare(b.code_CantidadPrenda);
        } else {

          return a.code_CantidadPrenda - b.code_CantidadPrenda;
        }
      },
    },

    {
      title: 'Estilo',
      dataIndex: 'esti_Descripcion',
      key: 'esti_Descripcion',
      sorter: (a, b) => a.esti_Descripcion.localeCompare(b.esti_Descripcion), //sorting para Letras
    },
    {
      title: 'Talla',
      dataIndex: 'tall_Nombre',
      key: 'tall_Nombre',
      sorter: (a, b) => a.tall_Nombre.localeCompare(b.tall_Nombre), //sorting para Letras
    },
    {
      title: 'Proceso Actual',
      dataIndex: 'proc_DescripcionActual',
      key: 'proc_DescripcionActual',
      sorter: (a, b) => a.proc_DescripcionActual.localeCompare(b.proc_DescripcionActual), //sorting para Letras
    },
    {
      title: 'Color',
      dataIndex: 'colr_Nombre',
      key: 'colr_Nombre',
      sorter: (a, b) => a.colr_Nombre.localeCompare(b.colr_Nombre), //sorting para Letras
    }


  ];


  //Constantes que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
    if (searchText === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          value !== null && typeof value === "number"
            ? value.toString()
            : value !== null
              ? value.toString().toLowerCase()
              : "";
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


  //Constante para alinear los iconos de la tabla de detalles con los headers de la tabla y cambiar el color a los iconos
  const iconStyle = {
    marginRight: "5px",
    verticalAlign: "middle",
    color: "#634a9e",
  };

  //Constante para los estilos de los headers de la tabla de detalles
  const tableHeaderStyle = {
    verticalAlign: "middle",
    padding: "15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
  };

  //Constante para los estilos de los filas de la tabla de detalles
  const tableRowStyle = {
    "&:hover": {
      backgroundColor: "coral",
    },
  };

  //Constante para los estilos de los celdas de la tabla de detalles
  const tableCellStyle = {
    verticalAlign: "middle",
    padding: "15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };






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
      margin: '5px',
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
      textAlign: 'left',
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
      borderWidth: 1,
      fontFamily: 'Times-Roman',
      borderColor: 'white',
      textAlign: 'left',
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
        <View style={styles.headerParteIzq} fixed>
          {/* Header Image */}
          <Image src={'https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png'} style={{ height: 40, width: 210 }} />
        </View>
        <View style={styles.image} fixed>
          <Image src={'https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png'} style={{ height: 38, width: 100 }}></Image>
        </View>
       
        <View style={styles.columnsContainer3}>
          <Text style={styles.detallesTitle}>Reporte de la Órden de Compra</Text>
          <Text style={styles.headerTextoDerecho}>Fecha: {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_FechaEmision : "Fecha emisión no disponible"} </Text>
          <Text style={styles.headerTextoDerecho}>No. de Órden: #{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_Id : "No. de Orden no disponible"}</Text>
        </View>
        <View style={styles.line} fixed />

        <View style={{ marginBottom: 25 }} fixed />

        <View style={styles.tableContainerTransparente}>

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


              <Text style={{ ...styles.tableTitle, fontWeight: 'bold' }}>Datos del Cliente                               Datos de la Órden</Text>


            </View>

          </View>

          {/* Aquí es donde comenzamos a llenar la tabla con los datos */}
          {/* Ejemplo para "Nombre o Razón social" y "Dirección de entrega" */}
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Nombre o Razón Social: <Text style={styles.cellTextUnderline}> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].clie_Nombre_O_Razon_Social : "Nombre o razon social no disponible"}</Text></Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Dirección de Entrega: <Text style={styles.cellTextUnderline}> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_DireccionEntrega : "Direccion entrega no disponible"}</Text></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Dirección: <Text style={styles.cellTextUnderline}>{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].clie_Direccion : "Direccion no disponible"}</Text></Text>

            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Fecha Límite: <Text style={styles.cellTextUnderline}>{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_FechaLimite : "Fecha limite no disponible"}</Text></Text>

            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Cliente RTN: <Text style={styles.cellTextUnderline}>{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].clie_RTN : "RTN no disponible"}</Text></Text>
            </View>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Forma de Pago: <Text style={styles.cellTextUnderline}>{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].fopa_Descripcion : "Formas de Pago no disponible"}</Text></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellRegistors}>
              <Text style={styles.cellText}>• Nombre de Contacto: <Text style={styles.cellTextUnderline}>{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].clie_Nombre_Contacto : "Nombre de contacto no disponible"}</Text></Text>
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
                  Detalle del Item #{index + 1}</Text>
              </View>
              {/* Aquí es donde comenzamos a llenar la tabla con los datos */}

              <View style={styles.tableRow}>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Código del Item: {datos.detalle.code_Id || "Código no disponible"}</Text>
                </View>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Estilos: {datos.detalle.esti_Descripcion || "Estilo no disponible"}</Text>
                </View>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Talla: {datos.detalle.tall_Nombre || "Talla no disponible"}</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Sexo: {datos.detalle.code_Sexo || "Sexo no disponible"}</Text>
                </View>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Color: {datos.detalle.colr_Nombre || "Color no disponible"}</Text>
                </View>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Valor Unitario: {datos.detalle.code_Valor + ' HNL.' || "Valor no disponible"} </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Unidad: {datos.detalle.code_Unidad || "Unidad no disponible"}</Text>
                </View>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Proceso de comienzo: {datos.detalle.proc_DescripcionComienza || "Proceso de comienzo no disponible"}</Text>
                </View>
                <View style={styles.tableCellRegistorsItem}>
                  <Text style={styles.cellText}>• Impuesto: {datos.detalle.code_Impuesto + ' %' || "Impuesto no disponible"}</Text>
                </View>
              </View>
            </View>

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
                    Materiales del Item - #{index + 1}
                  </Text>

                  </View>

            <View style={styles.columnsContainer}>
              <View style={styles.tableContainer}>
               

                {/* Encabezados de la tabla */}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: '#dcc26599',
                    border: 'none',
                  }}
                >
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>Descripción</Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>Material cantidad</Text>
                  </View>
                  <View style={styles.tableCellRegistors}>
                    <Text style={styles.cellText}>Unidad de medida</Text>
                  </View>
                </View>
               
                {/* Datos de los materiales */}
                {datos.materiales.map((material, materialIndex) => (
                  <View key={materialIndex} style={styles.tableRow}>
                    <View style={styles.tableCellRegistors}>
                      <Text style={styles.cellText}>{material.mate_Descripcion}</Text>
                    </View>
                    <View style={styles.tableCellRegistors}>
                      <Text style={styles.cellText}>{material.mabr_Cantidad}</Text>
                    </View>
                    <View style={styles.tableCellRegistors}>
                      <Text style={styles.cellText}>{material.unme_Descripcion}</Text>
                    </View>
                  </View>
                ))}
              </View>

           
            </View>
            <View style={{ marginBottom: 5 }} />
          </React.Fragment>
        ))}

<View style={{ marginBottom: 5 }} />
        <Text style={styles.pageDate} render={({ }) => (
          `Fecha de Impresión: ${DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].fechaActual : "Fecha no disponible"}`
        )} fixed />
        <Text style={styles.pageUser} render={({ }) => (
          `Usuario: ${DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].usuarioActual : "Usuario Actual no disponible"}`
        )} fixed />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Página: ${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );







  /*
  const MyDoc = () => (
    <Document title="Reporte.pdf" creator="SIMEXPRO" author="SIMEXPRO">
      <Page size="A4" style={styles.page}>
        <Image src={'https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png'} />
        <View style={styles.image}>
          <Image src={'https://i.ibb.co/s2Zmg1j/logo.png'} style={{ height: 80, width: 80 }} />
        </View>
        <Text style={styles.title}>Reporte de la Orden de Compra</Text>
        <Text style={styles.subtitle}>
          Orden #{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_Id : "El código de la Orden no está disponible"}
        </Text>
        <View style={styles.columnsContainer}>
          {[
            ['Nombre o Razón social', 'clie_Nombre_O_Razon_Social'],
            ['Dirección cliente', 'clie_Direccion'],
            // ... (otros campos)
          ].map(([label, key]) => (
            <InfoHeader 
              key={key} 
              label={label} 
              data={DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0][key] : null} 
            />
          ))}
        </View>
      </Page>
  
      {datosCombinados.map((datos, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.columnsContainer}>
            <Text style={styles.title}>Detalles de la Orden</Text>
            {[
              ['Código Orden de compra', 'orco_Id'],
              ['Código orden de compra detalle', 'code_Id'],
              // ... (otros campos)
            ].map(([label, key]) => (
              <InfoHeader 
                key={key} 
                label={label} 
                data={datos.detalle[key]} 
              />
            ))}
  
        {datos.materiales.map((material, materialIndex) => (
                      <View key={materialIndex}>
                        <Text style={styles.innerHeader}>Material a brindar ID {materialIndex + 1}: {material.mabr_Id}</Text>
                        <Text style={styles.innerHeader}>Material descripcion {materialIndex + 1}: {material.mate_Descripcion}</Text>
                        <Text style={styles.innerHeader}>Material cantidad {materialIndex + 1}: {material.mabr_Cantidad}</Text>
                        <Text style={styles.innerHeader}>Unidad de medida {materialIndex + 1}: {material.unme_Descripcion}</Text>
                      </View>
              ))}
           {datos.documentos.map((documento, documentoIndex) => (
                <View key={documentoIndex}>
                  <Text style={styles.innerHeader}>Documento ID {documentoIndex + 1}: {documento.dopo_Id}</Text>
                </View>
              ))}
          </View>
        </Page>
      ))}
    </Document>
  );*/



  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    //setMessage(event.target.value);
  };

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
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/D5SZnc4/ORDEN-DE-COMPRA.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/*Botón de Nuevo*/}    <Grid container spacing={1}>
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
              onClick={() => {
                navigate("/OrdenCompra/Crear");
              }}
            >
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
                <PDFGenerator data={PDFData} handleCloseExportar={handleCloseExportar} />

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

        {/* Mostrar tabla index inicio*/}

        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            scroll={{ x: true }}
            expandable={expandableConfig}
            dataSource={filteredRows}
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            size="small"
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
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
                <Chip label="Detalles de la Órden de compra" />
              </Divider>
            </Grid>


            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }} >
                  <InputLabel htmlFor="orco_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Orden de compra id:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_Id : "Error"} </Typography>
                  </InputLabel>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="orco_Codigo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Código Único:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_Codigo : "Error"} </Typography>
                  </InputLabel>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="orco_FechaEmision">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Fecha de Emisión:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_FechaEmision : "Error"} </Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="orco_FechaLimite">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Fecha Límite:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_FechaLimite : "Error"} </Typography>
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
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="tiem_Descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Embalaje General:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].tiem_Descripcion : "Error"} </Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="clie_Nombre_O_Razon_Social">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre o razón social:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].clie_Nombre_O_Razon_Social : "Error"} </Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="clie_RTN">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      RTN Cliente:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].clie_RTN : "Error"} </Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="orco_EstadoOrdenCompra">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Estado de la Órden de Compra:
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_EstadoOrdenCompra === 'C' ? 'En Curso' : DatosCompraEncabezado[0].orco_EstadoOrdenCompra === 'T' ? 'Finalizado' : DatosCompraEncabezado[0].orco_EstadoOrdenCompra === 'P' ? 'Pendiente' : "Error" : "Error"} </Typography>
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
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="orco_DireccionEntrega">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Dirección de la Entrega
                    </Typography>
                    <Typography> {DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].orco_DireccionEntrega : "Error"} </Typography>
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
                        <Chip color='default' variant='outlined' label="Detalles de la Órden de Compra" />
                      </Divider>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'left', gridAutoRows: 'auto' }}>
                        {datosCombinados ? (
                          datosCombinados.map((orden, index) => (
                            <Card key={index} style={{ border: '1px solid black' }} >
                              <CardContent >

                                <div key={index} style={{ margin: '0 0px' }}>
                                  <li key={index} style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ✔ ID Pedido: {orden.detalle.code_Id}  <br></br>
                                    ✔ Cantidad Prenda: {orden.detalle.code_CantidadPrenda} <br></br>
                                    ✔ Estilo: {orden.detalle.esti_Descripcion} <br></br>
                                    ✔ Talla: {orden.detalle.tall_Nombre} <br></br>
                                    ✔ Género Prenda: {orden.detalle.code_Sexo == "M" ? "Masculino" : orden.detalle.code_Sexo == "F" ? "Femenino" : "Unisex"} <br></br>
                                    ✔ Color: {orden.detalle.colr_Nombre} <br></br>
                                    ✔ Proceso Actual: {orden.detalle.proc_DescripcionActual} <br></br>
                                    ✔ Valor Unitario: {orden.detalle.code_Unidad} <br></br>
                                    ✔ Impuesto: {orden.detalle.code_Impuesto} <br></br>
                                    ✔ Valor Total: {orden.detalle.code_Valor} <br></br>
                                    ✔ Especificación Enbalaje: {orden.detalle.code_EspecificacionEmbalaje} <br></br> <br></br>

                                    <strong> Auditoria: <br></br></strong>
                                    ✔ Usuario Creación:   {orden.detalle.usuarioCreacionNombre} <br></br>

                                    ✔ Fecha Creación:     {format(new Date(orden.detalle.code_FechaCreacion), 'dd/MM/yyyy HH:mm a')}   <br></br>

                                    ✔ Usuario Modificación:  {orden.detalle.usuarioModificacionNombre} <br></br>

                                    ✔ Fecha Modificación:    {format(new Date(orden.detalle.code_FechaModificacion), 'dd/MM/yyyy HH:mm a')}  <br></br> <br></br>



                                    <strong> Procesos a Pasar: <br></br></strong>
                                    {DatosProcesosDetalles.length > 0 ? (
                                      DatosProcesosDetalles.map((procesosArray, innerIndex) => {
                                        const filteredProcesos = procesosArray.filter(proceso => proceso.code_Id === orden.detalle.code_Id);
                                        if (filteredProcesos.length > 0) {
                                          return (

                                            <div key={innerIndex} style={{ margin: '0 0px' }}>
                                              {filteredProcesos.map((Proceso, innerIndex) => (
                                                <React.Fragment key={innerIndex}>
                                                  ✔ {Proceso.proc_Descripcion} <br></br>
                                                </React.Fragment>
                                              ))}
                                            </div>
                                          );
                                        }
                                      })
                                    ) : (
                                      <div style={{ margin: '0 30px' }}>
                                        <Typography variant="subtitle1" align="center">
                                          Éste detalle no tiene procesos
                                        </Typography>
                                      </div>
                                    )}
                                    <br></br>
                                    <strong> Documentos : <br></br></strong>
                                    {DatosDocumentosDetalles.length > 0 ? (
                                      DatosDocumentosDetalles.map((docuemntosArray, innerIndex) => {
                                        const filteredDocumentos = docuemntosArray.filter(document => document.code_Id === orden.detalle.code_Id);
                                        if (filteredDocumentos.length > 0) {
                                          return (

                                            <div key={innerIndex} style={{ margin: '0 0px' }}>
                                              {filteredDocumentos.map((Documento, innerIndex) => (
                                                <React.Fragment key={innerIndex}>
                                                  ✔ Nombre de archivo: {Documento.dopo_NombreArchivo} <br />
                                                  ✔ Tipo de archivo:  {Documento.dopo_TipoArchivo} <br />
                                                  ✔ Archivo:  {Documento.dopo_Archivo} <br /> <br />
                                                </React.Fragment>
                                              ))}
                                            </div>
                                          );
                                        }
                                      })
                                    ) : (
                                      <div style={{ margin: '0 30px' }}>
                                        <Typography variant="subtitle1" align="center">
                                          Éste detalle no tiene Documentos
                                        </Typography>
                                      </div>
                                    )}

                                    <br></br>
                                    <strong> Materiales Brindados : <br></br></strong>
                                    {DatosMateBrinDetalles.length > 0 ? (
                                      DatosMateBrinDetalles.map((matebrinArray, innerIndex) => {
                                        const filteredMateBrin = matebrinArray.filter(Materi => Materi.code_Id === orden.detalle.code_Id);
                                        if (filteredMateBrin.length > 0) {
                                          return (

                                            <div key={innerIndex} style={{ margin: '0 0px' }}>
                                              {filteredMateBrin.map((Material, innerIndex) => (
                                                <React.Fragment key={innerIndex}>
                                                  ✔ Material:  {Material.mate_Descripcion} <br />
                                                  ✔ Unidad Medida:  {Material.unme_Descripcion} <br />
                                                  ✔ Cantidad: {Material.code_CantidadPrenda} <br /> <br />
                                                </React.Fragment>
                                              ))}
                                            </div>
                                          );
                                        }
                                      })
                                    ) : (
                                      <div style={{ margin: '0 30px' }}>
                                        <Typography variant="subtitle1" align="center">
                                          Éste detalle no tiene Documentos
                                        </Typography>
                                      </div>
                                    )}




                                  </li>

                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Grid
                            item
                            xs={12}

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


            <br></br>
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
                    <td style={tableCellStyle}>{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].usuarioCreacionNombre : "Error"}</td>
                    <td style={tableCellStyle}>{DatosCompraEncabezado.length > 0 ? new Date(DatosCompraEncabezado[0].orco_FechaCreacion).toLocaleString() : ""}</td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosCompraEncabezado.length > 0 ? DatosCompraEncabezado[0].usuarioModificacionNombre : "Error"}</td>
                    <td style={tableCellStyle}>{DatosCompraEncabezado.length > 0 ? new Date(DatosCompraEncabezado[0].orco_FechaModificacion).toLocaleString() : ""}</td>
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

      {/* Collapse para mostrar los detalles de un registro fin*/}



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


      {/* Dialog para eliminar un registro inicio*/}
      <Dialog
        open={Eliminar}
        fullWidth={"md"}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
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
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={EliminacionPermanente}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Dialog para eliminar un registro fin*/}

      {/* BEGIN QR MODAL */}
      <Dialog
        open={QRModal}
        onClose={DialogQR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Por favor escanea el código"}
        </DialogTitle>
        <DialogContent sx={{ justifyContent: 'center', justifyItems: 'center' }} className="mx-auto">
          <QRCode
            size={233}
            value={POCode || '-'} />
        </DialogContent>
        <DialogActions className="mx-auto">
          <Grid
            className="mx-auto"
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              className="mx-auto"
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', }}
              sx={{
                backgroundColor: '#DAD8D8',
                color: 'black',
                '&:hover': { backgroundColor: '#BFBABA' },
              }}
              onClick={DialogQR}
            >
              Cerrar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* END QR MODAL */}
    </Card>
  );
}

export default OrdenCompraIndex;
