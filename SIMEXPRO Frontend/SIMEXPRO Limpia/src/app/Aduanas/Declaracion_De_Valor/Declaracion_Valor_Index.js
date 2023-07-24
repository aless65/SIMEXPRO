/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Icon, IconButton, InputAdornment, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

import * as React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const columns = {
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
              console.log(params);
              setOpenDialog(true);
              //handleClose();
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
  };
}


function Declaracion_Valor_Index() {
  const navigate = useNavigate();  
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {setEliminar(!Eliminar);};

  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'ID', width: 10},
    { field: 'dua_numero', headerName: 'DUA N°', flex: 1, },
    { field: 'rtn_importador', headerName: 'RTN Importador', flex: 1},
    { field: 'nombre_importador', headerName: 'Nombre Importador', flex: 1 },
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
    { id: '1', dua_numero: '230004072570X', rtn_importador: '01052003124739', nombre_importador: 'Daniel Isaac Zepeda Fajardo'},    
    { id: '2', dua_numero: '250004045540Y', rtn_importador: '05031999344349', nombre_importador: 'Marvin Josue Mejía Paz'},    
    { id: '3', dua_numero: '270004067750Z', rtn_importador: '04042001233436', nombre_importador: 'Alejandra Michelle Castillo López'},    
  ];


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = rows.filter((row) =>
    row.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/Trhd4rH/DECLARACI-N-DE-VALOR.png"
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
              onClick={() => {
                navigate('/Declaracion-de-Valor/Nueva-Declaracion')
              }}
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

export default Declaracion_Valor_Index;



