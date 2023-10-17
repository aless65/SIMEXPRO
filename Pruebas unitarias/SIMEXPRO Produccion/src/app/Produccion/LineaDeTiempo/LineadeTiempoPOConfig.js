import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const LineadeTiempoPOIndex = lazy(() => import('./LineadeTiempoPO'));

const LineadeTiempoPOConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.LineadeTiempoPO,
    routes: [
        {
            path: 'LineadeTiempoPO',
            children: [
                {
                    path: '',
                    element: <Navigate to="index" />,
                },
                {
                    path: 'index',
                    element: <LineadeTiempoPOIndex />,
                },
            ],
        },
    ],
};

export default LineadeTiempoPOConfig;