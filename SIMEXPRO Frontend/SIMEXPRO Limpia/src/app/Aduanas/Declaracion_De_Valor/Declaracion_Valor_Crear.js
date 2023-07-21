/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Chip, Divider, FormControl, Icon, InputAdornment, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search';

import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState,useRef } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers';

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

const getRowClassName = (params) => {
  return params.rowIndex % 2 === 0 ? '#f2f2f2' : '#ffffff';
};

function Declaracion_Valor_Crear() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  {
    /* Columnas de la tabla */
  }
  const columns = [
    { field: 'id', headerName: 'N° Factura', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 380,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<Icon>edit</Icon>}
            variant="contained"
            style={{ borderRadius: '10px' }}
            sx={{
              backgroundColor: '#634A9E',
              color: 'white',
              '&:hover': { backgroundColor: '#6e52ae' },
            }}
          >
            Editar
          </Button>

          <Button
            startIcon={<Icon>visibility</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: '10px' }}
            sx={{
              backgroundColor: '#797979',
              color: 'white',
              '&:hover': { backgroundColor: '#b69999' },
            }}
            onClick={(e) => {
              setmostrarAddH(!mostrarAddH), setmostrarDetalles(!mostrarDetalles);
            }}
          >
            Detalles
          </Button>
          <Button
            startIcon={<Icon>delete</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: '10px' }}
            sx={{
              backgroundColor: '#E40F00',
              color: 'white',
              '&:hover': { backgroundColor: '#eb5f56' },
            }}
          >
            Eliminar
          </Button>
        </Stack>
      ),
    },
  ];

  {
    /* Datos de la tabla */
  }
  const rows = [
    { id: '1', fecha: '17/07/2023' },
    { id: '2', fecha: '14/07/2023' },
    { id: '3', fecha: '11/07/2023' },
  ];

  const rows2 = [];

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

    if (params === 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: true,
        tab5: true,
      });
      setValue(2);
    }

    if (params === 3) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: true,
        tab5: true,
      });
      setValue(3);
    }

    if (params === 4) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: true,
      });
      setValue(4);
    }

    if (params === 5) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
      });
      setValue(5);
    }
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
    tab3: true,
    tab4: true,
    tab5: true,
  });

  const [mostrarAddH, setmostrarAddH] = useState(true);
  const [mostrarAddD, setmostrarAddD] = useState(false);
  const [mostrarAddF, setmostrarAddF] = useState(false);
  const [mostrarAddFD, setmostrarAddFD] = useState(false);
  const [mostrarBoton, setmostrarBoton] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const collapseRef = useRef(null);




  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/Trhd4rH/DECLARACI-N-DE-VALOR.png"
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
            <Tab label="I. Información General de Aduana e Importador" {...a11yProps(0)} />
            <Tab
              label="I.I Información General de Proveedor e Intermediario"
              {...a11yProps(1)}
              disabled={tabsEstado.tab1}
            />
            <Tab
              label="I.II Información General: Característica de la transacción"
              {...a11yProps(2)}
              disabled={tabsEstado.tab2}
            />
            <Tab label="Facturas" {...a11yProps(3)} disabled={tabsEstado.tab4} />
            <Tab
              label="II. Condiciones de la transacción"
              {...a11yProps(4)}
              disabled={tabsEstado.tab4}
            />
            <Tab
              label="III. Determinación del Valor en Aduana, en Pesos Centroamericanos"
              {...a11yProps(5)}
              disabled={tabsEstado.tab5}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="" color="rgb(55, 188, 155)">
                      A. Información General de la Aduana
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField                        
                        select
                        style={{ borderRadius: '3px' }}
                        label="Aduana de Ingreso"
                        size="small"
                        variant="outlined"
                        placeholder="Aduana de Ingreso"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Aduana de Despacho"
                        size="small"
                        select
                        variant="outlined"
                        placeholder="Aduana de Despacho"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Declaración de Mercancía"
                        size="small"
                        select
                        variant="outlined"
                        placeholder="Declaración de Mercancía"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                        <DateTimePicker
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                            console.log(date);
                          }}
                        renderInput={(_props) => (
                          <TextField
                            className="w-full"
                            {..._props}
                            style={{ borderRadius: '10px' }}
                            label="Fecha de Aceptación"
                            size="small"
                            variant="outlined"                           
                          />
                        )}
                        className="w-full"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="" color="rgb(55, 188, 155)">
                      B. Información General del Importador
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Nombre o Razón Social"
                        size="small"
                        placeholder="Nombre o Razón Social"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Registro Tributario Nacional (RTN)"
                        size="small"
                        placeholder="Registro Tributario Nacional (RTN)"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Número de Registro"
                        size="small"
                        placeholder="Número de Registro"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>                      
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="País" 
                        size="small"
                        select
                        placeholder="País"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>                      
                      <TextField
                        style={{ borderRadius: '3px' }} 
                        label="Estado" 
                        size="small"
                        select
                        placeholder="Estado"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField 
                      style={{ borderRadius: '10px' }} 
                      label="Dirección" 
                      size="small"
                      placeholder="Dirección"
                      InputProps={{
                        startAdornment: <InputAdornment position='start' />
                      }}
                    />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Correo Electrónico"
                        size="small"
                        placeholder="Correo Electrónico"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '10px' }} 
                        label="Teléfono" 
                        size="small"
                        placeholder="Teléfono"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '10px' }} 
                        label="Fax" 
                        size="small"
                        placeholder="Fax"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Nivel Comercial"
                        size="small"
                        select
                        placeholder="Nivel Comercial"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Otro Nivel Comercial"
                        size="small"
                        placeholder="Otro Nivel Comercial"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
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
                onClick={() => validacion(1)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item textAlign="center" xs={3}>
                    <Typography variant="" color="rgb(55, 188, 155)">
                      C. Proveedor
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Nombre o Razón Social"
                        size="small"
                        placeholder="Nombre o Razón Social"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Dirección" 
                        size="small"
                        placeholder="Dirección"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Ciudad" 
                        size="small"
                        placeholder="Ciudad"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>                      
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="País" 
                        size="small"
                        select
                        placeholder="País"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Correo Electrónico"
                        size="small"
                        placeholder="Correo Electrónico"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '10px' }} 
                        label="Teléfono" 
                        size="small"
                        placeholder="Teléfono"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '10px' }} 
                        label="Fax" 
                        size="small"
                        placeholder="Fax"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Condición Comercial"
                        size="small"
                        select
                        placeholder="Condición Comercial"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Otra Condición Comercial"
                        size="small"
                        placeholder="Nombre o Razón Social"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
            <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item textAlign="center" xs={3}>
                    <Typography variant="" color="rgb(55, 188, 155)">
                      D. Intermediario
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Nombre o Razón Social"
                        size="small"
                        placeholder="Nombre o Razón Social"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Dirección" 
                        size="small"
                        placeholder="Dirección"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Ciudad" 
                        size="small"
                        placeholder="Ciudad"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>                      
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="País" 
                        size="small"
                        select
                        placeholder="País"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Correo Electrónico"
                        size="small"
                        placeholder="Correo Electrónico"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '10px' }} 
                        label="Teléfono" 
                        size="small"
                        placeholder="Teléfono"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '10px' }} 
                        label="Fax" 
                        size="small"
                        placeholder="Fax"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Condición Comercial"
                        size="small"
                        select
                        placeholder="Tipo Intermediario"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Otra Tipo Intermediario"
                        size="small"
                        placeholder="Nombre o Razón Social"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
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
                onClick={() => validacion(2)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
            
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item textAlign="center" xs={3}>
                    <Typography variant="" color="rgb(55, 188, 155)">
                      E. Característica de la Transacción
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Lugar de Entrega"
                        size="small"
                        placeholder="Lugar de Entrega "
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="País de Entrega"
                        size="small"
                        select
                        placeholder="País de Entrega"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Incoterm" 
                        size="small"
                        select
                        placeholder="Incoterm"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Versión" 
                        size="small"
                        placeholder="Versión"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Número de Contrato"
                        size="small"
                        placeholder="Número de Contrato"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Fecha de Contrato"
                        size="small"
                        placeholder="Fecha de Contrato"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Forma de Envío" 
                        size="small"
                        select
                        placeholder="Forma de Envío"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Otra Forma de Envío"
                        size="small"
                        placeholder="Otra Forma de Envío"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Pago Efectuado" 
                        size="small"
                        select
                        placeholder="Pago Efectuado"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField 
                        style={{ borderRadius: '3px' }} 
                        label="Forma de Pago" 
                        size="small"
                        select
                        placeholder="Forma de Pago"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Otra Forma de Pago"
                        size="small"
                        placeholder="Otra Forma de Pago"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Lugar de Embarque"
                        size="small"
                        placeholder="Lugar de Embarque"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="País de Embarque"
                        size="small"
                        select
                        placeholder="País de Embarque"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="País de Exportación"
                        size="small"
                        select
                        placeholder="País de Exportación"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Fecha de Exportación"
                        size="small"
                        placeholder="Fecha de Exportación"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Moneda en que se realizó la transacción"
                        size="small"
                        select
                        placeholder="Moneda en que se realizó la transacción"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Otra Moneda"
                        size="small"
                        placeholder="Otra Moneda"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Tipo de Cambio de Moneda Extrajera a USD"
                        size="small"
                        placeholder="Tipo de Cambio de Moneda Extrajera a USD"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
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
                onClick={() => validacion(3)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
              <CardContent>
            <Collapse in={mostrarAddH}>
                <div style={{ height: 300, width: '100%' }}>
                <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                marginBottom:4,
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={(e) => {
                setmostrarAddH(!mostrarAddH )
                setmostrarAddF(!mostrarAddF)
              }}
            >
              Nueva Factura
            </Button>
                  <DataGrid
                              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                              components={{
                                Toolbar: GridToolbar,
                                Search: SearchIcon,
                              }}
                    rows={rows}
                    columns={columns}
                    getRowClassName={getRowClassName}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                      },
                    }}
                    pageSizeOptions={[3, 6, 9]}
                  />
                </div>
            </Collapse>
            

            <Collapse in={mostrarDetalles}>
                <div style={{ height: 300, width: '100%' }}>
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
                setmostrarAddH(!mostrarAddH )
                setmostrarDetalles(!mostrarDetalles)
              }}
            >
              Cerrar
            </Button>
                  <DataGrid
                              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                              components={{
                                Toolbar: GridToolbar,
                                Search: SearchIcon,
                              }}
                    rows={rows}
                    columns={columns}
                    getRowClassName={getRowClassName}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                      },
                    }}
                    pageSizeOptions={[3, 6, 9]}
                  />
                </div>
            </Collapse>


            <Collapse in={mostrarAddF}>
                <Divider style={{ marginTop: '30px', marginBottom: '15px' }}>
                  <Chip label="NUEVA FACTURA " />
                </Divider>
                <Grid container spacing={3}>
                  <Grid item xs={2} />
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Número de Factura"
                        size="small"
                        placeholder="Número de Factura"
                        InputProps={{
                          startAdornment: <InputAdornment position='start' />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                  <FormControl fullWidth>
                        <DateTimePicker
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                            console.log(date);
                          }}
                        renderInput={(_props) => (
                          <TextField
                            className="w-full"
                            {..._props}
                            style={{ borderRadius: '10px' }}
                            label="Fecha"
                            size="small"
                            variant="outlined"                           
                          />
                        )}
                        className="w-full"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Collapse in={!mostrarBoton}>
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
                onClick={(e) => {
                  setmostrarBoton(!mostrarBoton)
                setmostrarAddFD(true)
                }}
              >
                Guardar Adición Factura
              </Button>
              </Collapse>



              <Collapse in={mostrarBoton}>
                  <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginLeft: '-230px' }}
                sx={{
                  backgroundColor: '#634A9E',
                  color: 'white',
                  '&:hover': { backgroundColor: '#6e52ae' },
                }}
                onClick={(e) => {
                  setmostrarAddH(!mostrarAddH )
                  setmostrarAddF(!mostrarAddF)
                  setmostrarAddFD(false)
                  setmostrarBoton(false)
                }}
              >
                Guardar Factura
              </Button>
              </Collapse>

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
                  setmostrarAddH(!mostrarAddH )
                  setmostrarAddF(!mostrarAddF)
                  setmostrarAddFD(false)
                  setmostrarBoton(false)
                }}
              >
                Cancelar Adición Factura
              </Button>
                    </Grid>

                    <Grid item xs={12} sx={{marginBottom:4}}>
                  <Typography variant="" color="rgb(55, 188, 155)">
                    DESCRIPCIÓN DE LAS MERCANCÍAS (ITEMS)
                  </Typography>
                </Grid>


                <Collapse in={mostrarAddFD} 
