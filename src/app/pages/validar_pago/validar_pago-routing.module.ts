import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarPagoComponent } from './validar_pago.component';
import { ListValidarPagoComponent } from './list-validar_pago/list-validar_pago.component';
import { CrudValidarPagoComponent } from './crud-validar_pago/crud-validar_pago.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ValidarPagoComponent,
  children: [{
    path: 'list-validar_pago',
    component: ListValidarPagoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
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

export class ValidarPagoRoutingModule { }

export const routedComponents = [
  ValidarPagoComponent,
  ListValidarPagoComponent,
  CrudValidarPagoComponent,
];
