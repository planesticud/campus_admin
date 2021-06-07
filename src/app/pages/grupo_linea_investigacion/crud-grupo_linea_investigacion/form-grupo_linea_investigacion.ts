export let FORM_GRUPO_LINEA_INVESTIGACION = {
  titulo: 'GrupoLineaInvestigacion',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'GrupoLineaInvestigacion',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'GrupoInvestigacionId',
      label_i18n: 'grupo_investigacion_id',
      placeholder_i18n: 'grupo_investigacion_id',
      requerido: true,
      tipo: 'GrupoInvestigacion',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'LineaInvestigacionId',
      label_i18n: 'linea_investigacion_id',
      placeholder_i18n: 'linea_investigacion_id',
      requerido: true,
      tipo: 'LineaInvestigacion',
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