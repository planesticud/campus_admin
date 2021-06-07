export let FORM_CONFIGURACION_FECHAS = {
  titulo: 'ConfiguracionFechas',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'ConfiguracionFechas',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'DependenciaId',
      label_i18n: 'programa_academico',
      placeholder_i18n: 'programa_academico',
      requerido: true,
      tipo: 'Dependencia',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
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
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaInicioInscripcion',
      label_i18n: 'fecha_inicio_inscripcion',
      placeholder_i18n: 'fecha_inicio_inscripcion',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaFinInscripcion',
      label_i18n: 'fecha_fin_inscripcion',
      placeholder_i18n: 'fecha_fin_inscripcion',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'CuposHabilitados',
      label_i18n: 'cupos_habilitados',
      placeholder_i18n: 'cupos_habilitados',
      requerido: true,
      minimo: 0,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'CuposOpcionados',
      label_i18n: 'cupos_opcionados',
      placeholder_i18n: 'numero_orden',
      minimo: 0,
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'ValorInscripcion',
      label_i18n: 'valor_inscripcion',
      placeholder_i18n: 'valor_inscripcion',
      requerido: true,
      minimo: 50,
      tipo: 'number',
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaPago',
      label_i18n: 'fecha_pago',
      placeholder_i18n: 'fecha_pago',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaInicioEvaluacion',
      label_i18n: 'fecha_inicio_evaluacion',
      placeholder_i18n: 'fecha_inicio_evaluacion',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaFinEvaluacion',
      label_i18n: 'fecha_fin_evaluacion',
      placeholder_i18n: 'fecha_fin_evaluacion',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaInicioAdmision',
      label_i18n: 'fecha_inicio_admision',
      placeholder_i18n: 'fecha_inicio_admision',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaFinAdmision',
      label_i18n: 'fecha_fin_admision',
      placeholder_i18n: 'fecha_fin_admision',
      requerido: true,
      tipo: 'date',
    },
  ],
}