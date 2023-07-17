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
import Declaracion_Valor_Index from '../Declaracion_Valor/Declaracion_Valor_Index';
import C_A_Persona_Natural from '../Contratos_Adhesion/C_A_Persona_Natural';

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
    element: <UsuariosIndex/>,
  },
  {
    path: 'Contratos_Adhesion/C_A_Persona_Natural',
    element: <C_A_Persona_Natural/>,
  },
];

export default routes;
