/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Collapse,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import { Table } from "antd";
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import "react-toastify/dist/ReactToastify.css";
import instance from "src/app/auth/services/jwtService/jwtService";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import { black } from "tailwindcss/colors";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import {
  ToastError,
  ToastSuccess,
  ToastSuccessEditar,
  ToastSuccessPersonalizado,
  ToastWarning,
  ToastWarningPersonalizado,
  ToastDefault
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import Declaracion_ValorService from "../Declaracion_ValorService";
import ArancelesService from "../../../Impuestos/Aranceles/ArancelesServices"
import History from "src/@history/@history";
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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const botonStyle = {
  backgroundColor: "#634A9E",
  color: "white",
  "&:hover": { backgroundColor: "#6e52ae" },
};

const getRowClassName = (params) => {
  return params.rowIndex % 2 === 0 ? '#f2f2f2' : '#ffffff';
};



function Declaracion_Valor_Crear() {

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    ['& .${tooltipClasses.arrow}']: {
        color: '#6a2b85',
    },
    ['& .${tooltipClasses.tooltip}']: {
        backgroundColor: '#6a2b85',
        textAlign: 'justify'
    },
  }));

  const DeclaracionValorServices = Declaracion_ValorService();
  const ArancelSeraravices = ArancelesService();
  const load_DDLs = Load_DDLs()
  const [arancelesdata, setarancelesdata] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  //Constante para guardar el id de la declarcion de valor insertada desde la tab 1
  const [Declaracion_Valor_Id, setDeclaracion_Valor_Id] = useState(0);

  //Constantes para los valores de los AutoComplete de la tab 1
  const [OtroNivelComercial, setOtroNivelComercial] = useState(true);
  const [RegistroInsertado, setRegistroInsertado] = useState(false);

  const [Aduanas, setAduanas] = useState([]);
  const [DeclaracionMercancia_DDL, setDeclaracionMercancia_DDL] = useState([{value:'01',label:'Usado'},{value:'02',label:'Nuevo'}]);
  const [Items_Tab3Ddl, setItems_Tab3Ddl] = useState([{value:'01',label:'Cigarrro'},{value:'02',label:'Automovil'}]);
  const [AduanaIngreso_DDL, setAduanaIngreso_DDL] = useState([]);
  const [AduanaSalida_DDL, setAduanaSalida_DDL] = useState([]);
  const [RegimenesAduaneros_DDL, setRegimenesAduaneros_DDL] = useState([]);
  const [PaisImportador_DDL, setPaisImportador_DDL] = useState([]);
  const [Paises, setPaises] = useState([]);
  const [ProvinciaImportador_DDL, setProvinciaImportador_DDL] = useState([]);
  const [NivelComercialImportador_DDL, setNivelComercialImportador_DDL] = useState([]);
  const [isEditTab1, setisEditTab1] = useState(false);
  
  const [MascaraImportador, setMascaraImportador] = useState("*******************")

  const [CancelarDeva, setCancelarDeva] = useState(false);

  const RegirigirIndex = () => {   
      History.push('/Declaracion_Valor/Index')
  }

  const DialogCancelarDeva = () => {
    setCancelarDeva(!CancelarDeva)
  }

  const PaisImportador = async () => {
    try {
      const response = await load_DDLs.paises()
      setPaisImportador_DDL(response)
      const XD =  response.find(item => item.value === 97);
      setValueTab1('PaisImportador',XD , { shouldValidate: true, shouldTouch: true })
      let xd = XD['label'].split('-')
      setMascaraImportador(xd[2].trim()+' *********')
      FiltrarEstados(97);
    } catch (error) {
      
    }
  };

  const CancelarNoGuardar = async() => {
    try {
      const response = await DeclaracionValorServices.CancelarDeva(Declaracion_Valor_Id,factura_Id,condicion_Id,base_Id);
      if (response.data.data.messageStatus == "1") {
        ToastDefault("La creación de la declaración de valor ha sido cancelada exitosamente");
        History.push('/Declaracion_Valor/Index')
      } else {
        ToastError("Error inesperado");
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
    
  }

  const GuardarYSalir = () => {
    if(RegistroInsertado){
      ToastSuccessPersonalizado("Declaración de valor guardada exitosamente");
      History.push('/Declaracion_Valor/Index')
    }else{
      History.push('/Declaracion_Valor/Index')
    }
  }

  const DefaultValuesTab1 = {
    AduanaIngreso: null,
    AduanaSalida: null,
    DeclaracionMercancia: null,
    FechaAceptacion: null,
    RegimenAduanero:null,
    NombreImportador: "",
    RTNImportador: "",
    NumeroRegistroImportador: "",
    DireccionImportador: "",
    PaisImportador: null,
    EstadoImportador: null,
    CorreoElectronicoImportador: "",
    TelefonoImportador: "",
    FaxImportador: "",
    NivelComercialImportador: null,
    OtroNivelComercialImportador: "",
  }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

  const schemaValuesTab1 = yup.object().shape({
    AduanaIngreso: yup.object().required(),
    AduanaSalida: yup.object().required(),
    DeclaracionMercancia: yup.object().required(),
    FechaAceptacion: yup.date()
        .nullable()
        .required("")
        .test(
          "is-greater-or-equal-to-today",
          `La fecha debe ser igual o posterior a ${instance.formatFechaHora(today).toString().substring(0,10)}`,
          (value) => {
            const inputDate = new Date(value);
            inputDate.setHours(0, 0, 0, 0);
            return inputDate >= today;
          }
    ),
    RegimenAduanero:yup.object().required(),
    NombreImportador: yup.string().required(),
    RTNImportador: yup.string().required("").min(16,"Ingrese todo el RTN").max(16),
    NumeroRegistroImportador: yup.string()
    .test('is-valid', 'los valores no coinciden', function (value) {
      const { RTNImportador } = this.parent;
      const QuitarGuionesRTNImportador = RTNImportador.replace(/-/g, '');
      const NumeroRegistroImportador = value;

      return QuitarGuionesRTNImportador === NumeroRegistroImportador;
    })
    .required("").min(14, "Ingrese todo el RTN sin guiones").max(14),
    DireccionImportador: yup.string().required(),
    PaisImportador: yup.object().required(),
    EstadoImportador: yup.object().required(),
    CorreoElectronicoImportador: yup.string().required("").email("Ingrese un correo electronico valido"),
    TelefonoImportador:  yup.string().required("").min(14,"Ingrese un Numero de teléfono válido"),
    FaxImportador: yup.string(),
    NivelComercialImportador: yup.object().required(),
    OtroNivelComercialImportador:OtroNivelComercial ? yup.string() : yup.string().required(),
  });

  //Constante UseForm para tabulacion 1

  const { handleSubmit: handleSubmitTab1, reset: resetTab1, control: controlTab1, formState: formStateTab1, watch: watchTab1, setValue: setValueTab1 } = useForm({
    defaultValues:DefaultValuesTab1,
    mode: "all",
    resolver: yupResolver(schemaValuesTab1),
  });

  const { isValid: isValidTab1, dirtyFields: dirtyFieldsTab1, errors: errorsTab1 } = formStateTab1;
  const datosTab1 = watchTab1()

  const FiltrarEstados = async (value) => {  
    setProvinciaImportador_DDL(await load_DDLs.ProvinciasPorPais(value))
  } 


    const GuardarTab1 = async () => {
      if(isEditTab1){
        if (isValidTab1) {
          EditarTab1()
        } else {
          ToastWarning("Complete los campos vacios");
        }
      }else{
        if (isValidTab1) {
          InsertarTab1()
        } else {
          ToastWarning("Complete los campos vacios");
        }
      }
    }

    //Peticion para crear un registro
    const InsertarTab1 = async () => {
      try {
        const response = await DeclaracionValorServices.InsertarTab1DEVA(datosTab1);
        if (response.data.data.messageStatus != "0") {
          setDeclaracion_Valor_Id(parseInt(response.data.data.messageStatus));
          setisEditTab1(true);
          ToastSuccess();
          setRegistroInsertado(true);
          validacion(1)
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          DialogAceptar()
          ToastWarningYaExiste();
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

     //Peticion para crear un registro
     const EditarTab1 = async () => {
      try {
        const response = await DeclaracionValorServices.EditarTab1DEVA(Declaracion_Valor_Id,datosTab1);
        if (response.data.data.messageStatus != "0") {
          ToastSuccessEditar();
          validacion(1)
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          DialogAceptar()
          ToastWarningYaExiste();
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    };

    	
   const getAduanas = async () => {
      try{
        const data = await load_DDLs.aduanas();
        setAduanaIngreso_DDL(data);
        setAduanaSalida_DDL(data);
      } catch (error){
        
      }
    }

    useEffect(() => {
      getAduanas();
    }, []);
  
  
  

  
  //Constantes para los valores de los AutoComplete de la tab 2
  const [OtraCondicionComercial, setOtraCondicionComercial] = useState(true);
  const [OtroTipoIntermediario, setOtroTipoIntermediario] = useState(true);
  const [isEditTab2, setisEditTab2] = useState(false);
  const [MascaraIntermediario, setMascaraIntermediario] = useState("")
  const [MascaraProveedor, setMascaraProveedor] = useState("")
  const [checkedIntermediario, setcheckedIntermediario] = useState(false)
  const [EliminarIntermediario, setEliminarIntermediario]= useState(false);

  const [PaisProveedor_DDL, setPaisProveedor_DDL] = useState([]);
  const [ProvinciaProveedor_DDL, setProvinciaProveedor_DDL] = useState([]);
  const [PaisIntermediario_DDL, setPaisIntermediario_DDL] = useState([]);
  const [ProvinciaIntermediario_DDL, setProvinciaIntermediario_DDL] = useState([]);
  const [TipoIntermediario_DDL, setTipoIntermediario_DDL] = useState([]);
  const [CondicionComercialProveedor_DDL, setCondicionComercialProveedor_DDL] = useState([]);

  const DefaultValuesTab2 = {
    IdentificacionProveedor: "",
    NombreProveedor: "",
    DireccionProveedor: "",
    PaisProveedor: null,
    EstadoProveedor: null,
    CorreoProveedor: "",
    TelefonoProveedor: "",
    FaxProveedor: "",
    CondicionComercialProveedor: null,
    OtraCondicionComercialProveedor: "",
    IdentificacionIntermedario: "",
    NombreIntermediario: "",
    DireccionIntermediario: "",
    PaisIntermediario: null,
    EstadoIntermediario: null,
    CorreoIntermediario: "",
    TelefonoIntermediario: "",
    FaxIntermediario: "",
    TipoIntermediario: null,
    OtroTipoIntermediario: "",
  };
  
  const schemaValuesTab2 = yup.object().shape({
    IdentificacionProveedor: yup.string().required("").min(15,"Ingrese todo el DNI").max(15),
    NombreProveedor: yup.string().required(),
    DireccionProveedor: yup.string().required(),
    PaisProveedor: yup.object().required(),
    EstadoProveedor: yup.object().required(),
    CorreoProveedor: yup.string().required("").email("Ingrese un correo electronico valido"),
    TelefonoProveedor: yup.string().required("").min(14,"Ingrese un Numero de teléfono válido"),
    FaxProveedor: yup.string(),
    CondicionComercialProveedor: yup.object().required(),
    OtraCondicionComercialProveedor:OtraCondicionComercial ? yup.string() : yup.string().required(),

    IdentificacionIntermedario: checkedIntermediario ? yup.string().required("").nullable().min(15, "Ingrese todo el DNI").max(15): yup.string().nullable() ,
    NombreIntermediario: checkedIntermediario ? yup.string().nullable().required() : yup.string().nullable(),
    DireccionIntermediario: checkedIntermediario ? yup.string().nullable().required() : yup.string().nullable(),
    PaisIntermediario: checkedIntermediario ? yup.object().nullable().required() : yup.object().nullable(),
    EstadoIntermediario: checkedIntermediario ? yup.object().nullable().required() : yup.object().nullable(),
    CorreoIntermediario: checkedIntermediario ? yup.string().required("").email("Ingrese un correo electronico valido").nullable().required() : yup.string().nullable() ,
    TelefonoIntermediario: checkedIntermediario ? yup.string().required("").nullable().min(14, "Ingrese un Numero de teléfono válido") : yup.string().nullable(),
    FaxIntermediario:yup.string().nullable(),
    TipoIntermediario: checkedIntermediario ? yup.object().nullable().required() : yup.object().nullable(),
    OtroTipoIntermediario:yup.string().nullable(),
  });

  const LimpiarCampos = () =>{
    setValueTab2("IdentificacionIntermedario","", { shouldValidate: true, shouldTouch: true });
    setValueTab2("NombreIntermediario","", { shouldValidate: true, shouldTouch: true });
    setValueTab2("DireccionIntermediario","", { shouldValidate: true, shouldTouch: true });
    setValueTab2("NombreIntermediario", "", { shouldValidate: true, shouldTouch: true });
    setValueTab2("CorreoIntermediario","", { shouldValidate: true, shouldTouch: true });
    setValueTab2("TelefonoIntermediario","", { shouldValidate: true, shouldTouch: true });
    setValueTab2("FaxIntermediario", "", { shouldValidate: true, shouldTouch: true });
    setValueTab2("OtroTipoIntermediario", "", { shouldValidate: true, shouldTouch: true });
    setValueTab2("PaisIntermediario", null, { shouldValidate: true, shouldTouch: true });
    setValueTab2("EstadoIntermediario", null, { shouldValidate: true, shouldTouch: true });
    setValueTab2("TipoIntermediario", null, { shouldValidate: true, shouldTouch: true });
  }

  //Constante UseForm para tabulacion 2

  const { handleSubmit: handleSubmitTab2, reset: resetTab2, control: controlTab2, formState: formStateTab2, watch: watchTab2, setValue: setValueTab2 } = useForm({
    defaultValues: DefaultValuesTab2,
    mode: "all",
    resolver: yupResolver(schemaValuesTab2),
  });

  const { isValid: isValidTab2, dirtyFields: dirtyFieldsTab2, errors: errorsTab2 } = formStateTab2;
  const datosTab2 = watchTab2()



  const FiltrarEstadosProveedor = async (value) => {  
    setProvinciaProveedor_DDL(await load_DDLs.ProvinciasPorPais(value['value']))
  } 

  const FiltrarEstadosIntermediario = async (value) => {  
    setProvinciaIntermediario_DDL(await load_DDLs.ProvinciasPorPais(value['value']))
  } 

    
    const handleChangeIntermediario = async(event) => {
    if(EliminarIntermediario){
      const response = await DeclaracionValorServices.CancelarIntermediario(Declaracion_Valor_Id);
      if(response.data.data.messageStatus == "1"){
        setcheckedIntermediario(false);
        setEliminarIntermediario(false);
      }else{
        ToastError();
      }
    }else{
      setcheckedIntermediario(event.target.checked);
    }
  }

  const GuardarTab2 = async () => {
    if(isEditTab2){
      if (isValidTab2) {
        EditarTab2()
      } else {
        ToastWarning("Complete los campos vacios");
      }
    }else{
      if (isValidTab2) {
        InsertarTab2()
      } else {
        ToastWarning("Complete los campos vacios");
      }
    }
  }

  //Peticion para crear un registro
   const InsertarTab2 = async () => {
    try {
      const response = await DeclaracionValorServices.InsertarTab2DEVA(datosTab2,Declaracion_Valor_Id,checkedIntermediario);
      if (response.data.data.messageStatus == "1") {
        if(datosTab2.IdentificacionIntermedario != ""){
          setEliminarIntermediario(true);
        }
        setisEditTab2(true);
        ToastSuccess();
        validacion(2)
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

   //Peticion para crear un registro
   const EditarTab2 = async () => {
    try {
      const response = await DeclaracionValorServices.EditarTab2DEVA(datosTab2,Declaracion_Valor_Id);
      if (response.data.data.messageStatus == "1") {
        if(datosTab2.IdentificacionIntermedario != ""){
          setEliminarIntermediario(true);
        }
        setisEditTab2(true);
        ToastSuccessEditar();
        validacion(2)
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };



  //Constantes para los valores de los AutoComplete de la tab 3
  const [FormaEnvioEstadoDisabled, setFormaEnvioEstadoDisabled] = useState(true);
  const [FormaPagoEstadoDisabled, setFormaPagoEstadoDisabled] = useState(true);
  const [MonedaEstadoDisabled, setMonedaEstadoDisabled] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const [LugarEmbarque, setLugarEmbarque] = useState(false);
  const [SearchTextLugarEmbarque,setSearchTextLugarEmbarque] = useState("");
  const [filasLugarEmbarque, setfilasLugarEmbarque] = React.useState(10);
  const [dataLugarEmbarque, setdataLugarEmbarque] = useState([]);
  const [TextLugarEmbarque,setTextLugarEmbarque] = useState("");
  const [isEditTab3, setisEditTab3] = useState(false);

  const [PaisEntrega_DDl, setPaisEntrega_DDl] = useState([]);
  const [Incoterm_DDL, setIncoterm_DDL] = useState([]);
  const [FormaEnvio_DDL, setFormaEnvio_DDL] = useState([]);
  const [FormasPago_DDL, setFormasPago_DDL] = useState([]);
  const [LugarEmbarque_DDl, setLugarEmbarque_DDl] = useState([]);
  const [PaisExportacion_DDl, setPaisExportacion_DDl] = useState([]);
  const [MonedasTransaccion_DDl, setMonedasTransaccion_DDl] = useState([]);

  const DefaultValuesTab3 = {
    LugarEntrega: "",
    PaisEntrega: "",
    Incoterm: "",
    Version: "",
    NumeroContrato: "",
    FechaContrato: null,
    FormaEnvio: "",
    OtraFormaEnvio: "",
    PagoEfectuado: "",
    FormaPago: "",
    OtraFormaPago: "",
    LugarEmbarque: null,
    PaisExportacion: "",
    FechaExportacion: null,
    MonedaTransaccion: "",
    OtraMoneda: "",
    CambioMoneda: "",
  };

  const schemaValuesTab3 = yup.object().shape({
    LugarEntrega: yup.string().required(),
    PaisEntrega: yup.object().required(),
    Incoterm: yup.object().required(),
    Version: yup.string().required(),
    NumeroContrato: yup.string().required(),
    FechaContrato: yup.date().nullable().required("").max(new Date(),"No puede ingresar fechas futuras").min(new Date(1900, 0 , 1), "Ingrese una fecha mayor a 01/01/1900"),
    FormaEnvio: yup.object().required(),
    OtraFormaEnvio:FormaEnvioEstadoDisabled ? yup.string() : yup.string().required(),
    PagoEfectuado: yup.string(),
    FormaPago: yup.object().required(),
    OtraFormaPago: FormaPagoEstadoDisabled ? yup.string() : yup.string().required(),
    LugarEmbarque: yup.object().required(),
    PaisExportacion: yup.object().required(),
    FechaExportacion: yup.date().nullable().required("").min(new Date(1900, 0 , 1), "Ingrese una fecha mayor a 01/01/1900"),
    MonedaTransaccion: yup.object().required(),
    OtraMoneda: yup.string(),
    CambioMoneda: yup.string().required(),
  });

  //Constante UseForm para tabulacion 3
  const { handleSubmit: handleSubmitTab3, reset: resetTab3, control: controlTab3, formState: formStateTab3, watch: watchTab3,setValue: setValueTab3 } = useForm({
    defaultValues: DefaultValuesTab3,
    mode: "all",
    resolver: yupResolver(schemaValuesTab3),
  });

  const { isValid: isValidTab3, dirtyFields: dirtyFieldsTab3, errors: errorsTab3, touchedFields } = formStateTab3;
  const datosTab3 = watchTab3()

  const DialogLugarEntrega = () => {
    setLugarEmbarque(!LugarEmbarque);
  }

  const CargarDatosLugarEmbarque = async(code) => {
    if(code === ""){
      setdataLugarEmbarque([]);
      setLugarEmbarque_DDl([]);
    }else{
      setdataLugarEmbarque(await DeclaracionValorServices.ListarLugarEmbarque(code))
      setLugarEmbarque_DDl(await load_DDLs.ListarLugarEmbarque(code))
    }
  }

    //Constantes para las columnas de la busqueda de la tabla
    const columnsLugarmbarque = [
      {
        title: "No.",
        dataIndex: "key",
        key: "key",
        sorter: (a, b) => a.key - b.key, //sorting para Numeros
      },
      {
        title: "Código del lugar de embarque",
        dataIndex: "emba_Codigo",
        key: "emba_Codigo",
        sorter: (a, b) => a.emba_Codigo.localeCompare(b.emba_Codigo), //sorting para Letras
      },
      {
        title: "Lugar de embarque",
        dataIndex: "emba_Descripcion",
        key: "emba_Descripcion",
        sorter: (a, b) => a.emba_Descripcion.localeCompare(b.emba_Descripcion), //sorting para Letras
      },
      {
        title: "Acciones",
        key: "operation",
        render: (params) => (
          <div key={params.emba_Id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.emba_Id}`}
                aria-haspopup="true"
                onClick={() => handleSeleccionar(params)}
                variant="contained"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#634A9E",
                  color: "white",
                }}
                startIcon={<Icon>check</Icon>}
              >
                Seleccionar
              </Button>
            </Stack>
          </div>
        ),
      },
    ];

     //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
     const camposToFilterLugarEmbarque = ["key", "emba_Codigo", "emba_Descripcion"];

    //Constante que ayuda a filtrar el datatable
    const filteredRowsLugarEmbarque = dataLugarEmbarque.filter((row) => {
      if (SearchTextLugarEmbarque === "") {
        return true; // Mostrar todas las filas si el buscador está vacío
      }

      for (const [key, value] of Object.entries(row)) {
        if (camposToFilterLugarEmbarque.includes(key)) {
          const formattedValue =
            typeof value === "number"
              ? value.toString()
              : value.toString().toLowerCase();
          const formattedSearchText =
            typeof SearchTextLugarEmbarque === "number"
              ? SearchTextLugarEmbarque.toString()
              : SearchTextLugarEmbarque.toLowerCase();
          if (formattedValue.includes(formattedSearchText)) {
            return true;
          }
        }
      }
      return false;
    });

    const handleSeleccionar = (params) => {
      setLugarEmbarque_DDl(LugarEmbarque_DDl.filter((Lugar) =>Lugar.value === params.emba_Id))
      setValueTab3("LugarEmbarque",LugarEmbarque_DDl.find((Lugar) =>Lugar.value === params.emba_Id),{ shouldValidate: true, shouldTouch: true })
      setTextLugarEmbarque("");
      setSearchTextLugarEmbarque("");
      setdataLugarEmbarque([]);
      DialogLugarEntrega();
    }

    const CerrarDialogLugarEmbarque = () => {
      setTextLugarEmbarque("");
      setSearchTextLugarEmbarque("");
      setdataLugarEmbarque([]);
    }
    //Controlador de la barra buscadora de la tabla
    const handleSearchChangeLugarEmbarque = (event) => {
      setSearchTextLugarEmbarque(event.target.value);
    };

    const EnviarData = async() =>{
      CargarDatosLugarEmbarque(TextLugarEmbarque);
    }

    //Controlador de la barra buscadora de la tabla
    const handleChangeLugarEmbarque = (event) => {
      setTextLugarEmbarque(event.target.value);
    };  

    //Variables oara setear la cantidad de registro que se mostraran en la tabla
    const handleChangeFilasLugarEmbarque = (event) => {
      setfilasLugarEmbarque(event.target.value);
    };

    

  const GuardarTab3 = async () => {
    if(isEditTab3){
      if (isValidTab3) {
        EditarTab3()
      } else {
        ToastWarning("Complete los campos vacios");
      }
    }else{
      if (isValidTab3) {
        InsertarTab3()
      } else {
        ToastWarning("Complete los campos vacios");
      }
    }
  }

   //Controlar el cambio de estado del pago efecutado
   const handleChangePagoEfectuado = (event) => {
    setChecked(event.target.checked);
  };

  //Peticion para crear un registro
  const InsertarTab3 = async () => {
    try {
      const response = await DeclaracionValorServices.InsertarTab3DEVA(datosTab3,Declaracion_Valor_Id,checked);
      if (response.data.data.messageStatus == "1") {
        setisEditTab3(true)
        setval()
        CargarFacturas(Declaracion_Valor_Id);
        ToastSuccess();
        validacion(3)
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        DialogAceptar()
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

   //Peticion para crear un registro
   const EditarTab3 = async () => {
    try {
      const response = await DeclaracionValorServices.EditarTab3DEVA(datosTab3,Declaracion_Valor_Id,checked);
      if (response.data.data.messageStatus == "1") {
        setisEditTab3(true)
        setval()
        CargarFacturas(Declaracion_Valor_Id);
        ToastSuccessEditar();
        validacion(3)
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        DialogAceptar()
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

    //Constantes para los valores de los AutoComplete de la tab 4_1
    const [expandedRowKey, setExpandedRowKey] = useState(null);
    const [dataFacturas, setdataFacturas] = useState([]);
    const [DatosDetalles, setDatosDetalles] = useState([]);
    const [DatosItemsPorFacturaint, setDatosItemsPorFacturaint] = useState([]);
    const [searchTextTableFactuaras, setsearchTextTableFactuaras] = useState("");
    const [filasTableFacturas, setfilasTableFacturas] = React.useState(5);
    const [factura_Id, setfactura_Id] = useState(0);
    const [factura_IdEliminar, setfactura_IdEliminar] = useState(0);
    const [EliminarFactura, setEliminarFactura] = useState(false);
    const [NumeroFactura, setNumeroFactura] = useState(0);
    const [FechaFactura, setFechaFactura] = useState(0);
    const [isEditTab4_1, setisEditTab4_1] = useState(false);
     //Constante para el boton de opciones
     const [anchorElFacturas, setanchorElFacturas] = useState({});

    const DefaultValuesTab4_1 = {
      NumeroFactura: "",
      Fecha: null,
    };
    
    const schemaValuesTab4_1 = yup.object().shape({
      NumeroFactura: yup.string().required("").min(5,"El codigo debe ser de más de 5 numeros"),
      Fecha: yup.date().nullable().required("").max(new Date(),"No puede ingresar fechas futuras").min(new Date(1900, 0 , 1), "Ingrese una fecha mayor a 01/01/1900"),
    });

    const columnsFacturaTable = [  
      {
        title: 'No.',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Factura',
        dataIndex: 'fact_Id',
        key: 'fact_Id',
      },
      {
        title: 'Numero Factura',
        dataIndex: 'fact_Numero',
        key: 'fact_Numero',
      },
      {
        title: 'Factura Fecha',
        dataIndex: 'fact_Fecha',
        key: 'fact_Fecha',
      },
      {
        title: 'Acciones',
        key: 'operation',
        render: (params) =>
          <div key={params.fact_Id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.fact_Id}`}
                aria-haspopup="true"
                onClick={(e) => handleClickFacturas(e, params.fact_Id)}
                variant="contained"
                style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
                startIcon={<Icon>menu</Icon>}
              >
                Opciones
              </Button>
              <Menu
                id={`menu-${params.fact_Id}`}
                anchorEl={anchorElFacturas[params.fact_Id]}
                keepMounted
                open={Boolean(anchorElFacturas[params.fact_Id])}
                onClose={() => handleCloseFacturas(params.fact_Id)}
              >
                <MenuItem onClick={() => handleAgregarItems(params)}>
                  <Icon>add</Icon>ㅤAgregar Items
                </MenuItem>
                <MenuItem onClick={() => handleEditarFacturas(params)}>
                  <Icon>edit</Icon>ㅤEditar Facturas
                </MenuItem>
                <MenuItem onClick={() => handleDeleteFactura(params)}>
                  <Icon>delete</Icon>ㅤEliminar
                </MenuItem>

              </Menu>
            </Stack>
          </div>
        ,
      },
    ];

    const camposToFilterFacturas = ["key", "fact_Id","fact_Numero", "fact_Fecha"];
    
    const DialogEliminarFactura = () => {
      setEliminarFactura(!EliminarFactura);
    }

    const AccionEliminarFactura = async() => {
      try {
        const response = await DeclaracionValorServices.EliminarFacturas(factura_IdEliminar)
        if(response.data.data.messageStatus === "1"){
          CargarFacturas(Declaracion_Valor_Id);
          ToastSuccessPersonalizado("Factura eliminada exitosamente")
          DialogEliminarFactura();
        }
      }catch(error){

      }
    }

    //Constante cuando se hace click para el boton de opciones
    const handleClickFacturas = (event, id) => {
      setanchorElFacturas((prevState) => ({
        ...prevState,
        [id]: event.currentTarget,
      }));
    };

    //Constante para el cerrrar las opciones del boton de opciones  
    const handleCloseFacturas = (id) => {
      setanchorElFacturas((prevState) => ({
        ...prevState,
        [id]: null,
      }));
    };


      const handleAgregarItems = (data) => {
        setmostrarAddH(false)
        setmostrarDetalles(true)
        setfactura_Id(data.fact_Id);
        CargarItems(data.fact_Id);   
      handleCloseFacturas(data.fact_Id)
    }


      const handleEditarFacturas = (data) => {        
          setfactura_Id(data.fact_Id);
          setNumeroFactura(data.fact_Numero);
          setFechaFactura(data.fact_Fecha)
          setisEditTab4_1(true);
          setValueTab4_1("NumeroFactura",data.fact_Numero,{shouldValidate:true, shouldTouch:true})
          setValueTab4_1("Fecha",data.fact_Fecha,{shouldValidate:true, shouldTouch:true})
        handleCloseFacturas(data.fact_Id)
      }

      const handleDeleteFactura = (data) => {
        setfactura_IdEliminar(data.fact_Id)
        DialogEliminarFactura();
        handleCloseFacturas(data.fact_Id)
      }
  

  
  //Constante UseForm para tabulacion 4_1
    const { handleSubmit: handleSubmitTab4_1, reset: resetTab4_1, control: controlTab4_1, formState: formStateTab4_1, watch: watchTab4_1, setValue:setValueTab4_1 } = useForm({
      defaultValues:DefaultValuesTab4_1,
      mode: "all",
      resolver: yupResolver(schemaValuesTab4_1),
    });

    const { isValid: isValidTab4_1, dirtyFields: idirtyFieldsTab4_1, errors: errorsTab4_1 } = formStateTab4_1;
    const datosTab4_1 = watchTab4_1()

    const setval = () => {
      setValueTab4_2("NumeroItem","1")
      setValueTab4_2("Cantidad","0")
      setValueTab4_2("ValorUnitario","0")
      setValueTab4_2("TotalUnitario","0")
    }

    const GuardarTab4_1 = async () => {
      if(isEditTab4_1){
        if(isValidTab4_1){
          if((NumeroFactura === datosTab4_1.NumeroFactura) && (FechaFactura === datosTab4_1.Fecha)){
            setisEditTab4_1(false);                 
            resetTab4_1(DefaultValuesTab4_1)
            ToastSuccessEditar()
          }else{
            EditarTab4_1()   
          }
        }else{
          ToastWarningPersonalizado("Complete los campos si desea editar una factura para esta declaracion de valor");
        }
      }else{
        if(isValidTab4_1){
          InsertarTab4_1()       
        }else{
          ToastWarningPersonalizado("Complete los campos si desea agregar una nueva factura");
        }
      }
    }

    useEffect(() => {
      CargarFacturas();
    }, []);


    const InsertarTab4_1 = async() => {
      try {
        const responseVerficar = await DeclaracionValorServices.VerficarFacturaPorFact_Numero(datosTab4_1.NumeroFactura);
        if(responseVerficar.data.data.messageStatus === "1"){
          ToastWarningPersonalizado("Ya existe una factura con este codigo")
        }else{
          const response = await DeclaracionValorServices.InsertarFacturasPorDevaId(Declaracion_Valor_Id,datosTab4_1);
            if (response.data.data.messageStatus != "0") {
              setfactura_Id(parseInt(response.data.data.messageStatus))
              CargarFacturas(Declaracion_Valor_Id)
              ToastSuccess();
              resetTab4_1(DefaultValuesTab4_1);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
              DialogAceptar()
              ToastWarningYaExiste();
            }
        }  
      } catch (error) {
        ToastError("Error inesperado");
      }
    }

    const EditarTab4_1 = async() => {
      try {
        const response = await DeclaracionValorServices.EditarFacturas(factura_Id,Declaracion_Valor_Id,datosTab4_1);
            if (response.data.data.messageStatus == "1") {
              CargarFacturas(Declaracion_Valor_Id)
              ToastSuccessEditar();
              setisEditTab4_1(false);                 
              resetTab4_1(DefaultValuesTab4_1)
            } else if (response.data.data.messageStatus == "1") {
              ToastWarningPersonalizado("Ya existe una factura con este codigo")
            }else{
              ToastWarningYaExiste();
            }
        }catch(error){
          
        }
  }

    //Constantes que ayuda a filtrar el datatable
    const filteredRowsTableFacturaExt = dataFacturas.filter((row) => {
      if (searchTextTableFactuaras === "") {
        return true; // Mostrar todas las filas si el buscador está vacío
      }

      for (const [key, value] of Object.entries(row)) {
        if (camposToFilterFacturas.includes(key)) {
          const formattedValue =
            typeof value === "number"
              ? value.toString()
              : value.toString().toLowerCase();
          const formattedSearchText =
            typeof searchTextTableFactuaras === "number"
              ? searchTextTableFactuaras.toString()
              : searchTextTableFactuaras.toLowerCase();
          if (formattedValue.includes(formattedSearchText)) {
            return true;
          }
        }
      }
      return false;
    }); 
        

    const CargarFacturas  = async(Declaracion_Valor_Id) => {
      try{
        setdataFacturas(await DeclaracionValorServices.ListarFacturasPorDevaId(Declaracion_Valor_Id))
      }catch(error){
      }
    }

    const handleSearchChangeTableFacturas = (event) => {
      setsearchTextTableFactuaras(event.target.value);
    }

     //Variables oara setear la cantidad de registro que se mostraran en la tabla
     const handleChangeFilasTableFacturas = (event) => {
      setfilasTableFacturas(event.target.value);
    };


    const ListarItemsPorFacturaId = async (fact_Id) => {
      try {
        setDatosDetalles(await DeclaracionValorServices.ListarItemsPorFacturaId(fact_Id))
      } catch (error) {
        
      }
    };

    const CargarItemsTableItems = async(factura_Id) => {
      try{
        setDatosItemsPorFacturaint(await DeclaracionValorServices.ListarItemsPorFacturaId(factura_Id))
      }catch (error) {
        
      }
    }

    const PasarTab4 = async() => {
      if(dataFacturas.length <= 0){
        ToastWarningPersonalizado("Debe haber más de alguna factura para poder continuar")
      }else{    
        let estadoFacturaItems = true;
        const itemsXD = []        
        for(let i = 0; i < dataFacturas.length ; i++){      
          itemsXD.push(DeclaracionValorServices.ListarItemsPorFacturaId(dataFacturas[i].fact_Id))           
             if((await Promise.all(itemsXD))[i].length === 0){            
               estadoFacturaItems = false;
             }            
        }
       
        if(estadoFacturaItems){
          ToastSuccess();
          validacion(4);
        }else{
          ToastWarningPersonalizado("Debe haber al menos un item en cada factura para poder seguir con su declaración de valor");
        }
       
      }
    }
     

    //Se utiliza para hacer el llamado de los detalles de la tabla maestra
    //valida si hay registros abiertos
    const expandableConfig = {
      columnTitle: "Desplegar detalle",
      expandedRowKeys: [expandedRowKey],
      expandedRowRender: (record) => (
        <Table
          columns={columnsExpandable}
          dataSource={DatosDetalles}
          size="small"
          pagination={{
            pageSize: filas,
            showSizeChanger: false,
            className: 'custom-pagination'
          }}
        />
      ),
      rowExpandable: (record) => record.name !== "Not Expandable",
      onExpand: async (expanded, record) => {
        if (expanded) {
          await ListarItemsPorFacturaId(record.fact_Id);
          setExpandedRowKey(record.key);
        } else {
          setExpandedRowKey(null);
        }
      },
    };

    //Constantes para los campos de la Tabla Maestra
    const columnsExpandable = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        sorter: (a, b) => a.code_Id - b.code_Id, //sorting para Numeros
      },
      {
        title: 'Id del item',
        dataIndex: 'item_Id',
        key: 'item_Id',
        sorter: (a, b) => a.item_Id.localeCompare(b.item_Id), //sorting para Letras
      },
      {
        title: 'Cantidad',
        dataIndex: 'item_Cantidad',
        key: 'item_Cantidad',
        sorter: (a, b) => a.item_Cantidad.localeCompare(b.item_Cantidad), //sorting para Letras
      },
      {
        title: 'Precio Unitario',
        dataIndex: 'item_ValorUnitario',
        key: 'item_ValorUnitario',
        sorter: (a, b) => a.item_ValorUnitario.localeCompare(b.item_ValorUnitario), //sorting para Letras
      },
      {
        title: 'Total ',
        dataIndex: 'item_TotalFacturaUnitario',
        key: 'item_TotalFacturaUnitario',
        sorter: (a, b) => a.item_TotalFacturaUnitario.localeCompare(b.item_TotalFacturaUnitario), //sorting para Letras
      }
    ];


     //Constantes para los valores de los AutoComplete de la tab 4_2
     const [Item_Id, setItem_Id] = useState(1) 
     const [CalculoTotal, setCalculoTotal] = useState(0)
     const [FilasItems, setFilasItems] = React.useState(5);
     const [searchItems, setsearchItems] = useState("");
     const [anchorElTableItems, setanchorElTableItems] = useState({});
     const [dataItems, setdataItems] = useState([])
     const [EliminarItem, setEliminarItem] = useState(false);
     const [isEdit, setisEdit] = useState(false)

     const [mostrarAddH, setmostrarAddH] = useState(true);
     const [mostrarDetalles, setmostrarDetalles] = useState(false);
     const collapseRef = useRef(null);

     const [UnidadMedia_DDL, setUnidadMedia_DDL] = useState([]);
     const [EstadosMercancia_DDL, setEstadosMercancia_DDL] = useState([]);
     const [OrigenMercacia_DDL, setOrigenMercacia_DDL] = useState([]);

     const [ArancelesDialog, setArancelesDialog] = useState(false);
     const [SearchTextAranceles,setSearchTextAranceles] = useState("");
     const [filasAranceles, setfilasAranceles] = React.useState(10);
     const [dataAranceles, setdataAranceles] = useState([]);
     const [TextAranceles,setTextAranceles] = useState("");

     const [Aranceles_DDl, setLAranceles_DDl] = useState([]);
     const [checkedAuto, setcheckedAuto] = useState(false);
     const [checkedCambbioAranceles, setcheckedCambbioAranceles] = useState(true);
     const [checkAutoHibrido, setcheckAutoHibrido] =useState(false);
     const [checkAutoEsNuevo, setcheckAutoEsNuevo] =useState(false);
     const [cantidadDisabed, setcantidadDisabed] = useState(true);
     const [checkedAlcohol, setcheckedAlcohol] = useState(false);
     const [checkedCigarros, setcheckedCigarros] = useState(false);

    const DefaultValuesTab4_2 = {
      NumeroItem: "",
      Cantidad: "",
      UnidadMedida: null,
      IdentificacionComercial: "",
      CaracteristicasMercadedira: "",
      Marca: "",
      ModeloEstilo: "",
      EstadoMercaderia: "",
      OrigenMecaderia: "",
      ClasificacionArancelaria: null,
      ValorUnitario: "",
      TotalUnitario: "",
      LitrosTotales: "",
      CigarrosTotales:""
    };

    const schemaValuesTab4_2 = yup.object().shape({
      NumeroItem: yup.string().required(),
      Cantidad: yup.string().required().nullable().matches(/^\d+(.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales").test("masiso2","La cantidad debe ser mayor a 0",function(value){
        return parseFloat(value) > 0;
      }),
      UnidadMedida: yup.object().required(),
      IdentificacionComercial: yup.string().required(),
      CaracteristicasMercadedira: yup.string().required(),
      Marca: yup.string().required(),
      ModeloEstilo: yup.string().required(),
      EstadoMercaderia: yup.object().required(),
      OrigenMecaderia: yup.object().required(),
      ClasificacionArancelaria: yup.object().required(),
      ValorUnitario: yup.string().required().nullable().matches(/^\d+(.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales").test("masiso","El valor unitario debe ser mayor a 0",function(value){
          return parseFloat(value) > 0;
      }),
      TotalUnitario: yup.string().required(),
      LitrosTotales: checkedAlcohol ? yup.string().required().matches(/^\d+(.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales").test("masiso","El valor unitario debe ser mayor a 0",function(value){
        return parseFloat(value) > 0;
      }) : yup.string(),
      CigarrosTotales : checkedCigarros ? yup.string().required().matches(/^\d+(.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales").test("masiso","El valor unitario debe ser mayor a 0",function(value){
        return parseFloat(value) > 0;
      }) : yup.string()
    });


     //Constante UseForm para tabulacion 4_2
    const { handleSubmit: handleSubmitTab4_2, reset: resetTab4_2, control: controlTab4_2, formState: formStateTab4_2, watch: watchTab4_2, setValue:setValueTab4_2 } = useForm({
      defaultValues:DefaultValuesTab4_2,
      mode: "all",
      resolver: yupResolver(schemaValuesTab4_2),
    });

    const { isValid: isValidTab4_2, dirtyFields: dirtyFieldsTab4_2, errors: errorsTab4_2 } = formStateTab4_2;
    const datosTab4_2 = watchTab4_2()

    const DialogClasificacionAranceles = () => {
      setArancelesDialog(!ArancelesDialog);
    }

    const CerrarDialogAranceles = () => {
      setSearchTextAranceles("");
      setTextAranceles("");
      setdataAranceles([]);
    }

      //Controlador de la barra buscadora de la tabla
      const handleSearchChangeAranceles = (event) => {
        setSearchTextAranceles(event.target.value);
      };

    
    //Controlador de la barra buscadora de la tabla
    const handleChangeAranceles = (event) => {
      setTextAranceles(event.target.value);
    };  

    //Variables oara setear la cantidad de registro que se mostraran en la tabla
    const handleChangeFilasAranceles = (event) => {
      setfilasAranceles(event.target.value);
    };

  const CargarDatosAranceles= async(code) => {
      if(code === ""){
        setdataAranceles([]);
        setLAranceles_DDl([]);
      }else{
        setdataAranceles(await ArancelSeraravices.ListarArancelesBycode(code));
        setLAranceles_DDl(await ArancelSeraravices.ListarArancelesBycodeAll(code));
      }
    }

    const EnviarDataAranceles = async() =>{
      CargarDatosAranceles(TextAranceles);
    }

    
    //Constantes para las columnas de la busqueda de la tabla
    const columnsAranceles = [
      {
        title: "No.",
        dataIndex: "key",
        key: "key",
        sorter: (a, b) => a.key - b.key, //sorting para Numeros
      },
      {
        title: "Código Aranceles",
        dataIndex: "aran_Codigo",
        key: "aran_Codigo",
        sorter: (a, b) => a.aran_Codigo.localeCompare(b.aran_Codigo), //sorting para Letras
      },
      {
        title: "Descripción del arancel",
        dataIndex: "aran_Descripcion",
        key: "aran_Descripcion",
        sorter: (a, b) => a.aran_Descripcion.localeCompare(b.aran_Descripcion), //sorting para Letras
      },
      {
        title: "¿Es vehiculo?",
        dataIndex: "aran_ArancelVehicular",
        key: "aran_ArancelVehicular",
        sorter: (a, b) => a.aran_ArancelVehicular.localeCompare(b.aran_ArancelVehicular), //sorting para Letras
      },
      {
        title: "Acciones",
        key: "operation",
        render: (params) => (
          <div key={params.aran_Id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.aran_Id}`}
                aria-haspopup="true"
                onClick={() => handleSeleccionarAranceles(params)}
                variant="contained"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#634A9E",
                  color: "white",
                }}
                startIcon={<Icon>check</Icon>}
              >
                Seleccionar
              </Button>
            </Stack>
          </div>
        ),
      },
    ];

    //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
    const camposToFilterAranceles = ["key", "aran_Codigo", "aran_Descripcion","aran_ArancelVehicular"];

    const handleSeleccionarAranceles = (params) => {
      setcheckedCambbioAranceles(false);
      const data = Aranceles_DDl.filter((item,index)=>{
        if(item.aran_Codigo === params.aran_Codigo)
          return{
            aran_Id: item.aran_Id,
            aran_Codigo: item.aran_Codigo,
            aran_Descripcion: item.aran_Descripcion,  
            aran_ArancelVehicular: item.aran_ArancelVehicular ? 'Si' : 'No',
            aran_ProdCons: item.aran_ProdCons  
        }
      })
      console.log(data)
      const ArancelNuevo = {
        value: params.aran_Id,
        label: params.aran_Codigo +'-'+ params.aran_Descripcion
      }

      if(params.aran_ArancelVehicular == "Si"){
        Limpiar()
        setcheckedCigarros(false);
        setcheckedAuto(true);
        setValueTab4_2("Cantidad",1,{ shouldValidate: true, shouldTouch: true });
        setcantidadDisabed(true);
      }else{
        setValueTab4_2("Cantidad","0");
        setcantidadDisabed(false);
        setcheckedAuto(false);      
        if(data[0].aran_ProdCons > 0 && data[0].aran_Codigo != '2402.20.00.00'){
          setcheckedAlcohol(true);
          Limpiar()
        }
        else if(data[0].aran_ProdCons > 0 && data[0].aran_Codigo == '2402.20.00.00'){
          setcheckedCigarros(true);
          Limpiar()
        }
        else{
          setcantidadDisabed(false);
          setcheckedAuto(false); 
          setcheckedAlcohol(false);
           setcheckedCigarros(false);
           setValueTab4_2("CigarrosTotales","",{ shouldValidate: true, shouldTouch: true })
           setValueTab4_2("LitrosTotales","",{ shouldValidate: true, shouldTouch: true })
        }
      }

      setValueTab4_2("ClasificacionArancelaria",ArancelNuevo,{ shouldValidate: true, shouldTouch: true })
      setTextAranceles("");
      setSearchTextAranceles("");
      setdataAranceles([]);
      DialogClasificacionAranceles();
    }

    const Limpiar = () =>{
      setValueTab4_2("Cantidad","0",{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("UnidadMedida",null,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("IdentificacionComercial","",{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("CaracteristicasMercadedira","",{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("Marca","",{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("ModeloEstilo","",{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("OrigenMecaderia",null,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("EstadoMercaderia",null,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("ValorUnitario","0",{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("TotalUnitario","0",{ shouldValidate: true, shouldTouch: true }) 
      setValueTab4_2("LitrosTotales","0",{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("CigarrosTotales","0",{ shouldValidate: true, shouldTouch: true }) 
      setcheckAutoEsNuevo(false);
      setcheckAutoHibrido(false);
    }


    //Constante que ayuda a filtrar el datatable
    const filteredRowsAranceles = dataAranceles.filter((row) => {
      if (SearchTextAranceles === "") {
        return true; // Mostrar todas las filas si el buscador está vacío
      }

      for (const [key, value] of Object.entries(row)) {
        if (camposToFilterAranceles.includes(key)) {
          const formattedValue =
            typeof value === "number"
              ? value.toString()
              : value.toString().toLowerCase();
          const formattedSearchText =
            typeof SearchTextAranceles === "number"
              ? SearchTextAranceles.toString()
              : SearchTextAranceles.toLowerCase();
          if (formattedValue.includes(formattedSearchText)) {
            return true;
          }
        }
      }
      return false;
    });


    const handleChangeFilasItems = (event) => {
      setFilasItems(event.target.value)
    }

    const handleSearchChangeItems = (event) => {
      setsearchItems(event.target.value)
    }

    const DialogEliminarItem = () => {
      setEliminarItem(!EliminarItem);
    };

      //Constante para cargar datos a las tablas0.
    const AccionEliminarItem = async () => {
      try {
          const response = (await DeclaracionValorServices.EliminarItems(Item_Id))
          if(response.data.data.messageStatus === "1"){
            CargarItems(factura_Id);
            DialogEliminarItem();
            ToastSuccessPersonalizado("Item eliminado exitosamente")
          }else{
            ToastError();
          }
      } catch (error) {
        
      }
    };

    const FinalizarItems = () => {
      setisEdit(false);
      setmostrarAddH(true)
      setcantidadDisabed(true);
      setcheckedCambbioAranceles(true);
      setmostrarDetalles(false)
      resetTab4_2(DefaultValuesTab4_2)
    }

    //useEffect para la multiplicacio del input de TotalUnit
    useEffect(() => {
      const multiplicacion = parseFloat(datosTab4_2.Cantidad || 0) * parseFloat(datosTab4_2.ValorUnitario || 0);
      setValueTab4_2('TotalUnitario', multiplicacion);
    }, [datosTab4_2.Cantidad,datosTab4_2.ValorUnitario]);

     //Controlar el cambio de estado del pago efecutado
   const handleChangeEsAuto = (event) => {
    setcheckedAuto(event.target.checked);
  };


    const GuardarTab4_2 = async() => {
      if(checkedCambbioAranceles){
        ToastWarningPersonalizado("Debe escoger una clasificación arancelaria");
        setValueTab4_2("ClasificacionArancelaria",null,{ shouldValidate: true, shouldTouch: true })
      }else{
        if(isEdit){
          if(isValidTab4_2){
            EditarTab4_2()       
          }else{
            ToastWarning();
          }
        }else{
          if(isValidTab4_2){
            InsertarTab4_2()       
          }else{
            ToastWarning();
          }
        }
      } 
    }

    const InsertarTab4_2 = async() => {
      try {
        const response = await DeclaracionValorServices.InsertarItemsPorFactsId(factura_Id,datosTab4_2,checkAutoEsNuevo,checkAutoHibrido,checkedCigarros,checkedAlcohol);
        if (response.data.data.messageStatus == "1") {
          CargarItems(factura_Id)
          resetTab4_2(DefaultValuesTab4_2)
          setValueTab4_2("NumeroItem",(parseInt(datosTab4_2.NumeroItem) + 1).toString())

          setcheckedCambbioAranceles(true);
          setcantidadDisabed(true);

          setcheckAutoHibrido(false);
          setcheckedCigarros(false);
          setcheckedAlcohol(false);
          setcheckedAuto(false);

          ToastSuccess();
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    }

      const EditarTab4_2 = async() => {
        try {
          const response = await DeclaracionValorServices.EditarItems(Item_Id,factura_Id,datosTab4_2,checkAutoEsNuevo,checkAutoHibrido,checkedCigarros,checkedAlcohol);
          if (response.data.data.messageStatus == "1") {
            CargarItems(factura_Id)
            resetTab4_2(DefaultValuesTab4_2)
            setValueTab4_2("NumeroItem",(parseInt(datosTab4_2.NumeroItem) + 1).toString())
             setcheckedAuto(false);
            setcheckAutoHibrido(false);
            setcheckedCambbioAranceles(true);
            setcantidadDisabed(true);
            setcheckedCigarros(false);
            setcheckedAlcohol(false);
            setisEdit(false);
            ToastSuccessEditar();
          } else if (response.data.data.messageStatus.includes("UNIQUE")) {
            ToastWarningYaExiste();
          }
        } catch (error) {
          ToastError("Error inesperado");
        }
      }

    const CargarItems = async(factura_Id) => {
      try{
        const data = await DeclaracionValorServices.ListarItemsPorFacturaId(factura_Id)
        setdataItems(data)
        if(data.length > 0){
            setValueTab4_2("NumeroItem",(parseInt(data.length) + 1).toString())
            setValueTab4_2("Cantidad","0")
            setValueTab4_2("ValorUnitario","0")
            setValueTab4_2("TotalUnitario","0")
          }else{
            setval();
          }
      } catch (error) {
        
      }
    }

    
    const camposToFilterTableItems = [
      "key",
      "item_Id",
      "item_Cantidad",
      "item_ValorUnitario",
      "item_TotalFacturaUnitario",
    ];

     //Constante que ayuda a filtrar el datatable
  const filteredRowsTableItems = dataItems.filter((row) => {
    if (searchItems === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilterTableItems.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchItems === "number"
            ? searchItems.toString()
            : searchItems.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });
  
    const columnsTableItems = [
      {
        title: 'No.',
        dataIndex: 'key',
        key: 'key',
        sorter: (a, b) => a.key - b.key, //sorting para Numeros
      },
      {
        title: 'Id del item',
        dataIndex: 'item_Id',
        key: 'item_Id',
        sorter: (a, b) => a.item_Id.localeCompare(b.item_Id), //sorting para Letras
      },
      {
        title: 'Cantidad',
        dataIndex: 'item_Cantidad',
        key: 'item_Cantidad',
        sorter: (a, b) => a.item_Cantidad.localeCompare(b.item_Cantidad), //sorting para Letras
      },
      {
        title: 'Precio Unitario',
        dataIndex: 'item_ValorUnitario',
        key: 'item_ValorUnitario',
        sorter: (a, b) => a.item_ValorUnitario.localeCompare(b.item_ValorUnitario), //sorting para Letras
      },
      {
        title: 'Total ',
        dataIndex: 'item_TotalFacturaUnitario',
        key: 'item_TotalFacturaUnitario',
        sorter: (a, b) => a.item_TotalFacturaUnitario.localeCompare(b.item_TotalFacturaUnitario), //sorting para Letras
      },
      {
        title: 'Acciones',
        key: 'operation',
        render: (params) =>
          <div key={params.item_Id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.item_Id}`}
                aria-haspopup="true"
                onClick={(e) => handleClickTableItems(e, params.item_Id)}
                variant="contained"
                style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
                startIcon={<Icon>menu</Icon>}
              >
                Opciones
              </Button>
              <Menu
                id={`menu-${params.item_Id}`}
                anchorEl={anchorElTableItems[params.item_Id]}
                keepMounted
                open={Boolean(anchorElTableItems[params.item_Id])}
                onClose={() => handleCloseTableItems(params.item_Id)}
              >
                <MenuItem onClick={() => handleEditTableItems(params)}>
                  <Icon>edit</Icon>ㅤEditar
                </MenuItem>            
                <MenuItem onClick={() => handleDeleteTableItems(params)}>
                  <Icon>delete</Icon>ㅤEliminar
                </MenuItem>
  
              </Menu>
            </Stack>
          </div>
        ,
      },
    ];

    const handleClickTableItems = (event, id) => {
      setanchorElTableItems(prevState => ({
        ...prevState,
        [id]: event.currentTarget,
      }));
    };
  
    const handleCloseTableItems = (id) => {
      setanchorElTableItems(prevState => ({
        ...prevState,
        [id]: null,
      }));
    };

    const handleEditTableItems = async(data1) => {
      setcheckedCambbioAranceles(false);
      setisEdit(true);
      const {data, ArancelCompleto} = await ArancelSeraravices.ListarArancelesById(data1.aran_Id);
      console.log(ArancelCompleto);

      if(ArancelCompleto[0].aran_ArancelVehicular == "Si"){
        setcheckedAlcohol(false);
        setcheckedCigarros(false);
        setcheckedAuto(true);
        setcantidadDisabed(true);
        if(data1.item_EsNuevo){
          setcheckAutoEsNuevo(true);
        }else{
          setcheckAutoEsNuevo(false);
        }
          
        if(data1.item_EsHibrido){
          setcheckAutoHibrido(true);
        }else{
          setcheckAutoHibrido(false);
        }
          
      }
      else if(ArancelCompleto[0].aran_Codigo == "2402.20.00.00" && ArancelCompleto[0].aran_ProdCons > 0 ){
        setcheckedAlcohol(false);
        setcheckedAuto(false);
        setcheckedCigarros(true);
        setValueTab4_2("CigarrosTotales",data1.item_CigarrosTotales,{ shouldValidate: true, shouldTouch: true })
      }else if(ArancelCompleto[0].aran_Codigo != "2402.20.00.00" && ArancelCompleto[0].aran_ProdCons > 0 ){
        setcheckedAlcohol(true);
        setcheckedCigarros(false);
        setcheckedAuto(false);
        setValueTab4_2("LitrosTotales",data1.item_LitrosTotales,{ shouldValidate: true, shouldTouch: true })
      }else{
        setcheckedCigarros(false);
        setcheckedAlcohol(false);
        setcheckedAuto(false);
      }
      setItem_Id(data1.item_Id);
      setValueTab4_2("NumeroItem",data1.key,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("Cantidad",data1.item_Cantidad,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("UnidadMedida",UnidadMedia_DDL.find((unidad)=> unidad.value === data1.unme_Id),{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("IdentificacionComercial",data1.item_IdentificacionComercialMercancias,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("CaracteristicasMercadedira",data1.item_CaracteristicasMercancias,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("Marca",data1.item_Marca,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("ModeloEstilo",data1.item_Modelo,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("OrigenMecaderia",OrigenMercacia_DDL.find((Origen)=> Origen.value === data1.pais_IdOrigenMercancia),{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("EstadoMercaderia",EstadosMercancia_DDL.find((estado)=> estado.value === data1.merc_Id),{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("ClasificacionArancelaria",data[0],{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("ValorUnitario",data1.item_ValorUnitario,{ shouldValidate: true, shouldTouch: true })
      setValueTab4_2("TotalUnitario",data1.item_TotalFacturaUnitario,{ shouldValidate: true, shouldTouch: true })  
      handleCloseTableItems(data1.item_Id);
    };

    const CargarClasificacionArancelaria  = async(id) => {
      try{
        const response = await ArancelSeraravices.ListarArancelesById(id)
        
        return response
      }catch (error){

      }
    }
  
    const handleDeleteTableItems = (data) => {
      DialogEliminarItem();
      setItem_Id(data.item_Id)
      handleCloseTableItems(data.item_Id);
    };



    //Tabulacion 5
    const [Campo24, setCampo24] = useState(false);
    const [Campo25, setCampo25] = useState(false);
    const [Campo27, setCampo27] = useState(false);
    const [Campo28, setCampo28] = useState(false);
    const [Campo29, setCampo29] = useState(false);
    const [isEditTab5, setisEditTab5] = useState(false);
    const [condicion_Id, setcondicion_Id] = useState(0);

    const DefaultValuesTab5 = {
      campo24: null,
      campo24_1: "",
      campo25: null,
      campo25_1: "",
      campo26: null,
      campo27: null,
      campo27_1: "",
      campo27_2: "",
      campo28: null,
      campo28_1: "",
      campo29: null,
      campo29_1: "",
    };

    const schemaValuesTab5 = yup.object().shape({
      campo24: yup.string("").required(),
      campo24_1: Campo24 ? yup.string().required("") : yup.string(),
      campo25: yup.string("").required(),
      campo25_1: Campo25 ?  yup.string().required("")  : yup.string(),
      campo26: yup.string("").required(),
      campo27: yup.string("").required(),
      campo27_1: Campo27 ?  yup.string().required("") : yup.string(),
      campo27_2: Campo27 ?  yup.string().required("") : yup.string(),
      campo28: yup.string("").required(),
      campo28_1: Campo28 ?  yup.string().required("") : yup.string(),
      campo29: yup.string("").required(),
      campo29_1: Campo29 ? yup.string().required("") : yup.string(),
    });

     //Constante UseForm para tabulacion 4_2
     const { handleSubmit: handleSubmitTab5, reset: resetTab5, control: controlTab5, formState: formStateTab5, watch: watchTab5, setValue:setValueTab5 } = useForm({
      defaultValues :DefaultValuesTab5,
      mode: "all",
      resolver: yupResolver(schemaValuesTab5),
    });

    const { isValid: isValidTab5, dirtyFields: dirtyFieldsTab5, errors: errorsTab5 } = formStateTab5;
    const datosTab5 = watchTab5()

    const GuardarTab5 = async() => {
     if(Campo24 || Campo25 || Campo27 || Campo28 || Campo29){
        let isValidaEstados = true; 
        if(datosTab5.campo24 != null && datosTab5.campo25  != null  && datosTab5.campo27  != null  && datosTab5.campo28  != null  && datosTab5.campo29  != null ){
          if((datosTab5.campo24 == "True")){
            if(datosTab5.campo24_1 == ""){
              isValidaEstados = false;
            }
          }
          if((datosTab5.campo25 == "True")){
            if(datosTab5.campo25_1 == ""){
              isValidaEstados = false;
            }
          }
          if(datosTab5.campo27 == "True") {
            if(datosTab5.campo27_1 == "" || (datosTab5.campo27_2 == "")){
              isValidaEstados = false;
            }
          }
          if(datosTab5.campo28 == "True") {
            if(datosTab5.campo28_1 == "" ){
              isValidaEstados = false;
            }
          }
          if(datosTab5.campo29 == "True"){
            if(datosTab5.campo29_1 == "" ){
              isValidaEstados = false;
            }
          }
          
          if(isValidaEstados){
            if(isEditTab5){
              EditarTab5()
            }else{
              InsertarTab5()
            }
          }else{
            ToastWarning();
          }
        }else{
          isValidaEstados = false;
          ToastWarning();
        }   
     }else{
       if(datosTab5.campo24 != null && datosTab5.campo25  != null  && datosTab5.campo27  != null  && datosTab5.campo28  != null  && datosTab5.campo29  != null ){
          if(isEditTab5){
            EditarTab5()
          }else{
            InsertarTab5()
          }
        }else{
          ToastWarning();
        }
    }
    }

    const InsertarTab5 = async() => {
      try {
        const response = await DeclaracionValorServices.InsertarCondicionesPorDevaId(Declaracion_Valor_Id,datosTab5);
        if (response.data.data.messageStatus != "0") {
          setcondicion_Id(parseInt(response.data.data.messageStatus));
          setisEditTab5(true);
          ToastSuccess();
          validacion(5);
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    }

    const EditarTab5 = async() => {
      try {
        const response = await DeclaracionValorServices.EditarCondicionesPorDevaId(Declaracion_Valor_Id,condicion_Id,datosTab5);
        if (response.data.data.messageStatus == "1") {
          setisEditTab5(true);
          ToastSuccessEditar();
          validacion(5);
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    }

    useEffect(() => {
      // Si el valor de campo24 es "True", habilita el campo24_1.
      if (datosTab5.campo24 === "True") {
         setCampo24(true)
      } else if (datosTab5.campo24 === "False") {
        setCampo24(false)
        setValueTab5("campo24_1","",{shouldValidate: true,shouldTouch:true})
      }
  }, [datosTab5.campo24]);

   useEffect(() => {
      // Si el valor de campo24 es "True", habilita el campo24_1.
      if (datosTab5.campo25 === "True") {
        setCampo25(true)
      } else if (datosTab5.campo25 === "False") {
        setCampo25(false)
        setValueTab5("campo25_1","",{shouldValidate: true,shouldTouch:true})
      }
  }, [datosTab5.campo25]);

  
   useEffect(() => {
      if (datosTab5.campo27 === "True") {
        setCampo27(true)
      } else if (datosTab5.campo27 === "False") {
        setCampo27(false)
        setValueTab5("campo27_1","",{shouldValidate: true,shouldTouch:true})
        setValueTab5("campo27_2","",{shouldValidate: true,shouldTouch:true})
      }
  }, [datosTab5.campo27]);

  useEffect(() => {
        if (datosTab5.campo28 === "True") {
          setCampo28(true)
        } else if (datosTab5.campo28 === "False") {
          setCampo28(false)
          setValueTab5("campo28_1","")
        }
    }, [datosTab5.campo28]);

    useEffect(() => {
        // Si el valor de campo24 es "True", habilita el campo24_1.
        if (datosTab5.campo29 === "True") {
          setCampo29(true)
        } else if (datosTab5.campo29 === "False") {
          setCampo29(false)
          setValueTab5("campo29_1","",{shouldValidate: true,shouldTouch:true})
          setValueTab5("campo29_1","",{shouldValidate: true,shouldTouch:true})
        }
    }, [datosTab5.campo29]);

    //Tabulacion 6
    const [base_Id, setbase_Id] = useState(0);
    const [isEditTab6, setisEditTab6] = useState(false);

    const DefaultValuesTab6 = {
      campo39:    "",
      campo40:    "",
      campo41:    "",
      campo42_1:  "",
      campo42_2:  "",
      campo42_3:  "",
      campo42_4:  "",
      campo42_5:  "",
      campo42_6:  "",
      campo42_7:  "",
      campo42_8:  "",
      campo42_9:  "",
      campo42_10:  "",
      campo42_11:  "",
      campo42_12:  "",
      campo43:     "",
      campo44_1:  "",
      campo44_2:  "",
      campo44_3:  "",
      campo44_4:  "",
      campo44_5:  "",
      campo45:    "",
      campo46:    "",
    };

    const schemaValuesTab6 = yup.object().shape({
      campo39: yup.string().required(),
      campo40: yup.string().required(),
      campo41: yup.string().required(),
      campo42_1:yup.string().required(),
      campo42_2:yup.string().required(),
      campo42_3:yup.string().required(),
      campo42_4:yup.string().required(),
      campo42_5:yup.string().required(),
      campo42_6:yup.string().required(),
      campo42_7:yup.string().required(),
      campo42_8:yup.string().required(),
      campo42_9:yup.string().required(),
      campo42_10:yup.string().required(),
      campo42_11:yup.string().required(),
      campo42_12:yup.string().required(),
      campo43:yup.string().required(),  
      campo44_1:yup.string().required(),
      campo44_2:yup.string().required(),
      campo44_3:yup.string().required(),
      campo44_4:yup.string().required(),
      campo44_5:yup.string().required(),
      campo45: yup.string().required(), 
      campo46: yup.string().required(), 
    });
    
    //Constante UseForm para tabulacion 4_2
    const { handleSubmit: handleSubmitTab6, reset: resetTab6, control: controlTab6, formState: formStateTab6, watch: watchTab6, setValue:setValueTab6 } = useForm({
      DefaultValuesTab6,
      mode: "all",
      resolver: yupResolver(schemaValuesTab6),
    });

    const { isValid: isValidTab6, dirtyFields: dirtyFieldsTab6, errors: errorsTab6 } = formStateTab6;
    const datosTab6 = watchTab6()

    const valoresTab6 = () => {
      setValueTab6("campo42_1",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_2",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_3",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_4",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_5",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_6",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_7",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_8",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_9",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_10",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_11",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo42_12",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo39",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo40",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo41",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo43",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo44_1",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo44_2",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo44_3",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo44_4",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo44_5",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo45",0,{ shouldValidate: true, shouldTouch: true })
      setValueTab6("campo46",0,{ shouldValidate: true, shouldTouch: true })
    }

    const GuardarTab6 = async() => {
      if(isEditTab6){
        if(isValidTab6){
          EditarTab6() 
        }else{
          ToastWarning();
        }
      }else{
        if(isValidTab6){
          InsertarTab6() 
        }else{
          ToastWarning();
        }
      }
    }

    const InsertarTab6 = async() => {
      try {
        const response = await DeclaracionValorServices.InsertarBaseCalculoPorDevaId(Declaracion_Valor_Id,datosTab6);
        if (response.data.data.messageStatus != "0") {
          setisEditTab6(true);
          setbase_Id(response.data.data.messageStatus);
          ToastSuccess();
          validacion(6)
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    }

    const EditarTab6 = async() => {
      try {
        const response = await DeclaracionValorServices.EditarBaseCalculoPorDevaId(base_Id,Declaracion_Valor_Id,datosTab6);
        if (response.data.data.messageStatus == "1") {
          ToastSuccessEditar();
          validacion(6)
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
      } catch (error) {
        ToastError("Error inesperado");
      }
    }



     //useEffect para la suma de los campos 39 y 40
     useEffect(() => {
      const sumatoria = parseFloat(datosTab6.campo39 || 0) + parseFloat(datosTab6.campo40 || 0);
      setValueTab6('campo41', sumatoria);
    }, [datosTab6.campo39,datosTab6.campo40]);

    //useEffect para la suma de los campos del 42_1 al 42_12
    useEffect(() => {
      const sumatoria = (parseFloat(datosTab6.campo42_1 || 0) +
                         parseFloat(datosTab6.campo42_2 || 0) +
                         parseFloat(datosTab6.campo42_3 || 0) + 
                         parseFloat(datosTab6.campo42_4 || 0) +
                         parseFloat(datosTab6.campo42_5 || 0) +
                         parseFloat(datosTab6.campo42_6 || 0) +
                         parseFloat(datosTab6.campo42_7 || 0) +
                         parseFloat(datosTab6.campo42_8 || 0) +
                         parseFloat(datosTab6.campo42_9 || 0) +
                         parseFloat(datosTab6.campo42_10 || 0) +
                         parseFloat(datosTab6.campo42_11 || 0) +
                         parseFloat(datosTab6.campo42_12 || 0));
      setValueTab6('campo43', sumatoria);
    }, [datosTab6.campo42_1,
        datosTab6.campo42_2,
        datosTab6.campo42_3,
        datosTab6.campo42_4,
        datosTab6.campo42_5,
        datosTab6.campo42_6,
        datosTab6.campo42_7,
        datosTab6.campo42_8,
        datosTab6.campo42_9,
        datosTab6.campo42_10,
        datosTab6.campo42_11,
        datosTab6.campo42_12]);

   //useEffect para la suma de los campos 44_1 al 44_5
    useEffect(() => {
      const sumatoria = (parseFloat(datosTab6.campo44_1 || 0) +
                         parseFloat(datosTab6.campo44_2 || 0) +
                         parseFloat(datosTab6.campo44_3 || 0) + 
                         parseFloat(datosTab6.campo44_4 || 0) +
                         parseFloat(datosTab6.campo44_5 || 0));
      setValueTab6('campo45', sumatoria);
    }, [datosTab6.campo44_1,
        datosTab6.campo44_2,
        datosTab6.campo44_3,
        datosTab6.campo44_4,
        datosTab6.campo44_5]);

    //useEffect para la suma de los campos 41 + 42 + 45
    useEffect(() => {
      const sumatoria = (parseFloat(datosTab6.campo41 || 0) +
                         parseFloat(datosTab6.campo43 || 0) +
                         parseFloat(datosTab6.campo45 || 0));
      setValueTab6('campo46', sumatoria);
    }, [datosTab6.campo41,
        datosTab6.campo43,
        datosTab6.campo45]);



        //Tabulacion 7
        const [SalirDEVA, setSalirDEVA] = useState(false);

        const DialogSalir = () => {
          setSalirDEVA(!SalirDEVA)
        }

        const Salir2 = async() => {
           try{
            const response = await DeclaracionValorServices.FinalizarDeva(Declaracion_Valor_Id)
            if(response.data.data.messageStatus == "1"){
              DialogSalir()
              ToastSuccessPersonalizado("Declaración de valor finalizado con exito")
              navigate('/Declaracion_Valor/Index');
            }else{
              ToastError()
            }
           }catch(error){
            ToastError()
           }
        }

        


  //Cargado de las variables DDL
  async function ddls() {
    //Peticiones tab1
    //setarancelesdata(await ArancelSeraravices.listarDdl());
    const Regimenes = await load_DDLs.RegimenesAduaneros();
    setRegimenesAduaneros_DDL(Regimenes.filter(element => element.value === 1));
    setValueTab1("RegimenAduanero",Regimenes[0],{shouldValidate:true, shouldTouch:true});
    setPaisImportador_DDL(await load_DDLs.paises());   
    setNivelComercialImportador_DDL(await load_DDLs.NivelesComerciales());



    //Peticiones tab2
    setPaisProveedor_DDL(await load_DDLs.paises())
    setCondicionComercialProveedor_DDL(await load_DDLs.CondicionesComerciales());
    setPaisIntermediario_DDL(await load_DDLs.paises())
    setTipoIntermediario_DDL(await load_DDLs.TipoIntermediario());

    //Peticiones tab3
    setPaisEntrega_DDl(await load_DDLs.paises());
    setIncoterm_DDL(await load_DDLs.Incoterm());
    setFormaEnvio_DDL(await load_DDLs.FormasEnvio())
    setFormasPago_DDL(await load_DDLs.FormasPago())
    setPaisExportacion_DDl(await load_DDLs.paises())
    setMonedasTransaccion_DDl(await load_DDLs.Monedas())
     
    //Peticiones tab4__1

    //Peticiones tab4_2
    setUnidadMedia_DDL(await load_DDLs.UnidadMedida())
    setEstadosMercancia_DDL(await load_DDLs.EstadosMercancia())
    setOrigenMercacia_DDL(await load_DDLs.paises())

    valoresTab6()
  }

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    setval();
    PaisImportador();
  }, []);


  {
    /* Columnas de la tabla */
  }
  

  const [filas, setFilas] = React.useState(5);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
   
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
    tab3: true,
    tab4: true,
    tab5: true,
    tab6: true,
  });


  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
        tab2: true,
        tab3: true,
        tab4: true,
        tab5: true,
        tab6: true,
      });
      setValue(1);
    }

    if (params === 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: true,
        tab5: true,
        tab6: true,
      });
      setValue(2);
    }

    if (params === 3) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: true,
        tab5: true,
        tab6: true,
      });
      setValue(3);
    }

    if (params === 4) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: true,
        tab6: true,
      });
      setValue(4);
    }

    if (params === 5) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
        tab6: true,
      });
      setValue(5);
      
    }
    if (params === 6) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
        tab6: false,
      });
      setValue(6);
      
    }
  };

  const botonStyleAgregar = {
    backgroundColor: "#634A9E",
    color: "white",
    "&:hover": { backgroundColor: "#6e52ae" },
  };

  const botonStyleEditar = {
    backgroundColor: "#D1AF3C",
    color: "white",
    "&:hover": { backgroundColor: "#6e52ae" },
  };



  const useStyles = makeStyles({
    radioContainer: {
      border: '1px solid #ccc',
      borderRadius: '3px',
      backgroundColor: 'white',
      display: 'flex',
      padding:'3px',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:'5px',
    },
    radioError: {
      borderColor: 'red',
    },
  });

  const classes = useStyles();
  
  const [period, setPeriod] = useState('month');

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };
  
  
  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/Trhd4rH/DECLARACI-N-DE-VALOR.png"
        alt="Encabezado de la carta"
      />

      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
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
            <Tab label="I. Aduana e Importador" {...a11yProps(0)} />
            <Tab
              label="I.I Proveedor e Intermediario"
              {...a11yProps(1)}
              disabled={tabsEstado.tab1}
            />
            <Tab
              label="I.II Característica de la transacción"
              {...a11yProps(2)}
              disabled={tabsEstado.tab2}
            />
            <Tab 
              label="Facturas" 
              {...a11yProps(3)} 
              disabled={tabsEstado.tab3} />
            <Tab
              label="II. Condiciones de la transacción"
              {...a11yProps(4)}
              disabled={tabsEstado.tab4}
            />
            <Tab
              label="III. Valor en Aduana"
              {...a11yProps(5)}
              disabled={tabsEstado.tab5}
            />
            <Tab
              label="Finalizacion DEVA"
              {...a11yProps(6)}
              disabled={tabsEstado.tab6}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <form onSubmit={handleSubmitTab1((_data) => { })}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Información General de la Aduana" />
                </Divider>
              </Grid>
              <Grid item xs={3}>
              {/*AutoComplete Aduana Ingreso*/}
               <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.AduanaIngreso }>Aduana de Ingreso</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="AduanaIngreso"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          noOptionsText="Sin resultados"
                          options={AduanaIngreso_DDL}
                          disableClearable={true}
                          value={datosTab1.AduanaIngreso ?? null}
                          onChange={(event, value) => {
                            setValueTab1("AduanaIngreso", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab1.AduanaIngreso} />
                          )}
                        />
                      )}
                      name="AduanaIngreso"
                      error={!!errorsTab1.AduanaIngreso}
                      control={controlTab1}
                    />
                </FormControl>
                {/*AutoComplete Aduana Ingreso*/}
              </Grid>
              <Grid item xs={3}>
               {/*AutoComplete Aduana Salida*/}
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.AduanaSalida}>Aduana de Salida</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="AduanaSalida"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          noOptionsText="Sin resultados"
                          options={AduanaSalida_DDL}
                          disableClearable={true}
                          value={datosTab1.AduanaSalida ?? null}
                          onChange={(event, value) => {
                            setValueTab1("AduanaSalida", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab1.AduanaSalida} />
                          )}
                        />
                      )}
                      name="AduanaSalida"
                      error={!!errorsTab1.AduanaSalida}
                      control={controlTab1}
                    />
                </FormControl>
              {/*AutoComplete Aduana Salida*/}
              </Grid>
              <Grid item xs={3}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.DeclaracionMercancia}>Declaración de mercancia</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="DeclaracionMercancia"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          noOptionsText="Sin resultados"
                          options={DeclaracionMercancia_DDL}
                          disableClearable={true}
                          value={datosTab1.DeclaracionMercancia ?? null}
                          onChange={(event, value) => {
                            setValueTab1("DeclaracionMercancia", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab1.DeclaracionMercancia} />
                          )}
                        />
                      )}
                      name="DeclaracionMercancia"
                      error={!!errorsTab1.DeclaracionMercancia}
                      control={controlTab1}
                    />
                </FormControl>
                {/*TextField Declaracion de valor*/}              
              </Grid>
              <Grid item xs={3}>
                {/*DatePicker Fecha Aceptación*/}  
              <Controller
                name="FechaAceptacion"
                control={controlTab1}
                render={({ field }) => (
                  <FormControl
                  error={!!errorsTab1.FechaAceptacion}
                    fullWidth={true}
                  >
                    <FormLabel>
                      Fecha de Aceptación:
                    </FormLabel>
                    <DatePicker
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      required
                      minDate={new Date()}
                      renderInput={(_props) => (
                        <TextField  
                          className="w-full"
                          {..._props}
                          onBlur={field.onBlur}
                          error={!!errorsTab1.FechaAceptacion}
                          helperText={errorsTab1?.FechaAceptacion?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errorsTab1?.FechaAceptacion?.message}
                        />
                      )}
                      className="w-full"
                    />
                  
                  </FormControl>
                )}
              />
                {/*DatePicker Fecha Aceptación*/}  
              </Grid>

              <Grid item xs={3}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.RegimenAduanero}>Regimen aduanero</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="RegimenAduanero"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          noOptionsText="Sin resultados"
                          options={RegimenesAduaneros_DDL}
                          disableClearable={true}
                          value={datosTab1.RegimenAduanero ?? null}
                          onChange={(event, value) => {
                            setValueTab1("RegimenAduanero", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab1.RegimenAduanero} />
                          )}
                        />
                      )}
                      name="RegimenAduanero"
                      error={!!errorsTab1.RegimenAduanero}
                      control={controlTab1}
                    />
                </FormControl>
                {/*TextField Declaracion de valor*/}              
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '30px', marginBottom: '0px' }}>
                  <Chip label="Información General del Importador" />
                </Divider>
              </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.NombreImportador}>Nombre o Razón Social</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          inputProps={{
                            maxLength: 250,
                            startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                            ),
                            onKeyPress: (event) => {
                              if (!/[A-Za-z ]/.test(event.key)) {
                                  event.preventDefault();
                              }
                            },
                        }}
                          error={!!errorsTab1.NombreImportador}
                        ></TextField>
                      )}
                      name="NombreImportador"
                      control={controlTab1}
                    ></Controller>
                  </FormControl>
                </Grid>
              <Grid item xs={3}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="9999-9999-999999"
                      value={datosTab1["RTNImportador"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                        <FormLabel error={!!errorsTab1.RTNImportador} >Registro Tributario (RTN)</FormLabel>                     
                            <TextField
                              {...field}
                              helperText={errorsTab1?.RTNImportador?.message}
                              InputProps={{
                                startAdornment: (<InputAdornment position="start"></InputAdornment>),
                              }}
                              error={!!errorsTab1.RTNImportador}
                            ></TextField>                       
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="RTNImportador"
                  control={controlTab1}
                />
              </Grid>
              <Grid item xs={3}>
              <Controller
                  render={({ field }) => (
                        <FormControl fullWidth>
                         <FormLabel  error={!!errorsTab1.NumeroRegistroImportador}>Número de Registro</FormLabel>
                          <TextField
                          {...field}
                          id="outlined-disabled"
                          helperText={errorsTab1?.NumeroRegistroImportador?.message}
                          inputProps={{
                            maxLength: 14,
                            startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                            ),
                            onKeyPress: (event) => {
                              if (!/[0-9 ]/.test(event.key)) {
                                  event.preventDefault();
                              }
                            },
                        }}
                          error={!!errorsTab1.NumeroRegistroImportador}
                        ></TextField>                    
                      </FormControl>
                  )}
                  name="NumeroRegistroImportador"
                  control={controlTab1}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errorsTab1.DireccionImportador}>Direccion del importador</FormLabel>
                  <Controller render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-multiline-static"
                      error={!!errorsTab1.DireccionImportador}
                      InputLabelProps={{ shrink: true }}
                    />
                  )} name="DireccionImportador"
                    control={controlTab1} />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.PaisImportador}>País del importador</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="PaisImportador"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={PaisImportador_DDL}
                          disabled={true}
                          value={datosTab1.PaisImportador ?? null}
                          onChange={(event, value) => {
                            setValueTab1("PaisImportador", value);
                            setValueTab1("EstadoImportador", null);
                            let xd = value['label'].split('-')
                            setMascaraImportador(xd[2].trim()+' *****************')
                            FiltrarEstados(value);
                            if(datosTab1.TelefonoImportador != null || datosTab1.TelefonoImportador != ""){
                              setValueTab1("TelefonoImportador", "");
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab1.PaisImportador} />
                          )}
                        />
                      )}
                      name="PaisImportador"
                      error={!!errorsTab1.PaisImportador}
                      control={controlTab1}
                    />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.EstadoImportador}>Estado del importador</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="EstadoImportador"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={ProvinciaImportador_DDL}
                          value={datosTab1.EstadoImportador ?? null}
                          onChange={(event, value) => {
                            setValueTab1("EstadoImportador", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab1.EstadoImportador} />
                          )}
                        />
                      )}
                      name="EstadoImportador"
                      error={!!errorsTab1.EstadoImportador}
                      control={controlTab1}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
                  <FormLabel error={!!errorsTab1.CorreoElectronicoImportador}>Correo Electrónico del importador</FormLabel>
                  <Controller render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-multiline-static"
                      helperText={errorsTab1?.CorreoElectronicoImportador?.message}
                      error={!!errorsTab1.CorreoElectronicoImportador}
                      InputLabelProps={{ shrink: true }}
                    />
                  )} name="CorreoElectronicoImportador"
                    control={controlTab1} />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask={MascaraImportador}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (

                        <FormControl error={!!errorsTab1.TelefonoImportador} fullWidth={true}>
                          <FormLabel>
                            Teléfono del importador:
                          </FormLabel>
                          <TextField
                            {...field}
                            variant="outlined"
                            error={!!errorsTab1.TelefonoImportador}
                            helperText={errorsTab1?.TelefonoImportador?.message}
                            fullWidth={true}
                            inputProps={{
                              maxLength: 25,
                              startAdornment: (
                                  <InputAdornment position="start"></InputAdornment>
                              ),
                              onKeyPress: (event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                              }
                              },
                          }}
                          />
                        </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="TelefonoImportador" 
                  control={controlTab1}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="999.999.999"
                      value={datosTab1["FaxImportador"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                        <FormLabel error={!!errorsTab1.FaxImportador} >Fax del importador</FormLabel>                     
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              InputProps={{
                                startAdornment: (<InputAdornment position="start"></InputAdornment>),
                              }}
                              error={!!errorsTab1.FaxImportador}
                            ></TextField>                       
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="FaxImportador"
                  control={controlTab1}
                />
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                    <FormLabel error={!!errorsTab1.NivelComercialImportador}>Nivel comercial importador</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="NivelComercialImportador"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={NivelComercialImportador_DDL}
                          disableClearable={true}
                          value={datosTab1.NivelComercialImportador ?? null}
                          onChange={(event, value) => {
                            setValueTab1("NivelComercialImportador", value);
                            if(value['label'] === 'OTROS'){
                              setOtroNivelComercial(false);
                            }else{
                              setValueTab1('OtroNivelComercialImportador','')
                              setOtroNivelComercial(true);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab1.NivelComercialImportador} />
                          )}
                        />
                      )}
                      name="NivelComercialImportador"
                      error={!!errorsTab1.NivelComercialImportador}
                      control={controlTab1}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={OtroNivelComercial ? "" : !!errorsTab1.OtroNivelComercialImportador}>Otro Nivel Comercial</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        disabled={OtroNivelComercial}
                        inputProps={{
                          maxLength: 200,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab1.OtroNivelComercialImportador}
                      ></TextField>
                    )}
                    name="OtroNivelComercialImportador"
                    control={controlTab1}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
            >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E',
                  color: 'white',
                  '&:hover': { backgroundColor: '#6e52ae' },
                }}
                type="submit"
                onClick={GuardarTab1}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8',
                  color: 'black',
                  '&:hover': { backgroundColor: '#BFBABA' },
                }}
                onClick={RegistroInsertado ?  DialogCancelarDeva : RegirigirIndex}
              >
                Cancelar
              </Button>
            </Grid>
            </form>
          </TabPanel>

          {/*---------------------------------------------------------------------------------------------------- */}
                                             {/*Tabulacion 2 */}
          {/*---------------------------------------------------------------------------------------------------- */}
          <TabPanel value={value} index={1} dir={theme.direction}>
          <form onSubmit={handleSubmitTab2((_data) => { })}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Información General del proveedor" />
                </Divider>           
              </Grid>

              <Grid item xs={6}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="9999-9999-99999"
                      value={datosTab2["IdentificacionProveedor"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                        <FormLabel error={!!errorsTab2.IdentificacionProveedor} >Identificación del Proveedor</FormLabel>                     
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          helperText={errorsTab2?.IdentificacionProveedor?.message}
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsTab2.IdentificacionProveedor}
                      ></TextField>                    
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="IdentificacionProveedor"
                  control={controlTab2}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab2.NombreProveedor}>Nombre o Razón Social del Proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        inputProps={{
                          maxLength: 200,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9 ]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab2.NombreProveedor}
                      ></TextField>
                    )}
                    name="NombreProveedor"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab2.DireccionProveedor}>Dirección del Proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        inputProps={{
                          maxLength: 200,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9 ]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab2.DireccionProveedor}
                      ></TextField>
                    )}
                    name="DireccionProveedor"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                    <FormLabel  error={!!errorsTab2.PaisProveedor}>País del proveedor</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="PaisProveedor"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={PaisProveedor_DDL}
                          value={datosTab2.PaisProveedor ?? null}
                          onChange={(event, value) => {
                            setValueTab2("PaisProveedor", value);
                            setValueTab2("EstadoProveedor", null);
                            FiltrarEstadosProveedor(value);
                            let xd = value['label'].split('-')
                            setMascaraProveedor(xd[2].trim()+' *****************')
                            if(datosTab2.TelefonoProveedor != null || datosTab2.TelefonoProveedor != ""){
                              setValueTab2("TelefonoProveedor", "");
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab2.PaisProveedor} />
                          )}
                        />
                      )}
                      name="PaisProveedor"
                      error={!!errorsTab2.PaisProveedor}
                      control={controlTab2}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                    <FormLabel  error={!!errorsTab2.EstadoProveedor}>Estado del proveedor</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="EstadoProveedor"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={ProvinciaProveedor_DDL}
                          value={datosTab2.EstadoProveedor ?? null}
                          onChange={(event, value) => {
                            setValueTab2("EstadoProveedor", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab2.EstadoProveedor} />
                          )}
                        />
                      )}
                      name="EstadoProveedor"
                      error={!!errorsTab2.EstadoProveedor}
                      control={controlTab2}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab2.CorreoProveedor}>Correo Electrónico del proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        helperText={errorsTab2?.CorreoProveedor?.message}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTab2.CorreoProveedor}
                      ></TextField>
                    )}
                    name="CorreoProveedor"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask={MascaraProveedor}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (

                        <FormControl fullWidth={true}>
                          <FormLabel error={!!errorsTab2.TelefonoProveedor}>Teléfono del proveedor</FormLabel>
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              helperText={errorsTab2?.TelefonoProveedor?.message}
                              InputProps={{
                                startAdornment: (<InputAdornment position="start"></InputAdornment>),
                              }}
                              error={!!errorsTab2.TelefonoProveedor}
                          ></TextField>
                        </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="TelefonoProveedor"
                  control={controlTab2}
                />
              </Grid>
              <Grid item xs={3}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="999.999.999"
                      value={datosTab2["FaxProveedor"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                        <FormLabel error={!!errorsTab2.FaxProveedor} >Fax del proveedor</FormLabel>                     
                          <TextField
                            {...field}
                            InputProps={{
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errorsTab2.FaxProveedor}
                        ></TextField>                    
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="FaxProveedor"
                  control={controlTab2}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab2.CondicionComercialProveedor}>Condición Comercial del proveedor</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="CondicionComercialProveedor"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={CondicionComercialProveedor_DDL}
                          disableClearable={true}
                          value={datosTab2.CondicionComercialProveedor ?? null}
                          onChange={(event, value) => {
                            setValueTab2("CondicionComercialProveedor", value);
                            if(value['label'] === 'OT - OTRO'){
                              setOtraCondicionComercial(false);
                            }else{
                              setValueTab2('OtraCondicionComercialProveedor','')
                              setOtraCondicionComercial(true);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab2.CondicionComercialProveedor} />
                          )}
                        />
                      )}
                      name="CondicionComercialProveedor"
                      error={!!errorsTab2.CondicionComercialProveedor}
                      control={controlTab2}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label"  error={OtraCondicionComercial ? "" : !!errorsTab2.OtraCondicionComercialProveedor}>Otra Condición Comercial</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="OtraCondicionComercialProveedor"
                        disabled={OtraCondicionComercial}
                        inputProps={{
                          maxLength: 200,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab2.OtraCondicionComercialProveedor}
                      ></TextField>
                    )}
                    name="OtraCondicionComercialProveedor"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
             <Grid item xs={4} justifyContent={"center"} className="flex justify-content-center">       
                      <FormControl fullWidth>
                        <FormControlLabel
                          control={
                            <Checkbox
                              label="¿Desea agregar el intermediario?"
                              labelplacement="top"
                              checked={checkedIntermediario}
                              onChange={handleChangeIntermediario}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          }
                          label="¿Desea agregar el intermediario?"
                          labelPlacement="top"
                          style={{ marginTop: "25px", marginRight: "20px" }}
                        />
                      </FormControl>
              </Grid>
            </Grid>
            <Collapse in={checkedIntermediario}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '30px', marginBottom: '0px' }}>
                  <Chip label="Información General del Intermediario" />
                </Divider>          
              </Grid>
              <Grid item xs={6}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="9999-9999-99999"
                      value={datosTab2["IdentificacionIntermedario"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                        <FormLabel error={!!errorsTab2.IdentificacionIntermedario} >Identificación del Intermediario</FormLabel>                     
                          <TextField
                            {...field}
                            helperText={errorsTab2?.IdentificacionIntermedario?.message}
                            InputProps={{
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errorsTab2.IdentificacionIntermedario}
                        ></TextField>
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="IdentificacionIntermedario"
                  control={controlTab2}
                />              
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab2.NombreIntermediario}>Nombre o Razón Social del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 200,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z ]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab2.NombreIntermediario}
                      ></TextField>
                    )}
                    name="NombreIntermediario"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab2.DireccionIntermediario}>Dirección del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        inputProps={{
                          maxLength: 200,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9 ]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab2.DireccionIntermediario}
                      ></TextField>
                    )}
                    name="DireccionIntermediario"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab2.PaisIntermediario}>País del Intermediario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="PaisIntermediario"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={PaisIntermediario_DDL}
                          disableClearable={true}
                          value={datosTab2.PaisIntermediario ?? null}
                          onChange={(event, value) => {
                            setValueTab2("PaisIntermediario", value);
                            FiltrarEstadosIntermediario(value)
                            let xd = value['label'].split('-')
                            setMascaraIntermediario(xd[2].trim()+' *****************')
                            if(datosTab2.TelefonoIntermediario != null || datosTab2.TelefonoIntermediario != ""){
                              setValueTab2("TelefonoIntermediario", "");
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab2.PaisIntermediario} />
                          )}
                        />
                      )}
                      name="PaisIntermediario"
                      error={!!errorsTab2.PaisIntermediario}
                      control={controlTab2}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>             
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab2.EstadoIntermediario}>Estado del Intermediario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="EstadoIntermediario"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={ProvinciaIntermediario_DDL}
                          disableClearable={true}
                          value={datosTab2.EstadoIntermediario ?? null}
                          onChange={(event, value) => {
                            setValueTab2("EstadoIntermediario", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab2.EstadoIntermediario} />
                          )}
                        />
                      )}
                      name="EstadoIntermediario"
                      error={!!errorsTab2.EstadoIntermediario}
                      control={controlTab2}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab2.CorreoIntermediario}>Correo Electrónico del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        helperText={errorsTab2?.CorreoIntermediario?.message}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTab2.CorreoIntermediario}
                      ></TextField>
                    )}
                    name="CorreoIntermediario"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask={MascaraIntermediario}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                          <FormLabel id="group-label" error={!!errorsTab2.TelefonoIntermediario}>Teléfono del Intermediario</FormLabel>                        <TextField
                          {...field}
                          id="outlined-disabled"
                          helperText={errorsTab2?.TelefonoIntermediario?.message}
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsTab2.TelefonoIntermediario}
                      ></TextField>                   
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="TelefonoIntermediario"
                  control={controlTab2}
                />
              </Grid>
              <Grid item xs={3}>
              <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="999.999.999"
                      value={datosTab2["FaxIntermediario"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth>
                          <FormLabel id="group-label" error={!!errorsTab2.FaxIntermediario}>Fax del Intermediario</FormLabel>                          <TextField
                            {...field}
                            id="outlined-disabled"
                            label=""
                            placeholder=""
                            InputProps={{
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errorsTab2.FaxIntermediario}
                        ></TextField>                     
                      </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="FaxIntermediario"
                    control={controlTab2}
                />           
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab2.TipoIntermediario}>Tipo de Intermediario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="TipoIntermediario"
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={TipoIntermediario_DDL}
                          disableClearable={true}
                          value={datosTab2.TipoIntermediario ?? null}
                          onChange={(event, value) => {
                            setValueTab2("TipoIntermediario", value);
                            if(value['label'] === 'OT - OTRO'){
                              setOtroTipoIntermediario(false)
                            }else{
                              setValueTab2('OtroTipoIntermediario','')
                              setOtroTipoIntermediario(true);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab2.TipoIntermediario} />
                          )}
                        />
                      )}
                      name="TipoIntermediario"
                      error={!!errorsTab2.TipoIntermediario}
                      control={controlTab2}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={OtroTipoIntermediario ? "" : !!errorsTab2.OtroTipoIntermediario}>Otro Tipo de Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="OtroTipoIntermediario"
                        disabled={OtroTipoIntermediario}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTab2.OtroTipoIntermediario}
                      ></TextField>
                    )}
                    name="OtroTipoIntermediario"
                    control={controlTab2}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>
            </Collapse>

            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', mt: '30px' }}
            >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E',
                  color: 'white',
                  '&:hover': { backgroundColor: '#6e52ae' },
                }}
                type="submit"
                onClick={GuardarTab2}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8',
                  color: 'black',
                  '&:hover': { backgroundColor: '#BFBABA' },
                }}
                onClick={DialogCancelarDeva}
              >
                Cancelar
              </Button>
            </Grid>
            </form>
          </TabPanel>
           {/*---------------------------------------------------------------------------------------------------- */}
                                             {/*Tabulacion 3 */}
          {/*---------------------------------------------------------------------------------------------------- */}
          <TabPanel value={value} index={2} dir={theme.direction}>
          <form onSubmit={handleSubmitTab3((_data) => { })}>
            <Grid container spacing={3}>
              <Grid item textAlign="center" xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip label="Característica de la Transacción" />
                </Divider>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab3.LugarEntrega}>Lugar de Entrega</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="LugarEntrega"
                        inputProps={{
                          maxLength: 5000,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9 - ]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab3.LugarEntrega}
                      ></TextField>
                    )}
                    name="LugarEntrega"
                    control={controlTab3}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>                          
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab3.PaisEntrega}>País de Entrega</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="PaisEntrega"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={PaisEntrega_DDl}
                          value={datosTab3.PaisEntrega ?? null}
                          onChange={(event, value) => {
                            setValueTab3("PaisEntrega", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab3.PaisEntrega} />
                          )}
                        />
                      )}
                      name="PaisEntrega"
                      error={!!errorsTab3.PaisEntrega}
                      control={controlTab3}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>               
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab3.Incoterm}>Incoterm</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="Incoterm"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={Incoterm_DDL}
                          value={datosTab3.Incoterm ?? null}
                          onChange={(event, value) => {
                            setValueTab3("Incoterm", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab3.Incoterm} />
                          )}
                        />
                      )}
                      name="Incoterm"
                      error={!!errorsTab3.Incoterm}
                      control={controlTab3}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab3.Version}>Versión</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 4,
                          style: { 
                            textTransform: "uppercase" 
                          },
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab3.Version}
                      ></TextField>
                    )}
                    name="Version"
                    control={controlTab3}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab3.NumeroContrato}>Número de Contrato</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="NumeroContrato"
                        inputProps={{
                          maxLength: 20,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab3.NumeroContrato}
                      ></TextField>
                    )}
                    name="NumeroContrato"
                    control={controlTab3}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid item xs={3}>      
                <Controller
                name="FechaContrato"
                control={controlTab3}
                render={({ field }) => (
                  <FormControl
                    error={!!errorsTab3.FechaContrato}
                    fullWidth={true}
                  >
                    <FormLabel>
                      Fecha de Contrato
                    </FormLabel>
                    <DatePicker
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      maxDate={new Date()}
                      minDate={new Date(1900, 0 , 1)}
                      renderInput={(_props) => (
                        <TextField  
                          className="w-full"
                          {..._props}
                          onBlur={field.onBlur}
                          error={!!errorsTab3.FechaContrato}
                          helperText={errorsTab3?.FechaContrato?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errorsTab3?.FechaContrato?.message}

                        />
                      )}
                      className="w-full"
                    />
                  </FormControl>
                )}
              />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab3.FormaEnvio}>Forma de Envio</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="FormaEnvio"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={FormaEnvio_DDL}
                          value={datosTab3.FormaEnvio ?? null}
                          onChange={(event, value) => {
                            setValueTab3("FormaEnvio", value);
                           if(value['label'] === 'OT - OTRO'){
                            setFormaEnvioEstadoDisabled(false);
                           }else{
                            setValueTab3("OtraFormaEnvio", '');
                            setFormaEnvioEstadoDisabled(true);
                           }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab3.FormaEnvio} />
                          )}
                        />
                      )}
                      name="FormaEnvio"
                      error={!!errorsTab3.FormaEnvio}
                      control={controlTab3}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={FormaEnvioEstadoDisabled ? "" : !!errorsTab3.OtraFormaEnvio}>Otra Forma de Envío</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        disabled={FormaEnvioEstadoDisabled}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTab3.OtraFormaEnvio}
                      ></TextField>
                    )}
                    name="OtraFormaEnvio"
                    control={controlTab3}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3} justifyContent={"center"} className="flex justify-content-center">       
                      <FormControl fullWidth>
                        <FormControlLabel
                          control={
                            <Switch
                              label="Pago efectuado"
                              labelplacement="top"
                              checked={checked}
                              onChange={handleChangePagoEfectuado}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          }
                          label="Pago efectuado"
                          labelPlacement="top"
                          style={{ marginTop: "25px", marginRight: "20px" }}
                        />
                      </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                    <FormLabel  error={!!errorsTab3.FormaPago}>Forma de Pago</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="PaisImportador"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={FormasPago_DDL}
                          value={datosTab3.FormaPago ?? null}
                          onChange={(event, value) => {
                            setValueTab3("FormaPago", value);  
                            if(value['label'] === 'OTRO'){
                              setFormaPagoEstadoDisabled(false);
                             }else{
                              setValueTab3("OtraFormaPago", '');
                              setFormaPagoEstadoDisabled(true);
                             }                          
                           
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab3.FormaPago} />
                          )}
                        />
                      )}
                      name="FormaPago"
                      error={!!errorsTab3.FormaPago}
                      control={controlTab3}
                    />
                </FormControl>              
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={FormaPagoEstadoDisabled ? "" : !!errorsTab3.OtraFormaPago}>Otra Forma de Pago</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="OtraFormaPago"
                        disabled={FormaPagoEstadoDisabled}
                        inputProps={{
                          maxLength: 200,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[A-Za-z0-9 ]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab3.OtraFormaPago}
                      ></TextField>
                    )}
                    name="OtraFormaPago"
                    control={controlTab3}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={2}>              
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab3.LugarEmbarque}>Lugar de Embarque</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="LugarEmbarque"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={LugarEmbarque_DDl}
                          value={datosTab3.LugarEmbarque ?? null}
                          onChange={(event, value) => {
                            setValueTab3("LugarEmbarque", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params}error={!!errorsTab3.LugarEmbarque} />
                          )}
                        />
                      )}
                      name="LugarEmbarque"
                      error={!!errorsTab3.LugarEmbarque}
                      control={controlTab3}
                    />
                </FormControl>
              </Grid>
                <Grid item xs={1}>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        style={{ 
                            borderRadius: "10px" ,
                            marginTop: "25px"
                        }}
                        sx={{
                            backgroundColor: "#DAD8D8",
                            color: "black",
                            "&:hover": { backgroundColor: "#BFBABA" },
                        }}
                        onClick={DialogLugarEntrega}
                    >
                        <Icon>search</Icon>
                    </Button>
                </Grid>
              <Grid item xs={3}>             
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab3.PaisExportacion}>País de exportación</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="PaisExportacion"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={PaisExportacion_DDl}
                          value={datosTab3.PaisExportacion ?? null}
                          onChange={(event, value) => {
                            setValueTab3("PaisExportacion", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab3.PaisExportacion} />
                          )}
                        />
                      )}
                      name="PaisExportacion"
                      error={!!errorsTab3.PaisExportacion}
                      control={controlTab3}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <Controller
                name="FechaExportacion"
                control={controlTab3}
                render={({ field }) => (
                  <FormControl
                    error={!!errorsTab3.FechaExportacion}
                    fullWidth={true}
                  >
                    <FormLabel>
                      Fecha de exportación
                    </FormLabel>
                    <DatePicker
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      minDate={new Date(1900, 0 , 1)}
                      renderInput={(_props) => (
                        <TextField  
                          className="w-full"
                          {..._props}
                          onBlur={field.onBlur}
                          error={!!errorsTab3.FechaExportacion}
                          helperText={errorsTab3?.FechaExportacion?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errorsTab3?.FechaExportacion?.message}

                        />
                      )}
                      className="w-full"
                    />
                  </FormControl>
                )}
              />
              </Grid>
              <Grid item xs={3}>        
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab3.MonedaTransaccion}>Moneda de transacción</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="MonedaTransaccion"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={MonedasTransaccion_DDl}
                          value={datosTab3.MonedaTransaccion ?? null}
                          onChange={(event, value) => {
                            setValueTab3("MonedaTransaccion", value); 
                            if(value['label'] === 'OT - OTRO'){
                              setMonedaEstadoDisabled(false);
                            }else{
                              setMonedaEstadoDisabled(true);
                              setValueTab3('OtraMoneda','')
                            }                       
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab3.MonedaTransaccion} />
                          )}
                        />
                      )}
                      name="MonedaTransaccion"
                      error={!!errorsTab3.MonedaTransaccion}
                      control={controlTab3}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab3.OtraMoneda}>Otra Moneda</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTab3.OtraMoneda}
                      ></TextField>
                    )}
                    name="OtraMoneda"
                    control={controlTab3}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label" error={!!errorsTab3.CambioMoneda}>Cambio de moneda a USD</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 20,
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                        error={!!errorsTab3.CambioMoneda}
                      ></TextField>
                    )}
                    name="CambioMoneda"
                    control={controlTab3}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
            >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E',
                  color: 'white',
                  '&:hover': { backgroundColor: '#6e52ae' },
                }}
                type="submit"
                onClick={GuardarTab3}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8',
                  color: 'black',
                  '&:hover': { backgroundColor: '#BFBABA' },
                }}
                onClick={DialogCancelarDeva}
              >
                Cancelar
              </Button>
            </Grid>
            </form>
          </TabPanel>
          {/*---------------------------------------------------------------------------------------------------- */}
                                             {/*Tabulacion 4 */}
          {/*---------------------------------------------------------------------------------------------------- */}
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Collapse in={mostrarAddH}>
              <br></br>
              <br></br>
              <Grid container spacing={3} justifyContent={"center"}>
            <form onSubmit={handleSubmitTab4_1((_data) => { })}>
              <Grid container spacing={3} justifyContent={"center"}>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Agregar factura " />
                  </Divider>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label" error={!!errorsTab4_1.NumeroFactura}>Número de factura</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          inputProps={{
                            maxLength:1000,
                            style: { 
                              textTransform: "uppercase" 
                            },

                            startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                            ),
                            onKeyPress: (event) => {
                              if (!/[A-Za-z0-9-]/.test(event.key)) {
                                event.preventDefault();
                            }
                            },
                        }}
                          helperText={errorsTab4_1?.NumeroFactura?.message}
                          error={!!errorsTab4_1.NumeroFactura}
                        ></TextField>
                      )}
                      name="NumeroFactura"
                      control={controlTab4_1}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                <Controller
                  name="Fecha"
                  control={controlTab4_1}
                  render={({ field }) => (
                    <FormControl
                      error={!!errorsTab4_1.Fecha}
                      fullWidth={true}
                    >
                      <FormLabel>
                        Fecha de la Factura
                      </FormLabel>
                      <DatePicker
                        onChange={(date) => field.onChange(date)}
                       value={field.value}
                      maxDate={new Date()}
                      minDate={new Date(1900, 0 , 1)}
                        renderInput={(_props) => (
                          <TextField  
                            className="w-full"
                            {..._props}
                            onBlur={field.onBlur}
                            error={!!errorsTab4_1.Fecha}
                             helperText={errorsTab4_1?.Fecha?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errorsTab4_1?.Fecha?.message}
                          />
                        )}
                        className="w-full"
                      />
                    </FormControl>
                  )}
                />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    startIcon={isEditTab4_1 ? <Icon>checked</Icon> : <Icon>add</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={isEditTab4_1 ? botonStyleEditar : botonStyleAgregar}
                    type="submit"
                    onClick={GuardarTab4_1}
                  >
                       {isEditTab4_1 ? "Editar" : "Agregar factura"}                   
                  </Button>
                  {isEditTab4_1 ?  <Button
                    startIcon={<Icon>close</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px' }}
                    sx={{
                      backgroundColor: '#DAD8D8',
                      color: 'black',
                      '&:hover': { backgroundColor: '#BFBABA' },
                    }}
                    onClick={() => {    
                      setisEditTab4_1(false);                 
                      resetTab4_1(DefaultValuesTab4_1)
                    }}
                  >
                    Cancelar edición
                  </Button> : ""}
                </Grid>
                </Grid>
              </form>
                <Grid item xs={5}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Facturas" />
                  </Divider>
                </Grid>
                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} >
                  <Stack direction="row" spacing={1}>
                    <label className='mt-8'>Filas por página:</label>
                    <FormControl sx={{ minWidth: 50 }} size="small">
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={filasTableFacturas}
                        // label="Filas"  
                        onChange={handleChangeFilasTableFacturas}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Barra de Busqueda en la Tabla */}
                    <TextField
                      style={{ borderRadius: '10px' }}
                      placeholder='Buscar'
                      value={searchTextTableFactuaras}
                      onChange={handleSearchChangeTableFacturas}
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

                  </Stack>
                </Grid>
                <Grid item xs={12}>               

                  <div className="center" style={{ width: "95%", margin: "auto" }}>
                    <Table
                      columns={columnsFacturaTable}
                      expandable={expandableConfig}
                      dataSource={filteredRowsTableFacturaExt}
                      locale={{
                        triggerDesc: "Ordenar descendente",
                        triggerAsc: "Ordenar ascendente",
                        cancelSort: "Cancelar",
                        emptyText: LoadingIcon(),
                      }}
                      size="small"
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
                  sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
                >
                  <Button
                    startIcon={<Icon>checked</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px', marginRight: '10px' }}
                    sx={{
                      backgroundColor: '#634A9E',
                      color: 'white',
                      '&:hover': { backgroundColor: '#6e52ae' },
                    }}
                    onClick={PasarTab4}
                  >
                    Guardar
                  </Button>

                  <Button
                    startIcon={<Icon>close</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px' }}
                    sx={{
                      backgroundColor: '#DAD8D8',
                      color: 'black',
                      '&:hover': { backgroundColor: '#BFBABA' },
                    }}
                    onClick={DialogCancelarDeva}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Collapse>

            <Collapse in={mostrarDetalles}>
            <form onSubmit={handleSubmitTab4_2((_data) => { })}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ marginBottom: 4 }}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Descripción de las mercancías (Items)" />
                  </Divider>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Número Item</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          disabled={true}
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsTab4_2.NumeroItem}
                        ></TextField>
                      )}
                      name="NumeroItem"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>        

                <Grid item xs={3}>              
                <FormControl fullWidth>
                    <FormLabel error={!!errorsTab4_2.ClasificacionArancelaria}>Clasisficación Arancelaria</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="ClasificacionArancelaria"
                          disableClearable={true}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={arancelesdata}
                          value={datosTab4_2.ClasificacionArancelaria ?? null}
                          onChange={(event, value) => {
                            setValueTab4_2("ClasificacionArancelaria", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params}error={!!errorsTab4_2.ClasificacionArancelaria} />
                          )}
                        />
                      )}
                      name="ClasificacionArancelaria"
                      error={!!errorsTab4_2.ClasificacionArancelaria}
                      control={controlTab4_2}
                    />
                </FormControl>
              </Grid>
                <Grid item xs={1}>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        style={{ 
                            borderRadius: "10px" ,
                            marginTop: "25px"
                        }}
                        sx={{
                            backgroundColor: "#DAD8D8",
                            color: "black",
                            "&:hover": { backgroundColor: "#BFBABA" },
                        }}
                        onClick={DialogClasificacionAranceles}
                    >
                        <Icon>search</Icon>
                    </Button>
                </Grid>
               
                <Grid item xs={4}>           
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsTab4_2.UnidadMedida}>Unidad de medida</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="UnidadMedida"
                          disableClearable={true}
                          disabled={checkedCambbioAranceles}
                          isOptionEqualToValue={(option, value) =>
                            option. value === value?.value
                          }
                          options={UnidadMedia_DDL}
                          value={datosTab4_2.UnidadMedida ?? null}
                          onChange={(event, value) => {
                            setValueTab4_2("UnidadMedida", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab4_2.UnidadMedida}/>
                          )}
                        />
                      )}
                      name="UnidadMedida"
                      error={!!errorsTab4_2.UnidadMedida}
                      control={controlTab4_2}
                    />
                </FormControl>
                </Grid>
                <Grid item xs={4} >
                  <FormControl fullWidth>
                    <FormLabel id="group-label" error={!!errorsTab4_2.IdentificacionComercial}>
                      Designación o Identificación...
                        <BootstrapTooltip
                            title="( Comercial de las Mercancías)"
                            style={{ height: "18px" }}>
                            <InfoIcon sx={{ color: '#ADADAD' }} />
                        </BootstrapTooltip>:
                      </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="IdentificacionComercial"
                          disabled={checkedCambbioAranceles}
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsTab4_2.IdentificacionComercial}
                        ></TextField>
                      )}
                      name="IdentificacionComercial"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label" error={!!errorsTab4_2.CaracteristicasMercadedira}>Características de la Mercancía</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="CaracteristicasMercadedira"
                          disabled={checkedCambbioAranceles}
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsTab4_2.CaracteristicasMercadedira}
                        ></TextField>
                      )}
                      name="CaracteristicasMercadedira"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label" error={!!errorsTab4_2.Marca}>Marca</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="Marca"
                          disabled={checkedCambbioAranceles}
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsTab4_2.Marca}
                        ></TextField>
                      )}
                      name="Marca"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label" error={!!errorsTab4_2.ModeloEstilo}>Modelo y/o Estilo</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="ModeloEstilo"   
                          disabled={checkedCambbioAranceles}             
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsTab4_2.ModeloEstilo}
                        ></TextField>
                      )}
                      name="ModeloEstilo"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsTab4_2.EstadoMercaderia}>Estado de la Mercancía</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="EstadoMercaderia"
                          disableClearable={true}
                          disabled={checkedCambbioAranceles}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={EstadosMercancia_DDL}
                          value={datosTab4_2.EstadoMercaderia ?? null}
                          onChange={(event, value) => {
                            setValueTab4_2("EstadoMercaderia", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab4_2.EstadoMercaderia} />
                          )}
                        />
                      )}
                      name="EstadoMercaderia"
                      error={!!errorsTab4_2.EstadoMercaderia}
                      control={controlTab4_2}
                    />
                </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsTab4_2.OrigenMecaderia}>Origen de la Mercancía</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          id="OrigenMecaderia"
                          disableClearable={true}
                          disabled={checkedCambbioAranceles}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                          }
                          options={OrigenMercacia_DDL}
                          value={datosTab4_2.OrigenMecaderia ?? null}
                          onChange={(event, value) => {
                            setValueTab4_2("OrigenMecaderia", value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} error={!!errorsTab4_2.OrigenMecaderia} />
                          )}
                        />
                      )}
                      name="OrigenMecaderia"
                      error={!!errorsTab4_2.OrigenMecaderia}
                      control={controlTab4_2}
                    />
                </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label" error={!!errorsTab4_2.Cantidad}>Cantidad</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          disabled={cantidadDisabed}
                          inputProps={{
                            startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                            ),
                            onKeyPress: (event) => {
                              if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault();
                            }
                            },
                        }}         
                          helperText={errorsTab4_2?.Cantidad?.message}         
                          error={!!errorsTab4_2.Cantidad}
                        ></TextField>
                      )}
                      name="Cantidad"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>


                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label" error={!!errorsTab4_2.ValorUnitario}>Valor Unitario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="ValorUnitario"
                          disabled={checkedCambbioAranceles}
                          inputProps={{
                            startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                            ),
                            onKeyPress: (event) => {
                              if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault();
                            }
                            },
                        }}         
                        helperText={errorsTab4_2?.ValorUnitario?.message}         
                          error={!!errorsTab4_2.ValorUnitario}
                        ></TextField>
                      )}
                      name="ValorUnitario"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>
                {checkedAuto ? 
                 <Grid item xs={4} justifyContent={"center"} className="flex justify-content-center">       
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Checkbox
                            defaultChecked={checkAutoEsNuevo}
                            onClick={() => {
                              setcheckAutoEsNuevo(!checkAutoEsNuevo);
                            }}
                        />
                      }
                      label="¿El Automovil es nuevo?"
                      labelPlacement="top"
                      style={{ marginTop: "25px", marginRight: "20px" }}
                    />
                  </FormControl>
                </Grid>                
              :''}
              {checkedAuto ? 
                 <Grid item xs={4} justifyContent={"center"} className="flex justify-content-center">       
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Checkbox
                            defaultChecked={checkAutoHibrido}
                            onClick={() => {
                              setcheckAutoHibrido(!checkAutoHibrido);
                            }}
                        />
                      }
                      label="¿El automovil es hibrido?"
                      labelPlacement="top"
                      style={{ marginTop: "25px", marginRight: "20px" }}
                    />
                  </FormControl>
                </Grid>                
              :''}
              {checkedAlcohol ? 
                 <Grid item xs={4}>
                 <FormControl fullWidth>
                   <FormLabel id="group-label" error={!!errorsTab4_2.LitrosTotales}>Litros totales</FormLabel>
                   <Controller
                     render={({ field }) => (
                       <TextField
                         {...field}
                         id="outlined-disabled"
                         inputProps={{
                           startAdornment: (
                               <InputAdornment position="start"></InputAdornment>
                           ),
                           onKeyPress: (event) => {
                             if (!/[0-9.]/.test(event.key)) {
                               event.preventDefault();
                           }
                           },
                       }}         
                         helperText={errorsTab4_2?.LitrosTotales?.message}         
                         error={!!errorsTab4_2.LitrosTotales}
                       ></TextField>
                     )}
                     name="LitrosTotales"
                     control={controlTab4_2}
                   ></Controller>
                 </FormControl>
               </Grid>          
              :''}
              {checkedCigarros ? 
                 <Grid item xs={4}>
                 <FormControl fullWidth>
                   <FormLabel id="group-label" error={!!errorsTab4_2.CigarrosTotales}>Cigarros totales</FormLabel>
                   <Controller
                     render={({ field }) => (
                       <TextField
                         {...field}
                         id="outlined-disabled"
                         inputProps={{
                           startAdornment: (
                               <InputAdornment position="start"></InputAdornment>
                           ),
                           onKeyPress: (event) => {
                             if (!/[0-9.]/.test(event.key)) {
                               event.preventDefault();
                           }
                           },
                       }}         
                         helperText={errorsTab4_2?.CigarrosTotales?.message}         
                         error={!!errorsTab4_2.CigarrosTotales}
                       ></TextField>
                     )}
                     name="CigarrosTotales"
                     control={controlTab4_2}
                   ></Controller>
                 </FormControl>
               </Grid>          
              :''}
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Total Factura Unitario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="TotalUnitario"
                          disabled={true}
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}                      
                          error={!!errorsTab4_2.TotalUnitario}
                        ></TextField>
                      )}
                      name="TotalUnitario"
                      control={controlTab4_2}
                    ></Controller>
                  </FormControl>
                </Grid>               
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                  <Button
                    startIcon={<Icon>checked</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={isEdit ? botonStyleEditar : botonStyleAgregar}
                    type="submit"
                    onClick={GuardarTab4_2}
                  >
                       {isEdit ? "Editar" : "Agregar"}                   
                  </Button>
                  {isEdit ?  <Button
                    startIcon={<Icon>close</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px' }}
                    sx={{
                      backgroundColor: '#DAD8D8',
                      color: 'black',
                      '&:hover': { backgroundColor: '#BFBABA' },
                    }}
                    onClick={() => {
                      setisEdit(false);
                      setcheckedCambbioAranceles(true);
                      setValueTab4_2("NumeroItem",(parseInt(datosTab4_2.NumeroItem) + 1).toString())
                      resetTab4_2(DefaultValuesTab4_2);
                      setcheckedAuto(false);
                      setcantidadDisabed(true);
                      setcheckedCambbioAranceles(true);
                      setcheckedCigarros(false);
                      setcheckedAlcohol(false);
                    }}
                  >
                    Cancelar edición
                  </Button> : ""}
                </Grid>
                <Grid item xs={5}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Items" />
                  </Divider>
                </Grid>
                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} >
                  <Stack direction="row" spacing={1}>
                    <label className='mt-8'>Filas por página:</label>
                    <FormControl sx={{ minWidth: 50 }} size="small">
                      {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={FilasItems}
                        // label="Filas"  
                        onChange={handleChangeFilasItems}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Barra de Busqueda en la Tabla */}
                    <TextField
                      style={{ borderRadius: '10px' }}
                      placeholder='Buscar'
                      value={searchItems}
                      onChange={handleSearchChangeItems}
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

                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <div className='center' style={{ width: '95%', margin: 'auto' }}>

                    <Table
                      columns={columnsTableItems}
                      dataSource={filteredRowsTableItems}
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
                      size="small"                   
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                  <Button
                    startIcon={<Icon>checked</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px', marginRight: '10px' }}
                    sx={{
                      backgroundColor: '#634A9E',
                      color: 'white',
                      '&:hover': { backgroundColor: '#6e52ae' },
                    }}
                    onClick={FinalizarItems}
                  >
                    Finalizar factura
                  </Button>

                </Grid>
              </Grid>
              </form>
            </Collapse>
          </TabPanel>

          <TabPanel value={value} index={4} dir={theme.direction}>
            <form onSubmit={handleSubmitTab5((_data) => { })}>
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
              <Grid item textAlign="center" xs={12}>
                <Typography variant="h5" color="rgb(55, 188, 155)">
                  II. Condiciones de la Transacción
                </Typography>
              </Grid>
            </Grid>

            {/* HEADER DE LA TABLA */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>No.</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>CONDICIÓN</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Typography>VALOR ASIGNADO CONDICIÓN</Typography>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #1 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>24</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Existen restricciones a la cesión o utilización de las mercancías por el
                    comprador, distintas de las excepciones previstas en el artículo 1.1 a) del
                    Acuerdo
                    <br></br>
                    <br></br>
                  </Typography>
                </FormControl>
                
              </Grid>

              <Grid item xs={3}>
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errorsTab5.campo24} fullWidth={true}>
                      <FormLabel></FormLabel>
                      <div className={`${classes.radioContainer} ${!!errorsTab5.campo24 ? classes.radioError : ''}`}>
                        <RadioGroup
                          row
                          name="simple-radio"
                          aria-label="simple-radio"
                        >
                          <FormControlLabel
                            value="True"
                            checked={datosTab5['campo24'] == "True" ? true : false}
                            control={<Radio />}
                            label="Si"
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                          <FormControlLabel
                            value="False"
                            control={<Radio />}
                            checked={datosTab5['campo24'] == "False" ? true : false}
                            label="No"
                            onChange={(e) => {        
                              field.onChange(e);
                            }}
                          />
                        </RadioGroup>
                      </div>
                      {/* Aquí puedes agregar un mensaje de error si es necesario */}
                    </FormControl>
                  )}
                  name="campo24"
                  control={controlTab5}
                />
            </Grid>



            </Grid>

            {/* FILA #2 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>24.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography> Indicar en que consiste la o las restricciones  <br></br></Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                         error={!!errorsTab5.campo24_1}
                         disabled={!Campo24}
                        placeholder="Valor"
                        size="small"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                      ></TextField>
                    )}
                    name="campo24_1"
                    control={controlTab5}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #3 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>25</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Depende la venta o el precio de alguna condición o contraprestación, con
                    relación a las mercancías a valorar  <br></br> <br></br> <br></br>
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                      <Controller
                        render={({ field }) => (
                          <FormControl error={!!errorsTab5.campo25} fullWidth={true}>
                            <FormLabel></FormLabel>
                            <div className={`${classes.radioContainer} ${!!errorsTab5.campo25 ? classes.radioError : ''}`}>
                              <RadioGroup
                                row
                                name="simple-radio"
                                aria-label="simple-radio"
                              >
                                <FormControlLabel
                                  value="True"
                                  control={<Radio />}
                                  checked={datosTab5['campo25'] == "True" ? true : false}
                                  label="Si"
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                />
                                <FormControlLabel
                                  value="False"
                                  control={<Radio />}
                                  checked={datosTab5['campo25'] == "False" ? true : false}
                                  label="No"
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                />
                              </RadioGroup>
                            </div>
                          </FormControl>
                        )}
                        name="campo25"
                        control={controlTab5}
                      />
              </Grid>
            </Grid>        

            {/* FILA #4 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>25.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    {' '}
                    Indicar en que consiste la condición o contrapresentación, y si es cuantificable
                    consignar el monto en la casilla Nro. 42.1{' '}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        size="small"
                        disabled={!Campo25}
                        error={!!errorsTab5.campo25_1}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                      ></TextField>
                    )}
                    name="campo25_1"
                    control={controlTab5}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #5 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>26</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Está la venta condicionada a revertir directa o indirectamente al vendedor parte
                    alguna del producto de la reventa o de cualquier cesión o utilización posterior
                    de las mercancías, por el comprador, en caso afirmativo, declara el monto de la
                    reversión en la casilla Nro. 42
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                  <Controller
                    render={({ field }) => (
                      <FormControl error={!!errorsTab5.campo26} fullWidth={true}>
                        <FormLabel></FormLabel>
                        <div className={`${classes.radioContainer} ${!!errorsTab5.campo26 ? classes.radioError : ''}`}>
                          <RadioGroup
                            row
                            name="simple-radio"
                            aria-label="simple-radio"
                          >
                            <FormControlLabel
                              value="True"
                              control={<Radio />}
                              checked={datosTab5['campo26'] == "True" ? true : false}
                              label="Si"
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="False"
                              control={<Radio />}
                              checked={datosTab5['campo26'] == "False" ? true : false}
                              label="No"
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          </RadioGroup>
                        </div>
                      </FormControl>
                    )}
                    name="campo26"
                    control={controlTab5}
                  />
              </Grid>
            </Grid>

            {/* FILA #6 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Existe vinculación entre el vendedor y el comprador<br></br> <br></br>  <br></br></Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                  <Controller
                    render={({ field }) => (
                      <FormControl error={!!errorsTab5.campo27} fullWidth={true}>
                        <FormLabel></FormLabel>
                        <div className={`${classes.radioContainer} ${!!errorsTab5.campo27 ? classes.radioError : ''}`}>
                          <RadioGroup
                            row
                            name="simple-radio"
                            aria-label="simple-radio"
                          >
                            <FormControlLabel
                              value="True"
                              control={<Radio />}
                              checked={datosTab5['campo27'] == "True" ? true : false}
                              label="Si"
                              onChange={(e) => {

                                field.onChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="False"
                              control={<Radio />}
                              checked={datosTab5['campo27'] == "False" ? true : false}
                              label="No"
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          </RadioGroup>
                        </div>
                      </FormControl>
                    )}
                    name="campo27"
                    control={controlTab5}
                  />
              </Grid>
            </Grid>

            {/* FILA #7 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Indicar si la vinculación ha influido en el precio <br></br> <br></br>
                  <br></br></Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        size="small"
                        disabled={!Campo27}
                        error={!!errorsTab5.campo27_1}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                      ></TextField>
                    )}
                    name="campo27_1"
                    control={controlTab5}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #8 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Indicar si la vinculación ha influido en el precio</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                  <Controller
                    render={({ field }) => (
                      <FormControl error={!!errorsTab5.campo27_2} fullWidth={true}>
                        <FormLabel></FormLabel>
                        <div className={`${classes.radioContainer} ${!!errorsTab5.campo27_2 ? classes.radioError : ''}`}>
                          <RadioGroup
                            row
                            name="simple-radio"
                            aria-label="simple-radio"
                          >
                            <FormControlLabel
                              value="True"
                              control={<Radio />}
                              checked={datosTab5['campo27_2'] == "True" ? true : false}
                              disabled={!Campo27}
                              label="Si"
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="False"
                              control={<Radio />}
                              checked={datosTab5['campo27_2'] == "False" ? true : false}
                              disabled={!Campo27}
                              label="No"
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          </RadioGroup>
                        </div>
                      </FormControl>
                    )}
                    name="campo27_2"
                    control={controlTab5}
                  />
              </Grid>

            </Grid>

            {/* FILA #9 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>28</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Existen pagos indirectos y/o descuentos retroactivos <br></br> <br></br> <br></br></Typography>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                  <Controller
                    render={({ field }) => (
                      <FormControl error={!!errorsTab5.campo28} fullWidth={true}>
                        <FormLabel></FormLabel>
                        <div className={`${classes.radioContainer} ${!!errorsTab5.campo28 ? classes.radioError : ''}`}>
                          <RadioGroup
                            row
                            name="simple-radio"
                            aria-label="simple-radio"
                          >
                            <FormControlLabel
                              value="True"
                              control={<Radio />}
                              checked={datosTab5['campo28'] == "True" ? true : false}
                              label="Si"
                              onChange={(e) => {
                                
                                field.onChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="False"
                              control={<Radio />}
                              checked={datosTab5['campo28'] == "False" ? true : false}
                              label="No"
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          </RadioGroup>
                        </div>
                      </FormControl>
                    )}
                    name="campo28"
                    control={controlTab5}
                  />
              </Grid>
            </Grid>

            {/* FILA #10 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>28.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Indicar en que concepto y el monto declarado en la casilla Nro. 40
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        size="small"
                        disabled={!Campo28}
                        error={!!errorsTab5.campo28_1}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                      ></TextField>
                    )}
                    name="campo28_1"
                    control={controlTab5}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #11 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>29</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Existen cánones y derechos de licencia que el comprador tenga que pagar directa
                    o indirectamente <br></br> <br></br> <br></br>
                  </Typography>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                  <Controller
                    render={({ field }) => (
                      <FormControl error={!!errorsTab5.campo29} fullWidth={true}>
                        <FormLabel></FormLabel>
                        <div className={`${classes.radioContainer} ${!!errorsTab5.campo29 ? classes.radioError : ''}`}>
                          <RadioGroup
                            row
                            name="simple-radio"
                            aria-label="simple-radio"
                          >
                            <FormControlLabel
                              value="True"
                              control={<Radio />}
                              checked={datosTab5['campo29'] == "True" ? true : false}
                              label="Si"
                              onChange={(e) => {
                                
                                field.onChange(e);
                              }}
                            />
                            <FormControlLabel
                              value="False"
                              control={<Radio />}
                              checked={datosTab5['campo29'] == "False" ? true : false}
                              label="No"
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          </RadioGroup>
                        </div>
                      </FormControl>
                    )}
                    name="campo29"
                    control={controlTab5}
                  />
              </Grid>
            </Grid>

            {/* FILA #12 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>29.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Indicar su naturaleza y el monto declarado en la casilla Nro. 42.9
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        size="small"
                        disabled={!Campo29}
                        error={!!errorsTab5.campo29_1}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                      ></TextField>
                    )}
                    name="campo29_1"
                    control={controlTab5}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* BOTONES */}
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
            >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E',
                  color: 'white',
                  '&:hover': { backgroundColor: '#6e52ae' },
                }}
                type="submit"
                onClick={GuardarTab5}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8',
                  color: 'black',
                  '&:hover': { backgroundColor: '#BFBABA' },
                }}
                onClick={DialogCancelarDeva}
              >
                Cancelar
              </Button>
            </Grid>
            </form>
          </TabPanel>

          <TabPanel value={value} index={5} dir={theme.direction}>
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
              <Grid item textAlign="center" xs={12}>
                <Typography variant="h5" color="rgb(55, 188, 155)">
                  III. Determinación del Valor en Aduana, en Pesos Centroamericanos
                </Typography>
              </Grid>
            </Grid>

            {/* HEADER DE LA TABLA */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>#</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>BASE DE CÁLCULO</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Typography>VALOR PESO C.A. (USD)</Typography>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #1 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>39</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Precio según factura</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        size="small"
                        error={!!errorsTab6.campo39}
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo39"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #2 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>40</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography> Pagos indirectos y/o descuentos retroactivos </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo40}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo40"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #3 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>41</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Precio realmente pagado o por pagar por las mercancías importadas (39 + 40)
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        disabled={true}
                        size="small"
                        placeholder="Valor"
                        error={!!errorsTab6.campo41}
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                      }}
                      ></TextField>
                    )}
                    name="campo41"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #4 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    ADICIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS MERCANCÍAS IMPORTADAS
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              </Grid>
            </Grid>

            {/* FILA #5 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Monto de la condición o contraprestación a que se refiere la casilla 25.1
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_1}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_1"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #6 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Monto de la reversión a la que se refiere la casilla 25</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_2}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_2"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #7 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.3</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos por comisiones y correlajes, salvo los de comisiones de compra
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_3}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_3"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #8 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.4</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Gastos y costos de envases y embalajes</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_4}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_4"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #9 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.5</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los materiales consumidos en la producción de las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_5}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_5"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #10 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.6</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de las herramientos, matrices, moldes, y elementos análogos utilizados
                    para la producción de las mercancías
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_6}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_6"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #11 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.7</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los materiales consumidos en la producción de las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_7}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_7"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #12 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.8</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de ingeniería, creación y perferccionamiento, trabajos artísticos, diseños
                    y planos y croquis realizados fuera del país de importación y necesarios para la
                    producción de mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_8}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_8"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #13 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.9</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los cánones y derechos de licencia, a que se refiere la casilla 29.1
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_9}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_9"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #14 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.10</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de transporte de la mercadería importada hasta el puerto o lugar de
                    importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_10}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_10"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #15 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.11</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de carga, descarga y manipulación ocasionadas por el transporte de las
                    mercaderías importadas hasta el puerto o lugar de importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_11}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_11"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #16 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.12</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Gastos y costos de envases y embalajes</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo42_12}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo42_12"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #17 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>43</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Total de ajustes al precio realmente pagado o por pagar (sumatoria de 42.1 a
                    42.12)
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        disabled={true}
                        size="small"
                        placeholder="Valor"
                        error={!!errorsTab6.campo43}
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                      }}
                      ></TextField>
                    )}
                    name="campo43"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #18 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    DEDUCCIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS MERCANCÍAS IMPORTADAS
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              </Grid>
            </Grid>

            {/* FILA #19 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de construcción, armado, montaje, mantenimiento o asistencia técnica
                    realizados después de la importación, en relación con las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo44_1}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo44_1"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #20 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Costos de transporte posterior al puerto o lugar de importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo44_2}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo44_2"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #21 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.3</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Derechos e impuestos aplicables en el país de importación</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo44_3}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo44_3"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #22 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.4</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Monto de intereses</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo44_4}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo44_4"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #23 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.5</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Otras deducciones legalmente aplicables</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo44_5}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo44_5"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #24 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>45</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Total deducciones al precio realmente pagado o por pagar por las mercancías
                    importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo45}
                        disabled={true}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          onKeyPress: (event) => {
                            if (!/[0-9.]/.test(event.key)) {
                              event.preventDefault();
                          }
                          },
                      }}
                      ></TextField>
                    )}
                    name="campo45"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #25 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>46</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>VALOR EN ADUANA (41 + 43 - 45)</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{ borderRadius: '3px' }}
                        sx={{ backgroundColor: 'rgb(255,255,255)' }}
                        id="outlined-disabled"
                        placeholder="Valor"
                        error={!!errorsTab6.campo46}
                        disabled={true}
                        size="small"
                        inputProps={{
                          startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),                         
                      }}
                      ></TextField>
                    )}
                    name="campo46"
                    control={controlTab6}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            {/* BOTONES */}
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
            >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E',
                  color: 'white',
                  '&:hover': { backgroundColor: '#6e52ae' },
                }}
                onClick={GuardarTab6}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8',
                  color: 'black',
                  '&:hover': { backgroundColor: '#BFBABA' },
                }}
                onClick={DialogCancelarDeva}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={6} dir={theme.direction}>

           <div className="relative flex flex-col flex-auto min-w-0 overflow-hidden">
           <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
                <svg
                  className="-z-1 absolute inset-0 pointer-events-none"
                  viewBox="0 0 960 540"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMax slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Box
                    component="g"
                    sx={{ color: 'divider' }}
                    className="opacity-20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="100"
                  >
                    <circle r="234" cx="196" cy="23" />
                    <circle r="234" cx="790" cy="491" />
                  </Box>
                </svg>
                <div className="flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.05 } }}
                  >
                    <img
                      height="50px"
                      width="200px"
                      src="https://i.ibb.co/tMqLY0W/SIMEXPRO-LETRAS-LOGO-CORTITO.png"
                      alt="logo"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                  >
                    <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
                      ¡Muchas gracias por agregar tu declaracion de valor!
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.15 } }}
                  >
                    <Typography
                      className="mt-12 sm:text-2xl text-center tracking-tight"
                      color="text.secondary"
                    >
                      Recuerda revisar todos los datos de tu declaración de valor para evitar cualquier inconveniente.
                      <br />
                      Puedes regresar a las secciones anteriores y modificar los datos digitados si cometiste algún error.
                      <br />
                      También puedes editar tu declaración de valor desde el apartado de edición que se encuentra en el índice de declaración de valor.
                      <br />
                      Recuerda que podrás editar tu DEVA siempre y cuando no la hayas dado por finalizada.
                      <br />
                      <br />
                      ¿Deseas salir de la creación de tu declaración de valor?
                      <br />
                    </Typography>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
                  <Button
                    startIcon={<Icon>arrow_back</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px' }}
                    sx={{
                      backgroundColor: '#634A9E', color: 'white',
                      "&:hover": { backgroundColor: '#6e52ae' },
                    }}
                    onClick={DialogSalir}
                  >
                    Salir
                  </Button>
                  </motion.div>
                </div>
                </div>
           </div>
          </TabPanel>

        </SwipeableViews>
      </Box>

      <Dialog
            open={LugarEmbarque}
            fullWidth={true}
            onClose={DialogLugarEntrega}
            maxWidth={"md"}
            //scroll={"paper"}
        >
            <DialogTitle id="alert-dialog-title">
              Lugares de Embarque
            </DialogTitle>
              <IconButton
                  aria-label="close"
                  onClick={() => {DialogLugarEntrega()
                    CerrarDialogLugarEmbarque()}}
                  sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                  }}
              >
                  <CloseIcon />
              </IconButton>
            <DialogContent dividers>
                <Grid container spacing={2} style={{marginBottom:"15px"}}>
                      <Grid item xs={8}>
                          <TextField
                              placeholder="Buscar"
                              size="xs"
                              fullWidth={true}
                              value={TextLugarEmbarque}
                              inputProps={{
                                  startAdornment: (<InputAdornment position="start"></InputAdornment>),
                                  style: {
                                    textTransform: "uppercase"
                                  }
                              }}
                              onChange={handleChangeLugarEmbarque}
                          ></TextField>
                      </Grid>
                      <Grid item xs={4} >
                          <Button
                              fullWidth={true}
                              startIcon={<Icon>search</Icon>}
                              variant="contained"
                              color="primary"
                              style={{ 
                                borderRadius: "10px",
                                marginTop: "6px"
                              }}
                              sx={{
                                  backgroundColor: '#634A9E',
                                  color: 'white',
                                  '&:hover': { backgroundColor: '#6e52ae' },
                              }}
                              onClick={EnviarData}
                          >
                              Buscar
                          </Button>
                      </Grid>
                </Grid>
                  <br/>      
                {/* Declaracion de la tabla */}
                  <div className="center" style={{ width: "95%", margin: "auto" }}>
                      <Stack direction="row" spacing={1} style={{justifyContent: "end"}}>
                          <label className="mt-8">Filas por página:</label>
                          <FormControl sx={{ minWidth: 50 }} size="small">
                              <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={filasLugarEmbarque}
                                  onChange={handleChangeFilasLugarEmbarque}
                              >
                                  <MenuItem value={10}>10</MenuItem>
                                  <MenuItem value={25}>25</MenuItem>
                                  <MenuItem value={50}>50</MenuItem>
                              </Select>
                          </FormControl>

                          {/* Barra de Busqueda en la Tabla */}
                          <TextField
                              style={{ borderRadius: "10px" }}
                              placeholder="Buscar"
                              value={SearchTextLugarEmbarque}
                              onChange={handleSearchChangeLugarEmbarque}
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
                      </Stack>
                      <br/>
                      <Table
                          columns={columnsLugarmbarque}
                          dataSource={filteredRowsLugarEmbarque}
                          size="sm"
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
            </DialogContent>
            <DialogActions>
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
                    onClick={() => {DialogLugarEntrega()
                      CerrarDialogLugarEmbarque()}}
                  >
                    Cancelar
                  </Button>
            </DialogActions>
        </Dialog>

      {/*Dialog eliminar Items*/}
      <Dialog
        open={EliminarItem}
        fullWidth={true}
        onClose={DialogEliminarItem}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de eliminación de Items
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este item de la factura?
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
              onClick={AccionEliminarItem}
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
              onClick={DialogEliminarItem}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

       {/*Dialog eliminar Facturas*/}
       <Dialog
        open={EliminarFactura}
        fullWidth={true}
        onClose={DialogEliminarFactura}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de eliminación de factura
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar esta factura?
            <br></br>
            El eliminar esta factura conlleva eliminar los items que esta posee.
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
              onClick={AccionEliminarFactura}
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
              onClick={DialogEliminarFactura}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={SalirDEVA}
        fullWidth={true}
        onClose={DialogSalir}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Finalizacion Declaración de valor
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Si finalizas tu declaración de valor no podrás volverla a editar
          <br></br>
          ¿Deseas dar por finalizada esta declaración de valor?
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
              startIcon={<Icon>arrow_back</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={() => { navigate('/Declaracion_Valor/Index');}}
            >
             Salir
            </Button>

            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color={"primary"}
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={botonStyle}
              onClick={Salir2}
            >
             Finalizar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
            open={ArancelesDialog}
            fullWidth={true}
            onClose={DialogClasificacionAranceles}
            maxWidth={"md"}
            //scroll={"paper"}
        >
            <DialogTitle id="alert-dialog-title">
              Clasificación Arancelaría
            </DialogTitle>
              <IconButton
                  aria-label="close"
                  onClick={() => {DialogClasificacionAranceles()
                    CerrarDialogAranceles()}}
                  sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                  }}
              >
                  <CloseIcon />
              </IconButton>
            <DialogContent dividers>
                <Grid container spacing={2} style={{marginBottom:"15px"}}>
                      <Grid item xs={8}>
                          <TextField
                              placeholder="Buscar"
                              size="xs"
                              fullWidth={true}
                              value={TextAranceles}
                              inputProps={{
                                maxLength: 15,
                                startAdornment: (
                                  <InputAdornment position="start">
                                      <IconButton edge="start">
                                          <SearchIcon />
                                      </IconButton>
                                  </InputAdornment>
                              ),
                                onKeyPress: (event) => {
                                  if (!/[0-9.]/.test(event.key)) {
                                    event.preventDefault();
                                }
                                },
                            }}                           
                              onChange={handleChangeAranceles}
                          ></TextField>
                      </Grid>
                      <Grid item xs={4} >
                          <Button
                              fullWidth={true}
                              startIcon={<Icon>search</Icon>}
                              variant="contained"
                              color="primary"
                              style={{ 
                                borderRadius: "10px",
                                marginTop: "6px"
                              }}
                              sx={{
                                  backgroundColor: '#634A9E',
                                  color: 'white',
                                  '&:hover': { backgroundColor: '#6e52ae' },
                              }}
                              onClick={EnviarDataAranceles}
                          >
                              Buscar
                          </Button>
                      </Grid>
                </Grid>
                  <br/>      
                {/* Declaracion de la tabla */}
                  <div className="center" style={{ width: "95%", margin: "auto" }}>
                      <Stack direction="row" spacing={1} style={{justifyContent: "end"}}>
                          <label className="mt-8">Filas por página:</label>
                          <FormControl sx={{ minWidth: 50 }} size="small">
                              <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={filasAranceles}
                                  onChange={handleChangeFilasAranceles}
                              >
                                  <MenuItem value={10}>5</MenuItem>
                                  <MenuItem value={10}>15</MenuItem>
                                  <MenuItem value={25}>25</MenuItem>
                              </Select>
                          </FormControl>

                          {/* Barra de Busqueda en la Tabla */}
                          <TextField
                              style={{ borderRadius: "10px" }}
                              placeholder="Buscar"
                              value={SearchTextAranceles}
                              onChange={handleSearchChangeAranceles}
                              size="small"
                              variant="outlined"
                              inputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                      <IconButton edge="start">
                                          <SearchIcon />
                                      </IconButton>
                                  </InputAdornment>
                              ),
                              }}
                          />
                      </Stack>
                      <br/>
                      <Table
                          columns={columnsAranceles}
                          dataSource={filteredRowsAranceles}
                          size="sm"
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
            </DialogContent>
            <DialogActions>
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
                    onClick={() => {DialogClasificacionAranceles()
                      CerrarDialogAranceles()}}
                  >
                    Cancelar
                  </Button>
            </DialogActions>
        </Dialog>

        <Dialog
        open={CancelarDeva}
        fullWidth={true}
        onClose={DialogCancelarDeva}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Cancelar la creación de la declaración de valor
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          ¿Desea cancelar la creación de esta declaración de valor?
          <br></br>
          Si presiona en "Cancelar sin guardar", el registro actual se eliminará y no se guardará ningún cambio. 
          <br></br>
          Si presiona en "Guardar y Salir", se guardarán los cambios y la declaración de valor se cerrará.
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
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={botonStyle}
              onClick={GuardarYSalir}
            >
             Guardar y Salir
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={CancelarNoGuardar}
            >
             Cancelar sin Guardar
            </Button>

          </Grid>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

export default Declaracion_Valor_Crear;
