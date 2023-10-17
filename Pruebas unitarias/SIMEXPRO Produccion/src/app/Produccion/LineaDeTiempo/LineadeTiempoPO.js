import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputLabel,
  Button,
  IconButton,
  Select,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Icon,
  Stack,
  Grid,
  Divider,
  Chip,
  Typography,
  Collapse,
  TextField,
  FormLabel,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer
} from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Table } from "antd";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

import PropTypes from "prop-types";

import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import { Tag } from "antd";

import * as React from "react";
import { useState } from "react";

import { ToastWarning } from "src/styles/toastsFunctions";
import LoadingIcon from "src/styles/iconoCargaTabla";
import LineadeTiempoPOService from "./LineadeTiempoPOService";

//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Link } from "react-router-dom";



function LineadeTiempoPOIndex() {
  const [datos, setDatos] = useState();
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [imagenEstado, setImagenEstado] = useState(null);
  const [estado, setEstado] = useState();
  const [codigoPONoEncontrado, setCodigoPONoEncontrado] = useState(false);
  const [procesos, setProcesos] = useState([]);
  const [detalles, setDetalles] = useState([]);

  const [selectedDetalle, setSelectedDetalle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [DatosDocumentosDetalles, setDatosDocumentosDetalles] = useState([]);
  const [DatosMaterialesBrindar, setDatosMaterialesBrindar] = useState([]);
  const lineadeTiempoService = LineadeTiempoPOService();
  const [searchText, setSearchText] = useState("");

  const defaultCodigoValues = {
    codigo: "",
  };

  const defaultCodigoSchema = yup.object().shape({
    codigo: yup.string().trim().required(""),
  });

  //Cargar la tabla de documentos
  const CargaListadoDocumentos = async (ID) => {
    try {
      const nuevosDatosDocumentos = await lineadeTiempoService.ListarDocumentos(ID);
      setDatosDocumentosDetalles(nuevosDatosDocumentos); // Actualiza el estado
    } catch (error) {
    }
  };
  

  const columnsDocumentos = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key, // Sorting para números
    },
    {
      title: 'Nombre del Archivo',
      dataIndex: 'dopo_NombreArchivo',
      key: 'dopo_NombreArchivo',
      sorter: (a, b) => a.dopo_NombreArchivo.localeCompare(b.dopo_NombreArchivo),
      render: (text) => (
        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Tipo Documento',
      dataIndex: 'dopo_TipoArchivo',
      key: 'dopo_TipoArchivo',
      sorter: (a, b) => a.dopo_TipoArchivo.localeCompare(b.dopo_TipoArchivo),
    },
    {
      title: 'Visualizar',
      dataIndex: 'visualizar',
      key: 'visualizar',
      render: (text, record) => (
        <a
          href={record.dopo_Archivo}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#dcc25a',
            textDecoration: 'none',
            borderRadius: '5px',
            color: 'white',
          }}
        >
          <Icon style={{ marginRight: '5px' }}>visibility</Icon>Visualizar
        </a>
      ),
    },
  ];
  

   //Cargar la tabla de Materiales a Brindar
   const CargaListadoMaterialesBrindar = async (ID) => {
    try {
      const nuevosDatosMateriales = await lineadeTiempoService.ListarMaterialesBrindar(ID);
      setDatosMaterialesBrindar(nuevosDatosMateriales); // Actualiza el estado
    } catch (error) {
    }
  };
  

  const columnsMaterialesBrindar = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: 'Material',
      dataIndex: 'mate_Descripcion', 
      key: 'mate_Descripcion',
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion),
    },
    {
      title: 'Cantidad',
      dataIndex: 'mabr_Cantidad', 
      key: 'mabr_Cantidad',
      sorter: (a, b) => a.mabr_Cantidad.localeCompare(b.mabr_Cantidad),
    },
    {
      title: 'Cantidad de Prendas',
      dataIndex: 'code_CantidadPrenda', 
      key: 'code_CantidadPrenda',
      sorter: (a, b) => a.code_CantidadPrenda.localeCompare(b.code_CantidadPrenda),
    },
    
  ];



  const { handleSubmit, control, watch, formState } = useForm({
    defaultCodigoValues, //Campos del formulario
    mode: "all",
    resolver: yupResolver(defaultCodigoSchema), //Esquema del formulario
  });

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(5);

  //Validacion de campos vacios y errores
  const { isValid, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  const CloseCollapse = () => {
    setMostrarDatos(false);
    setEstado("");
  };

  const OpenCollapse = () => {
    setMostrarDatos(true);
    setCodigoPONoEncontrado(false);
  };

  //
  const openModal = (detalle) => {
    CargaListadoDocumentos(detalle.code_Id);
    CargaListadoMaterialesBrindar(detalle.code_Id)
    setSelectedDetalle(detalle);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDetalle(null);
    setModalOpen(false);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
    //setMessage(event.target.value);
  };

  const BuscarOrden = async () => {
    if (isValid) {
      const DatosPO = await lineadeTiempoService.buscarEncabezado(
        datosWatch.codigo
      );
      if (DatosPO.length === 0) {
        setCodigoPONoEncontrado(true);
        CloseCollapse();
      } else {
        // lleno la variable de datos con el encabezado
        setDatos(DatosPO[0]);

        // asigna el estado dependiendo del encabezado
        const estadoOrdenCompra = DatosPO[0].orco_EstadoOrdenCompra;

        // asigna los procesos dependiendo de el codigo
        const ProcesosDeLaPO = await lineadeTiempoService.dibujarProcesos(
          datosWatch.codigo
        );
        setProcesos(ProcesosDeLaPO);

        // dibuja los detalles
        const DetallesDeLaPO = await lineadeTiempoService.dibujarDetalles(
          datosWatch.codigo
        );
        setDetalles(DetallesDeLaPO);

        // Asigna la imagen correspondiente al estado
        if (estadoOrdenCompra === "P") {
          setEstado("PENDIENTE");
          setImagenEstado("https://i.ibb.co/tBhNvWf/PENDIENTE.png");
        } else if (estadoOrdenCompra === "C") {
          setEstado("EN CURSO");
          setImagenEstado("https://i.ibb.co/HqwTryt/EN-CURSO.png");
        } else if (estadoOrdenCompra === "T") {
          setEstado("TERMINADO");
          setImagenEstado("https://i.ibb.co/yd81BXX/FINALIZADA.png");
        }

        // abro el collapse
        OpenCollapse();
      }
    } else {
      ToastWarning();
      CloseCollapse();
    }
  };

  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const camposToFilterDocumentos = ["key" ,"dopo_TipoArchivo"];
  //Constantes que ayuda a filtrar el datatable
  const filteredRowsDocumentos = DatosDocumentosDetalles.filter((row) => {
    const filteredRow = {};
    for (const [key, value] of Object.entries(row)) {
      if (camposToFilterDocumentos.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === "number"
            ? searchText.toString()
            : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          filteredRow[key] = value;
        }
      }
    }
    return Object.keys(filteredRow).length > 0 ? filteredRow : null;
  });
  

  const camposToFilterMateriales = ["key" ,"dopo_TipoArchivo"];
  //Constantes que ayuda a filtrar el datatable
  const filteredRowsMateriales = DatosMaterialesBrindar.filter((row) => {
    const filteredRow = {};
    for (const [key, value] of Object.entries(row)) {
      if (camposToFilterMateriales.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === "number"
            ? searchText.toString()
            : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          filteredRow[key] = value;
        }
      }
    }
    return Object.keys(filteredRow).length > 0 ? filteredRow : null;
  });

  
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const [expandedM, setExpandedM] = useState(false);

  const toggleAccordionM = () => {
    setExpandedM(!expandedM);
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/myLjFS9/RASTREO-DE-LA-ORDEN-DE-COMPRA.png"
        alt="Encabezado de la carta"
      />
      <form onSubmit={handleSubmit((_data) => { })}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                <Chip label={"Rastrear Orden de Compra:"} />
              </Divider>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.codigo || codigoPONoEncontrado}>
                    Ingrese el código de la P.O.:
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        variant="outlined"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.codigo || codigoPONoEncontrado}
                      ></TextField>
                    )}
                    name="codigo"
                    control={control}
                  ></Controller>
                  {codigoPONoEncontrado && (
                    <Typography variant="body2" color="error">
                      Código de P.O. no encontrado
                    </Typography>
                  )}
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Button
                  startIcon={<Icon>search</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "5px",
                    marginTop: "25px",
                    margin: "auto", // Centra el botón
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={BuscarOrden}
                >
                  Buscar
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={mostrarDatos}>
                <Divider style={{ margin: "20px" }} />
                {datos ? (
                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", color: "#634A9E" }}
                    >
                      <Typography variant="h4">
                        ESTADO DE LA ORDEN:{" "}
                        {estado == "PENDIENTE" ? (
                          <Tag
                            color="red"
                            style={{
                              fontSize: "3rem",
                              padding: "0.9rem 0.9rem",
                            }}
                          >
                            {estado}
                          </Tag>
                        ) : estado == "EN CURSO" ? (
                          <Tag
                            color="orange"
                            style={{
                              fontSize: "3rem",
                              padding: "0.9rem 0.9rem",
                            }}
                          >
                            {estado}
                          </Tag>
                        ) : (
                          <Tag
                            color="green"
                            style={{
                              fontSize: "3rem",
                              padding: "0.9rem 0.9rem",
                            }}
                          >
                            {estado}
                          </Tag>
                        )}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", color: "black" }}
                    >
                      <Typography variant="h6">
                        Id: #{datos.orco_Id} ── Código: {datos.orco_Codigo} ──
                        Cliente: {datos.clie_Nombre_O_Razon_Social}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    <CircularProgress disableShrink />
                    Cargando datos...
                  </Typography>
                )}
                {imagenEstado && (
                  <img
                    src={imagenEstado}
                    alt="Estado de la Orden de Compra"
                    style={{ maxWidth: "85%", margin: "auto" }} // Centra la imagen
                  />
                )}

                {estado === "EN CURSO" ? (
                  <Timeline position="alternate">
                    {procesos.map((proceso, index) => (
                      <TimelineItem key={proceso.proc_Id}>
                        <TimelineSeparator>
                          <TimelineDot
                            style={{ backgroundColor: proceso.proc_CodigoHTML }}
                          />
                          {index !== procesos.length - 1 && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: proceso.proc_Descripcion.toUpperCase(),
                            }}
                            style={{
                              color: proceso.proc_CodigoHTML,
                              fontWeight: "bold",
                            }}
                          />
                          {detalles.map((detalle) => {
                            if (detalle.proc_IdActual === proceso.proc_Id) {
                              return (
                                <div key={detalle.code_Id} style={{ display: 'flex', alignItems: 'center' }}>
                                  <strong style={{ display: 'flex', alignItems: 'center' }}>
                                   FECHA INGRESO: </strong> {detalle.code_FechaProcActual}-{"  "} 
                                   <strong>ITEM:</strong> {detalle.code_Id}
                                   <Link className="text-md font-medium" onClick={() => openModal(detalle)}>
                                   <FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
                                    </Link>
                                 
                                </div>
                              );
                            }
                            return null;
                          })}
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                ) : null}
              </Collapse>
            </Grid>
          </Grid>
        </CardContent>
      </form>
      {/* Inicia del Dialog(Modal) */}
      <Dialog
        open={modalOpen}
        fullWidth="md"
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Detalles del Item #{selectedDetalle ? selectedDetalle.code_Id : ""}
          <Divider style={{ margin: "3px" }} />
        </DialogTitle>
        <DialogContent>
          {selectedDetalle ? (
            <Grid container spacing={3}>
              {/* <Grid item xs={12} md={1} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
      <Icon  style={estilosTablaDetalles.iconStyle}>edit</Icon>
      </Grid> */}
              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
                <Box sx={{ textAlign: "left" }}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>heroicons-solid:document-search</FuseSvgIcon> Orden de Compra: </Typography>
                    <Typography sx={{ marginLeft: '30px' }} >{selectedDetalle.orco_Codigo}</Typography>

                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
              <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>heroicons-outline:hashtag</FuseSvgIcon>
                    Codigo de Ítem:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_Id}</Typography>
                </InputLabel>
              </Box>

              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>material-twotone:add_shopping_cart</FuseSvgIcon>
                    Cantidad:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_CantidadPrenda}</Typography>
                </InputLabel>
              </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>material-solid:design_services</FuseSvgIcon>
                    Estilo:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_CantidadPrenda}</Typography>
                </InputLabel>
              </Box>

              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>material-twotone:format_size</FuseSvgIcon>
                    Talla:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.tall_Nombre}</Typography>
                </InputLabel>
              </Box>

              </Grid>
              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>material-solid:transgender</FuseSvgIcon>
                    Medida:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_Sexo}</Typography>
                </InputLabel>
              </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>

                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>material-solid:color_lens</FuseSvgIcon>
                    Color:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.colr_Nombre}</Typography>
                </InputLabel>
              </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
                
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>heroicons-outline:archive</FuseSvgIcon>
                    Embalaje:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_EspecificacionEmbalaje}</Typography>
                </InputLabel>
              </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
               
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>material-solid:sell</FuseSvgIcon>
                    Valor Unitario:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_Unidad}</Typography>
                </InputLabel>
              </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
              
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>heroicons-solid:cash</FuseSvgIcon>
                    Impuesto:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_Impuesto}{" "}%</Typography>
                </InputLabel>
              </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
               
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>material-twotone:local_atm</FuseSvgIcon>
                    Descuento:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_Descuento}</Typography>
                </InputLabel>
              </Box>
              </Grid>

              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}>
              
                <Box sx={{ textAlign: "left" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000", display: 'flex', alignItems: 'center' }}>
                    <FuseSvgIcon style={{ fontSize: '20px', marginRight: '5px', color: "#634A9E" }}>heroicons-outline:currency-dollar</FuseSvgIcon>
                    Valor Total:
                  </Typography>
                  <Typography sx={{ marginLeft: '30px' }}>{selectedDetalle.code_Valor}</Typography>
                </InputLabel>
              </Box>
              </Grid>
              <Grid item xs={12} md={4} display={"flex"} justifyContent={"flex-start"} alignContent={"center"}></Grid>
              <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                  {/* Primer acordeón */}
                  <div style={{ margin: '10px' }}>
                  <Accordion style={{ width: "100%"}}  expanded={expanded} onChange={toggleAccordion}>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                    <Icon style={{fontSize: '30px', marginRight: '5px', color: "#dcc265"}}>description</Icon>
                    <Typography variant="h6">Documentos</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ margin: "10px" }}>
                      {/* Contenido del primer acordeón */}
                      <div className="center" style={{ width: "100%"}}>
                        <Table
                          columns={columnsDocumentos}
                          dataSource={filteredRowsDocumentos}
                          size="small"
                          locale={{
                            triggerDesc: "Ordenar descendente",
                            triggerAsc: "Ordenar ascendente",
                            cancelSort: "Cancelar",
                            emptyText: LoadingIcon(),
                          }}
                          pagination={{
                            pageSize: filas,
                            showSizeChanger: false,
                            className: "custom-pagination",
                          }}
                          style={{ tableLayout: 'auto' }} // Ajusta las columnas automáticamente
                          className="table" // Clase para aplicar estilos personalizados a la tabla
                          bodyStyle={{ maxWidth: '100%' }}
                        />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  </div>
                </Grid>

                <Grid item xs={12} md={12}>
                  {/* Segundo acordeón */}
                  <Accordion style={{ width: "95%", margin: "auto"  }} expanded={expandedM} onChange={toggleAccordionM}>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                    <Icon style={{fontSize: '30px', marginRight: '5px', color: "#dcc265"}}>storefront</Icon>
                      <Typography variant="h6">Materiales Brindar</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Contenido del segundo acordeón */}
                      <div className="center" style={{ width: "95%", margin: "auto" }}>
                        <Table
                          columns={columnsMaterialesBrindar}
                          dataSource={filteredRowsMateriales}
                          size="small"
                          locale={{
                            triggerDesc: "Ordenar descendente",
                            triggerAsc: "Ordenar ascendente",
                            cancelSort: "Cancelar",
                            emptyText: LoadingIcon(),
                          }}
                          pagination={{
                            pageSize: filas,
                            showSizeChanger: false,
                            className: "custom-pagination",
                          }}
                          style={{ tableLayout: 'auto' }} // Ajusta las columnas automáticamente
                          className="table" // Clase para aplicar estilos personalizados a la tabla
                        />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              </Grid>

           
          ) : (
            <div>No se ha seleccionado ningún detalle.</div>
          )}
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
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              
              onClick={() => {
                toggleAccordion(false); 
                toggleAccordionM(false); 
                closeModal()
              }}
            >
              Cerrar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Fin del Dialog(Modal) Eliminar */}



    </Card>
  );
}

export default LineadeTiempoPOIndex;
