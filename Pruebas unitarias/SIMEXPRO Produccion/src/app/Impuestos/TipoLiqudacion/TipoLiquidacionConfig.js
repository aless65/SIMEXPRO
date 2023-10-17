import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const TipoLiquidacionIndex = lazy(() => import('./TipoLiquidacion'));

const TipoLiquidacionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.TipoLiquidacion,
  routes: [
    {
      path: 'TipoLiquidacion',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TipoLiquidacionIndex />,
        },
      ],
    },
  ],
};

export default TipoLiquidacionConfig;