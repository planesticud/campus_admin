export let FORM_PERSONA = {
  titulo: 'Persona',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  alertas: true,
  modelo: 'Persona',
  campos: [
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'PrimerNombre',
      label_i18n: 'primer_nombre',
      placeholder_i18n: 'primer_nombre',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'SegundoNombre',
      label_i18n: 'segundo_nombre',
      placeholder_i18n: 'segundo_nombre',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'PrimerApellido',
      label_i18n: 'primer_apellido',
      placeholder_i18n: 'primer_apellido',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'SegundoApellido',
      label_i18n: 'segundo_apellido',
      placeholder_i18n: 'segundo_apellido',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaNacimiento',
      label_i18n: 'fecha_nacimiento',
      placeholder_i18n: 'fecha_nacimiento',
      requerido: true,
      tipo: 'date',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Usuario',
      label_i18n: 'usuario',
      placeholder_i18n: 'usuario',
      requerido: true,
      tipo: 'text',
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Ente',
      label_i18n: 'ente',
      placeholder_i18n: 'ente',
      requerido: true,
      tipo: 'number',
    },
    {
      etiqueta: 'file',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      clase: 'form-control',
      nombre: 'Foto',
      label_i18n: 'foto',
      placeholder_i18n: 'foto',
      requerido: true,
      tipo: 'image',
      tipoDocumento: 1,
      formatos: 'png/jpg/jpeg',
      url: 'assets/images/foto.png',
      tamanoMaximo: 2,
    },
  ],
}
