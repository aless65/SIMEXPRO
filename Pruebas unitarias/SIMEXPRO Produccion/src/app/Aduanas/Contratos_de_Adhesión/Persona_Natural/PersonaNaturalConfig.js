import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const PersonaNaturalIndex = lazy(() => import('./PersonaNatural_Index'));
const PersonaNaturalCrear = lazy(() => import('./PersonaNatural_Crear'));
const PersonaNaturalReporte = lazy(() => import('./PersonaNatural_Reporte'));

const PersonaNaturalConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.PersonaNatural,
  routes: [
    {
      path: 'PersonaNatural',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <PersonaNaturalIndex />,
        },
        {
          path: 'crear',
          element: <PersonaNaturalCrear />,
        },
        {
          path: 'Reporte',
          element: <PersonaNaturalReporte />,
        },
      ],
    },
  ],
};

export default PersonaNaturalConfig;