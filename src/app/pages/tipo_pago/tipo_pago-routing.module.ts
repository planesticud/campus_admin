import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoPagoComponent } from './tipo_pago.component';
import { ListTipoPagoComponent } from './list-tipo_pago/list-tipo_pago.component';
import { CrudTipoPagoComponent } from './crud-tipo_pago/crud-tipo_pago.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoPagoComponent,
  children: [{
    path: 'list-tipo_pago',
    component: ListTipoPagoComponent,
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

export class TipoPagoRoutingModule { }

export const routedComponents = [
  TipoPagoComponent,
  ListTipoPagoComponent,
  CrudTipoPagoComponent,
];
