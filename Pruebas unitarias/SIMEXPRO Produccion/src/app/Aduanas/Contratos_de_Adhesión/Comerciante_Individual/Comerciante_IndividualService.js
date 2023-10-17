import axios from 'axios';
import instance from 'src/app/auth/services/jwtService/jwtService';

function Comerciante_IndividualService() {

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
            let datos = { token: tokenGenerate, user: user['data']['displayName'], email: data["coin_CorreoElectronico"] };

            let SendMail = {
                service_id: 'service_iugt032',
                template_id: 'template_bcsxrvx',
                user_id: 'V1Ybz5MWRaNCDOj5F',
                template_params: {
                    to_name: user['data']['displayName'],
                    message: tokenGenerate,
                    send_to: data["coin_CorreoElectronico"],
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
            let datos = { token: tokenGenerate, user: user['data']['displayName'], email: data["coin_CorreoElectronicoAlternativo"] };

            let SendMail = {
                service_id: 'service_iugt032',
                template_id: 'template_bcsxrvx',
                user_id: 'V1Ybz5MWRaNCDOj5F',
                template_params: {
                    to_name: user['data']['displayName'],
                    message: tokenGenerate,
                    send_to: data["coin_CorreoElectronicoAlternativo"],
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


    async function listar() {
        try {
            const response = await axiosInstance.get('ComercianteIndividual/Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    coin_Id: item.coin_Id,
                    pers_Id: item.pers_Id,
                    pers_RTN: item.pers_RTN,
                    pers_Nombre: item.pers_Nombre,
                    escv_Id: item.escv_Id,
                    escv_Nombre: item.escv_Nombre,
                    ofic_Id: item.ofic_Id,
                    ofic_Nombre: item.ofic_Nombre,
                    ofpr_Id: item.ofpr_Id,
                    ofpr_Nombre: item.ofpr_Nombre,
                    pers_FormaRepresentacion: item.pers_FormaRepresentacion,
                    colo_Id: item.colo_Id,
                    colo_Nombre: item.colo_Nombre,
                    ciud_Id: item.ciud_Id,
                    ciud_Nombre: item.ciud_Nombre,
                    pvin_Id: item.pvin_Id,
                    pvin_Codigo: item.pvin_Codigo,
                    pvin_Nombre: item.pvin_Nombre,
                    pais_Id: item.pais_Id,
                    pais_Codigo: item.pais_Codigo,
                    pais_Nombre: item.pais_Nombre,
                    formaRepresentacionDesc: item.formaRepresentacionDesc,
                    estadoCivilRepresentante: item.estadoCivilRepresentante,
                    pers_escvRepresentante: item.pers_escvRepresentante,
                    pers_OfprRepresentante: item.pers_OfprRepresentante,
                    oficioProfesRepresentante: item.oficioProfesRepresentante,
                    coin_PuntoReferencia: item.coin_PuntoReferencia,
                    coin_ColoniaRepresentante: item.coin_ColoniaRepresentante,
                    coin_NumeroLocalApart: item.coin_NumeroLocalApart,
                    coin_PuntoReferenciaReprentante: item.coin_PuntoReferenciaReprentante,
                    coin_TelefonoCelular: item.coin_TelefonoCelular,
                    coin_TelefonoFijo: item.coin_TelefonoFijo,
                    coin_CorreoElectronico: item.coin_CorreoElectronico,
                    coin_CorreoElectronicoAlternativo: item.coin_CorreoElectronicoAlternativo,
                    alde_Nombre: item.alde_Nombre,
                    aldeaNombreRepresentante: item.aldeaNombreRepresentante,
                    ciudadNrepresentante: item.ciudadNrepresentante,
                    pvin_IdRepresentante: item.pvin_IdRepresentante,
                    pvin_CodigoRepresentante: item.pvin_CodigoRepresentante,
                    pvin_NombreRepresentante: item.pvin_NombreRepresentante,
                    coloniaNombreRepresentante: item.coloniaNombreRepresentante,
                    alde_Id: item.alde_Id,
                    coin_CiudadRepresentante: item.coin_CiudadRepresentante,
                    coin_AldeaRepresentante: item.coin_AldeaRepresentante,
                    coin_NumeroLocalApart: item.coin_NumeroLocalApart,
                    coin_coloniaIdRepresentante: item.coin_coloniaIdRepresentante,
                    coin_NumeroLocaDepartRepresentante: item.coin_NumeroLocaDepartRepresentante,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    coin_FechaCreacion: item.coin_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    coin_FechaModificacion: item.coin_FechaModificacion,
                    coin_Estado: item.coin_Estado,
                    coin_Finalizacion: item.coin_Finalizacion

                };
            });
            return data;
        } catch (error) {
            
            
            
        }
    }

    async function ExportData() {
        try {
            const response = await axiosInstance.get("ComercianteIndividual/Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    pers_RTN: item.pers_RTN,
                    ofpr_Nombre: item.ofpr_Nombre,
                    ofic_Nombre: item.ofic_Nombre,
                };
            });
            
            return data;
        }
        catch (error) {
            
            
        }
    };

    async function crearTap1(data) {
        
        let representacion = false;
        try {
            if (data.pers_FormaRepresentacion == "S") {
                representacion = true;
            }
            else {
                representacion = false;
            }
            let datos = {
                pers_RTN: data["pers_RTN"].trim().replace(/\s+/g, ' '),
                pers_Nombre: data["pers_Nombre"].replace(/\s+/g, ' '),
                ofic_Id: data.oficina["value"],
                escv_Id: data.estadosCiviles["value"],
                ofpr_Id: data.oficio["value"],
                pers_FormaRepresentacion: representacion,
                pers_escvRepresentante: data.estadocivilrep == undefined ? 0 : data.estadocivilrep["value"],
                pers_OfprRepresentante: data.oficiorep == undefined ? 0 : data.oficiorep["value"],
                usua_UsuarioCreacion: user['uuid'],
                coin_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('ComercianteIndividual/Insertar', datos);
            return response;
        } catch (error) {
            
        }
    }

    async function crearTap2(data, id) {
        try {
            let datos = {
                coin_Id: id,
                coin_NumeroLocalApart: data["coin_NumeroLocalApart"],
                coin_PuntoReferencia: data["coin_PuntoReferencia"],
                ciud_Id: data.ciudad["value"],
                alde_Id: data.aldea == null ? 0 : data.aldea["value"],
                colo_Id: data.colonia["value"],
                usua_UsuarioModificacion: user['uuid'],
                coin_FechaModificacion:  instance.formatFechaHora(new Date())
            }
            
            const response = await axiosInstance.post('ComercianteIndividual/InsertarTap2', datos);
          
            return response;
        } catch (error) {
            
            
        }
    }


    async function crearTap3(data, id) {
        try {
            let datos = {

                coin_Id: id,
                coin_NumeroLocaDepartRepresentante: data["coin_NumeroLocaDepartRepresentante"],
                coin_PuntoReferenciaReprentante: data["coin_PuntoReferenciaReprentante"],
                coin_CiudadRepresentante: data.ciudadRep["value"],
                coin_AldeaRepresentante: data.aldeaRep == null ? 0 : data.aldeaRep["value"],
                coin_coloniaIdRepresentante: data.coloniaRep["value"],
                usua_UsuarioModificacion: user['uuid'],
                coin_FechaModificacion:  instance.formatFechaHora(new Date())
            }
            const response = await axiosInstance.post('ComercianteIndividual/InsertarTap3', datos);
            return response;
        } catch (error) {
            
            
        }
    }



    async function crearTap4(data, id) {
        try {
            let datos = {
                coin_Id: id,
                coin_TelefonoCelular: data["coin_TelefonoCelular"],
                coin_TelefonoFijo: data["coin_TelefonoFijo"],
                coin_CorreoElectronico: data["coin_CorreoElectronico"],
                coin_CorreoElectronicoAlternativo: data["coin_CorreoElectronicoAlternativo"],
                usua_UsuarioModificacion: user['uuid'],
                coin_FechaModificacion:  instance.formatFechaHora(new Date())
            }
            const response = await axiosInstance.post('ComercianteIndividual/InsertarTap4', datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function crearTap5(id, Archivos) {
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
                coin_Id: id,
                doco_URLImagen: jsonDatos,
                usua_UsuarioCreacion: user['uuid'],
                doco_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            
            const response = await axiosInstance.post('DocumentosContratos/InsertarDocuComerciante', datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function editarTap5(id, Archivos, formaRep) {
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
              coin_Id: id,
              doco_URLImagen: jsonDatos,
              usua_UsuarioModificacion: user['uuid'],
              doco_FechaModificacion: instance.formatFechaHora(new Date()),
              formaRepresentacion: formaRep
          }
          const response = await axiosInstance.post('DocumentosContratos/EditarDocuComerciante', datos);
          return response;
      } catch (error) {
          
          
      }
  }


    async function ciudadDDL() {
        try {

            const response = await axiosInstance.get("Ciudades/Listar?ciud_EsAduana=" + user["esAduana"].toString());
            const ciudadesByProvincia = {};
            response.data.data.forEach(ciudad => {
                const provinciaNombre = ciudad.pvin_Nombre;
                if (!ciudadesByProvincia[provinciaNombre]) {
                    ciudadesByProvincia[provinciaNombre] = [];
                }
                ciudadesByProvincia[provinciaNombre].push({
                    value: ciudad.ciud_Id,
                    label: ciudad.ciud_Nombre,
                    provincia: ciudad.pvin_Nombre
                });
            });

            const groupedOptions = Object.entries(ciudadesByProvincia).map(([provincia, ciudades]) => ({
                label: provincia,
                options: ciudades
            }));
            return groupedOptions;
        } catch (error) {
            
            
        }
    }

    async function Estadosciviles() {
        try {
            const response = await axiosInstance.get("EstadosCiviles/Listar?escv_EsAduana=" + user["esAduana"].toString()); //copiar url despues del endpoint
            const data = response.data.data.map((item) => {
                return {
                    value: item.escv_Id,
                    label: `${item.escv_Nombre}`,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }


    async function ColoniasPorCiudad(id) {
        try {
            const response = await axiosInstance.get("Colonias/FiltrarPorCiudad?ciud_Id=" + id);
            const data = response.data.data.map((item) => {
                return {
                    value: item.colo_Id,
                    label: `${item.colo_Nombre}`,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function aldeaPorCiudad(id) {
        try {
            const response = await axiosInstance.get("Aldea/FiltrarPorCiudades?alde_Id=" + id);
            const data = response.data.data.map((item) => {
                return {
                    value: item.alde_Id,
                    label: `${item.alde_Nombre}`,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function PersonasList() {
        try {
            const response = await axiosInstance.get("Personas/Listar");
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
            const response = await axiosInstance.get("DocumentosContratos/Listar");
            const data = response.data.data.map((item) => {
                return {
                    doco_Id: item.doco_Id,
                    coin_Id: item.coin_Id,
                    pers_RTN: item.pers_RTN,
                    coin_CorreoElectronico: item.coin_CorreoElectronico,
                    coin_TelefonoFijo: item.coin_TelefonoFijo,
                    peju_Id: item.peju_Id,
                    doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                    doco_TipoDocumento: item.doco_TipoDocumento,
                    doco_NombreImagen: item.doco_NombreImagen,
                    doco_URLImagen: item.doco_URLImagen,
                };
            });
            return data;
        } catch (error) {
            
            
        }
    }

    async function ColoniasList() {
        try {
            const response = await axiosInstance.get("Colonias/Listar");
            const data = response.data.data.map((item) => {
                return {
                    colo_Id: item.colo_Id,
                    colo_Nombre: item.colo_Nombre,

                };
            });
            return data;
        }
        catch (error) {
            
            
        }
    }


    async function EditarTab1(data, pers, coin) {
        let representacion = false;
        try {
            if (data.pers_FormaRepresentacion == "S") {
                representacion = true;
            }
            else {
                representacion = false;
            }
            let datos = {
                coin_Id: coin,
                pers_Id: pers,
                pers_RTN: data["pers_RTN"].trim().replace(/\s+/g, ' '),
                pers_Nombre: data["pers_Nombre"].replace(/\s+/g, ' '),
                ofic_Id: data.oficina["value"],
                escv_Id: data.estadosCiviles["value"],
                ofpr_Id: data.oficio["value"],
                pers_FormaRepresentacion: representacion,
                pers_escvRepresentante: data.estadocivilrep == undefined ? 0 : data.estadocivilrep["value"],
                pers_OfprRepresentante: data.oficiorep == undefined ? 0 : data.oficiorep["value"],
                usua_UsuarioModificacion: user['uuid'],
                coin_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('ComercianteIndividual/Editar', datos);
            return response;
        } catch (error) {
            
        }
    }


    async function cargarDocumentos(id) {
        try {
            const response = await axiosInstance.get(`DocumentosContratos/CargarDocumentosComerciante?coin_Id=${id}`);
            return response?.data?.data;
        } catch (error) {
            
        }
    }


    async function eliminarDocumentos(id) {
        try {
            const response = await axiosInstance.post(`DocumentosContratos/EliminarByCoin_Id?id=${id}`);
            return response.data.data;
        } catch (error) {
            ;
        }
    }


    async function eliminar(id1, id2) {
        try {
            const response = await axiosInstance.post(`ComercianteIndividual/Eliminar?coin_Id=${id1}&pers_Id=${id2}`);
            return response.data.data;
        } catch (error) {
            ;
        }
    }

    async function finalizar(id) {
        try {
            const response = await axiosInstance.post(`ComercianteIndividual/FinalizarContrato?coin_Id=${id}`);
            return response.data.data;
        } catch (error) {
            ;
        }
    }


    return {
        listar,
        crearTap1,
        ciudadDDL,
        Estadosciviles,
        aldeaPorCiudad,
        ColoniasPorCiudad,
        PersonasList,
        crearTap2,
        crearTap3,
        crearTap4,
        MakeAleatoryCode,
        EnviarCorreo,
        EnviarCorreo2,
        EditarTab1,
        crearTap5,
        DocumentosList,
        ColoniasList,
        cargarDocumentos,
        eliminarDocumentos,
        eliminar,
        finalizar,
        ExportData,
        editarTap5
    };

}

export default Comerciante_IndividualService;