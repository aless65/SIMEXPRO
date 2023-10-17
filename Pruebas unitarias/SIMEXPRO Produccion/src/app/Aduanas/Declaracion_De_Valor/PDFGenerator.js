import React from 'react';
import { FilePdfFilled } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import instance from "src/app/auth/services/jwtService/jwtService";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDFGenerator = ({ data, handleCloseExportar }) => {
    const generatePDFPreview = async () => {
        const pageSize = 'A4';
        const pageMargins = [40, 60, 40, 60];
        const headerImageUrl = 'https://i.ibb.co/MPn5hrr/Captura.png';
        const date = instance.formatFechaHora(new Date());
        const user = JSON.parse(localStorage.getItem('user'));

        try {
            const response = await axios.get(headerImageUrl, { responseType: 'blob' });
            const blob = response.data;
            const reader = new FileReader();

            reader.onload = () => {
                const imageData = reader.result;
                const docDefinition = {
                    content: [
                        { 
                            image: imageData, 
                            margin: [-40, -40],
                            width: 600,
                            height: 45,
                        },
                        { text: 'Declaraciones de Valor', style: 'header', margin: [0, 40, 0,20] },
                    ],
                    styles: {
                        header: {
                            fontSize: 26,
                            bold: true,
                            color: 'black',
                            alignment: 'center',
                            underline: true,
                        },
                        tableHeader: {
                            fontSize: 14,
                            bold: true,
                            color: 'black',
                            alignment: 'center',
                            fillColor: '#E8D8FF',
                        },
                        footer: {
                            fontSize: 10,
                            alignment: 'center',
                        },
                    },
                    pageBreakBefore: (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) => {
                        return currentNode.y + currentNode.height > pageSize[1] - pageMargins[3];
                    },
                    defaultStyle: {
                        fontSize: 12,
                    },
                    footer: (currentPage, pageCount) => (
                        {
                            columns: [
                                { text: `Generado por: ${user.data["displayName"]}`, style: 'footer'},
                                { text: `Página ${currentPage.toString()} de ${pageCount}`, style: 'footer'},
                                { text: `Fecha: ${date.toString().slice(0, 10)}`, style: 'footer'},
                            ],
                            margin: [0, 20],
                        }
                    ),
                };

                docDefinition.content.push({
                    table: {
                        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'No.', style: 'tableHeader' },
                                { text: 'Código de la declaración de valor', style: 'tableHeader' },
                                { text: 'Aduana de ingreso', style: 'tableHeader' },
                                { text: 'Aduana de despacho', style: 'tableHeader' },
                                { text: 'Nombre del importador', style: 'tableHeader' },
                                { text: 'Nombre del proveedor', style: 'tableHeader' },
                                { text: 'Nombre del intermediario', style: 'tableHeader' },
                            ],
                            ...data.map(item => 
                                [
                                  item.key, 
                                  item.deva_Id,
                                  item.adua_IngresoNombre, 
                                  item.adua_DespachoNombre,
                                  item.impo_Nombre_Raso || 'No tiene importador', 
                                  item.prov_Nombre_Raso || 'No tiene proveedor',
                                  item.inte_Nombre_Raso || 'No tiene intermediario'
                                ]),
                        ],
                        alignment: 'center',
                    },
                });

                const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.getDataUrl((dataUrl) => {
                    const win = window.open();
                    win.document.write(`<iframe src="${dataUrl}" width="100%" height="100%"></iframe>`);
                });
            };

            reader.readAsDataURL(blob);
        } catch (error) {

        }
    };

    return (
        <div>
        <MenuItem
        onClick={() => { 
            generatePDFPreview();
            handleCloseExportar();
        }}
        style={{ fontSize: "15px", marginTop: "5px", marginBottom: "5px" }}
    >
        <FilePdfFilled style={{fontSize: "20px"}}/>&nbsp;&nbsp;Archivo PDF
    </MenuItem>
        </div>
    );
};

export default PDFGenerator;