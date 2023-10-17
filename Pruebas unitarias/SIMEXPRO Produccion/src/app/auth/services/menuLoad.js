import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

function MenuLoad() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = process.env.REACT_APP_API_URL + "api/RolesPorPantallas/";

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });

  async function dibujar(data) {
    try {
      let seguridadMapeada = null;
      let ProduccionMapeada = null;
      let AduanaMapeada = null;
      let GeneralMapeada = null;
      const customHeaders = {
        XApiKey: instance.extraerToken(),
      };
      let datos = {
        role_Id: data["roleId"],
      };
      const response = await axiosInstance.put("DibujarMenu", datos, {
        headers: customHeaders,
      });
      if (response?.data?.data) {
        var PantallasSeguridad = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Acce";
        });
        var PantallasProduccion = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Prod";
        });
        var PantallasAduana = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Adua";
        });
        var PantallasGeneral = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Gral";
        });

        if (PantallasSeguridad.length > 0) {
          var pantallas = PantallasSeguridad.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          seguridadMapeada = {
            id: "Acesso",
            title: "Acesso",
            type: "group",
            icon: "material-outline:content_cut",
            translate: "SEGURIDAD",
            children: [
              {
                id: "Seguridad",
                title: "Seguridad",
                type: "collapse",
                icon: "material-outline:content_cut",
                translate: "Acceso",
                children: pantallas,
              },
            ],
          };
        }

        if (PantallasProduccion.length > 0) {
          var pantallas = PantallasProduccion.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          ProduccionMapeada = {
            id: "Produccion",
            title: "Produccion",
            type: "group",
            icon: "material-outline:content_cut",
            translate: "Produccion",
            children: [
              {
                id: "Produccion",
                title: "Produccion",
                type: "collapse",
                icon: "material-outline:store",
                translate: "Produccion",
                children: pantallas,
              },
            ],
          };
        }

        if (PantallasAduana.length > 0) {
          var pantallas = PantallasAduana.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          AduanaMapeada = {
            id: "Aduanas",
            title: "Aduanas",
            type: "group",
            icon: "material-twotone:find_in_page",
            translate: "Aduanas",
            children: [
              {
                id: "Aduanas",
                title: "Aduanas",
                type: "collapse",
                icon: "material-twotone:find_in_page",
                translate: "Aduanas",
                children: pantallas,
              },
            ],
          };
        }

        if (PantallasGeneral.length > 0) {
          var pantallas = PantallasGeneral.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          GeneralMapeada = {
            id: "Generales",
            title: "Generales",
            type: "group",
            icon: "heroicons-outline:bookmark-alt",
            translate: "Generales",
            children: [
              {
                id: "Generales",
                title: "Generales",
                type: "collapse",
                icon: "heroicons-outline:bookmark-alt",
                translate: "Generales",
                children: pantallas,
              },
            ],
          };
        }
      }

      return [
        seguridadMapeada,
        GeneralMapeada,
        ProduccionMapeada,
        AduanaMapeada,
      ];
    } catch (error) {
      throw error;
    }
  }

  async function dibujado(data) {
    try {
      let asignadas = [];
      let noAsignadas = [];
      let MenuEliminar = [];

      const customHeaders = {
        XApiKey: instance.extraerToken(),
      };
      const response = await axiosInstance.get("DibujarMenu?role_Id="+data['roleId'], {
        headers: customHeaders,
      });
      if (response?.data?.data) {
        if (!data["esAdmin"]) {
        // if (true) {
          noAsignadas = response.data.data.filter(function (objeto) {
            return objeto.asignada === "No asignada";
          });
          asignadas = response.data.data.filter(function (objeto) {
            return objeto.asignada === "Asignada";
          });
        }else{
          noAsignadas = response.data.data.filter(function (objeto) {
            return objeto.pant_EsAduana !== data.esAduana && objeto.pant_EsAduana !== null;
          });
          asignadas = response.data.data.filter(function (objeto) {
            return objeto.pant_EsAduana === data.esAduana || objeto.pant_EsAduana === null;
          });
        }

        asignadas.some(objeto => objeto.pant_Esquema === "Gral")? null : MenuEliminar.push("Gral");
        asignadas.some(objeto => objeto.pant_Esquema === "Prod")? null : MenuEliminar.push("Prod");
        asignadas.some(objeto => objeto.pant_Esquema === "Acce")? null : MenuEliminar.push("Acce");
        asignadas.some(objeto => objeto.pant_Esquema === "Adua")? null : MenuEliminar.push("Adua");
        asignadas.some(objeto => objeto.pant_Esquema === "Repo")? null : MenuEliminar.push("Repo");
        asignadas.some(objeto => objeto.pant_Esquema === "Graf")? null : MenuEliminar.push("Graf");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Acceso")? null : MenuEliminar.push("Acceso");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Administración")? null : MenuEliminar.push("Administracion");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Contrato de Adhesión")? null : MenuEliminar.push("ContratoAdhesion");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Facturación")? null : MenuEliminar.push("Facturacion");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Generales")? null : MenuEliminar.push("Generales");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Impuestos")? null : MenuEliminar.push("Impuestos");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Inventario")? null : MenuEliminar.push("Inventario");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Maquinaria")? null : MenuEliminar.push("Maquinaria");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Personas")? null : MenuEliminar.push("Personas");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Prendas")? null : MenuEliminar.push("prendas");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Producción")? null : MenuEliminar.push("Produccion");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Transporte")? null : MenuEliminar.push("Transporte");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Ubicaciones")? null : MenuEliminar.push("ubicaciones");
        asignadas.some(objeto => objeto.pant_Subcategoria === "Reportes")? null : MenuEliminar.push("Reportes");


      }

      return {
        asignadas: asignadas,
        noAsignadas: noAsignadas,
        menus: MenuEliminar,
      };
    } catch (err) {

      throw Error(false);
    }
  }

  return {
    dibujar,
    dibujado,
  };
}

// const menuLoad = new MenuLoad();
export default MenuLoad;
