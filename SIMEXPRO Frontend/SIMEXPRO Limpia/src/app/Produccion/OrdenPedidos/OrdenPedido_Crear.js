/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Button,
  FormControl,
  Icon,
  InputLabel,
  TextField,
  Switch,
  InputAdornment,
  IconButton,
} from '@mui/material';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { DateTimePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import FormLabel from '@mui/material/FormLabel';

import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';

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

function OrdenPedido_Crear() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = useState('');

  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'material', headerName: 'Material', flex: 2 },
    { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
    { field: 'precio', headerName: 'Precio', flex: 4 },
    { field: 'peso', headerName: 'Peso', flex: 4 },
  ];

  {
    /* Datos de la tabla */
  }
  const rows = [{ id: '1', material: 'Tela', cantidad: '300', precio: '900', peso: 25 }];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {
    /* Filtrado de datos */
  }
  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchText.toLowerCase()) ||
      row.material.toLowerCase().includes(searchText.toLowerCase()) ||
      row.cantidad.toLowerCase().includes(searchText.toLowerCase()) ||
      row.precio.toLowerCase().includes(searchText.toLowerCase()) ||
      row.peso.toString().toLowerCase().includes(searchText.toLowerCase())
  );

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

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/gFKTs3W/ORDEN-DE-PEDIDO.png"
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
            <Tab label="I. Datos Generales de la Orden de Pedido" {...a11yProps(0)} />
            <Tab
              label="II. Detalles de la Orden de Pedido"
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
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Proveedor</InputLabel>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Proveedor"
                        select
                        placeholder="Proveedor"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="No. DUCA"
                        placeholder="No. DUCA"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Observaciones"
                        placeholder="Observaciones"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <DateTimePicker
                        size="small"
                        label="Fecha Entrada"
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                          console.log(date);
                        }}
                        renderInput={(_props) => <TextField className="w-full" {..._props} />}
                        className="w-full"
                        placeholder="Fecha Entrada"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl>
                      <FormLabel className="font-medium text-14" component="legend">
                        Dado Por Cliente
                      </FormLabel>
                      <Switch
                        // checked={value}
                        // onBlur={onBlur}
                        // onChange={(ev) => onChange(ev.target.checked)}
                        // inputRef={ref}
                        required
                      />
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
                  navigate('/OrdenPedido/Index');
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
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Proveedor</InputLabel>
                      <TextField
                        style={{ borderRadius: '3px' }}
                        label="Material"
                        select
                        placeholder="Material"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Precio"
                        placeholder=""
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                        disabled
                        variant="filled"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Cantidad"
                        placeholder="Cantidad"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        style={{ borderRadius: '10px' }}
                        label="Peso"
                        placeholder=""
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                          endAdornment: <InputAdornment>Kg</InputAdornment>,
                        }}
                      />
                    </FormControl>
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
                      Guardar Detalle
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      style={{ borderRadius: '10px' }}
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
                //onClick={() => validacion(1)}
                onClick={(e) => {
                  navigate('/OrdenPedido/Index');
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
                  navigate('/OrdenPedido/Index');
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

export default OrdenPedido_Crear;
