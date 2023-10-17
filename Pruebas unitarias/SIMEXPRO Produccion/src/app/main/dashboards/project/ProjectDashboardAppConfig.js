import { lazy } from 'react';
import { authRoles } from 'src/app/auth';
const ProjectDashboardApp = lazy(() => import('./ProjectDashboardApp'));

const ProjectDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.InicioProduccion,
  routes: [
    {
      path: 'Inicio/Produccion',
      element: <ProjectDashboardApp />,
    },
  ],
};

export default ProjectDashboardAppConfig;
