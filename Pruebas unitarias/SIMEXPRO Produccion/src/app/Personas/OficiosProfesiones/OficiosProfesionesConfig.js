import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const OficionesProfesionesIndex = lazy(() => import('./OficiosProfesiones'));

const OficiosProfesionesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.OficiosProfesiones,
  routes: [
    {
      path: 'OficiosProfesiones',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OficionesProfesionesIndex />,
        },
      ],
    },
  ],
};

export default OficiosProfesionesConfig;