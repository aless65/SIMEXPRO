import FacturaService from '../components/FacturaService'

const FacturaExportacionService = FacturaService();
// Extract this function from your component
const ListadoFacturaExportacion = async (setDataTabla, setCargandoData) => {
    try {
      setCargandoData([]);
      setDataTabla([]);
  
      const data = await FacturaExportacionService.ListarFacturasExportacion();
  
      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
    } catch (error) {
      setCargandoData(null);
    }
  };
  
  export { ListadoFacturaExportacion };