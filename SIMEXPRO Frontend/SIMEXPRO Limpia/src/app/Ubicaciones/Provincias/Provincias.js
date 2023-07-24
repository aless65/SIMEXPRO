

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
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';



function ProvinciasIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'red',
    width: 400,
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
    width: 400,
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  {/* Validaciones de la pantalla de crear*/ }
  const defaultAccountValues = {
    prov_Codigo: '',
    pais_Id: "0",
    prov_Nombre: ''
  }

  const accountSchema = yup.object().shape({
    prov_Codigo: yup.string().required(''),
    pais_Id: yup.string().required(''),
    prov_Nombre: yup.string().required(''),

  })



  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'Código', width: 100 },
    { field: 'ProvinciaCodigo', headerName: 'Provincia codigo', width: 200 },
    { field: 'descripcion', headerName: 'Provincia nombre', width: 250 },
    { field: 'Pais', headerName: 'País', width: 200 },
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
    { id: '1', ProvinciaCodigo: 'HN-AT', descripcion: 'Atlántida', Pais: 'Honduras' },
    { id: '2', ProvinciaCodigo: 'HN-CH', descripcion: 'Choluteca', Pais: 'Honduras' },
    { id: '3', ProvinciaCodigo: 'HN-CL', descripcion: 'Colón', Pais: 'Honduras' },
    { id: '4', ProvinciaCodigo: 'HN-CM', descripcion: 'Comayagua', Pais: 'Honduras' },
    { id: '5', ProvinciaCodigo: 'HN-CP', descripcion: 'Copán', Pais: 'Honduras' },
    { id: '6', ProvinciaCodigo: 'HN-CR', descripcion: 'Cortés', Pais: 'Honduras' },
    { id: '7', ProvinciaCodigo: 'HN-EP', descripcion: 'El Paraíso', Pais: 'Honduras' },
    { id: '8', ProvinciaCodigo: 'HN-FM', descripcion: 'Francisco Morazán', Pais: 'Honduras' },
    { id: '9', ProvinciaCodigo: 'HN-GD', descripcion: 'Gracias a Dios', Pais: 'Honduras' },
    { id: '10', ProvinciaCodigo: 'HN-IN', descripcion: 'Intibucá', Pais: 'Honduras' },
    { id: '11', ProvinciaCodigo: 'HN-IB', descripcion: 'Islas de la Bahía', Pais: 'Honduras' },
    { id: '12', ProvinciaCodigo: 'HN-LP', descripcion: 'La Paz', Pais: 'Honduras' },
    { id: '13', ProvinciaCodigo: 'HN-LM', descripcion: 'Lempira', Pais: 'Honduras' },
    { id: '14', ProvinciaCodigo: 'HN-OC', descripcion: 'Ocotepeque', Pais: 'Honduras' },
    { id: '15', ProvinciaCodigo: 'HN-OL', descripcion: 'Olancho', Pais: 'Honduras' },
    { id: '16', ProvinciaCodigo: 'HN-SB', descripcion: 'Santa Bárbara', Pais: 'Honduras' },
    { id: '17', ProvinciaCodigo: 'HN-VL', descripcion: 'Valle', Pais: 'Honduras' },
    { id: '18', ProvinciaCodigo: 'HN-YO', descripcion: 'Yoro', Pais: 'Honduras' }
  ];

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);

  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = rows.filter((row) =>
    row.descripcion.toLowerCase().includes(searchText.toLowerCase())
  );




  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultAccountValues,
    mode: 'all',
    resolver: yupResolver(accountSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if (data.prov_Codigo != null || data.pais_Id != null || data.prov_Nombre != null) {
      if (data.prov_Codigo.trim() === '' || data.pais_Id == 0 || data.prov_Nombre.trim() === '') {
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
    } else {
      Toast.fire({
        icon: 'error',
        title: 'No se permiten campos vacios',
      });
    }
  };

  const GuardarProvincia = () => {
    const formData = watch();
    onSubmit(formData);
    handleSubmit(onSubmit)();
    reset(defaultAccountValues);
  };





  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/wBVHDDW/PROVINCIAS.png"
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
            <Grid item xs={6}>
              <div className="mt-48 mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors.pais_Id} fullWidth>
                      <InputLabel htmlFor="grouped-native-select">País</InputLabel>
                      <Select {...field}
                        variant="outlined"
                        fullWidth
                        defaultValue={' '}
                        placeholder='Seleccione un país'
                        label="País">
                        <MenuItem value="0"></MenuItem>
                        <MenuItem value="1">HN-Honduras</MenuItem>
                        <MenuItem value="2">CL-Colombia</MenuItem>
                        <MenuItem value="3">MX-México</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  name="pais_Id"
                  control={control}
                />
              </div>
            </Grid>


            <Grid item xs={6}>
              <div className="mt-48 mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Código de la provincia"
                      variant="outlined"
                      error={!!errors.prov_Codigo}

                      placeholder='Ingrese el código de la provincia'
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="prov_Codigo"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="mt-1 mb-16" style={{ width: "975px" }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombre de la provincia"
                      variant="outlined"
                      error={!!errors.prov_Nombre}

                      placeholder='Ingrese el nombre de la provincia'
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="prov_Nombre"
                  control={control}
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
                onClick={GuardarProvincia}
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

export default ProvinciasIndex;





