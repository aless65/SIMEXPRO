import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const EstadoMercanciasIndex = lazy(() => import('./EstadoMercancia'));

const EstadoMercanciaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.EstadosMercancias,
  routes: [
    {
      path: 'EstadoMercancia',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <EstadoMercanciasIndex />,
        },
      ],
    },
  ],
};

export default EstadoMercanciaConfig;