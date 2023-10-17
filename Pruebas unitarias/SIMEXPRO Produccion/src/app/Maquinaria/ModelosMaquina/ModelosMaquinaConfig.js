import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ModelosMaquinasIndex = lazy(() => import('./ModelosMaquina'));

const ModelosMaquinaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ModelosMaquinas,
  routes: [
    {
      path: 'ModelosMaquina',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ModelosMaquinasIndex />,
        },
      ],
    },
  ],
};

export default ModelosMaquinaConfig;