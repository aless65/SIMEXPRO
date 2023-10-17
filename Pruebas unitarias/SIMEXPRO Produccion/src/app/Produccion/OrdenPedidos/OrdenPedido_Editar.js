import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Button,
  FormControl,
  Icon,
  TextField,
  InputAdornment,
  Autocomplete,
  Checkbox,
  Collapse,
  IconButton,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Switch,
  Select,
  Menu,
  Stack,
} from '@mui/material';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { ToastWarning, ToastError, ToastInfo, ToastSuccessGuardado, ToastWarningPersonalizado, ToastSuccessEditar, ToastSuccessEliminar, ToastWarningYaExiste } from 'src/styles/toastsFunctions';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import FormLabel from '@mui/material/FormLabel';
import { useEffect } from 'react';
import MaterialesService from 'src/app/Inventario/Materiales/MaterialesService';
import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';
// Import ddls
import Load_DDLs from 'src/app/loadDDLs/Load_DDL';
// Import del servicio
import OrdenPedidoService from './OdenPedidoService';
import { makeStyles } from '@mui/styles';
import LoadingIcon from "src/styles/iconoCargaTabla";
import { Table } from "antd";
import 'src/styles/custom-pagination.css'
import { useLocation } from "react-router-dom";
import History from 'src/@history/@history'; const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  cardImage: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  cardDescription: {
    flex: 1,
  },
  scrollContainer: {
    maxHeight: '213px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
  },

  card: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  cardMedia: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  cardContent: {
    flex: 1,
  },

  searchField: {
    borderRadius: '10px',
    width: '100%',
    maxWidth: '1000px',
  },
}));


let renderCount = 0;

const defaultValues = {
  peor_Id: "",
  prov_Id: null,
  duca_Id: null,
  peor_FechaEntrada: null,
  peor_Obsevaciones: "",
  peor_DireccionExacta: "",
  pais: null,
  provincia: null,
  ciudad: null,
  peor_Impuestos: "",
  peor_Codigo: ""
}

const defaultTab2Values = {
  prod_Cantidad: "",
  mate_Id: null,
  pedi_Id: "",
  prod_Precio: "",
}

const defaultTab2ValuesConDuca = {
  pedi_Id: "",
  mate_Descripcion: "",
  prod_Cantidad: "",
  prod_Precio: "",
  item_Id: ""
}

const defaultDialogValues = {
  orco_Id: null,
  code_Id: null
}

const schemaTab1Fields = yup.object().shape({
  peor_Codigo: yup.string().required(),
  prov_Id: yup.object().required(),
  peor_Obsevaciones: yup.string().required(),
  peor_DireccionExacta: yup.string().required(),
  peor_FechaEntrada: yup.date().nullable().required("").min(new Date(1900, 0, 1), "Ingrese una fecha mayor a 01/01/1900"),
  ciudad: yup.object().required(""),
  provincia: yup.object().required(""),
  pais: yup.object().required(""),

});

const schemaTab2Fields = yup.object().shape({
  prod_Cantidad: yup.number().required(),
  prod_Precio: yup.number().required(),
});

const schemaDialogFields = yup.object().shape({
  orco_Id: yup.object().required(),
});

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


