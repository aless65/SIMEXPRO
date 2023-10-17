import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ImpuestosIndex = lazy(() => import('./Impuestos'));

const ImpuestosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Impuestos,
  routes: [
    {
      path: 'Impuestos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ImpuestosIndex />,
        },
      ],
    },
  ],
};

export default ImpuestosConfig;