sx={{marginLeft:'3rem'}}
>
<CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:'3rem'}} >
<Grid container spacing={3}>
<Grid xs={12}>
<Divider>
 <Chip label="AÑADIR ITEM" />
</Divider>

</Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Numero de Item"
       size="small"
       placeholder="Número de Item"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField 
        style={{ borderRadius: '10px' }} 
        label="Cantidad"
        size="small"
        placeholder="Cantidad"
        InputProps={{
          startAdornment: <InputAdornment position='start' />
        }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Unidad de Medida"
       size="small"
       placeholder="Unidad de Medida"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4} >
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Designación o Identificación Comercial de las Mercancías"
       size="small"
       placeholder="Designación o Identificación Comercial de las Mercancías"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Características de la Mercancía"
       size="small"
       placeholder="Características de la Mercancía"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField 
        style={{ borderRadius: '10px' }} 
        label="Marca" 
        size="small"
        placeholder="Marca"
        InputProps={{
          startAdornment: <InputAdornment position='start' />
        }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
        style={{ borderRadius: '10px' }}
        label="Modelo y/o Estilo"
        size="small"
        placeholder="Modelo y/o Estilo"
        InputProps={{
          startAdornment: <InputAdornment position='start' />
        }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Estado de las Mercancías"
       size="small"
       select
       placeholder="Estado de las Mercancías"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Orígen de las Mercancías"
       size="small"
       select
       placeholder="Orígen de las Mercancías"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Clasificación Arancelaria"
       size="small"
       placeholder="Clasificación Arancelaria"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Valor Unitario"
       size="small"
       select
       placeholder="Valor Unitario"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={4}>
   <FormControl fullWidth>
     <TextField
       style={{ borderRadius: '10px' }}
       label="Total Factura Unitario"
       size="small"
       placeholder="Total Factura Unitario"
       InputProps={{
         startAdornment: <InputAdornment position='start' />
       }}
     />
   </FormControl>
 </Grid>
 <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
onClick={(e) => {
}}
ref={collapseRef}
>
Confirmar Adición de Item
</Button>

   </Grid>
</Grid>
</Grid>
</CardContent>
</Collapse>


<Collapse in={mostrarBoton}>
            </Collapse>
                <div style={{ height: 300, width: '100%' }}>
                  <DataGrid
                              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                              components={{
                                Toolbar: GridToolbar,
                                Search: SearchIcon,
                              }}
                    rows={rows2}
                    columns={columns}
                    getRowClassName={getRowClassName}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                      },
                    }}
                    pageSizeOptions={[3, 6, 9]}
                  />
                </div>
                </Grid>
                </Collapse>

                <Collapse in={mostrarDetalles}>
                  <div style={{ height: 300, width: '100%' }}>
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
                        setmostrarAddH(!mostrarAddH);
                        setmostrarDetalles(!mostrarDetalles);
                      }}
                    >
                      Cerrar
                    </Button>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      getRowClassName={getRowClassName}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 3 },
                        },
                      }}
                      pageSizeOptions={[3, 6, 9]}
                    />
                  </div>
                </Collapse>

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
                onClick={() => validacion(4)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={4} dir={theme.direction}>
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
              <Grid item textAlign="center" xs={12}>
                <Typography variant="h5" color="rgb(55, 188, 155)">
                  II. Condiciones de la Transacción
                </Typography>
              </Grid>
            </Grid>

            {/* HEADER DE LA TABLA */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>#</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>CONDICIÓN</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Typography>VALOR ASIGNADO CONDICIÓN</Typography>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #1 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>24</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Existen restricciones a la cesión o utilización de las mercancías por el
                    comprador, distintas de las excepciones previstas en el artículo 1.1 a) del
                    Acuerdo
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #2 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>24.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography> Indicar en que consiste la o las restricciones </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #3 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>25</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Depende la venta o el precio de alguna condición o contraprestación, con
                    relación a las mercancías a valorar
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #4 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>25.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    {' '}
                    Indicar en que consiste la condición o contrapresentación, y si es cuantificable
                    consignar el monto en la casilla Nro. 42.1{' '}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #5 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>26</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Está la venta condicionada a revertir directa o indirectamente al vendedor parte
                    alguna del producto de la reventa o de cualquier cesión o utilización posterior
                    de las mercancías, por el comprador, en caso afirmativo, declara el monto de la
                    reversión en la casilla Nro. 42
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #6 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Existe vinculación entre el vendedor y el comprador</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #7 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Indicar si la vinculación ha influido en el precio</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #8 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Indicar si la vinculación ha influido en el precio</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #9 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>28</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Existen pagos indirectos y/o descuentos retroactivos</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #10 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>28.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Indicar en que concepto y el monto declarado en la casilla Nro. 40
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #11 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>29</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Existen cánones y derechos de licencia que el comprador tenga que pagar directa
                    o indirectamente
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #12 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>29.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Indicar su naturaleza y el monto declarado en la casilla Nro. 42.9
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* BOTONES */}
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
                onClick={() => validacion(5)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={5} dir={theme.direction}>
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
              <Grid item textAlign="center" xs={12}>
                <Typography variant="h5" color="rgb(55, 188, 155)">
                  III. Determinación del Valor en Aduana, en Pesos Centroamericanos
                </Typography>
              </Grid>
            </Grid>

            {/* HEADER DE LA TABLA */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>#</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>BASE DE CÁLCULO</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Typography>VALOR PESO C.A. (USD)</Typography>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #1 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>39</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Precio según factura</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #2 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>40</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography> Pagos indirectos y/o descuentos retroactivos </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #3 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>41</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Precio realmente pagado o por pagar por las mercancías importadas (39 + 40)
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #4 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    ADICIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS MERCANCÍAS IMPORTADAS
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #5 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Monto de la condición o contraprestación a que se refiere la casilla 25.1
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #6 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Monto de la reversión a la que se refiere la casilla 25</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #7 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.3</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos por comisiones y correlajes, salvo los de comisiones de compra
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #8 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.4</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Gastos y costos de envases y embalajes</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #9 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.5</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los materiales consumidos en la producción de las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #10 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.6</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de las herramientos, matrices, moldes, y elementos análogos utilizados
                    para la producción de las mercancías
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #11 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.7</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los materiales consumidos en la producción de las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #12 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.8</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de ingeniería, creación y perferccionamiento, trabajos artísticos, diseños
                    y planos y croquis realizados fuera del país de importación y necesarios para la
                    producción de mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #13 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.9</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los cánones y derechos de licencia, a que se refiere la casilla 29.1
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #14 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.10</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de transporte de la mercadería importada hasta el puerto o lugar de
                    importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #15 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.11</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de carga, descarga y manipulación ocasionadas por el transporte de las
                    mercaderías importadas hasta el puerto o lugar de importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #16 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.12</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Gastos y costos de envases y embalajes</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #17 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>43</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Total de ajustes al precio realmente pagado o por pagar (sumatoria de 42.1 a
                    42.12)
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #18 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    DEDUCCIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS MERCANCÍAS IMPORTADAS
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #19 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de construcción, armado, montaje, mantenimiento o asistencia técnica
                    realizados después de la importación, en relación con las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #20 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Costos de transporte posterior al puerto o lugar de importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #21 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.3</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Derechos e impuestos aplicables en el país de importación</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #22 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.4</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Monto de intereses</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #23 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.5</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Otras deducciones legalmente aplicables</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #24 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>45</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Total deducciones al precio realmente pagado o por pagar por las mercancías
                    importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #25 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>46</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>VALOR EN ADUANA (41 + 43 - 45)</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* BOTONES */}
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
                onClick={(e) => {
                  navigate('/Declaracion-de-Valor/Listado');
                }}                
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
                  navigate('/Declaracion-de-Valor/Listado');
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

export default Declaracion_Valor_Crear;
