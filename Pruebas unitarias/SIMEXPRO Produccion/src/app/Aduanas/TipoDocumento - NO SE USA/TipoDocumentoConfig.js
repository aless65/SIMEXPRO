import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const TipoDocumentoIndex = lazy(() => import('./TipoDocumento'));

const TipoDocumentoConfig = {
    settings:{
        layout: {
            config: {}
        },
    },
    auth: authRoles.TipoDocumento,
    routes:[
        {
            path: 'TipoDocumento',
            children: [
                {
                    path: '',
                    element: <Navigate to="index" />,
                },
                {
                    path: 'index',
                    element: <TipoDocumentoIndex />,
                },
            ],
        },
    ],
};

export default TipoDocumentoConfig;