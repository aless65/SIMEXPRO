import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const Reporte_Importaciones = lazy(() => import('./Reporte_Importaciones'));
const Reporte_DevasPendientes = lazy(() => import('./Reporte_DevasPendientes'));
const Reporte_ContratosAdhesion = lazy(() => import('./Reporte_ContratosAdhesion'));
const Reporte_ProduccionPorPais = lazy(() => import('./Reporte_ExportacionPorPais'));


const ReporteImportaciones  = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ReporteImportaciones,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'Importaciones',
          element: <Reporte_Importaciones />,
          auth: ['panamericano'],
        },
      ],
    },
  ],
};

const ReporteDevas  = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.DevasPendientes,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'DevasPendientes',
          element: <Reporte_DevasPendientes />,
        },
      ],
    },
  ],
};

const ReporteContratoAdhesion  = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ReportesContratosAdhesion,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'ContratosAdhesion',
          element: <Reporte_ContratosAdhesion />,
        },
      ],
    },
  ],
};

const ReporteProduccionPorPais  = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ReporteProduccionPorPais,
  routes: [
    {
      path: 'Reportes',
      children: [
        {
          path: 'ProduccionPorPais',
          element: <Reporte_ProduccionPorPais />,
        },
      ],
    },
  ],
};


const ReportesAduanaConfig = [
  ReporteImportaciones,
  ReporteDevas,
  ReporteContratoAdhesion,
  ReporteProduccionPorPais,
]

export default ReportesAduanaConfig;