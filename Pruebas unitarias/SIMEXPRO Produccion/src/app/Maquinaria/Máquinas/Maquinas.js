/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable import/order */
import {
  Autocomplete,
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
  Typography
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { useEffect, useState } from 'react';

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
import MaquinasService from './MaquinasService';

// Import ddls
import Load_DDLs from 'src/app/loadDDLs/Load_DDL';
// import Toast
import 'react-toastify/dist/ReactToastify.css';
// imports de los imports
import { useNavigate } from 'react-router-dom';
import History from "src/@history/@history";

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import {
  ToastError,
  ToastSuccessEditar,
  ToastSuccessEliminar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste
} from "src/styles/toastsFunctions";
import ExportToExcel from "./MaquinasExcel";
import PDFGenerator from "./MaquinasPDF";
import { QRCode } from "antd";

/* Campos del formulario */
const defaultMaquinasValues = {
  id: '', // id necesario para el editar
  maqu_Id: '',
  maqu_NumeroSerie: '',
  mmaq_Id: null, // para los campos que son ddl poner null
  modu_Id: null, // para los campos que son ddl poner null
  usua_UsuarioCreacion: '',
  maqu_FechaCreacion: '',
  usua_UsuarioModificacion: '',
  maqu_FechaModificacion: '',
  usua_UsuarioEliminacion: '',
  maqu_FechaEliminacion: '',
  maqu_Estado: '',
  usuarioCreacionNombre: '',
  usuarioModificacionNombre: '',
};

/* Esquema del fomulario (validaciones) */
// En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  maqu_NumeroSerie: yup.string().trim().required(''),
  mmaq_Id: yup.object().required(''),
  modu_Id: yup.object().required(''),
});

