import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DependenciaComponent } from './dependencia.component';
import { ListDependenciaComponent } from './list-dependencia/list-dependencia.component';
import { CrudDependenciaComponent } from './crud-dependencia/crud-dependencia.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DependenciaComponent,
  children: [{
    path: 'list-dependencia',
    component: ListDependenciaComponent,
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

export class DependenciaRoutingModule { }

export const routedComponents = [
  DependenciaComponent,
  ListDependenciaComponent,
  CrudDependenciaComponent,
];
