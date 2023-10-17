/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import History from "src/@history/@history";

import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import FormLabel from "@mui/material/FormLabel";

import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";

//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
//Imports tabla
import { Divider, Table } from "antd";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
//import tabla detalles
//Import service
import ReporteModuloDiaServices from "./ReporteModuloDiaService";
//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
  ToastError,
  ToastSuccess,
  ToastSuccessPersonalizado,
  ToastWarning
} from "src/styles/toastsFunctions";
// import { promises } from "fs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const getRowClassName = (params) => {
  return params.rowIndex % 2 === 0 ? "#f2f2f2" : "#ffffff";
};

function ReporteModuloDia_Crear() {
  //  variables del Formulario
  const defaultReporteModuloDiasValues = {
    remo_Id: "",
    modulo: null,
    remo_Fecha: "",
  };

  const accountSchema = yup.object().shape({
    remo_Id: yup.string(),
    modulo: yup.object().required(""),
    remo_Fecha: yup
      .date()
      .nullable()
      .required("")
      .max(new Date(2100, 0, 1), "No puede ingresar fechas futuras")
      .min(new Date(1900, 0, 1), "Ingrese una fecha mayor a 01/01/1900"),
  });

  //  variables del Formulario 2 //
  const defaultReporteModuloDiasDetalleValues = {
    rdet_TotalDiaDetalle: "",
    rdet_TotalDanadoDetalle: "",

    OrdenCompraDetalle: null,
    ensa_Id:null
  };

  const accountDetalleSchema = yup.object().shape({
    rdet_TotalDiaDetalle: yup
      .number()
      .required("")
      .min(1, "Ingrese una cantidad total valida")
      .max(999999, "Ingrese una cantidad total valida"),
    rdet_TotalDanadoDetalle: yup
      .number()
      .required("")
      .min(0, "Ingrese una cantidad total valida")
      .max(
        yup.ref("rdet_TotalDiaDetalle"),
        "No puedes tener una cantidad mayor a la total"
      ),

    OrdenCompraDetalle: yup.object().required(""),
  });

  const load_DDLs = Load_DDLs();
  const location = useLocation();
  const DatosPrincipales = location.state;
  const navigate = useNavigate();
  const theme = useTheme();
  //const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [value, setValueTap] = React.useState(0);
  const [remo_Id, setremo_Id] = React.useState(0);

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  const [Eliminar, setEliminar] = useState(false);
  const [EliminarVerdadero, setEliminarVerdadero] = useState(false);

  const reporteModuloDiaService = ReporteModuloDiaServices();
  const [data, setData] = useState([]);

  const [modulos_DDL, setModulos_DDL] = useState([]);
  const [Procesos_DDL, setProcesos_DDL] = useState([]);
  const [OrdenCompraDetalle_DDL, setOrdenCompraDetalle_DDL] = useState([]);

  const [ProcesoModulo, setProcesoModulo] = useState("");
  //Toma los elementos de la tabla

  //Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});
  //  primer tap

  const [EditarDetalles, setEditarDetalles] = useState(false);
  const [EditarTap1, setEditarTap1] = useState(false);

  //Cargado de las variables DDL
  async function ddls() {
    setModulos_DDL(await load_DDLs.Modulos());
    
  }

  //Declaracion del formulario
  const {
    handleSubmit: handleSubmitForm1,
    register: register1,
    reset: reset1,
    control: control1,
    watch: watch1,
    formState: formState1,
    setValue: setValue1,
    trigger: triggerDesc1,
  } = useForm({
    defaultReporteModuloDiasValues, //Campos del formulario
    mode: "all",
    resolver: yupResolver(accountSchema), //Esquema del formulario
  });

  //Declaracion del formulario
  const {
    handleSubmit: handleSubmitFormDetalle,
    register: registerDetalle,
    reset: resetDetalle,
    control: controlDetalle,
    watch: watchDetalle,
    formState: formStateDetalle,
    setValue: setValueDetalle,
    trigger: triggerDescDetalle,
  } = useForm({
    defaultValues: defaultReporteModuloDiasDetalleValues, //Campos del formulario
    mode: "all",
    resolver: yupResolver(accountDetalleSchema), //Esquema del formulario
  });

  //Validacion de campos vacios y errores
  const {
    isValid: isValidDetalle,
    dirtyFieldsDetalle,
    errors: errorsDetalle,
  } = formStateDetalle;
  const { isValid, dirtyFields, errors } = formState1;

  //Datos del formulario
  const datosWatch = watch1();
  const datosWatchDetalle = watchDetalle();

  //Peticion para crear un registro
  const ReporteModuloDiaCreate = async () => {
    try {
      const response = await reporteModuloDiaService.crear(datosWatch);
      if (parseInt(response.data.data.messageStatus) > 0) {
        ToastSuccess("El registro se ha insertado exitosamente");
        setremo_Id(parseInt(response.data.data.messageStatus));
        setValue1("remo_Id", parseInt(response.data.data.messageStatus))

        validacion(2), setSearchText("");
        setEditarTap1(true);
        
        ordenCompraDetalleddls(datosWatch.modulo.proc_Id);
        
       } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      ToastError();
    }
  };

  //Peticion para crear un registro
  const ReporteModuloDiaEditar = async () => {
    try {
      const response = await reporteModuloDiaService.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        setremo_Id(datosWatch["remo_Id"]);
        setValue1("remo_Id", remo_Id)
        ordenCompraDetalleddls(datosWatch.modulo.proc_Id);
        validacion(2), setSearchText("");
       // resetDetalle(defaultReporteModuloDiasDetalleValues);
        setEditarTap1(true);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {

    } finally {
      setTimeout(() => {
        triggerDesc1();
      }, 500);
    }
  };

  //Peticion para cargar datos de la tabla
  const ReporteModuloDiaDetalleGetData = async (id) => {
    try {
      const detalles = await reporteModuloDiaService.listarDetalles(id);
      const dataToSet = Array.isArray(detalles) ? detalles : [];
      setData(dataToSet);
    } catch (error) {
    }
  };

  const AsignarDatos = async () => {
    try {

      ordenCompraDetalleddls(DatosPrincipales.proc_Id);

      setremo_Id(DatosPrincipales["remo_Id"]);
      setValue1("remo_Id", DatosPrincipales["remo_Id"], { shouldTouch: true, shouldValidate: true });
      setValue1("modulo", {
        proc_Id: DatosPrincipales.proc_Id,
        value: DatosPrincipales["modu_Id"],
        label: DatosPrincipales["modu_Nombre"],
      }, { shouldTouch: true, shouldValidate: true });
      setValue1("remo_Fecha", DatosPrincipales["remo_Fecha"], { shouldTouch: true, shouldValidate: true });
      setEditarTap1(true);
      validacion(1);

      ReporteModuloDiaDetalleGetData(parseInt(DatosPrincipales["remo_Id"]));
    } catch (error) {
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    ordenCompraddls();

    if (DatosPrincipales !== null) {
      AsignarDatos();
      setTimeout(() => {
        //triggerDesc1();
      }, 1000);
    }
  }, []);

  //Controlador del formulario
  const GuardarReporteModuloDia = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!EditarTap1) {
        ReporteModuloDiaCreate();
      } else {
        ReporteModuloDiaEditar();
      }
    } else {
      ToastWarning("Completa todos los campos");
    }
  };

  //Controlador del formulario
  const ValidarFormularioDetalle = () => {
    try {
      if (!isValidDetalle) {
        ToastWarning("Completa todos los campos");
      } else {
      }
    } catch (errors) {
    }
  };

  //  segundo tap

  async function ordenCompraddls() {
    setProcesos_DDL(await load_DDLs.Procesos());
  }

  async function ordenCompraDetalleddls(id) {
    try {
      setOrdenCompraDetalle_DDL(
        await reporteModuloDiaService.listarProceso(id)
      );
    } catch (error) {
    }
  }

  const [validar, setValidar] = useState(true);

  //Peticion para crear un registro
  const ReporteModuloDiaDetalleCreate = async (datos) => {
    try {
      const response = await reporteModuloDiaService.crearDetalle(datos);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");

        ReporteModuloDiaDetalleGetData(datos.remo_Id);

        setSearchText("");
        resetDetalle(defaultReporteModuloDiasDetalleValues);
        setValidar(false);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
    }
  };

  //Peticion para crear un registro
  const ReporteModuloDiaDetalleEditar = async (datos) => {
    try {
      const response = await reporteModuloDiaService.EditarDetalle(datos);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");

        ReporteModuloDiaDetalleGetData(datos.remo_Id);
        setSearchText("");

        resetDetalle(defaultReporteModuloDiasDetalleValues);
        setEditarDetalles(false);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
      }
    } catch (error) {
    }
    handleClose(datos.rdet_Id);
  };

  const ReporteModuloDiaDelete = async () => {
    try {
      const response = await reporteModuloDiaService.EliminarDetalle(
        datosWatchDetalle
      );
      if (response.data.data.messageStatus == "1") {
        DialogEliminarVerdadero();
        ToastSuccess("El registro ha sido eliminado exitosamente");
        ReporteModuloDiaDetalleGetData(remo_Id);
        resetDetalle(defaultReporteModuloDiasDetalleValues);

        setSearchText("");
      } else {
        DialogEliminarVerdadero();
      }
    } catch (error) {
      DialogEliminarVerdadero();
    }
  };

  const ReporteModuloDiaFinalizar = async () => {
    try {
      const response = await reporteModuloDiaService.Finalizar(data);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessPersonalizado("Exito, El Reporte ha sido finalizado");
        History.push("ReporteModulo");
      } else {
        ToastError();
      }
    } catch (error) {
      ToastError();
    }
  };

  //Controlador del formulario
  const GuardarReporteModuloDiaDetalle = (data) => {
    try {

      const newData = { ...data }; // Crear una copia del objeto data

      newData["remo_Id"] = parseInt(remo_Id);

      if (
        newData["OrdenCompra"] !== "" &&
        newData["OrdenCompraDetalle"] !== "" &&
        newData["rdet_TotalDiaDetalle"] !== "" &&
        newData["rdet_TotalDanadoDetalle"] !== ""
      ) {
        // Resto de tu lógica de validación y creación

        if (!EditarDetalles) {
          ReporteModuloDiaDetalleCreate(newData);
        } else {
          ReporteModuloDiaDetalleEditar(newData);
        }
      } else {
      }
    } catch (error) {
    }
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const DialogEliminarVerdadero = () => {
    setEliminarVerdadero(!EliminarVerdadero);
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

  const handleEdit = async (datos) => {
    handleClose(datos.rdet_Id);

    try {
      const OrdenCompra = Procesos_DDL.find(
        (option) => option.value === parseInt(datos.proc_Id)
      );
      
      var proc_Id = await new Promise((resolve, reject) => {
        reporteModuloDiaService.listarProceso(parseInt(datos.proc_Id))
        .then((result) => resolve(result))
        .catch((error) => reject(error));
      })
      
      const OrdenCompraDetalle = proc_Id.find(
        (option) => option.proc_Id === parseInt(datos.proc_Id)
        );
        
      setValueDetalle("OrdenCompra", OrdenCompra, { shouldTouch: true, shouldValidate: true });
      setValueDetalle("OrdenCompraDetalle", OrdenCompraDetalle, { shouldTouch: true, shouldValidate: true });
      setValueDetalle("rdet_TotalDiaDetalle", datos["rdet_TotalDia"], { shouldTouch: true, shouldValidate: true });
      setValueDetalle("rdet_TotalDanadoDetalle", datos["rdet_TotalDanado"], { shouldTouch: true, shouldValidate: true });
      setValueDetalle("rdet_Id", datos["rdet_Id"], { shouldTouch: true, shouldValidate: true });
      setEditarDetalles(true);
    } catch (error) {
    } finally {
      setTimeout(() => {
        //triggerDescDetalle();
      }, 1000);
    }
  };

  const handleDeleteVerdadero = (datos) => {
    try {
      setValueDetalle("rdet_Id", datos["rdet_Id"]);
      DialogEliminarVerdadero();
      handleClose(datos.rdet_Id);
    } catch (error) {
    }

  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Prenda",
      dataIndex: "esti_Descripcion",
      key: "esti_Descripcion",
      sorter: (a, b) => a.esti_Descripcion.localeCompare(b.esti_Descripcion), //sorting para Letras
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
      sorter: (a, b) => a.CantidadBuenEstado - b.CantidadBuenEstado, //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.rdet_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.rdet_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.rdet_Id)}
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
              id={`menu-${params.rdet_Id}`}
              anchorEl={anchorEl[params.rdet_Id]}
              keepMounted
              open={Boolean(anchorEl[params.rdet_Id])}
              onClose={() => handleClose(params.rdet_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDeleteVerdadero(params)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = [
    "key",
    "esti_Descripcion",
    "rdet_TotalDia",
    "rdet_TotalDanado",
  ];

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

  const handleChange = (event, newValue) => {
    setValueTap(newValue);
  };

  const handleChangeIndex = (index) => {
    setValueTap(index);
  };

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
        tab2: AsignarDatos ? false : true,
      });
      setValueTap(0);
    }

    if (params === 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
      });
      setValueTap(1);
    }

    if (params === 3) {
      settabsEstado({
        tab2: false,
        tab1: false,
      });
      setValueTap(0);
    }
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
  });

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/DfZ8SL7/REPORTEs-M-DULO.png"
        alt="Encabezado de la carta"
      />
      <CardContent sx={{ textAlign: "center" }} />
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{ backgroundColor: "#e5e1fa", color: black }}
          >
            <Tab label="Datos del día" {...a11yProps(0)} />
            <Tab
              label="Pedido de produccion detalles"
              {...a11yProps(1)}
              disabled={tabsEstado.tab1}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* Inicio del Formulario */}
            <form onSubmit={handleSubmitForm1((_data) => {})}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Divider>
                    <Chip label={"Información general"}></Chip>
                  </Divider>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.modulo}>Módulo:</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                          }
                          id="modulo"
                          options={modulos_DDL}
                          value={datosWatch["modulo"] ?? null}
                          onChange={async (event, value) => {
                            try {
                              
                              setValue1("modulo", value);
                              if (!value) {
                                setValue1("modu_Id", []);
                              }
                            } catch (error) {
                              
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!errors.modulo}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                          clearIcon={null}
                        />
                      )}
                      name="modulo"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="remo_Fecha"
                    control={control1}
                    defaultValue={null}
                    render={({ field }) => (
                      <FormControl error={!!errors.remo_Fecha} fullWidth={true}>
                        <FormLabel>Fecha:</FormLabel>
                        <DatePicker
                          onChange={(date) => field.onChange(date)}
                          value={field.value}
                          required
                          renderInput={(_props) => (
                            <TextField
                              className="w-full"
                              {..._props}
                              onBlur={field.onBlur}
                              error={!!errors.remo_Fecha}
                              helperText={
                                errors?.remo_Fecha?.message.includes(
                                  "Invalid Date"
                                )
                                  ? "La fecha ingresada no es valida"
                                  : errors?.remo_Fecha?.message
                              }
                            />
                          )}
                          className="w-full"
                        />
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                  }}
                ></Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                  marginTop: "10px",
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
                  onClick={(event) => {
                    GuardarReporteModuloDia();
                  }}
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
                  onClick={() => {
                    navigate("/ReporteModulo/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </form>
            {/* Fin del Formulario */}
          </TabPanel>

          {/* {Cominzo del segundo formulario} */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* Inicio del Formulario */}
            <form
              onSubmit={handleSubmitFormDetalle((_data) => {
                GuardarReporteModuloDiaDetalle(_data);
              })}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Divider>
                    <Chip label={"Información detallada"}></Chip>
                  </Divider>
                </Grid>
                

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsDetalle.OrdenCompraDetalle}>
                      Órden de Proceso:
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="OrdenCompraDetalle"
                          defaultValue={field.value}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={OrdenCompraDetalle_DDL}
                          value={datosWatchDetalle.OrdenCompraDetalle ?? null}
                          onChange={(event, value) => {
                            try {
                              setValueDetalle("OrdenCompraDetalle", value);
                              setValueDetalle("ensa_Id", value.ensa_Id);
                            } catch (error) {
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                            placeholder="Seleccione una orden"

                              {...params}
                              error={!!errorsDetalle.OrdenCompraDetalle}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                          clearIcon={null}
                        />
                      )}
                      name="OrdenCompraDetalle"
                      control={controlDetalle}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    render={({ field }) => (
                      <FormControl
                        error={!!errorsDetalle.rdet_TotalDiaDetalle}
                        fullWidth
                      >
                        <FormLabel
                          //className="font-medium text-10"
                          component="legend"
                        >
                          Cantidad Terminada:
                        </FormLabel>
                        <TextField
                          {...field}
                          variant="outlined"
                          defaultValue={field.value}
                          error={!!errorsDetalle.rdet_TotalDiaDetalle}
                          placeholder="Cantidad Terminada"
                          fullWidth
                          helperText={
                            errorsDetalle?.rdet_TotalDiaDetalle?.message.includes(
                              "NaN"
                            )
                              ? null
                              : errorsDetalle?.rdet_TotalDiaDetalle?.message
                          }
                          type="number"
                          inputProps={{
                            onInput: (e) => {
                              e.preventDefault();
                              const inputValue = parseInt(e.target.value);
                              if (!isNaN(inputValue)) {
                                field.onChange(Math.max(0, inputValue));
                              }
                            },
                          }}
                        />
                      </FormControl>
                    )}
                    name="rdet_TotalDiaDetalle"
                    control={controlDetalle}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    render={({ field }) => (
                      <FormControl
                        error={!!errorsDetalle.rdet_TotalDanadoDetalle}
                        fullWidth
                      >
                        <FormLabel component="legend">
                          Cantidad Dañada:
                        </FormLabel>
                        <TextField
                          {...field}
                          variant="outlined"
                          helperText={
                            errorsDetalle?.rdet_TotalDanadoDetalle?.message.includes(
                              "NaN"
                            )
                              ? null
                              : errorsDetalle?.rdet_TotalDanadoDetalle?.message
                          }
                          defaultValue={field.value}
                          error={!!errorsDetalle.rdet_TotalDanadoDetalle}
                          placeholder="Cantidad Dañada"
                          fullWidth
                          type="number"
                          inputProps={{
                            min: "0",
                            onInput: (e) => {
                              e.preventDefault();
                              const inputValue = parseInt(e.target.value);
                              if (!isNaN(inputValue)) {
                                field.onChange(Math.max(0, inputValue));
                              }
                            },
                          }}
                        />
                      </FormControl>
                    )}
                    name="rdet_TotalDanadoDetalle"
                    control={controlDetalle}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                  }}
                ></Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                  marginTop: "10px",
                }}
              >
                <Button
                  type="submit"
                  startIcon={<Icon>add</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                    marginTop: "15px",
                  }}
                  sx={{
                    backgroundColor: "#d1af3c",
                    color: "white",
                    "&:hover": { backgroundColor: "#B99B36" },
                  }}
                  onClick={(event) => {
                    ValidarFormularioDetalle();
                  }}
                >
                  Agregar Detalle
                </Button>
              </Grid>
            </form>
            <Grid item xs={12}>
              <Divider>
                <Chip label={"Detalles Agregados"}></Chip>
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Filtros de la tabla (Filas/Buscar) */}
                <Stack direction="row" spacing={1}>
                  <label className="mt-8">Filas por página:</label>
                  <FormControl sx={{ minWidth: 50 }} size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={filas}
                      onChange={handleChangeFilas}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={15}>15</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
              {/* Declaracion de la tabla */}
              <div className="center" style={{ width: "95%", margin: "auto" }}>
                <Table
                  columns={columns}
                  dataSource={filteredRows}
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
                />
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "right",
                marginTop: "10px",
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
                //onClick={() => validacion(1)}
                onClick={(e) => {
                  DialogEliminar();
                }}
              >
                Finalizar
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
                onClick={(e) => {
                  navigate("/ReporteModulo/Index");
                }}
              >
                Cancelar
              </Button>
            </Grid>

            {/* Inicia del Dialog(Modal) Eliminar */}
            <Dialog
              open={EliminarVerdadero}
              fullWidth="md"
              onClose={DialogEliminarVerdadero}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Confirmación de Eliminacio
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
                    color="error"
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    onClick={ReporteModuloDiaDelete}
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
                    onClick={DialogEliminarVerdadero}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </DialogActions>
            </Dialog>

            {/* Inicia del Dialog(Modal) Eliminar */}
            <Dialog
              open={Eliminar}
              fullWidth="md"
              onClose={DialogEliminar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Confirmación de Finalización
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Está seguro(a) que desea finalizar este registro?
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  Le recordamos que una vez que el pedido sea finalizado, no
                  será posible realizar modificaciones en el mismo.
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
                    color="secondary"
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={ReporteModuloDiaFinalizar}
                  >
                    Finalizar
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
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default ReporteModuloDia_Crear;
