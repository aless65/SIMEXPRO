import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const TipoEmbalajeIndex = lazy(() => import('./TipoEmbalaje'));

const TipoEmbalajeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.TipoEmbalaje,
  routes: [
    {
      path: 'TipoEmbalaje',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TipoEmbalajeIndex />,
        },
      ],
    },
  ],
};

export default TipoEmbalajeConfig;