export let FORM_EVALUACION_INSCRIPCION = {
  titulo: 'EvaluacionInscripcion',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'EvaluacionInscripcion',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'RequisitoProgramaAcademicoId',
      label_i18n: 'requisito_programa_academico',
      placeholder_i18n: 'requisito_programa_academico',
      requerido: true,
      tipo: 'RequisitoProgramaAcademicoId',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
      nombre: 'InscripcionId',
      label_i18n: 'inscripcion',
      placeholder_i18n: 'inscripcion',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
      nombre: 'EntrevistaId',
      label_i18n: 'entrevista',
      placeholder_i18n: 'entrevista',
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'NotaFinal',
      label_i18n: 'nota',
      placeholder_i18n: 'nota',
      requerido: true,
      tipo: 'number',
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
