import Item from 'antd/es/list/Item';
import axios from 'axios';
import * as filestack from 'filestack-js';
import { toUpper } from 'lodash';
import instance from "src/app/auth/services/jwtService/jwtService";

function LineadeTiempoPOService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + 'api/OrdenCompra/';

    const baseURLProcesos = process.env.REACT_APP_API_URL + 'api/ProcesoPorOrdenCompraDetalle/';

    const baseURLDetalles = process.env.REACT_APP_API_URL + 'api/OrdenCompraDetalles/';

    const baseURLDocumentos = process.env.REACT_APP_API_URL + 'api/DocumentosOrdenCompraDetalles/';

    const baseURLMaterialesBrindar = process.env.REACT_APP_API_URL + 'api/MaterialesBrindar/';

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const axiosInstanceProcesos = axios.create({
        baseURL: baseURLProcesos,
        headers: customHeaders,
    });

    const axiosInstanceDetalles = axios.create({
        baseURL: baseURLDetalles,
        headers: customHeaders,
    });

    const axiosInstanceDocumentos = axios.create({  
        baseURL: baseURLDocumentos,           
        headers: customHeaders,             
    });

    const axiosInstanceMaterialesBrindar = axios.create({  
        baseURL: baseURLMaterialesBrindar,           
        headers: customHeaders,             
    });

    async function buscarEncabezado(codigo) {
        try {
            const response = await axiosInstance.get(`LineaTiempoOrdenCompra?orco_Codigo=${codigo}`);

            const data = response.data.data.map((item, index) => {

                return {
                    orco_Id: item.orco_Id,
                    orco_Codigo: item.orco_Codigo,
                    orco_IdCliente: item.orco_IdCliente,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    clie_Direccion: item.clie_Direccion,
                    clie_RTN: item.clie_RTN,
                    clie_Nombre_Contacto: item.clie_Nombre_Contacto,
                    clie_Correo_Electronico: item.clie_Correo_Electronico,
                    clie_FAX: item.clie_FAX,
                    orco_FechaEmision: item.orco_FechaEmision,
                    orco_FechaLimite: item.orco_FechaLimite,
                    orco_MetodoPago: item.orco_MetodoPago,
                    orco_Materiales: item.orco_Materiales,
                    orco_IdEmbalaje: item.orco_IdEmbalaje,
                    tiem_Descripcion: item.tiem_Descripcion,
                    orco_EstadoFinalizado: item.orco_EstadoFinalizado,
                    orco_EstadoOrdenCompra: item.orco_EstadoOrdenCompra,
                    orco_DireccionEntrega: item.orco_DireccionEntrega,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    orco_FechaCreacion: item.orco_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    orco_FechaModificacion: item.orco_FechaModificacion,
                    orco_Estado: item.orco_Estado,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function dibujarProcesos(codigo) {
        try {
            const response = await axiosInstanceProcesos.get(`DibujarProcesos?orco_Codigo=${codigo}`);

            const data = response.data.data.map((item, index) => {

                return {
                    proc_Id: item.proc_Id,
                    proc_Descripcion: item.proc_Descripcion,
                    proc_CodigoHTML: item.proc_CodigoHTML,
                };
            });

            return data;
        } catch (error) {
            
            
        }
    }

    async function dibujarDetalles(codigo) {
        try {
            const response = await axiosInstanceDetalles.get(`DibujarDetalles?orco_Codigo=${codigo}`);

            const data = response.data.data.map((item, index) => {
                
                return {
                    code_Id: item.code_Id,
                    orco_Codigo: item.orco_Codigo,
                    orco_Id: item.orco_Id,
                    code_CantidadPrenda: item.code_CantidadPrenda,
                    esti_Descripcion: item.esti_Descripcion,
                    tall_Nombre: item.tall_Nombre,
                    code_Sexo: item.code_Sexo,
                    colr_Nombre: item.colr_Nombre,
                    code_Unidad: item.code_Unidad,
                    code_Valor: item.code_Valor,
                    code_Impuesto: item.code_Impuesto,
                    code_EspecificacionEmbalaje: item.code_EspecificacionEmbalaje,
                    code_Descuento: item.code_Descuento,
                    proc_IdActual: item.proc_IdActual,
                    proc_Descripcion: item.proc_Descripcion,
                    code_FechaProcActual: new Date(item.code_FechaProcActual).toLocaleString()
                };
            });

            return data;
        } catch (error) {  
        }
    }

    async function ListarDocumentos(code_Id) {
        try {
            const response = await axiosInstanceDocumentos.get(`Listar?code_Id=${code_Id}`);
    
           
    
            const data = response.data.data.map((item, index) => {
                
                return {
                    key: index + 1,
                    dopo_Id: item.dopo_Id,
                    code_Id: item.code_Id,
                    dopo_NombreArchivo: item.dopo_NombreArchivo,
                    dopo_Archivo: item.dopo_Archivo,
                    dopo_TipoArchivo: item.dopo_TipoArchivo,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    dopo_FechaCreacion: item.dopo_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    dopo_FechaModificacion: item.dopo_FechaModificacion,
                    code_Estado: item.code_Estado
                };
               
            });
            return data;
        } catch (error) {
        }
    }

    async function ListarMaterialesBrindar(code_Id) {
        try {
            const response = await axiosInstanceMaterialesBrindar.get(`ListarFiltrado?code_Id=${code_Id}`); 
            const data = response.data.data.map((item, index) => {
                
                return {
                    key: index + 1,
                    mabr_Id: item.mabr_Id,
                    code_Id: item.code_Id,
                    code_CantidadPrenda: item.code_CantidadPrenda,
                    mate_Id: item.mate_Id,
                    mate_Descripcion: item.mate_Descripcion,
                    mabr_Cantidad: item.mabr_Cantidad,
                    unme_Id: item.unme_Id,
                    unme_Descripcion: item.unme_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    mabr_FechaCreacion: item.mabr_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    mabr_FechaModificacion: item.mabr_FechaModificacion,
                    mabr_Estado: item.mabr_Estado
                };
               
            });
            return data;
        } catch (error) {
        }
    }
    
    

    return {
        buscarEncabezado,
        dibujarProcesos,
        dibujarDetalles,
        ListarDocumentos,
        ListarMaterialesBrindar
    };
}

export default LineadeTiempoPOService;