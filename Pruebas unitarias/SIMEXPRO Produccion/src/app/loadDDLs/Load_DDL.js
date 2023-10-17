import axios from "axios";
import instance from "../auth/services/jwtService/jwtService";
import user from "../auth/services/jwtService/dataUser";

function Load_DDLs() {
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };
  const baseURL = process.env.REACT_APP_API_URL + "api/";
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders,
  });
  const user = JSON.parse(localStorage.getItem('user'))

  async function aduanas() {
    try {
      const response = await axiosInstance.get("Aduanas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.adua_Id,
          label: `${item.adua_Id} - ${item.adua_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Aldeas() {
    try {
      const response = await axiosInstance.get("Aldea/Listar"); //copiar url despues del endpoint
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

  async function ProcesosFiltrados(code_Id) {
    try {
      const response = await axiosInstance.get("ProcesoPorOrdenCompraDetalle/Listar?code_Id=" + code_Id);
      const data = response.data.data.map((item) => {
        return {
          value: item.proc_Id,
          label: `${item.proc_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }
  async function aldeaPorCiudad(id) {
    try {
      const response = await axiosInstance.get("Aldea/FiltrarPorCiudades?alde_Id=" + id); //copiar url despues del endpoint
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

  async function Areas() {
    try {
      const response = await axiosInstance.get("Areas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.tipa_Id,
          label: `${item.tipa_area} - ${item.proc_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function AsignacionesOrden() {
    try {
      const response = await axiosInstance.get("AsignacionesOrden/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.asor_Id,
          label: `${item.asor_OrdenDetId}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function BaseCalculo() {
    try {
      const response = await axiosInstance.get("BaseCalculo/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.aran_Id,
          label: `${item.arn_Codigo} - ${item.aran_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function BoletinPago() {
    try {
      const response = await axiosInstance.get("BoletinPago/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.boen_Id,
          label: `${item.liqu_Id} - ${item.duca_No_Duca}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function ColoniasPorCiudad(id) {
    try {
      const response = await axiosInstance.get("Colonias/FiltrarPorCiudad?ciud_Id=" + id); //copiar url despues del endpoint
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

  async function Categorias() {
    try {
      const response = await axiosInstance.get("Categoria/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.cate_Id,
          label: `${item.cate_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Colores() {
    try {
      const response = await axiosInstance.get("Colores/Listar"); // Copia la URL después del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.colr_Id,
          label: `- ${item.colr_Codigo} - ${item.colr_Nombre}`,
          color: `${item.colr_CodigoHtml}`,
          // (
          //   <div>
          //     <span
          //       style={{
          //         backgroundColor: item.colr_CodigoHtml,
          //         borderRadius: '50%',
          //         width: '20px',
          //         height: '20px',
          //         display: 'inline-block',
          //         marginRight: '8px',
          //       }}
          //     ></span>
          //     {`${item.colr_CodigoHtml} - ${item.colr_Codigo} - ${item.colr_Nombre}`}
          //   </div>
          // ),
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }




  async function SubCategoriasPorCategoria(id) {
    try {
      const response = await axiosInstance.get("SubCategoria/ListarByIdCategoria?cate_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.subc_Id,
          label: `${item.subc_Descripcion}`,

        };
      });
      
      return data;
    } catch (error) {
      
      
    }
  }

  async function Cargos() {
    try {
      const response = await axiosInstance.get("Cargos/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.carg_Id,
          label: `${item.carg_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function CondicionesComerciales() {
    try {
      const response = await axiosInstance.get("CondicionesComerciales/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.coco_Id,
          label: `${item.coco_Codigo} - ${item.coco_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Ciudades() {
    try {
      const response = await axiosInstance.get("Ciudades/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ciud_Id,
          label: `${item.ciud_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function CiudadesPorProvincia(id) {
    try {
      const response = await axiosInstance.get("Ciudades/CiudadesFiltradaPorProvincias?pvin_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ciud_Id,
          label: `${item.ciud_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Clientes() {
    try {
      const response = await axiosInstance.get("Clientes/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.clie_Id,
          label: `${item.clie_Nombre_O_Razon_Social}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function CodigoImpuesto() {
    try {
      const response = await axiosInstance.get("CodigoImpuesto/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.coim_Id,
          label: `${item.coim_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function ConceptoPago() {
    try {
      const response = await axiosInstance.get("ConceptoPago/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.copa_Id,
          label: `${item.copa_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }


  async function Empleados() {
    try {
      const response = await axiosInstance.get("Empleados/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.empl_Id,
          label: `${item.empl_NombreCompleto}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }


  async function PedidosProduccionDetalles() {
    try {
      const response = await axiosInstance.get('PedidosProduccionDetalles/Listar'); // copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.code_Id,
          label: `${item.code_EspecificacionEmbalaje}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function EmpleadosNoTieneUsuario() {
    try {
      const response = await axiosInstance.get("Empleados/ListarNoTieneUsuario?empl_EsAduana=" + user["esAduana"].toString()); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.empl_Id,
          label: `${item.empl_NombreCompleto}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Estadosciviles() {
    try {
      const response = await axiosInstance.get("EstadosCiviles/Listar" + (user['esAduana'] == null ? "" : "?escv_EsAduana=" + user['esAduana'])); //copiar url despues del endpoint
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

  async function Estilos() {
    try {
      const response = await axiosInstance.get("Estilos/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.esti_Id,
          label: `${item.esti_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function EstadoBoletin() {
    try {
      const response = await axiosInstance.get("EstadoBoletin/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.esbo_Id,
          label: `${item.esbo_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function EstadosMercancia() {
    try {
      const response = await axiosInstance.get("EstadoMercancias/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.merc_Id,
          label: `${item.merc_Codigo} - ${item.merc_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function FormasEnvio() {
    try {
      const response = await axiosInstance.get("FormasEnvio/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.foen_Id,
          label: `${item.foen_Codigo} - ${item.foen_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function FormasPago() {
    try {
      const response = await axiosInstance.get("FormasDePago/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.fopa_Id,
          label: `${item.fopa_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function FuncionesMaquinas() {
    try {
      const response = await axiosInstance.get("FuncionesMaquina/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.func_Id,
          label: `${item.func_Nombre}`,
        };
      });
    }
    catch (error) {
      
      
    }
  }

  async function Incoterm() {
    try {
      const response = await axiosInstance.get("Incoterm/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.inco_Id,
          label: `${item.inco_Codigo}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function ListarLugarEmbarque(code) {
    try {
      let codigo = code.trim().toUpperCase()
      const response = await axiosInstance.get('LugaresEmbarque/Listar?codigo=' + codigo);
      
      const data = response.data.data.map((item, index) => {
        return {
          value: item.emba_Id,
          label: `${item.emba_Codigo} - ${item.emba_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
    }
  }

  async function Maquinas() {
    try {
      const response = await axiosInstance.get("Maquinas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.maqu_Id,
          label: `${item.maqu_NumeroSerie}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Materiales() {
    try {
      const response = await axiosInstance.get("Materiales/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.mate_Id,
          label: `${item.mate_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function MarcasMaquinas() {
    try {
      const response = await axiosInstance.get("MarcasMaquinas/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.marq_Id,
          label: `${item.marq_Nombre}`,
        };
      });
    }
    catch (error) {
      
      
    }
  }

  async function ModelosMaquinas() {
    try {
      const response = await axiosInstance.get("/ModelosMaquinas/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.mmaq_Id,
          label: `${item.mmaq_Nombre}`,
        };
      });
      
      return data
    } catch (error) {
      
      
    }
  }

  async function Modulos() {
    try {
      const response = await axiosInstance.get("Modulos/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.modu_Id,
          label: `${item.modu_Nombre} - ${item.proc_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function Monedas() {
    try {
      const response = await axiosInstance.get("/Moneda/Listar?mone_EsAduana=" + user["esAduana"].toString()); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.mone_Id,
          label: `${item.mone_Codigo} - ${item.mone_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function OrdenCompra() {
    try {
      const response = await axiosInstance.get("OrdenCompra/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.orco_Id,
          label: `${item.clie_Nombre_Contacto} - Código ${item.orco_Codigo == null ? " " : item.orco_Codigo}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function OrdenCompraDetalle(id) {
    try {
      const response = await axiosInstance.get("OrdenCompraDetalles/Listar?orco_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.code_Id,
          label: `${item.esti_Descripcion} - ${item.code_Sexo == "F" ? "Femenino" : "Masculino"} - ${item.colr_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function PedidoOrdenDetalleFiltrar(id) {
    try {
      const response = await axiosInstance.get("PedidosProduccionDetalles/Filtrar?ppro_Id=" + id);
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          ppde_Id: item.ppde_Id,
          ppro_Id: item.ppro_Id,
          lote_Id: item.lote_Id,
          lote_Stock: item.lote_Stock,
          ppde_Cantidad: item.ppde_Cantidad,
          mate_Descripcion: item.mate_Descripcion,
          tipa_Id: item.tipa_Id,
          tipa_area: item.tipa_area,
          ppro_Estados: item.ppro_Estados,
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
          ppde_FechaCreacion: item.ppde_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          usuarioModificacionNombre: item.usuarioModificacionNombre,
          ppde_FechaModificacion: item.ppde_FechaModificacion,
          ppde_Estado: item.ppde_Estado,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function Procesos() {
    try {
      const response = await axiosInstance.get("Procesos/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.proc_Id,
          label: `${item.proc_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }
  async function NivelesComerciales() {
    try {
      const response = await axiosInstance.get("NivelesComerciales/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.nico_Id,
          label: `${item.nico_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Oficinas() {
    try {
      const response = await axiosInstance.get("Oficinas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ofic_Id,
          label: `${item.ofic_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Oficios() {
    try {
      const response = await axiosInstance.get("Oficio_Profesiones/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ofpr_Id,
          label: `${item.ofpr_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function paises() {
    try {
      const response = await axiosInstance.get("Paises/Listar" + (user['esAduana'] == null ? "" : "?pais_EsAduana=" + user['esAduana'])); //copiar url despues del endpoint
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          value: item.pais_Id,
          label: `${item.pais_Codigo} - ${item.pais_Nombre} - ${item.pais_prefijo}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Marcas() {
    try {
      const response = await axiosInstance.get("Marcas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.marc_Id,
          label: item.marc_Descripcion,
        };
      });
      return data;
    } catch (error) {
      
    }
  }

  async function ModosTransporte() {
    try {
      const response = await axiosInstance.get("ModoTransporte/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.motr_Id,
          label: item.motr_Descripcion,
        };
      });
      return data;
    } catch (error) {
      
    }
  }

  async function PedidoOrdenDetalle() {
    try {
      const response = await axiosInstance.get("PedidosOrdenDetalles/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.prod_Id,
          label: `${item.prod_Cantidad} - ${item.prod_Precio}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function PedidoOrdenDetalle2() {
    try {
      const response = await axiosInstance.get("PedidosOrden/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.peor_Codigo,
          label: `${item.peor_Codigo} -  ${item.prov_NombreCompania} - ${item.mate_Descripcion}  - ${item.prod_Cantidad}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }


  async function Proveedores() {
    try {
      const response = await axiosInstance.get("Proveedores/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.prov_Id,
          label: `${item.prov_NombreCompania}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Provincias() {
    try {
      const response = await axiosInstance.get(`Provincias/Listar?pvin_EsAduana=${user['esAduana']}`); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.pvin_Id,
          label: `${item.pvin_Codigo} - ${item.pvin_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }




  async function Impuestos() {
    try {
      const response = await axiosInstance.get("Impuestos/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.impu_Id,
          label: `${item.impu_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }


  async function ProvinciasPorPais(id) {
    try {
      const response = await axiosInstance.get("Provincias/ProvinciasFiltradaPorPais?pais_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.pvin_Id,
          label: `${item.pvin_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }
 
  async function ProvinciasFiltradaPorPaisYesAduana(id,esAduana) {
    try {
      const response = await axiosInstance.get(`Provincias/ProvinciasFiltradaPorPaisYesAduana?pais_Id=${id}&pvin_EsAduana=${esAduana}`); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.pvin_Id,
          label: `${item.pvin_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }


  async function Provincias97() {
    try {
      const response = await axiosInstance.get("Provincias/ProvinciasFiltradaPorPais?pais_Id=" + 97); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.pvin_Id,
          label: `${item.pvin_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function ModuloPorProceso(id) {
    try {
      const response = await axiosInstance.get("Procesos/Filtrar?proc_Id=" + id); //copiar url despues del endpoint

      const data = response.data.data.map((item) => {
        return {
          value: item.modu_Id,
          label: `${item.modu_Nombre} - ${item.proc_Descripcion}`,
        };
      });

      return data;
    } catch (error) {
      
      
    }
  }

  async function RegimenesAduaneros() {
    try {
      const response = await axiosInstance.get("RegimenAduanero/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.regi_Id,
          label: `${item.regi_Codigo}` + ' - ' + `${item.regi_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function Roles() {
    try {
      const response = await axiosInstance.get("Roles/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.role_Id,
          label: `${item.role_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function Tallas() {
    try {
      const response = await axiosInstance.get("Tallas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.tall_Id,
          label: `${item.tall_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function TipoEmbalaje() {
    try {
      const response = await axiosInstance.get("TipoEmbalaje/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.tiem_Id,
          label: `${item.tiem_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function TipoLiquidacion() {
    try {
      const response = await axiosInstance.get("UnidadMedidas/Listar");
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

  async function TipoIntermediario() {
    try {
      const response = await axiosInstance.get("TipoIntermediario/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.tite_Id,
          label: `${item.tite_Codigo} - ${item.tite_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function UnidadMedida() {
    try {
      const response = await axiosInstance.get("UnidadMedidas/Listar");
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

  async function MarcasMaquinas() {
    try {
      const response = await axiosInstance.get("MarcasMaquinas/Listar");

      const data = response.data.data.map((item) => {
        return {
          value: item.marq_Id,
          label: `${item.marq_Nombre}`,
        };
      });
      return data

    }
    catch (error) {
      
      
    }
  }

  async function FuncionesMaquinas() {
    try {
      const response = await axiosInstance.get("FuncionesMaquina/Listar");

      const data = response.data.data.map((item) => {
        return {
          value: item.func_Id,
          label: `${item.func_Nombre}`,
        };
      });
      return data

    }
    catch (error) {
      
      
    }
  }


  async function TipoLiquidacion() {
    try {
      const response = await axiosInstance.get("TipoLiquidacion/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.tipl_Id,
          label: `${item.tipl_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      
      
    }
  }

  async function UnidadMedida() {
    try {
      const response = await axiosInstance.get("UnidadMedidas/Listar");
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

  async function ListarLugarEmbarque(code) {
    try {
      let codigo = code.trim().toUpperCase()
      const response = await axiosInstance.get('LugaresEmbarque/Listar?codigo=' + codigo);
      const data = response.data.data.map((item, index) => {
        return {
          value: item.emba_Id,
          label: `${item.emba_Codigo} - ${item.emba_Descripcion}`
        };
      });
      return data;
    } catch (error) {
      
    }
  }

  async function Lotes() {
    try {
      const response = await axiosInstance.get("Lotes/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.lote_CodigoLote,
          label: `${item.mate_Descripcion} - ${item.colr_Nombre ? `${item.colr_Nombre} - ${item.lote_CodigoLote}`
            : `${item.lote_CodigoLote}`}`,
        };
      });
      return data
    } catch (error) {
      
      
    }
  }

  async function MultiFuncional() {
    try {
      const response = await axiosInstance.get("OrdeEnsaAcabEtiq/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.ensa_Id,
          label: `${item.empl_NombreCompleto} - ${item.ensa_Id}`
        };
      });
      return data
    } catch (error) {
      
      
    }
  }


  async function tipoDocumentosDdl(){
    try{
        const response = await axiosInstance.get("TipoDocumento/Listar");
        const data = response.data.data.map((item) => {
            return {
              value: item.tido_Id,
              label: `${item.tido_Codigo} - ${item.tido_Descripcion}`,
            };
        });
        return data;
    } catch (error){
        console.error(error);
    }
}

    return{
      PedidoOrdenDetalleFiltrar,
      Procesos,
      ProcesosFiltrados,
      ModuloPorProceso,
      OrdenCompraDetalle,
      aduanas,
      Aldeas,
      aldeaPorCiudad,
      Areas,
      AsignacionesOrden,
      BaseCalculo,
      BoletinPago,
      ColoniasPorCiudad,
      Categorias,
      Cargos,
      Provincias97,
      SubCategoriasPorCategoria,
      CondicionesComerciales,
      Ciudades,
      CiudadesPorProvincia,
      CodigoImpuesto,
      ConceptoPago,
      Colores,
      Clientes,
      Empleados,
      EmpleadosNoTieneUsuario,
      EstadoBoletin,
      Estadosciviles,
      EstadosMercancia,
      Estilos,
      FormasEnvio,
      FormasPago,
      FuncionesMaquinas,
      Incoterm,
      ListarLugarEmbarque,
      Maquinas,
      Materiales,
      MarcasMaquinas,
      ModelosMaquinas,
      Modulos,
      Monedas,
      NivelesComerciales,
      Oficinas,
      Oficios,
      paises,
      Marcas,
      ModosTransporte,
      PedidoOrdenDetalle,
      Provincias,
      ProvinciasPorPais,
      ProvinciasFiltradaPorPaisYesAduana,
      Roles,
      Tallas,
      TipoEmbalaje,
      TipoLiquidacion,
      TipoIntermediario,
      UnidadMedida,
      Proveedores,
      OrdenCompra,
      Lotes,
      ListarLugarEmbarque,
      RegimenesAduaneros,
      MultiFuncional,
      tipoDocumentosDdl,
      Impuestos
    }

}

// const load_DDLs = new Load_DDLs();
export default Load_DDLs;