/* eslint-disable camelcase */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
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

const tab1Fields = {
  rtn_solicitante: '',
  dni: '',
  numero_recibo_servicio_publico: '',
};
const schemaTab1Fields = yup.object().shape({
  rtn_solicitante: yup.string().required(),
  dni: yup.string().required(),
  numero_recibo_servicio_publico: yup.string().required(),
});

const tab2Fields = {
  oficina_regional_aduanas: '',
  estado_civil: '',
  profesion_oficio: '',
  departamento_municipio: '',
  cuidad: '',
  direccion_completa: '',
  telefono_fijo: '',
  telefono_celular: '',
  correo_electronico: '',
};
const schemaTab2Fields = yup.object().shape({
  oficina_regional_aduanas: yup.string().required(),
  estado_civil: yup.string().required(),
  profesion_oficio: yup.string().required(),
  departamento_municipio: yup.string().required(),
  cuidad: yup.string().required(),
  direccion_completa: yup.string().required(),
  telefono_fijo: yup.string().required(),
  telefono_celular: yup.string().required(),
  correo_electronico: yup.string().required(),
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

function PersonaNatural_Crear() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const { handleSubmit, reset, control, formState } = useForm({
    tab1Fields,
    mode: 'all',
    resolver: yupResolver(schemaTab1Fields),
  });
  const { isValid, dirtyFields, errors } = formState;

  const {
    handleSubmitTab2,
    resetTab2,
    controlTab2,
    formStateTab2 = {},
  } = useForm({
    tab2Fields,
    mode: 'all',
    resolver: yupResolver(schemaTab2Fields),
  });
  const { isValidTab2, dirtyFieldsTab2, errorsTab2 } = formStateTab2;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
      });
      setValue(1);
    }
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
  });

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
            <form onSubmit={handleSubmit()}>
              <Card style={{ marginBottom: '25px' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="RTN del Solicitante"
                            variant="outlined"
                            fullWidth
                            error={!!errors.rtn_solicitante}
                            style={{ borderRadius: '3px' }}
                          />
                        )}
                        name="rtn_solicitante"
                        control={control}
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
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Documento Nacional de Identificación (DNI)"
                            variant="outlined"
                            fullWidth
                            error={!!errors.dni}
                            style={{ borderRadius: '3px' }}
                          />
                        )}
                        name="dni"
                        control={control}
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
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                            variant="outlined"
                            fullWidth
                            error={!!errors.numero_recibo_servicio_publico}
                            style={{ borderRadius: '3px' }}
                          />
                        )}
                        name="numero_recibo_servicio_publico"
                        control={control}
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
                  disabled={_.isEmpty(dirtyFields) || !isValid}
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
                    navigate('/Contrato-de-Adhesion/Persona-Natural');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </form>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <form onSubmit={handleSubmitTab2}>
              <Card style={{ marginBottom: '25px' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Oficina Regional de Aduanas más cercana</InputLabel>
                        <Select
                          style={{ borderRadius: '10px' }}
                          label="Oficina Regional de Aduanas más cercana"
                        />
                      </FormControl>
                      {/* <Controller
                        render={({ field }) => (
                          <FormControl error={!!errorsTab2.oficina_regional_aduanas} fullWidth>
                            <InputLabel className="font-medium text-14" component="legend">
                              Oficina Regional de Aduanas más cercana
                            </InputLabel>
                            <Select
                              {...field}
                              variant="outlined"
                              fullWidth
                              style={{ borderRadius: '3px' }}
                            />
                          </FormControl>
                        )}
                        name="oficina_regional_aduanas"
                        control={controlTab2}
                      /> */}
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Estado Civil de la Persona</InputLabel>
                        <Select
                          style={{ borderRadius: '10px' }}
                          label="Estado Civil de la Persona"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Profesión u Oficio de la Persona</InputLabel>
                        <Select
                          style={{ borderRadius: '10px' }}
                          label="Profesión u Oficio de la Persona"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Divider style={{ marginTop: '30px', marginBottom: '15px' }}>
                    <Chip label="DOMICILIO DE LA PERSONA" />
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Departamento y Municipio</InputLabel>
                        <Select style={{ borderRadius: '10px' }} label="Departamento y Municipio" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: '10px' }} label="Ciudad" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: '10px' }} label="Dirección Completa" />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Divider style={{ marginTop: '30px', marginBottom: '15px' }}>
                    <Chip label="INFORMACIÓN DE CONTACTO" />
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          style={{ borderRadius: '10px' }}
                          label="Número de Teléfono Fijo de la Persona"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          style={{ borderRadius: '10px' }}
                          label="Número de Teléfono Celular de la Persona"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField
                          style={{ borderRadius: '10px' }}
                          label="Correo Electrónico donde Notificar"
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
                  onClick={() => {
                    navigate('/Contrato-de-Adhesion/Persona-Natural');
                  }}
                  type="button"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
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
                    navigate('/Contrato-de-Adhesion/Persona-Natural');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </form>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default PersonaNatural_Crear;
