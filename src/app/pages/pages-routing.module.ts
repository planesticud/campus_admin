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
      path: 'genero',
      loadChildren: './genero/genero.module#GeneroModule',
    },
    {
      path: 'grupo_etnico',
      loadChildren: './grupo_etnico/grupo_etnico.module#GrupoEtnicoModule',
    },
    {
      path: 'estado_civil',
      loadChildren: './estado_civil/estado_civil.module#EstadoCivilModule',
    },
    {
      path: 'tipo_discapacidad',
      loadChildren: './tipo_discapacidad/tipo_discapacidad.module#TipoDiscapacidadModule',
    },
    {
      path: 'persona',
      loadChildren: './persona/persona.module#PersonaModule',
    },
    {
      path: 'tipo_lugar',
      loadChildren: './tipo_lugar/tipo_lugar.module#TipoLugarModule',
    },
    {
      path: 'lugar',
      loadChildren: './lugar/lugar.module#LugarModule',
    },
    {
      path: 'tipo_contacto',
      loadChildren: './tipo_contacto/tipo_contacto.module#TipoContactoModule',
    },
    {
      path: 'idioma',
      loadChildren: './idioma/idioma.module#IdiomaModule',
    },
    {
      path: 'nivel_idioma',
      loadChildren: './nivel_idioma/nivel_idioma.module#NivelIdiomaModule',
    },
    {
      path: 'clasificacion_idioma',
      loadChildren: './clasificacion_idioma/clasificacion_idioma.module#ClasificacionIdiomaModule',
    },
    {
      path: 'titulacion',
      loadChildren: './titulacion/titulacion.module#TitulacionModule',
    },
    {
      path: 'nivel_formacion',
      loadChildren: './nivel_formacion/nivel_formacion.module#NivelFormacionModule',
    },
    {
      path: 'metodologia',
      loadChildren: './metodologia/metodologia.module#MetodologiaModule',
    },
    {
      path: 'programa_academico',
      loadChildren: './programa_academico/programa_academico.module#ProgramaAcademicoModule',
    },
    {
      path: 'enfasis',
      loadChildren: './enfasis/enfasis.module#EnfasisModule',
    },
    {
      path: 'estado_inscripcion',
      loadChildren: './estado_inscripcion/estado_inscripcion.module#EstadoInscripcionModule',
    },
    {
      path: 'linea_investigacion',
      loadChildren: './linea_investigacion/linea_investigacion.module#LineaInvestigacionModule',
    },
    {
      path: 'tipo_proyecto',
      loadChildren: './tipo_proyecto/tipo_proyecto.module#TipoProyectoModule',
    },
    {
      path: 'tipo_duracion',
      loadChildren: './tipo_duracion/tipo_duracion.module#TipoDuracionModule',
    },
    {
      path: 'tipo_descuento',
      loadChildren: './tipo_descuento/tipo_descuento.module#TipoDescuentoModule',
    },
    {
      path: 'requisito',
      loadChildren: './requisito/requisito.module#RequisitoModule',
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