function OrdenPedido_Editar() {
  const [message, setMessage] = useState();
  const [Impuestos, setImpuestos] = useState("");
  const [canClick, setCanClick] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const classes = useStyles();
  const MaterialesServices = MaterialesService();
  const [DataTabla, setDataTabla] = useState([])
  const [originalData, setOriginalData] = useState([]);
  const OrdenPedidoServices = OrdenPedidoService();
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [data, setData] = useState([]);
  const load_DDLs = Load_DDLs()
  const [EliminarModalDuca, SetEliminarModalDuca] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValueTabs] = React.useState(0);
  const [searchText, setSearchText] = useState('');
  const [Proveedores, setProveedoresDDL] = useState([]);
  const [ProvinciaDDL, setProvinciaDDL] = useState([]);
  const [PaisDDL, setPaisDDL] = useState([]);
  const [PODDL, setPODDL] = useState([]);
  const [POdetalleDDL, setPOdetalleDDL] = useState([]);
  const [CiudadDDL, setCiudadDDL] = useState([]);
  const [filas, setFilas] = React.useState(10);
  const [No_Duca, setNo_Duca] = useState(1)
  const [DatosDetalles, setDatosDetalles] = useState([]);
  const [editingMode, setEditingMode] = useState(false);
  const location = useLocation();
  const [Finalizacion, setFinalizacion] = useState(false);
  const [AsignarMateriales, setAsignarMateriales] = useState(false);
  const [EditDetalle, setEditDetalle] = useState(false)
  const [UltimoId, setUltimoId] = useState('');
  const [Eliminar, setEliminar] = useState(false);
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [OrdePedidoID, setOrdenPedidoID] = useState("");
  const [OrdePedidoIDEliminar, setOrdePedidoIDEliminar] = useState("");
  const [materialSeleccionadoPrevio, setmaterialSeleccionadoPrevio] = useState("");
  const [keya, setKeya] = useState({})

  //VARIABLES EN EL APARTADO DE ITEMS 
  const [HayDuca, setHayDuca] = useState(false);
  const [MaterialesItems, setMaterialesItems] = useState([]);

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
  });
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const handleChangeIndex = (index) => {
    setValueTabs(index);
  };


  //aqui se almacena el json con el registro a editar
  const myData = location.state


  /***********************************************************************/

  //Cargado de las variables DDL
  async function ddls() {
    setPaisDDL(await load_DDLs.paises());
    setPODDL(await load_DDLs.OrdenCompra());
  }

  //Constante para cargar el DDL de Proveedores
  const ProveedoresGet = async () => {
    try {
      const data = await load_DDLs.Proveedores()
      setProveedoresDDL(data)
    } catch (error) {

    }
  };

  //Constante para cargar el DDL de Provincias
  async function ddlProvincia(id) {
    try {
      setProvinciaDDL(await load_DDLs.ProvinciasPorPais(id));
    }
    catch (error) {

    }
  }

  //Constante para cargar el DDL de Detalles de la Órden de Compra
  async function ddlPODetalle(id) {
    try {
      setPOdetalleDDL(await load_DDLs.OrdenCompraDetalle(id));
    }
    catch (error) {

    }
  }


  //Constante para cargar el DDL de Ciudades por Provincias
  async function ddlCiudades(id) {
    try {
      setCiudadDDL(await load_DDLs.CiudadesPorProvincia(id));
    }
    catch (error) {

    }
  }



  /***********************************************************************/



  /***********************************************************************/

  //Controlador del dialog(modal) de Finalizcion de Pedido
  const DialogFinalizarPedido = () => {
    setFinalizacion(!Finalizacion);
  }

  //Constante de la petición para finalizar la órden
  const FinalizarPedidoProduccion = async () => {

    try {
      const response = await OrdenPedidoServices.FinalizarPedidosOrden(myData.peor_Id);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();

        History.push('/OrdenPedido/index')
      }
    } catch (error) {

      ToastError();
    }
  }

  /***********************************************************************/



  /***********************************************************************/

  //Constante de los campos que se pueden filtrar
  const camposToFilter = ["key", "prod_Cantidad", "prod_Precio", "mate_Descripcion"];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = DatosDetalles.filter((row) => {
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

  /***********************************************************************/





  /***********************************************************************/

  //Constante para cargar los datos en la tabla de los detalles de la órden
  async function cargarDatosTabla() {
    try {
      setDatosDetalles(await OrdenPedidoServices.ListadoPedidosOrdenDetallePorId(myData.peor_Id));

    } catch (error) {
      console.error(error.message);
    }
  }

  /***********************************************************************/


  //Constante que me valida si el id de la duca existe o no
  const Duca = async (Id) => {
    try {
      console.log(Id)
      if (Id) { // Verificar si el campo no está vacío ni nulo
        setNo_Duca(await OrdenPedidoServices.ListadoDuca(Id));
        setHayDuca(await OrdenPedidoServices.ListadoDuca(Id) == 0 ? false : true);

        if (datosWatch['duca_Id'] !== null) {
          setHayDuca(await OrdenPedidoServices.ListadoDuca(Id) == 1 ? ItemsDuca(datosWatch['duca_Id']) : null);
        }
      } else {
        // Si el campo está vacío o nulo, no mostrar mensaje de error
        setNo_Duca(null);
        setHayDuca(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  const ItemsDuca = async (NumeroDuca) => {
    try {
      const response = await OrdenPedidoServices.ItemsDuca(NumeroDuca);
      console.log(response);
      setMaterialesItems(response);
    }
    catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }

  }

  /***********************************************************************/

  //USEFFECT
  useEffect(() => {
    ProveedoresGet();
    materialesGetData();
    ddls()
    setValue('peor_Impuestos', myData.peor_Impuestos);
    setImpuestos(myData.peor_Impuestos)

    if (myData.peor_Impuestos > 0) {
      setChecked1(true)
    }

    console.log(myData)
    Duca(myData.duca_No_Duca);
    ItemsDuca(myData.duca_No_Duca);

    setValue('peor_Codigo', myData.peor_Codigo);
    setValue('prov_Id', { value: myData.prov_Id, label: myData.prov_NombreCompania });
    setValue('duca_Id', myData.duca_No_Duca);
    setValue('peor_FechaEntrada', myData.peor_FechaEntrada);
    setValue('pais', { value: parseInt(myData.pais_Id), label: myData.pais_Codigo + '-' + myData.pais_Nombre });
    setValue('provincia', { value: parseInt(myData.pvin_Id), label: myData.pvin_Nombre });
    ddlProvincia(myData.pais_Id)
    setValue('ciudad', { value: parseInt(myData.ciud_Id), label: myData.ciud_Nombre });
    ddlCiudades(myData.pvin_Id)
    setValue('peor_DireccionExacta', myData.peor_DireccionExacta);
    setValue('peor_Obsevaciones', myData.peor_Obsevaciones);
    setUltimoId(myData.peor_Id);
    setValue('peor_Id', myData.peor_Id)
    cargarDatosTabla()



  }, []);

  /***********************************************************************/






  /***********************************************************************/

  //Constante para el viewmodel del tab1
  const { handleSubmit, control, formState, watch, setValue } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schemaTab1Fields),
  });

  //Constante para el viewmodel del tab2
  const { handleSubmit: handleSubmit1, control: control1, formState: formState1, reset: reset1, watch: watch1, setValue: setValue1 } = useForm({
    defaultTab2Values,
    mode: "all",
    resolver: yupResolver(schemaTab2Fields),
  });

  //Constante para el viewmodel del modal de asignar materiales
  const { handleSubmit: handleSubmit2, control: control2, formState: formState2, reset: reset2, watch: watch2, setValue: setValue2 } = useForm({
    defaultDialogValues,
    mode: "all",
    resolver: yupResolver(schemaDialogFields),
  });


  //Constante para el viewmodel del modal de asignar materiales
  const { handleSubmit: handleSubmitConDuca, control: control3, formState: formState3, reset: reset3, watch: watch3, setValue: setValue3 } = useForm({
    defaultTab2ValuesConDuca,
    mode: "all"
  });


  const { isValid, errors } = formState;
  const { isValid: isValid1, errors: errors1 } = formState1;
  const { isValid: isValid2, errors: errors2 } = formState1;
  const { isValid: isValid3, errors: errors3 } = formState3;



  const datosWatch = watch()
  const datosWatch1 = watch1()
  const datosWatch2 = watch2()
  const datosWatch3 = watch3()


  renderCount += 1;

  /***********************************************************************/





  /***********************************************************************/

  const [dataMaterial, setdataMaterial] = useState([])
  const detallesMaterialIds = DatosDetalles.map(detalle => detalle.mate_Id);

  const manejarmateriales = async (materialId, add) => {
    if (add) {
      // Add the material back to the list
      const updatedData = data.filter(material => material.mate_Id !== materialId);
      setData(updatedData);

    } else {
      // Remove the material from the list
      const updatedData = data.filter(material => material.mate_Id !== materialId);
      setData(updatedData);
      CargarMaterialesEditar();
    }
  };


  const handleMaterialClick = (material) => {
    setSelectedMaterial(material.mate_Descripcion);
    setSelectedMaterialId(material.mate_Id);  // Si aún necesitas el ID en otro lugar
  };


  const handleSearchChangeMateriales = (event) => {
    setSearchTerm(event.target.value);
  };


  const filteredData = data.filter(material =>
    material.mate_Descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.subc_Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const materialesGetData = async () => {
    try {



      let initialData = await MaterialesServices.listar();

      setOriginalData(initialData);
      const detalles = await OrdenPedidoServices.ListadoPedidosOrdenDetallePorId(myData.peor_Id);



      detalles.forEach((item) => {

        const elimina = initialData.filter((x) => x.mate_Id != item.mate_Id)
        initialData = elimina

      })


      setData(initialData);
      setdataMaterial(initialData)
    } catch (error) {

    }
  };


  const CargarMaterialesEditar = async () => {
    try {
      const initialData = await MaterialesServices.listar();
      setdataMaterial(initialData)
    } catch (error) {

    }
  }


  /***********************************************************************/




  /***********************************************************************/

  //Peticion para editar un registro
  const EditarEncabezadoPedidosOrden = async () => {
    try {
      const response = await OrdenPedidoServices.EditarEncabezadoPedidosOrden(datosWatch, checked1);
      if (response.data.data.messageStatus.includes("FK_Prod_tbPedidosOrden_tbDuca_Duca_Id")) {
        ToastInfo("Ingrese un número de DUCA válido.")
        setValueTabs(0)
      }
      else if (response.data.data.messageStatus.includes("UQ_Prod_tbPedidosOrden_peor_Codigo")) {
        ToastWarningPersonalizado("El código de la órden ya existe.");
        setValueTabs(0);
      }

      else {
        ToastSuccessEditar();
        setSearchText("")
        setValueTabs(1)
      }
    } catch (error) {

      ToastError("Error inesperado");
    }
  };

  function validacion() {
    if (datosWatch.prov_Id === null || datosWatch.ciudad === null || datosWatch.pais === null || datosWatch.provincia === null) {
      ToastWarning()
    }
    else if (isNaN(datosWatch.duca_Id)) {
      ToastInfo("Ingrese un número de DUCA válido.");
    }
    else {
      if (datosWatch.duca_Id != null || datosWatch.peor_FechaEntrada != null || datosWatch.peor_DireccionExacta != null || datosWatch.peor_Obsevaciones != null) {
        EditarEncabezadoPedidosOrden();
      } else {
        ToastWarning()
      }
    }

  };

  /***********************************************************************/



  //Constante que me valida si el id de la duca existe o no

  //Constante que me valida si el id de la duca existe o no





  /***********************************************************************/

  const OrdenPedidoCrearEditar = async () => {
    try {

      if (EditDetalle) {
        const response = await OrdenPedidoServices.EditarPedidosOrdenDetalle(datosWatch1, selectedMaterialId);
        if (response.data.data.messageStatus == "1") {
          setValue1('prod_Cantidad', "");
          setValue1('mate_Id', 0);
          setValue1('prod_Precio', "");
          setSelectedMaterial("");
          setSelectedMaterialId(0);
          manejarmateriales(selectedMaterialId, false); // Add the replaced material back
          setEditDetalle(false);
          ToastSuccessEditar();
          cargarDatosTabla();
          setmostrarSwitch(true)
          setmostrarImpuestos(false)
          setChecked1(false)
          setValue("peor_Impuestos", "");


        }
      }
      else {
        const response = await OrdenPedidoServices.InsertarEncabezadoPedidosOrdenDetalle(datosWatch1, selectedMaterialId, UltimoId);
        if (response.data.data.messageStatus == "1") {

          ToastSuccessGuardado();
          setSearchText("");
          reset1(defaultTab2Values);
          setSelectedMaterial("");
          manejarmateriales(selectedMaterialId, true);
          manejarmateriales(DatosDetalles.map(detalle => detalle.mate_Descripcion), true);
          setSelectedMaterialId(0)
          cargarDatosTabla();
          materialesGetData();
          setmostrarSwitch(true)
          setmostrarImpuestos(false)
          setChecked1(false)
          setValue("peor_Impuestos", "");


        } else {
        }
      }
    } catch (error) {

      ToastError("Error inesperado");
    }

  };

  function validacion1() {

    if (selectedMaterialId === null || selectedMaterialId === undefined) {
      ToastWarningPersonalizado("Asegúrese de seleccionar un material.")
    }
    else if (datosWatch1.prod_Precio <= 0 || datosWatch1.prod_Cantidad <= 0) {
      ToastWarningPersonalizado("Asegúrese de ingresar un valor mayor a cero.")
    }
    else {
      if (datosWatch1.prod_Precio > 0 && datosWatch1.prod_Cantidad > 0) {

        OrdenPedidoCrearEditar();
      } else {
        ToastWarning();
      }
    }

  }

  /***********************************************************************/







  /***********************************************************************/

  //Controlador del dialog(modal) de Asignar los materiales
  const DialogAsignarMateriales = () => {
    setAsignarMateriales(!AsignarMateriales);
    reset2(defaultDialogValues)
  }










  const CrearPODetallePedidosOrdenDetalles = async () => {
    try {
      let successCount = 0; // Contador para llevar un registro de inserciones exitosas

      // Verifica si datosWatch2.code_Id es un arreglo válido y no está vacío
      if (Array.isArray(datosWatch2.code_Id) && datosWatch2.code_Id.length > 0) {
        for (const codeId of datosWatch2.code_Id) {
          // Verifica si codeId tiene un valor antes de enviarlo
          if (codeId && codeId.value !== null) {
            // Crear un objeto que contenga el elemento actual de code_Id
            const dataToSend = {
              ...datosWatch2,
              code_Id: codeId.value,
            };

            const response = await OrdenPedidoServices.PODetallePorPedidosOrdenDetalleInsertar(dataToSend, OrdePedidoID);

            if (response.data.success) {
              // Incrementar el contador de inserciones exitosas
              successCount++;
            }
          }
        }
      } else {
        // Si datosWatch2.code_Id está vacío, asigna 0 a code_Id
        datosWatch2.code_Id = [{ value: 0 }]; // Asegúrate de que code_Id sea un arreglo con un objeto con valor 0
        // Crea un objeto con code_Id igual a 0
        const dataToSend = {
          ...datosWatch2,
          code_Id: 0,
        };

        const response = await OrdenPedidoServices.PODetallePorPedidosOrdenDetalleInsertar(dataToSend, OrdePedidoID);

        if (response.data.success) {
          // Incrementar el contador de inserciones exitosas
          successCount++;
        }
      }

      // Mostrar el ToastSuccessGuardado() solo una vez después de todo el proceso
      if (successCount > 0) {
        ToastSuccessGuardado();
      }

      setSearchText("");
      DialogAsignarMateriales();
      cargarDatosTabla();

      setValue2('orco_Id', null)
      setValue2('code_Id', null)
    } catch (error) {

      ToastError("Error inesperado");
    }
  };
















  function validacionPO() {
    if (datosWatch2.orco_Id === null) {
      ToastWarning();
    } else {
      CrearPODetallePedidosOrdenDetalles();

    }

  };

  /***********************************************************************/




  /***********************************************************************/

  //Constante para cerrar el modal de eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante pata la eliminacion de los roles 
  const EliminarPODetalleOrdenPedidoDetalle = async () => {
    try {
      const response = (await OrdenPedidoServices.EliminarPODetallePorPedidosOrdenDetalle(OrdePedidoIDEliminar))

      if (response.data.data.messageStatus == '1') {
        ToastSuccessEliminar();
        DialogEliminar();
        cargarDatosTabla()
      }
      else if (response.data.data.messageStatus == '0') {
        DialogEliminar();
        ToastWarning("Este detalle ya ha sido asignado.");

      }
    } catch (error) {

    }
  }

  /***********************************************************************/


  /***********************************************************************/

  const EditarOrdenPedido = (datos) => {
    setValue1('prod_Id', datos["prod_Id"]);
    setValue1('pedi_Id', datos["pedi_Id"]);

    let index = data.indexOf(keya, 0)
    data.splice(index, 1)

    // setdataMaterial(dataMaterial.find(element => element.mate_Id === datos["mate_Id"]))
    let TempMaterialSeleccionado = originalData.find(element => element.mate_Id === datos["mate_Id"])

    data.unshift(TempMaterialSeleccionado);


    setmaterialSeleccionadoPrevio(datos["mate_Descripcion"]);
    setSelectedMaterialId(datos["mate_Id"]);
    setKeya(TempMaterialSeleccionado)
    setSelectedMaterial(datos["mate_Descripcion"]);
    setValue1('prod_Cantidad', datos["prod_Cantidad"]);
    setValue1('prod_Precio', datos["prod_Precio"]);
    setEditDetalle(true);
    handleClose(datos.prod_Id);
  }

  const CancelarEdit = () => {
    let index = data.indexOf(keya, 0)
    if (index != -1) {
      data.splice(index, 1)
    }

    setEditDetalle(false)
    reset1(defaultTab2Values)
    setSelectedMaterialId("")
    setSelectedMaterial("")
    setKeya(null)
    setmostrarSwitch(true)
    setmostrarImpuestos(false)
    setChecked1(false)


  }
  /***********************************************************************/


  /***********************************************************************/

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});


  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (codigo) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [codigo]: null,
    }));
  };


  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };


  //Constante para el clic del boton de editar en la tabla del detalle
  const handleEdit = (datos) => {
    setValue1('prod_Id', datos["prod_Id"]);
    setValue1('pedi_Id', datos["pedi_Id"]);



    let index = data.indexOf(keya, 0)
    data.splice(index, 1)

    // setdataMaterial(dataMaterial.find(element => element.mate_Id === datos["mate_Id"]))
    let TempMaterialSeleccionado = originalData.find(element => element.mate_Id === datos["mate_Id"])

    data.unshift(TempMaterialSeleccionado);


    setmaterialSeleccionadoPrevio(datos["mate_Descripcion"]);
    setSelectedMaterialId(datos["mate_Id"]);
    setKeya(TempMaterialSeleccionado)
    setSelectedMaterial(datos["mate_Descripcion"]);
    setValue1('prod_Cantidad', datos["prod_Cantidad"]);
    setValue1('prod_Precio', datos["prod_Precio"]);
    setEditDetalle(true);
    handleClose(datos.prod_Id);
  };


  //Constante para el clic del boton de asignar materiales en la tabla del detalle
  const handleAsignarMaterial = (datos) => {
    setOrdenPedidoID(datos["prod_Id"])
    DialogAsignarMateriales()
    reset2(defaultDialogValues)
    handleClose(datos.prod_Id);
  };

  //Constante para tomar el id del menu
  const handleDelete = (data) => {
    setOrdePedidoIDEliminar(data["ocpo_Id"])
    DialogEliminar();
    handleClose(data['ocpo_Id']);
  };


  //Constante de las columnas del index
  const columns = [
    {
      title: "N°",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Material",
      dataIndex: "mate_Descripcion",
      key: "mate_Descripcion",
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion),
      render: (text) => (text ? text : 'No disponible'),

    },
    {
      title: "Cantidad",
      dataIndex: "prod_Cantidad",
      key: "prod_Cantidad",
      sorter: (a, b) => parseInt(a.prod_Cantidad) - parseInt(b.prod_Cantidad),
      render: (text) => (text ? text : 'No disponible'),

    },
    {
      title: "Precio",
      dataIndex: "prod_Precio",
      key: "prod_Precio",
      sorter: (a, b) => parseFloat(a.prod_Precio) - parseFloat(b.prod_Precio),
      render: (text) => (text ? text : 'No disponible'),

    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.prod_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.prod_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.prod_Id)}
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
              prod_Id={`menu-${params.prod_Id}`}
              anchorEl={anchorEl[params.prod_Id]}
              keepMounted
              open={Boolean(anchorEl[params.prod_Id])}
              onClose={() => handleClose(params.prod_Id)}
            >
              {HayDuca ? null : <MenuItem onClick={() => { EditarOrdenPedido(params) }} >
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>}
              <MenuItem onClick={() => handleAsignarMaterial(params)}>
                <Icon>add</Icon>ㅤAsignar Material
              </MenuItem>

              {HayDuca ? <MenuItem onClick={() => { EliminarConDuca(params) }} >
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem> : null}
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];


  //Constantes para los campos de la Tabla Maestra
  const columnsExpandable = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: 'PO',
      dataIndex: 'orco_Id',
      key: 'orco_Id',
      sorter: (a, b) => a.orco_Id.localeCompare(b.orco_Id),
      render: (text) => (text ? text : 'No disponible'), // Mostrar "No disponible" si el valor es nulo o vacío
    },
    {
      title: 'Razón Social',
      dataIndex: 'clie_Nombre_O_Razon_Social',
      key: 'clie_Nombre_O_Razon_Social',
      sorter: (a, b) => a.clie_Nombre_O_Razon_Social.localeCompare(b.clie_Nombre_O_Razon_Social),
      render: (text) => (text ? text : 'No disponible'),
    },
    {
      title: 'Corte',
      dataIndex: 'code_SexoEvaluado',
      key: 'code_SexoEvaluado',
      sorter: (a, b) => a.code_SexoEvaluado.localeCompare(b.code_SexoEvaluado),
      render: (text) => (text ? text : 'No disponible'),
    },
    {
      title: 'Estilo',
      dataIndex: 'esti_DescripcionEvaludado',
      key: 'esti_DescripcionEvaludado',
      sorter: (a, b) => a.esti_DescripcionEvaludado.localeCompare(b.esti_DescripcionEvaludado),
      render: (text) => (text ? text : 'No disponible'),
    },
    {
      title: 'Color',
      dataIndex: 'colr_NombreEvaludado',
      key: 'colr_NombreEvaludado',
      sorter: (a, b) => a.colr_NombreEvaludado.localeCompare(b.colr_NombreEvaludado),
      render: (text) => (text ? text : 'No disponible'),
    },
    {
      title: 'Talla',
      dataIndex: 'tall_NombreEvaludado',
      key: 'tall_NombreEvaludado',
      sorter: (a, b) => a.tall_NombreEvaludado.localeCompare(b.tall_NombreEvaludado),
      render: (text) => (text ? text : 'No disponible'),
    },

    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.ocpo_Id}>
          <Button
            variant="contained"
            color="error"
            style={{
              borderRadius: "10px",
            }}
            onClick={() => handleDelete(params)}
          >
            <Icon>delete</Icon>
          </Button>
        </div>
      ),
    }

  ];


  //Constante que contiene las configuraciones de la tabla maestra

  const expandableConfig = {
    columnTitle: "Desplegar detalle",
    expandedRowKeys: [expandedRowKey],
    expandedRowRender: (record) => (
      <Table
        columns={columnsExpandable}
        dataSource={record.detalles}
        pagination={false}
      />
    ),
    rowExpandable: (record) => record.name !== "Not Expandable",
    onExpand: async (expanded, record) => {
      if (expanded) {
        await cargarDatosTabla(record.detalles);
        setExpandedRowKey(record.key);
      } else {
        setExpandedRowKey(null);
      }
    },
  };


  /***********************************************************************/

  /***********************************************************************/


  const CancelarImpuestos = () => {
    setmostrarSwitch(!mostrarSwitch)
    setmostrarImpuestos(!mostrarImpuestos)
    setChecked1(false)
    setValue("peor_Impuestos", "");
  }


  const [mostrarImpuestos, setmostrarImpuestos] = useState(false);
  const [mostrarSwitch, setmostrarSwitch] = useState(true);


  /* Constante para el swich de si pondra impuestos o descuentos*/
  const [checked1, setChecked1] = React.useState(false);
  const handleChangeImpuestos = (event) => {
    const isChecked = event.target.checked;
    setChecked1(isChecked);

    if (isChecked) {
      setValue("peor_Impuestos", "");

    }
  };

  /***********************************************************************/

  //Controlador del dialog(modal) eliminar
  const DialogEliminarConDuca = () => {
    SetEliminarModalDuca(!EliminarModalDuca);
  };

  const EliminarConDucaModal = async () => {
    try {
      const response = await OrdenPedidoServices.EliminarDetalleConDuca(datosWatch1);
      console.log(response)
      if (response.data.data.messageStatus == "1") {
        DialogEliminarConDuca();
        ToastSuccessEliminar();
        cargarDatosTabla();
        ItemsDuca(datosWatch['duca_Id'])
      } else if (response.data.data.messageStatus.includes("0")) {
        DialogEliminarConDuca();
        ToastErrorRegistroEnUso();
      }
    } catch (error) {
      DialogEliminarConDuca();
      ToastError();
    }
  }

  const EliminarConDuca = (datos) => {
    setValue1('prod_Id', datos["prod_Id"]);
    setValue1('item_Id', datos["item_Id"]);
    DialogEliminarConDuca()
    handleClose(datos.prod_Id);
  }

  /***********************************************************************/


  const [MaterialesItemsDuca, setMaterialesItemsDuca] = useState([]);
  const [selectedMaterialItems, setSelectedMaterialItems] = useState(null);

  const [selectedMaterialItem, setSelectedMaterialItem] = useState('');
  const [SelectedMaterialIdItem, setSelectedMaterialIdItem] = useState('');

  const handleMaterialClickItems = (material) => {
    setSelectedMaterialItems(material);
    setValue3("mate_Descripcion", material.item_IdentificacionComercialMercancias)
    setValue3("prod_Cantidad", material.item_Cantidad)
    setValue3("prod_Precio", material.item_ValorUnitario)
    setValue3("item_Id", material.item_Id)
    setValue3("pedi_Id", UltimoId)
    setSelectedMaterialItem(material.item_IdentificacionComercialMercancias);
    setSelectedMaterialIdItem(material.item_Id);  // Si aún necesitas el ID en otro lugar
  };


  //Constante para crear o editar un detalle de la orden de pedido
  const OrdenPedidoCrearDetalleConDuca = async () => {
    try {

      const response = await OrdenPedidoServices.InsertarPedidosOrdenDetalleConDuca(datosWatch3);

      if (response.data.data.messageStatus == "1") {

        ToastSuccessGuardado();
        setSearchText("");
        cargarDatosTabla();
        setSelectedMaterialId(0)
        cargarDatosTabla();
        ItemsDuca(datosWatch['duca_Id'])

        setSelectedMaterialIdItem('');
        setSelectedMaterialItems('');

        setValue3("pedi_Id", "");
        setValue3("mate_Descripcion", "");
        setValue3("prod_Cantidad", "");
        setValue3("prod_Precio", "");
        setValue3("item_Id", "");
      }

    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }

  };


  //Constante para validar lo campos de la tab 2
  const validacionTap2CrearConDuca = () => {
    if (datosWatch3.mate_Descripcion === null || datosWatch3.mate_Descripcion === undefined) {
      ToastWarningPersonalizado("Asegúrese de seleccionar un material.")
    }
    else {
      if (datosWatch3.prod_Precio > 0 && datosWatch3.prod_Cantidad > 0) {

        OrdenPedidoCrearDetalleConDuca();
      } else {
        ToastWarning();
      }
    }
  }

  const handleSearchChangeItems = (event) => {
    setSearchTermItems(event.target.value);
  };

  // Manejar el clic en un material
  const handleMaterialClickItem = (item) => {
    console.log(item)
    setSelectedMaterialItems(item);
    setValue3("mate_Descripcion", item.item_IdentificacionComercialMercancias)
    setValue3("prod_Cantidad", item.item_Cantidad)
    setValue3("prod_Precio", item.item_ValorUnitario)
    setValue3("item_Id", item.item_Id)
    setValue3("pedi_Id", UltimoId)
  };

  const cancelarInsertDetallesitems = () => {
    setSelectedMaterialIdItem('');
    setSelectedMaterialItems('');
    setValue3("mate_Descripcion", "")
    setValue3("prod_Cantidad", "")
    setValue3("prod_Precio", "")
    setValue3("item_Id", "")
  }

  const filteredDataItems = MaterialesItems.filter(material =>
    material.item_IdentificacionComercialMercancias.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.mate_SubCategoria.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/gFKTs3W/ORDEN-DE-PEDIDO.png"
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
            sx={{ backgroundColor: '#e5e1fa', color: black }}
          >
            <Tab label="I. Datos Generales de la Orden de Pedido" {...a11yProps(0)} />

            {HayDuca ? null : <Tab
              label="II. Detalles de la Orden de Pedido"
              {...a11yProps(1)}
            //disabled={tabsEstado.tab1}
            />}

            {HayDuca ? (
              <Tab
                label="II. Detalles de la Orden de Pedido"
                {...a11yProps(1)}
              />
            ) : null}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction} >
            <form onSubmit={handleSubmit((_data) => { })}>
              <Grid container spacing={2} className='mt-6'>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.peor_Codigo} id="group-label"
                      className="font-medium text-12"
                      component="legend">
                      Código de la órden:
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined"
                          inputProps={{
                            onKeyPress: (event) => {
                              // Permitir solo letras y números, sin espacios en blanco
                              if (!/^[a-zA-Z0-9]+$/.test(event.key) || event.key === " ") {
                                event.preventDefault();
                              }
                            },

                            maxLength: 10,
                          }}
                          error={!!errors.peor_Codigo}
                        />
                      )}
                      name="peor_Codigo"
                      control={control}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    render={({ field }) => (
                      <FormControl error={field.value === "0"} fullWidth={true}>
                        <FormLabel error={!!errors.prov_Id} className="font-medium text-12"
                          component="legend">
                          Proveedor
                        </FormLabel>
                        <Autocomplete
                          {...field}
                          disablePortal
                          isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                          }
                          options={Proveedores}
                          value={datosWatch["prov_Id"]}
                          onChange={(event, value) => { setValue('prov_Id', value) }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!errors.prov_Id}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      </FormControl>
                    )}
                    name="prov_Id"
                    control={control}
                  />
                </Grid>


                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.duca_Id} id="group-label" className="font-medium text-12"
                      component="legend">
                      Número de DUCA:
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <><TextField
                          {...field}
                          id="outlined"
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),

                          }}
                          onBlur={() => { field.value == null ? '' : Duca(field.value) }}


                          error={!!errors.duca_Id} />
                          <FormHelperText style={{ color: 'red' }}>
                            {No_Duca == 0 ? 'El número de DUCA no existe' : ''}
                          </FormHelperText></>

                      )}

                      name="duca_Id"
                      control={control}
                    />

                  </FormControl>
                </Grid>




                <Grid item xs={4}>
                  <Controller
                    name="peor_FechaEntrada"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        error={!!errors.peor_FechaEntrada}
                        fullWidth={true}
                      >
                        <FormLabel className="font-medium text-12"
                          component="legend">
                          Fecha de Entrada:
                        </FormLabel>
                        <DatePicker
                          onChange={(date) => field.onChange(date)}
                          value={field.value}
                          required
                          minDate={new Date(1900, 0, 1)}
                          renderInput={(_props) => (
                            <TextField
                              className="w-full"
                              {..._props}
                              onBlur={field.onBlur}
                              error={!!errors.peor_FechaEntrada}
                              helperText={errors?.peor_FechaEntrada?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errors?.empl_FechaNacimiento?.message}
                            />
                          )}
                          className="w-full"
                        />

                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={4} >
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.pais} className="font-medium text-12"
                      component="legend">País</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                          }
                          id="pais"
                          disableClearable={true}
                          options={PaisDDL}
                          value={datosWatch["pais"] ?? null}
                          onChange={async (event, value) => {
                            setValue('pais', value)
                            setValue('provincia', null)
                            setValue('ciudad', null)
                            ddlProvincia(value?.value)
                            ddlCiudades(0)
                            if (!value) { setValue('pvin_Id', []) }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!errors.pais}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      )}
                      name="pais"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={4} >
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.provincia} className="font-medium text-12"
                      component="legend">Departamento</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                          }
                          id="provincia"
                          disableClearable={true}
                          options={ProvinciaDDL}
                          value={datosWatch["provincia"] ?? null}
                          onChange={async (event, value) => {
                            setValue('provincia', value)
                            setValue('ciudad', null)
                            ddlCiudades(value?.value)

                            if (!value) { setValue('ciud_Id', []) }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!errors.provincia}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      )}
                      name="provincia"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={4} >
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.ciudad} className="font-medium text-12"
                      component="legend">Ciudad</FormLabel >
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                          }
                          id="ciudad"
                          disableClearable={true}
                          options={CiudadDDL}
                          value={datosWatch["ciudad"] ?? null}
                          onChange={async (event, value) => {
                            setValue('ciudad', value)
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!errors.ciudad}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      )}
                      name="ciudad"
                      control={control}
                    />
                  </FormControl>
                </Grid>


                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.peor_DireccionExacta} id="group-label" className="font-medium text-12"
                      component="legend">
                      Dirección Exacta:
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined"
                          inputProps={{
                            onKeyPress: (event) => {
                              // Permitir solo letras y números, sin espacios en blanco
                              if (!/^[a-zA-Z0-9]+$/.test(event.key) && event.key !== " ") {
                                event.preventDefault();
                              }
                            },

                            maxLength: 150,
                          }}
                          error={!!errors.peor_DireccionExacta}
                        />
                      )}
                      name="peor_DireccionExacta"
                      control={control}
                    />
                  </FormControl>
                </Grid>


                <Grid item xs={4}>

                  <FormControl fullWidth style={{ marginTop: '-15px' }}>
                    <FormControlLabel
                      className="font-medium text-12"
                      component="legend"
                      control={
                        <Switch
                          label="¿Brindo Materiales?"
                          labelPlacement="top"
                          inputProps={{ 'aria-label': 'controlled' }}
                          onChange={handleChangeImpuestos}
                          checked={checked1}
                        />
                      }
                      label="¿Desea agregar impuestos?"
                      labelPlacement="top"
                      style={{ marginTop: "25px", marginRight: "20px" }}
                    />
                  </FormControl>

                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.peor_Obsevaciones} id="group-label" className="font-medium text-12"
                      component="legend">
                      Observaciones:
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined"
                          inputProps={{
                            onKeyPress: (event) => {
                              // Permitir solo letras y números, sin espacios en blanco
                              if (!/^[a-zA-Z0-9]+$/.test(event.key) && event.key !== " ") {
                                event.preventDefault();
                              }
                            },

                            maxLength: 150,
                          }}
                          error={!!errors.peor_Obsevaciones}
                        />
                      )}
                      name="peor_Obsevaciones"
                      control={control}
                    />
                  </FormControl>
                </Grid>



              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'right',
                  marginTop: '25px',
                }}
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
                  onClick={validacion}
                  type='submit'
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
                  onClick={(e) => {
                    navigate('/OrdenPedido/Index');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </form>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}     >

            {HayDuca ? null :
              <form onSubmit={handleSubmit1((_data) => { })}>


                <Grid container spacing={2}>
                  <Grid item xs={6} disabled>
                    <div>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        placeholder="Buscar"
                        onChange={handleSearchChangeMateriales}
                        size="small"
                        className={classes.searchField}

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
                      <div className={classes.scrollContainer}>
                        {filteredData.map(material => (
                          <Card
                            key={material.mate_Id}
                            className={`${classes.card} ${selectedMaterialId === material.mate_Id ? classes.selectedCard : ''}`}
                            onClick={() => handleMaterialClick(material)}
                          >
                            <CardMedia
                              className={classes.cardMedia}
                              image={material.mate_Imagen}
                              title={material.mate_Descripcion}
                            />
                            <CardContent className={classes.cardContent}>
                              <p>Descripción: {material.mate_Descripcion}</p>
                              <p>Subcategoría: {material.subc_Descripcion}</p>
                            </CardContent>
                            <Checkbox
                              checked={selectedMaterialId === material.mate_Id}
                              onChange={() => handleMaterialClick(material)}
                            />
                          </Card>
                        ))}
                      </div>

                    </div>
                  </Grid>


                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="group-label" className="font-medium text-12"
                            component="legend">
                            Material:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                placeholder="Seleccione un material"
                                value={selectedMaterial}
                                disabled
                                // No es necesario cambiar el valor del campo de entrada aquí
                                inputProps={{
                                  maxLength: 150,
                                }}
                                error={!!errors1.mate_Id}
                              />
                            )}
                            name="mate_Id"
                            control={control1}
                          />
                        </FormControl>
                      </Grid>



                      <Grid item xs={12} >
                        <FormControl fullWidth>
                          <FormLabel error={!!errors1.prod_Cantidad} id="group-label" className="font-medium text-12"
                            component="legend">
                            Cantidad:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                placeholder="Ingrese la cantidad"
                                value={datosWatch1.prod_Cantidad}
                                inputProps={{
                                  onKeyPress: (event) => {
                                    // Permitir solo números (0-9)
                                    if (!/^\d+$/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  },
                                  maxLength: 150,
                                }}
                                error={!!errors1.prod_Cantidad}
                              />
                            )}
                            name="prod_Cantidad"
                            control={control1}
                          />
                        </FormControl>
                      </Grid>



                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel error={!!errors1.prod_Precio} id="group-label" className="font-medium text-12"
                            component="legend">
                            Precio:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                value={datosWatch1.prod_Precio}
                                placeholder="Ingrese el precio"
                                inputProps={{
                                  maxLength: 150,
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
                                error={!!errors1.prod_Precio}
                              />
                            )}
                            name="prod_Precio"
                            control={control1}
                          />
                        </FormControl>
                      </Grid>


                    </Grid>
                  </Grid>



                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'right',
                      alignItems: 'right',
                      marginTop: '10px',
                    }}
                  >
                    <Button
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
                      type="submit"
                      onClick={validacion1}
                    >
                      {EditDetalle ? 'Editar' : 'Agregar'}
                    </Button>

                    <Button
                      startIcon={<Icon>close</Icon>}
                      variant="contained"
                      color="primary"
                      style={{
                        borderRadius: "10px",
                        marginRight: "10px",
                        marginTop: "15px",
                      }} sx={{
                        backgroundColor: '#DAD8D8',
                        color: 'black',
                        '&:hover': { backgroundColor: '#BFBABA' },
                      }}
                      onClick={CancelarEdit}
                    >
                      Cancelar
                    </Button>
                  </Grid>




                  {/* Select para las filas de la tabla inicio*/}
                  <Stack direction="row" spacing={1} className='ml-8'>
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

                  <Grid item xs={12}>
                    <div className="center" style={{ width: "95%", margin: "auto" }}>
                      <Table
                        columns={columns}
                        expandable={expandableConfig}
                        locale={{
                          triggerDesc: "Ordenar descendente",
                          triggerAsc: "Ordenar ascendente",
                          cancelSort: "Cancelar",
                          emptyText: LoadingIcon(),
                        }}
                        dataSource={filteredRows}
                        size="small"
                        pagination={{
                          pageSize: filas
                          , className: 'custom-pagination'
                        }}

                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'right',
                    marginTop: '10px',
                  }}
                >
                  <Button
                    startIcon={<Icon>checked</Icon>}
                    variant="contained"
                    color="primary"
                    type="submit"

                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={DialogFinalizarPedido}
                  >
                    Finalizar
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
                    onClick={(e) => {
                      navigate('/OrdenPedido/Index');
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>

                {/* Inicia del Dialog(Modal) de Finalización */}
                <Dialog
                  open={Finalizacion}
                  fullWidth
                  onClose={DialogFinalizarPedido}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Confirmación de Finalización
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      ¿Está seguro(a) de que desea finalizar el pedido? <br></br>Le recordamos que una vez que el pedido sea finalizado, no será posible realizar modificaciones en el mismo.
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
                        onClick={FinalizarPedidoProduccion}
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
                          navigate('/OrdenPedido/Index');
                        }}
                      >
                        Salir
                      </Button>
                    </Grid>
                  </DialogActions>
                </Dialog>

                {/* Inicia del Dialog(Modal) de Asignar Materiales */}
                <Dialog
                  open={AsignarMateriales}
                  fullWidth
                  onClose={DialogAsignarMateriales}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth="md"

                >
                  <DialogTitle
                    id="alert-dialog-title"
                    style={{
                      backgroundImage: 'url(https://i.ibb.co/7G0dB3F/ASIGNAR-MATERIALES.png)',
                      backgroundSize: 'cover',
                      height: '130px',
                      backgroundPosition: 'center',
                      color: 'white', // Color del texto en el encabezado
                      textAlign: 'center', // Alinea el texto en el centro
                    }}
                  >
                  </DialogTitle>
                  <DialogContent style={{ paddingBottom: '8%', overflow: 'visible' }}>

                    <Grid item xs={6} className='mt-24'>
                      <Grid container spacing={2}>

                        <Grid item xs={6} className='mb-8'>
                          <FormControl fullWidth>
                            <FormLabel error={!!errors.orco_Id}>Órden de Compra</FormLabel>
                            <Controller
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  disablePortal
                                  isOptionEqualToValue={(option, value) =>
                                    option.value === value.value
                                  }
                                  id="orco_Id"
                                  disableClearable={true}
                                  options={PODDL}
                                  value={datosWatch2["orco_Id"] ?? null}
                                  onChange={async (event, value) => {
                                    setValue2('orco_Id', value)
                                    setValue2('code_Id', null)
                                    ddlPODetalle(value?.value)
                                    if (!value) { setValue2('code_Id', []) }
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={!!errors.orco_Id}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  )}
                                />
                              )}
                              name="orco_Id"
                              control={control}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={6} >
                          <FormControl fullWidth>
                            <FormLabel error={!!errors.code_Id}>Detalles de la Órden de Compra</FormLabel>
                            <Controller
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  disablePortal
                                  autoSelect
                                  isOptionEqualToValue={(option, value) => option.value === value.value}
                                  id="code_Id"
                                  disableClearable={true}
                                  options={POdetalleDDL}
                                  value={datosWatch2["code_Id"] ?? []} // Usar una matriz vacía en lugar de null
                                  onChange={async (event, value) => {
                                    setValue2('code_Id', value);
                                  }}
                                  multiple // Agregar la propiedad 'multiple' aquí
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={!!errors.code_Id}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  )}
                                />

                              )}
                              name="code_Id"
                              control={control}
                            />
                          </FormControl>
                        </Grid>

                      </Grid>
                    </Grid>
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
                        onClick={validacionPO}
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

                        onClick={DialogAsignarMateriales}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </DialogActions>
                </Dialog>


                <Dialog
                  open={Eliminar}
                  fullWidth={'md'}
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
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                      <Button
                        startIcon={<Icon>checked</Icon>}
                        variant="contained"
                        color="error"
                        style={{ borderRadius: '10px', marginRight: '10px' }}

                        onClick={EliminarPODetalleOrdenPedidoDetalle}
                      >
                        Eliminar
                      </Button>

                      <Button
                        startIcon={<Icon>close</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '10px' }}
                        sx={{
                          backgroundColor: '#DAD8D8', color: 'black',
                          "&:hover": { backgroundColor: '#BFBABA' },
                        }}
                        onClick={DialogEliminar}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </DialogActions>
                </Dialog>

              </form>
            }


            {/*FORMULARIO PARA LOS DETALLES PROVENIENTES DE ADUANAS*/}
            {HayDuca ?
              <form onSubmit={handleSubmit1((_data) => { })}>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        placeholder="Buscar"
                        onChange={handleSearchChangeItems}
                        size="small"
                        className={classes.searchField}

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

                      <div className={classes.scrollContainer}>
                        {filteredDataItems.map((item) => (
                          <div
                            key={item.item_Id}
                            style={{ pointerEvents: item.item_Estado == 0 ? 'none' : 'auto' }}
                          >
                            <Card
                              className={`${classes.card} ${selectedMaterial == item ? classes.selectedCard : ''}`}
                              style={item.item_Estado == 0 ? { border: '1px solid #FF0000' } : { border: '1px solid #ccc' }}
                              onClick={() => (item.item_Estado != 0 ? handleMaterialClickItems(item) : null)}
                            >
                              <CardMedia
                                className={classes.cardMedia}
                                image={item.mate_Imagen}
                                title={item.item_IdentificacionComercialMercancias}
                              />
                              <CardContent className={classes.cardContent}>
                                <p>Descripción: {item.item_IdentificacionComercialMercancias}</p>
                                <p>Subcategoría: {item.subc_Descripcion}</p>
                                {item.item_Estado == 0 && (
                                  <p style={{ color: 'red' }}>Este item ya ha sido asignado a una orden de pedido</p>
                                )}
                              </CardContent>
                              <Checkbox
                                checked={SelectedMaterialIdItem == item.item_Id}
                                onChange={() => (item.item_Estado != 0 ? handleMaterialClickItems(item) : null)}
                                disabled={item.item_Estado == 0}
                              />
                            </Card>
                          </div>
                        ))}
                      </div>



                    </div>
                  </Grid>


                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="group-label" className="font-medium text-12" component="legend">
                            Material:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                value={selectedMaterialItems ? selectedMaterialItems.item_IdentificacionComercialMercancias : ''}
                                disabled
                                inputProps={{
                                  maxLength: 150,
                                }}
                              />
                            )}
                            name="mate_Id"
                            control={control1}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="group-label" className="font-medium text-12" component="legend">
                            Cantidad:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                value={selectedMaterialItems ? selectedMaterialItems.item_Cantidad : ''}
                                disabled
                                inputProps={{
                                  maxLength: 150,
                                }}
                              />
                            )}
                            name="prod_Cantidad"
                            control={control1}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="group-label" className="font-medium text-12" component="legend">
                            Precio:
                          </FormLabel>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined"
                                value={selectedMaterialItems ? selectedMaterialItems.item_ValorUnitario : ''}
                                disabled
                                inputProps={{
                                  maxLength: 150,
                                }}
                              />
                            )}
                            name="prod_Precio"
                            control={control1}
                          />
                        </FormControl>
                      </Grid>


                    </Grid>
                  </Grid>



                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'right',
                      alignItems: 'right',
                      marginTop: '10px',
                    }}
                  >
                    <Button
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
                      type="submit"
                      onClick={validacionTap2CrearConDuca}
                    >
                      Agregar
                    </Button>


                    <Button
                      startIcon={<Icon>close</Icon>}
                      variant="contained"
                      color="primary"
                      style={{
                        borderRadius: "10px",
                        marginRight: "10px",
                        marginTop: "15px",
                      }} sx={{
                        backgroundColor: '#DAD8D8',
                        color: 'black',
                        '&:hover': { backgroundColor: '#BFBABA' },
                      }}
                      onClick={cancelarInsertDetallesitems}
                    >
                      Cancelar
                    </Button>
                  </Grid>




                  {/* Select para las filas de la tabla inicio*/}
                  <Stack direction="row" spacing={1} className='ml-8'>
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

                  <Grid item xs={12}>
                    <div className="center" style={{ width: "95%", margin: "auto" }}>
                      <Table
                        columns={columns}
                        expandable={expandableConfig}
                        locale={{
                          triggerDesc: "Ordenar descendente",
                          triggerAsc: "Ordenar ascendente",
                          cancelSort: "Cancelar",
                          emptyText: LoadingIcon(),
                        }}
                        dataSource={filteredRows}
                        size="small"
                        pagination={{
                          pageSize: filas
                          , className: 'custom-pagination'
                        }}

                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'right',
                    marginTop: '10px',
                  }}
                >
                  <Button
                    startIcon={<Icon>checked</Icon>}
                    variant="contained"
                    color="primary"
                    type="submit"

                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={DialogFinalizarPedido}
                  >
                    Finalizar
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
                    onClick={(e) => {
                      navigate('/OrdenPedido/Index');
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>

                {/* Inicia del Dialog(Modal) de Finalización */}
                <Dialog
                  open={Finalizacion}
                  fullWidth
                  onClose={DialogFinalizarPedido}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Confirmación de Finalización
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      ¿Está seguro(a) de que desea finalizar el pedido? <br></br>Le recordamos que una vez que el pedido sea finalizado, no será posible realizar modificaciones en el mismo.
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
                        onClick={FinalizarPedidoProduccion}
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
                          navigate('/OrdenPedido/Index');
                        }}
                      >
                        Salir
                      </Button>
                    </Grid>
                  </DialogActions>
                </Dialog>
                {/* Inicia del Dialog(Modal) de Asignar Materiales */}
                                {/* Inicia del Dialog(Modal) Eliminar */}
                                <Dialog
                  open={EliminarModalDuca}
                  fullWidth="md"
                  onClose={DialogEliminarConDuca}
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
                        color="error"
                        style={{ borderRadius: "10px", marginRight: "10px" }}
                        onClick={EliminarConDucaModal}
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
                        onClick={DialogEliminarConDuca}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </DialogActions>
                </Dialog>
                {/* Fin del Dialog(Modal) Eliminar */}
                <Dialog
                  open={AsignarMateriales}
                  fullWidth
                  onClose={DialogAsignarMateriales}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth="md"

                >
                  <DialogTitle
                    id="alert-dialog-title"
                    style={{
                      backgroundImage: 'url(https://i.ibb.co/7G0dB3F/ASIGNAR-MATERIALES.png)',
                      backgroundSize: 'cover',
                      height: '130px',
                      backgroundPosition: 'center',
                      color: 'white', // Color del texto en el encabezado
                      textAlign: 'center', // Alinea el texto en el centro
                    }}
                  >
                  </DialogTitle>
                  <DialogContent style={{ paddingBottom: '8%', overflow: 'visible' }}>

                    <Grid item xs={6} className='mt-24'>
                      <Grid container spacing={2}>

                        <Grid item xs={6} className='mb-8'>
                          <FormControl fullWidth>
                            <FormLabel error={!!errors2.orco_Id}>Órden de Compra</FormLabel>
                            <Controller
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  disablePortal
                                  isOptionEqualToValue={(option, value) =>
                                    option.value === value.value
                                  }
                                  id="orco_Id"
                                  disableClearable={true}
                                  options={PODDL}
                                  value={datosWatch2["orco_Id"] ?? null}
                                  onChange={async (event, value) => {
                                    setValue2('orco_Id', value)
                                    setValue2('code_Id', null)
                                    ddlPODetalle(value?.value)
                                    if (!value) { setValue2('code_Id', []) }
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={!!errors2.orco_Id}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  )}
                                />
                              )}
                              name="orco_Id"
                              control={control2}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={6} >
                          <FormControl fullWidth>
                            <FormLabel error={!!errors2.code_Id}>Detalles de la Órden de Compra</FormLabel>
                            <Controller
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  disablePortal
                                  autoSelect
                                  isOptionEqualToValue={(option, value) => option.value === value.value}
                                  id="code_Id"
                                  disableClearable={true}
                                  options={POdetalleDDL}
                                  value={datosWatch2["code_Id"] ?? []} // Usar una matriz vacía en lugar de null
                                  onChange={async (event, value) => {
                                    setValue2('code_Id', value);
                                  }}
                                  multiple // Agregar la propiedad 'multiple' aquí
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={!!errors2.code_Id}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  )}
                                />

                              )}
                              name="code_Id"
                              control={control2}
                            />
                          </FormControl>
                        </Grid>

                      </Grid>
                    </Grid>
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
                        onClick={validacionPO}
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

                        onClick={DialogAsignarMateriales}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={Eliminar}
                  fullWidth={'md'}
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
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                      <Button
                        startIcon={<Icon>checked</Icon>}
                        variant="contained"
                        color="error"
                        style={{ borderRadius: '10px', marginRight: '10px' }}

                        onClick={EliminarPODetalleOrdenPedidoDetalle}
                      >
                        Eliminar
                      </Button>

                      <Button
                        startIcon={<Icon>close</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '10px' }}
                        sx={{
                          backgroundColor: '#DAD8D8', color: 'black',
                          "&:hover": { backgroundColor: '#BFBABA' },
                        }}
                        onClick={DialogEliminar}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </DialogActions>
                </Dialog>



              </form>
              : null}


          </TabPanel>
        </SwipeableViews>
      </Box>
    </Card >
  );
}

export default OrdenPedido_Editar;
