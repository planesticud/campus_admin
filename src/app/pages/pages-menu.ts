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
        title: 'Area Conocimiento',
        link: '/pages/area_conocimiento/list-area_conocimiento',
        key: 'area_conocimiento',
      },
      {
        title: 'Atributo Lugar',
        link: '/pages/atributo_lugar/list-atributo_lugar',
        key: 'atributo_lugar',
      },
      {
        title: 'Atributo Ubicacion',
        link: '/pages/atributo_ubicacion/list-atributo_ubicacion',
        key: 'atributo_ubicacion',
      },
      {
        title: 'Cargo',
        link: '/pages/cargo/list-cargo',
        key: 'cargo',
      },
      {
        title: 'Clasificacion Nivel Idioma',
        link: '/pages/clasificacion_idioma/list-clasificacion_idioma',
        key: 'clasificacion_nivel_idioma',
      },
      {
        title: 'Concepto Academico',
        link: '/pages/concepto_academico/list-concepto_academico',
        key: 'concepto_academico',
      },
      {
        title: 'Dependencia Oikos',
        link: '/pages/dependencia/list-dependencia',
        key: 'dependencia',
      },
      {
        title: 'Dependencia Padre Oikos',
        link: '/pages/dependencia_padre/list-dependencia_padre',
        key: 'dependencia_padre',
      },
      {
        title: 'Dependencia Tipo Dependencia Oikos',
        link: '/pages/dependencia_tipo_dependencia/list-dependencia_tipo_dependencia',
        key: 'dependencia_tipo_dependencia',
      },
      {
        title: 'Estado Autor Produccion',
        link: '/pages/estado_autor_produccion/list-estado_autor_produccion',
        key: 'estado_autor_produccion',
      },
      {
        title: 'Estado Civil',
        link: '/pages/estado_civil/list-estado_civil',
        key: 'estado_civil',
      },
      {
        title: 'Estado Entrevista',
        link: '/pages/estado_entrevista/list-estado_entrevista',
        key: 'estado_entrevista',
      },
      {
        title: 'Estado Inscripcion',
        link: '/pages/estado_inscripcion/list-estado_inscripcion',
        key: 'estado_inscripcion',
      },
      {
        title: 'Estado Recibo',
        link: '/pages/estado_recibo/list-estado_recibo',
        key: 'estado_recibo',
      },
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
        title: 'Grupo Investigacion',
        link: '/pages/grupo_investigacion/list-grupo_investigacion',
        key: 'grupo_investigacion',
      },
      {
        title: 'Grupo Linea Investigacion',
        link: '/pages/grupo_linea_investigacion/list-grupo_linea_investigacion',
        key: 'grupo_linea_investigacion',
      },
      {
        title: 'Idioma',
        link: '/pages/idioma/list-idioma',
        key: 'idioma',
      },
      {
        title: 'Linea Investigacion',
        link: '/pages/linea_investigacion/list-linea_investigacion',
        key: 'linea_investigacion',
      },
      {
        title: 'Metodologia',
        link: '/pages/metodologia/list-metodologia',
        key: 'metodologia',
      },
      {
        title: 'Nivel Formacion',
        link: '/pages/nivel_formacion/list-nivel_formacion',
        key: 'nivel_formacion',
      },
      {
        title: 'Nivel Idioma',
        link: '/pages/nivel_idioma/list-nivel_idioma',
        key: 'nivel_idioma',
      },
      {
        title: 'Nucleo Basico Conocimiento',
        link: '/pages/nucleo_basico_conocimiento/list-nucleo_basico_conocimiento',
        key: 'nucleo_basico_conocimiento',
      },
      {
        title: 'Perfil Profesional',
        link: '/pages/perfil_profesional/list-perfil_profesional',
        key: 'perfil_profesional',
      },
      {
        title: 'Periodo',
        link: '/pages/periodo/list-periodo',
        key: 'periodo',
      },
      {
        title: 'Requisito Descuento',
        link: '/pages/requisito/list-requisito',
        key: 'requisito',
      },
      {
        title: 'Requisito Evaluacion Inscripcion',
        link: '/pages/requisito_academico/list-requisito_academico',
        key: 'requisito_academico',
      },
      {
        title: 'Rol Encargado Evento',
        link: '/pages/rol_encargado_evento/list-rol_encargado_evento',
        key: 'rol_encargado_evento',
      },
      {
        title: 'Tipo Contacto',
        link: '/pages/tipo_contacto/list-tipo_contacto',
        key: 'tipo_contacto',
      },
      {
        title: 'Tipo Dato Adicional',
        link: '/pages/tipo_dato_adicional/list-tipo_dato_adicional',
        key: 'tipo_dato_adicional',
      },
      {
        title: 'Tipo Dedicacion',
        link: '/pages/tipo_dedicacion/list-tipo_dedicacion',
        key: 'tipo_dedicacion',
      },
      {
        title: 'Tipo Dependencia',
        link: '/pages/tipo_dependencia/list-tipo_dependencia',
        key: 'tipo_dependencia',
      },
      {
        title: 'Tipo Discapacidad',
        link: '/pages/tipo_discapacidad/list-tipo_discapacidad',
        key: 'tipo_discapacidad',
      },
      {
        title: 'Tipo Documento',
        link: '/pages/tipo_documento/list-tipo_documento',
        key: 'tipo_documento',
      },
      {
        title: 'Tipo Documento Programa',
        link: '/pages/tipo_documento_programa/list-tipo_documento_programa',
        key: 'tipo_documento_programa',
      },
      {
        title: 'Tipo Duracion',
        link: '/pages/tipo_duracion/list-tipo_duracion',
        key: 'tipo_duracion',
      },
      {
        title: 'Tipo Ente',
        link: '/pages/tipo_ente/list-tipo_ente',
        key: 'tipo_ente',
      },
      {
        title: 'Tipo Entrevista',
        link: '/pages/tipo_entrevista/list-tipo_entrevista',
        key: 'tipo_entrevista',
      },
      {
        title: 'Tipo Identificacion',
        link: '/pages/tipo_identificacion/list-tipo_identificacion',
        key: 'tipo_identificacion',
      },
      {
        title: 'Tipo Inscripcion',
        link: '/pages/tipo_inscripcion/list-tipo_inscripcion',
        key: 'tipo_inscripcion',
      },
      {
        title: 'Tipo Lugar',
        link: '/pages/tipo_lugar/list-tipo_lugar',
        key: 'tipo_lugar',
      },
      {
        title: 'Tipo Metadato',
        link: '/pages/tipo_metadato/list-tipo_metadato',
        key: 'tipo_metadato',
      },
      {
        title: 'Tipo Organizacion',
        link: '/pages/tipo_organizacion/list-tipo_organizacion',
        key: 'tipo_organizacion',
      },
      {
        title: 'Tipo Pago',
        link: '/pages/tipo_pago/list-tipo_pago',
        key: 'tipo_pago',
      },
      {
        title: 'Tipo Periodo',
        link: '/pages/tipo_periodo/list-tipo_periodo',
        key: 'tipo_periodo',
      },
      {
        title: 'Tipo Periodo',
        link: '/pages/tipo_periodo/list-tipo_periodo',
        key: 'tipo_periodo',
      },
      {
        title: 'Tipo Produccion',
        link: '/pages/tipo_produccion/list-tipo_produccion',
        key: 'tipo_produccion',
      },
      {
        title: 'Tipo Proyecto',
        link: '/pages/tipo_proyecto/list-tipo_proyecto',
        key: 'tipo_proyecto',
      },
      {
        title: 'Tipo Publico',
        link: '/pages/tipo_publico/list-tipo_publico',
        key: 'tipo_publico',
      },
      {
        title: 'Tipo Recibo',
        link: '/pages/tipo_recibo/list-tipo_recibo',
        key: 'tipo_recibo',
      },
      {
        title: 'Tipo Recurrencia',
        link: '/pages/tipo_recurrencia/list-tipo_recurrencia',
        key: 'tipo_recurrencia',
      },
      {
        title: 'Tipo Relacion Lugar',
        link: '/pages/tipo_relacion_lugar/list-tipo_relacion_lugar',
        key: 'tipo_relacion_lugar',
      },
      {
        title: 'Tipo Relacion Organizacion',
        link: '/pages/tipo_relacion_organizacion/list-tipo_relacion_organizacion',
        key: 'tipo_relacion_organizacion',
      },
      {
        title: 'Tipo Relacion Personas',
        link: '/pages/tipo_relacion_personas/list-tipo_relacion_personas',
        key: 'tipo_relacion_personas',
      },
      {
        title: 'Tipo Relacion Ubicacion Ente',
        link: '/pages/tipo_relacion_ubicacion_ente/list-tipo_relacion_ubicacion_ente',
        key: 'tipo_relacion_ubicacion_ente',
      },
      {
        title: 'Tipo Vinculacion',
        link: '/pages/tipo_vinculacion/list-tipo_vinculacion',
        key: 'tipo_vinculacion',
      },
      {
        title: 'Titulacion',
        link: '/pages/titulacion/list-titulacion',
        key: 'titulacion',
      },
      {
        title: 'Unidad Tiempo',
        link: '/pages/unidad_tiempo/list-unidad_tiempo',
        key: 'unidad_tiempo',
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
        title: 'Lugar',
        link: '/pages/lugar/list-lugar',
        key: 'lugar',
      },
      {
        title: 'Relacion Lugar',
        link: '/pages/relacion_lugar/list-relacion_lugar',
        key: 'relacion_lugar',
      },
      {
        title: 'Valor Atributo Lugar',
        link: '/pages/valor_atributo_lugar/list-valor_atributo_lugar',
        key: 'valor_atributo_lugar',
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










      {
        title: 'Lista Solicitud Descuento',
        link: '/pages/solicitud_descuento/list-solicitud_descuento',
        key: 'solicitud_descuento',
      },
      {
        title: 'Lista Validacion Descuento',
        link: '/pages/validacion_descuento/list-validacion_descuento',
        key: 'validacion_descuento',
      },
      {
        title: 'Lista Soporte Descuento',
        link: '/pages/soporte_descuento/list-soporte_descuento',
        key: 'soporte_descuento',
      },
      {
        title: 'Lista Requisito Programa Academico Criterios',
        link: '/pages/requisito_programa_academico/list-requisito_programa_academico',
        key: 'requisito_programa_academico',
      },
      {
        title: 'Lista Programa Academico',
        link: '/pages/programa_academico/list-programa_academico',
        key: 'programa_academico',
      },
      {
        title: 'Lista Requisito Tipo Descuento',
        link: '/pages/requisito_tipo_descuento/list-requisito_tipo_descuento',
        key: 'requisito_tipo_descuento',
      },
      {
        title: 'Lista Tipo Descuento',
        link: '/pages/tipo_descuento/list-tipo_descuento',
        key: 'tipo_descuento',
      },
    ],
  },
];

