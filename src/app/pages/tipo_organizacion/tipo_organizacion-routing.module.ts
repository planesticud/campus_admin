import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoOrganizacionComponent } from './tipo_organizacion.component';
import { ListTipoOrganizacionComponent } from './list-tipo_organizacion/list-tipo_organizacion.component';
import { CrudTipoOrganizacionComponent } from './crud-tipo_organizacion/crud-tipo_organizacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoOrganizacionComponent,
  children: [{
    path: 'list-tipo_organizacion',
    component: ListTipoOrganizacionComponent,
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

export class TipoOrganizacionRoutingModule { }

export const routedComponents = [
  TipoOrganizacionComponent,
  ListTipoOrganizacionComponent,
  CrudTipoOrganizacionComponent,
];
