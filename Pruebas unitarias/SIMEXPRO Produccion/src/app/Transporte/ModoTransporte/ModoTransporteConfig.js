import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ModoTransporteIndex = lazy(() => import('./ModoTransporte'));

const ModoTransporteConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ModoTransporte,
  routes: [
    {
      path: 'ModoTransporte',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ModoTransporteIndex />,
        },
      ],
    },
  ],
};

export default ModoTransporteConfig;