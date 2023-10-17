import axios from 'axios';
import { parse } from 'crypto-js/enc-base64';
import instance from 'src/app/auth/services/jwtService/jwtService';

function BoletinDePagoService () {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get(`BoletinPago/Listar`);
            //const response = await axiosInstance.get(`https://localhost:44380/api/BoletinPago/Listar`);
            const data = response.data.data.map((item, index) => {
                return {
                  key: index+1,
                  boen_Id: item.boen_Id,
                  liqu_Id: item.liqu_Id,
                  duca_Id: item.duca_Id,
                  duca_No_Duca: item.duca_No_Duca,
                  lige_TotalGral: item.lige_TotalGral,
                  tipl_Id: item.tipl_Id,
                  tipl_Descripcion: item.tipl_Descripcion,
                  boen_FechaEmision: item.boen_FechaEmision,
                  esbo_Id: item.esbo_Id,
                  esbo_Descripcion: item.esbo_Descripcion,
                  boen_Observaciones: item.boen_Observaciones,
                  boen_NDeclaracion: item.boen_NDeclaracion,
                  boen_Preimpreso: item.boen_Preimpreso,
                  boen_TotalPagar: item.boen_TotalPagar,
                  boen_TotalGarantizar: item.boen_TotalGarantizar,
                  coim_Id: item.coim_Id,
                  coim_Descripcion: item.coim_Descripcion,
                  copa_Id: item.copa_Id,
                  usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                  usuarioCreacionNombre: item.usuarioCreacionNombre,
                  boen_FechaCreacion: item.boen_FechaCreacion,
                  usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                  usuarioModificacionNombre: item.usuarioModificacionNombre,
                  boen_FechaModificacion: item.boen_FechaModificacion,
                  boen_Estado: item.boen_Estado,
                };
              });
              console.log('datos tabla', response)
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    async function listarImportadoresById(id) {
        try {
            const response = await axiosInstance.get(`Importadores/ListarById?Id=` + id)
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    
   async function ExportData(){
    try{
        const response = await axiosInstance.get("BoletinPago/Listar");
        const data = response.data.data.map((item, index) => {
            return{
                key: index + 1,
                boen_NDeclaracion: item.boen_NDeclaracion,
                boen_Preimpreso: item.boen_Preimpreso,
                boen_TotalPagar: item.boen_TotalPagar,
            };
        }); 
    console.log(data);
        return data;
    }
    catch (error)
    {
        console.log(error.message);
        throw error;
    }
};


    async function getdevas() {
        try {
            const response = await axiosInstance.get(`Declaracion_Valor/Listar`);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function getdeva(id) {
        try {
            const response = await axiosInstance.get(`Declaracion_Valor/Listar_ByDucaId?id=${id}`);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function getimportadores() {
        try {
            const response = await axiosInstance.get(`Importadores/Listar`);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function getboletinpagodetalles(id) {
        try {
            const response = await axiosInstance.get(`BoletinPagoDetalles/ListarByIdBoletin?boen_Id=` + id);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async function getaduanas() {
        try {
            const response = await axiosInstance.get(`Aduanas/Listar`);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async function getaduana(id) {
        try {
            const response = await axiosInstance.get(`Aduanas/Listar_ById?id=${id}`);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function crear(modelo,modelo1) {
        console.log('modelo',modelo)
        try {
            let datos = {
                liqu_Id: modelo.liqu_Id,
                duca_Id: modelo?.duca_Id,
                duca_No_Duca: modelo.duca_No_Duca,
                boen_NDeclaracion: modelo.boen_NDeclaracion,
                tipl_Id: modelo.tipl_Id.value,
                boen_FechaEmision: instance.formatFechaHora(new Date()),
                esbo_Id: modelo.Estado.value,
                boen_Preimpreso: modelo.boen_Preimpreso.trim(),
                boen_Observaciones: modelo.Observaciones.trim(),
                boen_TotalPagar: modelo1.totalPagar,
                boen_TotalGarantizar: modelo1.totalPagar,
                coim_Id: modelo.coim_Id.value,
                copa_Id: modelo.copa_Id.value,
                usua_UsuarioCreacion: user['uuid'],
                boen_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            console.log('datos',datos)
            const response = await axiosInstance.post('BoletinPago/Insertar',datos);
            //const response = await axiosInstance.post('https://localhost:44380/api/BoletinPago/Insertar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    
    async function editar(modelo,modelo1) {
        try {
            let datos = {
                boen_Id: modelo.boen_Id,
                liqu_Id: modelo.liqu_Id,
                duca_Id: modelo.duca_Id,
                duca_No_Duca: modelo.duca_No_Duca,
                boen_NDeclaracion: modelo.boen_NDeclaracion,
                tipl_Id: modelo.tipl_Id.value,
                boen_FechaEmision: instance.formatFechaHora(new Date()),
                esbo_Id: modelo.Estado.value,
                boen_Preimpreso: modelo.boen_Preimpreso.trim(),
                boen_Observaciones: modelo.Observaciones.trim(),
                boen_TotalPagar: parseInt(modelo.boen_TotalPagar),
                boen_TotalGarantizar: parseInt(modelo.boen_TotalGarantizar),
                coim_Id: modelo.coim_Id.value,
                copa_Id: modelo.copa_Id.value,
                usua_UsuarioModificacion: user['uuid'],
                boen_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            console.log('datos enviados al editar', datos)
            const response = await axiosInstance.post('BoletinPago/Editar',datos);
            //const response = await axiosInstance.post('https://localhost:44380/api/BoletinPago/Editar',datos);
            return response;
        } catch (error) {
            console.log(error.message); 
            throw error;
        }
    }

    async function creardetalles(modelo,cuentaPa01,tipoObligacion,lige_Id) {
        try {
            let datos = {
                // boen_Id: modelo.boen_Id,
                // lige_Id: lige_Id,
                // bode_Concepto: modelo.copa_Id ? modelo.copa_Id.value : "",
                // bode_TipoObligacion: tipoObligacion ? tipoObligacion.id : "",
                // bode_CuentaPA01: cuentaPa01,
                // usua_UsuarioCreacion: user['uuid'],
                // bode_FechaCreacion: instance.formatFechaHora(new Date())


                    "bode_Id": 0,
                    "boen_Id": parseInt(modelo.boen_Id),
                    "lige_Id": lige_Id,
                    "bode_Concepto": modelo.copa_Id ? modelo.copa_Id.value.toString() : "",
                    "bode_TipoObligacion": tipoObligacion ? tipoObligacion.id.toString() : "",
                    "bode_CuentaPA01": parseInt(cuentaPa01),
                    "usua_UsuarioCreacion": user['uuid'],
                    "bode_FechaCreacion": instance.formatFechaHora(new Date()),
                    "usua_UsuarioModificacion": 0,
                    "bode_FechaModificacion": "2023-09-03T23:33:10.582Z"   

                    // "bode_Id": 0,
                    // "boen_Id": 35,
                    // "lige_Id": 2,
                    // "bode_Concepto": "2",
                    // "bode_TipoObligacion": "2",
                    // "bode_CuentaPA01": 24,
                    // "usua_UsuarioCreacion": 2,
                    // "bode_FechaCreacion": "2023-09-03T23:33:10.582Z",
                    // "usua_UsuarioModificacion": 0,
                    // "bode_FechaModificacion": "2023-09-03T23:33:10.582Z"
                    
            }
            console.log('datos enviados al detalle del boletin', datos)
            const response = await axiosInstance.post('BoletinPagoDetalles/Insertar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function editardetalles(modelo,cuentaPa01,tipoObligacion,lige_Id,bode_Id) {
        try {
            let datos = {
                    "bode_Id": bode_Id,
                    "boen_Id": parseInt(modelo.boen_Id),
                    "lige_Id": lige_Id,
                    "bode_Concepto": modelo.copa_Id ? modelo.copa_Id.value.toString() : "",
                    "bode_TipoObligacion": tipoObligacion ? tipoObligacion.id.toString() : "",
                    "bode_CuentaPA01": parseInt(cuentaPa01),
                    "usua_UsuarioModificacion": user['uuid'],
                    "bode_FechaCreacion": instance.formatFechaHora(new Date()),
                    "bode_FechaModificacion": instance.formatFechaHora(new Date())   
            }
            console.log('datos enviados al detalle del boletin', datos)
            const response = await axiosInstance.post('BoletinPagoDetalles/Editar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function getducas() {
        try {
            const response = await axiosInstance.get('Duca/Listar');
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function getduca(id) {
        try {
            const response = await axiosInstance.post(`Duca/Listar_ById?id=${id}`);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async function getLiquidacionesGenerales() {
        try {
            const response = await axiosInstance.get('LiquidacionGeneral/Listar');
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
   
    return{
        listar,
        crear,
        creardetalles,
        editar,
        getducas,
        getdevas,
        getimportadores,
        getLiquidacionesGenerales,
        getboletinpagodetalles,
        editardetalles,
        getaduanas,
        listarImportadoresById,
        ExportData,
        getdeva,
        getduca,
        getaduana
    }
}
export default BoletinDePagoService;