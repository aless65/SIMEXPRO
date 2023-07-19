import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

import Card from '@mui/material/Card';
import { Navigate, useNavigate } from 'react-router-dom';

function DocumentosDeSanciones() {
    // creamos el documento PDF
    const doc = new jsPDF();
    const Navigate = useNavigate();

    // Se le agrega una imagen el documento
    doc.addImage('', 'JPEG', 10, 10, 190, 300);

    const pdfUrl = doc.output('dataurl');
    // mostramos el documento PDF en un iframe
    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
            <div style={{ height: '100vh', marginTop: '10px' }}>
                <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
            </div>
        </Card>
    );
}

export default DocumentosDeSanciones;