export let FORM_RELACION_LUGAR = {
  titulo: 'RelacionLugar',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'RelacionLugar',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'LugarPadre',
      label_i18n: 'lugar_padre',
      placeholder_i18n: 'lugar_padre',
      requerido: true,
      tipo: 'Lugar',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'TipoRelacionLugar',
      label_i18n: 'tipo_relacion_lugar',
      placeholder_i18n: 'tipo_relacion_lugar',
      requerido: true,
      tipo: 'TipoRelacionLugar',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'LugarHijo',
      label_i18n: 'lugar_hijo',
      placeholder_i18n: 'lugar_hijo',
      requerido: true,
      tipo: 'Lugar',
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
