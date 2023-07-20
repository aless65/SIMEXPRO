/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Avatar, FormControl, Icon, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import { DateTimePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Collapse from '@mui/material/Collapse';


import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { textAlign } from '@mui/system';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TablaDetalles_Materiales from './TablaDetalles';

import Chip from '@mui/material/Chip';

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

function OrdenCompra_Crear() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'modelo', headerName: 'Modelo', flex: 2 },
    { field: 'talla', headerName: 'Talla', flex: 1 },
    { field: 'progreso', headerName: 'Progreso', flex: 4 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 4,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
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
          <Button
            startIcon={<Icon>add</Icon>}
            variant="contained"
            color="info"
            style={{ borderRadius: '10px' }}
            sx={{
              backgroundColor: '#337DFF',
              color: 'white',
              '&:hover': { backgroundColor: '#33B8FF' },
            }}
            onClick={DialogEliminar}
          >
            Materiales
          </Button>
        </Stack>
      ),
    },
  ];

    {/* Columnas de la tabla */ }
    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'modelo', headerName: 'Modelo', flex: 2 },
        { field: 'talla', headerName: 'Talla', flex: 1 },
        { field: 'progreso', headerName: 'Progreso', flex: 4 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex: 4,
            renderCell: (params) => {

                const [anchorEl, setAnchorEl] = React.useState(null);

                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };

                const handleEdit = () => {
                    // Implementa la función para editar aquí
                    handleClose();
                };

                const handleDetails = () => {
                    // Implementa la función para detalles aquí
                    handleClose();
                };

                const handleDelete = () => {
                    // Implementa la función para eliminar aquí
                    handleClose();
                };

                const handleAddMaterial = () => {
                    // Implementa la función para añadir materiales aquí
                    VisibilidadTabla();
                    handleClose();
                };



                return (
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.id}`}
                            aria-haspopup="true"
                            onClick={handleClick}
                            variant="contained"
                            style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
                            startIcon={<Icon>menu</Icon>}
                        >
                            Opciones
                        </Button>
                        <Menu
                            id={`menu-${params.id}`}
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleEdit}>
                                <Icon>edit</Icon> Editar
                            </MenuItem>
                            <MenuItem onClick={handleDetails}>
                                <Icon>visibility</Icon> Detalles
                            </MenuItem>
                            <MenuItem onClick={handleDelete}>
                                <Icon>delete</Icon> Eliminar
                            </MenuItem>
                            <MenuItem onClick={handleAddMaterial}>
                                <Icon>add</Icon> Añadir Materiales
                            </MenuItem>

                        </Menu>
                    </Stack>
                );
            },
        },
    ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {
    /* Filtrado de datos */
  }
  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchText.toLowerCase()) ||
      row.modelo.toLowerCase().includes(searchText.toLowerCase()) ||
      row.talla.toLowerCase().includes(searchText.toLowerCase()) ||
      row.progreso.toLowerCase().includes(searchText.toLowerCase())
  );

    {/* Función para mostrar la tabla de detalles y mostrar agregar materiales */ }
    const VisibilidadTabla = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarAdd(!mostrarAdd);
    };

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
        tab2: true,
      });
      setValue(1);
    }

    if (params === 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
      });
      setValue(2);
    }
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
  });

  const [mostrarAddH, setmostrarAddH] = useState(true);
  const [mostrarAddD, setmostrarAddD] = useState(false);
  const [mostrarAddF, setmostrarAddF] = useState(false);
  const [mostrarAddFD, setmostrarAddFD] = useState(false);
  const [mostrarBoton, setmostrarBoton] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/rdxDGbL/DECLARACION.png"
        alt="Encabezado de la carta"
      />
      <CardContent sx={{ textAlign: 'center' }} />

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
            <Tab label="I. Datos Generales de la Orden de Compra" {...a11yProps(0)} />
            <Tab
              label="II. Detalles de la Orden de Compra"
              {...a11yProps(1)}
              disabled={tabsEstado.tab1}
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
                      A. Datos Generales de la Orden de Compra
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Cliente</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Cliente" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <DateTimePicker
                        size="small"
                        label="Fecha de Emisión"
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                          console.log(date);
                        }}
                        renderInput={(_props) => <TextField className="w-full" {..._props} />}
                        className="w-full"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <DateTimePicker
                        size="small"
                        label="Fecha Limite"
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                          console.log(date);
                        }}
                        renderInput={(_props) => <TextField className="w-full" {..._props} />}
                        className="w-full"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Metodo de Pago</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Metodo de Pago" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Embalaje</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Embalaje" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">¿Materiales?</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="¿Materiales?" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Estado de la Orden</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Estado de la Orden" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: '10px' }} label="Dirección" />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'right',
                marginTop: '10px',
              }}
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
                onClick={(e) => {
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="" color="rgb(55, 188, 155)">
                      B. Detalles de la Orden de Compra
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Modelo</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Modelo" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Talla</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Talla" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: '10px' }} label="Cantidad" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Corte de Prenda</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel value="M" control={<Radio />} label="M" />
                        <FormControlLabel value="F" control={<Radio />} label="F" />
                        <FormControlLabel value="U" control={<Radio />} label="U" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Color</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Color" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Proceso</InputLabel>
                      <Select style={{ borderRadius: '3px' }} label="Proceso" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: '10px' }} label="Impuesto" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: '10px' }} label="Descuento" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" padding={2}>
                      Solo Válido PDF <PictureAsPdfIcon />
                    </Typography>
                  </Grid>

                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Avatar
                            alt="Remy Sharp"
                            src="https://cdn-icons-png.flaticon.com/128/337/337946.png"
                            sx={{ height: '50px', width: '50px' }}
                            variant="rounded"
                          />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Documento opciónal</span>
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                    <label>
                      En este campo puede añadir ejemplo de prendas terminadas y otras
                      especificaciones.
                    </label>
                  </Grid>

                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Avatar
                            alt="Remy Sharp"
                            src="https://cdn-icons-png.flaticon.com/128/337/337946.png"
                            sx={{ height: '50px', width: '50px' }}
                            variant="rounded"
                          />

                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Documento de Medidas</span>
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                    <label>
                      En este campo añadir el documento con las medidas especificadas por la prenda.
                    </label>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'right',
                      alignItems: 'right',
                      marginTop: '10px',
                    }}
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
                        <Tab label="I. Datos Generales de la Orden de Compra" {...a11yProps(0)} />
                        <Tab
                            label="II. Detalles de la Orden de Compra"
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab1}
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
                                            A. Datos Generales de la Orden de Compra
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Cliente</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Cliente"

                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl
                                            fullWidth
                                        >
                                            <DateTimePicker
                                                size="small"
                                                label='Fecha de Emisión'
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => {
                                                    console.log(date);
                                                }}
                                                renderInput={(_props) => (
                                                    <TextField
                                                        className="w-full"
                                                        {..._props}
                                                    />
                                                )}
                                                className="w-full"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl
                                            fullWidth
                                        >
                                            <DateTimePicker
                                                size="small"
                                                label='Fecha Limite'
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => {
                                                    console.log(date);
                                                }}
                                                renderInput={(_props) => (
                                                    <TextField
                                                        className="w-full"
                                                        {..._props}
                                                    />
                                                )}
                                                className="w-full"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Metodo de Pago</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Metodo de Pago"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Embalaje</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Embalaje"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">¿Materiales?</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="¿Materiales?"
                                            />
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Estado de la Orden</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Estado de la Orden"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField style={{ borderRadius: '10px' }} label="Dirección" />
                                        </FormControl>
                                    </Grid>


                                </Grid>
                            </CardContent>
                        </Card>


                        <Grid
                            item
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '10px' }}
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
                                onClick={(e) => {
                                    navigate('/OrdenCompra/index');
                                }}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <Typography variant="" color="rgb(55, 188, 155)">
                                            B. Detalles de la Orden de Compra
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Modelo</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Modelo"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Talla</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Talla"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <TextField style={{ borderRadius: '10px' }} label="Cantidad" />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Corte de Prenda</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="M" control={<Radio />} label="M" />
                                                <FormControlLabel value="F" control={<Radio />} label="F" />
                                                <FormControlLabel value="U" control={<Radio />} label="U" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Color</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Color"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Proceso</InputLabel>
                                            <Select
                                                style={{ borderRadius: '3px' }}
                                                label="Proceso"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <TextField style={{ borderRadius: '10px' }} label="Impuesto" />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <TextField style={{ borderRadius: '10px' }} label="Descuento" />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h5" align="center" padding={2}>
                                            Solo Válido PDF   <PictureAsPdfIcon></PictureAsPdfIcon>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} style={{ textAlign: 'center' }} >

                                        <div class="flex items-center justify-center w-full">
                                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/128/337/337946.png" sx={{ height: "50px", width: "50px" }} variant="rounded" />
                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span class="font-semibold">Documento opciónal</span>
                                                    </p>
                                                </div>
                                                <input id="dropzone-file" type="file" class="hidden" />
                                            </label>

                                        </div>
                                        <label>En este campo puede añadir ejemplo de prendas terminadas y otras especificaciones.</label>
                                    </Grid>

                                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                                        <div class="flex items-center justify-center w-full">
                                            <label
                                                for="dropzone-file"
                                                class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">

                                                    <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/128/337/337946.png" sx={{ height: "50px", width: "50px" }} variant="rounded" />


                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span class="font-semibold">Documento de Medidas</span>
                                                    </p>
                                                </div>
                                                <input id="dropzone-file" type="file" class="hidden" />
                                            </label>
                                        </div>
                                        <label>En este campo añadir el documento con las medidas especificadas por la prenda.</label>

                                    </Grid>

                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
                                        <Button
                                            startIcon={<Icon>add_circle</Icon>}
                                            variant="contained"
                                            color="primary"
                                            style={{ borderRadius: '10px', marginRight: '10px' }}
                                            sx={{
                                                backgroundColor: '#D1AF3C',
                                                color: 'white',
                                                '&:hover': { backgroundColor: '#6e52ae' },
                                            }}
                                            onClick={() => validacion(1)}
                                        >
                                            Agregar
                                        </Button>
                                    </Grid>

                                </Grid>

                                <Collapse in={mostrarAdd}>
                                    <Divider style={{ marginTop: '30px', marginBottom: '15px' }}>
                                        <Chip label="Agregar Materiales " />
                                    </Divider>
                                    <Grid container spacing={3}>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="grouped-native-select">Material</InputLabel>
                                                <Select
                                                    style={{ borderRadius: '3px' }}
                                                    label="Material"
                                                />
                                            </FormControl>
                                        </Grid>


                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <TextField style={{ borderRadius: '10px' }} label="Cantidad" />
                                            </FormControl>
                                        </Grid>


                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="grouped-native-select">Unidad de Medida</InputLabel>
                                                <Select
                                                    style={{ borderRadius: '3px' }}
                                                    label="Unidad de Medida"
                                                />
                                            </FormControl>
                                        </Grid>


                                        <Grid
                                            item
                                            xs={6}
                                            sx={{ justifyContent: 'right', alignItems: 'right' }}
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
                                                onClick={VisibilidadTabla}
                                            >
                                                Cancelar
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Collapse>

                                <Collapse in={mostrarIndex}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <DataGrid
                                                sx={{ height: '200px' }}
                                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                                components={{
                                                    Toolbar: GridToolbar,
                                                    Search: SearchIcon,
                                                }}
                                                rows={filteredRows}
                                                columns={columns}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { page: 0, pageSize: 10 },
                                                    },
                                                }}
                                                pageSizeOptions={[10, 20, 50]}
                                            />
                                            {/* <TablaDetalles_Materiales></TablaDetalles_Materiales> */}
                                        </Grid>
                                    </Grid>
                                </Collapse>




                            </CardContent>
                        </Card>


                        <Grid
                            item
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '10px' }}
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
                                onClick={(e) => {
                                    navigate('/OrdenCompra/index');
                                }}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </TabPanel>



                    <Dialog
                        open={Eliminar}
                        fullWidth="md"
                        onClose={DialogEliminar}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Agregar Materiales a la Orden
                        </DialogTitle>

                        <Card>
                            <CardContent>

                                <DialogActions>
                                    <Grid container spacing={2}>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="grouped-native-select">Material</InputLabel>
                                                <Select
                                                    style={{ borderRadius: '3px' }}
                                                    label="Material"
                                                />
                                            </FormControl>
                                        </Grid>


                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <TextField style={{ borderRadius: '10px' }} label="Cantidad" />
                                            </FormControl>
                                        </Grid>


                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="grouped-native-select">Unidad de Medida</InputLabel>
                                                <Select
                                                    style={{ borderRadius: '3px' }}
                                                    label="Unidad de Medida"
                                                />
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </DialogActions>
                            </CardContent>
                        </Card>

                        <Grid
                            item
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }}

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
                                onClick={DialogEliminar}
                            >
                                Cancelar
                            </Button>
                        </Grid>

                    </Dialog>






                </SwipeableViews>
            </Box>
        </Card >
    );
}

export default OrdenCompra_Crear;
