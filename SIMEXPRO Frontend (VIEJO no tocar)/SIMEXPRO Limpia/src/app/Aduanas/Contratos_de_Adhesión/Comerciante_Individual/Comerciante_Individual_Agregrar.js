import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Button,
    FormControl,
    Icon,
    InputLabel,
    TextField,
    InputAdornment
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";
import { useState } from "react";

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

function Comerciante_Individual_Agregar() {
    const Navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

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
    });

    const validacion = (params, event) => {
        if (event) {
            event.preventDefault();
        }
        if ((params == 1)) {
            settabsEstado({
                tab1: false,
                tab2: true,
                tab3: true,
                tab4: true,
            });
            setValue(1);
        }

        if ((params == 2)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: true,
                tab4: true,
            });
            setValue(2);
        }

        if ((params == 3)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: true,
            });
            setValue(3);
        }

        if ((params == 4)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
            });
            setValue(4);
        }
    };


    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/FBTmyr7/CONTRATO-DE-ADHESI-N-COMERCIANTE-INDIVIDUAL.png"
                alt="Encabezado de la carta"
            />
            <CardContent sx={{ textAlign: "center" }}>

            </CardContent>

            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ backgroundColor: "#FFF7F7", color: black }}
                    >
                        <Tab
                            label="Datos Generales"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Domicilio del Comerciante"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab1}
                        />
                        <Tab
                            label="Domicilio del Representante Legal"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(2)}
                            disabled={tabsEstado.tab2}
                        />
                        <Tab
                            label="Información de Contacto"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(3)}
                            disabled={tabsEstado.tab3}
                        />
                        <Tab
                            label="Documentos a Informar"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(4)}
                            disabled={tabsEstado.tab4}
                        />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="RTN Solicitante"
                                        placeholder="RTN Solicitante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}></Grid>
                            <Grid item xs={12}></Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Oficina donde presenta la solicitud y documentación
                                    </InputLabel>
                                    <Select
                                        placeholder="Oficina donde presenta la solicitud y documentación"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Oficina donde presenta la solicitud y documentación"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Estado civil del comerciante
                                    </InputLabel>
                                    <Select
                                        placeholder="Estado civil del comerciante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Estado civil del comerciante"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Profesión u oficio del comerciante
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Profesión u oficio del comerciante"
                                        placeholder="Profesión u oficio del comerciante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Forma de representación
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Forma de representación"
                                        placeholder="Forma de representación"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Estado civil del representante legal (si ha informado
                                        representación legal )
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        label="Estado civil del representante legal (si ha informado representación legal )"
                                        placeholder="Estado civil del representante legal (si ha informado representación legal )"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Profesión u oficio del represantente legal (si ha informado
                                        representación legal )
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        label="Profesión u oficio del represantente legal (si ha informado representación legal )"
                                        placeholder="Profesión u oficio del represantente legal (si ha informado representación legal )"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(1)}
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
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                Para efecto de ubicación, en el contrato de adhesión se mostrará
                                el domicilio fiscal registrado en la administración tributaria.
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Estado
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Estado"
                                        placeholder="Estado"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Ciudad
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Ciudad"
                                        placeholder="Ciudad"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Aldea"
                                        placeholder="Aldea"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Dirección Exacta"
                                        placeholder="Dirección Exacta"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(2)}
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
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                Si hubiese informado representación bajo un representante legal.
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Estado
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Estado"
                                        placeholder="Estado"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Ciudad
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Ciudad"
                                        placeholder="Ciudad"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Aldea"
                                        placeholder="Aldea"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Dirección Exacta"
                                        placeholder="Dirección Exacta"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(3)}
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
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                En el Contrato de Adhesión se mostrará los números de télefono
                                regisrados en la administración tributaria
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Número de teléfono fijo del comerciante"
                                        placeholder="Número de teléfono fijo del comerciante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Número de teléfono celular del comerciante"
                                        placeholder="Número de teléfono celular del comerciante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Correo electrónico donde notificar"
                                        placeholder="Correo electrónico donde notificar"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 1,
                                            color: "#575757",
                                        }}
                                    >
                                        (para efectos de la recepción o envío de solicitudes,
                                        escritos, autos, notificaciones, requerimientos y cualquier
                                        otro proveído, comunicaciones, resoluciones y cualquier otra
                                        actuación ante la administración aduanera o emitido por
                                        esta)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Codigo de verificacion de correo electrónico donde notificar"
                                        placeholder="Codigo de verificacion de correo electrónico donde notificar"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 1,
                                            color: "#575757",
                                        }}
                                    >
                                        (esto asegura que se ha informado un correo electrónico
                                        válido, accesible por la persona o personal de la empresa, y
                                        los correos de aduanas de honduras no se encuentren
                                        bloqueados por el proveedor/servidor de correo electrónico)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Correo electrónico alternativo"
                                        placeholder="Correo electrónico alternativo"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Codigo de verificacion de correo electrónico alternativo"
                                        placeholder="Codigo de verificacion de correo electrónico alternativo"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(4)}
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
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Registro Tributario Nacional (RTN) del comerciante individual"
                                        placeholder="Registro Tributario Nacional (RTN) del comerciante individual"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Documento o Tarjeta de Identidad del comerciante individual"
                                        placeholder="Documento o Tarjeta de Identidad del comerciante individual"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        label="Registro Tributario Nacional (RTN) del representante legal"
                                        placeholder="Registro Tributario Nacional (RTN) del representante legal"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 0,
                                            color: "#575757",
                                        }}
                                    >
                                        (si ha informado representación bajo representación legal)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Documento o Tarjeta de Identidad del representante legal"
                                        placeholder="Documento o Tarjeta de Identidad del representante legal"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 0,
                                            color: "#575757",
                                        }}
                                    >
                                        (si ha informado representación bajo representación legal)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Declaración de comerciante individual y sus modificaciones si las hubiera"
                                        placeholder="Declaración de comerciante individual y sus modificaciones si las hubiera"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(5)}
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
                                        Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </Card>
    );
}

export default Comerciante_Individual_Agregar;
