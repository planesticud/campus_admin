import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoInvestigacionComponent } from './grupo_investigacion.component';
import { ListGrupoInvestigacionComponent } from './list-grupo_investigacion/list-grupo_investigacion.component';
import { CrudGrupoInvestigacionComponent } from './crud-grupo_investigacion/crud-grupo_investigacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: GrupoInvestigacionComponent,
  children: [{
    path: 'list-grupo_investigacion',
    component: ListGrupoInvestigacionComponent,
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

export class GrupoInvestigacionRoutingModule { }

export const routedComponents = [
  GrupoInvestigacionComponent,
  ListGrupoInvestigacionComponent,
  CrudGrupoInvestigacionComponent,
];
