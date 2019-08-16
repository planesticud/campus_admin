export let FORM_INSCRIPCION = {
  titulo: 'Inscripcion',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'Inscripcion',
  campos: [
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'PersonaId',
      label_i18n: 'aspirante',
      placeholder_i18n: 'aspirante',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'ProgramaAcademicoId',
      label_i18n: 'programa_academico',
      placeholder_i18n: 'programa_academico',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'ReciboMatriculaId',
      label_i18n: 'recibo_matricula',
      placeholder_i18n: 'recibo_matricula',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'ReciboInscripcionId',
      label_i18n: 'recibo_inscripcion',
      placeholder_i18n: 'recibo_inscripcion',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'PeriodoId',
      label_i18n: 'periodo',
      placeholder_i18n: 'periodo',
      requerido: true,
      tipo: 'Periodo',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'EstadoInscripcionId',
      label_i18n: 'estado_inscripcion',
      placeholder_i18n: 'estado_inscripcion',
      requerido: true,
      tipo: 'EstadoInscripcion',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'TipoInscripcionId',
      label_i18n: 'tipo_inscripcion',
      placeholder_i18n: 'tipo_inscripcion',
      requerido: true,
      tipo: 'TipoInscripcion',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'EnfasisId',
      label_i18n: 'enfasis',
      placeholder_i18n: 'enfasis',
      requerido: true,
      tipo: 'Enfasis',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaAceptaTerminos',
      label_i18n: 'fecha_acepta_terminos',
      placeholder_i18n: 'fecha_acepta_terminos',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'checkbox',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'AceptaTerminos',
      label_i18n: 'acepta_terminos',
      placeholder_i18n: 'acepta_terminos',
      requerido: true,
      tipo: 'checkbox',
    },
    {
      etiqueta: 'checkbox',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Activo',
      label_i18n: 'activo',
      placeholder_i18n: 'activo',
      requerido: true,
      tipo: 'checkbox',
    },
  ],
}