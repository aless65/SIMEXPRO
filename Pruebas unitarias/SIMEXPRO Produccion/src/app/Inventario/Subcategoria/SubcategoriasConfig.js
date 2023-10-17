import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const SubcategoriasIndex = lazy(() => import('./Subcategorias'));

const SubcategoriasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Subcategorias,
  routes: [
    {
      path: 'Subcategorias',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <SubcategoriasIndex />,
        },
      ],
    },
  ],
};

export default SubcategoriasConfig;