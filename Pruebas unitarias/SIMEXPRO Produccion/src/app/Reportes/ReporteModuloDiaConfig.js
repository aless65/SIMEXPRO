import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from '../auth';

const ReporteModuloDiaIndex = lazy(() => import('./RevisionModuloDia'));
const ReporteModuloDiaCrear = lazy(() => import('./ReporteModuloDia_Crear'));
const ReporteModuloDiaReporte = lazy(() => import('./ReporteModuloDiaReporte'));

const ReporteModuloDiaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.ReportesModulos,
  routes: [
    {
      path: 'ReporteModulo',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ReporteModuloDiaIndex />,
        },
        {
          path: 'crear',
          element: <ReporteModuloDiaCrear />,
        },
        {
          path: 'Reporte',
          element: <ReporteModuloDiaReporte />,
        },
      ],
    },
  ],
};

export default ReporteModuloDiaConfig;