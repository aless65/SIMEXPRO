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

import SearchIcon from "@mui/icons-material/Search";
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
import TallasServices from "./TallasService";
//Import ddls
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
import ExportToExcel from "./TallasExcel";
import PDFGenerator from "./TallasPDF";


/* Campos del formulario*/
const defaultValues = {
  tall_Id: "", //id necesario para el editar
  tall_Codigo: "", 
  tall_Nombre: "",
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  tall_Id: yup.string(),
  tall_Codigo: yup.string().trim().required(""),
  tall_Nombre: yup.string().trim().required(""),
});

function TallasIndex() {
  const [ExportData, SetExportData] = useState([]);
  const tallasServices = TallasServices();
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

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setValue('tall_Id',datos.tall_Id)
    setValue('tall_Codigo',datos.tall_Codigo)
    setValue('tall_Nombre',datos.tall_Nombre)
    handleClose(datos.tall_Id);
  };

  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.tall_Id);
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
      title: "Código de la talla",
      dataIndex: "tall_Codigo",
      key: "tall_Codigo",
      sorter: (a, b) => a.tall_Codigo.localeCompare(b.tall_Codigo), //sorting para Letras
    },
    {
      title: "Descripción de la talla",
      dataIndex: "tall_Nombre",
      key: "tall_Nombre",
      sorter: (a, b) => a.tall_Nombre.localeCompare(b.tall_Nombre), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.tall_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.tall_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.tall_Id)}
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
              id={`menu-${params.tall_Id}`}
              anchorEl={anchorEl[params.tall_Id]}
              keepMounted
              open={Boolean(anchorEl[params.tall_Id])}
              onClose={() => handleClose(params.tall_Id)}
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
      label: 'Código de la talla'
    },
    {
      label: 'Descripción de la talla'
    },
  ]

  const csvOptions = {  
    filename: 'Tallas',
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
  const camposToFilter = ["key", "tall_Codigo", "tall_Nombre"];

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
  const tallasGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const data = await tallasServices.listar();

      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await tallasServices.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  //Peticion para crear un registro
  const tallasCreate = async () => {
    try {
      const response = await tallasServices.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();
        tallasGetData();
        VisibilidadTabla();
        reset(defaultValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      
      ToastError();
    }
  };

  // Peticion para editar un registro
  const tallasEdit = async () => {
    try {
      const response = await tallasServices.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        tallasGetData();
        VisibilidadTabla();
        reset(defaultValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      
      ToastError();
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    tallasGetData();
  }, []);

  //Controlador del formulario
  const GuardarTallas = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        tallasCreate();
      } else {
        tallasEdit();
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
        image="https://i.ibb.co/XbLb2tr/TALLAS.png"
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
          {/* Botón de Nuevo */}    <Grid container spacing={1}>
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
                    label={editar ? "Editar Talla" : "Agregar Talla"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.tall_Codigo}>Código:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                      {...field}
                      id="outlined-disabled"
                      inputProps={{
                        maxLength: 5,
                        style: { textTransform: 'uppercase' }, // Cambia el estilo para mostrar el texto en mayúsculas
                      }}
                      error={!!errors.tall_Codigo}
                    />
                    )}
                    name="tall_Codigo"
                    error={!!errors.tall_Codigo}
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.tall_Nombre}>Nombre de la Talla:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 200,
                        }}
                        error={!!errors.tall_Nombre}
                      />
                    )}
                    name="tall_Nombre"
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
                  onClick={GuardarTallas}
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
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la Talla" />
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
                    Id de la talla:
                  </Typography>
                  <Typography>{DatosDetalles["tall_Id"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Código de la talla:
                  </Typography>
                  <Typography>{DatosDetalles["tall_Codigo"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la talla:
                  </Typography>
                  <Typography>{DatosDetalles["tall_Nombre"]}</Typography>
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
                      {DatosDetalles["usarioCreacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["tall_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["tall_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["tall_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["tall_FechaModificacion"]
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

export default TallasIndex;