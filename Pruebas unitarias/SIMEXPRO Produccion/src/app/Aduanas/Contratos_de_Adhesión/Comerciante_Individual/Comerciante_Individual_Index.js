import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";
import React from 'react';

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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import {
  ToastWarningPersonalizado,
  ToastSuccessPersonalizado,
} from "src/styles/toastsFunctions";
import { Image, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import Comerciante_IndividualService from "./Comerciante_IndividualService";


/*import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';*/



function Comerciante_Individual_Index() {
  const comerciante = Comerciante_IndividualService();
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

  const [Docus, setDocus] = useState([]);

  const [RTNcomer, setRTNcomer] = useState("");

  const [DNIcomer, setDNIcomer] = useState([]);
  const [RTNrep, setRTNrep] = useState([]);
  const [DNIrep, setDNIrep] = useState([]);
  const [DECLA, setDecla] = useState([]);


  const [DNIcomerIMG, setDNIcomerIMG] = useState([]);
  const [RTNrepIMG, setRTNrepIMG] = useState([]);
  const [DNIrepIMG, setDNIrepIMG] = useState([]);
  const [DECLAIMG, setDeclaIMG] = useState([]);



  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    ComercianteGetData();
  }, []);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  //Constante para cargar datos a las tablas
  const ComercianteGetData = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);

      const data = await comerciante.listar();

      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await comerciante.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

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




  const handleComercianteEdit = (params) => {
    History.push("/ComercianteIndividual/Editar", params);
    handleClose(params.coin_Id);
  };


  const handleComercianteEditMessage = () => {
    ToastWarningPersonalizado('Advertencia. Esta solicitud de contrato ha sido finalizada. Lamentablemente, no es posible realizar modificaciones en el mismo.')
  };

  const [coinId, setCoinId] = useState("");

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (params) => {
    setDatosFila(params);
    CollapseDetalles();
    handleClose(params.coin_Id);
    setCoinId(params.coin_Id); // Asegúrate de asignar el valor correcto aquí
  };


  useEffect(() => {
    if (coinId) {
      documentosGet(coinId);
    }
  }, [coinId]);

  const documentosGet = async (id) => {
    try {
      const documentos = await comerciante.cargarDocumentos(id);

      const RTN_CI = documentos.find((documento) => documento.doco_TipoDocumento === "RTN-CI");

      if (RTN_CI) {
        setRTNcomer(RTN_CI.doco_URLImagen);
      } else {
        setRTNcomer("N/A");
      }


      const DNIs_CI = documentos.filter((documento) => documento.doco_TipoDocumento === "DNI-CI");

      if (DNIs_CI.length > 0) {
        // Extraer los valores de la propiedad 'doco_Numero_O_Referencia' de cada objeto en DNIs_CI
        const dniNumbers = DNIs_CI.map((documento) => documento.doco_Numero_O_Referencia);

        // Ahora, dniNumbers es un arreglo que contiene los valores deseados
        setDNIcomer(dniNumbers);
      } else {
        setDNIcomer(["N/A"]);
      }


      const DNIs_CIIMG = documentos.filter((documento) => documento.doco_TipoDocumento === "DNI-CI");

      if (DNIs_CIIMG.length > 0) {

        const concatenatedDNIsIMG = DNIs_CIIMG.map((dni) => dni.doco_URLImagen);
        setDNIcomerIMG(concatenatedDNIsIMG);
      } else {
        setDNIcomerIMG(["N/A"]);
      }




      const DECLA_CI = documentos.filter((documento) => documento.doco_TipoDocumento === "DECL-CI");

      if (DECLA_CI.length > 0) {
        const declaNumbers = DECLA_CI.map((documento) => documento.doco_Numero_O_Referencia);

        setDecla(declaNumbers);
      } else {
        setDecla(["N/A"]);
      }


      const DECLA_IMG = documentos.filter((documento) => documento.doco_TipoDocumento === "DECL-CI");

      if (DECLA_IMG.length > 0) {

        const concatenatedDECLAsIMG = DECLA_IMG.map((dni) => dni.doco_URLImagen);
        setDeclaIMG(concatenatedDECLAsIMG);
      } else {
        setDeclaIMG(["N/A"]);
      }




      const RTN_REP = documentos.filter((documento) => documento.doco_TipoDocumento === "RTN-RL");

      if (RTN_REP.length > 0) {
        const rtnrepNumbers = RTN_REP.map((documento) => documento.doco_Numero_O_Referencia);

        setRTNrep(rtnrepNumbers);
      } else {
        setRTNrep(["N/A"]);
      }


      const RTN_REPIMG = documentos.filter((documento) => documento.doco_TipoDocumento === "RTN-RL");

      if (RTN_REPIMG.length > 0) {

        const RTNsREpIMG = RTN_REPIMG.map((dni) => dni.doco_URLImagen);
        setRTNrepIMG(RTNsREpIMG);
      } else {
        setRTNrepIMG(["N/A"]);
      }



      const DNI_REP = documentos.filter((documento) => documento.doco_TipoDocumento === "DNI-RL");

      if (DNI_REP.length > 0) {
        const dniNumbers = DNI_REP.map((documento) => documento.doco_Numero_O_Referencia);

        setDNIrep(dniNumbers);
      } else {
        setDNIrep(["N/A"]);
      }


      const DNI_REPIMG = documentos.filter((documento) => documento.doco_TipoDocumento === "DNI-RL");

      if (DNI_REPIMG.length > 0) {

        const DNIsRepIMG = DNI_REPIMG.map((dni) => dni.doco_URLImagen);
        setDNIrepIMG(DNIsRepIMG);
      } else {
        setDNIrepIMG(["N/A"]);
      }





    } catch (error) {
    }
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
      title: "RTN del comerciante",
      dataIndex: "pers_RTN",
      key: "pers_RTN",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos 
      sorter: (a, b) => a.pers_RTN.localeCompare(b.pers_RTN),
    },
    {
      title: "Oficio o profesión del comerciante",
      dataIndex: "ofpr_Nombre",
      key: "ofpr_Nombre",
      sorter: (a, b) => a.ofpr_Nombre.localeCompare(b.ofpr_Nombre),
    },
    {
      title: "Oficina a presentar la solicitud",
      dataIndex: "ofic_Nombre",
      key: "ofic_Nombre",
      sorter: (a, b) => a.ofic_Nombre.localeCompare(b.ofic_Nombre),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>

          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.coin_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.coin_Id)}
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
              id={`menu-${params.coin_Id}`}
              anchorEl={anchorEl[params.coin_Id]}
              keepMounted
              open={Boolean(anchorEl[params.coin_Id])}
              onClose={() => handleClose(params.coin_Id)}
            >
              <MenuItem onClick={() => handleReporte(params)}>
                <Icon>print_connect</Icon>ㅤReporte
              </MenuItem>

              {/* Aquí utilizamos la lógica para mostrar "Finalizado" o "Editar" */}
              {params.coin_Finalizacion === true ? (

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
            </Menu>

          </Stack>
        </div>
      ),

    }



  ];

  const csvHeader = [
    {
      label: 'No.',
    },
    {
      label: 'RTN del comerciante',
    },
    {
      label: 'Oficio o profesión del comerciante',
    },
    {
      label: 'Oficina a presentar la solicitud'
    }
  ]
  const csvOptions = {
    filename: 'Comerciante_Individual',
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


  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const handleReporte = (params) => {
    History.push('/ComercianteIndividual/reporte', params);
    handleClose();
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = [
    "key",
    "coin_Id",
    "pers_Id",
    "coin_DNI",
    "pers_FormaRepresentacion",
    "colo_Id",
    "coin_PuntoReferecnia",
    "coin_ColoniaRepresentante",
    "coin_NumeroLocalRepresentante",
    "coin_TelefonoCelular",
    "coin_TelefonoFijo",
    "coin_CorreoElectronico",
    "coin_CorreoElectronicoAlternativo",
    "ofic_Nombre",
    "ofpr_Nombre"
  ];

  //Constantes que ayuda a filtrar el datatable
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
  }).reverse()

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
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/FBTmyr7/CONTRATO-DE-ADHESI-N-COMERCIANTE-INDIVIDUAL.png"
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
                    History.push("/ComercianteIndividual/Crear");
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
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <Divider style={{ marginTop: "10px" }}>
                <Chip label="Detalles del comerciante individual" />
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
                <InputLabel htmlFor="coin_Id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del comerciante:
                  </Typography>
                  <Typography>{datosFila['coin_Id']}</Typography>
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
                <InputLabel htmlFor="pers_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del comerciante:
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['pers_Nombre']}</Typography>
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
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Estado civil:
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['escv_Nombre']}</Typography>
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
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Oficio u profesión:
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['ofpr_Nombre']}</Typography>
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
                <InputLabel htmlFor="formaRepresentacionDesc">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Forma de representación :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['formaRepresentacionDesc']}</Typography>
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
                <InputLabel htmlFor="coin_TelefonoCelular">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Número de teléfono celular :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['coin_TelefonoCelular'] ? datosFila['coin_TelefonoCelular'] : "N/A"}

                  </Typography>
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
                <InputLabel htmlFor="coin_TelefonoFijo">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Número de teléfono fijo :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['coin_TelefonoFijo'] ? datosFila['coin_TelefonoFijo'] : "N/A"}
                  </Typography>
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
                <InputLabel htmlFor="coin_CorreoElectronico">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Dirección de correo electrónico principal :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['coin_CorreoElectronico'] ? datosFila['coin_CorreoElectronico'] : "N/A"}
                  </Typography>
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
                <InputLabel htmlFor="coin_CorreoElectronicoAlternativo">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Dirección de correo electrónico alternativo:
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['coin_CorreoElectronicoAlternativo'] ? datosFila['coin_CorreoElectronicoAlternativo'] : "N/A"}</Typography>
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
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Oficina donde presentará la solicitud y documentación:
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['ofic_Nombre'] ? datosFila['ofic_Nombre'] : "N/A"}</Typography>
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

                <InputLabel htmlFor="ciud_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la Provincia :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {`${datosFila['pvin_Codigo']} - ${datosFila['pvin_Nombre']}` ? `${datosFila['pvin_Codigo']} - ${datosFila['pvin_Nombre']}` : "N/A"}</Typography>
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

                <InputLabel htmlFor="ciud_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la ciudad :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['ciud_Nombre'] ? datosFila['ciud_Nombre'] : "N/A"}</Typography>
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
                <InputLabel htmlFor="colo_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la colonia :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['colo_Nombre'] ? datosFila['colo_Nombre'] : "N/A"}</Typography>
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
                <InputLabel htmlFor="alde_Nombre">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la aldea :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['alde_Nombre'] ? datosFila['alde_Nombre'] : "N/A"}</Typography>
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
                <InputLabel htmlFor="coin_NumeroLocalApart">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    Edificio con número de local :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['coin_NumeroLocalApart'] ? datosFila['coin_NumeroLocalApart'] : "N/A"}</Typography>
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
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="coin_PuntoReferencia">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Punto de referencia :
                  </Typography>
                  <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                    {datosFila['coin_PuntoReferencia'] ? datosFila['coin_PuntoReferencia'] : "N/A"}</Typography>
                </InputLabel>
              </Box>
            </Grid>








            {datosFila['pers_FormaRepresentacion'] && (
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip label="Detalles del representante legal" />
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
                    <InputLabel htmlFor="oficioProfesRepresentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        Oficio u profesión:
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {datosFila['oficioProfesRepresentante'] ? datosFila['oficioProfesRepresentante'] : "N/A"}</Typography>
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
                    <InputLabel htmlFor="estadoCivilRepresentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        Estado civil:
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {datosFila['estadoCivilRepresentante'] ? datosFila['estadoCivilRepresentante'] : "N/A"}</Typography>
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

                    <InputLabel htmlFor="ciud_Nombre">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        Nombre de la Provincia :
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {`${datosFila['pvin_CodigoRepresentante']} - ${datosFila['pvin_NombreRepresentante']}` ? `${datosFila['pvin_CodigoRepresentante']} - ${datosFila['pvin_NombreRepresentante']}` : "N/A"}</Typography>
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

                    <InputLabel htmlFor="ciudadNrepresentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        Nombre de la ciudad :
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {datosFila['ciudadNrepresentante'] ? datosFila['ciudadNrepresentante'] : "N/A"}</Typography>
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
                    <InputLabel htmlFor="coloniaNombreRepresentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        Nombre de la colonia :
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {datosFila['coloniaNombreRepresentante'] ? datosFila['coloniaNombreRepresentante'] : "N/A"}</Typography>
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
                    <InputLabel htmlFor="aldeaNombreRepresentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        Nombre de la aldea :
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {datosFila['aldeaNombreRepresentante'] ? datosFila['aldeaNombreRepresentante'] : "N/A"}</Typography>
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
                    <InputLabel htmlFor="coin_NumeroLocaDepartRepresentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        Edificio con número de local :
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {datosFila['coin_NumeroLocaDepartRepresentante'] ? datosFila['coin_NumeroLocaDepartRepresentante'] : "NA"}</Typography>
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
                    <InputLabel htmlFor="coin_PuntoReferenciaReprentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        Punto de referencia :
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                        {datosFila['coin_PuntoReferenciaReprentante'] ? datosFila['coin_PuntoReferenciaReprentante'] : "N/A"}</Typography>
                    </InputLabel>
                  </Box>
                </Grid>


              </Grid>
            )}




            {/* ************************************************************CON REPRESENTANTE*/}

            \

            {datosFila['pers_FormaRepresentacion'] && (
              <Grid container spacing={1}>

                <Grid item xs={12} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip label="Documentos del contrato" variant="outlined" />
                  </Divider>
                </Grid>


                <Grid
                  container
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ marginTop: "30px" }}
                >

                  <Box sx={{ textAlign: "center" }}>
                    <InputLabel htmlFor="coin_PuntoReferenciaReprentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        RTN del comerciante :
                      </Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>

                        {RTNcomer == "N/A" ? (

                          <Image
                            width={60}
                            style={{
                              width: "50px",
                              height: "50px",
                              overflow: "hidden",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                              borderRadius: '50%'
                            }}
                            src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"

                          />

                        ) : (
                          <Image
                            width={60}
                            style={{
                              width: "50px",
                              height: "50px",
                              overflow: "hidden",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                              borderRadius: '50%'
                            }}
                            src={RTNcomer}
                          />
                        )}
                        <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                          {datosFila["pers_RTN"]}
                        </Typography>
                      </div>
                    </InputLabel>
                  </Box>
                </Grid>


                <Grid item xs={3} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip label="DNI del Comerciante"
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                        backgroundColor: "#a084e1",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }}
                      variant="outlined" />
                  </Divider>
                </Grid>
                <Grid item xs={3} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip label="RTN del Representante"
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                        backgroundColor: "#a084e1",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }} variant="outlined" />
                  </Divider>
                </Grid>
                <Grid item xs={3} >
                  <Divider style={{ marginTop: "30px" }} >
                    <Chip label="DNI del Representante"
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                        backgroundColor: "#a084e1",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }} />
                  </Divider>
                </Grid>
                <Grid item xs={3} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip
                      label="Declaraciones"
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                        backgroundColor: "#a084e1",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }}

                    />
                  </Divider>
                </Grid>


                <Grid container spacing={2} sx={{ marginX: 'auto', maxWidth: '1400px' }}>

                  {/* PRIMER LISTA => COMERCIANTE DNI */}
                  <Grid item xs={3}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {DNIcomer.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {DNIcomerIMG[index] === "N/A" ? (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"
                                />
                              ) : (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src={DNIcomerIMG[index]}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <Typography
                                  sx={{ display: "flex" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item}
                                </Typography>
                              }
                              style={{ marginTop: "20px" }}
                            />
                          </ListItem>
                          {index < DNIcomer.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>

                  {/* PRIMER LISTA => COMERCIANTE DNI */}
                  <Grid item xs={3}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {RTNrep.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {RTNrepIMG[index] === "N/A" ? (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"
                                />
                              ) : (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src={RTNrepIMG[index]}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <Typography
                                  sx={{ display: "flex" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item}
                                </Typography>
                              }
                              style={{ marginTop: "20px" }}
                            />
                          </ListItem>
                          {index < RTNrep.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>

                  {/* PRIMER LISTA => COMERCIANTE DNI */}
                  <Grid item xs={3}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {DNIrep.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {DNIrepIMG[index] === "N/A" ? (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"
                                />
                              ) : (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src={DNIrepIMG[index]}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <Typography
                                  sx={{ display: "flex" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item}
                                </Typography>
                              }
                              style={{ marginTop: "20px" }}
                            />
                          </ListItem>
                          {index < DNIrep.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>

                  {/* PRIMER LISTA => COMERCIANTE DNI */}
                  <Grid item xs={3}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {DECLA.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {DECLAIMG[index] === "N/A" ? (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"
                                />
                              ) : (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src={DECLAIMG[index]}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <Typography
                                  sx={{ display: "flex" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item}
                                </Typography>
                              }
                              style={{ marginTop: "20px" }}
                            />
                          </ListItem>
                          {index < DECLA.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>

                </Grid>
              </Grid>
            )}



            {/****************************************************** SIN REPRESENTANTE*/}
            {!datosFila['pers_FormaRepresentacion'] && (
              <Grid container spacing={0}>

                <Grid item xs={12} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip label="Documentos del contrato" variant="outlined" />
                  </Divider>
                </Grid>


                <Grid
                  container
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ marginTop: "30px" }}
                >

                  <Box sx={{ textAlign: "center" }}>
                    <InputLabel htmlFor="coin_PuntoReferenciaReprentante">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        RTN del comerciante :
                      </Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>

                        {RTNcomer == "N/A" ? (
                          <Image
                            width={60}
                            style={{
                              width: "50px",
                              height: "50px",
                              overflow: "hidden",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                              borderRadius: '50%'
                            }}
                            src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"

                          />
                        ) : (
                          <Image
                            width={60}
                            style={{
                              width: "50px",
                              height: "50px",
                              overflow: "hidden",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                              borderRadius: '50%'
                            }}
                            src={RTNcomer}
                          />
                        )}
                        <Typography sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                          {datosFila["pers_RTN"]}
                        </Typography>
                      </div>
                    </InputLabel>
                  </Box>
                </Grid>



                <Grid item xs={6} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip label="DNI del Comerciante"
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                        backgroundColor: "#a084e1",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }}
                      variant="outlined" />
                  </Divider>
                </Grid>

                <Grid item xs={6} >
                  <Divider style={{ marginTop: "30px" }}>
                    <Chip
                      label="Declaraciones"
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                        backgroundColor: "#a084e1",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }}

                    />
                  </Divider>
                </Grid>



                {/* PRIMER LISTA => COMERCIANTE DNI */}
                <Grid container spacing={3} sx={{ marginX: 'auto', maxWidth: '1200px' }}>

                  <Grid item xs={6}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {DNIcomer.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {DNIcomerIMG[index] === "N/A" ? (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"
                                />
                              ) : (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src={DNIcomerIMG[index]}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <Typography
                                  sx={{ display: "flex", textAlign: 'center' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item} {/* Aquí se usa el valor de DNIcomer en la posición correspondiente */}
                                </Typography>
                              }
                              style={{ marginTop: "20px" }} // Añade este estilo para ajustar la alineación vertical
                            />
                          </ListItem>
                          {index < DNIcomer.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>



                  {/* SEGUNDA LISTA => DECLARACIONES*/}

                  <Grid item xs={6}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {DECLA.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {DECLAIMG[index] === "N/A" ? (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"
                                />
                              ) : (
                                <Image
                                  width={60}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    borderRadius: '50%',
                                    display: "flex"
                                  }}
                                  src={DECLAIMG[index]}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <Typography
                                  sx={{ display: "flex", textAlign: 'center' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item}
                                </Typography>
                              }
                              style={{ marginTop: "20px" }}
                            />
                          </ListItem>
                          {index < DECLA.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>

                </Grid>
              </Grid>
            )}






            <Grid item xs={12} style={{ marginTop: "30px" }}>
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
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usua_UsuarioCreacion']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{new Date(datosFila['coin_FechaCreacion']).toLocaleString()}</td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usua_UsuarioModificacion']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila['coin_FechaModificacion']
                        ? new Date(datosFila['coin_FechaModificacion']).toLocaleString()
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
                  style={{ position: 'fixed', top: '83%', right: '5%' }}
                  onClick={CollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}
                >Regresar</Button>
                <br></br>
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

export default Comerciante_Individual_Index;
