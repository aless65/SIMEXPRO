import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const CodigoImpuestoIndex = lazy(() => import('./CodigoImpuesto'));

const CodigoImpuestoConfig = {
    settings:{
        layout: {
            config: {}
        },
    },
    auth: authRoles.CodigoImpuestos,
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