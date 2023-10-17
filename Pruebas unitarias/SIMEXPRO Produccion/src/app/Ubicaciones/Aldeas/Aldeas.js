/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

import {
  Autocomplete,
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";

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
import AldeasService from "./AldeasService";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
  ToastError,
  ToastSuccess,
  ToastSuccessEditar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste
} from "src/styles/toastsFunctions";

/* Campos del formulario*/
const defaultaldeasValues = {
  id: "", //id necesario para el editar
  alda_Nombre: "",
  ciudad: null, //para los campos que son ddl poner null
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  alda_Nombre: yup.string().trim().required(""),
  ciudad: yup.object().required(""),
});

function AldeasIndex() {
  const aldeasService = AldeasService();
  //Variables DDL
  const [ciudades_DDL, setCiudades_DDL] = useState([]);


  //Cargado de las variables DDL
  async function ddls() {
    setCiudades_DDL(await aldeasService.ciudadDDL());
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
    reset(defaultaldeasValues);
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

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    //insertar aca las variables necesarias en su formulario
    setValue("id", datos["alde_Id"]);
    setValue("alda_Nombre", datos["alde_Nombre"]);
    setValue(
      "ciudad",
      ciudades_DDL.flatMap(provincia => provincia.options).find(ciudad => ciudad.value === datos["ciud_Id"])
    );
    handleClose(datos.alde_Id);
  };

  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.alde_Id);
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
      title: "Nombre de la aldea",
      dataIndex: "alde_Nombre",
      key: "alde_Nombre",
      sorter: (a, b) => a.alde_Nombre.localeCompare(b.alde_Nombre), //sorting para Letras
    },
    {
      title: "Ciudad a la que pertenece",
      dataIndex: "ciud_Nombre",
      key: "ciud_Nombre",
      sorter: (a, b) => a.ciud_Nombre.localeCompare(b.ciud_Nombre), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.alde_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.alde_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.alde_Id)}
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
              id={`menu-${params.alde_Id}`} aldeasEdit
              anchorEl={anchorEl[params.alde_Id]}
              keepMounted
              open={Boolean(anchorEl[params.alde_Id])}
              onClose={() => handleClose(params.alde_Id)}
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
      label: 'Nombre de la aldea'
    },
    {
      label: 'Ciudad a la que pertenece'
    }
  ]
  const csvOptions = {
    filename: 'Aldeas',
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
  const camposToFilter = ["key", "alde_Nombre", "ciud_Nombre"];

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
  }).reverse()

  // Antes de editar
  //   const searchTextBeforeEdit = searchText;

  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultaldeasValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(accountSchema), //Esquema del formulario
    });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  const [cargandoData, setCargandoData] = useState([]);
  //Peticion para cargar datos de la tabla
  const aldeasGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      const data = await aldeasService.listar();
      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await aldeasService.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };
  const [ExportData, SetExportData] = useState([]);

  //Peticion para crear un registro
  const aldeasCreate = async () => {
    try {
      const response = await aldeasService.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();
        setSearchText("");
        aldeasGetData();
        VisibilidadTabla();
        reset(defaultaldeasValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {

      ToastError();
    }
  };


  // Peticion para editar un registro
  const aldeasEdit = async () => {
    try {
      const response = await aldeasService.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        setSearchText(datosWatch.alda_Nombre); //despues de editar
        aldeasGetData();
        VisibilidadTabla();
        reset(defaultaldeasValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {

      ToastError();
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    aldeasGetData();
  }, []);

  //Controlador del formulario
  const GuardarAldea = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        aldeasCreate();
      } else {
        aldeasEdit();
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
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/PQVXCCM/ALDEAS.png"
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
          {/* Botón de Nuevo Inicio*/}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'start' } }} >
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
              {/* Botón de Nuevo Fin */}
            </Grid>

            {/* Filtros de la tabla (Filas/Buscar) */}
            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'end', md: 'end' } }} >
              <label className='mt-8'>Filas por página:</label>
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

            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'start', md: 'center' } }} >
              {/* Barra de Busqueda en la Tabla */}
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
                    label={editar ? "Editar Aldea" : "Agregar Aldea"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={6}>

                <FormControl fullWidth>
                  <FormLabel error={!!errors.ciudad}>Ciudad:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="ciudad"
                        isOptionEqualToValue={(option, value) =>
                          option.value === value?.value
                        }
                        options={ciudades_DDL.flatMap(provincia => provincia.options)}
                        disableClearable={true}
                        groupBy={(option) => option.provincia}
                        getOptionLabel={(option) => option.label}
                        value={datosWatch.ciudad ?? null}
                        onChange={(event, value) => {
                          setValue("ciudad", value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.ciudad} />
                        )}
                      />
                    )}
                    name="ciudad"
                    error={!!errors.ciudad}
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.alda_Nombre}>Nombre de la Aldea:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.alda_Nombre}
                      ></TextField>
                    )}
                    name="alda_Nombre"
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
                  onClick={GuardarAldea}
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

      {/* Inicia del collapse Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}>

          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la aldea" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id de la aldea:
                  </Typography>
                  <Typography>{DatosDetalles["alde_Id"]}</Typography>
                </InputLabel>
                </Box>
             </Grid>  

             <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la Aldea:
                  </Typography>
                  <Typography>{DatosDetalles["alde_Nombre"]}</Typography>
                </InputLabel>
                </Box>
             </Grid>    

             <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Provincia:
                  </Typography>
                  <Typography>{DatosDetalles["pvin_Nombre"]}</Typography>
                </InputLabel>
                </Box>
             </Grid>   

             <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ciudad:
                  </Typography>
                  <Typography>{DatosDetalles["ciud_Nombre"]}</Typography>
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
                      {DatosDetalles["alde_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["alde_FechaCreacion"]
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
                      {DatosDetalles["alde_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["alde_FechaModificacion"]
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
      {/* Fin del Collapse Detalles */}
    </Card>
  );
}

export default AldeasIndex;
