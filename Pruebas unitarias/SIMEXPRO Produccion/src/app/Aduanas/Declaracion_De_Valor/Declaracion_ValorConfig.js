import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const Declaracion_ValorIndex = lazy(() => import('./Declaracion_Valor_Index'));
const Declaracion_ValorCrear = lazy(() => import('./DeclaracionValorCrear/DeclaracionValor_Crear'));
const Declaracion_ValorEditar = lazy(() => import('./DeclaracionValorEditar/DeclaracionValor_Editar'));
const Declaracion_ValorReporte = lazy(() => import('./DeclaracionValorReporte/DeclaracionValor_Reporte'));

const Declaracion_ValorConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.Declaracionvalor,
  routes: [
    {
      path: 'Declaracion_Valor',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <Declaracion_ValorIndex />,
        },
        {
            path: 'crear',
            element: <Declaracion_ValorCrear />,
          },
          {
            path: 'editar',
            element: <Declaracion_ValorEditar />,
          },
          {
            path: 'reporte',
            element: <Declaracion_ValorReporte />,
          },
      ],
    },
  ],
};

export default Declaracion_ValorConfig;