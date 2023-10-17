/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseUtils from '@fuse/utils';
import settingsConfig from 'app/configs/settingsConfig';
import { Navigate } from 'react-router-dom';
import AduanaConfig from '../Aduanas/Aduana/AduanaConfig';
import BoletinDePagoConfig from '../Aduanas/Boletin_de_Pago/BoletinDePagoConfig';
import Comerciante_IndividualConfig from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_IndividualConfig';
import PersonaJuridicaConfig from '../Aduanas/Contratos_de_Adhesión/Persona_Juridica/Persona_Juridica_Config';
import PersonaNaturalConfig from '../Aduanas/Contratos_de_Adhesión/Persona_Natural/PersonaNaturalConfig';
import DucaConfig from '../Aduanas/DUCA/ducaConfig';
import Declaracion_ValorConfig from '../Aduanas/Declaracion_De_Valor/Declaracion_ValorConfig';
import EstadoBoletinConfig from '../Aministracion/EstadoBoletin/EstadoBoletinConfig';
import EstadoMercanciaConfig from '../Aministracion/EstadoMercancia/EstadoMercanciaConfig';
import ItemsConfig from '../Aministracion/Items/ItemsConfig';
import LugaresEmbarqueConfig from '../Aministracion/LugaresEmbarque/LugaresEmbarqueConfig';
import NivelesComercialesConfig from '../Aministracion/NivelesComerciales/NivelesComercialesConfig';
import RegimenesAduanerosConfig from '../Aministracion/RegimenesAduaneros/RegimenesAduanerosConfig';
import CondicionesComercialesConfig from '../Documentacion/CondicionesComerciales/CondicionesComercialesConfig';
import FacturasExportacionConfig from '../FacturaExportacion/FacturaExportacionConfig';
import FormasPagoConfig from '../Facturacion/FormasPago/FormasPagoConfig';
import FormaEnvioConfig from '../Generales/FormasEnvio/FormaEnvioConfig';
import MonedasConfig from '../Generales/Monedas/MonedasConfig';
import { default as TipoIdentificacionConfig, default as TiposIdentificacionConfig } from '../Generales/TipoIdentificacion/TiposIdentificacionConfig';
import UnidadesMedidaConfig from '../Generales/UnidadesMedida/UniodadesMedidaConfig';
import ArancelesConfig from '../Impuestos/Aranceles/ArancelesConfig';
import CodigoImpuestoConfig from '../Impuestos/CodigoImpuesto/CodigoImpuestoConfig';
import ConceptoPagoConfig from '../Impuestos/ConceptoPago/ConceptoPagoConfig';
import ImpuestosConfig from '../Impuestos/Impuestos/ImpuestosConfig';
import IncotermConfig from '../Impuestos/Incoterms/IncotermConfig';
import TipoLiquidacionConfig from '../Impuestos/TipoLiqudacion/TipoLiquidacionConfig';
import PerfilIndex from '../Inicio/Perfil/Perfil';
import PerfilConfig from '../Inicio/Perfil/PerfilConfig';
import AreasConfig from '../Inventario/Areas/AreasConfig';
import CategoriasConfig from '../Inventario/Categoria/CategoriasConfig';
import LotesConfig from '../Inventario/Lotes/LotesConfig';
import MaterialesConfig from '../Inventario/Materiales/MaterialesConfig';
import MaterialesBrindarConfig from '../Inventario/MaterialesBrindar/MaterialesBrindasConfig';
import SubcategoriasConfig from '../Inventario/Subcategoria/SubcategoriasConfig';
import TipoEmbalajeConfig from '../Inventario/TipoDeEmbalaje/TipoDeEmbalajeConfig';
import FuncionesMaquinaConfig from '../Maquinaria/FuncionesMaquina/FuncionesMaquinaConfig';
import MaquinaHistorialConfig from '../Maquinaria/MaquinaHistorial/MaquinaHistorialConfig';
import MarcasMaquinaConfig from '../Maquinaria/MarcasMaquina/MarcasMaquinaConfig';
import ModelosMaquinaConfig from '../Maquinaria/ModelosMaquina/ModelosMaquinaConfig';
import MaquinasConfig from '../Maquinaria/Máquinas/MaquinasConfig';
import CargosConfig from '../Personas/Cargos/CargosConfig';
import ClientesConfig from '../Personas/Clientes/ClientesConfig';
import EmpleadosConfig from '../Personas/Empleados/EmpleadosConfig';
import EstadosCivilesConfig from '../Personas/EstadosCiviles/EstadosCivilesConfig';
import OficinasConfig from '../Personas/Oficinas/OficinasConfig';
import OficioProfesionesConfig from '../Personas/OficiosProfesiones/OficiosProfesionesConfig';
import ProveedoresConfig from '../Personas/Proveedores/ProveedoresConfig';
import TipoIntermediarioConfig from '../Personas/TipoIntermediario/TipoIntermediarioConfig';
import ColoresConfig from '../Prendas/Colores/ColoresConfig';
import EstilosConfig from '../Prendas/Estilos/EstilosConfig';
import TallasConfig from '../Prendas/Tallas/TallasConfig';
import InspeccionesConfig from '../Produccion/Inspecciones/InspeccionesEstadoConfig';
import ModulosConfig from '../Produccion/Modulos/ModulosConfig';
import OrdenCompraConfig from '../Produccion/OrdenCompra/OrdenCompraConfig';
import OrdenDeProcesosConfig from '../Produccion/OrdenDeProcesos/OrdenDeProcesosConfig';
import OrdenPedidoConfig from '../Produccion/OrdenPedidos/OrdenPedidoConfig';
import PedidosProduccionConfing from '../Produccion/PedidosProduccion/PedidosProduccionconfig';
import PlanificacionConfig from '../Produccion/Planificación/PlanificacionConfig';
import ProcesosConfig from '../Produccion/Procesos/ProcesosConfig';
import PruebaPdfs from '../Produccion/PruebaPdfs/PruebaPdfs';
import RevisionCalidadConfig from '../Produccion/Revisión de Calidad/RevisionCalidadConfig';
import ReporteModuloDiaConfig from '../Reportes/ReporteModuloDiaConfig';
import RolesConfig from '../Seguridad/Roles/rolesconfig';
import UsuariosConfig from '../Seguridad/Usuarios/UsuariosConfig';
import MarcasCarrosConfig from '../Transporte/MarcasCarros/MarcasCarrosConfig';
import ModoTransporteConfig from '../Transporte/ModoTransporte/ModoTransporteConfig';
import AldeasConfig from '../Ubicaciones/Aldeas/AldeasConfig';
import CiudadesConfig from '../Ubicaciones/Ciudades/CiudadesConfig';
import ColoniasConfig from '../Ubicaciones/Colonias/ColoniasConfig';
import PaisesConfig from '../Ubicaciones/Paises/PaisesConfig';
import ProvinciasConfig from '../Ubicaciones/Provincias/ProvinciasConfig';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import maintenanceServerConfig from '../main/maintenance/maintenancePageConfig';
import pagesConfigs from '../main/pages/pagesConfigs';
import SignInConfig from '../main/sign-in/SignInConfig';
// import PersonaJuridicaConfig from '../Aduanas/Contratos_de_Adhesión/Persona_Juridica/Persona_Juridica_Config';
// import OrdenCompraConfig from '../Produccion/OrdenCompra/OrdenCompraConfig';
// import PlanificacionConfig from '../Produccion/Planificación/PlanificacionConfig';
// import PruebaPdfs from '../Produccion/PruebaPdfs/PruebaPdfs';
// import PerfilIndex from '../Inicio/Perfil/Perfil';
// import AduanaConfig from '../Aduanas/Aduana/AduanaConfig';
// import FacturasExportacionConfig from '../FacturaExportacion/FacturaExportacionConfig';
// import PersonaJuridicaConfig from '../Aduanas/Contratos_de_Adhesión/Persona_Juridica/Persona_Juridica_Config';
// import RegimenesAduanerosConfig from '../Aministracion/RegimenesAduaneros/RegimenesAduanerosConfig'
import DocumentosDeSancionesConfig from '../Aduanas/DocumentosDeSanciones/DocumentosDeSancionesConfig';
import TipoDocumentoConfig from '../Documentacion/TipoDocumento/TipoDocumentosConfig';
import LineadeTiempoPOConfig from '../Produccion/LineaDeTiempo/LineadeTiempoPOConfig';
import ReportesProduccionConfig from "../Produccion/ReportesProduccion/ReportesProduccionConfig";
import ReportesAduanaConfig from '../Aduanas/ReportesAduana/ReportesAduanaConfig';
import TratadosConfig from '../Aduanas/Tratados/TratadosConfig';
import ImpuestoProdConfig from '../Produccion/ImpuestosProd/ImpuestosProdConfig';
import DucaConfigAbierto from '../Aduanas/DUCA/ducaConfigAbierto';
import EcotasaConfig from '../Impuestos/Ecotasas/EcotasaConfig';
import ImpuestoSelectivoConsumoCondicionesVehiculoConfig from '../Impuestos/ImpuestoSelectivoConsumoCondicionesVehiculo/ISCCVConfig';

