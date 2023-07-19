import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Navigate, useNavigate } from 'react-router-dom';


function ImpresionBoletinDePago() {
    // creamos el documento PDF
    const doc = new jsPDF();
    const Navigate = useNavigate();



    // Se le agrega una imagen el documento 
    doc.addImage('https://i.ibb.co/JCWWQkJ/imagen-2023-07-18-074808012.png', 'JPEG', 10, 10, 190, 300);

    const pdfUrl = doc.output('dataurl');
    // mostramos el documento PDF en un iframe
    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>

            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={1}></Grid>
                <Stack direction="row" spacing={1}>
                    <Button
                        startIcon={<Icon>arrow_back</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '10px' }}
                        sx={{
                            backgroundColor: '#797979', color: 'white',
                            "&:hover": { backgroundColor: '#b69999' },
                        }}
                        onClick={(e) => {
                            Navigate("/BoletindePago/BoletinDePagoIndex");
                        }}
                    >
                        Regresar
                    </Button>
                </Stack>
                <Grid item xs={1}></Grid>
            </Grid>

            <div style={{ height: '100vh', marginTop: '10px' }}>
                <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
            </div>
        </Card>

    );
}

export default ImpresionBoletinDePago;