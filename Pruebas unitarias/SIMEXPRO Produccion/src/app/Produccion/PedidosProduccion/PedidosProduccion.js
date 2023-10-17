/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { MoreVert } from "@material-ui/icons";
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
import { Table, Tag } from "antd";
import { ExportToCsv } from 'export-to-csv';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import History from 'src/@history/@history';
import LoadingIcon from "src/styles/iconoCargaTabla";
import { ToastError, ToastErrorRegistroEnUso, ToastSuccessEliminar, ToastWarningPersonalizado } from 'src/styles/toastsFunctions';
import * as yup from "yup";
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";
import PedidosProduccionServices from './PedidosProduccionservice';

const defaultPedidosProduccionValues = {
  id: '',
  empl_NombreCompleto: '',
  ppro_Estados: '',
  ppro_Observaciones: '',
}

const PedidosProduccionSchema = yup.object().shape({
  ppro_Id: yup.string(),
  empl_NombreCompleto: yup.string().required(''),
  ppro_Estados: yup.string().required(''),
  ppro_Observaciones: yup.string().required(''),
})

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


function PedidosProduccionIndex() {
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


  //variable para el service
  const PedidosProduccionService = new PedidosProduccionServices();

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
    handleClose(datos.ppro_Id);
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
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };



  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultPedidosProduccionValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(PedidosProduccionSchema), //Esquema del formulario
    });

  const datosWatch = watch();

  //Constante para cargar datos a las tablas      
  useEffect(() => {
    ListadoPedidosProduccion()
  }, []);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Constante del listado de la tabla
  const ListadoPedidosProduccion = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);

      const data = await PedidosProduccionService.ListarPedidosProduccion();
      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      setExportData(await PedidosProduccionService.ExportData());
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
        await ListadoPedidosProduccion(record.detalles);
        setExpandedRowKey(record.key);
      } else {
        setExpandedRowKey(null);
      }
    },
  };

  //Constante para tomar el id del menu
  const handleDelete = (data) => {
    if (data.ppro_Finalizado) {
      ToastWarningPersonalizado('Advertencia. Este pedido ha sido finalizado. Lamentablemente, no es posible eliminar el mismo.')
    } else {
      setValue('id', data['ppro_Id'])
      DialogEliminar();
    }
    handleClose(data['ppro_Id']);
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };


  //constante para Validar si el Pedido Produccion esta Fnalizado
  const ValidarPedidoFinalizadoEditar = (Datos) => {
    handleClose(Datos.ppro_Id)

    if (Datos.ppro_Finalizado) {
      ToastWarningPersonalizado('Advertencia. Este pedido ha sido finalizado. Lamentablemente, no es posible realizar modificaciones en el mismo.')
    } else {
      History.push('/PedidosProduccion/editar', Datos)
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
      title: "Empleado solicitante",
      dataIndex: "empl_NombreCompleto",
      key: "empl_NombreCompleto",
      sorter: (a, b) => a.empl_NombreCompleto.localeCompare(b.empl_NombreCompleto), //sorting para Letras
    },
    {
      title: "Estado del pedido",
      dataIndex: "ppro_Estados",
      key: "ppro_Estados",
      render: (text, record) => { return (record.ppro_Estados.toString() == "Pendiente" ? <Tag color="red">Pendiente</Tag> : record.ppro_Estados.toString() == "Entregada" ? <Tag color="green">Entregada</Tag> : '') },
      sorter: (a, b) => a.ppro_Estados.localeCompare(b.ppro_Estados), //sorting para Letras
    },
    {
      title: "Observaciones",
      dataIndex: "ppro_Observaciones",
      key: "ppro_Observaciones",
      sorter: (a, b) => a.ppro_Observaciones.localeCompare(b.ppro_Observaciones), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.ppro_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.ppro_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.ppro_Id)}
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
              id={`menu-${params.ppro_Id}`}
              anchorEl={anchorEl[params.ppro_Id]}
              keepMounted
              open={Boolean(anchorEl[params.ppro_Id])}
              onClose={() => handleClose(params.ppro_Id)}
            >
              <MenuItem onClick={() => { ValidarPedidoFinalizadoEditar(params) }} >
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>ㅤEliminar
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
        label: 'Empleado solicitante'
    },  
    {
        label: 'Estado del pedido'
    },  
    {
        label: 'Observaciónes'
    },
    {
      label: 'Ítems'
    }
  ]

  
  const csvOptions = {
    filename: 'Pedidos_De_Produccion',
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
      title: 'Lote',
      dataIndex: 'lote_CodigoLote',
      key: 'lote_CodigoLote',
      sorter: (a, b) => a.lote_CodigoLote - b.lote_CodigoLote, //sorting para Numeros
    },
    {
      title: 'Cantidad',
      dataIndex: 'ppde_Cantidad',
      key: 'ppde_Cantidad',
      sorter: (a, b) => a.ppde_Cantidad - b.ppde_Cantidad,
    },
    {
      title: 'Material',
      dataIndex: 'mate_Descripcion',
      key: 'mate_Descripcion',
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), //sorting para Letras
    },
  ];



  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "empl_NombreCompleto", "ppro_Estados", "ppro_Observaciones"];




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



  // Peticion para Eliminar un registro
  const PedidosProduccionEliminar = async () => {
    try {
      
      const response = await PedidosProduccionService.EliminarPedidosProduccion(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEliminar();
        ListadoPedidosProduccion();
        DialogEliminar();
        setSearchText('');
        reset(defaultPedidosProduccionValues);
      }
      else if (response.data.data.messageStatus == "2") {
        DialogEliminar();
        ToastErrorRegistroEnUso();
      }
    } catch (error) {
      ToastError();
    }
  }

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
        image="https://i.ibb.co/ZVVTwPz/PEDIDOS-DE-PRODUCCI-N.png"
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
              onClick={() => {
                History.push("PedidosProduccion/crear");
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
                <PDFGenerator data={filteredRows} handleCloseExportar={handleCloseExportar} />

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
              onClick={PedidosProduccionEliminar}
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
                <Chip label="Detalles del Pedido de Producción" />
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
                <InputLabel htmlFor="ppro_Id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id de la Órden:
                  </Typography>
                  <Typography>{DatosDetalles['ppro_Id']}</Typography>
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
                <InputLabel htmlFor="empl_NombreCompleto">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del Empleado:
                  </Typography>
                  <Typography>{DatosDetalles['empl_NombreCompleto']}</Typography>
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
                <InputLabel htmlFor="ppro_Fecha">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Fecha de Emisión:
                  </Typography>
                  <Typography>{Fecha(DatosDetalles['ppro_Fecha'])}</Typography>
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
                <InputLabel htmlFor="ppro_Estados">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Estado de la Órden:
                  </Typography>
                  <Typography>{DatosDetalles['ppro_Estados']}</Typography>
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
                <InputLabel htmlFor="ppro_Observaciones">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Observaciones:
                  </Typography>
                  <Typography>{DatosDetalles['ppro_Observaciones']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid container justifyContent="center" style={{ marginTop: '20px', marginBottom: '25px', marginLeft: '30px', marginBottom: '40px' }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="OrdenDeProduccion">
                      <Divider style={{ marginTop: '0px', marginBottom: '10px', borderColor: '#aa8caf' }}>
                        <Chip color='default' variant='outlined' label="Materiales de la Órden de Producción" />
                      </Divider>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {DatosDetalles['detalles'] ? (
                          DatosDetalles['detalles'].map((item, index) => (
                            <Card style={{ marginLeft: '5px', marginBottom: '10px', border: '1px solid', borderColor: '#c2c2c2' }}>
                              <CardContent>
                                <div key={index} style={{ textAlign: 'left' }}>
                                  - <strong>{"Id Detalle:"}</strong> {item.ppde_Id} <br />
                                  - <strong>{"Lote:"}</strong> {item.lote_CodigoLote} <br />
                                  - <strong>{"Cantidad:"}</strong> {item.ppde_Cantidad} <br />
                                  - <strong>{"Material:"}</strong> {item.mate_Descripcion} <br />
                                  - <strong>{"Área:"}</strong> {item.tipa_area} <br />
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
                              No se han asignado Materiales a esta Órden de Producción
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
                      <Icon style={iconStyle}>edit</Icon>Acción
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
                      {DatosDetalles['ppro_FechaCreacion']
                        ? new Date(DatosDetalles['ppro_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosDetalles['usuModificacion']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['ppro_FechaModificacion']
                        ? new Date(DatosDetalles['ppro_FechaModificacion']).toLocaleString()
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

export default PedidosProduccionIndex