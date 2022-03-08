import {NbMenuItem} from '@nebular/theme';

// MENU para ADMINISTRADORES - [Todas las opciones].
export const MENU_ADMINISTRACION: NbMenuItem[] = [
  {
    title: 'INICIO - DASHBOARD',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'REPORTES',
    group: true,
  },
  {
    title: 'Volantes analizados',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Mexicali',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Mexicali',
      },
      {
        title: 'Tijuana',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Tijuana',
      },
      {
        title: 'Ensenada',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Ensenada',
      },
      {
        title: 'Tecate',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Tecate',
      },
      {
        title: 'Rosarito',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Rosarito',
      },
    ],
  },
  {
    title: 'Trámites',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Ingresados y terminados',
        icon: {icon: 'database', pack: 'font-awesome'},
        children: [
          {
            title: 'Mexicali',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Mexicali',
          },
          {
            title: 'Tijuana',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Tijuana',
          },
          {
            title: 'Ensenada',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Ensenada',
          },
          {
            title: 'Tecate',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Tecate',
          },
          {
            title: 'Rosarito',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Rosarito',
          },
        ],
      },
    ],
  },
  {
    title: 'Carga de Analistas',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Mexicali',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Mexicali',
      },
      {
        title: 'Tijuana',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Tijuana',
      },
      {
        title: 'Ensenada',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Ensenada',
      },
      {
        title: 'Tecate',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Tecate',
      },
      {
        title: 'Rosarito',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Rosarito',
      },
      {
        title: 'Totalizado',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Totalizado',
      },
    ],
  },
  {
    title: 'ISO',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Certificados entregados con error',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/ISO/CertificadosEntregadosError',
      },
      {
        title: '% Inscripciones entregados con error',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/ISO/InscripcionesEntregadasError',
      },
      {
        title: 'Segundos análisis',
        icon: {icon: 'database', pack: 'font-awesome'},
        expanded: false,
        children: [
          {
            title: 'Inscripciones',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/ISO/SegundosAnalisis/Inscripciones',
          },
          {
            title: 'Certificaciones',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/ISO/SegundosAnalisis/Certificaciones',
          },
        ],
      },
      {
        title: 'Nuevo reporte ISO',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/ISO/',
      },
    ],
  },
  {
    title: 'Notarios',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Detallado por municipio',
        icon: {icon: 'database', pack: 'font-awesome'},
        expanded: false,
        children: [
          {
            title: 'Mexicali',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Notarios/DetalladoPorMunicipio/mexicali',
          },
          {
            title: 'Tijuana',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Notarios/DetalladoPorMunicipio/tijuana',
          },
          {
            title: 'Ensenada',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Notarios/DetalladoPorMunicipio/ensenada',
          },
          {
            title: 'Tecate',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Notarios/DetalladoPorMunicipio/tecate',
          },
          {
            title: 'Rosarito',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Notarios/DetalladoPorMunicipio/rosarito',
          },
        ],
      },
      {
        title: 'Detallado por Estado',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/Notarios/DetalladoPorEstado',
      },
      {
        title: 'Nuevo reporte notarios',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/Notarios/',
      },
    ],
  },
  /*
    {
      title: 'Bitacora Dtos con error',
      icon: {icon: 'database', pack: 'font-awesome'},
      link: '/pages/BitacoraDocumentosError',
    },
  */
  {
    title: 'INDICADORES',
    group: true,
  },
  {
    title: 'Reporte de Indicadores',
    icon: {icon: 'chart-bar', pack: 'font-awesome'},
    link: '/pages/indicadores/reporte',
  },
  {
    title: 'Captura de Indicadores',
    icon: {icon: 'keyboard', pack: 'font-awesome'},
    link: '/pages/indicadores/captura',
  },
];

