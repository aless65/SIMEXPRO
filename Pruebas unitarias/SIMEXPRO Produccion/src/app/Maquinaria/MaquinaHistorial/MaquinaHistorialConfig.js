import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const MaquinaHistorialIndex = lazy(() => import('./MaquinaHistorial'));
const MaquinaHistorialTimeLine = lazy(() => import('./MaquinaHistorialTimeLine'));
const MaquinaHistorialReporte = lazy(() => import('./MaquinaHistorialReporte'));

const MaquinaHistorialConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.HistorialMaquinas,
  routes: [
    {
      path: 'MaquinaHistorial',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MaquinaHistorialIndex />,
        },
        {
          path: 'timeline',
          element: <MaquinaHistorialTimeLine />,
        },
        {
          path: 'reporte',
          element: <MaquinaHistorialReporte />,
        },
      ],
    },
  ],
};

export default MaquinaHistorialConfig;