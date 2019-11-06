import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoEtnicoComponent } from './grupo_etnico.component';
import { ListGrupoEtnicoComponent } from './list-grupo_etnico/list-grupo_etnico.component';
import { CrudGrupoEtnicoComponent } from './crud-grupo_etnico/crud-grupo_etnico.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: GrupoEtnicoComponent,
  children: [{
    path: 'list-grupo_etnico',
    component: ListGrupoEtnicoComponent,
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

export class GrupoEtnicoRoutingModule { }

export const routedComponents = [
  GrupoEtnicoComponent,
  ListGrupoEtnicoComponent,
  CrudGrupoEtnicoComponent,
];
