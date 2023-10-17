import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { Table } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SwipeableViews from "react-swipeable-views";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import LoadingIcon from "src/styles/iconoCargaTabla";
import * as yup from "yup";


import {
    ToastError,
    ToastSuccessEditar,
    ToastSuccessEliminar,
    ToastSuccessGuardado,
    ToastWarning,
    ToastWarningPersonalizado
} from "src/styles/toastsFunctions";
import { black } from "tailwindcss/colors";

import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import PedidosProduccionServices from "./PedidosProduccionservice";


//funcion que muestra y oculta el panel activo 
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

let renderCount = 0;

function PedidosProduccionCrear() {
    const load_DDLs = Load_DDLs()

    const theme = useTheme();
    const [Valor, setValor] = React.useState(0);

    //Constante para la busqueda del datatable
    const [searchText, setSearchText] = useState("");

    // Campos para el DDL de Empleados
    const [Empleados, SetEmpleados] = useState([]);

    // Campos para el DDL de Lotes
    const [Lotes, SetLotes] = useState([]);

    //variable para el service
    const PedidosProduccionService = new PedidosProduccionServices();

    //Constante para la busqueda del datatable
    const [LoteDtos, setLoteDtos] = useState([]);

    //Variable que guarda la cantidad de filas a mostrar
    const [filas, setFilas] = React.useState(10);
    //constante que almacena los datos de la tabla 
    const [DatosDetalles, setDatosDetalles] = useState([]);

    //Variable que hace algo con el menu XD
    const [anchorEl, setAnchorEl] = useState({});
    const [Stock, setStock] = useState(0)

    //variable usada para habilitar el campo de cantidad una vez seleccionnado el lote
    const [CantidadHabilitada, setCantidadHabilitada] = useState(true)

    //variable usada para saber si ya se ingreso correctamente los datos del ap 1
    const [Tap1Validado, setTap1Validado] = useState(true);

    //variable para el dialog(modal) de eliminar
    const [Eliminar, setEliminar] = useState(false);

    //variable para el dialog(modal) de eliminar
    const [Finalizacion, setFinalizacion] = useState(false);

    //Variable pasar Deerminar si ingresara o Editara el Encabezado del detalle
    const [Editar, setEditar] = useState(false);


    const [EditDetalle, setEditDetalle] = useState(false)
    const [ctd, setctd] = useState(0)
    const [LoteId, setLoteId] = useState(0);


    const tab1Fields = {
        ppro_Id: "",
        Empleado: null,
        ppro_Fecha: "",
        ppro_Estados: "",
        ppro_Observaciones: "",
    };

    const tab2Fields = {
        id: "",
        ppro_Id: "",
        lote_Id: "",
        lote_Codigo: "",
        Material: null,
        ppde_Cantidad: "",
    };

    const schemaTab1Fields = yup.object().shape({
        ppro_Id: yup.string(),
        Empleado: yup.object().required(""),
        ppro_Fecha: yup.date("").required("Ingrese una fecha valida").max(new Date()).min(new Date(1900, 0, 1)),
        ppro_Estados: yup.string().trim().required(""),
        ppro_Observaciones: yup.string().trim().required(""),
    });

    const schemaTab2Fields = yup.object().shape({
        id: yup.string(),
        ppro_Id: yup.string(),
        lote_Id: yup.string().trim(),
        lote_Codigo: yup.string().trim().required(""),
        Material: yup.object().required(),
        ppde_Cantidad: yup.string().trim().required(""),
    });

    const [tabsEstado, settabsEstado] = useState({
        tab1: true,
        tab2: true,
    });


    //controlador de las fillas a mostrar
    const handleChangeFilas = (event) => {
        setFilas(event.target.value);
    };

    //Controlador del dialog(modal) de Finalizcion de Pedido
    const DialogFinalizarPedido = () => {
        setFinalizacion(!Finalizacion);
    }

    //Controlador del dialog(modal) eliminar
    const DialogEliminar = () => {
        setEliminar(!Eliminar);
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


    const handleDelete = (datos) => {
        setValue1("id", datos["ppde_Id"]);
        DialogEliminar()
        handleClose(datos.ppde_Id);
    };


    const EditarPedidosProduccion = (datos) => {
     
        try {
        setValue1('id', datos["ppde_Id"]);
        setValue1('lote_Id', datos["lote_Id"]);
        setValue1('lote_Codigo', datos['lote_CodigoLote']);

        setValue1('Material', { value: datos["lote_CodigoLote"], label: `${datos["mate_Descripcion"]} - ${datos["colr_Nombre"] ? `${datos["colr_Nombre"]} - ${datos["lote_CodigoLote"]}` 
            : `${datos["lote_CodigoLote"]}`}`});

        setValue1('ppde_Cantidad', datos["ppde_Cantidad"]);

        setCantidadHabilitada(false);

        LoteMaterial(datos["lote_CodigoLote"]);

        setEditDetalle(true)
        setctd(parseInt(datos["ppde_Cantidad"]));
        setLoteId(datos["lote_Id"]);

        handleClose(datos["ppde_Id"])
        setTap1Validado(false)
        }
        catch (error) {
            ToastError();
        }
        finally{
            setTimeout(() => {
                trigger1()
            }, 200);
        }
    }

    {/* Columnas de la tabla */ }
    const columns = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "Lote",
            dataIndex: "lote_CodigoLote",
            key: "lote_CodigoLote",
            sorter: (a, b) => a.lote_CodigoLote.localeCompare(b.lote_CodigoLote), //sorting para Letras
        },
        {
            title: "Material",
            dataIndex: "mate_Descripcion",
            key: "mate_Descripcion",
            sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), //sorting para Letras
        },
        {
            title: "Cantidad",
            dataIndex: "ppde_Cantidad",
            key: "ppde_Cantidad",
            sorter: (a, b) => a.ppde_Cantidad - b.ppde_Cantidad, //sorting para Letras
        },

        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.ppde_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.ppde_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.ppde_Id)}
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
                            id={`menu-${params.ppde_Id}`}
                            anchorEl={anchorEl[params.ppde_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.ppde_Id])}
                            onClose={() => handleClose(params.ppde_Id)}
                        >
                            <MenuItem onClick={() => { EditarPedidosProduccion(params) }} >
                                <Icon>edit</Icon>ㅤEditar
                            </MenuItem>
                            {<MenuItem onClick={() => handleDelete(params)}>
                                <Icon>delete</Icon>ㅤEliminar
                            </MenuItem>}
                        </Menu>
                    </Stack>
                </div>
            ),
        },
    ];

    const EmpleadosGet = async () => {
        try {
            const data = await load_DDLs.Empleados()
            SetEmpleados(data)
        } catch (error) {
            ToastError();
        }
    };

    const LotesGet = async () => {
        try {
            const data = await load_DDLs.Lotes()
            SetLotes(data)
        } catch (error) {
            ToastError();
        }
    };

    //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
    useEffect(() => {
        EmpleadosGet()
        LotesGet()
    }, []);





    const { handleSubmit, register, reset, control, formState, watch, setValue } = useForm({
        tab1Fields,
        mode: "all",
        resolver: yupResolver(schemaTab1Fields),
    });

    const { handleSubmit: handlesubmit1,
        reset: reset1,
        control: control1,
        formState: formState1,
        watch: watch1,
        setValue: setValue1,
        trigger: trigger1,
    } = useForm({
        tab2Fields,
        mode: "all",
        resolver: yupResolver(schemaTab2Fields),
    });

    const { isValid, dirtyFields, errors } = formState;
    const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1 } = formState1;
    renderCount += 1;
    const datosWatch = watch();
    const datosWatch1 = watch1();

    //Constante para el textfield de busqueda
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };


    //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
    const camposToFilter = ["key", "lote_CodigoLote", "mate_Descripcion", "ppde_Cantidad"];


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

    //Peticion para cargar datos de la tabla
    const DetallesGetData = async (Id) => {
        try {
            setDatosDetalles(await PedidosProduccionService.ListarPedidosProduccionDetalle(Id));
        } catch (error) {
            ToastError();
        }
    };

    const handleChange = (event, newValue) => {
        setValor(newValue);
    };

    const handleChangeIndex = (index) => {
        setValor(index);
    };


    //Peticion para crear el encabezado de pedidos produccion
    const PedidosProduccionCrearTap1 = async () => {

        try {

            if (Editar) {

                const response = await PedidosProduccionService.EditarPedidosProduccion(datosWatch);
                if (response.data.data.messageStatus == "1") {
                    ToastSuccessEditar();

                    setValor(1)
                }
            }
            else {

                const response = await PedidosProduccionService.InsertarPedidosProduccion(datosWatch);
                if (response.data.data.messageStatus != null) {
                    ToastSuccessGuardado();
                    setEditar(true);
                    setValue1('ppro_Id', response.data.data.messageStatus);
                    setValue('ppro_Id', response.data.data.messageStatus);
                    setTap1Validado(false);
                    tabsEstado.tab1 = false;
                    setValor(1)
                }
            }


        } catch (error) {
            ToastError();
        }
    };

    //Validacion 1° TAP
    const validacion = () => {
        if (isValid) {
            PedidosProduccionCrearTap1();

        } else {
            ToastWarning()
        }
    }


    //Constante del listado de la tabla
    const LoteMaterial = async (Id) => {

        try {
            if (Id !== undefined && Id !== "" && Id !== null) { // Corrección en la condición
                let dd = await PedidosProduccionService.LoteMarial(Id);

                if (dd.length <= 0) {
                    setValue1('Material', '');
                    setValue1('lote_Id', '');
                    setCantidadHabilitada(true);
                } else {

                    setValue1('Material', { value: dd[0].lote_CodigoLote, label: `${dd[0].mate_Descripcion} - ${dd[0].colr_Nombre ? `${dd[0].colr_Nombre} - ${dd[0].lote_CodigoLote}` 
                    : `${dd[0].lote_CodigoLote}`}`});
                    setStock(dd[0].lote_Stock);

                    setValue1('lote_Id', dd[0].lote_Id);
                    setValue1('lote_Codigo', dd[0].lote_CodigoLote);
                    setCantidadHabilitada(false);
                }
            } else {
                setStock(0);
                setValue1('Material', '');
                setValue1('lote_Id', '');
                setValue1('ppde_Cantidad', '');
                setCantidadHabilitada(true);
            }
        } catch (error) {
            ToastError();
        }
        finally{
            setTimeout(() => {
                trigger1()
            }, 200);
        }
    };


    //Peticion para crear el encabezado de pedidos produccion
    const PedidosProduccionCrearTap2 = async () => {
        try {
            if (EditDetalle) {
                const response = await PedidosProduccionService.EditarPedidosProduccionDetalle(datosWatch1);
                if (response.data.data.messageStatus != null) {


                    DetallesGetData(datosWatch1['ppro_Id'])

                    setValue1('ppde_Cantidad', "");
                    setValue1('Material', undefined);
                    setValue1('lote_Id', "");
                    setValue1('lote_Codigo', "");

                    setCantidadHabilitada(true);
                    setStock(0);
                    setctd(0);
                    setEditDetalle(false);
                    ToastSuccessEditar();
                }
            } else {
                const response = await PedidosProduccionService.InsertarPedidosProduccionDetalle(datosWatch1);
                if (response.data.data.messageStatus != null) {
                    DetallesGetData(datosWatch1['ppro_Id']);

                    setValue1('ppde_Cantidad', "");
                    setValue1('Material', undefined);
                    setValue1('lote_Id', "");
                    setValue1('lote_Codigo', "");


                    setCantidadHabilitada(true);
                    setStock(0);
                    setctd(0);
                    ToastSuccessGuardado("El registro se ha insertado exitosamente");
                }
            }
        } catch (error) {
            ToastError();
        }
    };


    //Validacion 2° TAP
    const validacionTap2 = () => {

        if (datosWatch1['ppro_Id'] !== "" &&
            datosWatch1['ppde_Cantidad'] !== "" && datosWatch1['lote_Id'] !== "") {
            PedidosProduccionCrearTap2()
        }
        else {
            ToastWarning()
        }
    }

    const ValidarStock = (Cantidad) => {

        if (Cantidad !== null && Cantidad !== "" && Cantidad !== undefined) {
            if (EditDetalle) {
                if (LoteId == datosWatch1['lote_Id']) {
                    if (parseInt(Cantidad) > (parseInt(ctd) + parseInt(Stock))) {
                        setTap1Validado(true);
                        ToastWarningPersonalizado(
                            `La Cantidad Sobrepasa el Stock \n Actualmente contamos con ${parseInt(ctd) + parseInt(Stock)} items en este lote!`
                        )
                    } else {
                        setTap1Validado(false);

                        if (Cantidad == 0)
                            setTap1Validado(true);
                    }
                }
                else {
                    setctd(0)
                    if (Cantidad > Stock) {
                        setTap1Validado(true);
                        ToastWarningPersonalizado(
                            `La Cantidad Sobrepasa el Stock \n Actualmente contamos con ${Stock} items en este lote!`
                        )
                    } else {
                        setTap1Validado(false);
                        if (Cantidad == 0)
                            setTap1Validado(true);
                    }
                }
            } else {

                if (Cantidad > Stock) {
                    setTap1Validado(true);
                    ToastWarningPersonalizado(
                        `La Cantidad Sobrepasa el Stock \n Actualmente contamos con ${Stock} items en este lote!`
                    )
                } else {

                    setTap1Validado(false);

                    if (Cantidad == 0)
                        setTap1Validado(true);
                }
            }
        }
        
    }

    // Peticion para Eliminar un registro
    const EliminarPedidosProduccionDetalles = async () => {
        try {
            const response = await PedidosProduccionService.EliminarPedidosProduccionDetalles(datosWatch1);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEliminar();
                DetallesGetData(datosWatch1['ppro_Id']);
                DialogEliminar();
                setSearchText('');

                setValue1('ppde_Cantidad', "");
                setValue1('Material',);
                setValue1('lote_Id', "");
                setValue1('lote_Codigo', "");

                setCantidadHabilitada(true);
                setStock(0);
                setEditDetalle(false);
                delete datosWatch1.Material;
            }
            else if (response.data.data.messageStatus == "0") {
                DialogEliminar();
                ToastWarning("El registro está en uso");
            }
        } catch (error) {
            ToastError();
        }
    }

    const FinalizarPedidoProduccion = async () => {
        try {
            const response = await PedidosProduccionService.FinalizarPedidoProduccion(datosWatch1);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessGuardado();

                History.push('/PedidosProduccion/index')
            }
        } catch (error) {
            ToastError();
        }
    }


    const CancelarEdit = () => {
        setEditDetalle(false)

        setValue1('ppde_Cantidad', "")
        setValue1('Material',)
        setValue1('lote_Id', "")
        setValue1('lote_Codigo', "");

        setLoteId(0);
        setctd(0);

        setCantidadHabilitada(true);
        setStock(0);
        delete datosWatch1.Material;
    }

    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/ZVVTwPz/PEDIDOS-DE-PRODUCCI-N.png"
                alt="Encabezado de la carta"
            />

                <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                    <AppBar position="static">
                        <Tabs
                            value={Valor}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            sx={{ backgroundColor: "#e5e1fa", color: black }}
                        >
                            <Tab
                                label="I. Pedido de producción Datos generales"
                                {...a11yProps(0)}
                            />
                            <Tab label="II. Pedido de producción Detalles"
                                {...a11yProps(1)}
                                disabled={tabsEstado.tab1} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={Valor}
                        onChangeIndex={handleChangeIndex}
                    >
                        <form onSubmit={handleSubmit((_data) => {
                        })}>
                            <TabPanel value={Valor} index={0} dir={theme.direction}>
                                <Grid container spacing={2}>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="ppro_Fecha"
                                            control={control}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors.ppro_Fecha}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel>
                                                        Fecha de Creación:
                                                    </FormLabel>
                                                    <DatePicker
                                                        onChange={(date) => field.onChange(date)}
                                                        value={field.value || null}
                                                        required
                                                        disableFuture={true}
                                                        maxDate={new Date()}
                                                        minDate={new Date(1900, 0, 1)}
                                                        renderInput={(_props) => (
                                                            <TextField
                                                                className="w-full"
                                                                {..._props}
                                                                onBlur={field.onBlur}
                                                                error={!!errors.ppro_Fecha}
                                                            />
                                                        )}
                                                        className="w-full"

                                                    />
                                                    <FormHelperText>{errors.ppro_Fecha ? 'Ingrese una fecha valida' : ''} </FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="Empleado"
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl
                                                        error={!!errors.Empleado}
                                                        fullWidth={true}
                                                    >
                                                        <FormLabel
                                                            error={!!errors.Empleado}
                                                        >
                                                            Empleados:
                                                        </FormLabel>
                                                        <Autocomplete
                                                            {...field}
                                                            disablePortal
                                                            isOptionEqualToValue={(option, value) =>
                                                                option.value === value.value
                                                            }
                                                            id="Empleado"

                                                            options={Empleados}
                                                            value={datosWatch["Empleado"] ?? null}
                                                            onChange={async (event, value) => {
                                                                setValue('Empleado', value)
                                                                setValue('ppro_Estados', "Pendiente");
                                                            }}

                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={!!errors.Empleado}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className=" mb-16">
                                            <Controller
                                                render={({ field }) => (
                                                    <FormControl error={!!errors.ppro_Observaciones} fullWidth={true}>
                                                        <FormLabel>
                                                            Observaciones:
                                                        </FormLabel>
                                                        <TextField
                                                            type="text"
                                                            {...field}
                                                            error={!!errors.ppro_Observaciones}
                                                            variant="outlined"
                                                            multiline

                                                            rows={8}


                                                            inputprops={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start"></InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </FormControl>
                                                )}
                                                name="ppro_Observaciones"
                                                control={control}
                                            />
                                        </div>
                                    </Grid>
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
                                        onClick={validacion}
                                    >
                                        {Editar ? 'Editar' : 'Guardar'}
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
                                            History.push("/PedidosProduccion/index");
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </TabPanel>
                        </form>

                        <TabPanel value={Valor} index={1} dir={theme.direction}>

                            <form onSubmit={handlesubmit1((_data) => {
                            })}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Controller
                                            name="lote_Codigo"
                                            control={control1}
                                            render={({ field }) => (
                                                <FormControl error={!!errors1.lote_Codigo} fullWidth={true}>
                                                    <FormLabel>
                                                        Codigó del Lote:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        error={!!errors1.lote_Codigo}
                                                        variant="outlined"
                                                        type="text"
                                                        value={datosWatch1['lote_Codigo']}
                                                        onKeyUp={() => { LoteMaterial(field.value) }}
                                                        InputProps={{
                                                            inputProps: {
                                                                step: 1,
                                                                min: 0,
                                                            },
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}

                                                    />
                                                    <FormHelperText style={{ color: 'red' }}>
                                                        {datosWatch1['Material'] ? '' : (datosWatch1['Material'] === undefined ? '' : 'El lote No Existe')}
                                                    </FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormLabel>
                                            Stock:
                                        </FormLabel>
                                        <div className="col-span-2 flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-blue-50 text-blue-800">

                                            <Typography className="mt-3 text-sm sm:text-lg font-medium">{LoteId == datosWatch1['lote_Id'] ? Stock + ctd : Stock}</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6}>


                                        <div className=" mb-16">
                                            <Controller
                                                name="Material"
                                                control={control1}
                                                render={({ field }) => (
                                                    <FormControl
                                                        error={!!errors1.Material}
                                                        fullWidth={true}
                                                    >
                                                        <FormLabel

                                                        >
                                                            Material:
                                                        </FormLabel>
                                                        <Autocomplete
                                                            {...field}
                                                            disablePortal
                                                            isOptionEqualToValue={(option, value) =>
                                                                option.value === value.value
                                                            }
                                                            id="Material"
                                                            //disabled={Tap1Activado}
                                                            options={Lotes}
                                                            disableClearable={true}
                                                            value={datosWatch1["Material"] ?? null}
                                                            onChange={async (event, value) => {
                                                                LoteMaterial(value.value)
                                                                setValue1('ppde_Cantidad', "");
                                                                setValue1('lote_Codigo', value.value)
                                                            }}

                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={!!errors1.Material}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>




                                        {/* <Controller
                                            name="Material"
                                            control={control1}
                                            render={({ field }) => (
                                                <FormControl error={!!errors1.Material} fullWidth={true}>
                                                    <FormLabel>
                                                        Material:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        error={!!errors1.Material}
                                                        variant="outlined"
                                                        disabled
                                                        value={datosWatch1['Material'] == undefined ? '' : datosWatch1['Material']}

                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    ></TextField>
                                                </FormControl>
                                            )}
                                        /> */}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="ppde_Cantidad"
                                            control={control1}
                                            render={({ field }) => (
                                                <FormControl error={!!errors1.ppde_Cantidad} fullWidth={true} >
                                                    <FormLabel>
                                                        Cantidad:
                                                    </FormLabel>
                                                    <TextField
                                                        disabled={CantidadHabilitada}
                                                        {...field}
                                                        error={!!errors1.ppde_Cantidad}
                                                        variant="outlined"
                                                        type="text"
                                                        onKeyUp={() => {
                                                            ValidarStock(field.value)
                                                        }}
                                                        InputProps={{
                                                            inputProps: {
                                                                step: 1,
                                                                min: 0,
                                                            },
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />


                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6} style={{ marginTop: '10px' }}>


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
                                            disabled={Tap1Validado}
                                            onClick={validacionTap2}
                                        >
                                            {EditDetalle ? 'Editar' : 'Agregar'}
                                        </Button>


                                        <Button
                                            startIcon={<Icon>close</Icon>}
                                            variant="contained"
                                            color="primary"
                                            visible={EditDetalle}
                                            style={{
                                                borderRadius: "10px",
                                                marginTop: "10px",
                                                backgroundColor: "#DAD8D8",
                                                color: "black",
                                                "&:hover": { backgroundColor: "#BFBABA" },
                                                visibility: EditDetalle ? 'visible' : 'hidden', // Controla la visibilidad
                                            }}
                                            onClick={() => {
                                                CancelarEdit()
                                            }}
                                        >
                                            Cancelar
                                        </Button>



                                    </Grid>

                                </Grid>
                            </form>

                            <Grid container spacing={2}>

                                <Grid item xs={12} style={{ marginTop: '10px' }}>

                                    {/* Filtros de la tabla (Filas/Buscar) */}
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <label className="mt-8">Filas por página:</label>
                                        <FormControl sx={{ minWidth: 50 }} size="small">
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={filas}
                                                onChange={handleChangeFilas}
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
                                    </Stack>
                                </Grid>

                                {/* Declaracion de la tabla */}
                                <div className="center" style={{ width: "95%", margin: "auto", marginTop: "10px" }}>
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
                                    marginTop: '10px'
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
                                    onClick={() => {
                                        History.push("/PedidosProduccion/index");
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
                                        History.push("/PedidosProduccion/index");
                                    }}
                                >
                                    Cancelar
                                </Button>

                            </Grid>

                            {/* Inicia del Dialog(Modal) Eliminar */}
                            <Dialog
                                open={Eliminar}
                                fullWidth
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
                                            color="error"
                                            style={{ borderRadius: "10px", marginRight: "10px" }}
                                            onClick={EliminarPedidosProduccionDetalles}
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
                            {/* Fin del Dialog(Modal) Eliminar */}



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
                                            onClick={DialogFinalizarPedido}
                                        >
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </DialogActions>
                            </Dialog>

                        </TabPanel>
                    </SwipeableViews>
                </Box>
         
        </Card >
    )
}

export default PedidosProduccionCrear