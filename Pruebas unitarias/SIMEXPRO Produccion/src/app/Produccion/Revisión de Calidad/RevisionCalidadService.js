import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function RevisionCalidadService() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = process.env.REACT_APP_API_URL + "api/RevisionDeCalidad/";

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  async function listar() {
    try {
      const response = await axiosInstance.get("Listar");
      const data = response.data.data.map((item, index) => {
        return {
          key: item.reca_Id,
          row: index + 1,
          reca_Id: item.reca_Id,
          ensa_Id: item.ensa_Id,
          reca_Descripcion: item.reca_Descripcion,
          reca_Cantidad: item.reca_Cantidad,
          reca_Scrap: item.reca_Scrap,
          reca_FechaRevision: item.reca_FechaRevision,
          reca_Imagen: item.reca_Imagen,
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          reca_FechaCreacion: item.reca_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          reca_FechaModificacion: item.reca_FechaModificacion,
          reca_Estado: item.reca_Estado,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Nuevolistar(ensa_Id) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get(`NuevoListar?ensa_Id=${ensa_Id? ensa_Id : 0 }`);
      const data = response.data.data.map((item, index) => {
        
        let totalProducido = 0
        JSON.parse(item.detalles? item.detalles: "[]").forEach((item) => {
          totalProducido += item.reca_Cantidad
        })
        
        return {
          key: item.ensa_Id,
          row: index + 1,
          ensa_Id: item.ensa_Id,
          ensa_Cantidad: item.ensa_Cantidad,
          empl_Id: item.empl_Id,
          empl_NombreCompleto: item.empl_NombreCompleto,
          code_Id: item.code_Id,
          code_Sexo: item.code_Sexo,
          esti_Id: item.esti_Id,
          esti_Descripcion: item.esti_Descripcion,
          ensa_FechaInicio: item.ensa_FechaInicio,
          ensa_FechaLimite: item.ensa_FechaLimite,
          ppro_Id: item.ppro_Id,
          proc_Id: item.proc_Id, 
          proc_Descripcion: item.proc_Descripcion,
          modu_Id: item.modu_Id,
          modu_Nombre: item.modu_Nombre,
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          usurioCreacionNombre: item.usurioCreacionNombre,
          ensa_FechaCreacion: item.ensa_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          usuarioModificacionNombre: item.usuarioModificacionNombre,
          ensa_FechaModificacion: item.ensa_FechaModificacion,
          ensa_Estado: item.ensa_Estado,
          detalles: JSON.parse(item.detalles? item.detalles: "[]"),
          totalProducido: totalProducido
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function ExportData(ensa_Id) {
    try {
      const response = await axiosInstance.get(`NuevoListar?ensa_Id=${ensa_Id? ensa_Id : 0 }`);
      const data = response.data.data.map((item, index) => {
        let totalProducido = 0
        JSON.parse(item.detalles? item.detalles: "[]").forEach((item) => {
          totalProducido += item.reca_Cantidad
        })
        
        return {
          row: index + 1,
          ensa_Id: item.ensa_Id,
          ensa_Cantidad: item.ensa_Cantidad,
          empl_NombreCompleto: item.empl_NombreCompleto,
          code_Sexo: item.code_Sexo,
          esti_Descripcion: item.esti_Descripcion,
          danos: `${totalProducido}/${item.ensa_Cantidad}`,
          detalles: JSON.parse(item.detalles? item.detalles: "[]"),
        };
      });

      var array = []
      for (let i = 0; i < data.length; i++) {
        if(data[i].detalles.length != 0){
          for (let j = 0; j < data[i].detalles.length; j++) {

              if(data[i].ensa_Id == data[i].detalles[j].ensa_Id ){
                array[i] += ` {Revisión No.: ${j +1}, Descripción: ${data[i].detalles[j].reca_Descripcion}, Cantidad: ${data[i].detalles[j].reca_Cantidad}, Fecha de revisión: ${data[i].detalles[j].reca_FechaRevision.slice(0, 10)}, Contiene scrap: ${data[i].detalles[j].reca_Scrap == true ? 'Si' : 'No'}} `;
              }
          }
        }else{
          array.push('');
        }
        
        data[i].detalles = array[i].toString().replace('undefined', '');  
      }
      
      const finalData = data.map((item) =>{
        return{
          row: item.row,
          ensa_Cantidad: item.ensa_Cantidad,
          empl_NombreCompleto: item.empl_NombreCompleto,
          code_Sexo: item.code_Sexo,
          esti_Descripcion: item.esti_Descripcion,
          danos: item.danos,
          detalles: item.detalles,
        }
      })
      return finalData;
    } catch (error) {
      
      
    }
  }

  async function crear(data) {
    try {
      const ImageUpload = await SubirImagen(data["image"]);
      if (ImageUpload?.data?.url) {
        const urlImagen = ImageUpload.data.url.toString();
        let datos = {
          ensa_Id: data['ensa_Id'],
          reca_Descripcion: data["observaciones"],
          reca_Cantidad: data["cantidad"],
          reca_Scrap: data["scrap"],
          reca_FechaRevision: data["fechaRevision"],
          reca_Imagen: urlImagen,
          usua_UsuarioCreacion: user["uuid"],
          reca_FechaCreacion: instance.formatFechaHora(new Date()),
        };
        const response = await axiosInstance.post("Insertar", datos);
        return response;
      } else {
        return "No se pudo subir la imagen";
      }
    } catch (error) {
      
      
    }
  }

  async function editar(data) {
    try { 
      let ImageUpload = '';
      let urlImagen = '';
      if(!data.image.includes("https://i.ibb.co/")){
        ImageUpload = await SubirImagen(data["image"]);
        urlImagen = ImageUpload?.data?.url;
      }else{
        urlImagen = data["image"];
      }
      if (urlImagen) {
        let datos = {
          reca_Id: data['id'],
          ensa_Id: data['codigoproceso'],
          reca_Descripcion: data["observaciones"],
          reca_Cantidad: data["cantidad"],
          reca_Scrap: data["scrap"],
          reca_FechaRevision: data["fechaRevision"],
          reca_Imagen: urlImagen,
          usua_UsuarioModificacion: user["uuid"],
          reca_FechaModificacion: instance.formatFechaHora(new Date()),
        };
        const response = await axiosInstance.post("editar", datos);
        return response;
      } else {
        return "No se pudo subir la imagen";
      }
    } catch (error) {
      
      
    }
  }

  async function eliminar(data) {
    try {
      let datos = {
        reca_Id: data["reca_Id"],
      };
      const response = await axiosInstance.post("Eliminar", datos);
      return response;
    } catch (error) {
      
      
    }
  }

  async function SubirImagen(imageUrl) {
    //Token de la API para subir imagenes
    try {
      const apikey = process.env.REACT_APP_IMG_BB_KEY; //meter token al env

      const base64Image = imageUrl.split(",")[1]; // obtener la cadena Base64 sin el prefijo "data:image/png;base64,"
      const url = `https://api.imgbb.com/1/upload?key=${apikey}`;
      const body = new FormData();
      body.append("image", base64Image);

      let response = await fetch(url, {
        method: "POST",
        body: body,
      });

      if (!response.ok) {
        throw new Error("Error al enviar la imagen");
      }
      return await response.json();
    } catch (error) {
      
      
    }
  }

  return {
    listar,
    crear,
    editar,
    eliminar,
    ExportData,
    Nuevolistar,
  };
}

// const revisionCalidadService = new RevisionCalidadService();
export default RevisionCalidadService;
