import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ImportadoresIndex = lazy(() => import('./Importadores'));
const ImportadoresCrear = lazy(() => import('./ImportadoresCrear'));
const ImportadoresEditar = lazy(() => import('./ImportadoresEditar'));

const ImportadoresConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Importadores',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ImportadoresIndex />,
        },
        {
          path: 'crear',
          element: <ImportadoresCrear />,
        },
        {
          path: 'editar',
          element: <ImportadoresEditar />,
        },
      ],
    },
  ],
};

export default ImportadoresConfig;