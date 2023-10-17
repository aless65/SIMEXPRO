import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ImpuestosProdIndex = lazy(() => import('./ImpuestosProd'));

const ImpuestosProdConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ImpuestosProd,
  routes: [
    {
      path: 'ImpuestosProd',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ImpuestosProdIndex />,
        },
      ],
    },
  ],
};

export default ImpuestosProdConfig;