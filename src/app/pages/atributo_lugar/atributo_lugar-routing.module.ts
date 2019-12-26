import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtributoLugarComponent } from './atributo_lugar.component';
import { ListAtributoLugarComponent } from './list-atributo_lugar/list-atributo_lugar.component';
import { CrudAtributoLugarComponent } from './crud-atributo_lugar/crud-atributo_lugar.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: AtributoLugarComponent,
  children: [{
    path: 'list-atributo_lugar',
    component: ListAtributoLugarComponent,
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

export class AtributoLugarRoutingModule { }

export const routedComponents = [
  AtributoLugarComponent,
  ListAtributoLugarComponent,
  CrudAtributoLugarComponent,
];
