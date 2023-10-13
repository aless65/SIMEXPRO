/* eslint-disable camelcase */
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  FormControl,
  Icon,
  InputLabel,
  TextField,
  Typography,
  Select,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Avatar,
  Switch,
  FormControlLabel,
  Stack,

} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { black, blue } from "tailwindcss/colors";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import { InputAdornment } from "@material-ui/core";
import { DateTimePicker } from '@mui/x-date-pickers';

const tab1Fields = {
  NoCorrelativoReferencia: "",
  NoDUCA: "",
  FechaAceptacion: ""
};

const schemaTab1Fields = yup.object().shape({
  NoCorrelativoReferencia: yup.string().required(),
  NoDUCA: yup.string().required(),
  FechaAceptacion: yup.string().required(),
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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function DucaCrear() {
  const navigate = useNavigate();
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const { handleSubmit, reset, control, formState } = useForm({
    tab1Fields,
    mode: "all",
    resolver: yupResolver(schemaTab1Fields),
  });
  const { isValid, dirtyFields, errors } = formState;

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
          <form onSubmit={handleSubmit()}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Typography variant="h6" color="#077" my={"15px"}>
                Identificación de la declaración
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label="No. Correlativo o Referencia"
                        placeholder="No. Correlativo o Referencia"
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                        error={!!errors.NoCorrelativoReferencia}
                      ></TextField>
                    )}
                    name="NoCorrelativoReferencia"
                    control={control}
                  ></Controller>
                </Grid>

                <Grid item xs={3}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label="No. de DUCA"
                        defaultValue=""
                        placeholder="No. de DUCA"
                        error={!!errors.NoDUCA}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      ></TextField>
                    )}
                    name="NoDUCA"
                    control={control}
                  ></Controller>
                </Grid>

                <Grid item xs={3}>
                  <DateTimePicker
                    value={value}
                    onChange={undefined}
                    required
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"></InputAdornment>),
                    }}
                    label="Fecha de aceptacion"
                    renderInput={(_props) => (
                      <TextField
                        className="w-full"
                        {..._props}
                        onBlur={undefined}
                      />
                    )}
                    className="w-full"
                  />
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Aduana Registro / Inicio Tránsito</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Aduana Registro / Inicio Tránsito"
                      select
                      placeholder="Aduana Registro / Inicio Tránsito"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Aduana de Salida</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Aduana de Salida"
                      select
                      placeholder="Aduana de Salida"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Aduana de Ingreso</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Aduana de Ingreso"
                      select
                      placeholder="Aduana de Ingreso"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Aduana de Destino</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Aduana de Destino"
                      select
                      placeholder="Aduana de Destino"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Regimen Aduanero</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Regimen Aduanero"
                      select
                      placeholder="Regimen Aduanero"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Modalidad</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Modalidad"
                      select
                      placeholder="Modalidad"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Clase</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Clase"
                      select
                      placeholder="Clase"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <DateTimePicker
                    value={value}
                    onChange={undefined}
                    required
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"></InputAdornment>),
                    }}
                    label="Fecha de vencimiento"
                    renderInput={(_props) => (
                      <TextField
                        className="w-full"
                        {..._props}
                        onBlur={undefined}
                      />
                    )}
                    className="w-full"
                  />
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Pais de Procedencia</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Pais de Procedencia"
                      select
                      placeholder="Pais de Procedencia"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Pais Exportacion</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Pais Exportacion"
                      select
                      placeholder="Pais Exportacion"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Pais de Destino</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Pais de Destino"
                      select
                      placeholder="Pais de Destino"
                      InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Depósito Aduanero / Zona Franca"
                    defaultValue=""
                    placeholder="Depósito Aduanero / Zona Franca"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Lugar de Embarque"
                    defaultValue=""
                    placeholder="Lugar de Embarque"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Lugar de Desembarque"
                    defaultValue=""
                    placeholder="Lugar de Desembarque"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Manifiesto"
                    defaultValue=""
                    placeholder="Manifiesto"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
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
                    defaultValue=""
                    placeholder="No. Identificacion"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Tipo Identificacion</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Tipo Identificacion"
                      select
                      placeholder="Tipo Identificacion"
                      InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Pais de Emision</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Pais de Emision"
                      select
                      placeholder="Pais de Emision"
                      InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Domicilio Fiscal"
                    defaultValue=""
                    placeholder="Domicilio Fiscal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
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
                    defaultValue=""
                    placeholder="No. Identificacion"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Tipo Identificacion</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Tipo Identificacion"
                      select
                      placeholder="Tipo Identificacion"
                      InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Pais de Emision</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px' }}
                      label="Pais de Emision"
                      select
                      placeholder="Pais de Emision"
                      InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Nombre o Razon Social"
                    defaultValue=""
                    placeholder="Nombre o Razon Social"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Domicilio Fiscal"
                    defaultValue=""
                    placeholder="Domicilio Fiscal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  ></TextField>
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
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => validacion(1)}
                  type="button"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
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
          </form>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Typography variant="h6" color="#077" my={"15px"}>
              Declarante
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Codigo"
                  placeholder="Codigo"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Identificion"
                  placeholder="No. Identificion"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  placeholder="Nombre o Razon Social"
                  label="Nombre o Razon Social"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Domicilio Fiscal"
                  placeholder="Domicilio Fiscal"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                  placeholder="Codigo"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Nombre"
                  placeholder="Nombre"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Modo de Transporte</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Modo de Transporte"
                    select
                    placeholder="Modo de Transporte"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
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
                  placeholder="No. Identificación"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="No. Licencia de Conducir"
                  placeholder="No. Licencia de Conducir"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Pais Expedicion</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Pais Expedicion"
                    select
                    placeholder="Pais Expedicion"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Nombres y Apellidos"
                  placeholder="Nombres y Apellidos"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Id Unidad Transporte"
                  placeholder="Id Unidad Transporte"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Pais de Registro</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Pais de Registro"
                    select
                    placeholder="Pais de Registro"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Marca</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Marca"
                    select
                    placeholder="Marca"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Chasis/Vin"
                  placeholder="Chasis/Vin"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Identificación del Remolque o Semirremolque"
                  placeholder="Identificación del Remolque o Semirremolque"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Cantidad de Unidades Carga (remolque y semirremolque)"
                  placeholder="Cantidad de Unidades Carga (remolque y semirremolque)"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Número de Dispositivo Seguridad (precintos o marchamos)"
                  placeholder="Número de Dispositivo Seguridad (precintos o marchamos)"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Equipamiento"
                  placeholder="Equipamiento"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tamaño del Equipamiento"
                  placeholder="Tamaño del Equipamiento"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Pais de Registro</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Pais de Registro"
                    select
                    placeholder="Pais de Registro"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Tipo de carga</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Tipo de carga"
                    select
                    placeholder="Tipo de carga"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Número/Números de Identificación de del Contenedor/es"
                  placeholder="Número/Números de Identificación de del Contenedor/es"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
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
                  placeholder="Valor de Transacción"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Gastos de Transporte"
                  placeholder="Gastos de Transporte"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Gastos de Seguro"
                  placeholder="Gastos de Seguro"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Otros Gastos"
                  placeholder="Otros Gastos"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Valor en Aduana Total"
                  placeholder="Valor en Aduana Total"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Incoterm</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Incoterm"
                    select
                    placeholder="Incoterm"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tasa de Cambio"
                  placeholder="Tasa de Cambio"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Bruto Total"
                  placeholder="Peso Bruto Total"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Neto Total"
                  placeholder="Peso Neto Total"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Tipo de Tributo"
                  placeholder="Tipo de Tributo"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total por Tributo"
                  placeholder="Total por Tributo"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Modalidad Pago"
                  placeholder="Modalidad Pago"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total General"
                  placeholder="Total General"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                  placeholder="Cantidad Bultos"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Clase de Bultos</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Clase de Bultos"
                    select
                    placeholder="Clase de Bultos"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Neto"
                  placeholder="Peso Neto"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Peso Bruto"
                  placeholder="Peso Bruto"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Cuota Contingente"
                  placeholder="Cuota Contingente"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Número Línea"
                  placeholder="Número Línea"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Pais de Origen</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Pais de Origen"
                    select
                    placeholder="Pais de Origen"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Unidad Medida"
                  placeholder="Unidad Medida"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Cantidad"
                  placeholder="Cantidad"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Acuerdo"
                  placeholder="Acuerdo"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Clasificación Arancelaria"
                  placeholder="Clasificación Arancelaria"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Descripción de las Mercancías"
                  placeholder="Descripción de las Mercancías"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Criterio para Certificar Origen"
                  placeholder="Criterio para Certificar Origen"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Reglas Accesorias"
                  placeholder="Reglas Accesorias"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Valor de Transacción"
                  placeholder="Valor de Transacción"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Gastos de Transporte"
                  placeholder="Gastos de Transporte"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Seguro"
                  placeholder="Seguro"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Otros Gastos"
                  placeholder="Otros Gastos"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Valor en aduana"
                  placeholder="Valor en aduana"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                  placeholder="Tipo"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Alicuota"
                  placeholder="Alicuota"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total"
                  placeholder="Total"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="MP"
                  placeholder="MP"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Total General"
                  placeholder="Total General"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
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
                  placeholder="Codigo de Tipo Documento"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Numero de Documento"
                  placeholder="Numero de Documento"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Emision Documento"
                  placeholder="Emision Documeto"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Fecha de Vencimiento"
                  placeholder="Fecha de Vencimiento"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-native-select">Pais de emision</InputLabel>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    label="Pais de emision"
                    select
                    placeholder="Pais de emision"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Linea (al que aplica el documento)"
                  placeholder="Linea (al que aplica el documento)"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Autoridad o Entidad que Emitio el documento"
                  placeholder="Autoridad o Entidad que Emitio el documento"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="outlined-disabled"
                  label="Monto"
                  placeholder="Monto"
                  defaultValue=""
                  InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                ></TextField>
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
