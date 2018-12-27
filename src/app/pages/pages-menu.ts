import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
    key: 'dashboard',
  },
  {
    title: 'Parametricas',
    icon: 'nb-compose',
    link: '/pages/parametricas',
    key: 'parametricas',
    children: [
      {
        title: 'Genero',
        link: '/pages/genero/list-genero',
        key: 'genero',
      },
      {
        title: 'Grupo Etnico',
        link: '/pages/grupo_etnico/list-grupo_etnico',
        key: 'grupo_etnico',
      },
      {
        title: 'Estado Civil',
        link: '/pages/estado_civil/list-estado_civil',
        key: 'estado_civil',
      },
      {
        title: 'Tipo Discapacidad',
        link: '/pages/tipo_discapacidad/list-tipo_discapacidad',
        key: 'tipo_discapacidad',
      },
      {
        title: 'Tipo Lugar',
        link: '/pages/tipo_lugar/list-tipo_lugar',
        key: 'tipo_lugar',
      },
      {
        title: 'Tipo Contacto',
        link: '/pages/tipo_contacto/list-tipo_contacto',
        key: 'tipo_contacto',
      },
      {
        title: 'Idioma',
        link: '/pages/idioma/list-idioma',
        key: 'idioma',
      },
      {
        title: 'Nivel Idioma',
        link: '/pages/nivel_idioma/list-nivel_idioma',
        key: 'nivel_idioma',
      },
      {
        title: 'Clasificacion Nivel Idioma',
        link: '/pages/clasificacion_idioma/list-clasificacion_idioma',
        key: 'clasificacion_nivel_idioma',
      },
      {
        title: 'Lista Titulacion',
        link: '/pages/titulacion/list-titulacion',
        key: 'titulacion',
      },
      {
        title: 'Lista Nivel Formacion',
        link: '/pages/nivel_formacion/list-nivel_formacion',
        key: 'nivel_formacion',
      },
      {
        title: 'Lista Metodologia',
        link: '/pages/metodologia/list-metodologia',
        key: 'metodologia',
      },
      {
        title: 'Lista Programa Academico',
        link: '/pages/programa_academico/list-programa_academico',
        key: 'programa_academico',
      },
      {
        title: 'Lista Enfasis',
        link: '/pages/enfasis/list-enfasis',
        key: 'enfasis',
      },
      {
        title: 'Lista Estado Admision',
        link: '/pages/estado_admision/list-estado_admision',
        key: 'estado_admision',
      },
      {
        title: 'Lista Linea Investigacion',
        link: '/pages/linea_investigacion/list-linea_investigacion',
        key: 'linea_investigacion',
      },
      {
        title: 'Lista Tipo Proyecto',
        link: '/pages/tipo_proyecto/list-tipo_proyecto',
        key: 'tipo_proyecto',
      },
      {
        title: 'Lista Grupo Investigacion',
        link: '/pages/grupo_investigacion/list-grupo_investigacion',
        key: 'grupo_investigacion',
      },
    ],
  },
  {
    title: 'Persona',
    icon: 'nb-compose',
    link: '/pages/persona',
    key: 'persona',
    children: [
      {
        title: 'Lista Persona',
        link: '/pages/persona/list-persona',
        key: 'lista_persona',
      },
      {
        title: 'CRUD Persona',
        link: '/pages/persona/crud-persona',
        key: 'crud_persona',
      },
    ],
  },
  {
    title: 'Lugar',
    icon: 'nb-compose',
    link: '/pages/lugar',
    key: 'lugar',
    children: [
      {
        title: 'Lista Lugar',
        link: '/pages/lugar/list-lugar',
        key: 'lista_lugar',
      },
    ],
  },
]
