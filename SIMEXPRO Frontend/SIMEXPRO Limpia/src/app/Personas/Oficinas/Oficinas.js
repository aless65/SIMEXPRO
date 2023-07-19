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
  { id: '01', descripcion: 'TEGUCIGALPA, M.D.C' },
  { id: '02', descripcion: 'SAN PEDRO SULA, CORTÉS' },
];

function UsuariosIndex() {
  const [searchText, setSearchText] = useState('');

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
        image="https://i.ibb.co/Sv580Kn/OFICINAS.png"
        alt="Encabezado de la carta"
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Stack direction="row" spacing={1}>
      <Button
          startIcon={<Icon>add</Icon>}
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#634A9E', color: 'white',  borderRadius: '10px' }}
        >
          Nuevo
        </Button>
        </Stack>

        <TextField
       placeholder='Buscar'
       borderRadius= '100px'
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
    </Card>
  );
}

export default UsuariosIndex;
