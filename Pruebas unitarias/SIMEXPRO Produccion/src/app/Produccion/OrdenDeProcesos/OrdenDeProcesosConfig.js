import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const OrdenDeProcesosIndex = lazy(() => import('./OrdenDeProcesos'));
const OrdenDeProcesosCrear = lazy(() => import('./OrdenDeProcesosCrear'));
const OrdenDeProcesosEditar = lazy(() => import('./OrdenDeProcesosEditar'));
const OrdenDeProcesosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.OrdenProcesos,
  routes: [
    {
      path: 'OrdenProcesos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OrdenDeProcesosIndex />,
        },
        {
          path: 'crear',
          element: <OrdenDeProcesosCrear />,
        },
        {
          path: 'editar',
          element: <OrdenDeProcesosEditar />,
        },
      ],
    },
  ],
};

export default OrdenDeProcesosConfig;