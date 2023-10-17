import SearchIcon from "@mui/icons-material/Search";

import { Table } from "antd";

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from "export-to-csv";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import { ToastWarningPersonalizado } from "src/styles/toastsFunctions";

import PersonaNaturalService from "./PersonaNaturalService";

import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";

import { useEffect, useState } from "react";

function PersonaNatural_Index() {
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");
  const personaNaturalService = PersonaNaturalService();
  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  // mostrar archivo
  const [mostrarFile, setmostrarFile] = useState(false);
  const [mostrarArchivo, setmostrarArchivo] = useState(true);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = useState(10);

  //Campos para guardar el registro de una fila
  const [datosFila, setDatosFila] = useState({});


  /* Datos de la tabla */
  const [data, setData] = useState([]);

  const [ExportData, SetExportData] = useState([]);

  const csvHeader = [
    {
      label: "No.",
    },
    {
      label: "Nombre de la persona",
    },
    {
      label: "RTN de la persona",
    },
    {
      label: "Teléfono celular",
    },
    {
      label: "DNI de la persona",
    },
  ];

  const csvOptions = {
    filename: "Persona_Natural",
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
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

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Peticion para cargar datos de la tabla
  const PersonaNaturalGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const data = await personaNaturalService.listar();

      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await personaNaturalService.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    PersonaNaturalGetData();
  }, []);

  //Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Necesario para el boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handlePersonaNaturalEdit = (params) => {
    handleClose(params.pena_Id);
    if (params.pena_Finalizado == true) {
      ToastWarningPersonalizado(
        "Advertencia. Esta Solicitud ha sido finalizado. Lamentablemente, no es posible realizar modificaciones en el mismo."
      );
    } else {
      History.push("/PersonaNatural/Crear", params);
    }
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (params) => {
    setDatosFila(params);
    CollapseDetalles();
    handleClose(params.pena_Id);
  };

  const handleReport = async (params) => {
    var Datos = {
      pena_Id: params.pena_Id,
      pena_RTN: params.pena_RTN,
      pena_DNI: params.pena_DNI,
      cliente: params.cliente,
      ofic_Nombre: params.ofic_Nombre,
      pena_DireccionExacta: params.pena_DireccionExacta,
      pena_TelefonoFijo: params.pena_TelefonoFijo,
      pena_CorreoElectronico: params.pena_CorreoElectronico,
      ciud_Nombre: params.ciud_Nombre,
      pvin_Nombre: params.pvin_Nombre,
    };
    History.push("/PersonaNatural/Reporte", Datos);
    // handleClose(params.pena_Id);
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
      title: "Nombre de la persona",
      dataIndex: "cliente",
      key: "cliente",
      sorter: (a, b) => a.cliente.localeCompare(b.cliente),
    },
    {
      title: "RTN de la persona",
      dataIndex: "pena_RTN",
      key: "pena_RTN",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos
      sorter: (a, b) =>
        a.pers_Id.toString().localeCompare(b.pers_Id.toString()),
    },
    {
      title: "Teléfono celular",
      dataIndex: "pena_TelefonoCelular",
      key: "pena_TelefonoCelular",
      sorter: (a, b) => a.pena_TelefonoFijo.localeCompare(b.pena_TelefonoFijo),
    },
    {
      title: "DNI de la persona",
      dataIndex: "pena_DNI",
      key: "pena_DNI",
      sorter: (a, b) => a.pena_RTN.localeCompare(b.pena_RTN),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.pena_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.pena_Id)}
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
              id={`menu-${params.pena_Id}`}
              anchorEl={anchorEl[params.pena_Id]}
              keepMounted
              open={Boolean(anchorEl[params.pena_Id])}
              onClose={() => handleClose(params.pena_Id)}
            >
              <MenuItem onClick={() => handlePersonaNaturalEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleReport(params)}>
                <Icon>print_connect</Icon>ㅤReporte
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "pena_RTN", "pena_TelefonoCelular", "pena_DNI"];

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

  //Constante para mostrar el collapse de detalles un registro
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const CollapseFile = () => {
    setmostrarDetalles(!mostrarDetalles);
    setmostrarFile(!mostrarFile);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const [File, setFile] = useState("");
  const [FileName, setFileName] = useState("");

  const handleViewFile = (file, FileName) => {
    if (file != "" || file != undefined || file != null) {
      setFile(file);
      setFileName(FileName);
      if (FileName.includes("docx")) {
      } else {
        CollapseFile();
      }
    } else {
      ToastWarningPersonalizado(
        "El archivo no esta disponible en estos momentos."
      );
    }
  };

  function MostrarArchivo({ file, FileName }) {
    // Verificar si el archivo es una imagen (puedes ajustar esta lógica según tus necesidades)
    const esImagen = /\.(jpg|jpeg|png|jfif)$/i.test(FileName);
    if (esImagen) {
      // Si es una imagen, mostrarla en un elemento <img>
      return (
        <img
          src={file}
          alt="Imagen"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    } else {
      // Si no es una imagen, mostrar el archivo en un <iframe>
      return (
        <iframe src={file} title="Archivo" width="100%" height="600px"></iframe>
      );
    }
  }


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
        image="https://i.ibb.co/zrcrcFK/CONTRATO-DE-ADHESI-N-PERSONA-NATURAL.png"
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
                    History.push("/PersonaNatural/Crear");
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
      </Collapse>

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
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
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles de la persona natural" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Persona Natural:
                    </Typography>
                    <Typography>{datosFila["pena_Id"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>  

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pers_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Persona:
                    </Typography>
                    <Typography>{datosFila["pers_Id"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>    

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_DireccionExacta">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Dirección Exacta:
                    </Typography>
                    <Typography>{datosFila["pena_DireccionExacta"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>  

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="ciud_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Ciudad:
                    </Typography>
                    <Typography>{datosFila["ciud_Id"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid> 

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="ciud_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Ciudad:
                    </Typography>
                    <Typography>{datosFila["ciud_Nombre"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>  

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_TelefonoFijo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Teléfono Fijo:
                    </Typography>
                    <Typography>{datosFila["pena_TelefonoFijo"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>       

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_TelefonoCelular">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Teléfono Celular:
                    </Typography>
                    <Typography>{datosFila["pena_TelefonoCelular"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   
           
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_CorreoElectronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico:
                    </Typography>
                    <Typography>{datosFila["pena_CorreoElectronico"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_CorreoAlternativo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico Alternativo:
                    </Typography>
                    <Typography>{datosFila["pena_CorreoAlternativo"]} </Typography>
                  </InputLabel>
                </Box>
             </Grid>   
        
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_RTN">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      RTN:
                    </Typography>
                    <Typography>{datosFila["pena_RTN"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_DNI">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      DNI:
                    </Typography>
                    <Typography>{datosFila["pena_DNI"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_NumeroRecibo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Número de Recibo:
                    </Typography>
                    <Typography>{datosFila["pena_NumeroRecibo"]}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   
          
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_NumeroRecibo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Archivo RTN:
                    </Typography>
                    <Typography>
                      {datosFila["pena_NombreArchRTN"]}
                      <Button
                        onClick={() => {
                          handleViewFile(
                            datosFila["pena_ArchivoRTN"],
                            datosFila["pena_NombreArchRTN"]
                          );
                        }}
                        style={{ fontSize: "30px" }}
                      >
                        👁
                      </Button>
                    </Typography>
                  </InputLabel>
                </Box>
             </Grid>   
           
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_NumeroRecibo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Archivo DNI:
                    </Typography>
                    <Typography>
                      {datosFila["pena_NombreArchDNI"]}
                      <Button
                        onClick={() => {
                          handleViewFile(
                            datosFila["pena_ArchivoDNI"],
                            datosFila["pena_NombreArchDNI"]
                          );
                        }}
                        style={{ fontSize: "30px" }}
                      >
                        👁
                      </Button>
                    </Typography>
                  </InputLabel>
                </Box>
             </Grid>  


             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pena_NumeroRecibo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Archivo de Recibo:
                    </Typography>
                    <Typography>
                      {datosFila["pena_NombreArchRecibo"]}{" "}
                      <Button
                        onClick={() => {
                          handleViewFile(
                            datosFila["pena_ArchivoNumeroRecibo"],
                            datosFila["pena_NombreArchRecibo"]
                          );
                        }}
                        style={{ fontSize: "30px" }}
                      >
                        👁
                      </Button>
                    </Typography>
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
                      {datosFila["usuarioCreacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {new Date(
                        datosFila["pena_FechaCreacion"]
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila["usuarioModificacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila["pena_FechaModificacion"]
                        ? new Date(
                          datosFila["pena_FechaModificacion"]
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
                  onClick={() => {
                    CollapseDetalles();
                  }}
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

      {/* Mostar archivos */}
      <Collapse in={mostrarFile}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MostrarArchivo file={File} FileName={FileName} />

          <Grid item xs={12}>
            <div className="card-footer">
              <Button
                variant="contained"
                style={{ position: "fixed", top: "76%", right: "5%" }}
                onClick={() => {
                  CollapseFile();
                }}
                startIcon={<Icon>arrow_back</Icon>}
              >
                Regresar
              </Button>
              <br></br>
            </div>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar los detalles de un registro fin */}

      <Dialog
        open={Eliminar}
        fullWidth={true}
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
              onClick={() => { }}
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
      <ToastContainer />
    </Card>
  );
}

export default PersonaNatural_Index;