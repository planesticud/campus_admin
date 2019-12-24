import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoEntrevistaComponent } from './tipo_entrevista.component';
import { ListTipoEntrevistaComponent } from './list-tipo_entrevista/list-tipo_entrevista.component';
import { CrudTipoEntrevistaComponent } from './crud-tipo_entrevista/crud-tipo_entrevista.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoEntrevistaComponent,
  children: [{
    path: 'list-tipo_entrevista',
    component: ListTipoEntrevistaComponent,
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

export class TipoEntrevistaRoutingModule { }

export const routedComponents = [
  TipoEntrevistaComponent,
  ListTipoEntrevistaComponent,
  CrudTipoEntrevistaComponent,
];
