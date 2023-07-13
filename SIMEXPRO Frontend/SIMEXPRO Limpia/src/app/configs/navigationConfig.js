import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
    {
        id: 'generales',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons-outline:home',
        translate: 'GENERALES',
        children: [
          {
            id: 'generales.aldeas',
            title: 'Aldeas',
            type: 'item',
            icon: 'heroicons-outline:clipboard-check',
            url: '/generales/aldeas',
          },
          {
            id: 'generales.cargos',
            title: 'Cargos',
            type: 'item',
            icon: 'heroicons-outline:chart-pie',
            url: '/generales/cargos',
          },
          {
            id: 'generales.ciudades',
            title: 'Ciudades',
            type: 'item',
            icon: 'heroicons-outline:cash',
            url: '/generales/finance',
          },
        ],
      }
];

export default navigationConfig;
