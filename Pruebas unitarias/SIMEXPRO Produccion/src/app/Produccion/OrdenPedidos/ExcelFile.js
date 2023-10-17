import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';
import { FileExcelFilled } from '@ant-design/icons';

function ExportToExcel({ data }) {
  const exportToExcel = () => {
    const formattedData = data.map(item => [item.key, item.aran_Descripcion]); // Adjust fields accordingly

    const ws = XLSX.utils.aoa_to_sheet([['No.', 'Descripción'], ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'OrdenDePedido.xlsx');
  };

  return (
    <Button
      onClick={exportToExcel}
      color="primary"
      startIcon={< FileExcelFilled/>}
      >Archivo Excel </Button>
  );
}

export default ExportToExcel;
