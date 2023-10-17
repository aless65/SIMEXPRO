import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

function PersonaJuridicaService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/";


    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));


    function MakeAleatoryCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }


    async function EnviarCorreo(data) {
        try {
            let tokenGenerate = MakeAleatoryCode(6)
            let datos = { token: tokenGenerate, user: user['data']['displayName'], email: data["peju_CorreoElectronico"] };

            let SendMail = {
                service_id: 'service_98eowx7',
                template_id: 'template_9b7kd2p',
                user_id: 'xpvMuO0YOgau20QGW',
                template_params: {
                    to_name: user['data']['displayName'],
                    message: tokenGenerate,
                    send_to: data["peju_CorreoElectronico"],
                }
            };

            const res = await axios.post(`https://api.emailjs.com/api/v1.0/email/send`, SendMail)
            if (res['status'] == 200) {
                return datos
            } else {
                return -1
            }
        } catch (error) {
            return error
        }

    }
    async function EnviarCorreo2(data) {
        try {

            let tokenGenerate = MakeAleatoryCode(6)
            let datos = { token: tokenGenerate, user: user['data']['displayName'], email: data["peju_CorreoElectronicoAlternativo"] };

            let SendMail = {
                service_id: 'service_98eowx7',
                template_id: 'template_9b7kd2p',
                user_id: 'xpvMuO0YOgau20QGW',
                template_params: {
                    to_name: user['data']['displayName'],
                    message: tokenGenerate,
                    send_to: data["peju_CorreoElectronicoAlternativo"],
                }
            };
            const res = await axios.post(`https://api.emailjs.com/api/v1.0/email/send`, SendMail)

            if (res['status'] == 200) {
                return datos
            } else {
                return -1
            }
        } catch (error) {
            return error
        }

    }

    async function PersonasList() {
        try {
          const response = await axiosInstance.get("Personas/Listar") ; 
          const data = response.data.data.map((item) => {
            return {
                pers_Id: item.pers_Id,
                pers_RTN: item.pers_RTN,
            };
          });
          return data;
        } catch (error) {
          
          
        }
      }

      async function DocumentosList() {
        try {
          const response = await axiosInstance.get("DocumentosContratos/Listar") ; 
          const data = response.data.data.map((item) => {
            return {
              doco_Id: item.doco_Id,
              coin_Id: item.coin_Id,
              pers_RTN: item.pers_RTN,
              coin_CorreoElectronico: item.coin_CorreoElectronico,
              coin_TelefonoFijo: item.coin_TelefonoFijo,
              peju_Id: item.peju_Id,
              doco_Numero_O_Referencia:item.doco_Numero_O_Referencia,
              doco_TipoDocumento: item.doco_TipoDocumento,
              doco_NombreImagen: item.doco_NombreImagen,
              doco_URLImagen: item.doco_URLImagen,
            };
          });
          return data;
        } catch (error) {
          
          
        }
      }


    async function listar() {
        try {
            const response = await axiosInstance.get('PersonaJuridica/Listar');
            const data = response.data.data.map((item, index) => {
                return {

                    key: index + 1, //Numero Correlativo

                    peju_Id: item.peju_Id, //persona Juridica Id

                    // Datos Tap 1
                    pers_Id: item.pers_Id,
                    pers_RTN: item.pers_RTN,
                    pers_Nombre: item.pers_Nombre,
                    ofic_Id: item.ofic_Id,
                    ofic_Nombre: item.ofic_Nombre,
                    escv_Id: item.escv_Id,
                    escv_Nombre: item.escv_Nombre,
                    ofpr_Id: item.ofpr_Id,
                    ofpr_Nombre: item.ofpr_Nombre,

                    // Datos Tap 2
                    colo_Id: item.colo_Id,
                    coliniaEmpresa: item.coliniaEmpresa,
                    ciud_Id: item.ciud_Id,
                    ciudadEmpresa: item.ciudadEmpresa,
                    alde_Id: item.alde_Id,
                    aldeaEmpresa: item.aldeaEmpresa,
                    pvin_Id: item.pvin_Id,
                    provinciaEmpresa: item.provinciaEmpresa,
                    peju_PuntoReferencia: item.peju_PuntoReferencia,
                    peju_NumeroLocalApart: item.peju_NumeroLocalApart,

                    // Datos Tap 3
                    peju_ColoniaRepresentante: item.peju_ColoniaRepresentante,
                    coloniaRepresentante: item.coloniaRepresentante,
                    peju_CiudadIdRepresentante: item.peju_CiudadIdRepresentante,
                    ciudadRepresentante: item.ciudadRepresentante,
                    peju_AldeaIdRepresentante: item.peju_AldeaIdRepresentante,
                    aldeaRepresemtante: item.aldeaRepresemtante,
                    provinciaIdRepresentante: item.provinciaIdRepresentante,
                    provinciaRepresentante: item.provinciaRepresentante,
                    peju_NumeroLocalRepresentante: item.peju_NumeroLocalRepresentante,
                    peju_PuntoReferenciaRepresentante: item.peju_PuntoReferenciaRepresentante,


                    // Datos Tap 4
                    peju_TelefonoEmpresa: item.peju_TelefonoEmpresa,
                    peju_TelefonoFijoRepresentanteLegal: item.peju_TelefonoFijoRepresentanteLegal,
                    peju_TelefonoRepresentanteLegal: item.peju_TelefonoRepresentanteLegal,
                    peju_CorreoElectronico: item.peju_CorreoElectronico,
                    peju_CorreoElectronicoAlternativo: item.peju_CorreoElectronicoAlternativo,

                    // Datos Tap 5
                    peju_RTNReprsentanteLegal: item.peju_RTNReprsentanteLegal,
                    peju_RTNSociedadMercantil: item.peju_RTNSociedadMercantil,
                    peju_DNIRepresentante: item.peju_DNIRepresentante,
                    peju_EscrituraPublica: item.peju_EscrituraPublica,
                    
                    //Auditoria
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    peju_FechaCreacion: item.peju_FechaCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificaNombre: item.usuarioModificaNombre,
                    peju_FechaModificacion: item.peju_FechaModificacion,

                    peju_Estado: item.peju_Estado,
                    peju_ContratoFinalizado: item.peju_ContratoFinalizado
                };

            });
            return data;

        } catch (error) {
            
        }
    }

    
   async function ExportData(){
    try{
        const response = await axiosInstance.get("PersonaJuridica/Listar");
        const data = response.data.data.map((item, index) => {
            return{
                key: index + 1,
                pers_RTN: item.pers_RTN,
                ofic_Nombre: item.ofic_Nombre,
                escv_Nombre: item.escv_Nombre,
                ofpr_Nombre: item.ofpr_Nombre,
            };
        }); 
   
        return data;
    }
    catch (error)
    {
        
        
    }
};


    async function creartab1(data) {
        try {
            const datos = {
                pers_RTN: data["pers_RTN"].replace(/\s+/g, ' '),
                pers_Nombre: data["pers_Nombre"].trim(),
                ofic_Id: data.oficina["value"],
                escv_Id: data.estadocivil["value"],
                ofpr_Id: data.oficio["value"],
                usua_UsuarioCreacion: user['uuid'],
                peju_FechaCreacion: instance.formatFechaHora(new Date()),
            };
           
            const response = await axiosInstance.post("PersonaJuridica/Insertar", datos);
           
            return response;
        } catch (error) {
            
            
        }
    }

    async function creartab2(data,id) {
        try {
            const datos = {
                peju_Id: id,
                ciud_Id: data.ciudad["value"],
                alde_Id: data.aldea == null ? 0 : data.aldea["value"],
                colo_Id: data.colonia["value"],
                peju_NumeroLocalApart: data['numeroLocal'].trim(),
                peju_PuntoReferencia: data['puntoReferencia'],
                usua_UsuarioCreacion: user['uuid'],
                peju_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await axiosInstance.post("PersonaJuridica/InsertarTap2", datos);
            return response;

        } catch (error) {
            
            
        }
    }

    async function creartab3(data,id) {
        try {
            const datos = {
                peju_Id: id,
                peju_CiudadIdRepresentante: data.ciudad["value"],
                peju_AldeaIdRepresentante: data.aldea == null ? 0 : data.aldea["value"],
                peju_ColoniaRepresentante: data.colonia["value"],
                peju_NumeroLocalRepresentante: data['numeroLocal'].trim(),
                peju_PuntoReferenciaRepresentante: data['puntoReferencia'],
                usua_UsuarioCreacion: user['uuid'],
                peju_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("PersonaJuridica/InsertarTap3", datos);
          
            return response;
        } catch (error) {
            
            
        }
    }

    async function creartab4(data,id) {
        try {
            const datos = {
                peju_Id: id,
                peju_TelefonoEmpresa: data['peju_TelefonoEmpresa'],
                peju_TelefonoFijoRepresentanteLegal: data['peju_TelefonoFijoRepresentanteLegal'],
                peju_TelefonoRepresentanteLegal: data['peju_TelefonoRepresentanteLegal'],
                peju_CorreoElectronico: data['peju_CorreoElectronico'],
                peju_CorreoElectronicoAlternativo: data['peju_CorreoElectronicoAlternativo'],
                usua_UsuarioCreacion: user['uuid'],
                peju_FechaCreacion: instance.formatFechaHora(new Date()),
            };
         
            const response = await axiosInstance.post("PersonaJuridica/InsertarTap4", datos);
          
            return response;
        } catch (error) {
            
            
        }
    }

    async function creartab5(data) {
        try {
            const datos = {
                peju_Id: data['id'],

                peju_RTNSociedadMercantil: data['RTNSociedadMercantil'],
                peju_DNIRepresentante: data['TarjetaIdRepresentanteLegal'],
                peju_RTNReprsentanteLegal: data['RTNRepresentanteLegal'],
                peju_EscrituraPublica: data['EscrituraPublica'].trim(),

                usua_UsuarioCreacion: user['uuid'],
                peju_FechaCreacion: instance.formatFechaHora(new Date()),
            };

            const response = await axiosInstance.post("PersonaJuridica/InsertarTap5", datos);
         
            return response;
        } catch (error) {
            
            
        }
    }

    async function crearTiposDocumentos(id, Archivos) {
        
        try {
            const documentos = {
                documentos: Archivos.map(item => ({
                    doco_TipoDocumento: item.documento,
                    doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                    doco_URLImagen: item.imagen
                }))
            };
            const jsonDatos = JSON.stringify(documentos);
      
            let datos = {
                peju_Id: id,
                doco_URLImagen: jsonDatos,
                usua_UsuarioCreacion: user['uuid'],
                doco_FechaCreacion: instance.formatFechaHora(new Date()),
            }
          
            const response = await axiosInstance.post('DocumentosContratos/InsertarDocuPersonaJuridica', datos);
           
            return response;
        } catch (error) {
            
            
        }
    }

    async function cargarDocumentos(id) {
        try {
            // const datos = {
            //     peju_Id: data["id"],
            //     pers_RTN: data["pers_Id"].replace(/\s+/g, ' '),
            //     ofic_Id: data.oficina["value"],
            //     escv_Id: data.estadocivil["value"],
            //     ofpr_Id: data.oficio["value"],
            //     usua_UsuarioModificacion: user['uuid'],
            //     peju_FechaModificacion: instance.formatFechaHora(new Date()),
            // }
         
            const response = await axiosInstance.get(`DocumentosContratos/CargarDocumentosJuridica?peju_Id=${id}`);
            return response?.data?.data;
        } catch(error) {
            
        }
    }

    async function editar(data) {
        try {
            const datos = {
                peju_Id: data["id"],
                pers_RTN: data["pers_Id"].replace(/\s+/g, ' '),
                pers_Nombre: data["pers_Nombre"].trim(),
                ofic_Id: data.oficina["value"],
                escv_Id: data.estadocivil["value"],
                ofpr_Id: data.oficio["value"],
                usua_UsuarioModificacion: user['uuid'],
                peju_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post("PersonaJuridica/Editar", datos);
            return response;
        } catch {
            
            
        }
    }

    async function eliminarDocumentos(id) {
        try {
            const response = await axiosInstance.post(`DocumentosContratos/EliminarByPeju_Id?id=${id}`);
            return response.data.data;
        } catch(error) {
            ;
        }
    }

    async function finalizar(id) {
        try {
          const response = await axiosInstance.post(`PersonaJuridica/FinalizarContratoJuridica?peju_Id=${id}`);
          return response.data.data;
        } catch(error) {
            ;
        }
    }
        
    async function eliminar(id1, id2) {
        try {
          const response = await axiosInstance.post(`PersonaJuridica/EliminarJuridica?peju_Id=${id1}&pers_Id=${id2}`);
          return response.data.data;
        } catch(error) {
            ;
        }
    }

    return {
        listar,
        creartab1,
        creartab2,
        creartab3,
        creartab4,
        creartab5,
        editar,
        MakeAleatoryCode,
        EnviarCorreo,
        EnviarCorreo2,
        crearTiposDocumentos,
        cargarDocumentos,
        ExportData,
        eliminarDocumentos,
        PersonasList,
        DocumentosList,
        finalizar,
        eliminar
    };
}

export default PersonaJuridicaService