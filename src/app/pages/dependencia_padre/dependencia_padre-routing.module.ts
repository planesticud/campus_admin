import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DependenciaPadreComponent } from './dependencia_padre.component';
import { ListDependenciaPadreComponent } from './list-dependencia_padre/list-dependencia_padre.component';
import { CrudDependenciaPadreComponent } from './crud-dependencia_padre/crud-dependencia_padre.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DependenciaPadreComponent,
  children: [{
    path: 'list-dependencia_padre',
    component: ListDependenciaPadreComponent,
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

export class DependenciaPadreRoutingModule { }

export const routedComponents = [
  DependenciaPadreComponent,
  ListDependenciaPadreComponent,
  CrudDependenciaPadreComponent,
];
