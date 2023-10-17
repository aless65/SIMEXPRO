import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Button } from '@mui/material';
import axios from 'axios';
import { FilePdfFilled } from '@ant-design/icons';
import instance from "src/app/auth/services/jwtService/jwtService";

const PDFGenerator = ({ data }) => {
    const generatePDFPreview = async () => {
        const pageSize = 'A4'; // You can set the page size here
        const pageMargins = [40, 60, 40, 60]; // Margins: [left, top, right, bottom]
        const headerImageUrl = 'https://i.ibb.co/MPn5hrr/Captura.png';
        const date = instance.formatFechaHora(new Date()); 
        const user = JSON.parse(localStorage.getItem('user'));

        try{

            const response = await axios.get(headerImageUrl, { responseType: 'blob' });
            const blob = response.data;
            const reader = new FileReader();

            reader.onload = () => {
                const imageData = reader.result;

                const docDefinition = {
                    content: [
                        { 
                            image: imageData, 
                            margin: [-40, -40], // Margins: [left, top, right, bottom]
                            width: 600,
                            height: 45,
                        },
                        { text: 'Orden de Pedido', style: 'header', margin: [0, 40, 0,20] },
                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            color: 'purple',
                            alignment: 'center',
                        },
                        subHeader: {
                            fontSize: 14,
                            bold: false,
                            color: 'black',
                            alignment: 'left',
                        },
                        footer: {
                            fontSize: 10,
                            alignment: 'center',
                        },
                    },
                    pageBreakBefore: (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) => {
                        // Check if the current node is near the end of the page
                        return currentNode.y + currentNode.height > pageSize[1] - pageMargins[3];
                    },
                    defaultStyle: {
                        fontSize: 12,
                    },
                    footer: (currentPage, pageCount) => (
                        // {
                        //     text: `Página ${currentPage.toString()} de ${pageCount} ,Fecha: ${date.toString().slice(0, 10)}, Usuario: ${user.data["displayName"]}`,
                        //     style: 'footer',
                        //     margin: [0, 20],
                        // }
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


                for (let i = 0; i < data.length; i++) {
                    docDefinition.content.push(
                      
                        {
                            columns: [
                                { text: `Nombre Compañia: ${data[i].prov_NombreCompania}`},
                                { text: `Nombre Contacto: ${data[i].prov_NombreContacto}`},
                                { text: `Ciudad: ${data[i].ciud_Nombre}`},
                                { text: `Fecha Entrega: ${data[i].peor_FechaEntrada}`},
                            ],
                            margin: [0, 0, 0, 5],
                        },
                    )
                    
                    if(data[i].detalles){
                        docDefinition.content.push(
                            {
                                table: {
                                    widths: [25,"*","*","*"],
                                    body: [
                                            [                                        
                                            {text:'No.', style: 'tableHeader'},
                                            {text:'Material', style: 'tableHeader'},
                                            {text:'Cantidad', style: 'tableHeader'},
                                            {text:'Precio', style: 'tableHeader'}
                                        ],                                          
                             
                                        ],
                                    },
                            }
                        )

                        for (let j = 0; j < data[i].detalles.length; j++) {
                            docDefinition.content.push(
                                {
                                    table: {
                                        
                                        widths: [25,"*","*","*"],
                                        body: [
                                            [
                                                data[i].detalles[j]['key'], 
                                                data[i].detalles[j]['mate_Descripcion'], 
                                                data[i].detalles[j]['prod_Cantidad'], 
                                                data[i].detalles[j]['prod_Precio'], 
                                            ]
                                        ],
                                    },
                                },
                            )
                        }
                    }else{
                        docDefinition.content.push(
                            { text: `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`},
                        )
                    }

                    docDefinition.content.push(
                        {
                            canvas: [ 
                                {
                                    type: 'line',
                                    x1: 0, 
                                    y1: 0,
                                    x2: 515, 
                                    y2: 0,
                                    lineWidth: 10,
                                    lineColor: '#E1E1E1',
                                },
                            ],
                            margin: [0, 35, 0, 35],
                        },

                    );

                }



                const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.getDataUrl((dataUrl) => {
                const win = window.open();
                win.document.write(`<iframe src="${dataUrl}" width="100%" height="100%"></iframe>`);
                });
            };

            reader.readAsDataURL(blob);
        }catch (error) {
            console.error('Error:', error);
        }

      };
      

  return (
    <div>
      <Button
            onClick={generatePDFPreview}
            color="primary"
            startIcon={< FilePdfFilled/>}
          >
            Archivo PDF
          </Button>
    </div>
  );
};

export default PDFGenerator;
