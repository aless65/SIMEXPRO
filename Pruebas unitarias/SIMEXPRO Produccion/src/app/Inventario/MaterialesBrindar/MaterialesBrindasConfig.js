import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const MaterialesBrindarIndex = lazy(() => import('./MaterialesBrindar'));

const MaterialesBrindarConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.MaterialesBrindar,
  routes: [
    {
      path: 'MaterialesBrindar',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MaterialesBrindarIndex />,
        },
      ],
    },
  ],
};

export default MaterialesBrindarConfig;