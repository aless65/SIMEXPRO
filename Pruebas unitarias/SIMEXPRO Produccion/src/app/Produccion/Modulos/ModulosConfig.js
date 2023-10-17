import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ModulosIndex = lazy(() => import('./Modulos'));

const ModulosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Modulos,
  routes: [
    {
      path: 'Modulos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ModulosIndex />,
        },
      ],
    },
  ],
};

export default ModulosConfig;