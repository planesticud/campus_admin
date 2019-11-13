import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDiscapacidadComponent } from './tipo_discapacidad.component';
import { ListTipoDiscapacidadComponent } from './list-tipo_discapacidad/list-tipo_discapacidad.component';
import { CrudTipoDiscapacidadComponent } from './crud-tipo_discapacidad/crud-tipo_discapacidad.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoDiscapacidadComponent,
  children: [{
    path: 'list-tipo_discapacidad',
    component: ListTipoDiscapacidadComponent,
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

export class TipoDiscapacidadRoutingModule { }

export const routedComponents = [
  TipoDiscapacidadComponent,
  ListTipoDiscapacidadComponent,
  CrudTipoDiscapacidadComponent,
];
