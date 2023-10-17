import axios from "axios";
import History from "src/@history/@history";

const baseURL = process.env.REACT_APP_API_URL + "api/RolesPorPantallas/";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

let authRoles = {
  onlyGuest: [],
  admin: ["Admin Aduana", "Admin Producción"],
  All: ["Admin Aduana", "Admin Producción"],
  Inicio: [","],
  InicioProduccion: [","],
  InicioAduana: [","],
  Usuarios: [","],
  Roles: [","],
  FormasEnvio: [","],
  Monedas: [","],
  OficiosProfesiones: [","],
  Unidadesmedida: [","],
  Aldeas: [","],
  Ciudades: [","],
  Colonias: [","],
  Paises: [","],
  Provincias: [","],
  Cargos: [","],
  Clientes: [","],
  EstadosCiviles: [","],
  Empleados: [","],
  Proveedores: [","],
  Personas: [","],
  TiposIntermediarios: [","],
  CondicionComercial: [","],
  PersonaNatural: [","],
  ComercianteIndividual: [","],
  PersonaJuridica: [","],
  Declaracionvalor: [","],
  Duca: [","],
  BoletinPago: [","],
  DocumentoSanciones: [","],
  Aranceles: [","],
  CodigoImpuestos: [","],
  ConceptoPago: [","],
  Impuestos: [","],
  Incoterms: [","],
  LiquidacionGeneral: [","],
  LiquidacionLinea: [","],
  TipoLiquidacion: [","],
  MarcasCarros: [","],
  ModoTransporte: [","],
  FormasPago: [","],
  EstadosBoletin: [","],
  EstadosMercancias: [","],
  LugaresEmbarque: [","],
  NivelesComerciales: [","],
  TipoDocumento: [","],
  Planificacion: [","],
  Inspecciones: [","],
  Modulos: [","],
  OrdenProcesos: [","],
  OrdenCompra: [","],
  OrdenPedido: [","],
  PedidosProduccion: [","],
  Procesos: [","],
  RevisionCalidad: [","],
  FacturaExportacion: [","],
  FuncionesMaquinas: [","],
  HistorialMaquinas: [","],
  MarcaMaquinas: [","],
  Maquinas: [","],
  ModelosMaquinas: [","],
  Areas: [","],
  Categorias: [","],
  Lotes: [","],
  Materiales: [","],
  MaterialesBrindar: [","],
  Subcategorias: [","],
  TipoEmbalaje: [","],
  Colores: [","],
  Estilos: [","],
  Tallas: [","],
  ReportesModulos: [","],
  Aduana: [","],
  RegimenesAduaneros: [","],
  LineadeTiempoPO: [","],
  TiemposMaquinas: [","],
  ProduccionPorModulo: [","],
  PedidosCliente: [","],
  PlanificacionOrdenCompra: [","],
  ConsumoMateriales: [","],
  CostosdeProduccion: [","],
  MaquinasUso: [","],
  ReporteInventario: [","],
  ReporteImportaciones: [","],
  DevasPendientes: [","],
  ProduccionPorAreayfechas: [","],
  MaterialesPorPO: [","],
  IngresoMateriales: [","],
  ReportesContratosAdhesion: [","],
  SeguimientodeProcesosPO: [","],
  ImpuestosProd: [","],
};

