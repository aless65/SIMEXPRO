import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const AldeasIndex = lazy(() => import('./Aldeas'));

const AldeasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Aldeas,
  routes: [
    {
      path: 'Aldeas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <AldeasIndex />,
        },
      ],
    },
  ],
};

export default AldeasConfig;