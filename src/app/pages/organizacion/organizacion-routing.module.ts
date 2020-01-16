import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizacionComponent } from './organizacion.component';
import { ListOrganizacionComponent } from './list-organizacion/list-organizacion.component';
import { CrudOrganizacionComponent } from './crud-organizacion/crud-organizacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: OrganizacionComponent,
  children: [{
    path: 'list-organizacion',
    component: ListOrganizacionComponent,
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

export class OrganizacionRoutingModule { }

export const routedComponents = [
  OrganizacionComponent,
  ListOrganizacionComponent,
  CrudOrganizacionComponent,
];
