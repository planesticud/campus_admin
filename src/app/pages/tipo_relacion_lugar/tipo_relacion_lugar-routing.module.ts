import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoRelacionLugarComponent } from './tipo_relacion_lugar.component';
import { ListTipoRelacionLugarComponent } from './list-tipo_relacion_lugar/list-tipo_relacion_lugar.component';
import { CrudTipoRelacionLugarComponent } from './crud-tipo_relacion_lugar/crud-tipo_relacion_lugar.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoRelacionLugarComponent,
  children: [{
    path: 'list-tipo_relacion_lugar',
    component: ListTipoRelacionLugarComponent,
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

export class TipoRelacionLugarRoutingModule { }

export const routedComponents = [
  TipoRelacionLugarComponent,
  ListTipoRelacionLugarComponent,
  CrudTipoRelacionLugarComponent,
];
