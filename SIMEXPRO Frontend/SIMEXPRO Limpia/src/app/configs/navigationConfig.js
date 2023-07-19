import i18next from 'i18next';
import '@material-ui/icons';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'Inicio',
    title: 'Inicio',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'INICIO',
    children: [
      {
        id: 'Inicio.Inicio',
        title: 'Inicio',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/dashboards/analytics',
      },    
    ],
  },
  {
    id: 'Seguridad',
    title: 'Seguridad',
    type: 'group',
    icon: 'material-outline:content_cut',
    translate: 'SEGURIDAD',
    children: [
      {
        id: 'apps.ecommerce',
        title: 'ECommerce',
        type: 'collapse',
        icon: 'material-outline:content_cut',
        translate: 'Acceso',
        children: [ 
          {
            id: 'Seguridad.Usuarios',
            title: 'Usuarios',
            type: 'item',
            icon: 'material-outline:hail',
            url: '/Usuarios/Index',
          },
          {
            id: 'Seguridad.Roles',
            title: 'Roles',
            type: 'item',
            icon: 'material-outline:manage_search',
            url: '/Roles/RolesIndex',
          },
        ],
      },
    ],
  },
  {
    id: 'Generales',
    title: 'Generales',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'GENERALES',
    children: [
      {
        id: 'Generales.Generales',
        title: 'ECommerce',
        type: 'collapse',
        icon: 'heroicons-outline:bookmark-alt',
        translate: 'Generales',
        children: [
          {
            id: 'Generales.formas_envio',
            title: 'Formas de envío',
            type: 'item',
            icon: 'material-outline:taxi_alert',
            url: '/FormaDeEnvio/Index',
          },
          {
            id: 'Generales.monedas',
            title: 'Monedas',
            type: 'item',
            icon: 'material-outline:attach_money',
            url: 'Monedas/Index',
          },
          {
            id: 'Personas.oficinas',
            title: 'Oficinas',
            type: 'item',
            icon: 'material-outline:computer',
            url: 'Oficinas/Index',
          },
          {
            id: 'Personas.oficios_profesiones',
            title: 'Oficios y Profesiones',
            type: 'item',
            icon: 'heroicons-outline:academic-cap',
            url: 'OficiosProfesiones/Index',
          },        
        ],
      },
      {
        id: 'general.ubicaciones',
        title: 'Ubicaciones',
        type: 'collapse',
        icon: 'material-outline:public',
        translate: 'Ubicaciones',
        children: [
          {
            id: 'Ubicaciones.aldeas',
            title: 'Aldeas',
            type: 'item',
            icon: 'material-outline:cabin',
            url: '/Aldea/Index',
          },
          {
            id: 'Ubicaciones.ciudades',
            title: 'Ciudades',
            type: 'item',
            icon: 'material-outline:business',
            url: 'Ciudades/Index',
          },
          {
            id: 'Ubicaciones.colonias',
            title: 'Colonias',
            type: 'item',
            icon: 'material-outline:holiday_village',
            url: '/Ubicaciones/Colonias',
          },
          {
            id: 'Ubicaciones.paises',
            title: 'Países',
            type: 'item',
            icon: 'material-outline:map',
            url: 'Paises/Index',
          },
          {
            id: 'Ubicaciones.provincias',
            title: 'Provincias',
            type: 'item',
            icon: 'material-outline:house',
            url: 'Provincias/Index',
          },
        ],
      },   
            {
                id: 'general.Personas',
                title: 'Personas',
                type: 'collapse',
                icon: 'material-outline:emoji_people',
                translate: 'Personas',
                children: [
                    {
                        id: 'Personas.cargos',
                        title: 'Cargos',
                        type: 'item',
                        icon: 'material-outline:cleaning_services',
                        url: 'Cargos/Index',
                    },
                    {
                        id: 'Personas.Clientes',
                        title: 'Clientes',
                        type: 'item',
                        icon: 'material-outline:groups',
                        url: '/Personas/Clientes',
                    },
                    {
                      id: 'Personas.proveedores',
                      title: 'Proveedores ',
                      type: 'item',
                      icon: 'material-outline:local_shipping',
                      url: '/Personas/Proveedores',
                    },
                    {
                      id: 'Personas.estados_civiles',
                      title: 'Estados Civiles',
                      type: 'item',
                      icon: 'material-outline:male',
                      url: 'EstadosCiviles/Index',
                    },
        ],
      },
    ],
  },
  {
    id: 'Aduanas',
    title: 'Aduanas',
    type: 'group',
    icon: 'material-outline:content_cut',
    translate: 'ADUANAS',
    children: [
      {
        id: 'ContratoAdhesion',
        title: 'Contrato de Adhesión',
        type: 'collapse',
        icon: 'material-outline:contact_mail',
        translate: '',
        children: [
          {
            id: 'ContratoAdhesion.PersonaNatural',
            title: 'Persona Natural',
            type: 'item',
            icon: 'heroicons-solid:user',
            url: '/Contrato-de-Adhesion-Persona-Natural/Index',
          },
          {
            id: 'ContratoAdhesion.Comerciante Individual',
            title: 'Comerciante Individual',
            type: 'item',
            icon: 'heroicons-solid:user',
            url: '/Contrato-de-Adhesion-Comerciante-Individual/Index',
          },
          {
            id: 'ContratoAdhesion.PersonaJuridica',
            title: 'Persona Juridica',
            type: 'item',
            icon: 'heroicons-solid:user',
            url: '/Contrato-de-Adhesion-Persona-Juridica/Index',
          },
        ],
      },
      {
        id: 'DeclaracionValor',
        title: 'Declaración de Valor',
        type: 'item',
        icon: 'material-outline:fact_check',
        url: 'Declaracion-de-Valor/Listado',
      },   
      {
        id: 'Duca',
        title: 'DUCA',
        type: 'collapse',
        icon: 'heroicons-outline:briefcase',
        translate: '',
        children: [
          {
            id: 'Duca.Index',
            title: 'Duca',
            type: 'item',
            icon: 'material-outline:article',
            url: 'Duca/Index',
          },
        ],
      },
      {
        id: 'BoletinPago',
        title: 'Boletin de Pago',
        type: 'collapse',
        icon: 'material-outline:point_of_sale',
        translate: '',
        children: [
          {
            id: 'BoletinPago.Index',
            title: 'Boletin de Pago',
            type: 'item',
            icon: 'material-outline:price_check',
            url: 'BoletindePago/BoletinDePagoIndex',
          },
        ],
      },
      {
        id: 'DocumentoSanciones',
        title: 'Documento de Sanciones',
        type: 'item',
        icon: 'material-twotone:find_in_page',
        url: 'Documentos/Sanciones',
      },         
    ],
  },
];

export default navigationConfig;