export const MENU_PUBLICO: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
    key: 'dashboard',
  },
  {
    title: 'directorio',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/directorio',
    home: false,
    key: 'directorio',
  },
  {
    title: 'atencion_usuario',
    icon: 'nb-compose',
    link: '/pages/atencion_usuario',
    home: false,
    key: 'atencion_usuario',
    children: [
      {
        title: 'defensor_ciudadano',
        url: 'https://www.udistrital.edu.co/dependencia/info/374',
        home: false,
        key: 'defensor_ciudadano',
      },
      {
        title: 'espacios_participacion',
        url: 'https://www.udistrital.edu.co/participa',
        home: false,
        key: 'espacios_participacion',
      },
      {
        title: 'sdqs',
        url: 'http://www.bogota.gov.co/sdqs',
        home: false,
        key: 'sdqs',
      },
      {
        title: 'pqrs',
        url: 'http://reclamos.udistrital.edu.co: 8080/documents/66259/771ae463-5e2a-4b7e-9514-bdcafd013f9c',
        home: false,
        key: 'pqrs',
      },
      {
        title: 'notificaciones_judiciales',
        url: 'http://www1.udistrital.edu.co: 8080/web/oficina-asesora-juridica/notificaciones-judiciales',
        home: false,
        key: 'notificaciones_judiciales',
      },
    ],
  },
  {
    title: 'ilud',
    icon: 'nb-compose',
    url: 'http://ilud.udistrital.edu.co/',
    home: false,
    key: 'ilud',
  },
  {
    title: 'facultades',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/facultades',
    home: false,
    key: 'facultades',
  },
  {
    title: 'programas',
    icon: 'nb-compose',
    link: '/pages/programas',
    home: false,
    key: 'programas',
    children: [
      {
        title: 'programas_pregrado',
        url: 'https://www.udistrital.edu.co/programas_pregrado',
        home: false,
        key: 'programas_pregrado',
      },
      {
        title: 'programas_posgrado',
        url: 'https://www.udistrital.edu.co/programas_posgrado',
        home: false,
        key: 'programas_posgrado',
      },
    ],
  },
  {
    title: 'editorial',
    icon: 'nb-compose',
    url: 'http://editorial.udistrital.edu.co/',
    home: false,
    key: 'editorial',
  },
  {
    title: 'tienda',
    icon: 'nb-compose',
    url: 'http://editorial.udistrital.edu.co/protienda.php',
    home: false,
    key: 'tienda',
  },
  {
    title: 'laud',
    icon: 'nb-compose',
    url: 'http://laud.udistrital.edu.co/node/46',
    home: false,
    key: 'laud',
  },
  {
    title: 'sedes',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/sedes',
    home: false,
    key: 'sedes',
  },
  {
    title: 'procesos_admisiones',
    icon: 'nb-compose',
    link: '/pages/procesos_admisiones',
    home: false,
    key: 'procesos_admisiones',
    children: [
      {
        title: 'admisiones_pregrado',
        url: 'https://www.udistrital.edu.co/admisiones-pregrado',
        home: false,
        key: 'admisiones_pregrado',
      },
      {
        title: 'admisiones_inscripcion',
        url: 'https://autenticacion.portaloas.udistrital.edu.co/accountrecoveryendpoint/register.do',
        home: false,
        key: 'admisiones_inscripcion',
      },
    ],
  },
  {
    title: 'extension',
    icon: 'nb-compose',
    url: 'http://idexud.udistrital.edu.co/idexud/cursos.php',
    home: false,
    key: 'extension',
  },
  {
    title: 'movilidad_academica',
    icon: 'nb-compose',
    url: 'http://ceri.udistrital.edu.co/',
    home: false,
    key: 'movilidad_academica',
  },
  {
    title: 'convocatorias_academicas',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/convocatorias-academicas',
    home: false,
    key: 'convocatorias_academicas',
  },
  {
    title: 'sistema_comunicaciones',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/servicios-comunicaciones',
    home: false,
    key: 'sistema_comunicaciones',
  },
  {
    title: 'investigacion',
    icon: 'nb-compose',
    link: '/pages/investigacion',
    home: false,
    key: 'investigacion',
    children: [
      {
        title: 'cidc',
        url: 'http://cidc.udistrital.edu.co/',
        home: false,
        key: 'cidc',
      },
      {
        title: 'semilleros',
        url: 'http://cidc.udistrital.edu.co/web/index.php/sistemas-de-investigacion/semilleros-de-investigacion',
        home: false,
        key: 'semilleros',
      },
      {
        title: 'grupos_investigacion',
        url: 'http://cidc.udistrital.edu.co/web/index.php/sistemas-de-investigacion/grupos-de-investigacion',
        home: false,
        key: 'grupos_investigacion',
      },
      {
        title: 'revistas_cientificas',
        url: 'http://revistas.udistrital.edu.co/',
        home: false,
        key: 'revistas_cientificas',
      },
      {
        title: 'ieie',
        url: 'http://ieie.udistrital.edu.co/',
        home: false,
        key: 'ieie',
      },
      {
        title: 'rita',
        url: 'https://rita.udistrital.edu.co/',
        home: false,
        key: 'rita',
      },
    ],
  },
];
