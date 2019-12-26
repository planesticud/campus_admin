export let FORM_TIPO_DEPENDENCIA = {
  titulo: 'TipoDependencia',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'TipoDependencia',
  campos: [
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Nombre',
      label_i18n: 'nombre',
      placeholder_i18n: 'nombre',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Descripcion',
      label_i18n: 'descripcion',
      placeholder_i18n: 'descripcion',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'CodigoAbreviacion',
      label_i18n: 'codigo_abreviacion',
      placeholder_i18n: 'codigo_abreviacion',
      requerido: true,
      tipo: 'text',
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
