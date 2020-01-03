import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'programas_virtuales',
      loadChildren: './programas_virtuales/programas_virtuales.module#ProgramasVirtualesModule',
    },
    {
      path: 'area_conocimiento',
      loadChildren: './area_conocimiento/area_conocimiento.module#AreaConocimientoModule',
    },
    {
      path: 'atributo_lugar',
      loadChildren: './atributo_lugar/atributo_lugar.module#AtributoLugarModule',
    },
    {
      path: 'atributo_ubicacion',
      loadChildren: './atributo_ubicacion/atributo_ubicacion.module#AtributoUbicacionModule',
    },
    {
      path: 'cargo',
      loadChildren: './cargo/cargo.module#CargoModule',
    },
    {
      path: 'clasificacion_idioma',
      loadChildren: './clasificacion_idioma/clasificacion_idioma.module#ClasificacionIdiomaModule',
    },
    {
      path: 'concepto_academico',
      loadChildren: './concepto_academico/concepto_academico.module#ConceptoAcademicoModule',
    },
    {
      path: 'dependencia',
      loadChildren: './dependencia/dependencia.module#DependenciaModule',
    },
    {
      path: 'dependencia_padre',
      loadChildren: './dependencia_padre/dependencia_padre.module#DependenciaPadreModule',
    },
    {
      path: 'dependencia_tipo_dependencia',
      loadChildren: './dependencia_tipo_dependencia/dependencia_tipo_dependencia.module#DependenciaTipoDependenciaModule',
    },
    {
      path: 'estado_autor_produccion',
      loadChildren: './estado_autor_produccion/estado_autor_produccion.module#EstadoAutorProduccionModule',
    },
    {
      path: 'estado_civil',
      loadChildren: './estado_civil/estado_civil.module#EstadoCivilModule',
    },
    {
      path: 'estado_entrevista',
      loadChildren: './estado_entrevista/estado_entrevista.module#EstadoEntrevistaModule',
    },
    {
      path: 'estado_inscripcion',
      loadChildren: './estado_inscripcion/estado_inscripcion.module#EstadoInscripcionModule',
    },
    {
      path: 'estado_recibo',
      loadChildren: './estado_recibo/estado_recibo.module#EstadoReciboModule',
    },
    {
      path: 'genero',
      loadChildren: './genero/genero.module#GeneroModule',
    },
    {
      path: 'grupo_etnico',
      loadChildren: './grupo_etnico/grupo_etnico.module#GrupoEtnicoModule',
    },
    {
      path: 'grupo_investigacion',
      loadChildren: './grupo_investigacion/grupo_investigacion.module#GrupoInvestigacionModule',
    },
    {
      path: 'grupo_linea_investigacion',
      loadChildren: './grupo_linea_investigacion/grupo_linea_investigacion.module#GrupoLineaInvestigacionModule',
    },
    {
      path: 'idioma',
      loadChildren: './idioma/idioma.module#IdiomaModule',
    },
    {
      path: 'linea_investigacion',
      loadChildren: './linea_investigacion/linea_investigacion.module#LineaInvestigacionModule',
    },
    {
      path: 'metodologia',
      loadChildren: './metodologia/metodologia.module#MetodologiaModule',
    },
    {
      path: 'nivel_formacion',
      loadChildren: './nivel_formacion/nivel_formacion.module#NivelFormacionModule',
    },
    {
      path: 'nivel_idioma',
      loadChildren: './nivel_idioma/nivel_idioma.module#NivelIdiomaModule',
    },
    {
      path: 'nucleo_basico_conocimiento',
      loadChildren: './nucleo_basico_conocimiento/nucleo_basico_conocimiento.module#NucleoBasicoConocimientoModule',
    },
    {
      path: 'perfil_profesional',
      loadChildren: './perfil_profesional/perfil_profesional.module#PerfilProfesionalModule',
    },
    {
      path: 'periodo',
      loadChildren: './periodo/periodo.module#PeriodoModule',
    },
    {
      path: 'requisito',
      loadChildren: './requisito/requisito.module#RequisitoModule',
    },
    {
      path: 'requisito_academico',
      loadChildren: './requisito_academico/requisito_academico.module#RequisitoAcademicoModule',
    },
    {
      path: 'rol_encargado_evento',
      loadChildren: './rol_encargado_evento/rol_encargado_evento.module#RolEncargadoEventoModule',
    },
    {
      path: 'tipo_contacto',
      loadChildren: './tipo_contacto/tipo_contacto.module#TipoContactoModule',
    },
    {
      path: 'tipo_dato_adicional',
      loadChildren: './tipo_dato_adicional/tipo_dato_adicional.module#TipoDatoAdicionalModule',
    },
    {
      path: 'tipo_dedicacion',
      loadChildren: './tipo_dedicacion/tipo_dedicacion.module#TipoDedicacionModule',
    },
    {
      path: 'tipo_dependencia',
      loadChildren: './tipo_dependencia/tipo_dependencia.module#TipoDependenciaModule',
    },
    {
      path: 'tipo_discapacidad',
      loadChildren: './tipo_discapacidad/tipo_discapacidad.module#TipoDiscapacidadModule',
    },
    {
      path: 'tipo_documento',
      loadChildren: './tipo_documento/tipo_documento.module#TipoDocumentoModule',
    },
    {
      path: 'tipo_documento_programa',
      loadChildren: './tipo_documento_programa/tipo_documento_programa.module#TipoDocumentoProgramaModule',
    },
    {
      path: 'tipo_duracion',
      loadChildren: './tipo_duracion/tipo_duracion.module#TipoDuracionModule',
    },
    {
      path: 'tipo_ente',
      loadChildren: './tipo_ente/tipo_ente.module#TipoEnteModule',
    },
    {
      path: 'tipo_entrevista',
      loadChildren: './tipo_entrevista/tipo_entrevista.module#TipoEntrevistaModule',
    },
    {
      path: 'tipo_identificacion',
      loadChildren: './tipo_identificacion/tipo_identificacion.module#TipoIdentificacionModule',
    },
    {
      path: 'tipo_inscripcion',
      loadChildren: './tipo_inscripcion/tipo_inscripcion.module#TipoInscripcionModule',
    },
    {
      path: 'tipo_lugar',
      loadChildren: './tipo_lugar/tipo_lugar.module#TipoLugarModule',
    },
    {
      path: 'tipo_metadato',
      loadChildren: './tipo_metadato/tipo_metadato.module#TipoMetadatoModule',
    },
    {
      path: 'tipo_organizacion',
      loadChildren: './tipo_organizacion/tipo_organizacion.module#TipoOrganizacionModule',
    },
    {
      path: 'tipo_pago',
      loadChildren: './tipo_pago/tipo_pago.module#TipoPagoModule',
    },
    {
      path: 'tipo_periodo',
      loadChildren: './tipo_periodo/tipo_periodo.module#TipoPeriodoModule',
    },
    {
      path: 'tipo_produccion',
      loadChildren: './tipo_produccion/tipo_produccion.module#TipoProduccionModule',
    },
    {
      path: 'tipo_proyecto',
      loadChildren: './tipo_proyecto/tipo_proyecto.module#TipoProyectoModule',
    },
    {
      path: 'tipo_publico',
      loadChildren: './tipo_publico/tipo_publico.module#TipoPublicoModule',
    },
    {
      path: 'tipo_recibo',
      loadChildren: './tipo_recibo/tipo_recibo.module#TipoReciboModule',
    },
    {
      path: 'tipo_recurrencia',
      loadChildren: './tipo_recurrencia/tipo_recurrencia.module#TipoRecurrenciaModule',
    },
    {
      path: 'tipo_relacion_lugar',
      loadChildren: './tipo_relacion_lugar/tipo_relacion_lugar.module#TipoRelacionLugarModule',
    },
    {
      path: 'tipo_relacion_organizacion',
      loadChildren: './tipo_relacion_organizacion/tipo_relacion_organizacion.module#TipoRelacionOrganizacionModule',
    },
    {
      path: 'tipo_relacion_personas',
      loadChildren: './tipo_relacion_personas/tipo_relacion_personas.module#TipoRelacionPersonasModule',
    },
    {
      path: 'tipo_relacion_ubicacion_ente',
      loadChildren: './tipo_relacion_ubicacion_ente/tipo_relacion_ubicacion_ente.module#TipoRelacionUbicacionEnteModule',
    },
    {
      path: 'tipo_vinculacion',
      loadChildren: './tipo_vinculacion/tipo_vinculacion.module#TipoVinculacionModule',
    },
    {
      path: 'titulacion',
      loadChildren: './titulacion/titulacion.module#TitulacionModule',
    },
    {
      path: 'unidad_tiempo',
      loadChildren: './unidad_tiempo/unidad_tiempo.module#UnidadTiempoModule',
    },
    {
      path: 'lugar',
      loadChildren: './lugar/lugar.module#LugarModule',
    },
    {
      path: 'relacion_lugar',
      loadChildren: './relacion_lugar/relacion_lugar.module#RelacionLugarModule',
    },
    {
      path: 'valor_atributo_lugar',
      loadChildren: './valor_atributo_lugar/valor_atributo_lugar.module#ValorAtributoLugarModule',
    },





    {
      path: 'persona',
      loadChildren: './persona/persona.module#PersonaModule',
    },
    {
      path: 'programa_academico',
      loadChildren: './programa_academico/programa_academico.module#ProgramaAcademicoModule',
    },
    {
      path: 'tipo_descuento',
      loadChildren: './tipo_descuento/tipo_descuento.module#TipoDescuentoModule',
    },
    {
      path: 'requisito_tipo_descuento',
      loadChildren: './requisito_tipo_descuento/requisito_tipo_descuento.module#RequisitoTipoDescuentoModule',
    },
    {
      path: 'descuentos_dependencia',
      loadChildren: './descuentos_dependencia/descuentos_dependencia.module#DescuentosDependenciaModule',
    },
    {
      path: 'solicitud_descuento',
      loadChildren: './solicitud_descuento/solicitud_descuento.module#SolicitudDescuentoModule',
    },
    {
      path: 'validacion_descuento',
      loadChildren: './validacion_descuento/validacion_descuento.module#ValidacionDescuentoModule',
    },
    {
      path: 'soporte_descuento',
      loadChildren: './soporte_descuento/soporte_descuento.module#SoporteDescuentoModule',
    },
    {
      path: 'requisito_programa_academico',
      loadChildren: './requisito_programa_academico/requisito_programa_academico.module#RequisitoProgramaAcademicoModule',
    },
    {
      path: 'evaluacion_inscripcion',
      loadChildren: './evaluacion_inscripcion/evaluacion_inscripcion.module#EvaluacionInscripcionModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
