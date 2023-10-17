import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const CategoriasIndex = lazy(() => import('./Categorias'));

const CategoriasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Categorias,
  routes: [
    {
      path: 'Categorias',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <CategoriasIndex />,
        },
      ],
    },
  ],
};

export default CategoriasConfig;