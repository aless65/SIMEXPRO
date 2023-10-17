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
  Typography
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ColorPicker from 'react-pick-color';


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
import ColoresServices from "./ColoresService";
//import Toast
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import "react-toastify/dist/ReactToastify.css";
import {
  ToastError,
  ToastSuccessEditar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste
} from "src/styles/toastsFunctions";

import { color } from "@mui/system";
import ExportToExcel from "./ColoresExcel";
import PDFGenerator from "./ColoresPDF";


/* Campos del formulario*/
const defaultColoresValues = {
  id: "", //id necesario para el editar
  colr_Nombre: "",
  colr_Codigo: "",
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  colr_Nombre: yup.string().trim().required(""),
  colr_Codigo: yup.string().trim().required(""),
  
});

function ColoresIndex() {
  const coloresService = ColoresServices();
  const [ExportData, SetExportData] = useState([]);

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

  const [mostrarColorPicker, setMostrarColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3573CB');



  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultColoresValues);
    setSelectedColor('');
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
    setValue("id", datos["colr_Id"]);
    setValue("colr_Nombre", datos["colr_Nombre"]);
    setValue("colr_Codigo", datos["colr_Codigo"]);
    setSelectedColor(datos.colr_CodigoHtml);
    handleClose(datos.colr_Id);
  };

  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.colr_Id);
  };

  //Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
  const handleDelete = (datos) => {
    // en caso de ocupar eliminar
    handleClose(datos.colr_Id);
  };
  const handleOpenColorPicker = () => {
    setMostrarColorPicker(true);
  };

  // Función para cerrar el cuadro de diálogo de selección de color y guardar el valor seleccionado
  const handleCloseColorPicker = () => {
    setMostrarColorPicker(false);
    setSelectedColor('');
  };
   
  const handleCloseColorPicker1 = () => {
    setMostrarColorPicker(false);   
  };



  //Constante de las columnas del index
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Nombre del color",
      dataIndex: "colr_Nombre",
      key: "colr_Nombre",
      sorter: (a, b) => a.colr_Nombre.localeCompare(b.colr_Nombre), //sorting para Letras
    },
    {
      title: "Código del color",
      dataIndex: "colr_Codigo",
      key: "colr_Codigo",
      sorter: (a, b) => a.colr_Codigo.localeCompare(b.colr_Codigo), //sorting para Letras
    },
    {
      title: "Color",
      dataIndex: "colr_CodigoHtml",
      key: "colr_CodigoHtml",
      render: (text) => (
        <div style={{ backgroundColor: text, width: '80px', height: '20px' }}></div>
      ),
      sorter: (a, b) => a.colr_CodigoHtml.localeCompare(b.colr_CodigoHtml),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.colr_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.colr_Id)}
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
              id={`menu-${params.colr_Id}`}
              anchorEl={anchorEl[params.colr_Id]}
              keepMounted
              open={Boolean(anchorEl[params.colr_Id])}
              onClose={() => handleClose(params.colr_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {/* <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>ㅤEliminar
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
      label: 'Nombre del color'
    },
    {
      label: 'Código del color'
    },
  ]

  const csvOptions = {  
    filename: 'Colores',
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
  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "colr_Nombre", "colr_Codigo"];

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

  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultColoresValues, //Campos del formulario
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
  const coloresGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const data = await coloresService.listar();

      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await coloresService.ExportData())
    } catch (error) {
      setCargandoData(null)
    }
  };


  //Peticion para crear un registro
  const coloresCreate = async () => {
    try {
      const datos = {
        colr_Nombre: datosWatch.colr_Nombre,
        colr_Codigo: datosWatch.colr_Codigo,
        colr_CodigoHtml: selectedColor,
      };
      const response = await coloresService.crear(datos);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();
        coloresGetData();
        VisibilidadTabla();
        reset(defaultColoresValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  // Peticion para editar un registro
  const coloresEdit = async () => {
    try {
      const datos = {
        colr_Id: datosWatch.id,
        colr_Nombre: datosWatch.colr_Nombre,
        colr_Codigo: datosWatch.colr_Codigo,
        colr_CodigoHtml: selectedColor,
      };
      const response = await coloresService.editar(datos);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        coloresGetData();
        VisibilidadTabla();
        setSearchText("");
        reset(defaultColoresValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    coloresGetData();
  }, []);

  //Controlador del formulario
  const GuardarColores = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        coloresCreate();
      } else {
        coloresEdit();
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
        image="https://i.ibb.co/W6w7h2L/COLORES.png"
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
          {/* Botón de Nuevo Inicio*/}    <Grid container spacing={1}>
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
                setEditar();
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
            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'end', md:'end'}}} >
          <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                // label="Filas"  
                onChange={handleChangeFilas}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
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
            {/* Barra de Busqueda en la Tabla fin */}
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

      {/* Inicio del Formulario */}
      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAdd}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column", // Cambia la dirección de flex a columna
              alignItems: "center", // Centra los elementos en el eje horizontal
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip label={editar ? "Editar Color" : "Agregar Color"} />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.colr_Nombre}>
                    Nombre del Color:
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.colr_Nombre}
                      ></TextField>
                    )}
                    name="colr_Nombre"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.colr_Codigo}>
                    Codigo del color:
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                          
                        }}
                        error={!!errors.colr_Codigo}
                      ></TextField>
                    )}
                    name="colr_Codigo"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.colr_CodigoHtml}>Color:
                  </FormLabel>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="outlined-disabled"
                      inputProps={{
                        maxLength: 150,
                      }}
                      error={!!errors.colr_CodigoHtml}
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      disabled={true} // Agregar esta línea para desactivar el TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="add"
                              onClick={handleOpenColorPicker}
                            >
                              <img
                                src="https://th.bing.com/th/id/OIP.qtDHNUyf4d0E0SHEFDsTBQHaGX?pid=ImgDet&rs=1"
                                alt="Agregar"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
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
                  onClick={GuardarColores}
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

      {/*Habre el dialog que desprende el color picker */}
      <Dialog
        open={mostrarColorPicker}
        onClose={handleCloseColorPicker}
      >
        <DialogTitle>Seleccionar color</DialogTitle>
        <DialogContent>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "15px" }}>
            <FormControl fullWidth>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Controller
                  render={({ field }) => (
                    <ColorPicker
                      {...field}
                      color={selectedColor}
                      onChange={(newColor) => {
                        setSelectedColor(newColor.hex); // Actualiza el estado con el nuevo color
                      }}
                    />
                  )}
                  name="color"
                  control={control}
                />
                {/* Puedes ajustar los estilos según sea necesario */}
              </div>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseColorPicker}>Cancelar</Button>
          <Button onClick={handleCloseColorPicker1}>Aceptar</Button>
        </DialogActions>
      </Dialog>


      {/* Collapse para el formulario de agregar un registro fin*/}

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
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={DialogEliminar}
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
                <Chip label="Detalles del Color" />
              </Divider>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del Color:
                  </Typography>
                  <Typography>{DatosDetalles["colr_Id"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del Color:
                  </Typography>
                  <Typography>{DatosDetalles["colr_Nombre"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="Codigo color">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Codigo del color:
                  </Typography>
                  <Typography>{DatosDetalles["colr_Codigo"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="Codigo html">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Codigo Html:
                  </Typography>
                  <Typography style={{ color: DatosDetalles["colr_CodigoHtml"] }}>
                    {DatosDetalles["colr_CodigoHtml"]}
                  </Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
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
                      Accion
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
                      {DatosDetalles["usuarioNombreCreacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["colr_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["colr_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioNombreModificacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["colr_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["colr_FechaModificacion"]
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
                  onClick={CollapseDetalles}
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

export default ColoresIndex;
