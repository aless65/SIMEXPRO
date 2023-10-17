import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ColoresIndex = lazy(() => import('./Colores'));

const ColoresConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Colores,
  routes: [
    {
      path: 'Colores',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ColoresIndex />,
        },
      ],
    },
  ],
};

export default ColoresConfig;