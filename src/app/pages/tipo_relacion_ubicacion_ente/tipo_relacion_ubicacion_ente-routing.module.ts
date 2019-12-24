import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoRelacionUbicacionEnteComponent } from './tipo_relacion_ubicacion_ente.component';
import { ListTipoRelacionUbicacionEnteComponent } from './list-tipo_relacion_ubicacion_ente/list-tipo_relacion_ubicacion_ente.component';
import { CrudTipoRelacionUbicacionEnteComponent } from './crud-tipo_relacion_ubicacion_ente/crud-tipo_relacion_ubicacion_ente.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoRelacionUbicacionEnteComponent,
  children: [{
    path: 'list-tipo_relacion_ubicacion_ente',
    component: ListTipoRelacionUbicacionEnteComponent,
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

export class TipoRelacionUbicacionEnteRoutingModule { }

export const routedComponents = [
  TipoRelacionUbicacionEnteComponent,
  ListTipoRelacionUbicacionEnteComponent,
  CrudTipoRelacionUbicacionEnteComponent,
];
