/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import InfoIcon from "@mui/icons-material/Info";
import { motion } from "framer-motion";

import {
  AppBar,CircularProgress,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Dropzone from "react-dropzone";
import { setTimeout } from "core-js";
import PropTypes, { string } from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "react-dropzone-uploader/dist/styles.css";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useLocation, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import {
  ToastError,
  ToastSuccess,
  ToastSuccessPersonalizado,
  ToastWarning,
  ToastWarningPersonalizado,
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import PersonaNaturalService from "./PersonaNaturalService";

const validarTelefonoContacto = (value) => {
  if (/^\+504 \d{4}-\d{4}$/.test(value)) {
    return true;
  }
  return false;
};

const validarCorreoElectronico = (value) => {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return true;
  }
  return false;
};

const validarRTN = (value) => {
  if (/^\d{4}-\d{4}-\d{6}$/.test(value)) {
    return true;
  }
  return false;
};

const validarDNI = (value) => {
  if (/^\d{4}-\d{4}-\d{5}$/.test(value)) {
    return true;
  }
  return false;
};

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

function PersonaNatural_Crear() {
  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
    tab3: true,
  });

  const personaNaturalService = new PersonaNaturalService();

  const load_DDLs = Load_DDLs();
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValueTabs] = React.useState(0);
  const [Eliminar, setEliminar] = useState(false);

  const [CodigoVeri, setCodigoVeri] = useState("");
  const [CorreoAlter, setCorreoAlter] = useState("");
  const [CodigoVeri2, setCodigoVeri2] = useState("");
  const [validCorreo, setValidCorreo] = useState(true);
  const [validar, setValidar] = useState(true);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);

  const [TextoArchivoRTN, setTextoArchivoRTN] = useState("");
  const [TextoArchivoDNI, setTextoArchivoDNI] = useState("");
  const [TextoArchivoNumeroRecibo, setTextoArchivoNumeroRecibo] = useState("");

  const [ArchivoRTN, setArchivoRTN] = useState("");
  const [ArchivoDNI, setArchivoDNI] = useState("");
  const [ArchivoRecibo, setArchivoRecibo] = useState("");

  const [Tab1, setTab1] = useState(false);
  const [Tab2, setTab2] = useState(true);
  const [Tab3, setTab3] = useState(true);
  const [Tab4, setTab4] = useState(true);

  const [secodForm, setsecodForm] = useState(false);

  const [guarda1, setguarda1] = useState(true);
  const [guarda2, setguarda2] = useState(true);

  const [guardaTap1, setguardaTap1] = useState(false);
  const [guardaTap2, setguardaTap2] = useState(false);

  const [DialogCancelarTap1, setDialogCancelarTap1] = useState(false);
  const [DialogCancelarTap2, setDialogCancelarTap2] = useState(false);

  //DDL
  //Variables DDL
  const [oficinas_DDL, setOficinas_DDL] = useState([]);
  const [estadosciviles_DDL, setEstadosCiviles_DDL] = useState([]);
  const [oficios_DDL, setOficios_DDL] = useState([]);
  const [provincia_DDL, setProvincia_DDL] = useState([]);
  const [ciudad_DDL, setCiudad_DDL] = useState([]);

  const location = useLocation();
  //const DatosPrincipales = location.state;
  const [DatosPrincipales, setDatosPrincipales] = useState(location.state);
  const [isEditMode, setIsEditMode] = useState(false);

  const [enviandoCodigo, setEnviandoCodigo] = useState(false);
  const [contador, setContador] = useState(15); // Inicializo el contador en 15 segundos

  const [enviandoCodigo2, setEnviandoCodigo2] = useState(false);
  const [contador2, setContador2] = useState(15); // Inicializo el contador en 15 segundos

  const [token1, setToken1] = useState(0);
  const [token2, setToken2] = useState(0);
  const [token1Valido, setToken1Valido] = useState(false);
  const [token2Valido, setToken2Valido] = useState(false);
  const [CorreoValido, setCorreoValido] = useState(false);

  const [PreviousEmail, setPreviousEmail] = useState("");
  const [NewEmail, setNewEmail] = useState("");

  const [PreviousEmail2, setPreviousEmail2] = useState("");
  const [NewEmail2, setNewEmail2] = useState("");

  const [Ocultar, setOcultar] = useState("");

  const [Spiner, setSpiner] = useState(<CircularProgress style={{  color: "white" }} size={25}/>);
  const [Cargando, setCargando] = useState(false);

  // const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
  //   useDropzone({
  //     accept: {
  //       "document/pdf": [".pdf"],
  //     },
  //   });

  //Valida los campos del formulario

  const DialogCancelar1 = () => {
    setguardaTap1(!guardaTap1);
  };

  const DialogCancelar2 = () => {
    setguardaTap2(!guardaTap2);
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const DialogFinalizar = () => {
    setTab4(false);
    setValueTabs(3);
  };

  const defaultTab1Values = {
    pena_RTN: "",
    pena_DNI: "",
    pena_NumeroRecibo: "",

    pena_ArchivoRTN: "",
    pena_ArchivoDNI: "",
    pena_ArchivoNumeroRecibo: "",

    pena_NombreArchDNI: "",
    pena_NombreArchRTN: "",
    pena_NombreArchRecibo: "",
  };

  const defaultTab2Values = {
    pers_Nombre: "",
    pena_Id: "",
    pers_Id: "",
    oficina: null,
    estado: null,
    oficio: null,
    provincia: null,
    Ciudad: null,
    pena_DireccionExacta: "",
    pena_TelefonoFijo: "",
    pena_TelefonoCelular: "",
    pena_CorreoElectronico: "",
    pena_CorreoAlternativo: "",
  };

  const [dataReset, setDataReset] = useState({});
  const [dataReset2, setDataReset2] = useState({});

  const [isValidEmail1, setisValidEmail1] = useState(true);
  const [isValidEmail2, setisValidEmail2] = useState(true);

  const validarToken1 = (token) => {
    if (token == dataReset["token"]) {
      return true;
    } else {
      return false;
    }
  };

  const validarToken2 = (token) => {
    if (token == dataReset2["token"]) {
      return true;
    } else {
      return false;
    }
  };

  const Tab1Schema = yup.object().shape({
    pena_RTN: yup
      .string()
      .required("")
      .test("formato", "RTN incompleto", validarRTN),
    pena_DNI: yup
      .string()
      .required("")
      .test("formato", "DNI incompleto", validarDNI),
    pena_NumeroRecibo: yup.string().required(),
    pena_NombreArchDNI: yup
      .string()
      .required("El archivo de DNI es obligatorio"),
    pena_NombreArchRTN: yup
      .string()
      .required("El archivo de RTN es obligatorio"),
    pena_NombreArchRecibo: yup
      .string()
      .required("El archivo numero de recibo es obligatorio"),
  });

  const Tab2Schema = yup.object().shape({
    pena_Id: yup.string(),
    pers_Nombre: yup.string().required().trim(),
    oficina: yup.object().required(),
    estado: yup.object().required(),
    oficio: yup.object().required(),
    ciudad: yup.object().required(),
    provincia: yup.object().when("ciudad", {
      is: (value) => (value && value == "") || value == null,
      then: yup.object().required(),
    }),
    pena_DireccionExacta: yup.string().required(),

    pena_TelefonoFijo: yup
      .string()
      .trim()
      .required("Número de teléfono incompleto")
      .test(
        "formato",
        "Número de teléfono incompleto",
        validarTelefonoContacto
      ),
    pena_TelefonoCelular: yup
      .string()
      .trim()
      .required("Número de teléfono incompleto")
      .test("formato", "Número de teléfono incompleto", validarTelefonoContacto)
      .notOneOf(
        [yup.ref("pena_TelefonoFijo")],
        "El teléfono celular no puede ser igual al teléfono fijo"
      ),

    pena_CorreoElectronico: yup
      .string()
      .trim()
      .required("")
      .test(
        "formato",
        "Correo Electrónico Incorrecto",
        validarCorreoElectronico
      ),

    codigo1: yup
      .string()
      .when("pena_CorreoElectronico", {
        is: (value) => value && value.trim() !== PreviousEmail,
        then: yup.string().required("El código de verificación es requerido"),
      })
      .test("formato", "El código de verficación es incorrecto", validarToken1),

    pena_CorreoAlternativo: yup.string().when("pena_CorreoElectronico", {
      is: (pena_CorreoElectronico) => !!pena_CorreoElectronico, // Valida solo si pena_CorreoElectronico tiene un valor
      then: yup
        .string()
        .nullable()
        .notOneOf(
          [yup.ref("pena_CorreoElectronico")],
          "El correo electrónico no puede ser igual al correo electrónico alternativo"
        ) 
        .test("is-email", "Correo Electrónico Incorrecto", (value) => {
          if (!value) return true; // Permitir valores nulos
          return yup.string().email().nullable().isValidSync(value);
        })
        ,
      otherwise: yup.string().nullable(), // Permite valores nulos o cadenas vacías
    }),

    codigo2: yup
      .string()
      .when("pena_CorreoAlternativo", {
        is: (value) => value && value.trim() !== PreviousEmail2,
        then: yup.string().required("El código de verificación es requerido"),
      })
      .test("formato", "El código de verficación es incorrecto", validarToken2),
  });

  //Valida los campos del formulario

  //Cargado de las variables DDL
  async function ddls() {
    setOficinas_DDL(await load_DDLs.Oficinas());
    setEstadosCiviles_DDL(await load_DDLs.Estadosciviles());
    setOficios_DDL(await load_DDLs.Oficios());
    setProvincia_DDL(await load_DDLs.Provincias97());
  }

  const CiudadesGet = async (id) => {
    try {
      if (id) {
        const data = await load_DDLs.CiudadesPorProvincia(parseInt(id));
        setValue();
        setCiudad_DDL(data);
      } else {
        setCiudad_DDL([]);
      }
    } catch (error) {
      
    }
  };

  //Estilos del uso del tooltip
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#6a2b85",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#6a2b85",
      textAlign: "justify",
    },
  }));

  const cargarDatos = async () => {
    if (DatosPrincipales !== null) {
      handleFillInputs();
      // setTimeout(() => {
      trigger();
      triggerDesc1();
      // }, 1500);
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    cargarDatos();
  }, []);

  const { handleSubmit, reset, control, formState, watch, setValue, trigger } =
    useForm({
      defaultTab1Values,
      mode: "all",
      resolver: yupResolver(Tab1Schema),
    });

  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  const AgregarRegistro = async () => {
    
    try {
      
      setguarda1(false);
      console.log("CLICK")
      trigger();
      
      if (isValid) {

        setCargando(true);
        if (
          datosWatch2.pena_ArchivoRTN !== undefined &&
          datosWatch2.pena_ArchivoDNI !== undefined &&
          datosWatch2.pena_ArchivoNumeroRecibo !== undefined &&
          (datosWatch2.pena_ArchivoRTN["0"] == undefined
            ? "h"
            : datosWatch2.pena_ArchivoRTN["0"]) !== "h" &&
          (datosWatch2.pena_ArchivoDNI["0"] == undefined
            ? "h"
            : datosWatch2.pena_ArchivoDNI["0"]) !== "h" &&
          (datosWatch2.pena_ArchivoNumeroRecibo["0"] == undefined
            ? "h"
            : datosWatch2.pena_ArchivoNumeroRecibo["0"]) !== "h"
        ) {
          const urls = await Promise.all([
            personaNaturalService.SubidaArchivos(
              datosWatch2.pena_ArchivoRTN["0"]
            ),
            personaNaturalService.SubidaArchivos(
              datosWatch2.pena_ArchivoDNI["0"]
            ),
            personaNaturalService.SubidaArchivos(
              datosWatch2.pena_ArchivoNumeroRecibo["0"]
            ),
          ]);
  
          setValue2("pena_ArchivoRTN", urls[0]);
          setValue2("pena_ArchivoDNI", urls[1]);
          setValue2("pena_ArchivoNumeroRecibo", urls[2]);
          if (
            isEditMode == true &&
            urls[0] !== "" &&
            urls[1] !== "" &&
            urls[2] !== ""
          ) {
            PersonaEditar(urls);
   
          } else {
            ToastSuccess("El registro se ha insertado exitosamente");
            setCargando(false);
            setValueTabs(1);
          }
          
        } else {
          console.log("CLICK 2")
          if (isEditMode == true) {
            const url = [];
  
            if (
              datosWatch2.pena_ArchivoRTN === DatosPrincipales.pena_ArchivoRTN
            ) {
              url.push(DatosPrincipales.pena_ArchivoRTN);
            } else {
              let pena_ArchivoRTN = await new Promise((resolve, reject) => {
                personaNaturalService
                  .SubidaArchivos(datosWatch2.pena_ArchivoRTN["0"])
                  .then((result) => resolve(result))
                  .catch((error) => reject(error));
              });
              url.push(pena_ArchivoRTN);
            }
  
            if (
              datosWatch2.pena_ArchivoDNI === DatosPrincipales.pena_ArchivoDNI
            ) {
              url.push(DatosPrincipales.pena_ArchivoDNI);
            } else {
              let pena_ArchivoDNI = await new Promise((resolve, reject) => {
                personaNaturalService
                  .SubidaArchivos(datosWatch2.pena_ArchivoDNI["0"])
                  .then((result) => resolve(result))
                  .catch((error) => reject(error));
              });
              url.push(pena_ArchivoDNI);
            }
  
            if (
              datosWatch2.pena_ArchivoNumeroRecibo ===
              DatosPrincipales.pena_ArchivoNumeroRecibo
            ) {
              url.push(DatosPrincipales.pena_ArchivoNumeroRecibo);
            } else {
              let pena_ArchivoNumeroRecibo = await new Promise(
                (resolve, reject) => {
                  personaNaturalService
                    .SubidaArchivos(datosWatch2.pena_ArchivoNumeroRecibo["0"])
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
                }
              );
              url.push(pena_ArchivoNumeroRecibo);
            }
            setValue2("pena_ArchivoRTN", url[0]);
            setValue2("pena_ArchivoDNI", url[1]);
            setValue2("pena_ArchivoNumeroRecibo", url[2]);
            PersonaEditar(url);
            
  
          } else {
            ToastSuccess("El registro se ha insertado exitosamente");
            setValueTabs(1);
            setCargando(false);
  
          }
        }
        // El formulario es válido después de cargar los datos en modo de edición
        setTab1(false);
        setTab2(false);
        setTab3(true);
      } else {
        ToastWarning("texto");
      }
    } catch (error) {
    }
  };
 

  const {
    handleSubmit: handlesubmit1,
    reset: reset1,
    control: control1,
    formState: formState1,
    watch: watch2,
    setValue: setValue2,
    trigger: triggerDesc1,
  } = useForm({
    defaultTab2Values,
    mode: "all",
    resolver: yupResolver(Tab2Schema),
  });

  const {
    isValid: isValid1,
    dirtyFields: dirtyFields1,
    errors: errors1,
  } = formState1;

  const datosWatch2 = watch2();

  const handleValidForm2 = () => {
    setguarda2(false);
    if (isValid1) {
      if (!isEditMode) {
        // Modo de creación
        PersonaCreate();
      } else {
        // Modo de edición
        PersonaEditar();
      }
    } else {
      ToastWarning("hola???");
    }
  };

  const [pena_Id, setpena_Id] = useState("");

  //Funcion que ingresa los datos de personas
  const PersonaCreate = async () => {
    // ingresa el archivo a la carpeta Archivos

    try {
      const response = await personaNaturalService.crearPersona(
        datosWatch,
        datosWatch2
      );
      if (parseInt(response.data.data.messageStatus) > 0) {
        setValue2("pers_Id", parseInt(response.data.data.messageStatus));
        PersonaNaturalCreate(parseInt(response.data.data.messageStatus));
        setguarda1(true);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningPersonalizado(
          "Ya hay un registro con RTN ingresado, Regrese al primer formulario"
        );
      }
    } catch (error) {
      ToastError("Error inesperado");
      
    }
  };

  //Funcion que ingresa los datos de personaNatural
  const PersonaNaturalCreate = async (datoId) => {
    try {
      const response = await personaNaturalService.crear(
        datosWatch2,
        datosWatch,
        datoId
      );
      if (parseInt(response.data.data.messageStatus) > 0) {
        ToastSuccess("El registro se ha insertado exitosamente");

        setValue2("pena_Id", parseInt(response.data.data.messageStatus));
        setpena_Id(parseInt(response.data.data.messageStatus));
        setguarda2(true);
      }
      setValueTabs(2);
      setTab1(true);
      setTab2(true);
      setTab3(false);
    } catch (error) {
      ToastError("Error inesperado");
      
    }
  };

  const handleFillInputs = async () => {
    const response = await personaNaturalService.listarPersona(
      DatosPrincipales.pers_Id
    );
    //Datos de personas
    setValue("pena_RTN", response.pers_RTN, {
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue2("pers_Nombre",response.pers_Nombre,{ shouldTouch: true, shouldValidate: true })
    setValue2(
      "oficina",
      {
        value: response.ofic_Id,
        label: response.ofic_Nombre,
      },
      { shouldTouch: true, shouldValidate: true }
    );

    setValue2(
      "estado",
      {
        value: response.escv_Id,
        label: response.escv_Nombre,
      },
      { shouldTouch: true, shouldValidate: true }
    );
    setValue2(
      "oficio",
      {
        value: response.ofpr_Id,
        label: response.ofpr_Nombre,
      },
      { shouldTouch: true, shouldValidate: true }
    );

    setpena_Id(DatosPrincipales.pena_Id, {
      shouldTouch: true,
      shouldValidate: true,
    });

    //Datos de personas Natural
    CiudadesGet(DatosPrincipales.pvin_Id, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("pena_DNI", DatosPrincipales.pena_DNI, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("pena_NumeroRecibo", DatosPrincipales.pena_NumeroRecibo, {
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue2(
      "ciudad",
      {
        value: DatosPrincipales.ciud_Id,
        label: DatosPrincipales.ciud_Nombre,
      },
      { shouldTouch: true, shouldValidate: true }
    );

    setValue2(
      "provincia",
      {
        value: DatosPrincipales.pvin_Id,
        label: DatosPrincipales.pvin_Nombre,
      },
      { shouldTouch: true, shouldValidate: true }
    );

    setValue2("pers_Id", DatosPrincipales.pers_Id, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_Id", DatosPrincipales.pena_Id, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("pers_Id", response.pers_Id, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_TelefonoFijo", DatosPrincipales.pena_TelefonoFijo, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_TelefonoCelular", DatosPrincipales.pena_TelefonoCelular, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2(
      "pena_CorreoElectronico",
      DatosPrincipales.pena_CorreoElectronico,
      { shouldTouch: true, shouldValidate: true }
    );
    setValue2(
      "pena_CorreoAlternativo",
      DatosPrincipales.pena_CorreoAlternativo,
      { shouldTouch: true, shouldValidate: true }
    );
    setValue2("pena_DireccionExacta", DatosPrincipales.pena_DireccionExacta, {
      shouldTouch: true,
      shouldValidate: true,
    });

    setPreviousEmail(DatosPrincipales.pena_CorreoElectronico.trim(), {
      shouldTouch: true,
      shouldValidate: true,
    });
    setPreviousEmail2(DatosPrincipales.pena_CorreoAlternativo, {
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("pena_NombreArchRTN", DatosPrincipales.pena_NombreArchRTN, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_NombreArchRTN", DatosPrincipales.pena_NombreArchRTN, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_ArchivoRTN", DatosPrincipales.pena_ArchivoRTN, {
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("pena_NombreArchDNI", DatosPrincipales.pena_NombreArchDNI, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_NombreArchDNI", DatosPrincipales.pena_NombreArchDNI, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_ArchivoDNI", DatosPrincipales.pena_ArchivoDNI, {
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("pena_NombreArchRecibo", DatosPrincipales.pena_NombreArchRecibo, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2("pena_NombreArchRecibo", DatosPrincipales.pena_NombreArchRecibo, {
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue2(
      "pena_ArchivoNumeroRecibo",
      DatosPrincipales.pena_ArchivoNumeroRecibo,
      { shouldTouch: true, shouldValidate: true }
    );

    // setValue()
    // setTextoArchivoDNI(response.)
    setTextoArchivoRTN(
      DatosPrincipales.pena_NombreArchRTN == undefined
        ? "Has click para agregar archivos"
        : DatosPrincipales.pena_NombreArchRTN
    );
    setTextoArchivoDNI(
      DatosPrincipales.pena_NombreArchDNI == undefined
        ? "Has click para agregar archivos"
        : DatosPrincipales.pena_NombreArchDNI
    );
    setTextoArchivoNumeroRecibo(
      DatosPrincipales.pena_NombreArchRecibo == undefined
        ? "Has click para agregar archivos"
        : DatosPrincipales.pena_NombreArchRecibo
    );
    //Habilita el segundo tap
    settabsEstado(true);
    // Iniciar el modo de edición
    setIsEditMode(true);

    setOcultar("none");

    setTab1(false);
    setTab2(false);
    setTab3(false);
    setTab4(false);
  };

  // asigna el valor del correo anterior y el correo nuevo
  const handleEmailChange = async (NewEmail_value) => {
    if (isEditMode == true) {
      setPreviousEmail(DatosPrincipales.pena_CorreoElectronico.trim());
      setNewEmail(NewEmail_value.trim());
    }
  };

  // asigna el valor del correo anterior y el correo nuevo
  const handleEmail2Change = async (NewEmail2_value) => {
    if (isEditMode == true) {

      // Verificar si DatosPrincipales.pena_CorreoAlternativo es nulo antes de llamar a trim()
      const previousEmail2 = DatosPrincipales.pena_CorreoAlternativo
        ? DatosPrincipales.pena_CorreoAlternativo.trim()
        : null;

      // Verificar si NewEmail2_value es nulo antes de llamar a trim()
      const newEmail2 = NewEmail2_value ? NewEmail2_value.trim() : null;

      setPreviousEmail2(previousEmail2);
      setNewEmail2(newEmail2);
    }
  };

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const handleChangeIndex = (index) => {
    setValueTabs(index);
  };

  const PersonaEditar = async (urls) => {

    try {
      const response = await personaNaturalService.editarPersona(
        datosWatch2,
        datosWatch
      );
       if (response.data.data.messageStatus == "1") {
        //setpers_Id(datosWatch["pers_Id"]);
        PersonaNaturalEditar(urls);
        setValueTabs(1);
        setTab1(false);
        setTab2(false);
        setTab3(false);
        setguarda1(true);
        // setIsEditMode(false);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningPersonalizado(
          "Ya hay un registro con RTN ingresado, Regrese al primer formulario"
        );
      }
    } catch (error) {
      //ToastError("Error inesperado");
      
    } finally {
      setTimeout(() => {
        triggerDesc1();
        trigger();
      }, 500);
    }
  };

  //Peticion para crear un registro
  const PersonaNaturalEditar = async (RTN, DNI, Recibo) => {
    try {
      const response = await personaNaturalService.editar(
        datosWatch2,
        datosWatch,
        RTN,
        DNI,
        Recibo
      );
      console.log(response);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        setTab1(false);
        setTab2(false);
        setTab3(false);
        setguarda2(true);
        if (secodForm == true) {
          setValueTabs(2);
        } 
        setCargando(false);
        //setValueTabs(2);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        //ToastWarning("El registro ya existe");
      }
    } catch (error) {
      ToastError("Error inesperado");
      
    }
  };

  //Se envian datos al reporte
  const SendData = async () => {
    try {
      var Datos = {
        pena_Id: pena_Id == null ? DatosPrincipales.pena_Id : pena_Id,
        pena_RTN: datosWatch.pena_RTN,
        pena_DNI: datosWatch.pena_DNI,
        pena_DireccionExacta: datosWatch2.pena_DireccionExacta,
        ciud_Nombre:
          datosWatch2.ciudad.label == null
            ? DatosPrincipales.ciud_Nombre
            : datosWatch2.ciudad.label,
        pena_TelefonoFijo: datosWatch2.pena_TelefonoFijo,
        pena_CorreoElectronico: datosWatch2.pena_CorreoElectronico,
        pvin_Nombre:
          datosWatch2.provincia.label == null
            ? DatosPrincipales.pvin_Nombre
            : datosWatch2.provincia.label,
      };
      History.push("/PersonaNatural/Reporte", Datos);
    } catch (error) {
      ToastError("Error inesperado");
      
    }
  };

  const onSubmitUser = async () => {
    try {
      if (validarCorreoElectronico(datosWatch2.pena_CorreoElectronico)) {
        if (
          datosWatch2.pena_CorreoElectronico != undefined ||
          datosWatch2.pena_CorreoElectronico != null
        ) {
          const response = await personaNaturalService.EnviarCorreo(
            datosWatch2
          );
          if (response["token"]) {
            ToastSuccessPersonalizado("Correo enviado");
            setDataReset(response);
            setEnviandoCodigo(true);
            // Inicio el contador
            let tiempoRestante = 30; // 15 segundos
            const interval = setInterval(() => {
              if (tiempoRestante > 0) {
                tiempoRestante--;
                setContador(tiempoRestante);
              } else {
                // Cuando el temporizador llega a cero, habilita el botón nuevamente
                setEnviandoCodigo(false);
                clearInterval(interval); // Detén el temporizador
              }
            }, 1000); // Actualiza el contador cada segundo
          } else if (response === -1) {
            ToastError("El servicio de correos no ha respondido");
          } else {
            ToastError();
          }
        } else {
          ToastWarningPersonalizado(
            "Ingrese un correo electronico para poder enviar el codigo"
          );
        }
      }
    } catch (error) {
      ToastError();
      
    }
  };

  const onSubmitToken = async (token1) => {
    if (token1.toUpperCase() == dataReset["token"]) {
      setToken1Valido(true);
    } else {
      ToastErrorPersonalizado("código incorrecto");
    }
  };

  const onSubmiToken2 = async () => {
    try {
      if (validarCorreoElectronico(datosWatch2.pena_CorreoAlternativo)) {
        if (
          datosWatch2.pena_CorreoElectronico !==
          datosWatch2.pena_CorreoAlternativo
        ) {
          if (
            datosWatch2.pena_CorreoAlternativo != undefined ||
            datosWatch2.pena_CorreoAlternativo != null
          ) {
            const response = await personaNaturalService.EnviarCorreo2(
              datosWatch2
            );
            if (response["token"]) {
              ToastSuccessPersonalizado("Correo enviado");
              setDataReset2(response);
              setEnviandoCodigo2(true);

              // Inicio el contador
              let tiempoRestante = 30; // 15 segundos
              const interval = setInterval(() => {
                if (tiempoRestante > 0) {
                  tiempoRestante--;
                  setContador2(tiempoRestante);
                } else {
                  // Cuando el temporizador llega a cero, habilito el botón otra vez
                  setEnviandoCodigo2(false);
                  clearInterval(interval); // Detengo el temporizador
                }
              }, 1000); // Actualiza el contador cada segundo
            } else if (response === -1) {
              ToastError("El ervicio de correos no ha respondido");
            } else {
              ToastError();
            }
          } else {
            ToastWarningPersonalizado(
              "Ingrese un correo electronico para poder enviar el codigo"
            );
          }
        }
      }
    } catch (error) {
      ToastError();
    }
  };

  const handleNewCreate = async () => {
    reset(defaultTab1Values);
    reset1(defaultTab2Values);
    setDatosPrincipales(null);
    setIsEditMode(false);

    setTextoArchivoDNI("");
    setTextoArchivoRTN("");
    setTextoArchivoNumeroRecibo("");

    setValueTabs(0);
    setTab1(false);
    setTab2(true);
    setTab3(true);
  };

  const PersonaNaturalFinalizar = async () => {
    try {
      const response = await personaNaturalService.Finalizar(
        datosWatch2.pena_Id
      );
      if (response.data.data.messageStatus == "1") {
        ToastSuccessPersonalizado("Exito, La Solicitud ha sido finalizado");
        History.push("PersonaNatural");
      } else {
        ToastError();
      }
    } catch (error) {
      ToastError();
      
    }
  };

  const tiposDeArchivoPermitidos = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleDropArchivoDNI = (nuevosArchivos) => {
    try {
      if (nuevosArchivos && nuevosArchivos.length > 0) {
        const archivo = nuevosArchivos[0]; // Tomamos el primer archivo

        if (tiposDeArchivoPermitidos.includes(archivo.type)) {
          // El tipo de archivo es válido, puedes actualizar los valores en el formulario
          setValue2("pena_ArchivoDNI", nuevosArchivos);
          setValue("pena_NombreArchDNI", archivo.path);
          setTextoArchivoDNI(archivo.path);
          trigger("pena_NombreArchDNI");
        } else {
          // El tipo de archivo no es válido, puedes mostrar un mensaje de error o realizar otra acción
          ToastWarningPersonalizado(
            "Tipo de archivo no permitido, archivos disponibles son .png, .jpg, .jfif, .pdf, .word"
          );
        }
      }
    } catch (error) {
      
    }
  };

  const handleDropArchivoRTN = (nuevosArchivos) => {
    try {
      if (nuevosArchivos && nuevosArchivos.length > 0) {
        const archivo = nuevosArchivos[0]; // Tomamos el primer archivo

        if (tiposDeArchivoPermitidos.includes(archivo.type)) {
          // El tipo de archivo es válido, puedes actualizar los valores en el formulario
          setValue2("pena_ArchivoRTN", nuevosArchivos);
          setValue("pena_NombreArchRTN", archivo.path);
          setTextoArchivoRTN(archivo.path);
          trigger("pena_NombreArchRTN");
        } else {
          // El tipo de archivo no es válido, puedes mostrar un mensaje de error o realizar otra acción
          ToastWarningPersonalizado(
            "Tipo de archivo no permitido, archivos disponibles son .png, .jpg, .jfif, .pdf, .word"
          );
        }
      }
    } catch (error) {
      
    }
  };

  const handleDropArchivoNumeroRecibo = (nuevosArchivos) => {
    try {
      if (nuevosArchivos && nuevosArchivos.length > 0) {
        const archivo = nuevosArchivos[0]; // Tomamos el primer archivo

        if (tiposDeArchivoPermitidos.includes(archivo.type)) {
          // El tipo de archivo es válido, puedes actualizar los valores en el formulario
          setValue2("pena_ArchivoNumeroRecibo", nuevosArchivos);
          setValue("pena_NombreArchRecibo", archivo.path);
          setTextoArchivoNumeroRecibo(archivo.path);
          trigger("pena_NombreArchRecibo");
        } else {
          // El tipo de archivo no es válido, puedes mostrar un mensaje de error o realizar otra acción
          ToastWarningPersonalizado(
            "Tipo de archivo no permitido, archivos disponibles son .png, .jpg, .jfif, .pdf, .word"
          );
        }
      }
    } catch (error) {
      
    }
  };

  const CancelarTap1 = async () => {
    guarda1 == false ? DialogCancelar1() : navigate("/PersonaNatural/Index");
  };

  const CancelarTap2 = async () => {
    guarda2 == false ? DialogCancelar2() : navigate("/PersonaNatural/Index");
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <ToastContainer />
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/zrcrcFK/CONTRATO-DE-ADHESI-N-PERSONA-NATURAL.png"
        alt="Encabezado de la carta"
      />

      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{ backgroundColor: "#FFF7F7", color: "black" }}
          >
            <Tab label="I. Datos Generales" {...a11yProps(0)} disabled={Tab1} 
             onClick={() => {
                         setsecodForm(false)
                         setCargando(false)
                         console.log("volvio al 1")
              }}/>
            <Tab
              label="II. Datos a Informar"
              {...a11yProps(1)}
              disabled={Tab2}
              onClick={() => {
                isEditMode == true
                      ? setsecodForm(true)
                      : setsecodForm(false)
              }}
            />
            {/* <Tab
              label="III. Resultado de Contrato de adhesión"
              {...a11yProps(2)}
              disabled={Tab3}
            /> */}
            <Tab
              label="III. Finalización de Contrato de adhesión"
              {...a11yProps(3)}
              disabled={Tab4}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <form onSubmit={handleSubmit((_data) => {})}>
              <Card style={{ marginBottom: "25px", Width: "100%" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {/* aqui comienza persona */}                   

                     
                      <FormControl fullWidth>
                        <Controller
                          render={({ field }) => (
                            <InputMask
                              mask="9999-9999-999999"
                              value={datosWatch["pena_RTN"]}
                              onChange={field.onChange}
                              maskChar=""
                            >
                              {() => (
                                <FormControl fullWidth>
                                  <FormLabel error={!!errors.pena_RTN}>
                                    RTN Solicitante
                                  </FormLabel>
                                  <TextField
                                    {...field}
                                    variant="outlined"
                                    error={!!errors.pena_RTN}
                                    fullWidth={true}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={!!errors.pena_RTN}
                                        InputLabelProps={{ shrink: true }}
                                      />
                                    )}
                                    inputprops={{
                                      startadornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                  />
                                  {errors.pena_RTN && (
                                    <Typography variant="caption" color="error">
                                      {errors.pena_RTN.message}
                                    </Typography>
                                  )}
                                </FormControl>
                              )}
                            </InputMask>
                          )}
                          name="pena_RTN"
                          control={control}
                        />
                      </FormControl>

                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.pena_ArchivoRTN}>
                          Archivo de RTN
                        </FormLabel>

                        <Dropzone
                          item
                          xs={6}
                          value={datosWatch.pena_NombreArchRTN}
                          onDrop={handleDropArchivoRTN}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <button
                              type="button"
                              style={{
                                backgroundColor: "#dcc25a", 
                                height: "52px",
                                borderRadius: "5px",  
                                border: "none",  
                                color: "white", 
                                padding: "10px 20px",  
                                cursor: "pointer",  
                              }}
                            >
                              <div
                                style={{ height: "52px" }}
                                {...getRootProps()}
                              >
                                <input
                                  style={{ height: "52px", display: "none" }}  
                                  {...getInputProps()}
                                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" // Permitir múltiples formatos de archivo
                                />
                                <p>
                                  {TextoArchivoRTN === ""
                                    ? "Haz click aquí para agregar archivos"
                                    : TextoArchivoRTN}{" "}
                                </p>
                              </div>
                            </button>
                          )}
                        </Dropzone>
                        {errors.pena_NombreArchRTN && (
                          <Typography variant="caption" color="error">
                            {errors.pena_NombreArchRTN.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
 

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <Controller
                          render={({ field }) => (
                            <InputMask
                              mask="9999-9999-99999"
                              value={datosWatch["pena_DNI"]}
                              onChange={field.onChange}
                              maskChar=""
                            >
                              {() => (
                                <FormControl fullWidth>
                                  <FormLabel error={!!errors.pena_DNI}>
                                    DNI
                                  </FormLabel>
                                  <TextField
                                    {...field}
                                    variant="outlined"
                                    error={!!errors.pena_DNI}
                                    fullWidth={true}
                                    inputprops={{
                                      startadornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                  />
                                  {errors.pena_DNI && (
                                    <Typography variant="caption" color="error">
                                      {errors.pena_DNI.message}
                                    </Typography>
                                  )}
                                </FormControl>
                              )}
                            </InputMask>
                          )}
                          name="pena_DNI"
                          control={control}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.handleDropArchivoDNI}>
                          Archivo de DNI
                        </FormLabel>

                        <Dropzone item xs={6} onDrop={handleDropArchivoDNI}>
                          {({ getRootProps, getInputProps }) => (
                            <button
                              type="button"
                              style={{
                                backgroundColor: "#dcc25a",   
                                height: "52px",
                                borderRadius: "5px",  
                                border: "none",   
                                color: "white",   
                                padding: "10px 20px", 
                                cursor: "pointer",  
                              }}
                            >
                              <div
                                style={{ height: "52px" }}
                                {...getRootProps()}
                              >
                                <input
                                  style={{ height: "52px" }}
                                  {...getInputProps()}
                                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" // Permitir múltiples formatos de archivo
                                />
                                <p>
                                  {TextoArchivoDNI == ""
                                    ? "Haz click aquí para agregar archivos"
                                    : TextoArchivoDNI}{" "}
                                </p>
                              </div>
                            </button>
                          )}
                        </Dropzone>
                        {errors.pena_NombreArchDNI && (
                          <Typography variant="caption" color="error">
                            {errors.pena_NombreArchDNI.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.pena_NumeroRecibo}>
                          Recibo de Servicio Público Número
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              inputProps={{
                                maxLength: 150,
                              }}
                              error={!!errors.pena_NumeroRecibo}
                              value={field.value}
                            ></TextField>
                          )}
                          name="pena_NumeroRecibo"
                          control={control}
                        ></Controller>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.pena_ArchivoNumeroRecibo}>
                          Archivo de Numero de Recibo
                        </FormLabel>

                        <Dropzone
                          item
                          xs={6}
                          onDrop={handleDropArchivoNumeroRecibo}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <button
                              type="button"
                              style={{
                                backgroundColor: "#dcc25a",
                                height: "52px",
                                borderRadius: "5px",
                                border: "none",
                                color: "white",
                                padding: "10px 20px",
                                cursor: "pointer",
                              }}
                            >
                              <div
                                style={{ height: "52px" }}
                                {...getRootProps()}
                              >
                                <input
                                  {...getInputProps()}
                                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" // Permitir múltiples formatos de archivo
                                />
                                <p>
                                  {TextoArchivoNumeroRecibo == ""
                                    ? "Haz click aquí para agregar archivos"
                                    : TextoArchivoNumeroRecibo}{" "}
                                </p>
                              </div>
                            </button>
                          )}
                        </Dropzone>
                        {errors.pena_NombreArchRecibo && (
                          <Typography variant="caption" color="error">
                            {errors.pena_NombreArchRecibo.message}
                          </Typography>
                        )}
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
                  onClick={() => {
                    AgregarRegistro();
                    isEditMode == true
                      ? setsecodForm(true)
                      : setsecodForm(false);
                  }}
                  disabled={Cargando}
                  type="submit"
                >
                       {Cargando ? Spiner :  "Guardar"}

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
                    // navigate("/PersonaNatural/Index");
                    CancelarTap1();
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </form>
          </TabPanel>
          {/* aqui termina persona */}

          <TabPanel value={value} index={1} dir={theme.direction}>
            <form onSubmit={handlesubmit1((_data) => {})}>
              <Card style={{ marginBottom: "25px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    
                  <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors1.pers_Nombre} fullWidth={true}>
                      <FormLabel
                      >
                        Cliente:
                      </FormLabel>
                      <TextField
                        {...field}
                        error={!!errors1.pers_Nombre}
                        variant="outlined"
                        fullWidth={true}
                        inputprops={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="pers_Nombre"
                  control={control1}
                />
              </div>
            </Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors1.oficina}>
                          Oficina Regional
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="oficina"
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              options={oficinas_DDL}
                              disableClearable={true}
                              value={datosWatch2.oficina ?? null}
                              onChange={(event, value) => {
                                setValue2("oficina", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors1.oficina}
                                  InputLabelProps={{ shrink: true }}
                                />
                              )}
                            />
                          )}
                          name="oficina"
                          error={!!errors1.oficina}
                          control={control1}
                        />
                      </FormControl>
                    </Grid>
                    </Grid>              

                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors1.estado}>
                          Estado Civil
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="estado"
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              options={estadosciviles_DDL}
                              disableClearable={true}
                              value={datosWatch2.estado ?? null}
                              onChange={(event, value) => {
                                setValue2("estado", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors1.estado}
                                />
                              )}
                            />
                          )}
                          name="estado"
                          error={!!errors1.estado}
                          control={control1}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors1.oficio}>
                          Profesión u Oficio de la persona
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="oficio"
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              options={oficios_DDL}
                              disableClearable={true}
                              value={datosWatch2.oficio ?? null}
                              onChange={(event, value) => {
                                setValue2("oficio", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors1.oficio}
                                />
                              )}
                            />
                          )}
                          name="oficio"
                          error={!!errors1.oficio}
                          control={control1}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider style={{ marginTop: "30px", marginBottom: "20px" }}>
                    <Chip label="DOMICILIO DE LA PERSONA" />
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div className=" mb-16">
                        <Controller
                          name="provincia"
                          control={control}
                          render={({ field }) => (
                            <FormControl
                              error={!!errors1.provincia}
                              fullWidth={true}
                            >
                              <FormLabel error={!!errors1.provincia}>
                                Departamento
                              </FormLabel>
                              <Autocomplete
                                disableClearable={true}
                                {...field}
                                disablePortal
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value.value
                                }
                                id="provincia"
                                options={provincia_DDL}
                                value={datosWatch2["provincia"] ?? null}
                                onChange={async (event, value) => {
                                  setValue2("provincia", value);
                                  setValue2("ciudad", "");
                                  CiudadesGet(value?.value);
                                  triggerDesc1("provincia");
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={!!errors1.provincia}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                )}
                              />
                            </FormControl>
                          )}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <div className=" mb-16">
                        <Controller
                          name="ciudad"
                          control={control1}
                          render={({ field }) => (
                            <FormControl
                              error={!!errors1.ciudad}
                              fullWidth={true}
                            >
                              <FormLabel error={!!errors1.ciudad}>
                                Ciudades
                              </FormLabel>
                              <Autocomplete
                                disableClearable={true}
                                {...field}
                                disablePortal
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value.value
                                }
                                id="ciudad"
                                options={ciudad_DDL}
                                value={datosWatch2["ciudad"] ?? null}
                                onChange={async (event, value) => {
                                  setValue2("ciudad", value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={!!errors1.ciudad}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                )}
                              />
                            </FormControl>
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "10px" }}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors1.pena_DireccionExacta}>
                          Dirección Completa
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              inputProps={{
                                maxLength: 150,
                              }}
                              error={!!errors1.pena_DireccionExacta}
                            ></TextField>
                          )}
                          name="pena_DireccionExacta"
                          control={control1}
                        ></Controller>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider style={{ marginTop: "30px", marginBottom: "20px" }}>
                    <Chip label="INFORMACIÓN DE CONTACTO" />
                  </Divider>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ marginTop: "10px" }}>
                      <div className=" mb-16">
                        <Controller
                          render={({ field, fieldState }) => (
                            <InputMask
                              mask="+504 9999-9999"
                              value={datosWatch2["pena_TelefonoFijo"]}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              maskChar=" "
                            >
                              {() => (
                                <FormControl
                                  error={!!errors1.pena_TelefonoFijo}
                                  fullWidth={true}
                                >
                                  <FormLabel>
                                    Número de Teléfono Fijo de la Persona
                                  </FormLabel>
                                  <TextField
                                    {...field}
                                    variant="outlined"
                                    error={!!errors1.pena_TelefonoFijo}
                                    fullWidth={true}
                                    inputprops={{
                                      startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                  />
                                  <FormHelperText>
                                    {errors1.pena_TelefonoFijo
                                      ? "Ingrese todo el número de teléfono"
                                      : ""}{" "}
                                  </FormHelperText>
                                </FormControl>
                              )}
                            </InputMask>
                          )}
                          name="pena_TelefonoFijo"
                          control={control1}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: "10px" }}>
                      <div className=" mb-16">
                        <Controller
                          render={({ field, fieldState }) => (
                            <InputMask
                              mask="+504 9999-9999"
                              value={datosWatch2["pena_TelefonoCelular"]}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              maskChar=" "
                            >
                              {() => (
                                <FormControl
                                  error={!!errors1.pena_TelefonoCelular}
                                  fullWidth={true}
                                >
                                  <FormLabel>
                                    Número de Teléfono Celular de la Persona
                                  </FormLabel>
                                  <TextField
                                    {...field}
                                    variant="outlined"
                                    error={!!errors1.pena_TelefonoCelular}
                                    fullWidth={true}
                                    inputprops={{
                                      startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                  />
                                  <FormHelperText>
                                    {errors1.pena_TelefonoCelular
                                      ? datosWatch2["pena_TelefonoFijo"] &&
                                        datosWatch2["pena_TelefonoCelular"] &&
                                        datosWatch2[
                                          "pena_TelefonoFijo"
                                        ].trim() !== "" &&
                                        datosWatch2[
                                          "pena_TelefonoCelular"
                                        ].trim() !== "" &&
                                        datosWatch2["pena_TelefonoFijo"] ===
                                          datosWatch2["pena_TelefonoCelular"]
                                        ? "El Telefono fijo no puede ser igual al telefono celular"
                                        : "Ingrese todo el número de teléfono"
                                      : ""}
                                  </FormHelperText>
                                </FormControl>
                              )}
                            </InputMask>
                          )}
                          name="pena_TelefonoCelular"
                          control={control1}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <Controller
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <FormLabel error={!!errors1.pena_CorreoElectronico}>
                              Correo electrónico donde notificar:
                              <Typography variant="h6" component="span">
                                <BootstrapTooltip
                                  title="para efectos de la recepción o envío de solicitudes,
                                        escritos, autos, notificaciones, requerimientos y cualquier
                                        otro proveído, comunicaciones, resoluciones y cualquier otra
                                        actuación ante la administración aduanera o emitido por esta"
                                >
                                  <InfoIcon
                                    sx={{ m: "14px", color: "#C5C5C5" }}
                                  />
                                </BootstrapTooltip>
                              </Typography>
                            </FormLabel>

                            <TextField
                              {...field}
                              error={!!errors1.pena_CorreoElectronico}
                              variant="outlined"
                              fullWidth={true}
                              //onChange={field.onChange}
                              onChange={(event, value) => {
                                field.onChange(event);
                                handleEmailChange(
                                  datosWatch2.pena_CorreoElectronico
                                );
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Button
                                      startIcon={<Icon>checked</Icon>}
                                      variant="contained"
                                      color="primary"
                                      style={{
                                        borderRadius: "10px",
                                        marginRight: "10px",
                                      }}
                                      sx={{
                                        backgroundColor: "#dcc25a",
                                        color: "white",
                                        "&:hover": {
                                          backgroundColor: "#dcc25ac9",
                                        },
                                      }}
                                      type="button"
                                      onClick={onSubmitUser}
                                      disabled={enviandoCodigo}
                                    >
                                      {enviandoCodigo
                                        ? `Reenviar en ${contador}s`
                                        : "Enviar código"}
                                    </Button>
                                  </InputAdornment>
                                ),
                              }}
                            />

                            {errors1.pena_CorreoElectronico && (
                              <Typography variant="caption" color="error">
                                {errors1.pena_CorreoElectronico.message}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                        name="pena_CorreoElectronico"
                        control={control1}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controller
                        render={({ field }) => {
                          const tokenValido = validarToken1(field.value);
                          const isError = !!errors1.codigo1;
                          const mostrarMensajeCorrecto =
                            tokenValido &&
                            !isError &&
                            field.value !== "" &&
                            field.value !== undefined; // Verificar que el campo no esté vacío

                          const handleChange = (event) => {
                            const newValue = event.target.value.toUpperCase(); // Convierte el valor a mayúsculas
                            field.onChange(newValue);
                          };

                          return (
                            <FormControl fullWidth={true}>
                              <FormLabel
                                error={isError}
                                style={{ color: isError ? "red" : "" }}
                              >
                                Código de verificación de correo electrónico:
                                <Typography variant="h6" component="span">
                                  <BootstrapTooltip
                                    title="Esto asegura que se ha informado un correo electrónico válido, 
                                      accesible por la persona o personal de la empresa,
                                      y los correos de aduanas de Honduras no se encuentren bloqueados 
                                      por el proveedor/servidor de correo electrónico"
                                  >
                                    <InfoIcon
                                      sx={{ m: "14px", color: "#C5C5C5" }}
                                    />
                                  </BootstrapTooltip>
                                </Typography>
                              </FormLabel>
                              <TextField
                                {...field}
                                error={isError}
                                variant="outlined"
                                fullWidth={true}
                                inputProps={{
                                  maxLength: 17,
                                  style: {
                                    textTransform: "uppercase",
                                  },
                                  startAdornment: (
                                    <InputAdornment position="start" />
                                  ),
                                }}
                                onChange={handleChange} // Usamos la función handleChange para convertir a mayúsculas
                              />
                              {mostrarMensajeCorrecto && (
                                <Typography
                                  variant="caption"
                                  style={{ color: "#49cc90" }}
                                >
                                  Código de verificación correcto
                                </Typography>
                              )}
                              {isError && (
                                <Typography variant="caption" color="error">
                                  {errors1.codigo1.message}
                                </Typography>
                              )}
                            </FormControl>
                          );
                        }}
                        name="codigo1"
                        control={control1}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controller
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <FormLabel>
                              Correo electrónico alternativo:
                            </FormLabel>

                            <TextField
                              {...field}
                              error={
                                !!errors1.pena_CorreoAlternativo &&
                                !errors1.pena_CorreoAlternativo.message.includes(
                                  "pena_CorreoAlternativo must be a `string` type"
                                )
                              }
                              variant="outlined"
                              fullWidth={true}
                              onChange={(event, value) => {
                                field.onChange(event);
                                handleEmail2Change(
                                  datosWatch2.pena_CorreoAlternativo
                                );
                                setCorreoValido(true);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Button
                                      startIcon={<Icon>checked</Icon>}
                                      variant="contained"
                                      color="primary"
                                      style={{
                                        borderRadius: "10px",
                                        marginRight: "10px",
                                      }}
                                      sx={{
                                        backgroundColor: "#dcc25a",
                                        color: "white",
                                        "&:hover": {
                                          backgroundColor: "#dcc25ac9",
                                        },
                                      }}
                                      type="button"
                                      onClick={onSubmiToken2}
                                      disabled={enviandoCodigo2}
                                    >
                                      {enviandoCodigo2
                                        ? `Reenviar en ${contador2}s`
                                        : "Enviar código"}
                                    </Button>
                                  </InputAdornment>
                                ),
                              }}
                            />

                            {errors1.pena_CorreoAlternativo &&
                            !errors1.pena_CorreoAlternativo.message.includes(
                              "pena_CorreoAlternativo must be a `string` type"
                            ) ? (
                              <Typography variant="caption" color="error">
                                {errors1.pena_CorreoAlternativo.message}
                              </Typography>
                            ) : null}
                          </FormControl>
                        )}
                        name="pena_CorreoAlternativo"
                        control={control1}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controller
                        render={({ field }) => {
                          const tokenValido = validarToken2(field.value);
                          const isError = !!errors1.codigo2;
                          const mostrarMensajeCorrecto =
                            tokenValido &&
                            !isError &&
                            field.value !== "" &&
                            field.value !== undefined; // Verificar que el campo no esté vacío

                          const handleChange = (event) => {
                            const newValue = event.target.value.toUpperCase(); // Convierte el valor a mayúsculas
                            field.onChange(newValue);
                          };

                          return (
                            <FormControl fullWidth={true}>
                              <FormLabel
                                error={isError}
                                style={{ color: isError ? "red" : "" }}
                              >
                                Código de verificación de correo electrónico
                                alternativo:
                              </FormLabel>
                              <TextField
                                {...field}
                                error={isError}
                                variant="outlined"
                                fullWidth={true}
                                inputProps={{
                                  maxLength: 17,
                                  style: {
                                    textTransform: "uppercase",
                                  },
                                  startAdornment: (
                                    <InputAdornment position="start" />
                                  ),
                                }}
                                onChange={handleChange} // Usamos la función handleChange para convertir a mayúsculas
                              />
                              {mostrarMensajeCorrecto && (
                                <Typography
                                  variant="caption"
                                  style={{ color: "#49cc90" }}
                                >
                                  Código de verificación correcto
                                </Typography>
                              )}
                              {isError && (
                                <Typography variant="caption" color="error">
                                  {errors1.codigo2.message}
                                </Typography>
                              )}
                            </FormControl>
                          );
                        }}
                        name="codigo2"
                        control={control1}
                        rules={{
                          required: CorreoValido,
                        }}
                      />
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
                  marginTop: "20px",
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
                  onClick={() => {
                    handleValidForm2();
                  }}
                  // onClick={() => {
                  //   navigate('/Contrato-de-Adhesion-Persona-Natural/Index');
                  // }}
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
                  onClick={() => {
                    //navigate("/PersonaNatural/Index");
                    CancelarTap2();
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </form>
          </TabPanel>

          {/* tab numero3 */}

          {/* tab numero 4 */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            {/* <Card style={{ marginBottom: "25px" }}> */}
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              >
                <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
                  ¡Muchas gracias por agregar tu Información!
                </div>
              </motion.div>
              <Grid
                item
                style={{
                  textAlign: "justify",
                  marginTop: "3%",
                  fontSize: "16px",
                }}
                xs={10}
              >
                La solicitud y sus documentos se han registrado
                satisfactoriamente. Imprima el Contrato de Adhesión y guardelo.
                Espere recibir la notificación sobre su aprobación vía correo
                electrónico en el transcurso de 24 a 48 horas, o escanee el
                Codigo QR en su contrato para revisar el estado de aprobación.
                Si este es su primer Contrato, posterior a la aprobación
                recibira otro correo electronico con la clave de acceso a la
                plataforma de Subasta
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                  marginTop: "20px",
                }}
              >
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                    display: Ocultar,
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => {
                    handleNewCreate();
                  }}
                  type="button"
                  hid
                >
                  Nueva Solicitud
                </Button>
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
                  onClick={() => {
                    navigate("/PersonaNatural/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </CardContent>
            {/* </Card> */}

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
                    onClick={PersonaNaturalFinalizar}
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

          {/* Cancelar tap 1 dialog */}
          <Dialog
            open={guardaTap1}
            fullWidth={true}
            onClose={DialogCancelar1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Cancelar la creación de la solicitud de contrato de adhesión
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Desea cancelar la creación de esta solicitud de contrato?
                <br></br>
                Si presiona en "Cancelar sin guardar", el registro actual se
                eliminará y no se guardará ningún cambio.
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
                  color={"primary"}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  // sx={botonStyle}
                  onClick={DialogCancelar1}
                >
                  Continuar
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#DAD8D8",
                    color: "black",
                    "&:hover": { backgroundColor: "#BFBABA" },
                  }}
                  onClick={() => {
                    navigate("/PersonaNatural/Index");
                  }}
                >
                  Cancelar sin Guardar
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>

          {/* Cancelar tap 2 dialog */}
          <Dialog
            open={guardaTap2}
            fullWidth={true}
            onClose={DialogCancelar2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Cancelar la creación de la solicitud de contrato de adhesión
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Desea cancelar la creación de esta solicitud de contrato?
                <br></br>
                Si presiona en "Cancelar sin guardar", el registro actual se
                eliminará y no se guardará ningún cambio.
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
                  color={"primary"}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  // sx={botonStyle}
                  onClick={DialogCancelar2}
                >
                  Continuar
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#DAD8D8",
                    color: "black",
                    "&:hover": { backgroundColor: "#BFBABA" },
                  }}
                  onClick={() => {
                    navigate("/PersonaNatural/Index");
                  }}
                >
                  Cancelar sin Guardar
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default PersonaNatural_Crear;