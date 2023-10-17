/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField
} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
//Imports tabla
import { Table } from "antd";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import CiudadesService from './CiudadesServices';
//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import {
  ToastError,
  ToastSuccessEditar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste
} from "src/styles/toastsFunctions";

function CiudadesIndex() {
  const load_DDLs = Load_DDLs()
  const ciudadService = CiudadesService();
  const [ExportData, SetExportData] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([])

  const [PaisDDL, setPaisDDL] = useState([]);
  //Cargado de las variables DDL
  async function ddls() {
    setPaisDDL(await load_DDLs.paises());
  }
  //Cargado de ddl de provincias
  const [ProvinciaDDL, setProvinciaDDL] = useState([]);
  async function ddlProvincia(id) {
    try{
      setProvinciaDDL(await load_DDLs.ProvinciasPorPais(id));
    }catch(error){

    }
  }

  //Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  //Variable que guarda los datos de detalles
  const [DatosDetalles, setDatosDetalles] = useState({});


  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    ciudadesGetData();
    ddls();
  }, []);


  const DefaultCiudades = {
    id: "",
    pais: null,
    provincia: null,
    nombreCuidad: "",
  };

  const schema = yup.object().shape({
    id: yup.string(),
    pais: yup.object().required(""),
    provincia: yup.object().required(""),
    nombreCuidad: yup.string().trim().required(""),
  });


  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    DefaultCiudades,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };


  const handleEdit = async (datos) => {
    handleClose(datos.ciud_Id);
    MostrarCollapseEditar()
    setEditar(true);
    //insertar aca las variables necesarias en su formulario
    setValue("id", datos.ciud_Id);
    setValue("nombreCuidad", datos["ciud_Nombre"]);
    setValue('pais', { value: datos["pais_Id"], label: datos["pais_Codigo"] + ' - ' + datos["pais_Nombre"] })
    ddlProvincia(datos["pais_Id"])
    setValue('provincia', { value: datos["pvin_Id"], label: datos["pvin_Nombre"] })

  };


  const handleDetails = (datos) => {
    setDatosDetalles(datos);
    MostrarCollapseDetalles();
    handleClose(datos.ciud_Id);
  };

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(DefaultCiudades);
  };
  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(DefaultCiudades);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const handleDelete = (id) => {
    DialogEliminar(id)
    handleClose(id);
  };


  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };


  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key
    },
    {
      title: 'Nombre de la ciudad',
      dataIndex: 'ciud_Nombre',
      key: 'ciud_Nombre',
      sorter: (a, b) => a.ciud_Nombre.localeCompare(b.ciud_Nombre),
    },
    {
      title: 'Provincia a la que pertenece',
      dataIndex: 'pvin_Nombre',
      key: 'pvin_Nombre',
      sorter: (a, b) => a.pvin_Nombre.localeCompare(b.pvin_Nombre),
    },
    {
      title: 'País al que pertenece',
      dataIndex: 'pais_Nombre',
      key: 'pais_Nombre',
      sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.ciud_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.ciud_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.ciud_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.ciud_Id}`}
              anchorEl={anchorEl[params.ciud_Id]}
              keepMounted
              open={Boolean(anchorEl[params.ciud_Id])}
              onClose={() => handleClose(params.ciud_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
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
        label: 'Nombre de la Ciudad'
    },  
    {
        label: 'Provincia a la que pertenece'
    },
    {
      label: 'País al que pertenece'
    }

    
]
const csvOptions = { 
    filename: 'Ciudades',
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

  const [cargandoData, setCargandoData] = useState([]);
  //Peticion para cargar datos de la tabla
  const ciudadesGetData = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);
      const data = await ciudadService.listar();
      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await ciudadService.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los DefaultCiudades])
  const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(DefaultCiudades);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };



  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "ciud_Nombre", "pvin_Nombre", "pais_Nombre"];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
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

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    reset(DefaultCiudades);
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);

  };

  //Peticion para crear un registro
  const ciudadesCreate = async () => {
    try {
      const response = await ciudadService.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();
        setSearchText("")
        ciudadesGetData();
        VisibilidadTabla();
        reset(DefaultCiudades);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  // Peticion para editar un registro
  const ciudadesEdit = async () => {
    try {
      const response = await ciudadService.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        if(searchText != ""){setSearchText(datosWatch.nombreCuidad)}
        else{setSearchText("")}
        ciudadesGetData();
        CerrarEditar();
        reset(DefaultCiudades);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };


  const GuardarCiudad = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        ciudadesCreate();
      } else {
        ciudadesEdit();
      }
    } else {
      ToastWarning();
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
        image="https://i.ibb.co/VqQ04b8/CIUDADES.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
            {/* Botón de Nuevo */}
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
                MostrarCollapseAgregar();
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
    <PDFGenerator data={filteredRows} handleCloseExportar={handleCloseExportar} />

    {/* Exportar a Excel */}
    <ExportToExcel data={ExportData} handleCloseExportar={handleCloseExportar} />
  </Menu>
</div>

          </Stack>
          
          </Grid>

{/* Filtros de la tabla (Filas/Buscar) */}
            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'end', md:'end'}}} >

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
                <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'start', md:'center'}}} >
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
      </Collapse>


      {/* Tabla */}
      <Collapse in={mostrarIndex}>
        <div className='center' style={{ width: '95%', margin: 'auto' }}>
        <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            scroll={{ x: true }}
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
      {/* Tabla */}


      {/* Formulario Agregar */}
    <form onSubmit={handleSubmit((_data) => {})}>
    <Collapse in={mostrarAdd}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={editar ? "Editar ciudad" : "Agregar ciudad"}
                  />
                </Divider>
            </Grid>

              <Grid item xs={6} >
                <FormControl fullWidth>
                  <FormLabel error={!!errors.pais}>País:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                      {...field}
                      isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                      }
                      id="pais"
                      disableClearable={true}
                      options={PaisDDL}
                      value={datosWatch["pais"] ?? null}
                      onChange={async (event, value) => {
                          setValue('pais', value)
                          setValue('provincia', null)
                          ddlProvincia(value?.value)
                          if (!value) { setValue('pvin_Id', []) }
                      }}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              error={!!errors.pais}
                              InputLabelProps={{ shrink: true }}
                          />
                      )}
                    />
                    )}
                    name="pais"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6} >
                <FormControl fullWidth>
                  <FormLabel error={!!errors.provincia}>Provincia:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="provincia"
                        isOptionEqualToValue={(option, value) =>
                          option.value === value?.value
                        }
                        options={ProvinciaDDL}
                        disableClearable={true}
                        value={datosWatch.provincia ?? null}
                        onChange={(event, value) => {
                          setValue("provincia", value);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} error={!!errors.provincia} InputLabelProps={{ shrink: true }}/>
                        )}
                      />
                    )}
                    name="provincia"
                    control={control}
                  />
                </FormControl>
              </Grid>


              <Grid item xs={6}>
              <FormLabel error={!!errors.nombreCuidad}>Nombre de la Ciudad: </FormLabel>
                <Controller render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.nombreCuidad}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                  name='nombreCuidad'
                  control={control} />
              </Grid>


              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  onClick={GuardarCiudad}
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                  type='submit'
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
      {/* Formulario Agregar */}

      {/* Collapse para el formulario de editar un registro inicio*/}
      <Collapse in={mostrarEditar}>
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
                    label={editar ? "Editar ciudad" : "Agregar ciudad"}
                  />
                </Divider>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <FormLabel error={!!errors.pais}>País:</FormLabel>
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                      }
                      id="pais"
                      disableClearable={true}
                      options={PaisDDL}
                      value={datosWatch["pais"] ?? null}
                      onChange={async (event, value) => {
                          setValue('pais', value)
                          setValue('provincia', null)
                          ddlProvincia(value?.value)
                          if (!value) { setValue('pvin_Id', []) }
                      }}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              error={!!errors.pais}
                              InputLabelProps={{ shrink: true }}
                          />
                      )}
                  />
                  )}
                  name="pais"
                  control={control}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <FormLabel error={!!errors.provincia}>Provincia:</FormLabel>
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="provincia"
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                      options={ProvinciaDDL}
                      disableClearable={true}
                      value={datosWatch.provincia ?? null}
                      onChange={(event, value) => {
                        setValue("provincia", value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} error={!!errors.provincia} 
                        InputLabelProps={{ shrink: true }}/>
                      )}
                    />
                  )}
                  name="provincia"
                  control={control}
                />
              </FormControl>
            </Grid>


            <Grid item xs={6}>
            <FormLabel error={!!errors.nombreCuidad}>Nombre de la Ciudad:</FormLabel>
              <Controller render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.nombreCuidad}
                  InputLabelProps={{ shrink: true }}
                />
              )}
                name='nombreCuidad'
                control={control} />
            </Grid>


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
                onClick={GuardarCiudad}
                type='submit'
              >
                Editar
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
                onClick={CerrarEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para el formulario de editar un registro fin*/}



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
            <Grid item xs={12}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la Ciudad" />
              </Divider>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id de la Ciudad:
                  </Typography>
                  <Typography>{DatosDetalles["ciud_Id"]}</Typography>
                  </InputLabel>
              </Box>
            </Grid>



            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la Ciudad:
                  </Typography>
                  <Typography>{DatosDetalles["ciud_Nombre"]}</Typography>
                  </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Provincia a la que pertenece:
                  </Typography>
                  <Typography>{DatosDetalles["pvin_Nombre"]}</Typography>
                  </InputLabel>
              </Box>
            </Grid>

                <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    País al que pertenece:
                  </Typography>
                  <Typography>{DatosDetalles["pais_Nombre"]}</Typography>
                  </InputLabel>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <table
                id="detallesTabla"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
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
                      <Icon style={estilosTablaDetalles.iconStyle}>
                        date_range
                      </Icon>
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
                      {DatosDetalles["usuarioCreacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["ciud_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["ciud_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificadorNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["ciud_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["ciud_FechaModificacion"]
                        ).toLocaleString()
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
                  onClick={() => {
                    CerrarDetalles();
                  }}
                  startIcon={<Icon>arrow_back</Icon>}>
                  Regresar</Button>
                <br />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Fin del Collapse Detalles */}

    </Card>
  );
}

export default CiudadesIndex;




