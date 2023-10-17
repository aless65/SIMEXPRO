import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import {
    AppBar,
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
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
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
import { black } from "tailwindcss/colors";

import {
    ToastError,
    ToastSuccessEditar,
    ToastSuccessEliminar,
    ToastSuccessGuardado,
    ToastSuccessPersonalizado,
    ToastWarning,
    ToastWarningPersonalizado
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import FacturasExportacionService from "./FacturaExportacionService";


//funcion que muestra FacturasExportacionServicey oculta el panel activo 
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

function FacturaExportacionCrear() {

    const theme = useTheme();
    const [Valor, setValor] = useState(0);
    const [prev_orco_Id, Setprev_orco_Id] = useState(null);
    //Constante para la busqueda del datatable
    const [searchText, setSearchText] = useState("");

    const [OrdenCompra, SetOrdenCompra] = useState([]);

    const [poDetalles, SetPODetalles] = useState([]);
    //variable para el service
    const facturaExportacionService = FacturasExportacionService();

    //Variable que guarda la cantidad de filas a mostrar
    const [filas, setFilas] = React.useState(10);
    //constante que almacena los datos de la tabla 
    const [DatosDetalles, setDatosDetalles] = useState([]);

    //Variable que hace algo con el menu XD
    const [anchorEl, setAnchorEl] = useState({});

    //variable usada para saber si ya se ingreso correctamente los datos del ap 1
    const [Tap1Validado, setTap1Validado] = useState(true);

    //variable para el dialog(modal) de eliminar
    const [Eliminar, setEliminar] = useState(false);

    //variable para el dialog(modal) de eliminar
    const [Finalizacion, setFinalizacion] = useState(false);

    // Variable para el dialog(modal) de cambiar la PO ID
    const [Cambiar, setCambiar] = useState(false);

    //Variable pasar Deerminar si ingresara o Editara el Encabezado de la factura
    const [Editar, setEditar] = useState(false);

    // Variable para determinar si se editaran los detalles de la factura 
    const [EditDetalle, setEditDetalle] = useState(false)

    const [DUCA_NOTFOUND, Set_DUCA_NOTFOUND] = useState("")

    const [DeleteID, setDeleteID] = useState("");



    const tab1Fields = {
        faex_Id: "",
        duca_No_Duca: "",
        faex_Fecha: "",
        orco_Id: null,
    };

    const tab2Fields = {
        fede_Id: "",
        faex_Id: "",
        code_Id: null,
        fede_Cajas: "",
        fede_Cantidad: "",
        fede_PrecioUnitario: "",
        fede_TotalDetalle: "",
    };

    const schemaTab1Fields = yup.object().shape({
        faex_Id: yup.string(),
        duca_No_Duca: yup.string().trim(),
        faex_Fecha: yup.date("").required("Ingrese una fecha valida").max(new Date()).min(new Date(1900, 0, 1)),
        orco_Id: yup.object().required(""),
    });

    const schemaTab2Fields = yup.object().shape({
        fede_Id: yup.string(),
        faex_Id: yup.string(),
        code_Id: yup.object().required(""),
        fede_Cajas: yup.string().trim().required(""),
        fede_Cantidad: yup.string().trim().required(""),
        fede_PrecioUnitario: yup.string().trim().required(""),
        fede_TotalDetalle: yup.string().trim().required(""),
    });

    const [tabsEstado, settabsEstado] = useState({
        tab1: true,
        tab2: true,
    });

    const handleChangeFilas = (event) => {
        setFilas(event.target.value);
    };

    const DialogFinalizarPedido = () => {
        setFinalizacion(!Finalizacion);
    }

    const DialogCambiar = () => {
        setCambiar(!Cambiar);
        setValue('orco_Id', { value: prev_orco_Id["value"], label: prev_orco_Id["label"] });
    }

    const DialogEliminar = () => {
        setEliminar(!Eliminar);
    };

    const handleClick = (event, id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: event.currentTarget,
        }));
    };

    const handleClose = (id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: null,
        }));
    };

    const handleDelete = (datos) => {
        setDeleteID(datos["fede_Id"]);
        DialogEliminar()
        handleClose(datos["fede_Id"]);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "PO Item No.",
            dataIndex: "code_Descripcion",
            key: "code_Descripcion",
            sorter: (a, b) => a.code_Descripcion.localeCompare(b.code_Descripcion), //sorting para Letras
        },
        {
            title: "Cantidad Cajas",
            dataIndex: "fede_Cajas",
            key: "fede_Cajas",
            sorter: (a, b) => a.fede_Cajas.localeCompare(b.fede_Cajas), //sorting para Letras
        },
        {
            title: "Cantidad prendas (docena)",
            dataIndex: "fede_Cantidad",
            key: "fede_Cantidad",
            sorter: (a, b) => a.fede_Cantidad.localeCompare(b.fede_Cantidad), //sorting para Letras
        },
        {
            title: "Precio unitario",
            dataIndex: "fede_PrecioUnitario",
            key: "fede_PrecioUnitario",
            sorter: (a, b) => a.fede_PrecioUnitario.localeCompare(b.fede_PrecioUnitario), //sorting para Letras
        },
        {
            title: "Total Detalle",
            dataIndex: "fede_TotalDetalle",
            key: "fede_TotalDetalle",
            sorter: (a, b) => a.fede_TotalDetalle.localeCompare(b.fede_TotalDetalle), //sorting para Letras
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.fede_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.fede_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.fede_Id)}
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
                            id={`menu-${params.fede_Id}`}
                            anchorEl={anchorEl[params.fede_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.fede_Id])}
                            onClose={() => handleClose(params.fede_Id)}
                        >
                            <MenuItem onClick={() => { setItemsToEdit(params) }} >
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

    const OrdenesCompraDDL = async () => {
        try {
            const data = await facturaExportacionService.OrdenesCompraDDL()
            SetOrdenCompra(data);
        } catch (error) {
            
        }
    };



    const PODetallesDDL = async (ID) => {
        try {
            const data = await facturaExportacionService.PODetallesDDL(ID)
            SetPODetalles(data);
        } catch (error) {
            ;
            
        }
    }

    useEffect(() => {
        OrdenesCompraDDL();
    }, []);

    const { handleSubmit, register, reset, control, formState, watch, setValue } = useForm({
        tab1Fields,
        mode: "all",
        resolver: yupResolver(schemaTab1Fields),
    });

    const { handleSubmit: handlesubmit1, reset: reset1, control: control1, formState: formState1,
        watch: watch1, setValue: setValue1 } = useForm({
            tab2Fields,
            mode: "all",
            resolver: yupResolver(schemaTab2Fields),
        });

    const { isValid, dirtyFields, errors } = formState;
    const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1 } = formState1;
    renderCount += 1;
    const datosWatch = watch();
    const datosWatch1 = watch1();

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const camposToFilter = ["key", "code_Descripcion", "fede_Cajas", "fede_Cantidad", "fede_PrecioUnitario", "fede_TotalDetalle"];

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

    const DetallesGetData = async (Id) => {
        try {
            setDatosDetalles(await facturaExportacionService.ListarFacturasExportacionDetalle(Id));
        } catch (error) {
            
        }
    };

    const handleChange = (event, newValue) => {
        setValor(newValue);
    };

    const handleChangeIndex = (index) => {
        setValor(index);
    };

    const InsertarHeaderFactura = async () => {
        try{
            const response = await facturaExportacionService.InsertarFacturasExportacion(datosWatch);
            if (response.data.data.messageStatus != null) {
                ToastSuccessGuardado();
                PODetallesDDL(response.data.data.messageStatus);
                setEditar(true);
                setValue1('faex_Id', response.data.data.messageStatus);
                setValue('faex_Id', response.data.data.messageStatus);
                setTap1Validado(false);
                tabsEstado.tab1 = false;
                setValor(1)
                Setprev_orco_Id(datosWatch["orco_Id"]);
            }
        }
        catch(error){
            ToastError()
        }
    }

    const EditarHeaderFactura = async () => {
        try{
            const response = await facturaExportacionService.EditarFacturasExportacion(datosWatch);
            
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEditar();
                PODetallesDDL(datosWatch1["faex_Id"]);
                CleanTab2();
                setValor(1);
                setCambiar(false);
                Setprev_orco_Id(datosWatch["orco_Id"]);
                DetallesGetData(datosWatch['faex_Id']);
            }
        }
        catch(error){
            ToastError()
        }
    }

    const FacturaExportacionCrearTap1 = async () => {
        try {
            if (Editar) {
                if (datosWatch.orco_Id["value"] !== prev_orco_Id["value"]) {
                    setCambiar(!Cambiar);
                } else {
                    EditarHeaderFactura();
                }
            }
            else {
                InsertarHeaderFactura()
            }
        } catch (error) {
            
            ToastError("Error inesperado");
        }
    };

    const validacion = () => {
        if (isValid && DUCA_NOTFOUND == "") {
            FacturaExportacionCrearTap1();
        } else {
            ToastWarning()
        }
    }

    const ComprobarNoDUCA = async (duca) => {
        try {
            if (duca !== undefined && duca !== "" && duca !== null) {

                let response = await facturaExportacionService.ComprobarNoDUCA(duca);
                if (response.data.data.messageStatus == "0") {
                    Set_DUCA_NOTFOUND("No. de DUCA inexistente");
                }
                else {
                    ToastSuccessPersonalizado('No. de DUCA encontrado!');
                    Set_DUCA_NOTFOUND("");
                    setValue("duca_No_Duca", response.data.data.messageStatus)
                }
            }
        } catch (error) {
            
        }
    };



    function CleanTab2() {
        setValue1('fede_Id', "");
        setValue1('code_Id', null);
        setValue1('fede_Cajas', "");
        setValue1('fede_Cantidad', "");
        setValue1('fede_PrecioUnitario', "");
        setValue1('fede_TotalDetalle', "");
    }

    function clearErrorLabels_Items() {
        errors1.code_Id = false
        errors1.fede_Cajas = false
        errors1.fede_Cantidad = false
        errors1.fede_PrecioUnitario = false
    }

    const setItemsToEdit = (datos) => {
        
        clearErrorLabels_Items();
        setValue1('faex_Id', datosWatch.faex_Id);
        setValue1('fede_Id', datos["fede_Id"]);
        setValue1('code_Id', { value: datos["code_Id"], label: datos["code_Descripcion"] });
        setValue1('fede_Cajas', datos["fede_Cajas"]);
        setValue1('fede_Cantidad', datos["fede_Cantidad"]);
        setValue1('fede_PrecioUnitario', datos["fede_PrecioUnitario"]);
        setValue1('fede_TotalDetalle', datos["fede_TotalDetalle"]);
        setEditDetalle(true);
        handleClose(datos["fede_Id"]);
        setTap1Validado(false);
    }

    const EditarItemsFactura = async () => {
        const response = await facturaExportacionService.EditarFacturasExportacionDetalle(datosWatch1);
        if (response.data.data.messageStatus != null) {
            DetallesGetData(datosWatch['faex_Id']);
            CleanTab2();
            setEditDetalle(false)
            ToastSuccessEditar();
        }
    }

    const InsertarItemsFactura = async () => {
        const response = await facturaExportacionService.InsertarFacturasExportacionDetalle(datosWatch1);
        if (response.data.data.messageStatus != null) {
            CleanTab2();
            DetallesGetData(datosWatch['faex_Id']);
            ToastSuccessGuardado();
        }
    }

    const FacturaExportacionCrearTap2 = async () => {
        try {
            if (EditDetalle) {
                EditarItemsFactura();
            }
            else {
                InsertarItemsFactura();
            }
        } catch (error) {
            
            ToastError("Error inesperado");
        }
    };

    const validacionTap2 = () => {
        if (
            isValid1 &&
            datosWatch1.faex_Id != "" &&
            datosWatch1.fede_Cantidad != "" &&
            datosWatch1.code_Id != null &&
            datosWatch1.fede_TotalDetalle != "" &&
            datosWatch1.fede_Cajas != "" &&
            datosWatch1.fede_Cantidad != "" &&
            datosWatch1.fede_PrecioUnitario != ""
        ) {
            FacturaExportacionCrearTap2()
        }
        else {
            ToastWarning()
        }
    }

    const EliminarFacturasExportacionDetalles = async () => {
        try {
            const response = await facturaExportacionService.EliminarFacturasExportaciondetalles(DeleteID);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEliminar();
                DetallesGetData(datosWatch['faex_Id']);
                DialogEliminar();
                setSearchText('');
                CleanTab2();
                setEditDetalle(false);
            }
            else if (response.data.data.messageStatus == "0") {
                DialogEliminar();
                ToastWarningPersonalizado("El registro está en uso");
            }
        } catch (error) {
            
            ToastError("Error inesperado");
        }
    }

    const FinalizarFacturaExportacion = async () => {
        try {
            const response = await facturaExportacionService.FinalizarFacturasExportacion(datosWatch1);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessGuardado();
                History.push('/FacturasExportacion/index')
            }
        } catch (error) {
            
            ToastError();
        }
    }

    const CancelarEdit = () => {
        setEditDetalle(false)
        CleanTab2();
        clearErrorLabels_Items();
    }

    function SetDetalleTotal() {
        setValue1('fede_TotalDetalle', datosWatch1['fede_Cantidad'] * datosWatch1['fede_PrecioUnitario']);
    }

    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/ys0p6LP/FACTURAS-DE-EXPORTACION.png"
                alt="Encabezado de la carta"
            />
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
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
                                label="I. Encabezado de la factura"
                                {...a11yProps(0)}
                            />
                            <Tab label="II. Items de la factura"
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

                                    {/* CAMPO NO. DUCA */}
                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="duca_No_Duca"
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl
                                                        error={!!errors.duca_No_Duca} fullWidth={true}
                                                    >
                                                        <FormLabel>No. DUCA</FormLabel>
                                                        <TextField
                                                            {...field}
                                                            error={!!errors.duca_No_Duca}
                                                            variant="outlined"
                                                            type="text"
                                                            onKeyUp={() => { ComprobarNoDUCA(field.value) }}
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
                                                            {DUCA_NOTFOUND}
                                                        </FormHelperText>
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                    </Grid>

                                    {/* CAMPO FECHA */}
                                    <Grid item xs={6}>
                                        <Controller
                                            name="faex_Fecha"
                                            control={control}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors.faex_Fecha}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel>
                                                        Fecha:
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
                                                                error={!!errors.faex_Fecha}
                                                            />
                                                        )}
                                                        className="w-full"

                                                    />
                                                    <FormHelperText>{errors.faex_Fecha ? 'Ingrese una fecha valida' : ''} </FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    {/* CAMPO NO. ORDEN COMPRA  */}
                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="orco_Id"
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl
                                                        error={!!errors.orco_Id}
                                                        fullWidth={true}
                                                    >
                                                        <FormLabel
                                                            error={!!errors.orco_Id}
                                                        >
                                                            Orden de Compra No.
                                                        </FormLabel>
                                                        <Autocomplete
                                                            {...field}
                                                            disablePortal
                                                            isOptionEqualToValue={(option, value) =>
                                                                option.value === value.value
                                                            }
                                                            id="orco_Id"

                                                            options={OrdenCompra}
                                                            value={datosWatch["orco_Id"] ?? null}
                                                            onChange={async (event, value) => {
                                                                setValue('orco_Id', value);
                                                            }}

                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={!!errors.orco_Id}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                )}
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
                                            History.push("/FacturasExportacion/index");
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>

                                {/* Dialog de confirmacion si cambiar o no el ID de la orden de compra */}
                                <Dialog
                                    open={Cambiar}
                                    fullWidth
                                    onClose={DialogCambiar}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Confirmación de Cambio de Órden de Compra
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Al cambiar de órden de compra, los items ingresados con el código de la órden de compra anterior serán eliminados.
                                            ¿Está seguro(a) que desea continuar?
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
                                                onClick={EditarHeaderFactura}
                                            >
                                                Confirmar
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
                                                onClick={DialogCambiar}
                                            >
                                                Cancelar
                                            </Button>
                                        </Grid>
                                    </DialogActions>
                                </Dialog>
                                {/*  */}

                            </TabPanel>
                        </form>

                        <TabPanel value={Valor} index={1} dir={theme.direction}>

                            <form onSubmit={handlesubmit1((_data) => {
                            })}>
                                <Grid container spacing={2}>

                                    {/* CAMPO NO. ORDEN COMPRA DETALLE  */}
                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="code_Id"
                                                control={control1}
                                                render={({ field }) => (
                                                    <FormControl
                                                        error={!!errors1.code_Id}
                                                        fullWidth={true}
                                                    >
                                                        <FormLabel
                                                            error={!!errors1.code_Id}
                                                        >
                                                            Codigo de Item de la Orden de Compra:
                                                        </FormLabel>
                                                        <Autocomplete
                                                            {...field}
                                                            disablePortal
                                                            isOptionEqualToValue={(option, value) =>
                                                                option.value === value.value
                                                            }
                                                            id="code_Id"
                                                            options={poDetalles}
                                                            value={datosWatch1["code_Id"] ?? null}
                                                            onChange={async (event, value) => {
                                                                setValue1('code_Id', value)
                                                            }}

                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={!!errors1.code_Id}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                    </Grid>

                                    {/* CAMPO CAJAS  */}
                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="fede_Cajas"
                                                control={control1}
                                                render={({ field }) => (
                                                    <FormControl error={!!errors1.fede_Cajas} fullWidth={true}>
                                                        <FormLabel>
                                                            Cajas utilizadas:
                                                        </FormLabel>
                                                        <TextField
                                                            {...field}
                                                            error={!!errors1.fede_Cajas}
                                                            variant="outlined"
                                                            type="text"
                                                            InputProps={{
                                                                inputProps: {
                                                                    step: 1,
                                                                    min: 0,
                                                                },
                                                                onKeyPress: (event) => {
                                                                    // Permitir solo números (0-9)
                                                                    if (!/^\d+$/.test(event.key)) {
                                                                      event.preventDefault();
                                                                    }
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
                                        </div>
                                    </Grid>

                                    {/* CAMPO   CANTIDAD */}
                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="fede_Cantidad"
                                                control={control1}
                                                render={({ field }) => (
                                                    <FormControl error={!!errors1.fede_Cantidad} fullWidth={true}>
                                                        <FormLabel>
                                                            Cantidad prendas en Docenas:
                                                        </FormLabel>
                                                        <TextField
                                                            {...field}
                                                            error={!!errors1.fede_Cantidad}
                                                            variant="outlined"
                                                            type="text"
                                                            InputProps={{
                                                                inputProps: {
                                                                    step: 1,
                                                                    min: 0,
                                                                },
                                                                onKeyPress: (event) => {
                                                                    // Permitir solo números (0-9)
                                                                    if (!/^\d+$/.test(event.key)) {
                                                                      event.preventDefault();
                                                                    }
                                                                  },
                                                                startAdornment: (
                                                                    <InputAdornment position="start"></InputAdornment>
                                                                ),
                                                            }}
                                                            onKeyUp={(event) => {
                                                                SetDetalleTotal()
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                    </Grid>

                                    {/* CAMPO  PRECIO UNITARIO */}
                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="fede_PrecioUnitario"
                                                control={control1}
                                                render={({ field }) => (
                                                    <FormControl error={!!errors1.fede_PrecioUnitario} fullWidth={true}>
                                                        <FormLabel>
                                                            Precio unitario:
                                                        </FormLabel>
                                                        <TextField
                                                            {...field}
                                                            error={!!errors1.fede_PrecioUnitario}
                                                            variant="outlined"
                                                            type="text"
                                                            InputProps={{
                                                                inputProps: {
                                                                    step: 1,
                                                                    min: 0,
                                                                },
                                                                onKeyPress: (event) => {
                                                                    // Permitir solo números (0-9)
                                                                    if (!/^\d+$/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                },
                                                                startAdornment: (
                                                                    <InputAdornment position="start"></InputAdornment>
                                                                ),
                                                            }}
                                                            onKeyUp={(event) => {
                                                                SetDetalleTotal()
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                    </Grid>

                                    {/* CAMPO  TOTAL DETALLES  */}
                                    <Grid item xs={6}>
                                        <div className=" mb-16">
                                            <Controller
                                                name="fede_TotalDetalle"
                                                control={control1}
                                                render={({ field }) => (
                                                    <FormControl fullWidth={true}>
                                                        <FormLabel>
                                                            Total Detalle:
                                                        </FormLabel>
                                                        <TextField
                                                            {...field}
                                                            error={!!errors1.fede_TotalDetalle}
                                                            variant="outlined"
                                                            type="text"
                                                            disabled
                                                            //value={ parseFloat(datosWatch1['fede_Cantidad']).toFixed(2) * parseFloat(datosWatch1['fede_PrecioUnitario']).toFixed(2)}
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
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
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
                                    onClick={DialogFinalizarPedido}
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
                                        History.push("/FacturasExportacion/index");
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
                                            onClick={EliminarFacturasExportacionDetalles}
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
                                        ¿Está seguro(a) de que desea finalizar esta factura? <br></br>Le recordamos que una vez que la factura sea finalizada, no será posible realizar modificaciones en la misma.
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
                                            onClick={FinalizarFacturaExportacion}
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
            </CardContent>
        </Card >
    )
}

export default FacturaExportacionCrear