import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const MarcasMaquinasIndex = lazy(() => import('./MarcasMaquina'));

const MarcasMaquinaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.MarcaMaquinas,
  routes: [
    {
      path: 'MarcasMaquina',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MarcasMaquinasIndex />,
        },
      ],
    },
  ],
};

export default MarcasMaquinaConfig;