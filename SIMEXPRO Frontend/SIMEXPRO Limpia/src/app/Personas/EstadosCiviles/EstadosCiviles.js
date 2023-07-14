import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Icon } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Código', width: 150 },
  { field: 'descripcion', headerName: 'Descripción', width: 400 },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 400,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<Icon>edit</Icon>}
          variant="contained"
          sx={{ backgroundColor: '#FFBD59', color: 'black' }}
        >
          Editar
        </Button>
        <Button
          startIcon={<Icon>visibility</Icon>}
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#DAD8D8', color: 'black' }}
        >
          Detalles
        </Button>
        <Button
          startIcon={<Icon>delete</Icon>}
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#F44336', color: 'black' }}
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
  { id: 'C', descripcion: 'Casado' },
  { id: 'S', descripcion: 'Soltero' },
  { id: 'V', descripcion: 'Viudo' },
  { id: 'A', descripcion: 'Amante' },
  { id: 'D', descripcion: 'Divorciado' },
];

function UsuariosIndex() {
  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/T4VqYmN/Headers-SIMEXPRO-3.png"
        alt="Encabezado de la carta"
      />
      <CardContent>
      <ColorButton startIcon={<Icon>add</Icon>}>
            Nuevo
          </ColorButton>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </CardContent>
    </Card>
  );
}

export default UsuariosIndex;
