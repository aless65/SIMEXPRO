import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const TipoIdentificacionIndex = lazy(() => import('./TipoIdentificacion'));

const TipoIdentificacionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.TiposIdentificacion,
  routes: [
    {
      path: 'TipoIdentificacion',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TipoIdentificacionIndex />,
        },
      ],
    },
  ],
};

export default TipoIdentificacionConfig;