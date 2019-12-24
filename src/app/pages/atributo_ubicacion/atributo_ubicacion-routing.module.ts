import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtributoUbicacionComponent } from './atributo_ubicacion.component';
import { ListAtributoUbicacionComponent } from './list-atributo_ubicacion/list-atributo_ubicacion.component';
import { CrudAtributoUbicacionComponent } from './crud-atributo_ubicacion/crud-atributo_ubicacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: AtributoUbicacionComponent,
  children: [{
    path: 'list-atributo_ubicacion',
    component: ListAtributoUbicacionComponent,
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

export class AtributoUbicacionRoutingModule { }

export const routedComponents = [
  AtributoUbicacionComponent,
  ListAtributoUbicacionComponent,
  CrudAtributoUbicacionComponent,
];
