import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
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



function DucaIndex() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const [showBoletin, setShowBoletin] = useState(true); 

  {/*Columnas de la tabla*/ }
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'aduanaIngreso', headerName: 'Aduana de Ingreso', flex: 1 },
    { field: 'aduanaDestino', headerName: 'Aduana de Destino', flex: 1 },
    { field: 'declarante', headerName: 'Declarante', flex: 1 },
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
              <MenuItem onClick={handlePrint}>
                <Icon>print</Icon> Imprimir
              </MenuItem>
              {true && (
                <MenuItem onClick={handleBoletin}>
                <Icon>insert_drive_file</Icon> Generar Boletin
                </MenuItem>
                )}
            </Menu>
          </Stack>
        );
      },
    },
  ];
   

  {/*Datos de la tabla*/ }
  const rows = [
    { id: '5686464564', aduanaIngreso: 'Aduana de Puerto Cortes', aduanaDestino: 'Exportadora y importadora LA', declarante: 'Isaac Zepeda GOD'},

  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); 
  };

  {/*Filtrado de datos*/ }
  const filteredRows = rows.filter((row) =>
    row.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/6FZrCcv/DUCAS.png"
        alt="Encabezado de la carta"
      />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/*Botón de Nuevo*/}
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
                navigate('/Duca/Crear')
              }}
            >
              Nuevo
            </Button>
          </Stack>

          {/*Barra de Busqueda en la Tabla*/}
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

      {/*Tabla*/}
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

  

      <Dialog
        open={Eliminar}
        fullWidth={'md'}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
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

export default DucaIndex;



