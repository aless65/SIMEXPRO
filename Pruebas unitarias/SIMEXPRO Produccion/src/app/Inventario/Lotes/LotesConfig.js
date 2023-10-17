import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const LotesIndex = lazy(() => import('./Lotes'));
const LotesCrear = lazy(() => import('./LotesCrear'));
const LotesEditar = lazy(() => import('./LotesEditar'));

const LotesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Lotes,
  routes: [
    {
      path: 'Lotes',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <LotesIndex />,
        },
        {
          path: 'crear',
          element: <LotesCrear />,
        },
        {
          path: 'editar',
          element: <LotesEditar />,
        },
      ],
    },
  ],
};

export default LotesConfig;