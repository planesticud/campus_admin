var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"pages","loadChildren":"app/pages/pages.module#PagesModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/pages-routing.module.ts","module":"PagesRoutingModule","children":[{"path":"","component":"PagesComponent","children":[{"path":"dashboard","component":"DashboardComponent"},{"path":"programas_virtuales","loadChildren":"./programas_virtuales/programas_virtuales.module#ProgramasVirtualesModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/programas_virtuales/programas_virtuales-routing.module.ts","module":"ProgramasVirtualesRoutingModule","children":[{"path":"","component":"ProgramasVirtualesComponent","children":[{"path":"met","component":"METComponent"},{"path":"mtm","component":"MTMComponent"},{"path":"eet","component":"EETComponent"}]}],"kind":"module"}],"module":"ProgramasVirtualesModule"}]},{"path":"genero","loadChildren":"./genero/genero.module#GeneroModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/genero/genero-routing.module.ts","module":"GeneroRoutingModule","children":[{"path":"","component":"GeneroComponent","children":[{"path":"list-genero","component":"ListGeneroComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"GeneroModule"}]},{"path":"grupo_etnico","loadChildren":"./grupo_etnico/grupo_etnico.module#GrupoEtnicoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/grupo_etnico/grupo_etnico-routing.module.ts","module":"GrupoEtnicoRoutingModule","children":[{"path":"","component":"GrupoEtnicoComponent","children":[{"path":"list-grupo_etnico","component":"ListGrupoEtnicoComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"GrupoEtnicoModule"}]},{"path":"grupo_investigacion","loadChildren":"./grupo_investigacion/grupo_investigacion.module#GrupoInvestigacionModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/grupo_investigacion/grupo_investigacion-routing.module.ts","module":"GrupoInvestigacionRoutingModule","children":[{"path":"","component":"GrupoInvestigacionComponent","children":[{"path":"list-grupo_investigacion","component":"ListGrupoInvestigacionComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"GrupoInvestigacionModule"}]},{"path":"estado_civil","loadChildren":"./estado_civil/estado_civil.module#EstadoCivilModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/estado_civil/estado_civil-routing.module.ts","module":"EstadoCivilRoutingModule","children":[{"path":"","component":"EstadoCivilComponent","children":[{"path":"list-estado_civil","component":"ListEstadoCivilComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"EstadoCivilModule"}]},{"path":"tipo_discapacidad","loadChildren":"./tipo_discapacidad/tipo_discapacidad.module#TipoDiscapacidadModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/tipo_discapacidad/tipo_discapacidad-routing.module.ts","module":"TipoDiscapacidadRoutingModule","children":[{"path":"","component":"TipoDiscapacidadComponent","children":[{"path":"list-tipo_discapacidad","component":"ListTipoDiscapacidadComponent"}]}],"kind":"module"}],"module":"TipoDiscapacidadModule"}]},{"path":"persona","loadChildren":"./persona/persona.module#PersonaModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/persona/persona-routing.module.ts","module":"PersonaRoutingModule","children":[{"path":"","component":"PersonaComponent","children":[{"path":"list-persona","component":"ListPersonaComponent"},{"path":"crud-persona","component":"CrudPersonaComponent"}]}],"kind":"module"}],"module":"PersonaModule"}]},{"path":"tipo_lugar","loadChildren":"./tipo_lugar/tipo_lugar.module#TipoLugarModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/tipo_lugar/tipo_lugar-routing.module.ts","module":"TipoLugarRoutingModule","children":[{"path":"","component":"TipoLugarComponent","children":[{"path":"list-tipo_lugar","component":"ListTipoLugarComponent"}]}],"kind":"module"}],"module":"TipoLugarModule"}]},{"path":"lugar","loadChildren":"./lugar/lugar.module#LugarModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/lugar/lugar-routing.module.ts","module":"LugarRoutingModule","children":[{"path":"","component":"LugarComponent","children":[{"path":"list-lugar","component":"ListLugarComponent"},{"path":"crud-lugar","component":"CrudLugarComponent"}]}],"kind":"module"}],"module":"LugarModule"}]},{"path":"tipo_contacto","loadChildren":"./tipo_contacto/tipo_contacto.module#TipoContactoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/tipo_contacto/tipo_contacto-routing.module.ts","module":"TipoContactoRoutingModule","children":[{"path":"","component":"TipoContactoComponent","children":[{"path":"list-tipo_contacto","component":"ListTipoContactoComponent"}]}],"kind":"module"}],"module":"TipoContactoModule"}]},{"path":"idioma","loadChildren":"./idioma/idioma.module#IdiomaModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/idioma/idioma-routing.module.ts","module":"IdiomaRoutingModule","children":[{"path":"","component":"IdiomaComponent","children":[{"path":"list-idioma","component":"ListIdiomaComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"IdiomaModule"}]},{"path":"nivel_idioma","loadChildren":"./nivel_idioma/nivel_idioma.module#NivelIdiomaModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/nivel_idioma/nivel_idioma-routing.module.ts","module":"NivelIdiomaRoutingModule","children":[{"path":"","component":"NivelIdiomaComponent","children":[{"path":"list-nivel_idioma","component":"ListNivelIdiomaComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"NivelIdiomaModule"}]},{"path":"clasificacion_idioma","loadChildren":"./clasificacion_idioma/clasificacion_idioma.module#ClasificacionIdiomaModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/clasificacion_idioma/clasificacion_idioma-routing.module.ts","module":"ClasificacionIdiomaRoutingModule","children":[{"path":"","component":"ClasificacionIdiomaComponent","children":[{"path":"list-clasificacion_idioma","component":"ListClasificacionIdiomaComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"ClasificacionIdiomaModule"}]},{"path":"titulacion","loadChildren":"./titulacion/titulacion.module#TitulacionModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/titulacion/titulacion-routing.module.ts","module":"TitulacionRoutingModule","children":[{"path":"","component":"TitulacionComponent","children":[{"path":"list-titulacion","component":"ListTitulacionComponent"},{"path":"crud-titulacion","component":"CrudTitulacionComponent"}]}],"kind":"module"}],"module":"TitulacionModule"}]},{"path":"nivel_formacion","loadChildren":"./nivel_formacion/nivel_formacion.module#NivelFormacionModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/nivel_formacion/nivel_formacion-routing.module.ts","module":"NivelFormacionRoutingModule","children":[{"path":"","component":"NivelFormacionComponent","children":[{"path":"list-nivel_formacion","component":"ListNivelFormacionComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"NivelFormacionModule"}]},{"path":"metodologia","loadChildren":"./metodologia/metodologia.module#MetodologiaModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/metodologia/metodologia-routing.module.ts","module":"MetodologiaRoutingModule","children":[{"path":"","component":"MetodologiaComponent","children":[{"path":"list-metodologia","component":"ListMetodologiaComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"MetodologiaModule"}]},{"path":"programa_academico","loadChildren":"./programa_academico/programa_academico.module#ProgramaAcademicoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/programa_academico/programa_academico-routing.module.ts","module":"ProgramaAcademicoRoutingModule","children":[{"path":"","component":"ProgramaAcademicoComponent","children":[{"path":"list-programa_academico","component":"ListProgramaAcademicoComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"ProgramaAcademicoModule"}]},{"path":"estado_inscripcion","loadChildren":"./estado_inscripcion/estado_inscripcion.module#EstadoInscripcionModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/estado_inscripcion/estado_inscripcion-routing.module.ts","module":"EstadoInscripcionRoutingModule","children":[{"path":"","component":"EstadoInscripcionComponent","children":[{"path":"list-estado_inscripcion","component":"ListEstadoInscripcionComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"EstadoInscripcionModule"}]},{"path":"linea_investigacion","loadChildren":"./linea_investigacion/linea_investigacion.module#LineaInvestigacionModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/linea_investigacion/linea_investigacion-routing.module.ts","module":"LineaInvestigacionRoutingModule","children":[{"path":"","component":"LineaInvestigacionComponent","children":[{"path":"list-linea_investigacion","component":"ListLineaInvestigacionComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"LineaInvestigacionModule"}]},{"path":"tipo_proyecto","loadChildren":"./tipo_proyecto/tipo_proyecto.module#TipoProyectoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/tipo_proyecto/tipo_proyecto-routing.module.ts","module":"TipoProyectoRoutingModule","children":[{"path":"","component":"TipoProyectoComponent","children":[{"path":"list-tipo_proyecto","component":"ListTipoProyectoComponent"},{"path":"crud-tipo_proyecto","component":"CrudTipoProyectoComponent"}]}],"kind":"module"}],"module":"TipoProyectoModule"}]},{"path":"periodo","loadChildren":"./periodo/periodo.module#PeriodoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/periodo/periodo-routing.module.ts","module":"PeriodoRoutingModule","children":[{"path":"","component":"PeriodoComponent","children":[{"path":"list-periodo","component":"ListPeriodoComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"PeriodoModule"}]},{"path":"tipo_periodo","loadChildren":"./tipo_periodo/tipo_periodo.module#TipoPeriodoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/tipo_periodo/tipo_periodo-routing.module.ts","module":"TipoPeriodoRoutingModule","children":[{"path":"","component":"TipoPeriodoComponent","children":[{"path":"list-tipo_periodo","component":"ListTipoPeriodoComponent"},{"path":"crud-tipo_periodo","component":"CrudTipoPeriodoComponent"}]}],"kind":"module"}],"module":"TipoPeriodoModule"}]},{"path":"tipo_duracion","loadChildren":"./tipo_duracion/tipo_duracion.module#TipoDuracionModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/tipo_duracion/tipo_duracion-routing.module.ts","module":"TipoDuracionRoutingModule","children":[{"path":"","component":"TipoDuracionComponent","children":[{"path":"list-tipo_duracion","component":"ListTipoDuracionComponent"},{"path":"crud-tipo_duracion","component":"CrudTipoDuracionComponent"}]}],"kind":"module"}],"module":"TipoDuracionModule"}]},{"path":"tipo_descuento","loadChildren":"./tipo_descuento/tipo_descuento.module#TipoDescuentoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/tipo_descuento/tipo_descuento-routing.module.ts","module":"TipoDescuentoRoutingModule","children":[{"path":"","component":"TipoDescuentoComponent","children":[{"path":"list-tipo_descuento","component":"ListTipoDescuentoComponent"},{"path":"crud-tipo_descuento","component":"CrudTipoDescuentoComponent"}]}],"kind":"module"}],"module":"TipoDescuentoModule"}]},{"path":"requisito","loadChildren":"./requisito/requisito.module#RequisitoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/requisito/requisito-routing.module.ts","module":"RequisitoRoutingModule","children":[{"path":"","component":"RequisitoComponent","children":[{"path":"list-requisito","component":"ListRequisitoComponent"},{"path":"crud-requisito","component":"CrudRequisitoComponent"}]}],"kind":"module"}],"module":"RequisitoModule"}]},{"path":"requisito_tipo_descuento","loadChildren":"./requisito_tipo_descuento/requisito_tipo_descuento.module#RequisitoTipoDescuentoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/requisito_tipo_descuento/requisito_tipo_descuento-routing.module.ts","module":"RequisitoTipoDescuentoRoutingModule","children":[{"path":"","component":"RequisitoTipoDescuentoComponent","children":[{"path":"list-requisito_tipo_descuento","component":"ListRequisitoTipoDescuentoComponent"},{"path":"crud-requisito_tipo_descuento","component":"CrudRequisitoTipoDescuentoComponent"}]}],"kind":"module"}],"module":"RequisitoTipoDescuentoModule"}]},{"path":"descuentos_dependencia","loadChildren":"./descuentos_dependencia/descuentos_dependencia.module#DescuentosDependenciaModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/descuentos_dependencia/descuentos_dependencia-routing.module.ts","module":"DescuentosDependenciaRoutingModule","children":[{"path":"","component":"DescuentosDependenciaComponent","children":[{"path":"list-descuentos_dependencia","component":"ListDescuentosDependenciaComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"DescuentosDependenciaModule"}]},{"path":"solicitud_descuento","loadChildren":"./solicitud_descuento/solicitud_descuento.module#SolicitudDescuentoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/solicitud_descuento/solicitud_descuento-routing.module.ts","module":"SolicitudDescuentoRoutingModule","children":[{"path":"","component":"SolicitudDescuentoComponent","children":[{"path":"list-solicitud_descuento","component":"ListSolicitudDescuentoComponent"},{"path":"crud-solicitud_descuento","component":"CrudSolicitudDescuentoComponent"}]}],"kind":"module"}],"module":"SolicitudDescuentoModule"}]},{"path":"validacion_descuento","loadChildren":"./validacion_descuento/validacion_descuento.module#ValidacionDescuentoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/validacion_descuento/validacion_descuento-routing.module.ts","module":"ValidacionDescuentoRoutingModule","children":[{"path":"","component":"ValidacionDescuentoComponent","children":[{"path":"list-validacion_descuento","component":"ListValidacionDescuentoComponent"},{"path":"crud-validacion_descuento","component":"CrudValidacionDescuentoComponent"}]}],"kind":"module"}],"module":"ValidacionDescuentoModule"}]},{"path":"soporte_descuento","loadChildren":"./soporte_descuento/soporte_descuento.module#SoporteDescuentoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/soporte_descuento/soporte_descuento-routing.module.ts","module":"SoporteDescuentoRoutingModule","children":[{"path":"","component":"SoporteDescuentoComponent","children":[{"path":"list-soporte_descuento","component":"ListSoporteDescuentoComponent"},{"path":"crud-soporte_descuento","component":"CrudSoporteDescuentoComponent"}]}],"kind":"module"}],"module":"SoporteDescuentoModule"}]},{"path":"requisito_academico","loadChildren":"./requisito_academico/requisito_academico.module#RequisitoAcademicoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/requisito_academico/requisito_academico-routing.module.ts","module":"RequisitoAcademicoRoutingModule","children":[{"path":"","component":"RequisitoAcademicoComponent","children":[{"path":"list-requisito_academico","component":"ListRequisitoAcademicoComponent"},{"path":"crud-requisito_academico","component":"CrudRequisitoAcademicoComponent"}]}],"kind":"module"}],"module":"RequisitoAcademicoModule"}]},{"path":"requisito_programa_academico","loadChildren":"./requisito_programa_academico/requisito_programa_academico.module#RequisitoProgramaAcademicoModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/requisito_programa_academico/requisito_programa_academico-routing.module.ts","module":"RequisitoProgramaAcademicoRoutingModule","children":[{"path":"","component":"RequisitoProgramaAcademicoComponent","children":[{"path":"list-requisito_programa_academico","component":"ListRequisitoProgramaAcademicoComponent"},{"path":"crud-requisito_programa_academico","component":"CrudRequisitoProgramaAcademicoComponent"}]}],"kind":"module"}],"module":"RequisitoProgramaAcademicoModule"}]},{"path":"evaluacion_inscripcion","loadChildren":"./evaluacion_inscripcion/evaluacion_inscripcion.module#EvaluacionInscripcionModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/evaluacion_inscripcion/evaluacion_inscripcion-routing.module.ts","module":"EvaluacionInscripcionRoutingModule","children":[{"path":"","component":"EvaluacionInscripcionComponent","children":[{"path":"list-evaluacion_inscripcion","component":"ListEvaluacionInscripcionComponent","canActivate":["AuthGuard"],"data":{"roles":["ADMIN_CAMPUS"]}}]}],"kind":"module"}],"module":"EvaluacionInscripcionModule"}]},{"path":"","redirectTo":"dashboard","pathMatch":"full"}]}],"kind":"module"}],"module":"PagesModule"}]},{"path":"","redirectTo":"pages","pathMatch":"full"},{"path":"**","redirectTo":"pages"}],"kind":"module"}]}
