import { FileExcelFilled } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import { saveAs } from 'file-saver';
import React from 'react';
import * as XLSX from 'xlsx';

function ExportToExcel({ data, handleCloseExportar }) {
  const exportToExcel = () => {
    const formattedData = data.map(item => [item.key, item.foen_Codigo ,item.foen_Descripcion]); // Adjust fields accordingly

    const ws = XLSX.utils.aoa_to_sheet([['No.','Código de la forma de envío', 'Nombre de la forma de envío'], ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'Formas_Envio.xlsx');
  };

  return (
    <MenuItem
      onClick={() => {
        exportToExcel();
        handleCloseExportar();
      }}
      style={{ fontSize: "15px", marginTop: "5px", marginBottom: "5px" }}
    >
      <FileExcelFilled style={{ fontSize: "20px" }} />&nbsp;&nbsp;Archivo Excel
    </MenuItem>
  );
}

export default ExportToExcel;
