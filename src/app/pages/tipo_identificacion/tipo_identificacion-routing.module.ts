import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoIdentificacionComponent } from './tipo_identificacion.component';
import { ListTipoIdentificacionComponent } from './list-tipo_identificacion/list-tipo_identificacion.component';
import { CrudTipoIdentificacionComponent } from './crud-tipo_identificacion/crud-tipo_identificacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoIdentificacionComponent,
  children: [{
    path: 'list-tipo_identificacion',
    component: ListTipoIdentificacionComponent,
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

export class TipoIdentificacionRoutingModule { }

export const routedComponents = [
  TipoIdentificacionComponent,
  ListTipoIdentificacionComponent,
  CrudTipoIdentificacionComponent,
];
