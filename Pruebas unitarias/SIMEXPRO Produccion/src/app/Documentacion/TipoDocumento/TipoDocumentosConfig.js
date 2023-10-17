import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const TipoDocumentoIndex = lazy(() => import('./TipoDocumentos'));

const TipoDocumentoConfig = {
    settings:{
        layout: {
            config: {}
        },
    },
    auth: authRoles.TipoDocumento,
    routes:[
        {
            path: 'TipoDocumentos',
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