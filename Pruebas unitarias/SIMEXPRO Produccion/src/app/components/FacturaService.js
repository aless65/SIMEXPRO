import axios from "axios";

function FacturaService() {

    const customHeaders = {
        XApiKey: "4b567cb1c6b24b51ab55248f8e66e5cc",
    };

    const baseURL = "https://practicaacademia.somee.com/api/FacturasExportacion/";
    const baseURLdetalles = "https://practicaacademia.somee.com/api/FacturasExportaciondetalles/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const FacturasExportacionDetalle = axios.create({
        baseURL: baseURLdetalles,
        headers: customHeaders,
    });

    //Listado de Facturas Expoprtacion
    async function ListarFacturasExportacion() {
        try {
            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                
                const detallesJson = JSON.parse(item.detalles)
                let detalles = null

                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2 + 1,
                            fede_Id: datos['fede_Id'],
                            faex_Id: datos['faex_Id'],
                            code_Id: datos['code_Id'],
                            code_CantidadPrenda: datos['code_CantidadPrenda'],
                            tall_Codigo: datos['tall_Codigo'],
                            code_Sexo: datos['code_Sexo'],
                            colr_Nombre: datos['colr_Nombre'],
                            code_Unidad: datos['code_Unidad'],
                            code_Valor: datos['code_Valor'],
                            code_EspecificacionEmbalaje: datos['code_EspecificacionEmbalaje'],
                            fede_Cajas: datos['fede_Cajas'],
                            fede_Cantidad: datos['fede_Cantidad'],
                            fede_PrecioUnitario: datos['fede_PrecioUnitario'],
                            fede_TotalDetalle: datos['fede_TotalDetalle'],
                            code_Descripcion: datos['code_Descripcion']
                        }
                    })
                }     
                return {
                    key: index + 1,
                    faex_Id: item.faex_Id,
                    duca_No_Duca: item.duca_No_Duca ? item.duca_No_Duca :'N/A',
                    faex_Fecha: item.faex_Fecha.toString().slice(0, 10),
                    orco_Id: item.orco_Id,
                    orco_Descripcion: item.orco_Descripcion,
                    orco_Codigo: item.orco_Codigo,
                    faex_Total: item.faex_Total,
                    
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    clie_Direccion: item.clie_Direccion,
                    clie_Numero_Contacto: item.clie_Numero_Contacto,
                    clie_RTN: item.clie_RTN,
                    clie_Correo_Electronico: item.clie_Correo_Electronico,
                    clie_FAX: item.clie_FAX,

                    faex_Finalizado: item.faex_Finalizado,
                    faex_Estado: item.faex_Estado,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    faex_FechaCreacion: item.faex_FechaCreacion ,
                    
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    faex_FechaModificacion: item.faex_FechaModificacion,
                    
                    detalles: detalles,
                }
            });
            return data;
        } catch (error) {
        }
    };

    async function InsertarFacturasExportacion(data) {
        try {
            let datos = {
                duca_No_Duca: data["duca_No_Duca"] ? undefined : '',
                faex_Fecha: data["faex_Fecha"],
                orco_Id: data["orco_Id"],
                usua_UsuarioCreacion: data["usua_UsuarioCreacion"],
                faex_FechaCreacion: data["faex_FechaCreacion"],
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }
    
    async function InsertarFacturasExportacionDetalle(data) {
        try {
            let datos = {
                faex_Id: data["faex_Id"],
                code_Id: data["code_Id"],
                fede_Cajas: data["fede_Cajas"],
                fede_Cantidad: data["fede_Cantidad"],
                fede_PrecioUnitario: data['fede_PrecioUnitario'],
                fede_TotalDetalle: data['fede_TotalDetalle'],
                usua_UsuarioCreacion: data["usua_UsuarioCreacion"],
                fede_FechaCreacion: data["faex_FechaCreacion"],
            };
            const response = await FacturasExportacionDetalle.post("Insertar", datos);            
            return response;
        } catch (error) {
        }
    }

    return {
        ListarFacturasExportacion,
        InsertarFacturasExportacion,
        InsertarFacturasExportacionDetalle,
    };

}


export default FacturaService;



