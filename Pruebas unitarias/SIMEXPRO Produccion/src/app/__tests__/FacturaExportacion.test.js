import FacturaService from '../components/FacturaService'
import {ListadoFacturaExportacion} from '../components/FacturaExportacion';
// import FacturaExportacionIndex from '../components/FacturaExportacion'

const facturaExportacionService = FacturaService();
// const listadoFacturaExportacion = ListadoFacturaExportacion();
// const facturaExportacionControladores = FacturaExportacionIndex();


describe('Prueba unitaria al service de factura exportacion', () => {
    
    test('Deberia traer el listado correctamente', async () => {
        const response = await facturaExportacionService.ListarFacturasExportacion()
        console.log(response.length)
        const value = response.length > 0 ? true : false;
        expect(value).toBe(true);
    });

    test("Deberia insertar el encabezado de un factura correctamente", async () =>{
        let datos = {
            duca_No_Duca: undefined,
            faex_Fecha: "2023-10-17T17:05:10.965Z",
            orco_Id: 4,
            usua_UsuarioCreacion: 2,
            faex_FechaCreacion: "2023-10-17T17:05:10.965Z", 
        }

        const response = await facturaExportacionService.InsertarFacturasExportacion(datos);
        console.log(response.data.data.messageStatus);
        expect(response).not.toBeNull();
    });

    test("Error al insertar el encabezado de una factura (A proposito)", async () =>{
        let datos = {
            duca_No_Duca: undefined,
            faex_Fecha: "10-17-2023",
            orco_Id: 4,
            usua_UsuarioCreacion: 2,
            faex_FechaCreacion: "10-17-2023", 
        }

        const response = await facturaExportacionService.InsertarFacturasExportacion(datos);
        console.log(response.data.data.messageStatus);        
        expect(response).toBeNull();
    });

    test("Controlador de listar facturas trae los datos", async () => {
        const setCargandoData = jest.fn();
        const setDataTabla = jest.fn();
        
        await ListadoFacturaExportacion(setCargandoData, setDataTabla);
        
        // Verificar si setDataTabla obtuvo data
        expect(setDataTabla).toHaveBeenCalledWith(expect.any(Array));
        
        // Verificar si data.length es mayor que 1
        expect(setDataTabla.mock.calls[1].length).toBeGreaterThan(0);
    });
});