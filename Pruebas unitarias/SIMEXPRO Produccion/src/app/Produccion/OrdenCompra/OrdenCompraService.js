import axios from 'axios';
import * as filestack from 'filestack-js';
import instance from "src/app/auth/services/jwtService/jwtService";

const client = filestack.init('Abp6Y2MZNTla3VKwreDiez');

class OrdenCompraService {
    constructor() {
        this.customHeaders = {
            XApiKey: '4b567cb1c6b24b51ab55248f8e66e5cc',
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/OrdenCompra/';
    
        this.baseURLDetalles = process.env.REACT_APP_API_URL + 'api/OrdenCompraDetalles/';

        this.baseURLMateBrin = process.env.REACT_APP_API_URL + 'api/MaterialesBrindar/';

        this.baseURLDocumentos = process.env.REACT_APP_API_URL + 'api/DocumentosOrdenCompraDetalles/';

        this.baseURLProcesos = process.env.REACT_APP_API_URL + 'api/ProcesoPorOrdenCompraDetalle/';
    
        // this.baseURL         = 'https://localhost:44380/api/OrdenCompra/';
        // this.baseURLDetalles  = 'https://localhost:44380/api/OrdenCompraDetalles/';
        
        // this.baseURLMateBrin = 'https://localhost:44380/api/MaterialesBrindar/';
       
    
    

        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
    
        this.axiosInstanceDetalles = axios.create({  
            baseURL: this.baseURLDetalles,           
            headers: this.customHeaders,             
        });

        this.axiosInstanceMateBrin = axios.create({  
            baseURL: this.baseURLMateBrin,           
            headers: this.customHeaders,             
        });

        this.axiosInstanceDocumentos = axios.create({  
            baseURL: this.baseURLDocumentos,           
            headers: this.customHeaders,             
        });

        this.axiosInstanceProcesos = axios.create({  
            baseURL: this.baseURLProcesos,           
            headers: this.customHeaders,             
        });
    
    
        this.user = JSON.parse(localStorage.getItem('user'))
    }
    

  //----------------------------------------------------------------------------------------------------- 
    async listarEncabezado() {
        try {
            const response = await this.axiosInstance.get('Listar');
          
            const data = response.data.data.map((item, index) => {
                
                return {
                    key: index + 1,
                    orco_Id: item.orco_Id,
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
                    tiem_Descripcion:item.tiem_Descripcion,
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

    async listarEncabezadoFiltrado(filtroOrcoId) {
        try {
            const response = await this.axiosInstance.get('Listar');
          
            const filteredData = response.data.data.filter(item => item.orco_Id === filtroOrcoId);
            
            const data = filteredData.map((item, index) => {
                return {
                    key: index + 1,
                    orco_Id: item.orco_Id,
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
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }
    

    async OrdenCompraEncabezadoCrear(data,Materiales) {
        try {
            let datos = {
   
                   
                    orco_IdCliente: data.Cliente["value"],               
                    
                    orco_FechaEmision:   instance.formatFechaHora(data.FechaComenzar),
                    orco_FechaLimite:   instance.formatFechaHora(data.FechaLimite),
                   
                    orco_MetodoPago: data.TipoPago["value"],
                    
                    orco_Materiales: Materiales,
                 
                    orco_IdEmbalaje: data.Embalaje["value"],                 
                    orco_EstadoOrdenCompra: "P",
                    orco_DireccionEntrega: data.Direccion,
                    usua_UsuarioCreacion: this.user['uuid'],
                    orco_FechaCreacion: instance.formatFechaHora(new Date()),
                    
            }
            
          
            const response = await this.axiosInstance.post('Insertar',datos);
          

            return response;
        } catch (error) {
            
            
        }
    }

    async OrdenCompraEncabezadoEditar(data,Materiales, ID) {
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
                    usua_UsuarioModificacion: this.user['uuid'],
                    orco_FechaModificacion: instance.formatFechaHora(new Date()),
                    
            }
       

            const response = await this.axiosInstance.post('Editar',datos);
          
            return response;
        } catch (error) {
            
            
        }
    }

//----------------------------------------------------------------------------------------------------
    async listarDetalles(orco_Id) {
        try {
            const response = await this.axiosInstanceDetalles.get('Listar', {
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
   

    async OrdenCompraDetallesCrear(data, orco_Id) {

        
        
        try {
            let datos = {
                               
                    orco_Id: orco_Id,                
                    code_CantidadPrenda: data.Cantidad,       
                    esti_Id: data.Estilo["value"],              
                    tall_Id: data.Talla["value"],               
                    code_Sexo: data.Sexo,                  
                    colr_Id: data.Color["value"],                
                   
                    proc_IdComienza: data.Procesos[0].value,               
                    proc_IdActual: data.Procesos[0].value,                  
                  
                    code_Unidad: data.PrecioU,               
                    code_Valor: (data.PrecioU * data.Cantidad),               
                    code_Impuesto: data.Impuesto,       
                    code_EspecificacionEmbalaje: data.EmbalajeEspecificacion,          
                    usua_UsuarioCreacion: this.user['uuid'],              
                    code_FechaCreacion: instance.formatFechaHora(new Date()),                
            }
           
           
            const response = await this.axiosInstanceDetalles.post('Insertar',datos);
            
           
           
            return response;
        } catch (error) {
            
            
        }
    }

    async OrdenCompraDetallesEditar(data, orco_Id, OrdenCompraDetalleID) {
       
        
        try {
            let datos = {
                   
                    code_Id: OrdenCompraDetalleID, 
                    orco_Id: orco_Id,                                
                    code_CantidadPrenda: data.Cantidad,       
                    esti_Id: data.Estilo["value"],              
                    tall_Id: data.Talla["value"],               
                    code_Sexo: data.Sexo,                  
                    colr_Id: data.Color["value"],                
                   
                    proc_IdComienza: data.Procesos[0].value,             
                    proc_IdActual: data.Procesos[0].value,                
                  
                    code_Unidad: data.PrecioU,               
                    code_Valor: (data.PrecioU * data.Cantidad),               
                    code_Impuesto: data.Impuesto,       
                    code_EspecificacionEmbalaje: data.EmbalajeEspecificacion,          
                    usua_UsuarioModificacion: this.user['uuid'],              
                    code_FechaModificacion: instance.formatFechaHora(new Date()),                
            }
          
            const response = await this.axiosInstanceDetalles.post('Editar',datos);
          
            return response;
        } catch (error) {
            
            
        }
    }

    async OrdenCompraDetallesEliminar(code_Id) {
        try {
            let datos = {
                   
                    code_Id: code_Id,                                                                                                                
            }
          
            const response = await this.axiosInstanceDetalles.post('Eliminar',datos);
           
            return response;
        } catch (error) {
            
            
        }
    }
//---------------------------------------------------------------------------------------------------------------
    async listarMaterialesBrindados(code_Id) {
        try {
            const response = await this.axiosInstanceMateBrin.get('ListarFiltrado', {
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

    async MaterialesBrindadosCrear(data, code_Id) {
        try {
            let datos = {
                               
                    code_Id: code_Id,                
                    mabr_Cantidad: data.CantidadM,       
                    mate_Id: data.Material["value"],              
                    unme_Id: data.UnidadMedida["value"],               
                        
                    usua_UsuarioCreacion: this.user['uuid'],              
                    mabr_FechaCreacion: instance.formatFechaHora(new Date()),                
            }
          
     
            const response = await this.axiosInstanceMateBrin.post('Insertar',datos);
          
            return response;
        } catch (error) {
            
            
        }
    }

    async MaterialesBrindadosEditar(data, mabr_Id,code_Id) {
        try {
            let datos = {
                      
                    mabr_Id: mabr_Id, 
                    code_Id: code_Id,                
                    mabr_Cantidad: data.CantidadM,       
                    mate_Id: data.Material["value"],              
                    unme_Id: data.UnidadMedida["value"],               
                        
                    usua_UsuarioModificacion: this.user['uuid'],              
                    mabr_FechaModificacion: instance.formatFechaHora(new Date()),                
            }
          
          
            const response = await this.axiosInstanceMateBrin.post('Editar',datos);
          
            return response;
        } catch (error) {
            
            
        }
    }

    async MaterialesBrindadosEliminar(MateriaId) {
        try {
            let datos = {
                               
                mabr_Id: MateriaId,            
            }
          
            
            const response = await this.axiosInstanceMateBrin.post('Eliminar',datos);
           
            return response;
        } catch (error) {
            
            
        }
    }


//------------------------------------------------------------------------------------------------
async ListarDocumentos(code_Id) {
    try {
        const response = await this.axiosInstanceDocumentos.get('Listar', {
            params: {
                code_Id: code_Id
            }
        });
  
        
        const data = response.data.data.map((item, index) => {
            return {
                key: index + 1,
                dopo_Id: item.dopo_Id,
                code_Id: item.code_Id,
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



     async  cargarArchivos(file) {
        try {
          


        } catch (error) {
            
            
        }
    }
   
   
    async OrdenCompraDetallesDocumentosCrear(data, code_Id) {
        try {
            let datos = {
                               
                    code_Id: code_Id,
                    
                    dopo_Archivo: data.dopo_Archivo,
                   
                    dopo_TipoArchivo: data.dopo_TipoArchivo,
                                                    
                    usua_UsuarioCreacion: this.user['uuid'],
                   
                    dopo_FechaCreacion: instance.formatFechaHora(new Date()),
                                     
            }
        
          
            const response = await this.axiosInstanceDocumentos.post('Insertar',datos);
          
            return response;
        } catch (error) {
            
            
        }
    }

    async OrdenCompraDetallesDocumentosEliminar(dopo_Id) {
        try {
            let datos = {
                               
                    dopo_Id: dopo_Id,
                    
                            
            }
         
          
            const response = await this.axiosInstanceDocumentos.post('Eliminar',datos);
          
            return response;
        } catch (error) {
            
            
        }
    }
    
   //-----------------------------------------------------------------------------------------------------
   async ListarProcesosPorDetalle(OrdenCompraDetalleID) {
    
    try {
        const response = await this.axiosInstanceProcesos.get('Listar', {
            params: {
                code_Id: OrdenCompraDetalleID
               
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
   
   
   
async InsertarProcesosOrdenCompraDetalle(ID, CompraDetalleID) {
    
     try {
        
        let datos = {
            code_Id: CompraDetalleID ,
            proc_Id: ID,
            usua_UsuarioCreacion: this.user['uuid'],
            poco_FechaCreacion: instance.formatFechaHora(new Date()),
        };
       

        
       
        const response = await this.axiosInstanceProcesos.post('Insertar',datos);
       
        return response;
   
      
     
    } catch (error) {
        
        
    }
}

   
}

const ordencompraservice = new OrdenCompraService();
export default ordencompraservice;