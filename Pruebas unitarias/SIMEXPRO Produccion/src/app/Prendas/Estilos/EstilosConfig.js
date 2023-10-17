import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const EstilosIndex = lazy(() => import('./Estilos'));

const EstilosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Estilos,
  routes: [
    {
      path: 'Estilos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <EstilosIndex />,
        },
      ],
    },
  ],
};

export default EstilosConfig;