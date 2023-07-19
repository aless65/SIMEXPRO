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

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function EstilosIndex() {
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [Eliminar, setEliminar] = useState(false);

    const DialogEliminar = () => {
        setEliminar(!Eliminar);
    };

    {/* Columnas de la tabla */ }
    const columns = [
        { field: 'id', headerName: 'Id', width: 200 },
        { field: 'descripcion', headerName: 'Descripción', flex: 5 }, {
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
        { id: '1', descripcion: 'Escotada' },
        { id: '2', descripcion: 'Manga Larga' },
        { id: '3', descripcion: 'Manga 3/4' },
        { id: '4', descripcion: 'Manga Corta' },
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
        row.descripcion.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/FBYwspS/ESTILOS.png"
                alt="Encabezado de la carta"
            />
            <Collapse in={mostrarIndex}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                    {/* Botón de Nuevo */}
                    <Stack direction="row" spacing={5}>
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
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Grid container spacing={3}>
                        
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}
                             style={{ marginTop: '30px' }}>

                            <FormControl>
                                <TextField
                                    style={{ borderRadius: '10px', width: '500px' }}
                                    label="Descripción"
                                />
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
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

export default EstilosIndex;



