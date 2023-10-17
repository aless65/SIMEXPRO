import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const EstadosCivilesIndex = lazy(() => import('./EstadosCiviles'));

const EstadosCivilesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.EstadosCiviles,
  routes: [
    {
      path: 'EstadosCiviles',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <EstadosCivilesIndex />,
        },
      ],
    },
  ],
};

export default EstadosCivilesConfig;