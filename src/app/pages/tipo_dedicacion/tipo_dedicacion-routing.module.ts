import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDedicacionComponent } from './tipo_dedicacion.component';
import { ListTipoDedicacionComponent } from './list-tipo_dedicacion/list-tipo_dedicacion.component';
import { CrudTipoDedicacionComponent } from './crud-tipo_dedicacion/crud-tipo_dedicacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoDedicacionComponent,
  children: [{
    path: 'list-tipo_dedicacion',
    component: ListTipoDedicacionComponent,
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

export class TipoDedicacionRoutingModule { }

export const routedComponents = [
  TipoDedicacionComponent,
  ListTipoDedicacionComponent,
  CrudTipoDedicacionComponent,
];
