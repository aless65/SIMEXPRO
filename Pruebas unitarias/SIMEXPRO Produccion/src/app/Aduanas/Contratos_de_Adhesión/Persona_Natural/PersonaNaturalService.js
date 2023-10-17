import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

import * as filestack from "filestack-js";
import Item from "antd/es/list/Item";


function PersonaNaturalService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };
  const baseURL = process.env.REACT_APP_API_URL + "api/PersonaNatural/";

  const baseURLPersona = process.env.REACT_APP_API_URL + "api/Personas/";
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });

  const axiosInstancePersona = axios.create({
    baseURL: baseURLPersona,
    headers: customHeaders,
  });

  const client = filestack.init("Abp6Y2MZNTla3VKwreDiez");
  const user = JSON.parse(localStorage.getItem("user"));

  function MakeAleatoryCode(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }


  async function ExportData(){
    try{
      const response = await axiosInstance.get("Listar");
        const data = response.data.data.map((item, index) => {
            return{
              key: index + 1,
              cliente: item.cliente,
              pena_RTN: item.pena_RTN,
              pena_TelefonoCelular: item.pena_TelefonoCelular,
              pena_DNI: item.pena_DNI,
            };
        });
        return data;
    }
    catch (error)
    {
        
        
    }
};


  async function EnviarCorreo(data) {
    try {
      let tokenGenerate = MakeAleatoryCode(6);
      let datos = {
        token: tokenGenerate,
        user: user["data"]["displayName"],
        email: data["pena_CorreoElectronico"],
      };

      let SendMail = {
        service_id: 'service_iugt032',
        template_id: 'template_bcsxrvx',
        user_id: 'V1Ybz5MWRaNCDOj5F',
        template_params: {
          to_name: user["data"]["displayName"],
          message: tokenGenerate,
          send_to: data["pena_CorreoElectronico"],
        },
      };

      const res = await axios.post(
        `https://api.emailjs.com/api/v1.0/email/send`,
        SendMail
      );

      if (res["status"] == 200) {
        return datos;
      } else {
        return -1;
      }
    } catch (error) {
      return error;
    }
  }
  async function EnviarCorreo2(data) {
    try {
      let tokenGenerate = MakeAleatoryCode(6);
      let datos = {
        token: tokenGenerate,
        user: user["data"]["displayName"],
        email: data["pena_CorreoAlternativo"],
      };

      let SendMail = {
        service_id: 'service_iugt032',
        template_id: 'template_bcsxrvx',
        user_id: 'V1Ybz5MWRaNCDOj5F',
        template_params: {
          to_name: user["data"]["displayName"],
          message: tokenGenerate,
          send_to: data["pena_CorreoAlternativo"],
        },
      };

      const res = await axios.post(
        `https://api.emailjs.com/api/v1.0/email/send`,
        SendMail
      );

      if (res["status"] == 200) {
        return datos;
      } else {
        return -1;
      }
    } catch (error) {
      return error;
    }
  }

  async function SubidaArchivos(file) {
    
    try {
        const data = await client.upload(file);
        return data.url;
    } catch (error) {
      
    }
  }

  async function listar() {
    try {
      const response = await axiosInstance.get("Listar");
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          pena_Id: item.pena_Id,
          pers_Id: item.pers_Id,
          cliente: item.cliente,
          pena_DireccionExacta: item.pena_DireccionExacta,
          ciud_Id: item.ciud_Id,
          ciud_Nombre: item.ciud_Nombre,
          pvin_Id: item.pvin_Id,
          pvin_Nombre: item.pvin_Nombre,
          ofic_Nombre: item.ofic_Nombre,
          pena_TelefonoFijo: item.pena_TelefonoFijo,
          pena_TelefonoCelular: item.pena_TelefonoCelular,
          pena_CorreoElectronico: item.pena_CorreoElectronico,
          pena_CorreoAlternativo: item.pena_CorreoAlternativo,
          pena_RTN: item.pena_RTN,
          pena_ArchivoRTN: item.pena_ArchivoRTN,
          pena_DNI: item.pena_DNI,
          pena_ArchivoDNI: item.pena_ArchivoDNI,
          pena_NumeroRecibo: item.pena_NumeroRecibo,
          pena_ArchivoNumeroRecibo: item.pena_ArchivoNumeroRecibo,

          pena_NombreArchDNI: item.pena_NombreArchDNI,
          pena_NombreArchRTN: item.pena_NombreArchRTN,
          pena_NombreArchRecibo: item.pena_NombreArchRecibo,
           //
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          pena_FechaCreacion: item.pena_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          pena_FechaModificacion: item.pena_FechaModificacion,
          pena_Finalizado: item.pena_Finalizado,
          pena_Estado: item.pena_Estado,
          usuarioCreacion: item.usuarioCreacion,
          usuarioModificacion: item.usuarioModificacion,

          cliente: item.cliente,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function listarPersona(pers_IdD) {
    try {
      const response = await axiosInstancePersona.get("Listar")
      //Buscar la persona
      const PersonaFiltrada = response.data.data.find(
        (option) => option.pers_Id === pers_IdD
      );
      return PersonaFiltrada;
    } catch (error) {
      
      
    }
  }

  async function crear(data, data2, pers_IdD) {
    try {
      let datos = {
        pers_Id: pers_IdD,
        pena_DireccionExacta: data["pena_DireccionExacta"].trim(),
        ciud_Id: data.ciudad.value,
        pena_TelefonoFijo: data["pena_TelefonoFijo"],
        pena_TelefonoCelular: data["pena_TelefonoCelular"],
        pena_CorreoElectronico: data["pena_CorreoElectronico"].trim(),
        pena_CorreoAlternativo: data["pena_CorreoAlternativo"],
        pena_RTN: data2["pena_RTN"],
        // pena_ArchivoRTN: "data[contiene]",
        pena_ArchivoRTN: data["pena_ArchivoRTN"],
        pena_DNI: data2["pena_DNI"],
        // pena_ArchivoDNI: "data[pena_ArchivoDNI]",
        pena_ArchivoDNI: data["pena_ArchivoDNI"],
        pena_NumeroRecibo: data2["pena_NumeroRecibo"].trim(),
        // pena_ArchivoNumeroRecibo: "data[pena_ArchivoNumeroRecibo]",
        pena_ArchivoNumeroRecibo: data["pena_ArchivoNumeroRecibo"],
        //
        pena_NombreArchDNI: data2["pena_NombreArchDNI"],
        pena_NombreArchRTN: data2["pena_NombreArchRTN"],
        pena_NombreArchRecibo: data2["pena_NombreArchRecibo"],
        //
        usua_UsuarioCreacion: user["uuid"],
        pena_FechaCreacion: new Date(),
      };
      const response = await axiosInstance.post("Insertar", datos);
      return response;
    } catch (error) {
      
      
    }
  }

  async function crearPersona(data, data2) {
    try {
      let datos = {
        pers_RTN: data["pena_RTN"],
        ofic_Id: data2.oficina.value,
        escv_Id: data2.estado.value,
        ofpr_Id: data2.oficio.value,
        pers_Nombre: data2.pers_Nombre,

        pers_FormaRepresentacion: true,
        pers_escvRepresentante: 1,
        pers_OfprRepresentante: 1,


        usua_UsuarioCreacion: user["uuid"],
        pers_FechaCreacion: new Date(),
      };
      const response = await axiosInstancePersona.post("Insertar", datos);
      return response;
    } catch (error) {
      
      
    }
  }

  async function editar(data, data2,urls) {
    try {
      let datos = {
        pena_Id: data["pena_Id"],
        pers_Id: data["pers_Id"],
        pena_DireccionExacta: data["pena_DireccionExacta"].trim(),
        ciud_Id: data.ciudad.value,
        pena_TelefonoFijo: data["pena_TelefonoFijo"],
        pena_TelefonoCelular: data["pena_TelefonoCelular"],
        pena_CorreoElectronico: data["pena_CorreoElectronico"].trim(),
        pena_CorreoAlternativo: data["pena_CorreoAlternativo"],
        pena_RTN: data2["pena_RTN"],
        pena_ArchivoRTN: urls && urls.length > 0 ? urls[0] || data.pena_ArchivoRTN : data.pena_ArchivoRTN,

        // pena_ArchivoRTN: data["pena_ArchivoRTN"],
        pena_DNI: data2["pena_DNI"],
        pena_ArchivoDNI: urls && urls.length > 1 ? urls[1] || data.pena_ArchivoDNI : data.pena_ArchivoDNI,

        // pena_ArchivoDNI: data["pena_ArchivoDNI"],
        pena_NumeroRecibo: data2["pena_NumeroRecibo"].trim(),
        
        pena_ArchivoNumeroRecibo: "data[pena_ArchivoNumeroRecibo]",
        pena_ArchivoNumeroRecibo: urls && urls.length > 2 ? urls[2] || data.pena_ArchivoNumeroRecibo : data.pena_ArchivoNumeroRecibo,

        pena_NombreArchDNI: data2["pena_NombreArchDNI"] == undefined ? data.pena_NombreArchDNI : data2["pena_NombreArchDNI"],
        pena_NombreArchRTN: data2["pena_NombreArchRTN"] == undefined ? data.pena_NombreArchRTN : data2["pena_NombreArchRTN"],
        pena_NombreArchRecibo: data2["pena_NombreArchRecibo"] == undefined ? data.pena_NombreArchRecibo : data2["pena_NombreArchRecibo"],

        usua_UsuarioModificacion: user["uuid"],
        pena_FechaModificacion: new Date(),
      };
      const response = await axiosInstance.post("Editar", datos);
      return response;
    } catch (error) {
      
    }
  }

  async function editarPersona(data, data2) {
    try {
      let datos = {
        pers_Id: data2["pers_Id"],
        pers_RTN: data2["pena_RTN"],
        ofic_Id: data.oficina.value,
        escv_Id: data.estado.value,
        ofpr_Id: data.oficio.value,
        pers_Nombre: data.pers_Nombre,


        pers_FormaRepresentacion: true,
        pers_escvRepresentante: 1,
        pers_OfprRepresentante: 1,
        usua_UsuarioModificacion: user["uuid"],
        pena_FechaModificacion: new Date(),
      };
      const response = await axiosInstancePersona.post("Editar", datos);
      return response;
    } catch (error) {
      
      
    }
  }

  async function Finalizar(data) {
    try {
      let datos = {
        pena_Id: data,
      };
      const response = await axiosInstance.post("Finalizar", datos);
      return response;
    } catch (error) {
      
    }
  }

  return {
    listar,
    crear,
    crearPersona,
    listarPersona,
    editarPersona,
    editar,
    SubidaArchivos,
    MakeAleatoryCode,
    EnviarCorreo,
    EnviarCorreo2,
    Finalizar,
    ExportData
  };
}

export default PersonaNaturalService;