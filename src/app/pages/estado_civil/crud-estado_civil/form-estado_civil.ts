export let FORM_ESTADO_CIVIL = {
  titulo: 'EstadoCivil',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'EstadoCivil',
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
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'CodigoAbreviacion',
      label_i18n: 'codigo_abreviacion',
      placeholder_i18n: 'codigo_abreviacion',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'NumeroOrden',
      label_i18n: 'numero_orden',
      placeholder_i18n: 'numero_orden',
      requerido: true,
      tipo: 'number',
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
