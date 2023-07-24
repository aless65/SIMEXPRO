import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';
import {
    Button,
    FormControl,
    Icon,
    InputLabel,
    TextField,
    InputAdornment
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from "react-router-dom";
import { black, blue } from "tailwindcss/colors";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
    const navigate = useNavigate()
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [searchText, setSearchText] = useState('');
    const [tabsEstado, settabsEstado] = useState({
        tab1: true,
        tab2: true,
    });

    {/*Columnas de la tabla*/ }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'LoteN', headerName: 'Lote N', flex: 1 },
        { field: 'Material', headerName: 'Material', flex: 1 },
        { field: 'Cantidad', headerName: 'Cantidad', flex: 1 },
    ];

    const validacion = (params, event) => {
        if (event) {
            event.preventDefault();
        }
        if ((params == 1)) {
            settabsEstado({
                tab1: false,
                tab2: true,
                tab3: true,
                tab4: true,
            });
            setValue(1);
        }

        if ((params == 2)) {
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

       {/*Datos de la tabla*/ }
       const rows = [
        { id: '1', LoteN: '4385435', Material: 'Tela clase a', Cantidad: '2' },

    ];

    {/*Filtrado de datos*/ }
    const filteredRows = rows.filter((row) =>
        row.id.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/2ZDqQND/PEDIDOS-DE-PRODUCCI-N.png"
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
                            sx={{ backgroundColor: "#FFF7F7", color: black }}
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
                                        <InputLabel htmlFor="grouped-native-select">Empleado</InputLabel>
                                        <TextField
                                            style={{ borderRadius: '3px' }}
                                            label="Empleado"
                                            select
                                            placeholder="Empleado"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start" />,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
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
                                        <InputLabel htmlFor="grouped-native-select"></InputLabel>
                                        <TextField
                                            style={{ borderRadius: '3px' }}
                                            label="Observaciones"
                                            multiline
                                            rows={8}
                                            placeholder="Observaciones"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start" />,
                                            }}
                                        />
                                    </FormControl> 
                                </Grid>

                            </Grid>

                            <Grid item xs={12} paddingTop={2} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
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
                                        <InputLabel htmlFor="grouped-native-select">Lote Id</InputLabel>
                                        <TextField
                                            style={{ borderRadius: '3px' }}
                                            label="Lote Id"
                                            select
                                            placeholder="Lote Id"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start" />,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="grouped-native-select"></InputLabel>
                                        <TextField
                                            style={{ borderRadius: '3px' }}
                                            label="Material"
                                            placeholder="Material"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start" />,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="grouped-native-select"></InputLabel>
                                        <TextField
                                            type="number" // Mostrará los botones de incremento y decremento
                                            style={{ borderRadius: '3px' }}
                                            label="Cantidad"
                                            placeholder="Cantidad"
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
                                        onClick={() => validacion(2)}
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
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

                            <Grid item xs={12} paddingTop={2} sx={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
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
                            </Grid>

                       
                        </TabPanel>

                    </SwipeableViews>
                </Box>
            </CardContent>
        </Card>
    );
}

export default PedidosProduccion_Crear;
