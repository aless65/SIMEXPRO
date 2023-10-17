import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const EcotasaIndex = lazy(() => import('./Ecotasa'));

const EcotasaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Ecotasa,
  routes: [
    {
      path: 'Ecotasa',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <EcotasaIndex />,
        },
      ],
    },
  ],
};

export default EcotasaConfig;