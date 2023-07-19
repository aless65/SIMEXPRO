import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';
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

import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { black, blue } from "tailwindcss/colors";
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

function DucaCrear() {
  const navigate = useNavigate()
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/6FZrCcv/DUCAS.png"
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
            sx={{ backgroundColor: "#FFF7F7", color: black }}
          >
            <Tab
              label="Identificación de la declaración. Exportador / Proveedor Importador / Destinatario"
              {...a11yProps(0)}
            />
            <Tab label="Declarante Transportista Conductor" {...a11yProps(1)} />
            <Tab
              label="Valores totales Mercancías Documentos de soporte"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Typography variant="h6" color="#077" my={"15px"}>
              Identificación de la declaración
            </Typography>
            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Correlativo o Referencia "
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. de DUCA"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Fecha de Aceptación "
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Aduana Registro / Inicio Tránsito"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Aduana de Salida"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Aduana de Ingreso"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Aduana Destino"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Régimen Aduanero"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Modalidad"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Clase"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Fecha Vencimiento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="País Procedencia"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="País Exportación"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="País Destino"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Depósito Aduanero / Zona Franca"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Lugar de Embarque"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Lugar de Desembarque"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Manifiesto"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>

            <Typography variant="h6" color="#077" my={"15px"}>
              Exportador / Proveedor
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Identificacion"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tipo Identificacion"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Pais de Emision"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Domicilio Fiscal"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>

            <Typography variant="h6" color="#077" my={"15px"}>
              Importador / Destinatario
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Identificacion"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tipo Identificacion"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Pais Emision"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Nombre o Razon Social"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Domicilio Fiscal"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                onClick={() => validacion(1)}
                style={{ borderRadius: "10px", marginRight: "10px" }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
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
                onClick={(e) => {
                  navigate("/Duca/Index");
                }}
              >
                Cancelar
              </Button>
            </Grid>

          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>

            <Typography variant="h6" color="#077" my={"15px"}>
              Declarante
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Codigo"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Identificion"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Nombre o Razon Social"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Domicilio Fiscal"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>

            <Typography variant="h6" color="#077" my={"15px"}>
              Transportista
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Codigo"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Nombre"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Modo de Transporte"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>

            <Typography variant="h6" color="#077" my={"15px"}>
              Conductor
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Identificación"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Licencia de Conducir"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="País Expedición"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Nombres y Apellidos"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Id Unidad Transporte"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="País de Registro"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Marca"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Chasis/Vin"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Identificación del Remolque o Semirremolque"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Cantidad de Unidades Carga (remolque y semirremolque)"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Número de Dispositivo Seguridad (precintos o marchamos)"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Equipamiento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tamaño del Equipamiento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="País de Registro"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tipo de Carga"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Número/Números de Identificación de del Contenedor/es"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  onClick={() => validacion(2)}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
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
                  onClick={(e) => {
                    navigate("/Duca/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>

            </Grid>


          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>

            <Typography variant="h6" color="#077" my={"15px"}>
              Valores Totales
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Valor de Transacción"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Gastos de Transporte"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Gastos de Seguro"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Otros Gastos"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Valor en Aduana Total"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Incoterm"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tasa de Cambio"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Bruto Total"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Neto Total"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tipo de Tributo"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total por Tributo"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Modalidad Pago"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total General"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>

            <Typography variant="h6" color="#077" my={"15px"}>
              Mercancias
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Cantidad Bultos"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Clase de Bultos"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Neto"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Bruto"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Cuota Contingente"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Número Línea"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="País Origen"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Unidad Medida"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Cantidad"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Acuerdo"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Clasificación Arancelaria"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Descripción de las Mercancías"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Criterio para Certificar Origen"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Reglas Accesorias"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Valor de Transacción"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Gastos de Transporte"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Seguro"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Otros Gastos"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Valor en aduana"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>


            <Typography variant="h6" color="#077" my={"15px"}>
              Liquidacion por linea
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tipo"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Alicuota"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total"
                  defaultValue=" "
                ></TextField>
              </Grid>


              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="MP"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total General"
                  defaultValue=" "
                ></TextField>
              </Grid>

            </Grid>

            <Typography variant="h6" color="#077" my={"15px"}>
              Documentos de Soporte
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Codigo de Tipo Documento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Numero de Documento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Emision Documento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Fecha de Vencimiento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Pais de Emision"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Linea (al que aplica el documento)"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Autoridad o Entidad que Emitio el documento"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Monto"
                  defaultValue=" "
                ></TextField>
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
                    <Button
                      startIcon={<Icon>checked</Icon>}
                      variant="contained"
                      color="primary"
                      onClick={() => validacion(1)}
                      style={{ borderRadius: "10px", marginRight: "10px" }}
                      sx={{
                        backgroundColor: "#634A9E",
                        color: "white",
                        "&:hover": { backgroundColor: "#6e52ae" },
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
                      onClick={(e) => {
                        navigate("/Duca/Index");
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

export default DucaCrear;
