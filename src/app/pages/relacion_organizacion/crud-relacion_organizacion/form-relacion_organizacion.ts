export let FORM_RELACION_ORGANIZACION = {
  titulo: 'RelacionOrganizacion',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'RelacionOrganizacion',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      nombre: 'OrganizacionPadre',
      label_i18n: 'organizacion_padre',
      placeholder_i18n: 'organizacion_padre',
      requerido: true,
      tipo: 'Organizacion',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'TipoRelacionOrganizaciones',
      label_i18n: 'tipo_relacion_organizacion',
      placeholder_i18n: 'tipo_relacion_organizacion',
      requerido: true,
      tipo: 'TipoRelacionOrganizacion',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'OrganizacionHija',
      label_i18n: 'organizacion_hija',
      placeholder_i18n: 'organizacion_hija',
      requerido: true,
      tipo: 'Organizacion',
      key: 'Nombre',
      opciones: [],
    },
  ],
}
