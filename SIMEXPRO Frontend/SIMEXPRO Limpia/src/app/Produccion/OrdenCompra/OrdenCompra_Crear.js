/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Avatar, Divider, InputAdornment, IconButton, FormControl, Icon, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import { DateTimePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Collapse from '@mui/material/Collapse';


import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { textAlign } from '@mui/system';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TablaDetalles_Materiales from './TablaDetalles';

import Chip from '@mui/material/Chip';

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
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const getRowClassName = (params) => {
    return params.rowIndex % 2 === 0 ? '#f2f2f2' : '#ffffff';
};

function OrdenCompra_Crear() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);



    {/* Columnas de la tabla */ }
    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'modelo', headerName: 'Modelo', flex: 2 },
        { field: 'talla', headerName: 'Talla', flex: 1 },
        { field: 'progreso', headerName: 'Progreso', flex: 4 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex: 4,
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

                const handleAddMaterial = () => {
                    // Implementa la función para añadir materiales aquí
                    VisibilidadTabla();
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
                            <MenuItem onClick={handleAddMaterial}>
                                <Icon>add</Icon> Añadir Materiales
                            </MenuItem>

                        </Menu>
                    </Stack>
                );
            },
        },
    ];

    {/* Datos de la tabla */ }
    const rows = [
        { id: '1', modelo: 'Polo', talla: 'L', progreso: 'no se que va aqui' },
    ];

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    {/* Función para mostrar la tabla de detalles y mostrar agregar materiales */ }
    const VisibilidadTabla = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarAdd(!mostrarAdd);
    };

    {/* Filtrado de datos */ }
    const filteredRows = rows.filter((row) =>
        row.id.toLowerCase().includes(searchText.toLowerCase()) ||
        row.modelo.toLowerCase().includes(searchText.toLowerCase()) ||
        row.talla.toLowerCase().includes(searchText.toLowerCase()) ||
        row.progreso.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const validacion = (params, event) => {
        if (event) {
            event.preventDefault();
        }
        if (params === 1) {
            settabsEstado({
                tab1: false,
                tab2: true,
            });
            setValue(1);
        }

        if (params === 2) {
            settabsEstado({
                tab1: false,
                tab2: false,
            });
            setValue(2);
        }

    };

    const [tabsEstado, settabsEstado] = useState({
        tab1: true,
        tab2: true,
    });


    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/D5SZnc4/ORDEN-DE-COMPRA.png"
                alt="Encabezado de la carta"
            />
            <CardContent sx={{ textAlign: 'center' }}>

            </CardContent>

            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ backgroundColor: '#FFF7F7', color: black }}
                    >
                        <Tab label="I. Datos Generales de la Orden de Compra" {...a11yProps(0)} />
                        <Tab
                            label="II. Detalles de la Orden de Compra"
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab1}
                        />

                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <Typography variant="" color="rgb(55, 188, 155)">
                                            A. Datos Generales de la Orden de Compra
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Cliente</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Cliente"
                                                select
                                                placeholder="Tipo Identificacion"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>

                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl
                                            fullWidth
                                        >
                                            <DateTimePicker
                                                size="small"
                                                label='Fecha de Emisión'
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => {

                                                }}
                                                renderInput={(_props) => (
                                                    <TextField
                                                        className="w-full"
                                                        {..._props}
                                                    />
                                                )}
                                                className="w-full"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl
                                            fullWidth
                                        >
                                            <DateTimePicker
                                                size="small"
                                                label='Fecha Limite'
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => {
                                                    console.log(date);
                                                }}
                                                renderInput={(_props) => (
                                                    <TextField
                                                        className="w-full"
                                                        {..._props}
                                                    />
                                                )}
                                                className="w-full"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Metodo de Pago</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Metodo de Pago"
                                                select
                                                placeholder="Metodo de Pago"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Embalaje</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Embalaje"
                                                select
                                                placeholder="Embalaje"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">¿Materiales?</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="¿Materiales?"
                                                select
                                                placeholder="¿Materiales?"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Estado de la Orden</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Estado de la Orden"
                                                select
                                                placeholder="Estado de la Orden"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                style={{ borderRadius: '10px' }} label="Dirección" />
                                        </FormControl>
                                    </Grid>


                                </Grid>
                            </CardContent>
                        </Card>


                        <Grid
                            item
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '10px' }}
                        >
                            <Button
                                startIcon={<Icon>checked</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px', marginRight: '10px' }}
                                sx={{
                                    backgroundColor: '#634A9E',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#6e52ae' },
                                }}
                                onClick={() => validacion(1)}
                            >
                                Guardar
                            </Button>

                            <Button
                                startIcon={<Icon>close</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px' }}
                                sx={{
                                    backgroundColor: '#DAD8D8',
                                    color: 'black',
                                    '&:hover': { backgroundColor: '#BFBABA' },
                                }}
                                onClick={(e) => {
                                    navigate('/OrdenCompra/index');
                                }}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <Typography variant="" color="rgb(55, 188, 155)">
                                            B. Detalles de la Orden de Compra
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Modelo</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Modelo"
                                                select
                                                placeholder="Modelo"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Talla</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Talla"
                                                select
                                                placeholder="Talla"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <TextField style={{ borderRadius: '10px' }} label="Cantidad"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>



                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Color</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Color"
                                                select
                                                placeholder="Color"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-native-select">Proceso</InputLabel>
                                            <TextField
                                                style={{ borderRadius: '3px' }}
                                                label="Proceso"
                                                select
                                                placeholder="Proceso"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <TextField style={{ borderRadius: '10px' }} label="Impuesto"
                                                InputProps={{ startAdornment: <InputAdornment position="start" />, }} />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <TextField style={{ borderRadius: '10px' }} label="Descuento" InputProps={{ startAdornment: <InputAdornment position="start" />, }} />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Corte de Prenda</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                                <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                                <FormControlLabel value="U" control={<Radio />} label="Unisex" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h5" align="center" padding={2}>
                                            Solo Válido PDF   <PictureAsPdfIcon></PictureAsPdfIcon>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} style={{ textAlign: 'center' }} >

                                        <div class="flex items-center justify-center w-full">
                                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/128/337/337946.png" sx={{ height: "50px", width: "50px" }} variant="rounded" />
                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span class="font-semibold">Documento opciónal</span>
                                                    </p>
                                                </div>
                                                <input id="dropzone-file" type="file" class="hidden" />
                                            </label>

                                        </div>
                                        <label>En este campo puede añadir ejemplo de prendas terminadas y otras especificaciones.</label>
                                    </Grid>

                                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                                        <div class="flex items-center justify-center w-full">
                                            <label
                                                for="dropzone-file"
                                                class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">

                                                    <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/128/337/337946.png" sx={{ height: "50px", width: "50px" }} variant="rounded" />


                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span class="font-semibold">Documento de Medidas</span>
                                                    </p>
                                                </div>
                                                <input id="dropzone-file" type="file" class="hidden" />
                                            </label>
                                        </div>
                                        <label>En este campo añadir el documento con las medidas especificadas por la prenda.</label>

                                    </Grid>

                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
                                        <Button
                                            startIcon={<Icon>add_circle</Icon>}
                                            variant="contained"
                                            color="primary"
                                            style={{ borderRadius: '10px', marginRight: '10px' }}
                                            sx={{
                                                backgroundColor: '#D1AF3C',
                                                color: 'white',
                                                '&:hover': { backgroundColor: '#6e52ae' },
                                            }}
                                            onClick={() => validacion(1)}
                                        >
                                            Agregar
                                        </Button>
                                    </Grid>

                                </Grid>

                                <Collapse in={mostrarAdd}>
                                    <Divider style={{ marginTop: '30px', marginBottom: '15px' }}>
                                        <Chip label="Agregar Materiales " />
                                    </Divider>
                                    <Grid container spacing={3}>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="grouped-native-select">Material</InputLabel>
                                                <TextField
                                                    style={{ borderRadius: '3px' }}
                                                    label="Material"
                                                    select
                                                    placeholder="Material"
                                                    InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                                />
                                            </FormControl>
                                        </Grid>


                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <TextField style={{ borderRadius: '10px' }} label="Cantidad" InputProps={{ startAdornment: <InputAdornment position="start" />, }} />
                                            </FormControl>
                                        </Grid>


                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="grouped-native-select">Unidad de Medida</InputLabel>
                                                <TextField
                                                    style={{ borderRadius: '3px' }}
                                                    label="Unidad de Medida"
                                                    select
                                                    placeholder="Unida de Medida"
                                                    InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                                />
                                            </FormControl>
                                        </Grid>


                                        <Grid
                                            item
                                            xs={6}
                                            sx={{ justifyContent: 'right', alignItems: 'right' }}
                                        >
                                            <Button
                                                startIcon={<Icon>checked</Icon>}
                                                variant="contained"
                                                color="primary"
                                                style={{ borderRadius: '10px', marginRight: '10px' }}
                                                sx={{
                                                    backgroundColor: '#634A9E',
                                                    color: 'white',
                                                    '&:hover': { backgroundColor: '#6e52ae' },
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
                                                    backgroundColor: '#DAD8D8',
                                                    color: 'black',
                                                    '&:hover': { backgroundColor: '#BFBABA' },
                                                }}
                                                onClick={VisibilidadTabla}
                                            >
                                                Cancelar
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Collapse>

                                <Collapse in={mostrarIndex}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <DataGrid
                                                sx={{ height: '200px' }}
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
                                            {/* <TablaDetalles_Materiales></TablaDetalles_Materiales>  */}
                                        </Grid>
                                    </Grid>
                                </Collapse>




                            </CardContent>
                        </Card>


                        <Grid
                            item
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '10px' }}
                        >
                            <Button
                                startIcon={<Icon>checked</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px', marginRight: '10px' }}
                                sx={{
                                    backgroundColor: '#634A9E',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#6e52ae' },
                                }}
                                //onClick={() => validacion(1)}
                                onClick={(e) => {
                                    navigate('/OrdenCompra/index');
                                }}
                            >
                                Guardar
                            </Button>

                            <Button
                                startIcon={<Icon>close</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px' }}
                                sx={{
                                    backgroundColor: '#DAD8D8',
                                    color: 'black',
                                    '&:hover': { backgroundColor: '#BFBABA' },
                                }}
                                onClick={(e) => {
                                    navigate('/OrdenCompra/index');
                                }}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </TabPanel>










                </SwipeableViews>
            </Box>
        </Card >
    );
}

export default OrdenCompra_Crear;
