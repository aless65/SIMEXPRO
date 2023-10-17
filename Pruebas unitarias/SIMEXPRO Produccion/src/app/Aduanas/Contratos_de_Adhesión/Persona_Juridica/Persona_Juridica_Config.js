import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const Persona_Juridica_Index = lazy(() => import('./Persona_Juridica_Index'));
const Persona_Juridica_Agregar = lazy(() => import('./Persona_Juridica_Agregar'));
const Persona_Juridica_Editar = lazy(() => import('./Persona_Juridica_Editar'));
const Persona_JuridicaReporte = lazy(() => import('./Persona_JuridicaReporte'));

const PersonaJuridicaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.PersonaJuridica,
  routes: [
    {
      path: '/PersonaJuridica',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <Persona_Juridica_Index />,
        },
        {
          path: 'crear',
          element: <Persona_Juridica_Agregar />,
        },
        {
          path: 'editar',
          element: <Persona_Juridica_Editar />,
        },
        {
          path: 'reporte',
          element: <Persona_JuridicaReporte />,
        },
      ],
    },
  ],
};

export default PersonaJuridicaConfig;