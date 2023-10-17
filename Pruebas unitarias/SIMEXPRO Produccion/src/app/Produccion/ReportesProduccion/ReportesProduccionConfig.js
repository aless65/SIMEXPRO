/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const Reporte_TiemposMaquinas = lazy(() => import('./Reporte_TiemposMaquinas'));
const Reporte_ProduccionPorModulo = lazy(() => import('./Reporte_ProduccionPorModulo'));
const PedidosCliente = lazy(() => import('./Reporte_PedidosCliente'));
const PlanificacionPO = lazy(() => import('./Reporte_Planificacion_OrdenCompra'));
const Reporte_ConsumoMateriales = lazy(() => import('./Reporte_ConsumoMateriales'));
const Reporte_SeguimientoProcesosPO = lazy(() => import('./Reporte_SeguimientoProcesosPO'));
const Reporte_ProduccionPorAreaYfechas = lazy(() => import('./Reporte_ProduccionPorAreaYfechas'));
const Reporte_MaterialesPorPO = lazy(() => import('./Reporte_MaterialesPorPO'));
const Reporte_IngresoMateriales = lazy(() => import('./Reporte_IngresoMateriales'));
const Reporte_CostosMaterialesNoBrindados = lazy(() =>
  import('./Reporte_CostosMaterialesNoBrindados')
);
const MaquinasUso = lazy(() => import('./Reporte_MaquinasUso'));
const Inventario = lazy(() => import('./Reporte_Materiales_Inventario'));

const ReportesTiempoMaquina = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.TiemposMaquinas,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'TiemposMaquinas',
          element: <Reporte_TiemposMaquinas />,
        },
      ],
    },
  ],
};
const ReportesProduccionPorModulo = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ProduccionPorModulo,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'ProduccionPorModulo',
          element: <Reporte_ProduccionPorModulo />,
        },
      ],
    },
  ],
};
const ReportesPedidosCliente = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.PedidosCliente,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'PedidosCliente',
          element: <PedidosCliente />,
        },
      ],
    },
  ],
};
const ReportesPlanificacionOrdenCompra = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.PlanificacionOrdenCompra,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'PlanificacionOrdenCompra',
          element: <PlanificacionPO />,
        },
      ],
    },
  ],
};
const ReportesConsumoMateriales = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ConsumoMateriales,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'ConsumoMateriales',
          element: <Reporte_ConsumoMateriales />,
        },
      ],
    },
  ],
};
const ReportesCostoProduccion = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.CostosdeProduccion,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'CostosdeProduccion',
          element: <Reporte_CostosMaterialesNoBrindados />,
        },
      ],
    },
  ],
};
const ReportesMaquinasUso = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.MaquinasUso,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'MaquinasUso',
          element: <MaquinasUso />,
        },
      ],
    },
  ],
};
const ReportesInventario = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ReporteInventario,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'Inventario',
          element: <Inventario />,
        },
      ],
    },
  ],
};
const ReportesProduccionArea = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ProduccionPorAreayfechas,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'ProduccionPorAreayfechas',
          element: <Reporte_ProduccionPorAreaYfechas />,
        },
      ],
    },
  ],
};
const ReportesSeguimientoProcesoPO = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.SeguimientodeProcesosPO,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'SeguimientodeProcesosPO',
          element: <Reporte_SeguimientoProcesosPO />,
        },
      ],
    },
  ],
};
const ReportesMaterialesaPorPO = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.MaterialesPorPO,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'MaterialesPorPO',
          element: <Reporte_MaterialesPorPO />,
        },
      ],
    },
  ],
};
const ReportesIngresoMateriales = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.IngresoMateriales,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'IngresoMateriales',
          element: <Reporte_IngresoMateriales />,
        },
      ],
    },
  ],
};
// const ReportesProduccionConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   auth: authRoles.Reportes,
//   routes: [
//     {
//       path: 'Reportes',
//       children: [
//         {
//           path: 'TiemposMaquinas',
//           element: <Reporte_TiemposMaquinas />,
//         },
//         {
//           path: 'ProduccionPorModulo',
//           element: <Reporte_ProduccionPorModulo />,
//         },
//         {
//           path: 'PedidosCliente',
//           element: <PedidosCliente />,
//         },
//         {
//           path: 'PlanificacionOrdenCompra',
//           element: <PlanificacionPO />,
//         },
//         {
//           path: 'ConsumoMateriales',
//           element: <Reporte_ConsumoMateriales />,
//         },
//         {
//           path: 'CostosdeProduccion',
//           element: <Reporte_CostosMaterialesNoBrindados />,
//         },
//         {
//           path: 'MaquinasUso',
//           element: <MaquinasUso />,
//         },
//         {
//           path: 'Inventario',
//           element: <Inventario />,
//         },
//         {
//           path: 'ProduccionPorAreayfechas',
//           element: <Reporte_ProduccionPorAreaYfechas />,
//         },
//         {
//           path: 'SeguimientodeProcesosPO',
//           element: <Reporte_SeguimientoProcesosPO />,
//         },
//         {
//           path: 'MaterialesPorPO',
//           element: <Reporte_MaterialesPorPO />,
//         },
//         {
//           path: 'IngresoMateriales',
//           element: <Reporte_IngresoMateriales />,
//         },
//       ],
//     },
//   ],
// };

const ReportesProduccionConfig = [
  ReportesConsumoMateriales,
  ReportesCostoProduccion,
  ReportesIngresoMateriales,
  ReportesInventario,
  ReportesMaquinasUso,
  ReportesMaterialesaPorPO,
  ReportesPedidosCliente,
  ReportesPlanificacionOrdenCompra,
  ReportesProduccionArea,
  ReportesProduccionPorModulo,
  ReportesSeguimientoProcesoPO,
  ReportesTiempoMaquina,
]

export default ReportesProduccionConfig;