try {
  const response = await axiosInstance.get(`DibujadoDeMenu`);

  authRoles = {
    Inicio: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "InicioGeneral"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    InicioAduana: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "InicioAduana"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    InicioProduccion: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "InicioProduccion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Usuarios: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Usuarios"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Roles: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Roles")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    FormasEnvio: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "FormasEnvio"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Monedas: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Monedas")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    TiposIdentificacion: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "TipoIdentificacion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Oficinas: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Oficinas"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    OficiosProfesiones: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "OficiosProfesiones"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Unidadesmedida: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "UnidadesMedida"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Aldeas: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Aldeas")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Ciudades: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Ciudades"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Colonias: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Colonias"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Paises: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Paises")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Provincias: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Provincias"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Cargos: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Cargos")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Clientes: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Clientes"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    EstadosCiviles: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "EstadosCiviles"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Empleados: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Empleados"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Proveedores: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Proveedores"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    TiposIntermediarios: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "TipoIntermediario"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    CondicionComercial: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "CondicionComercial"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    PersonaNatural: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "PersonaNatural"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ComercianteIndividual: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ComercianteIndividual"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    PersonaJuridica: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "PersonaJuridica"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Declaracionvalor: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "DEVA")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Duca: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "DUCA")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    BoletinPago: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "BoletinPago"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    DocumentoSanciones: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "DocumentoSancion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Aranceles: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Aranceles"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    CodigoImpuestos: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "CodigoImpuesto"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ConceptoPago: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ConceptoPago"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Impuestos: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Impuestos"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Incoterms: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Incoterms"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    TipoLiquidacion: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "TipoLiquidacion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    MarcasCarros: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "MarcasCarros"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ModoTransporte: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ModoTransporte"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    FormasPago: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "FormasPago"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    EstadosBoletin: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "EstadoBoletin"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    EstadosMercancias: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "EstadoMercancia"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    LugaresEmbarque: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "LugaresEmbarque"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    NivelesComerciales: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "NivelesComerciasles"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    TipoDocumento: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "TipoDocumento"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Planificacion: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Planificacion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Modulos: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Modulos")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    OrdenProcesos: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "OrdenProceso"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    OrdenCompra: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "OrdenCompra"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    OrdenPedido: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "OrdenPedido"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    PedidosProduccion: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "PedidoProduccion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Procesos: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Procesos"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    RevisionCalidad: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "RevisionCalidad"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    FacturaExportacion: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "FacturaExportacion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    FuncionesMaquinas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "FuncionesMaquina"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    HistorialMaquinas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "HistorialMaquina"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    MarcaMaquinas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "MarcasMaquina"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Maquinas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Maquinas"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ModelosMaquinas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ModeloMaquina"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Areas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Areas")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Categorias: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "Categorias"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Lotes: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Lotes")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Materiales: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Lotes")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    MaterialesBrindar: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "MaterialesBrindar"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Subcategorias: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "SubCategorias"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    TipoEmbalaje: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "TipoEmbalaje"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Colores: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Colores")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Estilos: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Estilos")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Tallas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Tallas")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ReportesModulos: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ReportesModulo"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    Aduana: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "Aduanas")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    RegimenesAduaneros: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find((item) => item.pant_Identificador === "RegimenesAduaneros")
          ?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    LineadeTiempoPO: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "LineadeTiempoPO"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    TiemposMaquinas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "TiemposMaquinas"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ProduccionPorModulo: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ProduccionPorModulo"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    PedidosCliente: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "PedidosCliente"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    PlanificacionOrdenCompra: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "PlanificacionOrdenCompra"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ConsumoMateriales: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ConsumoMateriales"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    CostosdeProduccion: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "CostosdeProduccion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    MaquinasUso: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "MaquinasUso"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ReporteInventario: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ReporteInventario"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ReporteImportaciones: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ReporteImportaciones"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    DevasPendientes: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "DevasPendientes"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ProduccionPorAreayfechas: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ProduccionPorAreayfechas"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    MaterialesPorPO: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "MaterialesPorPO"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    IngresoMateriales: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "IngresoMateriales"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ReportesContratosAdhesion: ["Admin Aduana"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ReportesContratosAdhesion"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    ImpuestosProd: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "ImpuestoProd"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    SeguimientodeProcesosPO: ["Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "SeguimientodeProcesosPO"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
    onlyGuest: [],
    admin: ["Admin Aduana", "Admin Producción"],
    All: ["Admin Aduana", "Admin Producción"].concat(
      JSON.parse(
        response.data.data.find(
          (item) => item.pant_Identificador === "InicioGeneral"
        )?.detalles ?? "[{}]"
      ).map((item) => item.role_Descripcion)
    ),
  };
} catch (err) {
  //  alert("sin conexion al server")
  History.push("/Error/Mantenimiento");
}

/**
 * Authorization Roles
 */

export default authRoles;
