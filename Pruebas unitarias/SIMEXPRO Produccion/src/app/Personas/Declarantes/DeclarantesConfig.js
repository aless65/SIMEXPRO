import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const DeclarantesIndex = lazy(() => import('./Declarantes'));
const DeclarantesCrear = lazy(() => import('./DeclarantesCrear'));
const DeclarantesEditar = lazy(() => import('./DeclarantesEditar'));

const DeclarantesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Declarantes',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <DeclarantesIndex />,
        },
        {
          path: 'crear',
          element: <DeclarantesCrear />,
        },
        {
          path: 'editar',
          element: <DeclarantesEditar />,
        },
      ],
    },
  ],
};

export default DeclarantesConfig;