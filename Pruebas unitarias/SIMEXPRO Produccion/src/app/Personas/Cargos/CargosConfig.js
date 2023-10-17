import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const CargosIndex = lazy(() => import('./Cargos'));

const CargosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Cargos,
  routes: [
    {
      path: 'Cargos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <CargosIndex />,
        },
      ],
    },
  ],
};

export default CargosConfig;


