import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const AreasIndex = lazy(() => import('./Areas'));

const AreasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Areas,
  routes: [
    {
      path: 'Areas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <AreasIndex />,
        },
      ],
    },
  ],
};

export default AreasConfig;