import { FileTextFilled } from '@ant-design/icons';
import { MoreVert } from '@material-ui/icons';
import SearchIcon from '@mui/icons-material/Search';
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
import { Table } from "antd";
import { ExportToCsv } from 'export-to-csv';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import History from 'src/@history/@history';
import LoadingIcon from "src/styles/iconoCargaTabla";

import {
  ToastError,
  ToastSuccessEditar,
  ToastSuccessEliminar,
  ToastSuccessGuardado,
  ToastSuccessPersonalizado,
  ToastWarningPersonalizado,
  ToastWarning
} from "src/styles/toastsFunctions";
import ExportToExcel from "./FacturaExportacionExcel";
import ImprimirFactura from './FacturaExportacionImprimir';
import PDFGenerator from "./FacturaExportacionPDF";
import FacturasExportacionService from './FacturaExportacionService';


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


function FacturaExportacionIndex() {
  const [DataTabla, setDataTabla] = useState([])
  const [ExportData, setExportData] = useState([]);
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const Navigate = useNavigate();
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [DeleteID, setDeleteID] = useState("");

  //variable para el service
  const FacturaExportacionService = FacturasExportacionService();

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (codigo) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [codigo]: null,
    }));
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    MostrarCollapseDetalles();
    handleClose(datos.faex_Id);
  };

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
    //setMessage(event.target.value);
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
    ListadoFacturaExportacion();
    GetExportData();
  }, []);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Constante del listado de la tabla
  const ListadoFacturaExportacion = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);

      const data = await FacturaExportacionService.ListarFacturasExportacion();

      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);    
    } catch (error) {
      setCargandoData(null)
    }
  };

  async function GetExportData () {
    try{
      setExportData(await FacturaExportacionService.ExportData());
    }catch (error) {
      
    } 
  }

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
        await ListadoFacturaExportacion(record.detalles);
        setExpandedRowKey(record.key);
      } else {
        setExpandedRowKey(null);
      }
    },
  };


  //Constante para tomar el id del menu
  const handleDelete = (data) => {
    if (data.faex_Finalizado) {
      ToastWarningPersonalizado('Advertencia. Esta factura ha sido finalizado. Lamentablemente, no es posible eliminarla.')
    } else {
      setDeleteID(data['faex_Id'])
      DialogEliminar();
    }
    handleClose(data['faex_Id']);
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };


  //constante para Validar si el Pedido Produccion esta Fnalizado
  const ValidarFactura_Finalizada_Editar = (data) => {
    handleClose(data.faex_Id)

    if (data.faex_Finalizado) {
      ToastWarningPersonalizado('Advertencia. Esta factura ha sido finalizada. Lamentablemente, no es posible realizar modificaciones en la misma.')
    } else {
      History.push('/FacturasExportacion/editar', data)
    }

  }

  const EliminarFactura = async () =>{
    try{
      const response = await FacturaExportacionService.EliminarFacturasExportacion(DeleteID);
      if (response.data.data.messageStatus == "1") {
          ToastSuccessEliminar();
          DialogEliminar(); 
          ListadoFacturaExportacion();
          GetExportData()             
      }
      else if (response.data.data.messageStatus == "0") {
          DialogEliminar();
          ToastWarningPersonalizado("El registro está en uso");
      }
    }
    catch (error){
      ToastError();
    }
  }

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "DUCA No.",
      dataIndex: "duca_No_Duca",
      key: "duca_No_Duca",
      sorter: (a, b) => a.duca_No_Duca.localeCompare(b.duca_No_Duca), //sorting para Letras
    },
    {
      title: "Fecha",
      dataIndex: "faex_Fecha",
      key: "faex_Fecha",
      sorter: (a, b) => a.faex_Fecha.localeCompare(b.faex_Fecha), //sorting para Letras
    },
    {
      title: "P.O. No.",
      dataIndex: "orco_Codigo",
      key: "orco_Codigo",
      sorter: (a, b) => a.orco_Codigo.localeCompare(b.orco_Codigo), //sorting para Letras
    },
    {
      title: "Cliente",
      dataIndex: "clie_Nombre_O_Razon_Social",
      key: "clie_Nombre_O_Razon_Social",
      sorter: (a, b) => a.clie_Nombre_O_Razon_Social.localeCompare(b.clie_Nombre_O_Razon_Social), //sorting para Letras
    },
    {
      title: "Total",
      dataIndex: "faex_Total",
      key: "faex_Total",
      sorter: (a, b) => a.faex_Total - b.faex_Total,
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.faex_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.faex_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.faex_Id)}
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
              id={`menu-${params.faex_Id}`}
              anchorEl={anchorEl[params.faex_Id]}
              keepMounted
              open={Boolean(anchorEl[params.faex_Id])}
              onClose={() => handleClose(params.faex_Id)}
            >
              <MenuItem onClick={() => { ValidarFactura_Finalizada_Editar(params) }} >
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
              
              <ImprimirFactura data={params}/>
              
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
      label: 'DUCA No.'
    },
    {
      label: 'Fecha'
    },
    {
      label: 'P.O No.'
    },
    {
      label: 'Cliente'
    },
    {
      label: 'Total'
    },
    {
      label: 'Ítems'
    },

  ];

  const csvOptions = {
    filename: 'Facturas_de_Exportación', 
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
    try{
      csvExporter.generateCsv(ExportData);
    }catch(error){
      
    }
  };

  //Constantes para los campos de la Tabla Maestra
  const columnsExpandable = [
    {
      title: 'Talla',
      dataIndex: 'tall_Codigo',
      key: 'tall_Codigo',
      sorter: (a, b) => a.tall_Codigo.localeCompare(b.tall_Codigo), //sorting para Letras
    },
    {
      title: 'Sexo',
      dataIndex: 'code_Sexo',
      key: 'code_Sexo',
      sorter: (a, b) => a.code_Sexo.localeCompare(b.code_Sexo), //sorting para Letras
    },
    {
      title: 'Color',
      dataIndex: 'colr_Nombre',
      key: 'colr_Nombre',
      sorter: (a, b) => a.colr_Nombre.localeCompare(b.colr_Nombre), //sorting para Letras
    },
    {
      title: 'Cajas',
      dataIndex: 'fede_Cajas',
      key: 'fede_Cajas',
      sorter: (a, b) => a.fede_Cajas - b.fede_Cajas, //sorting para Letras
    },
    {
      title: 'Cantidad prendas en docena',
      dataIndex: 'fede_Cantidad',
      key: 'fede_Cantidad',
      sorter: (a, b) => a.fede_Cantidad - b.fede_Cantidad, //sorting para numeros
    },
    {
      title: 'Precio unitario',
      dataIndex: 'fede_PrecioUnitario',
      key: 'fede_PrecioUnitario',
      sorter: (a, b) => a.fede_PrecioUnitario - b.fede_PrecioUnitario,
    },
    {
      title: 'Valor',
      dataIndex: 'fede_TotalDetalle',
      key: 'fede_TotalDetalle',
      sorter: (a, b) => a.fede_TotalDetalle - b.fede_TotalDetalle,
    },

  ];

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "duca_No_Duca", "faex_Fecha", "orco_Codigo", "clie_Nombre_O_Razon_Social", "faex_Total"];

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


  const Fecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const año = fechaObj.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;

    return fechaFormateada;
  }

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
        image="https://i.ibb.co/ys0p6LP/FACTURAS-DE-EXPORTACION.png"
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
          {/* Botón de Nuevo Inicio*/}     <Grid container spacing={1}>
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
                History.push("FacturasExportacion/crear");
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
            columns={columns}
            expandable={expandableConfig}
            dataSource={filteredRows}
            scroll={{ x: true }}
            size="small"
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            pagination={{
              pageSize: filas
              , className: 'custom-pagination'
            }}

          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}


                            {/* Inicia del Dialog(Modal) Eliminar */}
                            <Dialog
                                open={Eliminar}
                                fullWidth
                                onClose={DialogEliminar}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Confirmación de Eliminación
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
                                            color="error"
                                            style={{ borderRadius: "10px", marginRight: "10px" }}
                                            onClick={EliminarFactura}
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
                            {/* Fin del Dialog(Modal) Eliminar */}

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
                <Chip label="Detalles de la Factura" />
              </Divider>
            </Grid>


            <Grid
              item
              xs={12}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="faex_Id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Factura No.
                  </Typography>
                  <Typography>{DatosDetalles['faex_Id']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="duca_No_Duca">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    DUCA No. 
                  </Typography>
                  <Typography>{DatosDetalles['duca_No_Duca']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="faex_Fecha">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Fecha:
                  </Typography>
                  <Typography>{Fecha(DatosDetalles['faex_Fecha'])}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="clie_Nombre_O_Razon_Social">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Cliente:
                  </Typography>
                  <Typography>{DatosDetalles['clie_Nombre_O_Razon_Social']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Órden de Compra No.:
                  </Typography>
                  <Typography>{DatosDetalles['orco_Codigo']}</Typography>
                </InputLabel>
              </Box>
            </Grid>


            <Grid
              item
              xs={12}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="faex_Total">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Gran Total:
                  </Typography>
                  <Typography> HNL. {DatosDetalles['faex_Total']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid container justifyContent="center" style={{ marginTop: '20px', marginBottom: '25px', marginLeft: '30px', marginBottom: '40px' }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="facturaexportacion">
                      <Divider style={{ marginTop: '0px', marginBottom: '10px', borderColor: '#aa8caf' }}>
                        <Chip  label="Items de la Factura" />
                      </Divider>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {DatosDetalles['detalles'] ? (
                          DatosDetalles['detalles'].map((item, index) => (
                            <Card style={{ marginLeft: '5px', marginBottom: '10px', border: '1px solid', borderColor: '#c2c2c2' }}>
                              <CardContent>
                                <div key={index} style={{ textAlign: 'left' }}>
                                  - <strong>{"Item No.:"}</strong> {item.key} <br />
                                  - <strong>{"Cantidad Cajas:"}</strong> {item.fede_Cajas} <br />
                                  - <strong>{"Cantidad prendas (docena):"}</strong> {item.fede_Cantidad} <br />
                                  - <strong>{"Precio unitario:"}</strong> {item.fede_PrecioUnitario} <br />
                                  - <strong>{"Total Detalle:"}</strong> HNL. {item.fede_TotalDetalle} <br />
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
                            <Typography variant="subtitle1" style={{alignItems: 'center'}}>
                              Esta factura no cuenta con ítems
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
                      {DatosDetalles['faex_FechaCreacion']
                        ? new Date(DatosDetalles['faex_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosDetalles['usuarioModificacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['faex_FechaModificacion']
                        ? new Date(DatosDetalles['faex_FechaModificacion']).toLocaleString()
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


    </Card>
  )

}

export default FacturaExportacionIndex