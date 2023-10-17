import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const IncotermIndex = lazy(() => import('./Incoterm'));

const IncotermConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Incoterms,
  routes: [
    {
      path: 'Incoterm',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <IncotermIndex />,
        },
      ],
    },
  ],
};

export default IncotermConfig;