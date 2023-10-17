import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const PruebaPdfsIndex = lazy(() => import('./PruebaPdfs'));

const PruebaPdfsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'PruebPdfs',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <PruebaPdfsIndex />,
        },
      ],
    },
  ],
};

export default PruebaPdfsConfig;