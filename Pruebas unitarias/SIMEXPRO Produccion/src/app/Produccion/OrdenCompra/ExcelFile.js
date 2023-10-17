import { FileExcelFilled } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function ExportToExcel({ data, handleCloseExportar }) {
  const exportToExcel = () => {
    const formattedData = data.map(item => 
      [
        item.key,
        item.orco_Codigo,
        item.clie_Nombre_O_Razon_Social,
        item.orco_FechaEmision,
        item.orco_FechaLimite,
        item.detalles,
      ]
    );

    const ws = XLSX.utils.aoa_to_sheet(
      [
        [
          'No.',
          'Código de la P.O.',
          'Cliente',
          'Fecha emitido',
          'Fecha límite',
          'Items'
        ],
        ...formattedData
      ]
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'Ordenes_Compra.xlsx');
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
