import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



function ImpresionBoletinDePago() {
    // creamos el documento PDF
    const doc = new jsPDF();


    const header = function (data) {
        doc.setFontSize(18);
        const pageWidth = doc.internal.pageSize.width;
        doc.setTextColor(40);

        // Agregar imagen
        //doc.addImage('https://i.ibb.co/gt5zMF1/FDCNegro.jpg', 'JPG', pageWidth - 40, 5, 24, 24);


        // Agregar texto
        doc.text("Reporte de Servicios", data.settings.margin.left + 0, 22);
    };

    const footer = function (data) {
        const pageCount = doc.internal.getNumberOfPages();
        const currentPage = data.pageNumber;
        const pageWidth = doc.internal.pageSize.width;
        const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const text = `Documento informatico de servicos Moonson ${date}`;
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth * 1.3) - textWidth;
        doc.setFontSize(10);
        doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
        doc.text(text, textX, doc.internal.pageSize.height - 10);
    };

    //  doc.autoTableAddPage({
    //    addPageContent: header,
    //  });

    // añadimos contenido al PDF utilizando jspdf-autotable
    // doc.autoTable({
    //     head: [['Id', 'Servicio', 'Precio por Serivio']],
    //     body: data.map((row) => [
    //         row.serv_Id,
    //         row.serv_Nombre,
    //         row.serv_Precio + ' .Lps',
    //     ]),
    //     didDrawPage: function (data) {
    //         header(data);
    //         // agregamos la paginación
    //         footer(data);
    //     },
    //     margin: { top: 30, bottom: 20 }
    // });

    // obtenemos una URL del PDF para mostrarlo en un iframe
    const pdfUrl = doc.output('dataurl');

    // mostramos el documento PDF en un iframe
    return (

        <div style={{ height: '100vh' }}>
            <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default ImpresionBoletinDePago;