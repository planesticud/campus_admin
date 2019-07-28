export let FORM_TIPO_DESCUENTO = {
  titulo: 'TipoDescuento',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'TipoDescuento',
  campos: [
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-3 col-md-3 col-sm-12 col-xs-12',
      nombre: 'Id',
      label_i18n: 'id',
      placeholder_i18n: 'id',
      requerido: true,
      tipo: 'number',
      minimo: 1,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-9 col-md-9 col-sm-12 col-xs-12',
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
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'NumeroOrden',
      label_i18n: 'numero_orden',
      placeholder_i18n: 'numero_orden',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'ConceptoAcademico',
      label_i18n: 'concepto_academico',
      placeholder_i18n: 'concepto_academico',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'checkbox',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'General',
      label_i18n: 'general',
      placeholder_i18n: 'general',
      requerido: true,
      tipo: 'checkbox',
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