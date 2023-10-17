import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const MarcasCarrosIndex = lazy(() => import('./MarcasCarros'));

const MarcasCarrosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.MarcasCarros,
  routes: [
    {
      path: 'MarcasCarros',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MarcasCarrosIndex />,
        },
      ],
    },
  ],
};

export default MarcasCarrosConfig;