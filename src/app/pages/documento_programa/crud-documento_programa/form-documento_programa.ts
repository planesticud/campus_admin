export let FORM_DOCUMENTO_PROGRAMA = {
  titulo: 'DocumentoPrograma',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'DocumentoPrograma',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      nombre: 'ProgramaId',
      label_i18n: 'dependencia_id',
      placeholder_i18n: 'dependencia_id',
      requerido: true,
      tipo: 'ProgramaAcademico',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'TipoDocumentoProgramaId',
      label_i18n: 'tipo_documento_programa',
      placeholder_i18n: 'tipo_documento_programa',
      requerido: true,
      tipo: 'TipoDocumentoPrograma',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'PeriodoId',
      label_i18n: 'periodo_id',
      placeholder_i18n: 'periodo_id',
      requerido: true,
      tipo: 'Periodo',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'checkbox',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Activo',
      label_i18n: 'activo',
      placeholder_i18n: 'activo',
      requerido: true,
      tipo: 'checkbox',
    },
  ],
}
