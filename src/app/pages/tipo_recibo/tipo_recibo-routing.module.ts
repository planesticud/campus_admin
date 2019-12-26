import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoReciboComponent } from './tipo_recibo.component';
import { ListTipoReciboComponent } from './list-tipo_recibo/list-tipo_recibo.component';
import { CrudTipoReciboComponent } from './crud-tipo_recibo/crud-tipo_recibo.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoReciboComponent,
  children: [{
    path: 'list-tipo_recibo',
    component: ListTipoReciboComponent,
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

export class TipoReciboRoutingModule { }

export const routedComponents = [
  TipoReciboComponent,
  ListTipoReciboComponent,
  CrudTipoReciboComponent,
];
