import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Icon } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

function UsuariosIndex(){


    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        borderRadius: '10px',
        backgroundColor: '#634A9E',
        '&:hover': {
          backgroundColor: purple[700],
        },
      }));

    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
          <CardMedia
            component="img"
            height="200"
            image="https://i.ibb.co/T4VqYmN/Headers-SIMEXPRO-3.png"
            alt="Encabezado de la carta"
          />
          <CardContent>
            <ColorButton
               >
            +
                Nuevo
            </ColorButton>
          </CardContent>
        </Card>
      );
}

export default UsuariosIndex;