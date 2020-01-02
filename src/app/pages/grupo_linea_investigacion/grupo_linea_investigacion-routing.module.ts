import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoLineaInvestigacionComponent } from './grupo_linea_investigacion.component';
import { ListGrupoLineaInvestigacionComponent } from './list-grupo_linea_investigacion/list-grupo_linea_investigacion.component';
import { CrudGrupoLineaInvestigacionComponent } from './crud-grupo_linea_investigacion/crud-grupo_linea_investigacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: GrupoLineaInvestigacionComponent,
  children: [{
    path: 'list-grupo_linea_investigacion',
    component: ListGrupoLineaInvestigacionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
      ],
    },
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class GrupoLineaInvestigacionRoutingModule { }

export const routedComponents = [
  GrupoLineaInvestigacionComponent,
  ListGrupoLineaInvestigacionComponent,
  CrudGrupoLineaInvestigacionComponent,
];
