import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  FormControl,
  Icon,
  InputLabel,
  TextField,
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
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";

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

function Persona_Juridica_Agregar() {
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
    if (params == 1) {
      settabsEstado({
        tab1: false,
        tab2: true,
        tab3: true,
        tab4: true,
      });
      setValue(1);
    }

    if (params == 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: true,
      });
      setValue(2);
    }

    if (params == 3) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: true,
      });
      setValue(3);
    }

    if (params == 4) {
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
        image="https://i.ibb.co/cFBKy66/CONTRATO-DE-ADHESI-N-PERSONA-JURIDICA.png"
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
              label="Domicilio de la Empresa"
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
                    style={{ borderRadius: "3px" }}
                    required
                    label="Oficina donde presenta la solicitud y documentación"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">
                    Estado civil de la Empresa
                  </InputLabel>
                  <Select
                    style={{ borderRadius: "3px" }}
                    required
                    label="Estado civil del Representante Legal"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">
                    Profesión u oficio de la Empresa
                  </InputLabel>
                  <Select
                    style={{ borderRadius: "3px" }}
                    required
                    label=" Profesión u oficio  Representante Legal"
                  />
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                      textAlign: "justify",
                      marginBottom: 5,
                      color: "#575757",
                    }}
                  >
                    (según clasificador nacional de ocupaciones de Honduras,
                    CNOH-2018)
                  </Typography>
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
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
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Aldea"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Dirección Exacta"
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
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
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Aldea"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Dirección Exacta"
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
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
                    label="Número de teléfono fijo de la Empresa"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Número de teléfono celular de la Empresa"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Número de teléfono celular del Representante Legal"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}></Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Correo electrónico donde notificar "
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
                    label="Codigo de verificacion de correo electrónico donde notificar "
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
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Codigo de verificacion de correo electrónico alternativo"
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
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
                    label="Registro Tributario Nacional (RTN) de la Sociedad Mercantil"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Documento o Tarjeta de Identidad del representante Legal"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Documento o Tarjeta de Identidad del representante legal"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: "10px" }}
                    required
                    label="Escritura Pública de Constitución y sus modificaciones si las hubiera"
                  />
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                      textAlign: "justify",
                      marginBottom: 5,
                      color: "#575757",
                    }}
                  >
                    (De la Sociedad Mercantil)
                  </Typography>
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

export default Persona_Juridica_Agregar;
