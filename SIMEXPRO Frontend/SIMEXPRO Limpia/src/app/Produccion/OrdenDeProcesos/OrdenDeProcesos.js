/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';

import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

{/*relajo para los DatePicker parte 1*/}
let renderCount = 0;

const defaultValues = {
  Native: '',
  TextField: '',
  Select: '',
  Autocomplete: [],
  Checkbox: false,
  Switch: false,
  RadioGroup: '',
  DateTimePicker1: '',
  DateTimePicker2: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  TextField: yup.string().required('You must enter a value'),
  Native: yup.string().required('You must enter a value'),
  Select: yup.string().required('You must select a value').oneOf(['20', '30'], 'Select 20 or 30.'),
  Checkbox: yup.boolean().oneOf([true], 'You must check.'),
  Switch: yup.boolean().oneOf([true], 'You must turn it on.'),
  RadioGroup: yup.string().oneOf(['female'], 'You must select female.'),
  Autocomplete: yup.array().min(2, ''),
  DateTimePicker1: yup.string().nullable().required(''),
  DateTimePicker2: yup.string().nullable().required(''),
});

function OrdenProcesosIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };



  {/*Relajo para los DatePicker parte 2*/}
 
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  renderCount += 1;

  const data = watch();

  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'Id', flex: 1},
    { field: 'npo', headerName: 'Máquina', flex: 2,  },
    { field: 'empleado', headerName: 'Fecha de Inicio', flex: 2,  },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 400,
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
              <MenuItem onClick={DialogEliminar}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        );
      },
    },
  ];

  {/* Datos de la tabla */ }
  const rows = [
    { id: '1', npo: 'CW22-103/72898', empleado: 'Alberto Laínez' },
    { id: '2', npo: 'CW22-103/72899', empleado: 'Daniel Pineda' },
    { id: '3', npo: 'CW22-89/723541', empleado: 'Denia McCarthy' },
  ];

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = rows.filter((row) =>
    row.npo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/TtV62Xs/RDEN-DE-PROCESOS.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={VisibilidadTabla}
            >
              Nuevo
            </Button>
          </Stack>

          {/* Barra de Busqueda en la Tabla */}
          <TextField
            style={{ borderRadius: '10px' }}
            placeholder='Buscar'
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
        </CardContent>
      </Collapse>

      {/* Tabla */}
      <Collapse in={mostrarIndex}>
        <div style={{ height: 400, width: '100%', marginLeft: '13px', marginRight: '10px' }}>
          <DataGrid
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
        </div>
      </Collapse>


      {/* Formulario Agregar */}
      <Collapse in={mostrarAdd}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
 
              <Grid item xs={6} style={{ marginTop: '30px' }} >
              <FormControl
                fullWidth
              >
                <TextField 
                  defaultValue={" "}
                  style={{ borderRadius: '10px' }}
                  label="# Detalle de P.O"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ marginTop: '30px' }} >
              <FormControl
                fullWidth
              >
                <TextField 
                  defaultValue={" "}
                  disabled="true"
                  style={{ borderRadius: '10px' }}
                  label="Color"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl
                fullWidth
              >
                <TextField
                  defaultValue={" "}
                  disabled="true"
                  style={{ borderRadius: '10px' }}
                  label="Estilo"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl
                fullWidth
              >
                <TextField
                  defaultValue={" "}
                  disabled="true"
                  style={{ borderRadius: '10px' }}
                  label="Talla"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl
                fullWidth
              >
                <TextField
                  defaultValue={" "}
                  style={{ borderRadius: '10px' }}
                  label="Módulo Asignado"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Proceso</InputLabel>
                <Select
                  defaultValue={" "}
                  style={{ borderRadius: '10px' }}
                  label="Proceso"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Empleado</InputLabel>
                <Select
                  defaultValue={" "}
                  style={{ borderRadius: '10px' }}
                  label="Empleado"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl
                fullWidth
              >
                <TextField
                  defaultValue={" "}
                  style={{ borderRadius: '10px' }}
                  label="Cantidad"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
                <InputLabel htmlFor="grouped-native-select">Fecha Inicio</InputLabel>
                <Controller
                  name="DateTimePicker1"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      required
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          onBlur={onBlur}
                          error={!!errors.DateTimePicker1}
                          helperText={errors?.DateTimePicker1?.message}
                        />
                      )}
                      className="w-full"
                    />
                  )}
                />
              <FormControl
                fullWidth
              >
              </FormControl>
            </Grid>

            <Grid item xs={6}>
                <InputLabel htmlFor="grouped-native-select">Fecha Límite</InputLabel>
              <FormControl
                fullWidth
              >
                <DateTimePicker
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

            <Grid item xs={6} >
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Pedido Producción</InputLabel>
                <Select
                  defaultValue={" "}
                  style={{ borderRadius: '10px' }}
                  label="PedidoProduccion"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={VisibilidadTabla}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8', color: 'black',
                  "&:hover": { backgroundColor: '#BFBABA' },
                }}
                onClick={VisibilidadTabla}
              >
                Cancelar
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Collapse>


      <Dialog
        open={Eliminar}
        fullWidth="md"
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
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={DialogEliminar}
              >
                Eliminar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8', color: 'black',
                  "&:hover": { backgroundColor: '#BFBABA' },
                }}
                onClick={DialogEliminar}
              >
                Cancelar
              </Button>
            </Grid>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

export default OrdenProcesosIndex;



