/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Button,
  ButtonBase,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Avatar,
} from "@mui/material";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { height } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


function ProcesosIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const Toast2 = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'green',
    width: 400,
    customClass: {
      popup: 'colored-toast'
    },  
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'Id', width: 200 },
    { field: 'descripcion', headerName: 'Proceso', width: 400 },      
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
    { id: '1', descripcion: 'Proceso de Ensamblaje'},
    { id: '2', descripcion: 'Proceso de Corte'},
    { id: '3', descripcion: 'Proceso de Acabado'},
    { id: '4', descripcion: 'Proceso de Control de calidad'},
    { id: '5', descripcion: 'Proceso de Etiquetado y empaquetado'},
  ];

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const Funcion = () => {
    VisibilidadTabla()
    Toast2.fire({
      icon: 'success',
      title: 'Datos guardados exitosamente',
    });
  };

  {/* Filtrado de datos */ }
  const filteredRows = rows.filter((row) =>
    row.descripcion.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/ftqSrxG/PROCESOS.png"
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
      <div style={{ height: 400, width: '100%', marginLeft: '20px', marginRight: '20px' }}>
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
            <Grid item xs={3}>

            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}
            marginTop={'30px'}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px', width: '500px'  }}
                  label="Proceso"
                  placeholder='Ingrese un proceso'
                  InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
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
                onClick={Funcion}
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

export default ProcesosIndex;



