import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const NivelesComercialesIndex = lazy(() => import('./NivelesComerciales'));

const NivelesComercialesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.NivelesComerciales,
  routes: [
    {
      path: 'NivelesComerciales',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <NivelesComercialesIndex />,
        },
      ],
    },
  ],
};

export default NivelesComercialesConfig;