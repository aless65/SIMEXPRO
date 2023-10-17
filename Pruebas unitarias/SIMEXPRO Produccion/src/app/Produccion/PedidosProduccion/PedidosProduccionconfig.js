import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';


const PedidosProduccion = lazy(() => import('./PedidosProduccion'));
const PedidosProduccion2 = lazy(()=> import('./PedidosProduccion_Crear'))
const PedidosProduccionCrear = lazy(()=> import('./PedidosProduccionCrear'))
const PedidosProduccionEditar  = lazy(()=> import('./PedidosProduccionEditar'))

const PedidosProduccionConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.PedidosProduccion,
    routes: [
        {
            path: 'PedidosProduccion',
            children: [
                {
                    path: '',
                    element: <Navigate to="index" replace />,
                },
                {
                    path: 'index',
                    element: <PedidosProduccion />,
                },
                {
                    path: 'crear2',
                    element: <PedidosProduccion2 />,
                },
                {
                    path: 'crear',
                    element: <PedidosProduccionCrear />,
                },
                {
                    path: 'editar',
                    element: <PedidosProduccionEditar />,
                },
            ],
        },
    ],
}


export default PedidosProduccionConfig;
