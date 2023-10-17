import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const MonedasIndex = lazy(() => import('./monedas'));

const MonedasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Monedas,
  routes: [
    {
      path: 'Monedas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MonedasIndex />,
        },
      ],
    },
  ],
};

export default MonedasConfig;