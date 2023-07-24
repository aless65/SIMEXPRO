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
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


let renderCount = 0;


{/*relajo para los DatePicker parte 1*/}
const defaultValues = {
  Detalle: '',
  Color: '',
  Estilo: '',
  Talla: '',
  Modulo: '',
  Proceso: '',
  Empleado: '',
  Cantidad: '',
  PedidoProd: '',
  DateTimePicker1: '',
  DateTimePicker2: '',
};

const schema = yup.object().shape({
  Detalle: yup.string().nullable().required(''),
  Color: yup.string().nullable().required(''),
  Estilo: yup.string().nullable().required(''),
  Talla: yup.string().nullable().required(''),
  Modulo: yup.string().nullable().required(''),
  Proceso: yup.string().nullable().required(''),
  Empleado: yup.string().nullable().required(''),
  Cantidad: yup.string().nullable().required(''),
  PedidoProd: yup.string().nullable().required(''),
  DateTimePicker1: yup.string().nullable().required(''),
  DateTimePicker2: yup.string().nullable().required(''),
});
{/*fin de relajo para los DatePicker parte 1*/}



function OrdenProcesosIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/*TOAST*/}
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'red',
    width: 600,
    heigth: 300,
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  const Toast2 = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'green',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
  {/*TOAST*/}

  {/*Relajo para los DatePicker parte 2*/}
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;


  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'Id', flex: 1},
    { field: 'npo', headerName: 'P.O', flex: 4,  },
    { field: 'empleado', headerName: 'Empleado', flex: 4,  },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
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

        const handlePrint = () => {
          // Implementa la función para imprimir aquí

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
              <MenuItem onClick={handlePrint}>
                <Icon>print</Icon> Imprimir
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
    reset(defaultValues);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = rows.filter((row) =>
    row.npo.toLowerCase().includes(searchText.toLowerCase())
  );

  {/*Coso que hizo Axel para validar*/}
  const Masiso = handleSubmit((data) => {
    if (!isValid) {
      Toast.fire({
        icon: 'error',
        title: 'No se permiten campos vacios',
      });
    } else {
      VisibilidadTabla();
      Toast2.fire({
        icon: 'success',
        title: 'Datos guardados exitosamente',
      });
    }
  });
  {/*Coso que hizo Axel para validar*/}

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
 
              <Grid item xs={4} style={{ marginTop: '30px' }} >
              <div className="mt-1 mb-16">
                <Controller
                  name="Detalle"
                  control={control}
                  render={({field}) => (
                    <TextField 
                      defaultValue={" "}
                      style={{ borderRadius: '10px' }}
                      label="# Detalle de P.O"
                      error={!!errors.Detalle}
                      helperText={errors?.Detalle?.message}
                      className="w-full"
                    />
                  )}
                />
                
              </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '30px' }} >
            <div className="mt-1 mb-16">
                <Controller
                  name="Color"
                  control={control}
                  render={({field }) => (
                    <TextField 
                      defaultValue={" "}
                      disabled="true"
                      style={{ borderRadius: '10px' }}
                      label="Color"
                      error={!!errors.Color}
                      helperText={errors?.Color?.message}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '30px' }} >
            <div className="mt-1 mb-16">
                <Controller
                  name="Estilo"
                  control={control}
                  render={({ field }) => (
                    <TextField 
                      defaultValue={" "}
                      disabled="true"
                      style={{ borderRadius: '10px' }}
                      label="Estilo"
                      error={!!errors.Estilo}
                      helperText={errors?.Estilo?.message}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '21px' }}  >
            <div className="mt-1 mb-16">
                <Controller
                  name="Talla"
                  control={control}
                  render={({ field }) => (
                    <TextField 
                      defaultValue={" "}
                      disabled="true"
                      style={{ borderRadius: '10px' }}
                      label="Talla"
                      error={!!errors.Talla}
                      helperText={errors?.Talla?.message}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '21px' }}  >
            <div className="mt-1 mb-16">
                <Controller
                  name="Modulo"
                  control={control}
                  render={({ field }) => (
                    <TextField 
                      defaultValue={" "}
                      style={{ borderRadius: '10px' }}
                      label="Módulo Asignado"
                      error={!!errors.Modulo}
                      helperText={errors?.Modulo?.message}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '21px' }}  >
            <div className="mt-1 mb-16">
                <Controller
                  name="Proceso"
                  control={control}
                  render={({ field }) => (
                <Select
                  error={!!errors.Proceso}
                  helperText={errors?.Proceso?.message}
                  defaultValue={' '}
                  style={{ borderRadius: '10px' }}
                  className="w-full"
                  label="Proceso"
                  placeholder='Seleccione un proceso'
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="1">Corte</MenuItem>
                  <MenuItem value="2">Producción</MenuItem>
                  <MenuItem value="3">Acabado</MenuItem>
                </Select>
                  )}
                />
                </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '21px' }} >
            <div className="mt-1 mb-16">
                <Controller
                  name="Empleado"
                  control={control}
                  render={({ field }) => (
                <Select
                  error={!!errors.Empleado}
                  helperText={errors?.Empleado?.message}
                  defaultValue={" "}
                  style={{ borderRadius: '10px' }}
                  label="Empleado"
                  className="w-full"
                >
                  <MenuItem value="1">Santiago Gutierrez</MenuItem>
                  <MenuItem value="2">Valeria Moncada</MenuItem>
                  <MenuItem value="3">Isabela Torres</MenuItem>
                </Select>
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '21px' }}  >
            <div className="mt-1 mb-16">
                <Controller
                  name="Cantidad"
                  control={control}
                  render={({ field }) => (
                    <TextField 
                      defaultValue={" "}
                      style={{ borderRadius: '10px' }}
                      label="Cantidad"
                      error={!!errors.Cantidad}
                      helperText={errors?.Cantidad?.message}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4} style={{ marginTop: '21px' }}  >
            <div className="mt-1 mb-16">
                <Controller
                  name="PedidoProd"
                  control={control}
                  render={({ field }) => (
                  <Select
                    error={!!errors.PedidoProd}
                    helperText={errors?.PedidoProd?.message}
                    defaultValue={" "}
                    style={{ borderRadius: '10px' }}
                    label="PedidoProduccion"
                    className="w-full"
                  />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4}>
            <div className="mt-1 mb-16">
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
              </div>
            </Grid>

            <Grid item xs={4}>
            <div className="mt-1 mb-16">
                <InputLabel htmlFor="grouped-native-select">Fecha Límite</InputLabel>
                <Controller
                  name="DateTimePicker2"
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
                          error={!!errors.DateTimePicker2}
                          helperText={errors?.DateTimePicker2?.message}
                        />
                      )}
                      className="w-full"
                    />
                  )}
                />
              </div>
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
                onClick={Masiso}
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



