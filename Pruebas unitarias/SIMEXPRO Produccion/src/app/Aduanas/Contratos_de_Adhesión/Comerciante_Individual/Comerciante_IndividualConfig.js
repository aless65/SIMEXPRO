import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const Comerciante_Individual_Index = lazy(() => import('./Comerciante_Individual_Index'));
const Comerciante_Individual_Agregrar = lazy(() => import('./Comerciante_Individual_Agregrar'));
const Comerciante_IndividualReporte = lazy(() => import('./Comerciante_IndividualReporte'));
const Comerciante_Individual_Editar = lazy(()=> import('./Comerciante_Individual_Editar'));

const Comerciante_IndividualConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ComercianteIndividual,
  routes: [
    {
      path: 'ComercianteIndividual',
      children: [
        {
          path: '',
          element: <Navigate to="Index" />,
        },
        {
          path: 'Index',
          element: <Comerciante_Individual_Index />,
        },
        {
          path: 'Crear',
          element: <Comerciante_Individual_Agregrar />,
        },
        {
          path: 'Reporte',
          element: <Comerciante_IndividualReporte />,
        },
        {
          path: 'Editar',
          element: <Comerciante_Individual_Editar />,
        },

      ],
    },
  ],
};

export default Comerciante_IndividualConfig;