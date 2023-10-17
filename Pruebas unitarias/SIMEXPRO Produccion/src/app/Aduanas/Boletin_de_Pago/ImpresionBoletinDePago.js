import {
  Button,
  Card,
  Grid,
  Icon,
  Stack
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import History from 'src/@history/@history';


function PDFDocument() {
  // creamos el documento PDF
  const doc = new jsPDF();
  const Navigate = useNavigate();
  const location = useLocation()
  const data = location.state;
  console.log('la datica', data)
  const [elBody, setElBody] = useState([])
  const [nombreaduana, setNombreAduana] = useState("undefined")

  useEffect(() => {
    const arreglo = []
    const nombretemp = `${data?.modelo?.aduana["codigo"]} - ${data?.modelo?.aduana["nombre"]}`
    //console.log('nombre temp', nombretemp)

    setNombreAduana(nombretemp)

    if (data?.modelo1?.lige_Id_Dai != "") {
      const dai = { europe: 'STD SERVICIO DE TRANSPORTE DE DATOS', asia: data?.modelo1.tipoObligacionStd ? data?.modelo1.tipoObligacionStd.label : '', america: data?.modelo1.cuentaPa01Std, nose1: data?.modelo1.totalPagarStd, oceania: ' - ' }
      arreglo.push(dai)
    }

    if (data?.modelo1?.lige_Id_Eco != "") {
      const eco = { europe: 'ECO ECOTASA', asia: data?.modelo1?.tipoObligacionEco ? data?.modelo1.tipoObligacionEco.label : '', america: data?.modelo1.cuentaPa01Eco, nose1: data?.modelo1.totalPagarEco, oceania: ' - ' }
      arreglo.push(eco)
    }

    if (data?.modelo1?.lige_Id_Isv != "") {
      const isv = { europe: 'ISV IMPUESTO SOBRE VENTAS', asia: data?.modelo1.tipoObligacionIsv ? data?.modelo1.tipoObligacionIsv.label : '', america: data?.modelo1.cuentaPa01Isv, nose1: data?.modelo1.totalPagarIsv, oceania: ' - ' }
      arreglo.push(isv)
    }

    if (data?.modelo1?.lige_Id_Procons != "") {
      const procons = { europe: 'PROCONS IMPUESTO SOBRE PRODUCCION Y CONSUMO', asia: data?.modelo1.tipoObligacionProcons ? data?.modelo1.tipoObligacionProcons.label : '', america: data?.modelo1.cuentaPa01Procons, nose1: data?.modelo1.totalPagarProcons, oceania: ' - ' }
      arreglo.push(procons)
    }

    if (data?.modelo1?.lige_Id_Sel != "") {
      const sel = { europe: 'SEL IMPUESTO SELECTIVO AL PRODUCTO', asia: data?.modelo1.tipoObligacionSel ? data?.modelo1.tipoObligacionSel.label : '', america: data?.modelo1.cuentaPa01Sel, nose1: data?.modelo1.totalPagarSel, oceania: ' - ' }
      arreglo.push(sel)
    }

    if (data?.modelo1?.lige_Id_Std != "") {
      const std = { europe: 'STD SERVICIO DE TRANSPORTE DE DATOS', asia: data?.modelo1.tipoObligacionStd ? data?.modelo1.tipoObligacionStd.label : '', america: data?.modelo1.cuentaPa01Std, nose1: data?.modelo1.totalPagarStd, oceania: ' - ' }
      arreglo.push(std)
    }

    console.log('arreglo de flores', arreglo)
    setElBody(arreglo)
  }, [])

  const header = function (data) {
    doc.setFont('arial');
    doc.setFontSize(15);
    const pageWidth = doc.internal.pageSize.width;
    doc.setTextColor(10);

    //Agregar Qr
    doc.addImage('https://i.ibb.co/bB5cgzk/Comprobante.jpg', 'JPG', pageWidth - 199, 10, 30, 30);

    //Agregar imagen
    doc.addImage('https://i.ibb.co/wB2jBvV/SIMEXPRO-V3-JPG.jpg', 'JPG', pageWidth - 41, 10, 30, 30);


    // Agregar texto
    doc.text("Administración Aduanera de Honduras", data.settings.margin.left + 50, 24);
    doc.text("Boletín de Pago", data.settings.margin.left + 76, 30);
    doc.text(nombreaduana, data.settings.margin.left + 60, 36);
    //doc.text(`${data?.modelo?.aduana["codigo"]} - ${data?.modelo?.aduana["nombre"]}`, data.settings.margin.left + 60, 36);
  };

  const footer = function (data) {
    const pageCount = doc.internal.getNumberOfPages();
    const currentPage = data.pageNumber;
    const pageWidth = doc.internal.pageSize.width;
    const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const text = `Documento generado por SIMEXPRO el ${date}`;
    const textWidth = doc.getTextWidth(text);
    const textX = (pageWidth * 1.3) - textWidth;
    doc.setFontSize(8);
    doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
    doc.text(text, textX, doc.internal.pageSize.height - 10);
  };

  //  doc.autoTableAddPage({
  //    addPageContent: header,
  //  });
  doc.setProperties({ title: `BoletinPago-${data?.modelo.boen_NDeclaracion}` })
  // añadimos contenido al PDF utilizando jspdf-autotable
  doc.autoTable({
    columnStyles: {
      europe: { halign: 'left', textColor: '#1a1a1a' },
      america: { halign: 'left', textColor: '#1a1a1a' },
      asia: { halign: 'left', textColor: '#1a1a1a' }
    }, // European countries centered
    body: [
      { europe: `Liquidación : ${data?.modelo.liqu_Id}`, asia: `Declaración No.   ${data?.modelo.boen_NDeclaracion}` },
      { europe: `Tipo de Liquidación : ${data?.modelo.tipl_Id ? data?.modelo.tipl_Id.label : ''}`, america: 'Mexico', asia: `Importador/Exportador: ${data?.modelo.RTN}` },
      { europe: `Fecha de Emisión : ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' })}   Estado: ${data?.modelo.Estado ? data?.modelo.Estado.label : ''}`, america: '', asia: `PreImpreso:  ${data?.modelo.boen_Preimpreso}` },
      { europe: `Observaciones: ${data?.modelo.Observaciones}`, america: 'Mexico', asia: `Declarante: ${data?.modelo.Declarante}` },
    ],
    columns: [
      { header: '', dataKey: 'europe' },
      { header: '', dataKey: 'asia' },
    ],
    styles: { overflow: 'linebreak', columnWidth: '100', font: 'verdana', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak' },
    startY: 55,
    theme: 'grid',
    // head: [['Id: ', 'Liquidación: ','Tipo de Liquidación: ']],
    // body: data.map((row) => [
    //   row.id,
    //   row.liquidacion,
    //   row.tipoliquidacion,
    //   new Date().toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}),
    // ]),


  })

  doc.autoTable({
    columnStyles: {
      europe: { halign: 'left', textColor: '#1a1a1a' },
      asia: { halign: 'left', textColor: '#1a1a1a' }
    }, // European countries centered
    body: [
      { europe: 'Boletín No. : 1565484561465', asia: 'Declaración No.   0261545664546' },
    ],
    columns: [
      { header: '', dataKey: 'europe' },
    ],
    styles: { overflow: 'linebreak', columnWidth: '20', font: 'calirbi', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak' },
    startY: 110,
    theme: 'grid',
  })

  doc.autoTable({
    columnStyles: {
      europe: { halign: 'left', cellWidth: 24, textColor: '#1a1a1a' },
      asia: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
      america: { halign: 'left', cellWidth: 40, textColor: '#1a1a1a' },
      nose1: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
      oceania: { halign: 'left', cellWidth: 45, textColor: '#1a1a1a' },
      antartida: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
      africa: { halign: 'left', cellWidth: 33, textColor: '#1a1a1a' },
      nose2: { halign: 'center', cellWidth: 9.8, textColor: '#1a1a1a' }
    }, // European countries centered
    body: [
      { europe: 'Periodo ', asia: '2', america: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric' }), nose1: '5', oceania: 'Código Impuesto', antartida: '18', africa: data?.modelo.coim_Id ? data?.modelo.coim_Id.label : '', nose2: '3' },
    ],
    columns: [
      { header: '', dataKey: 'europe' },
      { header: '', dataKey: 'asia' },
      { header: '', dataKey: 'america' },
      { header: '', dataKey: 'nose1' },
      { header: '', dataKey: 'oceania' },
      { header: '', dataKey: 'antartida' },
      { header: '', dataKey: 'africa' },
      { header: '', dataKey: 'nose2' },
    ],
    styles: { overflow: 'linebreak', columnWidth: '20', font: 'calirbi', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak' },
    startY: 120,
    theme: 'grid',
  })

  doc.autoTable({
    columnStyles: {
      europe: { halign: 'left', cellWidth: 24, textColor: '#1a1a1a' },
      asia: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
      america: { halign: 'left', cellWidth: 40, textColor: '#1a1a1a' },
      nose1: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
      oceania: { halign: 'left', cellWidth: 45, textColor: '#1a1a1a' },
      antartida: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
      africa: { halign: 'left', cellWidth: 33, textColor: '#1a1a1a' },
      nose2: { halign: 'center', cellWidth: 9.8, textColor: '#1a1a1a' }
    }, // European countries centered
    body: [
      { europe: 'R.T.N ', asia: '4', america: data?.modelo.RTN, nose1: '3', oceania: 'Código Concepto de pago', antartida: '19', africa: data?.modelo.copa_Id ? data?.modelo.copa_Id.label : '', nose2: '2' },
    ],
    columns: [
      { header: '', dataKey: 'europe' },
      { header: '', dataKey: 'asia' },
      { header: '', dataKey: 'america' },
      { header: '', dataKey: 'nose1' },
      { header: '', dataKey: 'oceania' },
      { header: '', dataKey: 'antartida' },
      { header: '', dataKey: 'africa' },
      { header: '', dataKey: 'nose2' },
    ],
    styles: { overflow: 'linebreak', columnWidth: 'wrap', font: 'arial', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak', colSpan: 2, rowSpan: 2, styles: { halign: 'center' }, 0: { columnWidth: '40' } },
    startY: 129,
    theme: 'grid',
  })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center', font: 'arial', textColor: '#1a1a1a' } }, // European countries centered
    body: [
      { europe: 'Detalles de Liquidación', asia: '' },
    ],
    columns: [
      { header: '', dataKey: 'europe' },
    ],
    styles: { overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak' },
    startY: 138,
    theme: 'grid',
  })

  doc.autoTable({
    columnStyles: {
      europe: { halign: 'center', cellWidth: 64, font: 'verdana', textColor: '#1a1a1a' },
      asia: { halign: 'center', cellWidth: 35, font: 'verdana', textColor: '#1a1a1a' },
      america: { halign: 'center', cellWidth: 28, font: 'verdana', textColor: '#1a1a1a' },
      nose1: { halign: 'center', cellWidth: 41, font: 'verdana', textColor: '#1a1a1a' },
      oceania: { halign: 'center', cellWidth: 13.8, font: 'verdana', textColor: '#1a1a1a' }
    }, // European countries centered
    body: [
      { europe: 'Concepto', asia: 'Tipo Oligación', america: 'Cuenta PA01', nose1: 'Total Pagar/Garantizar', oceania: ' - ' },
    ],
    columns: [
      { header: '', dataKey: 'europe' },
      { header: '', dataKey: 'asia' },
      { header: '', dataKey: 'america' },
      { header: '', dataKey: 'nose1' },
      { header: '', dataKey: 'oceania' },
    ],
    styles: { overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak' },
    startY: 148,
    theme: 'grid',
  })
  doc.autoTable({
    columnStyles: {
      europe: { halign: 'left', cellWidth: 64, font: 'verdana', textColor: '#1a1a1a' },
      asia: { halign: 'center', cellWidth: 35, font: 'verdana', textColor: '#1a1a1a' },
      america: { halign: 'center', cellWidth: 28, font: 'verdana', textColor: '#1a1a1a' },
      nose1: { halign: 'right', cellWidth: 41, font: 'verdana', textColor: '#1a1a1a' },
      oceania: { halign: 'center', cellWidth: 13.8, font: 'verdana', textColor: '#1a1a1a' },
    }, // European countries centered          
    // body: [
    //   { europe: 'ISV IMPUESTO SOBRE VENTAS', asia: data?.modelo1.tipoObligacionIsv ? data?.modelo1.tipoObligacionIsv.label : '', america: data?.modelo1.cuentaPa01Isv, nose1: data?.modelo1.totalPagarIsv, oceania: ' - ' },
    //   { europe: 'SEL IMPUESTO SELECTIVO AL PRODUCTO', asia: data?.modelo1.tipoObligacionSel ? data?.modelo1.tipoObligacionSel.label : '', america: data?.modelo1.cuentaPa01Sel, nose1: data?.modelo1.totalPagarSel, oceania: ' - ' },
    //   { europe: 'ECO ECOTASA', asia: data?.modelo1?.tipoObligacionEco ? data?.modelo1.tipoObligacionEco.label : '', america: data?.modelo1.cuentaPa01Eco, nose1: data?.modelo1.totalPagarEco, oceania: ' - ' },
    //   { europe: 'DAI DERECHOS ARANCELARIOS A LA IMPORTACION', asia: data?.modelo1.tipoObligacionDai ? data?.modelo1.tipoObligacionDai.label : '', america: data?.modelo1.cuentaPa01Dai, nose1: data?.modelo1.totalPagarDai, oceania: ' - ' },
    //   { europe: 'STD SERVICIO DE TRANSPORTE DE DATOS', asia: data?.modelo1.tipoObligacionStd ? data?.modelo1.tipoObligacionStd.label : '', america: data?.modelo1.cuentaPa01Std, nose1: data?.modelo1.totalPagarStd, oceania: ' - ' },
    //   { europe: 'PROCONS IMPUESTO SOBRE PRODUCCION Y CONSUMO', asia: data?.modelo1.tipoObligacionProcons ? data?.modelo1.tipoObligacionProcons.label : '', america: data?.modelo1.cuentaPa01Procons, nose1: data?.modelo1.totalPagarProcons, oceania: ' - ' },
    // ],
    body: elBody,
    columns: [
      { header: '', dataKey: 'europe' },
      { header: '', dataKey: 'asia' },
      { header: '', dataKey: 'america' },
      { header: '', dataKey: 'nose1' },
      { header: '', dataKey: 'oceania' },
    ],
    styles: { overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak' },
    startY: 158,
    theme: 'grid',
  })

  doc.autoTable({
    columnStyles: {
      europe: { halign: 'right', cellWidth: 127, font: 'verdana', textColor: '#1a1a1a' },
      asia: { halign: 'right', cellWidth: 41, font: 'verdana', fontStyle: 'bold' },
      america: { halign: 'center', cellWidth: 13.8, font: 'verdana', fontStyle: 'bold' }
    }, // European countries centered
    body: [
      { europe: 'Total a Pagar', asia: data?.modelo1.totalPagar ? data?.modelo1.totalPagar : '0.00', america: ' - ' },
      { europe: 'Total a Garantizar', asia: '0.00', america: ' - ' },
    ],
    columns: [
      { header: '', dataKey: 'europe' },
      { header: '', dataKey: 'asia' },
      { header: '', dataKey: 'america' },
    ],
    styles: { overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak' },
    // startY: 233.5,
    theme: 'grid',

    didDrawPage: function (data) {
      header(data);
      // agregamos la paginación
      footer(data);
    },
    margin: { top: 45, bottom: 30 }
  })


  // obtenemos una URL del PDF para mostrarlo en un iframe
  const pdfUrl = doc.output('dataurl');

  // mostramos el documento PDF en un iframe
  return (

    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <div style={{ height: '100vh', marginTop: '10px' }}>
        <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
      </div>
      <Grid item xs={12}>
        <div className="card-footer">
          <Button
            variant="contained"
            style={{ position: "fixed", top: "76%", right: "5%" }}
            onClick={() => { History.push('BoletinDePago/index') }}
            startIcon={<Icon>arrow_back</Icon>}
          >
            Regresar
          </Button>
          <br></br>
        </div>
      </Grid>
    </Card>
  );
}

export default PDFDocument;