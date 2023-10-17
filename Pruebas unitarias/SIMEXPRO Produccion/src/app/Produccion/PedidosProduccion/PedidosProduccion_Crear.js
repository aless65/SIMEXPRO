/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import { Table } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import "react-toastify/dist/ReactToastify.css";

import { DateTimePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
function PedidosProduccion_Crear() {
  //Constante para navegar entre paginas
  const navigate = useNavigate();

  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
  });

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(5);

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChangeTable = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  //Constantes para el dialog de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante de las columnas del index
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: "Número de Lote",
      dataIndex: "loteN",
      key: "loteN",
      sorter: (a, b) => a.loteN - b.loteN, //sorting para Numeros
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      sorter: (a, b) => a.material.localeCompare(b.material), //sorting para Letras
    },
    {
      title: "Cantidad a Pedir",
      dataIndex: "cantidad",
      key: "cantidad",
      sorter: (a, b) => a.cantidad - b.cantidad, //sorting para Numeros
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.id)}
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
              anchorEl={anchorEl[params.id]}
              keepMounted
              open={Boolean(anchorEl[params.id])}
              onClose={() => handleClose(params.id)}
            >
              <MenuItem
              onClick={() =>
                  handleEdit(
                    params.id,
                    params.loteN,
                    params.material,
                    params.cantidad
                  )
                }
              >
                <Icon>edit</Icon>ㅤEditar la cantidad
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id, params.cantidad)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params == 1) {
      settabsEstado({
        tab1: false,
        tab2: true,
        tab3: true,
        tab4: true,
      });
      setValue(1);
    }

    if (params == 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: true,
      });
      setValue(2);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //Constante para que se carguen los datos en la tabla del index
  const rows = [
    {
      key: 1,
      id: "1",
      loteN: "4385435",
      material: "Tela clase a",
      cantidad: "2",
    },
    {
      key: 2,
      id: "2",
      loteN: "43B735",
      material: "Tela Clase B",
      cantidad: "300",
    },
    {
      key: 3,
      id: "3",
      loteN: "4167895",
      material: "Botones Rojos",
      cantidad: "350",
    },
    {
      key: 4,
      id: "4",
      loteN: "43B735FP",
      material: "Tela Satín",
      cantidad: "30",
    },
    {
      key: 5,
      id: "5",
      loteN: "43B735FP",
      material: "Tela Tipo L",
      cantidad: "234",
    },
    {
      key: 6,
      id: "6",
      loteN: "43B735FP",
      material: "Tela Satín",
      cantidad: "301",
    },
    {
      key: 7,
      id: "7",
      loteN: "43B735FP",
      material: "Tela Satín",
      cantidad: "404",
    },
    {
      key: 8,
      id: "8",
      loteN: "43B735FP",
      material: "Tela Satín",
      cantidad: "398",
    },
    {
      key: 9,
      id: "9",
      loteN: "43B735FP",
      material: "Tela Satín",
      cantidad: "303",
    },
    {
      key: 10,
      id: "10",
      loteN: "43B735FP",
      material: "Tela Satín",
      cantidad: "320",
    },
    {
      key: 11,
      id: "11",
      loteN: "43B735FP",
      material: "Tela Satín",
      cantidad: "3078",
    },
  ];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/ZVVTwPz/PEDIDOS-DE-PRODUCCI-N.png"
        alt="Encabezado de la carta"
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{ backgroundColor: "#e5e1fa", color: black }}
            >
              <Tab
                label="Pedido de producción Datos generales"
                {...a11yProps(0)}
              />
              <Tab label="Pedido de producción Detalles" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Encargado del Pedido:
                    </FormLabel>
                    <TextField
                      style={{ borderRadius: "3px" }}
                      select
                      placeholder="Empleado"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormLabel className="font-medium text-10" component="legend">
                    Fecha del Pedido:
                  </FormLabel>
                  <DateTimePicker
                    value={value}
                    onChange={undefined}
                    required
                    renderInput={(_props) => (
                      <TextField
                        className="w-full"
                        {..._props}
                        onBlur={undefined}
                      />
                    )}
                    className="w-full"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Observaciones:
                    </FormLabel>
                    <InputLabel htmlFor="grouped-native-select"></InputLabel>
                    <TextField
                      style={{ borderRadius: "3px" }}
                      multiline
                      rows={8}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                paddingTop={2}
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
                  onClick={() => validacion(1)}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
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
                  onClick={(e) => {
                    navigate("/PedidosProduccion/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </TabPanel>

            {/*Segundo tab*/}

            <TabPanel value={value} index={1} dir={theme.direction}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Id del Lote:
                    </FormLabel>
                    <TextField
                      style={{ borderRadius: "3px" }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Material:
                    </FormLabel>
                    <TextField
                      style={{ borderRadius: "3px" }}
                      InputProps={{
                        style: { background: "#d8c9f4", opacity: 0.2 },
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      disabled
                    >
                    </TextField>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Cantidad a Pedir:
                    </FormLabel>
                    <TextField
                      style={{ borderRadius: "3px" }}
                      value={null}
                      onChange={undefined}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    startIcon={<Icon>add</Icon>}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "10px",
                      marginRight: "10px",
                      marginTop: "15px",
                    }}
                    sx={{
                      backgroundColor: "#d1af3c",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid>

              {/* Select para las filas de la tabla inicio*/}
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Stack direction="row" spacing={1}>
                  <label className="mt-8">Filas por página:</label>
                  <FormControl sx={{ minWidth: 50 }} size="small">
                    {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={filas}
                      // label="Filas"
                      onChange={handleChangeTable}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                  {/* Select para las filas de la tabla fin*/}

                  {/* Barra de Busqueda en la Tabla */}
                  <TextField
                    style={{ borderRadius: "10px" }}
                    placeholder="Buscar"
                    value={searchText}
                    onChange={handleSearchChange}
                    size="small"
                    variant="outlined"
                    inputProps={{
                      startadornment: (
                        <InputAdornment position="start">
                          <IconButton edge="start">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </div>
              {/* Barra de Busqueda en la Tabla fin */}

              {/*Tabla*/}
              <div
                className="center"
                style={{ width: "95%", margin: "auto", marginTop: "30px" }}
              >
                <Table
                  columns={columns}
                  dataSource={filteredRows}
                  size="small"
                  pagination={{
                    pageSize: filas,
                    className: "decoration-white",
                  }}
                />
              </div>

              <Grid
                item
                xs={12}
                paddingTop={2}
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
                  //onClick={() => validacion(2)}
                  onClick={(e) => {
                    navigate("/PedidosProduccion/Index");
                  }}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                >
                  Finalizar
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
                  onClick={(e) => {
                    navigate("/PedidosProduccion/Index");
                  }}
                >
                  Cancelar
                </Button>

                {/* Dialog para eliminar un registro inicio*/}
                <Dialog
                  open={Eliminar}
                  fullWidth={true}
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
              </Grid>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PedidosProduccion_Crear;
