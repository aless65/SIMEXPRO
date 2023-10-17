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

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from 'moment';

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import SearchIcon from "@mui/icons-material/Search";
import { ExportToCsv } from 'export-to-csv';
import * as React from "react";
import { useEffect, useState } from "react";
import ExportToExcel from "./MaquinaHistorialExcel";
import PDFGenerator from "./MaquinaHistorialPDF";

//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
//Imports tabla
import { Table } from "antd";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import MaquinaHistorialService from "./MaquinaHistorialService";
//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
  ToastError,
  ToastErrorRegistroEnUso,
  ToastSuccessEliminar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste,
  ToastSuccessEditar
} from "src/styles/toastsFunctions";

/* Campos del formulario*/

const defaultValues = {
  mahi_Id: "", //id necesario para el editar
  maquina: null, //para los campos que son ddl poner null
  mahi_FechaInicio: null,
  mahi_FechaFin: null,
  mahi_Observaciones: "",
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  mahi_Id: yup.string(),
  maquina: yup.object().required(""),
  mahi_FechaInicio: yup.date().required(""),
  mahi_FechaFin: yup.date().required("").nullable().min(yup.ref("mahi_FechaInicio"), "Ingrese una fecha mayor a la fecha de Inicio"),
  mahi_Observaciones: yup.string().trim().required(""),
});

