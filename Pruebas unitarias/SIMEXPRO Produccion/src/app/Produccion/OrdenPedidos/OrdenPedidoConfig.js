import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const OrdenPedidoIndex = lazy(() => import('./OrdenPedido_Index'));
const OrdenPedido_Crear = lazy(() => import('./OrdenPedido_Crear'));
const OrdenPedido_Editar = lazy(() => import('./OrdenPedido_Editar'));

const OrdenPedidoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.OrdenPedido,
  routes: [
    {
      path: 'OrdenPedido',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OrdenPedidoIndex />,
        },
        {
          path: 'crear',
          element: <OrdenPedido_Crear />,
        },
        {
          path: 'editar',
          element: <OrdenPedido_Editar />,
        },
      ],
    },
  ],
};

export default OrdenPedidoConfig;