/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable import/order */

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

import {
  Button,
  Chip,
  Divider,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import InputMask from "react-input-mask";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Imports de validaciones
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// Imports tabla
import { Table } from 'antd';
import 'src/styles/custom-pagination.css';
import LoadingIcon from 'src/styles/iconoCargaTabla';
// import tabla detalles
import estilosTablaDetalles from 'src/styles/tablaDetalles';
// Import service
import PaisesService from './PaisesService';
// Import ddls
import Load_DDLs from 'src/app/loadDDLs/Load_DDL';
// import Toast
import 'react-toastify/dist/ReactToastify.css';
import {
  ToastError,
  ToastSuccessEditar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste,
} from 'src/styles/toastsFunctions';

/* Campos del formulario */
const defaultPaisesValues = {
  id: '', // id necesario para el editar
  pais_Id: 0,
  pais_Codigo: '',
  pais_Nombre: '',
  pais_prefijo: '',
  usua_UsuarioCreacion: '',
  pais_FechaCreacion: '',
  usua_UsuarioModificacion: '',
  pais_FechaModificacion: '',
  usua_UsuarioEliminacion: '',
  pais_FechaEliminacion: '',
};

/* Esquema del fomulario (validaciones) */
// En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  pais_Codigo: yup
    .string()
    .trim()
    .required(''),
  pais_Nombre: yup.string().trim().required(''),
  pais_prefijo:yup.string().trim().required(''),
});

