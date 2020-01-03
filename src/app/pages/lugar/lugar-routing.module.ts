import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LugarComponent } from './lugar.component';
import { ListLugarComponent } from './list-lugar/list-lugar.component';
import { CrudLugarComponent } from './crud-lugar/crud-lugar.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: LugarComponent,
  children: [{
    path: 'list-lugar',
    component: ListLugarComponent,
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

export class LugarRoutingModule { }

export const routedComponents = [
  LugarComponent,
  ListLugarComponent,
  CrudLugarComponent,
];
