import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ColoniasIndex = lazy(() => import('./Colonias'));

const ColoniasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Colonias,
  routes: [
    {
      path: 'Colonias',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ColoniasIndex />,
        },
      ],
    },
  ],
};

export default ColoniasConfig;