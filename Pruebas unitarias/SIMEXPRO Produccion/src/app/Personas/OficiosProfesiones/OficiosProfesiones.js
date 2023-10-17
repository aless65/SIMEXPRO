
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
import { Table } from "antd";
import { ExportToCsv } from 'export-to-csv';
import { Controller, useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import * as yup from "yup";
import ExportToExcel from "./ExcelFile";
import OficiosProfesionesService from "./OficiosProfesionesService";
import PDFGenerator from "./PDFGenerator";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastError,
  ToastSuccessEditar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste
} from "src/styles/toastsFunctions";

{/*Yup para formulario de agregar Inicio */ }


//Constante de los datos por defecto que tendran los formulario agregar
const defaultOficiosValues = {
  oficios: "",
};

//Constante para indicar que el valor es requerido
const OficiosSchema = yup.object().shape({
  oficios: yup.string().required(),
});


{/*Yup para formulario de agregar Fin */ }
function OficionesProfesionesIndex() {
  const oficiosProfesionesService = OficiosProfesionesService();
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
  const [idEditar, setidEditar] = useState(0);


  const camposToFilter = ["key", "ofpr_Nombre"];
  const [anchorEl, setAnchorEl] = useState({});

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
    handleClose(datos.ofpr_Id);
  };

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setidEditar(datos['ofpr_Id'])
    //insertar aca las variables necesarias en su formulario
    setValue("oficios", datos["ofpr_Nombre"]);
    handleClose(datos.ofpr_Id);
  };

  const handleDelete = (datos) => {
    setValue('id', datos['id']);
    setEliminar(true);
    handleClose(datos.id);
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
      title: "Nombre del oficio u profesión",
      dataIndex: "ofpr_Nombre",
      key: "ofpr_Nombre",
      sorter: (a, b) => a.ofpr_Nombre.localeCompare(b.ofpr_Nombre), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.ofpr_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.ofpr_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.ofpr_Id)}
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
              id={`menu-${params.ofpr_Id}`}
              anchorEl={anchorEl[params.ofpr_Id]}
              keepMounted
              open={Boolean(anchorEl[params.ofpr_Id])}
              onClose={() => handleClose(params.ofpr_Id)}
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
      label: 'Nombre del oficio u profesión'
    }
  ]
  const csvOptions = {
    filename: 'Oficio_Profesiones',
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
  const OficiosProfesionesGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      const data = await oficiosProfesionesService.listar();
      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await oficiosProfesionesService.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };

  const OficiosProfesionesCreate = async () => {
    try {
      const response = (await oficiosProfesionesService.crear(datosWatch))
      if (response.data.data.messageStatus == '1') {
        ToastSuccessGuardado()
        setSearchText("")
        OficiosProfesionesGetData();
        VisibilidadTabla()
        reset(defaultOficiosValues)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste()
      }
    } catch (error) {

      ToastError()
    }
  };

  const OficiosProfesionesEdit = async () => {
    try {
      const response = (await oficiosProfesionesService.editar(datosWatch, idEditar))
      if (response.data.data.messageStatus == '1') {
        ToastSuccessEditar()
        if (searchText != "") { setSearchText(datosWatch.oficios) }
        else { setSearchText("") }
        OficiosProfesionesGetData();
        VisibilidadTabla()
        reset(defaultOficiosValues)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarningYaExiste()
      }
    } catch (error) {

      ToastError()
    }
  };

  useEffect(() => {
    OficiosProfesionesGetData();
  }, []);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultOficiosValues)
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {
    /* Filtrado de datos */
  }
  //Constante que ayuda a filtrar el datatable
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
  });


  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, reset, control, watch, formState, setValue } = useForm({
    defaultOficiosValues,
    mode: "all",
    resolver: yupResolver(OficiosSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const datosWatch = watch();

  const GuardarOficiosProfesiones = () => {
    if (isValid) {
      if (!editar) {
        OficiosProfesionesCreate()
      } else {
        OficiosProfesionesEdit()
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
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/K0h73Hw/OFICIO-PROFESIONES-1.png"
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
                    label={editar ? "Editar Oficio" : "Agregar Oficio"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8}>
                <div className=" mb-16">
                  <Controller
                    render={({ field }) => (
                      <FormControl error={!!errors.oficios} fullWidth>
                        <FormLabel
                        >
                          Oficio u Ocupación:
                        </FormLabel>
                        <TextField
                          {...field}
                          variant="outlined"
                          error={!!errors.oficios}
                          fullWidth={true}
                          inputProps={{
                            maxLength: 150,
                          }}
                        />
                      </FormControl>
                    )}
                    name="oficios"
                    control={control}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right", }}>
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
                  type="submit"
                  onClick={GuardarOficiosProfesiones}
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
      {/* Collapse para el formulario de agregar un registro fin*/}

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
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles del Oficio u Ocupación" />
              </Divider>
            </Grid>

            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }} >
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ocupación Id:
                  </Typography>
                  <Typography>{DatosDetalles['ofpr_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Descripción de la Ocupación:
                  </Typography>
                  <Typography>{DatosDetalles['ofpr_Nombre']}</Typography>
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
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles['ofpr_FechaCreacion']
                        ? new Date(DatosDetalles['ofpr_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles['ofpr_FechaModificacion']
                        ? new Date(DatosDetalles['ofpr_FechaModificacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>

            <Grid item xs={12}>
              <div className="card-footer">
                <Button variant="contained"
                  style={{ position: 'fixed', top: '77%', right: '5%' }}
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
      <ToastContainer />
    </Card>
  );

}

export default OficionesProfesionesIndex;