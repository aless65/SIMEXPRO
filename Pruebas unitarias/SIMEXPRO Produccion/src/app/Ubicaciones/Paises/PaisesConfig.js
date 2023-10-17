import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const PaisesIndex = lazy(() => import('./Paises'));

const PaisesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Paises,
  routes: [
    {
      path: 'Paises',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <PaisesIndex />,
        },
      ],
    },
  ],
};

export default PaisesConfig;
