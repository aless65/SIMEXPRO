import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const EmpleadosIndex = lazy(() => import('./Empleados'));
const EmpleadosCrear = lazy(() => import('./EmpleadosCrear'));
const EmpeladosEditar = lazy(() => import('./EmpleadosEditar'))
const EmpleadosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Empleados,
  routes: [
    {
      path: 'Empleados',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <EmpleadosIndex />,
        },
        {
          path: 'crear',
          element: <EmpleadosCrear />,
        },
        {
          path: 'editar',
          element: <EmpeladosEditar />,
        },
      ],
    },
  ],
};

export default EmpleadosConfig;