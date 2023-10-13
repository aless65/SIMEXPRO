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
import FormLabel from "@mui/material/FormLabel";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import FormHelperText from "@mui/material/FormHelperText";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function AldeaIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'Id', flex: 2},
    { field: 'aldea', headerName: 'Aldea', flex: 2,  },
    { field: 'ciudad', headerName: 'Ciudad', flex: 2,  },
    {
      field: "acciones",
      headerName: "Acciones",
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
              style={{
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
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
    { id: '1', aldea: 'La Laguna', ciudad: 'Distrito Central' },
    { id: '2', aldea: 'El Porvenir', ciudad: 'San Pedro Sula' },
    { id: '3', aldea: 'El Tablón', ciudad: 'Juticalpa' },
    { id: '4', aldea: 'Las Delicias', ciudad: 'La Ceiba' },
    { id: '5', aldea: 'El Rosario', ciudad: 'Santa Bárbara' },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = rows.filter((row) =>
    row.aldea.toLowerCase().includes(searchText.toLowerCase())
  );

  {
    /*Codigo para validaciones */
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "red",
    width: 400,
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const Toast2 = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "green",
    width: 400,
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const defaultAccountValues = {
    Aldea: "",
    Select: "",
  };

  const accountSchema = yup.object().shape({
    Aldea: yup.string().required(),
    Select: yup.string().required(),
  });

  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);
  };

  const VisibilidadTabla2 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);
  };

  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultAccountValues,
    mode: "all",
    resolver: yupResolver(accountSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    if (data.Select.length != 0) {
      if (data.Aldea != null ) {
        if (
          data.Aldea.trim() === "" ||       
          data.Select[0] === "Selecciona una opción"
        ) {
          console.log("Validacion 1");
          Toast.fire({
            icon: "error",
            title: "No se permiten campos vacios",
          });
        } else if (
          data.Aldea.trim() === "" ||
          data.Select === "" 
        ) {
          console.log("Que onda");
          Toast.fire({
            icon: "error",
            title: "No se permiten campos vacios",
          });
        } else {
          console.log("Validacion 2");
          VisibilidadTabla();
          Toast2.fire({
            icon: "success",
            title: "Datos guardados exitosamente",
          });
        }
      } 
      else {
        console.log("Validacion 3");
        Toast.fire({
          icon: "error",
          title: "No se permiten campos vacios",
        });
      }
    } else {
      console.log("Validacion 4");
      if (
        data.Aldea.trim() === "" ||
        data.Select === ""
      ) {
        console.log("Que onda");
        Toast.fire({
          icon: "error",
          title: "No se permiten campos vacios",
        });
      }
    }
  };

  const Masiso = () => {
    const formData = watch();
    onSubmit(formData);
    handleSubmit(onSubmit)();
  };

  {
    /*Codigo para validaciones */
  }

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/PQVXCCM/ALDEAS.png"
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
                <div style={{ height: 400, width: '100%', marginLeft: '30px', marginRight: '30px' }}>
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
      <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "30px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.Select} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Ciudades
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="10">San Pedro Sula</MenuItem>
                      <MenuItem value="20">La Lima</MenuItem>
                      <MenuItem value="30">Choloma</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="Select"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Aldea"
                      variant="outlined"
                      error={!!errors.Aldea}
                      placeholder="Ingrese el nombre de la Aldea"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  )}
                  name="Aldea"
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

export default AldeaIndex;



