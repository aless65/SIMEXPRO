import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const PerfilIndex = lazy(() => import('./Perfil'));

const PerfilConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.All,
  routes: [
    {
      path: 'Perfil',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <PerfilIndex />,
        },
      ],
    },
  ],
};

export default PerfilConfig;