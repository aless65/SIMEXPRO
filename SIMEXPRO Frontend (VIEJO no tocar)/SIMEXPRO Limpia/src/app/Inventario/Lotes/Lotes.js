/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import FormHelperText from "@mui/material/FormHelperText";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function LotesIndex() {
  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    { field: "id", headerName: "Id", width: 150, alignItems: "center" },
    { field: "material", headerName: "Material", width: 150 },
    { field: "stock", headerName: "Stock", width: 120 },
    { field: "cantidad", headerName: "Cantidad", width: 200 },
    { field: "area", headerName: "Área", width: 200 },
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

  {
    /* Datos de la tabla */
  }
  const rows = [
    {
      id: "239847",
      material: "Tela",
      stock: "10",
      cantidad: "10",
      area: "ninguna",
    },
    {
      id: "398437",
      material: "Botones",
      stock: "10",
      cantidad: "10",
      area: "ninguna",
    },
    {
      id: "098783",
      material: "Hilaza",
      stock: "10",
      cantidad: "10",
      area: "ninguna",
    },
    {
      id: "234234",
      material: "Hilos",
      stock: "10",
      cantidad: "10",
      area: "ninguna",
    },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {
    /* Filtrado de datos */
  }
  const filteredRows = rows.filter((row) =>
    row.id.toLowerCase().includes(searchText.toLowerCase())
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
    stock: "",
    cantidad: "",
    Select: "",
    Areas: "",
  };

  const accountSchema = yup.object().shape({
    stock: yup.string().required(),
    cantidad: yup.string().required(),
    Select: yup.string().required(),
    Areas: yup.string().required(),
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
    if (data.Select.length != 0 || data.Areas.length != 0) {
      if (data.stock != null || data.cantidad != null) {
        if (
          data.stock.trim() === "" ||
          data.cantidad.trim() === "" ||
          data.Select[0] === "Selecciona una opción" ||
          data.Areas[0] === "Selecciona una opción"
        ) {
          console.log("Validacion 1");
          Toast.fire({
            icon: "error",
            title: "No se permiten campos vacios",
          });
        } else if (
          data.stock.trim() === "" ||
          data.cantidad.trim() === "" ||
          data.Select === "" ||
          data.Areas === ""
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
        data.stock.trim() === "" ||
        data.cantidad.trim() === "" ||
        data.Select === "" ||
        data.Areas === ""
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
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/w4zKLJs/LOTES.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={5}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={VisibilidadTabla}
            >
              Nuevo
            </Button>
          </Stack>

          {/* Barra de Busqueda en la Tabla */}
          <TextField
            style={{ borderRadius: "10px" }}
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
                      Materiales
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="10">Ten (10)</MenuItem>
                      <MenuItem value="20">Twenty (20)</MenuItem>
                      <MenuItem value="30">Thirty (30)</MenuItem>
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
                      label="Stock"
                      variant="outlined"
                      error={!!errors.stock}
                      placeholder="Ingrese el stock"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  )}
                  name="stock"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "13px" }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cantidad"
                      variant="outlined"
                      error={!!errors.cantidad}
                      placeholder="Ingrese la cantidad"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  )}
                  name="cantidad"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.Areas} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Áreas
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="10">Ten (10)</MenuItem>
                      <MenuItem value="20">Twenty (20)</MenuItem>
                      <MenuItem value="30">Thirty (30)</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="Areas"
                control={control}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "right",
              }}
            >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px", marginRight: "10px" }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                onClick={Masiso}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px" }}
                sx={{
                  backgroundColor: "#DAD8D8",
                  color: "black",
                  "&:hover": { backgroundColor: "#BFBABA" },
                }}
                onClick={VisibilidadTabla2}
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
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={DialogEliminar}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
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

export default LotesIndex;
