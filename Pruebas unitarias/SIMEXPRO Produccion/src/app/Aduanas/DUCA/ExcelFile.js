import { FileExcelFilled } from '@ant-design/icons';
import { Button, MenuItem } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function ExportToExcel({ data, handleCloseExportar }) {
    const exportToExcel = () => {
        const formattedData = data.map(item => [item.key, item.duca_No_Duca, item.duca_No_Correlativo_Referencia, item.nombre_pais_procedencia, item.nombre_Aduana_Registro]); // Adjust fields accordingly

        const ws = XLSX.utils.aoa_to_sheet([['No.', 'No. de DUCA', 'No. correlativo o referencia', 'País de procedencia', 'Aduana de Registro'], ...formattedData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        saveAs(blob, 'Listado_de_DUCAS.xlsx');
    };

    return (
        <MenuItem
            onClick={() => { 
                exportToExcel();
                handleCloseExportar(); 
            }}
            style={{ fontSize: "15px", marginTop: "5px", marginBottom: "5px"}}
        >
            <FileExcelFilled style={{fontSize: "20px"}} />&nbsp;&nbsp;Archivo Excel
        </MenuItem>
    );
}

export default ExportToExcel;