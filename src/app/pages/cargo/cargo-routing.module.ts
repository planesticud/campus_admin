import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargoComponent } from './cargo.component';
import { ListCargoComponent } from './list-cargo/list-cargo.component';
import { CrudCargoComponent } from './crud-cargo/crud-cargo.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: CargoComponent,
  children: [{
    path: 'list-cargo',
    component: ListCargoComponent,
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

export class CargoRoutingModule { }

export const routedComponents = [
  CargoComponent,
  ListCargoComponent,
  CrudCargoComponent,
];
