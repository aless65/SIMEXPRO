/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
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
  Typography
} from "@mui/material";
import { Table } from "antd";
import { ExportToCsv } from 'export-to-csv';
import * as React from "react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import OrdenDeProcesosService from "./OrdenDeProcesosService";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import * as yup from "yup";
import PDFGenerator from "./OrdenProcesoPDF";
import ExportToExcel from "./OrdenProcesosExcel";
import DescriptionIcon from '@mui/icons-material/Description';


function OrdenProcesosIndex() {
  const [ExportData, SetExportData] = useState([]);

  const load_DDLs = Load_DDLs()
  const ordenDeProcesosService = OrdenDeProcesosService();

  // Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");
  // Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);


  // Constantes para los Collapse de agregar, editar y detalles 
  /*
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  */
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  // Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  // Campos para guardar el registro de una fila
  const [datosFila, setDatosFila] = useState({});

  // Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([]);


  const [DataTabladeta, setDataTabladeta] = useState([]);
  const [filasdeta, setFilasdeta] = React.useState(10);

  const camposToFilterdeta = ["key", "ppro_Id", "ppro_Id", "lote_Id"
    , "lote_Stock", "ppde_Cantidad", "mate_Id", "mate_Descripcion"
    , "tipa_Id", "tipa_area", "ppro_Estados", "usua_UsuarioCreacion", "usuarioCreacionNombre", "ppde_FechaCreacion",
    , "usua_UsuarioModificacion", "usuarioModificacionNombre", "ppde_FechaModificacion", "ppde_Estado"
  ];


  const filteredRowsdeta = DataTabladeta.filter((row) => {
    if (searchText === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilterdeta.includes(key)) {
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
  }).reverse();

  const getItems = async (ppro_Id) => {
    try {
      const data = await load_DDLs.PedidoOrdenDetalleFiltrar(ppro_Id)
      setDataTabladeta(data)
    }
    catch (error) {

    }

  }
  // Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    OrdenDeprocesoGetData();
  }, []);

  // ENCABEZADO PARA EL CSV
  const csvHeader = [
    {
      label: 'No.',
    },
    {
      label: 'Cantidad'
    },
    {
      label: 'Empleado encargado'
    },
    {
      label: 'Sexo'
    },
    {
      label: 'Estilo'
    },
    {
      label: 'Fecha Inicio'
    },
    {
      label: 'Fecha Límite'
    },

  ];

  //OPCIONES DEL CSV
  const csvOptions = {
    filename: 'Ordenes_Procesos',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: csvHeader.map((c) => c.label),

  };

  // SIN ESTO NO HAY CSV
  const csvExporter = new ExportToCsv(csvOptions);

  // METODO PARA EXPORTAR EL CSV
  const handleExportData = () => {
    try {
      csvExporter.generateCsv(ExportData);
    } catch (error) {

    }
  };

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  // Constante para cargar datos a las tablas
  const OrdenDeprocesoGetData = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);

      const data = await ordenDeProcesosService.listar();

      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await ordenDeProcesosService.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  // Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const [habilitar, setHabilitar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  /*
  const [Editar, setEditar] = useState(false);
  */
  // Necesario para el boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };
  // Constante para la Acción de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEditOrdenes = (params) => {
    History.push("/OrdenProcesos/editar", params);
    handleClose(params.ensa_Id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (params) => {
    getItems(params.ppro_Id)
    setDatosFila(params);
    CollapseDetalles();
    handleClose(params.ensa_Id);
  };
  const handleRevision = (params) => {
    History.push("/RevisionCalidad/Index", { ensa_Id: params.ensa_Id })

    handleClose(params.ensa_Id);
  };
  //Constante para mostrar el collapse de detalles un registro
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };


  // Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (params) => {
    setDatosFila(params);
    if (params.ensa_Estado) {
      setHabilitar(true);
    } else {
      setHabilitar(false);
    }
    DialogEliminar();
    handleClose(params.ensa_Id);
  };

  // Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});


  const schema = yup.object().shape({
    Detalle: yup.string().nullable().required(""),
    Color: yup.string().nullable().required(""),
    Estilo: yup.string().nullable().required(""),
    Talla: yup.string().nullable().required(""),
    Modulo: yup.string().nullable().required(""),
    Proceso: yup.string().nullable().required(""),
    Empleado: yup.string().nullable().required(""),
    Cantidad: yup.string().nullable().required(""),
    PedidoProd: yup.string().nullable().required(""),
    DateTimePicker1: yup.string().nullable().required(""),
    DateTimePicker2: yup.string().nullable().required(""),
  });
  const columnsPro = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: "Descripcion Material",
      dataIndex: "mate_Descripcion",
      key: "mate_Descripcion",
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), // sorting para Numeros
    },
    {
      title: "Estado",
      dataIndex: "ppro_Estados",
      key: "ppro_Estados",
      sorter: (a, b) => a.ppro_Estados.localeCompare(b.ppro_Estados), // sorting para Numeros
    },
    {
      title: "Stock",
      dataIndex: "lote_Stock",
      key: "lote_Stock",
      sorter: (a, b) => a.lote_Stock.localeCompare(b.lote_Stock), // sorting para Numeros
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: "Cantidad",
      dataIndex: "ensa_Cantidad",
      key: "ensa_Cantidad",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos
      sorter: (a, b) => a.ensa_Cantidad.localeCompare(b.ensa_Cantidad),
    },
    {
      title: "Empleado encargado",
      dataIndex: "empl_NombreCompleto",
      key: "empl_NombreCompleto",
      sorter: (a, b) => a.empl_NombreCompleto.localeCompare(b.empl_NombreCompleto),
    },
    {
      title: "Sexo",
      dataIndex: "code_Sexo",
      key: "code_Sexo",
      sorter: (a, b) => a.code_Sexo.localeCompare(b.code_Sexo),
    },
    {
      title: "Estilo",
      dataIndex: "esti_Descripcion",
      key: "esti_Descripcion",
      sorter: (a, b) => a.esti_Descripcion.localeCompare(b.esti_Descripcion),
    },
    {
      title: "Fecha Inicio",
      dataIndex: "ensa_FechaInicio",
      key: "ensa_FechaInicio",
      sorter: (a, b) => a.ensa_FechaInicio.localeCompare(b.ensa_FechaInicio),
      render: (text, record) => new Date(record["ensa_FechaInicio"]).toLocaleString(),
    },
    {
      title: "Fecha Límite",
      dataIndex: "ensa_FechaLimite",
      key: "ensa_FechaLimite",
      sorter: (a, b) => a.ensa_FechaLimite.localeCompare(b.ensa_FechaLimite),
      render: (text, record) => new Date(record["ensa_FechaLimite"]).toLocaleString(),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.ensa_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.ensa_Id)}
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
              id={`menu-${params.ensa_Id}`}
              anchorEl={anchorEl[params.ensa_Id]}
              keepMounted
              open={Boolean(anchorEl[params.ensa_Id])}
              onClose={() => handleClose(params.ensa_Id)}
            >
              <MenuItem onClick={() => handleEditOrdenes(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleRevision(params)}>
                <Icon>text_snippet</Icon>ㅤRevisión
              </MenuItem>

            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  // Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  // Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const camposToFilter = ["key", "ensa_Cantidad", "ensa_Cantidad", "empl_NombreCompleto"
    , "code_Sexo", "esti_Descripcion", "ensa_FechaInicio", "ensa_FechaLimite"
    , "proc_Descripcion", "modu_Nombre"];

  // Constante que ayuda a filtrar el datatable
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

  // Constante para mostrar el collapse de detalles un registro


  // Constante cuando se hace click para el boton de opciones
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

      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta) */}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/TtV62Xs/RDEN-DE-PROCESOS.png"
        alt="Encabezado de la carta"
      />
      {/* Collapse del index */}
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
                History.push("/OrdenProcesos/Crear");
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

      {/* Mostrar tabla index inicio */}
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
            dataSource={filteredRows}
            scroll={{ x: true }}
            size="small"
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin */}

      {/* Collapse para mostrar los detalles de un registro inicio */}
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
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la Órden de Procesos" />
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
                    Id de la Órden de Proceso:
                  </Typography>
                  <Typography>{datosFila.ensa_Id}</Typography>
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
                    Número Detalle P.O:
                  </Typography>
                  <Typography>{datosFila.code_Id}</Typography>
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
                    Empleado Encargado:
                  </Typography>
                  <Typography>{datosFila.empl_NombreCompleto}</Typography>
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
                    Cantidad:
                  </Typography>
                  <Typography>{datosFila.ensa_Cantidad}</Typography>
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
                    Proceso:
                  </Typography>
                  <Typography>{datosFila.proc_Descripcion}</Typography>
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
                    Módulo:
                  </Typography>
                  <Typography>{datosFila.modu_Nombre}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <Grid item xs={12}
              md={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}>

              <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                Detalles del Pedido de producción:
              </Typography></Grid>
            <Grid item xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}>
              <Table
                md={6}
                locale={{
                  triggerDesc: "Ordenar descendente",
                  triggerAsc: "Ordenar ascendente",
                  cancelSort: "Cancelar",
                  emptyText: LoadingIcon(),
                }}
                columns={columnsPro}
                dataSource={filteredRowsdeta}
                size="small"
                pagination={{
                  pageSize: filas,
                  showSizeChanger: false,
                  className: "custom-pagination",
                }}
              />
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
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila["usurioCreacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {new Date(
                        datosFila["ensa_FechaCreacion"]
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila["usuarioModificacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {new Date(
                        datosFila["ensa_FechaModificacion"]
                      ).toLocaleString()}
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
                    setmostrarIndex(!mostrarIndex);
                    setmostrarDetalles(!mostrarDetalles);
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
      {/* Collapse para mostrar los detalles de un registro fin */}


      <ToastContainer />
    </Card>
  );
}

export default OrdenProcesosIndex;
