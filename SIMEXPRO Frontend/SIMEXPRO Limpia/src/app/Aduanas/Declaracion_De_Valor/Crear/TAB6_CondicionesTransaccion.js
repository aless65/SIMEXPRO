
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Chip, Divider, FormControl, Icon, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';

import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { CardMedia } from '@material-ui/core';


function CondicionesTransaccion(){
    return(
        <>

<Grid container spacing={3} style={{ marginBottom: '20px' }}>
  <Grid item textAlign="center" xs={12}>
    <Typography variant="h5" color="rgb(55, 188, 155)">
      II. Condiciones de la Transacción
    </Typography>
  </Grid>
</Grid>

{/* HEADER DE LA TABLA */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
  style={{ marginTop: '15px', marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>#</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>CONDICIÓN</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <Typography>VALOR ASIGNADO CONDICIÓN</Typography>
    </FormControl>
  </Grid>
</Grid>

{/* FILA #1 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(188,212,220)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>24</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>
        Existen restricciones a la cesión o utilización de las mercancías por el
        comprador, distintas de las excepciones previstas en el artículo 1.1 a) del
        Acuerdo
      </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <TextField
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Valor"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #2 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>24.1</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography> Indicar en que consiste la o las restricciones </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <TextField
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Valor"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #3 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(188,212,220)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>25</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>
        Depende la venta o el precio de alguna condición o contraprestación, con
        relación a las mercancías a valorar
      </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <TextField
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Valor"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #4 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>25.1</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>
        {' '}
        Indicar en que consiste la condición o contrapresentación, y si es cuantificable
        consignar el monto en la casilla Nro. 42.1{' '}
      </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <TextField
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Valor"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #5 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(188,212,220)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>26</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>
        Está la venta condicionada a revertir directa o indirectamente al vendedor parte
        alguna del producto de la reventa o de cualquier cesión o utilización posterior
        de las mercancías, por el comprador, en caso afirmativo, declara el monto de la
        reversión en la casilla Nro. 42
      </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <InputLabel>Seleccione una opción</InputLabel>
      <Select
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Seleccione una opción"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #6 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>27</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>Existe vinculación entre el vendedor y el comprador</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <InputLabel>Seleccione una opción</InputLabel>
      <Select
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Seleccione una opción"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #7 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(188,212,220)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>27.1</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>Indicar si la vinculación ha influido en el precio</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <TextField
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Valor"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #8 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>27.2</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>Indicar si la vinculación ha influido en el precio</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <InputLabel>Seleccione una opción</InputLabel>
      <Select
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Seleccione una opción"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #9 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(188,212,220)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>28</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>Existen pagos indirectos y/o descuentos retroactivos</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <InputLabel>Seleccione una opción</InputLabel>
      <Select
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Seleccione una opción"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #10 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>28.1</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>
        Indicar en que concepto y el monto declarado en la casilla Nro. 40
      </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <TextField
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Valor"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #11 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(188,212,220)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>29</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>
        Existen cánones y derechos de licencia que el comprador tenga que pagar directa
        o indirectamente
      </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <InputLabel>Seleccione una opción</InputLabel>
      <Select
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Seleccione una opción"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* FILA #12 */}
<Grid
  container
  spacing={1}
  sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
  style={{ marginBottom: '15px' }}
>
  <Grid item xs={1} sx={{ border: '12px' }}>
    <FormControl fullWidth>
      <Typography>29.1</Typography>
    </FormControl>
  </Grid>
  <Grid item xs={8}>
    <FormControl fullWidth>
      <Typography>
        Indicar su naturaleza y el monto declarado en la casilla Nro. 42.9
      </Typography>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth>
      <TextField
        style={{ borderRadius: '3px' }}
        sx={{ backgroundColor: 'rgb(255,255,255)' }}
        label="Valor"
        size="small"
      />
    </FormControl>
  </Grid>
</Grid>

{/* BOTONES */}
<Grid
  item
  xs={12}
  sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
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
    onClick={() => validacion(5)}
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
    onClick={() => {
      navigate('/Declaracion-de-Valor/Listado');
    }}
  >
    Cancelar
  </Button>
</Grid>        
        </>
    );
}


export default CondicionesTransaccion;