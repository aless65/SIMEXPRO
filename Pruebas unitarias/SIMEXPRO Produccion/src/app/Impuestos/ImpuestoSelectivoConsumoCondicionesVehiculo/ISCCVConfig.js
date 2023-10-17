import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ImpuestoSELCondicionesVehiculoIndex = lazy(() => import('./ISCCV'));

const ImpuestoSelectivoConsumoCondicionesVehiculoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Ecotasa,
  routes: [
    {
      path: 'ImpuestosSELCondicionesVehiculo',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ImpuestoSELCondicionesVehiculoIndex />,
        },
      ],
    },
  ],
};

export default ImpuestoSelectivoConsumoCondicionesVehiculoConfig;