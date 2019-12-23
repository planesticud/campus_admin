import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoEnteComponent } from './tipo_ente.component';
import { ListTipoEnteComponent } from './list-tipo_ente/list-tipo_ente.component';
import { CrudTipoEnteComponent } from './crud-tipo_ente/crud-tipo_ente.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoEnteComponent,
  children: [{
    path: 'list-tipo_ente',
    component: ListTipoEnteComponent,
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

export class TipoEnteRoutingModule { }

export const routedComponents = [
  TipoEnteComponent,
  ListTipoEnteComponent,
  CrudTipoEnteComponent,
];
