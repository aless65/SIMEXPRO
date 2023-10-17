import { FilePdfFilled } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import instance from "src/app/auth/services/jwtService/jwtService";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDFGenerator = ({ data, handleCloseExportar }) => {
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
                        { text: 'Ordenes de Compra', style: 'header', margin: [0, 40, 0,20] },
                    ],
                    styles: {
                        header: {
                        fontSize: 18,
                        bold: true,
                        color: 'purple',
                        alignment: 'center',
                        },
                        footer: {
                        fontSize: 10,
                        alignment: 'center',
                        },
                    },                styles: {
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
                                { text: `Código de la P.O.: ${data[i].orco_Codigo}`},
                                { text: `Cliente: ${data[i].clie_Nombre_O_Razon_Social}`},
                            ],
                            margin: [0, 0, 0, 5],
                        },
                        {
                            columns: [
                                { text: `Fecha emitido: ${data[i].orco_FechaEmision}`},
                                { text: `Fecha límite: ${data[i].orco_FechaLimite}`},
                            ],
                            margin: [0, 0, 0, 5],
                        },
                    )
                    
                    if(data[i].detalles){
                        docDefinition.content.push(
                            {
                                table: {
                                    widths: [50, 90, 55, 80, 100, 85],
                                    body: [
                                            [
                                                {text: 'Ítem No.', style:'tableHeader'},
                                                {text: 'Código', style:'tableHeader'},
                                                {text: 'Cantidad prendas', style:'tableHeader'}, 
                                                {text: 'Estilo', style:'tableHeader'},
                                                {text: 'Talla', style:'tableHeader'},
                                                {text: 'Color', style:'tableHeader'},
                                            ],
                                        ],
                                    },
                            }
                        )

                        for (let j = 0; j < data[i].detalles.length; j++) {
                            docDefinition.content.push(
                                {
                                    table: {
                                        
                                        widths: [50, 90, 55, 80, 100, 85],
                                        body: [
                                            [
                                                data[i].detalles[j]['key'], 
                                                data[i].detalles[j]['code_Id'], 
                                                data[i].detalles[j]['code_CantidadPrenda'], 
                                                data[i].detalles[j]['esti_Descripcion'], 
                                                data[i].detalles[j]['tall_Nombre'], 
                                                data[i].detalles[j]['colr_Nombre'], 
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

export default PDFGenerator;
