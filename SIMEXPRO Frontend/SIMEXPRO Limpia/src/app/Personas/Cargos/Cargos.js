import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Icon, IconButton, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';

function CargosIndex() {
  const columns = [
    { field: 'id', headerName: 'Código', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 300 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 400,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<Icon>edit</Icon>}
            variant="contained"
            sx={{ backgroundColor: '#634A9E', color: 'white', borderRadius: '10px', }}
          >
            Editar
          </Button>
          <Button
            startIcon={<Icon>visibility</Icon>}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#797979', color: 'white',  borderRadius: '10px' }}
          >
            Detalles
          </Button>
          <Button
            startIcon={<Icon>delete</Icon>}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#E40F00', color: 'white',  borderRadius: '10px' }}
          >
            Eliminar
          </Button>
        </Stack>
      ),
    },
  ];
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    borderRadius: '10px',
    backgroundColor: '#634A9E',
    '&:hover': {
      backgroundColor: purple[700],
    },
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(0.5),
    },
  }));
  
  const rows = [
    { id: '1', descripcion: 'Gerentes' },
    { id: '2', descripcion: 'Supervisor' },
    { id: '3', descripcion: 'Técnico' },
    { id: '5', descripcion: 'Administrador' },
  ];

  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.descripcion.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/J2xKpCp/CARGOS.png"
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
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
                        label="Cargo"
                    />
                </FormControl>
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

export default CargosIndex;
