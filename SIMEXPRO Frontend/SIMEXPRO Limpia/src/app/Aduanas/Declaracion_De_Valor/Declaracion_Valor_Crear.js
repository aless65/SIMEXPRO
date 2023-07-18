import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Icon,
  InputLabel,
  TextField,
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";
import { height, margin, width } from "@mui/system";
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search';


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



  {/* Columnas de la tabla */ }
  const columns = [
    { field: 'id', headerName: 'N° Factura', flex: 1, },
    { field: 'fecha', headerName: 'Fecha', flex: 1, },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 380,
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
            startIcon={<Icon>visibility</Icon>} variant="contained" color="primary" style={{ borderRadius: '10px' }}
            sx={{ backgroundColor: '#797979', color: 'white', "&:hover": { backgroundColor: '#b69999' },}} >
            Detalles
          </Button>
          <Button
            startIcon={<Icon>delete</Icon>}
            variant="contained" color="primary" style={{ borderRadius: '10px' }}
            sx={{ backgroundColor: '#E40F00', color: 'white', "&:hover": { backgroundColor: '#eb5f56' }, }}
            >
            Eliminar
          </Button>
        </Stack>
      ),
    },
  ];

  {/* Datos de la tabla */ }
  const rows = [
    { id: '1', fecha: '17/07/2023', },    
    { id: '2', fecha: '14/07/2023', }, 
    { id: '3', fecha: '11/07/2023', },    
  ];

  const getRowClassName = (params) =>{
    return params.rowIndex % 2 == 0 ?  '#f2f2f2' : '#ffffff';
  }



