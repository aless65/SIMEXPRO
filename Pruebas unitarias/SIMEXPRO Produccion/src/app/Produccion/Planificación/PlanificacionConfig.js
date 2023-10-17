import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const CalendarApp = lazy(() => import('./CalendarApp'));

const PlanificacionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Planificacion,
  routes: [
    {
      path: 'Planificacion',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <CalendarApp />,
        },
      ],
    },
  ],
};

export default PlanificacionConfig;