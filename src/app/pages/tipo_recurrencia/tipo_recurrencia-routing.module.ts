import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoRecurrenciaComponent } from './tipo_recurrencia.component';
import { ListTipoRecurrenciaComponent } from './list-tipo_recurrencia/list-tipo_recurrencia.component';
import { CrudTipoRecurrenciaComponent } from './crud-tipo_recurrencia/crud-tipo_recurrencia.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoRecurrenciaComponent,
  children: [{
    path: 'list-tipo_recurrencia',
    component: ListTipoRecurrenciaComponent,
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

export class TipoRecurrenciaRoutingModule { }

export const routedComponents = [
  TipoRecurrenciaComponent,
  ListTipoRecurrenciaComponent,
  CrudTipoRecurrenciaComponent,
];
