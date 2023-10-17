import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";


function OrdenPedidoService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/PedidosOrden/";
    const baseURLDetalle = process.env.REACT_APP_API_URL + "api/PedidosOrdenDetalles/";
    const baseURLPODetalle = process.env.REACT_APP_API_URL + "api/PODetallePorPedidoOrdenDetalle/";
    const baseURLDUCA = process.env.REACT_APP_API_URL + "api/Duca/";
    const baseURLItems = process.env.REACT_APP_API_URL + "api/Items";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const axiosInstanceDetalles = axios.create({
        baseURL: baseURLDetalle,
        headers: customHeaders,
    });

    const axiosInstancePODetalle = axios.create({
        baseURL: baseURLPODetalle,
        headers: customHeaders,
    });

    const axiosInstanceDuca = axios.create({
        baseURL: baseURLDUCA,
        headers: customHeaders,
    });

    const axiosInstanceItems = axios.create({
        baseURL: baseURLItems,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function ListadoDuca(Codigo) {
        try {
            // Agregar una validación para evitar solicitudes con campo vacío
            if (!Codigo) {
                return 0; // No existe DUCA si el campo está vacío
            }

            const response = await axiosInstanceDuca.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    duca_No_Duca: item.duca_No_Duca,
                };
            });

            var existe = 0;

            data.forEach((element) => {
                if (Codigo == element.duca_No_Duca) {
                    existe = 1;
                }
            });

            return existe;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function ExportData() {
        try {
            const response = await axiosInstance.get('Listar');

            const data = response.data.data.map((item, i) => {
                const detallesJSON = JSON.parse(item.detalles);
                var detalles = null;

                if (detallesJSON) {
                    detalles = detallesJSON.map((data, j) => {
                        return {
                            key: j + 1,
                            mate_Descripcion: data['mate_Descripcion'],
                            prod_Cantidad: data['prod_Cantidad'],
                            prod_Precio: data['prod_Precio'],
                            prod_Id: data['prod_Id'],
                            pedi_Id: data['pedi_Id'],
                            mate_Id: data['mate_Id'],
                        }
                    })
                }
                return {
                    key: i + 1,
                    prov_NombreCompania: item.prov_NombreCompania,
                    prov_NombreContacto: item.prov_NombreContacto,
                    ciud_Nombre: item.ciud_Nombre,
                    peor_FechaEntrada: item.peor_FechaEntrada,
                    peor_Id: item.peor_Id,
                }
            }
            );
            var array = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].detalles) {
                    for (let j = 0; j < data[i].detalles.length; j++) {
                        if (data[i].peor_Id == data[i].detalles[j].pedi_Id) {
                            array[i] += ` {No.: ${j + 1}, Material: ${data[i].detalles[j].mate_Descripcion}, Cantidad: ${data[i].detalles[j].prod_Cantidad}, Precio: ${data[i].detalles[j].prod_Precio}} `;
                        }
                    }
                } else {
                    array.push('');
                }
                data[i].detalles = array[i].toString().replace('undefined', '');
            }
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }



    async function ListadoPedidosOrden() {
        try {

            const response = await axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {

                const detallesJson = JSON.parse(item.detalles)
                let detalles = null

                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2 + 1,
                            prod_Id: datos['prod_Id'],
                            pedi_Id: datos['pedi_Id'],
                            mate_Id: datos['mate_Id'],
                            mate_Descripcion: datos['mate_Descripcion'],
                            prod_Cantidad: datos['prod_Cantidad'],
                            prod_Precio: datos['prod_Precio'],
                        }
                    })
                }

                return {
                    key: index + 1,
                    peor_Codigo: item.peor_Codigo,
                    peor_Id: item.peor_Id,
                    duca_Id: item.duca_Id,
                    prov_Id: item.prov_Id,
                    peor_Impuestos: item.peor_Impuestos,
                    prov_NombreCompania: item.prov_NombreCompania,
                    prov_NombreContacto: item.prov_NombreContacto,
                    prov_Ciudad: item.prov_Ciudad,
                    ciud_Nombre: item.ciud_Nombre,
                    ciud_Id: item.ciud_Id,
                    pais_Id: item.pais_Id,
                    pais_Codigo: item.pais_Codigo,
                    pais_Nombre: item.pais_Nombre,
                    duca_No_Duca: item.duca_No_Duca,
                    pvin_Id: item.pvin_Id,
                    pvin_Nombre: item.pvin_Nombre,
                    peor_FechaEntrada: item.peor_FechaEntrada,
                    peor_Obsevaciones: item.peor_Obsevaciones,
                    peor_DireccionExacta: item.peor_DireccionExacta,
                    dadoCliente: item.dadoCliente,
                    peor_DadoCliente: item.peor_DadoCliente,
                    detalles: detalles,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    peor_FechaCreacion: item.peor_FechaCreacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    peor_FechaModificacion: item.peor_FechaModificacion,
                    peor_finalizacion: item.peor_finalizacion
                }
            });
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };





    async function ListadoPedidosOrdenReporte(peor_Id) {
        try {

            const response = await axiosInstance.get("Listar");

            const filteredData = response.data.data.filter(item => item.peor_Id === peor_Id);

            const data = filteredData.map((item, index) => {
                const detallesJson = JSON.parse(item.detalles)
                let detalles = null

                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2 + 1,
                            prod_Id: datos['prod_Id'],
                            pedi_Id: datos['pedi_Id'],
                            mate_Id: datos['mate_Id'],
                            mate_Descripcion: datos['mate_Descripcion'],
                            prod_Cantidad: datos['prod_Cantidad'],
                            prod_Precio: datos['prod_Precio'],
                            total: datos['Total']
                        }
                    })
                }

                return {
                    key: index + 1,
                    peor_Id: item.peor_Id,
                    duca_Id: item.duca_Id,
                    peor_Codigo: item.peor_Codigo,
                    prov_Id: item.prov_Id,
                    prov_NombreCompania: item.prov_NombreCompania,
                    prov_NombreContacto: item.prov_NombreContacto,
                    prov_Telefono: item.prov_Telefono,
                    prov_Ciudad: item.prov_Ciudad,
                    ciud_Nombre: item.ciud_Nombre,
                    peor_Impuestos: item.peor_Impuestos,
                    ciud_Id: item.ciud_Id,
                    pais_Id: item.pais_Id,
                    pais_Codigo: item.pais_Codigo,
                    pais_Nombre: item.pais_Nombre,
                    duca_No_Duca: item.duca_No_Duca,
                    pvin_Id: item.pvin_Id,
                    pvin_Nombre: item.pvin_Nombre,
                    peor_FechaEntrada: new Date(item.peor_FechaEntrada).toLocaleString(),
                    peor_Obsevaciones: item.peor_Obsevaciones,
                    peor_DireccionExacta: item.peor_DireccionExacta,
                    dadoCliente: item.dadoCliente,
                    empl_Creador: item.empl_Creador,
                    peor_DadoCliente: item.peor_DadoCliente,
                    detalles: detalles,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    peor_FechaCreacion: new Date(item.peor_FechaCreacion).toLocaleString(),
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    peor_FechaModificacion: item.peor_FechaModificacion,
                    peor_finalizacion: item.peor_finalizacion
                }

            });
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async function InsertarEncabezadoPedidosOrden(OrdenPedidoModelo, impu) {

        try {
            let impuestos = 0

            if (impu === true) {
                impuestos = 1
            }
            else {
                impuestos = 0
            }

            let duca = 0
            if (OrdenPedidoModelo.duca_Id === null ||
                OrdenPedidoModelo.duca_Id === "" ||
                OrdenPedidoModelo.duca_Id === undefined) {
                duca = null;
            }
            else {
                duca = OrdenPedidoModelo.duca_Id
            }

            let datos = {
                peor_Codigo: OrdenPedidoModelo.peor_Codigo.trim().replace(/\s+/g, ' '),
                prov_Id: OrdenPedidoModelo.prov_Id.value,
                duca_No_Duca: duca,
                peor_FechaEntrada: OrdenPedidoModelo.peor_FechaEntrada,
                ciud_Id: OrdenPedidoModelo.ciudad.value,
                peor_DireccionExacta: OrdenPedidoModelo.peor_DireccionExacta.trim().replace(/\s+/g, ' '),
                peor_Obsevaciones: OrdenPedidoModelo.peor_Obsevaciones.trim().replace(/\s+/g, ' '),
                peor_Impuestos: impuestos,
                usua_UsuarioCreacion: user['uuid'],
                peor_FechaCreacion: instance.formatFechaHora(new Date()),

            };

            const response = await axiosInstance.post("Insertar", datos);

            return response;

        } catch (error) {
            console.log(error.message);
            throw error;

        }
    }

    async function EditarEncabezadoPedidosOrden(OrdenPedidoModelo, impu) {
        try {
            let impuestos = 0

            if (impu === true) {
                impuestos = 1
            }
            else {
                impuestos = 0
            }

            let duca = 0
            if (OrdenPedidoModelo.duca_Id === null ||
                OrdenPedidoModelo.duca_Id === "" ||
                OrdenPedidoModelo.duca_Id === undefined) {
                duca = null;
            }
            else {
                duca = OrdenPedidoModelo.duca_Id
            }
            let datos = {
                peor_Codigo: OrdenPedidoModelo.peor_Codigo.trim().replace(/\s+/g, ' '),
                peor_Id: OrdenPedidoModelo.peor_Id,
                prov_Id: OrdenPedidoModelo.prov_Id.value,
                duca_No_Duca: duca,
                ciud_Id: OrdenPedidoModelo.ciudad.value,
                peor_DireccionExacta: OrdenPedidoModelo.peor_DireccionExacta.trim().replace(/\s+/g, ' '),
                peor_FechaEntrada: OrdenPedidoModelo.peor_FechaEntrada,
                peor_Obsevaciones: OrdenPedidoModelo.peor_Obsevaciones.trim().replace(/\s+/g, ' '),
                peor_Impuestos: impuestos,
                usua_UsuarioModificacion: user['uuid'],
                peor_FechaModificacion: instance.formatFechaHora(new Date()),

            };
            console.log(datos)
            const response = await axiosInstance.post("Editar", datos);
            return response;

        } catch (error) {
            console.log(error.message);
            throw error;

        }
    }


    async function InsertarEncabezadoPedidosOrdenDetalle(OrdenPedidoDetalleModelo, idMaterial, UltimoId) {
        try {



            let datos = {
                pedi_Id: UltimoId,
                mate_Id: idMaterial,
                prod_Cantidad: OrdenPedidoDetalleModelo.prod_Cantidad,
                prod_Precio: OrdenPedidoDetalleModelo.prod_Precio,
                usua_UsuarioCreacion: user['uuid'],
                prod_FechaCreacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstanceDetalles.post("Insertar", datos);

            return response;

        } catch (error) {
            console.log(error.message);
            throw error;

        }
    }
    
    async function EliminarPODetallePorPedidosOrdenDetalle(ocpo_Id) {
        try {
            let datos = {
                ocpo_Id: ocpo_Id,

            };
            const response = await axiosInstancePODetalle.post("Eliminar", datos);
            return response;

        } catch (error) {
            console.log(error.message);
            throw error;

        }
    }
        
    async function EliminarDetalleConDuca(VWModel) {
        try {
            let datos = {
                prod_Id: VWModel.prod_Id,
                item_Id: VWModel.item_Id,

            };
            console.log(datos)

            const response = await axiosInstanceDetalles.post("Eliminar", datos);
            return response;

        } catch (error) {
            console.log(error.message);
            throw error;

        }
    }

    async function EditarPedidosOrdenDetalle(data, selectedMaterialId) {
        try {




            let datos = {
                prod_Id: data["prod_Id"],
                pedi_Id: data["pedi_Id"],
                mate_Id: selectedMaterialId,
                prod_Cantidad: data["prod_Cantidad"],
                prod_Precio: data["prod_Precio"],
                usua_UsuarioModificacion: user['uuid'],
                prod_FechaModificacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstanceDetalles.post("Editar", datos);
            return response;

        } catch (error) {
            console.log(error.message);
            throw error;

        }
    }

    async function PODetallePorPedidosOrdenDetalleInsertar(data, prod_Id) {
        try {

            let detalleorco = 0
            if (data.code_Id === "" ||
                data.code_Id === 0 ||
                data.code_Id === null ||
                data.code_Id === undefined) {
                detalleorco = null
            }
            else {
                detalleorco = data.code_Id
            }

            let datos = {
                prod_Id: prod_Id,
                code_Id: detalleorco,
                orco_Id: data.orco_Id.value,
                usua_UsuarioCreacion: user['uuid'],
                ocpo_FechaCreacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstancePODetalle.post("Insertar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function ListadoPedidosOrdenDetallePorId(UltimoId) {
        try {
            const response = await axiosInstanceDetalles.get(`Listar?pedi_Id=${parseInt(UltimoId)}`);

            const data = response.data.data.map((item, index) => {

                const detallesJson = JSON.parse(item.detalles)
                let detalles = null


                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2 + 1,
                            ocpo_Id: datos['ocpo_Id'],
                            orco_Id: datos['orco_Id'],
                            code_Id: datos['matcode_Ide_Id'],
                            code_CodigoDetalle: datos['code_CodigoDetalle'],
                            clie_Nombre_O_Razon_Social: datos["clie_Nombre_O_Razon_Social"],
                            code_CantidadPrenda: datos["code_CantidadPrenda"],
                            code_SexoEvaluado: datos["code_SexoEvaluado"],
                            esti_DescripcionEvaludado: datos["esti_DescripcionEvaludado"],
                            colr_NombreEvaludado: datos["colr_NombreEvaludado"],
                            tall_NombreEvaludado: datos["tall_NombreEvaludado"],

                        }
                    })
                }

                return {
                    key: index + 1,
                    prod_Id: item.prod_Id,
                    pedi_Id: item.pedi_Id,
                    mate_Id: item.mate_Id,
                    mate_Descripcion: item.mate_Descripcion,
                    detalles: detalles,
                    prod_Cantidad: item.prod_Cantidad,
                    prod_Precio: item.prod_Precio,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    prod_FechaCreacion: item.prod_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    prod_FechaModificacion: item.prod_FechaModificacion,
                    prod_Estado: item.prod_Estado,
                    item_Id: item.item_Id
                };
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function FinalizarPedidosOrden(data) {

        try {
            let datos = {
                peor_Id: data
            };
            const response = await axiosInstance.post("FinalizarPedidoOrden", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    //Datos de los items por duca
    async function ItemsDuca(Id) {
        console.log("ducaaaaaaaaaaa",Id) 
        try {
            const response = await axiosInstanceItems.post("ItemsOrdenPedido?id=" + Id);
            const data = response.data.data.map((item, index) => {
                return {
                    item_Id: item.item_Id,
                    item_Cantidad: item.item_Cantidad,
                    item_IdentificacionComercialMercancias: item.item_IdentificacionComercialMercancias,
                    item_ValorUnitario: item.item_ValorUnitario,
                    item_Estado: item.item_Estado,
                    mate_SubCategoria: item.mate_SubCategoria,
                    subc_Descripcion: item.subc_Descripcion,
                    mate_Imagen: item.mate_Imagen,
                    item_Id: item.item_Id
                };
            });
            return data;
        } catch (error) {

        }
    }

    async function InsertarPedidosOrdenDetalleConDuca(OrdenPedidoDetalleModeloConDuca) {
        try {
            let datos = {
                pedi_Id: OrdenPedidoDetalleModeloConDuca.pedi_Id,
                mate_Descripcion: OrdenPedidoDetalleModeloConDuca.mate_Descripcion,
                prod_Cantidad: OrdenPedidoDetalleModeloConDuca.prod_Cantidad,
                prod_Precio: OrdenPedidoDetalleModeloConDuca.prod_Precio,
                item_Id: OrdenPedidoDetalleModeloConDuca.item_Id,
                usua_UsuarioCreacion: user['uuid'],
            };
            console.log(datos)

            const response = await axiosInstanceDetalles.post("InsertarItems", datos);
            console.log(response)
            return response;

        } catch (error) {
            console.log(error.message);
            throw error;

        }
    }



    return {
        ListadoPedidosOrden,
        InsertarEncabezadoPedidosOrden,
        InsertarEncabezadoPedidosOrdenDetalle,
        ListadoPedidosOrdenDetallePorId,
        EditarEncabezadoPedidosOrden,
        EditarPedidosOrdenDetalle,
        FinalizarPedidosOrden,
        ListadoPedidosOrdenReporte,
        PODetallePorPedidosOrdenDetalleInsertar,
        EliminarPODetallePorPedidosOrdenDetalle,
        ListadoDuca,
        ExportData,
        ItemsDuca,
        InsertarPedidosOrdenDetalleConDuca,
        EliminarDetalleConDuca
    }
}

export default OrdenPedidoService;