// Menu para CONSULTA - [limitiado a cada municipio].
export const MENU_REPORTESMXL: NbMenuItem[] = [
  {
    title: 'INICIO - DASHBOARD',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'REPORTES',
    group: true,
  },
  {
    title: 'Volantes analizados',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Mexicali',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Mexicali',
      },
      /*
            {
              title: 'Tijuana',
              icon: {icon: 'database', pack: 'font-awesome'},
              link: '/pages/reportes/VolantesAnalizados/Municipios/Tijuana',
            },
            {
              title: 'Ensenada',
              icon: {icon: 'database', pack: 'font-awesome'},
              link: '/pages/reportes/VolantesAnalizados/Municipios/Ensenada',
            },
            {
              title: 'Tecate',
              icon: {icon: 'database', pack: 'font-awesome'},
              link: '/pages/reportes/VolantesAnalizados/Municipios/Tecate',
            },
            {
              title: 'Rosarito',
              icon: {icon: 'database', pack: 'font-awesome'},
              link: '/pages/reportes/VolantesAnalizados/Municipios/Rosarito',
            },
      */
    ],
  },
  {
    title: 'Trámites',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Ingresados y terminados',
        icon: {icon: 'database', pack: 'font-awesome'},
        children: [
          {
            title: 'Mexicali',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Mexicali',
          },
          /*
                    {
                      title: 'Tijuana',
                      icon: {icon: 'database', pack: 'font-awesome'},
                      link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Tijuana',
                    },
                    {
                      title: 'Ensenada',
                      icon: {icon: 'database', pack: 'font-awesome'},
                      link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Ensenada',
                    },
                    {
                      title: 'Tecate',
                      icon: {icon: 'database', pack: 'font-awesome'},
                      link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Tecate',
                    },
                    {
                      title: 'Rosarito',
                      icon: {icon: 'database', pack: 'font-awesome'},
                      link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Rosarito',
                    },
          */
        ],
      },
    ],
  },
  {
    title: 'Carga de Analistas',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Mexicali',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Mexicali',
      },
    ],
  },
  {
    title: 'Carga de Registradores',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Mexicali',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaRegistradores/Municipios/Mexicali',
      },
    ],
  },
  {
    title: 'INDICADORES',
    group: true,
  },
  {
    title: 'Reporte de Indicadores',
    icon: {icon: 'chart-bar', pack: 'font-awesome'},
    link: '/pages/indicadores/reporte',
  },
  {
    title: 'Captura de Indicadores',
    icon: {icon: 'keyboard', pack: 'font-awesome'},
    link: '/pages/indicadores/captura',
  },
];
export const MENU_REPORTESTIJ: NbMenuItem[] = [
  {
    title: 'INICIO - DASHBOARD',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'REPORTES',
    group: true,
  },
  {
    title: 'Volantes analizados',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Tijuana',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Tijuana',
      },
    ],
  },
  {
    title: 'Trámites',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Ingresados y terminados',
        icon: {icon: 'database', pack: 'font-awesome'},
        children: [
          {
            title: 'Tijuana',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Tijuana',
          },
        ],
      },
    ],
  },
  {
    title: 'Carga de Analistas',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Tijuana',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Tijuana',
      },
    ],
  },
  {
    title: 'Carga de Registradores',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Tijuana',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaRegistradores/Municipios/Tijuana',
      },
    ],
  },
  {
    title: 'INDICADORES',
    group: true,
  },
  {
    title: 'Reporte de Indicadores',
    icon: {icon: 'chart-bar', pack: 'font-awesome'},
    link: '/pages/indicadores/reporte',
  },
  {
    title: 'Captura de Indicadores',
    icon: {icon: 'keyboard', pack: 'font-awesome'},
    link: '/pages/indicadores/captura',
  },
];
export const MENU_REPORTESENS: NbMenuItem[] = [
  {
    title: 'INICIO - DASHBOARD',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'REPORTES',
    group: true,
  },
  {
    title: 'Volantes analizados',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Ensenada',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Ensenada',
      },
    ],
  },
  {
    title: 'Trámites',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Ingresados y terminados',
        icon: {icon: 'database', pack: 'font-awesome'},
        children: [
          {
            title: 'Ensenada',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Ensenada',
          },
        ],
      },
    ],
  },
  {
    title: 'Carga de Analistas',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Ensenada',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Ensenada',
      },
    ],
  },
  {
    title: 'Carga de Registradores',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Ensenada',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaRegistradores/Municipios/Ensenada',
      },
    ],
  },
  {
    title: 'INDICADORES',
    group: true,
  },
  {
    title: 'Reporte de Indicadores',
    icon: {icon: 'chart-bar', pack: 'font-awesome'},
    link: '/pages/indicadores/reporte',
  },
  {
    title: 'Captura de Indicadores',
    icon: {icon: 'keyboard', pack: 'font-awesome'},
    link: '/pages/indicadores/captura',
  },
];
export const MENU_REPORTESTEC: NbMenuItem[] = [
  {
    title: 'INICIO - DASHBOARD',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'REPORTES',
    group: true,
  },
  {
    title: 'Volantes analizados',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Tecate',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Tecate',
      },
    ],
  },
  {
    title: 'Trámites',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Ingresados y terminados',
        icon: {icon: 'database', pack: 'font-awesome'},
        children: [
          {
            title: 'Tecate',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Tecate',
          },
        ],
      },
    ],
  },
  {
    title: 'Carga de Analistas',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Tecate',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Tecate',
      },
    ],
  },
  {
    title: 'Carga de Registradores',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Tecate',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaRegistradores/Municipios/Tecate',
      },
    ],
  },
  {
    title: 'INDICADORES',
    group: true,
  },
  {
    title: 'Reporte de Indicadores',
    icon: {icon: 'chart-bar', pack: 'font-awesome'},
    link: '/pages/indicadores/reporte',
  },
  {
    title: 'Captura de Indicadores',
    icon: {icon: 'keyboard', pack: 'font-awesome'},
    link: '/pages/indicadores/captura',
  },
];
export const MENU_REPORTESROS: NbMenuItem[] = [
  {
    title: 'INICIO - DASHBOARD',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'REPORTES',
    group: true,
  },
  {
    title: 'Volantes analizados',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Rosarito',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/VolantesAnalizados/Municipios/Rosarito',
      },
    ],
  },
  {
    title: 'Trámites',
    icon: {icon: 'database', pack: 'font-awesome'},
    children: [
      {
        title: 'Ingresados y terminados',
        icon: {icon: 'database', pack: 'font-awesome'},
        children: [
          {
            title: 'Rosarito',
            icon: {icon: 'database', pack: 'font-awesome'},
            link: '/pages/reportes/Tramites/IngresadosYTerminados/Municipios/Rosarito',
          },
        ],
      },
    ],
  },
  {
    title: 'Carga de Analistas',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Rosarito',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaAnalistas/Municipios/Rosarito',
      },
    ],
  },
  {
    title: 'Carga de Registradores',
    icon: {icon: 'database', pack: 'font-awesome'},
    expanded: false,
    children: [
      {
        title: 'Rosarito',
        icon: {icon: 'database', pack: 'font-awesome'},
        link: '/pages/reportes/CargaRegistradores/Municipios/Rosarito',
      },
    ],
  },
  {
    title: 'INDICADORES',
    group: true,
  },
  {
    title: 'Reporte de Indicadores',
    icon: {icon: 'chart-bar', pack: 'font-awesome'},
    link: '/pages/indicadores/reporte',
  },
  {
    title: 'Captura de Indicadores',
    icon: {icon: 'keyboard', pack: 'font-awesome'},
    link: '/pages/indicadores/captura',
  },
];
export const MENU_REGISTRADOR: NbMenuItem[] = [
  // {
  //   title: 'INICIO - DASHBOARD',
  //   icon: 'home-outline',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  {
    title: 'INDICADORES',
    group: true,
  },
  {
    title: 'Reporte de Indicadores',
    icon: {icon: 'chart-bar', pack: 'font-awesome'},
    link: '/pages/indicadores/reporte',
    home: true,
  },
  {
    title: 'Captura de Indicadores',
    icon: {icon: 'keyboard', pack: 'font-awesome'},
    link: '/pages/indicadores/captura',
  },
];
