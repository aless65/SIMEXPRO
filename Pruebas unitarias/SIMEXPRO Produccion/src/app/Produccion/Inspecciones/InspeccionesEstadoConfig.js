import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const InspeccionesIndex = lazy(() => import('./InspeccionesEstado'));

const InspeccionesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Inspecciones,
  routes: [
    {
      path: 'Inspecciones',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <InspeccionesIndex />,
        },
      ],
    },
  ],
};

export default InspeccionesConfig;