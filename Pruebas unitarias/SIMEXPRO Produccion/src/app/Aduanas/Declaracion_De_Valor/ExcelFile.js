import { FileExcelFilled } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function ExportToExcel({ data, handleCloseExportar }) {
  const exportToExcel = () => {
    const formattedData = data.map(item => 
      [
        item.key, 
        item.deva_Id,
        item.adua_IngresoNombre, 
        item.adua_DespachoNombre,
        item.impo_Nombre_Raso, 
        item.prov_Nombre_Raso,
        item.inte_Nombre_Raso
      ]);

    const ws = XLSX.utils.aoa_to_sheet(
      [
        [
          'No.',
          'Código de la declaración de valor', 
          'Aduana de ingreso', 
          'Aduana de despacho',
          'Nombre del importador', 
          'Nombre del proveedor', 
          'Nombre del intermediario'
        ], 
        ...formattedData
      ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'Declaracion_Valor.xlsx');
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

export default ExportToExcel;