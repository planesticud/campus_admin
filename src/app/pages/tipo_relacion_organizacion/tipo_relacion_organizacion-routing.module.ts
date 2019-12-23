import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoRelacionOrganizacionComponent } from './tipo_relacion_organizacion.component';
import { ListTipoRelacionOrganizacionComponent } from './list-tipo_relacion_organizacion/list-tipo_relacion_organizacion.component';
import { CrudTipoRelacionOrganizacionComponent } from './crud-tipo_relacion_organizacion/crud-tipo_relacion_organizacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoRelacionOrganizacionComponent,
  children: [{
    path: 'list-tipo_relacion_organizacion',
    component: ListTipoRelacionOrganizacionComponent,
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

export class TipoRelacionOrganizacionRoutingModule { }

export const routedComponents = [
  TipoRelacionOrganizacionComponent,
  ListTipoRelacionOrganizacionComponent,
  CrudTipoRelacionOrganizacionComponent,
];
