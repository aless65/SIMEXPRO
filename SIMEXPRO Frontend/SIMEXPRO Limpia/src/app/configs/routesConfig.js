/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import pagesConfigs from '../main/pages/pagesConfigs';
import CiudadesIndex from '../Ubicaciones/Ciudades/Ciudades';
import ProvinciasIndex from '../Ubicaciones/Provincias/Provincias';
import PaisesIndex from '../Ubicaciones/Paises/Paises';
import EstadosCivilesIndex from '../Personas/EstadosCiviles/EstadosCiviles';
import CargosIndex from '../Personas/Cargos/Cargos';
import OficinasIndex from '../Personas/Oficinas/Oficinas';
import OficiosProfesiones from '../Personas/OficiosProfesiones/OficiosProfesiones';
import UsuariosIndex from '../Seguridad/Usuarios/Usuarios';
import BoletinDePagoIndex from '../Aduanas/Boletin_de_Pago/BoletinDePago';
import ImpresionBoletinDePago from '../Aduanas/Boletin_de_Pago/ImpresionBoletinDePago'
import RolesIndex from '../Seguridad/Roles/roles'
import RolesCrear from '../Seguridad/Roles/roles_crear'
import DucaIndex from '../Aduanas/DUCA/duca_Index';
import DucaCrear from '../Aduanas/DUCA/duca_Crear';
import Subir_Documentos from '../Aduanas/Documentacion/Subir_Documentos';
import DocumentosDeSanciones from '../Aduanas/DocumentosDeSanciones/DocumentosDeSanciones';

import PersonaNatural_Index from '../Aduanas/Contratos_de_Adhesión/Persona_Natural/PersonaNatural_Index';
import PersonaNatural_Crear from '../Aduanas/Contratos_de_Adhesión/Persona_Natural/PersonaNatural_Crear';
import Declaracion_Valor_Index from '../Aduanas/Declaracion_De_Valor/Declaracion_Valor_Index';
import Declaracion_Valor_Crear from '../Aduanas/Declaracion_De_Valor/Declaracion_Valor_Crear';
import Comerciante_Individual_Index from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_Individual_Index';
import Comerciante_Individual_Agregar from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_Individual_Agregrar';
import CategoriaIndex from '../Inventario/Categoria/Categorias';
import ColoresIndex from '../Prendas/Colores/Colores';
import InspeccionesIndex from '../Produccion/Inspecciones/InspeccionesEstado';
import MaquinaHistorialIndex from '../Maquinaria/MaquinaHistorial/MaquinaHistorial';
import MaquinaModulosIndex from '../Maquinaria/MaquinaModulos/MaquinaModulos';
import MaterialesIndex from '../Inventario/Materiales/Materiales';
import AreasIndex from '../Inventario/Areas/Areas';
import EstilosIndex from '../Prendas/Estilos/Estilos';
import FuncionesMaquinaIndex from '../Maquinaria/FuncionesMaquina/FuncionesMaquina';
import LotesIndex from '../Inventario/Lotes/Lotes';
import MaquinasIndex from '../Maquinaria/Máquinas/Maquinas';
import Persona_Juridica_Index from '../Aduanas/Contratos_de_Adhesión/Persona_Juridica/Persona_Juridica_Index';
import Persona_Juridica_Agregar from '../Aduanas/Contratos_de_Adhesión/Persona_Juridica/Persona_Juridica_Agregar';
import SubcategoriaIndex from '../Inventario/Subcategoria/Subcategorias';
import TipoEmbalajeIndex from '../Inventario/TipoDeEmbalaje/TipoEmbalaje';
import AldeaIndex from '../Ubicaciones/Aldeas/Aldeas';


