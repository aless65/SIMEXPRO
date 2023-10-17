import FacturaService from '../components/FacturaService'

const facturaExportacionService = FacturaService();
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
});