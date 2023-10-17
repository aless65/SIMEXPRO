import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MenuItem } from '@mui/material';
import { FileExcelFilled } from '@ant-design/icons';

function ExportToExcel({ data, handleCloseExportar }) {
  const exportToExcel = () => {
    const formattedData = data.map(item => [item.key, item.empl_NombreCompleto, item.ppro_Estados, item.ppro_Observaciones, item.detalles]);

    const ws = XLSX.utils.aoa_to_sheet([['No.', 'Empleado solicitante', 'Estado del pedido', 'Observaciones', 'Ítems'], ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'Pedidos_De_Produccion.xlsx');
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
