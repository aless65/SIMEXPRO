/* eslint-disable camelcase */
import {
  CardMedia,
  CardContent,
  Card,
  Button,
  Chip,
  Divider,
  FormControl,
  Icon,
  TextField,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Avatar,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';



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

function PersonaNatural_Crear() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
  const [RTNSolicitante, setRTNSolicitante] = useState('');
  const [DNI, setDNI] = useState('');
  const [Recibo, setRecibo] = useState('');
  const [OficinaRegional, setOficinaRegional] = useState('');
  const [EstadoCivil, setEstadoCivil] = useState('');
  const [Profesion, setProfesion] = useState('');
  const [DepartamentoMunicipio, setDepartamentoMunicipio] = useState('');
  const [Ciudad, setCiudad] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [TelefonoFijo, setTelefonoFijo] = useState('');
  const [Celular, setCelular] = useState('');
  const [Correo, setCorreo] = useState('');

  const [validRTNSolicitante, setValidRTNSolicitante] = useState(true);
  const [validDNI, setValidDNI] = useState(true);
  const [validRecibo, setValidRecibo] = useState(true);
  const [validOficinaRegional, setValidOficinaRegional] = useState(true);
  const [validEstadoCivil, setValidEstadoCivil] = useState(true);
  const [validProfesion, setValidProfesion] = useState(true);
  const [validDepartamentoMunicipio, setValidDepartamentoMunicipio] = useState(true);
  const [validCiudad, setValidCiudad] = useState(true);
  const [validDireccion, setValidDireccion] = useState(true);
  const [validTelefonoFijo, setValidTelefonoFijo] = useState(true);
  const [validCelular, setValidCelular] = useState(true);
  const [validCorreo, setValidCorreo] = useState(true);

  const sendTab1 = () => {
    let valid = true;
    if (RTNSolicitante.trim() === '') {
      setValidRTNSolicitante(false);
      valid = false;
    }
    if (DNI.trim() === '') {
      setValidDNI(false);
      valid = false;
    }
    if (Recibo.trim() === '') {
      setValidRecibo(false);
      valid = false;
    }

    if (valid == true) {
      // Your logic to save data when all fields are valid

      console.log('Data saved!');
      validacion(1);
      // Reset the form

    }
  };

  const sendTab2 = () => {
    let valid = true;
        
    if (OficinaRegional.trim() === '') {
      setValidOficinaRegional(false);
      valid = false;
    }
    if (EstadoCivil.trim() === '') {
      setValidEstadoCivil(false);
      valid = false;
    }
    if (Profesion.trim() === '') {
      setValidProfesion(false);
      valid = false;
    }
    if (DepartamentoMunicipio.trim() === '') {
      setValidDepartamentoMunicipio(false);
      valid = false;
    }
    if (Ciudad.trim() === '') {
      setValidCiudad(false);
      valid = false;
    }
    if (Direccion.trim() === '') {
      setValidDireccion(false);
      valid = false;
    }
    if (TelefonoFijo.trim() === '') {
      setValidTelefonoFijo(false);
      valid = false;
    }
    if (Celular.trim() === '') {
      setValidCelular(false);
      valid = false;
    }
    if (Correo.trim() === '') {
      setValidCorreo(false);
      valid = false;
    }

    if(valid){
      console.log('Data saved 2!');
    };
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onSubmitTab1 = (data) =>{
    console.log(data);
    settabsEstado({
      tab1: false,
    })
    setValue(1);
  };

  const onSubmitTab2 = (data) =>{
    console.log(data);
    setValue(2);
  }

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
      });
      setValue(1);
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/zrcrcFK/CONTRATO-DE-ADHESI-N-PERSONA-NATURAL.png"
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
            sx={{ backgroundColor: '#FFF7F7', color: black }}
          >
            <Tab label="Datos Generales" {...a11yProps(0)} />
            <Tab label="Datos a Informar" {...a11yProps(1)} disabled={tabsEstado.tab1} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>

              <Card style={{ marginBottom: '25px' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                          <TextField
                            label="RTN del Solicitante"
                            variant="outlined"
                            fullWidth
                            placeholder="RTN del Solicitante"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validRTNSolicitante ? 'initial' : 'red'
                            }}
                            value={RTNSolicitante}
                            onChange={(e) => {
                              setRTNSolicitante(e.target.value);
                              setValidRTNSolicitante(true);
                            }}
                          />
                    </Grid>
                    <Grid item xs={6}>
                      <div className="flex w-full h-48">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col ml-5 pt-5 pb-6">
                            <Avatar
                              alt="PDF Img"
                              src="https://i.ibb.co/7Wfzw5H/pdf.png"
                              sx={{ height: '25px', width: '25px' }}
                              variant="rounded"
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Subir Archivo PDF</span>
                            </p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                          <TextField
                            label="Documento Nacional de Identificación (DNI)"
                            fullWidth
                            variant="outlined"
                            placeholder="Documento Nacional de Identificación (DNI)"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validDNI ? 'initial' : 'red'
                            }}
                            value={DNI}
                            onChange={(e) => {
                              setDNI(e.target.value);
                              setValidDNI(true);
                            }}
                          />
                    </Grid>
                    <Grid item xs={6}>
                      <div className="flex w-full h-48">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col ml-5 pt-5 pb-6">
                            <Avatar
                              alt="PDF Img"
                              src="https://i.ibb.co/7Wfzw5H/pdf.png"
                              sx={{ height: '25px', width: '25px' }}
                              variant="rounded"
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Subir Archivo PDF</span>
                            </p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                          <TextField
                            label="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                            variant="outlined"
                            fullWidth
                            placeholder="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validRecibo ? 'initial' : 'red'
                            }}
                            value={Recibo}
                            onChange={(e) => {
                              setRecibo(e.target.value);
                              setValidRecibo(true);
                            }}
                          />
                    </Grid>
                    <Grid item xs={6}>
                      <div className="flex w-full h-48">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col ml-5 pt-5 pb-6">
                            <Avatar
                              alt="PDF Img"
                              src="https://i.ibb.co/7Wfzw5H/pdf.png"
                              sx={{ height: '25px', width: '25px' }}
                              variant="rounded"
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Subir Archivo PDF</span>
                            </p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

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
                  onClick={() => validacion(1)}
                  type="button"
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
                    navigate('/Contrato-de-Adhesion-Persona-Natural/Index');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>

              <Card style={{ marginBottom: '25px' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                          <TextField
                            label="Oficina Regional de Aduanas más cercana"
                            select
                            fullWidth
                            variant="outlined"
                            placeholder="Oficina Regional de Aduanas más cercana"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validOficinaRegional ? 'initial' : 'red'
                            }}
                            value={OficinaRegional}
                            onChange={(e) => {
                              setOficinaRegional(e.target.value);
                              setValidOficinaRegional(true);
                            }}
                          />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Estado Civil de la Persona"
                          select
                          variant="outlined"
                          placeholder="Estado Civil de la Persona"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validEstadoCivil ? 'initial' : 'red'
                          }}
                          value={EstadoCivil}
                          onChange={(e) => {
                            setEstadoCivil(e.target.value);
                            setValidEstadoCivil(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Profesión u Oficio de la Persona"
                          style={{ borderRadius: '10px' }}
                          select
                          variant="outlined"
                          placeholder="Profesión u Oficio de la persona"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Divider style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <Chip label="DOMICILIO DE LA PERSONA" />
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <FormControl fullWidth>
                          <TextField
                            label="Departamento y Municipio"
                            select
                            variant="outlined"
                            placeholder="Departamento y Municipio"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validDepartamentoMunicipio ? 'initial' : 'red'
                            }}
                            value={DepartamentoMunicipio}
                            onChange={(e) => {
                              setDepartamentoMunicipio(e.target.value);
                              setValidDepartamentoMunicipio(true);
                            }}
                          />
                        </FormControl>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Ciudad"
                          variant="outlined"
                          placeholder="Ciudad"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validCiudad ? 'initial' : 'red'
                          }}
                          value={Ciudad}
                          onChange={(e) => {
                            setCiudad(e.target.value);
                            setValidCiudad(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Dirección Completa"
                          variant="outlined"
                          placeholder="Dirección Completa"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validDireccion ? 'initial' : 'red'
                          }}
                          value={Direccion}
                          onChange={(e) => {
                            setDireccion(e.target.value);
                            setValidDireccion(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Divider style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <Chip label="INFORMACIÓN DE CONTACTO" />
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Número de Teléfono Fijo de la Persona"
                          variant="outlined"
                          placeholder="Número de Teléfono Fijo de la Persona"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validTelefonoFijo ? 'initial' : 'red'
                          }}
                          value={TelefonoFijo}
                          onChange={(e) => {
                            setTelefonoFijo(e.target.value);
                            setValidTelefonoFijo(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Número de Teléfono Celular de la Persona"
                          variant="outlined"
                          placeholder="Número de Teléfono Celular de la Persona"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validCelular ? 'initial' : 'red'
                          }}
                          value={Celular}
                          onChange={(e) => {
                            setCelular(e.target.value);
                            setValidCelular(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{
                            marginTop: '-19px',
                            color: validCorreo ? 'grey' : 'red',
                          }}
                        >
                          Cantidad
                        </InputLabel>
                        <TextField
                          label=""
                          variant="outlined"
                          placeholder="Correo Electrónico donde Notificar"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '5px',
                            // marginTop: '18px',
                            // border: '.5px solid',
                            // borderColor: validCorreo ? 'initial' : 'red'
                          }}
                          value={Correo}
                          onChange={(e) => {
                            setCorreo(e.target.value);
                            setValidCorreo(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

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
                  //onClick={sendTab1}
                  onClick={() => {
                    navigate('/Contrato-de-Adhesion-Persona-Natural/Index');
                  }}
                  type="button"
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
                    navigate('/Contrato-de-Adhesion-Persona-Natural/Index');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default PersonaNatural_Crear;
