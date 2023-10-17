
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";

import { FileTextFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { MoreVert } from "@material-ui/icons";
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
  FormLabel,
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
  Typography,
} from "@mui/material";
import { Table } from "antd";
import { ExportToCsv } from 'export-to-csv';
import { Controller, useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import * as yup from "yup";
import ExportToExcel from "./ExcelFile";
import FormaEnvioService from "./FormaEnvioService";
import PDFGenerator from "./PDFGenerator";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastError,
  ToastErrorRegistroEnUso,
  ToastSuccessEditar,
  ToastSuccessEliminar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste
} from "src/styles/toastsFunctions";

{/*Yup para formulario de agregar Inicio */ }

//Constante para campos por defecto
const campos = {
  CodigoFormaEnvio: '',
  FormaEnvio: '',
};

//Constante para indicar que el valor es requerido
const schema = yup.object().shape({
  CodigoFormaEnvio: yup.string().trim().max(2).required(),
  FormaEnvio: yup.string().trim().required()
});

{/*Yup para formulario de agregar Fin */ }

function FormaDeEnvioIndex() {
  const formaEnvioService = FormaEnvioService();
  const [ExportData, SetExportData] = useState([]);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  const camposToFilter = ["key", "foen_Codigo", "foen_Descripcion"];
  const [anchorEl, setAnchorEl] = useState({});
  const [idEditar, setidEditar] = useState(0);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.foen_Id);
  };

  const handleDelete = (datos) => {
    setValue('foen_Codigo', datos['foen_Id']);
    DialogEliminar()
    handleClose(datos.foen_Id);
  };

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setidEditar(datos['foen_Id'])
    //insertar aca las variables necesarias en su formulario
    setValue("CodigoFormaEnvio", datos["foen_Codigo"]);
    setValue("FormaEnvio", datos["foen_Descripcion"]);
    handleClose(datos.foen_Id);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: 'Código de la forma de envío',
      dataIndex: 'foen_Codigo',
      key: 'foen_Codigo',
      sorter: (a, b) => a.foen_Codigo.localeCompare(b.foen_Codigo),
    },
    {
      title: 'Nombre de la forma de envío',
      dataIndex: 'foen_Descripcion',
      key: 'foen_Descripcion',
      sorter: (a, b) => a.foen_Descripcion.localeCompare(b.foen_Descripcion),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.foen_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.foen_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.foen_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.foen_Id}`}
              anchorEl={anchorEl[params.foen_Id]}
              keepMounted
              open={Boolean(anchorEl[params.foen_Id])}
              onClose={() => handleClose(params.foen_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
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
      ,
    },
  ];

  const csvHeader = [
    {
      label: 'No.',
    },

    {
      label: 'Código de la forma de envío'
    },
    {
      label: 'Nombre de la forma de envío'
    }
  ]
  const csvOptions = {
    filename: 'Formas_Envio',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: csvHeader.map((c) => c.label),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    try {
      csvExporter.generateCsv(ExportData);
    } catch (error) {

    }
  };
  const [data, setData] = useState([]);

  const [cargandoData, setCargandoData] = useState([]);
  const FormaEnvioaGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      const data = await formaEnvioService.listar()
      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await formaEnvioService.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };

  const FormaEnvioCreate = async () => {
    try {
      const response = (await formaEnvioService.crear(datosWatch))
      if (response.data.data.messageStatus == '1') {
        ToastSuccessGuardado()
        setSearchText("")
        FormaEnvioaGetData();
        VisibilidadTabla()
        reset(campos)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste()
      }
    } catch (error) {

      ToastError()
    }
  };

  const FormaEnvioEdit = async () => {
    try {
      const response = (await formaEnvioService.editar(datosWatch, idEditar))
      if (response.data.data.messageStatus == '1') {
        ToastSuccessEditar()
        if (searchText != "") { setSearchText(datosWatch.FormaEnvio) }
        else { setSearchText("") }
        FormaEnvioaGetData();
        VisibilidadTabla()
        reset(campos)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste()
      }
    } catch (error) {

      ToastError()
    }
  };

  const FormaEnvioDelete = async () => {
    try {
      const response = (await formaEnvioService.eliminar(datosWatch))
      if (response.data.data.messageStatus == '1') {
        ToastSuccessEliminar();
        setSearchText("");
        FormaEnvioaGetData();
        DialogEliminar()
        reset(campos)
      } else if (response.data.data.messageStatus.includes("0")) {
        ToastErrorRegistroEnUso();
        DialogEliminar()
        reset(campos)
      }
    } catch (error) {

      ToastError()
    }
  };

  useEffect(() => {
    FormaEnvioaGetData();
  }, []);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(campos);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  {
    /* Filtrado de datos */
  }
  const filteredRows = data.filter((row) => {
    if (searchText === "") {
      return true;  // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue = typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText = typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  }).reverse()

  //Constante useForm para el formulario de Agregar que nos proporciona todas las opciones para validar con yup
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    campos,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const datosWatch = watch();


  const GuardarFormaEnvio = () => {
    if (isValid) {
      if (!editar) {
        FormaEnvioCreate()
      } else {
        FormaEnvioEdit()
      }
    } else {
      ToastWarning()
    }
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
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/ZfHJNBP/FORMAS-DE-ENV-O.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/* Botón de Nuevo Inicio*/}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'start' } }} >
              <Stack direction="row" spacing={1}>
                <Button
                  startIcon={<Icon>add</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                  onClick={() => {
                    VisibilidadTabla()
                    setEditar(false)
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
                    <PDFGenerator data={ExportData} handleCloseExportar={handleCloseExportar} />

                    {/* Exportar a Excel */}
                    <ExportToExcel data={ExportData} handleCloseExportar={handleCloseExportar} />
                  </Menu>
                </div>
              </Stack>
              {/* Botón de Nuevo Fin */}
            </Grid>

            {/* Filtros de la tabla (Filas/Buscar) */}
            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'end', md: 'end' } }} >
              <label className='mt-8'>Filas por página:</label>
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
            </Grid>

            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'start', md: 'center' } }} >
              {/* Barra de Busqueda en la Tabla */}
              <TextField
                style={{ borderRadius: '10px' }}
                placeholder='Buscar'
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
            </Grid>
          </Grid>
        </CardContent>

        {/* Mostrar tabla index inicio*/}
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            scroll={{ x: true }}
            dataSource={filteredRows}
            size="small"
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}


      {/* Collapse para el formulario de agregar un registro inicio*/}
      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAgregar}>
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
                    label={editar ? "Editar Forma de envío" : "Agregar Forma de envío"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl error={!!errors.CodigoFormaEnvio} fullWidth>
                  <FormLabel
                  >
                    Código de la forma de envío:
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        disabled={editar}
                        error={!!errors.CodigoFormaEnvio}
                        fullWidth={true}
                        inputProps={{
                          style: { textTransform: "uppercase" },
                          maxLength: 2,
                        }}
                      />
                    )}
                    name="CodigoFormaEnvio"
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors.FormaEnvio} fullWidth>
                      <FormLabel
                      >
                        Forma de envío:
                      </FormLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        error={!!errors.FormaEnvio}
                        fullWidth={true}
                        inputProps={{
                          startadornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="FormaEnvio"
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarFormaEnvio}
                >
                  Guardar
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px' }}
                  sx={{
                    backgroundColor: '#DAD8D8', color: 'black',
                    "&:hover": { backgroundColor: '#BFBABA' },
                  }}
                  onClick={VisibilidadTabla}
                >
                  Cancelar
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </Collapse>
      </form>
      {/* Collapse para el formulario de agregar un registro Fin*/}


      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip color='default' label="Detalles de la Forma de envío" />
              </Divider>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id de la forma de envío:
                  </Typography>
                  <Typography>{DatosDetalles['foen_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Código de la forma de envío:
                  </Typography>
                  <Typography>{DatosDetalles['foen_Codigo']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Forma de envío descripción:
                  </Typography>
                  <Typography>{DatosDetalles["foen_Descripcion"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <table
                id="detallesTabla"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>Acción
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y
                      hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['foen_FechaCreacion'] ? new Date(DatosDetalles['foen_FechaCreacion']).toLocaleString() : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['foen_FechaModificacion'] ? new Date(DatosDetalles['foen_FechaModificacion']).toLocaleString() : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <div className="card-footer">
                <Button variant="contained"
                  style={{ position: 'fixed', top: '78%', right: '5%' }}
                  onClick={() => {
                    setmostrarIndex(!mostrarIndex);
                    setmostrarDetalles(!mostrarDetalles);
                  }}
                  startIcon={<Icon>arrow_back</Icon>}>
                  Regresar
                </Button>
                <br />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar los detalles de un registro fin*/}

      <Dialog
        open={Eliminar}
        fullWidth="md"
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
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="error"
              style={{ borderRadius: '10px', marginRight: '10px' }}

              onClick={FormaEnvioDelete}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#DAD8D8', color: 'black',
                "&:hover": { backgroundColor: '#BFBABA' },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>

  );
}

export default FormaDeEnvioIndex;