import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const TallasIndex = lazy(() => import('./Tallas'));

const TallasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Tallas,
  routes: [
    {
      path: 'Tallas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TallasIndex />,
        },
      ],
    },
  ],
};

export default TallasConfig;