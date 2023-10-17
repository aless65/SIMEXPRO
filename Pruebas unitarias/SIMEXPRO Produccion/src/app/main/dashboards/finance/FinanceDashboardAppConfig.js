import { lazy } from 'react';
import { authRoles } from 'src/app/auth';
const FinanceDashboardApp = lazy(() => import('./FinanceDashboardApp'));

const FinanceDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.All,
  routes: [
    {
      path: 'Inicio/Blank',
      element: <FinanceDashboardApp />,
    },
  ],
};

export default FinanceDashboardAppConfig;
