import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const DucaIndex = lazy(() => import('./duca_Index'));
const DucaCrear = lazy(() => import('./duca_Crear'));
const DucaEditar = lazy(() => import('./duca_Editar'))
const DucaReporte = lazy(() => import('./ducaReporte'));

const DucaConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.Duca,
    routes: [
        {
            path: 'Duca',
            children: [
                {
                    path: '',
                    element: <Navigate to="index" />,
                },
                {
                    path: 'index',
                    element: <DucaIndex />,
                },
                {
                    path: 'crear',
                    element: <DucaCrear />,
                },
                {
                    path: 'editar',
                    element: <DucaEditar />,
                },
                {
                    path: 'reporte',
                    element: <DucaReporte />,
                },
            ],
        },
    ],
};

export default DucaConfig;