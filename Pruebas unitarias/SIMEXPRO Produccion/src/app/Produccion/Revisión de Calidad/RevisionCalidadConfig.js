import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const RevisionCalidadIndex = lazy(() => import('./RevisionCalidad'));
const RevisionCalidadCrear = lazy(() => import('./RevisionCalidadCrear'));
const RevisionCalidadEditar = lazy(() => import('./RevisionCalidadEditar'));
const RevisionCalidadReporte = lazy(() => import('./RevisionCalidadReporte'));

const RevisionCalidadConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.RevisionCalidad,
  routes: [
    {
      path: 'RevisionCalidad',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <RevisionCalidadIndex />,
        },
        {
          path: 'crear',
          element: <RevisionCalidadCrear />,
        },
        {
          path: 'editar',
          element: <RevisionCalidadEditar />,
        },
        {
          path: 'reporte',
          element: <RevisionCalidadReporte />,
        },
      ],
    },
  ],
};

export default RevisionCalidadConfig;