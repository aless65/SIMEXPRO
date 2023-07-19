
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
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function EmpleadosIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'Id', width: 10 },
    { field: 'nombres', headerName: 'Nombres', flex: 1 },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1 },
    { field: 'dni', headerName: 'DNI', flex: 1 }, 
    { field: 'estadocivil', headerName: 'EstadoCivil', flex: 1 }, 
    { field: 'sexo', headerName: 'Sexo', flex: 1 },         
    { field: 'cargo', headerName: 'Cargo', flex: 1 }, 
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 400,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<Icon>edit</Icon>}
            variant="contained"
            style={{ borderRadius: '10px' }}
            sx={{
              backgroundColor: '#634A9E',
              color: 'white',
              "&:hover": { backgroundColor: '#6e52ae' },
            }}>
            Editar
          </Button>

          <Button
            startIcon={<Icon>visibility</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: '10px' }}
            sx={{
              backgroundColor: '#797979', color: 'white',
              "&:hover": { backgroundColor: '#b69999' },
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
              backgroundColor: '#E40F00', color: 'white',
              "&:hover": { backgroundColor: '#eb5f56' },
            }}
            onClick={DialogEliminar}
          >
            Eliminar
          </Button>
        </Stack>
      ),
    },
  ];

  {/* Datos de la tabla */ }
  const rows = [
    { id: '1', nombres:'Daniel Isaac',apellidos: 'Zepeda'          ,dni:'7845128956237',estadocivil:'Casado',sexo: 'Masculino',cargo:'Gerente de planta'},
    { id: '2', nombres:'Esdra'       ,apellidos: 'Cerna'           ,dni:'7845128956237',estadocivil:'Casada',sexo: 'Femenino',cargo:'Gerente de planta'},
    { id: '3', nombres:'Eder Jesus'  ,apellidos: 'Sanchez Martínez',dni:'7845128956237',estadocivil:'Soltero',sexo: 'Masculino',cargo:'Gerente de planta'},
    { id: '4', nombres:'Karla'       ,apellidos: 'Alejandro '      ,dni:'7845128956237',estadocivil:'Soltera',sexo: 'Femenino',cargo:'Gerente de planta'},
    { id: '5', nombres:'Sarai'       ,apellidos: 'Quintanilla'     ,dni:'7845128956237',estadocivil:'Soltera',sexo: 'Femenino',cargo:'Gerente de planta'},
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
    row.nombres.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/tD9Rjwz/EMPLEADOS.png"
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
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
              </Typography>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Nombres"
                />
              </FormControl>
            </Grid>  
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Apellidos"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="DNI"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl fullWidth>           
                    <RadioGroup
                      row
                      name='simple-radio'
                      aria-label='simple-radio'
                    >
                      <FormControlLabel value='F' control={<Radio />} label='Femenino' />
                      <FormControlLabel value='M' control={<Radio />} label='Masculino' />
                    </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Estados Civiles</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Estado Civil"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <DateTimePicker
                  renderInput={(_props) => (

                    <TextField
                      style={{ borderRadius: '10px', width: '168px', marginLeft: '15px' }}
                      className="w-full"
                      {..._props}
                      label="Fecha de nacimiento"
                       />
                  )}
                  className="w-full" />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Teléfono"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Dirección exacta"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Provincias</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Provincias"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Cargo que desempeña</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Cargo"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={12}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Correo electrónico"
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

export default EmpleadosIndex;








