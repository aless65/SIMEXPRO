import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const DocumentosDeSancionesIndex = lazy(() => import('./DocumentosDeSancionesIndex'));

const DocumentosDeSancionesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.DocumentoSanciones,
  routes: [
    {
      path: 'DocumentosDeSanciones',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'Index',
          element: <DocumentosDeSancionesIndex />,
        },
      ],
    },
  ],
};

export default DocumentosDeSancionesConfig;