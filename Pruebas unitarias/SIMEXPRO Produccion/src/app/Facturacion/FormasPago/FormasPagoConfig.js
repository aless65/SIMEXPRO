import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const FomasPagoIndex = lazy(() => import('./FormasPago'));

const FomasPagoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.FormasPago,
  routes: [
    {
      path: 'FormasPago',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <FomasPagoIndex />,
        },
      ],
    },
  ],
};

export default FomasPagoConfig;