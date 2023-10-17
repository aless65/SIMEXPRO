import { FilePdfFilled } from '@ant-design/icons';
import { Icon } from '@material-ui/core';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import instance from "src/app/auth/services/jwtService/jwtService";

const ImprimirFactura = ({ data }) => {
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
                        { text: 'Factura para Exportación', style: 'header', margin: [0, 40, 0, 0] },
                        {
                            columns: [
                                {
                                    width: 'auto',
                                    type: 'none',
                                    ol: [

                                        { text: `Cliente: ${data.clie_Nombre_O_Razon_Social}`,  style: 'listMargin'},
                                        { text: `Dirección: ${data.clie_Direccion}`,  style: 'listMargin',},
                                        { text: `RTN: ${data.clie_RTN}`, style: 'listMargin'},
                                        { text: `Teléfono: ${data.clie_Numero_Contacto}`, style: 'listMargin'},
                                        { text: `Correo Electrónico: ${data.clie_Correo_Electronico}`, style: 'listMargin'},
                                        { text: `Fax: ${data.clie_FAX}`, style: 'listMargin'},

                                    ],
                                    alignment: 'left',
                                    margin: [0, 0, 0, 10],
                                },
                                {},
                                {
                                    type: 'none',
                                    ol: [
                                        { text: `Fecha: ${data.faex_Fecha}`, style: 'listMargin',},
                                        { text: `Factura N°: ${data.key}`, style: 'listMargin',},
                                        { text: `DUCA N°: ${data.duca_No_Duca}`, style: 'listMargin'},
                                        { text: `P.O N°: ${data.orco_Codigo}`, style: 'listMargin'},
                                    ],
                                    alignment: 'left',
                                    margin: [0, 0, 15, 10],
                                },
                            ],
                            margin: [0, 50, 0, 5],
                        },
                        {
                            canvas: [ 
                                {
                                    type: 'line',
                                    x1: 0, 
                                    y1: 0,
                                    x2: 515, 
                                    y2: 0,
                                    lineWidth: 3,
                                    lineColor: '#F0D05A',
                                },
                            ],
                            margin: [0, 10, 0, 35],
                        },
                    ],
                    styles: {
                        header: {
                            fontSize: 24,
                            bold: true,
                            color: 'black',
                            alignment: 'center',
                            underline: true,
                        },
                        subHeader: {
                            fontSize: 14,
                            bold: false,
                            color: 'black',
                            alignment: 'left',
                        },
                        listMargin: {
                            margin: [0, 0, 0, 12],
                        },
                        cellStyle: {
							border: [false, false, false, true],
							//fillColor: '#dddddd',
                        },
                        tableHeader: {
                            fontSize: 13,
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
                        // Check if the current node is near the end of the page
                        return currentNode.y + currentNode.height > pageSize[1] - pageMargins[3];
                    },
                    defaultStyle: {
                        fontSize: 11,
                    },
                    footer: (currentPage, pageCount) => (
                        {
                            columns: [
                                { text: `Usuario: ${user.data["displayName"]}`, style: 'footer'},
                                { text: `Página ${currentPage.toString()} de ${pageCount}`, style: 'footer'},
                                { text: `Fecha de impresión: ${date.toString().slice(0, 10)}`, style: 'footer'},
                            ],
                            margin: [0, 20],
                        }
                    ),
                };

                    
                if(data.detalles){
                    docDefinition.content.push(
                        {
                            table: {
                                widths: [50, 30, 35, 80, 35, 90, 50, 72],
                                body: [
                                        [
                                            {text: 'Ítem No.', style:'tableHeader'},
                                            {text: 'Talla', style:'tableHeader'},
                                            {text: 'Sexo', style:'tableHeader'},
                                            {text: 'Color', style:'tableHeader'},
                                            {text: 'Cajas', style:'tableHeader'},
                                            {text: 'Cant. Prendas doc.', style:'tableHeader'},
                                            {text: 'Precio Unidad', style:'tableHeader'},
                                            {text: 'Valor', style:'tableHeader'},
                                        ],
                                    ],
                                },
                        }
                    )

                    for (let j = 0; j < data.detalles.length; j++) {
                        docDefinition.content.push(
                            {                            
                                table: {
                                    widths: [50, 30, 35, 80, 35, 90, 50, 72],
                                    body: [
                                        [
                                            data.detalles[j]['key'], 
                                            data.detalles[j]['tall_Codigo'], 
                                            data.detalles[j]['code_Sexo'], 
                                            data.detalles[j]['colr_Nombre'], 
                                            data.detalles[j]['fede_Cajas'], 
                                            data.detalles[j]['fede_Cantidad'], 
                                            data.detalles[j]['fede_PrecioUnitario'], 
                                            `HNL ${data.detalles[j]['fede_TotalDetalle']}`,
                                            
                                        ],
                                    ],
                                },
                            },
                        )
                    }


                    docDefinition.content.push(
                        {
                            table:{
                                widths: [140],
                                body: [
                                    
                                    [{ text: `Gran Total: HNL ${data.faex_Total}`, alignment: 'left'},]
                                ],
                            },
                            margin:[365, 10, 0, 0],
                        }
                    );

                }else{
                    docDefinition.content.push(
                        { text: `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`},
                    )
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
        }}
        //style={{ fontSize: "15px", marginTop: "5px", marginBottom: "5px" }}
    >
        <Icon >picture_as_pdf</Icon>ㅤArchivo PDF
    </MenuItem>
    </div>
  );
};

export default ImprimirFactura;
