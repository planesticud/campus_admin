import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoReciboComponent } from './estado_recibo.component';
import { ListEstadoReciboComponent } from './list-estado_recibo/list-estado_recibo.component';
import { CrudEstadoReciboComponent } from './crud-estado_recibo/crud-estado_recibo.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: EstadoReciboComponent,
  children: [{
    path: 'list-estado_recibo',
    component: ListEstadoReciboComponent,
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

export class EstadoReciboRoutingModule { }

export const routedComponents = [
  EstadoReciboComponent,
  ListEstadoReciboComponent,
  CrudEstadoReciboComponent,
];
