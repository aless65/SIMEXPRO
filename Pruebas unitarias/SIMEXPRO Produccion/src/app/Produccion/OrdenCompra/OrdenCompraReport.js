import axios from 'axios';
import * as filestack from 'filestack-js';
import { toUpper } from 'lodash';
import instance from "src/app/auth/services/jwtService/jwtService";
// import user from 'src/app/auth/services/jwtService/dataUser';

function OrdenCompraReportService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + 'api/OrdenCompra/';
    
    const baseURLDetalles = process.env.REACT_APP_API_URL + 'api/OrdenCompraDetalles/';

    const baseURLMateBrin = process.env.REACT_APP_API_URL + 'api/MaterialesBrindar/';

    const baseURLDocumentos = process.env.REACT_APP_API_URL + 'api/DocumentosOrdenCompraDetalles/';

    const baseURLProcesos = process.env.REACT_APP_API_URL + 'api/ProcesoPorOrdenCompraDetalle/';

    // this.baseURL         = 'https://localhost:44380/api/OrdenCompra/';
    // this.baseURLDetalles  = 'https://localhost:44380/api/OrdenCompraDetalles/';
    
    // this.baseURLMateBrin = 'https://localhost:44380/api/MaterialesBrindar/';

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const axiosInstanceDetalles = axios.create({  
        baseURL: baseURLDetalles,           
        headers: customHeaders,             
    });

    const axiosInstanceMateBrin = axios.create({  
        baseURL: baseURLMateBrin,           
        headers: customHeaders,             
    });

    const axiosInstanceDocumentos = axios.create({  
        baseURL: baseURLDocumentos,           
        headers: customHeaders,             
    });

    const axiosInstanceProcesos = axios.create({  
        baseURL: baseURLProcesos,           
        headers: customHeaders,             
    });

    const client = filestack.init('Abp6Y2MZNTla3VKwreDiez');
    const user = JSON.parse(localStorage.getItem('user'));

    async function listarEncabezado() {
        try {
            const response = await axiosInstance.get('Listar');
          
            const data = response.data.data.map((item, index) => {
                
                return {
                    key: index + 1,
                    orco_Id: item.orco_Id,
                    orco_IdCliente: item.orco_IdCliente,
                    orco_Codigo: item.orco_Codigo,
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
                    tiem_Descripcion:item.tiem_Descripcion,
                    orco_EstadoFinalizado : item.orco_EstadoFinalizado,
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

    async function ExportData(){
        try {
            const response = await axiosInstance.get('ExportData');

            const data = response.data.data.map((item, i) => {
                const detallesJSON = JSON.parse(item.detalles);
                var detalles = null;

                if (detallesJSON){
                    detalles = detallesJSON.map((data, j) => {
                        return{
                            key: j + 1,
                            code_Id: data['code_Id'],                            
                            orco_Id: data['orco_Id'],
                            code_CantidadPrenda: data['code_CantidadPrenda'],
                            esti_Descripcion: data['esti_Descripcion'],
                            tall_Nombre: data['tall_Nombre'],
                            code_Sexo: data['code_Sexo'],
                            colr_Nombre: data['colr_Nombre'],
                            code_Unidad: data['code_Unidad'],
                            code_Valor: data['code_Valor'],
                            code_Impuesto: data['code_Impuesto'],
                            code_EspecificacionEmbalaje: data['code_EspecificacionEmbalaje'],
                        }
                    })
                }
                return{
                    key: i + 1,
                    orco_Id: item.orco_Id,
                    orco_Codigo: item.orco_Codigo,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    clie_Numero_Contacto: item.clie_Numero_Contacto,
                    clie_Correo_Electronico: item.clie_Correo_Electronico,
                    orco_FechaEmision: item.orco_FechaEmision.toString().slice(0, 10),
                    orco_FechaLimite: item.orco_FechaLimite.toString().slice(0, 10),
                    orco_Materiales: item.orco_Materiales == true ? 'Si' : 'No',
                    fopa_Descripcion: item.fopa_Descripcion,
                    tiem_Descripcion: item.tiem_Descripcion,
                    orco_DireccionEntrega: item.orco_DireccionEntrega,
                    detalles: detalles,
                }
            }
            );
            var array = [];
            for (let i = 0; i < data.length; i++) {
                if(data[i].detalles){
                    for (let j = 0; j < data[i].detalles.length; j++) {
                        if(data[i].orco_Id == data[i].detalles[j].orco_Id){
                            array[i] += ` {No.: ${j +1}, Código ítem: ${data[i].detalles[j].code_Id}, Cantidad prendas: ${data[i].detalles[j].code_CantidadPrenda}, Estilo: ${data[i].detalles[j].esti_Descripcion}, Talla: ${data[i].detalles[j].tall_Nombre}, Color: ${data[i].detalles[j].colr_Nombre}} `;
                        }
                    }
                }else{
                    array.push('');
                }
                data[i].detalles = array[i].toString().replace('undefined', '');
            }

            const finalData = data.map((item) => {
                return{
                    key: item.key,
                    orco_Codigo: item.orco_Codigo,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    orco_FechaEmision: item.orco_FechaEmision,
                    orco_FechaLimite: item.orco_FechaLimite,
                    detalles: item.detalles
                }
            });
            return finalData;
        } catch (error) {
         
            
        }
    }
    
    async function PDFData(){
        try {
            const response = await axiosInstance.get('ExportData');

            const data = response.data.data.map((item, i) => {
                const detallesJSON = JSON.parse(item.detalles);
                var detalles = null;

                if (detallesJSON){
                    detalles = detallesJSON.map((data, j) => {
                        return{
                            key: j + 1,
                            code_Id: data['code_Id'],                            
                            orco_Id: data['orco_Id'],
                            code_CantidadPrenda: data['code_CantidadPrenda'],
                            esti_Descripcion: data['esti_Descripcion'],
                            tall_Nombre: data['tall_Nombre'],
                            code_Sexo: data['code_Sexo'],
                            colr_Nombre: data['colr_Nombre'],
                            code_Unidad: data['code_Unidad'],
                            code_Valor: data['code_Valor'],
                            code_Impuesto: data['code_Impuesto'],
                            code_EspecificacionEmbalaje: data['code_EspecificacionEmbalaje'],
                            code_CodigoDetalle: data['code_CodigoDetalle'],
                        }
                    })
                }
                return{
                    key: i + 1,
                    orco_Id: item.orco_Id,
                    orco_Codigo: item.orco_Codigo,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    clie_Numero_Contacto: item.clie_Numero_Contacto,
                    clie_Correo_Electronico: item.clie_Correo_Electronico,
                    orco_FechaEmision: item.orco_FechaEmision.toString().slice(0, 10),
                    orco_FechaLimite: item.orco_FechaLimite.toString().slice(0, 10),
                    orco_Materiales: item.orco_Materiales == true ? 'Si' : 'No',
                    fopa_Descripcion: item.fopa_Descripcion,
                    tiem_Descripcion: item.tiem_Descripcion,
                    orco_DireccionEntrega: item.orco_DireccionEntrega,
                    detalles: detalles,
                }
            }
            );
            return data;
        } catch (error) {
          
            
        }
    }
    

    async function OrdenCompraEncabezadoCrear(data,Materiales) {
        try {
         
            let datos = {
   
                    orco_Codigo: toUpper(data.Codigo) ,
                    orco_IdCliente: data.Cliente["value"],               
                    
                    orco_FechaEmision:   instance.formatFechaHora(data.FechaComenzar),
                    orco_FechaLimite:   instance.formatFechaHora(data.FechaLimite),
                   
                    orco_MetodoPago: data.TipoPago["value"],
                    
                    orco_Materiales: Materiales,
                 
                    orco_IdEmbalaje: data.Embalaje["value"],                 
                    orco_EstadoOrdenCompra: "P",
                    orco_DireccionEntrega: data.Direccion,
                    usua_UsuarioCreacion: user['uuid'],
                    orco_FechaCreacion: instance.formatFechaHora(new Date()),
                    
            }
         
          
            const response = await axiosInstance.post('Insertar',datos);
          
          
            return response;
        } catch (error) {
          
            
        }
    }

    async function OrdenCompraEncabezadoEditar(data,Materiales, ID) {
        try {
            let datos = {
   
                    orco_Id: ID,      
                    orco_IdCliente: data.Cliente["value"],               
                    
                    orco_FechaEmision:   instance.formatFechaHora(data.FechaComenzar),
                    orco_FechaLimite:   instance.formatFechaHora(data.FechaLimite),
                   
                    orco_MetodoPago: data.TipoPago["value"],
                    orco_Materiales: Materiales,
                    orco_IdEmbalaje: data.Embalaje["value"],                 
                    orco_EstadoOrdenCompra: "P",
                    orco_DireccionEntrega: data.Direccion,
                    usua_UsuarioModificacion: user['uuid'],
                    orco_FechaModificacion: instance.formatFechaHora(new Date()),
                    
            }
          
       

            const response = await axiosInstance.post('Editar',datos);
          
            return response;
        } catch (error) {
           
            
        }
    }

    async function OrdenCompraDetallesCrear(data, orco_Id) {
     
        try {   
            let datos = {
                               
                    orco_Id: parseInt(orco_Id) ,                
                    code_CantidadPrenda: parseInt(data.Cantidad),       
                    esti_Id: data.Estilo["value"],              
                    tall_Id: data.Talla["value"],               
                    code_Sexo: data.Sexo,                  
                    colr_Id: data.Color["value"],      
                   
                   
                    proc_IdComienza: data.Procesos[0].value,               
                    proc_IdActual: data.Procesos[0].value,
                    code_FechaProcActual : instance.formatFechaHora(new Date()),                  
                  
                    code_Unidad: parseFloat(data.PrecioU),               
                    code_Valor: parseFloat(data.PrecioU) * parseInt(data.Cantidad),               
                    code_Impuesto: parseFloat(data.Impuesto),       
                    code_EspecificacionEmbalaje: data.EmbalajeEspecificacion,          
                    usua_UsuarioCreacion: user['uuid'],              
                    code_FechaCreacion: instance.formatFechaHora(new Date()),                
            }
           
            const response = await axiosInstanceDetalles.post('Insertar',datos);
          
            
            return response;
        } catch (error) {
           
            
        }
    }

    async function OrdenCompraDetallesEditar(data, orco_Id, OrdenCompraDetalleID) {          
        try {
            let datos = {
                    code_Id: OrdenCompraDetalleID, 
                    orco_Id: orco_Id,                                
                    code_CantidadPrenda: parseInt(data.Cantidad),       
                    esti_Id: data.Estilo["value"],              
                    tall_Id: data.Talla["value"],               
                    code_Sexo: data.Sexo,                  
                    colr_Id: data.Color["value"],                
                   
                    proc_IdComienza: data.Procesos[0].value,             
                    proc_IdActual: data.Procesos[0].value,                
                  
                    code_Unidad: parseFloat(data.PrecioU),             
                    code_Valor: parseFloat(data.PrecioU) * parseInt(data.Cantidad),               
                    code_Impuesto: data.Impuesto,       
                    code_EspecificacionEmbalaje: data.EmbalajeEspecificacion,          
                    usua_UsuarioModificacion: user['uuid'],              
                    code_FechaModificacion: instance.formatFechaHora(new Date()),                
            }    
                
            const response = await axiosInstanceDetalles.post('Editar',datos);  
                
            return response;
        } catch (error) {
           
            
        }
    }

    async function OrdenCompraDetallesEliminar(code_Id) {
        try {
            let datos = {             
                code_Id: code_Id,                                                                                                                
            }      
            const response = await axiosInstanceDetalles.post('Eliminar',datos);
           
            return response;
        } catch (error) {
           
            
        }
    }

    async function EliminarProcesos(code_Id) {
        try {
            let datos = {             
                code_Id: code_Id,                                                                                                                
            }      
            const response = await axiosInstanceProcesos.post('Eliminar',datos);
            return response;
        } catch (error) {
          
            
        }
    }

    async function EliminarOrdenCompra(orco_Id) {
        try {
            let datos = {             
                orco_Id: orco_Id,                                                                                                                
            }      
            const response = await axiosInstance.post('Eliminar',datos);
            
            return response;
        } catch (error) {
           
            
        }
    }

    async function FinalizarOrdenCompra(orco_Id) {
        try {
            let datos = {             
                orco_Id: orco_Id,                                                                                                                
            }      
            const response = await axiosInstance.post('FinalizarOrdenCompra',datos);
         
            return response;
        } catch (error) {
        
            
        }
    }


    
   

    async function listarEncabezadoFiltrado(filtroOrcoId) {
        try {
            const response = await axiosInstance.get('Listar');
          
            
            const filteredData = response.data.data.filter(item => item.orco_Id === filtroOrcoId);
            
            const data = filteredData.map((item, index) => {
                return {
                    key: index + 1,
                    orco_Id: item.orco_Id,
                    orco_IdCliente: item.orco_IdCliente,
                    orco_Codigo: item.orco_Codigo,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    clie_Direccion: item.clie_Direccion,
                    clie_RTN: item.clie_RTN,
                    clie_Nombre_Contacto: item.clie_Nombre_Contacto,
                    clie_Correo_Electronico: item.clie_Correo_Electronico,
                    clie_FAX: item.clie_FAX,
                    orco_FechaEmision: new Date(item.orco_FechaEmision).toLocaleString(),
                    orco_FechaLimite: new Date(item.orco_FechaLimite).toLocaleString(),
                    orco_MetodoPago: item.orco_MetodoPago,
                    orco_Materiales: item.orco_Materiales,
                    orco_IdEmbalaje: item.orco_IdEmbalaje,
                    tiem_Descripcion:item.tiem_Descripcion,
                    orco_EstadoOrdenCompra: item.orco_EstadoOrdenCompra,
                    orco_DireccionEntrega: item.orco_DireccionEntrega,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    orco_FechaCreacion: item.orco_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    orco_FechaModificacion: item.orco_FechaModificacion,
                    orco_Estado: item.orco_Estado,
                    fopa_Descripcion: item.fopa_Descripcion,
                    usuarioActual: user.data['displayName'],
                    fechaActual: new Date().toLocaleString(),
                };
            });
           
            return data;
        } catch (error) {
           
            
        }
    }

    async function listarDetalles(orco_Id) {
        try {
            const response = await axiosInstanceDetalles.get('Listar', {
                params: {
                    orco_Id: orco_Id
                }
            });
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    code_Id: item.code_Id,
                    orco_Id: item.orco_Id,
                    code_CantidadPrenda: item.code_CantidadPrenda,
                    esti_Id: item.esti_Id,
                    esti_Descripcion: item.esti_Descripcion,
                    tall_Id: item.tall_Id,
                    tall_Nombre: item.tall_Nombre,
                   

                    code_Sexo: item.code_Sexo,
                    colr_Id: item.colr_Id,
                    colr_Nombre: item.colr_Nombre,
                    code_Documento: item.code_Documento,
                    code_Medidas: item.code_Medidas,
                    proc_IdComienza: item.proc_IdComienza,
                    proc_DescripcionComienza: item.proc_DescripcionComienza,
                    proc_IdActual: item.proc_IdActual,
                    proc_DescripcionActual: item.proc_DescripcionActual,
                    code_Unidad: item.code_Unidad,
                    code_Valor: item.code_Valor,
                    code_Impuesto: item.code_Impuesto,
                    code_Descuento: item.code_Descuento,
                    code_EspecificacionEmbalaje: item.code_EspecificacionEmbalaje,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    code_FechaCreacion: item.code_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    code_FechaModificacion: item.code_FechaModificacion,
                    code_Estado: item.code_Estado
                };
            });         
           
            return data;
        } catch (error) {
           
            
        }
    }

    async function listarMaterialesBrindados(code_Id) {
        try {
            const response = await axiosInstanceMateBrin.get('ListarFiltrado', {
                params: {
                    code_Id: code_Id
                }
            });       
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
                    mabr_Estado: item.mabr_Estado,
                   
                };
            });  
            return data;
        } catch (error) {
         
            
        }
    }

    async function MaterialesBrindadosCrear(data, code_Id) {
        try {
            let datos = {
                               
                    code_Id: code_Id,                
                    mabr_Cantidad: data.CantidadM,       
                    mate_Id: data.Material["value"],              
                    unme_Id: data.UnidadMedida["value"],                 
                    usua_UsuarioCreacion: user['uuid'],              
                    mabr_FechaCreacion: instance.formatFechaHora(new Date()),                
            }
            const response = await axiosInstanceMateBrin.post('Insertar',datos);
            return response;
        } catch (error) {
          
            
        }
    }

    async function MaterialesBrindadosEditar(data, mabr_Id,code_Id) {
        try {
            let datos = {          
                    mabr_Id: mabr_Id, 
                    code_Id: code_Id,                
                    mabr_Cantidad: data.CantidadM,       
                    mate_Id: data.Material["value"],              
                    unme_Id: data.UnidadMedida["value"],                                   
                    usua_UsuarioModificacion: user['uuid'],              
                    mabr_FechaModificacion: instance.formatFechaHora(new Date()),                
            }        
            const response = await axiosInstanceMateBrin.post('Editar',datos);      
            return response;
        } catch (error) {
         
            
        }
    }

    async function MaterialesBrindadosEliminar(MateriaId) {
        try {
            let datos = {         
                mabr_Id: MateriaId,            
            }         
            const response = await axiosInstanceMateBrin.post('Eliminar',datos);       
            return response;
        } catch (error) {
           
            
        }
    }

    async function ListarDocumentos(code_Id) {
       
        try {
            const response = await axiosInstanceDocumentos.get('Listar', {
                params: {
                    code_Id: code_Id
                }
            });
      
            
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    dopo_Id: item.dopo_Id,
                    code_Id: item.code_Id,
                    dopo_NombreArchivo : item.dopo_NombreArchivo,
                    dopo_Archivo: item.dopo_Archivo,
                    dopo_TipoArchivo: item.dopo_TipoArchivo,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    dopo_FechaCreacion: item.dopo_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    dopo_FechaModificacion: item.dopo_FechaModificacion,
                    code_Estado: item.code_Estado,
                   
                   
                };
            });
            
            return data;
        } catch (error) {
            
        }
    }  

    async function ListarProcesosPorDetalle(code_Id) {
       
        try {
            const response = await axiosInstanceProcesos.get('Listar', {
                params: {
                    code_Id: code_Id
                }
            });
      
            
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    poco_Id: item.poco_Id,
                    code_Id: item.code_Id,
                    proc_Id: item.proc_Id,
                    proc_Descripcion: item.proc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    poco_FechaCreacion: item.poco_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
    
                    poco_FechaModificacion: item.poco_FechaModificacion,
                    code_Estado: item.code_Estado,
                   
                   
                };
            });
          
            return data;
        } catch (error) {
       
            
        }
    }  

    async function ListarDetallesTabla(orco_Id) {
       
        try {
            const response = await axiosInstanceDetalles.get('Listar', {
                params: {
                    orco_Id: orco_Id
                }
            });
      
            
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    code_Id: item.code_Id,
                    orco_Id: item.orco_Id,
                    code_CantidadPrenda: item.code_CantidadPrenda,
                    esti_Id: item.esti_Id,
                    esti_Descripcion: item.esti_Descripcion,
                    tall_Id: item.tall_Id,
                    tall_Nombre: item.tall_Nombre,
                   

                    code_Sexo: item.code_Sexo,
                    colr_Id: item.colr_Id,
                    colr_Nombre: item.colr_Nombre,
                    code_Documento: item.code_Documento,
                    code_Medidas: item.code_Medidas,
                    proc_IdComienza: item.proc_IdComienza,
                    proc_DescripcionComienza: item.proc_DescripcionComienza,
                    proc_IdActual: item.proc_IdActual,
                    proc_DescripcionActual: item.proc_DescripcionActual,
                    code_Unidad: item.code_Unidad,
                    code_Valor: item.code_Valor,
                    code_Impuesto: item.code_Impuesto,
                    code_Descuento: item.code_Descuento,
                    code_EspecificacionEmbalaje: item.code_EspecificacionEmbalaje,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    code_FechaCreacion: item.code_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    code_FechaModificacion: item.code_FechaModificacion,
                    code_Estado: item.code_Estado
                   
                   
                };
            });

             
          
            return data;
        } catch (error) {
         
            
        }
    }  

  

    async function SubidaArchivos(file) {
        try {   
         
             const data = await client.upload(file);
             const url = data.url;
           
         
          return  url
        } catch (error) {
           
            
        }
    }

    async function VerificacionCodigo(Codigo) {
        
        try {
            const response = await axiosInstance.get('Listar');
          
            const filteredData = response.data.data.filter(item => item.orco_Codigo === Codigo);
            
            const data = filteredData.map((item, index) => {
                return {
                    key: index + 1,
                    orco_Id: item.orco_Id,
                    orco_IdCliente: item.orco_IdCliente,
                    orco_Codigo: item.orco_Codigo,
                    clie_Nombre_O_Razon_Social: item.clie_Nombre_O_Razon_Social,
                    clie_Direccion: item.clie_Direccion,
                    clie_RTN: item.clie_RTN,
                    clie_Nombre_Contacto: item.clie_Nombre_Contacto,
                    clie_Correo_Electronico: item.clie_Correo_Electronico,
                    clie_FAX: item.clie_FAX,
                    orco_FechaEmision: new Date(item.orco_FechaEmision).toLocaleString(),
                    orco_FechaLimite: new Date(item.orco_FechaLimite).toLocaleString(),
                    orco_MetodoPago: item.orco_MetodoPago,
                    orco_Materiales: item.orco_Materiales,
                    orco_IdEmbalaje: item.orco_IdEmbalaje,
                    tiem_Descripcion:item.tiem_Descripcion,
                    orco_EstadoOrdenCompra: item.orco_EstadoOrdenCompra,
                    orco_DireccionEntrega: item.orco_DireccionEntrega,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    orco_FechaCreacion: item.orco_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    orco_FechaModificacion: item.orco_FechaModificacion,
                    orco_Estado: item.orco_Estado,
                    fopa_Descripcion: item.fopa_Descripcion,
                    usuarioActual: user.data['displayName'],
                    fechaActual: new Date().toLocaleString(),
                };
            });
       
            var Existe = 0;

            data.forEach(element => {
                
             
                if (element.orco_Id != undefined) {
                    Existe = 1
                } 

            });
           
                    
                return Existe

           
        } catch (error) {
        
            
        }
    }

    async function listarDetallesReporte(orco_Id) {
        try {
            const response = await axiosInstanceDetalles.get('Listar', {
                params: {
                    orco_Id: orco_Id
                }
            });

            const dataDetalle = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    code_Id: item.code_Id,
                    orco_Id: item.orco_Id,
                    code_CantidadPrenda: item.code_CantidadPrenda,
                    esti_Id: item.esti_Id,
                    esti_Descripcion: item.esti_Descripcion,
                    tall_Id: item.tall_Id,
                    tall_Nombre: item.tall_Nombre,
                 

                    code_Sexo: item.code_Sexo,
                    colr_Id: item.colr_Id,
                    colr_Nombre: item.colr_Nombre,
                    code_Documento: item.code_Documento,
                    code_Medidas: item.code_Medidas,
                    proc_IdComienza: item.proc_IdComienza,
                    proc_DescripcionComienza: item.proc_DescripcionComienza,
                    proc_IdActual: item.proc_IdActual,
                    proc_DescripcionActual: item.proc_DescripcionActual,
                    code_Unidad: item.code_Unidad,
                    code_Valor: item.code_Valor,
                    code_Impuesto: item.code_Impuesto,
                    code_Descuento: item.code_Descuento,
                    code_EspecificacionEmbalaje: item.code_EspecificacionEmbalaje,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    code_FechaCreacion: item.code_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    code_FechaModificacion: item.code_FechaModificacion,
                    code_Estado: item.code_Estado
                };
            });    

            const Materiales = []
            dataDetalle.forEach (element => {      
                Materiales.push(listarMaterialesBrindados(element.code_Id))
            })   
            const materialData = await Promise.all(Materiales);

            const Documentos = []
            dataDetalle.forEach (element => {      
                Documentos.push(ListarDocumentos(element.code_Id))
            })   
            const DocumentosData = await Promise.all(Documentos);

            const Procesos = []
            dataDetalle.forEach (element => {      
                Procesos.push(ListarProcesosPorDetalle(element.code_Id))
            })   
            const ProcesosData = await Promise.all(Procesos);

            
            return {dataDetalle,materialData,DocumentosData,ProcesosData};          
        } catch (error) {
           
            
        }
    }
   
   
    async function OrdenCompraDetallesDocumentosCrear(Nombre, Link, Tipo,OrdenCompraDetalleID) {
        try {
            let datos = {
                               
                    code_Id: OrdenCompraDetalleID,
                    
                    dopo_NombreArchivo : Nombre,

                    dopo_Archivo: Link,
                   
                    dopo_TipoArchivo: Tipo,
                                                    
                    usua_UsuarioCreacion: user['uuid'],
                   
                    dopo_FechaCreacion: instance.formatFechaHora(new Date()),
                                     
            }
            console.log(datos)
        
          
            const response = await axiosInstanceDocumentos.post('Insertar',datos);
            console.log(response)
            return response;
        } catch (error) {
          
            
        }
    }

    async function OrdenCompraDetallesDocumentosEliminar(dopo_Id) {
        try {
            let datos = {                        
                dopo_Id: dopo_Id,                    
            }
            const response = await axiosInstanceDocumentos.post('Eliminar',datos);
            return response;
        } catch (error) {
         
            
        }
    }

    async function InsertarProcesosOrdenCompraDetalle(ID, CompraDetalleID) {  
        try {          
           let datos = {
               code_Id: CompraDetalleID ,
               proc_Id: ID,
               usua_UsuarioCreacion: user['uuid'],
               poco_FechaCreacion: instance.formatFechaHora(new Date()),
           }; 
           const response = await axiosInstanceProcesos.post('Insertar',datos);       
           return response;
       } catch (error) {
          
           
       }
   }

  

    return {
        listarEncabezado,
        OrdenCompraEncabezadoCrear,
        OrdenCompraEncabezadoEditar,
        EliminarOrdenCompra,
        
        OrdenCompraDetallesCrear,
        OrdenCompraDetallesEditar,
        OrdenCompraDetallesEliminar,
        
        MaterialesBrindadosCrear,
        MaterialesBrindadosEditar,
        MaterialesBrindadosEliminar,
        
        OrdenCompraDetallesDocumentosEliminar,
        OrdenCompraDetallesDocumentosCrear,
       
        SubidaArchivos,
        EliminarProcesos,
        EliminarOrdenCompra,
       
        InsertarProcesosOrdenCompraDetalle,
        listarEncabezadoFiltrado,
        listarDetalles,
        listarMaterialesBrindados,
        ListarDocumentos,
        ListarProcesosPorDetalle,
        listarDetallesReporte,
        ListarDetallesTabla,

        FinalizarOrdenCompra,

        VerificacionCodigo,
        ExportData,
        PDFData,
       
    };
}

// const usuarioservice = new UsuariosService();
export default OrdenCompraReportService;