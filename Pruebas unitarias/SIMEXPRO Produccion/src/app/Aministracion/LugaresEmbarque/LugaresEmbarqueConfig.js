import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const LugaresEmbarqueIndex = lazy(() => import('./LugaresEmbarque'));

const LugaresEmbarqueConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.LugaresEmbarque,
  routes: [
    {
      path: 'LugaresEmbarque',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <LugaresEmbarqueIndex />,
        },
      ],
    },
  ],
};

export default LugaresEmbarqueConfig;