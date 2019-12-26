import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDependenciaComponent } from './tipo_dependencia.component';
import { ListTipoDependenciaComponent } from './list-tipo_dependencia/list-tipo_dependencia.component';
import { CrudTipoDependenciaComponent } from './crud-tipo_dependencia/crud-tipo_dependencia.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoDependenciaComponent,
  children: [{
    path: 'list-tipo_dependencia',
    component: ListTipoDependenciaComponent,
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

export class TipoDependenciaRoutingModule { }

export const routedComponents = [
  TipoDependenciaComponent,
  ListTipoDependenciaComponent,
  CrudTipoDependenciaComponent,
];
