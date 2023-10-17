import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
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
import { isSameMonth } from "date-fns";
import { isSameYear } from "date-fns";

import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import History from "src/@history/@history";

//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
//Imports tabla
import { DatePicker as Rdate, Table } from "antd";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import ReporteModuloDiaServices from "./ReporteModuloDiaService";
//Import ddls
//import Toast
import "react-toastify/dist/ReactToastify.css";

import {
  ToastWarningPersonalizado
} from "src/styles/toastsFunctions";

const { RangePicker } = Rdate;

const defaultReporteModuloDiasValues = {
  remo_Id: "",
  modulo: null,
  remo_Fecha: "",
  remo_TotalDia: "",
  remo_TotalDanado: "",
};

const accountSchema = yup.object().shape({
  remo_Id: yup.string(),
  modulo: yup.object().required(""),
  remo_Fecha: yup.string().trim().required(""),
  remo_TotalDia: yup.string().trim().required(""),
  remo_TotalDanado: yup.string().trim().required(""),
});

function ReporteModuloIndex() {
  const reporteModuloDiaService = ReporteModuloDiaServices();
  const navigate = useNavigate();

  //variable para la barra de busqueda
  const [searchText, setSearchText] = useState("");

  //Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Variables a usar en la tabla maestra
  const [data, setDataTabla] = useState([]);
  const [DatosDetalles, setDatosDetalles] = useState([]);
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  //Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ReporteModuloDiaGetData();
  }, []);

  //Peticion para cargar datos de la tabla
  const ReporteModuloDiaGetData = async () => {
    try {
      setDataTabla(await reporteModuloDiaService.listar());
    } catch (error) {
    }
  };

  function isValidCalendarDate(date) {
    return !isNaN(date);
  }

  const ReporteModuloDiaGetDataFiltrada = async (fechas) => {
    try {
      const response = await reporteModuloDiaService.listarRangos(fechas ? fechas[0].$d : null, fechas ? fechas[1].$d : null)
      setDataTabla(
        response
      );

    } catch (error) {
    }
  };


  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (b, a) => b.key - a.key, //sorting para Numeros
    },
    {
      title: "Módulo",
      dataIndex: "modu_Nombre",
      key: "modu_Nombre",
      sorter: (a, b) => a.modu_Nombre.localeCompare(b.modu_Nombre), //sorting para Letras
    },
    {
      title: "Fecha",
      dataIndex: "remo_Fecha",
      key: "remo_Fecha",
      sorter: (a, b) => a.remo_Fecha.localeCompare(b.remo_Fecha), //sorting para Letras
      render: (text, record) => new Date(record["remo_Fecha"]).toLocaleString('es-US', { dateStyle: 'short' }),
    },
    {
      title: "Cantidad Terminada",
      dataIndex: "remo_TotalDia",
      key: "remo_TotalDia",
      sorter: (a, b) => a.remo_TotalDia - b.remo_TotalDia, //sorting para Letras
    },

    {
      title: "Cantidad Dañada",
      dataIndex: "remo_TotalDanado",
      key: "remo_TotalDanado",
      sorter: (a, b) => a.remo_TotalDanado - b.remo_TotalDanado, //sorting para Letras
    },
    {
      title: "Cantidad Total",
      dataIndex: "CantidadBuenEstado",
      key: "CantidadBuenEstado",
      sorter: (a, b) => a.CantidadBuenEstado - b.CantidadBuenEstado, //sorting para Letras
    },

    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.remo_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.remo_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.remo_Id)}
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
              id={`menu-${params.remo_Id}`}
              anchorEl={anchorEl[params.remo_Id]}
              keepMounted
              open={Boolean(anchorEl[params.remo_Id])}
              onClose={() => handleClose(params.remo_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤReporte
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const handleEdit = (params) => {
    if (params["remo_Finalizado"]) {
      ToastWarningPersonalizado('Advertencia. Este pedido ha sido finalizado. Lamentablemente, no es posible realizar modificaciones en el mismo.')
    } else {
      History.push("/ReporteModulo/Crear", params);
    }
    handleClose(params.remo_Id);
  };
  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {

    if (datos.detalles) {
      History.push("/ReporteModulo/Reporte", datos);
      handleClose(datos.remo_Id);
    } else {
      ToastWarningPersonalizado("Este reporte no posee detalles. Imposible poder visualizarlo.")
    }
  };

  const columnsExpandable = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.code_Id - b.code_Id, //sorting para Numeros
    },
    {
      title: "Nombre de Contacto",
      dataIndex: "clie_Nombre_Contacto",
      key: "clie_Nombre_Contacto",
      sorter: (a, b) =>
        a.clie_Nombre_Contacto.localeCompare(b.clie_Nombre_Contacto), //sorting para Letras
    },
    {
      title: "Estilo de prenda",
      dataIndex: "esti_Descripcion",
      key: "esti_Descripcion",
      sorter: (a, b) => a.esti_Descripcion.localeCompare(b.esti_Descripcion), //sorting para Letras
    },
    {
      title: "Sexo",
      dataIndex: "Sexo",
      key: "Sexo",
      sorter: (a, b) => a.Sexo.localeCompare(b.Sexo), //sorting para Letras
    },
    {
      title: "Cantidad Terminada",
      dataIndex: "rdet_TotalDia",
      key: "rdet_TotalDia",
      sorter: (a, b) => a.rdet_TotalDia - b.rdet_TotalDia, //sorting para Letras
    },
    {
      title: "Cantidad Dañada",
      dataIndex: "rdet_TotalDanado",
      key: "rdet_TotalDanado",
      sorter: (a, b) => a.rdet_TotalDanado - b.rdet_TotalDanado, //sorting para Letras
    },
    {
      title: "Cantidad Total",
      dataIndex: "CantidadBuenEstado",
      key: "CantidadBuenEstado",
      sorter: (a, b) => a.rdet_TotalDanado - b.rdet_TotalDanado, //sorting para Letras
    },
  ];

  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = [
    "modu_Nombre",
    "remo_Fecha",
    "remo_TotalDia",
    "remo_TotalDanado",
    "CantidadBuenEstado",
    "key"
  ];

  const [dateRange, setDateRange] = useState({})

  //Constantes que ayuda a filtrar el datatable
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

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    //setMessage(event.target.value);
  };

  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultReporteModuloDiasValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(accountSchema), //Esquema del formulario
    });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleVacio = () => { };

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);

    setValidarvalidarMayor(false);
    setValidarvalidarFechaFin(false);
  };

  const [validarFechaInicio, setValidarFechaInicio] = useState(false);
  const [validarFechaFin, setValidarvalidarFechaFin] = useState(false);
  const [validarMayor, setValidarvalidarMayor] = useState(false);
  const [validarIguales, setValidarvalidarIguales] = useState(false);

  const ValidarFechaInicio = () => {
    var fechaInicioFormateada = new Date(fechaInicio);
    if (isValidCalendarDate(fechaInicioFormateada)) {
      setValidarFechaInicio(false);
    } else {
      setValidarFechaInicio(true);
    }

    if (fechaFin !== null) {
      var fechaFinFormateada = new Date(fechaFin);
      if (isValidCalendarDate(fechaFinFormateada)) {

        if (Date.parse(fechaFin) < Date.parse(fechaInicio)) {
          setValidarvalidarMayor(true);
          setValidarvalidarFechaFin(false);
        } else {
          setValidarvalidarFechaFin(false);
          setValidarvalidarMayor(false);

          ReporteModuloDiaGetDataFiltrada(fechaInicio, fechaFin);
        }
      } else {
        setValidarvalidarFechaFin(true);
        setValidarvalidarMayor(false);
      }
    }
  };

  const ValidarFechaFin = () => {
    var fechaFinFormateada = new Date(fechaFin);
    if (isValidCalendarDate(fechaFinFormateada)) {
      if (Date.parse(fechaFin) < Date.parse(fechaInicio)) {
        setValidarvalidarMayor(true);
        setValidarvalidarFechaFin(false);
      } else {
        setValidarvalidarFechaFin(false);

        setValidarvalidarMayor(false);

        ReporteModuloDiaGetDataFiltrada(fechaInicio, fechaFin);
      }
    } else {
      setValidarvalidarFechaFin(true);
      setValidarvalidarMayor(false);
    }
  };

  const handleFechaFinChange = (date) => {
    setFechaFin(date);
  };
  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Card sx={{ minWidth: 275, margin: "40px" }}>
        <CardMedia
          component="img"
          height="200"
          image="https://i.ibb.co/DfZ8SL7/REPORTEs-M-DULO.png"
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

            <Grid container className="mx-auto" spacing={1}>
              <Grid item xs={12} sm={12} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'start' } }} >
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
                      navigate("/ReporteModulo/Crear");
                    }}
                  >
                    Nuevo
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'start' } }} >

              <label className="mt-8">Rango:</label>
              <RangePicker size="large"
                placeholder={["Fecha inicio", "Fecha fin"]}
                value={dateRange}
                onChange={(value) => { setDateRange(value); ReporteModuloDiaGetDataFiltrada(value) }}
              />
              </Grid>
              <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'end', md: 'end' } }} >
                <label className="mt-8">Filas por página: </label>
                <FormControl sx={{ minWidth: 50 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={filas}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Filtros de la tabla (Filas/Buscar) */}
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
              columns={columns} scroll={{ x: true }}
              expandable={{
                columnTitle: "Desplegar detalle",
                expandedRowRender: (record) => (
                  <Table
                    columns={columnsExpandable}
                    dataSource={record.detalles}
                    pagination={false}
                  />
                ),
              }}
              dataSource={filteredRows}
              size="small"
              pagination={{
                pageSize: filas,
                showSizeChanger: false,
                className: "custom-pagination",
              }}
            />
          </div>
        </Collapse>
        {/* Fin del Collapse incial (Tabla/Index) */}

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
                  <Chip label="Detalles de la Marca de Maquina" />
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
                      Id:
                    </Typography>
                    <Typography>{DatosDetalles["remo_Id"]}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre:
                    </Typography>
                    <Typography>{DatosDetalles["remo_Nombre"]}</Typography>
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
                        No.
                      </th>
                      <th style={estilosTablaDetalles.tableHeaderStyle}>
                        <Icon style={estilosTablaDetalles.iconStyle}>
                          person
                        </Icon>
                        Contacto
                      </th>
                      <th style={estilosTablaDetalles.tableHeaderStyle}>
                        <Icon style={estilosTablaDetalles.iconStyle}>
                          Estilo
                        </Icon>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={estilosTablaDetalles.tableRowStyle}>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        <strong>Creación</strong>
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {DatosDetalles["clie_Nombre_Contacto"]}
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {DatosDetalles["remo_FechaCreacion"]
                          ? new Date(
                            DatosDetalles["remo_FechaCreacion"]
                          ).toLocaleString()
                          : ""}
                      </td>
                    </tr>
                    <tr style={estilosTablaDetalles.tableRowStyle}>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        <strong>Modificación</strong>
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {DatosDetalles["usuarioModificador"]}
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {DatosDetalles["remo_FechaModificacion"]
                          ? new Date(
                            DatosDetalles["remo_FechaModificacion"]
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
                    onClick={() => {
                      CollapseDetalles();
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
    </>
  );
}

export default ReporteModuloIndex;
