import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function PedidosProduccionService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/PedidosProduccion/";
    const baseURLDetalles = process.env.REACT_APP_API_URL + "api/PedidosProduccionDetalles/";
    const baseURLLotes = process.env.REACT_APP_API_URL + "api/Lotes/";



    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const PedidosProduccionDetalle = axios.create({
        baseURL: baseURLDetalles,
        headers: customHeaders,
    });

    const axiosInstanceLotes = axios.create({
        baseURL: baseURLLotes,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    //Listado Pedidos Produccion
    async function ListarPedidosProduccion() {
        try {

            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {

                const detallesJson = JSON.parse(item.detalles)
                let detalles = null

                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2 + 1,
                            ppde_Id: datos['ppde_Id'],
                            lote_Id: datos['lote_Id'],
                            lote_CodigoLote: datos['lote_CodigoLote'],
                            ppde_Cantidad: datos['ppde_Cantidad'],
                            mate_Descripcion: datos['mate_Descripcion'],
                            tipa_area: datos['tipa_area']
                        }
                    })
                }

                
                return {
                    key: index + 1,
                    ppro_Id: item.ppro_Id,
                    empl_Id: item.empl_Id,
                    empl_NombreCompleto: item.empl_NombreCompleto,
                    ppro_Fecha: item.ppro_Fecha,
                    ppro_Estados: item.ppro_Estados,
                    ppro_Observaciones: item.ppro_Observaciones,
                    ppro_Finalizado: item.ppro_Finalizado,
                    detalles: detalles,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    ppro_FechaCreacion: item.ppro_FechaCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuModificacion: item.usuarioModificacionNombre,
                    ppro_FechaModificacion: item.ppro_FechaModificacion,

                    ppro_Estado: item.ppro_Estado,
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
                    detalles = detallesJSON.map((datos, j) => {
                        return {
                            key: j + 1,
                            ppro_Id: datos['ppro_Id'],
                            ppde_Id: datos['ppde_Id'],
                            lote_Id: datos['lote_Id'],
                            lote_CodigoLote: datos['lote_CodigoLote'],
                            ppde_Cantidad: datos['ppde_Cantidad'],
                            mate_Descripcion: datos['mate_Descripcion'],
                            tipa_area: datos['tipa_area']
                        }
                    })
                }
                    return{
                        key: i + 1,
                        empl_NombreCompleto: item.empl_NombreCompleto,
                        ppro_Estados: item.ppro_Estados,
                        ppro_Observaciones: item.ppro_Observaciones,
                        ppro_Id: item.ppro_Id,
                        detalles: detalles,
                    }
                },
            );
            var array = []
            for (let i = 0; i < data.length; i++) {
                if(data[i].detalles){

                    for (let j = 0; j < data[i].detalles.length; j++) {

                        if(data[i].ppro_Id == data[i].detalles[j].ppro_Id ){
                            array[i] += ` {No.: ${j +1}, Lote: ${data[i].detalles[j].lote_CodigoLote}, Cantidad: ${data[i].detalles[j].ppde_Cantidad}, Meterial: ${data[i].detalles[j].mate_Descripcion}} `;
                        }

                    }

                }else{
                    array.push('')
                }                
                data[i].detalles = array[i].toString().replace('undefined', '');
                
            }
            
            return data;
        } catch (error) {

        }
    };


    //Insertar Pedidos Produccion
    async function InsertarPedidosProduccion(data) {
        try {
            let datos = {
                empl_Id: data.Empleado["value"],
                ppro_Fecha: data["ppro_Fecha"],
                ppro_Estados: data["ppro_Estados"].trim(),
                ppro_Observaciones: data["ppro_Observaciones"].trim(),


                usua_UsuarioCreacion: user['uuid'],
                ppro_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {

        }
    }

    //Insertar Pedidos Produccion
    async function EditarPedidosProduccion(data) {
        try {
            let datos = {
                ppro_Id: data["ppro_Id"],
                empl_Id: data.Empleado["value"],
                ppro_Fecha: data["ppro_Fecha"],
                ppro_Estados: data["ppro_Estados"].trim(),
                ppro_Observaciones: data["ppro_Observaciones"].trim(),


                usua_UsuarioModificacion: user['uuid'],
                ppro_FechaModificacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {

        }
    }

    async function EliminarPedidosProduccion(data) {
        try {
            let datos = {
                ppro_Id: data["id"],
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {

        }
    }


    //Datos del lote con ese Id
    async function LoteMarial(Id) {
        try {
            const response = await axiosInstanceLotes.get("LotesMateriales?lote_CodigoLote=" + Id);
            const data = response.data.data.map((item, index) => {
                return {
                    lote_Id: item.lote_Id,
                    mate_Id: item.mate_Id,
                    lote_CodigoLote: item.lote_CodigoLote,
                    colr_Codigo: item.colr_Codigo,
                    colr_Nombre: item.colr_Nombre,
                    lote_Stock: item.lote_Stock,
                    mate_Descripcion: item.mate_Descripcion,
                };
            });
            return data;
        } catch (error) {

        }
    }

    async function ListarPedidosProduccionDetalle(Id) {
       
        try {
            const response = await PedidosProduccionDetalle.get("Filtrar?ppro_Id=" + Id);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    ppde_Id: item.ppde_Id,
                    ppro_Id: item.ppro_Id,
                    lote_Id: item.lote_Id,
                    lote_CodigoLote: item.lote_CodigoLote,
                    colr_Codigo: item.colr_Codigo,
                    colr_Nombre: item.colr_Nombre,
                    mate_Descripcion: item.mate_Descripcion,
                    ppde_Cantidad: item.ppde_Cantidad,
                };
               
            });
            return data;
        } catch (error) {

        }
    }


    async function InsertarPedidosProduccionDetalle(data) {
        try {

            let datos = {
                ppro_Id: data["ppro_Id"],
                lote_Id: data["lote_Id"],
                ppde_Cantidad: data["ppde_Cantidad"],

                usua_UsuarioCreacion: user['uuid'],
                ppde_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await PedidosProduccionDetalle.post("Insertar", datos);
            return response;
        } catch (error) {

        }
    }

    async function EditarPedidosProduccionDetalle(data) {
        try {

            let datos = {
                ppde_Id: data["id"],
                ppro_Id: data["ppro_Id"],
                lote_Id: data["lote_Id"],
                ppde_Cantidad: data["ppde_Cantidad"],

                usua_UsuarioModificacion: user['uuid'],
                ppde_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await PedidosProduccionDetalle.post("Editar", datos);
            return response;
        } catch (error) {

        }
    }

    async function EliminarPedidosProduccionDetalles(data) {
        try {
            let datos = {
                ppde_Id: data["id"],
            };
            const response = await PedidosProduccionDetalle.post("Eliminar", datos);
            return response;
        } catch (error) {

        }
    }


    async function FinalizarPedidoProduccion(data) {
        try {
            let datos = {
                ppro_Id: data["ppro_Id"],
            };
            const response = await axiosInstance.post("FinalizarPedidoProduccion", datos);
            return response;
        } catch (error) {

        }
    }

    return {
        ListarPedidosProduccion,
        InsertarPedidosProduccion,
        EditarPedidosProduccion,
        EliminarPedidosProduccion,
        ListarPedidosProduccionDetalle,
        LoteMarial,
        InsertarPedidosProduccionDetalle,
        EditarPedidosProduccionDetalle,
        EliminarPedidosProduccionDetalles,
        FinalizarPedidoProduccion,
        ExportData
    };

}


export default PedidosProduccionService;



