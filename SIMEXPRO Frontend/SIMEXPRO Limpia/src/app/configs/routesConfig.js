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
import ImpresionBoletindePago from '../BoletinDePago/ImpresionBoletinDePago';
import Comerciante_Individual_Index from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_Individual_Index';
import Comerciante_Individual_Agregar from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_Individual_Agregrar';

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
    path: 'BoletindePago/impresionBoletin',
    element: <ImpresionBoletindePago/> 
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
];

export default routes;
