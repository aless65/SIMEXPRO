import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const Tratados = lazy(() => import('./Tratados'));

const TratadosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.All,
  routes: [
    {
      path: 'Tratados',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <Tratados />,
        },
      ],
    },
  ],
};

export default TratadosConfig;