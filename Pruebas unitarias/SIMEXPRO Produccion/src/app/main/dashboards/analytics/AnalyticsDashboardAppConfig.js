import { lazy } from 'react';
import { authRoles } from 'src/app/auth';
const AnalyticsDashboardApp = lazy(() => import('./AnalyticsDashboardApp'));

const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.InicioAduana,
  routes: [
    {
      path: 'Inicio/Aduana',
      element: <AnalyticsDashboardApp />,
    },
  ],
};

export default AnalyticsDashboardAppConfig;