function PaisesIndex() {
  const paisesService = PaisesService();
  const [ExportData, SetExportData] = useState([]);
  
  const load_DDLs = Load_DDLs()
  // Variables DDL
  const [paises_DDL, setPaises_DDL] = useState([]);

  // Cargado de las variables DDL
  async function ddls() {
    setPaises_DDL(await load_DDLs.paises());
  }

  // variable para la barra de busqueda
  const [searchText, setSearchText] = useState('');

  // Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  // Variable donde se guardan los datos del detalle seleccionado
  const [DatosDetalles, setDatosDetalles] = useState({});

  // variable para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  // Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  // Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  // Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultPaisesValues);
  };

  // Controlador del dialog(modal) eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  // Controlador del collapse detalles
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  // controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  // abre el menu al cual se le dio click
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  // Cierra el menu abierto
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  // Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    
    VisibilidadTabla();
    setEditar(true);
    // insertar aca las variables necesarias en su formulario
    setValue('pais_Id', datos.pais_Id);
    setValue('pais_Codigo', datos.pais_Codigo);
    setValue('pais_Nombre', datos.pais_Nombre);
    if(datos.pais_prefijo == "No tiene prefijo")
    setValue('pais_prefijo', "");
    else
    setValue('pais_prefijo', datos.pais_prefijo);
    handleClose(datos.pais_Id);
  };

  // Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); // se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.pais_Id);
  };

  // Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
  const handleDelete = (datos) => {
    // en caso de ocupar eliminar
    handleClose(datos.pais_Id);
  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: 'Código del País',
      dataIndex: 'pais_Codigo',
      key: 'pais_Codigo',
      sorter: (a, b) => a.pais_Codigo.localeCompare(b.pais_Codigo), // sorting para Letras
    },
    {
      title: 'Nombre del País',
      dataIndex: 'pais_Nombre',
      key: 'pais_Nombre',
      sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre), // sorting para Letras
    },
    {
      title: 'Prefijo del País',
      dataIndex: 'pais_prefijo',
      key: 'pais_prefijo',
      sorter: (a, b) => a.pais_prefijo.localeCompare(b.pais_prefijo), // sorting para Letras
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.pais_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.pais_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.pais_Id)}
              variant="contained"
              style={{
                borderRadius: '10px',
                backgroundColor: '#634A9E',
                color: 'white',
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.pais_Id}`}
              anchorEl={anchorEl[params.pais_Id]}
              keepMounted
              open={Boolean(anchorEl[params.pais_Id])}
              onClose={() => handleClose(params.pais_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {/* <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem> */}
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
        label: 'Código del País',
    },  
    {
        label: 'Nombre del País',
    },
    {
      label: 'Prefijo del País',
  }
]
const csvOptions = { 
    filename: 'Paises',
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
    try{
      csvExporter.generateCsv(ExportData);
    }catch(error){
      
    }
  };


  // Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ['key', 'pais_Codigo', 'pais_Nombre','pais_prefijo'];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
    if (searchText === '') {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  }).reverse()

  // Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultPaisesValues, // Campos del formulario
    mode: 'all',
    resolver: yupResolver(accountSchema), // Esquema del formulario
  });

  // Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  // Datos del formulario
  const datosWatch = watch();

  const [cargandoData, setCargandoData] = useState([]);
  // Peticion para cargar datos de la tabla
  const paisesGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      const data = await paisesService.listar();
      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await paisesService.ExportData());
    } catch (error) {
      setCargandoData(null);
      ToastError();
    }
  };

  // Peticion para crear un registro
  const paisesCreate = async () => {
    try {
      const response = await paisesService.crear(datosWatch);
      if (response.data.data.messageStatus == '1') {
        ToastSuccessGuardado();
        paisesGetData();
        VisibilidadTabla();
        reset(defaultPaisesValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  // Peticion para editar un registro
  const paisesEdit = async () => {
    try {
      const response = await paisesService.editar(datosWatch);
      if (response.data.data.messageStatus === '1') {
        ToastSuccessEditar();
        paisesGetData();
        VisibilidadTabla();
        reset(defaultPaisesValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  // useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    paisesGetData();
  }, []);

  // Controlador del formulario
  const GuardarPais = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        paisesCreate();
      } else {
        paisesEdit();
      }
    } else {
      ToastWarning('Completa todos los campos');
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
        image="https://i.ibb.co/TMsGt9m/PAISES-1.png"
        alt="Encabezado de la carta"
      />
      {/* Inicio del Collapse incial (Tabla/Index) */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Botón de Nuevo */}
          
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
         
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E',
                color: 'white',
                '&:hover': { backgroundColor: '#6e52ae' },
              }}
              onClick={() => {
                VisibilidadTabla();
                setEditar(false);
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
            </Grid>

          {/* Filtros de la tabla (Filas/Buscar) */}
          <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'end', md:'end'}}} >
          
            <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                onChange={handleChangeFilas}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            </Grid>
                <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'start', md:'center'}}} >
            {/* Barra de Busqueda en la Tabla */}
            <TextField
              style={{ borderRadius: '10px' }}
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
            />       </Grid>
            </Grid>
        </CardContent>

        {/* Declaracion de la tabla */}
        <div className="center" style={{ width: '95%', margin: 'auto' }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            scroll={{ x: true }}
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar',
              emptyText: LoadingIcon(cargandoData),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: 'custom-pagination',
            }}
          />
        </div>
      </Collapse>
      {/* Fin del Collapse incial (Tabla/Index) */}

      {/* Inicio del Formulario */}
      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAdd}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip label={editar ? 'Editar País' : 'Agregar País'} />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.pais_Codigo}>Código:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        disabled={editar}
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 2,
                          onInput: (event) => {
                            event.target.value = event.target.value.toUpperCase();
                          },
                        }}
                        error={!!errors.pais_Codigo}
                      />
                    )}
                    name="pais_Codigo"
                    control={control}
                  />
                </FormControl>
              </Grid>


              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.pais_Nombre}>Nombre:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.pais_Nombre}
                      />
                    )}
                    name="pais_Nombre"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="+***"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                        <FormLabel error={!!errors.pais_prefijo} >Prefijo:</FormLabel>                     
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              inputProps={{
                                maxLength: 4,
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                                onKeyPress: (event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                                },
                            }}
                              error={!!errors.pais_prefijo}
                            ></TextField>                       
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="pais_prefijo"
                  control={control}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'right',
                }}
              >
                <Button
                  type="submit"
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E',
                    color: 'white',
                    '&:hover': { backgroundColor: '#6e52ae' },
                  }}
                  onClick={GuardarPais}
                >
                 Guardar
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px' }}
                  sx={{
                    backgroundColor: '#DAD8D8',
                    color: 'black',
                    '&:hover': { backgroundColor: '#BFBABA' },
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
      {/* Fin del Formulario */}

      {/* Inicia del Dialog(Modal) Eliminar */}
      <Dialog
        open={Eliminar}
        fullWidth="md"
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmación de Eliminación</DialogTitle>
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
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'right',
            }}
          >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: '#634A9E',
                color: 'white',
                '&:hover': { backgroundColor: '#6e52ae' },
              }}
              onClick={DialogEliminar}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#DAD8D8',
                color: 'black',
                '&:hover': { backgroundColor: '#BFBABA' },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Fin del Dialog(Modal) Eliminar */}

      {/* Inicia del collapse Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles del País" />
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
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Id del País:
                  </Typography>
                  <Typography>{DatosDetalles.pais_Id}</Typography>
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
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Código del País:
                  </Typography>
                  <Typography>{DatosDetalles.pais_Codigo}</Typography>
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
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Nombre del País:
                  </Typography>
                  <Typography>{DatosDetalles.pais_Nombre}</Typography>
                </InputLabel>
              </Box>
            </Grid>


            <Grid item xs={12}>
              <table id="detallesTabla" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>
                      Acción
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>
                      Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>
                      Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.usuarioCreacionNombre}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.pais_FechaCreacion
                        ? new Date(DatosDetalles.pais_FechaCreacion).toLocaleString()
                        : ''}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.usuarioModificadorNombre}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.pais_FechaModificacion
                        ? new Date(DatosDetalles.pais_FechaModificacion).toLocaleString()
                        : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br />
            <Grid item xs={12}>
              <div className="card-footer">
                <Button variant="contained"
                  style={{ position: 'fixed', top: '76%', right: '5%' }}
                  onClick={() => {
                    CollapseDetalles();
                  }}
                  startIcon={<Icon>arrow_back</Icon>}>
                  Regresar</Button>
                <br></br>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Fin del Collapse Detalles */}
    </Card>
  );
}

export default PaisesIndex;
