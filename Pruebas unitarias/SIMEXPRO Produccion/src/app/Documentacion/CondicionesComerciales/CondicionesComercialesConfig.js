import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const CondicionesComercialesIndex = lazy(() => import('./CondicionesComerciales'));

const CondicionesComercialesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.CondicionComercial,
  routes: [
    {
      path: 'CondicionesComerciales',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <CondicionesComercialesIndex />,
        },
      ],
    },
  ],
};

export default CondicionesComercialesConfig;