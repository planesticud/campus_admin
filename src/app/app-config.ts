import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';

export const Config = {
  LOCAL: {
    NUXEO: {
      PATH: 'https://documental.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'http://localhost:8095/v1/',
    CORE_SERVICE: 'http://localhost:8102/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'http://localhost:9013/v1/',
    // DOCENTE_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/docentes/v1/',
    // DOCENTE_SERVICE: 'https://jbpm.udistritaloas.edu.co:8243/services/academicaProxy/',
    DOCENTE_SERVICE: 'https://randomuser.me/',
    DOCUMENTO_PROGRAMA_SERVICE: 'http://localhost:9014/v1/',
    DOCUMENTO_SERVICE: 'http://localhost:8094/v1/',
    ENTE_SERVICE: 'http://localhost:8096/v1/',
    ENTREVISTA_SERVICE: 'http://localhost:9018/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'http://localhost:9016/v1/',
    EXPERIENCIA_SERVICE: 'http://localhost:8099/v1/',
    FORMACION_ACADEMICA_SERVICE: 'http://localhost:8098/v1/',
    IDIOMA_SERVICE: 'http://localhost:8103/v1/',
    INSCRIPCION_SERVICE: 'http://localhost:8887/v1/',
    MENU_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/configuracion/v1/menu_opcion_padre/ArbolMenus/',
    ORGANIZACION_SERVICE: 'http://localhost:8097/v1/',
    PERSONA_SERVICE: 'http://localhost:8083/v1/',
    PRODUCCION_ACADEMICA_SERVICE: 'http://localhost:9012/v1/',
    PROGRAMA_ACADEMICO_SERVICE: 'http://localhost:8101/v1/',
    PROGRAMA_OIKOS_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/programa_ud/v1/',
    UBICACION_SERVICE: 'http://localhost:8085/v1/',
    VALIDACION_OIKOS_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/homologacion/v1/',
    VALIDACION_SNIES_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/snies/v1/',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: 'oOAf8PLTAzapsKaWAxPyLEHJfPIa',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email role documento',
      REDIRECT_URL: 'http://localhost:4200/',
      SIGN_OUT_URL: 'https://autenticacion.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    },
  },
  PREPROD: {
    NUXEO: {
      PATH: 'https://documental.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'https://autenticacion.udistrital.edu.co/apioas/mid_campus/v1/',
    CORE_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/data_core/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/descuento_acad/v1/',
    DOCENTE_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/docentes/v1/',
    DOCUMENTO_PROGRAMA_SERVICE: ' https://autenticacion.udistrital.edu.co/apioas/documento_programa/v1/',
    DOCUMENTO_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/documento/v1/',
    ENTE_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/ente/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/evaluacion_inscripcion/v1/',
    EXPERIENCIA_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/experiencia_laboral/v1/',
    FORMACION_ACADEMICA_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/formacion_academica/v1/',
    IDIOMA_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/idioma/v1/',
    INSCRIPCION_SERVICE: ' https://autenticacion.udistrital.edu.co/apioas/inscripcion/v1/',
    MENU_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/configuracion/v1/menu_opcion_padre/ArbolMenus/',
    ORGANIZACION_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/organizacion/v1/',
    PERSONA_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/persona/v1/',
    PRODUCCION_ACADEMICA_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/produccion_acad/v1/',
    PROGRAMA_ACADEMICO_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/programa/v1/',
    PROGRAMA_OIKOS_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/programa_ud/v1/',
    UBICACION_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/ubicacion/v1/',
    VALIDACION_OIKOS_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/homologacion/v1/',
    VALIDACION_SNIES_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/snies/v1/',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: 'Uf_OLwqAD_HkBEvqw_hj2iFc0y8a',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email role documento',
      REDIRECT_URL: 'https://admin.campusvirtual.udistrital.edu.co/',
      SIGN_OUT_URL: 'https://autenticacion.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: 'https://admin.campusvirtual.udistrital.edu.co/',
    },
  },
  PROD: {
    NUXEO: {
      PATH: 'https://documental.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: '',
    CORE_SERVICE: '',
    DESCUENTO_ACADEMICO_SERVICE: '',
    DOCENTE_SERVICE: '',
    DOCUMENTO_PROGRAMA_SERVICE: '',
    DOCUMENTO_SERVICE: '',
    ENTE_SERVICE: '',
    EVALUACION_INSCRIPCION_SERVICE: '',
    EXPERIENCIA_SERVICE: '',
    FORMACION_ACADEMICA_SERVICE: '',
    IDIOMA_SERVICE: '',
    INSCRIPCION_SERVICE: '',
    MENU_SERVICE: '',
    ORGANIZACION_SERVICE: '',
    PERSONA_SERVICE: '',
    PRODUCCION_ACADEMICA_SERVICE: '',
    PROGRAMA_ACADEMICO_SERVICE: '',
    PROGRAMA_OIKOS_SERVICE: '',
    UBICACION_SERVICE: '',
    VALIDACION_OIKOS_SERVICE: '',
    VALIDACION_SNIES_SERVICE: '',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: '',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email role documento',
      REDIRECT_URL: '',
      SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: '',
    },
  },
};

export const GENERAL = {
    ENTORNO: Config[environment.entorno],
};
