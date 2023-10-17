import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from '../auth';

const FacturasExportacion = lazy(() => import('./FacturaExportacion'));
const FacturasExportacionCrear = lazy(() => import('./FacturaExportacionCrear'));
const FacturasExportacionEditar = lazy(() => import('./FacturaExportacionEditar'));


const FacturasExportacionConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.FacturaExportacion,
    routes: [
        {
            path: 'FacturasExportacion',
            children: [
                {
                    path: '',
                    element: <Navigate to="index" replace />,
                },
                {
                    path: 'index',
                    element: <FacturasExportacion />,
                },
                {
                    path: 'crear',
                    element: <FacturasExportacionCrear />,
                },
                {
                    path: 'editar',
                    element: <FacturasExportacionEditar />,
                },
            ],
        },
    ],
}

    
export default FacturasExportacionConfig;