const routeConfigs = [
  ...dashboardsConfigs,
  ...pagesConfigs,
  ...ReportesProduccionConfig,
  ...ReportesAduanaConfig,
  SignInConfig,
  DocumentosDeSancionesConfig,
  AduanaConfig,
  TipoDocumentoConfig,
  maintenanceServerConfig,
  PlanificacionConfig,
  ReporteModuloDiaConfig,
  OrdenCompraConfig,
  PersonaJuridicaConfig,
  AduanaConfig,
  DocumentosDeSancionesConfig,
  Comerciante_IndividualConfig,
  ProvinciasConfig,
  UsuariosConfig,
  UnidadesMedidaConfig,
  BoletinDePagoConfig,
  EmpleadosConfig,
  TiposIdentificacionConfig,
  CargosConfig,
  MonedasConfig,
  TiposIdentificacionConfig,
  AreasConfig,
  CategoriasConfig,
  LotesConfig,
  MaterialesConfig,
  MaterialesBrindarConfig,
  SubcategoriasConfig,
  TipoEmbalajeConfig,
  FuncionesMaquinaConfig,
  MaquinaHistorialConfig,
  MaquinasConfig,
  MarcasMaquinaConfig,
  ModelosMaquinaConfig,
  CargosConfig,
  EstadosCivilesConfig,
  OficinasConfig,
  OficioProfesionesConfig,
  ColoresConfig,
  EstilosConfig,
  TallasConfig,
  InspeccionesConfig,
  ModulosConfig,
  OrdenDeProcesosConfig,
  OrdenPedidoConfig,
  ProcesosConfig,
  AldeasConfig,
  CiudadesConfig,
  ColoniasConfig,
  PaisesConfig,
  RolesConfig,
  FormaEnvioConfig,
  RevisionCalidadConfig,
  ArancelesConfig,
  CodigoImpuestoConfig,
  ConceptoPagoConfig,
  ImpuestosConfig,
  MarcasCarrosConfig,
  ModoTransporteConfig,
  IncotermConfig,
  TipoLiquidacionConfig,
  CondicionesComercialesConfig,
  EstadoBoletinConfig,
  EstadoMercanciaConfig,
  //ItemsConfig,
  LugaresEmbarqueConfig,
  NivelesComercialesConfig,
  TipoIdentificacionConfig,
  TipoIntermediarioConfig,
  ProveedoresConfig,
  FormasPagoConfig,
  DucaConfig,
  Declaracion_ValorConfig,
  ClientesConfig,
  PersonaNaturalConfig,
  EstadoBoletinConfig,
  Comerciante_IndividualConfig,
  PedidosProduccionConfing,
  PerfilConfig,
  FacturasExportacionConfig,
  PersonaJuridicaConfig,
  RegimenesAduanerosConfig,
  LineadeTiempoPOConfig,
  DucaConfigAbierto,
  TratadosConfig,
  ImpuestoProdConfig,
  EcotasaConfig,
  ImpuestoSelectivoConsumoCondicionesVehiculoConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/Inicio/Blank" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
  {
    path: 'PruebaPdfs/Index',
    element: <PruebaPdfs />
  },
  {
    path: 'Perfil/Index',
    element: <PerfilIndex />
  }
];

export default routes;
