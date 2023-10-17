import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from '../../auth';

const OrdenCompraIndex = lazy(() => import('./OrdenCompra'));

const OrdenCompraCrear = lazy(() => import('./OrdenCompra_Crear'));

const OrdenCompraEditar = lazy(() => import('./OrdenCompra_Editar'));

//const OrdenCompraReporte = lazy(() => import('./'));

//const OrdenCompraEditar = lazy(() => import('./OrdenCompra_Editar'));

//const OrdenCompraReporte = lazy(() => import('./OrdenCompra_Reporte'));

const OrdenCompraConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.OrdenCompra,
  routes: [
    {
      path: 'OrdenCompra',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OrdenCompraIndex />,
        },

        {
          path: 'Crear',
          element: <OrdenCompraCrear />,
        },

        {
          path: 'Editar',
          element: <OrdenCompraEditar />,
        },

        // {
        //   path: 'Reporte',
        //   element: <OrdenCompraReporte />,
        // },
      ],
    },
  ],
};

export default OrdenCompraConfig;