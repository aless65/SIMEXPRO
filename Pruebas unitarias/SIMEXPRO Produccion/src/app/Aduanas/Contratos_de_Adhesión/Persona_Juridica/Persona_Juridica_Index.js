import SearchIcon from "@mui/icons-material/Search";

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

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
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import PersonaJuridicaService from "./Persona_Juridica_Service";
import { ToastErrorPersonalizado, ToastWarningPersonalizado } from "src/styles/toastsFunctions";


function Persona_Juridica_Index() {

  const juridica = PersonaJuridicaService();
  const [ExportData, SetExportData] = useState([]);
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles
  // const [mostrarEditar, setmostrarEditar] = useState(false); //Para editar
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  // const [mostrarAgregar, setmostrarAgregar] = useState(false); //Para agregar

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = useState(10);

  //Campos para guardar el registro de una fila
  const [datosFila, setDatosFila] = useState({});

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([]);

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    JuridicaGetData();
  }, []);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Constante para cargar datos a las tablas
  const JuridicaGetData = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);

      const data = await juridica.listar();

      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await juridica.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  //Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (params) => {
    setDatosFila(params);
    CollapseDetalles();
    handleClose(params.peju_Id);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Necesario para el boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleReporte = (params) => {
    History.push('/PersonaJuridica/reporte', params);
    handleClose(params.peju_Id);
  };

  const handleComercianteEditMessage = () => {
    ToastWarningPersonalizado('Advertencia. Esta solicitud de contrato ha sido finalizada. Lamentablemente, no es posible realizar modificaciones en el mismo.')
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleComercianteEdit = (params) => {
    if (!params.peju_ContratoFinalizado) {
      History.push("/PersonaJuridica/editar", params);
    } else {
      ToastErrorPersonalizado("Este contrato ya esta finalizado")
    }

    handleClose(params.peju_Id);
  };


  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "RTN de la persona",
      dataIndex: "pers_RTN",
      key: "pers_RTN",
      sorter: (a, b) => a.pers_RTN.localeCompare(b.pers_RTN),
    },
    {
      title: "Oficina a presentar la solicitud",
      dataIndex: "ofic_Nombre",
      key: "ofic_Nombre",
      sorter: (a, b) => a.ofic_Nombre.localeCompare(b.ofic_Nombre),
    },
    {
      title: "Estado civíl de la persona",
      dataIndex: "escv_Nombre",
      key: "escv_Nombre",
      sorter: (a, b) => a.escv_Nombre.localeCompare(b.escv_Nombre),
    },
    {
      title: "Oficio u profesión de la persona",
      dataIndex: "ofpr_Nombre",
      key: "ofpr_Nombre",
      sorter: (a, b) => a.ofpr_Nombre.localeCompare(b.ofpr_Nombre),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.peju_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.peju_Id)}
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
              id={`menu-${params.peju_Id}`}
              anchorEl={anchorEl[params.peju_Id]}
              keepMounted
              open={Boolean(anchorEl[params.peju_Id])}
              onClose={() => handleClose(params.peju_Id)}
            >
              {params.peju_ContratoFinalizado === true ? (

                <MenuItem onClick={() => handleComercianteEditMessage()}>
                  <Icon>edit</Icon>ㅤ  Finalizado
                </MenuItem>

              ) : (
                <MenuItem onClick={() => handleComercianteEdit(params)}>
                  <Icon>edit</Icon>ㅤEditar
                </MenuItem>
              )}
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleReporte(params)}>
                <Icon>print_connect</Icon>ㅤReporte
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
      label: 'RTN de la persona',
    },
    {
      label: 'Oficina a presentar la solicitud',
    },
    {
      label: 'Estado civíl de la persona',
    },
    {
      label: 'Oficio u profesión de la persona'
    },
  ]
  const csvOptions = {
    filename: 'Persona_juridica',
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

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = [
    "key",
    "pers_RTN",
    "ofic_Nombre",
    "ofpr_Nombre",
    "escv_Nombre",
    ""
  ];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
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

  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario

  //Constante para mostrar el collapse de detalles un registro
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
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
        image="https://i.ibb.co/cFBKy66/CONTRATO-DE-ADHESI-N-PERSONA-JURIDICA.png"
        alt="Encabezado de la carta"
      />
      {/*Collapse del index*/}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}>
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
                    History.push("/PersonaJuridica/Crear");
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
                  onChange={handleChange}
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
      {/*Tabla*/}

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData)
            }}
            columns={columns}
            scroll={{ x: true }}
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
      {/* Mostrar tabla index fin*/}

      {/* Collapse de los Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-star",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles de la Persona Juridica" />
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
                <InputLabel htmlFor="peju_Id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Persona Juridica Id:
                  </Typography>
                  <Typography>{datosFila['peju_Id']}</Typography>
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
                <InputLabel htmlFor="pers_RTN">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    RTN del Solicitante:
                  </Typography>
                  <Typography>{datosFila['pers_RTN']}</Typography>
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
                <InputLabel htmlFor="ofic_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Oficina de la Solicitud:
                  </Typography>
                  <Typography>{datosFila['ofic_Nombre']}</Typography>
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
                <InputLabel htmlFor="escv_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Estado Civil del Representante:
                  </Typography>
                  <Typography>{datosFila['escv_Nombre']}</Typography>
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
                <InputLabel htmlFor="ofpr_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Profesión u Oficio del Representante:
                  </Typography>
                  <Typography>{datosFila['ofpr_Nombre']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              marginBottom={'5px'}
              marginTop={'20px'}
            >

              <Divider style={{ borderColor: '#aa8caf' }}>
                <Chip color='default' variant='outlined' label="Ubicación de la Empresa" />
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
                <InputLabel htmlFor="provinciaEmpresa">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Departamento:
                  </Typography>
                  <Typography>{datosFila['provinciaEmpresa']}</Typography>
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
                <InputLabel htmlFor="ciudadEmpresa">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ciudad:
                  </Typography>
                  <Typography>{datosFila['ciudadEmpresa']}</Typography>
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
                <InputLabel htmlFor="aldeaEmpresa">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Aldea:
                  </Typography>
                  <Typography>{datosFila['aldeaEmpresa']}</Typography>
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
                <InputLabel htmlFor="coliniaEmpresa">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Colonia:
                  </Typography>
                  <Typography>{datosFila['coliniaEmpresa']}</Typography>
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
                <InputLabel htmlFor="peju_NumeroLocalApart">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Número de Local o Apartamento:
                  </Typography>
                  <Typography>{datosFila['peju_NumeroLocalApart']}</Typography>
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
                <InputLabel htmlFor="peju_PuntoReferencia">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Puntos de Referencia:
                  </Typography>
                  <Typography>{datosFila['peju_PuntoReferencia']}</Typography>
                </InputLabel>
              </Box>
            </Grid>


            <Grid
              item
              xs={12}
              md={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              marginBottom={'5px'}
              marginTop={'20px'}
            >

              <Divider style={{ borderColor: '#aa8caf' }}>
                <Chip color='default' variant='outlined' label="Ubicación del Representante Legal" />
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
                <InputLabel htmlFor="provinciaRepresentante">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Departamento:
                  </Typography>
                  <Typography>{datosFila['provinciaRepresentante']}</Typography>
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
                <InputLabel htmlFor="ciudadRepresentante">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ciudad:
                  </Typography>
                  <Typography>{datosFila['ciudadRepresentante']}</Typography>
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
                <InputLabel htmlFor="aldeaRepresemtante">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Aldea:
                  </Typography>
                  <Typography>{datosFila['aldeaRepresemtante']}</Typography>
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
                <InputLabel htmlFor="coloniaRepresentante">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Colonia:
                  </Typography>
                  <Typography>{datosFila['coloniaRepresentante']}</Typography>
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
                <InputLabel htmlFor="peju_NumeroLocalRepresentante">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Número de Local o Apartamento:
                  </Typography>
                  <Typography>{datosFila['peju_NumeroLocalRepresentante']}</Typography>
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
                <InputLabel htmlFor="peju_PuntoReferenciaRepresentante">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Puntos de Referencia:
                  </Typography>
                  <Typography>{datosFila['peju_PuntoReferenciaRepresentante']}</Typography>
                </InputLabel>
              </Box>
            </Grid>


            <Grid
              item
              xs={12}
              md={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              marginBottom={'5px'}
              marginTop={'20px'}
            >

              <Divider style={{ borderColor: '#aa8caf' }}>
                <Chip color='default' variant='outlined' label="Información de Contacto" />
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
                <InputLabel htmlFor="peju_TelefonoEmpresa">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Número Telefónico de la Empresa:
                  </Typography>
                  <Typography>{datosFila['peju_TelefonoEmpresa']}</Typography>
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
                <InputLabel htmlFor="peju_TelefonoFijoRepresentanteLegal">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Número Telefónico Fijo del Representante:
                  </Typography>
                  <Typography>{datosFila['peju_TelefonoFijoRepresentanteLegal']}</Typography>
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
                <InputLabel htmlFor="peju_TelefonoRepresentanteLegal">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Número Celular del Representante:
                  </Typography>
                  <Typography>{datosFila['peju_TelefonoRepresentanteLegal']}</Typography>
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
                <InputLabel htmlFor="peju_CorreoElectronico">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Correo Electrónico:
                  </Typography>
                  <Typography>{datosFila['peju_CorreoElectronico']}</Typography>
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
                <InputLabel htmlFor="peju_CorreoElectronicoAlternativo">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Correo Electrónico Alternativo:
                  </Typography>
                  <Typography>{datosFila['peju_CorreoElectronicoAlternativo']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              marginBottom={'5px'}
              marginTop={'20px'}
            >

              <Divider style={{ borderColor: '#aa8caf' }}>
                <Chip color='default' variant='outlined' label="Documentos" />
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
                <InputLabel htmlFor="peju_RTNSociedadMercantil">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    RTN de la Sociedad Mercantil:
                  </Typography>
                  <Typography>{datosFila['pers_RTN']}</Typography>
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
                <InputLabel htmlFor="peju_RTNReprsentanteLegal">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    RTN Representante Legal:
                  </Typography>
                  <Typography>{datosFila['peju_RTNReprsentanteLegal']}</Typography>
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
                <InputLabel htmlFor="peju_RTNReprsentanteLegal">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    RTN Representante Legal:
                  </Typography>
                  <Typography>{datosFila['peju_RTNReprsentanteLegal']}</Typography>
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
                      {datosFila["usuarioCreacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila["peju_FechaCreacion"]
                        ? new Date(
                          datosFila["peju_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila["usuarioModificaNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila["peju_FechaModificacion"]
                        ? new Date(
                          datosFila["peju_FechaModificacion"]
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
      {/* Collapse para mostrar los detalles de un registro fin */}

      <Dialog
        open={Eliminar}
        fullWidth={"md"}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
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
    </Card>
  );
}

export default Persona_Juridica_Index;