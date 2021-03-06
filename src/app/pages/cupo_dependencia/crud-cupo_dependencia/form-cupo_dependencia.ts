export let FORM_CUPO_DEPENDENCIA = {
  titulo: 'CupoDependencia',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'CupoDependencia',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      nombre: 'DependenciaId',
      label_i18n: 'programa_academico',
      placeholder_i18n: 'programa_academico',
      requerido: true,
      tipo: 'ProgramaAcademico',
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
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'CuposHabilitados',
      label_i18n: 'cupos_habilitados',
      placeholder_i18n: 'cupos_habilitados',
      requerido: true,
      tipo: 'number',
      minimo: 1,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'CuposOpcionados',
      label_i18n: 'cupos_opcionados',
      placeholder_i18n: 'cupos_opcionados',
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
