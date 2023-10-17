import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const BoletinDePagoIndex = lazy(() => import('./BoletinDePago'));
const BoletinDePagoCrear = lazy(() => import('./BoletinDePagoCrear'));
const BoletindePagoEditar = lazy(() => import('./BoletinDePagoEditar'));
const ImpresionBoletinDePago = lazy(() => import('./ImpresionBoletinDePago'));

const BoletinDePagoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.BoletinPago,
  routes: [
    {
      path: 'BoletinDePago',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <BoletinDePagoIndex />,
        },
        {
          path: 'crear',
          element: <BoletinDePagoCrear />,
        },
        {
          path: 'editar',
          element: <BoletindePagoEditar />,
        },
        {
          path: 'imprimir',
          element: <ImpresionBoletinDePago />,
        },
      ],
    },
  ],
};

export default BoletinDePagoConfig;