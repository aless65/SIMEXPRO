import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const MaquinasIndex = lazy(() => import('./Maquinas'));
// const MaquinaReporte = lazy(() => import('../MaquinaHistorial/MaquinaHistorialReporte'));

const MaquinasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Maquinas,
  routes: [
    {
      path: 'Maquinas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MaquinasIndex />,
        },
      ],
    },
  ],
};

export default MaquinasConfig;