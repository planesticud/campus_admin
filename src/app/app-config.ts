import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';

export const Config = {
  LOCAL: {
    NUXEO: {
      PATH: 'https://documental.portaloas.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'http://localhost:8095/v1/',
    CORE_SERVICE: 'http://localhost:8102/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'http://localhost:9013/v1/',
    // #revisar
    DOCENTE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    DOCUMENTO_SERVICE: 'http://localhost:8094/v1/',
    DOCUMENTO_PROGRAMA_SERVICE: 'http://localhost:9014/v1/',
    ENTE_SERVICE: 'http://localhost:8096/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'http://localhost:9016/v1/',
    EVENTO_SERVICE: 'http://localhost:8081/v1/',
    EXPERIENCIA_SERVICE: 'http://localhost:8099/v1/',
    FORMACION_ACADEMICA_SERVICE: 'http://localhost:8098/v1/',
    FORMULARIO_SERVICE: 'http://localhost:9011/v1/',
    IDIOMA_SERVICE: 'http://localhost:8103/v1/',
    INSCRIPCION_SERVICE: 'http://localhost:8887/v1/',
    MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
    ORGANIZACION_SERVICE: 'http://localhost:8097/v1/',
    PERSONA_SERVICE: 'http://localhost:8083/v1/',
    PRODUCCION_ACADEMICA_SERVICE: 'http://localhost:9012/v1/',
    PROGRAMA_ACADEMICO_SERVICE: 'http://localhost:8101/v1/',
    PROGRAMA_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1/',
    RECIBO_SERVICE: 'http://localhost:9017/v1/',
    UBICACION_SERVICE: 'http://localhost:8085/v1/',
    // #revisar
    VALIDACION_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    // #revisar
    VALIDACION_SNIES_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
    NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws/join',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    // #falta
    PAGO_SERVICE: 'http://prueba.campusvirtual.udistrital.edu.co/pagos/',
    // #falta
    TOKEN: {
        AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
        CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
        RESPONSE_TYPE: 'id_token token',
        SCOPE: 'openid email role documento',
        REDIRECT_URL: 'http://localhost:4200/',
        SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
        SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    },
  },
  PREPROD: {
    NUXEO: {
      PATH: 'https://documental.portaloas.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'https://autenticacion.udistrital.edu.co/apioas/mid_campus/v1/',
    CORE_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/data_core/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/descuento_acad/v1/',
    DOCENTE_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/docentes/v1/',
    DOCUMENTO_PROGRAMA_SERVICE: ' https://autenticacion.udistrital.edu.co/apioas/documento_programa/v1/',
    DOCUMENTO_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/documento/v1/',
    ENTE_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/ente/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/evaluacion_inscripcion/v1/',
    EVENTO_SERVICE: 'http://api.planestic.udistrital.edu.co:8081/v1/',
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
    RECIBO_SERVICE: 'http://api.planestic.udistrital.edu.co:9017/v1/',
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
      PATH: 'https://documental.portaloas.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: '',
    CORE_SERVICE: '',
    DESCUENTO_ACADEMICO_SERVICE: '',
    DOCUMENTO_PROGRAMA_SERVICE: '',
    DOCUMENTO_SERVICE: '',
    ENTE_SERVICE: '',
    EVALUACION_INSCRIPCION_SERVICE: '',
    EXPERIENCIA_SERVICE: '',
    FORMACION_ACADEMICA_SERVICE: '',
    FORMULARIO_SERVICE: '',
    IDIOMA_SERVICE: '',
    INSCRIPCION_SERVICE: '',
    MENU_SERVICE: '',
    ORGANIZACION_SERVICE: '',
    PERSONA_SERVICE: '',
    PRODUCCION_ACADEMICA_SERVICE: '',
    PROGRAMA_ACADEMICO_SERVICE: '',
    PROGRAMA_OIKOS_SERVICE: '',
    SESIONES_SERVICE: '',
    UBICACION_SERVICE: '',
    VALIDACION_OIKOS_SERVICE: '',
    CONFIGURACION_SERVICE: '',
    NOTIFICACION_SERVICE: '',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    PAGO_SERVICE: '',
    RECIBO_SERVICE: '',
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
