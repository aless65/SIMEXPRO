import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const TipoIntermediarioIndex = lazy(() => import('./TipoIntermediario'));

const TipoIntermediarioConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.TiposIntermediarios,
  routes: [
    {
      path: 'TipoIntermediario',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TipoIntermediarioIndex />,
        },
      ],
    },
  ],
};

export default TipoIntermediarioConfig;