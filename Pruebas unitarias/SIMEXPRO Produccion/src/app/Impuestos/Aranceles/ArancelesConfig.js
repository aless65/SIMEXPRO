import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ArancelesIndex = lazy(() => import('./Aranceles'));

const ArancelesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Aranceles,
  routes: [
    {
      path: 'Aranceles',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ArancelesIndex />,
        },
      ],
    },
  ],
};

export default ArancelesConfig;