import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelacionOrganizacionComponent } from './relacion_organizacion.component';
import { ListRelacionOrganizacionComponent } from './list-relacion_organizacion/list-relacion_organizacion.component';
import { CrudRelacionOrganizacionComponent } from './crud-relacion_organizacion/crud-relacion_organizacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RelacionOrganizacionComponent,
  children: [{
    path: 'list-relacion_organizacion',
    component: ListRelacionOrganizacionComponent,
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

export class RelacionOrganizacionRoutingModule { }

export const routedComponents = [
  RelacionOrganizacionComponent,
  ListRelacionOrganizacionComponent,
  CrudRelacionOrganizacionComponent,
];
