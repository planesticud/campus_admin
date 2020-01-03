import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelacionLugarComponent } from './relacion_lugar.component';
import { ListRelacionLugarComponent } from './list-relacion_lugar/list-relacion_lugar.component';
import { CrudRelacionLugarComponent } from './crud-relacion_lugar/crud-relacion_lugar.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RelacionLugarComponent,
  children: [{
    path: 'list-relacion_lugar',
    component: ListRelacionLugarComponent,
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

export class RelacionLugarRoutingModule { }

export const routedComponents = [
  RelacionLugarComponent,
  ListRelacionLugarComponent,
  CrudRelacionLugarComponent,
];
