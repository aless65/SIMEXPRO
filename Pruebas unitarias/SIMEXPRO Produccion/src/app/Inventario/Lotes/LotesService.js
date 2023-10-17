import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function LotesService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/";


    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const baseURL2 = process.env.REACT_APP_API_URL + "api/PedidosOrdenDetalles/";

    const axiosInstance2 = axios.create({
        baseURL: baseURL2,
        headers: customHeaders
    });

    const baseURLPedidosOrden = process.env.REACT_APP_API_URL + "api/PedidosOrden/";

    const axiosInstancePedidosOrden = axios.create({
        baseURL: baseURLPedidosOrden,
        headers: customHeaders,
    });
    
    const user = JSON.parse(localStorage.getItem('user'));

    const getPedidosOrdenDetallesInfo = async (id) => {
        try {
            const response = await axiosInstance2.get("Find?prod_Id=" + id);
            const data = response.data.data
            return data;
        } catch (error) {

        }
    }

    async function listar() {
        try {
            const response = await axiosInstance.get('Lotes/Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    lote_Id: item.lote_Id,
                    mate_Id: item.mate_Id,
                    unme_Id: item.unme_Id,
                    prod_Id: item.prod_Id,
                    lote_Stock: item.lote_Stock,
                    lote_CantIngresada: item.lote_CantIngresada,
                    lote_Observaciones: item.lote_Observaciones,
                    lote_CodigoLote: item.lote_CodigoLote,
                    tipa_Id: item.tipa_Id,
                    colr_Id: item.colr_Id,
                    colr_Nombre: item.colr_Nombre,
                    colr_Codigo: item.colr_Codigo,
                    colr_CodigoHtml: item.colr_CodigoHtml,
                    usuario_UsuarioCreacion: item.usuario_UsuarioCreacion,
                    lote_FechaCreacion: item.lote_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    lote_FechaModificacion: item.lote_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    lote_FechaEliminacion: item.lote_FechaEliminacion,
                    lote_Estado: item.lote_Estado,
                    unme_Descripcion: item.unme_Descripcion,
                    mate_Descripcion: item.mate_Descripcion,
                    tipa_area: item.tipa_area,
                    peor_Id: item.peor_Id,
                    prov_NombreCompania: item.prov_NombreCompania,
                    prov_NombreContacto: item.prov_NombreContacto,
                    prov_DireccionExacta: item.prov_DireccionExacta,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                };
           
            });
            return data;
           
        } catch (error) {
            
        }
    }

    async function ExportData() {
        try {
            const response = await axiosInstance.get('Lotes/Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    unme_Descripcion: item.unme_Descripcion,
                    mate_Descripcion: item.mate_Descripcion,
                    tipa_area: item.tipa_area,
                    lote_Stock: item.lote_Stock,
                };
            });
            return data;
           
        } catch (error) {
            
        }
    }

    async function PedidoMaterial(Id){
        try {
            const response = await axiosInstancePedidosOrden.get("PedidoOrdenFind?peor_Codigo=" + Id);
            const data = response.data.data.map((item, index) => {
                return {
                    prod_Id: item.prod_Id,
                    peor_Id: item.peor_Id,
                    peor_Codigo: item.peor_Codigo,
                    prov_Id: item.prov_Id,
                    prov_NombreCompania: item.prov_NombreCompania,
                    prov_NombreContacto: item.prov_NombreContacto,
                    prod_Cantidad: item.prod_Cantidad,
                    mate_Id: item.mate_Id,
                    mate_Descripcion: item.mate_Descripcion,
                    prod_Precio: item.prod_Precio
                };
            });
            //
            return data;
        } catch (error) {
            
            
        }
    }

    async function crear(data) {
        try {
            if(data.prod_Id != ""){
                let datos = {
                    mate_Id: data.mate_Id['value'],
                    unme_Id: data.unme_Id['value'],
                    prod_Id: data.prod_Id,
                    colr_Id: data.colr_Id['value'],
                    lote_Stock: data.cantidadIngresada,
                    lote_CodigoLote: data.lote_CodigoLote.trim(),
                    lote_Observaciones: data.lote_Observaciones.trim(),
                    tipa_Id: data.tipa_Id['value'],
                    usua_UsuarioCreacion: user['uuid'],
                    lote_FechaCreacion: instance.formatFechaHora(new Date()),
                }
                const response = await axiosInstance.post('Lotes/Insertar', datos);
                return response;
            } else {
                let datos = {
                    mate_Id: data.mate_Id['value'],
                    unme_Id: data.unme_Id['value'],
                    prod_Id: null,
                    colr_Id: data.colr_Id['value'],
                    lote_Stock: data.cantidadIngresada,
                    lote_CodigoLote: data.lote_CodigoLote.trim(),
                    lote_Observaciones: data.lote_Observaciones.trim(),
                    tipa_Id: data.tipa_Id['value'],
                    usua_UsuarioCreacion: user['uuid'],
                    lote_FechaCreacion: instance.formatFechaHora(new Date()),
                }
                const response = await axiosInstance.post('Lotes/Insertar', datos);
                return response;
            }   
        } catch (error) {
            
        }
    }

    async function editar(data) {
        try {
            if(data.prod_Id != ""){
                let datos = {
                    lote_Id: data.lote_Id,
                    mate_Id: data.mate_Id.value,
                    unme_Id: data.unme_Id.value,
                    prod_Id: data.prod_Id,
                    colr_Id: data.colr_Id.value,
                    lote_CodigoLote: data.lote_CodigoLote.trim(),
                    lote_Stock: data.lote_Stock,
                    lote_Observaciones: data.lote_Observaciones.trim(),
                    tipa_Id: data.tipa_Id.value,
                    usua_UsuarioModificacion: user['uuid'],
                    lote_FechaModificacion: instance.formatFechaHora(new Date()),
                }
                const response = await axiosInstance.post('Lotes/Editar', datos);
                return response;
            } else {
                let datos = {
                    lote_Id: data.lote_Id,
                    mate_Id: data.mate_Id.value,
                    unme_Id: data.unme_Id.value,
                    prod_Id: null,
                    colr_Id: data.colr_Id.value,
                    lote_CodigoLote: data.lote_CodigoLote.trim(),
                    lote_Stock: data.lote_Stock,
                    lote_Observaciones: data.lote_Observaciones.trim(),
                    tipa_Id: data.tipa_Id.value,
                    usua_UsuarioModificacion: user['uuid'],
                    lote_FechaModificacion: instance.formatFechaHora(new Date()),
                }
                const response = await axiosInstance.post('Lotes/Editar', datos);
                return response;
            }   
           
        } catch (error) {
            
        }
    }

    async function eliminar(data) {
        try {
            let datos = {
                lote_Id: data['id'],
                usua_UsuarioEliminacion: user['uuid'],
                lote_FechaEliminacion: instance.formatFechaHora(new Date()),
            }

            const response = await axiosInstance.post('Lotes/Eliminar', datos);
            return response;
        } catch (error) {
            
        }
    }

    async function UnidadMedida() {
        try {
          const response = await axiosInstance.get("UnidadMedidas/Listar?unme_EsAduana=" + user["esAduana"].toString());
          const data = response.data.data.map((item) => {
            return {
              value: item.unme_Id,
              label: `${item.unme_Descripcion}`,
            };
          });
          return data
        } catch (error) {
          
        }
      }
     


    return {
        listar,
        crear,
        editar,
        eliminar,
        getPedidosOrdenDetallesInfo,
        UnidadMedida,
        ExportData,
    }
}


export default LotesService;