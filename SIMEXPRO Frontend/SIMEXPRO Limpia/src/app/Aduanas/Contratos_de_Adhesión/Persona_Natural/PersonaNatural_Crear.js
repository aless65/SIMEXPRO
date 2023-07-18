import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';

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
import { Input } from "postcss";
import { useState } from "react";


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

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
    </div>
  );
};

function PersonaNatural_Crear() {
  const navigate = useNavigate();
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

      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/T4VqYmN/Headers-SIMEXPRO-3.png"
        alt="Encabezado de la carta"
      />

    
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
            <Tab label="Datos Generales" {...a11yProps(0)} />
            <Tab label="Datos a Informar" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Card style={{ marginBottom: "25px" }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "3px" }} label="RTN del Solicitante" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "3px" }} label="Archivo PDF" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "3px" }} label="Documento Nacional de Identificación (DNI)" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "3px" }} label="Archivo PDF" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "3px" }} label="Número Recibo de Servicio Público (ENEE, SANAA, etc.)" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "3px" }} label="Archivo PDF" />
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

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Card style={{ marginBottom: "25px" }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Oficina Regional  de Aduanas más cercana</InputLabel>
                      <Select style={{ borderRadius: "10px" }} label="Oficina Regional de Aduanas más cercana" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Estado Civil de la Persona</InputLabel>
                      <Select style={{ borderRadius: "10px" }} label="Estado Civil de la Persona" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Profesión u Oficio de la Persona</InputLabel>
                      <Select style={{ borderRadius: "10px" }} label="Profesión u Oficio de la Persona" />
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider style={{ marginTop: "30px", marginBottom: "15px" }}>
                  <Chip label="DOMICILIO DE LA PERSONA" />
                </Divider>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Departamento y Municipio</InputLabel>
                      <Select style={{ borderRadius: "10px" }} label="Departamento y Municipio" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Ciudad" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Dirección Completa" />
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider style={{ marginTop: "30px", marginBottom: "15px" }}>
                  <Chip label="INFORMACIÓN DE CONTACTO" />
                </Divider>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Número de Teléfono Fijo de la Persona" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Número de Teléfono Celular de la Persona" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField style={{ borderRadius: "10px" }} label="Correo Electrónico donde Notificar" />
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
                  navigate("/ContratoDeAdhesionComercianteIndividual/Index");
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default PersonaNatural_Crear;