function Declaracion_Valor_Crear() {
  const Navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textTransform: "uppercase" }}
          >
            NUEVA DECLARACIÓN DE VALOR
          </Typography>
        </Grid>
      </CardContent>

      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{ backgroundColor: "#FFF7F7", color: black }}
          >
              <Tab label="I. Información General de Aduana e Importador" {...a11yProps(0)} />
              <Tab label="I.I Información General de Proveedor e Intermediario" {...a11yProps(1)} />
              <Tab label="I.II Información General: Característica de la transacción" {...a11yProps(2)} />
              <Tab label="Facturas" {...a11yProps(3)} />
              <Tab label="II. Condiciones de la transacción" {...a11yProps(4)} />
              <Tab label="III. Determinación del Valor en Aduana, en Pesos Centroamericanos" {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>

            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="" color={"rgb(55, 188, 155)"} >
                      A. Información General de la Aduana
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                      Aduana de Ingreso
                      </InputLabel>
                      <Select style={{ borderRadius: "3px" }} label="Aduana de Ingreso" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                  <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                      Aduana de Despacho
                      </InputLabel>
                      <Select style={{ borderRadius: "3px" }} label="Aduana de Despacho" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                  <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                      Declaración de Mercancía
                      </InputLabel>
                      <Select style={{ borderRadius: "3px" }} label="Declaración de Mercancía" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Fecha de Aceptación" size="small"/>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ marginTop: "10px", marginBottom: "10px"}}>
              <CardContent>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="" color={"rgb(55, 188, 155)"} >
                      B. Información General del Importador
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Nombre o Razón Social" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Registro Tributario Nacional (RTN)" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Número de Registro" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                      País
                      </InputLabel>
                      <Select style={{ borderRadius: "3px" }} label="País" size="small"/>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                      Estado
                      </InputLabel>
                      <Select style={{ borderRadius: "3px" }} label="Estado" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Dirección" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Correo Electrónico" size="small"/>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Teléfono" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Fax" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                      Nivel Comercial
                      </InputLabel>
                      <Select style={{ borderRadius: "3px" }} label="Nivel Comercial" size="small"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Otro Nivel Comercial" size="small"/>
                    </FormControl>
                  </Grid>
                </Grid>              
              </CardContent>            
            </Card>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
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
                        Navigate("/ContratoDeAdhesionComercianteIndividual/Index");
                      }}
                    >
                      Cancelar
                    </Button>
            </Grid>

          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                    <Grid item textAlign={"center"} xs={3}>
                      <Typography variant="" color={"rgb(55, 188, 155)"} >
                        C. Proveedor
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Nombre o Razón Social" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Dirección" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Ciudad" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                        País
                        </InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="País" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>                      
                        <TextField style={{ borderRadius: "10px" }} label="Correo Electrónico" size="small"/>
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Teléfono" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Fax" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                        Nivel Comercial
                        </InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="Condición Comercial" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Otra Condición Comercial" size="small"/>
                      </FormControl>
                    </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ marginTop: "10px", marginBottom: "10px"}}>
              <CardContent>
                <Grid container spacing={3}>
                    <Grid item textAlign={"center"} xs={3}>
                      <Typography variant="" color={"rgb(55, 188, 155)"} >
                        D. Intermediario
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Nombre o Razón Social" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Dirección" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Ciudad" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                        País
                        </InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="País" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>                      
                        <TextField style={{ borderRadius: "10px" }} label="Correo Electrónico" size="small"/>
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Teléfono" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Fax" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                        Tipo Intermediario  
                        </InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="Tipo Intermediario" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Otro Tipo Intermediario" size="small"/>
                      </FormControl>
                    </Grid>
                </Grid>              
              </CardContent>            
            </Card>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
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
                        Navigate("/ContratoDeAdhesionComercianteIndividual/Index");
                      }}
                    >
                      Cancelar
                    </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
          <Card style={{ marginTop: "10px", marginBottom: "10px"}}>
              <CardContent>
                <Grid container spacing={3}>
                    <Grid item textAlign={"center"} xs={3}>
                      <Typography variant="" color={"rgb(55, 188, 155)"} >
                        E. Característica de la Transacción
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Lugar de Entrega" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel> País de Entrega</InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="País de Entrega" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>Incoterm</InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="Incoterm" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Versión" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>                      
                        <TextField style={{ borderRadius: "10px" }} label="Número de Contrato" size="small"/>
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Fecha de Contrato" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>Forma de Envío</InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="Forma de Envío" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Otra Forma de Envío" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                        Pago Efectuado
                        </InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="Pago Efectuado" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>Forma de Pago</InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="Forma de Pago" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Otra Forma de Pago" size="small"/>
                      </FormControl>
                    </Grid>                                      
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Lugar de Embarque" size="small"/>
                      </FormControl>
                    </Grid>         
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>País de Embarque</InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="País de Embarque" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>País de Exportación</InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="País de Exportación" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Fecha de Exportación" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>Moneda en que se realizó la transacción</InputLabel>
                        <Select style={{ borderRadius: "3px" }} label="Modena en que se realizó la transacción" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Otra Moneda" size="small"/>
                      </FormControl>
                    </Grid>                    
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Tipo de Cambio de Moneda Extrajera a USD" size="small"/>
                      </FormControl>
                    </Grid>                    
                </Grid>              
              </CardContent>            
            </Card>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
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
                        Navigate("/ContratoDeAdhesionComercianteIndividual/Index");
                      }}
                    >
                      Cancelar
                    </Button>
            </Grid>            
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <Card style={{ marginTop: "10px", marginBottom: "10px"}}>
              <CardContent>
                <div style={{ height: 300, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={getRowClassName}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                      },
                    }}
                    pageSizeOptions={[3, 6, 9]}
                  />
                </div>
                <Divider style={{ marginTop: "30px", marginBottom: "15px"}}>
                  <Chip label="FACTURA" />
                </Divider>
                <Grid container spacing={3}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Numero de Factura" size="small"/>
                      </FormControl>
                    </Grid>                   
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Fecha" size="small"/>
                      </FormControl>
                    </Grid>                   
                    <Grid item xs={2}></Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="" color={"rgb(55, 188, 155)"} >
                      DESCRIPCIÓN DE LAS MERCANCÍAS (ITEMS)
                  </Typography>                  
                </Grid> 
                <div style={{ height: 300, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={getRowClassName}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                      },
                    }}
                    pageSizeOptions={[3, 6, 9]}
                  />
                </div>    
                <Divider style={{ marginTop: "30px", marginBottom: "15px"}}>
                  <Chip label="AÑADIR ITEMS A LA FACTURA" />
                </Divider>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Numero de Item" size="small"/>
                      </FormControl>
                    </Grid>                   
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Cantidad" size="small"/>
                      </FormControl>
                    </Grid>                   
                    <Grid item xs={5}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Unidad de Medida" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Designación o Identificación Comercial de las Mercancías" size="small"/>
                      </FormControl>
                    </Grid> 
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Características de la Mercancía" size="small"/>
                      </FormControl>
                    </Grid> 
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Marca" size="small"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>         
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Modelo y/o Estilo" size="small"/>
                      </FormControl>
                    </Grid> 
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Estado de las Mercancías</InputLabel>
                        <Select  style={{ borderRadius: "10px" }} label="Estado de las Mercancías" size="small"/>
                      </FormControl>
                    </Grid> 
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Orígen de las Mercancías</InputLabel>
                        <Select style={{ borderRadius: "10px" }} label="Orígen de las Mercancías" size="small"/>
                      </FormControl>
                    </Grid>         
                    <Grid item xs={4}>         
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Clasificación Arancelaria" size="small"/>
                      </FormControl>
                    </Grid> 
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Valor Unitario</InputLabel>
                        <Select  style={{ borderRadius: "10px" }} label="Valor Unitario" size="small"/>
                      </FormControl>
                    </Grid> 
                    <Grid item xs={4}>         
                      <FormControl fullWidth>
                        <TextField style={{ borderRadius: "10px" }} label="Total Factura Unitario" size="small"/>
                      </FormControl>
                    </Grid>       
                </Grid>                          
              </CardContent>
            </Card>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
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
                        navigate("");
                      }}
                    >
                      Cancelar
                    </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={4} dir={theme.direction}>
            <Card style={{ marginTop: "10px", marginBottom: "10px"}}>
              <CardContent>
                <Grid container spacing={3}>
                    <Grid item textAlign={"center"} xs={12}>
                      <Typography variant="h5" color={"rgb(55, 188, 155)"} >
                        II. Condiciones de la Transacción
                      </Typography>
                    </Grid>

                    <Grid item alignContent={"center"} xs={12}>
                      <table >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Condicion</th>
                            <th>Valor Asignado</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Condición 1</td>
                            <td>Valor 1</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Condición 2</td>
                            <td>Valor 2</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Condición 3</td>
                            <td>Valor 3</td>
                          </tr>
                          {/* Agrega más filas si es necesario */}
                        </tbody>
                      </table>
                    </Grid>
                    
                    {/* <Grid item xs={3}>
                    <FormControl fullWidth>
                        <TextField style={{ borderRadius: "3px" }} label="Versión" size="small"/>
                      </FormControl>
                    </Grid> */}




       
                   
                </Grid>              
              </CardContent>            
            </Card>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
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
                        Navigate("/ContratoDeAdhesionComercianteIndividual/Index");
                      }}
                    >
                      Cancelar
                    </Button>
            </Grid>                
          </TabPanel>
          <TabPanel value={value} index={5} dir={theme.direction}></TabPanel>
        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default Declaracion_Valor_Crear;