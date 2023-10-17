import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const MaintenancePage = lazy(() => import('./MaintenancePage'));

const maintenanceServerConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'Error/Mantenimiento',
      element: <MaintenancePage />,
    },
  ],
};

export default maintenanceServerConfig;