const routeConfigs = [
  ...dashboardsConfigs,
  ...pagesConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="dashboards/analytics" />,
    auth: settingsConfig.defaultAuth,
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
    path: 'Ciudades/Index',
    element: <CiudadesIndex />,
  },
  {
    path: 'Provincias/Index',
    element: <ProvinciasIndex />,
  },
  {
    path: 'Paises/Index',
    element: <PaisesIndex />,
  },
  {
    path: 'Cargos/Index',
    element: <CargosIndex />,
  },
  {
    path: 'EstadosCiviles/Index',
    element: <EstadosCivilesIndex />,
  },
  {
    path: 'Oficinas/Index',
    element: <OficinasIndex />,
  },
  {
    path: 'OficiosProfesiones/Index',
    element: <OficiosProfesiones />,
  },
  {
    path: 'Usuarios/Index',
    element: <UsuariosIndex />,
  },

  {
    path: 'BoletindePago/BoletinDePagoIndex',
    element: <BoletinDePagoIndex />
  },
  {
    path: 'BoletindePago/ImpresionBoletinDePago',
    element: <ImpresionBoletinDePago />
  },
  {
    path: 'Contrato-de-Adhesion/Persona-Natural',
    element: <PersonaNatural_Index />,
  },
  {
    path: 'Contrato-de-Adhesion/Persona-Natural-Crear',
    element: <PersonaNatural_Crear />,
  },
  {
    path: 'Declaracion-de-Valor/Listado',
    element: <Declaracion_Valor_Index />,
  },
  {
    path: 'Declaracion-de-Valor/Nueva-Declaracion',
    element: <Declaracion_Valor_Crear />,
  },
  {
    path: 'Roles/RolesIndex',
    element: <RolesIndex />
  },
  {
    path: 'Roles/RolesCrear',
    element: <RolesCrear />
  },
  {
    path: 'Duca/Index',
    element: <DucaIndex />
  },
  {
    path: 'Duca/Crear',
    element: <DucaCrear />
  },
  {
    path: 'Documentos/Subir',
    element: <Subir_Documentos />
  },
  {
    path: 'Categoria/Index',
    element: <CategoriaIndex/>
  },
  {
    path: 'Colores/Index',
    element: <ColoresIndex/>
  },
  {
    path: 'Inspecciones/Index',
    element: <InspeccionesIndex/>
  },
  {
    path: 'MaquinaHistorial/Index',
    element: <MaquinaHistorialIndex/>
  },
  {
    path: 'MaquinaModulos/Index',
    element: <MaquinaModulosIndex/>
  },
  {
    path: 'ContratoDeAdhesionComercianteIndividual/Index',
    element: <Comerciante_Individual_Index/> 
  },
  {
    path: 'ContratoDeAdhesionComercianteIndividual/Agregar',
    element: <Comerciante_Individual_Agregar/> 
  },
  {
    path: 'ContratoDeAdhesionPersonaJuridica/Index',
    element: <Persona_Juridica_Index/> 
  },
  {
    path: 'ContratoDeAdhesionPersonaJuridica/Agregar',
    element: <Persona_Juridica_Agregar/> 
  },
  {
    path: 'Categoria/Index',
    element: <CategoriaIndex/>
  },
  {
    path: 'Colores/Index',
    element: <ColoresIndex/>
  },
  {
    path: 'Inspecciones/Index',
    element: <InspeccionesIndex/>
  },
  {
    path: 'MaquinaHistorial/Index',
    element: <MaquinaHistorialIndex/>
  },
  {
    path: 'Materiales/Index',
    element: <MaterialesIndex/>
  },
  {
    path: 'Areas/Index',
    element: <AreasIndex />,
  },
  {
    path: 'Estilos/Index',
    element: <EstilosIndex />,
  },
  {
    path: 'FuncionesMaquina/Index',
    element: <FuncionesMaquinaIndex />,
  },
  {
    path: 'Lotes/Index',
    element: <LotesIndex />,
  },
  {
    path: 'Maquinas/Index',
    element: <MaquinasIndex />,
  },
  {
    path: 'Subcategorias/Index',
    element: <SubcategoriaIndex />,
  },
  {
    path: 'TipoEmbalaje/Index',
    element: <TipoEmbalajeIndex />,
  },
  {
    path: 'Aldea/Index',
    element: <AldeaIndex />,
  },
  {
    path: 'DocumentosDeSanciones/Index',
    element: <DocumentosDeSanciones />,
  },
];

export default routes;
