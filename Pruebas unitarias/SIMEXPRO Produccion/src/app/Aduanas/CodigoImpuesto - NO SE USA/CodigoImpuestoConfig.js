import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const CodigoImpuestoIndex = lazy(() => import('./CodigoImpuesto'));

const CodigoImpuestoConfig = {
    settings:{
        layout: {
            config: {}
        },
    },
    auth: authRoles.admin,
    routes:[
        {
            path: 'CodigoImpuesto',
            children: [
                {
                    path: '',
                    element: <Navigate to="index" />,
                },
                {
                    path: 'index',
                    element: <CodigoImpuestoIndex />,
                },
            ],
        },
    ],
};

export default CodigoImpuestoConfig;