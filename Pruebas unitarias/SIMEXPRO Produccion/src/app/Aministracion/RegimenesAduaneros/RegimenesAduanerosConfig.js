import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const RegimenesAduanerosIndex = lazy(() => import('./RegimenesAduaneros'));

const RegimenesAduanerosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.RegimenesAduaneros,
  routes: [
    {
      path: 'RegimenesAduaneros',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <RegimenesAduanerosIndex />,
        },
      ],
    },
  ],
};

export default RegimenesAduanerosConfig;