function MaquinasHistorialIndex() {
  const [ExportData, SetExportData] = useState([]);
  const load_DDLs = Load_DDLs();
  const maquinaHistorialService = MaquinaHistorialService();
  //Variables DDL
  const [maquinas_DDL, setMaquinas_DDL] = useState([]);

  //Cargado de las variables DDL
  async function ddls() {
    setMaquinas_DDL(await load_DDLs.Maquinas());
  }

  //variable para la barra de busqueda
  const [searchText, setSearchText] = useState("");

  //Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Variable donde se guardan los datos del detalle seleccionado
  const [DatosDetalles, setDatosDetalles] = useState({});

  //variable para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  //Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  //Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultValues);
  };

  //Controlador del dialog(modal) eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Controlador del collapse detalles
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  //abre el menu al cual se le dio click
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Cierra el menu abierto
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Estilos del uso del tooltip
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#6a2b85',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#6a2b85',
      textAlign: 'justify'
    },
  }));

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setValue("mahi_Id", datos["mahi_Id"]);
    setValue(
      "maquina",
      maquinas_DDL.find((maquinas_DDL) => maquinas_DDL.value === datos["maqu_Id"]) //importante para cargar bien los ddl al editar
    );
    var formatFechaInicio = moment(datos["mahi_FechaInicio"], 'DD/MM/YYYY, HH:mm:ss');
    var fechainicio = formatFechaInicio.format('MMMM DD, YYYY HH:mm:ss');
    setValue("mahi_FechaInicio", fechainicio);

    var formatFechaFin = moment(datos["mahi_FechaFin"], 'DD/MM/YYYY, HH:mm:ss');
    var fechafin = formatFechaFin.format('MMMM DD, YYYY HH:mm:ss');
    setValue("mahi_FechaFin", fechafin);

    setValue("mahi_Observaciones", datos["mahi_Observaciones"]);
    handleClose(datos.mahi_Id);
  };

  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.mahi_Id);
  };

  //Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
  const handleDelete = (datos) => {
    // en caso de ocupar eliminar
    setValue("mahi_Id", datos["mahi_Id"]);
    DialogEliminar();
    handleClose(datos.mahi_Id);
  };

  {
    /* Columnas de la tabla */
  }

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "No. de serie de Máquina",
      dataIndex: "maquinaNumeroSerie",
      key: "maquinaNumeroSerie",
      sorter: (a, b) => a.maquinaNumeroSerie.localeCompare(b.maquinaNumeroSerie), //sorting para Letras
    },
    {
      title: "Fecha Inicio",
      dataIndex: "mahi_FechaInicio",
      key: "mahi_FechaInicio",
      sorter: (a, b) => a.mahi_FechaInicio.localeCompare(b.mahi_FechaInicio), //sorting para Letras
    },
    {
      title: "Fecha Fin",
      dataIndex: "mahi_FechaFin",
      key: "mahi_FechaFin",
      sorter: (a, b) => a.mahi_FechaFin.localeCompare(b.mahi_FechaFin), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.mahi_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.mahi_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.mahi_Id)}
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
              id={`menu-${params.mahi_Id}`}
              anchorEl={anchorEl[params.mahi_Id]}
              keepMounted
              open={Boolean(anchorEl[params.mahi_Id])}
              onClose={() => handleClose(params.mahi_Id)}
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
      ),
    },
  ];


  const csvHeader = [
    {
      label: 'No.',
    },
    {
      label: 'No. de serie de Máquina'
    },
    {
      label: 'Fecha Inicio'
    },
    {
      label: 'Fecha Fin'
    },
  ]

  const csvOptions = {
    filename: 'Historial_Maquinas',
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

  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "maquinaNumeroSerie", "mahi_FechaInicio", "mahi_FechaFin", "mahi_Observaciones"];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
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
  });

  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(accountSchema), //Esquema del formulario
    });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Peticion para cargar datos de la tabla
  const MaquinasHistorialGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const data = await maquinaHistorialService.listar();

      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await maquinaHistorialService.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  //Peticion para crear un registro
  const MaquinasHistorialCreate = async () => {
    try {
      const response = await maquinaHistorialService.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();
        MaquinasHistorialGetData();
        reset(defaultValues);
        VisibilidadTabla();
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  // Peticion para editar un registro
  const MaquinasHistorialEdit = async () => {
    try {
      const response = await maquinaHistorialService.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        MaquinasHistorialGetData();
        VisibilidadTabla();
        setSearchText("");
        reset(defaultValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  const MaquinasHistorialDelete = async () => {
    try {
      const response = await maquinaHistorialService.eliminar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        DialogEliminar();
        ToastSuccessEliminar();
        MaquinasHistorialGetData();
        reset(defaultValues);
      } else if (response.data.data.messageStatus.includes("0")) {
        DialogEliminar();
        ToastErrorRegistroEnUso();
      }
    } catch (error) {
      DialogEliminar();
      ToastError();
    }
  }

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    MaquinasHistorialGetData();
  }, []);

  //Controlador del formulario
  const GuardarMaquinaHistorial = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        MaquinasHistorialCreate();
      } else {
        MaquinasHistorialEdit();
      }
    } else {
      ToastWarning("Completa todos los campos");
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
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/x3Dpksj/HISTORIAL-DE-M-QUINA.png"
        alt="Encabezado de la carta"
      />
      {/* Inicio del Collapse incial (Tabla/Index) */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
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
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
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
     </Grid>
          </Grid>


        </CardContent>

        {/* Declaracion de la tabla */}
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
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
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={editar ? "Editar Maquina Historial" : "Agregar Maquina Historial"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.maquina}>No. de Serie Maquina:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="maquina"
                        isOptionEqualToValue={(option, value) =>
                          option.value === value?.value
                        }
                        options={maquinas_DDL}
                        disableClearable={true}
                        value={datosWatch.maquina ?? null}
                        onChange={(event, value) => {
                          setValue("maquina", value);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} error={!!errors.maquina} />
                        )}
                      />
                    )}
                    name="maquina"
                    error={!!errors.maquina}
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="mahi_FechaInicio"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.mahi_FechaInicio}
                      fullWidth={true}
                    >
                      <FormLabel >
                        Fecha Inicio:
                      </FormLabel>
                      <DateTimePicker
                        onChange={(date) => field.onChange(date)}
                        value={field.value || null}
                        required
                        renderInput={(_props) => (
                          <TextField
                            className="w-full"
                            {..._props}
                            onBlur={field.onBlur}
                            error={!!errors.mahi_FechaInicio}
                          />
                        )}
                        className="w-full"
                      />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="mahi_FechaFin"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.mahi_FechaFin}
                      fullWidth={true}
                    >
                      <FormLabel >
                        Fecha Fin:
                      </FormLabel>
                      <DateTimePicker
                        onChange={(date) => field.onChange(date)}
                        value={field.value || null}
                        required
                        renderInput={(_props) => (
                          <TextField
                            className="w-full"
                            {..._props}
                            onBlur={field.onBlur}
                            error={!!errors.mahi_FechaFin}
                            helperText={
                              errors?.mahi_FechaFin?.message.includes("NaN")
                                ? null : errors?.mahi_FechaFin?.message == "mahi_FechaFin must be a `date` type, but the final value was: `Invalid Date`."
                                  ? " " : errors?.mahi_FechaFin?.message == "mahi_FechaFin must be a `date` type, but the final value was: `Invalid Date` (cast from the value `Invalid Date`)."
                                    ? "Ingrese una fecha valida" : errors?.mahi_FechaFin?.message}
                          />
                        )}
                        className="w-full"
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.mahi_Observaciones}>Observaciones:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.mahi_Observaciones}
                      ></TextField>
                    )}
                    name="mahi_Observaciones"
                    control={control}
                  ></Controller>
                </FormControl>
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
                  type="submit"
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarMaquinaHistorial}
                >
                  Guardar
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
              style={{ borderRadius: '10px', marginRight: '10px' }}

              onClick={MaquinasHistorialDelete}
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

      {/* Collapse de los Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles de la Maquina Historial" />
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
                    Id del Historial de Maquina:
                  </Typography>
                  <Typography>{DatosDetalles["mahi_Id"]}</Typography>
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
                    Numero de Serie de la Maquina:
                  </Typography>
                  <Typography>{DatosDetalles["maquinaNumeroSerie"]}</Typography>
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
                <InputLabel htmlFor="empl_DNI">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Fecha de Inicio:
                  </Typography>
                  <Typography>{DatosDetalles["mahi_FechaInicio"]}</Typography>
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
                <InputLabel htmlFor="empl_Sexo">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Fecha Final:
                  </Typography>
                  <Typography>{DatosDetalles["mahi_FechaFin"]}</Typography>
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
              <Grid xs={12} >
                <Box sx={{ textAlign: "center" }}>
                  <InputLabel htmlFor="escv_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Observaciones:
                    </Typography>
                    <BootstrapTooltip title={DatosDetalles["mahi_Observaciones"]}>
                      <Typography noWrap>
                        {DatosDetalles["mahi_Observaciones"]}
                      </Typography>
                    </BootstrapTooltip>
                  </InputLabel>
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
                      {DatosDetalles["mahi_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["mahi_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificaNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["mahi_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["mahi_FechaModificacion"]
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
                <Button
                  variant="contained"
                  style={{ position: "fixed", top: "76%", right: "5%" }}
                  onClick={CollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
                <br></br>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar los detalles de un registro fin */}
    </Card>
  );
}
export default MaquinasHistorialIndex;