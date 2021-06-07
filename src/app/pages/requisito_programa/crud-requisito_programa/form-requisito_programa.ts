export let FORM_REQUISITO_PROGRAMA = {
  titulo: 'RequisitoPrograma',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'RequisitoPrograma',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      nombre: 'ProgramaAcademicoId',
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
      nombre: 'RequisitoId',
      label_i18n: 'requisito_academico',
      placeholder_i18n: 'requisito_academico',
      requerido: true,
      tipo: 'RequisitoAcademico',
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
      nombre: 'Porcentaje',
      label_i18n: 'porcentaje',
      placeholder_i18n: 'porcentaje',
      requerido: true,
      tipo: 'number',
      minimo: 1,
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