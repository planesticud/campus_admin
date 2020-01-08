import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelacionCargoComponent } from './relacion_cargo.component';
import { ListRelacionCargoComponent } from './list-relacion_cargo/list-relacion_cargo.component';
import { CrudRelacionCargoComponent } from './crud-relacion_cargo/crud-relacion_cargo.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RelacionCargoComponent,
  children: [{
    path: 'list-relacion_cargo',
    component: ListRelacionCargoComponent,
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

export class RelacionCargoRoutingModule { }

export const routedComponents = [
  RelacionCargoComponent,
  ListRelacionCargoComponent,
  CrudRelacionCargoComponent,
];
