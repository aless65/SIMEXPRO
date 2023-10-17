import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function FacturasExportacionService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/FacturasExportacion/";
    const baseURLdetalles = process.env.REACT_APP_API_URL + "api/FacturasExportaciondetalles/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const FacturasExportacionDetalle = axios.create({
        baseURL: baseURLdetalles,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

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


    async function ExportData() {
        try {
            const response = await axiosInstance.get("Listar");
            
            const data = response.data.data.map((item, i) => {
                const detallesJSON = JSON.parse(item.detalles)
                var detalles = null

                if (detallesJSON) {
                    detalles = detallesJSON.map((data, j) => {
                        return{

                            key: j+ 1,
                            faex_Id: data['faex_Id'],
                            tall_Codigo: data['tall_Codigo'],
                            code_Sexo: data['code_Sexo'],
                            colr_Nombre: data['colr_Nombre'],
                            fede_Cajas: data['fede_Cajas'],
                            fede_Cantidad: data['fede_Cantidad'],
                            fede_PrecioUnitario: data['fede_PrecioUnitario'],
                            fede_TotalDetalle: data['fede_TotalDetalle'],

                        }
                    })
                }
                    return{
                        key: i + 1,
                        faex_Id: item.faex_Id,
                        duca_No_Duca: item.duca_No_Duca,
                        faex_Fecha: item.faex_Fecha.toString().slice(0, 10),
                        orco_Id: item.orco_Id,
                        orco_Codigo: item.orco_Codigo,
                        clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,           
                        faex_Total: item.faex_Total,
                        detalles:  detalles
                    }
                },
            );
 
            var array = []
            for (let i = 0; i < data.length; i++) {
                if(data[i].detalles){

                    for (let j = 0; j < data[i].detalles.length; j++) {

                        if(data[i].faex_Id == data[i].detalles[j].faex_Id ){
                            array[i] += ` {No.: ${j +1}, Talla: ${data[i].detalles[j].tall_Codigo.trim()}, Sexo: ${data[i].detalles[j].code_Sexo}, Color: ${data[i].detalles[j].colr_Nombre}, Cajas: ${data[i].detalles[j].fede_Cajas}, Cant. Prendas doc.: ${data[i].detalles[j].fede_Cantidad}, Precio unitario: ${data[i].detalles[j].fede_PrecioUnitario}, Valor: HNL. ${data[i].detalles[j].fede_TotalDetalle}} `;
                        }

                    }

                }else{
                    array.push('');
                }                
                
                data[i].detalles = array[i].toString().replace('undefined', '');
            }
        
            const finalData = data.map((item) =>{
                return{
                    key: item.key,
                    duca_No_Duca: item.duca_No_Duca,
                    faex_Fecha: item.faex_Fecha,
                    orco_Codigo: item.orco_Codigo,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,           
                    faex_Total: item.faex_Total,
                    detalles:  item.detalles
                }
              })

            return finalData;
        } catch (error) {
        }
    };

    //Insertar Factura Exportacion (Encabezado)
    async function InsertarFacturasExportacion(data) {
        try {
            let datos = {
                duca_No_Duca: data["duca_No_Duca"] ? undefined : '',
                faex_Fecha: data["faex_Fecha"],
                orco_Id: data.orco_Id["value"],
                usua_UsuarioCreacion: user['uuid'],
                faex_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
        }
    }

    //Editar Factura Exportacion (Encabezado)
    async function EditarFacturasExportacion(data) {
        try {
            let datos = {
                faex_Id: data["faex_Id"],
                duca_No_Duca: data["duca_No_Duca"] == undefined ?  '' : data["duca_No_Duca"].toString().trim(),
                faex_Fecha: data["faex_Fecha"],
                orco_Id: data.orco_Id["value"],
                usua_UsuarioModificacion: user['uuid'],
                faex_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {

        }
    }

    //Eliminar Factura Exportacion
    async function EliminarFacturasExportacion(data) {
        try {
            let datos = {
                faex_Id: data,
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
        }
    }

    async function ListarFacturasExportacionDetalle(Id) {
        try {
            const response = await FacturasExportacionDetalle.get("Listar?faex_Id=" + Id);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    fede_Id: item.fede_Id,
                    code_Id: item.code_Id,
                    fede_Cajas: item.fede_Cajas,
                    fede_Cantidad: item.fede_Cantidad,
                    fede_PrecioUnitario: item.fede_PrecioUnitario,
                    fede_TotalDetalle: item.fede_TotalDetalle,
                    code_Descripcion: item.code_Descripcion,
                };
            });
            return data;
        } catch (error) {
        }
    }

    // Insertar Factura Exportacion Detalles (Items)
    async function InsertarFacturasExportacionDetalle(data) {
        try {
            let datos = {
                faex_Id: data["faex_Id"],
                code_Id: data.code_Id["value"],
                fede_Cajas: data["fede_Cajas"],
                fede_Cantidad: data["fede_Cantidad"],
                fede_PrecioUnitario: data['fede_PrecioUnitario'],
                fede_TotalDetalle: data['fede_TotalDetalle'],
                usua_UsuarioCreacion: user['uuid'],
                fede_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await FacturasExportacionDetalle.post("Insertar", datos);            
            return response;
        } catch (error) {
        }
    }

    async function EditarFacturasExportacionDetalle(data) {
        try {

            let datos = {
                fede_Id: data["fede_Id"],
                faex_Id: data["faex_Id"],
                code_Id: data.code_Id["value"],
                fede_Cajas: data["fede_Cajas"],
                fede_Cantidad: data["fede_Cantidad"],
                fede_PrecioUnitario: data['fede_PrecioUnitario'],
                fede_TotalDetalle: data['fede_TotalDetalle'],
                usua_UsuarioModificacion: user['uuid'],
                fede_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await FacturasExportacionDetalle.post("Editar", datos);
            return response;
        } catch (error) {
        }
    }

    async function EliminarFacturasExportaciondetalles(data) {
        try {
            let datos = {
                fede_Id: data,
            };
            const response = await FacturasExportacionDetalle.post("Eliminar", datos);
            return response;
        } catch (error) {
        }
    }


    async function FinalizarFacturasExportacion(data) {
        try {
            let datos = {
                faex_Id: data["faex_Id"],
            };
            const response = await axiosInstance.post("Finalizar", datos);
            return response;
        } catch (error) {
        }
    }

    async function OrdenesCompraDDL(){
        try{            
            const response = await axiosInstance.get("PODDL");
            const data = response.data.data.map((item, index) => {
                return{
                    value: item.orco_Id,
                    label: `${item.orco_Descripcion}`,
                }
            });
            return data;
        }
        catch (error) {
        }
    }

    async function PODetallesDDL(ID){
        try{      
            let datos = {
                faex_Id: ID,
            };     
            const response = await FacturasExportacionDetalle.post("PODetallesDDL", datos);
            const data = response.data.data.map((item, index) => {
                return{
                    value: item.code_Id,
                    label: `${item.code_Descripcion}`,
                }
            });
            return data;
        }
        catch (error) {
        }
    }

    async function DUCAsDDL(){
        try{            
            const response = await axiosInstance.get("DUCADDL");
            const data = response.data.data.map((item, index) => {
                return{
                    value: item.duca_No_Duca,
                    label: `${item.duca_No_Duca}`,
                }
            });
            return data;
        }
        catch (error) {
        }
    }

    async function  ComprobarNoDUCA(duca){
        try{
            let data = {
                duca_No_Duca: duca
            };
            const response = await axiosInstance.post("ComprobarNoDUCA", data);
            return response;
        }
        catch (error) {
        }
    }
    return {
        ListarFacturasExportacion,
        InsertarFacturasExportacion,
        EditarFacturasExportacion,
        EliminarFacturasExportacion,
        ListarFacturasExportacionDetalle,   
        InsertarFacturasExportacionDetalle,
        EditarFacturasExportacionDetalle,
        EliminarFacturasExportaciondetalles,
        FinalizarFacturasExportacion,
        OrdenesCompraDDL,
        PODetallesDDL,
        DUCAsDDL,
        ComprobarNoDUCA,
        ExportData,
        
    };

}


export default FacturasExportacionService;



