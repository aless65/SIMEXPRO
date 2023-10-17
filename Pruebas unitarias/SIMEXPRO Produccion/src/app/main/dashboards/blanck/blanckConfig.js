import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const Blanck = lazy(() => import('./blanck.js'));

const BlanckConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.Provincias,
  auth: null,
  routes: [
    {
      path: 'Inicio',
      children: [
        {
          path: '',
          element: <Navigate to="blanck" />,
        },
        {
          path: 'blanck',
          element: <Blanck />,
        },
      ],
    },
  ],
};

export default BlanckConfig;