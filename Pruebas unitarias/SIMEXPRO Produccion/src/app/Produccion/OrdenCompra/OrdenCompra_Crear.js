/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useEffect } from "react";
import LoadingIcon from "src/styles/iconoCargaTabla";
import History from "src/@history/@history";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';




import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Icon,
  TextField,
  Switch,
  InputAdornment,
  IconButton
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import OrdenCompraReportService from './OrdenCompraReport';

import { Table } from "antd";

//Import para subir archivos
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
  ToastWarningPersonalizado,

} from "src/styles/toastsFunctions";

import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers";


import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import Collapse from "@mui/material/Collapse";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";

import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";

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

//---------------------------------------------------------------------------------------------------------------------------------------------------
function OrdenCompra_Crear() {
  const OrdenCompraService = new OrdenCompraReportService();

  //variable para el dialog(modal) de eliminar
  const [Finalizacion, setFinalizacion] = useState(false);

  const load_DDLs = Load_DDLs()
  const navigate = useNavigate();
  const theme = useTheme();
  const [Cambio, setCambio] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);

  //variable para Bloquear el campo de codigo  al editarlo
  const [CodigoBloqueado, setCodigoBloqueado] = useState(false);

  //Encabezado ddl
  const [Clientes_DDL, setClientes_DDL] = useState([]);
  const [Embalaje_DDL, setEmbajale_DDL] = useState([]);
  const [MetodoPago_DDL, setMetodoPago_DDL] = useState([]);

  //Detalles ddl
  const [Estilos_DDL, setEstilos_DDL] = useState([]);
  const [Tallas_DDL, setTallas_DDL] = useState([]);
  const [Colores_DDL, setColores_DDL] = useState([]);
  const [Procesos_DDL, setProcesos_DDL] = useState([]);

  //MaterialesBrindados ddl
  const [Materiales_DDL, setMateriales_DDL] = useState([]);
  const [UnidadesMedida_DDL, setUnidadesMedida_DDL] = useState([]);

  //Variables a usar en la tabla maestra
  const [DataTablaDetalles, setDataTablaDetalles] = useState([])
  const [DatosMateBrinda, setDatosMateBrinda] = useState([]);
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  /* Constante para el swich de si brindara materiales*/
  const [checked, setChecked] = React.useState(false);
  const [HabilitarMate, SetHabilitarMate] = useState(true)
  const [dialog, setdialog] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [ContadorMateriales, SetContadorMateriales] = useState(0)

  /* Constante para el swich de si pondra impuestos o descuentos*/
  const [checked1, setChecked1] = React.useState(false);
  const [Habilitar, SetHabilitar] = useState(true)

  //Variable booliana que si ya inserto la primera vez si regresa pasara a editar los campos encabezado
  const [PasaEditarEncabezado, SetPasaEditarEncabezado] = useState(false)

  //Variable booliana que si ya inserto la primera vez si regresa pasara a editar los campos de los detalles
  const [PasaEditarDetalles, SetPasaEditarDetalles] = useState(false)

  //Variable booliana que si ya inserto la primera vez si regresa pasara a editar los campos de los detalles
  const [PasaEditarMateBrinda, SetPasaEditarMateBrinda] = useState(false)


  //Variable para saber si el codigo esta repetido 0 es que esta repetido
  const [CodigoRepetido, setCodigoRepetido] = useState(0)

  //Variable booliana que ocultara los botones al momento de insertar materiales
  const [Botones, SetBotones] = useState(true)

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(5);

  const [OrdenCompraID, setOrdenCompraID] = useState("");
  const [OrdenCompraDetalleID, setOrdenCompraDetalleID] = useState("");
  const [MateBrindaID, setMateBrindaID] = useState("");

  const [DatosDocumentosDetalles, setDatosDocumentosDetalles] = useState([])





  //Cargado de las variables DDL
  async function ddls() {
    setClientes_DDL(await load_DDLs.Clientes());
    setEmbajale_DDL(await load_DDLs.TipoEmbalaje());
    setMetodoPago_DDL(await load_DDLs.FormasPago());


    setEstilos_DDL(await load_DDLs.Estilos());
    setTallas_DDL(await load_DDLs.Tallas());
    setColores_DDL(await load_DDLs.Colores());
    setProcesos_DDL(await load_DDLs.Procesos());

    setMateriales_DDL(await load_DDLs.Materiales());
    setUnidadesMedida_DDL(await load_DDLs.UnidadMedida());
  }

  {
    /* Función para mostrar la tabla de detalles y mostrar agregar materiales */
  }
  const CancelarMatebrimTabla = () => {
    VisibilidadTabla()
    SetBotones(true);
  };

  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);

  };

  useEffect(() => {
    ddls();

  }, []);


  //Controlar si incluira Materiales Brindados por el cliente
  const handleChangeMaterialesBrindados = (event) => {

    setChecked(event.target.checked);


    if (event.target.checked) {
      SetHabilitarMate(false)
    }
    else {
      ContadorMaterialesBrindados();

    }
  };



  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
    //setMessage(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setCambio(newValue);
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------
  //Primer Formulario del Encabezado
  const OrdenCompraEncabezado = {
    Codigo: "",
    FechaComenzar: "",
    FechaLimite: "",
    Direccion: "",

    Cliente: null,
    TipoPago: null,
    Embalaje: null,

  };



  const schemaOrdenCompraEncabezado = yup.object().shape({
    Codigo: yup
      .string()
      .trim()
      .required("Este campo es obligatorio")
      .min(5, 'El Codigo debe contener al menos 5 caracteres')
      .matches(/^[a-zA-Z0-9]+$/, 'El Codigo debe contener solo números y letras')
      .test(
        'codigo-unico',
        'El Codigo debe contener solo números y letras',
        (value) => /^[a-zA-Z0-9]+$/.test(value)
      ),
    FechaComenzar: yup.date().required("").typeError('Formato de fecha inválido') 
    .nullable(), 

    FechaLimite: yup
    .date()
    .required("")
    .test(
      'fecha-limite-mayor',
      'La fecha límite debe ser mayor que la fecha de comienzo',
      function (value) {
        const fechaComienzo = this.resolve(yup.ref('FechaComenzar'));
        return !fechaComienzo || !value || value > fechaComienzo;
      }
    )
    .typeError('Formato de fecha inválido') 
    .nullable(), 

    Direccion: yup.string().trim().max(250).required(""),
    Cliente: yup.object().required(""),
    TipoPago: yup.object().required(""),
    Embalaje: yup.object().required(""),

  });

  //Declaracion del formulario Orden Compra Encabezado
  const { handleSubmit: handleSubmitEncabezado, register: registerEncabezado, reset: resetEncabezado, control: controlEncabezado, watch: watchEncabezado, formState: formStateEncabezado, setValue: setValueEncabezado } = useForm({
    OrdenCompraEncabezado, //Campos del formulario
    mode: "all",
    resolver: yupResolver(schemaOrdenCompraEncabezado), //Esquema del formulario
  });

  //Validacion de campos vacios y errores Orden Compra Encabezado
  const { isValid: isValidEncabezado, dirtyFields: dirtyFieldsEncabezado, errors: errorsEncabezado } = formStateEncabezado;

  //Datos del formulario Orden Compra Encabezado
  const datosWatchEncabezado = watchEncabezado();

  //Controlador del formulario del encabezado
  const GuardarEncabezado = () => {

    if (PasaEditarEncabezado == false) {
      if ((datosWatchEncabezado.Direccion === null) && !checked) {
        ToastWarning("Completa todos los campos");
      } else {

        if (CodigoRepetido == 0) {
          if (isValidEncabezado) {
            InsertarEncabezado();
          } else {
            ToastWarning("Completa todos los campos");
          }
        } else {
          ToastWarningPersonalizado("El Codigo de Item ya existe");
        }
      }
    }
    else {
      if ((datosWatchEncabezado.Direccion === null) && !checked) {
        ToastWarning("Completa todos los campos");
      } else {
        if (isValidEncabezado) {
          // Validacion de campos completos
          EditarEncabezado();
        } else {
          ToastWarning("Completa todos los campos");
        }
      }
    }
  };

  //Peticion para crear un registro Encabezado
  const InsertarEncabezado = async () => {
    try {
      const response = await OrdenCompraService.OrdenCompraEncabezadoCrear(datosWatchEncabezado, checked);
      if (response.data.data.messageStatus != "0") {
        ToastSuccess("El registro se ha insertado exitosamente");
        setOrdenCompraID(response.data.data.messageStatus)
        setCodigoBloqueado(true)
        SetPasaEditarEncabezado(true)
        validacion(2)
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  //Peticion para Editar un registro Encabezado
  const EditarEncabezado = async () => {
    try {
      const response = await OrdenCompraService.OrdenCompraEncabezadoEditar(datosWatchEncabezado, checked, OrdenCompraID);
      if (response.data.data.messageStatus != "0") {
        ToastSuccess("El registro se ha editado exitosamente");
        validacion(2)
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  //Verificacion si el codigo unico del la orden esta repetido
  const VerificacionCodigo = async (Id) => {
    try {
      if (Id !== undefined && Id !== "" && Id !== null) {
        setCodigoRepetido(await OrdenCompraService.VerificacionCodigo(Id))
      }
    } catch (error) {
      
    }
  }

  //Cuenta los materiales brindados si quiere cambiar la opcion de agregar materiales 
  const ContadorMaterialesBrindados = async () => {
    try {
      let contadorMateriales = 0;
      const response = await OrdenCompraService.listarDetalles(OrdenCompraID);
      for (const codigos of response) {
        const materialesBrindados = await OrdenCompraService.listarMaterialesBrindados(codigos.code_Id);
        contadorMateriales += materialesBrindados.length;
      }

      if (contadorMateriales != 0)
        DialogEliminarMaterialesVerificacion();
      else {
        SetHabilitarMate(true)
      }
      SetContadorMateriales(contadorMateriales);
    } catch (error) {
      
    }
  };

  //Abrir el modal para verificar si hay materiales brindados para no eliminar
  const DialogEliminarMaterialesVerificacion = () => {
    setEliminar(!Eliminar);
  };

  //Cerrar el modal y marcar de nuevo de que lleva materiales brindados
  const DialogEliminarMaterialesVerificacionCancelar = () => {
    setEliminar(!Eliminar);
    setChecked(true)
  };


  //Controlar si incluira impuestos y habilita los campos
  const handleChangeImpuestos = (event) => {
    setChecked1(event.target.checked);
    setTimeout(() => {

      if (checked1) {
        SetHabilitar(true)
        setValueDetalles("Impuesto", 0);
      }
      else {
        SetHabilitar(false)
      }
    }, "0");
  };
  //----------------------------------------------------------------------------------------------------------------------------------------------
  //Segundo Formulario del Detalle
  const OrdenCompraDetalle = {
    Cantidad: "",
    EmbalajeEspecificacion: "",
    PrecioU: "",
    Sexo: null,
    Impuesto: "0",

    Estilo: null,
    Talla: null,
    Color: null,
    Procesos: null,
  };

  const schemaOrdenCompraDetalle = yup.object().shape({
    Cantidad: yup.number().required().min(1),
    Impuesto: yup.string().test('Impuesto', 'Impuesto no válido', (value) => {
      if (!value) return false;
      const floatValue = parseFloat(value);
      if (isNaN(floatValue)) return false;
      if (floatValue < 0) return false;
      const decimalPart = (floatValue % 1).toFixed(2).substring(2);
      return decimalPart.length <= 2;
    }),

    PrecioU: yup.string().test('precio', 'Precio no válido', (value) => {
      if (!value) return false;
      const floatValue = parseFloat(value);
      if (isNaN(floatValue)) return false;
      if (floatValue < 0) return false;
      const decimalPart = (floatValue % 1).toFixed(2).substring(2);
      return decimalPart.length <= 2;
    }).required(),
    Sexo: yup.string().required(),
    EmbalajeEspecificacion: yup.string().trim().max(200).required(),

    Estilo: yup.object().required(""),
    Talla: yup.object().required(""),
    Color: yup.object().required(""),
    Procesos: yup.array().of(yup.object().required()).min(1, 'Seleccione al menos un proceso'),


  });

  //Declaracion del formulario Orden Compra Detalle
  const { handleSubmit: handleSubmitDetalles, register: registerDetalles, reset: resetDetalles, control: controlDetalles, watch: watchDetalles, formState: formStateDetalles, setValue: setValueDetalles, trigger } = useForm({
    defaultValues: OrdenCompraDetalle, //Campos del formulario
    mode: "all",
    resolver: yupResolver(schemaOrdenCompraDetalle), //Esquema del formulario
  });

  //Validacion de campos vacios y errores Orden Compra Detalle
  const { isValid: isValidDetalles, dirtyFields: dirtyFieldsDetalles, errors: errorsDetalles } = formStateDetalles;

  //Datos del formulario Orden Compra Detalle
  const datosWatchDetalles = watchDetalles();

  const CargarEditarDetalles = (params) => {
    SetPasaEditarDetalles(true)
    handleClose(params.code_Id)
    setOrdenCompraDetalleID(params.code_Id);
    setValueDetalles("Cantidad", params.code_CantidadPrenda, { shouldValidate: true, shouldTouch: true });
    setValueDetalles("PrecioU", params.code_Unidad, { shouldValidate: true, shouldTouch: true });
    if (params.code_Impuesto != 0) {
      setChecked1(true)
      SetHabilitar(false)
    }
    setValueDetalles("Impuesto", params.code_Impuesto, { shouldValidate: true, shouldTouch: true });
    setTimeout(() => {
      setValueDetalles("Sexo", params.code_Sexo.toString(), { shouldValidate: true, shouldTouch: true });
    }, "500");

    setValueDetalles("EmbalajeEspecificacion", params.code_EspecificacionEmbalaje, { shouldValidate: true, shouldTouch: true });

    const selectedTalla = Tallas_DDL.find(option => option.value === params.tall_Id);
    setValueDetalles("Talla", selectedTalla, { shouldValidate: true, shouldTouch: true });

    const selectedEstilo = Estilos_DDL.find(option => option.value === params.esti_Id);
    setValueDetalles("Estilo", selectedEstilo, { shouldValidate: true, shouldTouch: true });

    const selectedColor = Colores_DDL.find(option => option.value === params.colr_Id);
    setValueDetalles("Color", selectedColor, { shouldValidate: true, shouldTouch: true });

    CargaListadoDocumentos(params.code_Id)
    CargaListadoProcesos(params.code_Id)
  };

  //Listado de todos los detalles de la orden de compra Tabla
  const ListadoOrdenesCompraDetalles = async () => {
    try {
      const response = await OrdenCompraService.listarDetalles(OrdenCompraID)
      setDataTablaDetalles(response)
    } catch (error) {
      
    }
  };

  //Cargar la tabla de documentos
  const CargaListadoDocumentos = async (ID) => {
    try {
      setDatosDocumentosDetalles(await OrdenCompraService.ListarDocumentos(ID))
    } catch (error) {
    }
  };

  //Cargar el multiselect de procesos
  const CargaListadoProcesos = async (ID) => {
    try {
      const nuevosProcesos = await OrdenCompraService.ListarProcesosPorDetalle(ID);
      const procesosTraidosIds = nuevosProcesos.map(proceso => proceso.proc_Id);
      const procesosSeleccionados = Procesos_DDL.filter(proceso => procesosTraidosIds.includes(proceso.value));
      setValueDetalles("Procesos", procesosSeleccionados);
    } catch (error) {
    }
  };

  //Controlador del formulario de detalles al moemnto de editar o insertar
  const GuardarDetalles = () => {

    if (datosWatchDetalles.Impuesto == "" || datosWatchDetalles.Impuesto == undefined || datosWatchDetalles.Impuesto == null) {
      setValueDetalles("Impuesto", 0, { shouldValidate: true, shouldTouch: true })
    }
    if ((datosWatchDetalles === null)) {
      ToastWarning("Completa todos los campos");
    } else {
      if (isValidDetalles) {
        if (CodigoRepetido == 0) {
          if (PasaEditarDetalles == false)
            InsertarDetalles();
          else
            EditarDetalles();
        } else {
          ToastWarningPersonalizado("El Codigo de Item ya existe");
        }
      }
      else {
        ToastWarning("Completa todos los campos");
      }
    }
  };

    //Insertar un nuevo registro de la orden de compra
    const InsertarDetalles = async () => {
      try {
        const response = await OrdenCompraService.OrdenCompraDetallesCrear(datosWatchDetalles, OrdenCompraID);
        if (response.data.data.messageStatus != "0") {

          setOrdenCompraDetalleID(response.data.data.messageStatus)
          setTimeout(() => {
            datosWatchDetalles.Procesos.forEach(element => {
              InsertarProcesosOrdenCompra(element.value, response.data.data.messageStatus)
            });
          }, "500");

          ToastSuccess("El registro se ha insertado exitosamente");
          ListadoOrdenesCompraDetalles(OrdenCompraID)
          resetDetalles(OrdenCompraDetalle)
          SetHabilitar(true)
          setChecked1(false)
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //Editar los detalles de la orden de compra
    const EditarDetalles = async () => {
      try {
        const response = await OrdenCompraService.OrdenCompraDetallesEditar(datosWatchDetalles, OrdenCompraID, OrdenCompraDetalleID);
        if (response.data.data.messageStatus != "0") {
          ToastSuccess("El registro se ha Editado exitosamente");
          CargaListadoDocumentos(0)
          EliminarIngresarProcesos(OrdenCompraDetalleID)
          ListadoOrdenesCompraDetalles(OrdenCompraID)
          SetPasaEditarDetalles(false)

          SetHabilitar(true)
          setChecked1(false)
          resetDetalles(OrdenCompraDetalle)
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //Insertar los procesos de la orden de compra 
    const InsertarProcesosOrdenCompra = async (ProcesoID, ID) => {
      try {
        const response = await OrdenCompraService.InsertarProcesosOrdenCompraDetalle(ProcesoID, ID);
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //Al momento de editar un detalle de la orden los procesos se eliminan y se vuelven a insertar los modificados
    const EliminarIngresarProcesos = async (ID) => {
      try {
        const response = await OrdenCompraService.EliminarProcesos(ID);
        if (response.data.data.messageStatus == "1") {
          setTimeout(() => {
            datosWatchDetalles.Procesos.forEach(element => {
              InsertarProcesosOrdenCompra(element.value, ID)
            });
          }, "500");
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //Eliminar un detalle de la orden de compra
    const EliminarDetalles = async (ID) => {
      try {
        const response = await OrdenCompraService.OrdenCompraDetallesEliminar(ID);
        if (response.data.data.messageStatus == "1") {
          ToastSuccess("El registro se ha Editado exitosamente");
          ListadoOrdenesCompraDetalles(OrdenCompraID)
        } else if (response.data.data.messageStatus.includes("conflicted")) {
          ToastWarningPersonalizado("No se puede eliminar detalle siendo utilizado")
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //-------------------------------------------------------------------------------------------------------
    //Subir Documentos

    //Enlace con el servidor
    const getUploadParams = ({ meta }) => {
      return { url: 'https://httpbin.org/post' }
    }

    //Comprovar el estado de los archivos, //subidos o en proceso
    const handleChangeStatus = ({ meta, file }, status) => {

    }

    // Subir los documentos al servidor de archivos y recuperar el link para visualizarlos
    const handleSubmitDocumentos = async (files, allFiles) => {
      if (files == null || files == undefined) {
        ToastWarning("Agregue documentos");
      } else {
        try {
          if (OrdenCompraDetalleID == undefined || OrdenCompraDetalleID == "" || OrdenCompraDetalleID == null) {
            ToastWarningPersonalizado("Documentos no enlazados a un detalle");
          }
          else {
            const URLPromises = files.map(f => OrdenCompraService.SubidaArchivos(f.file));
            const URLs = await Promise.all(URLPromises);

            URLs.forEach((url, index) => {
              const file = files[index];
              SubirDocumentos(file.file.name, url, file.file.type)
            });
            allFiles.forEach(f => f.remove())
            ToastSuccess();
          }
        } catch (error) {

        }
      }
    }
    //Subir la informacion arrojada por el servidor para subirla a la base de datos propia
    const SubirDocumentos = async (Nombre, Link, Tipo) => {
      try {
        const response = await OrdenCompraService.OrdenCompraDetallesDocumentosCrear(Nombre, Link, Tipo, OrdenCompraDetalleID);
        if (response.data.data.messageStatus == "1") {
          if (PasaEditarDetalles)
            CargaListadoDocumentos(OrdenCompraDetalleID)
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //Eliminar la informacion de documentos de la base de datos
    const EliminarDocumentos = async (ID) => {
      try {
        const response = await OrdenCompraService.OrdenCompraDetallesDocumentosEliminar(ID);
        if (response.data.data.messageStatus == "1") {
          ToastSuccess("El registro se ha Editado exitosamente");
          ListadoOrdenesCompraDetalles(OrdenCompraID)
          CargaListadoDocumentos(OrdenCompraDetalleID)
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------
    //Tercer Formulario del Materiales Brindados
    const MaterialesBrindados = {
      CantidadM: "",
      Material: null,
      UnidadMedida: null,
    };

    const schemaMaterialesBrindados = yup.object().shape({
      CantidadM: yup.number().required().min(1),
      Material: yup.object().required(""),
      UnidadMedida: yup.object().required(""),
    });

    //Declaracion del formulario Materiales Brindados
    const { handleSubmit: handleSubmitMateBrinda, register: registerMateBrinda, reset: resetMateBrinda, control: controlMateBrinda, watch: watchMateBrinda, formState: formStateMateBrinda, setValue: setValueMateBrinda } = useForm({
      MaterialesBrindados, //Campos del formulario
      mode: "all",
      resolver: yupResolver(schemaMaterialesBrindados), //Esquema del formulario
    });

    //Validacion de campos vacios y errores Materiales Brindados
    const { isValid: isValidMateBrinda, dirtyFields: dirtyFieldsMateBrinda, errors: errorsMateBrinda } = formStateMateBrinda;

    //Datos del formulario Materiales Brindados
    const datosWatchMateBrinda = watchMateBrinda();

    const ListadoMaterialesBrindados = async (code_Id) => {
      try {
        setDatosMateBrinda(await OrdenCompraService.listarMaterialesBrindados(code_Id))

      } catch (error) {
        
      }
    };




    //--------------------------------------------------------------------------------------------------------
    //Controlador del formulario del encabezado
    const GuardarMaterialesBrindados = () => {
      if ((datosWatchMateBrinda.UnidadMedida === null)) {

        ToastWarning("Completa todos los campos");
      } else {
        if (isValidMateBrinda) {
          // Validacion de campos completos

          if (PasaEditarMateBrinda == false)
            InsertarMateBrinda();
          else
            EditarMateBrinda();
        } else {
          ToastWarning("Completa todos los campos");
        }
      }
    };

    //Al editar cargar la informacion de materiales brindados
    const CargarMateBrinda = (datos) => {

      SetBotones(false);
      VisibilidadTabla();
      handleCloseMate(datos.mabr_Id);
      setOrdenCompraDetalleID(datos.code_Id)
      setMateBrindaID(datos.mabr_Id);
      SetPasaEditarMateBrinda(true)

      setValueMateBrinda("CantidadM", datos.mabr_Cantidad, { shouldValidate: true, shouldTouch: true });

      const selectedMaterial = Materiales_DDL.find(option => option.value === datos.mate_Id);
      setValueMateBrinda("Material", selectedMaterial, { shouldValidate: true, shouldTouch: true });

      const selectedUnidadMedida = UnidadesMedida_DDL.find(option => option.value === datos.unme_Id);
      setValueMateBrinda("UnidadMedida", selectedUnidadMedida, { shouldValidate: true, shouldTouch: true });
    };

    //Editar los materiales brindados
    const EditarMateBrinda = async () => {
      try {
        const response = await OrdenCompraService.MaterialesBrindadosEditar(datosWatchMateBrinda, MateBrindaID, OrdenCompraDetalleID);

        if (response.data.data.messageStatus == "1") {
          ToastSuccess("El registro se ha insertado exitosamente");

          ListadoOrdenesCompraDetalles(OrdenCompraID)
          ListadoMaterialesBrindados(OrdenCompraDetalleID)
          VisibilidadTabla();
          resetMateBrinda(MaterialesBrindados)
          SetBotones(true);
          SetPasaEditarMateBrinda(false)

        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //Insertar los materiales brindados
    const InsertarMateBrinda = async () => {

      try {
        const response = await OrdenCompraService.MaterialesBrindadosCrear(datosWatchMateBrinda, OrdenCompraDetalleID);

        if (response.data.data.messageStatus == "1") {
          ToastSuccess("El registro se ha insertado exitosamente");

          ListadoOrdenesCompraDetalles(OrdenCompraID)
          ListadoMaterialesBrindados(OrdenCompraDetalleID)
          VisibilidadTabla();
          resetMateBrinda(MaterialesBrindados)
          SetBotones(true);

        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    //Eliminar materiales brindados
    const EliminarMateBrinda = async (MaterialID) => {
      try {
        const response = await OrdenCompraService.MaterialesBrindadosEliminar(MaterialID);
        if (response.data.data.messageStatus == "1") {
          ToastSuccess("El registro se ha insertado exitosamente");
          setMateBrindaID(MaterialID);
          ListadoOrdenesCompraDetalles(OrdenCompraID)
          ListadoMaterialesBrindados(OrdenCompraDetalleID)
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };


    //--------------------------------------------------------------------------------------------------------

    //Controlador del dialog(modal) de Finalizcion de Pedido
    const DialogFinalizarOrdenCompra = () => {
      setFinalizacion(!Finalizacion);
    }

    //Finalizar la orden de compra 
    const FinalizarOrdenCompra = async () => {
      try {
        const response = await OrdenCompraService.FinalizarOrdenCompra(OrdenCompraID);
        if (response.data.data.messageStatus == "1")
          History.push('/OrdenCompra/index')

      } catch (error) {
        ToastError();
      }
    }

    //Iconos de informacion arriba de impuestos y procesos
    const BootstrapTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: '#6a2b85',
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#6a2b85',
        textAlign: 'justify'
      },
    }));



    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        sorter: (a, b) => a.key - b.key, //sorting para Numeros
      },
      {
        title: 'Codigo Item',
        dataIndex: 'code_Id',
        key: 'code_Id',
        sorter: (a, b) => a.code_Id.localeCompare(b.code_Id),
      },
      {
        title: 'Estilo',
        dataIndex: 'esti_Descripcion',
        key: 'esti_Descripcion',
        sorter: (a, b) => a.esti_Descripcion.localeCompare(b.esti_Descripcion),
      },
      {
        title: 'Talla',
        dataIndex: 'tall_Nombre',
        key: 'tall_Nombre',
        sorter: (a, b) => a.tall_Nombre.localeCompare(b.tall_Nombre),
      },
      {
        title: 'Color',
        dataIndex: 'colr_Nombre',
        key: 'colr_Nombre',
        sorter: (a, b) => a.colr_Nombre.localeCompare(b.colr_Nombre),
      },
      {
        title: "Acciones",
        key: "operation",
        render: (params) => (
          <div key={params.code_Id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.code_Id}`}
                aria-haspopup="true"
                onClick={(e) => handleClick(e, params.code_Id)}
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
                orco_Id={`menu-${params.code_Id}`}
                anchorEl={anchorEl[params.code_Id]}
                keepMounted
                open={Boolean(anchorEl[params.code_Id])}
                onClose={() => handleClose(params.code_Id)}
              >
                 <MenuItem onClick={() => CargarEditarDetalles(params)}>
                  <Icon>edit</Icon>ㅤEditar
                </MenuItem>

                <MenuItem onClick={() => EliminarDetalles(params.code_Id  /*params.role_Descripcion, params.detalles*/)}>
                  <Icon>delete</Icon>ㅤEliminar
                </MenuItem>

                <MenuItem style={{ display: HabilitarMate ? 'none' : 'block' }} onClick={() => handleAddMaterial(params)} >
                  <Icon>add</Icon>ㅤAñadir Materiales
                </MenuItem>

              </Menu>
            </Stack>
          </div>
        ),
      },


    ];

    const columnsDocumentos = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        sorter: (a, b) => a.key - b.key, //sorting para Numeros
      },

      {
        title: 'Documento',
        dataIndex: 'dopo_Archivo',
        key: 'dopo_Archivo',
        sorter: (a, b) => a.colr_Nombre.localeCompare(b.dopo_TipoArchivo),
        render: (text, record) => (
          <a href={record.dopo_Archivo} target="_blank" rel="noopener noreferrer">
            Visualizador
          </a>
        ),
      },
      {
        title: 'Nombre Archivo',
        dataIndex: 'dopo_NombreArchivo',
        key: 'dopo_NombreArchivo',
        sorter: (a, b) => a.dopo_NombreArchivo.localeCompare(b.dopo_NombreArchivo),
      },

      {
        title: 'Tipo Documento',
        dataIndex: 'dopo_TipoArchivo',
        key: 'dopo_TipoArchivo',
        sorter: (a, b) => a.colr_Nombre.localeCompare(b.dopo_TipoArchivo),
      },
      {
        title: "Acciones",
        key: "operation",
        render: (params) => (
          <div key={params.dopo_Id}>
            <Button
              variant="contained"
              color="error"
              style={{
                borderRadius: "10px",
              }}
              onClick={() => EliminarDocumentos(params.dopo_Id)}
            >
              <Icon>delete</Icon>
            </Button>
          </div>
        ),
      }
    ];

    //Abrir espacio de materiales brindados
    const handleAddMaterial = (params) => {
      setOrdenCompraDetalleID(params.code_Id)
  
      SetBotones(false);
      VisibilidadTabla();
      handleClose(params.code_Id);
    };
  

    

    //Constante para el boton de opciones
    const [anchorEl, setAnchorEl] = useState({});

    //Constante para el boton de opciones
    const [anchorElMate, setAnchorElMate] = useState({});

    //Constante cuando se hace click para el boton de opciones Materiales brinda
     const handleClickMate = (event, id) => {
       setAnchorElMate((prevState) => ({
         ...prevState,
         [id]: event.currentTarget,
   
       }));
     };
   
       //Cerrar espacio de opciones materiales brindados
       const handleCloseMate = (id) => {
         setAnchorElMate((prevState) => ({
           ...prevState,
           [id]: null,
         }));
       };

    //Constante cuando se hace click para el boton de opciones
    const handleClick = (event, id) => {

      setAnchorEl((prevState) => ({
        ...prevState,
        [id]: event.currentTarget,

      }));
    };

    //Cerrar espacio de materiales brindados
    const handleClose = (id) => {
      setAnchorEl((prevState) => ({
        ...prevState,
        [id]: null,
      }));
    };

    //Columnas de materiales brindados segunda tabla de la tabla maestra
    const columnsExpandable = [
      {
        title: 'ID',
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
        sorter: (a, b) => {
          if (typeof a.mabr_Cantidad === 'string' && typeof b.mabr_Cantidad === 'string') {
            return a.mabr_Cantidad.localeCompare(b.mabr_Cantidad);
          } else {

            return a.mabr_Cantidad - b.mabr_Cantidad;
          }
        },
      },
      {
        title: 'Unidad de Medida',
        dataIndex: 'unme_Descripcion',
        key: 'unme_Descripcion',
        sorter: (a, b) => a.unme_Descripcion.localeCompare(b.unme_Descripcion),
      },
      {
        title: "Acciones",
        key: "operation",
        render: (params) => (
          <div key={params.mabr_Id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.mabr_Id}`}
                aria-haspopup="true"
                onClick={(e) => handleClickMate(e, params.mabr_Id)}
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
                id={`menu-${params.mabr_Id}`}
                anchorEl={anchorElMate[params.mabr_Id]}
              
                keepMounted
                open={Boolean(anchorElMate[params.mabr_Id])}
                onClose={() => handleCloseMate(params.mabr_Id)}
              >
                <MenuItem onClick={() => CargarMateBrinda(params)}>
                  <Icon>edit</Icon>ㅤEditar
                </MenuItem>
  
  
                <MenuItem onClick={() => EliminarMateBrinda(params.mabr_Id)}>
                  <Icon>delete</Icon>ㅤEliminar
                </MenuItem>
  
              </Menu>
            </Stack>
          </div>
        ),
      },

    ];


  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "code_Id", "esti_Descripcion", "tall_Nombre", "colr_Nombre"];
 
  //Constantes que ayuda a filtrar el datatable
    const filteredRows = DataTablaDetalles.filter((row) => {
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

    const camposToFilterDocumentos = ["dopo_Id", "dopo_NombreArchivo", "dopo_TipoArchivo"];

    //Constantes que ayuda a filtrar el datatable
    const filteredRowsDocumentos = DatosDocumentosDetalles.filter((row) => {
      if (searchText === "") {
        return true; // Mostrar todas las filas si el buscador está vacío
      }

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
            return true;
          }
        }
      }
      return false;
    });

    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };


    //Expandir tabla maestra de materiales brindados
    const expandableConfig = {
      expandedRowKeys: [expandedRowKey],
      expandedRowRender: (record) => (
        <Table
          columns={columnsExpandable}

          dataSource={DatosMateBrinda}
          locale={{
            triggerDesc: "Ordenar descendente",
            triggerAsc: "Ordenar ascendente",
            cancelSort: "Cancelar",

          }}
          pagination={false}
        />
      ),
      rowExpandable: (record) => record.name !== "Not Expandable",
      onExpand: async (expanded, record) => {
        if (expanded) {
          await ListadoMaterialesBrindados(record.code_Id);
          setExpandedRowKey(record.key);
        } else {
          setExpandedRowKey(null);
        }
      },
    };



    //------------------------------------------------------------------------------------------------------
    //Hacer el cambio de tab
    const handleChangeIndex = (index) => {
      setCambio(index);
    };

    //Hacer el cambio de tab
    const validacion = (params, event) => {
      if (event) {
        event.preventDefault();
      }
      if (params === 1) {
        settabsEstado({
          tab1: false,
          tab2: true,
        });
        setCambio(0);
      }

      if (params === 2) {
        settabsEstado({
          tab1: false,
          tab2: false,
        });
        setCambio(1);
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
          image="https://i.ibb.co/D5SZnc4/ORDEN-DE-COMPRA.png"
          alt="Encabezado de la carta"
        />

        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              value={Cambio}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{ backgroundColor: "#e5e1fa", color: black }}
            >
              <Tab
                label="I. Datos Generales de la Órden de Compra"
                {...a11yProps(0)}
              />
              <Tab
                label="II. Detalles de la Órden de Compra"
                {...a11yProps(1)}
                disabled={tabsEstado.tab1}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={Cambio}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={Cambio} index={0} dir={theme.direction}>


              {/* Dialog para eliminar materiales brindados inicio*/}
              <Dialog
                open={Eliminar}
                fullWidth={"md"}
                onClose={Dialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Cambiar Materiales brindados"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Esta Orden tiene {ContadorMateriales} materiales brindados. Se debe eliminar todas los materiales brindados de los items para desactivar esta opciòn.
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
                      startIcon={<Icon>close</Icon>}
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "10px" }}
                      sx={{
                        backgroundColor: "#DAD8D8",
                        color: "black",
                        "&:hover": { backgroundColor: "#BFBABA" },
                      }}
                      onClick={DialogEliminarMaterialesVerificacionCancelar}
                    >
                      Salir
                    </Button>
                  </Grid>
                </DialogActions>
              </Dialog>
              {/* Dialog para eliminar un registro fin*/}
              <form onSubmit={handleSubmitEncabezado((_data) => { })}>
                <Card>
                  <CardContent>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="" color="rgb(10, 0, 66)">
                          A. Datos Generales de la Órden de Compra
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormLabel
                            error={!!errorsEncabezado.Codigo} id="group-label"
                            className="font-medium text-12"
                            component="legend">
                            Código Único :
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <>
                                <TextField
                                  {...field}
                                  id="outlined"
                                  onBlur={() => {
                                    VerificacionCodigo(field.value);
                                  }}
                                  placeholder="Ingrese el Código Unico"
                                  inputProps={{
                                    maxLength: 15,
                                  }}
                                  disabled={CodigoBloqueado}
                                  error={!!errorsEncabezado.Codigo || CodigoRepetido === 1}
                                  helperText={
                                    errorsEncabezado.Codigo
                                      ? errorsEncabezado.Codigo.message // Mostrar mensaje de validación de Yup
                                      : CodigoRepetido === 1
                                        ? 'El codigo ya existe'
                                        : ''
                                  }
                                />
                              </>
                            )}
                            name="Codigo"
                            control={controlEncabezado}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>

                        <FormControl fullWidth>

                          <FormLabel
                            error={!!errorsEncabezado.Cliente}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Cliente Encargado de la Órden:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="Cliente"
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value
                                }
                                style={{ borderRadius: "3px" }}
                                options={Clientes_DDL}
                                value={datosWatchEncabezado.Cliente ?? null}
                                disableClearable={true}

                                onChange={(event, value) => {
                                  setValueEncabezado("Cliente", value);

                                }}
                                renderInput={(params) => (
                                  <TextField {...params} error={!!errorsEncabezado.Cliente}
                                    placeholder="Selecione un Cliente"
                                  />
                                )}
                              />
                            )}
                            name="Cliente"
                            error={!!errorsEncabezado.Cliente}
                            control={controlEncabezado}
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <Controller
                          name="FechaComenzar"
                          control={controlEncabezado}
                          render={({ field }) => (
                            <FormControl
                              error={!!errorsEncabezado.FechaComenzar}
                              fullWidth={true}
                            >
                              <FormLabel className="font-medium text-12" component="legend">
                                Fecha de Comienza:
                              </FormLabel>
                              <DateTimePicker
                                onChange={(date) => field.onChange(date)}
                                value={field.value || null}
                                required
                                renderInput={(_props) => (
                                  <TextField
                                    className="w-full"
                                    {..._props}
                                    onBlur={field.onBlur}
                                    error={!!errorsEncabezado.FechaComenzar}
                                    helperText={
                                      errorsEncabezado?.FechaComenzar?.message.includes(
                                        "NaN"
                                      )
                                        ? null
                                        : errorsEncabezado?.FechaComenzar?.message
                                    }
                                  />
                                )}
                                className="w-full"
                              />
                            </FormControl>
                          )}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Controller
                          name="FechaLimite"
                          control={controlEncabezado}
                          render={({ field }) => (
                            <FormControl
                              error={!!errorsEncabezado.FechaLimite}
                              fullWidth={true}
                            >
                              <FormLabel className="font-medium text-12" component="legend">
                                Fecha de Límite:
                              </FormLabel>
                              <DateTimePicker
                                onChange={(date) => field.onChange(date)}
                                value={field.value || null} // Mostrará null (vacio) si field.value está vacío
                                required
                                renderInput={(_props) => (
                                  <TextField
                                    className="w-full"
                                    {..._props}
                                    onBlur={field.onBlur}
                                    error={!!errorsEncabezado.FechaLimite}
                                    helperText={
                                      errorsEncabezado?.FechaLimite?.message.includes(
                                        "NaN"
                                      )
                                        ? null
                                        : errorsEncabezado?.FechaLimite?.message
                                    }
                                  />
                                )}
                                className="w-full"
                              />

                            </FormControl>
                          )}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>

                          <FormLabel
                            error={!!errorsEncabezado.TipoPago}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Método de Pago:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="TipoPago"
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value

                                }
                                style={{ borderRadius: "3px" }}
                                options={MetodoPago_DDL}
                                value={datosWatchEncabezado.TipoPago ?? null}
                                disableClearable={true}
                                onChange={(event, value) => {
                                  setValueEncabezado("TipoPago", value);

                                }}
                                renderInput={(params) => (
                                  <TextField {...params} error={!!errorsEncabezado.TipoPago}
                                    placeholder="Selecione un Metodo de pago"
                                  />
                                )}
                              />
                            )}
                            name="TipoPago"
                            error={!!errorsEncabezado.TipoPago}
                            control={controlEncabezado}
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>

                          <FormLabel
                            error={!!errorsEncabezado.Embalaje}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Tipo de Embalaje:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="Embalaje"
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value

                                }
                                style={{ borderRadius: "3px" }}
                                options={Embalaje_DDL}
                                value={datosWatchEncabezado.Embalaje ?? null}
                                disableClearable={true}
                                onChange={(event, value) => {
                                  setValueEncabezado("Embalaje", value);

                                }}
                                renderInput={(params) => (
                                  <TextField {...params} error={!!errorsEncabezado.Embalaje}
                                    placeholder="Selecione un Tipo de Embalaje"
                                  />
                                )}
                              />
                            )}
                            name="Embalaje"
                            error={!!errorsEncabezado.Embalaje}
                            control={controlEncabezado}
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormControlLabel

                            control={
                              <Switch
                                label="¿El cliente brindó materiales?"
                                labelPlacement="top"
                                checked={checked}
                                onChange={handleChangeMaterialesBrindados}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            }
                            label="¿El cliente brindó materiales?"
                            labelPlacement="top"
                            style={{ marginTop: "25px", marginRight: "20px" }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormLabel
                            error={!!errorsEncabezado.Direccion}
                            className="font-medium text-12"
                            component="legend"

                            id="group-label">Dirección de Entrega</FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                placeholder="Ingrese una direccion de Entrega"

                                inputProps={{
                                  maxLength: 150,

                                }}
                                error={!!errorsEncabezado.Direccion}
                              ></TextField>
                            )}
                            name="Direccion"
                            control={controlEncabezado}
                          >
                          </Controller>
                        </FormControl>
                      </Grid>

                    </Grid>

                  </CardContent>
                </Card>

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
                    startIcon={<Icon>check</Icon>}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "10px",
                      marginRight: "10px",
                    }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={GuardarEncabezado}
                    type="submit"
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
                    onClick={(e) => {
                      navigate("/OrdenCompra/index");
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </form>
            </TabPanel>

            <TabPanel value={Cambio} index={1} dir={theme.direction}>
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmitDetalles((_data) => { })}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="" color="rgb(10, 0, 66)">
                          B. Detalles de la Órden de Compra
                        </Typography>
                      </Grid>




                      <Grid item xs={6}>
                        <FormControl fullWidth>

                          <FormLabel
                            error={!!errorsDetalles.Estilo}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Estilos:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="Estilo"
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value

                                }
                                style={{ borderRadius: "3px" }}
                                options={Estilos_DDL}
                                value={datosWatchDetalles.Estilo ?? null}
                                disableClearable={true}
                                onChange={(event, value) => {
                                  setValueDetalles("Estilo", value);

                                }}
                                renderInput={(params) => (
                                  <TextField {...params} error={!!errorsDetalles.Estilo}
                                    placeholder="Selecione un Estilo"
                                  />
                                )}
                              />
                            )}
                            name="Estilo"
                            error={!!errorsDetalles.Estilo}
                            control={controlDetalles}
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>

                          <FormLabel
                            error={!!errorsDetalles.Talla}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Tallas:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="Talla"
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value

                                }
                                style={{ borderRadius: "3px" }}
                                options={Tallas_DDL}
                                value={datosWatchDetalles.Talla ?? null}
                                disableClearable={true}
                                onChange={(event, value) => {
                                  setValueDetalles("Talla", value);

                                }}
                                renderInput={(params) => (
                                  <TextField {...params} error={!!errorsDetalles.Talla}
                                    placeholder="Selecione una Talla"
                                  />
                                )}
                              />
                            )}
                            name="Talla"
                            error={!!errorsDetalles.Talla}
                            control={controlDetalles}
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormLabel
                            error={!!errorsDetalles.Cantidad}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Cantidad:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                placeholder="Ingrese una cantidad"

                                inputProps={{
                                  maxLength: 9,

                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                  onKeyPress: (event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  },
                                }}
                                error={!!errorsDetalles.Cantidad}
                              />
                            )}
                            name="Cantidad"
                            control={controlDetalles}
                            rules={{
                              // Agrega una regla de validación personalizada
                              validate: value => parseFloat(value) > 0 || 'La cantidad debe ser mayor a 0',
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormLabel
                            error={!!errorsDetalles.PrecioU}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Precio Unitario:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                placeholder="Ingrese el Precio Unitario"

                                inputProps={{
                                  maxLength: 10,

                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                  onKeyPress: (event) => {
                                    // Verificar si field.value está definido y es una cadena antes de realizar las comprobaciones
                                    if (typeof field.value === "string") {
                                      if (
                                        (!/[\d.]/.test(event.key) ||
                                          (event.key === "." && field.value.includes(".")) ||
                                          (field.value.includes(".") && field.value.split(".")[1].length >= 2))
                                      ) {
                                        event.preventDefault();
                                      }
                                    }
                                  },

                                }}
                                error={!!errorsDetalles.PrecioU}
                              ></TextField>
                            )}
                            name="PrecioU"
                            control={controlDetalles}

                          >
                          </Controller>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>

                          <FormLabel
                            error={!!errorsDetalles.Color}
                            className="font-medium text-12"
                            component="legend"
                          >
                            Colores:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="Color"
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value

                                }
                                style={{ borderRadius: "3px" }}
                                options={Colores_DDL}
                                value={datosWatchDetalles.Color ?? null}
                                disableClearable={true}
                                onChange={(event, value) => {
                                  setValueDetalles("Color", value);

                                }}
                                renderInput={(params) => (
                                  <TextField {...params} error={!!errorsDetalles.Color}
                                    placeholder="Selecione un Color" />
                                )}
                              />
                            )}
                            name="Color"
                            error={!!errorsDetalles.Color}
                            control={controlDetalles}
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormLabel
                            error={!!errorsDetalles.EmbalajeEspecificacion}
                            className="font-medium text-12"
                            component="legend"

                            id="group-label">Especificar Embalaje</FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                placeholder="Describa la especificacion del Embalaje"

                                inputProps={{
                                  maxLength: 150,

                                }}
                                error={!!errorsDetalles.EmbalajeEspecificacion}
                              ></TextField>
                            )}
                            name="EmbalajeEspecificacion"
                            control={controlDetalles}
                          >
                          </Controller>
                        </FormControl>
                      </Grid>
                      <Grid container justify="center" item xs={6} >
                        <Controller
                          render={({ field }) => (
                            <FormControl error={!!errorsDetalles.Sexo} fullWidth={true}>
                              <FormLabel
                                error={!!errorsDetalles.Sexo} id="group-label"
                                className="font-medium text-12"
                                component="legend">
                                Genero de la prenda:
                              </FormLabel>
                              <RadioGroup
                                row
                                name="simple-radio"
                                aria-label="simple-radio"
                                style={{ justifyContent: "center" }}
                              >
                                <FormControlLabel
                                  value="F"
                                  control={<Radio />}
                                  label="Femenino"
                                  checked={datosWatchDetalles['Sexo'] == 'F' ? true : false}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                />
                                <FormControlLabel
                                  value="M"
                                  control={<Radio />}
                                  label="Masculino"
                                  checked={datosWatchDetalles['Sexo'] == 'M' ? true : false}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                />
                                <FormControlLabel
                                  value="U"
                                  control={<Radio />}
                                  label="Unisex"
                                  checked={datosWatchDetalles['Sexo'] == 'U' ? true : false}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                />
                              </RadioGroup>
                            </FormControl>
                          )}
                          name="Sexo"
                          control={controlDetalles}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormControlLabel
                            control={
                              <Switch
                                label="¿Incluir impuestos?"
                                labelPlacement="top"
                                checked={checked1}
                                onChange={handleChangeImpuestos}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            }
                            label="¿Incluir impuestos?"
                            labelPlacement="top"
                            style={{ marginTop: "15px", marginRight: "15px" }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <FormLabel
                            error={!!errorsDetalles.Procesos}
                            className="font-medium text-12"
                            component="legend"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span style={{ flex: 1 }}>Procesos:</span>
                            <BootstrapTooltip title="El primer proceso que elija sera el que comenzara el detalle">
                              <InfoIcon sx={{ m: '14px', color: '#C5C5C5' }} />
                            </BootstrapTooltip>
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="Procesos"
                                multiple
                                freeSolo
                                isOptionEqualToValue={(option, value) => option.value === value?.value}
                                style={{ borderRadius: "0px", marginTop: "0px" }}
                                options={Procesos_DDL}
                                value={datosWatchDetalles.Procesos ?? []}
                                disableClearable={true}
                                onChange={(event, newValue) => {
                                  setValueDetalles("Procesos", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={!!errorsDetalles.Procesos}
                                    placeholder="Seleccione uno o más Procesos de Inicio"
                                  />
                                )}
                              />
                            )}
                            name="Procesos"
                            error={!!errorsDetalles.Procesos}
                            control={controlDetalles}
                            defaultValue={[]}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}/*style={{ display: Habilitar ? 'none' : 'block' }}*/>
                        <FormControl fullWidth>
                          <FormLabel
                            className="font-medium text-12"
                            component="legend"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span style={{ flex: 1 }}>Impuesto:</span>
                            <Typography variant="h6" component="span">
                              <BootstrapTooltip title="El impuesto debe ser permitido antes de ingresarlo">
                                <InfoIcon sx={{ m: '14px', color: '#C5C5C5' }} />
                              </BootstrapTooltip>
                            </Typography>
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                placeholder="Ingrese el Impuesto si se requiere"
                                disabled={Habilitar}
                                inputProps={{
                                  maxLength: 10,

                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                  onKeyPress: (event) => {
                                    // Verificar si field.value está definido y es una cadena antes de realizar las comprobaciones
                                    if (typeof field.value === "string") {
                                      if (
                                        (!/[\d.]/.test(event.key) ||
                                          (event.key === "." && field.value.includes(".")) ||
                                          (field.value.includes(".") && field.value.split(".")[1].length >= 2))
                                      ) {
                                        event.preventDefault();
                                      }
                                    }
                                  },
                                }}
                              />
                            )}
                            name="Impuesto"
                            control={controlDetalles}
                            rules={{
                              // Agrega una regla de validación personalizada
                              validate: value => parseFloat(value) > 0 || 'La cantidad debe ser mayor a 0',
                            }}
                          />
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
                          startIcon={<Icon>add_circle</Icon>}
                          variant="contained"
                          color="primary"
                          style={{ borderRadius: "10px", marginRight: "10px" }}
                          sx={{
                            backgroundColor: "#d1af3c",
                            color: "white",
                            "&:hover": { backgroundColor: "#B99B36" },
                          }}
                          onClick={GuardarDetalles}
                          type="submit"
                        >
                          {PasaEditarDetalles ? "Editar" : "Agregar"}
                        </Button>
                      </Grid>

                    </Grid>
                  </form>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" padding={2}>
                      Subida de Documentos
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <div class="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            onSubmit={handleSubmitDocumentos}
                            styles={{ dropzone: { minWidth: 200, minHeight: 200, maxHeight: 200, margin: 10 } }}
                            accept="image/*,application/pdf"
                            inputContent="Haz click aquí para agregar archivos o arrastralos a esta zona"
                            inputWithFilesContent="Agregar archivos"
                            submitButtonContent="Subir Documentos"
                            disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
                            maxFiles={3}
                          />
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                      </label>
                    </div>
                  </Grid>

                  <Grid item xs={12} /*style={{ display: Habilitar ? 'none' : 'block' }}*/>
                    <div className="center" style={{ width: "95%", margin: "auto" }}>
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
                      />
                    </div>
                  </Grid>
                  <br></br>

                  <br></br>
                  <Collapse in={mostrarAdd}>
                    <Divider style={{ marginTop: "30px", marginBottom: "15px" }}>
                      <Chip label="Agregar Materiales " />
                    </Divider>
                    <form onSubmit={handleSubmitMateBrinda((_data) => { })}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <FormControl fullWidth>

                            <FormLabel
                              error={!!errorsMateBrinda.Material}
                              className="font-medium text-10"
                              component="legend"
                            >
                              Materiales:
                            </FormLabel>
                            <Controller
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  id="Material"
                                  isOptionEqualToValue={(option, value) =>
                                    option.value === value?.value
                                  }
                                  style={{ borderRadius: "3px" }}
                                  options={Materiales_DDL}
                                  value={datosWatchMateBrinda.Material ?? null}
                                  disableClearable={true}
                                  onChange={(event, value) => {
                                    setValueMateBrinda("Material", value);
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} error={!!errorsMateBrinda.Material} />
                                  )}
                                />
                              )}
                              name="Material"
                              error={!!errorsMateBrinda.Material}
                              control={controlMateBrinda}
                              InputProps={{
                                startAdornment: <InputAdornment position="start" />,
                              }}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <FormLabel
                              error={!!errorsMateBrinda.CantidadM}
                              className="font-medium text-12"
                              component="legend"
                              id="group-label">Cantidad del Material</FormLabel>
                            <Controller
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="outlined"
                                  placeholder="Cantidad"
                                  type="number"
                                  inputProps={{
                                    maxLength: 10,
                                  }}
                                  error={!!errorsDetalles.CantidadM}
                                ></TextField>
                              )}
                              name="CantidadM"
                              control={controlMateBrinda}
                              rules={{
                                // Agrega una regla de validación personalizada
                                validate: value => parseFloat(value) > 0 || 'La cantidad debe ser mayor a 0',
                              }}
                            >
                            </Controller>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <FormControl fullWidth>

                            <FormLabel
                              error={!!errorsMateBrinda.UnidadMedida}
                              className="font-medium text-10"
                              component="legend"
                            >
                              Unidades de Medida:
                            </FormLabel>
                            <Controller
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  id="UnidadMedida"
                                  isOptionEqualToValue={(option, value) =>
                                    option.value === value?.value

                                  }
                                  style={{ borderRadius: "3px" }}
                                  options={UnidadesMedida_DDL}
                                  value={datosWatchMateBrinda.UnidadMedida ?? null}
                                  disableClearable={true}
                                  onChange={(event, value) => {
                                    setValueMateBrinda("UnidadMedida", value);

                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} error={!!errorsMateBrinda.UnidadMedida} />
                                  )}
                                />
                              )}
                              name="UnidadMedida"
                              error={!!errorsMateBrinda.UnidadMedida}
                              control={controlMateBrinda}
                              InputProps={{
                                startAdornment: <InputAdornment position="start" />,
                              }}
                            />
                          </FormControl>
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          sx={{ justifyContent: "right", alignItems: "right" }}
                        >
                          <Button
                            startIcon={<Icon>check</Icon>}
                            variant="contained"
                            color="primary"
                            style={{
                              borderRadius: "10px",
                              marginRight: "10px",
                            }}
                            sx={{
                              backgroundColor: "#634A9E",
                              color: "white",
                              "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            onClick={GuardarMaterialesBrindados}
                            type="submit"
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
                            onClick={CancelarMatebrimTabla}
                          >
                            Cancelar
                          </Button>
                        </Grid>
                      </Grid>
                    </form>


                    {/* Inicia del Dialog(Modal) de Finalización */}
                    <Dialog
                      open={Finalizacion}
                      fullWidth
                      onClose={DialogFinalizarOrdenCompra}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Confirmación de Finalización
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          ¿Está seguro(a) de que desea finalizar la Orden de Compra? <br></br>
                          Le recordamos que una vez que la Orden de Compra sea finalizada,
                          no será posible realizar modificaciones a la misma.
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
                            onClick={FinalizarOrdenCompra}
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
                            onClick={DialogFinalizarOrdenCompra}
                          >
                            Cancelar
                          </Button>
                        </Grid>
                      </DialogActions>
                    </Dialog>
                  </Collapse>


                  <Collapse in={mostrarIndex}>
                    {/* Select para las filas de la tabla inicio*/}
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Select para las filas de la tabla inicio*/}
                      <Stack direction="row" spacing={1}>
                        <label className="mt-8">Filas por página:</label>
                        <FormControl sx={{ minWidth: 50 }} size="small">
                          {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filas}
                            // label="Filas"
                            onChange={handleChangeFilas}
                          >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                          </Select>
                        </FormControl>
                        {/* Select para las filas de la tabla fin*/}

                        {/* Barra de Busqueda en la Tabla inicio */}
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
                      </Stack>
                    </CardContent>

                    {/* Mostrar tabla index inicio*/}

                    <div className="center" style={{ width: "95%", margin: "auto" }}>
                      <Table
                        columns={columns}
                        expandable={expandableConfig}
                        dataSource={filteredRows}
                        size="small"
                        locale={{
                          triggerDesc: "Ordenar descendente",
                          triggerAsc: "Ordenar ascendente",
                          cancelSort: "Cancelar",
                          emptyText: LoadingIcon(),
                        }}
                        pagination={{
                          pageSize: filas
                          , className: 'custom-pagination'
                        }} />
                    </div>
                  </Collapse>


                </CardContent>
              </Card>
              <div style={{ display: Botones ? "block" : "none" }}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                    marginTop: "10px"
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

                    onClick={DialogFinalizarOrdenCompra}
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
                      navigate("/OrdenCompra/index");
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Card>
    );
  }
  export default OrdenCompra_Crear;
