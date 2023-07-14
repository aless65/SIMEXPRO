import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Icon } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

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
        <Stack direction="row" spacing={2} alignItems="center">
          <ColorButton startIcon={<Icon>add</Icon>}>
            Nuevo
          </ColorButton>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UsuariosIndex;
