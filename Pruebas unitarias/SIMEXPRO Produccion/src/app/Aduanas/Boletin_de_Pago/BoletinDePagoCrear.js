/* eslint-disable camelcase */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from "react-input-mask";
import { useLocation, useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import History from 'src/@history/@history';
import Load_DDLs from 'src/app/loadDDLs/Load_DDL';
import { ToastError, ToastSuccess, ToastSuccessEditar, ToastWarning } from 'src/styles/toastsFunctions';
import * as yup from 'yup';
import BoletinDePagoService from './BoletinDePagoService';

function MakeAleatoryCode(length) {
  let result = '';
  const characters = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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

function BoletindePagoCrear() {
  const location = useLocation()
  const data = location.state;


  const [aplicaIsv, setAplicaIsv] = useState(false)
  const [aplicaSel, setAplicaSel] = useState(false)
  const [aplicaEco, setAplicaEco] = useState(false)
  const [aplicaDai, setAplicaDai] = useState(false) 
  const [aplicaStd, setAplicaStd] = useState(false)
  const [aplicaProcons, setAplicaProcons] = useState(false)

  const defaultValues = {
    boen_Id: "",
    liqu_Id: "",
    duca_Id: "",
    duca_No_Duca: "",
    Declarante: "",
    boen_NDeclaracion: "",
    Importador_Exportador: "",
    tipl_Id: null,
    boen_FechaEmision: "",
    Estado: null,
    boen_Preimpreso: "",
    Observaciones: "",
    BoletinNO: "",
    RTN: "",
    coim_Id: null,
    copa_Id: null,
    boen_TotalPagar: "",
    boen_TotalGarantizar: "",
    aduana: "",
  };

  const defaultValues1 = {
    tipoObligacionIsv: null,
    tipoObligacionSel: null,
    tipoObligacionEco: null,
    tipoObligacionDai: null,
    tipoObligacionStd: null,
    tipoObligacionProcons: null,

    cuentaPa01Isv: "",
    cuentaPa01Sel: "",
    cuentaPa01Eco: "",
    cuentaPa01Dai: "",
    cuentaPa01Std: "",
    cuentaPa01Procons: "",

    lige_Id_Isv: "",
    lige_Id_Sel: "",
    lige_Id_Eco: "",
    lige_Id_Dai: "",
    lige_Id_Std: "",
    lige_Id_Procons: "",

    totalPagarIsv: 0,
    totalPagarSel: 0,
    totalPagarEco: 0,
    totalPagarDai: 0,
    totalPagarStd: 0,
    totalPagarProcons: 0,

    totalPagar: 0
  };

  const schemaGenerales = yup.object().shape({
    boen_Id: yup.string(),
    liqu_Id: yup.number().required().min(1).max(2147483647),
    // duca_No_Duca: yup.string().required(),
    boen_NDeclaracion: yup.string(),
    Importador_Exportador: yup.string().required(),
    tipl_Id: yup.object().required(),
    // boen_FechaEmision: yup.date().nullable().max(new Date(), "No puede ingresar fechas futuras").min(new Date(1900, 0, 1), "Ingrese una fecha mayor a 01/01/1900"),
    Estado: yup.object().required(),
    boen_Preimpreso: yup.string().required().trim(),
    Observaciones: yup.string().trim(),
    BoletinNO: yup.string(),
    RTN: yup.string().required("").min(16,"Ingrese un rtn valido").max(16,"Ingrese un rtn valido"),
    coim_Id: yup.object(),
    copa_Id: yup.object(),
    boen_TotalPagar: yup.string(),
    boen_TotalGarantizar: yup.string(),
    aduana: yup.object()
  });

  const schemaGenerales1 = yup.object().shape({
    tipoObligacionIsv: aplicaIsv == true ? yup.object().required() : yup.object().nullable(),
    tipoObligacionSel: aplicaSel == true ? yup.object().required() : yup.object().nullable(),
    tipoObligacionEco: aplicaEco == true ? yup.object().required() : yup.object().nullable(),
    tipoObligacionDai: aplicaDai == true ? yup.object().required() : yup.object().nullable(),
    tipoObligacionStd: aplicaStd == true ? yup.object().required() : yup.object().nullable(),
    tipoObligacionProcons: aplicaProcons == true ? yup.object().required() : yup.object().nullable(),

    cuentaPa01Isv: aplicaIsv == true ? yup.string().required().trim() : yup.string().nullable(),
    cuentaPa01Sel: aplicaSel == true ? yup.string().required().trim() : yup.string().nullable(),
    cuentaPa01Eco: aplicaEco == true ? yup.string().required().trim() : yup.string().nullable(),
    cuentaPa01Dai: aplicaDai == true ? yup.string().required().trim() : yup.string().nullable(),
    cuentaPa01Std: aplicaStd == true ? yup.string().required().trim() : yup.string().nullable(),
    cuentaPa01Procons: aplicaProcons == true ? yup.string().required().trim() : yup.string().nullable(),

    totalPagarIsv: yup.string().nullable(),
    totalPagarSel: yup.string().nullable(),
    totalPagarEco: yup.string().nullable(),
    totalPagarDai: yup.string().nullable(),
    totalPagarStd: yup.string().nullable(),
    totalPagarProcons: yup.string().nullable(),

    totalPagar: yup.string().nullable()
  });

  const load_DDLs = Load_DDLs()
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValueTabs] = React.useState(0);
  const boletinDePagoService = BoletinDePagoService()
  const [impuestos, setImpuestos] = useState({});
  const [inserto, setInserto] = useState(false)

  //Tab 1 useform
  const { handleSubmit, reset, control, formState, watch, setValue } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schemaGenerales),
  });
  const { isValid, errors } = formState;
  const modelo = watch()

  //Tab 2 useform
  const { handleSubmit: handleSubmit1, reset: reset1, control: control1, formState: formState1, watch: watch1, setValue: setValue1, trigger: trigger1 } = useForm({
    defaultValues1,
    mode: "all",
    resolver: yupResolver(schemaGenerales1),
  });
  const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1, touchedFields: touchedFields1, } = formState1;
  const modelo1 = watch1()
  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
  });

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const handleChangeIndex = (index) => {
    setValueTabs(index);
  };

  const validacion = async (params, event) => {
    if (isValid) {
      if (editing) {

        try{
          const response = await boletinDePagoService.editar(modelo, modelo1)
          console.log('el response', response)
          if (response.data.data.messageStatus == 1) {
            ToastSuccessEditar()
            setValueTabs(1);
            setEditing(true)
          } else if (response.data.data.messageStatus.includes('Violation') || response.data.data.messageStatus.includes('Duplicate')) {
            ToastWarning()
          } else {
            ToastError()
          }
        }catch(error){ 
          console.log('Error al editar',error)
        }

      } else {
        try{
          const response = await boletinDePagoService.crear(modelo, modelo1)
          console.log('el response', response)
          if (response.data.data.messageStatus > 0) {
            ToastSuccess()
            setValueTabs(1);
            setEditing(true)
            setValue('boen_Id', response.data.data.messageStatus)
          } else if (response.data.data.messageStatus.includes('Violation') || response.data.data.messageStatus.includes('Duplicate')) {
            ToastWarning()
          } else {
            ToastError()
          }
        }catch(error){
          console.log('error al crear pai',error)
          ToastError()
        }
      }
    } else {
      ToastWarning()
      console.log('errors', errors)
    }
  };

  const validacion1 = async (params, event) => {
    try {
      if (isValid1) {
        console.log('modelo tap 2',modelo1)
        if (modelo1.lige_Id_Dai != "") {
          const response = await boletinDePagoService.creardetalles(modelo, modelo1.cuentaPa01Dai, modelo1.tipoObligacionDai, modelo1.lige_Id_Dai)
          console.log('el response parte 2', response)
        }

        if (modelo1.lige_Id_Isv != "") {
          const response = await boletinDePagoService.creardetalles(modelo, modelo1.cuentaPa01Isv, modelo1.tipoObligacionIsv, modelo1.lige_Id_Isv)
          console.log('el response parte 2', response)
        }

        if (modelo1.lige_Id_Eco != "") {
          const response = await boletinDePagoService.creardetalles(modelo, modelo1.cuentaPa01Eco, modelo1.tipoObligacionEco, modelo1.lige_Id_Eco)
        }

        if (modelo1.lige_Id_Sel != "") {
          const response = await boletinDePagoService.creardetalles(modelo, modelo1.cuentaPa01Sel, modelo1.tipoObligacionSel, modelo1.lige_Id_Sel)
        }

        if (modelo1.lige_Id_Std != "") {
          const response = await boletinDePagoService.creardetalles(modelo, modelo1.cuentaPa01Std, modelo1.tipoObligacionStd, modelo1.lige_Id_Std)
        }

        if (modelo1.lige_Id_Procons != "") {
          const response = await boletinDePagoService.creardetalles(modelo, modelo1.cuentaPa01Procons, modelo1.tipoObligacionProcons, modelo1.lige_Id_Procons)
        }

        ToastSuccess()
        History.push('/BoletindePago/imprimir', { modelo: modelo, modelo1: modelo1 })
      } else {
        console.log('errores o campos vacios', errors1)
        ToastWarning()
      }
    } catch (error) {
      ToastError()
    }
  };

  const datitos = [
    { id: 1, label: 'Pagar-PA' },
    { id: 2, label: 'Pagar-PE' },
    { id: 4, label: 'Pagar-PI' },
    { id: 5, label: 'Pagar-PO' },
    { id: 6, label: 'Pagar-PY' },
  ]

  const [filas, setFilas] = React.useState(5);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState({});
  const [tiposObligacion, setTiposObligacion] = useState({});
  const [cuentaPa01, setCuentaPa01] = useState({});
  const [tiposLiquidacion, setTiposLiquidacion] = useState({})
  const [EstadoBoletin, setEstadoBoletin] = useState({})
  const [CodigosImpuesto, setCodigosImpuesto] = useState({})
  const [CodigosConceptoPago, setCodigosConceptoPag] = useState({})
  const [editing, setEditing] = useState(false)

  const TiposLiquidacionGet = async () => {
    try {
      const data = await load_DDLs.TipoLiquidacion()
      setTiposLiquidacion(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  const tap1setData = async () => {
    try{
      const deva = await boletinDePagoService.getdeva(data?.duca_Id)
      console.log('devita modric', deva[0])
      setValue('Importador_Exportador',deva[0]?.impo_RTN)
      setValue('RTN',deva[0]?.impo_RTN)
      const aduana = await boletinDePagoService.getaduana(deva[0]?.deva_AduanaDespachoId)
  
      setValue('aduana',{codigo : aduana[0]?.adua_Codigo, nombre: aduana[0]?.adua_Nombre})

      setValue('duca_No_Duca',data?.duca_No_Duca)
      setValue('duca_Id',data?.duca_Id)
    }catch{

    }
  }

  const EstadosBoletinGet = async () => {
    try {
      const data = await load_DDLs.EstadoBoletin()
      setEstadoBoletin(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  const CodigosImpuestoGet = async () => {
    try {
      const data = await load_DDLs.CodigoImpuesto()
      setCodigosImpuesto(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  const CodigosConceptoPagoGet = async () => {
    try {
      const data = await load_DDLs.ConceptoPago()
      setCodigosConceptoPag(data)
    } catch (error) {
      console.log(error.message);
    }
  };


  const getTiposLiquidacion = async () => {
    try {
      const response = await boletinDePagoService.getLiquidacionesGenerales()
      const filtrado = response.filter(item => item.duca_Id == data?.duca_Id)
      console.log('el filtrado de impuestos por duca: ', filtrado)
      setImpuestos(filtrado)

      const impuestosDai = filtrado.find(item => item.lige_TipoTributo === "DAI")
      const impuestosIsv = filtrado.find(item => item.lige_TipoTributo === "ISV")
      const impuestosEco = filtrado.find(item => item.lige_TipoTributo === "ECOTASA")
      const impuestosStd = filtrado.find(item => item.lige_TipoTributo === "STD")
      const impuestosSel = filtrado.find(item => item.lige_TipoTributo === "SEL")
      const impuestosProcons = filtrado.find(item => item.lige_TipoTributo === "PROCONS")

      console.log(impuestosSel)

      setValue1('totalPagarDai', impuestosDai ? impuestosDai?.lige_TotalGral : 0)
      setValue1('totalPagarIsv', impuestosIsv ? impuestosIsv?.lige_TotalGral : 0)
      setValue1('totalPagarEco', impuestosEco ? impuestosEco?.lige_TotalGral : 0)
      setValue1('totalPagarStd', impuestosStd ? impuestosStd?.lige_TotalGral : 0)
      setValue1('totalPagarSel', impuestosSel ? impuestosSel?.lige_TotalGral : 0)
      setValue1('totalPagarProcons', impuestosProcons ? impuestosProcons?.lige_TotalGral : 0)

      setValue1('lige_Id_Dai', impuestosDai ? impuestosDai?.lige_Id : "")
      setValue1('lige_Id_Isv', impuestosIsv ? impuestosIsv?.lige_Id : "")
      setValue1('lige_Id_Eco', impuestosEco ? impuestosEco?.lige_Id : "")
      setValue1('lige_Id_Std', impuestosStd ? impuestosStd?.lige_Id : "")
      setValue1('lige_Id_Sel', impuestosSel ? impuestosSel?.lige_Id : "")
      setValue1('lige_Id_Procons', impuestosProcons ? impuestosProcons?.lige_Id : "")

      if (impuestosDai?.lige_Id != undefined) {
        setAplicaDai(true)
        console.log('aplica dai')
      }

      if (impuestosIsv?.lige_Id != undefined) {
        setAplicaIsv(true)
        console.log('aplica isv')
      }

      if (impuestosEco?.lige_Id != undefined) {
        setAplicaEco(true)
        console.log('aplica eco')
      }

      if (impuestosStd?.lige_Id != undefined) {
        setAplicaStd(true)
        console.log('aplica std')
      }

      if (impuestosSel?.lige_Id != undefined) {
        setAplicaSel(true)
        console.log('aplica sel')
      }

      if (impuestosProcons?.lige_Id != undefined) {
        setAplicaProcons(true)
        console.log('aplica Procons')
      }

      const suma = (impuestosEco ? parseFloat(impuestosEco.lige_TotalGral) : 0) +
        (impuestosDai ? parseFloat(impuestosDai.lige_TotalGral) : 0) +
        (impuestosIsv ? parseFloat(impuestosIsv.lige_TotalGral) : 0) +
        (impuestosStd ? parseFloat(impuestosStd.lige_TotalGral) : 0) +
        (impuestosSel ? parseFloat(impuestosSel.lige_TotalGral) : 0) +
        (impuestosProcons ? parseFloat(impuestosProcons.lige_TotalGral) : 0) 

      setValue('boen_TotalPagar', suma)
      setValue('boen_TotalGarantizar', suma)
      setValue1('totalPagar', suma)

    } catch (error) {
      console.log(error.message);
    }
  };

  const calcularTotal = async () => {
    try {
      console.log(modelo1)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    TiposLiquidacionGet()
    EstadosBoletinGet()
    CodigosImpuestoGet()
    CodigosConceptoPagoGet()
    getTiposLiquidacion()
    tap1setData()
    console.log('data traida desde duca', data)
    calcularTotal()
    const ramdom = MakeAleatoryCode(10)
    setValue('boen_NDeclaracion', ramdom)
    setValue('Declarante',data.duca_Numero_Id_Declarante)
  }, [])

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Concepto',
      dataIndex: 'concepto',
      key: 'concepto',
    },
    {
      title: 'Tipo obligación',
      key: 'operation',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <TextField>

            </TextField>
            {/* <FormControl fullWidth>
            <Autocomplete
              disablePortal
              // isOptionEqualToValue={(option, value) => option.value === value.value}
              id="combo-box-demo"
              size='small'
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              options={datitos}
              // value={tiposObligacion[params.id]?.value ? tiposObligacion[params.id].value : null}
              onChange={(event, value) => { value ? handleChangeTiposObligacion(value, params) : null }}
              // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
              renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
              />
              </FormControl> */}
          </Stack>
        </div>
      ,
    },
    {
      title: 'Cuenta PA01',
      key: 'operation1',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <FormControl fullWidth>
              {/* <FormControl variant="standard" sx={{ minWidth: 150 }}> */}
              <Autocomplete
                disablePortal
                disableClearable={true}
                // isOptionEqualToValue={(option, value) => option.value === value.value}
                id="combo-box-demo"
                size='small'
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => option.label}
                options={datitos}
                // value={cuentaPa01[params.id]?.value ? cuentaPa01[params.id].value : null}
                onChange={(event, value) => { value ? handleChangeCuentaPa01(value, params) : null }}
                // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
              />
            </FormControl>
          </Stack>
        </div>
      ,
    },
    {
      title: 'Total Pagar/Garantizar',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const handleChangeTiposObligacion = (event, params) => {
    alert('entra')
    const newItem = { id: params['id'], value: event };

    const updatedtiposObligacion = tiposObligacion.filter(item => item.id !== newItem.id);
    setTiposObligacion([...updatedtiposObligacion, newItem]);
  };
  const handleChangeCuentaPa01 = (event, params) => {
    alert('entraww')
    const newItem = { id: params['id'], value: event };
    const updatedcuentaPa01 = cuentaPa01.filter(item => item.id !== newItem.id);
    setCuentaPa01([...updatedcuentaPa01, newItem]);
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/0KkrNp4/IMPRESI-N-BOLET-N-DE-PAGO.png"
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
            sx={{ backgroundColor: '#FFF7F7', color: 'black' }}
          >
            <Tab label="Datos Generales" {...a11yProps(0)} />
            <Tab label="Detalles de liquidación" {...a11yProps(1)} disabled={editing ? false : true} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >

          <form onSubmit={handleSubmit((_data) => { })} >
            <TabPanel value={value} index={0} dir={theme.direction}>

              <Grid container spacing={3}>

                <Grid item xs={12}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip color='default' label="Boletín de pago" />
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.liqu_Id} fullWidth>Liquidación</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type='number'
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errors.liqu_Id}
                        ></TextField>
                      )}
                      name="liqu_Id"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Importador</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          disabled
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errors.Importador_Exportador}
                        ></TextField>
                      )}
                      name="Importador_Exportador"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>

                {/* <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.boen_NDeclaracion} fullWidth={true}>Declaración No.</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errors.boen_NDeclaracion}
                        ></TextField>
                      )}
                      name="boen_NDeclaracion"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid> */}

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.tipl_Id}>Tipo Liquidación</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        id="combo-box-demo"
                        options={tiposLiquidacion}
                        placeholder=''
                        onChange={(params, value) => {
                          setValue('tipl_Id', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="" error={!!errors.tipl_Id} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="tipl_Id"
                      control={control}
                    />
                  </FormControl>
                </Grid>
                {/* {editing ? 'editando' : 'creando'} */}

                {/* <Grid item xs={4}>
                  <Controller
                    name="boen_FechaEmision"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        error={!!errors.boen_FechaEmision}
                        fullWidth={true}
                      >
                        <FormLabel>
                          Fecha de Emision:
                        </FormLabel>
                        <DatePicker
                          onChange={(date) => field.onChange(date)}
                          value={field.value}
                          required
                          disableFuture={true}
                          maxDate={new Date()}
                          minDate={new Date(1900, 0, 1)}
                          renderInput={(_props) => (
                            <TextField
                              className="w-full"
                              {..._props}
                              onBlur={field.onBlur}
                              error={!!errors.boen_FechaEmision}
                              helperText={errors?.boen_FechaEmision?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errors?.boen_FechaEmision?.message}
                            />
                          )}
                          className="w-full"
                        />
                      </FormControl>
                    )}
                  />
                </Grid> */}

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.Estado}>Estado</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={EstadoBoletin}
                        value={modelo["Estado"]}
                        onChange={(event, value) => { setValue('Estado', value) }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.Estado}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    )} name="Estado"
                      control={control}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.boen_Preimpreso}>Preimpreso</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errors.boen_Preimpreso}
                        ></TextField>
                      )}
                      name="boen_Preimpreso"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Observaciones</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errors.Observaciones}
                        ></TextField>
                      )}
                      name="Observaciones"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>
                {/* <Typography>Is Valid: {isValid ? 'true' : 'false'}</Typography> */}
                {/* {editing ? 'editando' : 'creando'} */}
                <Grid item xs={12}>
                  <Divider style={{ marginTop: '20px', marginBottom: '0px' }}>
                    <Chip color='default' label="Otros Datos" />
                  </Divider>
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    render={({ field }) => (
                      <InputMask
                        mask="9999-9999-999999"
                        value={modelo["RTN"]}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        maskChar=""
                      >
                        {() => (
                          <FormControl fullWidth>
                            <FormLabel error={!!errors?.RTN} >Registro Tributario (RTN)</FormLabel>
                            <TextField
                              {...field}
                              disabled={true}
                              helperText={errors?.RTN?.message}
                              InputProps={{
                                startAdornment: (<InputAdornment position="start"></InputAdornment>),
                              }}
                              error={!!errors.RTN}
                            ></TextField>
                          </FormControl>
                        )}
                      </InputMask>
                    )}
                    name="RTN"
                    control={control}
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.coim_Id}>Código Impuesto</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={CodigosImpuesto}
                        disableClearable={true}
                        value={modelo["coim_Id"]}
                        onChange={(event, value) => { setValue('coim_Id', value) }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.coim_Id}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    )} name="coim_Id"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.copa_Id}>Código Concepto de Pago</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={CodigosConceptoPago}
                        value={modelo["copa_Id"]}
                        onChange={(event, value) => { setValue('copa_Id', value) }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.copa_Id}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    )} name="copa_Id"
                      control={control}
                    />
                  </FormControl>
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
                    onClick={() => {
                      handleSubmit()
                      validacion(1)
                    }}
                    type="submit"
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
                    onClick={() => {
                      navigate('/BoletindePago/Index');
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </form>

          <TabPanel value={value} index={1} dir={theme.direction}>

            <form onSubmit={handleSubmit1((_data) => { })} >
              <Grid container spacing={3} padding={5}>

                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <strong>Concepto</strong>
                  </Grid>
                  <Grid item xs={3}>
                    <strong>Tipo Obligación</strong>
                  </Grid>
                  <Grid item xs={3}>
                    <strong>Cuenta PA01</strong>
                  </Grid>
                  <Grid item xs={3}>
                    <strong>Total Pagar/Garantizar</strong>
                  </Grid>

                  <Grid item xs={3}>
                    ISV IMPTO SOBRE VENTAS
                  </Grid>
                  <Grid item xs={3}>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        id="combo-box-demo"
                        disabled={aplicaIsv ? false : true}
                        options={datitos}
                        placeholder=''
                        onChange={(params, value) => {
                          setValue1('tipoObligacionIsv', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="" error={!!errors1.tipoObligacionIsv} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="tipoObligacionIsv"
                      control={control1}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined-disabled"
                            label=""
                            disabled={aplicaIsv ? false : true}
                            placeholder=""
                            InputProps={{
                              onKeyPress: (event) => {
                                if (!/[0-9 ]/.test(event.key)) {
                                    event.preventDefault();
                                }
                              },
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errors1.cuentaPa01Isv}
                          ></TextField>
                        )}
                        name="cuentaPa01Isv"
                        control={control1}
                      ></Controller>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    {modelo1.totalPagarIsv}
                  </Grid>

                  <Grid item xs={3}>
                    SEL IMPUESTO SELECTIVO AL CONSUMO
                  </Grid>
                  <Grid item xs={3}>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        id="combo-box-demo"
                        disabled={aplicaSel ? false : true}
                        options={datitos}
                        placeholder=''
                        onChange={(params, value) => {
                          setValue1('tipoObligacionSel', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="" error={!!errors1.tipoObligacionSel} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="tipoObligacionSel"
                      control={control1}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined-disabled"
                            label=""
                            disabled={aplicaSel ? false : true}
                            placeholder=""
                            InputProps={{
                              onKeyPress: (event) => {
                                if (!/[0-9 ]/.test(event.key)) {
                                    event.preventDefault();
                                }
                              },
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errors1.cuentaPa01Sel}
                          ></TextField>
                        )}
                        name="cuentaPa01Sel"
                        control={control1}
                      ></Controller>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    {modelo1.totalPagarSel}
                  </Grid>

                  <Grid item xs={3}>
                    ECO ECOTASA
                  </Grid>
                  <Grid item xs={3}>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        id="combo-box-demo"
                        disabled={aplicaEco ? false : true}
                        options={datitos}
                        placeholder=''
                        onChange={(params, value) => {
                          setValue1('tipoObligacionEco', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="" error={!!errors1.tipoObligacionEco} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="tipoObligacionEco"
                      control={control1}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined-disabled"
                            label=""
                            disabled={aplicaEco ? false : true}
                            placeholder=""
                            InputProps={{
                              onKeyPress: (event) => {
                                if (!/[0-9 ]/.test(event.key)) {
                                    event.preventDefault();
                                }
                              },
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errors1.cuentaPa01Eco}
                          ></TextField>
                        )}
                        name="cuentaPa01Eco"
                        control={control1}
                      ></Controller>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    {modelo1.totalPagarEco}
                  </Grid>

                  <Grid item xs={3}>
                    DAI DERECHOS ARANCELARIOS A LA IMPORTACION
                  </Grid>
                  <Grid item xs={3}>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        id="combo-box-demo"
                        options={datitos}
                        disabled={aplicaDai ? false : true}
                        placeholder=''
                        onChange={(params, value) => {
                          setValue1('tipoObligacionDai', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="" error={!!errors1.tipoObligacionDai} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="tipoObligacionDai"
                      control={control1}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            disabled={aplicaDai ? false : true}
                            id="outlined-disabled"
                            label=""
                            placeholder=""
                            InputProps={{
                              onKeyPress: (event) => {
                                if (!/[0-9 ]/.test(event.key)) {
                                    event.preventDefault();
                                }
                              },
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errors1.cuentaPa01Dai}
                          ></TextField>
                        )}
                        name="cuentaPa01Dai"
                        control={control1}
                      ></Controller>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    {modelo1.totalPagarDai}
                  </Grid>

                  <Grid item xs={3}>
                    STD SERVICIO TRANSPORTE DE DATOS
                  </Grid>
                  <Grid item xs={3}>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        disabled={aplicaStd ? false : true}
                        id="combo-box-demo"
                        options={datitos}
                        placeholder=''
                        onChange={(params, value) => {
                          setValue1('tipoObligacionStd', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="" error={!!errors1.tipoObligacionStd} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="tipoObligacionStd"
                      control={control1}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined-disabled"
                            label=""
                            disabled={aplicaStd ? false : true}
                            placeholder=""
                            InputProps={{
                              onKeyPress: (event) => {
                                if (!/[0-9 ]/.test(event.key)) {
                                    event.preventDefault();
                                }
                              },
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errors1.cuentaPa01Std}
                          ></TextField>
                        )}
                        name="cuentaPa01Std"
                        control={control1}
                      ></Controller>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    {modelo1.totalPagarStd}
                  </Grid>

                  <Grid item xs={3}>
                    PROCONS IMPUESTO SOBRE PRODUCCION Y CONSUMO
                  </Grid>
                  <Grid item xs={3}>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        disableClearable={true}
                        disabled={aplicaProcons ? false : true}
                        id="combo-box-demo"
                        options={datitos}
                        placeholder=''
                        onChange={(params, value) => {
                          setValue1('tipoObligacionProcons', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="" error={!!errors1.tipoObligacionProcons} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="tipoObligacionProcons"
                      control={control1}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined-disabled"
                            label=""
                            disabled={aplicaProcons ? false : true}
                            placeholder=""
                            InputProps={{
                              onKeyPress: (event) => {
                                if (!/[0-9 ]/.test(event.key)) {
                                    event.preventDefault();
                                }
                              },
                              startAdornment: (<InputAdornment position="start"></InputAdornment>),
                            }}
                            error={!!errors1.cuentaPa01Procons}
                          ></TextField>
                        )}
                        name="cuentaPa01Procons"
                        control={control1}
                      ></Controller>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    {modelo1.totalPagarProcons}
                  </Grid>

                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
                >
                  <Button
                    startIcon={<Icon>print</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px', marginRight: '10px' }}
                    sx={{
                      backgroundColor: '#634A9E',
                      color: 'white',
                      '&:hover': { backgroundColor: '#6e52ae' },
                    }}
                    onClick={() => {
                      handleSubmit1()
                      validacion1(1)
                    }}
                    type="submit"
                  >
                    Generar Boletin de pago
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
                    onClick={() => {
                      History.push('/BoletindePago/Index');
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>

              </Grid>
            </form>
          </TabPanel>

        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default BoletindePagoCrear;