function MaquinasIndex() {
  const maquinasService = MaquinasService();
  const [ExportData, SetExportData] = useState([]);
  const load_DDLs = Load_DDLs();
  // Variables DDL
  const [Modelos_DDL, setModelos_DDL] = useState([]);
  const [Modulos_DDL, setModulos_DDL] = useState([]);

  // Cargado de las variables DDL
  async function ddls() {
    setModelos_DDL(await load_DDLs.ModelosMaquinas());
    setModulos_DDL(await load_DDLs.Modulos());
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
  const [DataTable, setDataTable] = useState([]);
  const [verQr, setVerQr] = useState(false)
  const [qr, setQr] = useState("")

  const Navigate = useNavigate();

  // Peticion para cargar datos de la tabla
  const MaquinasGetData = async () => {
    try {
      setDataTable(await maquinasService.listar());
      SetExportData(await maquinasService.ExportData());
    } catch (error) {
    }
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMaquinasValues);
  };

  // Controlador del dialog(modal) eliminar
  const DialogEliminar = (datos) => {
    setValue('maqu_Id', datos.maqu_Id);
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
    setValue('maqu_Id', datos.maqu_Id);
    setValue('maqu_NumeroSerie', datos.maqu_NumeroSerie);
    setValue(
      'mmaq_Id',
      Modelos_DDL.find((Modelos_DDL) => Modelos_DDL.value == datos.mmaq_Id) // importante para cargar bien los ddl al editar
    );
    setValue(
      'modu_Id',
      Modulos_DDL.find((Modulos_DDL) => Modulos_DDL.value == datos.modu_Id) // importante para cargar bien los ddl al editar
    );
    handleClose(datos.maqu_Id);
  };

  // Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); // se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.maqu_Id);
  };

  // Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
  const handleDelete = (datos) => {
    setValue('maqu_Id', datos.maqu_Id);
    setEliminar(!Eliminar);
    handleClose(datos.maqu_Id);
  };

  const handleLine = (params) => {
    History.push('/MaquinaHistorial/timeline', params);
    handleClose(params.maqu_Id);
  };

  const handleReporte = (params) => {
    History.push('/MaquinaHistorial/reporte', params);
    handleClose(params.maqu_Id);
  };

  const handleVerQr = (params) => {
    setVerQr(!verQr)
    setQr(params?.maqu_NumeroSerie)
    handleClose(params.maqu_Id);
  };

  // useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    MaquinasGetData();
  }, []);

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
      title: 'Número de Serie',
      dataIndex: 'maqu_NumeroSerie',
      key: 'maqu_NumeroSerie',
      sorter: (a, b) => a.maqu_NumeroSerie.localeCompare(b.maqu_NumeroSerie), // sorting para Letras
    },
    {
      title: 'Módulo',
      dataIndex: 'modu_Nombre',
      key: 'modu_Nombre',
      sorter: (a, b) => a.modu_Nombre.localeCompare(b.modu_Nombre), // sorting para Letras
    },
    {
      title: 'Modelo',
      dataIndex: 'mmaq_Nombre',
      key: 'mmaq_Nombre',
      sorter: (a, b) => a.mmaq_Nombre.localeCompare(b.mmaq_Nombre), // sorting para Letras
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.maqu_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.maqu_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.maqu_Id)}
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
              id={`menu-${params.maqu_Id}`}
              anchorEl={anchorEl[params.maqu_Id]}
              keepMounted
              open={Boolean(anchorEl[params.maqu_Id])}
              onClose={() => handleClose(params.maqu_Id)}
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
              <MenuItem onClick={() => handleLine(params)}>
                <Icon>timeline</Icon>ㅤLínea de Tiempo
              </MenuItem>
              <MenuItem onClick={() => handleReporte(params)}>
                <Icon>print_connect</Icon>ㅤReporte de Maquina
              </MenuItem>
              <MenuItem onClick={() => handleVerQr(params)}>
                <Icon>qr_code_2</Icon>ㅤ Ver QR
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
      label: 'No. Serie'
    },
    {
      label: 'Modelo'
    },
    {
      label: 'Módulo asignado'
    }
  ]

  const csvOptions = {
    title: 'Máquinas', showTitle: true, filename: 'Maquinas',
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
    csvExporter.generateCsv(ExportData);
  };


  // Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ['key', 'maqu_NumeroSerie', 'mmaq_Id', 'modu_Id'];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = DataTable.filter((row) => {
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
  });

  // Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultMaquinasValues, // Campos del formulario
    mode: 'all',
    resolver: yupResolver(accountSchema), // Esquema del formulario
  });

  // Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  // Datos del formulario
  const datosWatch = watch();
  const maqu_Id = watch();

  // Peticion para crear un registro
  const MaquinasCreate = async () => {
    try {
      const response = await maquinasService.crear(datosWatch);
      if (response.data.data.messageStatus == '1') {
        ToastSuccessGuardado();
        MaquinasGetData();
        VisibilidadTabla();
        reset(defaultMaquinasValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError('Error inesperado');
    }
  };

  // Peticion para eliminar un registro
  const MaquinasEliminar = async () => {
    try {
      const response = await maquinasService.eliminar(datosWatch);
      if (response.data.data.messageStatus == '1') {
        ToastSuccessEliminar();
        MaquinasGetData();
        reset(defaultMaquinasValues);
        setEliminar(!Eliminar);
      }
    } catch (error) {
      ToastError();
    }
  };

  // Peticion para editar un registro
  const MaquinasEdit = async () => {
    try {
      const response = await maquinasService.editar(datosWatch);
      if (response.data.data.messageStatus === '1') {
        ToastSuccessEditar();
        MaquinasGetData();
        VisibilidadTabla();
        reset(defaultMaquinasValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  // Controlador del formulario
  const GuardarMaquina = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        MaquinasCreate();
      } else {
        MaquinasEdit();
      }
    } else {
      ToastWarning();
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/86vkzPQ/MAQUINAS.png"
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
              onClick={(e) => handleClick(e, 'csv')}
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
            <Menu
              anchorEl={anchorEl['csv']} // Accede al menu anchor usando el ID
              open={Boolean(anchorEl['csv'])}
              onClose={() => handleClose('csv')} // Cierra el menu usando el ID
            >
              <MenuItem>
                <Button
                  onClick={handleExportData}
                  color="primary"
                  startIcon={<FileTextFilled />}>
                  Archivo CSV</Button>

              </MenuItem>
              {/* Exportar a PDF */}
              <MenuItem>
                <PDFGenerator data={ExportData} />
              </MenuItem>

              {/* Exportar a Excel */}
              <MenuItem>
                <ExportToExcel data={ExportData} />
              </MenuItem>
            </Menu>
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
            />     </Grid>
            </Grid>
  
  
        </CardContent>

        {/* Declaracion de la tabla */}
        <div className="center" style={{ width: '95%', margin: 'auto' }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            scroll={{ x: true }}
            size="small"
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar',
              emptyText: LoadingIcon(),
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
                  <Chip label={editar ? 'Editar Máquina' : 'Agregar Máquina'} />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.maqu_NumeroSerie}>Número de Serie</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{}}
                        error={!!errors.maqu_NumeroSerie}
                      />
                    )}
                    name="maqu_NumeroSerie"
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.mmaq_Id}>Modelo de la Máquina</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="mmaq_Id"
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        options={Modelos_DDL}
                        disableClearable={true}
                        value={datosWatch.mmaq_Id ?? null}
                        onChange={(event, value) => {
                          setValue('mmaq_Id', value);
                        }}
                        renderInput={(params) => <TextField {...params} error={!!errors.mmaq_Id} />}
                      />
                    )}
                    name="mmaq_Id"
                    error={!!errors.mmaq_Id}
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.modu_Id}>Módulo</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="modu_Id"
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        options={Modulos_DDL}
                        disableClearable={true}
                        value={datosWatch.modu_Id ?? null}
                        onChange={(event, value) => {
                          setValue('modu_Id', value);
                        }}
                        renderInput={(params) => <TextField {...params} error={!!errors.modu_Id} />}
                      />
                    )}
                    name="modu_Id"
                    error={!!errors.modu_Id}
                    control={control}
                  />
                </FormControl>
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
                  onClick={GuardarMaquina}
                >
                  {editar ? 'Editar' : 'Guardar'}
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
              color="error"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              onClick={MaquinasEliminar}
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


      {/* Inicia Ver Qr*/}
      <Dialog
        open={verQr}

        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">Confirmación de Eliminación</DialogTitle> */}
        <DialogContent sx={{ justifyContent: 'center', justifyItems: 'center' }} className="mx-auto">
          <QRCode
          size={233}
          value={qr || '-'} />
        </DialogContent>
        <DialogActions     className="mx-auto">
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
              onClick={() => {
                setVerQr(!verQr)
              }}
            >
              Cerrar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Fin Ver Qr*/}

      {/* Inicia del collapse Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-center',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginBottom: '10px' }}>
                <Chip label="Detalles de la Máquina" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Id de la Máquina:
                  </Typography>
                  <Typography>{DatosDetalles.maqu_Id}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Código de la Máquina:
                  </Typography>
                  <Typography>{DatosDetalles.maqu_NumeroSerie}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Nombre de la Máquina:
                  </Typography>
                  <Typography>{DatosDetalles.mmaq_Nombre}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>Módulo:</Typography>
                  <Typography>{DatosDetalles.modu_Nombre}</Typography>
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
                      {DatosDetalles.maqu_FechaCreacion
                        ? new Date(DatosDetalles.maqu_FechaCreacion).toLocaleString()
                        : ''}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.usuarioModificacionNombre}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.maqu_FechaModificacion
                        ? new Date(DatosDetalles.maqu_FechaModificacion).toLocaleString()
                        : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br />
            <Grid item xs={12}>
              <div className="card-footer">
                <Button
                  variant="contained"
                  style={{ position: "fixed", top: "76%", right: "5%" }}
                  onClick={() => {
                    CollapseDetalles()
                  }}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Fin del Collapse Detalles */}
    </Card>
  );
}

export default MaquinasIndex;
