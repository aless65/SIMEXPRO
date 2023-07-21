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
          {
            id: 'Ubicaciones.ciudades',
            title: 'Ciudades',
            type: 'item',
            icon: 'material-outline:business',
            url: 'Ciudades/Index',
          },
          {
            id: 'Ubicaciones.aldeas',
            title: 'Aldeas',
            type: 'item',
            icon: 'material-outline:cabin',
            url: '/Aldea/Index',
          },
          {
            id: 'Ubicaciones.colonias',
            title: 'Colonias',
            type: 'item',
            icon: 'material-outline:holiday_village',
            url: '/Colonias/Index',
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
            id: 'Personas.estados_civiles',
            title: 'Estados Civiles',
            type: 'item',
            icon: 'material-outline:male',
            url: 'EstadosCiviles/Index',
          },
          {
            id: 'Personas.empleados',
            title: 'Empleados ',
            type: 'item',
            icon: 'material-outline:groups',
            url: 'Empleados/Index',
          },
          {
            id: 'Personas.proveedores',
            title: 'Proveedores ',
            type: 'item',
            icon: 'heroicons-solid:user',
            url: '/Proveedores/Index',
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
  {
    id: 'Produccion',
    title: 'Produccion',
    type: 'group',
    icon: 'material-outline:content_cut',
    translate: 'PRODUCCIÓN',
    children: [
      {
        id: 'apps.ecommerce',
        title: 'ECommerce',
        type: 'collapse',
        icon: 'material-outline:content_cut',
        translate: 'Producción',
        children: [
          {
            id: 'Produccion.AsignacionesModulo',
            title: 'Planificación',
            type: 'item',
            icon: 'material-outline:hail',
            url: '/Planificacion/Index',
          },
          {
            id: 'Produccion.Inspecciones',
            title: 'Inspecciones',
            type: 'item',
            icon: 'material-outline:manage_search',
            url: '/Inspecciones/Index',
          },
          {
            id: 'Produccion.Modulos',
            title: 'Módulos',
            type: 'item',
            icon: 'material-outline:iron',
            url: '/Modulo/Index',
          },
          {
            id: 'Produccion.OrdenProcesos',
            title: 'Orden de Procesos',
            type: 'item',
            icon: 'material-outline:insights',
            url: '/OrdenProcesos/Index',
          },
          {
            id: 'Produccion.OrdenCompra',
            title: 'Órden de Compra',
            type: 'item',
            icon: 'material-outline:library_books',
            url: '/OrdenCompra/Index',
          },
          {
            id: 'Produccion.OrdenPedido',
            title: 'Órden de Pedido',
            type: 'item',
            icon: 'material-outline:library_books',
            url: '/OrdenPedido/Index',
          },
          {
            id: 'Produccion.PedidosProduccion',
            title: 'Pedidos de Producción',
            type: 'item',
            icon: 'material-outline:local_mall',
            url: 'PedidosProduccion/Index',
          },
          {
            id: 'Produccion.Procesos',
            title: 'Procesos',
            type: 'item',
            icon: 'material-outline:mediation',
            url: '/Procesos/Index',
          },
          {
            id: 'Produccion.RevisionCalidad',
            title: 'Revisión de Calidad',
            type: 'item',
            icon: 'material-outline:pageview',
            url: '/RevisionCalidad/Index',
          },
          {
            id: 'Produccion.RevisionModuloDia',
            title: 'Revision de Módulo',
            type: 'item',
            icon: 'material-outline:recycling',
            url: '/Produccion/RevisionModuloDia',
          },
        ],
      },
      {
        id: 'Produccion.Maquinaria',
        title: 'Maquinaria',
        type: 'collapse',
        icon: 'material-outline:account_tree   ',
        translate: 'Maquinaria',
        children: [
          {
            id: 'Maquinaria.FuncionesMaquina',
            title: 'Funciones de Máquinas',
            type: 'item',
            icon: 'material-outline:bike_scooter',
            url: '/FuncionesMaquina/Index',
          },
          {
            id: 'Maquinaria.MaquinaHistorial',
            title: 'Historial de Máquina',
            type: 'item',
            icon: 'material-outline:all_inbox',
            url: '/MaquinaHistorial/Index',
          },
          {
            id: 'Maquinaria.MarcasMaquina',
            title: 'Marcas de Máquinas',
            type: 'item',
            icon: 'material-outline:auto_stories',
            url: '/Marcas/Index',
          },
          {
            id: 'Maquinaria.Maquinas',
            title: 'Máquinas',
            type: 'item',
            icon: 'material-outline:precision_manufacturing',
            url: '/Maquinas/Index',
          },

          {
            id: 'Maquinaria.ModelosMaquina',
            title: 'Modelos de Máquinas',
            type: 'item',
            icon: 'material-outline:biotech',
            url: '/ModelosMaquinas/Index',
          },
        ],
      },
      {
        id: 'Produccion.Inventario',
        title: 'Inventario',
        type: 'collapse',
        icon: 'material-outline:store',
        translate: 'Inventario',
        children: [
          {
            id: 'Inventario.Areas',
            title: 'Áreas',
            type: 'item',
            icon: 'material-outline:all_inbox',
            url: '/Areas/Index',
          },
          {
            id: 'Inventario.Categorias',
            title: 'Categorías',
            type: 'item',
            icon: 'material-outline:category',
            url: '/Categoria/Index',
          },
          {
            id: 'Inventario.Lotes',
            title: 'Lotes',
            type: 'item',
            icon: 'material-outline:card_membership',
            url: '/Lotes/Index',
          },
          {
            id: 'Inventario.Materiales',
            title: 'Materiales',
            type: 'item',
            icon: 'material-outline:bakery_dining',
            url: '/Materiales/Index',
          },
          {
            id: 'Inventario.MaterialesBrindar',
            title: 'Materiales a Brindar',
            type: 'item',
            icon: 'material-outline:business_center',
            url: '/Inventario/MaterialesBrindar',
          },
          {
            id: 'Inventario.PedidosOrden',
            title: 'Órden de Pedido',
            type: 'item',
            icon: 'material-outline:fact_check',
            url: '/Inventario/PedidosOrden',
          },
          {
            id: 'Inventario.Subcategorias',
            title: 'Subcategorías',
            type: 'item',
            icon: 'material-outline:apps',
            url: '/Subcategorias/Index',
          },
          {
            id: 'Inventario.TipoEmbalaje',
            title: 'Tipo de Embalaje',
            type: 'item',
            icon: 'material-outline:integration_instructions',
            url: '/TipoEmbalaje/Index',
          },
        ]
      },
      {
        id: 'produccion.prendas',
        title: 'Prendas',
        type: 'collapse',
        icon: 'material-outline:checkroom',
        translate: 'Prendas',
        children: [
          {
            id: 'Prendas.Colores',
            title: 'Colores',
            type: 'item',
            icon: 'material-outline:format_color_fill',
            url: '/Colores/Index',
          },

          {
            id: 'Prendas.Estilos',
            title: 'Estilos',
            type: 'item',
            icon: 'material-outline:design_services',
            url: '/Estilos/Index',
          },
          {
            id: 'Prendas.Modelos',
            title: 'Modelos',
            type: 'item',
            icon: 'material-outline:document_scanner',
            url: '/Modelos/Index',
          }, {
            id: 'Prendas.Tallas',
            title: 'Tallas',
            type: 'item',
            icon: 'material-outline:dry_cleaning',
            url: '/Tallas/Index',
          }
        ],
      },
    ],
  },
];




export default navigationConfig;
