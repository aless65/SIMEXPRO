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


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function UsuariosIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);


  const [cantidad, setCantidad] = useState('');
  const [fechaRevision, setFechaRevision] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [isCantidadValid, setIsCantidadValid] = useState(true);
  const [isFechaRevisionValid, setIsFechaRevisionValid] = useState(true);
  const [isObservacionesValid, setIsObservacionesValid] = useState(true);

  
  const handleImageUpload = () => {
    // Add your image upload logic here
  };

  const handleGuardarClick = () => {
    let valid = true;
    if (cantidad.trim() === '') {
      setIsCantidadValid(false);
      valid = false;
    }
    if (fechaRevision.trim() === '') {
      setIsFechaRevisionValid(false);
      valid = false;
    }
    if (observaciones.trim() == '') {
      setIsObservacionesValid(false);

      valid = false;
    }

    if (valid) {
      // Your logic to save data when all fields are valid
      console.log('Data saved!');
      // Reset the form
      setCantidad('');
      setFechaRevision('');
      setObservaciones('');
    }
  };



  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'Id', width: 10 },
    { field: 'usuario', headerName: 'Usuario', flex: 1 },
    { field: 'empleado', headerName: 'Empleado', flex: 1 },
    { field: 'rol', headerName: 'Rol', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex:1,
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
          DialogEliminar();
          // Implementa la función para eliminar aquí
          handleClose();
        };
  
        const handlePrint = () => {
          // Implementa la función para imprimir aquí

          handleClose();
        };

        const handleBoletin = () => {
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
              <MenuItem onClick={handleDelete}>
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
    { id: '1', usuario: 'IsHatake', empleado: 'Jafet Gomez', rol: 'Administrador de Seguridad' },
    { id: '2', usuario: 'Admin', empleado: 'Jafet Gomez', rol: 'Administrador de Seguridad' },
    { id: '3', usuario: 'Shogun', empleado: 'Jafet Gomez', rol: 'Administrador de Seguridad' },

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
    row.usuario.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/RgGNgZP/USUARIOS.png"
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
        <div style={{ height: 400, width: '100%' }}>
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
            {/* Botón para agregar imagen */}
            <Grid item xs={4} style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button
                style={{
                  width: '25rem', // Set the desired width for the square button
                  height: '25rem', // Set the same value for height to make it square
                  backgroundColor: 'transparent',
                  border: '2px solid #634A9E',
                  color: 'black',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
              >
                <Icon style={{ marginRight: '5px' }}>add_photo_alternate</Icon> Agregar Imagen
              </button>
            </Grid>

            {/* Right column for all the TextField  InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),

                    }}
s */}
            <Grid item xs={8} style={{ marginTop: '30px' }}>
              <Grid container spacing={3}>
                {/* Etiqueta "Nuevo Usuario" */}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                </Grid>

                {/* Left column for TextFields */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    {/* TextField Usuario */}
                    <TextField  InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),

                    }}

                      style={{ borderRadius: '3px', marginTop: '10px' }}

                      label="Usuario"
                      placeholder="Usuario"

                    />
                  </FormControl>

                  <FormControl fullWidth>
                    {/* TextField Contraseña */}
                    <TextField  InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),

                    }}

                      style={{ borderRadius: '3px', marginTop: '10px' }}

                      label="Contraseña"
                      placeholder="Contraseña"

                    />
                  </FormControl>

                  <FormControl fullWidth>
                    {/* TextField Contraseña */}
                    <TextField  InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),
                      
                    }}
                    placeholder="Correo Eléctronico"
                    
                      style={{ borderRadius: '3px', marginTop: '10px' }}

                      label="Correo Eléctronico"

                    />
                  </FormControl>

                
                </Grid>

                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Empleado</InputLabel>
                      <TextField
                        style={{ borderRadius: '3px' ,marginTop:'1.1rem'}}
                        label="Empleado"
                        select
                        placeholder="Empleado"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>



        <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Rol</InputLabel>
                      <TextField
                        style={{ borderRadius: '3px',marginTop:'1rem' }}
                        label="Rol"
                        select
                        placeholder="Rol"
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      />
                    </FormControl>


        <FormControl fullWidth>
          <FormControlLabel
            control={<Switch sx={{ '&.Mui-checked': { color: '#634A9E' } }} />}
            label="Administrador"
            labelPlacement="rigth"
            style={{marginTop:'25px'}}
          />
        </FormControl>
      </Grid>


    </Grid>


            </Grid>

            {/* Botones de "Guardar" y "Cancelar" */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>check</Icon>}
                variant="contained"
                color="primary"
                style={{
                  borderRadius: '10px',
                  marginRight: '10px',
                }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={handleGuardarClick}
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

export default UsuariosIndex;



