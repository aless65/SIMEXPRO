import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const AduanaIndex = lazy(() => import('./Aduana'));
const AduanaCrear = lazy(() => import('./AduanaCrear'));
const AduanaEditar = lazy(() => import('./AduanaEditar'));

const AduanaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Aduana,
  routes: [
    {
      path: 'Aduana',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'Index',
          element: <AduanaIndex />,
        },
        {
          path: 'crear',
          element: <AduanaCrear />,
        },
        {
          path: 'editar',
          element: <AduanaEditar />,
        },
      ],
    },
  ],
};

export default AduanaConfig;